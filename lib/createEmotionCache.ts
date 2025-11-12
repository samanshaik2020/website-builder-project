import createCache from '@emotion/cache';

// Create emotion cache for MUI styles
// Simplified version without insertion point for Next.js App Router compatibility
export default function createEmotionCache() {
  return createCache({ 
    key: 'mui',
    prepend: true, // Ensures MUI styles are prepended to <head>
  });
}
