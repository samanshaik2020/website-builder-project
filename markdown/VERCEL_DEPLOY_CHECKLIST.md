# ✅ Vercel Deployment Checklist

## Before Deployment

- [ ] All dependencies installed (`npm install --legacy-peer-deps`)
- [ ] Project builds successfully locally (`npm run build`)
- [ ] Environment variables documented in `env.example`
- [ ] Supabase project created and configured
- [ ] Git repository initialized and committed

## Step 1: Prepare Repository

```bash
# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure build settings:
   - **Framework**: Next.js (auto-detected)
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install --legacy-peer-deps`
   - **Output Directory**: `.next`

## Step 3: Add Environment Variables

In Vercel dashboard, add these environment variables:

### Required:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### Optional:
```
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key
```

## Step 4: Configure Supabase

After getting your Vercel URL (e.g., `your-app.vercel.app`):

1. Go to Supabase Dashboard
2. Navigate to **Authentication > URL Configuration**
3. Update:
   - **Site URL**: `https://your-app.vercel.app`
   - **Redirect URLs**: Add:
     - `https://your-app.vercel.app/auth/callback`
     - `https://your-app.vercel.app/**`

## Step 5: Test Deployment

- [ ] Visit your Vercel URL
- [ ] Test sign up functionality
- [ ] Test sign in functionality
- [ ] Create a test project
- [ ] Test editor functionality
- [ ] Test export feature
- [ ] Test on mobile device
- [ ] Check all pages load correctly

## Troubleshooting

### Build Fails
- Ensure install command is: `npm install --legacy-peer-deps`
- Check build logs for specific errors
- Verify all imports are correct

### Authentication Issues
- Verify Supabase redirect URLs
- Check environment variables are set correctly
- Ensure variables have `NEXT_PUBLIC_` prefix

### 404 Errors
- Clear Vercel cache and redeploy
- Check middleware.ts is included
- Verify all routes are properly configured

## Post-Deployment

- [ ] Add custom domain (optional)
- [ ] Set up analytics
- [ ] Configure error monitoring
- [ ] Test all features in production
- [ ] Share with users!

## Continuous Deployment

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

To redeploy:
```bash
git add .
git commit -m "Update message"
git push
```

## Quick Commands

```bash
# Check build locally
npm run build

# Test production build locally
npm start

# Deploy to Vercel (if using CLI)
vercel --prod
```

## Support Links

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)

---

🎉 Once deployed, your Squpage website builder will be live!
