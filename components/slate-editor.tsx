'use client'

import React, { useCallback, useMemo, useState } from 'react'
import { createEditor, Descendant, Editor, Transforms, Range, Element as SlateElement } from 'slate'
import { Slate, Editable, withReact, ReactEditor, useSlate } from 'slate-react'
import { withHistory } from 'slate-history'
import { FloatingToolbar } from './floating-toolbar'

// Define custom types for Slate
type CustomElement = {
  type: 'paragraph' | 'heading-one' | 'heading-two' | 'block-quote' | 'link' | 'bulleted-list' | 'numbered-list' | 'list-item'
  url?: string
  align?: 'left' | 'center' | 'right'
  children: CustomText[]
}

type CustomText = {
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  code?: boolean
  color?: string
}

declare module 'slate' {
  interface CustomTypes {
    Editor: ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

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

// Enhanced editor with link support
const withLinks = (editor: Editor) => {
  const { insertData, insertText, isInline } = editor

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element)
  }

  editor.insertText = text => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = data => {
    const text = data.getData('text/plain')

    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor
}

const isUrl = (string: string) => {
  try {
    new URL(string)
    return true
  } catch {
    return false
  }
}

const wrapLink = (editor: Editor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const { selection } = editor
  const isCollapsed = selection && Range.isCollapsed(selection)
  const link: CustomElement = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}

const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  })
}

const isLinkActive = (editor: Editor) => {
  const [link] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  })
  return !!link
}

// Initial editor value
const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: 'Start typing to see the floating toolbar in action...' }],
  },
]

export function SlateEditor() {
  const editor = useMemo(() => withLinks(withHistory(withReact(createEditor()))), [])
  const [value, setValue] = useState<Descendant[]>(initialValue)

  const renderElement = useCallback((props: any) => {
    const style: React.CSSProperties = {}
    if (props.element.align) {
      style.textAlign = props.element.align
    }

    switch (props.element.type) {
      case 'block-quote':
        return (
          <blockquote 
            className="border-l-4 border-gray-300 pl-4 italic" 
            style={style}
            {...props.attributes}
          >
            {props.children}
          </blockquote>
        )
      case 'heading-one':
        return (
          <h1 
            className="text-3xl font-bold mb-4" 
            style={style}
            {...props.attributes}
          >
            {props.children}
          </h1>
        )
      case 'heading-two':
        return (
          <h2 
            className="text-2xl font-semibold mb-3" 
            style={style}
            {...props.attributes}
          >
            {props.children}
          </h2>
        )
      case 'link':
        return (
          <a
            {...props.attributes}
            href={props.element.url}
            className="text-blue-600 underline hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            {props.children}
          </a>
        )
      case 'bulleted-list':
        return (
          <ul 
            className="list-disc list-inside mb-2" 
            style={style}
            {...props.attributes}
          >
            {props.children}
          </ul>
        )
      case 'numbered-list':
        return (
          <ol 
            className="list-decimal list-inside mb-2" 
            style={style}
            {...props.attributes}
          >
            {props.children}
          </ol>
        )
      case 'list-item':
        return (
          <li 
            className="mb-1" 
            style={style}
            {...props.attributes}
          >
            {props.children}
          </li>
        )
      default:
        return (
          <p 
            className="mb-2" 
            style={style}
            {...props.attributes}
          >
            {props.children}
          </p>
        )
    }
  }, [])

  const renderLeaf = useCallback((props: any) => {
    let children = props.children
    const style: React.CSSProperties = {}

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
      children = <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{children}</code>
    }

    if (props.leaf.color) {
      style.color = props.leaf.color
    }

    return (
      <span {...props.attributes} style={style}>
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
            className="min-h-[400px] p-6 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Start typing..."
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