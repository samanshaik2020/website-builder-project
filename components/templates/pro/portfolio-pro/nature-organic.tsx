"use client"
import type { TemplateProps } from "../../types"
import { EditableButton, EditableImage, EditableText } from "../../shared/editable"

export function PortfolioProNatureOrganic(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 text-gray-800 min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-green-200">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <EditableText id="portfolio_pro_brand" as="h1" className="text-2xl font-bold text-green-800" editable={editable} {...props}>
            Emma Forest
          </EditableText>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <EditableText id="portfolio_pro_nav_1" className="hover:text-green-600 transition-colors" editable={editable} {...props}>
              Work
            </EditableText>
            <EditableText id="portfolio_pro_nav_2" className="hover:text-green-600 transition-colors" editable={editable} {...props}>
              About
            </EditableText>
            <EditableText id="portfolio_pro_nav_3" className="hover:text-green-600 transition-colors" editable={editable} {...props}>
              Services
            </EditableText>
            <EditableText id="portfolio_pro_nav_4" className="hover:text-green-600 transition-colors" editable={editable} {...props}>
              Journal
            </EditableText>
            <EditableText id="portfolio_pro_nav_5" className="hover:text-green-600 transition-colors" editable={editable} {...props}>
              Contact
            </EditableText>
          </nav>
          <div className="flex items-center gap-3">
            <EditableButton 
              id="portfolio_pro_nav_resume" 
              className="hidden md:inline-flex bg-transparent text-green-700 border border-green-300 hover:bg-green-50" 
              editable={editable} 
              {...props}
            >
              Portfolio
            </EditableButton>
            <EditableButton id="portfolio_pro_nav_cta" className="bg-green-600 hover:bg-green-700 text-white" editable={editable} {...props}>
              Let's Connect
            </EditableButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <EditableText id="portfolio_pro_hero_greeting" className="text-lg font-medium text-green-600 mb-4" editable={editable} {...props}>
              🌿 Sustainable Designer
            </EditableText>
            <EditableText id="portfolio_pro_hero_title" as="h1" className="text-5xl md:text-6xl font-bold mb-6 text-green-800" editable={editable} {...props}>
              Emma Forest
            </EditableText>
            <EditableText id="portfolio_pro_hero_subtitle" className="text-2xl md:text-3xl text-green-700 mb-8" editable={editable} {...props}>
              Eco-Conscious Brand Designer
            </EditableText>
            <EditableText id="portfolio_pro_hero_description" className="text-lg text-gray-700 mb-8 leading-relaxed" editable={editable} {...props}>
              I help environmentally conscious brands tell their story through thoughtful design. 
              Specializing in sustainable branding, organic aesthetics, and earth-friendly visual identities.
            </EditableText>
            <div className="flex flex-col sm:flex-row gap-4">
              <EditableButton id="portfolio_pro_hero_cta_primary" className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full" editable={editable} {...props}>
                View My Work
              </EditableButton>
              <EditableButton 
                id="portfolio_pro_hero_cta_secondary" 
                className="px-8 py-3 bg-transparent text-green-700 border border-green-300 hover:bg-green-50 rounded-full" 
                editable={editable} 
                {...props}
              >
                Download Resume
              </EditableButton>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-green-200/30 rounded-full blur-3xl"></div>
            <EditableImage 
              id="portfolio_pro_hero_image" 
              src="/placeholder.svg?height=600&width=500&text=Nature+Designer+Portrait" 
              alt="Emma Forest - Eco-Conscious Designer"
              className="relative w-full max-w-md mx-auto rounded-3xl shadow-xl border-4 border-white"
              editable={editable} 
              {...props}
            />
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="bg-white/50 backdrop-blur-sm py-20 border-y border-green-100">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <EditableText id="portfolio_pro_work_title" as="h2" className="text-4xl md:text-5xl font-bold mb-4 text-green-800" editable={editable} {...props}>
              Featured Projects
            </EditableText>
            <EditableText id="portfolio_pro_work_subtitle" className="text-xl text-gray-600 max-w-2xl mx-auto" editable={editable} {...props}>
              Sustainable brands and eco-friendly projects that make a positive impact
            </EditableText>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="group cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100 hover:shadow-xl transition-all">
              <div className="relative overflow-hidden">
                <EditableImage 
                  id="portfolio_pro_project_1_image" 
                  src="/placeholder.svg?height=300&width=400&text=Organic+Food+Brand" 
                  alt="Organic Food Brand Project"
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  editable={editable} 
                  {...props}
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">🌱 Organic</span>
                </div>
              </div>
              <div className="p-6">
                <EditableText id="portfolio_pro_project_1_title" as="h3" className="text-xl font-bold mb-2 text-green-800" editable={editable} {...props}>
                  GreenHarvest Co.
                </EditableText>
                <EditableText id="portfolio_pro_project_1_description" className="text-gray-600 mb-4" editable={editable} {...props}>
                  Complete brand identity for an organic farm-to-table company, including packaging design and digital presence
                </EditableText>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Branding</span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">Packaging</span>
                  <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">Organic</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100 hover:shadow-xl transition-all">
              <div className="relative overflow-hidden">
                <EditableImage 
                  id="portfolio_pro_project_2_image" 
                  src="/placeholder.svg?height=300&width=400&text=Eco+Fashion+Brand" 
                  alt="Sustainable Fashion Brand"
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  editable={editable} 
                  {...props}
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">♻️ Sustainable</span>
                </div>
              </div>
              <div className="p-6">
                <EditableText id="portfolio_pro_project_2_title" as="h3" className="text-xl font-bold mb-2 text-green-800" editable={editable} {...props}>
                  EcoThread Studio
                </EditableText>
                <EditableText id="portfolio_pro_project_2_description" className="text-gray-600 mb-4" editable={editable} {...props}>
                  Sustainable fashion brand identity with focus on recycled materials and ethical production
                </EditableText>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Fashion</span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">Sustainable</span>
                  <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">Ethical</span>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden border border-green-100 hover:shadow-xl transition-all">
              <div className="relative overflow-hidden">
                <EditableImage 
                  id="portfolio_pro_project_3_image" 
                  src="/placeholder.svg?height=300&width=400&text=Green+Tech+Startup" 
                  alt="Green Technology Startup"
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                  editable={editable} 
                  {...props}
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">🌍 Green Tech</span>
                </div>
              </div>
              <div className="p-6">
                <EditableText id="portfolio_pro_project_3_title" as="h3" className="text-xl font-bold mb-2 text-green-800" editable={editable} {...props}>
                  CleanEnergy Solutions
                </EditableText>
                <EditableText id="portfolio_pro_project_3_description" className="text-gray-600 mb-4" editable={editable} {...props}>
                  Brand identity and web design for a renewable energy startup focused on solar solutions
                </EditableText>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Technology</span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">Renewable</span>
                  <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm">Solar</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <EditableButton id="portfolio_pro_work_cta" className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full" editable={editable} {...props}>
              View All Projects
            </EditableButton>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <EditableText id="portfolio_pro_about_title" as="h2" className="text-4xl md:text-5xl font-bold mb-6 text-green-800" editable={editable} {...props}>
                About Emma
              </EditableText>
              <EditableText id="portfolio_pro_about_description" className="text-lg text-gray-700 mb-8 leading-relaxed" editable={editable} {...props}>
                I'm passionate about creating beautiful designs that don't cost the earth. With 7 years of experience in 
                sustainable design, I help eco-conscious brands communicate their values through thoughtful visual identities.
              </EditableText>
              <EditableText id="portfolio_pro_about_description_2" className="text-lg text-gray-700 mb-8 leading-relaxed" editable={editable} {...props}>
                When I'm not designing, you'll find me hiking in the mountains, tending to my organic garden, 
                or volunteering for local environmental organizations.
              </EditableText>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-green-100 rounded-2xl">
                  <EditableText id="portfolio_pro_stat_1_number" className="text-3xl font-bold text-green-700" editable={editable} {...props}>
                    100+
                  </EditableText>
                  <EditableText id="portfolio_pro_stat_1_label" className="text-gray-600" editable={editable} {...props}>
                    Eco Projects
                  </EditableText>
                </div>
                <div className="text-center p-6 bg-emerald-100 rounded-2xl">
                  <EditableText id="portfolio_pro_stat_2_number" className="text-3xl font-bold text-emerald-700" editable={editable} {...props}>
                    7+
                  </EditableText>
                  <EditableText id="portfolio_pro_stat_2_label" className="text-gray-600" editable={editable} {...props}>
                    Years Experience
                  </EditableText>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-green-200/30 rounded-3xl blur-3xl"></div>
              <EditableImage 
                id="portfolio_pro_about_image" 
                src="/placeholder.svg?height=500&width=400&text=Designer+in+Nature" 
                alt="Emma Forest in Nature"
                className="relative w-full max-w-md mx-auto rounded-3xl shadow-xl border-4 border-white"
                editable={editable} 
                {...props}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white/50 backdrop-blur-sm py-20 border-y border-green-100">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <EditableText id="portfolio_pro_services_title" as="h2" className="text-4xl md:text-5xl font-bold mb-4 text-green-800" editable={editable} {...props}>
              Services
            </EditableText>
            <EditableText id="portfolio_pro_services_subtitle" className="text-xl text-gray-600 max-w-2xl mx-auto" editable={editable} {...props}>
              Sustainable design solutions for environmentally conscious brands
            </EditableText>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🌱</span>
              </div>
              <EditableText id="portfolio_pro_service_1_title" as="h3" className="text-xl font-bold mb-3 text-green-800" editable={editable} {...props}>
                Sustainable Branding
              </EditableText>
              <EditableText id="portfolio_pro_service_1_description" className="text-gray-600" editable={editable} {...props}>
                Complete brand identities that reflect your environmental values and connect with eco-conscious consumers.
              </EditableText>
            </div>

            {/* Service 2 */}
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📦</span>
              </div>
              <EditableText id="portfolio_pro_service_2_title" as="h3" className="text-xl font-bold mb-3 text-green-800" editable={editable} {...props}>
                Eco Packaging Design
              </EditableText>
              <EditableText id="portfolio_pro_service_2_description" className="text-gray-600" editable={editable} {...props}>
                Beautiful packaging designs using sustainable materials and environmentally friendly printing methods.
              </EditableText>
            </div>

            {/* Service 3 */}
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🌐</span>
              </div>
              <EditableText id="portfolio_pro_service_3_title" as="h3" className="text-xl font-bold mb-3 text-green-800" editable={editable} {...props}>
                Green Web Design
              </EditableText>
              <EditableText id="portfolio_pro_service_3_description" className="text-gray-600" editable={editable} {...props}>
                Eco-friendly websites optimized for performance and sustainability with minimal environmental impact.
              </EditableText>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <EditableText id="portfolio_pro_contact_title" as="h2" className="text-4xl md:text-5xl font-bold mb-6 text-green-800" editable={editable} {...props}>
            Let's Create Something Sustainable
          </EditableText>
          <EditableText id="portfolio_pro_contact_description" className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto" editable={editable} {...props}>
            Ready to make a positive impact with your brand? Let's work together to create designs that are both beautiful and sustainable.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EditableButton id="portfolio_pro_contact_cta_primary" className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full" editable={editable} {...props}>
              Start a Project
            </EditableButton>
            <EditableButton 
              id="portfolio_pro_contact_cta_secondary" 
              className="px-8 py-3 bg-transparent text-green-700 border border-green-300 hover:bg-green-50 rounded-full" 
              editable={editable} 
              {...props}
            >
              Schedule a Call
            </EditableButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <EditableText id="portfolio_pro_footer_brand" className="text-2xl font-bold mb-4 md:mb-0" editable={editable} {...props}>
              Emma Forest
            </EditableText>
            <div className="flex items-center gap-6">
              <EditableText id="portfolio_pro_footer_link_1" className="text-green-200 hover:text-white transition-colors" editable={editable} {...props}>
                Instagram
              </EditableText>
              <EditableText id="portfolio_pro_footer_link_2" className="text-green-200 hover:text-white transition-colors" editable={editable} {...props}>
                Behance
              </EditableText>
              <EditableText id="portfolio_pro_footer_link_3" className="text-green-200 hover:text-white transition-colors" editable={editable} {...props}>
                LinkedIn
              </EditableText>
              <EditableText id="portfolio_pro_footer_link_4" className="text-green-200 hover:text-white transition-colors" editable={editable} {...props}>
                Email
              </EditableText>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-green-700 text-center">
            <EditableText id="portfolio_pro_footer_copyright" className="text-green-200" editable={editable} {...props}>
              © 2024 Emma Forest. Designed with love for our planet. 🌍
            </EditableText>
          </div>
        </div>
      </footer>
    </main>
  )
}