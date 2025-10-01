"use client"
import type { TemplateProps } from "../../types"
import { EditableButton, EditableImage, EditableText } from "../../shared/editable"

export function SaaSProCorporateBlue(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-slate-50 text-slate-900">
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b-2 border-blue-600 bg-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 py-5 flex items-center justify-between">
          <EditableText id="saas_pro_brand" as="h1" className="text-2xl font-bold text-blue-900" editable={editable} {...props}>
            InnovatePro
          </EditableText>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <EditableText id="saas_pro_nav_1" className="hover:text-blue-600 transition-colors" editable={editable} {...props}>
              Features
            </EditableText>
            <EditableText id="saas_pro_nav_2" className="hover:text-blue-600 transition-colors" editable={editable} {...props}>
              Solutions
            </EditableText>
            <EditableText id="saas_pro_nav_3" className="hover:text-blue-600 transition-colors" editable={editable} {...props}>
              Pricing
            </EditableText>
            <EditableText id="saas_pro_nav_4" className="hover:text-blue-600 transition-colors" editable={editable} {...props}>
              Resources
            </EditableText>
            <EditableText id="saas_pro_nav_5" className="hover:text-blue-600 transition-colors" editable={editable} {...props}>
              Company
            </EditableText>
          </nav>
          <div className="flex items-center gap-3">
            <EditableButton 
              id="saas_pro_nav_signin" 
              className="hidden md:inline-flex bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 font-semibold" 
              editable={editable} 
              {...props}
            >
              Sign In
            </EditableButton>
            <EditableButton id="saas_pro_nav_cta" className="bg-blue-600 text-white hover:bg-blue-700 font-semibold shadow-lg" editable={editable} {...props}>
              Get Started Free
            </EditableButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:py-24 bg-gradient-to-br from-blue-50 to-slate-100">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-100 text-blue-800 text-sm font-semibold mb-6 border border-blue-200">
            <EditableText id="saas_pro_hero_badge" editable={editable} {...props}>
              ✨ New: AI-Powered Analytics Dashboard
            </EditableText>
          </div>
          <EditableText
            id="saas_pro_hero_headline"
            as="h2"
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-blue-900"
            editable={editable}
            {...props}
          >
            Transform Your Business with Intelligent Automation
          </EditableText>
          <EditableText
            id="saas_pro_hero_subheadline"
            className="text-lg md:text-xl text-slate-700 mb-8 leading-relaxed max-w-3xl mx-auto font-medium"
            editable={editable}
            {...props}
          >
            Streamline operations, boost productivity, and scale effortlessly with our all-in-one platform trusted by over 10,000 companies worldwide.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <EditableButton 
              id="saas_pro_hero_cta_primary" 
              className="text-base px-8 py-4 h-auto bg-blue-600 text-white hover:bg-blue-700 font-semibold shadow-xl"
              editable={editable} 
              {...props}
            >
              Start Your Free Trial
            </EditableButton>
            <EditableButton
              id="saas_pro_hero_cta_secondary"
              className="text-base px-8 py-4 h-auto bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 font-semibold"
              editable={editable}
              {...props}
            >
              Watch Demo
            </EditableButton>
          </div>
          <EditableText 
            id="saas_pro_hero_note" 
            className="text-sm text-slate-600 font-medium"
            editable={editable} 
            {...props}
          >
            No credit card required • Free 14-day trial • Cancel anytime
          </EditableText>
        </div>
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-blue-200 rounded-2xl blur-3xl opacity-20"></div>
          <EditableImage
            id="saas_pro_hero_image"
            src="/abstract-product-screenshot.jpg"
            alt="Product dashboard preview"
            className="relative w-full max-w-5xl mx-auto rounded-2xl shadow-2xl border-4 border-blue-600"
            editable={editable}
            {...props}
          />
        </div>
      </section>

      {/* Social Proof / Logos */}
      <section className="border-y-2 border-blue-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <EditableText
            id="saas_pro_logos_heading"
            className="text-center text-sm font-bold text-blue-900 mb-8 uppercase tracking-wider"
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
                className="mx-auto h-8 md:h-10 w-auto opacity-50 hover:opacity-100 transition-opacity"
                editable={editable}
                {...props}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <EditableText
            id="saas_pro_features_eyebrow"
            className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-3"
            editable={editable}
            {...props}
          >
            Powerful Features
          </EditableText>
          <EditableText
            id="saas_pro_features_headline"
            as="h3"
            className="text-3xl md:text-5xl font-bold mb-4 text-blue-900"
            editable={editable}
            {...props}
          >
            Everything You Need to Succeed
          </EditableText>
          <EditableText
            id="saas_pro_features_subheadline"
            className="text-lg text-slate-700 font-medium"
            editable={editable}
            {...props}
          >
            Our comprehensive suite of tools and integrations helps you work smarter, not harder.
          </EditableText>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="p-6 rounded-xl bg-white border-2 border-blue-200 hover:border-blue-600 hover:shadow-xl transition-all">
              <div className="w-14 h-14 rounded-xl bg-blue-600 flex items-center justify-center mb-4 shadow-md">
                <EditableText 
                  id={`saas_pro_feature_${n}_icon`} 
                  className="text-3xl"
                  editable={editable} 
                  {...props}
                >
                  {n === 1 ? "⚡" : n === 2 ? "🎯" : n === 3 ? "🔒" : n === 4 ? "📊" : n === 5 ? "🚀" : "💡"}
                </EditableText>
              </div>
              <EditableText
                id={`saas_pro_feature_${n}_title`}
                as="h4"
                className="text-xl font-bold mb-2 text-blue-900"
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
                className="text-slate-600 leading-relaxed font-medium"
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
      <section className="bg-blue-900 text-white py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <EditableText
              id="saas_pro_stats_headline"
              as="h3"
              className="text-3xl md:text-4xl font-bold mb-4"
              editable={editable}
              {...props}
            >
              Results That Speak for Themselves
            </EditableText>
            <EditableText
              id="saas_pro_stats_subheadline"
              className="text-lg text-blue-200 font-medium"
              editable={editable}
              {...props}
            >
              Join thousands of businesses already seeing dramatic improvements
            </EditableText>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { metric: "10K+", label: "Active Users" },
              { metric: "99.9%", label: "Uptime SLA" },
              { metric: "4.9/5", label: "Customer Rating" },
              { metric: "24/7", label: "Support Available" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <EditableText
                  id={`saas_pro_stat_${i + 1}_number`}
                  className="text-4xl md:text-5xl font-bold text-blue-300 mb-2"
                  editable={editable}
                  {...props}
                >
                  {stat.metric}
                </EditableText>
                <EditableText
                  id={`saas_pro_stat_${i + 1}_label`}
                  className="text-blue-200 font-semibold"
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
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28">
        <div className="text-center mb-16">
          <EditableText
            id="saas_pro_testimonials_eyebrow"
            className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-3"
            editable={editable}
            {...props}
          >
            Testimonials
          </EditableText>
          <EditableText
            id="saas_pro_testimonials_headline"
            as="h3"
            className="text-3xl md:text-5xl font-bold text-blue-900"
            editable={editable}
            {...props}
          >
            Loved by Teams Everywhere
          </EditableText>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="p-6 rounded-xl bg-white border-2 border-blue-200 shadow-lg">
              <div className="flex items-center gap-1 mb-4 text-yellow-500">
                <EditableText id={`saas_pro_testimonial_${n}_rating`} editable={editable} {...props}>
                  ⭐⭐⭐⭐⭐
                </EditableText>
              </div>
              <EditableText
                id={`saas_pro_testimonial_${n}_quote`}
                className="text-base mb-6 leading-relaxed text-slate-700 font-medium"
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
                  className="w-12 h-12 rounded-full border-2 border-blue-600"
                  editable={editable}
                  {...props}
                />
                <div>
                  <EditableText
                    id={`saas_pro_testimonial_${n}_name`}
                    className="font-bold text-blue-900"
                    editable={editable}
                    {...props}
                  >
                    {n === 1 ? "Sarah Johnson" : n === 2 ? "Michael Chen" : "Emily Rodriguez"}
                  </EditableText>
                  <EditableText
                    id={`saas_pro_testimonial_${n}_title`}
                    className="text-sm text-slate-600 font-medium"
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
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28 bg-slate-50">
        <div className="text-center mb-16">
          <EditableText
            id="saas_pro_pricing_eyebrow"
            className="text-blue-600 font-bold text-sm uppercase tracking-wider mb-3"
            editable={editable}
            {...props}
          >
            Pricing
          </EditableText>
          <EditableText
            id="saas_pro_pricing_headline"
            as="h3"
            className="text-3xl md:text-5xl font-bold mb-4 text-blue-900"
            editable={editable}
            {...props}
          >
            Simple, Transparent Pricing
          </EditableText>
          <EditableText
            id="saas_pro_pricing_subheadline"
            className="text-lg text-slate-700 font-medium"
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
              className={`relative p-8 rounded-2xl border-2 bg-white ${
                plan.popular ? 'border-blue-600 shadow-2xl scale-105' : 'border-blue-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-600 text-white text-sm font-bold rounded-full">
                  <EditableText id={`saas_pro_pricing_${i + 1}_badge`} editable={editable} {...props}>
                    Most Popular
                  </EditableText>
                </div>
              )}
              <EditableText
                id={`saas_pro_pricing_${i + 1}_name`}
                className="text-xl font-bold mb-2 text-blue-900"
                editable={editable}
                {...props}
              >
                {plan.name}
              </EditableText>
              <div className="mb-6">
                <EditableText
                  id={`saas_pro_pricing_${i + 1}_price`}
                  className="text-4xl font-bold text-blue-900"
                  editable={editable}
                  {...props}
                >
                  {plan.price}
                </EditableText>
                <EditableText
                  id={`saas_pro_pricing_${i + 1}_period`}
                  className="text-slate-600 font-semibold"
                  editable={editable}
                  {...props}
                >
                  /month
                </EditableText>
              </div>
              <EditableText
                id={`saas_pro_pricing_${i + 1}_description`}
                className="text-sm text-slate-600 mb-6 font-medium"
                editable={editable}
                {...props}
              >
                {i === 0 ? "Perfect for small teams getting started" :
                 i === 1 ? "Ideal for growing businesses that need more power" :
                 "Advanced features for large-scale operations"}
              </EditableText>
              <EditableButton 
                id={`saas_pro_pricing_${i + 1}_cta`} 
                className={`w-full mb-6 font-semibold ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'}`}
                editable={editable} 
                {...props}
              >
                {i === 2 ? "Contact Sales" : "Start Free Trial"}
              </EditableButton>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5 font-bold">✓</span>
                    <EditableText
                      id={`saas_pro_pricing_${i + 1}_feature_${feature}`}
                      className="text-sm font-medium text-slate-700"
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
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28">
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-12 md:p-16 text-center text-white shadow-2xl">
          <EditableText
            id="saas_pro_cta_headline"
            as="h3"
            className="text-3xl md:text-5xl font-bold mb-4"
            editable={editable}
            {...props}
          >
            Ready to Transform Your Workflow?
          </EditableText>
          <EditableText
            id="saas_pro_cta_subheadline"
            className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto font-medium"
            editable={editable}
            {...props}
          >
            Join over 10,000 teams who have already made the switch. Start your free trial today.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EditableButton 
              id="saas_pro_cta_primary" 
              className="text-base px-8 py-4 h-auto bg-white text-blue-600 hover:bg-blue-50 font-bold shadow-xl"
              editable={editable} 
              {...props}
            >
              Get Started Free
            </EditableButton>
            <EditableButton
              id="saas_pro_cta_secondary"
              className="text-base px-8 py-4 h-auto bg-transparent text-white border-2 border-white hover:bg-white/10 font-bold"
              editable={editable}
              {...props}
            >
              Schedule a Demo
            </EditableButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-blue-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-2">
              <EditableText id="saas_pro_footer_brand" as="h5" className="text-lg font-bold text-blue-900 mb-3" editable={editable} {...props}>
                InnovatePro
              </EditableText>
              <EditableText
                id="saas_pro_footer_tagline"
                className="text-sm text-slate-600 mb-4 max-w-xs font-medium"
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
                  className="font-bold mb-3 text-blue-900"
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
                      className="block text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors"
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
          
          <div className="pt-8 border-t border-blue-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <EditableText
              id="saas_pro_footer_copyright"
              className="text-sm text-slate-600 font-semibold"
              editable={editable}
              {...props}
            >
              © 2025 InnovatePro. All rights reserved.
            </EditableText>
            <div className="flex gap-6">
              <EditableText id="saas_pro_footer_legal_1" className="text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors" editable={editable} {...props}>
                Privacy Policy
              </EditableText>
              <EditableText id="saas_pro_footer_legal_2" className="text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors" editable={editable} {...props}>
                Terms of Service
              </EditableText>
              <EditableText id="saas_pro_footer_legal_3" className="text-sm text-slate-600 hover:text-blue-600 font-medium transition-colors" editable={editable} {...props}>
                Cookie Policy
              </EditableText>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
