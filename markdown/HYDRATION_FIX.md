# Hydration Error Fix

## Problem
React hydration errors were occurring due to `Math.random()` being called during component render, causing different HTML on server vs client.

## Root Causes
Multiple components were causing hydration mismatches:

### 1. Math.random() Issues
Three components were using `Math.random()` during render:
- **FloatingParticles** - Random particle positions
- **LoadingSpinner** - Random particle animations  
- **MeditationAppTemplate** - Random star positions

When Next.js server-renders these components, `Math.random()` generates one set of values. When the client hydrates, it generates different values, causing a mismatch.

### 2. MUI Emotion Cache Issue
The **MuiThemeProvider** was creating an Emotion cache at module level, causing the cache to be created during SSR but with different state on the client, leading to style hydration mismatches.

## Solution
Moved all `Math.random()` calls into `useEffect` hooks that only run on the client:

### 1. FloatingParticles Component
```tsx
// Added mounted state and moved random generation to useEffect
const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
  // Generate particles on client only
  const initialParticles = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * window.innerWidth,
    // ... other random values
  }))
  setParticles(initialParticles)
}, [])

// Don't render particles until mounted
if (!mounted) {
  return <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />
}
```

### 2. LoadingSpinner Component
```tsx
// Added mounted state and particle styles state
const [mounted, setMounted] = useState(false)
const [particleStyles, setParticleStyles] = useState([])

useEffect(() => {
  setMounted(true)
  // Generate particle positions on client only
  const styles = Array.from({ length: 8 }, () => ({
    left: `${20 + Math.random() * 60}%`,
    // ... other random values
  }))
  setParticleStyles(styles)
}, [])

// Conditionally render particles
{mounted && (
  <div className="absolute inset-0 overflow-hidden rounded-full">
    {particleStyles.map((style, i) => (
      <div key={i} style={style} />
    ))}
  </div>
)}
```

### 3. MeditationAppTemplate Component
```tsx
// Added mounted state and star styles state
const [mounted, setMounted] = useState(false)
const [starStyles, setStarStyles] = useState([])

useEffect(() => {
  setMounted(true)
  // Generate star positions on client only
  const styles = Array.from({ length: 50 }, () => ({
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    animation: `twinkle ${2 + Math.random() * 3}s infinite`
  }))
  setStarStyles(styles)
}, [])

// Conditionally render stars
{mounted && (
  <div className="absolute inset-0 opacity-30">
    {starStyles.map((style, i) => (
      <div key={i} style={style} />
    ))}
  </div>
)}
```

### 4. MuiThemeProvider Component (Updated Fix)
```tsx
// Created NextAppDirEmotionCacheProvider to properly handle Emotion cache in Next.js App Router
// This prevents hydration mismatches from MUI's CssBaseline and emotion styles
import NextAppDirEmotionCacheProvider from './emotion-cache-provider';

export function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
```

**New File Created:** `components/providers/emotion-cache-provider.tsx`
- Uses `useServerInsertedHTML` hook from Next.js to inject emotion styles during SSR
- Properly syncs emotion cache between server and client
- Prevents style hydration mismatches from MUI components

### 5. Root Layout
```tsx
// Added suppressHydrationWarning to body tag for MUI CssBaseline
<html lang="en" suppressHydrationWarning>
  <body className={inter.className} suppressHydrationWarning>
    <MuiThemeProvider>
      {children}
    </MuiThemeProvider>
  </body>
</html>
```

## Files Modified
1. `components/ui/floating-particles.tsx`
2. `components/ui/loading-spinner.tsx`
3. `components/templates/meditation-app/default.tsx`
4. `components/providers/mui-theme-provider.tsx`
5. `components/providers/emotion-cache-provider.tsx` (NEW)
6. `app/layout.tsx`

## Key Principles
- **Never use `Math.random()`, `Date.now()`, or `window` during render**
- **Always use `useEffect` for client-only code**
- **Use mounted state to prevent rendering dynamic content on server**
- **Return placeholder/empty div during SSR, render full content after mount**
- **For MUI with Next.js App Router: Use NextAppDirEmotionCacheProvider to properly sync emotion styles**
- **Wrap emotion cache provider around ThemeProvider to prevent style hydration mismatches**
- **Add `suppressHydrationWarning` to html and body tags when using MUI CssBaseline**

## Testing
After these changes:
- ✅ No hydration errors in console
- ✅ Server and client HTML match
- ✅ Animations work correctly after client mount
- ✅ No visual flicker or layout shift

## Related Documentation
- [React Hydration Docs](https://react.dev/link/hydration-mismatch)
- [Next.js SSR Best Practices](https://nextjs.org/docs/messages/react-hydration-error)
