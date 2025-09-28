"use client"

import type { TemplateProps } from "../types"
import { EditableButton, EditableImage, EditableText } from "../shared/editable"

export function EcommerceProTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-background text-foreground">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 py-16 grid gap-8 md:grid-cols-2 items-center">
        <div className="flex flex-col gap-4">
          <EditableText
            id="ep-hero-title"
            as="h1"
            className="text-3xl md:text-5xl font-bold text-balance"
            editable={editable}
            {...props}
          >
            Modern ecommerce for your next big launch
          </EditableText>
          <EditableText
            id="ep-hero-sub"
            className="text-muted-foreground leading-relaxed"
            editable={editable}
            {...props}
          >
            Pro storefront sections, collection highlights, product features, and newsletter capture.
          </EditableText>
          <div className="flex gap-3">
            <EditableButton id="ep-hero-cta-1" editable={editable} {...props}>
              Shop new arrivals
            </EditableButton>
            <EditableButton
              id="ep-hero-cta-2"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              editable={editable}
              {...props}
            >
              Explore collections
            </EditableButton>
          </div>
        </div>
        <EditableImage
          id="ep-hero-image"
          src={"/placeholder.svg?height=420&width=640&query=ecommerce lifestyle hero"}
          alt="Lifestyle product"
          className="w-full h-auto rounded-lg md:justify-self-end"
          editable={editable}
          {...props}
        />
      </section>

      {/* Collections */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <EditableText
          id="ep-collections-title"
          as="h2"
          className="text-2xl md:text-3xl font-semibold mb-6"
          editable={editable}
          {...props}
        >
          Curated collections
        </EditableText>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border p-4 flex flex-col gap-3">
              <EditableImage
                id={`ep-col-${i}-image`}
                src={"/placeholder.svg?height=220&width=360&query=collection preview"}
                alt={`Collection ${i}`}
                className="w-full h-auto rounded-md"
                editable={editable}
                {...props}
              />
              <EditableText id={`ep-col-${i}-title`} as="h3" className="font-medium" editable={editable} {...props}>
                Collection {i}
              </EditableText>
              <EditableText
                id={`ep-col-${i}-desc`}
                className="text-muted-foreground text-sm leading-relaxed"
                editable={editable}
                {...props}
              >
                A short description of what makes this collection special.
              </EditableText>
              <EditableButton id={`ep-col-${i}-cta`} editable={editable} {...props}>
                View collection
              </EditableButton>
            </div>
          ))}
        </div>
      </section>

      {/* Featured product */}
      <section className="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-2 items-center">
        <EditableImage
          id="ep-featured-image"
          src={"/placeholder.svg?height=360&width=520&query=featured product"}
          alt="Featured product"
          className="w-full h-auto rounded-lg"
          editable={editable}
          {...props}
        />
        <div className="flex flex-col gap-3">
          <EditableText
            id="ep-featured-title"
            as="h3"
            className="text-xl md:text-2xl font-semibold"
            editable={editable}
            {...props}
          >
            Featured product
          </EditableText>
          <EditableText
            id="ep-featured-desc"
            className="text-muted-foreground leading-relaxed"
            editable={editable}
            {...props}
          >
            Highlight the craftsmanship and details that set this product apart.
          </EditableText>
          <div className="flex gap-3">
            <EditableButton id="ep-featured-buy" editable={editable} {...props}>
              Buy now
            </EditableButton>
            <EditableButton
              id="ep-featured-learn"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              editable={editable}
              {...props}
            >
              Learn more
            </EditableButton>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-6xl px-4 py-16 text-center">
        <EditableText
          id="ep-news-title"
          as="h2"
          className="text-2xl md:text-3xl font-semibold mb-3"
          editable={editable}
          {...props}
        >
          Get the latest drops
        </EditableText>
        <EditableText id="ep-news-sub" className="text-muted-foreground mb-6" editable={editable} {...props}>
          Subscribe to our newsletter for announcements and limited releases.
        </EditableText>
        <EditableButton id="ep-news-cta" editable={editable} {...props}>
          Subscribe
        </EditableButton>
      </section>
    </main>
  )
}
