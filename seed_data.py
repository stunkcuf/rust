#!/usr/bin/env python3
"""
Seed data script for Inventory Tracking System
Populates database with items and locations

Usage:
  python3 seed_data.py                          # Local (http://localhost:3000)
  python3 seed_data.py https://your-app.fly.dev # Remote deployment
"""

import requests
import json
import sys

# Get API base from command line or use localhost
if len(sys.argv) > 1:
    API_BASE = sys.argv[1].rstrip('/') + "/api"
else:
    API_BASE = "http://localhost:3000/api"

print(f"Using API: {API_BASE}")

# First, create an admin user and get token
def register_admin():
    try:
        response = requests.post(f"{API_BASE}/auth/register", json={
            "username": "admin",
            "email": "admin@umhs.org",
            "password": "admin123",
            "role": "admin"
        })
        if response.status_code == 200:
            data = response.json()
            print(f"✓ Admin user created: {data['user']['username']}")
            return data['token']
        else:
            # Try login if user exists
            response = requests.post(f"{API_BASE}/auth/login", json={
                "username": "admin",
                "password": "admin123"
            })
            if response.status_code == 200:
                data = response.json()
                print(f"✓ Logged in as: {data['user']['username']}")
                return data['token']
    except Exception as e:
        print(f"✗ Error creating admin: {e}")
        return None

# Locations data
LOCATIONS = [
    {"name": "Main Office", "address": "110 NE 4th St. Hermiston, OR 97838"},
    {"name": "Annex", "address": "456 E Gladys Ave. Hermiston, OR 97838"},
    {"name": "Arlington Preschool", "address": "Arlington, OR"},
    {"name": "Boardman Preschool", "address": "Boardman, OR"},
    {"name": "Cathy Wamsley Early Learning Center", "address": "Hermiston, OR"},
    {"name": "Condon Preschool", "address": "Condon, OR"},
    {"name": "Enterprise Preschool", "address": "Enterprise, OR"},
    {"name": "Hermiston - Airport Way", "address": "Hermiston, OR"},
    {"name": "Hermiston - HCSR", "address": "Hermiston, OR"},
    {"name": "Hermiston - Victory Square", "address": "Hermiston, OR"},
    {"name": "Irrigon Preschool", "address": "Irrigon, OR"},
    {"name": "John Day Preschool", "address": "John Day, OR"},
    {"name": "Milton-Freewater Preschool", "address": "Milton-Freewater, OR"},
    {"name": "Pendleton Preschool", "address": "Pendleton, OR"},
    {"name": "Umatilla Preschool", "address": "Umatilla, OR"},
    {"name": "Boardman Early Head Start", "address": "Boardman, OR"},
    {"name": "Condon Early Head Start", "address": "Condon, OR"},
    {"name": "Hermiston - CDC", "address": "Hermiston, OR"},
    {"name": "Irrigon Early Head Start", "address": "Irrigon, OR"},
    {"name": "Milton-Freewater Early Head Start", "address": "Milton-Freewater, OR"},
    {"name": "Pendleton High School", "address": "Pendleton, OR"},
    {"name": "Umatilla Center", "address": "Umatilla, OR"},
    {"name": "Stanfield", "address": "Stanfield, OR"},
    {"name": "La Grande", "address": "La Grande, OR"},
    {"name": "Hermiston - FACE", "address": "Hermiston, OR"},
]

# Items data organized by category
ITEMS = [
    # Baby Supplies
    {"name": "Size 1 Diapers", "sku": "DIAPER-1", "category": "Baby Supplies", "unit_price": 35.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Size 2 Diapers (240 per box)", "sku": "DIAPER-2", "category": "Baby Supplies", "unit_price": 40.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Size 3 Diapers (210 per box)", "sku": "DIAPER-3", "category": "Baby Supplies", "unit_price": 40.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Size 4 Diapers (192 per box)", "sku": "DIAPER-4", "category": "Baby Supplies", "unit_price": 40.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Size 5 Diapers (162 per box)", "sku": "DIAPER-5", "category": "Baby Supplies", "unit_price": 40.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Size 6 Diapers (132 per box)", "sku": "DIAPER-6", "category": "Baby Supplies", "unit_price": 40.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Size 7 Diapers (72 per box)", "sku": "DIAPER-7", "category": "Baby Supplies", "unit_price": 40.00, "reorder_level": 3, "overstock_level": 30},
    {"name": "Size 8 Diapers (64 per box)", "sku": "DIAPER-8", "category": "Baby Supplies", "unit_price": 40.00, "reorder_level": 3, "overstock_level": 30},
    {"name": "Diaper Wipes (1200 per box)", "sku": "WIPES-1200", "category": "Baby Supplies", "unit_price": 25.00, "reorder_level": 10, "overstock_level": 100},
    {"name": "Diaper Genie Bags", "sku": "GENIE-BAGS", "category": "Baby Supplies", "unit_price": 15.00, "reorder_level": 5, "overstock_level": 50},

    # Bathroom Supplies
    {"name": "Foaming Hand Soap (6 per case)", "sku": "SOAP-FOAM-6", "category": "Bathroom Supplies", "unit_price": 24.00, "reorder_level": 3, "overstock_level": 30},
    {"name": "Foaming Hand Soap Single", "sku": "SOAP-FOAM-1", "category": "Bathroom Supplies", "unit_price": 4.50, "reorder_level": 10, "overstock_level": 100},
    {"name": "Air Freshener Spray", "sku": "AIR-FRESH", "category": "Bathroom Supplies", "unit_price": 5.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Toilet Seat Covers", "sku": "SEAT-COVER", "category": "Bathroom Supplies", "unit_price": 12.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Sanitary Bags", "sku": "SANITARY-BAG", "category": "Bathroom Supplies", "unit_price": 8.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Toilet Bowl Cleaner", "sku": "TOILET-CLEAN", "category": "Bathroom Supplies", "unit_price": 6.00, "reorder_level": 10, "overstock_level": 100},
    {"name": "Toilet Bowl Cleaning Brush", "sku": "TOILET-BRUSH", "category": "Bathroom Supplies", "unit_price": 8.00, "reorder_level": 5, "overstock_level": 30},

    # Cleaning Materials
    {"name": "Microfiber Cloths 12x12 (Set of 12)", "sku": "CLOTH-12X12", "category": "Cleaning Materials", "unit_price": 15.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Magic Eraser Sponge (Set of 6)", "sku": "ERASER-6", "category": "Cleaning Materials", "unit_price": 12.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Dishes / Cleaning Sponge (Set of 6)", "sku": "SPONGE-6", "category": "Cleaning Materials", "unit_price": 8.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Pumice Stone Sticks, Heavy Duty", "sku": "PUMICE-STONE", "category": "Cleaning Materials", "unit_price": 10.00, "reorder_level": 3, "overstock_level": 30},
    {"name": "Spray Bottle", "sku": "SPRAY-BOTTLE", "category": "Cleaning Materials", "unit_price": 3.00, "reorder_level": 10, "overstock_level": 100},
    {"name": "Mop Head Replacement (6 pack)", "sku": "MOP-HEAD-6", "category": "Cleaning Materials", "unit_price": 25.00, "reorder_level": 3, "overstock_level": 30},
    {"name": "Mop Handle Replacement", "sku": "MOP-HANDLE", "category": "Cleaning Materials", "unit_price": 15.00, "reorder_level": 2, "overstock_level": 20},
    {"name": "Industrial Broom", "sku": "BROOM-IND", "category": "Cleaning Materials", "unit_price": 20.00, "reorder_level": 2, "overstock_level": 20},
    {"name": "Industrial Mop", "sku": "MOP-IND", "category": "Cleaning Materials", "unit_price": 25.00, "reorder_level": 2, "overstock_level": 20},
    {"name": "Broom & Dust Pan Set (Household)", "sku": "BROOM-SET", "category": "Cleaning Materials", "unit_price": 12.00, "reorder_level": 5, "overstock_level": 30},

    # Cleaning Products
    {"name": "Nutra Care Floor Cleaner (4 gal/case)", "sku": "FLOOR-CLEAN-4G", "category": "Cleaning Products", "unit_price": 45.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Hand Sanitizer Bottles", "sku": "SANITIZER", "category": "Cleaning Products", "unit_price": 8.00, "reorder_level": 20, "overstock_level": 200},
    {"name": "Cleaning / Disinfectant Wipes", "sku": "DISINFECT-WIPE", "category": "Cleaning Products", "unit_price": 15.00, "reorder_level": 10, "overstock_level": 100},
    {"name": "Bleach, Gallon", "sku": "BLEACH-GAL", "category": "Cleaning Products", "unit_price": 5.00, "reorder_level": 10, "overstock_level": 100},
    {"name": "Dawn / Ajax Dish Soap", "sku": "DISH-SOAP", "category": "Cleaning Products", "unit_price": 4.00, "reorder_level": 10, "overstock_level": 100},
    {"name": "Carpet Cleaning Solution", "sku": "CARPET-CLEAN", "category": "Cleaning Products", "unit_price": 20.00, "reorder_level": 5, "overstock_level": 50},

    # Paper Products
    {"name": "Toilet Paper (96 rolls per case)", "sku": "TP-96", "category": "Paper Products", "unit_price": 45.00, "reorder_level": 10, "overstock_level": 100},
    {"name": "Trifold Paper Towels (16 pkgs per case)", "sku": "TOWEL-TRI-16", "category": "Paper Products", "unit_price": 40.00, "reorder_level": 10, "overstock_level": 100},
    {"name": "Centerpull Paper Towels", "sku": "TOWEL-CENTER", "category": "Paper Products", "unit_price": 35.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Facial Tissue Box (30 boxes per case)", "sku": "TISSUE-30", "category": "Paper Products", "unit_price": 30.00, "reorder_level": 10, "overstock_level": 100},
    {"name": "Exam Table Paper (12 pkgs per case)", "sku": "EXAM-PAPER-12", "category": "Paper Products", "unit_price": 50.00, "reorder_level": 3, "overstock_level": 30},

    # Trash Bags
    {"name": "Small Trash Bags (500 per box)", "sku": "TRASH-SM-500", "category": "Trash Bags", "unit_price": 25.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Large Trash Bags (150 per box)", "sku": "TRASH-LG-150", "category": "Trash Bags", "unit_price": 30.00, "reorder_level": 5, "overstock_level": 50},

    # Office Supplies - Batteries
    {"name": "Batteries, AA", "sku": "BATT-AA", "category": "Office - Batteries", "unit_price": 15.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Batteries, AAA", "sku": "BATT-AAA", "category": "Office - Batteries", "unit_price": 15.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Batteries, C", "sku": "BATT-C", "category": "Office - Batteries", "unit_price": 18.00, "reorder_level": 3, "overstock_level": 30},
    {"name": "Batteries, D", "sku": "BATT-D", "category": "Office - Batteries", "unit_price": 18.00, "reorder_level": 3, "overstock_level": 30},

    # Office Supplies - Paper
    {"name": "Copy Paper (10 reams per case)", "sku": "PAPER-COPY-10", "category": "Office - Paper", "unit_price": 50.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Legal Paper (reams)", "sku": "PAPER-LEGAL", "category": "Office - Paper", "unit_price": 8.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Index Cards (white 3 in x 5 in)", "sku": "INDEX-3X5", "category": "Office - Paper", "unit_price": 5.00, "reorder_level": 10, "overstock_level": 100},
    {"name": "Index Cards (white 4 in x 6 in)", "sku": "INDEX-4X6", "category": "Office - Paper", "unit_price": 6.00, "reorder_level": 10, "overstock_level": 100},

    # Office Supplies - Pens/Pencils
    {"name": "#2 Pencils", "sku": "PENCIL-2", "category": "Office - Writing", "unit_price": 10.00, "reorder_level": 10, "overstock_level": 100},
    {"name": "Black Pens", "sku": "PEN-BLACK", "category": "Office - Writing", "unit_price": 12.00, "reorder_level": 10, "overstock_level": 100},
    {"name": "Blue Pens", "sku": "PEN-BLUE", "category": "Office - Writing", "unit_price": 12.00, "reorder_level": 10, "overstock_level": 100},
    {"name": "Red Pens", "sku": "PEN-RED", "category": "Office - Writing", "unit_price": 12.00, "reorder_level": 5, "overstock_level": 50},

    # Gloves
    {"name": "Small Nitrile Gloves (1000 per case)", "sku": "GLOVE-NIT-S-1000", "category": "Gloves", "unit_price": 80.00, "reorder_level": 3, "overstock_level": 30},
    {"name": "Medium Nitrile Gloves (1000 per case)", "sku": "GLOVE-NIT-M-1000", "category": "Gloves", "unit_price": 80.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Large Nitrile Gloves (1000 per case)", "sku": "GLOVE-NIT-L-1000", "category": "Gloves", "unit_price": 80.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "X-Large Nitrile Gloves (1000 per case)", "sku": "GLOVE-NIT-XL-1000", "category": "Gloves", "unit_price": 80.00, "reorder_level": 3, "overstock_level": 30},

    # Pantry Items
    {"name": "Variety Coffee Pods", "sku": "COFFEE-VAR", "category": "Pantry", "unit_price": 25.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Dark Roast Coffee Pods", "sku": "COFFEE-DARK", "category": "Pantry", "unit_price": 25.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Hot Chocolate Pods", "sku": "HOTCHOC-POD", "category": "Pantry", "unit_price": 20.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Regular Single Creamers", "sku": "CREAM-REG", "category": "Pantry", "unit_price": 15.00, "reorder_level": 10, "overstock_level": 100},

    # Toothbrushing Supplies
    {"name": "Preschool Toothbrushes (144 per box)", "sku": "TOOTH-PRESCHOOL-144", "category": "Toothbrushing", "unit_price": 30.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Infant/Toddler Toothbrushes (24 per box)", "sku": "TOOTH-INFANT-24", "category": "Toothbrushing", "unit_price": 15.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "Toothpaste (144 tubes)", "sku": "TOOTHPASTE-144", "category": "Toothbrushing", "unit_price": 35.00, "reorder_level": 5, "overstock_level": 50},
    {"name": "3oz Drinking Cups (1200 cups)", "sku": "CUP-3OZ-1200", "category": "Toothbrushing", "unit_price": 20.00, "reorder_level": 5, "overstock_level": 50},
]

def seed_locations(token):
    headers = {"Authorization": f"Bearer {token}"}
    created = 0
    for loc in LOCATIONS:
        try:
            response = requests.post(f"{API_BASE}/locations", json=loc, headers=headers)
            if response.status_code == 200:
                created += 1
                print(f"✓ Created location: {loc['name']}")
            else:
                print(f"✗ Failed to create location {loc['name']}: {response.text}")
        except Exception as e:
            print(f"✗ Error creating location {loc['name']}: {e}")
    print(f"\nTotal locations created: {created}/{len(LOCATIONS)}")

def seed_items(token):
    headers = {"Authorization": f"Bearer {token}"}
    created = 0
    for item in ITEMS:
        try:
            response = requests.post(f"{API_BASE}/items", json=item, headers=headers)
            if response.status_code == 200:
                created += 1
                print(f"✓ Created item: {item['name']}")
            else:
                print(f"✗ Failed to create item {item['name']}: {response.text}")
        except Exception as e:
            print(f"✗ Error creating item {item['name']}: {e}")
    print(f"\nTotal items created: {created}/{len(ITEMS)}")

def main():
    print("=" * 60)
    print("Inventory Tracker - Seed Data Script")
    print("=" * 60)
    print()

    print("Step 1: Creating admin user...")
    token = register_admin()
    if not token:
        print("✗ Failed to get authentication token. Exiting.")
        return

    print("\nStep 2: Seeding locations...")
    seed_locations(token)

    print("\nStep 3: Seeding items...")
    seed_items(token)

    print("\n" + "=" * 60)
    print("Seed data completed!")
    print("=" * 60)
    print("\nDefault admin credentials:")
    print("  Username: admin")
    print("  Password: admin123")
    print("\n⚠️  Please change the admin password after first login!")

if __name__ == "__main__":
    main()
