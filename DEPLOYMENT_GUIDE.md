# RUST Knowledge Base - Deployment Guide for stunkcuf.com

## 🚀 Quick Deploy to Cloudflare Pages

### Prerequisites
- ✅ GitHub repo: `stunkcuf/rust`
- ✅ Domain: `stunkcuf.com` with Cloudflare DNS
- ✅ Website files in `docs/` directory

---

## Step 1: Merge Your Branch to Main

**Option A: Via GitHub UI (Easiest)**
1. Go to https://github.com/stunkcuf/rust
2. You'll see a banner: "claude/explore-rust-game-011CUSeMFo9iqxJsA4epr8RE had recent pushes"
3. Click "Compare & pull request"
4. Add title: "Add RUST Knowledge Base and Website"
5. Click "Create pull request"
6. Click "Merge pull request"
7. Click "Confirm merge"

**Option B: Via Command Line**
```bash
cd /home/user/rust
git checkout main
git pull origin main
git merge claude/explore-rust-game-011CUSeMFo9iqxJsA4epr8RE
git push origin main
```

---

## Step 2: Connect to Cloudflare Pages

### 2.1 Access Cloudflare Dashboard
1. Go to https://dash.cloudflare.com/
2. Login to your account
3. Select your account (top left)
4. Click **"Workers & Pages"** in the left sidebar

### 2.2 Create New Project
1. Click **"Create application"** button
2. Select **"Pages"** tab
3. Click **"Connect to Git"**

### 2.3 Connect GitHub Repository
1. Click **"Connect GitHub"**
2. If not connected, authorize Cloudflare
3. Select **"stunkcuf/rust"** repository
4. Click **"Begin setup"**

### 2.4 Configure Build Settings

**Project Name:** `rust-kb` (or whatever you prefer)

**Production Branch:** `main` (or your branch name)

**Build Configuration:**
```
Framework preset: None
Build command: (leave empty)
Build output directory: docs
Root directory: (leave empty - use /)
```

**Environment variables:** (none needed)

### 2.5 Deploy
1. Click **"Save and Deploy"**
2. Cloudflare will start building (takes ~1-2 minutes)
3. You'll get a URL like: `rust-kb.pages.dev`

---

## Step 3: Connect Custom Domain (stunkcuf.com)

### 3.1 Add Custom Domain to Project
1. In your Cloudflare Pages project
2. Click **"Custom domains"** tab
3. Click **"Set up a custom domain"**
4. Enter: `stunkcuf.com`
5. Click **"Continue"**

### 3.2 Configure DNS
Cloudflare will automatically:
- Add CNAME record: `stunkcuf.com` → `rust-kb.pages.dev`
- Enable SSL/TLS (automatic)
- Set up redirects

**If manual DNS needed:**
1. Go to Cloudflare dashboard → Your domain → DNS
2. Add CNAME record:
   - **Name:** `@` (or `www` for www.stunkcuf.com)
   - **Target:** `rust-kb.pages.dev`
   - **Proxy status:** Proxied (orange cloud)
3. Save

### 3.3 Optional: Add www Subdomain
1. In Custom domains, click "Set up a custom domain" again
2. Enter: `www.stunkcuf.com`
3. Cloudflare handles redirect www → root automatically

---

## Step 4: Verify Deployment

### 4.1 Check Build Status
- Go to Cloudflare Pages → Your project
- Check "Deployments" tab
- Status should be "Success" with green checkmark

### 4.2 Test Website
1. Visit `https://stunkcuf.com` (may take 5-10 minutes for DNS)
2. Check that you see: "🎮 Welcome to the RUST Knowledge Base"
3. Test navigation: Click "Weapons & Combat" in sidebar
4. Test search: Search for "AK-47"
5. Test tools: Click "Raid Calculator"

### 4.3 Check All Features
- [ ] Homepage loads correctly
- [ ] Sidebar navigation works
- [ ] Guides load when clicked
- [ ] Search functionality works
- [ ] Raid calculator functional
- [ ] Monument router works
- [ ] Wipe timer displays
- [ ] Mobile responsive (test on phone)

---

## Step 5: Automatic Updates

### How It Works
Every time you push to `main` branch:
1. Cloudflare detects the push (via GitHub webhook)
2. Automatically rebuilds the site
3. Deploys new version (takes ~1-2 minutes)
4. Site updates live

### To Update Content
```bash
cd /home/user/rust

# Edit knowledge base files
vim rust-knowledge-base/combat/01-weapons-tier-list-2025.md

# Commit and push
git add .
git commit -m "Update weapon stats"
git push origin main

# Wait 1-2 minutes, site auto-updates!
```

---

## Troubleshooting

### Issue: Site Shows 404
**Solution:**
- Verify "Build output directory" is set to `docs`
- Check that `docs/index.html` exists in your repo
- Re-deploy from Cloudflare Pages dashboard

### Issue: Guides Don't Load
**Solution:**
- Check browser console (F12) for errors
- Verify `rust-knowledge-base/` folder is in repo root
- Check file paths in `docs/js/app.js` are correct
- Try hard refresh: `Ctrl + Shift + R`

### Issue: Search Not Working
**Solution:**
- Verify markdown files are accessible
- Check browser console for fetch errors
- Ensure CORS isn't blocking (Cloudflare handles this)

### Issue: Custom Domain Not Working
**Solution:**
- Wait 5-10 minutes for DNS propagation
- Clear browser cache
- Check Cloudflare DNS settings
- Verify SSL/TLS mode is "Full" in Cloudflare

### Issue: Styles Look Broken
**Solution:**
- Hard refresh browser: `Ctrl + Shift + R`
- Check `docs/css/style.css` exists
- Verify file paths are correct
- Check browser console for 404 errors

---

## Advanced Configuration

### Enable Analytics
1. Cloudflare Pages dashboard
2. Analytics tab
3. Enable Web Analytics
4. Get visitor stats, page views, etc.

### Custom Headers (Optional)
Create `docs/_headers` file:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### Redirects (Optional)
Create `docs/_redirects` file:
```
# Redirect old URLs
/old-guide /monuments/01-monument-guide-overview 301

# Redirect www to root (if not using www as custom domain)
https://www.stunkcuf.com/* https://stunkcuf.com/:splat 301
```

### Preview Deployments
- Every branch gets preview URL
- Test changes before merging to main
- URL format: `[branch].[project].pages.dev`

---

## Performance Optimization

### Already Optimized ✅
- Static files (fast!)
- Cloudflare CDN (global)
- Automatic minification
- HTTP/2 and HTTP/3
- Brotli compression

### Further Optimization
1. **Images:** Add images to `docs/images/` (if you add any)
2. **Caching:** Cloudflare handles automatically
3. **Lighthouse Score:** Should be 90+ out of the box

---

## Maintenance

### Regular Updates
1. Update knowledge base when RUST patches
2. Add new guides to `rust-knowledge-base/`
3. Update `docs/js/app.js` if adding new guides
4. Commit and push - auto-deploys!

### Monitoring
- Check Cloudflare Analytics weekly
- Review deployment logs for errors
- Test site after RUST major updates

---

## Summary

**Your workflow:**
```
1. Edit files in rust-knowledge-base/
2. git commit & git push
3. Cloudflare auto-deploys (1-2 min)
4. stunkcuf.com updates live!
```

**Support:**
- Cloudflare Docs: https://developers.cloudflare.com/pages/
- GitHub Repo: https://github.com/stunkcuf/rust
- Knowledge Base: All markdown files in `rust-knowledge-base/`

---

## 🎉 You're Done!

Your RUST knowledge base is now live at **stunkcuf.com**!

Share it with your RUST community and dominate the next wipe! 🎮
