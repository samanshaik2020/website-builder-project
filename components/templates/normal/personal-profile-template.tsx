"use client"
import type { TemplateProps } from "../types"
import { EditableButton, EditableImage, EditableText } from "../shared/editable"

export function PersonalProfileTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-background text-foreground">
      <section className="mx-auto max-w-4xl px-4 py-12 grid gap-8 md:grid-cols-[240px_1fr]">
        <EditableImage
          id="pp-avatar"
          src="/profile-portrait.png"
          alt="Profile portrait"
          className="w-60 h-60 object-cover rounded-full border border-border"
          editable={editable}
          {...props}
        />
        <div className="flex flex-col gap-3">
          <EditableText id="pp-name" as="h1" className="text-3xl font-bold" editable={editable} {...props}>
            Alex Johnson
          </EditableText>
          <EditableText id="pp-role" className="text-muted-foreground" editable={editable} {...props}>
            Product Designer
          </EditableText>
          <EditableText id="pp-bio" className="leading-relaxed" editable={editable} {...props}>
            Short bio goes here. Highlight experience, values, and areas of expertise.
          </EditableText>
          <div className="flex gap-3">
            <EditableButton id="pp-cta-1" editable={editable} {...props}>
              Contact
            </EditableButton>
            <EditableButton
              id="pp-cta-2"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              editable={editable}
              {...props}
            >
              Download CV
            </EditableButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-12">
        <EditableText
          id="pp-socials-title"
          as="h3"
          className="text-xl font-semibold mb-4"
          editable={editable}
          {...props}
        >
          Social Profiles
        </EditableText>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {["Twitter", "LinkedIn", "GitHub", "Dribbble"].map((s, i) => (
            <EditableButton
              key={s}
              id={`pp-social-${i}`}
              className="bg-card text-foreground hover:bg-card/90"
              editable={editable}
              {...props}
            >
              {s}
            </EditableButton>
          ))}
        </div>
      </section>

      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <EditableText
            id="pp-exp-title"
            as="h3"
            className="text-2xl font-semibold mb-6"
            editable={editable}
            {...props}
          >
            Experience
          </EditableText>
          <div className="grid gap-4">
            {[1, 2, 3].map((n) => (
              <article key={n} className="rounded-lg border border-border p-5 bg-background">
                <EditableText id={`pp-exp-${n}-role`} as="h4" className="font-medium" editable={editable} {...props}>
                  Senior Designer
                </EditableText>
                <EditableText
                  id={`pp-exp-${n}-meta`}
                  className="text-xs text-muted-foreground"
                  editable={editable}
                  {...props}
                >
                  Company • 2022–Present
                </EditableText>
                <EditableText
                  id={`pp-exp-${n}-desc`}
                  className="text-sm text-muted-foreground mt-2"
                  editable={editable}
                  {...props}
                >
                  Brief description of responsibilities, key projects, and impact.
                </EditableText>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12">
        <EditableText id="pp-work-title" as="h3" className="text-2xl font-semibold mb-6" editable={editable} {...props}>
          Featured Work
        </EditableText>
        <div className="grid gap-6 md:grid-cols-2">
          {[1, 2].map((n) => (
            <article key={n} className="rounded-lg border border-border overflow-hidden bg-card">
              <EditableImage
                id={`pp-work-img-${n}`}
                src={`/placeholder.svg?height=200&width=400&query=work%20${n}`}
                alt={`Work ${n}`}
                className="w-full h-auto"
                editable={editable}
                {...props}
              />
              <div className="p-4">
                <EditableText id={`pp-work-title-${n}`} as="h4" className="font-medium" editable={editable} {...props}>
                  Project {n}
                </EditableText>
                <EditableText
                  id={`pp-work-desc-${n}`}
                  className="text-sm text-muted-foreground"
                  editable={editable}
                  {...props}
                >
                  Short description of the project and role.
                </EditableText>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-card border-t border-border">
        <div className="mx-auto max-w-4xl px-4 py-12 grid gap-6 md:grid-cols-[1.2fr_1fr] items-center">
          <div>
            <EditableText
              id="pp-contact-title"
              as="h4"
              className="text-xl font-semibold"
              editable={editable}
              {...props}
            >
              Get in touch
            </EditableText>
            <EditableText
              id="pp-contact-desc"
              className="text-sm text-muted-foreground mt-2"
              editable={editable}
              {...props}
            >
              Open to freelance work and full-time opportunities.
            </EditableText>
          </div>
          <div className="flex gap-3 md:justify-end">
            <EditableButton id="pp-contact-cta-1" editable={editable} {...props}>
              Email
            </EditableButton>
            <EditableButton
              id="pp-contact-cta-2"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              editable={editable}
              {...props}
            >
              Book a Call
            </EditableButton>
          </div>
        </div>
      </section>
    </main>
  )
}
