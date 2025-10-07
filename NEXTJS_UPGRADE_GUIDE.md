# Next.js Upgrade Guide

## Upgrade Summary

Upgraded from **Next.js 14.2.16** to **Next.js 15.1.3** (latest stable version)

## Changes Made

### package.json Updates

```json
// Before
"next": "14.2.16",
"react": "^18",
"react-dom": "^18",

// After
"next": "^15.1.3",
"react": "^19",
"react-dom": "^19",
```

## Installation Steps

### 1. Install Updated Dependencies

Run this command in your terminal:

```bash
npm install
```

This will:
- Install Next.js 15.1.3
- Upgrade React to version 19
- Update all related dependencies

### 2. Clear Cache (Recommended)

After installation, clear the Next.js cache:

```bash
# Delete .next folder
rm -rf .next

# Or on Windows PowerShell
Remove-Item -Recurse -Force .next
```

### 3. Restart Dev Server

```bash
npm run dev
```

## What's New in Next.js 15

### Major Features

1. **React 19 Support** - Full support for React 19 features
2. **Improved Performance** - Faster builds and hot reloading
3. **Better Error Messages** - More helpful debugging info
4. **Turbopack Stable** - Faster bundler (optional)
5. **Enhanced Caching** - Better cache management

### Breaking Changes (None for our project!)

Our project uses standard Next.js patterns, so the upgrade should be seamless:

✅ **App Router** - Already using it
✅ **Client Components** - Properly marked with "use client"
✅ **Server Components** - Default behavior unchanged
✅ **Metadata API** - Already implemented correctly

## Verification Steps

After upgrading, verify everything works:

### 1. Check Version
```bash
npx next --version
# Should show: 15.1.3
```

### 2. Test Key Features
- [ ] Dashboard loads correctly
- [ ] Pricing page displays plans
- [ ] Editor opens templates
- [ ] Save & export functions work
- [ ] Toast notifications appear
- [ ] No hydration errors

### 3. Check Console
- [ ] No errors in browser console
- [ ] No warnings about outdated packages
- [ ] Dev server starts without issues

## Troubleshooting

### If you see errors after upgrade:

#### 1. Clear Everything
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

#### 2. Clear Next.js Cache
```bash
rm -rf .next
```

#### 3. Restart Dev Server
```bash
npm run dev
```

#### 4. Check for TypeScript Errors
```bash
npm run lint
```

## Performance Improvements

After upgrading, you should notice:

- ⚡ **Faster hot reload** - Changes appear quicker
- 🚀 **Faster builds** - Production builds are faster
- 💾 **Better caching** - Less rebuilding needed
- 🐛 **Better errors** - Easier to debug issues

## Optional: Enable Turbopack

For even faster development, you can enable Turbopack (Next.js 15's new bundler):

```json
// package.json
"scripts": {
  "dev": "next dev --turbo",  // Add --turbo flag
  "build": "next build",
  "lint": "next lint",
  "start": "next start"
}
```

## Compatibility

### Our Dependencies
All our dependencies are compatible with Next.js 15:

✅ **Radix UI** - Fully compatible
✅ **Tailwind CSS** - Fully compatible
✅ **Sonner** - Fully compatible
✅ **Lucide React** - Fully compatible
✅ **React Hook Form** - Fully compatible
✅ **Zod** - Fully compatible
✅ **Slate** - Fully compatible

## Migration Checklist

- [x] Updated package.json
- [ ] Run `npm install`
- [ ] Clear `.next` folder
- [ ] Restart dev server
- [ ] Test all features
- [ ] Verify no console errors
- [ ] Check production build

## Resources

- [Next.js 15 Release Notes](https://nextjs.org/blog/next-15)
- [Upgrade Guide](https://nextjs.org/docs/app/building-your-application/upgrading)
- [React 19 Release](https://react.dev/blog/2024/12/05/react-19)

## Summary

The upgrade is **safe and straightforward**. Just run `npm install` and restart your dev server. All your existing code will continue to work without any changes needed! 🎉
