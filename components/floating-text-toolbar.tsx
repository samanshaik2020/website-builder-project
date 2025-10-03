'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { 
  Bold, 
  Italic, 
  Underline, 
  Type,
  Link as LinkIcon,
  Unlink,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react'

interface FloatingTextToolbarProps {
  active: boolean
}

export function FloatingTextToolbar({ active }: FloatingTextToolbarProps) {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)
  const [fontSize, setFontSize] = useState('')
  const [textColor, setTextColor] = useState('')
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [mounted, setMounted] = useState(false)
  const toolbarRef = useRef<HTMLDivElement>(null)
  const isPositioningRef = useRef(false)

  // Position the toolbar relative to the target element
  const positionToolbar = (element: HTMLElement) => {
    if (!toolbarRef.current || isPositioningRef.current) return
    
    isPositioningRef.current = true
    
    requestAnimationFrame(() => {
      if (!toolbarRef.current) {
        isPositioningRef.current = false
        return
      }

      // Get element position relative to viewport (perfect for fixed positioning)
      const rect = element.getBoundingClientRect()
      const toolbarRect = toolbarRef.current.getBoundingClientRect()
      const toolbarHeight = toolbarRect.height || 70
      const toolbarWidth = toolbarRect.width || 520
      
      const spaceAbove = rect.top
      const spaceBelow = window.innerHeight - rect.bottom
      
      let top: number
      if (spaceAbove >= toolbarHeight + 15) {
        // Position above the element - use viewport coordinates (no scrollY needed for fixed position)
        top = rect.top - toolbarHeight - 10
      } else if (spaceBelow >= toolbarHeight + 15) {
        // Position below the element
        top = rect.bottom + 10
      } else {
        // Fallback: position at top of viewport with small padding
        top = 10
      }

      // Center horizontally relative to element - use viewport coordinates (no scrollX needed)
      let left = rect.left + (rect.width / 2) - (toolbarWidth / 2)
      
      // Keep toolbar within viewport bounds
      const padding = 15
      left = Math.max(padding, Math.min(left, window.innerWidth - toolbarWidth - padding))

      console.log('📍 Position calculated:', { 
        elementTop: rect.top, 
        elementLeft: rect.left,
        toolbarTop: top, 
        toolbarLeft: left,
        elementHeight: rect.height,
        toolbarHeight 
      })

      setPosition({ top, left })
      isPositioningRef.current = false
    })
  }

  useEffect(() => {
    if (!active) {
      setVisible(false)
      setTargetElement(null)
      return
    }

    console.log('📌 FloatingTextToolbar mounted, active:', active)
    
    // Log all editable elements on mount
    setTimeout(() => {
      const allEditableElements = document.querySelectorAll('[data-eid]')
      console.log('📋 Found', allEditableElements.length, 'elements with [data-eid]')
      allEditableElements.forEach((el) => {
        const htmlEl = el as HTMLElement
        console.log('  -', htmlEl.getAttribute('data-eid'), '| Tag:', htmlEl.tagName, '| contentEditable:', htmlEl.isContentEditable)
      })
    }, 500)

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      console.log('🖱️ Click detected - target:', target.tagName, 'data-eid:', target.getAttribute('data-eid'))
      
      // Ignore clicks on toolbar
      if (toolbarRef.current?.contains(target)) {
        console.log('⏭️ Click on toolbar itself, ignoring')
        return
      }

      // Find editable element with data-eid OR contenteditable OR role=textbox
      let editableEl = target.closest('[data-eid][contenteditable="true"]') as HTMLElement
      
      // Fallback: try to find any element with data-eid that has role=textbox
      if (!editableEl) {
        editableEl = target.closest('[data-eid][role="textbox"]') as HTMLElement
      }
      
      // Fallback: try to find any contenteditable element
      if (!editableEl) {
        editableEl = target.closest('[contenteditable="true"]') as HTMLElement
      }
      
      if (!editableEl) {
        // Clicked outside - close toolbar
        console.log('❌ No editable element found, closing toolbar')
        setVisible(false)
        setTargetElement(null)
        return
      }

      console.log('🎯 Found element:', editableEl.getAttribute('data-eid'), 'Tag:', editableEl.tagName, 'contentEditable:', editableEl.isContentEditable)

      // Skip non-text elements (images, links, buttons)
      if (editableEl.tagName === 'IMG') {
        console.log('⏭️ Skipping image element')
        return
      }
      
      // Skip anchor tags (EditableButton components)
      if (editableEl.tagName === 'A' && editableEl.hasAttribute('href')) {
        console.log('⏭️ Skipping button/link element')
        return
      }

      // Must be contentEditable or have role=textbox
      if (!editableEl.isContentEditable && editableEl.getAttribute('role') !== 'textbox') {
        console.log('⚠️ Element not editable:', editableEl.contentEditable, 'role:', editableEl.getAttribute('role'))
        return
      }

      // Show toolbar
      console.log('✅ SHOWING TOOLBAR for:', editableEl.getAttribute('data-eid'), 'Setting visible=true')
      setTargetElement(editableEl)
      setVisible(true)

      // Get current styles
      const styles = window.getComputedStyle(editableEl)
      setFontSize(styles.fontSize.replace('px', ''))
      setTextColor(styles.color)

      // Position toolbar
      setTimeout(() => {
        console.log('📍 Positioning toolbar for:', editableEl.getAttribute('data-eid'))
        positionToolbar(editableEl)
      }, 0)
    }

    // CRITICAL: Use capture phase (true) to catch BEFORE stopPropagation
    document.addEventListener('click', handleClick, true)

    return () => {
      console.log('🧹 Cleaning up toolbar listener')
      document.removeEventListener('click', handleClick, true)
    }
  }, [active])

  // Reposition on scroll/resize
  useEffect(() => {
    if (!visible || !targetElement) return

    const handleUpdate = () => {
      if (targetElement) positionToolbar(targetElement)
    }

    window.addEventListener('scroll', handleUpdate, true)
    window.addEventListener('resize', handleUpdate)

    return () => {
      window.removeEventListener('scroll', handleUpdate, true)
      window.removeEventListener('resize', handleUpdate)
    }
  }, [visible, targetElement])

  const execCommand = (command: string, value?: string) => {
    if (!targetElement) return
    document.execCommand(command, false, value)
  }

  const setAlignment = (align: string) => {
    if (!targetElement) return
    targetElement.style.textAlign = align
  }

  const updateFontSize = (size: string) => {
    if (!targetElement) return
    setFontSize(size)
    targetElement.style.fontSize = size ? `${size}px` : ''
  }

  const updateColor = (color: string) => {
    if (!targetElement) return
    setTextColor(color)
    targetElement.style.color = color
    setShowColorPicker(false)
  }

  const applyLink = () => {
    if (!linkUrl || !targetElement) return
    execCommand('createLink', linkUrl)
    setShowLinkInput(false)
    setLinkUrl('')
  }

  // Ensure we're mounted on the client before rendering portal
  useEffect(() => {
    setMounted(true)
  }, [])

  console.log('🎨 RENDER - visible:', visible, 'position:', position, 'targetElement:', targetElement?.getAttribute('data-eid'))

  if (!visible || !mounted) {
    console.log('❌ Not rendering toolbar (visible=false or not mounted)')
    return null
  }

  console.log('✅ RENDERING TOOLBAR DIV at position:', position)

  // Render the toolbar as a portal directly to document.body
  // This bypasses all parent stacking contexts and overflow issues
  const toolbarUI = (
    <div
      ref={toolbarRef}
      className="fixed z-[99999] flex flex-col bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-slate-600 rounded-xl shadow-2xl"
      style={{ 
        top: position.top, 
        left: position.left,
        minWidth: '520px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)'
      }}
      onMouseDown={(e) => e.preventDefault()}
    >
      {/* Main toolbar */}
      <div className="flex items-center gap-1 p-2">
        {/* Bold */}
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          onMouseDown={(e) => {
            e.preventDefault()
            execCommand('bold')
          }}
          title="Bold (Ctrl+B)"
        >
          <Bold size={16} />
        </Button>

        {/* Italic */}
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          onMouseDown={(e) => {
            e.preventDefault()
            execCommand('italic')
          }}
          title="Italic (Ctrl+I)"
        >
          <Italic size={16} />
        </Button>

        {/* Underline */}
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          onMouseDown={(e) => {
            e.preventDefault()
            execCommand('underline')
          }}
          title="Underline (Ctrl+U)"
        >
          <Underline size={16} />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1 bg-slate-600" />

        {/* Link */}
        <Button
          variant="ghost"
          size="sm"
          className={`h-9 w-9 p-0 transition-colors ${
            showLinkInput 
              ? 'bg-blue-500 text-white' 
              : 'text-slate-300 hover:bg-slate-700 hover:text-white'
          }`}
          onMouseDown={(e) => {
            e.preventDefault()
            setShowLinkInput(!showLinkInput)
            setShowColorPicker(false)
          }}
          title="Add Link"
        >
          <LinkIcon size={16} />
        </Button>

        {/* Unlink */}
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          onMouseDown={(e) => {
            e.preventDefault()
            execCommand('unlink')
          }}
          title="Remove Link"
        >
          <Unlink size={16} />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1 bg-slate-600" />

        {/* Align Left */}
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          onMouseDown={(e) => {
            e.preventDefault()
            setAlignment('left')
          }}
          title="Align Left"
        >
          <AlignLeft size={16} />
        </Button>

        {/* Align Center */}
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          onMouseDown={(e) => {
            e.preventDefault()
            setAlignment('center')
          }}
          title="Align Center"
        >
          <AlignCenter size={16} />
        </Button>

        {/* Align Right */}
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
          onMouseDown={(e) => {
            e.preventDefault()
            setAlignment('right')
          }}
          title="Align Right"
        >
          <AlignRight size={16} />
        </Button>

        <Separator orientation="vertical" className="h-6 mx-1 bg-slate-600" />

        {/* Font Size */}
        <div className="flex items-center gap-1">
          <Type size={16} className="text-slate-300" />
          <select
            value={fontSize}
            onChange={(e) => updateFontSize(e.target.value)}
            className="h-8 rounded-md border border-slate-500 bg-slate-700 text-slate-200 px-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Auto</option>
            <option value="12">12px</option>
            <option value="14">14px</option>
            <option value="16">16px</option>
            <option value="18">18px</option>
            <option value="20">20px</option>
            <option value="24">24px</option>
            <option value="32">32px</option>
            <option value="40">40px</option>
            <option value="48">48px</option>
          </select>
        </div>

        <Separator orientation="vertical" className="h-6 mx-1 bg-slate-600" />

        {/* Color Picker */}
        <Button
          variant="ghost"
          size="sm"
          className={`h-9 w-9 p-0 transition-colors ${
            showColorPicker 
              ? 'bg-blue-500 text-white' 
              : 'text-slate-300 hover:bg-slate-700 hover:text-white'
          }`}
          onMouseDown={(e) => {
            e.preventDefault()
            setShowColorPicker(!showColorPicker)
            setShowLinkInput(false)
          }}
          title="Text Color"
        >
          <Palette size={16} />
        </Button>
      </div>

      {/* Link Input */}
      {showLinkInput && (
        <div className="border-t border-slate-600 bg-slate-800 p-3 flex items-center gap-2">
          <input
            type="url"
            placeholder="Enter URL (e.g., https://example.com)"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="flex-1 px-3 py-2 text-sm border border-slate-500 rounded-md bg-slate-700 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                applyLink()
              }
              if (e.key === 'Escape') {
                setShowLinkInput(false)
                setLinkUrl('')
              }
            }}
            autoFocus
          />
          <Button
            size="sm"
            onClick={applyLink}
            disabled={!linkUrl}
            className="bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
          >
            Apply
          </Button>
        </div>
      )}

      {/* Color Picker */}
      {showColorPicker && (
        <div className="border-t border-slate-600 bg-slate-800 p-3">
          <div className="grid grid-cols-8 gap-2">
            {[
              '#000000', '#374151', '#6B7280', '#9CA3AF',
              '#EF4444', '#F97316', '#EAB308', '#22C55E',
              '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899',
              '#14B8A6', '#F59E0B', '#84CC16', '#06B6D4'
            ].map((color) => (
              <button
                key={color}
                className="w-8 h-8 rounded-lg border-2 border-slate-500 hover:scale-110 hover:border-slate-300 transition-all duration-150 shadow-lg"
                style={{ backgroundColor: color }}
                onClick={() => updateColor(color)}
                title={color}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )

  // Use createPortal to render directly to document.body
  // This ensures the toolbar is never affected by parent z-index, transform, or overflow properties
  return createPortal(toolbarUI, document.body)
}
