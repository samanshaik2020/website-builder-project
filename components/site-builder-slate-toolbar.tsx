'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { createEditor, Descendant, Editor, Transforms, Range, Element as SlateElement } from 'slate'
import { Slate, Editable, withReact, ReactEditor } from 'slate-react'
import { withHistory } from 'slate-history'
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
  Link as LinkIcon,
  Unlink,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react'

// Define custom types for Slate
type CustomElement = {
  type: 'paragraph' | 'heading-one' | 'heading-two' | 'block-quote' | 'link'
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

interface SiteBuilderSlateToolbarProps {
  active: boolean
}

export function SiteBuilderSlateToolbar({ active }: SiteBuilderSlateToolbarProps) {
  const [visible, setVisible] = useState(false)
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 })
  const [target, setTarget] = useState<HTMLElement | null>(null)
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkValue, setLinkValue] = useState("")
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [fontSize, setFontSize] = useState<string>("")
  const [color, setColor] = useState<string>("")
  const toolbarRef = useRef<HTMLDivElement>(null)

  // Direct element targeting for better reliability
  const isEditableTextElement = useCallback((el: HTMLElement | null): boolean => {
    if (!el) return false
    
    // Exclude buttons, links, images, and interactive elements
    if (el.tagName === 'A' || 
        el.tagName === 'BUTTON' ||
        el.tagName === 'IMG' ||
        el.getAttribute('role') === 'button' || 
        el.closest('button, a, img, [role="button"], input[type="button"], input[type="submit"]')) {
      return false
    }
    
    // Check if it's a template text element with data-eid
    if (el.hasAttribute('data-eid') || el.closest('[data-eid]')) {
      return el.isContentEditable
    }
    
    return false
  }, [])

  const positionForEl = useCallback((el: HTMLElement) => {
    const rect = el.getBoundingClientRect()
    const toolbarHeight = toolbarRef.current?.offsetHeight || 60
    const toolbarWidth = toolbarRef.current?.offsetWidth || 500
    
    // Always position above the element
    let top = rect.top + window.scrollY - toolbarHeight - 15
    
    // Only if there's absolutely no space at the top (less than toolbar height + 30px), position below
    if (top < window.scrollY + 30) {
      top = rect.bottom + window.scrollY + 15
    }
    
    // Center horizontally but ensure it stays on screen
    let left = rect.left + window.scrollX + (rect.width / 2) - (toolbarWidth / 2)
    
    // Keep toolbar within viewport bounds with padding
    const padding = 20
    const maxLeft = window.innerWidth - toolbarWidth - padding
    const minLeft = padding
    left = Math.max(minLeft, Math.min(maxLeft, left))
    
    setPos({ top, left })
  }, [])

  useEffect(() => {
    if (!active) {
      setVisible(false)
      setTarget(null)
      return
    }

    // Direct approach: Find and attach handlers to all editable elements
    const attachToEditableElements = () => {
      console.log('Attaching toolbar to editable elements');
      
      // Find all template elements with data-eid
      const templateElements = document.querySelectorAll('[data-eid]');
      console.log(`Found ${templateElements.length} template elements`);
      
      templateElements.forEach(el => {
        const element = el as HTMLElement;
        
        // Skip buttons, links, and images
        if (element.tagName === 'A' || 
            element.tagName === 'BUTTON' ||
            element.tagName === 'IMG' ||
            element.getAttribute('role') === 'button' || 
            element.closest('button, a, [role="button"], img')) {
          return;
        }
        
        // Add click handler
        element.addEventListener('click', (e) => {
          e.stopPropagation();
          console.log('Template element clicked', element);
          
          // Only show toolbar if element is contentEditable
          if (element.isContentEditable) {
            console.log('Element is contentEditable, showing toolbar');
            setTarget(element);
            const cs = window.getComputedStyle(element);
            setFontSize(cs.fontSize.replace("px", "") || "");
            setColor(cs.color || "");
            
            positionForEl(element);
            setVisible(true);
          } else {
            console.log('Element is not contentEditable', element);
          }
        });
      });
    };
    
    // Run initial attachment after a delay to ensure templates are rendered
    setTimeout(attachToEditableElements, 500);
    
    // Re-attach on DOM changes
    const observer = new MutationObserver((mutations) => {
      let shouldReattach = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' || 
            (mutation.type === 'attributes' && 
             (mutation.attributeName === 'contenteditable' || 
              mutation.attributeName === 'data-eid'))) {
          shouldReattach = true;
        }
      });
      
      if (shouldReattach) {
        setTimeout(attachToEditableElements, 100);
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      attributes: true,
      attributeFilter: ['contenteditable', 'data-eid'],
      subtree: true
    });
    
    // Handle clicks outside toolbar to close it
    const onDocumentClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const toolbar = toolbarRef.current;
      
      if (!toolbar) return;
      
      const clickedInsideToolbar = toolbar.contains(el);
      const clickedTarget = target && (el === target || target.contains(el));
      
      if (!clickedInsideToolbar && !clickedTarget) {
        setVisible(false);
        setTarget(null);
        setShowLinkInput(false);
        setShowColorPicker(false);
      }
    };
    
    // Handle scroll and resize events
    const onScrollOrResize = () => {
      if (target) positionForEl(target);
    };
    
    document.addEventListener('click', onDocumentClick, true);
    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize, true);
    
    return () => {
      document.removeEventListener('click', onDocumentClick, true);
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize, true);
      observer.disconnect();
    };
  }, [active, positionForEl, target])

  const exec = (cmd: string, value?: string) => {
    if (!target) return
    try {
      document.execCommand(cmd, false, value)
    } catch {}
    positionForEl(target)
  }

  const setAlign = (align: "left" | "center" | "right") => {
    if (!target) return
    target.style.textAlign = align
    positionForEl(target)
  }

  const onFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!target) return
    const v = e.target.value
    setFontSize(v)
    target.style.fontSize = v ? `${v}px` : ""
    positionForEl(target)
  }

  const onColorChange = (color: string) => {
    if (!target) return
    setColor(color)
    target.style.color = color
    setShowColorPicker(false)
    positionForEl(target)
  }

  const applyLink = () => {
    if (!linkValue || !target) return
    exec("createLink", linkValue)
    setShowLinkInput(false)
    setLinkValue("")
  }

  const removeLink = () => {
    if (!target) return
    exec("unlink")
  }

  const isLinkActive = () => {
    if (!target) return false
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return false
    
    const range = selection.getRangeAt(0)
    const container = range.commonAncestorContainer
    const element = container.nodeType === Node.TEXT_NODE ? container.parentElement : container as Element
    return element?.closest('a') !== null
  }

  if (!visible || !target) return null

  return (
    <div
      ref={toolbarRef}
      className="fixed z-[99999] flex flex-col bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-slate-600 rounded-xl shadow-2xl transition-all duration-200"
      style={{ 
        top: pos.top, 
        left: pos.left,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 0 20px rgba(59, 130, 246, 0.3)',
        minWidth: '500px'
      }}
      onMouseDown={(e) => {
        // Prevent toolbar from losing focus when clicked
        e.preventDefault()
      }}
    >
      {/* Main toolbar */}
      <div className="flex items-center gap-1 p-2">
        {/* Text formatting */}
        <ToolbarButton
          onMouseDown={(e) => {
            e.preventDefault()
            exec("bold")
          }}
          icon={<Bold size={16} />}
          tooltip="Bold (Ctrl+B)"
        />
        
        <ToolbarButton
          onMouseDown={(e) => {
            e.preventDefault()
            exec("italic")
          }}
          icon={<Italic size={16} />}
          tooltip="Italic (Ctrl+I)"
        />
        
        <ToolbarButton
          onMouseDown={(e) => {
            e.preventDefault()
            exec("underline")
          }}
          icon={<Underline size={16} />}
          tooltip="Underline (Ctrl+U)"
        />

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Link controls */}
        <ToolbarButton
          active={showLinkInput}
          onMouseDown={(e) => {
            e.preventDefault()
            setShowLinkInput(!showLinkInput)
          }}
          icon={<LinkIcon size={16} />}
          tooltip="Add Link"
        />
        
        {isLinkActive() && (
          <ToolbarButton
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
          onMouseDown={(e) => {
            e.preventDefault()
            setAlign("left")
          }}
          icon={<AlignLeft size={16} />}
          tooltip="Align Left"
        />
        
        <ToolbarButton
          onMouseDown={(e) => {
            e.preventDefault()
            setAlign("center")
          }}
          icon={<AlignCenter size={16} />}
          tooltip="Align Center"
        />
        
        <ToolbarButton
          onMouseDown={(e) => {
            e.preventDefault()
            setAlign("right")
          }}
          icon={<AlignRight size={16} />}
          tooltip="Align Right"
        />

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Font size */}
        <div className="flex items-center gap-1">
          <Type size={16} className="text-slate-300" />
          <select
            aria-label="Font size"
            value={fontSize}
            onChange={onFontSizeChange}
            className="h-8 rounded-md border border-slate-500 bg-slate-700 text-slate-200 px-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          </select>
        </div>

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
        <div className="border-t border-slate-600 bg-slate-800 p-3 flex items-center gap-2">
          <input
            type="url"
            placeholder="Enter URL..."
            value={linkValue}
            onChange={(e) => setLinkValue(e.target.value)}
            className="flex-1 px-3 py-2 text-sm border border-slate-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-slate-700 text-slate-200 placeholder-slate-400 shadow-sm"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                applyLink()
              }
              if (e.key === 'Escape') {
                e.preventDefault()
                setShowLinkInput(false)
                setLinkValue('')
              }
            }}
            autoFocus
          />
          <Button
            size="sm"
            onClick={applyLink}
            disabled={!linkValue}
            className="bg-blue-500 hover:bg-blue-600 text-white shadow-sm"
          >
            Apply
          </Button>
        </div>
      )}

      {/* Color picker */}
      {showColorPicker && (
        <div className="border-t border-slate-600 bg-slate-800 p-3">
          <div className="grid grid-cols-8 gap-2">
            {[
              '#000000', '#374151', '#6B7280', '#9CA3AF',
              '#EF4444', '#F97316', '#EAB308', '#22C55E',
              '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899',
              '#14B8A6', '#F59E0B', '#84CC16', '#06B6D4'
            ].map((colorOption) => (
              <button
                key={colorOption}
                className="w-8 h-8 rounded-lg border-2 border-slate-500 hover:scale-110 hover:border-slate-300 transition-all duration-150 shadow-lg"
                style={{ backgroundColor: colorOption }}
                onClick={() => onColorChange(colorOption)}
                title={colorOption}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

interface ToolbarButtonProps {
  active?: boolean
  onMouseDown: (e: React.MouseEvent) => void
  icon: React.ReactNode
  tooltip: string
}

function ToolbarButton({ active = false, onMouseDown, icon, tooltip }: ToolbarButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`h-9 w-9 p-0 transition-all duration-150 ${
        active 
          ? 'bg-blue-500 text-white shadow-lg hover:bg-blue-400 border border-blue-400' 
          : 'text-slate-300 hover:bg-slate-700 hover:text-white border border-transparent hover:border-slate-500'
      }`}
      onMouseDown={onMouseDown}
      title={tooltip}
    >
      {icon}
    </Button>
  )
}