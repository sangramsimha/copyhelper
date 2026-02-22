# How to Get Your Supabase Database Connection String

## Quick Steps

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Click on your project (the one with URL: xqpcevfngcstcgirpfys)
3. Click on the **Settings** icon (gear icon) in the left sidebar
4. Click on **Database** in the settings menu
5. Scroll down to **Connection string** section
6. Under **URI**, you'll see a connection string like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xqpcevfngcstcgirpfys.supabase.co:5432/postgres
   ```
7. **Click the "Copy" button** or manually copy it
8. **Replace `[YOUR-PASSWORD]`** with the database password you created when setting up the project

## If You Don't Remember Your Password

If you forgot your database password:
1. In the same Database settings page
2. Look for **Database password** section
3. You can reset it there (but this will require updating the connection string)

## What the Connection String Should Look Like

After replacing the password, it should look like:
```
postgresql://postgres:your_actual_password_here@db.xqpcevfngcstcgirpfys.supabase.co:5432/postgres
```

## Alternative: Connection Pooling (Recommended for Production)

Supabase also provides a connection pooler. In the same Database settings page, look for:
- **Connection pooling** section
- Use the **Session mode** or **Transaction mode** connection string
- Format: `postgresql://postgres.xqpcevfngcstcgirpfys:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres`

The pooler is better for serverless (Netlify) because it handles connections more efficiently.
