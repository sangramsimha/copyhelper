# Supabase Connection Troubleshooting

## Current Status

Your `.env` file is correctly configured with:
```
DATABASE_URL=postgresql://postgres:fpQnfPSQt6fsqM7w@db.xqpcevfngcstcgirpfys.supabase.co:5432/postgres?sslmode=require
```

## Connection Error: "Can't reach database server"

This usually means one of these issues:

### Solution 1: Use Connection Pooler (Recommended)

Supabase's connection pooler is better for external connections and works on port 6543.

1. Go to Supabase Dashboard → Settings → Database
2. Scroll to "Connection pooling"
3. Copy the "Session mode" connection string
4. It will look like:
   ```
   postgresql://postgres.xqpcevfngcstcgirpfys:[PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres
   ```
5. Replace `[PASSWORD]` with: `fpQnfPSQt6fsqM7w`
6. Update your `.env` file with this connection string

### Solution 2: Check Network Restrictions

1. Go to Supabase Dashboard → Settings → Database
2. Look for "Network restrictions" or "IP allowlist"
3. Make sure your IP is allowed, or set it to allow all connections (for testing)

### Solution 3: Verify Database is Active

1. Check your Supabase project status
2. Make sure it shows "Active" (not "Paused" or "Provisioning")
3. If it's still provisioning, wait a few minutes

### Solution 4: Test Connection from Supabase SQL Editor

1. Go to Supabase Dashboard → SQL Editor
2. Try running a simple query: `SELECT 1;`
3. If this works, the database is accessible - the issue is with external connections

## Quick Fix: Try Connection Pooler URL

If you can get the pooler connection string, it should be:
```
postgresql://postgres.xqpcevfngcstcgirpfys:fpQnfPSQt6fsqM7w@aws-0-[region].pooler.supabase.com:6543/postgres
```

Replace `[region]` with your actual region (like `us-east-1`, `eu-west-1`, etc.)

## After Fixing

Once you have the correct connection string:
1. Update `.env` file
2. Run: `npx prisma migrate deploy`
3. Run: `npx prisma generate`
4. Restart your dev server
