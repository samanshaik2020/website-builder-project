'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Highlighter,
    Link as LinkIcon,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Palette,
    Unlink,
} from 'lucide-react';

interface TiptapEditableTextProps {
    eid: string;
    defaultText: string;
    className?: string;
    style?: React.CSSProperties;
    editable?: boolean;
    onChange?: (eid: string, value: string) => void;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

// Color palette for text colors
const colorPalette = [
    '#000000', '#374151', '#6B7280', '#9CA3AF',
    '#EF4444', '#F97316', '#EAB308', '#22C55E',
    '#14B8A6', '#3B82F6', '#8B5CF6', '#EC4899',
];

export const TiptapEditableText: React.FC<TiptapEditableTextProps> = ({
    eid,
    defaultText,
    className = '',
    style,
    editable = false,
    onChange,
    as,
}) => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');

    // Use ref to store selection - more reliable than state for this use case
    const linkSelectionRef = useRef<{ from: number; to: number } | null>(null);
    const linkInputRef = useRef<HTMLInputElement>(null);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                // Disable some features we don't need for inline editing
                heading: false,
                bulletList: false,
                orderedList: false,
                blockquote: false,
                codeBlock: false,
                horizontalRule: false,
            }),
            Underline,
            TextAlign.configure({
                types: ['paragraph'],
            }),
            Highlight.configure({
                multicolor: true,
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-blue-500 underline cursor-pointer hover:text-blue-600',
                },
            }),
            TextStyle,
            Color,
        ],
        content: `<p>${defaultText}</p>`,
        editable: editable,
        onUpdate: ({ editor }) => {
            if (onChange) {
                // Get the text content (without HTML tags for simple text storage)
                const text = editor.getText();
                onChange(eid, text);
            }
        },
        editorProps: {
            attributes: {
                class: 'outline-none focus:outline-none min-h-[1em]',
            },
        },
    });

    // Update content when defaultText changes (but only if editor is not focused)
    useEffect(() => {
        if (editor && !editor.isFocused && defaultText !== editor.getText()) {
            editor.commands.setContent(`<p>${defaultText}</p>`);
        }
    }, [defaultText, editor]);

    // Update editable state
    useEffect(() => {
        if (editor) {
            editor.setEditable(editable);
        }
    }, [editable, editor]);

    // Handle opening link input dialog
    const openLinkDialog = useCallback(() => {
        if (!editor) return;

        // Get current selection from editor
        const { from, to } = editor.state.selection;

        // Only proceed if there's a text selection
        if (from === to) {
            return; // No text selected
        }

        // Validate selection range
        const docSize = editor.state.doc.content.size;
        if (from < 0 || to > docSize || from >= to) {
            return;
        }

        // Get the selected text to verify it's not empty
        const selectedText = editor.state.doc.textBetween(from, to, ' ');
        if (!selectedText.trim()) {
            return;
        }

        // Store selection in ref (survives re-renders)
        linkSelectionRef.current = { from, to };

        // Check if selection already has a link
        const existingLink = editor.getAttributes('link').href;
        if (existingLink) {
            setLinkUrl(existingLink);
        } else {
            setLinkUrl('');
        }

        setShowLinkInput(true);
    }, [editor]);

    // Handle applying the link
    const applyLink = useCallback(() => {
        if (!editor || !linkSelectionRef.current) return;

        const { from, to } = linkSelectionRef.current;

        // Use command chaining to restore selection and apply link atomically
        if (linkUrl.trim() === '') {
            // Remove link if URL is empty
            editor.chain()
                .focus()
                .setTextSelection({ from, to })
                .unsetLink()
                .run();
        } else {
            // Add/update link with proper command chaining
            editor.chain()
                .focus()
                .setTextSelection({ from, to })
                .setLink({ href: linkUrl })
                .run();
        }

        // Clean up
        setShowLinkInput(false);
        setLinkUrl('');
        linkSelectionRef.current = null;
    }, [editor, linkUrl]);

    // Handle removing link (when clicking unlink button on existing link)
    const removeLink = useCallback(() => {
        if (!editor) return;
        editor.chain().focus().unsetLink().run();
    }, [editor]);

    // Handle closing link dialog without applying
    const closeLinkDialog = useCallback(() => {
        setShowLinkInput(false);
        setLinkUrl('');
        linkSelectionRef.current = null;
    }, []);

    const ElementType: React.ElementType = as || 'div';


    if (!editable) {
        // Sanitize defaultText to remove contenteditable attributes if data is polluted
        const sanitizedText = defaultText ? defaultText.replace(/contenteditable="(true|false)"/gi, '') : '';

        return (
            <ElementType
                data-eid={eid}
                className={className}
                style={style}
                dangerouslySetInnerHTML={{ __html: sanitizedText }}
                suppressHydrationWarning
            />
        );
    }

    if (!editor) {
        return (
            <ElementType data-eid={eid} className={className} style={style}>
                {defaultText}
            </ElementType>
        );
    }

    return (
        <div data-eid={eid} className={className} style={style}>
            {/* Bubble Menu from @tiptap/react - Positions correctly even with transforms */}
            <BubbleMenu
                editor={editor}
                shouldShow={({ from, to }: { from: number; to: number }) => {
                    // Show if text is selected OR link input is open OR color picker is open
                    return from !== to || showLinkInput || showColorPicker;
                }}
            >
                <div
                    className="flex items-center gap-0.5 bg-gray-900 dark:bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-1"
                    onMouseDown={(e) => {
                        // Prevent toolbar from taking focus away from editor
                        // But allow interaction with inputs
                        if (e.target instanceof HTMLInputElement) {
                            return;
                        }
                        e.preventDefault();
                    }}
                >
                    {/* Bold */}
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive('bold') ? 'bg-gray-700 text-white' : 'text-gray-300'
                            }`}
                        title="Bold (Ctrl+B)"
                        type="button"
                    >
                        <Bold className="w-4 h-4" />
                    </button>

                    {/* Italic */}
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive('italic') ? 'bg-gray-700 text-white' : 'text-gray-300'
                            }`}
                        title="Italic (Ctrl+I)"
                        type="button"
                    >
                        <Italic className="w-4 h-4" />
                    </button>

                    {/* Underline */}
                    <button
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive('underline') ? 'bg-gray-700 text-white' : 'text-gray-300'
                            }`}
                        title="Underline (Ctrl+U)"
                        type="button"
                    >
                        <UnderlineIcon className="w-4 h-4" />
                    </button>

                    {/* Strikethrough */}
                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive('strike') ? 'bg-gray-700 text-white' : 'text-gray-300'
                            }`}
                        title="Strikethrough"
                        type="button"
                    >
                        <Strikethrough className="w-4 h-4" />
                    </button>

                    {/* Divider */}
                    <div className="w-px h-6 bg-gray-600 mx-1" />

                    {/* Highlight */}
                    <button
                        onClick={() => editor.chain().focus().toggleHighlight({ color: '#fef08a' }).run()}
                        className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive('highlight') ? 'bg-gray-700 text-white' : 'text-gray-300'
                            }`}
                        title="Highlight"
                        type="button"
                    >
                        <Highlighter className="w-4 h-4" />
                    </button>

                    {/* Text Color */}
                    <div className="relative">
                        <button
                            onClick={() => setShowColorPicker(!showColorPicker)}
                            className={`p-2 rounded hover:bg-gray-700 transition-colors text-gray-300`}
                            title="Text Color"
                            type="button"
                        >
                            <Palette className="w-4 h-4" />
                        </button>
                        {showColorPicker && (
                            <div className="absolute bottom-full left-0 mb-2 p-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 grid grid-cols-4 gap-1 min-w-[120px] z-[10000]">
                                {colorPalette.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => {
                                            editor.chain().focus().setColor(color).run();
                                            setShowColorPicker(false);
                                        }}
                                        className="w-6 h-6 rounded border border-gray-600 hover:scale-110 transition-transform"
                                        style={{ backgroundColor: color }}
                                        type="button"
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="w-px h-6 bg-gray-600 mx-1" />

                    {/* Text Alignment */}
                    <button
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-700 text-white' : 'text-gray-300'
                            }`}
                        title="Align Left"
                        type="button"
                    >
                        <AlignLeft className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-700 text-white' : 'text-gray-300'
                            }`}
                        title="Align Center"
                        type="button"
                    >
                        <AlignCenter className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-700 text-white' : 'text-gray-300'
                            }`}
                        title="Align Right"
                        type="button"
                    >
                        <AlignRight className="w-4 h-4" />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                        className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-700 text-white' : 'text-gray-300'
                            }`}
                        title="Justify"
                        type="button"
                    >
                        <AlignJustify className="w-4 h-4" />
                    </button>

                    {/* Divider */}
                    <div className="w-px h-6 bg-gray-600 mx-1" />

                    {/* Link */}
                    <div className="relative">
                        {editor.isActive('link') ? (
                            <button
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={removeLink}
                                className="p-2 rounded hover:bg-gray-700 transition-colors text-blue-400"
                                title="Remove Link"
                                type="button"
                            >
                                <Unlink className="w-4 h-4" />
                            </button>
                        ) : (
                            <button
                                onMouseDown={(e) => e.preventDefault()}
                                onClick={openLinkDialog}
                                className={`p-2 rounded hover:bg-gray-700 transition-colors ${showLinkInput ? 'bg-gray-700 text-white' : 'text-gray-300'
                                    }`}
                                title="Add Link"
                                type="button"
                            >
                                <LinkIcon className="w-4 h-4" />
                            </button>
                        )}
                        {showLinkInput && (
                            <div
                                className="absolute bottom-full right-0 mb-2 p-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 flex gap-2 z-[10000]"
                                onMouseDown={(e) => e.stopPropagation()}
                            >
                                <input
                                    ref={linkInputRef}
                                    type="url"
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                    placeholder="https://example.com"
                                    autoFocus
                                    className="px-3 py-1.5 bg-gray-700 border border-gray-600 rounded text-sm w-52 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-400 text-white"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            applyLink();
                                        } else if (e.key === 'Escape') {
                                            e.preventDefault();
                                            closeLinkDialog();
                                            editor?.commands.focus();
                                        }
                                    }}
                                />
                                <button
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={applyLink}
                                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm font-medium transition-colors"
                                    type="button"
                                >
                                    {linkUrl ? 'Update' : 'Add'}
                                </button>
                                <button
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => {
                                        closeLinkDialog();
                                        editor?.commands.focus();
                                    }}
                                    className="px-2 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-gray-300 text-sm transition-colors"
                                    type="button"
                                    title="Cancel"
                                >
                                    ✕
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </BubbleMenu>

            {/* Editor Content */}
            <div className="relative">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default TiptapEditableText;
