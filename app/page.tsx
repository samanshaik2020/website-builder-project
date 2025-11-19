'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    setMounted(true);
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check which sections are visible
      const visible = new Set<string>();
      Object.entries(sectionRefs.current).forEach(([key, element]) => {
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.75 && rect.bottom > 0) {
            visible.add(key);
          }
        }
      });
      setVisibleSections(visible);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const features = [
    {
      icon: '🎨',
      title: 'Beautiful Templates',
      description: 'Choose from professionally designed templates for any purpose.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: '✏️',
      title: 'Live Editing',
      description: 'Edit text and content directly with real-time preview.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '🔗',
      title: 'Easy Sharing',
      description: 'Generate shareable links and export your website instantly.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Built with Next.js for optimal performance and speed.',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: '🎯',
      title: 'SEO Optimized',
      description: 'All templates are optimized for search engines out of the box.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: '📱',
      title: 'Fully Responsive',
      description: 'Your website looks perfect on all devices and screen sizes.',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  const stats = [
    { value: '50+', label: 'Templates' },
    { value: '10K+', label: 'Websites Created' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden" suppressHydrationWarning>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-60 animate-pulse"
          style={{ transform: mounted ? `translateY(${scrollY * 0.3}px)` : 'translateY(0)' }}
        />
        <div 
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-60 animate-pulse"
          style={{ transform: mounted ? `translateY(${-scrollY * 0.2}px)` : 'translateY(0)' }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-40 animate-pulse"
          style={{ transform: mounted ? `translate(-50%, -50%) translateY(${scrollY * 0.15}px)` : 'translate(-50%, -50%)' }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
              S
            </div>
            <span className="text-slate-900 font-bold text-xl">Squpage</span>
          </div>
          <button
            onClick={() => router.push('/signup')}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
          >
            Create New Account
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={(el) => { sectionRefs.current['hero'] = el; }}
        className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden"
      >
        {/* Mouse-following gradient orb */}
        <div 
          className="fixed w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out"
          style={{
            left: mounted ? `${mousePosition.x - 192}px` : '-192px',
            top: mounted ? `${mousePosition.y - 192}px` : '-192px',
          }}
        />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div 
            className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border-2 border-purple-300 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-default animate-pulse">
              <span className="text-purple-700 font-semibold">✨ Build Your Dream Website Today</span>
            </div>
          </div>

          <h1 
            className={`text-6xl md:text-8xl font-bold text-slate-900 mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ 
              transitionDelay: '200ms',
              transform: mounted ? `translateY(${scrollY * -0.3}px)` : 'translateY(0)'
            }}
          >
            Create Stunning
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
                Websites
              </span>
              <span className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 blur-2xl opacity-20 animate-pulse" />
            </span>
          </h1>

          <p 
            className={`text-xl md:text-2xl text-slate-700 mb-4 max-w-3xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ 
              transitionDelay: '300ms',
              transform: mounted ? `translateY(${scrollY * -0.2}px)` : 'translateY(0)'
            }}
          >
            Build professional websites in minutes with our intuitive drag-and-drop builder
          </p>

          <p 
            className={`text-lg text-slate-600 mb-12 max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ 
              transitionDelay: '400ms',
              transform: mounted ? `translateY(${scrollY * -0.15}px)` : 'translateY(0)'
            }}
          >
            No coding required. Choose from beautiful templates, customize with live editing, and publish instantly.
          </p>

          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ 
              transitionDelay: '500ms',
              transform: mounted ? `translateY(${scrollY * -0.1}px)` : 'translateY(0)'
            }}
          >
            <button
              onClick={() => router.push('/signup')}
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-lg font-semibold overflow-hidden transition-all hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/40 hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Get Started Free
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
            </button>
            <button
              onClick={() => router.push('/signin')}
              className="group px-10 py-5 bg-white hover:bg-slate-50 text-slate-900 rounded-xl text-lg font-semibold transition-all border-2 border-slate-300 hover:border-purple-400 hover:scale-110 shadow-md hover:shadow-xl hover:-translate-y-1"
            >
              <span className="flex items-center justify-center gap-2">
                Sign In
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </button>
          </div>

          {/* Enhanced Floating Cards with 3D transforms */}
          <div 
            className="relative h-64 mb-20"
            style={{
              transform: mounted ? `translateY(${scrollY * 0.5}px)` : 'translateY(0)',
              transition: 'transform 0.3s ease-out'
            }}
          >
            <div 
              className="absolute left-1/2 top-0 -translate-x-1/2 w-80 h-48 bg-white rounded-2xl border-2 border-purple-200 shadow-2xl shadow-purple-200/50 hover:shadow-purple-300/60 transition-all duration-500 cursor-pointer group"
              style={{ 
                transform: mounted 
                  ? `translateX(-50%) translateY(${Math.sin(scrollY * 0.01) * 20}px) rotateX(${scrollY * 0.05}deg) rotateY(${(mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth : 1920) / 2) * 0.01}deg)`
                  : 'translateX(-50%)',
                transition: 'transform 0.3s ease-out, box-shadow 0.3s ease'
              }}
            >
              <div className="p-6 relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4 shadow-md group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                <div className="h-3 bg-slate-200 rounded mb-2 w-3/4 group-hover:bg-slate-300 transition-colors" />
                <div className="h-3 bg-slate-100 rounded w-1/2 group-hover:bg-slate-200 transition-colors" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 rounded-2xl transition-all duration-300" />
              </div>
            </div>
            <div 
              className="absolute left-1/4 top-20 w-64 h-40 bg-white rounded-2xl border-2 border-blue-200 shadow-2xl shadow-blue-200/50 hover:shadow-blue-300/60 transition-all duration-500 cursor-pointer group"
              style={{ 
                transform: mounted 
                  ? `translateY(${Math.sin(scrollY * 0.01 + 1) * 15}px) rotateZ(${-5 + scrollY * 0.02}deg) scale(${1 + Math.sin(scrollY * 0.005) * 0.05})`
                  : 'translateY(0)',
                transition: 'transform 0.3s ease-out, box-shadow 0.3s ease'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 rounded-2xl transition-all duration-300" />
            </div>
            <div 
              className="absolute right-1/4 top-20 w-64 h-40 bg-white rounded-2xl border-2 border-pink-200 shadow-2xl shadow-pink-200/50 hover:shadow-pink-300/60 transition-all duration-500 cursor-pointer group"
              style={{ 
                transform: mounted 
                  ? `translateY(${Math.sin(scrollY * 0.01 + 2) * 15}px) rotateZ(${5 - scrollY * 0.02}deg) scale(${1 + Math.cos(scrollY * 0.005) * 0.05})`
                  : 'translateY(0)',
                transition: 'transform 0.3s ease-out, box-shadow 0.3s ease'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-red-500/0 group-hover:from-pink-500/5 group-hover:to-red-500/5 rounded-2xl transition-all duration-300" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={(el) => { sectionRefs.current['stats'] = el; }}
        className="relative py-20 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`text-center transform transition-all duration-700 hover:scale-110 ${
                  visibleSections.has('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="relative group cursor-default">
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </div>
                <div className="text-slate-600 font-semibold group-hover:text-slate-900 transition-colors">{stat.label}</div>
                <div className="mt-2 h-1 w-0 group-hover:w-full mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section 
        ref={(el) => { sectionRefs.current['showcase'] = el; }}
        className="relative py-32 px-6 bg-gradient-to-b from-white to-slate-50"
      >
        <div className="max-w-7xl mx-auto">
          <div 
            className={`text-center mb-20 transition-all duration-1000 ${
              visibleSections.has('showcase') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              Build Anything You Imagine
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From portfolios to e-commerce stores, create stunning websites with our powerful builder
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Showcase Card 1 */}
            <div 
              className={`group relative transition-all duration-1000 ${
                visibleSections.has('showcase') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border-2 border-slate-200 hover:border-purple-300 transition-all duration-500 overflow-hidden group-hover:shadow-purple-200/50">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      🎨
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">50+ Templates</h3>
                  </div>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Choose from our extensive collection of professionally designed templates for any industry or purpose.
                  </p>

                  {/* Mini template preview cards */}
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <div 
                        key={i}
                        className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg border border-slate-300 group-hover:scale-105 transition-transform duration-500 shadow-sm"
                        style={{ transitionDelay: `${i * 100}ms` }}
                      >
                        <div className="p-2 space-y-1">
                          <div className="h-1 bg-slate-300 rounded w-3/4" />
                          <div className="h-1 bg-slate-300 rounded w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Showcase Card 2 */}
            <div 
              className={`group relative transition-all duration-1000 ${
                visibleSections.has('showcase') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border-2 border-slate-200 hover:border-blue-300 transition-all duration-500 overflow-hidden group-hover:shadow-blue-200/50">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      ⚡
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">Live Editing</h3>
                  </div>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Edit your website in real-time with our intuitive visual editor. See changes instantly as you type.
                  </p>

                  {/* Animated editing preview */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 border border-slate-300">
                    <div className="space-y-2">
                      <div className="h-2 bg-slate-300 rounded w-full group-hover:bg-blue-400 transition-colors duration-500" />
                      <div className="h-2 bg-slate-300 rounded w-5/6 group-hover:bg-blue-400 transition-colors duration-500 delay-100" />
                      <div className="h-2 bg-slate-300 rounded w-4/6 group-hover:bg-blue-400 transition-colors duration-500 delay-200" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Showcase Card 3 */}
            <div 
              className={`group relative transition-all duration-1000 ${
                visibleSections.has('showcase') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border-2 border-slate-200 hover:border-orange-300 transition-all duration-500 overflow-hidden group-hover:shadow-orange-200/50">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      🚀
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">One-Click Deploy</h3>
                  </div>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Publish your website instantly with shareable links. Export as HTML or deploy to your domain.
                  </p>

                  {/* Deploy animation */}
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg border-2 border-orange-300 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <span className="text-2xl">📄</span>
                    </div>
                    <div className="flex-1 h-1 bg-gradient-to-r from-orange-300 to-red-300 rounded-full group-hover:animate-pulse" />
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-lg border-2 border-orange-300 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <span className="text-2xl">🌐</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Showcase Card 4 */}
            <div 
              className={`group relative transition-all duration-1000 ${
                visibleSections.has('showcase') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl border-2 border-slate-200 hover:border-green-300 transition-all duration-500 overflow-hidden group-hover:shadow-green-200/50">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      🤖
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">AI-Powered</h3>
                  </div>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    Generate professional content with AI. Get suggestions, optimize SEO, and create engaging copy.
                  </p>

                  {/* AI sparkle effect */}
                  <div className="relative h-20 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 rounded-lg blur-xl group-hover:animate-pulse" />
                    <div className="relative text-4xl animate-pulse">✨</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={(el) => { sectionRefs.current['features'] = el; }}
        className="relative py-20 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div 
            className={`text-center mb-16 transition-all duration-1000 ${
              visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 relative inline-block">
              Everything You Need
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-600 to-transparent" />
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Powerful features to help you create the perfect website
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl p-8 border-2 border-slate-200 hover:border-purple-300 transition-all duration-700 hover:shadow-2xl shadow-lg cursor-pointer ${
                  visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  transform: visibleSections.has('features') ? 'perspective(1000px) rotateX(0deg)' : 'perspective(1000px) rotateX(10deg)'
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 20;
                  const rotateY = (centerX - x) / 20;
                  e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-3xl mb-6 transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-md group-hover:shadow-xl`}>
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                    {feature.description}
                  </p>

                  {/* Animated corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-br ${feature.gradient} opacity-10 rounded-bl-full`} />
                  </div>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section 
        ref={(el) => { sectionRefs.current['cta'] = el; }}
        className="relative py-32 px-6"
      >
        <div className="max-w-5xl mx-auto text-center">
          <div 
            className={`relative bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-12 md:p-20 border-2 border-purple-200 overflow-hidden shadow-2xl transition-all duration-1000 ${
              visibleSections.has('cta') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-10 left-10 w-20 h-20 bg-purple-300/30 rounded-full blur-xl animate-float" />
              <div className="absolute top-20 right-20 w-32 h-32 bg-pink-300/30 rounded-full blur-xl animate-float-delayed" />
              <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-blue-300/30 rounded-full blur-xl animate-float-slow" />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-50" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 animate-fade-in-up">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-slate-700 mb-10 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                Join thousands of creators building amazing websites with our platform
              </p>
              
              <button
                onClick={() => router.push('/signup')}
                className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-xl font-bold overflow-hidden transition-all hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/40 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: '400ms' }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started Free
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t-2 border-slate-200 bg-white/50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              S
            </div>
            <span className="text-slate-900 font-bold text-lg">Squpage</span>
          </div>
          <p className="text-slate-600">
            © 2025 Squpage. All rights reserved.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(20px);
          }
          75% {
            transform: translateY(-15px) translateX(5px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          25% {
            transform: translateY(15px) translateX(-10px);
          }
          50% {
            transform: translateY(25px) translateX(-20px);
          }
          75% {
            transform: translateY(10px) translateX(-5px);
          }
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-30px) scale(1.1);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
          opacity: 0;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #9333ea, #ec4899);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7e22ce, #db2777);
        }
      `}</style>
    </div>
  );
}