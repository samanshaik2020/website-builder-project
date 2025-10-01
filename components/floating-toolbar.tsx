'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useSlate, ReactEditor } from 'slate-react'
import { Editor, Range } from 'slate'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { 
  Bold, 
  Italic, 
  Underline, 
  Code, 
  Heading1, 
  Heading2, 
  Quote,
  Type
} from 'lucide-react'

interface FloatingToolbarProps {
  toggleMark: (editor: Editor, format: string) => void
  toggleBlock: (editor: Editor, format: string) => void
  isMarkActive: (editor: Editor, format: string) => boolean
  isBlockActive: (editor: Editor, format: string) => boolean
}

export function FloatingToolbar({ 
  toggleMark, 
  toggleBlock, 
  isMarkActive, 
  isBlockActive 
}: FloatingToolbarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const editor = useSlate()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    const { selection } = editor

    if (!el) {
      return
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style')
      setVisible(false)
      return
    }

    const domSelection = window.getSelection()
    if (!domSelection || domSelection.rangeCount === 0) {
      return
    }

    const domRange = domSelection.getRangeAt(0)
    const rect = domRange.getBoundingClientRect()
    
    if (rect.width === 0 && rect.height === 0) {
      return
    }

    const editorEl = ReactEditor.toDOMNode(editor, editor)
    const editorRect = editorEl.getBoundingClientRect()

    // Position the toolbar above the selection
    const top = rect.top - editorRect.top - el.offsetHeight - 10
    const left = rect.left - editorRect.left + rect.width / 2 - el.offsetWidth / 2

    // Ensure toolbar stays within editor bounds
    const adjustedLeft = Math.max(10, Math.min(left, editorRect.width - el.offsetWidth - 10))

    el.style.opacity = '1'
    el.style.top = `${Math.max(10, top)}px`
    el.style.left = `${adjustedLeft}px`
    setVisible(true)
  })

  if (!visible) {
    return (
      <div
        ref={ref}
        className="absolute z-50 opacity-0 transition-opacity duration-200"
        style={{ top: '-1000px', left: '-1000px' }}
      />
    )
  }

  return (
    <div
      ref={ref}
      className="absolute z-50 flex items-center gap-1 bg-white border border-gray-200 rounded-lg shadow-lg p-2 transition-opacity duration-200"
      onMouseDown={(e) => {
        // Prevent toolbar from losing focus when clicked
        e.preventDefault()
      }}
    >
      {/* Text formatting buttons */}
      <ToolbarButton
        active={isMarkActive(editor, 'bold')}
        onMouseDown={(e) => {
          e.preventDefault()
          toggleMark(editor, 'bold')
        }}
        icon={<Bold size={16} />}
        tooltip="Bold"
      />
      
      <ToolbarButton
        active={isMarkActive(editor, 'italic')}
        onMouseDown={(e) => {
          e.preventDefault()
          toggleMark(editor, 'italic')
        }}
        icon={<Italic size={16} />}
        tooltip="Italic"
      />
      
      <ToolbarButton
        active={isMarkActive(editor, 'underline')}
        onMouseDown={(e) => {
          e.preventDefault()
          toggleMark(editor, 'underline')
        }}
        icon={<Underline size={16} />}
        tooltip="Underline"
      />
      
      <ToolbarButton
        active={isMarkActive(editor, 'code')}
        onMouseDown={(e) => {
          e.preventDefault()
          toggleMark(editor, 'code')
        }}
        icon={<Code size={16} />}
        tooltip="Code"
      />

      <Separator orientation="vertical" className="h-6 mx-1" />

      {/* Block formatting buttons */}
      <ToolbarButton
        active={isBlockActive(editor, 'paragraph')}
        onMouseDown={(e) => {
          e.preventDefault()
          toggleBlock(editor, 'paragraph')
        }}
        icon={<Type size={16} />}
        tooltip="Paragraph"
      />
      
      <ToolbarButton
        active={isBlockActive(editor, 'heading-one')}
        onMouseDown={(e) => {
          e.preventDefault()
          toggleBlock(editor, 'heading-one')
        }}
        icon={<Heading1 size={16} />}
        tooltip="Heading 1"
      />
      
      <ToolbarButton
        active={isBlockActive(editor, 'heading-two')}
        onMouseDown={(e) => {
          e.preventDefault()
          toggleBlock(editor, 'heading-two')
        }}
        icon={<Heading2 size={16} />}
        tooltip="Heading 2"
      />
      
      <ToolbarButton
        active={isBlockActive(editor, 'block-quote')}
        onMouseDown={(e) => {
          e.preventDefault()
          toggleBlock(editor, 'block-quote')
        }}
        icon={<Quote size={16} />}
        tooltip="Quote"
      />
    </div>
  )
}

interface ToolbarButtonProps {
  active: boolean
  onMouseDown: (e: React.MouseEvent) => void
  icon: React.ReactNode
  tooltip: string
}

function ToolbarButton({ active, onMouseDown, icon, tooltip }: ToolbarButtonProps) {
  return (
    <Button
      variant={active ? "default" : "ghost"}
      size="sm"
      className={`h-8 w-8 p-0 ${active ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
      onMouseDown={onMouseDown}
      title={tooltip}
    >
      {icon}
    </Button>
  )
}