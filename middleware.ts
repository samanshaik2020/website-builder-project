import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          req.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          req.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Get the session
  const { data: { session } } = await supabase.auth.getSession()
  
  // Check authentication for protected routes
  const protectedRoutes = ['/dashboard', '/editor']
  const authRoutes = ['/signin', '/signup']
  const path = req.nextUrl.pathname
  
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
  const isAuthRoute = authRoutes.some(route => path.startsWith(route))
  
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/signin', req.url)
    redirectUrl.searchParams.set('redirectTo', path)
    return NextResponse.redirect(redirectUrl)
  }
  
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return response
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/editor/:path*',
    '/signin',
    '/signup',
  ],
}
