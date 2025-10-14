# Analytics Tracking Setup

This guide explains how to set up analytics tracking for shared links to track views and button clicks.

## What Was Implemented

### 1. Database Changes
- **New Table**: `button_clicks` - Tracks every button/link click on shared pages
- **New Functions**:
  - `get_user_total_views()` - Returns total views across all user's shareable links
  - `get_user_total_clicks()` - Returns total button clicks across all user's shareable links
  - `track_button_click()` - Records a button click event
  - `increment_link_views()` - Increments view count for a shareable link

### 2. Code Changes
- **New File**: `lib/supabase/analytics.ts` - Analytics API functions
- **Updated**: `app/share/[slug]/page.tsx` - Now tracks button clicks on shared pages
- **Updated**: `app/dashboard/page.tsx` - Displays real analytics data

### 3. Features
- ✅ Automatic view tracking when someone visits a shared link
- ✅ Automatic click tracking for all buttons and links on shared pages
- ✅ Dashboard displays:
  - **Total Views**: Sum of all views across all shareable links
  - **Total Clicks**: Sum of all button clicks on shared pages
  - **Conversion Rate**: Percentage of views that resulted in clicks

## Setup Instructions

### Step 1: Apply Database Migration

You need to run the SQL migration in your Supabase database:

1. Go to your Supabase Dashboard
2. Navigate to **SQL Editor**
3. Open the file: `lib/supabase/migration-analytics.sql`
4. Copy the entire SQL content
5. Paste it into the SQL Editor
6. Click **Run** to execute the migration

### Step 2: Verify Migration

After running the migration, verify that:

1. The `button_clicks` table was created
2. The following functions exist:
   - `get_user_total_views`
   - `get_user_total_clicks`
   - `track_button_click`
   - `increment_link_views`

You can check this in Supabase Dashboard under:
- **Database** → **Tables** (should see `button_clicks`)
- **Database** → **Functions** (should see the 4 functions)

### Step 3: Test the Implementation

1. **Create a shareable link**:
   - Go to your dashboard
   - Click "Share" on any project
   - Generate a shareable link

2. **Test view tracking**:
   - Open the shareable link in a new incognito/private window
   - The view count should increment
   - Check your dashboard - "Total Views" should update

3. **Test click tracking**:
   - On the shared page, click any button or link
   - Check your dashboard - "Total Clicks" should increment
   - The conversion rate should update automatically

## How It Works

### View Tracking
When someone visits a shared link:
1. The `share/[slug]/page.tsx` component loads
2. It calls `incrementLinkViews(linkId)` 
3. The database increments the `views` column in `shareable_links` table
4. Dashboard aggregates all views using `get_user_total_views()`

### Click Tracking
When someone clicks a button on a shared page:
1. A click event listener detects the click
2. It calls `trackButtonClick(linkId, buttonId, text, href)`
3. A new row is inserted into the `button_clicks` table
4. Dashboard aggregates all clicks using `get_user_total_clicks()`

### Conversion Rate
- Calculated as: `(Total Clicks / Total Views) × 100`
- Shows what percentage of visitors clicked on something
- Updates automatically as views and clicks change

## Database Schema

### button_clicks Table
```sql
- id: UUID (primary key)
- shareable_link_id: UUID (foreign key to shareable_links)
- button_id: TEXT (ID of the button clicked)
- button_text: TEXT (text content of the button)
- button_href: TEXT (URL if it's a link)
- clicked_at: TIMESTAMPTZ (when the click happened)
- user_agent: TEXT (browser info)
- ip_address: TEXT (visitor IP - currently null)
```

## Privacy & Security

- All analytics data is tied to shareable links
- Users can only view analytics for their own links (enforced by RLS)
- IP addresses are not currently collected (can be enabled if needed)
- User agents are collected to understand device/browser usage

## Troubleshooting

### Views not incrementing
- Check if the migration was applied correctly
- Verify the `increment_link_views` function exists
- Check browser console for errors

### Clicks not tracking
- Ensure buttons have proper HTML structure (`<a>` or `<button>` tags)
- Check browser console for errors
- Verify the `track_button_click` function exists

### Dashboard showing 0
- Make sure you have created at least one shareable link
- Ensure the link has been visited at least once
- Check that the analytics functions are working in Supabase

## Future Enhancements

Potential improvements:
- Track individual link performance (views/clicks per link)
- Add time-series charts to show trends
- Track geographic location of visitors
- Add click heatmaps
- Export analytics data to CSV
- Add real-time analytics updates
