"use client"
import type { TemplateProps } from "../../types"
import { EditableButton, EditableImage, EditableText } from "../../shared/editable"

export function PortfolioProCreativeArtist(props: TemplateProps) {
  const { editable } = props
  return (
    <main className="bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 text-white min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-white/20 bg-black/30 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <EditableText id="portfolio_pro_brand" as="h1" className="text-2xl font-black bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent" editable={editable} {...props}>
            Maya Chen
          </EditableText>
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold">
            <EditableText id="portfolio_pro_nav_1" className="hover:text-pink-400 transition-colors" editable={editable} {...props}>
              Gallery
            </EditableText>
            <EditableText id="portfolio_pro_nav_2" className="hover:text-orange-400 transition-colors" editable={editable} {...props}>
              About
            </EditableText>
            <EditableText id="portfolio_pro_nav_3" className="hover:text-purple-400 transition-colors" editable={editable} {...props}>
              Commissions
            </EditableText>
            <EditableText id="portfolio_pro_nav_4" className="hover:text-pink-400 transition-colors" editable={editable} {...props}>
              Exhibitions
            </EditableText>
            <EditableText id="portfolio_pro_nav_5" className="hover:text-orange-400 transition-colors" editable={editable} {...props}>
              Contact
            </EditableText>
          </nav>
          <div className="flex items-center gap-3">
            <EditableButton 
              id="portfolio_pro_nav_resume" 
              className="hidden md:inline-flex bg-transparent text-white border-2 border-pink-400 hover:bg-pink-400/20 font-bold" 
              editable={editable} 
              {...props}
            >
              Portfolio
            </EditableButton>
            <EditableButton id="portfolio_pro_nav_cta" className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 font-bold border-0" editable={editable} {...props}>
              Commission Art
            </EditableButton>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <EditableText id="portfolio_pro_hero_greeting" className="text-lg font-bold text-pink-400 mb-4 tracking-wide" editable={editable} {...props}>
              DIGITAL ARTIST
            </EditableText>
            <EditableText id="portfolio_pro_hero_title" as="h1" className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-pink-200 to-orange-200 bg-clip-text text-transparent" editable={editable} {...props}>
              Maya Chen
            </EditableText>
            <EditableText id="portfolio_pro_hero_subtitle" className="text-2xl md:text-3xl text-pink-300 mb-8 font-bold" editable={editable} {...props}>
              Creating Digital Masterpieces
            </EditableText>
            <EditableText id="portfolio_pro_hero_description" className="text-lg text-gray-200 mb-8 leading-relaxed" editable={editable} {...props}>
              I transform imagination into stunning digital art. Specializing in character design, concept art, 
              and immersive visual experiences that push the boundaries of creativity.
            </EditableText>
            <div className="flex flex-col sm:flex-row gap-4">
              <EditableButton id="portfolio_pro_hero_cta_primary" className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 font-bold text-lg border-0" editable={editable} {...props}>
                Explore Gallery
              </EditableButton>
              <EditableButton 
                id="portfolio_pro_hero_cta_secondary" 
                className="px-8 py-4 bg-transparent text-white border-2 border-orange-400 hover:bg-orange-400/20 font-bold text-lg" 
                editable={editable} 
                {...props}
              >
                Commission Work
              </EditableButton>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-orange-500/30 rounded-3xl blur-3xl"></div>
            <EditableImage 
              id="portfolio_pro_hero_image" 
              src="/placeholder.svg?height=600&width=500&text=Digital+Artist+Portrait" 
              alt="Maya Chen - Digital Artist"
              className="relative w-full max-w-md mx-auto rounded-3xl shadow-2xl border-4 border-white/20"
              editable={editable} 
              {...props}
            />
          </div>
        </div>
      </section>

      {/* Featured Artwork Section */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="text-center mb-16">
          <EditableText id="portfolio_pro_work_title" as="h2" className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent" editable={editable} {...props}>
            Featured Artwork
          </EditableText>
          <EditableText id="portfolio_pro_work_subtitle" className="text-xl text-gray-300 max-w-2xl mx-auto" editable={editable} {...props}>
            A curated selection of my latest digital creations and artistic explorations
          </EditableText>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Artwork 1 */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl mb-4 border-2 border-white/10">
              <EditableImage 
                id="portfolio_pro_project_1_image" 
                src="/placeholder.svg?height=400&width=400&text=Cyberpunk+Character" 
                alt="Cyberpunk Character Design"
                className="w-full h-80 object-cover transition-transform group-hover:scale-110"
                editable={editable} 
                {...props}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                <EditableButton id="portfolio_pro_project_1_cta" className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold border-0" editable={editable} {...props}>
                  View Artwork
                </EditableButton>
              </div>
            </div>
            <EditableText id="portfolio_pro_project_1_title" as="h3" className="text-xl font-bold mb-2 text-pink-300" editable={editable} {...props}>
              Cyberpunk Warrior
            </EditableText>
            <EditableText id="portfolio_pro_project_1_description" className="text-gray-300 mb-3" editable={editable} {...props}>
              Futuristic character design exploring themes of technology and humanity
            </EditableText>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm font-bold border border-pink-500/30">Character Design</span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-bold border border-purple-500/30">Digital Art</span>
            </div>
          </div>

          {/* Artwork 2 */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl mb-4 border-2 border-white/10">
              <EditableImage 
                id="portfolio_pro_project_2_image" 
                src="/placeholder.svg?height=400&width=400&text=Fantasy+Landscape" 
                alt="Fantasy Landscape Art"
                className="w-full h-80 object-cover transition-transform group-hover:scale-110"
                editable={editable} 
                {...props}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                <EditableButton id="portfolio_pro_project_2_cta" className="bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold border-0" editable={editable} {...props}>
                  View Artwork
                </EditableButton>
              </div>
            </div>
            <EditableText id="portfolio_pro_project_2_title" as="h3" className="text-xl font-bold mb-2 text-orange-300" editable={editable} {...props}>
              Mystic Realms
            </EditableText>
            <EditableText id="portfolio_pro_project_2_description" className="text-gray-300 mb-3" editable={editable} {...props}>
              Enchanted landscape painting with magical elements and ethereal lighting
            </EditableText>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full text-sm font-bold border border-orange-500/30">Environment</span>
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm font-bold border border-yellow-500/30">Fantasy</span>
            </div>
          </div>

          {/* Artwork 3 */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl mb-4 border-2 border-white/10">
              <EditableImage 
                id="portfolio_pro_project_3_image" 
                src="/placeholder.svg?height=400&width=400&text=Abstract+Portrait" 
                alt="Abstract Portrait Art"
                className="w-full h-80 object-cover transition-transform group-hover:scale-110"
                editable={editable} 
                {...props}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                <EditableButton id="portfolio_pro_project_3_cta" className="bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold border-0" editable={editable} {...props}>
                  View Artwork
                </EditableButton>
              </div>
            </div>
            <EditableText id="portfolio_pro_project_3_title" as="h3" className="text-xl font-bold mb-2 text-purple-300" editable={editable} {...props}>
              Emotional Spectrum
            </EditableText>
            <EditableText id="portfolio_pro_project_3_description" className="text-gray-300 mb-3" editable={editable} {...props}>
              Abstract portrait exploring the complexity of human emotions through color
            </EditableText>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-bold border border-purple-500/30">Abstract</span>
              <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm font-bold border border-pink-500/30">Portrait</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <EditableButton id="portfolio_pro_work_cta" className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 font-bold text-lg border-0" editable={editable} {...props}>
            View Full Gallery
          </EditableButton>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-black/40 backdrop-blur-sm py-20 border-y border-white/10">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <EditableText id="portfolio_pro_about_title" as="h2" className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent" editable={editable} {...props}>
                About the Artist
              </EditableText>
              <EditableText id="portfolio_pro_about_description" className="text-lg text-gray-200 mb-8 leading-relaxed" editable={editable} {...props}>
                I'm a digital artist passionate about creating worlds that don't exist yet. With over 6 years of experience 
                in digital art and concept design, I specialize in bringing imagination to life through vibrant colors, 
                dynamic compositions, and emotional storytelling.
              </EditableText>
              <EditableText id="portfolio_pro_about_description_2" className="text-lg text-gray-200 mb-8 leading-relaxed" editable={editable} {...props}>
                My work has been featured in galleries worldwide and I've collaborated with gaming studios, 
                film productions, and independent creators to bring their visions to reality.
              </EditableText>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl border border-pink-500/30">
                  <EditableText id="portfolio_pro_stat_1_number" className="text-3xl font-black text-pink-400" editable={editable} {...props}>
                    500+
                  </EditableText>
                  <EditableText id="portfolio_pro_stat_1_label" className="text-gray-300 font-bold" editable={editable} {...props}>
                    Artworks Created
                  </EditableText>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-xl border border-orange-500/30">
                  <EditableText id="portfolio_pro_stat_2_number" className="text-3xl font-black text-orange-400" editable={editable} {...props}>
                    25+
                  </EditableText>
                  <EditableText id="portfolio_pro_stat_2_label" className="text-gray-300 font-bold" editable={editable} {...props}>
                    Exhibitions
                  </EditableText>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-orange-500/30 rounded-3xl blur-3xl"></div>
              <EditableImage 
                id="portfolio_pro_about_image" 
                src="/placeholder.svg?height=500&width=400&text=Artist+at+Work" 
                alt="Maya Chen at Work"
                className="relative w-full max-w-md mx-auto rounded-3xl shadow-2xl border-4 border-white/20"
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
          <EditableText id="portfolio_pro_services_title" as="h2" className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent" editable={editable} {...props}>
            Art Services
          </EditableText>
          <EditableText id="portfolio_pro_services_subtitle" className="text-xl text-gray-300 max-w-2xl mx-auto" editable={editable} {...props}>
            From concept to completion, I bring your creative visions to life
          </EditableText>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 hover:border-pink-500/40 transition-all hover:shadow-2xl hover:shadow-pink-500/20">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <EditableText id="portfolio_pro_service_1_title" as="h3" className="text-2xl font-bold mb-4 text-pink-300" editable={editable} {...props}>
              Character Design
            </EditableText>
            <EditableText id="portfolio_pro_service_1_description" className="text-gray-300 leading-relaxed" editable={editable} {...props}>
              Unique character designs for games, animation, and storytelling with detailed concept sheets and variations.
            </EditableText>
          </div>

          {/* Service 2 */}
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-orange-500/10 to-pink-500/10 border border-orange-500/20 hover:border-orange-500/40 transition-all hover:shadow-2xl hover:shadow-orange-500/20">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <EditableText id="portfolio_pro_service_2_title" as="h3" className="text-2xl font-bold mb-4 text-orange-300" editable={editable} {...props}>
              Concept Art
            </EditableText>
            <EditableText id="portfolio_pro_service_2_description" className="text-gray-300 leading-relaxed" editable={editable} {...props}>
              Environmental and prop concept art for games, films, and creative projects with multiple iterations.
            </EditableText>
          </div>

          {/* Service 3 */}
          <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:shadow-2xl hover:shadow-purple-500/20">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
              </svg>
            </div>
            <EditableText id="portfolio_pro_service_3_title" as="h3" className="text-2xl font-bold mb-4 text-purple-300" editable={editable} {...props}>
              Digital Portraits
            </EditableText>
            <EditableText id="portfolio_pro_service_3_description" className="text-gray-300 leading-relaxed" editable={editable} {...props}>
              Custom digital portraits and illustrations with artistic flair and personal style interpretation.
            </EditableText>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-r from-pink-900/50 to-orange-900/50 backdrop-blur-sm py-20 border-t border-white/10">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <EditableText id="portfolio_pro_contact_title" as="h2" className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent" editable={editable} {...props}>
            Let's Create Together
          </EditableText>
          <EditableText id="portfolio_pro_contact_description" className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed" editable={editable} {...props}>
            Ready to bring your creative vision to life? Let's collaborate on something extraordinary.
          </EditableText>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <EditableButton id="portfolio_pro_contact_cta_primary" className="px-8 py-4 bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 font-bold text-lg border-0" editable={editable} {...props}>
              Commission Artwork
            </EditableButton>
            <EditableButton 
              id="portfolio_pro_contact_cta_secondary" 
              className="px-8 py-4 bg-transparent text-white border-2 border-pink-400 hover:bg-pink-400/20 font-bold text-lg" 
              editable={editable} 
              {...props}
            >
              View Portfolio
            </EditableButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 py-12 bg-black/40">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <EditableText id="portfolio_pro_footer_brand" className="text-2xl font-black bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent mb-4 md:mb-0" editable={editable} {...props}>
              Maya Chen
            </EditableText>
            <div className="flex items-center gap-6">
              <EditableText id="portfolio_pro_footer_link_1" className="text-gray-300 hover:text-pink-400 transition-colors font-bold" editable={editable} {...props}>
                Instagram
              </EditableText>
              <EditableText id="portfolio_pro_footer_link_2" className="text-gray-300 hover:text-orange-400 transition-colors font-bold" editable={editable} {...props}>
                ArtStation
              </EditableText>
              <EditableText id="portfolio_pro_footer_link_3" className="text-gray-300 hover:text-purple-400 transition-colors font-bold" editable={editable} {...props}>
                DeviantArt
              </EditableText>
              <EditableText id="portfolio_pro_footer_link_4" className="text-gray-300 hover:text-pink-400 transition-colors font-bold" editable={editable} {...props}>
                Twitter
              </EditableText>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center">
            <EditableText id="portfolio_pro_footer_copyright" className="text-gray-400" editable={editable} {...props}>
              © 2024 Maya Chen. All artwork and designs are original creations.
            </EditableText>
          </div>
        </div>
      </footer>
    </main>
  )
}