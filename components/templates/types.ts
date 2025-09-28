export type TemplateProps = {
  // Editor wiring (all optional for compatibility with existing editor)
  editable?: boolean
  selectedId?: string
  onSelect?: (id: string) => void
  onChange?: (id: string, content: string) => void
  openInspector?: (type: "image" | "button" | "link", payload: any) => void

  // Optional template data bag so you can persist/restore
  data?: Record<string, any>
  setData?: (next: Record<string, any>) => void
}
