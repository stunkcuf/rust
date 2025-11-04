# Quick Start Guide

Get up and running with the Inventory Tracking System in 5 minutes!

## Step 1: Setup Environment

```bash
# Copy environment file
cp .env.example .env

# Edit .env and change JWT_SECRET (recommended)
# For quick start, the defaults will work
```

## Step 2: Build and Run

```bash
# Build the backend
cd backend
cargo build --release

# Run the server
cargo run --release
```

Server will start at http://localhost:3000

## Step 3: Seed Database

Open a new terminal:

```bash
cd /home/user/rust
python3 seed_data.py
```

This will:
- Create an admin user
- Add 25+ locations
- Add 80+ items

## Step 4: Login

1. Open http://localhost:3000 in your browser
2. Login with:
   - Username: `admin`
   - Password: `admin123`
3. **Change your password immediately!**

## Step 5: Explore

- **Dashboard** - View key metrics and alerts
- **Inventory** - Check stock levels
- **Items** - Browse catalog
- **Purchases** - Create purchase orders
- **Requests** - Submit item requests
- **Locations** - View all facilities

## Mobile Access

### On Your Phone
1. Open your phone's browser
2. Navigate to your server URL (e.g., http://your-server:3000)
3. Add to Home Screen:
   - **iOS**: Tap Share → Add to Home Screen
   - **Android**: Menu → Add to Home Screen

The app works offline after installation!

## Common Tasks

### Add a New Item
1. Go to **Items** tab
2. Click **Add Item**
3. Fill in details (name, SKU, category, pricing)
4. Set reorder/overstock levels
5. Click **Add Item**

### Check Low Stock
1. Go to **Dashboard** (shows top 5)
2. Or go to **Inventory** → **Show Low Stock**

### Create a Purchase Order
1. Go to **Purchases** tab
2. Click **Create Purchase**
3. Select item, location, quantity
4. Optional: assign to budget
5. Enter vendor information
6. Submit order

### Request Items (for locations)
1. Go to **Requests** tab
2. Click **Create Request**
3. Select item and location
4. Enter quantity and reason
5. Set priority level
6. Submit request

### Approve Requests (for managers/admins)
1. Go to **Requests** tab
2. Filter by **Pending** status
3. Review request details
4. Click **Approve** or **Reject**

## Need Help?

See the full [README.md](README.md) for:
- Complete API documentation
- Deployment guide
- Troubleshooting
- User role details

## Default Credentials

**⚠️ IMPORTANT: Change these after first login!**

```
Username: admin
Password: admin123
Role: Administrator
```

## Quick Architecture

```
┌─────────────┐
│   Browser   │ ← PWA (works on phone too!)
│  (Frontend) │
└──────┬──────┘
       │ REST API
┌──────▼──────┐
│    Axum     │ ← Rust backend
│   Backend   │
└──────┬──────┘
       │
┌──────▼──────┐
│   SQLite    │ ← Database
│  inventory  │
│     .db     │
└─────────────┘
```

---

Happy tracking! 📦
