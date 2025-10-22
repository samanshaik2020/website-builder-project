# Analytics Tracking System

## Overview
The website builder now includes a complete analytics tracking system that monitors real user engagement on shared project links.

## Features

### 1. **Page View Tracking**
- Automatically tracks when someone visits a shared project link
- Increments the `views` counter for each project
- Records `lastViewedAt` timestamp

### 2. **Button Click Tracking**
- Tracks all button and link clicks on shared pages
- Increments the `clicks` counter for each interaction
- Records `lastClickedAt` timestamp

### 3. **Dashboard Analytics**

#### Total Websites
- Shows the total number of saved projects
- Displays monthly count of newly created websites

#### Total Views
- Aggregates all views across all shared project links
- Real-time updates when users visit shared links

#### Total Clicks
- Aggregates all button/link clicks on shared pages
- Tracks user engagement with CTAs

#### Avg. Conversion Rate
- Calculates click-through rate: `(Total Clicks / Total Views) × 100`
- Shows percentage of visitors who interact with buttons

### 4. **Monthly Statistics**
The "This Month" card displays:
- **Websites Created**: Projects created in current month
- **Total Visitors**: Views on projects created this month
- **Conversion Rate**: CTR for current month's projects
- **Leads Generated**: Clicks on current month's projects

## Implementation Details

### Data Structure
```typescript
interface Project {
  id: string;
  name: string;
  template: string;
  data: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  views?: number;              // Total page views
  clicks?: number;             // Total button clicks
  lastViewedAt?: string;       // Last view timestamp
  lastClickedAt?: string;      // Last click timestamp
}
```

### Tracking Functions

**Page View Tracking** (`app/share/[projectId]/page.tsx`):
```typescript
const trackPageView = (projectId: string) => {
  const projects = JSON.parse(localStorage.getItem('projects') || '[]');
  const projectIndex = projects.findIndex((p: any) => p.id === projectId);
  
  if (projectIndex !== -1) {
    projects[projectIndex].views = (projects[projectIndex].views || 0) + 1;
    projects[projectIndex].lastViewedAt = new Date().toISOString();
    localStorage.setItem('projects', JSON.stringify(projects));
  }
};
```

**Button Click Tracking** (`app/share/[projectId]/page.tsx`):
```typescript
const trackButtonClick = (projectId: string) => {
  const projects = JSON.parse(localStorage.getItem('projects') || '[]');
  const projectIndex = projects.findIndex((p: any) => p.id === projectId);
  
  if (projectIndex !== -1) {
    projects[projectIndex].clicks = (projects[projectIndex].clicks || 0) + 1;
    projects[projectIndex].lastClickedAt = new Date().toISOString();
    localStorage.setItem('projects', JSON.stringify(projects));
  }
};
```

### Auto-Refresh
The dashboard automatically refreshes analytics when:
- Page loads
- Window regains focus (user returns from another tab)

This ensures real-time updates without manual refresh.

## Usage

### Testing Analytics

1. **Create a Project**
   - Go to Templates → Select a template → Edit and save

2. **Share the Project**
   - Dashboard → Click "Share" button
   - Copy the shareable link

3. **Track Views**
   - Open the shared link in a new tab/window
   - View count increments automatically

4. **Track Clicks**
   - Click any button or link on the shared page
   - Click count increments automatically

5. **View Analytics**
   - Return to Dashboard
   - See updated statistics in real-time

### Dashboard Metrics Explained

- **Total Websites**: All saved projects
- **Total Views**: Sum of all project views
- **Total Clicks**: Sum of all button clicks
- **Avg. Conversion**: `(Total Clicks / Total Views) × 100%`
- **Monthly Stats**: Filtered by current month's projects

## Technical Notes

- All data stored in `localStorage`
- Analytics persist across browser sessions
- No external analytics service required
- Privacy-friendly (no cookies, no tracking scripts)
- Works offline

## Future Enhancements

Potential improvements:
- Per-project analytics breakdown
- Time-series graphs
- Geographic data (if using external service)
- Referrer tracking
- Device/browser analytics
- Export analytics data to CSV
