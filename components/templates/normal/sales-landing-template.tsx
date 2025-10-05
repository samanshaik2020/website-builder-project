"use client"
import type { TemplateProps } from "../types"
import { EditableButton, EditableImage, EditableText } from "../shared/editable"

export function SalesLandingTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between">
          <EditableText id="sl-brand" as="h1" className="text-xl font-semibold" editable={editable} {...props}>
            ProFitness Elite
          </EditableText>
          <div className="flex items-center gap-4">
            <EditableText id="sl-phone" className="hidden md:block text-sm font-medium" editable={editable} {...props}>
              📞 1-800-FIT-ELITE
            </EditableText>
            <EditableButton id="sl-header-cta" editable={editable} {...props}>
              Buy Now
            </EditableButton>
          </div>
        </div>
      </header>

      {/* Hero Section with Strong Offer */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <div className="flex flex-col gap-6">
              <EditableText
                id="sl-hero-badge"
                className="inline-block w-fit px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold"
                editable={editable}
                {...props}
              >
                LIMITED TIME: 50% OFF + FREE SHIPPING
              </EditableText>
              <EditableText
                id="sl-hero-title"
                as="h2"
                className="text-4xl md:text-5xl font-bold text-balance"
                editable={editable}
                {...props}
              >
                Transform Your Body in Just 30 Days
              </EditableText>
              <EditableText
                id="sl-hero-subtitle"
                className="text-lg text-muted-foreground leading-relaxed"
                editable={editable}
                {...props}
              >
                The complete home fitness system that delivers professional gym results. No equipment needed. Guaranteed results or your money back.
              </EditableText>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <EditableImage
                    id="sl-check-1"
                    src="/placeholder.svg?height=24&width=24&query=checkmark"
                    alt="Check"
                    className="h-6 w-6"
                    editable={editable}
                    {...props}
                  />
                  <EditableText id="sl-benefit-1" className="font-medium" editable={editable} {...props}>
                    30-Day Money-Back Guarantee
                  </EditableText>
                </div>
                <div className="flex items-center gap-3">
                  <EditableImage
                    id="sl-check-2"
                    src="/placeholder.svg?height=24&width=24&query=checkmark"
                    alt="Check"
                    className="h-6 w-6"
                    editable={editable}
                    {...props}
                  />
                  <EditableText id="sl-benefit-2" className="font-medium" editable={editable} {...props}>
                    Free Personal Coaching Session ($199 Value)
                  </EditableText>
                </div>
                <div className="flex items-center gap-3">
                  <EditableImage
                    id="sl-check-3"
                    src="/placeholder.svg?height=24&width=24&query=checkmark"
                    alt="Check"
                    className="h-6 w-6"
                    editable={editable}
                    {...props}
                  />
                  <EditableText id="sl-benefit-3" className="font-medium" editable={editable} {...props}>
                    Lifetime Access to Premium Workouts
                  </EditableText>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <EditableButton id="sl-hero-cta" className="text-lg px-8 py-6" editable={editable} {...props}>
                  Get 50% Off Today
                </EditableButton>
                <div className="flex flex-col justify-center">
                  <EditableText id="sl-price-strike" className="text-sm text-muted-foreground line-through" editable={editable} {...props}>
                    Was $199
                  </EditableText>
                  <EditableText id="sl-price-now" className="text-2xl font-bold text-primary" editable={editable} {...props}>
                    Now $99
                  </EditableText>
                </div>
              </div>
            </div>
            <EditableImage
              id="sl-hero-image"
              src="/placeholder.svg?height=600&width=600&query=fitness%20product"
              alt="Product"
              className="w-full rounded-lg shadow-2xl"
              editable={editable}
              {...props}
            />
          </div>
        </div>
      </section>

      {/* Urgency Banner */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-4 text-center">
          <EditableText id="sl-urgency" className="font-semibold" editable={editable} {...props}>
            ⏰ HURRY! Offer ends in 24 hours. Only 47 spots left at this price!
          </EditableText>
        </div>
      </section>

      {/* Problem-Solution Section */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <EditableText
          id="sl-problem-title"
          as="h3"
          className="text-3xl font-bold mb-8 text-center"
          editable={editable}
          {...props}
        >
          Tired of Expensive Gyms That Don't Deliver Results?
        </EditableText>
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {[0, 1, 2].map((i) => (
            <article key={i} className="rounded-lg border border-border p-6 bg-card">
              <EditableText id={`sl-problem-${i}`} as="h4" className="text-xl font-semibold mb-3 text-destructive" editable={editable} {...props}>
                ❌ Problem {i + 1}
              </EditableText>
              <EditableText
                id={`sl-problem-desc-${i}`}
                className="text-muted-foreground"
                editable={editable}
                {...props}
              >
                Common frustration that your target audience experiences with current solutions.
              </EditableText>
            </article>
          ))}
        </div>
        <div className="text-center mb-8">
          <EditableText
            id="sl-solution-intro"
            as="h4"
            className="text-2xl font-bold mb-4"
            editable={editable}
            {...props}
          >
            Introducing ProFitness Elite - Your Complete Solution
          </EditableText>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <article key={i} className="rounded-lg border border-primary/20 p-6 bg-primary/5">
              <EditableText id={`sl-solution-${i}`} as="h4" className="text-xl font-semibold mb-3 text-primary" editable={editable} {...props}>
                ✓ Solution {i + 1}
              </EditableText>
              <EditableText
                id={`sl-solution-desc-${i}`}
                className="text-muted-foreground"
                editable={editable}
                {...props}
              >
                How your product specifically addresses and solves this problem effectively.
              </EditableText>
            </article>
          ))}
        </div>
      </section>

      {/* Product Features */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <EditableText
            id="sl-features-title"
            as="h3"
            className="text-3xl font-bold mb-12 text-center"
            editable={editable}
            {...props}
          >
            What's Included in Your Package
          </EditableText>
          <div className="grid gap-8 md:grid-cols-2">
            {[0, 1, 2, 3].map((i) => (
              <article key={i} className="flex gap-6">
                <EditableImage
                  id={`sl-feature-icon-${i}`}
                  src={`/placeholder.svg?height=64&width=64&query=feature%20${i + 1}`}
                  alt={`Feature ${i + 1}`}
                  className="h-16 w-16 flex-shrink-0"
                  editable={editable}
                  {...props}
                />
                <div>
                  <EditableText id={`sl-feature-title-${i}`} as="h4" className="text-xl font-semibold mb-2" editable={editable} {...props}>
                    Premium Feature {i + 1}
                  </EditableText>
                  <EditableText
                    id={`sl-feature-desc-${i}`}
                    className="text-muted-foreground mb-3"
                    editable={editable}
                    {...props}
                  >
                    Detailed description of this feature and the specific value it provides to customers.
                  </EditableText>
                  <EditableText id={`sl-feature-value-${i}`} className="text-sm font-semibold text-primary" editable={editable} {...props}>
                    Value: $99
                  </EditableText>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 p-6 rounded-xl bg-primary/10 border border-primary/20">
            <div className="flex justify-between items-center">
              <div>
                <EditableText id="sl-total-value-label" className="text-lg font-semibold mb-1" editable={editable} {...props}>
                  Total Package Value:
                </EditableText>
                <EditableText id="sl-total-value" className="text-3xl font-bold text-muted-foreground line-through" editable={editable} {...props}>
                  $596
                </EditableText>
              </div>
              <div className="text-right">
                <EditableText id="sl-today-price-label" className="text-lg font-semibold mb-1" editable={editable} {...props}>
                  Your Price Today:
                </EditableText>
                <EditableText id="sl-today-price" className="text-4xl font-bold text-primary" editable={editable} {...props}>
                  $99
                </EditableText>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Results */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <EditableText
          id="sl-results-title"
          as="h3"
          className="text-3xl font-bold mb-12 text-center"
          editable={editable}
          {...props}
        >
          Real People, Real Results
        </EditableText>
        <div className="grid gap-8 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <article key={n} className="rounded-lg border border-border p-6 bg-card">
              <EditableImage
                id={`sl-result-before-after-${n}`}
                src={`/placeholder.svg?height=300&width=400&query=before%20after%20${n}`}
                alt={`Result ${n}`}
                className="w-full rounded-lg mb-4"
                editable={editable}
                {...props}
              />
              <div className="flex items-center gap-3 mb-3">
                <EditableImage
                  id={`sl-result-avatar-${n}`}
                  src={`/placeholder.svg?height=48&width=48&query=avatar%20${n}`}
                  alt={`Customer ${n}`}
                  className="h-12 w-12 rounded-full"
                  editable={editable}
                  {...props}
                />
                <div>
                  <EditableText
                    id={`sl-result-name-${n}`}
                    className="font-semibold"
                    editable={editable}
                    {...props}
                  >
                    Sarah M.
                  </EditableText>
                  <EditableText
                    id={`sl-result-stat-${n}`}
                    className="text-sm text-primary font-medium"
                    editable={editable}
                    {...props}
                  >
                    Lost 25 lbs in 30 days
                  </EditableText>
                </div>
              </div>
              <EditableText
                id={`sl-result-quote-${n}`}
                as="blockquote"
                className="text-sm text-pretty"
                editable={editable}
                {...props}
              >
                "I couldn't believe the results! This program changed my life. Best investment I've ever made."
              </EditableText>
            </article>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-card border-y border-border">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <EditableText
            id="sl-test-title"
            as="h3"
            className="text-3xl font-bold mb-12 text-center"
            editable={editable}
            {...props}
          >
            Join 50,000+ Happy Customers
          </EditableText>
          <div className="grid gap-6 md:grid-cols-2">
            {[1, 2, 3, 4].map((n) => (
              <figure key={n} className="rounded-lg border border-border p-6 bg-background">
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <EditableText key={star} id={`sl-star-${n}-${star}`} className="text-yellow-500" editable={editable} {...props}>
                      ★
                    </EditableText>
                  ))}
                </div>
                <EditableText
                  id={`sl-test-quote-${n}`}
                  as="blockquote"
                  className="text-pretty mb-4"
                  editable={editable}
                  {...props}
                >
                  "Absolutely amazing! The results speak for themselves. I've tried everything else and nothing worked like this."
                </EditableText>
                <div className="flex items-center gap-3">
                  <EditableImage
                    id={`sl-test-avatar-${n}`}
                    src={`/placeholder.svg?height=40&width=40&query=avatar%20${n}`}
                    alt={`Testimonial ${n}`}
                    className="h-10 w-10 rounded-full"
                    editable={editable}
                    {...props}
                  />
                  <div>
                    <EditableText
                      id={`sl-test-name-${n}`}
                      className="font-semibold text-sm"
                      editable={editable}
                      {...props}
                    >
                      Michael R.
                    </EditableText>
                    <EditableText
                      id={`sl-test-verified-${n}`}
                      className="text-xs text-muted-foreground"
                      editable={editable}
                      {...props}
                    >
                      ✓ Verified Purchase
                    </EditableText>
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <EditableText
          id="sl-faq-title"
          as="h3"
          className="text-3xl font-bold mb-12 text-center"
          editable={editable}
          {...props}
        >
          Frequently Asked Questions
        </EditableText>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <article key={n} className="rounded-lg border border-border p-6 bg-card">
              <EditableText id={`sl-faq-q-${n}`} as="h4" className="font-semibold mb-2" editable={editable} {...props}>
                Question {n}: How quickly will I see results?
              </EditableText>
              <EditableText
                id={`sl-faq-a-${n}`}
                className="text-sm text-muted-foreground"
                editable={editable}
                {...props}
              >
                Most customers see noticeable results within the first 7-10 days, with dramatic transformations by day 30.
              </EditableText>
            </article>
          ))}
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="bg-primary/5 border-y border-primary/20">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <EditableImage
            id="sl-guarantee-badge"
            src="/placeholder.svg?height=120&width=120&query=guarantee%20badge"
            alt="Guarantee"
            className="h-30 w-30 mx-auto mb-6"
            editable={editable}
            {...props}
          />
          <EditableText
            id="sl-guarantee-title"
            as="h3"
            className="text-3xl font-bold mb-4"
            editable={editable}
            {...props}
          >
            100% Money-Back Guarantee
          </EditableText>
          <EditableText
            id="sl-guarantee-desc"
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            editable={editable}
            {...props}
          >
            Try ProFitness Elite risk-free for 30 days. If you're not completely satisfied with your results, we'll refund every penny. No questions asked.
          </EditableText>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center">
          <EditableText
            id="sl-final-title"
            as="h3"
            className="text-4xl md:text-5xl font-bold mb-6"
            editable={editable}
            {...props}
          >
            Don't Miss This Limited-Time Offer!
          </EditableText>
          <EditableText
            id="sl-final-subtitle"
            className="text-xl mb-8 opacity-90"
            editable={editable}
            {...props}
          >
            Get 50% OFF + Free Shipping + Bonus Coaching Session
          </EditableText>
          <div className="bg-background/10 rounded-xl p-8 mb-8 backdrop-blur-sm">
            <div className="flex justify-center items-baseline gap-4 mb-4">
              <EditableText id="sl-final-price-was" className="text-2xl line-through opacity-70" editable={editable} {...props}>
                $199
              </EditableText>
              <EditableText id="sl-final-price-now" className="text-6xl font-bold" editable={editable} {...props}>
                $99
              </EditableText>
            </div>
            <EditableText id="sl-final-savings" className="text-lg font-semibold" editable={editable} {...props}>
              You Save $100 Today!
            </EditableText>
          </div>
          <EditableButton
            id="sl-final-cta"
            className="text-xl px-12 py-8 bg-background text-foreground hover:bg-background/90 mb-4"
            editable={editable}
            {...props}
          >
            Claim Your 50% Discount Now
          </EditableButton>
          <EditableText id="sl-final-urgency" className="text-sm opacity-90" editable={editable} {...props}>
            ⏰ Offer expires in 24 hours • Only 47 spots remaining
          </EditableText>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[1, 2, 3, 4].map((n) => (
              <EditableImage
                key={n}
                id={`sl-trust-${n}`}
                src={`/placeholder.svg?height=40&width=100&query=trust%20badge%20${n}`}
                alt={`Trust ${n}`}
                className="h-10 w-auto opacity-60"
                editable={editable}
                {...props}
              />
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 text-center">
          <EditableText id="sl-footer" className="text-sm text-muted-foreground" editable={editable} {...props}>
            © 2025 ProFitness Elite. All rights reserved. | Privacy Policy | Terms of Service
          </EditableText>
        </div>
      </footer>
    </main>
  )
}
