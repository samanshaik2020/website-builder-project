"use client"
import type { TemplateProps } from "../types"
import { EditableButton, EditableImage, EditableText } from "../shared/editable"

export function ClickThroughTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between">
          <EditableText id="ct-brand" as="h1" className="text-xl font-semibold" editable={editable} {...props}>
            CloudSync Pro
          </EditableText>
          <EditableButton id="ct-header-cta" editable={editable} {...props}>
            Start Free Trial
          </EditableButton>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <EditableText
            id="ct-hero-badge"
            className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            editable={editable}
            {...props}
          >
            🚀 New: AI-Powered Sync Technology
          </EditableText>
          <EditableText
            id="ct-hero-title"
            as="h2"
            className="text-4xl md:text-6xl font-bold mb-6 text-balance"
            editable={editable}
            {...props}
          >
            Sync Your Files Across All Devices Instantly
          </EditableText>
          <EditableText
            id="ct-hero-subtitle"
            className="text-xl text-muted-foreground mb-8 text-balance"
            editable={editable}
            {...props}
          >
            Experience lightning-fast file synchronization with military-grade encryption. Access your files anywhere, anytime.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <EditableButton id="ct-hero-cta-primary" className="text-lg px-8 py-6" editable={editable} {...props}>
              Start 30-Day Free Trial
            </EditableButton>
            <EditableButton
              id="ct-hero-cta-secondary"
              className="text-lg px-8 py-6 bg-secondary text-secondary-foreground hover:bg-secondary/90"
              editable={editable}
              {...props}
            >
              Watch Demo
            </EditableButton>
          </div>
          <EditableText id="ct-hero-note" className="text-sm text-muted-foreground" editable={editable} {...props}>
            No credit card required • Cancel anytime • 5GB free storage
          </EditableText>
        </div>
      </section>

      {/* Product Preview */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <EditableImage
          id="ct-product-preview"
          src="/placeholder.svg?height=600&width=1200&query=dashboard%20preview"
          alt="Product Dashboard"
          className="w-full rounded-xl border border-border shadow-2xl"
          editable={editable}
          {...props}
        />
      </section>

      {/* Key Features Section */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <EditableText
          id="ct-features-title"
          as="h3"
          className="text-3xl font-bold mb-12 text-center"
          editable={editable}
          {...props}
        >
          Everything You Need in One Platform
        </EditableText>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <article key={i} className="text-center">
              <EditableImage
                id={`ct-feature-icon-${i}`}
                src={`/placeholder.svg?height=64&width=64&query=feature%20icon%20${i + 1}`}
                alt={`Feature ${i + 1}`}
                className="h-16 w-16 mx-auto mb-4"
                editable={editable}
                {...props}
              />
              <EditableText id={`ct-feature-title-${i}`} as="h4" className="text-lg font-semibold mb-2" editable={editable} {...props}>
                Feature {i + 1}
              </EditableText>
              <EditableText
                id={`ct-feature-desc-${i}`}
                className="text-sm text-muted-foreground"
                editable={editable}
                {...props}
              >
                Brief description of this powerful feature and how it benefits users.
              </EditableText>
            </article>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <EditableText
            id="ct-how-title"
            as="h3"
            className="text-3xl font-bold mb-12 text-center"
            editable={editable}
            {...props}
          >
            Get Started in 3 Simple Steps
          </EditableText>
          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <article key={n} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mb-4">
                    <EditableText id={`ct-step-num-${n}`} editable={editable} {...props}>
                      {n}
                    </EditableText>
                  </div>
                  <EditableText id={`ct-step-title-${n}`} as="h4" className="text-xl font-semibold mb-3" editable={editable} {...props}>
                    Step {n} Title
                  </EditableText>
                  <EditableText
                    id={`ct-step-desc-${n}`}
                    className="text-muted-foreground"
                    editable={editable}
                    {...props}
                  >
                    Clear explanation of what happens in this step and why it matters.
                  </EditableText>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div>
            <EditableText
              id="ct-benefits-title"
              as="h3"
              className="text-3xl font-bold mb-6"
              editable={editable}
              {...props}
            >
              Why Choose CloudSync Pro?
            </EditableText>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="flex items-start gap-4">
                  <EditableImage
                    id={`ct-check-${n}`}
                    src="/placeholder.svg?height=24&width=24&query=checkmark"
                    alt="Check"
                    className="h-6 w-6 mt-1"
                    editable={editable}
                    {...props}
                  />
                  <div>
                    <EditableText id={`ct-benefit-title-${n}`} className="font-semibold mb-1" editable={editable} {...props}>
                      Key Benefit {n}
                    </EditableText>
                    <EditableText
                      id={`ct-benefit-desc-${n}`}
                      className="text-sm text-muted-foreground"
                      editable={editable}
                      {...props}
                    >
                      Detailed explanation of this benefit and its impact on productivity.
                    </EditableText>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <EditableImage
            id="ct-benefits-image"
            src="/placeholder.svg?height=500&width=600&query=benefits%20illustration"
            alt="Benefits"
            className="w-full rounded-lg"
            editable={editable}
            {...props}
          />
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <EditableText
            id="ct-social-title"
            as="h3"
            className="text-3xl font-bold mb-12 text-center"
            editable={editable}
            {...props}
          >
            Trusted by Industry Leaders
          </EditableText>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 items-center mb-12">
            {[1, 2, 3, 4, 5].map((n) => (
              <EditableImage
                key={n}
                id={`ct-logo-${n}`}
                src={`/placeholder.svg?height=40&width=120&query=logo%20${n}`}
                alt={`Logo ${n}`}
                className="mx-auto h-10 w-auto opacity-70"
                editable={editable}
                {...props}
              />
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <figure key={n} className="rounded-lg border border-border p-6 bg-background">
                <div className="flex items-center gap-3 mb-4">
                  <EditableImage
                    id={`ct-test-avatar-${n}`}
                    src={`/placeholder.svg?height=48&width=48&query=avatar%20${n}`}
                    alt={`Avatar ${n}`}
                    className="h-12 w-12 rounded-full"
                    editable={editable}
                    {...props}
                  />
                  <div>
                    <EditableText
                      id={`ct-test-name-${n}`}
                      className="font-semibold"
                      editable={editable}
                      {...props}
                    >
                      Alex Johnson
                    </EditableText>
                    <EditableText
                      id={`ct-test-role-${n}`}
                      className="text-sm text-muted-foreground"
                      editable={editable}
                      {...props}
                    >
                      CTO, TechCorp
                    </EditableText>
                  </div>
                </div>
                <EditableText
                  id={`ct-test-quote-${n}`}
                  as="blockquote"
                  className="text-sm text-pretty"
                  editable={editable}
                  {...props}
                >
                  "CloudSync Pro has revolutionized how our team collaborates. The speed and reliability are unmatched."
                </EditableText>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <EditableText
          id="ct-pricing-title"
          as="h3"
          className="text-3xl font-bold mb-12 text-center"
          editable={editable}
          {...props}
        >
          Choose Your Plan
        </EditableText>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { key: "basic", name: "Basic", price: "$9", popular: false },
            { key: "pro", name: "Pro", price: "$29", popular: true },
            { key: "enterprise", name: "Enterprise", price: "$99", popular: false },
          ].map(({ key, name, price, popular }) => (
            <article
              key={key}
              className={`rounded-xl border p-8 ${popular ? "border-primary bg-primary/5 relative" : "border-border bg-card"}`}
            >
              {popular && (
                <EditableText
                  id={`ct-plan-badge-${key}`}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full"
                  editable={editable}
                  {...props}
                >
                  MOST POPULAR
                </EditableText>
              )}
              <EditableText
                id={`ct-plan-name-${key}`}
                as="h4"
                className="text-xl font-semibold mb-2"
                editable={editable}
                {...props}
              >
                {name}
              </EditableText>
              <EditableText
                id={`ct-plan-price-${key}`}
                as="div"
                className="text-4xl font-bold mb-6"
                editable={editable}
                {...props}
              >
                {price}<span className="text-lg text-muted-foreground">/month</span>
              </EditableText>
              <ul className="space-y-3 mb-8">
                {[1, 2, 3, 4].map((n) => (
                  <li key={n} className="flex items-center gap-2">
                    <EditableImage
                      id={`ct-plan-check-${key}-${n}`}
                      src="/placeholder.svg?height=20&width=20&query=check"
                      alt="Check"
                      className="h-5 w-5"
                      editable={editable}
                      {...props}
                    />
                    <EditableText id={`ct-plan-feature-${key}-${n}`} className="text-sm" editable={editable} {...props}>
                      Feature {n}
                    </EditableText>
                  </li>
                ))}
              </ul>
              <EditableButton
                id={`ct-plan-cta-${key}`}
                className={popular ? "w-full" : "w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"}
                editable={editable}
                {...props}
              >
                Get Started
              </EditableButton>
            </article>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <EditableText
            id="ct-final-title"
            as="h3"
            className="text-4xl font-bold mb-6"
            editable={editable}
            {...props}
          >
            Ready to Experience the Difference?
          </EditableText>
          <EditableText
            id="ct-final-subtitle"
            className="text-xl mb-8 opacity-90"
            editable={editable}
            {...props}
          >
            Join over 100,000 users who trust CloudSync Pro for their file management
          </EditableText>
          <EditableButton
            id="ct-final-cta"
            className="text-lg px-10 py-6 bg-background text-foreground hover:bg-background/90"
            editable={editable}
            {...props}
          >
            Start Your Free Trial
          </EditableButton>
          <EditableText id="ct-final-note" className="mt-4 text-sm opacity-80" editable={editable} {...props}>
            30-day money-back guarantee • No credit card required
          </EditableText>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center">
          <EditableText id="ct-footer" className="text-sm text-muted-foreground" editable={editable} {...props}>
            © 2025 CloudSync Pro. All rights reserved.
          </EditableText>
        </div>
      </footer>
    </main>
  )
}
