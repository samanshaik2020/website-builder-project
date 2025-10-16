"use client"
import type { TemplateProps } from "../../types"
import { EditableButton, EditableImage, EditableText } from "../../shared/editable"

export function AgencyProNatureCalm(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-gradient-to-br from-green-50 to-teal-50 text-gray-900">
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b-2 border-green-600 bg-white/95 backdrop-blur shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <EditableText id="agency_pro_brand" as="h1" className="text-xl font-bold text-green-800" editable={editable} {...props}>
            CreativeStudio
          </EditableText>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-green-700">
            <EditableText id="agency_pro_nav_1" editable={editable} {...props}>
              Services
            </EditableText>
            <EditableText id="agency_pro_nav_2" editable={editable} {...props}>
              Work
            </EditableText>
            <EditableText id="agency_pro_nav_3" editable={editable} {...props}>
              About
            </EditableText>
            <EditableText id="agency_pro_nav_4" editable={editable} {...props}>
              Blog
            </EditableText>
            <EditableText id="agency_pro_nav_5" editable={editable} {...props}>
              Contact
            </EditableText>
          </nav>
          <div className="flex items-center gap-3">
            <EditableButton id="agency_pro_nav_cta" className="bg-green-600 text-white hover:bg-green-700" editable={editable} {...props}>
              Get Started
            </EditableButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28">
        <div className="text-center max-w-4xl mx-auto">
          <EditableText
            id="agency_pro_hero_headline"
            as="h2"
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-green-900"
            editable={editable}
            {...props}
          >
            We Create Digital Experiences That Matter
          </EditableText>
          <EditableText
            id="agency_pro_hero_subheadline"
            className="text-lg md:text-xl text-green-800 mb-8 leading-relaxed max-w-3xl mx-auto"
            editable={editable}
            {...props}
          >
            Award-winning creative agency specializing in branding, web design, and digital marketing. Let's bring your vision to life.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EditableButton 
              id="agency_pro_hero_cta_primary" 
              className="text-base px-8 py-6 h-auto bg-green-600 text-white hover:bg-green-700"
              editable={editable} 
              {...props}
            >
              Start Your Project
            </EditableButton>
            <EditableButton
              id="agency_pro_hero_cta_secondary"
              className="text-base px-8 py-6 h-auto bg-white text-green-600 border-2 border-green-600 hover:bg-green-50"
              editable={editable}
              {...props}
            >
              View Our Work
            </EditableButton>
          </div>
        </div>
        <div className="mt-16 relative">
          <EditableImage
            id="agency_pro_hero_image"
            src="/abstract-product-screenshot.jpg"
            alt="Agency showcase"
            className="w-full rounded-lg shadow-2xl"
            editable={editable}
            {...props}
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <EditableText
              id="agency_pro_services_title"
              as="h3"
              className="text-3xl md:text-5xl font-bold mb-4"
              editable={editable}
              {...props}
            >
              Our Services
            </EditableText>
            <EditableText
              id="agency_pro_services_subtitle"
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              editable={editable}
              {...props}
            >
              Comprehensive solutions to elevate your brand and drive growth
            </EditableText>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4">
                  <EditableText 
                    id={`agency_pro_service_icon_${i}`} 
                    className="text-2xl"
                    editable={editable} 
                    {...props}
                  >
                    {i === 1 ? "🎨" : i === 2 ? "💻" : i === 3 ? "📱" : i === 4 ? "🚀" : i === 5 ? "📊" : "✨"}
                  </EditableText>
                </div>
                <EditableText
                  id={`agency_pro_service_title_${i}`}
                  as="h4"
                  className="text-xl font-bold mb-3"
                  editable={editable}
                  {...props}
                >
                  {i === 1 ? "Brand Identity" : 
                   i === 2 ? "Web Design" : 
                   i === 3 ? "Mobile Apps" : 
                   i === 4 ? "Digital Marketing" : 
                   i === 5 ? "SEO & Analytics" : 
                   "Content Strategy"}
                </EditableText>
                <EditableText
                  id={`agency_pro_service_desc_${i}`}
                  className="text-gray-600"
                  editable={editable}
                  {...props}
                >
                  {i === 1 ? "Create a memorable brand that resonates with your audience and stands out from the competition." : 
                   i === 2 ? "Beautiful, responsive websites that convert visitors into customers and deliver exceptional user experiences." : 
                   i === 3 ? "Native and cross-platform mobile applications that engage users and drive business growth." : 
                   i === 4 ? "Data-driven marketing campaigns that reach your target audience and maximize ROI." : 
                   i === 5 ? "Optimize your online presence and track performance with advanced analytics and SEO strategies." : 
                   "Strategic content that tells your story, builds trust, and drives meaningful engagement."}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <EditableText
              id="agency_pro_cases_title"
              as="h3"
              className="text-3xl md:text-5xl font-bold mb-4"
              editable={editable}
              {...props}
            >
              Featured Work
            </EditableText>
            <EditableText
              id="agency_pro_cases_subtitle"
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              editable={editable}
              {...props}
            >
              Success stories from our amazing clients
            </EditableText>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <EditableImage
                    id={`agency_pro_case_image_${i}`}
                    src="/placeholder.svg?height=320&width=600"
                    alt={`Case study ${i}`}
                    className="w-full h-80 object-cover transition-transform group-hover:scale-105"
                    editable={editable}
                    {...props}
                  />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <EditableText
                    id={`agency_pro_case_tag_${i}`}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600"
                    editable={editable}
                    {...props}
                  >
                    {i === 1 ? "Branding" : i === 2 ? "Web Design" : i === 3 ? "Marketing" : "Mobile App"}
                  </EditableText>
                </div>
                <EditableText
                  id={`agency_pro_case_title_${i}`}
                  as="h4"
                  className="text-2xl font-bold mb-2"
                  editable={editable}
                  {...props}
                >
                  {i === 1 ? "TechStart Rebranding" : 
                   i === 2 ? "E-commerce Platform" : 
                   i === 3 ? "Growth Campaign" : 
                   "Fitness App Launch"}
                </EditableText>
                <EditableText
                  id={`agency_pro_case_desc_${i}`}
                  className="text-gray-600 mb-4"
                  editable={editable}
                  {...props}
                >
                  {i === 1 ? "Complete brand overhaul for a leading tech startup, resulting in 300% increase in brand recognition." : 
                   i === 2 ? "Custom e-commerce solution that increased conversion rates by 150% and revenue by $2M annually." : 
                   i === 3 ? "Multi-channel marketing campaign that generated 50K+ leads and 200% ROI in 6 months." : 
                   "Award-winning fitness app with 100K+ downloads and 4.8-star rating in first month."}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <EditableText
              id="agency_pro_testimonials_title"
              as="h3"
              className="text-3xl md:text-5xl font-bold mb-4"
              editable={editable}
              {...props}
            >
              What Our Clients Say
            </EditableText>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-lg border border-gray-200">
                <div className="flex items-center gap-1 mb-4 text-yellow-500">
                  <EditableText id={`agency_pro_testimonial_rating_${i}`} editable={editable} {...props}>
                    ★★★★★
                  </EditableText>
                </div>
                <EditableText
                  id={`agency_pro_testimonial_text_${i}`}
                  className="text-lg mb-6 leading-relaxed"
                  editable={editable}
                  {...props}
                >
                  {i === 1 ? "Working with CreativeStudio transformed our business. Their strategic approach and creative excellence exceeded all expectations." :
                   i === 2 ? "The team's professionalism and attention to detail is unmatched. They delivered a stunning website that perfectly captures our brand." :
                   "Best agency we've ever worked with. They understood our vision and brought it to life beyond what we imagined."}
                </EditableText>
                <div className="flex items-center gap-3">
                  <EditableImage
                    id={`agency_pro_testimonial_avatar_${i}`}
                    src={`/placeholder.svg?height=48&width=48&query=avatar%20${i}`}
                    alt={`Client ${i}`}
                    className="w-12 h-12 rounded-full"
                    editable={editable}
                    {...props}
                  />
                  <div>
                    <EditableText
                      id={`agency_pro_testimonial_name_${i}`}
                      className="font-semibold"
                      editable={editable}
                      {...props}
                    >
                      {i === 1 ? "Sarah Johnson" : i === 2 ? "Michael Chen" : "Emily Rodriguez"}
                    </EditableText>
                    <EditableText
                      id={`agency_pro_testimonial_role_${i}`}
                      className="text-sm text-gray-600"
                      editable={editable}
                      {...props}
                    >
                      {i === 1 ? "CEO, TechVision" : i === 2 ? "Founder, StyleHub" : "Director, GrowthLab"}
                    </EditableText>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <EditableText
              id="agency_pro_team_title"
              as="h3"
              className="text-3xl md:text-5xl font-bold mb-4"
              editable={editable}
              {...props}
            >
              Meet Our Team
            </EditableText>
            <EditableText
              id="agency_pro_team_subtitle"
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              editable={editable}
              {...props}
            >
              Talented professionals passionate about creating exceptional work
            </EditableText>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center">
                <EditableImage
                  id={`agency_pro_team_photo_${i}`}
                  src={`/placeholder.svg?height=300&width=300&query=team%20${i}`}
                  alt={`Team member ${i}`}
                  className="w-full aspect-square object-cover rounded-lg mb-4"
                  editable={editable}
                  {...props}
                />
                <EditableText
                  id={`agency_pro_team_name_${i}`}
                  as="h4"
                  className="text-xl font-bold mb-1"
                  editable={editable}
                  {...props}
                >
                  {i === 1 ? "Alex Morgan" : i === 2 ? "Jordan Lee" : i === 3 ? "Taylor Swift" : "Casey Brown"}
                </EditableText>
                <EditableText
                  id={`agency_pro_team_role_${i}`}
                  className="text-gray-600"
                  editable={editable}
                  {...props}
                >
                  {i === 1 ? "Creative Director" : i === 2 ? "Lead Designer" : i === 3 ? "Strategy Lead" : "Tech Director"}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <EditableText
              id="agency_pro_blog_title"
              as="h3"
              className="text-3xl md:text-5xl font-bold mb-4"
              editable={editable}
              {...props}
            >
              Latest Insights
            </EditableText>
            <EditableText
              id="agency_pro_blog_subtitle"
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              editable={editable}
              {...props}
            >
              Tips, trends, and thought leadership from our team
            </EditableText>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <EditableImage
                  id={`agency_pro_blog_image_${i}`}
                  src={`/placeholder.svg?height=192&width=400&query=blog%20${i}`}
                  alt={`Blog post ${i}`}
                  className="w-full h-48 object-cover"
                  editable={editable}
                  {...props}
                />
                <div className="p-6">
                  <EditableText
                    id={`agency_pro_blog_category_${i}`}
                    className="text-xs font-medium text-gray-600 mb-2"
                    editable={editable}
                    {...props}
                  >
                    {i === 1 ? "Design" : i === 2 ? "Marketing" : "Strategy"}
                  </EditableText>
                  <EditableText
                    id={`agency_pro_blog_title_${i}`}
                    as="h4"
                    className="text-xl font-bold mb-2"
                    editable={editable}
                    {...props}
                  >
                    {i === 1 ? "10 Design Trends Shaping 2024" : 
                     i === 2 ? "How to Build a Winning Brand" : 
                     "The Future of Digital Marketing"}
                  </EditableText>
                  <EditableText
                    id={`agency_pro_blog_excerpt_${i}`}
                    className="text-gray-600 mb-4"
                    editable={editable}
                    {...props}
                  >
                    {i === 1 ? "Discover the latest design trends that are transforming the digital landscape..." : 
                     i === 2 ? "Learn the essential strategies for creating a brand that resonates with your audience..." : 
                     "Explore emerging technologies and strategies that will define marketing success..."}
                  </EditableText>
                  <EditableText
                    id={`agency_pro_blog_date_${i}`}
                    className="text-sm text-gray-500"
                    editable={editable}
                    {...props}
                  >
                    {i === 1 ? "March 15, 2024" : i === 2 ? "March 10, 2024" : "March 5, 2024"}
                  </EditableText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <EditableText
              id="agency_pro_pricing_title"
              as="h3"
              className="text-3xl md:text-5xl font-bold mb-4"
              editable={editable}
              {...props}
            >
              Flexible Pricing
            </EditableText>
            <EditableText
              id="agency_pro_pricing_subtitle"
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              editable={editable}
              {...props}
            >
              Choose the package that fits your needs and budget
            </EditableText>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Starter", desc: "Perfect for small projects", price: "$2,500", period: "per project", popular: false },
              { name: "Professional", desc: "Ideal for growing businesses", price: "$7,500", period: "per project", popular: true },
              { name: "Enterprise", desc: "For large-scale needs", price: "$15,000", period: "per project", popular: false }
            ].map((plan, i) => (
              <div 
                key={i} 
                className={`p-8 rounded-lg border ${
                  plan.popular ? 'border-primary shadow-xl scale-105' : 'border-gray-200'
                } bg-white`}
              >
                <EditableText
                  id={`agency_pro_pricing_name_${i + 1}`}
                  as="h4"
                  className="text-2xl font-bold mb-2"
                  editable={editable}
                  {...props}
                >
                  {plan.name}
                </EditableText>
                <EditableText
                  id={`agency_pro_pricing_desc_${i + 1}`}
                  className="text-gray-600 mb-6"
                  editable={editable}
                  {...props}
                >
                  {plan.desc}
                </EditableText>
                <div className="mb-6">
                  <EditableText
                    id={`agency_pro_pricing_price_${i + 1}`}
                    className="text-4xl font-bold"
                    editable={editable}
                    {...props}
                  >
                    {plan.price}
                  </EditableText>
                  <EditableText
                    id={`agency_pro_pricing_period_${i + 1}`}
                    className="text-gray-600"
                    editable={editable}
                    {...props}
                  >
                    {plan.period}
                  </EditableText>
                </div>
                <ul className="space-y-3 mb-8">
                  {[1, 2, 3, 4, 5].map((j) => {
                    const features = [
                      ["Brand consultation", "Logo design", "Basic website (5 pages)", "1 month support", "Email support"],
                      ["Everything in Starter", "Full brand identity", "Custom website (15 pages)", "SEO optimization", "3 months support"],
                      ["Everything in Professional", "Multi-platform strategy", "Unlimited pages", "Advanced analytics", "12 months support"]
                    ]
                    return (
                      <li key={j} className="flex items-start gap-2">
                        <span className="text-primary mt-1">✓</span>
                        <EditableText
                          id={`agency_pro_pricing_feature_${i + 1}_${j}`}
                          className="text-sm"
                          editable={editable}
                          {...props}
                        >
                          {features[i][j - 1]}
                        </EditableText>
                      </li>
                    )
                  })}
                </ul>
                <EditableButton
                  id={`agency_pro_pricing_cta_${i + 1}`}
                  className={`w-full ${plan.popular ? '' : 'bg-secondary text-secondary-foreground hover:bg-secondary/90'}`}
                  editable={editable}
                  {...props}
                >
                  Get Started
                </EditableButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <EditableText
            id="agency_pro_cta_title"
            as="h3"
            className="text-3xl md:text-5xl font-bold mb-6"
            editable={editable}
            {...props}
          >
            Ready to Start Your Project?
          </EditableText>
          <EditableText
            id="agency_pro_cta_subtitle"
            className="text-lg mb-8 opacity-90"
            editable={editable}
            {...props}
          >
            Let's discuss how we can help bring your vision to life. Get in touch today for a free consultation.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EditableButton 
              id="agency_pro_cta_primary" 
              className="bg-background text-foreground hover:bg-background/90 px-8 py-4 h-auto font-semibold"
              editable={editable} 
              {...props}
            >
              Get Started
            </EditableButton>
            <EditableButton
              id="agency_pro_cta_secondary"
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 px-8 py-4 h-auto font-semibold"
              editable={editable}
              {...props}
            >
              Schedule Call
            </EditableButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <EditableText id="agency_pro_footer_brand" as="h5" className="text-lg font-bold mb-4" editable={editable} {...props}>
                CreativeStudio
              </EditableText>
              <EditableText
                id="agency_pro_footer_tagline"
                className="text-sm text-gray-600"
                editable={editable}
                {...props}
              >
                Creating digital experiences that matter since 2015.
              </EditableText>
            </div>
            
            {[
              { title: "Services", items: ["Branding", "Web Design", "Marketing", "Development"] },
              { title: "Company", items: ["About Us", "Careers", "Blog", "Contact"] },
              { title: "Connect", items: ["Twitter", "LinkedIn", "Instagram", "Dribbble"] }
            ].map((column, colIdx) => (
              <div key={colIdx}>
                <EditableText
                  id={`agency_pro_footer_col${colIdx + 1}_title`}
                  as="h6"
                  className="font-semibold mb-4"
                  editable={editable}
                  {...props}
                >
                  {column.title}
                </EditableText>
                <ul className="space-y-2 text-sm">
                  {column.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <EditableText
                        id={`agency_pro_footer_${colIdx === 0 ? 'service' : colIdx === 1 ? 'company' : 'social'}_${itemIdx + 1}`}
                        editable={editable}
                        {...props}
                      >
                        {item}
                      </EditableText>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-8 text-center">
            <EditableText
              id="agency_pro_footer_copyright"
              className="text-sm text-gray-600"
              editable={editable}
              {...props}
            >
              © 2024 CreativeStudio. All rights reserved.
            </EditableText>
          </div>
        </div>
      </footer>
    </main>
  )
}
