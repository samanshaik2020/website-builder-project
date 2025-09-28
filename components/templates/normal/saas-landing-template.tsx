"use client"
import type { TemplateProps } from "../types"
import { EditableButton, EditableImage, EditableText } from "../shared/editable"

export function SaaSTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between">
          <EditableText id="sl-brand" as="h1" className="text-xl font-semibold" editable={editable} {...props}>
            SparkMail AI
          </EditableText>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {["Features", "Pricing", "Docs", "Contact"].map((label, i) => (
              <EditableText key={label} id={`sl-nav-${i}`} editable={editable} {...props}>
                {label}
              </EditableText>
            ))}
          </nav>
          <EditableButton id="sl-cta-login" className="hidden md:inline-flex" editable={editable} {...props}>
            Get Started
          </EditableButton>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <EditableText
            id="sl-hero-title"
            as="h2"
            className="text-3xl md:text-5xl font-bold text-balance"
            editable={editable}
            {...props}
          >
            Write better emails 10x faster with AI
          </EditableText>
          <EditableText
            id="sl-hero-sub"
            className="text-muted-foreground leading-relaxed"
            editable={editable}
            {...props}
          >
            Draft, improve, and personalize emails with one click. Built for teams who communicate at scale.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-3">
            <EditableButton id="sl-cta-1" editable={editable} {...props}>
              Start Free
            </EditableButton>
            <EditableButton
              id="sl-cta-2"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              editable={editable}
              {...props}
            >
              View Pricing
            </EditableButton>
          </div>
          <div className="text-xs text-muted-foreground">
            <EditableText id="sl-footnote" editable={editable} {...props}>
              No credit card required
            </EditableText>
          </div>
        </div>
        <EditableImage
          id="sl-hero-img"
          src="/product-screenshot.png"
          alt="App screenshot"
          className="w-full h-auto md:justify-self-end"
          editable={editable}
          {...props}
        />
      </section>

      {/* Social Proof Logos Section */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-xl border border-border p-6 bg-card">
          <EditableText
            id="sl-logos-title"
            as="h4"
            className="text-center text-sm text-muted-foreground mb-6"
            editable={editable}
            {...props}
          >
            Trusted by teams at
          </EditableText>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
            {[1, 2, 3, 4].map((n) => (
              <EditableImage
                key={n}
                id={`sl-logo-${n}`}
                src={`/placeholder.svg?height=36&width=120&query=logo%20${n}`}
                alt={`Logo ${n}`}
                className="mx-auto h-9 w-auto opacity-70"
                editable={editable}
                {...props}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <article key={i} className="rounded-lg border border-border p-5 bg-card">
              <EditableImage
                id={`sl-adv-icon-${i}`}
                src={`/placeholder.svg?height=40&width=40&query=icon%20${i + 1}`}
                alt={`Feature icon ${i + 1}`}
                className="h-10 w-10 mb-3"
                editable={editable}
                {...props}
              />
              <EditableText id={`sl-adv-title-${i}`} as="h4" className="font-medium" editable={editable} {...props}>
                Advanced Feature {i + 1}
              </EditableText>
              <EditableText
                id={`sl-adv-desc-${i}`}
                className="text-sm text-muted-foreground"
                editable={editable}
                {...props}
              >
                Explain how this feature provides tangible value with a short, compelling description.
              </EditableText>
              <ul className="mt-3 list-disc pl-5 text-sm">
                {[1, 2, 3].map((n) => (
                  <li key={n}>
                    <EditableText id={`sl-adv-bullet-${i}-${n}`} editable={editable} {...props}>
                      Key benefit {n}
                    </EditableText>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <EditableText
            id="sl-test-title"
            as="h3"
            className="text-2xl font-semibold mb-6 text-center"
            editable={editable}
            {...props}
          >
            Loved by modern teams
          </EditableText>
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <figure key={n} className="rounded-lg border border-border p-5 bg-background">
                <EditableText
                  id={`sl-test-quote-${n}`}
                  as="blockquote"
                  className="text-pretty"
                  editable={editable}
                  {...props}
                >
                  “SparkMail AI cut our reply time by 70% while improving tone and clarity.”
                </EditableText>
                <div className="mt-4 flex items-center gap-3">
                  <EditableImage
                    id={`sl-test-avatar-${n}`}
                    src={`/placeholder.svg?height=40&width=40&query=avatar%20${n}`}
                    alt={`Avatar ${n}`}
                    className="h-10 w-10 rounded-full"
                    editable={editable}
                    {...props}
                  />
                  <div>
                    <EditableText
                      id={`sl-test-name-${n}`}
                      className="text-sm font-medium"
                      editable={editable}
                      {...props}
                    >
                      Alex Johnson
                    </EditableText>
                    <EditableText
                      id={`sl-test-role-${n}`}
                      className="text-xs text-muted-foreground"
                      editable={editable}
                      {...props}
                    >
                      Head of Support, Acme
                    </EditableText>
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <EditableText
          id="sl-pricing-title"
          as="h3"
          className="text-2xl font-semibold mb-6 text-center"
          editable={editable}
          {...props}
        >
          Simple, transparent pricing
        </EditableText>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { k: "starter", badge: "Starter", price: "$0", btn: "Start Free" },
            { k: "pro", badge: "Pro", price: "$19", btn: "Upgrade" },
            { k: "team", badge: "Team", price: "$49", btn: "Choose Team" },
          ].map(({ k, badge, price, btn }, i) => (
            <article key={k} className="rounded-lg border border-border p-6 bg-card flex flex-col">
              <EditableText
                id={`sl-price-badge-${k}`}
                className="text-sm text-muted-foreground"
                editable={editable}
                {...props}
              >
                {badge}
              </EditableText>
              <EditableText
                id={`sl-price-amount-${k}`}
                as="div"
                className="mt-2 text-3xl font-bold"
                editable={editable}
                {...props}
              >
                {price}/mo
              </EditableText>
              <ul className="mt-4 space-y-2 text-sm">
                {[1, 2, 3, 4].map((n) => (
                  <li key={n}>
                    <EditableText id={`sl-price-feat-${k}-${n}`} editable={editable} {...props}>
                      Plan feature {n}
                    </EditableText>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <EditableButton id={`sl-price-cta-${k}`} editable={editable} {...props}>
                  {btn}
                </EditableButton>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <EditableText
            id="sl-faq-title"
            as="h3"
            className="text-2xl font-semibold mb-6 text-center"
            editable={editable}
            {...props}
          >
            Frequently asked questions
          </EditableText>
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((n) => (
              <article key={n} className="rounded-lg border border-border p-5 bg-background">
                <EditableText id={`sl-faq-q-${n}`} as="h4" className="font-medium" editable={editable} {...props}>
                  Question {n}: How does SparkMail AI work?
                </EditableText>
                <EditableText
                  id={`sl-faq-a-${n}`}
                  className="text-sm text-muted-foreground"
                  editable={editable}
                  {...props}
                >
                  Answer: It analyzes your context and tone to draft or refine emails that match your goals.
                </EditableText>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-xl border border-border p-6 bg-card grid md:grid-cols-2 gap-6 items-center">
          <EditableText
            id="sl-cta-final-title"
            as="h4"
            className="text-xl font-semibold"
            editable={editable}
            {...props}
          >
            Get started in minutes — no credit card required
          </EditableText>
          <div className="flex gap-3 md:justify-end">
            <EditableButton id="sl-cta-final-1" editable={editable} {...props}>
              Start Free
            </EditableButton>
            <EditableButton
              id="sl-cta-final-2"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              editable={editable}
              {...props}
            >
              Book Demo
            </EditableButton>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center md:text-left">
          <EditableText id="sl-footer" className="text-sm text-muted-foreground" editable={editable} {...props}>
            © 2025 SparkMail Inc.
          </EditableText>
        </div>
      </footer>
    </main>
  )
}
