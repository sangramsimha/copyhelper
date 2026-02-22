# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up for a free account (or log in)
3. Click "New Project"
4. Fill in:
   - **Name**: Copy Helper (or any name you like)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to you
5. Click "Create new project"
6. Wait 2-3 minutes for the project to be created

## Step 2: Get Your Database Connection String

1. In your Supabase project dashboard, go to **Settings** (gear icon in left sidebar)
2. Click on **Database** in the settings menu
3. Scroll down to **Connection string**
4. Under **URI**, you'll see a connection string like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
5. **Replace `[YOUR-PASSWORD]`** with the database password you created in Step 1
6. Copy the complete connection string

## Step 3: Update Your Local .env File

Add or update the `DATABASE_URL` in your `.env` file:

```env
OPENAI_API_KEY=sk-proj-your-key-here
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxxxx.supabase.co:5432/postgres"
```

**Important**: 
- Replace `YOUR_PASSWORD` with your actual Supabase database password
- Keep the quotes around the connection string
- The connection string should look like: `postgresql://postgres:abc123@db.abcdefgh.supabase.co:5432/postgres`

## Step 4: Run Database Migrations

Now create the tables in your Supabase database:

```bash
# Make sure your .env file has the correct DATABASE_URL
npx prisma migrate deploy
```

This will create all the necessary tables (Conversation, Message, Idea, Evaluation) in your Supabase database.

## Step 5: Generate Prisma Client

```bash
npx prisma generate
```

## Step 6: Test Locally

Start your dev server:

```bash
npm run dev
```

Try creating a conversation - it should now save to your Supabase database!

## Step 7: Set Up for Netlify Deployment

1. Go to your Netlify dashboard
2. Navigate to your site → **Site settings** → **Environment variables**
3. Add these variables:
   - `OPENAI_API_KEY` = your OpenAI API key
   - `DATABASE_URL` = your Supabase connection string (same as in .env)

4. Deploy - that's it! Your app will now use Supabase in production.

## Verifying Your Setup

You can verify your database is working by:

1. Going to your Supabase dashboard
2. Click on **Table Editor** in the left sidebar
3. You should see tables: `Conversation`, `Message`, `Idea`, `Evaluation`
4. When you create conversations in your app, you'll see them appear here!

## Troubleshooting

- **"Connection refused"**: Check your password in the connection string
- **"Table does not exist"**: Run `npx prisma migrate deploy` again
- **"Invalid connection string"**: Make sure you replaced `[YOUR-PASSWORD]` with your actual password

## Security Note

- Never commit your `.env` file to Git (it's already in `.gitignore`)
- The connection string contains your database password - keep it secret!
- In production, only set it in Netlify's environment variables (never in code)
