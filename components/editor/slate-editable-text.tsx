'use client';

import { useCallback, useMemo } from 'react';
import { createEditor, Descendant, Editor } from 'slate';
import { Slate, Editable, withReact, RenderLeafProps, RenderElementProps } from 'slate-react';
import { withHistory } from 'slate-history';

interface SlateEditableTextProps {
  eid: string;
  defaultText: string;
  className?: string;
  style?: React.CSSProperties;
  editable?: boolean;
  onChange?: (eid: string, value: string) => void;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  let styledChildren = children;

  if (leaf.bold) {
    styledChildren = <strong>{styledChildren}</strong>;
  }

  if (leaf.italic) {
    styledChildren = <em>{styledChildren}</em>;
  }

  if (leaf.underline) {
    styledChildren = <u>{styledChildren}</u>;
  }

  if (leaf.strikethrough) {
    styledChildren = <s>{styledChildren}</s>;
  }

  if (leaf.highlight) {
    styledChildren = <mark className="bg-yellow-200">{styledChildren}</mark>;
  }

  if (leaf.color) {
    styledChildren = <span className="text-purple-600">{styledChildren}</span>;
  }

  return <span {...attributes}>{styledChildren}</span>;
};

const Element = ({ attributes, children, element }: RenderElementProps) => {
  const style: React.CSSProperties = {};

  if (element.align) {
    style.textAlign = element.align as 'left' | 'center' | 'right' | 'justify';
  }

  return (
    <div {...attributes} style={style}>
      {children}
    </div>
  );
};

export const SlateEditableText: React.FC<SlateEditableTextProps> = ({
  eid,
  defaultText,
  className = '',
  style,
  editable = false,
  onChange,
}) => {

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const initialValue: Descendant[] = useMemo(
    () => [
      {
        type: 'paragraph',
        children: [{ text: defaultText }],
      },
    ],
    [defaultText]
  );

  const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, []);
  const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, []);

  const handleChange = (value: Descendant[]) => {
    const isAstChange = editor.operations.some(
      (op) => op.type !== 'set_selection'
    );

    if (isAstChange && onChange) {
      // Extract plain text from Slate value
      const text = value
        .map((n: Descendant) => {
          if ('children' in n) {
            return n.children.map((c: Descendant) => ('text' in c ? c.text : '')).join('');
          }
          return '';
        })
        .join('\n');

      onChange(eid, text);
    }
  };



  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!event.ctrlKey && !event.metaKey) {
      return;
    }

    switch (event.key) {
      case 'b': {
        event.preventDefault();
        const isActive = Editor.marks(editor)?.bold;
        if (isActive) {
          Editor.removeMark(editor, 'bold');
        } else {
          Editor.addMark(editor, 'bold', true);
        }
        break;
      }
      case 'i': {
        event.preventDefault();
        const isActive = Editor.marks(editor)?.italic;
        if (isActive) {
          Editor.removeMark(editor, 'italic');
        } else {
          Editor.addMark(editor, 'italic', true);
        }
        break;
      }
      case 'u': {
        event.preventDefault();
        const isActive = Editor.marks(editor)?.underline;
        if (isActive) {
          Editor.removeMark(editor, 'underline');
        } else {
          Editor.addMark(editor, 'underline', true);
        }
        break;
      }
    }
  };

  if (!editable) {
    return (
      <div data-eid={eid} className={className} style={style}>
        {defaultText}
      </div>
    );
  }

  return (
    <div data-eid={eid} className={className} style={style}>
      <Slate editor={editor} initialValue={initialValue} onChange={handleChange}>
        <Editable
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          onKeyDown={handleKeyDown}
          placeholder="Enter text..."
          className="outline-none focus:outline-none"
        />
      </Slate>
    </div>
  );
};
