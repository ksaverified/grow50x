# Deployment Guide: Supabase + Vercel

## Step 1: Set Up Supabase

### 1.1 Create a Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project" and sign up
3. Create a new organization and project
4. Wait for project initialization (2-3 minutes)

### 1.2 Get Your Database Connection String
✅ **Already obtained:**
```
postgresql://postgres:[YOUR-PASSWORD]@db.sjyfqzsxumpivfudgohu.supabase.co:5432/postgres
```
**Note:** Replace `[YOUR-PASSWORD]` with your actual Supabase password from the email confirmation

### 1.3 Migrate Your Database Schema
1. In Supabase, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste the contents of:
   - `database/schema.sql`
   - `database/schema_users.sql`
   - `database/schema_update.sql`
4. Run each script to create your tables

### 1.4 Seed Demo Data (Optional)
1. Run locally first: `npm run seed`
2. Or manually insert test data into Supabase tables

---

## Step 2: Set Up Email Configuration

### Gmail Setup (Recommended)
1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select **Mail** and **Windows Computer** (or your device)
3. Generate a 16-character app password
4. Copy this password

---

## Step 3: Deploy to Vercel

### 3.1 Connect Your GitHub Repository
✅ **Your repository:**
```
https://github.com/sagrow50x/grow50x
```
**Steps:**
1. Go to [vercel.com](https://vercel.com)
2. Sign up / Log in
3. Click **Add New** → **Project**
4. Search for `grow50x` and select it
5. Vercel will auto-detect Next.js settings

### 3.2 Configure Environment Variables
In the Vercel dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add the following variables:
   - `DATABASE_URL`: `postgresql://postgres:[YOUR-PASSWORD]@db.sjyfqzsxumpivfudgohu.supabase.co:5432/postgres`
   - `EMAIL_SERVICE`: `gmail`
   - `EMAIL_USER`: `sa.grow50x@gmail.com`
   - `EMAIL_PASSWORD`: (your Gmail app-specific password)
3. Click **Deploy**

### 3.3 Monitor Your Deployment
- Vercel will automatically build and deploy your app
- Check the **Deployments** tab for real-time build logs
- Once complete, you'll get a live URL

---

## Step 4: Verify Everything Works

1. Visit your live Vercel URL
2. Test the login with demo credentials
3. Test plan selection → modal → form submission
4. Check that email arrives at daviddegroeve@gmail.com

---

## Troubleshooting

### Database Connection Fails
- Verify `DATABASE_URL` is correct in Vercel environment variables
- Check that Supabase project is running
- Ensure your IP is whitelisted (Supabase handles this automatically)

### Emails Not Sending
- Verify Gmail app password is correct (16 characters, no spaces)
- Check that 2FA is enabled on your Google account
- Look at Vercel Function logs for errors

### Build Fails
- Check Vercel build logs for errors
- Ensure all dependencies are listed in `package.json`
- Verify no hardcoded localhost paths remain

---

## Local Development with Supabase

If you want to test with Supabase before deploying:

1. Update `.env.local` with your Supabase `DATABASE_URL`
2. Run `npm run dev`
3. Test all functionality locally

---

## Next Steps (Future Features)

- Enable Supabase Auth for user management
- Add Supabase real-time subscriptions for live updates
- Set up database backups (automatic in Supabase)
- Configure custom domain in Vercel
