# 📦 Inventory Tracking System

A comprehensive inventory management system for tracking supplies, purchases, budgets, and location requests. Built with Rust (Axum) backend and a Progressive Web App (PWA) frontend that works seamlessly on desktop and mobile devices.

## Features

### Core Functionality
- **📦 Inventory Management** - Track stock levels across multiple locations with low-stock and overstock alerts
- **🏷️ Item Catalog** - Manage items with SKU, categories, pricing, and reorder levels
- **💰 Purchase Orders** - Create and track purchase orders with budget allocation
- **💵 Budget Management** - Monitor budgets per location with spending tracking
- **📝 Item Requests** - Locations can request items with priority levels
- **📍 Multi-Location Support** - Manage inventory across 20+ locations
- **👥 User Management** - Role-based access control (Admin, Manager, User)
- **🔐 Authentication** - Secure JWT-based authentication

### Technical Features
- **Progressive Web App (PWA)** - Install on mobile devices for app-like experience
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Offline Support** - Service worker enables offline functionality
- **Real-time Updates** - Live dashboard with key metrics
- **RESTful API** - Well-structured API for easy integration

## Technology Stack

### Backend
- **Rust** - High-performance, memory-safe systems programming
- **Axum** - Modern web framework built on Tokio
- **SQLite** - Lightweight, serverless database
- **SQLx** - Async SQL toolkit
- **JWT** - Secure token-based authentication
- **Bcrypt** - Password hashing

### Frontend
- **HTML5/CSS3/JavaScript** - Modern web standards
- **Progressive Web App** - Installable, offline-capable
- **Service Worker** - Offline support and caching
- **Responsive Design** - Mobile-first approach

## Installation

### Prerequisites
- Rust 1.70+ ([Install Rust](https://rustup.rs/))
- Python 3.6+ (for seed data script)

### Setup Instructions

1. **Clone the repository**
   ```bash
   cd /home/user/rust
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and change JWT_SECRET to a random string
   ```

3. **Build the backend**
   ```bash
   cd backend
   cargo build --release
   ```

4. **Run the backend server**
   ```bash
   cargo run --release
   ```

   The server will start on `http://localhost:3000`

5. **Seed the database** (in a new terminal)
   ```bash
   cd /home/user/rust
   python3 seed_data.py
   ```

6. **Access the application**
   - Open your browser to `http://localhost:3000`
   - Login with default admin credentials:
     - Username: `admin`
     - Password: `admin123`
   - **⚠️ Change the password immediately after first login!**

## Mobile Installation

### iOS (iPhone/iPad)
1. Open Safari and navigate to your server URL
2. Tap the Share button (box with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" to confirm

### Android
1. Open Chrome and navigate to your server URL
2. Tap the three dots menu
3. Tap "Add to Home Screen"
4. Tap "Add" to confirm

The app will now appear on your home screen and work like a native app!

## Usage Guide

### Dashboard
View key metrics at a glance:
- Low stock items requiring reorder
- Overstock items
- Pending purchase orders
- Pending item requests

### Inventory Management
- View stock levels across all locations
- Filter by location
- Quick access to low-stock and overstock items
- Update stock quantities

### Items Catalog
- Add new items with SKU, category, and pricing
- Set reorder and overstock levels
- Edit existing items
- Track item details and descriptions

### Purchase Orders
- Create purchase orders for items
- Allocate to budgets
- Track vendor information
- Approve/complete/cancel orders
- Automatic inventory update on completion

### Budget Management
- Create budgets per location
- Track spending against budget
- View budget utilization percentage
- Monitor budget periods

### Item Requests
- Locations can request items with priority
- Set priority levels (low, medium, high, urgent)
- Managers/admins can approve or reject
- Track fulfillment status

### Location Management
- Add new locations
- Update location information
- Associate managers with locations

## User Roles

### Admin
- Full system access
- User management
- All location access
- Budget creation and management

### Manager
- Location-specific access
- Approve/reject requests
- Create purchase orders
- View reports

### User
- Create item requests
- View inventory
- Basic catalog access

## API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
Body: {
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "user|manager|admin"
}
```

#### Login
```
POST /api/auth/login
Body: {
  "username": "string",
  "password": "string"
}
Returns: {
  "token": "jwt-token",
  "user": { ... }
}
```

### Inventory Endpoints

#### List Inventory
```
GET /api/inventory?location_id={id}&item_id={id}
Headers: Authorization: Bearer {token}
```

#### Update Inventory
```
PUT /api/inventory
Headers: Authorization: Bearer {token}
Body: {
  "item_id": number,
  "location_id": number,
  "quantity": number
}
```

#### Get Low Stock
```
GET /api/inventory/low-stock
Headers: Authorization: Bearer {token}
```

#### Get Overstock
```
GET /api/inventory/overstock
Headers: Authorization: Bearer {token}
```

### Items Endpoints

#### List Items
```
GET /api/items
Headers: Authorization: Bearer {token}
```

#### Create Item
```
POST /api/items
Headers: Authorization: Bearer {token}
Body: {
  "name": "string",
  "sku": "string",
  "category": "string",
  "description": "string",
  "unit_price": number,
  "reorder_level": number,
  "overstock_level": number
}
```

### Purchase Endpoints

#### List Purchases
```
GET /api/purchases?location_id={id}&status={status}
Headers: Authorization: Bearer {token}
```

#### Create Purchase
```
POST /api/purchases
Headers: Authorization: Bearer {token}
Body: {
  "item_id": number,
  "location_id": number,
  "budget_id": number,
  "quantity": number,
  "unit_price": number,
  "vendor": "string"
}
```

#### Update Purchase Status
```
PATCH /api/purchases/{id}/status
Headers: Authorization: Bearer {token}
Body: {
  "status": "pending|approved|completed|cancelled"
}
```

### Request Endpoints

#### List Requests
```
GET /api/requests?location_id={id}&status={status}
Headers: Authorization: Bearer {token}
```

#### Create Request
```
POST /api/requests
Headers: Authorization: Bearer {token}
Body: {
  "item_id": number,
  "location_id": number,
  "quantity": number,
  "reason": "string",
  "priority": "low|medium|high|urgent"
}
```

## Database Schema

The system uses SQLite with the following main tables:
- `users` - User accounts and authentication
- `locations` - Physical locations/facilities
- `items` - Item catalog
- `inventory` - Stock levels per location
- `budgets` - Budget allocations
- `purchases` - Purchase orders
- `item_requests` - Item request workflow

## Configuration

### Environment Variables

```bash
# Database
DATABASE_URL=sqlite:inventory.db

# Server
BIND_ADDR=0.0.0.0:3000
RUST_LOG=info

# Security
JWT_SECRET=your-secret-key-here
```

### Production Deployment

1. **Generate a secure JWT secret**
   ```bash
   openssl rand -base64 32
   ```

2. **Set environment variables**
   ```bash
   export JWT_SECRET="your-generated-secret"
   export RUST_LOG=warn
   ```

3. **Build in release mode**
   ```bash
   cargo build --release
   ```

4. **Run with production settings**
   ```bash
   ./target/release/inventory-backend
   ```

5. **Set up reverse proxy** (nginx/Apache)
   - Enable HTTPS with SSL certificate
   - Configure proxy to backend on port 3000

## Troubleshooting

### Common Issues

**Problem:** Database locked error
- **Solution:** Make sure only one instance of the server is running

**Problem:** JWT token expired
- **Solution:** Log out and log back in to get a new token

**Problem:** Can't create items/locations
- **Solution:** Make sure you're logged in with admin or manager role

**Problem:** Mobile app won't install
- **Solution:** Make sure you're using HTTPS (required for PWA on iOS)

## Development

### Project Structure
```
/home/user/rust/
├── backend/              # Rust backend
│   ├── src/
│   │   ├── main.rs      # Entry point
│   │   ├── auth.rs      # Authentication
│   │   ├── db.rs        # Database setup
│   │   ├── models.rs    # Data models
│   │   └── handlers/    # API handlers
│   └── Cargo.toml
├── frontend/
│   └── dist/            # Frontend assets
│       ├── index.html   # Main HTML
│       ├── styles.css   # Styles
│       ├── app.js       # JavaScript
│       ├── manifest.json # PWA manifest
│       └── sw.js        # Service worker
├── seed_data.py         # Database seeding
└── README.md
```

### Running in Development

```bash
# Terminal 1: Run backend with hot reload
cd backend
cargo watch -x run

# Terminal 2: Seed database (first time only)
python3 seed_data.py
```

## Data Included

The seed script includes:
- **25+ Locations** across Oregon (Hermiston, Boardman, Pendleton, etc.)
- **80+ Items** including:
  - Baby supplies (diapers, wipes)
  - Cleaning supplies and materials
  - Paper products
  - Office supplies
  - Gloves and safety items
  - Pantry items
  - And more!

## Contributing

This system was built for Umatilla-Morrow Head Start, Inc. to manage inventory across multiple facilities serving children and families.

## Security Notes

1. **Change default admin password immediately**
2. **Use HTTPS in production**
3. **Generate a strong JWT secret**
4. **Regularly backup the database**
5. **Keep Rust dependencies updated**

## License

Proprietary - Umatilla-Morrow Head Start, Inc.

## Support

For support, please contact your system administrator.

---

Built with ❤️ using Rust and modern web technologies
