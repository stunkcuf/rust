# UMCHS Inventory Tracking System

Complete inventory management system for Umatilla-Morrow County Head Start with web and mobile support.

## 🚀 Quick Start

### Local Development

```bash
# 1. Setup environment
cp .env.example .env

# 2. Build and run backend
cd backend
cargo build --release
cargo run --release

# 3. Seed database (new terminal)
cd ..
python3 seed_data.py

# 4. Access at http://localhost:3000
# Login: admin / admin123
```

### Deploy to Fly.io (FREE!)

```bash
# 1. Install Fly.io CLI
curl -L https://fly.io/install.sh | sh

# 2. Login/signup
flyctl auth signup

# 3. Deploy
flyctl launch --no-deploy
flyctl volumes create inventory_data --size 1
flyctl deploy

# 4. Seed remote database
python3 seed_data.py https://YOUR-APP-NAME.fly.dev
```

## 📦 Features

- ✅ Track inventory across 25+ locations
- ✅ 58+ pre-configured supply items
- ✅ Purchase order management
- ✅ Budget tracking
- ✅ Item request workflow
- ✅ Low stock / overstock alerts
- ✅ Progressive Web App (works on phones!)
- ✅ Offline support
- ✅ Role-based access (Admin, Manager, User)

## 📱 Mobile Installation

**iPhone:** Safari → Share → Add to Home Screen  
**Android:** Chrome → Menu → Add to Home Screen

## 🏗️ Technology

- **Backend:** Rust + Axum + SQLite
- **Frontend:** HTML + CSS + JavaScript (PWA)
- **Deployment:** Fly.io (free tier)

## 📚 Documentation

- 25 Locations (Hermiston, Boardman, Pendleton, etc.)
- 58 Items (diapers, cleaning supplies, office, pantry, etc.)
- Full REST API
- JWT authentication

## 🔐 Security

**⚠️ Change default admin password after first login!**

Default credentials:
- Username: admin
- Password: admin123

## 📄 License

Proprietary - Umatilla-Morrow County Head Start, Inc.
