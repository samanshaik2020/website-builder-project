import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { Toaster } from "sonner"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Squpage - AI Website Builder",
  description: "Transform your ideas into professional websites in minutes with our AI-powered website builder. No coding required.",
  keywords: [
    "AI website builder",
    "website builder",
    "no code website builder",
    "create website online",
    "website maker",
    "AI web design",
    "drag and drop website builder",
    "professional website builder",
    "website templates",
    "landing page builder",
    "business website builder",
    "free website builder",
    "website creator",
    "web design tool",
    "online website builder",
    "website builder for small business",
    "responsive website builder",
    "Squpage",
  ],
  authors: [{ name: "Squpage" }],
  creator: "Squpage",
  publisher: "Squpage",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://squpage.com",
    siteName: "Squpage",
    title: "Squpage - AI Website Builder",
    description: "Transform your ideas into professional websites in minutes with our AI-powered website builder. No coding required.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Squpage - AI Website Builder",
    description: "Transform your ideas into professional websites in minutes with our AI-powered website builder. No coding required.",
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  },
  metadataBase: new URL('https://squpage.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P3G3N93V');`}
        </Script>
      </head>
      <body className={inter.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-P3G3N93V"
            height="0" 
            width="0" 
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XHQHTN4YXR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XHQHTN4YXR');
          `}
        </Script>

        {/* Structured Data for SEO */}
        <Script id="structured-data" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Squpage",
              "applicationCategory": "WebApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "Transform your ideas into professional websites in minutes with our AI-powered website builder. No coding required.",
              "operatingSystem": "Web Browser",
              "url": "https://squpage.com",
              "creator": {
                "@type": "Organization",
                "name": "Squpage"
              }
            }
          `}
        </Script>
        
        <AuthProvider>
          {children}
          <Toaster position="top-center" richColors />
        </AuthProvider>
      </body>
    </html>
  )
}