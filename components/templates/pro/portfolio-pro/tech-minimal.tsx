"use client"
import type { TemplateProps } from "../../types"
import { EditableButton, EditableImage, EditableText } from "../../shared/editable"

export function PortfolioProTechMinimal(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-gray-50 text-gray-900 min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <EditableText id="portfolio_pro_brand" as="h1" className="text-xl font-mono font-bold text-black" editable={editable} {...props}>
            sarah.dev
          </EditableText>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <EditableText id="portfolio_pro_nav_1" className="hover:text-blue-600 transition-colors" editable={editable} {...props}>
              projects
            </EditableText>
            <EditableText id="portfolio_pro_nav_2" className="hover:text-blue-600 transition-colors" editable={editable} {...props}>
              about
            </EditableText>
            <EditableText id="portfolio_pro_nav_3" className="hover:text-blue-600 transition-colors" editable={editable} {...props}>
              skills
            </EditableText>
            <EditableText id="portfolio_pro_nav_4" className="hover:text-blue-600 transition-colors" editable={editable} {...props}>
              blog
            </EditableText>
            <EditableText id="portfolio_pro_nav_5" className="hover:text-blue-600 transition-colors" editable={editable} {...props}>
              contact
            </EditableText>
          </nav>
          <div className="flex items-center gap-3">
            <EditableButton 
              id="portfolio_pro_nav_resume" 
              className="hidden md:inline-flex bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-100 font-mono text-sm" 
              editable={editable} 
              {...props}
            >
              resume.pdf
            </EditableButton>
            <EditableButton id="portfolio_pro_nav_cta" className="bg-blue-600 hover:bg-blue-700 text-white font-mono text-sm" editable={editable} {...props}>
              hire_me()
            </EditableButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-4 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <EditableText id="portfolio_pro_hero_greeting" className="text-sm font-mono text-blue-600 mb-4 tracking-wider uppercase" editable={editable} {...props}>
              &gt; hello_world.exe
            </EditableText>
            <EditableText id="portfolio_pro_hero_title" as="h1" className="text-5xl md:text-6xl font-bold mb-6 text-black" editable={editable} {...props}>
              Sarah Kim
            </EditableText>
            <EditableText id="portfolio_pro_hero_subtitle" className="text-2xl md:text-3xl text-gray-600 mb-8 font-light" editable={editable} {...props}>
              Full Stack Developer
            </EditableText>
            <EditableText id="portfolio_pro_hero_description" className="text-lg text-gray-600 mb-8 leading-relaxed font-light max-w-lg" editable={editable} {...props}>
              I build scalable web applications and elegant user interfaces. 
              Passionate about clean code, modern technologies, and solving complex problems.
            </EditableText>
            <div className="flex flex-col sm:flex-row gap-4">
              <EditableButton id="portfolio_pro_hero_cta_primary" className="px-8 py-3 bg-black text-white hover:bg-gray-800 font-mono" editable={editable} {...props}>
                view_projects()
              </EditableButton>
              <EditableButton 
                id="portfolio_pro_hero_cta_secondary" 
                className="px-8 py-3 bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-100 font-mono" 
                editable={editable} 
                {...props}
              >
                download_cv()
              </EditableButton>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-4 text-sm font-mono text-gray-500">sarah_portfolio.js</span>
              </div>
              <div className="font-mono text-sm text-gray-800 space-y-2">
                <div><span className="text-purple-600">const</span> <span className="text-blue-600">developer</span> = {`{`}</div>
                <div className="ml-4"><span className="text-green-600">name</span>: <span className="text-orange-600">'Sarah Kim'</span>,</div>
                <div className="ml-4"><span className="text-green-600">role</span>: <span className="text-orange-600">'Full Stack Developer'</span>,</div>
                <div className="ml-4"><span className="text-green-600">skills</span>: [<span className="text-orange-600">'React'</span>, <span className="text-orange-600">'Node.js'</span>, <span className="text-orange-600">'Python'</span>],</div>
                <div className="ml-4"><span className="text-green-600">passion</span>: <span className="text-orange-600">'Building amazing things'</span></div>
                <div>{`}`};</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-16">
            <EditableText id="portfolio_pro_work_title" as="h2" className="text-3xl md:text-4xl font-bold mb-4 text-black" editable={editable} {...props}>
              Featured Projects
            </EditableText>
            <EditableText id="portfolio_pro_work_subtitle" className="text-lg text-gray-600 font-light" editable={editable} {...props}>
              A collection of my recent work and side projects
            </EditableText>
          </div>
          
          <div className="space-y-16">
            {/* Project 1 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <EditableText id="portfolio_pro_project_1_title" as="h3" className="text-2xl font-bold mb-4 text-black" editable={editable} {...props}>
                  TaskFlow - Project Management
                </EditableText>
                <EditableText id="portfolio_pro_project_1_description" className="text-gray-600 mb-6 leading-relaxed" editable={editable} {...props}>
                  A modern project management application built with React and Node.js. Features real-time collaboration, 
                  advanced filtering, and intuitive drag-and-drop functionality. Deployed on AWS with CI/CD pipeline.
                </EditableText>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-mono">React</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-mono">Node.js</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-mono">PostgreSQL</span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-mono">AWS</span>
                </div>
                <div className="flex gap-4">
                  <EditableButton id="portfolio_pro_project_1_cta" className="bg-black text-white hover:bg-gray-800 font-mono text-sm" editable={editable} {...props}>
                    view_live()
                  </EditableButton>
                  <EditableButton id="portfolio_pro_project_1_github" className="bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-100 font-mono text-sm" editable={editable} {...props}>
                    view_code()
                  </EditableButton>
                </div>
              </div>
              <div className="relative">
                <EditableImage 
                  id="portfolio_pro_project_1_image" 
                  src="/placeholder.svg?height=400&width=600&text=TaskFlow+App+Screenshot" 
                  alt="TaskFlow Project Management App"
                  className="w-full rounded-lg shadow-lg border border-gray-200"
                  editable={editable} 
                  {...props}
                />
              </div>
            </div>

            {/* Project 2 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="lg:order-2">
                <EditableText id="portfolio_pro_project_2_title" as="h3" className="text-2xl font-bold mb-4 text-black" editable={editable} {...props}>
                  DataViz - Analytics Dashboard
                </EditableText>
                <EditableText id="portfolio_pro_project_2_description" className="text-gray-600 mb-6 leading-relaxed" editable={editable} {...props}>
                  Interactive data visualization dashboard for business analytics. Built with D3.js and Python backend. 
                  Features real-time data processing, custom chart types, and export functionality.
                </EditableText>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-mono">D3.js</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-mono">Python</span>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-mono">Flask</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-mono">Docker</span>
                </div>
                <div className="flex gap-4">
                  <EditableButton id="portfolio_pro_project_2_cta" className="bg-black text-white hover:bg-gray-800 font-mono text-sm" editable={editable} {...props}>
                    view_demo()
                  </EditableButton>
                  <EditableButton id="portfolio_pro_project_2_github" className="bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-100 font-mono text-sm" editable={editable} {...props}>
                    view_code()
                  </EditableButton>
                </div>
              </div>
              <div className="relative lg:order-1">
                <EditableImage 
                  id="portfolio_pro_project_2_image" 
                  src="/placeholder.svg?height=400&width=600&text=DataViz+Dashboard" 
                  alt="DataViz Analytics Dashboard"
                  className="w-full rounded-lg shadow-lg border border-gray-200"
                  editable={editable} 
                  {...props}
                />
              </div>
            </div>

            {/* Project 3 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <EditableText id="portfolio_pro_project_3_title" as="h3" className="text-2xl font-bold mb-4 text-black" editable={editable} {...props}>
                  AI Chat Assistant
                </EditableText>
                <EditableText id="portfolio_pro_project_3_description" className="text-gray-600 mb-6 leading-relaxed" editable={editable} {...props}>
                  Intelligent chat assistant powered by machine learning. Features natural language processing, 
                  context awareness, and integration with multiple APIs. Built with modern AI frameworks.
                </EditableText>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-mono">Python</span>
                  <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-mono">TensorFlow</span>
                  <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-mono">FastAPI</span>
                  <span className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm font-mono">OpenAI</span>
                </div>
                <div className="flex gap-4">
                  <EditableButton id="portfolio_pro_project_3_cta" className="bg-black text-white hover:bg-gray-800 font-mono text-sm" editable={editable} {...props}>
                    try_demo()
                  </EditableButton>
                  <EditableButton id="portfolio_pro_project_3_github" className="bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-100 font-mono text-sm" editable={editable} {...props}>
                    view_code()
                  </EditableButton>
                </div>
              </div>
              <div className="relative">
                <EditableImage 
                  id="portfolio_pro_project_3_image" 
                  src="/placeholder.svg?height=400&width=600&text=AI+Chat+Interface" 
                  alt="AI Chat Assistant Interface"
                  className="w-full rounded-lg shadow-lg border border-gray-200"
                  editable={editable} 
                  {...props}
                />
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <EditableButton id="portfolio_pro_work_cta" className="px-8 py-3 bg-blue-600 text-white hover:bg-blue-700 font-mono" editable={editable} {...props}>
              view_all_projects()
            </EditableButton>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <EditableText id="portfolio_pro_services_title" as="h2" className="text-3xl md:text-4xl font-bold mb-4 text-black" editable={editable} {...props}>
              Technical Skills
            </EditableText>
            <EditableText id="portfolio_pro_services_subtitle" className="text-lg text-gray-600 font-light" editable={editable} {...props}>
              Technologies and tools I work with
            </EditableText>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Frontend */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <EditableText id="portfolio_pro_service_1_title" as="h3" className="text-lg font-bold mb-4 text-black font-mono" editable={editable} {...props}>
                Frontend
              </EditableText>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">React</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-14 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">TypeScript</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-12 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Next.js</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-13 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Backend */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <EditableText id="portfolio_pro_service_2_title" as="h3" className="text-lg font-bold mb-4 text-black font-mono" editable={editable} {...props}>
                Backend
              </EditableText>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Node.js</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-14 h-2 bg-green-600 rounded-full"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Python</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-15 h-2 bg-green-600 rounded-full"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">PostgreSQL</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-12 h-2 bg-green-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cloud */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <EditableText id="portfolio_pro_service_3_title" as="h3" className="text-lg font-bold mb-4 text-black font-mono" editable={editable} {...props}>
                Cloud & DevOps
              </EditableText>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">AWS</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-12 h-2 bg-orange-600 rounded-full"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Docker</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-13 h-2 bg-orange-600 rounded-full"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">CI/CD</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-11 h-2 bg-orange-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tools */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <EditableText id="portfolio_pro_service_4_title" as="h3" className="text-lg font-bold mb-4 text-black font-mono" editable={editable} {...props}>
                Tools
              </EditableText>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Git</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-16 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">VS Code</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-15 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Figma</span>
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div className="w-10 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-black text-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <EditableText id="portfolio_pro_contact_title" as="h2" className="text-3xl md:text-4xl font-bold mb-6" editable={editable} {...props}>
            Let's Build Something
          </EditableText>
          <EditableText id="portfolio_pro_contact_description" className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto font-light" editable={editable} {...props}>
            I'm always interested in new opportunities and challenging projects. 
            Let's discuss how we can work together.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EditableButton id="portfolio_pro_contact_cta_primary" className="px-8 py-3 bg-blue-600 text-white hover:bg-blue-700 font-mono" editable={editable} {...props}>
              send_message()
            </EditableButton>
            <EditableButton 
              id="portfolio_pro_contact_cta_secondary" 
              className="px-8 py-3 bg-transparent text-white border border-gray-600 hover:bg-gray-800 font-mono" 
              editable={editable} 
              {...props}
            >
              schedule_call()
            </EditableButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <EditableText id="portfolio_pro_footer_brand" className="text-xl font-mono font-bold text-black mb-4 md:mb-0" editable={editable} {...props}>
              sarah.dev
            </EditableText>
            <div className="flex items-center gap-6">
              <EditableText id="portfolio_pro_footer_link_1" className="text-gray-600 hover:text-blue-600 transition-colors font-mono text-sm" editable={editable} {...props}>
                github
              </EditableText>
              <EditableText id="portfolio_pro_footer_link_2" className="text-gray-600 hover:text-blue-600 transition-colors font-mono text-sm" editable={editable} {...props}>
                linkedin
              </EditableText>
              <EditableText id="portfolio_pro_footer_link_3" className="text-gray-600 hover:text-blue-600 transition-colors font-mono text-sm" editable={editable} {...props}>
                twitter
              </EditableText>
              <EditableText id="portfolio_pro_footer_link_4" className="text-gray-600 hover:text-blue-600 transition-colors font-mono text-sm" editable={editable} {...props}>
                email
              </EditableText>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <EditableText id="portfolio_pro_footer_copyright" className="text-gray-500 font-mono text-sm" editable={editable} {...props}>
              © 2024 Sarah Kim. Built with ❤️ and lots of ☕
            </EditableText>
          </div>
        </div>
      </footer>
    </main>
  )
}