"use client"
import type { TemplateProps } from "../types"
import { EditableButton, EditableImage, EditableText } from "../shared/editable"

export function LeadGenerationTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between">
          <EditableText id="lg-brand" as="h1" className="text-xl font-semibold" editable={editable} {...props}>
            LeadFlow Pro
          </EditableText>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {["Features", "Benefits", "Testimonials"].map((label, i) => (
              <EditableText key={label} id={`lg-nav-${i}`} editable={editable} {...props}>
                {label}
              </EditableText>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero Section with Lead Form */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div className="flex flex-col gap-6">
            <EditableText
              id="lg-hero-title"
              as="h2"
              className="text-4xl md:text-5xl font-bold text-balance"
              editable={editable}
              {...props}
            >
              Get Your Free Marketing Strategy Guide
            </EditableText>
            <EditableText
              id="lg-hero-subtitle"
              className="text-lg text-muted-foreground leading-relaxed"
              editable={editable}
              {...props}
            >
              Download our comprehensive 50-page guide and learn proven strategies to grow your business by 300% in 12 months.
            </EditableText>
            <div className="flex items-center gap-4">
              <EditableImage
                id="lg-hero-icon-1"
                src="/placeholder.svg?height=24&width=24&query=checkmark"
                alt="Check"
                className="h-6 w-6"
                editable={editable}
                {...props}
              />
              <EditableText id="lg-benefit-1" className="text-sm" editable={editable} {...props}>
                No credit card required
              </EditableText>
            </div>
            <div className="flex items-center gap-4">
              <EditableImage
                id="lg-hero-icon-2"
                src="/placeholder.svg?height=24&width=24&query=checkmark"
                alt="Check"
                className="h-6 w-6"
                editable={editable}
                {...props}
              />
              <EditableText id="lg-benefit-2" className="text-sm" editable={editable} {...props}>
                Instant download after signup
              </EditableText>
            </div>
          </div>

          {/* Lead Capture Form */}
          <div className="rounded-xl border border-border p-8 bg-card shadow-lg">
            <EditableText
              id="lg-form-title"
              as="h3"
              className="text-2xl font-semibold mb-6"
              editable={editable}
              {...props}
            >
              Download Your Free Guide
            </EditableText>
            <form className="space-y-4">
              <div>
                <EditableText id="lg-form-label-name" as="label" className="block text-sm font-medium mb-2" editable={editable} {...props}>
                  Full Name
                </EditableText>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-2 rounded-md border border-input bg-background"
                />
              </div>
              <div>
                <EditableText id="lg-form-label-email" as="label" className="block text-sm font-medium mb-2" editable={editable} {...props}>
                  Email Address
                </EditableText>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-2 rounded-md border border-input bg-background"
                />
              </div>
              <div>
                <EditableText id="lg-form-label-company" as="label" className="block text-sm font-medium mb-2" editable={editable} {...props}>
                  Company Name
                </EditableText>
                <input
                  type="text"
                  placeholder="Acme Inc."
                  className="w-full px-4 py-2 rounded-md border border-input bg-background"
                />
              </div>
              <div>
                <EditableText id="lg-form-label-phone" as="label" className="block text-sm font-medium mb-2" editable={editable} {...props}>
                  Phone Number (Optional)
                </EditableText>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2 rounded-md border border-input bg-background"
                />
              </div>
              <EditableButton id="lg-form-submit" className="w-full" editable={editable} {...props}>
                Get Instant Access
              </EditableButton>
              <EditableText id="lg-form-privacy" className="text-xs text-muted-foreground text-center" editable={editable} {...props}>
                We respect your privacy. Unsubscribe at any time.
              </EditableText>
            </form>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <EditableText
            id="lg-social-title"
            as="h4"
            className="text-center text-sm text-muted-foreground mb-8"
            editable={editable}
            {...props}
          >
            Trusted by over 10,000 businesses worldwide
          </EditableText>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center">
            {[1, 2, 3, 4].map((n) => (
              <EditableImage
                key={n}
                id={`lg-logo-${n}`}
                src={`/placeholder.svg?height=40&width=140&query=company%20logo%20${n}`}
                alt={`Company ${n}`}
                className="mx-auto h-10 w-auto opacity-70"
                editable={editable}
                {...props}
              />
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <EditableText
          id="lg-learn-title"
          as="h3"
          className="text-3xl font-bold mb-10 text-center"
          editable={editable}
          {...props}
        >
          What You'll Learn Inside
        </EditableText>
        <div className="grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <article key={i} className="rounded-lg border border-border p-6 bg-card">
              <EditableImage
                id={`lg-learn-icon-${i}`}
                src={`/placeholder.svg?height=48&width=48&query=icon%20${i + 1}`}
                alt={`Feature ${i + 1}`}
                className="h-12 w-12 mb-4"
                editable={editable}
                {...props}
              />
              <EditableText id={`lg-learn-heading-${i}`} as="h4" className="text-xl font-semibold mb-3" editable={editable} {...props}>
                Chapter {i + 1}: Key Strategy
              </EditableText>
              <EditableText
                id={`lg-learn-desc-${i}`}
                className="text-muted-foreground"
                editable={editable}
                {...props}
              >
                Discover proven tactics and actionable insights that will transform your marketing approach.
              </EditableText>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <EditableText
            id="lg-test-title"
            as="h3"
            className="text-3xl font-bold mb-10 text-center"
            editable={editable}
            {...props}
          >
            What Our Readers Say
          </EditableText>
          <div className="grid gap-8 md:grid-cols-2">
            {[1, 2].map((n) => (
              <figure key={n} className="rounded-lg border border-border p-6 bg-background">
                <div className="flex items-center gap-4 mb-4">
                  <EditableImage
                    id={`lg-test-avatar-${n}`}
                    src={`/placeholder.svg?height=60&width=60&query=avatar%20${n}`}
                    alt={`Testimonial ${n}`}
                    className="h-15 w-15 rounded-full"
                    editable={editable}
                    {...props}
                  />
                  <div>
                    <EditableText
                      id={`lg-test-name-${n}`}
                      className="font-semibold"
                      editable={editable}
                      {...props}
                    >
                      Sarah Mitchell
                    </EditableText>
                    <EditableText
                      id={`lg-test-role-${n}`}
                      className="text-sm text-muted-foreground"
                      editable={editable}
                      {...props}
                    >
                      Marketing Director, TechCorp
                    </EditableText>
                  </div>
                </div>
                <EditableText
                  id={`lg-test-quote-${n}`}
                  as="blockquote"
                  className="text-pretty leading-relaxed"
                  editable={editable}
                  {...props}
                >
                  "This guide completely changed how we approach marketing. We saw a 250% increase in qualified leads within 3 months!"
                </EditableText>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { key: "downloads", stat: "50,000+", label: "Downloads" },
            { key: "rating", stat: "4.9/5", label: "Average Rating" },
            { key: "results", stat: "300%", label: "Average Growth" },
          ].map(({ key, stat, label }) => (
            <div key={key} className="text-center">
              <EditableText
                id={`lg-stat-${key}`}
                as="div"
                className="text-4xl font-bold mb-2"
                editable={editable}
                {...props}
              >
                {stat}
              </EditableText>
              <EditableText
                id={`lg-stat-label-${key}`}
                className="text-muted-foreground"
                editable={editable}
                {...props}
              >
                {label}
              </EditableText>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <EditableText
            id="lg-cta-title"
            as="h3"
            className="text-3xl md:text-4xl font-bold mb-4"
            editable={editable}
            {...props}
          >
            Ready to Transform Your Marketing?
          </EditableText>
          <EditableText
            id="lg-cta-subtitle"
            className="text-lg mb-8 opacity-90"
            editable={editable}
            {...props}
          >
            Join thousands of marketers who have already downloaded this guide
          </EditableText>
          <EditableButton
            id="lg-cta-button"
            className="bg-background text-foreground hover:bg-background/90"
            editable={editable}
            {...props}
          >
            Download Free Guide Now
          </EditableButton>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center">
          <EditableText id="lg-footer" className="text-sm text-muted-foreground" editable={editable} {...props}>
            © 2025 LeadFlow Pro. All rights reserved.
          </EditableText>
        </div>
      </footer>
    </main>
  )
}
