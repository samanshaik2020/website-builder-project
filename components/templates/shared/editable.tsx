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
  return (
    <img
      src={src || "/placeholder.svg"}
      alt={alt}
      data-eid={id}
      onClick={(e) => {
        e.stopPropagation()
        onSelect?.(id)
        if (editable) openInspector?.("image", { id, src, alt })
      }}
      className={cn("rounded-md border border-border", selectedId === id && "ring-2 ring-primary/50", className)}
    />
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
