# Testing Checklist

## Pre-Test Setup

- [x] Package installed: `@google/generative-ai`
- [ ] `.env.local` created with API key
- [ ] Development server running (`npm run dev`)

## Test 1: Basic AI Generation

1. [ ] Open `http://localhost:3000`
2. [ ] Click on "SaaS Pro" template card
3. [ ] Verify AI Generation Modal opens
4. [ ] Enter topic: **"An innovative iPhone repair service offering same-day repairs"**
5. [ ] Select theme: **"Vibrant & Playful"**
6. [ ] Click "✨ Generate My Website"
7. [ ] Wait for loading animation (shows: "Analyzing your topic...", "Generating creative content...", etc.)
8. [ ] Verify modal closes after ~5-10 seconds
9. [ ] Verify complete page appears with generated content

### Expected Results:
- ✅ Brand name appears (e.g., "iFixFast", "QuickRepair", etc.)
- ✅ Hero headline is relevant to iPhone repair
- ✅ Features mention repair-related services
- ✅ Testimonials sound like real customer reviews
- ✅ Pricing tiers have appropriate names and prices
- ✅ Tone is fun and energetic (Vibrant & Playful theme)

## Test 2: Different Topic & Theme

1. [ ] Refresh page or click back to template selection
2. [ ] Click "SaaS Pro" again
3. [ ] Enter topic: **"A fitness app that helps users track workouts and nutrition"**
4. [ ] Select theme: **"Modern & Minimal"**
5. [ ] Generate

### Expected Results:
- ✅ Brand name is fitness-related
- ✅ Professional, clean tone (not playful)
- ✅ Features mention workouts, tracking, nutrition
- ✅ Content is different from Test 1

## Test 3: Content Editing

1. [ ] After generation, click on the hero headline
2. [ ] Verify floating text toolbar appears
3. [ ] Make text bold
4. [ ] Edit the text
5. [ ] Click on a feature title
6. [ ] Verify you can edit it
7. [ ] Click on a testimonial
8. [ ] Verify it's editable

### Expected Results:
- ✅ All generated text is editable
- ✅ Floating toolbar works on all elements
- ✅ Changes are saved in real-time

## Test 4: Preview Mode

1. [ ] Click "Preview" button in header
2. [ ] Verify page displays full-width
3. [ ] Verify no floating toolbar appears
4. [ ] Click "Exit Preview"
5. [ ] Verify editor mode returns

## Test 5: Save & Publish

1. [ ] Click "Save & Publish" button
2. [ ] Wait for success message
3. [ ] Navigate to Dashboard
4. [ ] Verify project appears in project list
5. [ ] Project name matches the generated brand or hero headline

## Test 6: Theme Variations

Test all 6 themes with the same topic to verify tone differences:

Topic: **"A project management tool for creative teams"**

### Themes to Test:
- [ ] **Modern & Minimal** → Should be professional, concise
- [ ] **Vibrant & Playful** → Should be fun, energetic
- [ ] **Corporate & Blue** → Should be trustworthy, formal
- [ ] **Elegant & Dark** → Should be sophisticated, premium
- [ ] **Creative & Bold** → Should be innovative, daring
- [ ] **Nature & Calm** → Should be peaceful, organic

## Test 7: Cancel Flow

1. [ ] Click "SaaS Pro"
2. [ ] Click "Cancel" in AI modal
3. [ ] Verify template selection modal reopens
4. [ ] Select a free template (e.g., "Portfolio")
5. [ ] Verify it loads immediately without AI modal

## Test 8: Error Handling

### Test Invalid API Key:
1. [ ] Temporarily change API key in `lib/gemini-api.ts` to "invalid-key"
2. [ ] Try to generate
3. [ ] Verify error message appears
4. [ ] Change API key back
5. [ ] Verify generation works again

### Test Network Error:
1. [ ] Turn off internet
2. [ ] Try to generate
3. [ ] Verify appropriate error message
4. [ ] Turn internet back on

## Browser Compatibility

Test in multiple browsers:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## Performance Checks

- [ ] Modal opens instantly (<100ms)
- [ ] Theme selection is responsive
- [ ] Content population is smooth (no flickering)
- [ ] Page remains responsive during generation
- [ ] No console errors

## Console Checks

Open browser console (F12) and verify:
- [ ] No errors during modal open
- [ ] "AI content generated and populated successfully!" message appears after generation
- [ ] No errors during content population

## Production Readiness

Before deploying to production:
- [ ] Move API key to environment variable
- [ ] Create server-side API route for Gemini calls
- [ ] Add rate limiting
- [ ] Add error tracking
- [ ] Test with real users

---

## Common Issues & Solutions

### Modal doesn't open
- Check console for errors
- Verify imports in `page.tsx`
- Ensure `aiModalOpen` state is managed correctly

### Content doesn't populate
- Check if template rendered (wait 500ms)
- Verify element IDs match between template and API mapping
- Check browser console for DOM errors

### API errors
- Verify API key is correct
- Check internet connection
- Ensure Gemini API quota hasn't been exceeded
- Check browser network tab for API call status

### Themes don't affect content
- Verify theme object is passed to `generateSaaSProContent`
- Check Gemini API prompt includes theme tone
- Review generated JSON in console

---

## Success Criteria

All tests pass ✅ when:
- AI modal opens for Pro templates
- Content generates in <15 seconds
- All 70+ elements are populated
- Content is relevant to topic
- Tone matches selected theme
- Generated content is editable
- No console errors
- Save & Publish works correctly

**Ready to test? Start with Test 1 and work through the list!** 🚀
