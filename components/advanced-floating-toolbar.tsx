'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useSlate, ReactEditor } from 'slate-react'
import { Editor, Range, Transforms, Element as SlateElement } from 'slate'
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
  Type,
  Link,
  Unlink,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Minus
} from 'lucide-react'

interface AdvancedFloatingToolbarProps {
  toggleMark: (editor: Editor, format: string) => void
  toggleBlock: (editor: Editor, format: string) => void
  isMarkActive: (editor: Editor, format: string) => boolean
  isBlockActive: (editor: Editor, format: string) => boolean
}

export function AdvancedFloatingToolbar({ 
  toggleMark, 
  toggleBlock, 
  isMarkActive, 
  isBlockActive 
}: AdvancedFloatingToolbarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const editor = useSlate()
  const [visible, setVisible] = useState(false)
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [showColorPicker, setShowColorPicker] = useState(false)

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
      setShowLinkInput(false)
      setShowColorPicker(false)
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
    const top = rect.top - editorRect.top - el.offsetHeight - 15
    const left = rect.left - editorRect.left + rect.width / 2 - el.offsetWidth / 2

    // Ensure toolbar stays within editor bounds
    const adjustedLeft = Math.max(10, Math.min(left, editorRect.width - el.offsetWidth - 10))

    el.style.opacity = '1'
    el.style.top = `${Math.max(10, top)}px`
    el.style.left = `${adjustedLeft}px`
    setVisible(true)
  })

  const insertLink = () => {
    if (!linkUrl) return
    
    const { selection } = editor
    if (!selection) return

    const isCollapsed = Range.isCollapsed(selection)
    const link = {
      type: 'link' as const,
      url: linkUrl,
      children: isCollapsed ? [{ text: linkUrl }] : [],
    }

    if (isCollapsed) {
      Transforms.insertNodes(editor, link)
    } else {
      Transforms.wrapNodes(editor, link, { split: true })
      Transforms.collapse(editor, { edge: 'end' })
    }

    setLinkUrl('')
    setShowLinkInput(false)
  }

  const removeLink = () => {
    Transforms.unwrapNodes(editor, {
      match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
  }

  const isLinkActive = () => {
    const [link] = Editor.nodes(editor, {
      match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
    })
    return !!link
  }

  const setTextColor = (color: string) => {
    Editor.addMark(editor, 'color', color)
    setShowColorPicker(false)
  }

  const setAlignment = (alignment: 'left' | 'center' | 'right') => {
    const newProperties = { align: alignment }
    Transforms.setNodes(editor, newProperties, {
      match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && Editor.isBlock(editor, n),
    })
  }

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
      className="absolute z-50 flex flex-col bg-white border border-gray-200 rounded-lg shadow-xl transition-opacity duration-200"
      onMouseDown={(e) => {
        // Prevent toolbar from losing focus when clicked
        e.preventDefault()
      }}
    >
      {/* Main toolbar */}
      <div className="flex items-center gap-1 p-2">
        {/* Text formatting */}
        <ToolbarButton
          active={isMarkActive(editor, 'bold')}
          onMouseDown={(e) => {
            e.preventDefault()
            toggleMark(editor, 'bold')
          }}
          icon={<Bold size={16} />}
          tooltip="Bold (Ctrl+B)"
        />
        
        <ToolbarButton
          active={isMarkActive(editor, 'italic')}
          onMouseDown={(e) => {
            e.preventDefault()
            toggleMark(editor, 'italic')
          }}
          icon={<Italic size={16} />}
          tooltip="Italic (Ctrl+I)"
        />
        
        <ToolbarButton
          active={isMarkActive(editor, 'underline')}
          onMouseDown={(e) => {
            e.preventDefault()
            toggleMark(editor, 'underline')
          }}
          icon={<Underline size={16} />}
          tooltip="Underline (Ctrl+U)"
        />
        
        <ToolbarButton
          active={isMarkActive(editor, 'code')}
          onMouseDown={(e) => {
            e.preventDefault()
            toggleMark(editor, 'code')
          }}
          icon={<Code size={16} />}
          tooltip="Code (Ctrl+`)"
        />

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Block formatting */}
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
          tooltip="Heading 1 (Ctrl+1)"
        />
        
        <ToolbarButton
          active={isBlockActive(editor, 'heading-two')}
          onMouseDown={(e) => {
            e.preventDefault()
            toggleBlock(editor, 'heading-two')
          }}
          icon={<Heading2 size={16} />}
          tooltip="Heading 2 (Ctrl+2)"
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

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Link controls */}
        <ToolbarButton
          active={showLinkInput}
          onMouseDown={(e) => {
            e.preventDefault()
            setShowLinkInput(!showLinkInput)
          }}
          icon={<Link size={16} />}
          tooltip="Add Link"
        />
        
        {isLinkActive() && (
          <ToolbarButton
            active={false}
            onMouseDown={(e) => {
              e.preventDefault()
              removeLink()
            }}
            icon={<Unlink size={16} />}
            tooltip="Remove Link"
          />
        )}

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Alignment */}
        <ToolbarButton
          active={false}
          onMouseDown={(e) => {
            e.preventDefault()
            setAlignment('left')
          }}
          icon={<AlignLeft size={16} />}
          tooltip="Align Left"
        />
        
        <ToolbarButton
          active={false}
          onMouseDown={(e) => {
            e.preventDefault()
            setAlignment('center')
          }}
          icon={<AlignCenter size={16} />}
          tooltip="Align Center"
        />
        
        <ToolbarButton
          active={false}
          onMouseDown={(e) => {
            e.preventDefault()
            setAlignment('right')
          }}
          icon={<AlignRight size={16} />}
          tooltip="Align Right"
        />

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Color picker */}
        <ToolbarButton
          active={showColorPicker}
          onMouseDown={(e) => {
            e.preventDefault()
            setShowColorPicker(!showColorPicker)
          }}
          icon={<Palette size={16} />}
          tooltip="Text Color"
        />
      </div>

      {/* Link input */}
      {showLinkInput && (
        <div className="border-t p-3 flex items-center gap-2">
          <input
            type="url"
            placeholder="Enter URL..."
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                insertLink()
              }
              if (e.key === 'Escape') {
                e.preventDefault()
                setShowLinkInput(false)
                setLinkUrl('')
              }
            }}
            autoFocus
          />
          <Button
            size="sm"
            onClick={insertLink}
            disabled={!linkUrl}
          >
            Apply
          </Button>
        </div>
      )}

      {/* Color picker */}
      {showColorPicker && (
        <div className="border-t p-3">
          <div className="grid grid-cols-8 gap-2">
            {[
              '#000000', '#374151', '#6B7280', '#9CA3AF',
              '#EF4444', '#F97316', '#EAB308', '#22C55E',
              '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899',
              '#14B8A6', '#F59E0B', '#84CC16', '#06B6D4'
            ].map((color) => (
              <button
                key={color}
                className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => setTextColor(color)}
                title={color}
              />
            ))}
          </div>
        </div>
      )}
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