# ⚡ Quick Deploy Guide - 5 Minutes

## Step 1: Push to GitHub (2 min)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/squpage.git
git push -u origin main
```

## Step 2: Deploy on Vercel (2 min)

1. Go to https://vercel.com
2. Click **"Add New Project"**
3. Select your GitHub repository
4. Click **"Deploy"** (don't change any settings)

## Step 3: Add Environment Variables (1 min)

In Vercel dashboard:

**Settings → Environment Variables → Add:**

```
NEXT_PUBLIC_SUPABASE_URL = your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your_supabase_key
```

Click **"Redeploy"** after adding variables.

## Step 4: Configure Supabase

In Supabase dashboard:

**Authentication → URL Configuration:**

- Site URL: `https://your-app.vercel.app`
- Redirect URLs: `https://your-app.vercel.app/**`

## ✅ Done!

Your app is live at: `https://your-app.vercel.app`

---

**Need help?** See `DEPLOYMENT_GUIDE.md` for detailed instructions.
