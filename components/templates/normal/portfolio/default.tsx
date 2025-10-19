"use client"
import type { TemplateProps } from "../../types"
import { EditableButton, EditableImage, EditableText } from "../../shared/editable"

export function PortfolioTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-6 flex items-center justify-between">
          <EditableText id="pt-brand" as="h1" className="text-xl font-semibold" editable={editable} {...props}>
            Your Name
          </EditableText>
          <nav className="flex items-center gap-6 text-sm">
            <EditableText id="pt-nav-1" editable={editable} {...props}>
              About
            </EditableText>
            <EditableText id="pt-nav-2" editable={editable} {...props}>
              Projects
            </EditableText>
            <EditableText id="pt-nav-3" editable={editable} {...props}>
              Contact
            </EditableText>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <EditableText
            id="pt-hero-title"
            as="h2"
            className="text-3xl md:text-5xl font-bold text-balance"
            editable={editable}
            {...props}
          >
            Designer & Frontend Developer crafting clean, modern websites
          </EditableText>
          <EditableText
            id="pt-hero-sub"
            className="text-muted-foreground leading-relaxed"
            editable={editable}
            {...props}
          >
            I help startups and agencies turn ideas into delightful, performant digital products.
          </EditableText>
          <div className="flex gap-3">
            <EditableButton id="pt-cta-1" editable={editable} {...props}>
              View Projects
            </EditableButton>
            <EditableButton
              id="pt-cta-2"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              editable={editable}
              {...props}
            >
              Contact Me
            </EditableButton>
          </div>
        </div>
        <EditableImage
          id="pt-hero-img"
          src="/portfolio-cover-preview.jpg"
          alt="Portfolio preview"
          className="w-full h-auto md:justify-self-end"
          editable={editable}
          {...props}
        />
      </section>

      {/* About, Skills, Testimonials, Contact sections */}
      <section className="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-[1fr_1.2fr]">
        <div className="rounded-xl border border-border bg-card p-6">
          <EditableText
            id="pt-about-title"
            as="h3"
            className="text-xl font-semibold mb-3"
            editable={editable}
            {...props}
          >
            About Me
          </EditableText>
          <EditableText
            id="pt-about-body"
            className="text-sm text-muted-foreground leading-relaxed"
            editable={editable}
            {...props}
          >
            I specialize in UX, UI, and front-end development. I turn complex problems into simple, beautiful solutions.
          </EditableText>
        </div>
        <div className="rounded-xl border border-border bg-card p-6">
          <EditableText
            id="pt-skills-title"
            as="h3"
            className="text-xl font-semibold mb-3"
            editable={editable}
            {...props}
          >
            Skills
          </EditableText>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {["React", "Next.js", "Tailwind", "Figma", "TypeScript", "Accessibility"].map((s, i) => (
              <div key={i} className="rounded-lg bg-background p-3">
                <EditableText id={`pt-skill-${i}`} editable={editable} {...props}>
                  {s}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <EditableText
            id="pt-test-title"
            as="h3"
            className="text-2xl font-semibold mb-6 text-center"
            editable={editable}
            {...props}
          >
            What clients say
          </EditableText>
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <figure key={n} className="rounded-lg border border-border p-5 bg-background">
                <EditableText
                  id={`pt-test-quote-${n}`}
                  as="blockquote"
                  className="text-pretty"
                  editable={editable}
                  {...props}
                >
                  “Outstanding work, fast delivery, and great communication throughout.”
                </EditableText>
                <div className="mt-4 flex items-center gap-3">
                  <EditableImage
                    id={`pt-test-avatar-${n}`}
                    src={`/placeholder.svg?height=40&width=40&query=avatar%20${n}`}
                    alt={`Client ${n}`}
                    className="h-10 w-10 rounded-full"
                    editable={editable}
                    {...props}
                  />
                  <div>
                    <EditableText
                      id={`pt-test-name-${n}`}
                      className="text-sm font-medium"
                      editable={editable}
                      {...props}
                    >
                      Client Name {n}
                    </EditableText>
                    <EditableText
                      id={`pt-test-role-${n}`}
                      className="text-xs text-muted-foreground"
                      editable={editable}
                      {...props}
                    >
                      Company
                    </EditableText>
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-xl border border-border p-6 bg-card grid gap-6 md:grid-cols-[1.2fr_1fr] items-center">
          <div>
            <EditableText
              id="pt-contact-title"
              as="h4"
              className="text-xl font-semibold"
              editable={editable}
              {...props}
            >
              Let’s build something great
            </EditableText>
            <EditableText
              id="pt-contact-desc"
              className="text-sm text-muted-foreground mt-2"
              editable={editable}
              {...props}
            >
              Ready to start your project? Get in touch and tell me about your idea.
            </EditableText>
          </div>
          <div className="flex gap-3 md:justify-end">
            <EditableButton id="pt-contact-cta-1" editable={editable} {...props}>
              Email Me
            </EditableButton>
            <EditableButton
              id="pt-contact-cta-2"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              editable={editable}
              {...props}
            >
              Book a Call
            </EditableButton>
          </div>
        </div>
      </section>

      <section className="bg-card border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <EditableText
            id="pt-sec-title"
            as="h3"
            className="text-2xl font-semibold mb-6"
            editable={editable}
            {...props}
          >
            Selected Projects
          </EditableText>
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <article key={n} className="rounded-lg border border-border overflow-hidden bg-background">
                <EditableImage
                  id={`pt-proj-img-${n}`}
                  src={`/placeholder.svg?height=200&width=400&query=project%20${n}`}
                  alt={`Project ${n}`}
                  className="w-full h-auto"
                  editable={editable}
                  {...props}
                />
                <div className="p-4">
                  <EditableText
                    id={`pt-proj-title-${n}`}
                    as="h4"
                    className="font-medium"
                    editable={editable}
                    {...props}
                  >
                    Project Title {n}
                  </EditableText>
                  <EditableText
                    id={`pt-proj-desc-${n}`}
                    className="text-sm text-muted-foreground"
                    editable={editable}
                    {...props}
                  >
                    Short description of the project and the impact it delivered.
                  </EditableText>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 flex items-center justify-between">
          <EditableText id="pt-foot-copy" className="text-sm text-muted-foreground" editable={editable} {...props}>
            © 2025 Your Name. All rights reserved.
          </EditableText>
          <div className="flex gap-4 text-sm">
            <EditableText id="pt-foot-link-1" editable={editable} {...props}>
              Twitter
            </EditableText>
            <EditableText id="pt-foot-link-2" editable={editable} {...props}>
              LinkedIn
            </EditableText>
            <EditableText id="pt-foot-link-3" editable={editable} {...props}>
              GitHub
            </EditableText>
          </div>
        </div>
      </footer>
    </main>
  )
}
