"use client"
import type { TemplateProps } from "../../types"
import { EditableButton, EditableImage, EditableText } from "../../shared/editable"

export function PortfolioProCyberpunkFuturistic(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-pink-400 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-500"></div>
        </div>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-cyan-500/30">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <EditableText id="portfolio_pro_brand" as="h1" className="text-2xl font-mono font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent" editable={editable} {...props}>
            ZARA.EXE
          </EditableText>
          <nav className="hidden md:flex items-center gap-8 text-sm font-mono uppercase tracking-wider">
            <EditableText id="portfolio_pro_nav_1" className="hover:text-cyan-400 transition-colors glow-text" editable={editable} {...props}>
              PROJECTS
            </EditableText>
            <EditableText id="portfolio_pro_nav_2" className="hover:text-pink-400 transition-colors glow-text" editable={editable} {...props}>
              ABOUT
            </EditableText>
            <EditableText id="portfolio_pro_nav_3" className="hover:text-purple-400 transition-colors glow-text" editable={editable} {...props}>
              SKILLS
            </EditableText>
            <EditableText id="portfolio_pro_nav_4" className="hover:text-cyan-400 transition-colors glow-text" editable={editable} {...props}>
              BLOG
            </EditableText>
            <EditableText id="portfolio_pro_nav_5" className="hover:text-pink-400 transition-colors glow-text" editable={editable} {...props}>
              CONTACT
            </EditableText>
          </nav>
          <div className="flex items-center gap-3">
            <EditableButton 
              id="portfolio_pro_nav_resume" 
              className="hidden md:inline-flex bg-transparent text-cyan-400 border border-cyan-400/50 hover:bg-cyan-400/10 font-mono text-sm glow-border" 
              editable={editable} 
              {...props}
            >
              RESUME.PDF
            </EditableButton>
            <EditableButton id="portfolio_pro_nav_cta" className="bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-black font-mono text-sm font-bold" editable={editable} {...props}>
              HIRE_ME()
            </EditableButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <EditableText id="portfolio_pro_hero_greeting" className="text-sm font-mono text-cyan-400 mb-6 tracking-[0.3em] uppercase glow-text" editable={editable} {...props}>
              &gt; INITIALIZING_PORTFOLIO.EXE
            </EditableText>
            <EditableText id="portfolio_pro_hero_title" as="h1" className="text-6xl md:text-7xl font-mono font-black mb-8 bg-gradient-to-r from-white via-cyan-200 to-pink-200 bg-clip-text text-transparent" editable={editable} {...props}>
              ZARA
              <br />
              NOVA
            </EditableText>
            <EditableText id="portfolio_pro_hero_subtitle" className="text-2xl md:text-3xl text-pink-400 mb-8 font-mono glow-text" editable={editable} {...props}>
              CYBERSECURITY_SPECIALIST
            </EditableText>
            <EditableText id="portfolio_pro_hero_description" className="text-lg text-gray-300 mb-10 leading-relaxed font-mono max-w-lg" editable={editable} {...props}>
              Penetration tester and security researcher specializing in advanced threat detection. 
              I secure digital infrastructures and hunt vulnerabilities in the cyber realm.
            </EditableText>
            <div className="flex flex-col sm:flex-row gap-4">
              <EditableButton id="portfolio_pro_hero_cta_primary" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-black font-mono font-bold text-lg glow-button" editable={editable} {...props}>
                VIEW_PROJECTS()
              </EditableButton>
              <EditableButton 
                id="portfolio_pro_hero_cta_secondary" 
                className="px-8 py-4 bg-transparent text-white border border-pink-400/50 hover:bg-pink-400/10 font-mono font-bold text-lg glow-border" 
                editable={editable} 
                {...props}
              >
                DOWNLOAD_CV()
              </EditableButton>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-pink-500/30 rounded-lg blur-3xl animate-pulse"></div>
            <div className="relative bg-gray-900 rounded-lg border border-cyan-500/30 p-6 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-4 text-cyan-400">terminal.exe</span>
              </div>
              <div className="space-y-2 text-green-400">
                <div><span className="text-cyan-400">$</span> whoami</div>
                <div>zara_nova</div>
                <div><span className="text-cyan-400">$</span> cat skills.txt</div>
                <div>- Penetration Testing</div>
                <div>- Malware Analysis</div>
                <div>- Network Security</div>
                <div>- Threat Hunting</div>
                <div><span className="text-cyan-400">$</span> echo "Ready to secure your systems"</div>
                <div className="text-pink-400">Ready to secure your systems</div>
                <div><span className="text-cyan-400 animate-pulse">$</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="relative bg-gray-900/50 backdrop-blur-sm py-20 border-y border-cyan-500/20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <EditableText id="portfolio_pro_work_title" as="h2" className="text-4xl md:text-5xl font-mono font-black mb-4 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent" editable={editable} {...props}>
              SECURITY_PROJECTS
            </EditableText>
            <EditableText id="portfolio_pro_work_subtitle" className="text-xl text-gray-300 max-w-2xl mx-auto font-mono" editable={editable} {...props}>
              Advanced cybersecurity solutions and penetration testing engagements
            </EditableText>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="group cursor-pointer bg-gray-900/80 rounded-lg border border-cyan-500/30 hover:border-cyan-400/60 transition-all overflow-hidden">
              <div className="relative overflow-hidden">
                <EditableImage 
                  id="portfolio_pro_project_1_image" 
                  src="/placeholder.svg?height=300&width=400&text=Network+Security+Dashboard" 
                  alt="Network Security Dashboard"
                  className="w-full h-48 object-cover transition-transform group-hover:scale-105 opacity-80"
                  editable={editable} 
                  {...props}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded text-sm font-mono border border-cyan-500/30">SECURITY</span>
                </div>
              </div>
              <div className="p-6">
                <EditableText id="portfolio_pro_project_1_title" as="h3" className="text-xl font-mono font-bold mb-2 text-cyan-400 glow-text" editable={editable} {...props}>
                  THREAT_HUNTER_V2.0
                </EditableText>
                <EditableText id="portfolio_pro_project_1_description" className="text-gray-300 mb-4 font-mono text-sm" editable={editable} {...props}>
                  Advanced threat detection system using machine learning to identify and neutralize cyber attacks in real-time
                </EditableText>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs font-mono border border-purple-500/30">Python</span>
                  <span className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded text-xs font-mono border border-pink-500/30">ML</span>
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs font-mono border border-cyan-500/30">Security</span>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group cursor-pointer bg-gray-900/80 rounded-lg border border-pink-500/30 hover:border-pink-400/60 transition-all overflow-hidden">
              <div className="relative overflow-hidden">
                <EditableImage 
                  id="portfolio_pro_project_2_image" 
                  src="/placeholder.svg?height=300&width=400&text=Penetration+Testing+Tool" 
                  alt="Penetration Testing Tool"
                  className="w-full h-48 object-cover transition-transform group-hover:scale-105 opacity-80"
                  editable={editable} 
                  {...props}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className="bg-pink-500/20 text-pink-400 px-3 py-1 rounded text-sm font-mono border border-pink-500/30">PENTEST</span>
                </div>
              </div>
              <div className="p-6">
                <EditableText id="portfolio_pro_project_2_title" as="h3" className="text-xl font-mono font-bold mb-2 text-pink-400 glow-text" editable={editable} {...props}>
                  EXPLOIT_FRAMEWORK
                </EditableText>
                <EditableText id="portfolio_pro_project_2_description" className="text-gray-300 mb-4 font-mono text-sm" editable={editable} {...props}>
                  Custom penetration testing framework for automated vulnerability discovery and exploitation
                </EditableText>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs font-mono border border-purple-500/30">C++</span>
                  <span className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded text-xs font-mono border border-pink-500/30">Exploit</span>
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs font-mono border border-cyan-500/30">Automation</span>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group cursor-pointer bg-gray-900/80 rounded-lg border border-purple-500/30 hover:border-purple-400/60 transition-all overflow-hidden">
              <div className="relative overflow-hidden">
                <EditableImage 
                  id="portfolio_pro_project_3_image" 
                  src="/placeholder.svg?height=300&width=400&text=Malware+Analysis+Lab" 
                  alt="Malware Analysis Lab"
                  className="w-full h-48 object-cover transition-transform group-hover:scale-105 opacity-80"
                  editable={editable} 
                  {...props}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded text-sm font-mono border border-purple-500/30">MALWARE</span>
                </div>
              </div>
              <div className="p-6">
                <EditableText id="portfolio_pro_project_3_title" as="h3" className="text-xl font-mono font-bold mb-2 text-purple-400 glow-text" editable={editable} {...props}>
                  MALWARE_ANALYZER
                </EditableText>
                <EditableText id="portfolio_pro_project_3_description" className="text-gray-300 mb-4 font-mono text-sm" editable={editable} {...props}>
                  Automated malware analysis sandbox for reverse engineering and behavioral analysis
                </EditableText>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs font-mono border border-purple-500/30">Assembly</span>
                  <span className="px-2 py-1 bg-pink-500/20 text-pink-300 rounded text-xs font-mono border border-pink-500/30">Reverse Eng</span>
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs font-mono border border-cyan-500/30">Analysis</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <EditableButton id="portfolio_pro_work_cta" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-black font-mono font-bold text-lg glow-button" editable={editable} {...props}>
              VIEW_ALL_PROJECTS()
            </EditableButton>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <EditableText id="portfolio_pro_services_title" as="h2" className="text-4xl md:text-5xl font-mono font-black mb-4 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent" editable={editable} {...props}>
              SKILL_MATRIX
            </EditableText>
            <EditableText id="portfolio_pro_services_subtitle" className="text-xl text-gray-300 max-w-2xl mx-auto font-mono" editable={editable} {...props}>
              Advanced cybersecurity capabilities and technical expertise
            </EditableText>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Skill 1 */}
            <div className="bg-gray-900/80 p-8 rounded-lg border border-cyan-500/30 hover:border-cyan-400/60 transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <EditableText id="portfolio_pro_service_1_title" as="h3" className="text-xl font-mono font-bold mb-4 text-cyan-400 text-center glow-text" editable={editable} {...props}>
                PENETRATION_TESTING
              </EditableText>
              <EditableText id="portfolio_pro_service_1_description" className="text-gray-300 text-center font-mono text-sm" editable={editable} {...props}>
                Advanced penetration testing methodologies for web applications, networks, and infrastructure systems.
              </EditableText>
            </div>

            {/* Skill 2 */}
            <div className="bg-gray-900/80 p-8 rounded-lg border border-pink-500/30 hover:border-pink-400/60 transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <EditableText id="portfolio_pro_service_2_title" as="h3" className="text-xl font-mono font-bold mb-4 text-pink-400 text-center glow-text" editable={editable} {...props}>
                MALWARE_ANALYSIS
              </EditableText>
              <EditableText id="portfolio_pro_service_2_description" className="text-gray-300 text-center font-mono text-sm" editable={editable} {...props}>
                Reverse engineering and behavioral analysis of malicious software and advanced persistent threats.
              </EditableText>
            </div>

            {/* Skill 3 */}
            <div className="bg-gray-900/80 p-8 rounded-lg border border-purple-500/30 hover:border-purple-400/60 transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <EditableText id="portfolio_pro_service_3_title" as="h3" className="text-xl font-mono font-bold mb-4 text-purple-400 text-center glow-text" editable={editable} {...props}>
                THREAT_HUNTING
              </EditableText>
              <EditableText id="portfolio_pro_service_3_description" className="text-gray-300 text-center font-mono text-sm" editable={editable} {...props}>
                Proactive threat hunting and incident response using advanced detection techniques and SIEM tools.
              </EditableText>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative bg-gradient-to-r from-cyan-900/20 to-pink-900/20 backdrop-blur-sm py-20 border-t border-cyan-500/20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <EditableText id="portfolio_pro_contact_title" as="h2" className="text-4xl md:text-5xl font-mono font-black mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent" editable={editable} {...props}>
            INITIATE_CONTACT()
          </EditableText>
          <EditableText id="portfolio_pro_contact_description" className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto font-mono" editable={editable} {...props}>
            Ready to secure your digital infrastructure? Let's connect and discuss your cybersecurity needs.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EditableButton id="portfolio_pro_contact_cta_primary" className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-pink-500 hover:from-cyan-600 hover:to-pink-600 text-black font-mono font-bold text-lg glow-button" editable={editable} {...props}>
              HIRE_ME()
            </EditableButton>
            <EditableButton 
              id="portfolio_pro_contact_cta_secondary" 
              className="px-8 py-4 bg-transparent text-white border border-cyan-400/50 hover:bg-cyan-400/10 font-mono font-bold text-lg glow-border" 
              editable={editable} 
              {...props}
            >
              SCHEDULE_CALL()
            </EditableButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cyan-500/20 py-12 bg-black/80">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <EditableText id="portfolio_pro_footer_brand" className="text-2xl font-mono font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent mb-4 md:mb-0" editable={editable} {...props}>
              ZARA.EXE
            </EditableText>
            <div className="flex items-center gap-6">
              <EditableText id="portfolio_pro_footer_link_1" className="text-gray-300 hover:text-cyan-400 transition-colors font-mono text-sm glow-text" editable={editable} {...props}>
                GITHUB
              </EditableText>
              <EditableText id="portfolio_pro_footer_link_2" className="text-gray-300 hover:text-pink-400 transition-colors font-mono text-sm glow-text" editable={editable} {...props}>
                LINKEDIN
              </EditableText>
              <EditableText id="portfolio_pro_footer_link_3" className="text-gray-300 hover:text-purple-400 transition-colors font-mono text-sm glow-text" editable={editable} {...props}>
                TWITTER
              </EditableText>
              <EditableText id="portfolio_pro_footer_link_4" className="text-gray-300 hover:text-cyan-400 transition-colors font-mono text-sm glow-text" editable={editable} {...props}>
                EMAIL
              </EditableText>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-cyan-500/20 text-center">
            <EditableText id="portfolio_pro_footer_copyright" className="text-gray-400 font-mono text-sm" editable={editable} {...props}>
              © 2024 ZARA_NOVA. SECURING_THE_DIGITAL_REALM.EXE
            </EditableText>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .glow-text {
          text-shadow: 0 0 10px currentColor;
        }
        .glow-border {
          box-shadow: 0 0 20px rgba(34, 211, 238, 0.3);
        }
        .glow-button {
          box-shadow: 0 0 30px rgba(34, 211, 238, 0.5);
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </main>
  )
}