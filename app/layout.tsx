import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { MuiThemeProvider } from "@/components/providers/mui-theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Squpage - Create Beautiful Websites",
  description: "Professional website builder with modern templates and AI-powered content generation",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MuiThemeProvider>
          {children}
        </MuiThemeProvider>
      </body>
    </html>
  )
}
