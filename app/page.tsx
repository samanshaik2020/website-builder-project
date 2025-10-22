'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        />
        <div 
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${-scrollY * 0.2}px)` }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translate(-50%, -50%) translateY(${scrollY * 0.15}px)` }}
        />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-slate-900/80 backdrop-blur-xl border-b border-white/10' : ''}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <span className="text-white font-bold text-xl">Squpage</span>
          </div>
          <button
            onClick={() => router.push('/signin')}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all border border-white/20 hover:border-white/40"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-7xl mx-auto text-center">
          <div 
            className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full border border-purple-500/30">
              <span className="text-purple-300 font-medium">✨ Build Your Dream Website Today</span>
            </div>
          </div>

          <h1 
            className={`text-6xl md:text-8xl font-bold text-white mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ 
              transitionDelay: '200ms',
              background: 'linear-gradient(to right, #fff, #e0e7ff, #fff)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shimmer 3s linear infinite'
            }}
          >
            Create Stunning
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Websites
            </span>
          </h1>

          <p 
            className={`text-xl md:text-2xl text-slate-300 mb-4 max-w-3xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '300ms' }}
          >
            Build professional websites in minutes with our intuitive drag-and-drop builder
          </p>

          <p 
            className={`text-lg text-slate-400 mb-12 max-w-2xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '400ms' }}
          >
            No coding required. Choose from beautiful templates, customize with live editing, and publish instantly.
          </p>

          <div 
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ transitionDelay: '500ms' }}
          >
            <button
              onClick={() => router.push('/signup')}
              className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-lg font-semibold overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
            >
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button
              onClick={() => router.push('/signin')}
              className="px-10 py-5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-lg font-semibold transition-all border border-white/20 hover:border-white/40 hover:scale-105"
            >
              Sign In
            </button>
          </div>

          {/* Floating Cards Animation */}
          <div className="relative h-64 mb-20">
            <div 
              className="absolute left-1/2 top-0 -translate-x-1/2 w-80 h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl"
              style={{ 
                transform: `translateX(-50%) translateY(${Math.sin(scrollY * 0.01) * 20}px) rotateX(${scrollY * 0.05}deg)`,
                transition: 'transform 0.3s ease-out'
              }}
            >
              <div className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg mb-4" />
                <div className="h-3 bg-white/20 rounded mb-2 w-3/4" />
                <div className="h-3 bg-white/10 rounded w-1/2" />
              </div>
            </div>
            <div 
              className="absolute left-1/4 top-20 w-64 h-40 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl"
              style={{ 
                transform: `translateY(${Math.sin(scrollY * 0.01 + 1) * 15}px) rotateZ(${-5 + scrollY * 0.02}deg)`,
                transition: 'transform 0.3s ease-out'
              }}
            />
            <div 
              className="absolute right-1/4 top-20 w-64 h-40 bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl"
              style={{ 
                transform: `translateY(${Math.sin(scrollY * 0.01 + 2) * 15}px) rotateZ(${5 - scrollY * 0.02}deg)`,
                transition: 'transform 0.3s ease-out'
              }}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center transform hover:scale-110 transition-all duration-300"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Powerful features to help you create the perfect website
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl"
                style={{
                  animation: `fadeInUp 0.8s ease-out ${index * 0.1}s both`
                }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-3xl mb-6 transform group-hover:rotate-12 transition-transform duration-500`}>
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="relative bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-2xl rounded-3xl p-12 md:p-20 border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10" />
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                Join thousands of creators building amazing websites with our platform
              </p>
              
              <button
                onClick={() => router.push('/signup')}
                className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl text-xl font-bold overflow-hidden transition-all hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50"
              >
                <span className="relative z-10">Get Started Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="text-white font-bold text-lg">Squpage</span>
          </div>
          <p className="text-slate-400">
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
      `}</style>
    </div>
  );
}