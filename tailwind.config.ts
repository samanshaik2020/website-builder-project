import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        float: {
          '0%, 100%': { 
            transform: 'translateY(0px) rotate(0deg)', 
            opacity: '0.4' 
          },
          '50%': { 
            transform: 'translateY(-20px) rotate(180deg)', 
            opacity: '0.8' 
          },
        },
        orbit: {
          '0%': { 
            transform: 'translate(-50%, -50%) rotate(0deg) translateX(40px) rotate(0deg)' 
          },
          '100%': { 
            transform: 'translate(-50%, -50%) rotate(360deg) translateX(40px) rotate(-360deg)' 
          },
        },
        shine: {
          '0%': { 
            transform: 'translateX(-100%)' 
          },
          '50%': { 
            transform: 'translateX(100%)' 
          },
          '100%': { 
            transform: 'translateX(100%)' 
          },
        },
        gradient: {
          '0%, 100%': {
            'background-position': '0% 50%'
          },
          '50%': {
            'background-position': '100% 50%'
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'scale-in': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          },
        },
        'bounce-slow': {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)'
          },
        },
        'morph': {
          '0%, 100%': {
            'border-radius': '60% 40% 30% 70% / 60% 30% 70% 40%',
            transform: 'rotate(0deg) scale(1)',
          },
          '50%': {
            'border-radius': '30% 60% 70% 40% / 50% 60% 30% 60%',
            transform: 'rotate(180deg) scale(1.05)',
          },
        },
        'float-3d': {
          '0%, 100%': {
            transform: 'translateY(0px) translateZ(0px) rotateX(0deg)',
          },
          '50%': {
            transform: 'translateY(-20px) translateZ(50px) rotateX(5deg)',
          },
        },
        'slide-in-left': {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        'slide-in-right': {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        'glow': {
          '0%, 100%': {
            'box-shadow': '0 0 20px rgba(59, 130, 246, 0.5)',
          },
          '50%': {
            'box-shadow': '0 0 40px rgba(147, 51, 234, 0.8)',
          },
        },
        'text-shimmer': {
          '0%': {
            'background-position': '0% 50%',
          },
          '100%': {
            'background-position': '200% 50%',
          },
        },
        'rotate-3d': {
          '0%': {
            transform: 'perspective(1000px) rotateY(0deg)',
          },
          '100%': {
            transform: 'perspective(1000px) rotateY(360deg)',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            opacity: '1',
            filter: 'brightness(1)',
          },
          '50%': {
            opacity: '0.8',
            filter: 'brightness(1.2)',
          },
        },
        'blob': {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'orbit': 'orbit 3s linear infinite',
        'shine': 'shine 2s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'scale-in': 'scale-in 0.6s ease-out',
        'bounce-slow': 'bounce-slow 3s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'float-3d': 'float-3d 4s ease-in-out infinite',
        'slide-in-left': 'slide-in-left 0.8s ease-out',
        'slide-in-right': 'slide-in-right 0.8s ease-out',
        'glow': 'glow 3s ease-in-out infinite',
        'text-shimmer': 'text-shimmer 3s linear infinite',
        'rotate-3d': 'rotate-3d 20s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'blob': 'blob 7s ease-in-out infinite',
      },
      backgroundSize: {
        '300%': '300% 300%',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config