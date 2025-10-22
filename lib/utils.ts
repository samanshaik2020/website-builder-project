import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false
  
  const userAgent = navigator.userAgent || navigator.vendor || (window as Window & { opera?: string }).opera || ''
  
  // Check for mobile devices
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
  
  // Also check screen width as a fallback
  const isMobileWidth = window.innerWidth <= 768
  
  return mobileRegex.test(userAgent) || isMobileWidth
}
