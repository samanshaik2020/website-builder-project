# Shareable Link Expiry Fix ✅

## Issue
Unlimited plan users were seeing "Links expire after 7 days" in the Create Shareable Link dialog, even though unlimited plan should have no expiry.

## Root Cause
The `ShareLinkDialog` component was only reading the user's plan from **localStorage** (`useSubscription` hook) instead of the actual plan stored in the **database** (`profile.plan` from `useAuth` context).

When users upgrade their plan through the payment system, the plan is updated in the database but may not immediately sync to localStorage, causing a mismatch.

## Solution Applied

### File: `components/share-link-dialog.tsx`

**Changes:**
1. Added `useAuth` import to access the user's database profile
2. Updated plan retrieval logic to prioritize database plan over localStorage:
   ```typescript
   // Before
   const { subscription } = useSubscription()
   const maxLinks = getMaxShareableLinks(subscription.plan)
   const expiryDays = getShareableLinkExpiry(subscription.plan)
   const canCreate = canCreateShareableLink(subscription.plan, activeLinksCount)
   
   // After
   const { subscription } = useSubscription()
   const { profile } = useAuth()
   const userPlan = profile?.plan || subscription.plan
   const maxLinks = getMaxShareableLinks(userPlan)
   const expiryDays = getShareableLinkExpiry(userPlan)
   const canCreate = canCreateShareableLink(userPlan, activeLinksCount)
   ```

## Expected Behavior After Fix

### For Unlimited Plan Users:
- **Dialog Description**: "Generate a custom URL to share your project. Links never expire."
- **Link Expiry Field**: Shows "Never"
- **Active Links Field**: Shows "X / ∞"

### For Other Plans:
- **Free Plan**: "Links expire after 7 days" + "1 active link"
- **Starter Plan**: "Links expire after 30 days" + "3 active links"
- **Professional Plan**: "Links expire after 30 days" + "10 active links"

## Plan Configuration Reference

From `lib/pricing-plans.ts`:

| Plan | Link Expiry | Max Active Links |
|------|-------------|------------------|
| Free | 7 days | 1 |
| Starter | 30 days | 3 |
| Professional | 30 days | 10 |
| Unlimited | Never (null) | Unlimited |

## Testing Steps

1. ✅ Log in as a user with Unlimited plan
2. ✅ Open dashboard and click "Share" on any project
3. ✅ Verify dialog shows "Links never expire."
4. ✅ Verify "Link Expiry" field shows "Never"
5. ✅ Verify "Active Links" shows "X / ∞"
6. ✅ Create a link and verify it has no expiration date in database

## Related Files
- `components/share-link-dialog.tsx` - Dialog component (FIXED)
- `lib/pricing-plans.ts` - Plan configurations
- `hooks/use-subscription.ts` - localStorage subscription hook
- `contexts/auth-context.tsx` - Database profile context
- `lib/supabase/shareable-links.ts` - Link creation logic

## Status
✅ **FIXED** - Unlimited plan users will now see correct "never expire" messaging

**Date**: October 17, 2025
