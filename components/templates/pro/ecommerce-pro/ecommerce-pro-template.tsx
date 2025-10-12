"use client"
import type { TemplateProps } from "../../types"
import { EditableButton, EditableImage, EditableText } from "../../shared/editable"

export function EcommerceProTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-background text-foreground">
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <EditableText id="ecommerce_pro_brand" as="h1" className="text-xl font-bold" editable={editable} {...props}>
            ShopPro
          </EditableText>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <EditableText id="ecommerce_pro_nav_1" editable={editable} {...props}>
              Shop
            </EditableText>
            <EditableText id="ecommerce_pro_nav_2" editable={editable} {...props}>
              Collections
            </EditableText>
            <EditableText id="ecommerce_pro_nav_3" editable={editable} {...props}>
              About
            </EditableText>
            <EditableText id="ecommerce_pro_nav_4" editable={editable} {...props}>
              Contact
            </EditableText>
          </nav>
          <div className="flex items-center gap-3">
            <EditableButton id="ecommerce_pro_nav_cart" className="bg-transparent text-foreground border border-border hover:bg-accent" editable={editable} {...props}>
              Cart (0)
            </EditableButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-muted/50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <EditableText
                id="ecommerce_pro_hero_badge"
                className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
                editable={editable}
                {...props}
              >
                New Collection
              </EditableText>
              <EditableText
                id="ecommerce_pro_hero_headline"
                as="h2"
                className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
                editable={editable}
                {...props}
              >
                Discover Your Perfect Style
              </EditableText>
              <EditableText
                id="ecommerce_pro_hero_subheadline"
                className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
                editable={editable}
                {...props}
              >
                Premium quality products curated for modern living. Free shipping on orders over $50.
              </EditableText>
              <div className="flex flex-col sm:flex-row gap-4">
                <EditableButton 
                  id="ecommerce_pro_hero_cta_primary" 
                  className="text-base px-8 py-6 h-auto"
                  editable={editable} 
                  {...props}
                >
                  Shop Now
                </EditableButton>
                <EditableButton
                  id="ecommerce_pro_hero_cta_secondary"
                  className="text-base px-8 py-6 h-auto bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  editable={editable}
                  {...props}
                >
                  View Collections
                </EditableButton>
              </div>
            </div>
            <div>
              <EditableImage
                id="ecommerce_pro_hero_image"
                src="/placeholder.svg"
                alt="Hero product"
                className="w-full rounded-lg shadow-xl"
                editable={editable}
                {...props}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <EditableText id={`ecommerce_pro_feature_icon_${i}`} className="text-2xl" editable={editable} {...props}>
                    {i === 1 ? "🚚" : i === 2 ? "🔒" : i === 3 ? "↩️" : "💳"}
                  </EditableText>
                </div>
                <EditableText
                  id={`ecommerce_pro_feature_title_${i}`}
                  as="h3"
                  className="font-semibold mb-2"
                  editable={editable}
                  {...props}
                >
                  {i === 1 ? "Free Shipping" : i === 2 ? "Secure Payment" : i === 3 ? "Easy Returns" : "24/7 Support"}
                </EditableText>
                <EditableText
                  id={`ecommerce_pro_feature_desc_${i}`}
                  className="text-sm text-muted-foreground"
                  editable={editable}
                  {...props}
                >
                  {i === 1 ? "On orders over $50" : i === 2 ? "100% secure checkout" : i === 3 ? "30-day return policy" : "We're here to help"}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <EditableText
              id="ecommerce_pro_featured_title"
              as="h2"
              className="text-3xl md:text-5xl font-bold mb-4"
              editable={editable}
              {...props}
            >
              Featured Products
            </EditableText>
            <EditableText
              id="ecommerce_pro_featured_subtitle"
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              editable={editable}
              {...props}
            >
              Handpicked favorites from our latest collection
            </EditableText>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-background rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow group">
                <div className="relative overflow-hidden aspect-square">
                  <EditableImage
                    id={`ecommerce_pro_product_image_${i}`}
                    src="/placeholder.svg"
                    alt={`Product ${i}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    editable={editable}
                    {...props}
                  />
                  <div className="absolute top-2 right-2">
                    <EditableText
                      id={`ecommerce_pro_product_badge_${i}`}
                      className="text-xs font-semibold px-2 py-1 rounded bg-primary text-primary-foreground"
                      editable={editable}
                      {...props}
                    >
                      {i % 3 === 0 ? "Sale" : i % 2 === 0 ? "New" : ""}
                    </EditableText>
                  </div>
                </div>
                <div className="p-4">
                  <EditableText
                    id={`ecommerce_pro_product_category_${i}`}
                    className="text-xs text-muted-foreground mb-1"
                    editable={editable}
                    {...props}
                  >
                    {i <= 2 ? "Clothing" : i <= 4 ? "Accessories" : i <= 6 ? "Shoes" : "Home"}
                  </EditableText>
                  <EditableText
                    id={`ecommerce_pro_product_name_${i}`}
                    as="h3"
                    className="font-semibold mb-2"
                    editable={editable}
                    {...props}
                  >
                    Product Name {i}
                  </EditableText>
                  <div className="flex items-center justify-between">
                    <EditableText
                      id={`ecommerce_pro_product_price_${i}`}
                      className="text-lg font-bold"
                      editable={editable}
                      {...props}
                    >
                      ${(29.99 + i * 10).toFixed(2)}
                    </EditableText>
                    <EditableButton
                      id={`ecommerce_pro_product_cta_${i}`}
                      className="text-sm px-4 py-2 h-auto"
                      editable={editable}
                      {...props}
                    >
                      Add to Cart
                    </EditableButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <EditableText
              id="ecommerce_pro_collections_title"
              as="h2"
              className="text-3xl md:text-5xl font-bold mb-4"
              editable={editable}
              {...props}
            >
              Shop by Collection
            </EditableText>
            <EditableText
              id="ecommerce_pro_collections_subtitle"
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              editable={editable}
              {...props}
            >
              Curated collections for every occasion
            </EditableText>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative group cursor-pointer overflow-hidden rounded-lg">
                <EditableImage
                  id={`ecommerce_pro_collection_image_${i}`}
                  src="/placeholder.svg"
                  alt={`Collection ${i}`}
                  className="w-full h-96 object-cover group-hover:scale-105 transition-transform"
                  editable={editable}
                  {...props}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                  <div>
                    <EditableText
                      id={`ecommerce_pro_collection_name_${i}`}
                      as="h3"
                      className="text-2xl font-bold text-white mb-2"
                      editable={editable}
                      {...props}
                    >
                      {i === 1 ? "Summer Collection" : i === 2 ? "Winter Essentials" : "Spring Arrivals"}
                    </EditableText>
                    <EditableText
                      id={`ecommerce_pro_collection_desc_${i}`}
                      className="text-white/90 mb-4"
                      editable={editable}
                      {...props}
                    >
                      {i === 1 ? "Light & breezy styles" : i === 2 ? "Stay warm in style" : "Fresh new looks"}
                    </EditableText>
                    <EditableButton
                      id={`ecommerce_pro_collection_cta_${i}`}
                      className="bg-white text-foreground hover:bg-white/90"
                      editable={editable}
                      {...props}
                    >
                      Shop Collection
                    </EditableButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <EditableText
              id="ecommerce_pro_testimonials_title"
              as="h2"
              className="text-3xl md:text-5xl font-bold mb-4"
              editable={editable}
              {...props}
            >
              What Our Customers Say
            </EditableText>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-background p-8 rounded-lg border border-border">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, idx) => (
                    <span key={idx} className="text-yellow-500">★</span>
                  ))}
                </div>
                <EditableText
                  id={`ecommerce_pro_testimonial_text_${i}`}
                  className="text-lg mb-6 leading-relaxed"
                  editable={editable}
                  {...props}
                >
                  {i === 1 ? "Amazing quality and fast shipping! The products exceeded my expectations. Will definitely shop again." :
                   i === 2 ? "Love the attention to detail and customer service. Every purchase has been perfect." :
                   "Best online shopping experience I've had. The quality is outstanding and prices are fair."}
                </EditableText>
                <div className="flex items-center gap-3">
                  <EditableImage
                    id={`ecommerce_pro_testimonial_avatar_${i}`}
                    src="/placeholder.svg"
                    alt="Customer avatar"
                    className="w-12 h-12 rounded-full"
                    editable={editable}
                    {...props}
                  />
                  <div>
                    <EditableText
                      id={`ecommerce_pro_testimonial_name_${i}`}
                      className="font-semibold"
                      editable={editable}
                      {...props}
                    >
                      {i === 1 ? "Jessica Miller" : i === 2 ? "David Park" : "Amanda Chen"}
                    </EditableText>
                    <EditableText
                      id={`ecommerce_pro_testimonial_location_${i}`}
                      className="text-sm text-muted-foreground"
                      editable={editable}
                      {...props}
                    >
                      {i === 1 ? "New York, NY" : i === 2 ? "Los Angeles, CA" : "Chicago, IL"}
                    </EditableText>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <EditableText
              id="ecommerce_pro_instagram_title"
              as="h2"
              className="text-3xl md:text-5xl font-bold mb-4"
              editable={editable}
              {...props}
            >
              Follow Us on Instagram
            </EditableText>
            <EditableText
              id="ecommerce_pro_instagram_subtitle"
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
              editable={editable}
              {...props}
            >
              @shoppro - Tag us in your photos for a chance to be featured
            </EditableText>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-lg">
                <EditableImage
                  id={`ecommerce_pro_instagram_image_${i}`}
                  src="/placeholder.svg"
                  alt={`Instagram post ${i}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform cursor-pointer"
                  editable={editable}
                  {...props}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <EditableText
            id="ecommerce_pro_newsletter_title"
            as="h2"
            className="text-3xl md:text-5xl font-bold mb-6"
            editable={editable}
            {...props}
          >
            Join Our Newsletter
          </EditableText>
          <EditableText
            id="ecommerce_pro_newsletter_subtitle"
            className="text-lg mb-8 opacity-90"
            editable={editable}
            {...props}
          >
            Subscribe to get special offers, free giveaways, and exclusive deals.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <EditableButton
              id="ecommerce_pro_newsletter_cta"
              className="bg-background text-foreground hover:bg-background/90 text-base px-8 py-6 h-auto"
              editable={editable}
              {...props}
            >
              Subscribe Now
            </EditableButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <EditableText id="ecommerce_pro_footer_brand" as="h3" className="text-lg font-bold mb-4" editable={editable} {...props}>
                ShopPro
              </EditableText>
              <EditableText id="ecommerce_pro_footer_tagline" className="text-sm text-muted-foreground" editable={editable} {...props}>
                Your destination for quality products and exceptional service.
              </EditableText>
            </div>
            <div>
              <EditableText id="ecommerce_pro_footer_col1_title" as="h4" className="font-semibold mb-4" editable={editable} {...props}>
                Shop
              </EditableText>
              <ul className="space-y-2 text-sm">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i}>
                    <EditableText id={`ecommerce_pro_footer_shop_${i}`} editable={editable} {...props}>
                      {i === 1 ? "New Arrivals" : i === 2 ? "Best Sellers" : i === 3 ? "Sale" : "Collections"}
                    </EditableText>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <EditableText id="ecommerce_pro_footer_col2_title" as="h4" className="font-semibold mb-4" editable={editable} {...props}>
                Customer Service
              </EditableText>
              <ul className="space-y-2 text-sm">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i}>
                    <EditableText id={`ecommerce_pro_footer_service_${i}`} editable={editable} {...props}>
                      {i === 1 ? "Contact Us" : i === 2 ? "Shipping Info" : i === 3 ? "Returns" : "FAQ"}
                    </EditableText>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <EditableText id="ecommerce_pro_footer_col3_title" as="h4" className="font-semibold mb-4" editable={editable} {...props}>
                Follow Us
              </EditableText>
              <ul className="space-y-2 text-sm">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i}>
                    <EditableText id={`ecommerce_pro_footer_social_${i}`} editable={editable} {...props}>
                      {i === 1 ? "Instagram" : i === 2 ? "Facebook" : i === 3 ? "Twitter" : "Pinterest"}
                    </EditableText>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center">
            <EditableText id="ecommerce_pro_footer_copyright" className="text-sm text-muted-foreground" editable={editable} {...props}>
              © 2024 ShopPro. All rights reserved.
            </EditableText>
          </div>
        </div>
      </footer>
    </main>
  )
}
