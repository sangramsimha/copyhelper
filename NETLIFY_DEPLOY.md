# Netlify Deployment Guide

## Quick Deploy Steps

### Option 1: Deploy via Netlify UI (Easiest)

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Netlify will auto-detect Next.js settings

3. **Set Environment Variables**:
   - Go to Site settings → Environment variables
   - Add these variables:
     - `OPENAI_API_KEY` = `your_openai_api_key_here` (get from your OpenAI account)
     - `DATABASE_URL` = `your_supabase_connection_string_here` (get from Supabase dashboard → Settings → Database → Connection pooling → Session mode)

4. **Deploy**:
   - Click "Deploy site"
   - Wait for build to complete
   - Your site will be live!

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Initialize and Deploy**:
   ```bash
   netlify init
   netlify deploy --prod
   ```

## Important Notes

- **Environment Variables**: Must be set in Netlify dashboard (Site settings → Environment variables)
- **Database**: Already set up with Supabase - all conversations will persist
- **Build**: The build command includes `prisma generate` to ensure Prisma client is ready
- **Migrations**: Already run on your Supabase database, so no need to run them again

## After Deployment

1. Your site will have a URL like: `https://your-site-name.netlify.app`
2. All conversations will be stored in your Supabase database
3. The site will work exactly like your local version

## Troubleshooting

- **Build fails**: Check that environment variables are set correctly
- **Database errors**: Verify `DATABASE_URL` is correct in Netlify environment variables
- **Prisma errors**: Make sure `postinstall` script runs (it's in package.json)
