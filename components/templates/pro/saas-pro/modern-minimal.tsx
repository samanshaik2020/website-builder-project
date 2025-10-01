"use client"
import type { TemplateProps } from "../../types"
import { EditableButton, EditableImage, EditableText } from "../../shared/editable"

export function SaaSProModernMinimal(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-white text-black">
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <EditableText id="saas_pro_brand" as="h1" className="text-xl font-light tracking-wide" editable={editable} {...props}>
            InnovatePro
          </EditableText>
          <nav className="hidden md:flex items-center gap-8 text-sm font-light">
            <EditableText id="saas_pro_nav_1" className="hover:text-gray-600 transition-colors" editable={editable} {...props}>
              Features
            </EditableText>
            <EditableText id="saas_pro_nav_2" className="hover:text-gray-600 transition-colors" editable={editable} {...props}>
              Solutions
            </EditableText>
            <EditableText id="saas_pro_nav_3" className="hover:text-gray-600 transition-colors" editable={editable} {...props}>
              Pricing
            </EditableText>
            <EditableText id="saas_pro_nav_4" className="hover:text-gray-600 transition-colors" editable={editable} {...props}>
              Resources
            </EditableText>
            <EditableText id="saas_pro_nav_5" className="hover:text-gray-600 transition-colors" editable={editable} {...props}>
              Company
            </EditableText>
          </nav>
          <div className="flex items-center gap-3">
            <EditableButton 
              id="saas_pro_nav_signin" 
              className="hidden md:inline-flex bg-transparent text-black border border-gray-300 hover:bg-gray-50 font-light" 
              editable={editable} 
              {...props}
            >
              Sign In
            </EditableButton>
            <EditableButton id="saas_pro_nav_cta" className="bg-black text-white hover:bg-gray-800 font-light" editable={editable} {...props}>
              Get Started Free
            </EditableButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-300 text-gray-600 text-xs font-light mb-6">
            <EditableText id="saas_pro_hero_badge" editable={editable} {...props}>
              ✨ New: AI-Powered Analytics Dashboard
            </EditableText>
          </div>
          <EditableText
            id="saas_pro_hero_headline"
            as="h2"
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6 leading-none"
            editable={editable}
            {...props}
          >
            Transform Your Business with Intelligent Automation
          </EditableText>
          <EditableText
            id="saas_pro_hero_subheadline"
            className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto font-light"
            editable={editable}
            {...props}
          >
            Streamline operations, boost productivity, and scale effortlessly with our all-in-one platform trusted by over 10,000 companies worldwide.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <EditableButton 
              id="saas_pro_hero_cta_primary" 
              className="text-base px-8 py-4 h-auto bg-black text-white hover:bg-gray-800 font-light"
              editable={editable} 
              {...props}
            >
              Start Your Free Trial
            </EditableButton>
            <EditableButton
              id="saas_pro_hero_cta_secondary"
              className="text-base px-8 py-4 h-auto bg-white text-black border border-gray-300 hover:bg-gray-50 font-light"
              editable={editable}
              {...props}
            >
              Watch Demo
            </EditableButton>
          </div>
          <EditableText 
            id="saas_pro_hero_note" 
            className="text-xs text-gray-500 font-light"
            editable={editable} 
            {...props}
          >
            No credit card required • Free 14-day trial • Cancel anytime
          </EditableText>
        </div>
        <div className="mt-20 relative">
          <EditableImage
            id="saas_pro_hero_image"
            src="/abstract-product-screenshot.jpg"
            alt="Product dashboard preview"
            className="w-full max-w-5xl mx-auto rounded-lg shadow-2xl border border-gray-200"
            editable={editable}
            {...props}
          />
        </div>
      </section>

      {/* Social Proof / Logos */}
      <section className="border-y border-gray-200 bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <EditableText
            id="saas_pro_logos_heading"
            className="text-center text-xs font-light text-gray-500 mb-8 uppercase tracking-widest"
            editable={editable}
            {...props}
          >
            Trusted by industry-leading companies worldwide
          </EditableText>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            {[1, 2, 3, 4, 5].map((n) => (
              <EditableImage
                key={n}
                id={`saas_pro_logo_${n}`}
                src={`/placeholder.svg?height=40&width=140&query=company%20logo%20${n}`}
                alt={`Partner company ${n}`}
                className="mx-auto h-8 md:h-10 w-auto opacity-40 hover:opacity-100 transition-opacity grayscale"
                editable={editable}
                {...props}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <EditableText
            id="saas_pro_features_eyebrow"
            className="text-gray-500 font-light text-xs uppercase tracking-widest mb-3"
            editable={editable}
            {...props}
          >
            Powerful Features
          </EditableText>
          <EditableText
            id="saas_pro_features_headline"
            as="h3"
            className="text-4xl md:text-6xl font-light mb-4"
            editable={editable}
            {...props}
          >
            Everything You Need to Succeed
          </EditableText>
          <EditableText
            id="saas_pro_features_subheadline"
            className="text-lg text-gray-600 font-light"
            editable={editable}
            {...props}
          >
            Our comprehensive suite of tools and integrations helps you work smarter, not harder.
          </EditableText>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="group">
              <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center mb-4 group-hover:border-black transition-colors">
                <EditableText 
                  id={`saas_pro_feature_${n}_icon`} 
                  className="text-2xl"
                  editable={editable} 
                  {...props}
                >
                  {n === 1 ? "⚡" : n === 2 ? "🎯" : n === 3 ? "🔒" : n === 4 ? "📊" : n === 5 ? "🚀" : "💡"}
                </EditableText>
              </div>
              <EditableText
                id={`saas_pro_feature_${n}_title`}
                as="h4"
                className="text-xl font-light mb-2"
                editable={editable}
                {...props}
              >
                {n === 1 ? "Lightning Fast Performance" : 
                 n === 2 ? "Precision Targeting" : 
                 n === 3 ? "Bank-Grade Security" : 
                 n === 4 ? "Advanced Analytics" : 
                 n === 5 ? "Seamless Integrations" : 
                 "Smart Automation"}
              </EditableText>
              <EditableText
                id={`saas_pro_feature_${n}_description`}
                className="text-gray-600 leading-relaxed font-light text-sm"
                editable={editable}
                {...props}
              >
                {n === 1 ? "Experience blazing-fast load times and instant data processing that keeps your team moving forward." : 
                 n === 2 ? "Reach the right audience at the right time with intelligent targeting and segmentation tools." : 
                 n === 3 ? "Enterprise-grade encryption and compliance standards protect your sensitive business data 24/7." : 
                 n === 4 ? "Turn data into insights with real-time dashboards, custom reports, and predictive analytics." : 
                 n === 5 ? "Connect with 100+ tools you already use. Set up takes minutes, not hours." : 
                 "Automate repetitive tasks and workflows so your team can focus on what really matters."}
              </EditableText>
            </div>
          ))}
        </div>
      </section>

      {/* Stats / Metrics Section */}
      <section className="border-y border-gray-200 bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <EditableText
              id="saas_pro_stats_headline"
              as="h3"
              className="text-4xl md:text-5xl font-light mb-4"
              editable={editable}
              {...props}
            >
              Results That Speak for Themselves
            </EditableText>
            <EditableText
              id="saas_pro_stats_subheadline"
              className="text-lg text-gray-600 font-light"
              editable={editable}
              {...props}
            >
              Join thousands of businesses already seeing dramatic improvements
            </EditableText>
          </div>
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { metric: "10K+", label: "Active Users" },
              { metric: "99.9%", label: "Uptime SLA" },
              { metric: "4.9/5", label: "Customer Rating" },
              { metric: "24/7", label: "Support Available" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <EditableText
                  id={`saas_pro_stat_${i + 1}_number`}
                  className="text-5xl md:text-6xl font-light mb-2"
                  editable={editable}
                  {...props}
                >
                  {stat.metric}
                </EditableText>
                <EditableText
                  id={`saas_pro_stat_${i + 1}_label`}
                  className="text-gray-600 font-light text-sm"
                  editable={editable}
                  {...props}
                >
                  {stat.label}
                </EditableText>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="text-center mb-20">
          <EditableText
            id="saas_pro_testimonials_eyebrow"
            className="text-gray-500 font-light text-xs uppercase tracking-widest mb-3"
            editable={editable}
            {...props}
          >
            Testimonials
          </EditableText>
          <EditableText
            id="saas_pro_testimonials_headline"
            as="h3"
            className="text-4xl md:text-6xl font-light"
            editable={editable}
            {...props}
          >
            Loved by Teams Everywhere
          </EditableText>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="p-8 border border-gray-200 bg-white">
              <div className="flex items-center gap-1 mb-4 text-gray-400 text-sm">
                <EditableText id={`saas_pro_testimonial_${n}_rating`} editable={editable} {...props}>
                  ⭐⭐⭐⭐⭐
                </EditableText>
              </div>
              <EditableText
                id={`saas_pro_testimonial_${n}_quote`}
                className="text-base mb-6 leading-relaxed font-light"
                editable={editable}
                {...props}
              >
                {n === 1 ? "This platform has completely transformed how we operate. The automation features alone have saved us 20+ hours per week." :
                 n === 2 ? "The best investment we've made for our business. Intuitive, powerful, and the support team is phenomenal." :
                 "We tried multiple solutions before finding this one. Nothing else comes close in terms of features and ease of use."}
              </EditableText>
              <div className="flex items-center gap-3">
                <EditableImage
                  id={`saas_pro_testimonial_${n}_avatar`}
                  src={`/placeholder.svg?height=48&width=48&query=avatar%20${n}`}
                  alt={`Customer ${n}`}
                  className="w-12 h-12 rounded-full border border-gray-200"
                  editable={editable}
                  {...props}
                />
                <div>
                  <EditableText
                    id={`saas_pro_testimonial_${n}_name`}
                    className="font-light"
                    editable={editable}
                    {...props}
                  >
                    {n === 1 ? "Sarah Johnson" : n === 2 ? "Michael Chen" : "Emily Rodriguez"}
                  </EditableText>
                  <EditableText
                    id={`saas_pro_testimonial_${n}_title`}
                    className="text-xs text-gray-500 font-light"
                    editable={editable}
                    {...props}
                  >
                    {n === 1 ? "CEO, TechFlow Inc." : n === 2 ? "Product Lead, DataSync" : "Founder, GrowthLab"}
                  </EditableText>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32 border-t border-gray-200">
        <div className="text-center mb-20">
          <EditableText
            id="saas_pro_pricing_eyebrow"
            className="text-gray-500 font-light text-xs uppercase tracking-widest mb-3"
            editable={editable}
            {...props}
          >
            Pricing
          </EditableText>
          <EditableText
            id="saas_pro_pricing_headline"
            as="h3"
            className="text-4xl md:text-6xl font-light mb-4"
            editable={editable}
            {...props}
          >
            Simple, Transparent Pricing
          </EditableText>
          <EditableText
            id="saas_pro_pricing_subheadline"
            className="text-lg text-gray-600 font-light"
            editable={editable}
            {...props}
          >
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </EditableText>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            { name: "Starter", price: "$29", popular: false },
            { name: "Professional", price: "$79", popular: true },
            { name: "Enterprise", price: "$199", popular: false }
          ].map((plan, i) => (
            <div 
              key={i} 
              className={`relative p-8 border ${
                plan.popular ? 'border-black bg-gray-50' : 'border-gray-200 bg-white'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-black text-white text-xs font-light">
                  <EditableText id={`saas_pro_pricing_${i + 1}_badge`} editable={editable} {...props}>
                    Most Popular
                  </EditableText>
                </div>
              )}
              <EditableText
                id={`saas_pro_pricing_${i + 1}_name`}
                className="text-xl font-light mb-2"
                editable={editable}
                {...props}
              >
                {plan.name}
              </EditableText>
              <div className="mb-6">
                <EditableText
                  id={`saas_pro_pricing_${i + 1}_price`}
                  className="text-5xl font-light"
                  editable={editable}
                  {...props}
                >
                  {plan.price}
                </EditableText>
                <EditableText
                  id={`saas_pro_pricing_${i + 1}_period`}
                  className="text-gray-500 font-light text-sm"
                  editable={editable}
                  {...props}
                >
                  /month
                </EditableText>
              </div>
              <EditableText
                id={`saas_pro_pricing_${i + 1}_description`}
                className="text-xs text-gray-600 mb-6 font-light"
                editable={editable}
                {...props}
              >
                {i === 0 ? "Perfect for small teams getting started" :
                 i === 1 ? "Ideal for growing businesses that need more power" :
                 "Advanced features for large-scale operations"}
              </EditableText>
              <EditableButton 
                id={`saas_pro_pricing_${i + 1}_cta`} 
                className={`w-full mb-6 font-light ${plan.popular ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black border border-gray-300 hover:bg-gray-50'}`}
                editable={editable} 
                {...props}
              >
                {i === 2 ? "Contact Sales" : "Start Free Trial"}
              </EditableButton>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <span className="text-black mt-0.5">✓</span>
                    <EditableText
                      id={`saas_pro_pricing_${i + 1}_feature_${feature}`}
                      className="text-xs font-light"
                      editable={editable}
                      {...props}
                    >
                      {i === 0 && feature === 1 ? "Up to 10 team members" :
                       i === 0 && feature === 2 ? "5GB storage" :
                       i === 0 && feature === 3 ? "Basic analytics" :
                       i === 0 && feature === 4 ? "Email support" :
                       i === 0 && feature === 5 ? "Mobile apps" :
                       i === 1 && feature === 1 ? "Up to 50 team members" :
                       i === 1 && feature === 2 ? "50GB storage" :
                       i === 1 && feature === 3 ? "Advanced analytics" :
                       i === 1 && feature === 4 ? "Priority support" :
                       i === 1 && feature === 5 ? "Custom integrations" :
                       i === 2 && feature === 1 ? "Unlimited team members" :
                       i === 2 && feature === 2 ? "Unlimited storage" :
                       i === 2 && feature === 3 ? "Enterprise analytics" :
                       i === 2 && feature === 4 ? "24/7 dedicated support" :
                       "Advanced security & compliance"}
                    </EditableText>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="border border-gray-200 p-16 text-center bg-gray-50">
          <EditableText
            id="saas_pro_cta_headline"
            as="h3"
            className="text-4xl md:text-6xl font-light mb-4"
            editable={editable}
            {...props}
          >
            Ready to Transform Your Workflow?
          </EditableText>
          <EditableText
            id="saas_pro_cta_subheadline"
            className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-light"
            editable={editable}
            {...props}
          >
            Join over 10,000 teams who have already made the switch. Start your free trial today.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EditableButton 
              id="saas_pro_cta_primary" 
              className="text-base px-8 py-4 h-auto bg-black text-white hover:bg-gray-800 font-light"
              editable={editable} 
              {...props}
            >
              Get Started Free
            </EditableButton>
            <EditableButton
              id="saas_pro_cta_secondary"
              className="text-base px-8 py-4 h-auto bg-white text-black border border-gray-300 hover:bg-gray-50 font-light"
              editable={editable}
              {...props}
            >
              Schedule a Demo
            </EditableButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-2">
              <EditableText id="saas_pro_footer_brand" as="h5" className="text-lg font-light mb-3" editable={editable} {...props}>
                InnovatePro
              </EditableText>
              <EditableText
                id="saas_pro_footer_tagline"
                className="text-xs text-gray-600 mb-4 max-w-xs font-light"
                editable={editable}
                {...props}
              >
                Empowering businesses with intelligent automation and cutting-edge technology.
              </EditableText>
            </div>
            
            {[
              { title: "Product", links: ["Features", "Integrations", "Pricing", "Security"] },
              { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
              { title: "Support", links: ["Help Center", "Contact", "Status", "API Docs"] }
            ].map((column, colIdx) => (
              <div key={colIdx}>
                <EditableText
                  id={`saas_pro_footer_col_${colIdx + 1}_title`}
                  className="font-light mb-3 text-sm"
                  editable={editable}
                  {...props}
                >
                  {column.title}
                </EditableText>
                <div className="space-y-2">
                  {column.links.map((link, linkIdx) => (
                    <EditableText
                      key={linkIdx}
                      id={`saas_pro_footer_col_${colIdx + 1}_link_${linkIdx + 1}`}
                      className="block text-xs text-gray-600 hover:text-black font-light transition-colors"
                      editable={editable}
                      {...props}
                    >
                      {link}
                    </EditableText>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <EditableText
              id="saas_pro_footer_copyright"
              className="text-xs text-gray-500 font-light"
              editable={editable}
              {...props}
            >
              © 2025 InnovatePro. All rights reserved.
            </EditableText>
            <div className="flex gap-6">
              <EditableText id="saas_pro_footer_legal_1" className="text-xs text-gray-500 hover:text-black font-light transition-colors" editable={editable} {...props}>
                Privacy Policy
              </EditableText>
              <EditableText id="saas_pro_footer_legal_2" className="text-xs text-gray-500 hover:text-black font-light transition-colors" editable={editable} {...props}>
                Terms of Service
              </EditableText>
              <EditableText id="saas_pro_footer_legal_3" className="text-xs text-gray-500 hover:text-black font-light transition-colors" editable={editable} {...props}>
                Cookie Policy
              </EditableText>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
