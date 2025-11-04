# 🚀 Super Simple Deployment (3 Steps)

## What You Need
- 10 minutes
- Internet connection
- That's it!

## Step 1: Install Fly.io (1 minute)

Open your terminal and run:

```bash
curl -L https://fly.io/install.sh | sh
```

Then restart your terminal.

## Step 2: Sign Up & Deploy (5 minutes)

```bash
# Go to your project
cd /home/user/rust

# Sign up (opens browser - it's FREE, no credit card!)
flyctl auth signup

# Deploy (answer questions, say NO to Postgres)
flyctl launch

# Create storage for database
flyctl volumes create inventory_data --size 1

# Deploy for real
flyctl deploy
```

## Step 3: Add Your Data (2 minutes)

```bash
# Get your app URL
flyctl info

# Seed your database (replace YOUR-APP-NAME)
python3 seed_data.py https://YOUR-APP-NAME.fly.dev
```

## 🎉 You're Done!

Your app is now live at: `https://YOUR-APP-NAME.fly.dev`

### Add to Your Phone:

**iPhone:**
1. Open Safari
2. Go to your app URL
3. Tap Share → Add to Home Screen

**Android:**
1. Open Chrome
2. Go to your app URL
3. Menu → Add to Home Screen

### Login:
- Username: `admin`
- Password: `admin123`

**⚠️ Change password immediately after first login!**

---

## Need Help?

```bash
# View logs if something's wrong
flyctl logs

# Restart app
flyctl apps restart

# See full guide
cat DEPLOY.md
```

That's it! Your inventory tracker is now running 24/7 in the cloud for FREE! 🎊
