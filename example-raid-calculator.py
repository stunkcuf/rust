#!/usr/bin/env python3
"""
Example: Using the knowledge base data for a raid calculator
"""

# Raid costs from building/01-building-tiers-and-upgrade.md
RAID_COSTS = {
    "stone_wall": {
        "c4": {"amount": 2, "sulfur": 4400},
        "rockets": {"amount": 4, "sulfur": 5600},
        "satchels": {"amount": 10, "sulfur": 4800}
    },
    "sheet_metal_wall": {
        "c4": {"amount": 4, "sulfur": 8800},
        "rockets": {"amount": 8, "sulfur": 11200},
        "satchels": {"amount": 23, "sulfur": 11040}
    },
    "armored_wall": {
        "c4": {"amount": 8, "sulfur": 17600},
        "rockets": {"amount": 15, "sulfur": 21000},
        "satchels": {"amount": 60, "sulfur": 28800}
    },
    "sheet_metal_door": {
        "c4": {"amount": 2, "sulfur": 4400},
        "rockets": {"amount": 2, "sulfur": 2800},  # 1 rocket + 8 explo = 1800 (better)
        "optimal": {"method": "1 Rocket + 8 Explo Ammo", "sulfur": 1800}
    },
    "armored_door": {
        "c4": {"amount": 3, "sulfur": 6600},
        "optimal": {"method": "2 C4 + 35 Explo Ammo", "sulfur": 5275}
    }
}

def calculate_raid(target, method="c4"):
    """Calculate raid costs based on knowledge base data"""
    if target not in RAID_COSTS:
        return f"Unknown target: {target}"
    
    costs = RAID_COSTS[target]
    if method not in costs:
        method = "c4"  # default
    
    result = costs[method]
    return f"To raid {target} with {method}: {result['amount']} {method} = {result['sulfur']} sulfur"

# Example usage
print(calculate_raid("stone_wall", "c4"))
print(calculate_raid("armored_wall", "rockets"))
print(calculate_raid("sheet_metal_door", "c4"))
