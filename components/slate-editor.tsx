'use client'

import React, { useCallback, useMemo, useState } from 'react'
import { createEditor, Descendant, Editor, Transforms, Element as SlateElement } from 'slate'
import { Slate, Editable, withReact, ReactEditor, RenderElementProps, RenderLeafProps } from 'slate-react'
import { withHistory } from 'slate-history'
import { FloatingToolbar } from './floating-toolbar'

// Helper functions for formatting
const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format as keyof typeof marks] === true : false
}

const toggleMark = (editor: Editor, format: string) => {
  const isActive = isMarkActive(editor, format)
  
  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor: Editor, format: string) => {
  const { selection } = editor
  if (!selection) return false

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    })
  )

  return !!match
}

const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(editor, format)
  const newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : (format as any),
  }
  Transforms.setNodes<SlateElement>(editor, newProperties)
}

// Initial editor value
const initialValue: Descendant[] = [
  {
    type: 'heading-one',
    children: [{ text: 'Basic Slate.js Editor' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'This is a basic rich text editor built with ' },
      { text: 'Slate.js', bold: true },
      { text: '. Select any text to see the floating toolbar with formatting options.' }
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'You can format text as ' },
      { text: 'bold', bold: true },
      { text: ', ' },
      { text: 'italic', italic: true },
      { text: ', ' },
      { text: 'underline', underline: true },
      { text: ', or ' },
      { text: 'code', code: true },
      { text: '.' }
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'You can also create different block types like headings and quotes.' }
    ],
  },
  {
    type: 'block-quote',
    children: [
      { text: 'This is a block quote. Select this text and use the toolbar to change it back to a paragraph.' }
    ],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Try using keyboard shortcuts: Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline!' }
    ],
  },
]

export function SlateEditor() {
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const [value, setValue] = useState<Descendant[]>(initialValue)

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case 'block-quote':
        return (
          <blockquote 
            className="border-l-4 border-gray-400 pl-4 italic my-4 text-gray-600" 
            {...props.attributes}
          >
            {props.children}
          </blockquote>
        )
      case 'heading-one':
        return (
          <h1 
            className="text-3xl font-bold mb-4 text-gray-900" 
            {...props.attributes}
          >
            {props.children}
          </h1>
        )
      case 'heading-two':
        return (
          <h2 
            className="text-2xl font-semibold mb-3 text-gray-800" 
            {...props.attributes}
          >
            {props.children}
          </h2>
        )
      default:
        return (
          <p 
            className="mb-2 leading-relaxed" 
            {...props.attributes}
          >
            {props.children}
          </p>
        )
    }
  }, [])

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    let children = props.children

    if (props.leaf.bold) {
      children = <strong>{children}</strong>
    }

    if (props.leaf.italic) {
      children = <em>{children}</em>
    }

    if (props.leaf.underline) {
      children = <u>{children}</u>
    }

    if (props.leaf.code) {
      children = (
        <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-red-600">
          {children}
        </code>
      )
    }

    return (
      <span {...props.attributes}>
        {children}
      </span>
    )
  }, [])

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (!event.ctrlKey && !event.metaKey) {
      return
    }

    switch (event.key) {
      case 'b': {
        event.preventDefault()
        toggleMark(editor, 'bold')
        break
      }
      case 'i': {
        event.preventDefault()
        toggleMark(editor, 'italic')
        break
      }
      case 'u': {
        event.preventDefault()
        toggleMark(editor, 'underline')
        break
      }
      case '`': {
        event.preventDefault()
        toggleMark(editor, 'code')
        break
      }
      case '1': {
        event.preventDefault()
        toggleBlock(editor, 'heading-one')
        break
      }
      case '2': {
        event.preventDefault()
        toggleBlock(editor, 'heading-two')
        break
      }
    }
  }, [editor])

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <Slate editor={editor} initialValue={value} onChange={setValue}>
        <div className="relative">
          <Editable
            className="min-h-[400px] p-6 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Start typing your content here..."
            spellCheck
            autoFocus
            onKeyDown={handleKeyDown}
          />
          <FloatingToolbar 
            toggleMark={toggleMark}
            toggleBlock={toggleBlock}
            isMarkActive={isMarkActive}
            isBlockActive={isBlockActive}
          />
        </div>
      </Slate>
    </div>
  )
}