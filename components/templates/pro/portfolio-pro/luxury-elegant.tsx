"use client"
import type { TemplateProps } from "../../types"
import { EditableButton, EditableImage, EditableText } from "../../shared/editable"

export function PortfolioProLuxuryElegant(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-black/50 backdrop-blur-xl border-b border-gold-500/20">
        <div className="mx-auto max-w-7xl px-4 py-6 flex items-center justify-between">
          <EditableText id="portfolio_pro_brand" as="h1" className="text-2xl font-serif text-gold-400 tracking-wide" editable={editable} {...props}>
            Victoria Sterling
          </EditableText>
          <nav className="hidden md:flex items-center gap-12 text-sm font-light tracking-wider uppercase">
            <EditableText id="portfolio_pro_nav_1" className="hover:text-gold-400 transition-colors duration-300" editable={editable} {...props}>
              Portfolio
            </EditableText>
            <EditableText id="portfolio_pro_nav_2" className="hover:text-gold-400 transition-colors duration-300" editable={editable} {...props}>
              About
            </EditableText>
            <EditableText id="portfolio_pro_nav_3" className="hover:text-gold-400 transition-colors duration-300" editable={editable} {...props}>
              Services
            </EditableText>
            <EditableText id="portfolio_pro_nav_4" className="hover:text-gold-400 transition-colors duration-300" editable={editable} {...props}>
              Journal
            </EditableText>
            <EditableText id="portfolio_pro_nav_5" className="hover:text-gold-400 transition-colors duration-300" editable={editable} {...props}>
              Contact
            </EditableText>
          </nav>
          <div className="flex items-center gap-4">
            <EditableButton 
              id="portfolio_pro_nav_resume" 
              className="hidden md:inline-flex bg-transparent text-white border border-gold-500/50 hover:bg-gold-500/10 font-light tracking-wider uppercase text-sm px-6 py-2" 
              editable={editable} 
              {...props}
            >
              Portfolio
            </EditableButton>
            <EditableButton id="portfolio_pro_nav_cta" className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-medium tracking-wider uppercase text-sm px-6 py-2" editable={editable} {...props}>
              Collaborate
            </EditableButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <EditableText id="portfolio_pro_hero_greeting" className="text-sm font-light text-gold-400 mb-6 tracking-[0.3em] uppercase" editable={editable} {...props}>
              Luxury Brand Designer
            </EditableText>
            <EditableText id="portfolio_pro_hero_title" as="h1" className="text-6xl md:text-7xl font-serif mb-8 leading-tight" editable={editable} {...props}>
              Victoria
              <br />
              <span className="text-gold-400">Sterling</span>
            </EditableText>
            <EditableText id="portfolio_pro_hero_subtitle" className="text-2xl md:text-3xl text-gray-300 mb-8 font-light italic" editable={editable} {...props}>
              Crafting Timeless Elegance
            </EditableText>
            <EditableText id="portfolio_pro_hero_description" className="text-lg text-gray-300 mb-10 leading-relaxed font-light max-w-lg" editable={editable} {...props}>
              I create sophisticated brand identities and digital experiences for luxury brands. 
              With over a decade of experience, I help prestigious clients tell their story through refined design.
            </EditableText>
            <div className="flex flex-col sm:flex-row gap-6">
              <EditableButton id="portfolio_pro_hero_cta_primary" className="px-10 py-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-medium tracking-wider uppercase" editable={editable} {...props}>
                View Portfolio
              </EditableButton>
              <EditableButton 
                id="portfolio_pro_hero_cta_secondary" 
                className="px-10 py-4 bg-transparent text-white border border-gold-500/50 hover:bg-gold-500/10 font-light tracking-wider uppercase" 
                editable={editable} 
                {...props}
              >
                Schedule Consultation
              </EditableButton>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gold-500/20 to-gold-600/20 rounded-full blur-3xl"></div>
            <EditableImage 
              id="portfolio_pro_hero_image" 
              src="/placeholder.svg?height=600&width=500&text=Elegant+Portrait" 
              alt="Victoria Sterling - Luxury Brand Designer"
              className="relative w-full max-w-lg mx-auto rounded-2xl shadow-2xl border border-gold-500/20"
              editable={editable} 
              {...props}
            />
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="bg-black/30 backdrop-blur-sm py-24 border-y border-gold-500/10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-20">
            <EditableText id="portfolio_pro_work_title" as="h2" className="text-4xl md:text-5xl font-serif mb-6 text-gold-400" editable={editable} {...props}>
              Selected Works
            </EditableText>
            <EditableText id="portfolio_pro_work_subtitle" className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed" editable={editable} {...props}>
              A curated collection of luxury brand identities and digital experiences crafted for discerning clients
            </EditableText>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Project 1 */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-6 border border-gold-500/20">
                <EditableImage 
                  id="portfolio_pro_project_1_image" 
                  src="/placeholder.svg?height=400&width=400&text=Luxury+Hotel+Brand" 
                  alt="Luxury Hotel Brand Identity"
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                  editable={editable} 
                  {...props}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                  <EditableButton id="portfolio_pro_project_1_cta" className="bg-gold-500 text-black hover:bg-gold-600 font-medium tracking-wider uppercase text-sm px-6 py-2" editable={editable} {...props}>
                    View Project
                  </EditableButton>
                </div>
              </div>
              <EditableText id="portfolio_pro_project_1_title" as="h3" className="text-2xl font-serif mb-3 text-gold-400" editable={editable} {...props}>
                The Meridian Collection
              </EditableText>
              <EditableText id="portfolio_pro_project_1_description" className="text-gray-300 mb-4 font-light leading-relaxed" editable={editable} {...props}>
                Complete brand identity for a luxury hotel chain, including logo design, stationery, and digital presence
              </EditableText>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1 bg-gold-500/10 text-gold-400 rounded-full text-sm font-light border border-gold-500/20">Brand Identity</span>
                <span className="px-4 py-1 bg-gold-500/10 text-gold-400 rounded-full text-sm font-light border border-gold-500/20">Hospitality</span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-6 border border-gold-500/20">
                <EditableImage 
                  id="portfolio_pro_project_2_image" 
                  src="/placeholder.svg?height=400&width=400&text=Jewelry+Brand" 
                  alt="Luxury Jewelry Brand"
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                  editable={editable} 
                  {...props}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                  <EditableButton id="portfolio_pro_project_2_cta" className="bg-gold-500 text-black hover:bg-gold-600 font-medium tracking-wider uppercase text-sm px-6 py-2" editable={editable} {...props}>
                    View Project
                  </EditableButton>
                </div>
              </div>
              <EditableText id="portfolio_pro_project_2_title" as="h3" className="text-2xl font-serif mb-3 text-gold-400" editable={editable} {...props}>
                Lumière Jewelry
              </EditableText>
              <EditableText id="portfolio_pro_project_2_description" className="text-gray-300 mb-4 font-light leading-relaxed" editable={editable} {...props}>
                Sophisticated e-commerce platform and brand identity for a high-end jewelry boutique
              </EditableText>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1 bg-gold-500/10 text-gold-400 rounded-full text-sm font-light border border-gold-500/20">E-commerce</span>
                <span className="px-4 py-1 bg-gold-500/10 text-gold-400 rounded-full text-sm font-light border border-gold-500/20">Luxury Goods</span>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg mb-6 border border-gold-500/20">
                <EditableImage 
                  id="portfolio_pro_project_3_image" 
                  src="/placeholder.svg?height=400&width=400&text=Fashion+Brand" 
                  alt="High Fashion Brand"
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                  editable={editable} 
                  {...props}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                  <EditableButton id="portfolio_pro_project_3_cta" className="bg-gold-500 text-black hover:bg-gold-600 font-medium tracking-wider uppercase text-sm px-6 py-2" editable={editable} {...props}>
                    View Project
                  </EditableButton>
                </div>
              </div>
              <EditableText id="portfolio_pro_project_3_title" as="h3" className="text-2xl font-serif mb-3 text-gold-400" editable={editable} {...props}>
                Atelier Noir
              </EditableText>
              <EditableText id="portfolio_pro_project_3_description" className="text-gray-300 mb-4 font-light leading-relaxed" editable={editable} {...props}>
                Avant-garde fashion house brand identity with editorial design and runway presentation materials
              </EditableText>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1 bg-gold-500/10 text-gold-400 rounded-full text-sm font-light border border-gold-500/20">Fashion</span>
                <span className="px-4 py-1 bg-gold-500/10 text-gold-400 rounded-full text-sm font-light border border-gold-500/20">Editorial</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <EditableButton id="portfolio_pro_work_cta" className="px-10 py-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-medium tracking-wider uppercase" editable={editable} {...props}>
              View All Projects
            </EditableButton>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gold-500/20 to-gold-600/20 rounded-lg blur-3xl"></div>
              <EditableImage 
                id="portfolio_pro_about_image" 
                src="/placeholder.svg?height=600&width=500&text=Designer+Portrait" 
                alt="Victoria Sterling Portrait"
                className="relative w-full max-w-lg mx-auto rounded-lg shadow-2xl border border-gold-500/20"
                editable={editable} 
                {...props}
              />
            </div>
            <div>
              <EditableText id="portfolio_pro_about_title" as="h2" className="text-4xl md:text-5xl font-serif mb-8 text-gold-400" editable={editable} {...props}>
                About Victoria
              </EditableText>
              <EditableText id="portfolio_pro_about_description" className="text-lg text-gray-300 mb-8 leading-relaxed font-light" editable={editable} {...props}>
                With over a decade of experience in luxury brand design, I have had the privilege of working with some of the world's 
                most prestigious brands. My approach combines timeless elegance with contemporary innovation, creating brand experiences 
                that resonate with sophisticated audiences.
              </EditableText>
              <EditableText id="portfolio_pro_about_description_2" className="text-lg text-gray-300 mb-10 leading-relaxed font-light" editable={editable} {...props}>
                I believe that luxury is not just about aesthetics—it's about creating an emotional connection that transcends the ordinary. 
                Every project is an opportunity to craft something truly exceptional.
              </EditableText>
              <div className="grid grid-cols-2 gap-8">
                <div className="text-center p-6 bg-gradient-to-br from-gold-500/5 to-gold-600/5 rounded-lg border border-gold-500/20">
                  <EditableText id="portfolio_pro_stat_1_number" className="text-4xl font-serif text-gold-400 mb-2" editable={editable} {...props}>
                    50+
                  </EditableText>
                  <EditableText id="portfolio_pro_stat_1_label" className="text-gray-300 font-light tracking-wider uppercase text-sm" editable={editable} {...props}>
                    Luxury Brands
                  </EditableText>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-gold-500/5 to-gold-600/5 rounded-lg border border-gold-500/20">
                  <EditableText id="portfolio_pro_stat_2_number" className="text-4xl font-serif text-gold-400 mb-2" editable={editable} {...props}>
                    12+
                  </EditableText>
                  <EditableText id="portfolio_pro_stat_2_label" className="text-gray-300 font-light tracking-wider uppercase text-sm" editable={editable} {...props}>
                    Years Experience
                  </EditableText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-black/30 backdrop-blur-sm py-24 border-y border-gold-500/10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-20">
            <EditableText id="portfolio_pro_services_title" as="h2" className="text-4xl md:text-5xl font-serif mb-6 text-gold-400" editable={editable} {...props}>
              Services
            </EditableText>
            <EditableText id="portfolio_pro_services_subtitle" className="text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed" editable={editable} {...props}>
              Comprehensive design solutions tailored for luxury brands and discerning clients
            </EditableText>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Service 1 */}
            <div className="text-center p-8 bg-gradient-to-br from-gold-500/5 to-gold-600/5 rounded-lg border border-gold-500/20 hover:border-gold-500/40 transition-all duration-500">
              <div className="w-20 h-20 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <EditableText id="portfolio_pro_service_1_title" as="h3" className="text-2xl font-serif mb-4 text-gold-400" editable={editable} {...props}>
                Brand Identity
              </EditableText>
              <EditableText id="portfolio_pro_service_1_description" className="text-gray-300 leading-relaxed font-light" editable={editable} {...props}>
                Complete brand identity systems including logo design, typography, color palettes, and brand guidelines for luxury brands.
              </EditableText>
            </div>

            {/* Service 2 */}
            <div className="text-center p-8 bg-gradient-to-br from-gold-500/5 to-gold-600/5 rounded-lg border border-gold-500/20 hover:border-gold-500/40 transition-all duration-500">
              <div className="w-20 h-20 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <EditableText id="portfolio_pro_service_2_title" as="h3" className="text-2xl font-serif mb-4 text-gold-400" editable={editable} {...props}>
                Digital Experiences
              </EditableText>
              <EditableText id="portfolio_pro_service_2_description" className="text-gray-300 leading-relaxed font-light" editable={editable} {...props}>
                Sophisticated websites and digital platforms that reflect the elegance and exclusivity of luxury brands.
              </EditableText>
            </div>

            {/* Service 3 */}
            <div className="text-center p-8 bg-gradient-to-br from-gold-500/5 to-gold-600/5 rounded-lg border border-gold-500/20 hover:border-gold-500/40 transition-all duration-500">
              <div className="w-20 h-20 bg-gradient-to-r from-gold-500 to-gold-600 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <EditableText id="portfolio_pro_service_3_title" as="h3" className="text-2xl font-serif mb-4 text-gold-400" editable={editable} {...props}>
                Editorial Design
              </EditableText>
              <EditableText id="portfolio_pro_service_3_description" className="text-gray-300 leading-relaxed font-light" editable={editable} {...props}>
                High-end print materials, catalogs, and editorial layouts that showcase luxury products with sophistication.
              </EditableText>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <EditableText id="portfolio_pro_contact_title" as="h2" className="text-4xl md:text-5xl font-serif mb-8 text-gold-400" editable={editable} {...props}>
            Let's Create Excellence
          </EditableText>
          <EditableText id="portfolio_pro_contact_description" className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto font-light leading-relaxed" editable={editable} {...props}>
            Ready to elevate your brand to new heights? I would be delighted to discuss your vision and explore how we can create something extraordinary together.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <EditableButton id="portfolio_pro_contact_cta_primary" className="px-10 py-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-black font-medium tracking-wider uppercase" editable={editable} {...props}>
              Start a Project
            </EditableButton>
            <EditableButton 
              id="portfolio_pro_contact_cta_secondary" 
              className="px-10 py-4 bg-transparent text-white border border-gold-500/50 hover:bg-gold-500/10 font-light tracking-wider uppercase" 
              editable={editable} 
              {...props}
            >
              View Portfolio
            </EditableButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gold-500/20 py-16 bg-black/50">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <EditableText id="portfolio_pro_footer_brand" className="text-2xl font-serif text-gold-400 mb-6 md:mb-0" editable={editable} {...props}>
              Victoria Sterling
            </EditableText>
            <div className="flex items-center gap-8">
              <EditableText id="portfolio_pro_footer_link_1" className="text-gray-300 hover:text-gold-400 transition-colors font-light tracking-wider uppercase text-sm" editable={editable} {...props}>
                Behance
              </EditableText>
              <EditableText id="portfolio_pro_footer_link_2" className="text-gray-300 hover:text-gold-400 transition-colors font-light tracking-wider uppercase text-sm" editable={editable} {...props}>
                LinkedIn
              </EditableText>
              <EditableText id="portfolio_pro_footer_link_3" className="text-gray-300 hover:text-gold-400 transition-colors font-light tracking-wider uppercase text-sm" editable={editable} {...props}>
                Instagram
              </EditableText>
              <EditableText id="portfolio_pro_footer_link_4" className="text-gray-300 hover:text-gold-400 transition-colors font-light tracking-wider uppercase text-sm" editable={editable} {...props}>
                Contact
              </EditableText>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gold-500/20 text-center">
            <EditableText id="portfolio_pro_footer_copyright" className="text-gray-400 font-light text-sm tracking-wider" editable={editable} {...props}>
              © 2024 Victoria Sterling. All rights reserved. Crafted with passion and precision.
            </EditableText>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .text-gold-400 { color: #fbbf24; }
        .text-gold-500 { color: #f59e0b; }
        .text-gold-600 { color: #d97706; }
        .bg-gold-500 { background-color: #f59e0b; }
        .bg-gold-600 { background-color: #d97706; }
        .border-gold-500 { border-color: #f59e0b; }
        .from-gold-500 { --tw-gradient-from: #f59e0b; }
        .to-gold-600 { --tw-gradient-to: #d97706; }
        .hover\\:from-gold-600:hover { --tw-gradient-from: #d97706; }
        .hover\\:to-gold-700:hover { --tw-gradient-to: #b45309; }
        .hover\\:bg-gold-600:hover { background-color: #d97706; }
        .hover\\:text-gold-400:hover { color: #fbbf24; }
        .bg-gold-500\\/10 { background-color: rgb(245 158 11 / 0.1); }
        .bg-gold-500\\/20 { background-color: rgb(245 158 11 / 0.2); }
        .border-gold-500\\/20 { border-color: rgb(245 158 11 / 0.2); }
        .border-gold-500\\/30 { border-color: rgb(245 158 11 / 0.3); }
        .border-gold-500\\/40 { border-color: rgb(245 158 11 / 0.4); }
        .border-gold-500\\/50 { border-color: rgb(245 158 11 / 0.5); }
        .hover\\:bg-gold-500\\/10:hover { background-color: rgb(245 158 11 / 0.1); }
      `}</style>
    </main>
  )
}