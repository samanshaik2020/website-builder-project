'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import { Sparkles, Zap, Palette, Code, Star, ArrowRight, ChevronDown, Globe, Play, Rocket, MousePointer, Download, Eye, Share2 } from 'lucide-react';
import { motion, useScroll, useTransform, useInView, useSpring, Variants } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function HomePage() {
  const router = useRouter();
  
  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  // InView hooks
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" });
  const howItWorksInView = useInView(howItWorksRef, { once: true, margin: "-100px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-100px" });
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" });
  
  // Scroll progress
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Hero parallax
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroScrollProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroScrollProgress, [0, 0.5], [1, 0.9]);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  const letterContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.3,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { y: 100, opacity: 0, rotateX: -90, scale: 0.5 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-2, 2, -2],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const glowVariants: Variants = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(139, 92, 246, 0.3)",
        "0 0 60px rgba(139, 92, 246, 0.6)",
        "0 0 20px rgba(139, 92, 246, 0.3)",
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const titleText1 = "Create Beautiful Websites".split("");
  const titleText2 = "In Minutes".split("");
  
  // Stats data
  const stats = [
    { number: 50000, suffix: "+", label: "Websites Created" },
    { number: 17, suffix: "+", label: "Templates" },
    { number: 99, suffix: "%", label: "Satisfaction Rate" },
    { number: 24, suffix: "/7", label: "Support" },
  ];
  
  // Testimonials data
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Startup Founder",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      quote: "Squpage transformed how we build landing pages. What used to take weeks now takes hours.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      quote: "The AI content generation is incredible. It understands our brand voice perfectly.",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "Freelance Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      quote: "Finally, a website builder that doesn't compromise on design quality. Absolutely love it!",
      rating: 5,
    },
  ];
  
  // How it works steps
  const steps = [
    {
      icon: <MousePointer className="w-8 h-8" />,
      title: "Choose a Template",
      description: "Browse our collection of 17+ professionally designed templates for any industry.",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Customize Everything",
      description: "Edit text, images, colors, and layouts with our intuitive visual editor.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Generate with AI",
      description: "Let AI create compelling content tailored to your brand and audience.",
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "Publish & Share",
      description: "Export your website or share it instantly with a unique link.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 z-[100] origin-left"
        style={{ scaleX: smoothProgress }}
      />
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 80, 0], scale: [1, 0.8, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 right-1/4 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-white/5 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl cursor-pointer"
            >
              S
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Squpage
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <motion.a href="#features" className="text-white/70 hover:text-white transition-colors text-sm font-medium" whileHover={{ y: -2 }}>Features</motion.a>
            <motion.a href="#how-it-works" className="text-white/70 hover:text-white transition-colors text-sm font-medium" whileHover={{ y: -2 }}>How It Works</motion.a>
            <motion.a href="#testimonials" className="text-white/70 hover:text-white transition-colors text-sm font-medium" whileHover={{ y: -2 }}>Testimonials</motion.a>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="text" onClick={() => router.push('/signin')} sx={{ color: 'white', textTransform: 'none', fontSize: '16px' }}>Sign In</Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                onClick={() => router.push('/signup')}
                sx={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', textTransform: 'none', fontSize: '16px', px: 3, py: 1.5, borderRadius: '12px', '&:hover': { background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' } }}
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col justify-center"
      >
        {/* Floating decorations */}
        <motion.div variants={floatingVariants} animate="animate" className="absolute top-40 left-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-white/10 hidden lg:flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-purple-400" />
        </motion.div>
        <motion.div variants={floatingVariants} animate="animate" className="absolute top-60 right-20 w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/10 hidden lg:flex items-center justify-center" style={{ animationDelay: "2s" }}>
          <Code className="w-6 h-6 text-blue-400" />
        </motion.div>
        
        <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: heroY }} className="max-w-6xl mx-auto text-center relative z-10">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6, type: "spring" }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-10">
            <motion.div animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2, repeatDelay: 3 }}>
              <Sparkles className="w-5 h-5 text-purple-400" />
            </motion.div>
            <span className="text-sm font-medium text-white/90">AI-Powered Website Builder</span>
            <motion.span className="px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-300 text-xs font-semibold" animate={{ opacity: [1, 0.7, 1] }} transition={{ duration: 2, repeat: Infinity }}>NEW</motion.span>
          </motion.div>

          {/* Main Heading with enhanced letter animation */}
          <div className="mb-8 leading-tight perspective-1000">
            <motion.h1 variants={letterContainerVariants} initial="hidden" animate="visible" className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white inline-block">
              {titleText1.map((char, index) => (
                <motion.span key={index} variants={letterVariants} className="inline-block hover:text-purple-400 transition-colors cursor-default" whileHover={{ scale: 1.2, color: "#a855f7" }}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent bg-300% animate-gradient">
                {titleText2.map((char, index) => (
                  <motion.span key={index} variants={letterVariants} className="inline-block" whileHover={{ scale: 1.2 }}>
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </span>
            </motion.h1>
          </div>

          {/* Subheading */}
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="text-lg sm:text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
            Professional website builder with modern templates, AI-powered content generation, and live editing. <span className="text-purple-400 font-semibold">No coding required.</span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.8 }} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }} variants={glowVariants} animate="animate">
              <Button variant="contained" size="large" onClick={() => router.push('/templates')} endIcon={<ArrowRight className="w-5 h-5" />}
                sx={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', textTransform: 'none', fontSize: '18px', px: 6, py: 2, borderRadius: '16px', boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)', '&:hover': { background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', boxShadow: '0 12px 40px rgba(99, 102, 241, 0.6)' } }}>
                Start Building Free
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outlined" size="large" onClick={() => router.push('/dashboard')} startIcon={<Play className="w-5 h-5" />}
                sx={{ color: 'white', borderColor: 'rgba(255, 255, 255, 0.3)', textTransform: 'none', fontSize: '18px', px: 6, py: 2, borderRadius: '16px', backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255, 255, 255, 0.05)', '&:hover': { borderColor: 'rgba(255, 255, 255, 0.5)', backgroundColor: 'rgba(255, 255, 255, 0.1)' } }}>
                View Dashboard
              </Button>
            </motion.div>
          </motion.div>

          {/* Social Proof */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white/60">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div key={i} initial={{ scale: 0, x: -20 }} animate={{ scale: 1, x: 0 }} transition={{ delay: 1.8 + i * 0.1 }} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-gradient-to-br from-purple-400 to-pink-400" />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex">{[1, 2, 3, 4, 5].map((i) => (<Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />))}</div>
              <span className="text-sm">Trusted by <span className="text-white font-semibold">50,000+</span> creators</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
            <span className="text-white/50 text-sm">Scroll to explore</span>
            <ChevronDown className="w-6 h-6 text-white/50" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <section id="features" ref={featuresRef} className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={featuresInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm font-semibold mb-6" initial={{ scale: 0 }} animate={featuresInView ? { scale: 1 } : {}} transition={{ delay: 0.2, type: "spring" }}>POWERFUL FEATURES</motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Everything You Need to<br /><span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Build Amazing Websites</span></h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">From AI content generation to beautiful templates, we've got you covered.</p>
          </motion.div>
          <motion.div variants={containerVariants} initial="hidden" animate={featuresInView ? "visible" : "hidden"} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Zap className="w-7 h-7" />, title: "AI Content Generation", description: "Generate professional copy with a single click using advanced AI.", gradient: "from-purple-500 to-pink-500" },
              { icon: <Palette className="w-7 h-7" />, title: "17+ Premium Templates", description: "Choose from professionally designed templates for any industry.", gradient: "from-blue-500 to-cyan-500" },
              { icon: <MousePointer className="w-7 h-7" />, title: "Visual Editor", description: "Edit text, images, and layouts directly on the page.", gradient: "from-green-500 to-emerald-500" },
              { icon: <Download className="w-7 h-7" />, title: "One-Click Export", description: "Export your website as clean, standalone HTML.", gradient: "from-orange-500 to-red-500" },
              { icon: <Share2 className="w-7 h-7" />, title: "Instant Sharing", description: "Share your website with a unique link instantly.", gradient: "from-pink-500 to-rose-500" },
              { icon: <Eye className="w-7 h-7" />, title: "Real-Time Preview", description: "See your changes instantly as you edit.", gradient: "from-violet-500 to-purple-500" },
            ].map((feature, index) => (
              <motion.div key={index} variants={itemVariants} whileHover={{ y: -10, scale: 1.02 }} className="group p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300">
                <motion.div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>{feature.icon}</motion.div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" ref={howItWorksRef} className="py-32 px-6 relative bg-gradient-to-b from-transparent via-purple-950/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={howItWorksInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-6" initial={{ scale: 0 }} animate={howItWorksInView ? { scale: 1 } : {}} transition={{ delay: 0.2, type: "spring" }}>SIMPLE PROCESS</motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">How It <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Works</span></h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">Create your website in four simple steps.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500/0 via-purple-500/50 to-purple-500/0 -translate-y-1/2" />
            {steps.map((step, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 50 }} animate={howItWorksInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.2, duration: 0.6 }} className="relative text-center">
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg shadow-purple-500/30">
                  <span className="text-white">{step.icon}</span>
                </motion.div>
                <motion.div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white text-purple-600 font-bold flex items-center justify-center text-sm z-20 shadow-lg" whileHover={{ scale: 1.2 }}>{index + 1}</motion.div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-white/60">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={statsInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8 }} className="grid grid-cols-2 md:grid-cols-4 gap-8 p-10 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10">
            {stats.map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={statsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.1, duration: 0.6 }} className="text-center">
                <motion.div className="text-4xl md:text-5xl font-bold text-white mb-2" whileHover={{ scale: 1.1 }}>
                  {statsInView ? <CountUp end={stat.number} /> : 0}{stat.suffix}
                </motion.div>
                <p className="text-white/60 text-sm md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" ref={testimonialsRef} className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={testimonialsInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
            <motion.span className="inline-block px-4 py-2 rounded-full bg-pink-500/20 text-pink-300 text-sm font-semibold mb-6" initial={{ scale: 0 }} animate={testimonialsInView ? { scale: 1 } : {}} transition={{ delay: 0.2, type: "spring" }}>TESTIMONIALS</motion.span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Loved by <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">Creators</span></h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">See what our users have to say about Squpage.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 50 }} animate={testimonialsInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: index * 0.2, duration: 0.6 }} whileHover={{ y: -10, scale: 1.02 }} className="p-8 rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-pink-500/30 transition-all">
                <div className="flex mb-4">{[...Array(testimonial.rating)].map((_, i) => (<Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />))}</div>
                <p className="text-white/80 text-lg mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-white/50 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-32 px-6 relative">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={ctaInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.8 }} className="max-w-5xl mx-auto text-center p-16 rounded-3xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 backdrop-blur-sm border border-white/20 relative overflow-hidden">
          <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }} />
          <div className="relative z-10">
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">Ready to Build Your<br /><span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Dream Website?</span></motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }} className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">Join thousands of creators who are building beautiful websites with Squpage. Start for free today.</motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={ctaInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                <Button variant="contained" size="large" onClick={() => router.push('/templates')} endIcon={<Rocket className="w-5 h-5" />}
                  sx={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', textTransform: 'none', fontSize: '18px', px: 8, py: 2.5, borderRadius: '16px', boxShadow: '0 8px 32px rgba(99, 102, 241, 0.5)', '&:hover': { background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', boxShadow: '0 12px 40px rgba(99, 102, 241, 0.7)' } }}>
                  Get Started Free
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-white/5 backdrop-blur-sm py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl">S</div>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Squpage</span>
              </div>
              <p className="text-white/60 max-w-sm mb-6">Create beautiful, professional websites in minutes with our AI-powered builder. No coding required.</p>
              <div className="flex gap-4">
                {['twitter', 'github', 'linkedin'].map((social) => (
                  <motion.a key={social} href="#" whileHover={{ scale: 1.1, y: -2 }} className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors">
                    <Globe className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                {['Templates', 'Features', 'Pricing', 'Updates'].map((item) => (
                  <li key={item}><a href="#" className="text-white/60 hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                  <li key={item}><a href="#" className="text-white/60 hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">© 2025 Squpage. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// CountUp component for animated numbers
function CountUp({ end }: { end: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (!inView) return;
    let startTime: number;
    const duration = 2000;
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  }, [end, inView]);
  
  return <span ref={ref}>{count.toLocaleString()}</span>;
}
