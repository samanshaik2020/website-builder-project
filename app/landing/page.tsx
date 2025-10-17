"use client"

import { Button } from "@/components/ui/button"
import { FloatingParticles } from "@/components/ui/floating-particles"
import { PageLoader } from "@/components/ui/page-loader"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ArrowRight, Sparkles, Zap, Brain, Eye, Code, Palette, Rocket, Check, Star, MousePointer, Globe, Users, TrendingUp, Layers, Box, Wand2, Layout, Shield, Clock, ChevronRight, ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const featuresAnimation = useScrollAnimation(0.2)
  const testimonialsAnimation = useScrollAnimation(0.2)
  const timelineAnimation = useScrollAnimation(0.3)
  const pricingAnimation = useScrollAnimation(0.2)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3)
    }, 5000)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <PageLoader />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 relative overflow-hidden">
        <FloatingParticles />
      
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Morphing Blobs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-40 right-20 w-[500px] h-[500px] bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
        
        {/* Animated Grid with Parallax */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        
        {/* 3D Floating Elements */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl animate-float-3d backdrop-blur-sm" />
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-gradient-to-br from-pink-500/20 to-orange-500/20 rounded-2xl animate-float-3d" style={{ animationDelay: '1s' }} />
        
        {/* Mouse Follower with Glow */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl transition-all duration-700 ease-out animate-pulse-glow"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />
      </div>
      {/* Glassmorphism Navigation */}
      <nav className={`relative z-50 flex items-center justify-between p-6 md:p-8 backdrop-blur-2xl bg-white/5 border-b border-white/10 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="flex items-center gap-3 group">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/50 animate-glow">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent bg-300% animate-text-shimmer">
            Squpage AI
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/pricing">
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300">
              Pricing
            </Button>
          </Link>
          <Link href="/auth/signin">
            <Button variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/signup">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-105 transition-all duration-300 animate-glow">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section with 3D Elements */}
      <section className="relative z-10 px-6 md:px-8 py-20 md:py-32 text-center" style={{ transform: `translateY(${scrollY * 0.3}px)` }}>
        <div className="max-w-6xl mx-auto">
          {/* Glassmorphism Badge */}
          <div className={`inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full text-white text-sm font-medium mb-8 border border-white/20 shadow-2xl shadow-blue-500/20 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Sparkles className="w-4 h-4 animate-spin text-yellow-400" />
            AI-Powered Website Builder
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
          </div>
          
          {/* 3D Floating Title */}
          <div className="relative">
            <h1 className={`text-5xl md:text-8xl font-black text-white mb-6 leading-tight transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              Build Stunning Websites with{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300%">
                  Squpage
                </span>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-2xl -z-10 animate-pulse" />
              </span>
            </h1>
            
            {/* 3D Decorative Elements */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl animate-float-3d backdrop-blur-sm" />
            <div className="absolute -top-5 -right-5 w-16 h-16 bg-gradient-to-br from-pink-500/30 to-orange-500/30 rounded-xl animate-float-3d" style={{ animationDelay: '1s' }} />
          </div>
          
          <p className={`text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Transform your ideas into professional websites in minutes. Our AI generates 
            beautiful, responsive designs tailored to your vision.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Link href="/auth/signup?redirect=/dashboard">
              <Button size="lg" className="relative bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-6 text-lg font-semibold group shadow-2xl shadow-blue-500/50 hover:shadow-purple-500/50 hover:scale-110 transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Start Building Free
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-xl px-8 py-6 text-lg hover:scale-105 transition-all duration-300 shadow-lg">
                <Eye className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </Link>
          </div>

          {/* Glassmorphism Stats */}
          <div className={`grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {[
              { icon: Globe, value: "10K+", label: "Websites Created", color: "from-blue-500 to-cyan-500" },
              { icon: Users, value: "99%", label: "Satisfaction Rate", color: "from-purple-500 to-pink-500" },
              { icon: TrendingUp, value: "2min", label: "Average Build Time", color: "from-green-500 to-emerald-500" },
              { icon: Rocket, value: "24/7", label: "Support Available", color: "from-orange-500 to-red-500" }
            ].map((stat, index) => (
              <div key={index} className="group relative text-center p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-110 hover:-translate-y-2 shadow-2xl hover:shadow-blue-500/20">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg animate-glow`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-white/60 text-sm font-medium">{stat.label}</div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Morphing Features Section */}
      <section ref={featuresAnimation.ref} className="relative px-6 md:px-8 py-20 bg-transparent">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/30 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-1000 ${featuresAnimation.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Powerful Features for{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300%">
                Modern Creators
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Everything you need to create professional websites that convert visitors into customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI Content Generation",
                description: "Generate compelling copy, headlines, and content that converts with advanced AI.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: Palette,
                title: "Smart Design System",
                description: "Beautiful themes and layouts that adapt to your brand and industry automatically.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: Code,
                title: "No Code Required",
                description: "Build professional websites without writing a single line of code.",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Generate complete websites in under 2 minutes with our optimized AI engine.",
                gradient: "from-yellow-500 to-orange-500"
              },
              {
                icon: Rocket,
                title: "One-Click Deploy",
                description: "Publish your website instantly with our global CDN and hosting platform.",
                gradient: "from-red-500 to-pink-500"
              },
              {
                icon: Eye,
                title: "Real-time Preview",
                description: "See your changes instantly with our live preview and editing system.",
                gradient: "from-indigo-500 to-purple-500"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`group relative p-8 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-700 hover:scale-105 hover:-translate-y-3 shadow-2xl hover:shadow-blue-500/30 overflow-hidden ${featuresAnimation.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Morphing Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-morph" />
                
                <div className={`relative p-5 bg-gradient-to-r ${feature.gradient} rounded-2xl w-fit mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg animate-glow`}>
                  <feature.icon className="w-7 h-7 text-white relative z-10" />
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity`} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/60 leading-relaxed group-hover:text-white/80 transition-colors">
                  {feature.description}
                </p>
                
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-gradient bg-300%" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Timeline Section */}
      <section ref={timelineAnimation.ref} className="relative px-6 md:px-8 py-20 bg-transparent overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/30 to-transparent" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-1000 ${timelineAnimation.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Your Journey to{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300%">
                Success
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              From idea to launch in just a few simple steps
            </p>
          </div>

          <div className="relative">
            {/* Animated Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transform -translate-x-1/2 animate-pulse" />
            
            {[
              {
                icon: Wand2,
                title: "Describe Your Vision",
                description: "Tell our AI what kind of website you want to create",
                color: "from-blue-500 to-cyan-500",
                side: "left"
              },
              {
                icon: Brain,
                title: "AI Generates Design",
                description: "Watch as AI creates a stunning, professional website in seconds",
                color: "from-purple-500 to-pink-500",
                side: "right"
              },
              {
                icon: Layout,
                title: "Customize & Edit",
                description: "Fine-tune every detail with our intuitive visual editor",
                color: "from-green-500 to-emerald-500",
                side: "left"
              },
              {
                icon: Rocket,
                title: "Launch & Grow",
                description: "Deploy your website instantly and watch your business thrive",
                color: "from-orange-500 to-red-500",
                side: "right"
              }
            ].map((step, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-16 ${step.side === 'right' ? 'flex-row-reverse' : ''} ${timelineAnimation.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Content Card */}
                <div className={`w-5/12 ${step.side === 'left' ? 'text-right pr-12' : 'text-left pl-12'}`}>
                  <div className={`group p-8 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-2xl hover:shadow-${step.color.split('-')[1]}-500/30 ${step.side === 'left' ? 'animate-slide-in-left' : 'animate-slide-in-right'}`}>
                    <div className={`inline-flex p-4 bg-gradient-to-r ${step.color} rounded-2xl mb-4 shadow-lg animate-glow`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-white/60 leading-relaxed">{step.description}</p>
                  </div>
                </div>
                
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-slate-900 shadow-lg shadow-blue-500/50 animate-pulse-glow z-10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Testimonials Carousel */}
      <section ref={testimonialsAnimation.ref} className="relative px-6 md:px-8 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/30 to-transparent" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${testimonialsAnimation.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Loved by Creators{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300%">
                Worldwide
              </span>
            </h2>
            <p className="text-xl text-white/70">
              See what our users are saying about Squpage AI
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative" ref={carouselRef}>
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
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
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="group relative p-12 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 hover:bg-white/10 transition-all duration-500 shadow-2xl hover:shadow-blue-500/30 mx-auto max-w-4xl">
                      {/* Morphing Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl animate-morph" />
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-8 justify-center">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                          ))}
                        </div>
                        
                        <p className="text-white text-2xl md:text-3xl mb-10 italic leading-relaxed text-center font-light">
                          "{testimonial.content}"
                        </p>
                        
                        <div className="flex items-center gap-6 justify-center">
                          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${testimonial.color} flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/50 animate-glow`}>
                            {testimonial.avatar}
                          </div>
                          <div className="text-left">
                            <div className="font-bold text-white text-xl">
                              {testimonial.name}
                            </div>
                            <div className="text-white/60">{testimonial.role}</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Floating Quote Icon */}
                      <div className="absolute top-8 right-8 text-8xl text-white/10 font-serif">
                        "
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev - 1 + 3) % 3)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-4 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => setCurrentTestimonial((prev) => (prev + 1) % 3)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-4 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-lg"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-3 mt-8">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-12' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Animated Pricing Section */}
      <section ref={pricingAnimation.ref} className="relative px-6 md:px-8 py-20 bg-transparent overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/30 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className={`text-center mb-20 transition-all duration-1000 ${pricingAnimation.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
              Simple,{" "}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient bg-300%">
                Transparent Pricing
              </span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Start free, upgrade when you're ready to scale
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                period: "forever",
                features: ["3 Websites", "Basic Templates", "AI Generation", "Community Support"],
                color: "from-blue-500 to-cyan-500",
                popular: false
              },
              {
                name: "Pro",
                price: "$29",
                period: "per month",
                features: ["Unlimited Websites", "Premium Templates", "Advanced AI", "Priority Support", "Custom Domain", "Analytics"],
                color: "from-purple-500 to-pink-500",
                popular: true
              },
              {
                name: "Enterprise",
                price: "$99",
                period: "per month",
                features: ["Everything in Pro", "White Label", "API Access", "Dedicated Support", "Custom Integrations", "SLA Guarantee"],
                color: "from-orange-500 to-red-500",
                popular: false
              }
            ].map((plan, index) => (
              <div
                key={index}
                className={`group relative p-8 bg-white/5 backdrop-blur-2xl rounded-3xl border transition-all duration-700 hover:scale-105 hover:-translate-y-3 shadow-2xl ${
                  plan.popular 
                    ? 'border-purple-500/50 hover:border-purple-500 bg-white/10 scale-105' 
                    : 'border-white/10 hover:border-white/20'
                } ${pricingAnimation.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white text-sm font-bold shadow-lg animate-pulse">
                    Most Popular
                  </div>
                )}
                
                {/* Morphing Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-3xl animate-morph`} />
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-black text-white">{plan.price}</span>
                    <span className="text-white/60 ml-2">/{plan.period}</span>
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-white/80">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link href="/auth/signup">
                    <Button className={`w-full py-6 text-lg font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg shadow-purple-500/50 animate-glow'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                    }`}>
                      Get Started
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bold CTA Section with Parallax */}
      <section className="relative px-6 md:px-8 py-32 text-center overflow-hidden" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
        {/* Animated Background with Parallax */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient bg-300%" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
        </div>
        
        {/* 3D Floating Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 backdrop-blur-sm rounded-3xl animate-float-3d" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl animate-float-3d" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight">
            Ready to Build Your{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Dream Website?
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 blur-2xl -z-10 animate-pulse" />
            </span>
          </h2>
          <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Join thousands of creators who are already building amazing websites with AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/auth/signup?redirect=/dashboard">
              <Button size="lg" className="relative bg-white text-purple-600 hover:bg-gray-50 px-14 py-8 text-2xl font-bold shadow-2xl hover:shadow-white/50 hover:scale-110 transition-all duration-300 group overflow-hidden">
                <span className="relative z-10 flex items-center">
                  Start Building Now - It's Free
                  <Sparkles className="w-7 h-7 ml-3 group-hover:animate-spin" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>
            <Link href="/demo">
              <Button size="lg" variant="outline" className="border-2 border-white/50 text-white hover:bg-white/20 backdrop-blur-xl px-10 py-8 text-xl hover:scale-105 transition-all duration-300 shadow-lg">
                <MousePointer className="w-6 h-6 mr-2" />
                Try Demo
              </Button>
            </Link>
          </div>
          
          {/* Animated Floating Icons */}
          <div className="mt-20 flex justify-center items-center gap-12">
            <div className="animate-float-3d">
              <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl">
                <Code className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="animate-float-3d" style={{ animationDelay: '1s' }}>
              <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl">
                <Palette className="w-10 h-10 text-white" />
              </div>
            </div>
            <div className="animate-float-3d" style={{ animationDelay: '2s' }}>
              <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl">
                <Rocket className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="relative px-6 md:px-8 py-16 bg-slate-950 text-center overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-8 group">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/50 animate-glow">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent bg-300% animate-text-shimmer">
              Squpage AI
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 mb-10 text-white/60">
            <Link href="/privacy" className="hover:text-white transition-colors duration-300 hover:scale-110 transform">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-300 hover:scale-110 transform">Terms</Link>
            <Link href="/contact" className="hover:text-white transition-colors duration-300 hover:scale-110 transform">Contact</Link>
            <Link href="/help" className="hover:text-white transition-colors duration-300 hover:scale-110 transform">Help</Link>
          </div>
          
          <p className="text-white/50 mb-6 text-lg">
            © 2025 Squpage AI. All rights reserved. Built with ❤️ and AI.
          </p>
          
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
            <span className="text-white/70 text-sm font-medium">All systems operational</span>
          </div>
        </div>
      </footer>
      </div>
    </>
  )
}