# How to Find Connection String in Supabase

## Step-by-Step Instructions

1. **In your Supabase Dashboard**, look at the **left sidebar**
2. Scroll down to find **"Settings"** (it should be near the bottom, under "Configuration" section)
3. Click on **"Settings"**
4. In the Settings page, click on **"Database"** (it's a tab/section within Settings)
5. Scroll down to find **"Connection string"** section
6. You'll see different connection string options:
   - **URI** - Direct connection (port 5432)
   - **Connection pooling** - Below the URI section, you'll find connection pooling options

## Connection Pooling Location

Once you're in **Settings → Database**:
- Scroll down past the "Connection string" section
- Look for **"Connection pooling"** section
- You'll see options like:
  - **Session mode**
  - **Transaction mode**
- Copy the **Session mode** connection string

## Alternative: Direct Connection String

If you can't find connection pooling, you can use the direct connection string from the "URI" section, but you might need to:
1. Check **"Network restrictions"** in the same Database settings page
2. Make sure your IP is allowed (or set to allow all for testing)

## Quick Navigation

From where you are now:
1. Click **"Settings"** in the left sidebar (bottom section)
2. Click **"Database"** tab
3. Scroll to **"Connection string"** or **"Connection pooling"**
