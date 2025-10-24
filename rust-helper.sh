#!/bin/bash
# Interactive RUST Knowledge Base Helper

KB_PATH="/home/user/rust/rust-knowledge-base"

echo "🎮 RUST Knowledge Base Helper"
echo "=============================="
echo ""
echo "Quick searches:"
echo ""
echo "1. How much sulfur for raid?"
echo "2. Best weapons for PVP?"
echo "3. When is force wipe?"
echo "4. Best monument for scrap?"
echo "5. How to heal in combat?"
echo ""
read -p "Enter number (or search term): " choice

case $choice in
    1)
        echo -e "\n📊 RAID COSTS (Most Efficient):"
        grep -A 1 "Most Efficient Method" "$KB_PATH/README.md" | grep -v "^--$"
        ;;
    2)
        echo -e "\n⚔️  TOP WEAPONS (S-Tier):"
        grep -A 5 "Top Weapons (S-Tier)" "$KB_PATH/README.md"
        ;;
    3)
        echo -e "\n📅 FORCE WIPE SCHEDULE:"
        grep -A 2 "Force Wipe Schedule" "$KB_PATH/README.md" | head -5
        ;;
    4)
        echo -e "\n💰 BEST SCRAP METHODS:"
        grep -A 6 "Highest Scrap/Hour Methods" "$KB_PATH/README.md"
        ;;
    5)
        echo -e "\n❤️  COMBAT HEALING:"
        grep -B 2 -A 8 "Combat Healing Strategy" "$KB_PATH/survival/01-healing-food-environmental-systems.md" | head -15
        ;;
    *)
        echo -e "\n🔍 Searching for: '$choice'"
        grep -r -i "$choice" "$KB_PATH" --include="*.md" -n | head -10
        ;;
esac
