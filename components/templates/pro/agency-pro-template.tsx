"use client"
import type { TemplateProps } from "../types"
import { EditableButton, EditableImage, EditableText } from "../shared/editable"

export function AgencyProTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <EditableText id="ap-title" as="h1" className="text-3xl md:text-5xl font-bold" editable={editable} {...props}>
            Full‑service agency for brand and product
          </EditableText>
          <EditableText id="ap-sub" className="text-muted-foreground" editable={editable} {...props}>
            Premium template with enhanced sections, pricing, case studies, and blog.
          </EditableText>
          <div className="flex gap-3">
            <EditableButton id="ap-cta-1" editable={editable} {...props}>
              Start a Project
            </EditableButton>
            <EditableButton
              id="ap-cta-2"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              editable={editable}
              {...props}
            >
              Our Work
            </EditableButton>
          </div>
        </div>
        <EditableImage
          id="ap-hero"
          src="/agency-team-collaboration.jpg"
          alt="Agency team"
          className="w-full h-auto md:justify-self-end"
          editable={editable}
          {...props}
        />
      </section>
    </main>
  )
}
