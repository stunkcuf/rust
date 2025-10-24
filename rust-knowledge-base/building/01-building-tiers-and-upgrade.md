# RUST Building Tiers and Upgrade System

## Building Tier Overview

RUST has **5 building tiers**, each offering increased protection at higher resource costs:
1. **Twig** - Temporary, extremely weak
2. **Wood** - Basic protection, vulnerable to fire
3. **Stone** - Solid mid-game defense
4. **Sheet Metal** - Strong defense, cost-efficient
5. **Armored** - Maximum protection, very expensive

## Tier Details

### Twig Tier
**Purpose**: Temporary placement and building planning

**Characteristics**:
- Extremely low health
- Can be destroyed by melee weapons
- Anyone can destroy twig structures (even without building privilege)
- Default material for all building plan placements
- Decays very quickly
- No defense value

**Cost**: 25-50 wood per piece

**Usage**:
- Initial placement before upgrading
- Temporary structures
- Raiding towers (quick disposable structures)
- Testing base designs

### Wood Tier
**Upgrade Requirements**: Hammer + wood in inventory

**Characteristics**:
- 250 health
- Vulnerable to fire (extremely weak to fire arrows and incendiary)
- Susceptible to melee tools (especially for doors)
- Cheap and renewable resource
- Quick to gather materials

**When to Use**:
- Very early game temporary bases
- Outer aesthetic structures
- Low-value storage sheds
- NOT recommended for main base beyond first hour

**Major Weakness**: Fire damage - fire arrows and incendiary rockets deal massive damage

### Stone Tier
**Upgrade Requirements**: Hammer + stone in inventory

**Characteristics**:
- Significant health increase
- Resistant to melee tools
- Immune to fire damage
- Abundant raw materials (stone nodes everywhere)
- No processing required
- Viable throughout entire game

**Raid Costs** (Stone Wall):
- 4 Rockets (5,600 sulfur)
- 2 C4 (4,400 sulfur) - **most efficient**
- 10 Satchels (4,800 sulfur)

**When to Use**:
- Early to mid-game main bases
- Standard defense layer
- Cost-effective for large bases
- Outer walls and honeycomb

**Pros**:
- Great cost-to-protection ratio
- Materials easy to gather
- No smelting required

### Sheet Metal Tier
**Upgrade Requirements**: Hammer + metal fragments in inventory

**Characteristics**:
- Much higher health than stone
- Best cost/performance ratio
- Requires smelting ore into fragments
- Roughly half the raw materials needed compared to stone
- Shiny metallic appearance (easier to spot at distance)

**Raid Costs** (Sheet Metal Wall):
- 8 Rockets (11,200 sulfur)
- 4 C4 (8,800 sulfur) - **most efficient**
- 23 Satchels (11,040 sulfur)

**Raid Costs** (Sheet Metal Door):
- 1 Rocket + 8 Explo Ammo (1,800 sulfur) - **most efficient**
- 2 C4 (4,400 sulfur)
- 4 Satchels (1,920 sulfur)

**When to Use**:
- Mid to late game main bases
- Inner core protection
- Loot rooms
- High-traffic doorways
- Airlock systems

**Pros**:
- Excellent protection
- Material-efficient (less raw ore needed)
- Difficult to raid through

**Cons**:
- Requires furnace time
- More visible than stone

### Armored Tier
**Upgrade Requirements**: Hammer + High Quality Metal (HQM) in inventory

**Characteristics**:
- Maximum protection available
- Extremely expensive (HQM is rare)
- Most raid-resistant material
- Dark metallic appearance
- Overkill for most applications

**Raid Costs** (Armored Wall):
- 15 Rockets (21,000 sulfur)
- 8 C4 (17,600 sulfur) - **most efficient**
- 60 Satchels (28,800 sulfur)

**Raid Costs** (Armored Door):
- 2 C4 + 35 Explo Ammo (5,275 sulfur) - **most efficient**
- 3 Rockets + 11 Explo Ammo (5,075 sulfur)
- 18 Satchels (8,640 sulfur)

**When to Use**:
- Tool Cupboard protection (ESSENTIAL)
- Most valuable loot rooms only
- Final core of main base
- Small clan bases with abundant HQM

**Resource Requirements**:
- Very high HQM costs
- HQM only from ore nodes in snow/mountains and recycling components
- Time-intensive to gather

## Upgrade Mechanics

### How to Upgrade
1. Equip Building Hammer
2. Look at structure piece
3. **Hold right-click** to open upgrade wheel
4. Select desired tier (must have materials)
5. Release to upgrade

### Upgrade Rules
- **Must upgrade sequentially**: Twig → Wood → Stone → Sheet Metal → Armored
- **Cannot skip tiers**: Can't go directly from Twig to Stone
- **Cannot downgrade**: Once upgraded, cannot revert to lower tier
- **Building Privilege Required**: Must have Tool Cupboard authorization
- **No upgrading while damaged**: Must wait 30 seconds after last damage
- **Materials consumed immediately**: Upgrade happens instantly when materials available

### Upgrade Optimization Tips
1. **Plan before placing**: Place twig everywhere you need, then upgrade in order
2. **Prioritize core**: Upgrade innermost areas first (TC, loot rooms)
3. **Honeycomb progression**:
   - Start: Twig honeycomb
   - Day 1: Wood core, stone honeycomb
   - Day 2: Stone core, sheet metal critical areas
   - Day 3+: Sheet metal core, armored TC/loot rooms
4. **Resource efficiency**:
   - Stone for outer layers/large areas
   - Sheet metal for important pathways
   - Armored only for TC and top-tier loot

## Building Restrictions

### Cannot Upgrade When:
- Under attack (30 seconds since last damage)
- Outside Tool Cupboard range
- Insufficient materials in inventory
- Structure is fully damaged
- Structure is blocked by another object

### Decay System
All tiers decay at different rates when not maintained:
- **Twig**: Extremely fast (hours)
- **Wood**: Fast (few days)
- **Stone**: Moderate (4-5 days)
- **Sheet Metal**: Slow (8+ days)
- **Armored**: Very slow (12+ days)

**Prevent Decay**: Keep Tool Cupboard stocked with materials

## Meta Strategies (2025)

### Early Wipe (First Day)
- Twig starter → Wood → Stone quickly
- Stone honeycomb minimum
- Focus on TC protection and expansion

### Mid Wipe (Days 2-3)
- Upgrade core to sheet metal
- Stone outer walls sufficient
- Armored TC room if possible

### Late Wipe (Day 4+)
- Full sheet metal if possible
- Armored TC room and main loot
- Stone acceptable for outer honeycomb (cost vs. benefit)

### Solo/Duo Strategy
- Stone base with sheet metal core
- Armored TC only
- Keep base small and fully upgraded
- Better to have small sheet metal than large stone

### Clan Strategy
- Can afford full sheet metal compounds
- Multiple armored TC rooms
- Focus on layered defense

## Cost Comparison Table

| Material | Wall Cost | Door Cost | Relative Strength | Raid Cost (Sulfur) |
|----------|-----------|-----------|-------------------|-------------------|
| Twig | 25-50 Wood | 25 Wood | 1x | 0 (melee) |
| Wood | 300 Wood | 300 Wood | 3x | ~100 (fire) |
| Stone | 300 Stone | 300 Stone | 10x | 4,400 |
| Sheet Metal | 200 Frags | 200 Frags | 25x | 8,800 |
| Armored | 25 HQM | 25 HQM | 50x | 17,600 |

## Pro Tips

1. **Always armored TC**: Most important upgrade - prevents cheap TC destroy
2. **Sheet metal airlocks**: Prevents door camping and melee breaking
3. **Stone is viable**: Don't feel pressured to full sheet metal - stone works
4. **Upgrade during downtimes**: Upgrade while waiting for furnaces or crafting
5. **Prepare materials first**: Pre-smelt metal before starting sheet metal upgrades
6. **External TCs for large builds**: Use multiple TCs for massive compounds
7. **Check building blocked**: Ensure you're in TC range before attempting upgrades
8. **Honeycomb patterns**: Triangles and hexagons maximize raid cost per material used
