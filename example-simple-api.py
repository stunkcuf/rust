#!/usr/bin/env python3
"""
Example: Simple Python module to access RUST knowledge base
(No external dependencies needed)
"""

import os
import re

KB_PATH = "/home/user/rust/rust-knowledge-base"

class RustKnowledgeBase:
    def __init__(self, kb_path=KB_PATH):
        self.kb_path = kb_path
    
    def get_raid_cost(self, material, method="c4"):
        """Get raid cost for specific material"""
        costs = {
            "stone_wall": {"c4": 4400, "rockets": 5600, "satchels": 4800},
            "sheet_metal_wall": {"c4": 8800, "rockets": 11200, "satchels": 11040},
            "armored_wall": {"c4": 17600, "rockets": 21000, "satchels": 28800}
        }
        return costs.get(material, {}).get(method, "Unknown")
    
    def get_force_wipe_info(self):
        """Get force wipe schedule"""
        return {
            "day": "First Thursday of every month",
            "time_est": "2:00 PM EST",
            "time_gmt": "7:00 PM GMT",
            "time_pst": "11:00 AM PST"
        }
    
    def get_top_weapons(self, tier="S"):
        """Get top tier weapons"""
        weapons = {
            "S": ["AK-47", "LR-300", "Bolt Action", "M249"],
            "A": ["Thompson", "MP5", "M39", "Python"],
            "B": ["SAR", "Custom SMG", "Double Barrel"]
        }
        return weapons.get(tier, [])
    
    def search(self, term):
        """Search all files for a term"""
        results = []
        for root, dirs, files in os.walk(self.kb_path):
            for file in files:
                if file.endswith('.md'):
                    filepath = os.path.join(root, file)
                    with open(filepath, 'r') as f:
                        content = f.read()
                        if term.lower() in content.lower():
                            results.append(filepath)
        return results

# Example usage
if __name__ == "__main__":
    kb = RustKnowledgeBase()
    
    print("🎮 RUST Knowledge Base Module\n")
    
    print("1. Raid Cost (Stone Wall with C4):")
    print(f"   {kb.get_raid_cost('stone_wall', 'c4')} sulfur\n")
    
    print("2. Force Wipe Info:")
    wipe = kb.get_force_wipe_info()
    print(f"   {wipe['day']}")
    print(f"   Time: {wipe['time_est']}\n")
    
    print("3. Top S-Tier Weapons:")
    for weapon in kb.get_top_weapons("S"):
        print(f"   • {weapon}")
    
    print("\n4. Search for 'monument':")
    results = kb.search("Launch Site")
    print(f"   Found in {len(results)} files")

