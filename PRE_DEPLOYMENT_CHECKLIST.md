# Pre-Deployment Checklist

## ✅ Files Verified

### Website Structure
```
✓ docs/index.html exists
✓ docs/css/style.css exists
✓ docs/js/app.js exists
✓ All paths are relative (works on any domain)
```

### Knowledge Base Structure
```
✓ rust-knowledge-base/README.md
✓ rust-knowledge-base/core-mechanics/01-progression-system.md
✓ rust-knowledge-base/building/01-building-tiers-and-upgrade.md
✓ rust-knowledge-base/building/02-base-designs-raid-defense.md
✓ rust-knowledge-base/combat/01-weapons-tier-list-2025.md
✓ rust-knowledge-base/monuments/01-monument-guide-overview.md
✓ rust-knowledge-base/resources/01-resource-gathering-guide.md
✓ rust-knowledge-base/servers/01-wipe-cycles-server-types.md
✓ rust-knowledge-base/survival/01-healing-food-environmental-systems.md
```

### Example Tools
```
✓ rust-helper.sh
✓ example-raid-calculator.py
✓ example-monument-router.py
✓ example-simple-api.py
```

---

## 🔧 Configuration Check

### Cloudflare Pages Settings (To Configure)
- [ ] **Build output directory:** `docs`
- [ ] **Build command:** (leave empty)
- [ ] **Root directory:** `/`
- [ ] **Framework preset:** None
- [ ] **Branch:** `main` (or your preferred branch)

### Custom Domain Settings
- [ ] Primary domain: `stunkcuf.com`
- [ ] Optional www: `www.stunkcuf.com`
- [ ] SSL/TLS: Automatic (Cloudflare handles)
- [ ] DNSSEC: Enabled (if supported)

---

## 🧪 Testing After Deployment

### Homepage Tests
- [ ] Visit `https://stunkcuf.com`
- [ ] Page loads without errors
- [ ] Welcome message displays: "🎮 Welcome to the RUST Knowledge Base"
- [ ] All 4 feature cards show (Progression, Building, Combat, Monuments)
- [ ] Quick stats cards display raid costs
- [ ] Footer shows correct info

### Navigation Tests
- [ ] Sidebar visible on desktop
- [ ] All 9 guide links present
- [ ] Clicking "Progression System" loads guide
- [ ] Clicking "Weapons & Combat" loads guide
- [ ] Clicking "Monuments" loads guide
- [ ] Active guide highlighted in sidebar
- [ ] URL hash updates when clicking guides

### Search Tests
- [ ] Search bar visible in navbar
- [ ] Type "AK-47" - results appear
- [ ] Type "raid" - multiple results show
- [ ] Click search result - loads correct guide
- [ ] Clear search - returns to content

### Quick Reference Tests
- [ ] Click "⏰ Force Wipe Schedule" - shows wipe info
- [ ] Click "💣 Raid Costs" - shows raid table
- [ ] Click "⚔️ Top Weapons" - shows weapon tier list
- [ ] Click "💰 Best Scrap Routes" - shows farming routes

### Tool Tests

#### Raid Calculator
- [ ] Click "Raid Calculator" in sidebar
- [ ] Tool interface loads
- [ ] Select "Stone Wall" + "C4" = shows "2 C4, 4,400 sulfur"
- [ ] Select "Armored Wall" + "Rockets" = shows "15 Rockets, 21,000 sulfur"
- [ ] Change quantity to 2 - costs double correctly

#### Monument Router
- [ ] Click "Monument Router" in sidebar
- [ ] Tool interface loads
- [ ] Select "Solo" - shows Gas Station → Supermarket route
- [ ] Select "Clan" - shows Train Yard → Airfield route
- [ ] Details show time, scrap, risk level

#### Wipe Timer
- [ ] Click "Wipe Timer" in sidebar
- [ ] Shows next first Thursday of month
- [ ] Shows time: 2:00 PM EST
- [ ] Countdown shows days/hours remaining
- [ ] Date is correct

### Content Rendering Tests
- [ ] Load "Weapons & Combat" guide
- [ ] Markdown renders correctly (headers, lists, tables)
- [ ] Tables display properly formatted
- [ ] Code blocks have syntax highlighting background
- [ ] Links are clickable and correct color
- [ ] Bold/italic text renders

### Responsive Tests (Mobile)
- [ ] Open on mobile device or resize browser to 375px width
- [ ] Sidebar becomes hamburger menu (or stacks)
- [ ] Search bar works on mobile
- [ ] Guide content readable on small screen
- [ ] Tools work on mobile
- [ ] No horizontal scrolling
- [ ] Touch targets large enough

### Performance Tests
- [ ] Homepage loads in < 2 seconds
- [ ] Guides load instantly when clicked
- [ ] Search responds quickly (< 500ms)
- [ ] No console errors (F12 Developer Tools)
- [ ] No 404 errors for resources

### Browser Compatibility
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## 🚨 Common Issues & Fixes

### Issue: Guides Show "Error Loading Guide"
**Cause:** File paths incorrect or files not in repo
**Fix:**
```bash
# Verify files exist
ls -la rust-knowledge-base/

# Check git status
git status

# Ensure all files are committed
git add rust-knowledge-base/
git commit -m "Ensure all KB files committed"
git push
```

### Issue: 404 on stunkcuf.com
**Cause:** Build output directory wrong
**Fix:** In Cloudflare Pages settings, ensure "Build output directory" is `docs` (not `/docs` or `./docs`, just `docs`)

### Issue: Styles Don't Load
**Cause:** CSS path incorrect or file missing
**Fix:**
```bash
# Verify CSS exists
ls -la docs/css/style.css

# Check HTML references
grep "style.css" docs/index.html
```

### Issue: Search Doesn't Work
**Cause:** JavaScript not loading or KB files inaccessible
**Fix:** Open browser console (F12), check for errors. Verify marked.js CDN is accessible.

### Issue: Mobile Layout Broken
**Cause:** Viewport meta tag or responsive CSS issue
**Fix:** Verify this exists in `index.html`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## 📋 Launch Checklist

### Before Going Live
- [ ] Merge branch to main
- [ ] All files committed and pushed
- [ ] DEPLOYMENT_GUIDE.md reviewed
- [ ] Cloudflare Pages project created
- [ ] Build settings configured correctly
- [ ] Custom domain added
- [ ] DNS configured

### After Deployment
- [ ] Test all items in "Testing After Deployment" section
- [ ] Share link with friend for external test
- [ ] Check Cloudflare Analytics setup
- [ ] Bookmark deployment dashboard
- [ ] Document any custom configurations

### First Week
- [ ] Monitor Cloudflare analytics
- [ ] Check for any error reports
- [ ] Gather user feedback
- [ ] Note any performance issues
- [ ] Update content if RUST patches

---

## 🎯 Success Criteria

Your deployment is successful when:
1. ✅ Site loads at https://stunkcuf.com
2. ✅ All 9 guides accessible via navigation
3. ✅ Search functionality works
4. ✅ All 3 tools (calculator, router, timer) work
5. ✅ Mobile responsive
6. ✅ No console errors
7. ✅ Automatic deployments work (push to main = auto update)

---

## 📊 Expected Performance

### Load Times
- Homepage: < 2 seconds (first load)
- Homepage: < 0.5 seconds (cached)
- Guide pages: < 1 second
- Search: < 500ms response

### Lighthouse Scores (Target)
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### Cloudflare Edge
- Global CDN: Content cached worldwide
- HTTPS: Automatic and enforced
- DDoS Protection: Included
- Bandwidth: Unlimited

---

## 🔄 Update Workflow

After deployment, to update content:

```bash
# 1. Edit knowledge base
vim rust-knowledge-base/combat/01-weapons-tier-list-2025.md

# 2. Commit changes
git add .
git commit -m "Update weapon stats for patch 1.2.3"

# 3. Push to main
git push origin main

# 4. Wait ~90 seconds
# Cloudflare auto-detects, rebuilds, and deploys

# 5. Verify at stunkcuf.com
# Hard refresh (Ctrl+Shift+R) to see changes immediately
```

---

## ✅ Ready to Deploy!

Everything is prepared and verified. Follow the DEPLOYMENT_GUIDE.md to go live! 🚀
