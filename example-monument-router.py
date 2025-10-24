#!/usr/bin/env python3
"""
Example: Monument farming route optimizer based on KB data
"""

# Data from monuments/01-monument-guide-overview.md
MONUMENT_ROUTES = {
    "low_risk_beginner": {
        "path": ["Gas Station", "Supermarket", "Mining Outpost"],
        "recycle_at": "Outpost",
        "time_minutes": 15,
        "scrap_estimate": 150,
        "risk": "Very Low",
        "gear_needed": "Basic weapon, no hazmat"
    },
    "medium_risk_balanced": {
        "path": ["Harbor", "Satellite Dish", "Power Plant"],
        "recycle_at": "Safe Zone",
        "time_minutes": 25,
        "scrap_estimate": 400,
        "risk": "Medium",
        "gear_needed": "Hazmat, weapon, meds"
    },
    "high_yield_risky": {
        "path": ["Train Yard", "Airfield", "Water Treatment"],
        "recycle_at": "On-site or safe zone",
        "time_minutes": 40,
        "scrap_estimate": 800,
        "risk": "High - PVP expected",
        "gear_needed": "Full kit, hazmat, extra meds"
    },
    "underground_safe": {
        "path": ["Underground Tunnels (multiple stations)"],
        "recycle_at": "Safe Zone",
        "time_minutes": 25,
        "scrap_estimate": 300,
        "risk": "Low-Medium",
        "gear_needed": "Weapon, low-grade fuel for trains"
    }
}

def recommend_route(playstyle):
    """Recommend farming route based on playstyle"""
    routes = {
        "solo": "low_risk_beginner",
        "duo": "medium_risk_balanced",
        "clan": "high_yield_risky",
        "safe": "underground_safe"
    }
    
    route_key = routes.get(playstyle, "low_risk_beginner")
    route = MONUMENT_ROUTES[route_key]
    
    print(f"\n📍 Recommended Route for {playstyle.upper()}:")
    print(f"   Path: {' → '.join(route['path'])}")
    print(f"   Recycle: {route['recycle_at']}")
    print(f"   Time: ~{route['time_minutes']} minutes")
    print(f"   Scrap: ~{route['scrap_estimate']} scrap")
    print(f"   Risk: {route['risk']}")
    print(f"   Gear: {route['gear_needed']}")

# Example usage
recommend_route("solo")
recommend_route("duo")
recommend_route("clan")
