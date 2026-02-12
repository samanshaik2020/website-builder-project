'use client';

import { useEffect, useCallback, useState, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
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
    Palette,
    Unlink,
    Type,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
} from 'lucide-react';

interface TiptapRichTextProps {
    eid: string;
    defaultContent: string; // Can be HTML or plain text
    className?: string;
    style?: React.CSSProperties;
    editable?: boolean;
    onChange?: (eid: string, html: string, text: string) => void;
    variant?: 'minimal' | 'standard' | 'full'; // Toolbar options
}

// Color palette for text colors
const colorPalette = [
    '#000000', '#374151', '#6B7280', '#9CA3AF',
    '#EF4444', '#F97316', '#EAB308', '#22C55E',
    '#14B8A6', '#3B82F6', '#8B5CF6', '#EC4899',
    '#FFFFFF', '#F3F4F6', '#FEF3C7', '#DCFCE7',
];

export const TiptapRichText = ({
    eid,
    defaultContent,
    className = '',
    style,
    editable = false,
    onChange,
    variant = 'standard',
}: TiptapRichTextProps) => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [showLinkInput, setShowLinkInput] = useState(false);
    const [linkUrl, setLinkUrl] = useState('');

    // Use ref to store selection - more reliable than state for this use case
    const linkSelectionRef = useRef<{ from: number; to: number } | null>(null);
    const linkInputRef = useRef<HTMLInputElement>(null);

    // Determine if content is HTML or plain text
    const isHtml = defaultContent.includes('<') && defaultContent.includes('>');
    const initialContent = isHtml ? defaultContent : `<p>${defaultContent}</p>`;

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: variant === 'full' ? { levels: [1, 2, 3] } : false,
                bulletList: variant === 'full' ? {} : false,
                orderedList: variant === 'full' ? {} : false,
                blockquote: variant === 'full' ? {} : false,
                codeBlock: false,
                horizontalRule: false,
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
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
        content: initialContent,
        editable: editable,
        onUpdate: ({ editor }) => {
            if (onChange) {
                const html = editor.getHTML();
                const text = editor.getText();
                onChange(eid, html, text);
            }
        },
        editorProps: {
            attributes: {
                class: 'outline-none focus:outline-none min-h-[1em] prose prose-sm max-w-none',
            },
        },
    });

    // Update content when defaultContent changes
    useEffect(() => {
        if (editor && !editor.isFocused) {
            const currentContent = editor.getHTML();
            if (currentContent !== initialContent) {
                editor.commands.setContent(initialContent);
            }
        }
    }, [defaultContent, editor, initialContent]);

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

    // Check if there's a text selection AND editor is focused
    const [hasSelection, setHasSelection] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });

    // Use refs to track state in event handlers without stale closures
    const stateRef = useRef({ showLinkInput, showColorPicker });
    stateRef.current = { showLinkInput, showColorPicker };

    useEffect(() => {
        if (!editor || !editable) return;

        const updateToolbar = () => {
            const { from, to } = editor.state.selection;
            const hasText = from !== to;
            const focused = editor.isFocused;

            setHasSelection(hasText);
            setIsFocused(focused);

            if (hasText && focused) {
                const { view } = editor;
                const start = view.coordsAtPos(from);
                const end = view.coordsAtPos(to);

                // Position toolbar above the selection, with better offset
                setToolbarPosition({
                    top: start.top - 60,
                    left: (start.left + end.left) / 2,
                });
            }
        };

        const handleBlur = () => {
            // Delay to allow clicking toolbar buttons
            setTimeout(() => {
                // Keep toolbar open if link input is showing OR if color picker is open
                const { showLinkInput, showColorPicker } = stateRef.current;
                const shouldKeepOpen = showLinkInput || showColorPicker;

                if (!editor.isFocused && !shouldKeepOpen) {
                    setHasSelection(false);
                    setIsFocused(false);
                    setShowColorPicker(false);
                    setShowLinkInput(false);
                }
            }, 200);
        };

        editor.on('selectionUpdate', updateToolbar);
        editor.on('focus', updateToolbar);
        editor.on('blur', handleBlur);

        return () => {
            editor.off('selectionUpdate', updateToolbar);
            editor.off('focus', updateToolbar);
            editor.off('blur', handleBlur);
        };
    }, [editor, editable]);

    if (!editable) {
        return (
            <div
                data-eid={eid}
                className={className}
                style={style}
                dangerouslySetInnerHTML={{ __html: initialContent }}
            />
        );
    }

    if (!editor) {
        return (
            <div data-eid={eid} className={className} style={style}>
                <div dangerouslySetInnerHTML={{ __html: initialContent }} />
            </div>
        );
    }

    // Link button component
    const LinkButton = () => (
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
                    className="absolute top-full left-0 mt-2 p-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 flex gap-2 z-[10000]"
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
    );

    // Minimal toolbar: Bold, Italic, Link only
    const MinimalToolbar = () => (
        <>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive('bold') ? 'bg-gray-700 text-white' : 'text-gray-300'
                    }`}
                title="Bold (Ctrl+B)"
                type="button"
            >
                <Bold className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive('italic') ? 'bg-gray-700 text-white' : 'text-gray-300'
                    }`}
                title="Italic (Ctrl+I)"
                type="button"
            >
                <Italic className="w-4 h-4" />
            </button>
            <div className="w-px h-6 bg-gray-600 mx-1" />
            <LinkButton />
        </>
    );

    // Standard toolbar: Bold, Italic, Underline, Strikethrough, Highlight, Color, Alignment, Link
    const StandardToolbar = () => (
        <>
            {/* Text Formatting */}
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive('bold') ? 'bg-gray-700 text-white' : 'text-gray-300'
                    }`}
                title="Bold (Ctrl+B)"
                type="button"
            >
                <Bold className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive('italic') ? 'bg-gray-700 text-white' : 'text-gray-300'
                    }`}
                title="Italic (Ctrl+I)"
                type="button"
            >
                <Italic className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive('underline') ? 'bg-gray-700 text-white' : 'text-gray-300'
                    }`}
                title="Underline (Ctrl+U)"
                type="button"
            >
                <UnderlineIcon className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive('strike') ? 'bg-gray-700 text-white' : 'text-gray-300'
                    }`}
                title="Strikethrough"
                type="button"
            >
                <Strikethrough className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-gray-600 mx-1" />

            {/* Highlight & Color */}
            <button
                onClick={() => editor.chain().focus().toggleHighlight({ color: '#fef08a' }).run()}
                className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive('highlight') ? 'bg-gray-700 text-white' : 'text-gray-300'
                    }`}
                title="Highlight"
                type="button"
            >
                <Highlighter className="w-4 h-4" />
            </button>
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
                    <div className="absolute top-full left-0 mt-2 p-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 grid grid-cols-4 gap-1 min-w-[120px] z-[10000]">
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

            <div className="w-px h-6 bg-gray-600 mx-1" />

            {/* Alignment */}
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

            <div className="w-px h-6 bg-gray-600 mx-1" />

            <LinkButton />
        </>
    );

    // Full toolbar: Everything including headings, lists, blockquote
    const FullToolbar = () => (
        <>
            {/* Headings */}
            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive('paragraph') ? 'bg-gray-700 text-white' : 'text-gray-300'
                    }`}
                title="Paragraph"
                type="button"
            >
                <Type className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-700 text-white' : 'text-gray-300'
                    }`}
                title="Heading 1"
                type="button"
            >
                <Heading1 className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-700 text-white' : 'text-gray-300'
                    }`}
                title="Heading 2"
                type="button"
            >
                <Heading2 className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-700 text-white' : 'text-gray-300'
                    }`}
                title="Heading 3"
                type="button"
            >
                <Heading3 className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-gray-600 mx-1" />

            {/* Text Formatting */}
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive('bold') ? 'bg-gray-700 text-white' : 'text-gray-300'
                    }`}
                title="Bold (Ctrl+B)"
                type="button"
            >
                <Bold className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive('italic') ? 'bg-gray-700 text-white' : 'text-gray-300'
                    }`}
                title="Italic (Ctrl+I)"
                type="button"
            >
                <Italic className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive('underline') ? 'bg-gray-700 text-white' : 'text-gray-300'
                    }`}
                title="Underline (Ctrl+U)"
                type="button"
            >
                <UnderlineIcon className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive('strike') ? 'bg-gray-700 text-white' : 'text-gray-300'
                    }`}
                title="Strikethrough"
                type="button"
            >
                <Strikethrough className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-gray-600 mx-1" />

            {/* Lists & Quote */}
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive('bulletList') ? 'bg-gray-700 text-white' : 'text-gray-300'
                    }`}
                title="Bullet List"
                type="button"
            >
                <List className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive('orderedList') ? 'bg-gray-700 text-white' : 'text-gray-300'
                    }`}
                title="Numbered List"
                type="button"
            >
                <ListOrdered className="w-4 h-4" />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive('blockquote') ? 'bg-gray-700 text-white' : 'text-gray-300'
                    }`}
                title="Quote"
                type="button"
            >
                <Quote className="w-4 h-4" />
            </button>

            <div className="w-px h-6 bg-gray-600 mx-1" />

            {/* Color & Highlight */}
            <button
                onClick={() => editor.chain().focus().toggleHighlight({ color: '#fef08a' }).run()}
                className={`p-2 rounded hover:bg-gray-700 transition-colors ${editor.isActive('highlight') ? 'bg-gray-700 text-white' : 'text-gray-300'
                    }`}
                title="Highlight"
                type="button"
            >
                <Highlighter className="w-4 h-4" />
            </button>
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
                    <div className="absolute top-full left-0 mt-2 p-2 bg-gray-800 rounded-lg shadow-xl border border-gray-700 grid grid-cols-4 gap-1 min-w-[120px] z-[10000]">
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

            <div className="w-px h-6 bg-gray-600 mx-1" />

            {/* Alignment */}
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

            <div className="w-px h-6 bg-gray-600 mx-1" />

            <LinkButton />
        </>
    );

    return (
        <div data-eid={eid} className={className} style={style}>
            {/* Floating Bubble Menu - Only show when focused */}
            {((hasSelection && isFocused) || showLinkInput || showColorPicker) && (
                <div
                    className="fixed flex items-center gap-0.5 bg-gray-900 dark:bg-gray-800 rounded-lg shadow-xl border border-gray-700 p-1 z-[9999] flex-wrap max-w-[90vw]"
                    style={{
                        top: toolbarPosition.top,
                        left: toolbarPosition.left,
                        transform: 'translateX(-50%)',
                    }}
                    onMouseDown={(e) => {
                        // Prevent toolbar from taking focus away from editor
                        // But allow interaction with inputs
                        if (e.target instanceof HTMLInputElement) {
                            return;
                        }
                        e.preventDefault();
                    }}
                >
                    {variant === 'minimal' && <MinimalToolbar />}
                    {variant === 'standard' && <StandardToolbar />}
                    {variant === 'full' && <FullToolbar />}
                </div>
            )}

            {/* Editor Content */}
            <EditorContent editor={editor} />
        </div>
    );
};

export default TiptapRichText;
