# 🚀 Vercel Deployment Guide

## ✅ Pre-Deployment Checklist

Your project is ready for deployment! Here's what's already set up:

- ✅ All dependencies installed
- ✅ `vercel.json` configuration exists
- ✅ Next.js 15 with App Router
- ✅ Supabase integration ready
- ✅ TypeScript configured

---

## 📋 Step-by-Step Deployment

### **Step 1: Set Up Supabase (REQUIRED)**

Before deploying, you MUST set up your Supabase database:

1. **Go to** [https://supabase.com](https://supabase.com)
2. **Create a new project** (or use existing)
3. **Go to SQL Editor** in your Supabase dashboard
4. **Copy all SQL** from `supabase/schema.sql` in your project
5. **Paste and Run** the SQL in Supabase
6. **Verify tables created**: profiles, projects, project_analytics, page_views, button_clicks

### **Step 2: Get Supabase Credentials**

1. Go to **Settings → API** in Supabase dashboard
2. Copy these values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (long string starting with `eyJ...`)

### **Step 3: Deploy to Vercel**

#### **Option A: Using Vercel CLI (Recommended)**

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project? → No (first time) or Yes (redeployment)
   - Project name? → `website-builder` (or your choice)
   - Directory? → `./` (press Enter)
   - Override settings? → No (press Enter)

5. **Add Environment Variables**:
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   vercel env add GOOGLE_API_KEY
   ```
   
   When prompted, paste your values and select **Production, Preview, Development**

6. **Redeploy with env vars**:
   ```bash
   vercel --prod
   ```

#### **Option B: Using Vercel Dashboard**

1. **Go to** [https://vercel.com](https://vercel.com)

2. **Click "Add New Project"**

3. **Import your Git repository**:
   - Connect GitHub/GitLab/Bitbucket
   - Select your repository
   - Click "Import"

4. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)

5. **Add Environment Variables**:
   Click "Environment Variables" and add:
   
   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key |
   | `GOOGLE_API_KEY` | Your Google Gemini API key (optional) |

6. **Click "Deploy"**

---

## 🔐 Environment Variables Reference

Add these to Vercel:

```bash
# Supabase (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Google Gemini AI (Optional - for AI content generation)
GOOGLE_API_KEY=your-google-api-key
```

**Where to get them:**
- **Supabase**: Dashboard → Settings → API
- **Google API**: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)

---

## 🔧 Vercel Configuration

Your `vercel.json` is already configured:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install --legacy-peer-deps",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

**What this does:**
- Uses `--legacy-peer-deps` for React 19 compatibility
- Deploys to `iad1` region (US East)
- Optimized for Next.js 15

---

## 🧪 Testing Your Deployment

After deployment:

1. **Visit your Vercel URL** (e.g., `https://your-app.vercel.app`)

2. **Test Authentication**:
   - Go to `/signup`
   - Create a new account
   - Should redirect to `/dashboard`

3. **Test Project Creation**:
   - Click "New Website"
   - Select a template
   - Edit and save
   - Check if it appears in dashboard

4. **Test Shareable Links**:
   - Click "Share" on a project
   - Set custom URL
   - Open link in incognito window
   - Should display without login

---

## 🐛 Troubleshooting

### **Build Fails**

**Error**: `Module not found` or dependency issues
```bash
# Locally test the build
npm run build
```

**Fix**: Make sure all dependencies are in `package.json`

### **Environment Variables Not Working**

**Error**: `Invalid API key` or `undefined`

**Fix**: 
1. Check variable names match exactly (case-sensitive)
2. Redeploy after adding variables
3. Make sure variables start with `NEXT_PUBLIC_` for client-side

### **Authentication Not Working**

**Error**: Redirects to sign-in repeatedly

**Fix**:
1. Verify Supabase URL and key are correct
2. Check if database schema was run
3. Look at Vercel logs: Dashboard → Deployments → Click deployment → Logs

### **Database Errors**

**Error**: `relation "profiles" does not exist`

**Fix**: You forgot to run the database schema!
1. Go to Supabase SQL Editor
2. Run `supabase/schema.sql`
3. Redeploy on Vercel

---

## 📊 Monitoring Your Deployment

### **Vercel Dashboard**
- **Deployments**: See all deployments and their status
- **Logs**: Real-time logs for debugging
- **Analytics**: Traffic and performance metrics
- **Domains**: Add custom domain

### **Supabase Dashboard**
- **Table Editor**: View your data
- **Authentication**: See registered users
- **Logs**: Database queries and errors
- **API**: Monitor API usage

---

## 🌐 Custom Domain (Optional)

1. **Go to Vercel Dashboard** → Your Project → Settings → Domains

2. **Add your domain**:
   - Enter domain name (e.g., `mywebsitebuilder.com`)
   - Follow DNS configuration instructions

3. **Update DNS records** at your domain registrar:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

4. **Wait for DNS propagation** (5-30 minutes)

---

## 🚀 Continuous Deployment

Once connected to Git:

1. **Push to main branch** → Auto-deploys to production
2. **Push to other branches** → Creates preview deployments
3. **Pull requests** → Automatic preview URLs

---

## 📝 Deployment Checklist

Before going live:

- [ ] Supabase database schema run
- [ ] Environment variables added to Vercel
- [ ] Test build locally (`npm run build`)
- [ ] Test authentication flow
- [ ] Test project creation and editing
- [ ] Test shareable links
- [ ] Check mobile responsiveness
- [ ] Review Vercel logs for errors
- [ ] Set up custom domain (optional)
- [ ] Enable Vercel Analytics (optional)

---

## 🎯 Quick Deploy Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm [deployment-url]
```

---

## 📚 Additional Resources

- **Vercel Docs**: [https://vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment**: [https://nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)

---

## ✅ Post-Deployment

After successful deployment:

1. **Share your URL** with users
2. **Monitor Vercel Analytics** for traffic
3. **Check Supabase usage** to stay within free tier
4. **Set up error tracking** (optional - Sentry)
5. **Enable HTTPS** (automatic on Vercel)

---

**Your app is ready to deploy!** 🎉

Just follow the steps above and you'll be live in minutes!
