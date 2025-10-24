# How to Use the RUST Knowledge Base

## 📍 Location
```
/home/user/rust/rust-knowledge-base/
```

## 🎯 Quick Access Methods

### 1. **Browse with Your Code Editor**
Open in VS Code, Vim, or any text editor:
```bash
cd /home/user/rust/rust-knowledge-base
code .  # VS Code
vim README.md  # Vim
```

### 2. **Command Line Lookups**

#### View a Guide
```bash
# Read the README
cat rust-knowledge-base/README.md

# View weapon guide
less rust-knowledge-base/combat/01-weapons-tier-list-2025.md

# View monument guide
cat rust-knowledge-base/monuments/01-monument-guide-overview.md
```

#### Search for Information
```bash
# Find raid costs
grep -r "sulfur" rust-knowledge-base/building/ --include="*.md"

# Find all mentions of AK-47
grep -r "AK-47" rust-knowledge-base/ --include="*.md"

# Search for specific monument
grep -r "Launch Site" rust-knowledge-base/ --include="*.md" -A 3

# Find force wipe schedule
grep -r "force wipe" rust-knowledge-base/ --include="*.md" -i
```

### 3. **Interactive Helper Script**
Use the helper script I created:
```bash
bash /home/user/rust/rust-helper.sh
```

Options:
1. How much sulfur for raid?
2. Best weapons for PVP?
3. When is force wipe?
4. Best monument for scrap?
5. How to heal in combat?

## 💻 For Development

### **Python Module**
Use the Python module for programmatic access:
```python
from example_simple_api import RustKnowledgeBase

kb = RustKnowledgeBase()

# Get raid costs
sulfur = kb.get_raid_cost('stone_wall', 'c4')
print(f"Need {sulfur} sulfur")

# Get force wipe info
wipe = kb.get_force_wipe_info()
print(wipe['day'])

# Get top weapons
weapons = kb.get_top_weapons("S")

# Search knowledge base
files = kb.search("Launch Site")
```

### **Build Your Own Tools**

#### 1. Raid Calculator
```python
# See: /home/user/rust/example-raid-calculator.py
# Calculate raid costs for any structure
```

#### 2. Monument Router
```python
# See: /home/user/rust/example-monument-router.py
# Recommend optimal farming routes
```

#### 3. Discord Bot
```python
import discord
from example_simple_api import RustKnowledgeBase

kb = RustKnowledgeBase()

@bot.command()
async def raid_cost(ctx, material, method):
    cost = kb.get_raid_cost(f"{material}_wall", method)
    await ctx.send(f"Cost: {cost} sulfur")

@bot.command()
async def wipe(ctx):
    info = kb.get_force_wipe_info()
    await ctx.send(f"Next wipe: {info['day']} at {info['time_est']}")
```

#### 4. Web Dashboard
```html
<!-- Simple HTML interface -->
<!DOCTYPE html>
<html>
<head><title>RUST Helper</title></head>
<body>
    <h1>RUST Knowledge Base</h1>
    <select id="material">
        <option>stone_wall</option>
        <option>sheet_metal_wall</option>
        <option>armored_wall</option>
    </select>
    <button onclick="calculateRaid()">Calculate</button>
    <div id="result"></div>

    <script>
        // Fetch data from your Python API or JSON
        // Display knowledge base info
    </script>
</body>
</html>
```

## 🎮 Gameplay Use Cases

### **Before Wipe Day**
1. **Choose Server**: Read `servers/01-wipe-cycles-server-types.md`
2. **Plan Base**: Review `building/02-base-designs-raid-defense.md`
3. **Monument Route**: Study `monuments/01-monument-guide-overview.md`
4. **Tech Tree Priority**: Check `core-mechanics/01-progression-system.md`

### **During Gameplay**
Quick terminal searches while playing:
```bash
# Quick raid cost lookup
grep "Stone Wall" rust-knowledge-base/building/*.md

# Find best farming route
grep -A 10 "Low-Risk Route" rust-knowledge-base/monuments/*.md

# Check weapon stats
grep -A 5 "Thompson" rust-knowledge-base/combat/*.md

# Healing strategy
grep -A 8 "Combat Healing" rust-knowledge-base/survival/*.md
```

### **Planning a Raid**
```bash
# Calculate total sulfur needed
grep "Raid Costs" rust-knowledge-base/building/01-building-tiers-and-upgrade.md -A 20

# Best explosives to use
grep -B 2 "most efficient" rust-knowledge-base/building/*.md
```

## 🔧 Integration Ideas

### **1. Streaming Overlay**
- Display force wipe countdown
- Show raid costs on screen
- Monument timer tracker

### **2. Practice Tools**
- Quiz yourself on weapon stats
- Test monument routes
- Base design challenges

### **3. Team Coordination**
- Share loadout plans
- Assign monument farming roles
- Plan raid strategies

### **4. Content Creation**
- Use as reference for guides
- Create infographics from data
- Make tutorial videos

## 📊 Example Queries

### "How much to raid a sheet metal base?"
```bash
grep -i "sheet metal wall" rust-knowledge-base/building/01-building-tiers-and-upgrade.md -A 5
```
**Answer**: 8,800 sulfur (4 C4 - most efficient)

### "What's the best early game weapon?"
```bash
grep -A 30 "Early Game" rust-knowledge-base/combat/01-weapons-tier-list-2025.md
```
**Answer**: Python (revolver) or Thompson

### "When is next force wipe?"
```bash
grep -i "force wipe" rust-knowledge-base/README.md -A 3
```
**Answer**: First Thursday of every month, 2:00 PM EST

### "Best monument for solo scrap farming?"
```bash
grep -A 10 "Low-Risk" rust-knowledge-base/monuments/01-monument-guide-overview.md
```
**Answer**: Underground Tunnels (800-1,000/hr, safest)

## 🚀 Advanced Usage

### **Create a CLI Tool**
```bash
#!/bin/bash
# rust-query.sh - Quick RUST knowledge lookup

case "$1" in
    "wipe")
        grep -A 2 "Force Wipe Schedule" rust-knowledge-base/README.md
        ;;
    "raid")
        grep "Raid Costs" rust-knowledge-base/README.md -A 5
        ;;
    "weapon")
        grep "$2" rust-knowledge-base/combat/01-weapons-tier-list-2025.md -A 10
        ;;
    *)
        echo "Usage: rust-query.sh [wipe|raid|weapon <name>]"
        ;;
esac
```

### **Export to JSON**
```python
# Convert markdown to structured JSON
import json

def md_to_json(filepath):
    # Parse markdown
    # Extract tables and data
    # Output JSON
    pass

# Create JSON API endpoints
```

### **Mobile App Data**
```json
{
    "raid_costs": {
        "stone_wall": {"c4": 4400, "rockets": 5600},
        "sheet_metal_wall": {"c4": 8800, "rockets": 11200}
    },
    "force_wipe": {
        "schedule": "First Thursday monthly",
        "time_est": "2:00 PM"
    },
    "top_weapons": ["AK-47", "LR-300", "Bolt Action"]
}
```

## 📝 Contributing to the Knowledge Base

### **Update Guides**
When game updates change mechanics:
```bash
cd rust-knowledge-base
vim combat/01-weapons-tier-list-2025.md
# Make changes
git add .
git commit -m "Update weapon stats for patch X.X"
git push
```

### **Add New Guides**
```bash
# Create new guide
touch rust-knowledge-base/electricity/01-circuits-guide.md

# Follow existing format
# Add to README.md structure
# Commit and push
```

## 🎯 Recommended Workflow

1. **First Time Setup**: Read README.md cover-to-cover
2. **Before Each Wipe**: Review relevant guides for your plan
3. **During Gameplay**: Quick terminal searches as needed
4. **After Sessions**: Update personal notes, plan next session
5. **Build Tools**: Use KB data to create calculators and helpers

## 🔗 Quick Links

| Need | File | Command |
|------|------|---------|
| Raid costs | building/01-building-tiers-and-upgrade.md | `cat rust-knowledge-base/building/01-building-tiers-and-upgrade.md` |
| Weapon stats | combat/01-weapons-tier-list-2025.md | `cat rust-knowledge-base/combat/01-weapons-tier-list-2025.md` |
| Monument guide | monuments/01-monument-guide-overview.md | `cat rust-knowledge-base/monuments/01-monument-guide-overview.md` |
| Force wipe | servers/01-wipe-cycles-server-types.md | `cat rust-knowledge-base/servers/01-wipe-cycles-server-types.md` |
| Healing | survival/01-healing-food-environmental-systems.md | `cat rust-knowledge-base/survival/01-healing-food-environmental-systems.md` |

## ⚡ Pro Tips

1. **Create aliases** for frequent lookups:
```bash
alias rust-wipe="grep -i 'force wipe' rust-knowledge-base/README.md"
alias rust-raid="cat rust-knowledge-base/building/01-building-tiers-and-upgrade.md | grep -A 30 'Raid Costs'"
```

2. **Bookmark key sections** in your editor

3. **Print quick reference sheets** for your desk

4. **Use dual monitors**: KB on one screen, game on the other

5. **Share with teammates**: Everyone on same knowledge base

---

**You now have everything you need to dominate RUST! The knowledge base is your strategic advantage. Use it wisely!** 🎮🔥
