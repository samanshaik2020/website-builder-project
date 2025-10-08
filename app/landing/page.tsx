"use client"

import { Button } from "@/components/ui/button"
import { FloatingParticles } from "@/components/ui/floating-particles"
import { PageLoader } from "@/components/ui/page-loader"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ArrowRight, Sparkles, Zap, Brain, Eye, Code, Palette, Rocket, Check, Star, MousePointer, Globe, Users, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const featuresAnimation = useScrollAnimation(0.2)
  const testimonialsAnimation = useScrollAnimation(0.2)

  useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <PageLoader />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        <FloatingParticles />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-2000" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
        
        {/* Mouse Follower */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>
      {/* Navigation */}
      <nav className={`relative z-50 flex items-center justify-between p-6 md:p-8 backdrop-blur-xl bg-white/80 border-b border-white/20 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="flex items-center gap-3 group">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Squpage AI
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/pricing">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-white/50 transition-all duration-300">
              Pricing
            </Button>
          </Link>
          <Link href="/auth/signin">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-white/50 transition-all duration-300">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 md:px-8 py-20 md:py-32 text-center">
        <div className="max-w-5xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 backdrop-blur-sm rounded-full text-blue-700 text-sm font-medium mb-8 border border-blue-200/50 shadow-lg transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Sparkles className="w-4 h-4 animate-spin" />
            AI-Powered Website Builder
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/50" />
          </div>
          
          <h1 className={`text-5xl md:text-7xl font-black text-gray-900 mb-6 leading-tight transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Build Stunning Websites with{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient bg-300% relative">
              Squpage
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-lg -z-10 animate-pulse" />
            </span>
          </h1>
          
          <p className={`text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Transform your ideas into professional websites in minutes. Our AI generates 
            beautiful, responsive designs tailored to your vision.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Link href="/auth/signup?redirect=/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold group shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300">
                Start Building Free
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-white/80 backdrop-blur-sm px-8 py-4 text-lg hover:scale-105 transition-all duration-300 shadow-lg">
                <Eye className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </Link>
          </div>

          {/* Enhanced Stats */}
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {[
              { icon: Globe, value: "10K+", label: "Websites Created", color: "from-blue-500 to-cyan-500" },
              { icon: Users, value: "99%", label: "Satisfaction Rate", color: "from-purple-500 to-pink-500" },
              { icon: TrendingUp, value: "2min", label: "Average Build Time", color: "from-green-500 to-emerald-500" },
              { icon: Rocket, value: "24/7", label: "Support Available", color: "from-orange-500 to-red-500" }
            ].map((stat, index) => (
              <div key={index} className="group text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/80 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresAnimation.ref} className="relative px-6 md:px-8 py-20 bg-gradient-to-b from-white/50 to-gray-50/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${featuresAnimation.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features for{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Modern Creators
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to create professional websites that convert visitors into customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI Content Generation",
                description: "Generate compelling copy, headlines, and content that converts with advanced AI.",
                gradient: "from-blue-500 to-cyan-500",
                delay: "delay-100"
              },
              {
                icon: Palette,
                title: "Smart Design System",
                description: "Beautiful themes and layouts that adapt to your brand and industry automatically.",
                gradient: "from-purple-500 to-pink-500",
                delay: "delay-200"
              },
              {
                icon: Code,
                title: "No Code Required",
                description: "Build professional websites without writing a single line of code.",
                gradient: "from-green-500 to-emerald-500",
                delay: "delay-300"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Generate complete websites in under 2 minutes with our optimized AI engine.",
                gradient: "from-yellow-500 to-orange-500",
                delay: "delay-400"
              },
              {
                icon: Rocket,
                title: "One-Click Deploy",
                description: "Publish your website instantly with our global CDN and hosting platform.",
                gradient: "from-red-500 to-pink-500",
                delay: "delay-500"
              },
              {
                icon: Eye,
                title: "Real-time Preview",
                description: "See your changes instantly with our live preview and editing system.",
                gradient: "from-indigo-500 to-purple-500",
                delay: "delay-600"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`group p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-blue-300/50 hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${feature.delay} ${featuresAnimation.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`relative p-4 bg-gradient-to-r ${feature.gradient} rounded-xl w-fit mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <feature.icon className="w-6 h-6 text-white relative z-10" />
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section ref={testimonialsAnimation.ref} className="relative px-6 md:px-8 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white to-purple-50/50" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${testimonialsAnimation.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Loved by Creators Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our users are saying about Squpage AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Freelance Designer",
                content: "Squpage AI has revolutionized my workflow. I can create stunning websites for my clients in minutes instead of hours.",
                rating: 5,
                avatar: "SJ",
                color: "from-blue-500 to-cyan-500"
              },
              {
                name: "Mike Chen",
                role: "Small Business Owner",
                content: "As someone with no coding experience, this tool is a game-changer. My restaurant's website looks incredibly professional.",
                rating: 5,
                avatar: "MC",
                color: "from-purple-500 to-pink-500"
              },
              {
                name: "Emily Rodriguez",
                role: "Marketing Manager",
                content: "The AI-generated content is spot-on for our brand voice. It's like having a copywriter and designer in one tool.",
                rating: 5,
                avatar: "ER",
                color: "from-green-500 to-emerald-500"
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className={`group p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${testimonialsAnimation.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 italic text-lg leading-relaxed group-hover:text-gray-800 transition-colors">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                
                {/* Floating Quote Icon */}
                <div className="absolute top-4 right-4 text-6xl text-blue-100 group-hover:text-blue-200 transition-colors font-serif">
                  "
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 md:px-8 py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90 animate-gradient bg-300%" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/5 rounded-full blur-3xl animate-pulse delay-500" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-pulse">
            Ready to Build Your Dream Website?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of creators who are already building amazing websites with AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/signup?redirect=/dashboard">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50 px-12 py-6 text-xl font-semibold shadow-2xl hover:shadow-white/25 hover:scale-110 transition-all duration-300 group">
                Start Building Now - It's Free
                <Sparkles className="w-6 h-6 ml-2 group-hover:animate-spin" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg hover:scale-105 transition-all duration-300">
                <MousePointer className="w-5 h-5 mr-2" />
                Try Demo
              </Button>
            </Link>
          </div>
          
          {/* Floating Elements */}
          <div className="mt-16 flex justify-center items-center gap-8 opacity-60">
            <div className="animate-bounce delay-100">
              <Code className="w-8 h-8 text-white" />
            </div>
            <div className="animate-bounce delay-300">
              <Palette className="w-8 h-8 text-white" />
            </div>
            <div className="animate-bounce delay-500">
              <Rocket className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 md:px-8 py-12 bg-gradient-to-b from-gray-900 to-black text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6 group">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Squpage AI
            </span>
          </div>
          
          <div className="flex justify-center gap-8 mb-8 text-gray-400">
            <Link href="/privacy" className="hover:text-white transition-colors duration-300">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-300">Terms</Link>
            <Link href="/contact" className="hover:text-white transition-colors duration-300">Contact</Link>
            <Link href="/help" className="hover:text-white transition-colors duration-300">Help</Link>
          </div>
          
          <p className="text-gray-400 mb-4">
            © 2025 Squpage AI. All rights reserved. Built with ❤️ and AI.
          </p>
          
          <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            All systems operational
          </div>
        </div>
      </footer>
      </div>
    </>
  )
}