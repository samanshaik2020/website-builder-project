"use client"
import type { TemplateProps } from "../../types"
import { EditableButton, EditableImage, EditableText } from "../../shared/editable"

export function PortfolioProTemplate(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-background text-foreground">
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <EditableText id="portfolio_pro_brand" as="h1" className="text-xl font-bold" editable={editable} {...props}>
            Alex Morgan
          </EditableText>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <EditableText id="portfolio_pro_nav_1" editable={editable} {...props}>
              Work
            </EditableText>
            <EditableText id="portfolio_pro_nav_2" editable={editable} {...props}>
              About
            </EditableText>
            <EditableText id="portfolio_pro_nav_3" editable={editable} {...props}>
              Services
            </EditableText>
            <EditableText id="portfolio_pro_nav_4" editable={editable} {...props}>
              Blog
            </EditableText>
            <EditableText id="portfolio_pro_nav_5" editable={editable} {...props}>
              Contact
            </EditableText>
          </nav>
          <div className="flex items-center gap-3">
            <EditableButton 
              id="portfolio_pro_nav_resume" 
              className="hidden md:inline-flex bg-transparent text-foreground border border-border hover:bg-accent" 
              editable={editable} 
              {...props}
            >
              Resume
            </EditableButton>
            <EditableButton id="portfolio_pro_nav_cta" editable={editable} {...props}>
              Hire Me
            </EditableButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <EditableText id="portfolio_pro_hero_greeting" className="text-lg font-medium text-muted-foreground mb-4" editable={editable} {...props}>
              Hello, I'm
            </EditableText>
            <EditableText id="portfolio_pro_hero_title" as="h1" className="text-4xl md:text-6xl font-bold mb-6" editable={editable} {...props}>
              Alex Morgan
            </EditableText>
            <EditableText id="portfolio_pro_hero_subtitle" className="text-xl md:text-2xl text-muted-foreground mb-8" editable={editable} {...props}>
              Creative Designer & Developer
            </EditableText>
            <EditableText id="portfolio_pro_hero_description" className="text-lg text-muted-foreground mb-8 leading-relaxed" editable={editable} {...props}>
              I craft beautiful digital experiences that combine stunning design with powerful functionality. 
              With 8+ years of experience, I help brands tell their story through innovative web solutions.
            </EditableText>
            <div className="flex flex-col sm:flex-row gap-4">
              <EditableButton id="portfolio_pro_hero_cta_primary" className="px-8 py-3" editable={editable} {...props}>
                View My Work
              </EditableButton>
              <EditableButton 
                id="portfolio_pro_hero_cta_secondary" 
                className="px-8 py-3 bg-transparent text-foreground border border-border hover:bg-accent" 
                editable={editable} 
                {...props}
              >
                Get In Touch
              </EditableButton>
            </div>
          </div>
          <div className="relative">
            <EditableImage 
              id="portfolio_pro_hero_image" 
              src="/placeholder.svg?height=600&width=500&text=Professional+Portrait" 
              alt="Alex Morgan - Professional Portrait"
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              editable={editable} 
              {...props}
            />
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="text-center mb-16">
          <EditableText id="portfolio_pro_work_title" as="h2" className="text-3xl md:text-4xl font-bold mb-4" editable={editable} {...props}>
            Featured Work
          </EditableText>
          <EditableText id="portfolio_pro_work_subtitle" className="text-lg text-muted-foreground max-w-2xl mx-auto" editable={editable} {...props}>
            A selection of my recent projects that showcase my expertise in design and development
          </EditableText>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Project 1 */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl mb-4">
              <EditableImage 
                id="portfolio_pro_project_1_image" 
                src="/placeholder.svg?height=300&width=400&text=E-commerce+Platform" 
                alt="E-commerce Platform Project"
                className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                editable={editable} 
                {...props}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <EditableButton id="portfolio_pro_project_1_cta" className="bg-white text-black hover:bg-gray-100" editable={editable} {...props}>
                  View Project
                </EditableButton>
              </div>
            </div>
            <EditableText id="portfolio_pro_project_1_title" as="h3" className="text-xl font-semibold mb-2" editable={editable} {...props}>
              E-commerce Platform
            </EditableText>
            <EditableText id="portfolio_pro_project_1_description" className="text-muted-foreground mb-3" editable={editable} {...props}>
              Modern e-commerce solution with advanced filtering and seamless checkout experience
            </EditableText>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">React</span>
              <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">Node.js</span>
              <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">MongoDB</span>
            </div>
          </div>

          {/* Project 2 */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl mb-4">
              <EditableImage 
                id="portfolio_pro_project_2_image" 
                src="/placeholder.svg?height=300&width=400&text=Mobile+App+Design" 
                alt="Mobile App Design Project"
                className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                editable={editable} 
                {...props}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <EditableButton id="portfolio_pro_project_2_cta" className="bg-white text-black hover:bg-gray-100" editable={editable} {...props}>
                  View Project
                </EditableButton>
              </div>
            </div>
            <EditableText id="portfolio_pro_project_2_title" as="h3" className="text-xl font-semibold mb-2" editable={editable} {...props}>
              Mobile App Design
            </EditableText>
            <EditableText id="portfolio_pro_project_2_description" className="text-muted-foreground mb-3" editable={editable} {...props}>
              Intuitive fitness tracking app with personalized workout plans and social features
            </EditableText>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">Figma</span>
              <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">React Native</span>
              <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">UI/UX</span>
            </div>
          </div>

          {/* Project 3 */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-xl mb-4">
              <EditableImage 
                id="portfolio_pro_project_3_image" 
                src="/placeholder.svg?height=300&width=400&text=Brand+Identity" 
                alt="Brand Identity Project"
                className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                editable={editable} 
                {...props}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <EditableButton id="portfolio_pro_project_3_cta" className="bg-white text-black hover:bg-gray-100" editable={editable} {...props}>
                  View Project
                </EditableButton>
              </div>
            </div>
            <EditableText id="portfolio_pro_project_3_title" as="h3" className="text-xl font-semibold mb-2" editable={editable} {...props}>
              Brand Identity
            </EditableText>
            <EditableText id="portfolio_pro_project_3_description" className="text-muted-foreground mb-3" editable={editable} {...props}>
              Complete brand identity design for a sustainable fashion startup
            </EditableText>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">Branding</span>
              <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">Illustrator</span>
              <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm">Print</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <EditableButton id="portfolio_pro_work_cta" className="px-8 py-3" editable={editable} {...props}>
            View All Projects
          </EditableButton>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-accent/50 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <EditableText id="portfolio_pro_about_title" as="h2" className="text-3xl md:text-4xl font-bold mb-6" editable={editable} {...props}>
                About Me
              </EditableText>
              <EditableText id="portfolio_pro_about_description" className="text-lg text-muted-foreground mb-8 leading-relaxed" editable={editable} {...props}>
                I'm a passionate designer and developer with over 8 years of experience creating digital experiences 
                that matter. I believe in the power of good design to solve real problems and create meaningful connections 
                between brands and their audiences.
              </EditableText>
              <EditableText id="portfolio_pro_about_description_2" className="text-lg text-muted-foreground mb-8 leading-relaxed" editable={editable} {...props}>
                When I'm not crafting pixels or writing code, you can find me exploring new coffee shops, 
                hiking mountain trails, or experimenting with new design trends and technologies.
              </EditableText>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <EditableText id="portfolio_pro_stat_1_number" className="text-3xl font-bold text-primary" editable={editable} {...props}>
                    150+
                  </EditableText>
                  <EditableText id="portfolio_pro_stat_1_label" className="text-muted-foreground" editable={editable} {...props}>
                    Projects Completed
                  </EditableText>
                </div>
                <div>
                  <EditableText id="portfolio_pro_stat_2_number" className="text-3xl font-bold text-primary" editable={editable} {...props}>
                    50+
                  </EditableText>
                  <EditableText id="portfolio_pro_stat_2_label" className="text-muted-foreground" editable={editable} {...props}>
                    Happy Clients
                  </EditableText>
                </div>
              </div>
            </div>
            <div className="relative">
              <EditableImage 
                id="portfolio_pro_about_image" 
                src="/placeholder.svg?height=500&width=400&text=About+Me+Photo" 
                alt="About Alex Morgan"
                className="w-full max-w-md mx-auto rounded-2xl shadow-xl"
                editable={editable} 
                {...props}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="text-center mb-16">
          <EditableText id="portfolio_pro_services_title" as="h2" className="text-3xl md:text-4xl font-bold mb-4" editable={editable} {...props}>
            Services
          </EditableText>
          <EditableText id="portfolio_pro_services_subtitle" className="text-lg text-muted-foreground max-w-2xl mx-auto" editable={editable} {...props}>
            I offer a comprehensive range of design and development services to bring your vision to life
          </EditableText>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="text-center p-6 rounded-xl border border-border hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <EditableText id="portfolio_pro_service_1_title" as="h3" className="text-xl font-semibold mb-3" editable={editable} {...props}>
              Web Design
            </EditableText>
            <EditableText id="portfolio_pro_service_1_description" className="text-muted-foreground" editable={editable} {...props}>
              Custom website designs that are both beautiful and functional, optimized for all devices and user experiences.
            </EditableText>
          </div>

          {/* Service 2 */}
          <div className="text-center p-6 rounded-xl border border-border hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <EditableText id="portfolio_pro_service_2_title" as="h3" className="text-xl font-semibold mb-3" editable={editable} {...props}>
              Development
            </EditableText>
            <EditableText id="portfolio_pro_service_2_description" className="text-muted-foreground" editable={editable} {...props}>
              Full-stack development using modern technologies to build scalable and performant web applications.
            </EditableText>
          </div>

          {/* Service 3 */}
          <div className="text-center p-6 rounded-xl border border-border hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            </div>
            <EditableText id="portfolio_pro_service_3_title" as="h3" className="text-xl font-semibold mb-3" editable={editable} {...props}>
              Brand Identity
            </EditableText>
            <EditableText id="portfolio_pro_service_3_description" className="text-muted-foreground" editable={editable} {...props}>
              Complete brand identity design including logos, color schemes, typography, and brand guidelines.
            </EditableText>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-accent/50 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <EditableText id="portfolio_pro_contact_title" as="h2" className="text-3xl md:text-4xl font-bold mb-6" editable={editable} {...props}>
            Let's Work Together
          </EditableText>
          <EditableText id="portfolio_pro_contact_description" className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto" editable={editable} {...props}>
            Have a project in mind? I'd love to hear about it. Let's discuss how we can bring your vision to life.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EditableButton id="portfolio_pro_contact_cta_primary" className="px-8 py-3" editable={editable} {...props}>
              Start a Project
            </EditableButton>
            <EditableButton 
              id="portfolio_pro_contact_cta_secondary" 
              className="px-8 py-3 bg-transparent text-foreground border border-border hover:bg-accent" 
              editable={editable} 
              {...props}
            >
              Download Resume
            </EditableButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <EditableText id="portfolio_pro_footer_brand" className="text-xl font-bold mb-4 md:mb-0" editable={editable} {...props}>
              Alex Morgan
            </EditableText>
            <div className="flex items-center gap-6">
              <EditableText id="portfolio_pro_footer_link_1" className="text-muted-foreground hover:text-foreground transition-colors" editable={editable} {...props}>
                LinkedIn
              </EditableText>
              <EditableText id="portfolio_pro_footer_link_2" className="text-muted-foreground hover:text-foreground transition-colors" editable={editable} {...props}>
                GitHub
              </EditableText>
              <EditableText id="portfolio_pro_footer_link_3" className="text-muted-foreground hover:text-foreground transition-colors" editable={editable} {...props}>
                Dribbble
              </EditableText>
              <EditableText id="portfolio_pro_footer_link_4" className="text-muted-foreground hover:text-foreground transition-colors" editable={editable} {...props}>
                Twitter
              </EditableText>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center">
            <EditableText id="portfolio_pro_footer_copyright" className="text-muted-foreground" editable={editable} {...props}>
              © 2024 Alex Morgan. All rights reserved.
            </EditableText>
          </div>
        </div>
      </footer>
    </main>
  )
}