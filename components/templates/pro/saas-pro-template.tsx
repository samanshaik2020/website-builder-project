"use client"

import type { TemplateProps } from "../types"
import { EditableButton, EditableImage, EditableText } from "../shared/editable"

export function SaaSProTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-16 grid gap-8 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <EditableText
            id="sp-hero-title"
            as="h1"
            className="text-3xl md:text-5xl font-bold text-balance"
            editable={editable}
            {...props}
          >
            Ship product 10× faster with our SaaS platform
          </EditableText>
          <EditableText
            id="sp-hero-sub"
            className="text-muted-foreground leading-relaxed"
            editable={editable}
            {...props}
          >
            A premium template with advanced sections, feature highlights, testimonials, and pricing built-in.
          </EditableText>
          <div className="flex flex-wrap gap-3">
            <EditableButton id="sp-hero-cta-primary" editable={editable} {...props}>
              Start free trial
            </EditableButton>
            <EditableButton
              id="sp-hero-cta-secondary"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              editable={editable}
              {...props}
            >
              Book a demo
            </EditableButton>
          </div>
        </div>
        <EditableImage
          id="sp-hero-image"
          src={"/placeholder.svg?height=420&width=640&query=saas dashboard preview"}
          alt="SaaS dashboard"
          className="w-full h-auto md:justify-self-end rounded-lg"
          editable={editable}
          {...props}
        />
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <EditableText
          id="sp-features-title"
          as="h2"
          className="text-2xl md:text-3xl font-semibold mb-6"
          editable={editable}
          {...props}
        >
          Everything you need to launch
        </EditableText>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border p-5">
              <EditableText
                id={`sp-feature-${i}-title`}
                as="h3"
                className="font-medium mb-1"
                editable={editable}
                {...props}
              >
                Feature {i} title
              </EditableText>
              <EditableText
                id={`sp-feature-${i}-desc`}
                className="text-muted-foreground text-sm leading-relaxed"
                editable={editable}
                {...props}
              >
                Short description of this powerful capability that helps your team move faster.
              </EditableText>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-lg border p-6 md:p-8 grid gap-6 md:grid-cols-[auto,1fr] items-center">
          <EditableImage
            id="sp-testimonial-avatar"
            src={"/placeholder.svg?height=80&width=80&query=customer headshot"}
            alt="Customer headshot"
            className="w-20 h-20 rounded-full object-cover"
            editable={editable}
            {...props}
          />
          <div className="flex flex-col gap-2">
            <EditableText
              id="sp-testimonial-quote"
              as="blockquote"
              className="text-lg md:text-xl"
              editable={editable}
              {...props}
            >
              “This platform cut our delivery time in half and made onboarding new teammates seamless.”
            </EditableText>
            <EditableText
              id="sp-testimonial-author"
              className="text-muted-foreground text-sm"
              editable={editable}
              {...props}
            >
              Alex Chen, VP Engineering at Acme Inc.
            </EditableText>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <EditableText
          id="sp-pricing-title"
          as="h2"
          className="text-2xl md:text-3xl font-semibold mb-6"
          editable={editable}
          {...props}
        >
          Simple, transparent pricing
        </EditableText>
        <div className="grid gap-6 md:grid-cols-3">
          {["Starter", "Growth", "Scale"].map((tier, idx) => (
            <div key={tier} className="rounded-lg border p-6 flex flex-col gap-4">
              <EditableText id={`sp-price-${idx}-name`} as="h3" className="font-medium" editable={editable} {...props}>
                {tier}
              </EditableText>
              <EditableText
                id={`sp-price-${idx}-amount`}
                as="div"
                className="text-3xl font-bold"
                editable={editable}
                {...props}
              >
                ${idx === 0 ? "19" : idx === 1 ? "49" : "99"}/mo
              </EditableText>
              <EditableText
                id={`sp-price-${idx}-desc`}
                className="text-muted-foreground text-sm leading-relaxed"
                editable={editable}
                {...props}
              >
                Best for {idx === 0 ? "individuals" : idx === 1 ? "growing teams" : "fast-scaling companies"}.
              </EditableText>
              <EditableButton id={`sp-price-${idx}-cta`} editable={editable} {...props}>
                Choose {tier}
              </EditableButton>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <EditableText
          id="sp-cta-title"
          as="h2"
          className="text-2xl md:text-3xl font-semibold mb-3"
          editable={editable}
          {...props}
        >
          Ready to accelerate your roadmap?
        </EditableText>
        <EditableText id="sp-cta-sub" className="text-muted-foreground mb-6" editable={editable} {...props}>
          Get started in minutes—no credit card required.
        </EditableText>
        <EditableButton id="sp-cta-btn" editable={editable} {...props}>
          Start building now
        </EditableButton>
      </section>
    </main>
  )
}

export { SaaSProTemplate as SaaSProTemplatePro }
