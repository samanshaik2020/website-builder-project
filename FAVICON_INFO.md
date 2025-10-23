# Favicon Documentation

## Favicon Files Created

The project now has a complete favicon setup with multiple formats for maximum browser compatibility.

### Files Created

1. **`app/icon.svg`** - Next.js 13+ convention for favicon
   - Automatically detected by Next.js
   - Used as the default favicon
   - 100x100 viewBox with rounded corners

2. **`public/favicon.svg`** - Public folder fallback
   - Accessible at `/favicon.svg`
   - Same design as app/icon.svg
   - For legacy browser support

3. **`app/apple-icon.svg`** - Apple Touch Icon
   - 180x180 viewBox (Apple's recommended size)
   - Used for iOS home screen icons
   - Larger rounded corners for better appearance

### Design Details

**Colors:**
- Purple gradient: `#8b5cf6` (Violet 500)
- Pink gradient: `#ec4899` (Pink 500)
- Diagonal gradient from top-left to bottom-right

**Elements:**
- Rounded rectangle background (rx="20" for 100x100, rx="40" for 180x180)
- White "S" letter (for Squpage)
- Bold, centered text
- Modern, clean design matching the brand

### Browser Support

✅ **Modern Browsers** (Chrome, Firefox, Safari, Edge)
- Uses `app/icon.svg` automatically via Next.js

✅ **iOS/Safari**
- Uses `app/apple-icon.svg` for home screen icons

✅ **Legacy Browsers**
- Falls back to `public/favicon.svg`

### Metadata Configuration

The favicon is configured in `app/layout.tsx`:

```typescript
export const metadata: Metadata = {
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-icon.svg', type: 'image/svg+xml' },
    ],
  },
}
```

### How It Works

**Next.js 13+ App Router:**
- Automatically detects `app/icon.svg` and serves it as favicon
- No manual `<link>` tags needed in HTML
- Supports multiple formats (SVG, PNG, ICO)

**File-based Icons:**
- Place icons in `app/` directory with specific names
- Next.js generates appropriate `<link>` tags automatically
- Supports: `icon`, `apple-icon`, `favicon`

### Testing

To verify the favicon is working:

1. **Development Server:**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000 and check the browser tab

2. **Production Build:**
   ```bash
   npm run build
   npm start
   ```

3. **Check Browser DevTools:**
   - Open DevTools (F12)
   - Go to Network tab
   - Filter by "favicon"
   - Should see successful requests (200 status)

### Customization

To customize the favicon:

1. **Change Colors:**
   Edit the gradient stops in the SVG files:
   ```svg
   <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
   <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
   ```

2. **Change Letter:**
   Edit the text element:
   ```svg
   <text x="50" y="70" ...>S</text>
   ```

3. **Change Shape:**
   Modify the `rx` attribute for corner radius:
   ```svg
   <rect width="100" height="100" rx="20" fill="url(#grad)"/>
   ```

### Additional Formats (Optional)

If you need PNG or ICO formats for older browsers:

1. **Generate PNG from SVG:**
   - Use online tools like CloudConvert or SVGOMG
   - Export at 32x32, 64x64, 128x128, 256x256 sizes

2. **Generate ICO:**
   - Use tools like favicon.io or RealFaviconGenerator
   - Include multiple sizes in one ICO file

3. **Add to project:**
   - Place in `public/` folder
   - Update `app/layout.tsx` metadata

### Resources

- [Next.js Metadata Files](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons)
- [MDN: Favicon](https://developer.mozilla.org/en-US/docs/Glossary/Favicon)
- [RealFaviconGenerator](https://realfavicongenerator.net/)
