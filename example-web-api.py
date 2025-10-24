#!/usr/bin/env python3
"""
Example: Simple Flask API to serve RUST knowledge base data
"""

from flask import Flask, jsonify
import os

app = Flask(__name__)

KB_PATH = "/home/user/rust/rust-knowledge-base"

@app.route('/api/weapons')
def get_weapons():
    """Return weapon tier list"""
    try:
        with open(f"{KB_PATH}/combat/01-weapons-tier-list-2025.md", 'r') as f:
            content = f.read()
        return jsonify({"status": "success", "data": content})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

@app.route('/api/monuments')
def get_monuments():
    """Return monument guide"""
    try:
        with open(f"{KB_PATH}/monuments/01-monument-guide-overview.md", 'r') as f:
            content = f.read()
        return jsonify({"status": "success", "data": content})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

@app.route('/api/raid-cost/<material>/<method>')
def get_raid_cost(material, method):
    """Calculate raid cost"""
    costs = {
        "stone": {"c4": 4400, "rockets": 5600},
        "sheet_metal": {"c4": 8800, "rockets": 11200},
        "armored": {"c4": 17600, "rockets": 21000}
    }
    
    if material in costs and method in costs[material]:
        return jsonify({
            "material": material,
            "method": method,
            "sulfur": costs[material][method]
        })
    return jsonify({"error": "Invalid material or method"}), 400

if __name__ == '__main__':
    print("\n🌐 RUST Knowledge Base API")
    print("Available endpoints:")
    print("  http://localhost:5000/api/weapons")
    print("  http://localhost:5000/api/monuments")
    print("  http://localhost:5000/api/raid-cost/stone/c4")
    print("  http://localhost:5000/api/raid-cost/armored/rockets")
    # app.run(debug=True)  # Uncomment to run server

print("\n✅ Example API created (run with: python3 example-web-api.py)")
