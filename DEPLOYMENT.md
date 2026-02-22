# Deployment Guide for Netlify

## ⚠️ Important: Database Setup Required

**SQLite will NOT work on Netlify** because serverless functions are stateless and don't persist files. You **MUST** use a cloud PostgreSQL database for production.

## Quick Setup Steps (Using Supabase)

1. **Create Supabase project** (see SUPABASE_SETUP.md for detailed instructions)
2. **Get your connection string** from Supabase dashboard
3. **Update your .env file** with the Supabase connection string
4. **Run database migrations** to create tables
5. **Set environment variables in Netlify**
6. **Deploy**

## Supabase Setup (Recommended)

**See `SUPABASE_SETUP.md` for complete step-by-step instructions.**

Quick version:
1. Create account at https://supabase.com
2. Create a new project
3. Go to Settings → Database → Connection string
4. Copy the connection string (replace `[YOUR-PASSWORD]` with your actual password)
5. Add to your `.env`: `DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres"`
6. Run: `npx prisma migrate deploy`

### Option 2: Neon (Free tier available)
1. Go to https://neon.tech
2. Create a free account
3. Create a new project
4. Copy the connection string from the dashboard

### Option 3: Railway (Free tier available)
1. Go to https://railway.app
2. Create a free account
3. Create a new PostgreSQL database
4. Copy the connection string

## Steps to Deploy

### 1. Prisma Schema (Already Updated)

The schema is already configured for PostgreSQL/Supabase. If you need to regenerate the client:

```bash
npx prisma generate
```

### 2. Set Up Environment Variables in Netlify

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add these variables:
   - `OPENAI_API_KEY` = your OpenAI API key
   - `DATABASE_URL` = your PostgreSQL connection string (from Supabase/Neon/etc.)

### 3. Run Database Migrations

**Before first deployment**, you need to create the database tables. Run this locally:

```bash
# Set your production DATABASE_URL
export DATABASE_URL="your-postgresql-connection-string-from-supabase"

# Create the tables
npx prisma migrate deploy

# This will create all tables in your cloud database
```

**Note**: After this, all future conversations will be stored in your cloud database and will persist across deployments.

### 4. Deploy to Netlify

1. Push your code to GitHub
2. Connect your repo to Netlify
3. Netlify will automatically detect Next.js and deploy

## Netlify Configuration

Create a `netlify.toml` file (already created below) with build settings.

## Important Notes

- **Database migrations**: Run `npx prisma migrate deploy` on your production database **before first deployment**
- **Environment variables**: Must be set in Netlify dashboard (Site settings → Environment variables)
  - `OPENAI_API_KEY` = your OpenAI key
  - `DATABASE_URL` = your PostgreSQL connection string
- **Prisma Client**: Automatically generated during build (via postinstall script)
- **Old chats**: Once deployed with PostgreSQL, all conversations will be stored in the cloud database and will persist forever (until you delete them)

## Local Development

For local development, you have two options:

**Option A: Use PostgreSQL locally** (recommended - same as production)
- Install PostgreSQL locally or use Docker
- Set `DATABASE_URL` in your `.env` to your local PostgreSQL

**Option B: Keep using SQLite locally**
- Change `provider = "sqlite"` in `prisma/schema.prisma` for local dev
- Use `DATABASE_URL="file:./dev.db"` in your `.env`
- **Remember to change back to PostgreSQL before deploying!**

## Troubleshooting

- **"Table does not exist"**: Run `npx prisma migrate deploy` on your production database
- **"Connection refused"**: Check your `DATABASE_URL` in Netlify environment variables
- **Build fails**: Make sure `DATABASE_URL` is set in Netlify (even if migrations haven't run yet)
