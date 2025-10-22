/**
 * @deprecated This file is deprecated and kept only for backward compatibility.
 * Please use the new Supabase auth service instead:
 * 
 * import { getCurrentUser, signIn, signUp, signOut } from '@/lib/services/auth-service'
 * 
 * All authentication is now handled through Supabase with proper security,
 * session management, and OAuth support.
 */

// Re-export from new auth service for backward compatibility
export { getCurrentUser, signOut } from '@/lib/services/auth-service';

// Legacy types (kept for compatibility)
export interface User {
  fullName?: string;
  email: string;
  loggedIn?: boolean;
}

/**
 * @deprecated Use getCurrentUser() from @/lib/services/auth-service instead
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const { getCurrentUser } = await import('@/lib/services/auth-service');
  const user = await getCurrentUser();
  return user !== null;
};

/**
 * @deprecated Authentication is now handled by middleware
 */
export const requireAuth = (redirectTo: string = '/signin') => {
  console.warn('requireAuth is deprecated. Authentication is now handled by middleware.');
  if (typeof window === 'undefined') return;
  
  // Redirect is now handled by middleware
  window.location.href = redirectTo;
};
