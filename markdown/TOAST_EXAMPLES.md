# Toast Notification Examples

## Visual Preview

### ✅ Success Toasts (Green)

```
┌─────────────────────────────────────────────┐
│ ✓ Saved & Published!                        │
│ Your project has been saved successfully.   │
│ Check the Dashboard to see it.              │
└─────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────┐
│ ✓ Successfully upgraded to PROFESSIONAL!    │
│ Your plan has been updated.                 │
│ Enjoy your new features!                    │
└─────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────┐
│ ✓ Export Successful!                        │
│ My Website has been exported as HTML.       │
└─────────────────────────────────────────────┘
```

### ❌ Error Toasts (Red)

```
┌─────────────────────────────────────────────┐
│ ✗ Pro Template Limit Reached                │
│ You've reached your limit of 3 pro          │
│ templates. Upgrade your plan to create more.│
└─────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────┐
│ ✗ Export Feature Locked                     │
│ Export is only available on Professional    │
│ and Unlimited plans. Upgrade to export.     │
└─────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────┐
│ ✗ Template Limit Reached                    │
│ You've reached your limit of 2 normal       │
│ templates. Upgrade your plan to create more.│
└─────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────┐
│ ✗ AI Generation Failed                      │
│ Failed to generate content.                 │
│ Please try again.                           │
└─────────────────────────────────────────────┘
```

## All Toast Locations

### 1. Pricing Page (`/pricing`)
- **Trigger**: Click "Upgrade to [Plan]" button
- **Toast**: Success - Plan upgraded
- **Action**: Redirects to dashboard after 1 second

### 2. Editor Page (`/editor`)

#### Template Selection
- **Trigger**: Try to create template beyond limit
- **Toast**: Error - Template limit reached
- **Action**: Redirects to pricing after 1.5 seconds

#### AI Generation
- **Trigger**: AI content generation fails
- **Toast**: Error - AI generation failed
- **Action**: Returns to template selection

#### Save Project
- **Trigger**: Click "Save & Publish" button
- **Toast**: Success - Project saved OR Error - Save failed
- **Action**: None (stays on editor)

### 3. Dashboard Page (`/dashboard`)

#### Export Project
- **Trigger**: Click "Export" button
- **Toast**: 
  - Error - Export locked (if on Free/Starter)
  - Success - Export completed (if on Pro/Unlimited)
- **Action**: Redirects to pricing if locked

## Toast Configuration

```typescript
// Success Toast
toast.success("Title", {
  description: "Description text",
  duration: 4000, // 4 seconds
})

// Error Toast
toast.error("Title", {
  description: "Description text",
  duration: 5000, // 5 seconds
})
```

## Customization Options

The Toaster component is configured with:
- **Position**: `top-center` - Appears at top center of screen
- **Rich Colors**: `true` - Enables colored backgrounds
- **Auto-dismiss**: Toasts disappear after duration
- **Responsive**: Works on all screen sizes

## User Flow Examples

### Example 1: Free User Tries to Export
1. User clicks "Export" on a project
2. 🔴 Error toast appears: "Export Feature Locked"
3. After 1.5 seconds, redirects to `/pricing`
4. User sees pricing plans and can upgrade

### Example 2: User Upgrades Plan
1. User on `/pricing` page
2. Clicks "Upgrade to Professional Plan"
3. 🟢 Success toast appears: "Successfully upgraded to PROFESSIONAL!"
4. After 1 second, redirects to `/dashboard`
5. Dashboard shows new plan limits

### Example 3: User Saves Project
1. User editing a template
2. Clicks "Save & Publish"
3. Button shows "Saving..." with spinner
4. 🟢 Success toast appears: "Saved & Published!"
5. User can continue editing or go to dashboard

### Example 4: User Hits Template Limit
1. Free user tries to create 3rd normal template
2. 🔴 Error toast appears: "Template Limit Reached"
3. Toast shows: "You've reached your limit of 2 normal templates"
4. After 1.5 seconds, redirects to `/pricing`
5. User can upgrade to create more

## Benefits

✅ **Non-intrusive** - Doesn't block the UI
✅ **Informative** - Shows title + description
✅ **Beautiful** - Modern design with colors
✅ **Responsive** - Works on mobile & desktop
✅ **Accessible** - Screen reader friendly
✅ **Stackable** - Multiple toasts can appear
✅ **Auto-dismiss** - No manual closing needed
✅ **Smooth animations** - Slide in/out effects

## No More Ugly Browser Alerts! 🎉

All notifications now use beautiful, modern toast messages instead of browser's default alert boxes.
