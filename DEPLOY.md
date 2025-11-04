# 🚀 Free Deployment Guide - Fly.io

Deploy your inventory tracker to the cloud for **FREE** and access it from anywhere!

## Prerequisites

- A GitHub account (you already have this)
- 5-10 minutes of time

## Step-by-Step Deployment

### Step 1: Install Fly.io CLI

**On Linux/Mac:**
```bash
curl -L https://fly.io/install.sh | sh
```

**On Windows (PowerShell):**
```powershell
powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

After installation, restart your terminal.

### Step 2: Sign Up for Fly.io

```bash
# Create account (it's FREE!)
flyctl auth signup
```

This will open your browser. Sign up with your email or GitHub account.

**Important:**
- No credit card required for free tier!
- You get enough resources to run this app 24/7

### Step 3: Login

```bash
flyctl auth login
```

### Step 4: Deploy Your App

```bash
# Navigate to your project
cd /home/user/rust

# Launch the app (this will ask some questions)
flyctl launch

# Answer the prompts like this:
# - App name: inventory-tracker (or choose your own)
# - Region: Choose closest to you (e.g., 'sea' for Seattle)
# - Setup Postgres database? NO
# - Deploy now? YES
```

### Step 5: Create Persistent Storage

```bash
# Create a volume for your database
flyctl volumes create inventory_data --size 1
```

### Step 6: Deploy!

```bash
flyctl deploy
```

This will take 3-5 minutes. You'll see build progress.

### Step 7: Seed Your Database

```bash
# Open a shell on your deployed app
flyctl ssh console

# Inside the container, run:
cd /app
# Download seed script
curl -o seed_data.py https://raw.githubusercontent.com/stunkcuf/rust/claude/inventory-tracking-app-011CUoPmjcj8HV6GMACT4bgb/seed_data.py

# Install Python (if needed)
apt-get update && apt-get install -y python3 python3-pip
pip3 install requests

# Run seed script (use your app URL)
python3 seed_data.py

# Exit the shell
exit
```

**Alternative:** Seed from your local machine:
```bash
# Get your app URL
flyctl info

# Update the API_BASE in seed_data.py
API_BASE = "https://your-app-name.fly.dev/api"

# Run locally
python3 seed_data.py
```

### Step 8: Access Your App! 🎉

```bash
# Open in browser
flyctl open

# Your app is now live at: https://your-app-name.fly.dev
```

## 📱 Install on Your Phone

### iPhone/iPad:
1. Open Safari
2. Go to `https://your-app-name.fly.dev`
3. Tap the Share button (box with arrow)
4. Tap "Add to Home Screen"
5. Tap "Add"

### Android:
1. Open Chrome
2. Go to `https://your-app-name.fly.dev`
3. Tap the three dots menu
4. Tap "Add to Home Screen"
5. Tap "Add"

Now you have a native-like app on your phone! 📲

## 🔧 Useful Commands

```bash
# View logs
flyctl logs

# Check app status
flyctl status

# View app info and URL
flyctl info

# Restart app
flyctl apps restart

# SSH into app
flyctl ssh console

# Update app (after making changes)
flyctl deploy

# View database
flyctl ssh console -C "sqlite3 /app/data/inventory.db"
```

## 🎯 Quick Seed Script (Alternative Method)

Create a file called `remote_seed.sh`:

```bash
#!/bin/bash
APP_URL="https://your-app-name.fly.dev"

curl -X POST "$APP_URL/api/auth/register" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","email":"admin@example.com","password":"admin123","role":"admin"}'

echo "Admin user created! Login at: $APP_URL"
echo "Username: admin"
echo "Password: admin123"
```

Then run:
```bash
chmod +x remote_seed.sh
./remote_seed.sh
```

## 💰 Free Tier Limits

Fly.io free tier includes:
- ✅ Up to 3 shared-cpu-1x VMs
- ✅ 3GB persistent volume storage
- ✅ 160GB outbound data transfer
- ✅ Free SSL certificates
- ✅ Custom domains

**This is MORE than enough for your inventory tracker!**

## 🔐 Security Notes

### Change Default Settings

Once deployed, update these in your fly.toml:

```bash
# Generate a secure JWT secret
openssl rand -base64 32

# Set it as a secret
flyctl secrets set JWT_SECRET="your-generated-secret-here"
```

### Change Admin Password

1. Log in to your app
2. Go to User settings
3. Change password immediately!

## 🐛 Troubleshooting

### App won't start?
```bash
flyctl logs
# Check for errors in the logs
```

### Database issues?
```bash
# Check if volume is mounted
flyctl ssh console -C "ls -la /app/data"

# Check database exists
flyctl ssh console -C "ls -la /app/data/inventory.db"
```

### Can't access app?
```bash
# Make sure it's running
flyctl status

# Restart if needed
flyctl apps restart
```

### Seed script fails?
```bash
# Make sure the API URL is correct
# Check that the app is fully deployed and running
flyctl status

# View logs while seeding
flyctl logs
```

## 🔄 Updating Your App

When you make changes:

```bash
# 1. Commit your changes
git add .
git commit -m "Update features"
git push

# 2. Pull on your local machine
git pull

# 3. Deploy to Fly.io
cd /home/user/rust
flyctl deploy
```

## 📊 Monitoring

```bash
# View real-time logs
flyctl logs -a inventory-tracker

# View metrics
flyctl dashboard
```

## 💡 Pro Tips

1. **Custom Domain:** You can add your own domain for free!
   ```bash
   flyctl certs add yourdomain.com
   ```

2. **Environment Variables:**
   ```bash
   flyctl secrets set KEY=value
   ```

3. **Scale if needed (still free):**
   ```bash
   flyctl scale memory 512
   ```

4. **Backup Database:**
   ```bash
   flyctl ssh console -C "cp /app/data/inventory.db /app/data/backup.db"
   flyctl ssh sftp get /app/data/inventory.db ./backup.db
   ```

## 🎉 You're Done!

Your inventory tracker is now:
- ✅ Running 24/7 in the cloud
- ✅ Accessible from anywhere
- ✅ Free to use
- ✅ Secure with HTTPS
- ✅ Installable on phones

Access it at: `https://your-app-name.fly.dev`

---

Need help? Check the logs: `flyctl logs`

Happy tracking! 📦
