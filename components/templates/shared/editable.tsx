"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"
import type { TemplateProps } from "../types"
import type { JSX } from "react" // Declare JSX variable

type EditableTextProps = {
  id: string
  as?: keyof JSX.IntrinsicElements
  className?: string
  children?: React.ReactNode
  placeholder?: string
} & TemplateProps

export function EditableText({
  id,
  as = "div",
  className,
  children,
  placeholder,
  editable,
  selectedId,
  onSelect,
  onChange,
}: EditableTextProps) {
  const Tag = as as any
  return (
    <Tag
      role="textbox"
      aria-label="Editable text"
      contentEditable={!!editable}
      suppressContentEditableWarning
      data-eid={id}
      onClick={(e: React.MouseEvent) => {
        e.stopPropagation()
        onSelect?.(id)
      }}
      onInput={(e: React.FormEvent) => {
        const el = e.currentTarget as HTMLElement
        onChange?.(id, el.innerText)
      }}
      className={cn(
        "outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm",
        selectedId === id && "ring-2 ring-primary/50",
        className,
      )}
    >
      {children || placeholder}
    </Tag>
  )
}

type EditableImageProps = {
  id: string
  src: string
  alt: string
  className?: string
} & TemplateProps

export function EditableImage({
  id,
  src,
  alt,
  className,
  openInspector,
  onSelect,
  selectedId,
  editable,
}: EditableImageProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    console.log("🖼️ Image clicked:", { id, editable, hasOpenInspector: !!openInspector })
    
    if (onSelect) {
      onSelect(id)
    }
    
    if (editable && openInspector) {
      console.log("🎯 Calling openInspector for image:", id)
      openInspector("image", { id })
    } else {
      console.warn("⚠️ Cannot open inspector:", { editable, hasOpenInspector: !!openInspector })
    }
  }

  if (!editable) {
    // In preview mode, just render the image without wrapper
    return (
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        data-eid={id}
        className={cn("rounded-md border border-border", className)}
      />
    )
  }

  // In edit mode, render with interactive wrapper
  return (
    <div 
      className={cn("relative inline-block group", className)}
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        data-eid={id}
        className={cn(
          "rounded-md border border-border transition-all",
          "hover:opacity-80 hover:ring-2 hover:ring-primary/30",
          selectedId === id && "ring-2 ring-primary/50"
        )}
        style={{ display: 'block', maxWidth: '100%' }}
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-md pointer-events-none">
        <div className="bg-white text-black px-3 py-1.5 rounded-md text-xs font-medium shadow-lg">
          Click to edit image
        </div>
      </div>
    </div>
  )
}

type EditableButtonProps = {
  id: string
  href?: string
  children?: React.ReactNode
  className?: string
} & TemplateProps

export function EditableButton({
  id,
  href = "#",
  children,
  className,
  openInspector,
  onSelect,
  selectedId,
  editable,
}: EditableButtonProps) {
  return (
    <a
      href={href}
      data-eid={id}
      onClick={(e) => {
        if (editable) e.preventDefault()
        e.stopPropagation()
        onSelect?.(id)
        if (editable) openInspector?.("button", { id, href, text: (e.currentTarget as HTMLAnchorElement)?.innerText })
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-md px-5 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors",
        selectedId === id && "ring-2 ring-primary/50",
        className,
      )}
    >
      {children}
    </a>
  )
}
