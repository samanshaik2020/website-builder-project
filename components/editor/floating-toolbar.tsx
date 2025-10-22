'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Editor, Transforms, Element } from 'slate';
import { useSlate } from 'slate-react';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface FloatingToolbarProps {
  visible: boolean;
}

export const FloatingToolbar: React.FC<FloatingToolbarProps> = ({ visible }) => {
  const ref = useRef<HTMLDivElement>(null);
  const editor = useSlate();
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el || !selection || !visible) {
      return;
    }

    try {
      const domSelection = window.getSelection();
      if (!domSelection || domSelection.rangeCount === 0) return;

      const domRange = domSelection.getRangeAt(0);
      const rect = domRange.getBoundingClientRect();

      setPosition({
        top: rect.top + window.pageYOffset - el.offsetHeight - 10,
        left: rect.left + window.pageXOffset + rect.width / 2 - el.offsetWidth / 2,
      });
    } catch (error) {
      console.error('Error positioning toolbar:', error);
    }
  }, [editor, visible]);

  const isMarkActive = (format: string) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format as keyof typeof marks] === true : false;
  };

  const toggleMark = (format: string) => {
    const isActive = isMarkActive(format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  const setAlignment = (align: string) => {
    Transforms.setNodes(
      editor,
      { align } as Partial<Element>,
      { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  };

  if (!visible) return null;

  return (
    <div
      ref={ref}
      className="fixed z-50 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl px-2 py-2 flex items-center gap-1"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    >
      {/* Bold */}
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark('bold');
        }}
        className={`p-2 rounded hover:bg-slate-800 transition-colors ${
          isMarkActive('bold') ? 'bg-purple-600 text-white' : 'text-slate-300'
        }`}
        title="Bold (Ctrl+B)"
      >
        <Bold size={18} />
      </button>

      {/* Italic */}
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark('italic');
        }}
        className={`p-2 rounded hover:bg-slate-800 transition-colors ${
          isMarkActive('italic') ? 'bg-purple-600 text-white' : 'text-slate-300'
        }`}
        title="Italic (Ctrl+I)"
      >
        <Italic size={18} />
      </button>

      {/* Underline */}
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark('underline');
        }}
        className={`p-2 rounded hover:bg-slate-800 transition-colors ${
          isMarkActive('underline') ? 'bg-purple-600 text-white' : 'text-slate-300'
        }`}
        title="Underline (Ctrl+U)"
      >
        <Underline size={18} />
      </button>

      <div className="w-px h-6 bg-slate-700 mx-1"></div>

      {/* Align Left */}
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          setAlignment('left');
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
          setAlignment('center');
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
          setAlignment('right');
        }}
        className="p-2 rounded hover:bg-slate-800 transition-colors text-slate-300"
        title="Align Right"
      >
        <AlignRight size={18} />
      </button>
    </div>
  );
};
