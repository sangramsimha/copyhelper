# Quick Netlify Deployment

## Step 1: Push to GitHub

1. Create a new repository on GitHub (if you don't have one)
2. Run these commands:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Netlify

### Via Netlify Website (Recommended):

1. Go to https://app.netlify.com
2. Sign up/Login
3. Click **"Add new site"** → **"Import an existing project"**
4. Choose **"GitHub"** and authorize Netlify
5. Select your repository
6. Netlify will auto-detect Next.js - click **"Deploy site"**

### Set Environment Variables (CRITICAL):

Before or after first deploy, go to:
- **Site settings** → **Environment variables**
- Click **"Add variable"** and add:

**Variable 1:**
- Key: `OPENAI_API_KEY`
- Value: `your_openai_api_key_here` (get from your OpenAI account)

**Variable 2:**
- Key: `DATABASE_URL`
- Value: `your_supabase_connection_string_here` (get from Supabase dashboard → Settings → Database → Connection pooling → Session mode)

7. After adding variables, go to **"Deploys"** tab and click **"Trigger deploy"** → **"Clear cache and deploy site"**

## Step 3: Wait for Build

- Build will take 2-5 minutes
- Watch the build logs for any errors
- Once complete, your site will be live!

## Your Site URL

After deployment, you'll get a URL like:
`https://your-site-name.netlify.app`

## That's It! 🎉

Your app is now live on Netlify with:
- ✅ Supabase database (all conversations persist)
- ✅ OpenAI integration
- ✅ Modern UI
- ✅ All features working
