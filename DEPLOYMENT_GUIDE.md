# Squpage - Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- Supabase project (for authentication and database)

## Step 1: Push to GitHub

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit - Squpage website builder"
```

2. Create a new repository on GitHub
3. Push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to https://vercel.com and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure your project:
   - **Framework Preset**: Next.js (auto-detected)
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install --legacy-peer-deps`
   - **Output Directory**: `.next` (default)

5. **Add Environment Variables** (click "Environment Variables"):
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key (optional)
   ```

6. Click "Deploy"

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts and add environment variables when asked

## Step 3: Configure Supabase

After deployment, update your Supabase project settings:

1. Go to your Supabase project dashboard
2. Navigate to **Authentication > URL Configuration**
3. Add your Vercel deployment URL to:
   - **Site URL**: `https://your-app.vercel.app`
   - **Redirect URLs**: 
     - `https://your-app.vercel.app/auth/callback`
     - `https://your-app.vercel.app/**` (wildcard for all routes)

## Step 4: Environment Variables

Make sure these environment variables are set in Vercel:

### Required:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

### Optional:
- `NEXT_PUBLIC_GEMINI_API_KEY` - For AI content generation features

To add/edit environment variables:
1. Go to your project in Vercel dashboard
2. Click "Settings" > "Environment Variables"
3. Add or update variables
4. Redeploy for changes to take effect

## Step 5: Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed by Vercel

## Troubleshooting

### Build Fails with Dependency Errors
- Make sure the install command is set to: `npm install --legacy-peer-deps`
- This is required because the project uses React 19

### Authentication Not Working
- Verify Supabase redirect URLs include your Vercel domain
- Check that environment variables are correctly set
- Ensure `NEXT_PUBLIC_` prefix is used for client-side variables

### 404 Errors on Routes
- Next.js App Router should handle this automatically
- Verify your `middleware.ts` is included in the deployment

## Post-Deployment Checklist

- [ ] Test authentication (sign up, sign in, sign out)
- [ ] Test creating and editing projects
- [ ] Test template selection
- [ ] Test export functionality
- [ ] Verify pricing page loads correctly
- [ ] Check that images and assets load properly
- [ ] Test on mobile devices

## Continuous Deployment

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request and branch push

## Support

- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Next.js Docs: https://nextjs.org/docs

## Quick Deploy Button

Add this to your README.md for one-click deployment:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/YOUR_REPO_NAME)
