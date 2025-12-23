'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Link2, Type, Palette } from 'lucide-react';

interface ContentEditableToolbarProps {
  visible: boolean;
}

export const ContentEditableToolbar: React.FC<ContentEditableToolbarProps> = ({ visible }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontSize, setShowFontSize] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const savedSelectionRef = useRef<Range | null>(null);

  // Save the current selection
  const saveSelection = useCallback(() => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      savedSelectionRef.current = selection.getRangeAt(0).cloneRange();
    }
  }, []);

  // Restore the saved selection
  const restoreSelection = useCallback(() => {
    if (savedSelectionRef.current) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(savedSelectionRef.current);

        // Ensure the editable element has focus for execCommand to work
        let container = savedSelectionRef.current.commonAncestorContainer;
        if (container.nodeType === Node.TEXT_NODE && container.parentElement) {
          container = container.parentElement;
        }

        if (container instanceof HTMLElement) {
          const editable = container.closest('[contenteditable="true"]');
          if (editable instanceof HTMLElement) {
            editable.focus();
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    const el = ref.current;

    if (!visible) {
      // Reset dropdowns when toolbar is hidden
      setShowColorPicker(false);
      setShowFontSize(false);
      setShowLinkInput(false);
      savedSelectionRef.current = null;
      return;
    }

    // Save selection when toolbar becomes visible
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      savedSelectionRef.current = selection.getRangeAt(0).cloneRange();
    }

    const updatePosition = () => {
      if (!el) return;

      try {
        const domSelection = window.getSelection();
        if (!domSelection || domSelection.rangeCount === 0) return;

        const domRange = domSelection.getRangeAt(0);
        const rect = domRange.getBoundingClientRect();

        // Calculate position using scrollY instead of pageYOffset for better compatibility
        const scrollY = window.scrollY || window.pageYOffset;
        const scrollX = window.scrollX || window.pageXOffset;

        let top = rect.top + scrollY - el.offsetHeight - 10;
        let left = rect.left + scrollX + rect.width / 2 - el.offsetWidth / 2;

        // Prevent toolbar from going off-screen horizontally
        const maxLeft = window.innerWidth - el.offsetWidth - 20;
        if (left < 10) left = 10;
        if (left > maxLeft) left = maxLeft;

        // If toolbar would be above viewport, show it below the selection
        if (rect.top - el.offsetHeight - 10 < 0) {
          top = rect.bottom + scrollY + 10;
        }

        setPosition({ top, left });
      } catch (error) {
        console.error('Error positioning toolbar:', error);
      }
    };

    // Update position immediately
    updatePosition();

    // Update position on scroll and resize
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [visible]);

  const applyFormat = useCallback((command: string, value?: string) => {
    restoreSelection();
    document.execCommand(command, false, value);
    // Re-save selection after applying format
    saveSelection();
  }, [restoreSelection, saveSelection]);

  const isFormatActive = (command: string): boolean => {
    return document.queryCommandState(command);
  };

  const applyColor = useCallback((color: string) => {
    restoreSelection();
    document.execCommand('foreColor', false, color);
    saveSelection();
    setShowColorPicker(false);
  }, [restoreSelection, saveSelection]);

  const applyFontSize = useCallback((size: string) => {
    restoreSelection();
    document.execCommand('fontSize', false, size);
    saveSelection();
    setShowFontSize(false);
  }, [restoreSelection, saveSelection]);

  const applyLink = useCallback(() => {
    if (linkUrl) {
      restoreSelection();
      document.execCommand('createLink', false, linkUrl);
      saveSelection();
      setLinkUrl('');
      setShowLinkInput(false);
    }
  }, [linkUrl, restoreSelection, saveSelection]);

  // Handle alignment - needs to work on the parent element
  const applyAlignment = useCallback((alignment: 'left' | 'center' | 'right') => {
    restoreSelection();
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      let element = range.commonAncestorContainer as HTMLElement;

      // Get the actual element if it's a text node
      if (element.nodeType === Node.TEXT_NODE) {
        element = element.parentElement as HTMLElement;
      }

      // Find the contentEditable parent or a block-level element
      const editableParent = element.closest('[contenteditable="true"]') ||
        element.closest('[data-eid]') ||
        element;

      if (editableParent && editableParent instanceof HTMLElement) {
        editableParent.style.textAlign = alignment;
      }
    }
    saveSelection();
  }, [restoreSelection, saveSelection]);

  if (!visible) return null;

  const colors = [
    '#000000', '#374151', '#6B7280', '#9CA3AF', '#FFFFFF',
    '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6',
    '#EC4899', '#14B8A6', '#F97316', '#84CC16', '#06B6D4'
  ];

  const fontSizes = [
    { label: 'Small', value: '1' },
    { label: 'Normal', value: '3' },
    { label: 'Large', value: '5' },
    { label: 'Huge', value: '7' }
  ];

  return (
    <div
      ref={ref}
      className="content-editable-toolbar absolute z-[9999] bg-slate-900 border border-slate-700 rounded-lg shadow-2xl px-2 py-2 flex items-center gap-1 pointer-events-auto"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        visibility: position.top === 0 && position.left === 0 ? 'hidden' : 'visible',
      }}
      onMouseDown={(e) => {
        // Prevent toolbar clicks from deselecting text
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {/* Bold */}
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          applyFormat('bold');
        }}
        className={`p-2 rounded hover:bg-slate-800 transition-colors ${isFormatActive('bold') ? 'bg-purple-600 text-white' : 'text-slate-300'
          }`}
        title="Bold (Ctrl+B)"
      >
        <Bold size={18} />
      </button>

      {/* Italic */}
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          applyFormat('italic');
        }}
        className={`p-2 rounded hover:bg-slate-800 transition-colors ${isFormatActive('italic') ? 'bg-purple-600 text-white' : 'text-slate-300'
          }`}
        title="Italic (Ctrl+I)"
      >
        <Italic size={18} />
      </button>

      {/* Underline */}
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          applyFormat('underline');
        }}
        className={`p-2 rounded hover:bg-slate-800 transition-colors ${isFormatActive('underline') ? 'bg-purple-600 text-white' : 'text-slate-300'
          }`}
        title="Underline (Ctrl+U)"
      >
        <Underline size={18} />
      </button>

      <div className="w-px h-6 bg-slate-700 mx-1"></div>

      {/* Text Color */}
      <div className="relative">
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            saveSelection(); // Save selection before opening dropdown
            setShowColorPicker(!showColorPicker);
            setShowFontSize(false);
            setShowLinkInput(false);
          }}
          className="p-2 rounded hover:bg-slate-800 transition-colors text-slate-300"
          title="Text Color"
        >
          <Palette size={18} />
        </button>
        {showColorPicker && (
          <div className="absolute top-full mt-2 bg-slate-800 border border-slate-700 rounded-lg p-2 shadow-xl grid grid-cols-5 gap-1 w-40">
            {colors.map((color) => (
              <button
                key={color}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  applyColor(color);
                }}
                className="w-6 h-6 rounded border-2 border-slate-600 hover:border-purple-500 transition-colors"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        )}
      </div>

      {/* Font Size */}
      <div className="relative">
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            saveSelection(); // Save selection before opening dropdown
            setShowFontSize(!showFontSize);
            setShowColorPicker(false);
            setShowLinkInput(false);
          }}
          className="p-2 rounded hover:bg-slate-800 transition-colors text-slate-300"
          title="Font Size"
        >
          <Type size={18} />
        </button>
        {showFontSize && (
          <div className="absolute top-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl min-w-[120px]">
            {fontSizes.map((size) => (
              <button
                key={size.value}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  applyFontSize(size.value);
                }}
                className="w-full px-4 py-2 text-left text-slate-300 hover:bg-slate-700 transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                {size.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Link */}
      <div className="relative">
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            saveSelection(); // Save selection before opening dropdown
            setShowLinkInput(!showLinkInput);
            setShowColorPicker(false);
            setShowFontSize(false);
          }}
          className="p-2 rounded hover:bg-slate-800 transition-colors text-slate-300"
          title="Add Link"
        >
          <Link2 size={18} />
        </button>
        {showLinkInput && (
          <div className="absolute top-full mt-2 bg-slate-800 border border-slate-700 rounded-lg p-3 shadow-xl min-w-[250px]">
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  applyLink();
                }
              }}
              placeholder="Enter URL..."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded text-slate-300 text-sm focus:outline-none focus:border-purple-500 mb-2"
            />
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                applyLink();
              }}
              className="w-full px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm font-medium transition-colors"
            >
              Apply Link
            </button>
          </div>
        )}
      </div>

      <div className="w-px h-6 bg-slate-700 mx-1"></div>

      {/* Align Left */}
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          applyAlignment('left');
        }}
        className="p-2 rounded hover:bg-slate-800 transition-colors text-slate-300"
        title="Align Left"
      >
        <AlignLeft size={18} />
      </button>

      {/* Align Center */}
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          applyAlignment('center');
        }}
        className="p-2 rounded hover:bg-slate-800 transition-colors text-slate-300"
        title="Align Center"
      >
        <AlignCenter size={18} />
      </button>

      {/* Align Right */}
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          applyAlignment('right');
        }}
        className="p-2 rounded hover:bg-slate-800 transition-colors text-slate-300"
        title="Align Right"
      >
        <AlignRight size={18} />
      </button>
    </div>
  );
};
