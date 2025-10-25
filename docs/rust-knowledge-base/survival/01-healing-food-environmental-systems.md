# RUST Survival Systems: Healing, Food, Environment & Status Effects

## Health System

### Maximum Health
**Base**: 100 HP
**Cannot exceed**: 100 HP

### Damage Modifiers
**Headshots**: 2-3x damage (varies by weapon)
**Body shots**: 1x damage
**Limb shots**: 0.5-0.75x damage

### Death & Respawn
**Death**: Lose all items on corpse (lootable by anyone)
**Respawn Options**:
1. Random beach spawn
2. Sleeping bags (5-minute cooldown)
3. Beds (2-minute cooldown)
4. Bag gifting (friends can assign bags to you)

## Medical Items & Healing

### Bandages
**Healing**: 5 HP instant
**Bleeding**: Stops up to 50 bleeding
**Use Time**: 5 seconds
**Cost**: 4 cloth

**Pros**:
- Extremely cheap
- Stops bleeding completely
- No blueprint needed

**Cons**:
- Slow healing
- Low HP restore
- Takes time

**Best For**: Early game, stopping bleeds cheaply

### Medical Syringe
**Healing**: 15 HP instant + 20 HP over time (35 total)
**Bleeding**: Does NOT stop bleeding
**Use Time**: ~2.5 seconds
**Cost**: 15 cloth, 10 metal fragments, 10 low-grade fuel

**Pros**:
- Fast usage
- Good total healing
- Can use on other players (right-click them)

**Cons**:
- Doesn't stop bleeding
- More expensive than bandages
- Bleeding damage negates heal-over-time

**Best For**: Combat healing, quick HP recovery

### Large Medkit
**Healing**: 10 HP instant + up to 100 HP over time
**Bleeding**: Stops up to 100 bleeding
**Use Time**: Instant
**Cost**: 2 medical syringes, 10 low-grade fuel

**Pros**:
- Instant usage (use while moving)
- Massive heal over time
- Stops heavy bleeding
- Best healing item

**Cons**:
- Very expensive
- Requires syringes
- Rare/late game

**Best For**: Serious combat, raid defense, critical situations

### Blood Bag
**Effect**: Restores 20 HP + small health regeneration boost
**Rare**: Found in medical crates
**Cannot craft**

**Use**: Backup healing, less common

### Anti-Radiation Pills
**Effect**: Removes radiation poisoning, provides temporary protection
**Duration**: ~60 seconds protection
**Cost**: Rare, mostly found in crates

**Alternative**: Anti-rad tea (crafted from berries)

## Combat Healing Strategy

### Pre-Fight Checklist
- [ ] Full HP
- [ ] Meds in hotbar (not inventory)
- [ ] Bandages accessible
- [ ] Know med count

### During Combat
1. **Get to cover** before healing (don't heal in open)
2. **Prioritize stopping bleeds**: Bandage first if bleeding
3. **Then syringe**: Get HP back up
4. **Retreat if low on meds**: Don't fight without healing

### Optimal Healing Rotation
1. **Take damage + bleeding**: Use bandage (stops bleed)
2. **Immediately after**: Use syringe (restore HP)
3. **Eat food if available**: Passive regen bonus
4. **If critical**: Large medkit (instant, no delay)

### Advanced Tips
- **Pre-heal**: Use syringe before bleed fully stopped (overlapping HoT)
- **Count enemy reloads**: Heal while they reload
- **Heal while moving**: Syringes can be used while running
- **Med spam**: Multiple syringes in quick succession (expensive but works)

## Bleeding Mechanics

### How Bleeding Works
**Cause**: Taking damage from weapons, animals, falls
**Damage**: 20% of damage taken becomes bleed damage
**Tick Rate**: 1 damage every 6 seconds until bleed total is applied

**Example**:
- Take 50 damage → 10 bleed damage
- Bleeds for 60 seconds total (10 damage / 6 seconds each)

### Bleeding Effects
- Interrupts health regeneration
- Interrupts food/comfort healing
- Stacks with other damage
- Shows as red indicator on HP bar

### Stopping Bleeding
**Options**:
1. Bandage (up to 50 bleed)
2. Large medkit (up to 100 bleed)

**Syringes do NOT stop bleeding**

## Food & Hunger System

### Hunger Mechanics
**Maximum**: 500 hunger
**Depletion Rate**: Constant slow drain
**Starvation**: Below 0 hunger = health damage

### Food Items

| Food | Hunger Restored | HP Bonus | Notes |
|------|----------------|----------|-------|
| Cooked Meat | 50 | +5 HP | Best food |
| Raw Meat | 20 | 0 | Can poison |
| Cooked Chicken | 35 | +3 HP | Common |
| Cooked Fish | 30 | +3 HP | Easy to get |
| Pumpkin | 50 | 0 | Farmable |
| Corn | 40 | 0 | Farmable |
| Mushrooms | 10 | +3 HP instant | Great for combat healing |
| Can of Beans | 50 | 0 | Found in crates |
| Can of Tuna | 40 | +5 HP | Found in crates |
| Chocolate Bar | 30 | 0 | Quick snack |

### Mushroom Meta
**Red Mushrooms**: 3 HP instant per mushroom
**Consumption Rate**: 1 per second
**Strategy**: Carry 20+ mushrooms for combat = 60 HP healing, faster than syringes

**Pros**:
- Extremely fast (1/second)
- No craft time
- Cheap (just pick them up)

**Cons**:
- Take inventory space
- Only 3 HP each
- Need many for effectiveness

### Food Poisoning
**Cause**: Eating raw meat, bad mushrooms, spoiled food
**Effect**: Lose HP over time
**Duration**: ~60 seconds
**Treatment**: Wait it out, use meds to counteract HP loss

### Water & Hydration
**Maximum**: 250 hydration
**Depletion**: Constant, faster in hot biomes
**Dehydration**: Below 0 = health damage

**Water Sources**:
- Rivers, lakes, ocean
- Water catchers (collects rain)
- Water bottles (found or crafted)
- Canteen (craftable, reusable)

**Salt Water**: Ocean water gives hydration but also dehydrates faster (net negative)

## Health Regeneration

### Passive Regeneration
**Requirements**:
- Hunger above 50
- Hydration above 50
- Not bleeding
- Not taking damage

**Regeneration Rate**:
- Slow: ~1 HP every few seconds
- Caps at 50 HP (can't regen to full naturally)

### Accelerated Regeneration (Comfort)
**Comfort Bonus**: Speeds up regeneration significantly
**Requirement**: Be near comfort-providing items

**50% Comfort**:
- Campfire
- Furnace
- Barbeque

**100% Comfort**:
- Chair (sit in it)
- Sofa (sit in it)
- Pookie Bear (stand near)
- Bear Skin Rug (stand under head when ceiling-mounted)

**Effect**: Fast HP regen up to 100 HP + slower hunger drain

### Comfort Strategy
**Base Setup**:
1. Place chair in main room
2. Sit while waiting (smelting, crafting, etc.)
3. Heal to full passively
4. Saves meds

**Combat Recovery**:
- Return to base
- Sit in chair
- Heal fully in ~2 minutes
- Much cheaper than meds

## Environmental Effects

### Radiation
**Cause**: Monuments, radioactive zones
**Effect**: HP drain, screen distortion, geiger counter sound
**Intensity**: Varies by monument tier

**Protection**:
- Hazmat suit (best early-mid game): ~50% rad resist
- Anti-radiation pills: Temporary immunity
- Anti-rad tea: Crafted protection

**Monuments by Radiation**:
- **None**: Gas Station, Supermarket, etc.
- **Low**: Harbor, Satellite
- **Medium**: Power Plant, Water Treatment
- **High**: Launch Site, Military Tunnels

### Cold
**Cause**: Snow biome, high altitude, nighttime, wetness
**Effect**: HP drain when below 5°C body temperature
**Scaling**: More cold = faster HP drain

**Protection**:
- Heavy clothing
- Hazmat suit (provides cold protection)
- Coffee Can Helmet
- Being near heat sources (fire, furnace)

**Temperature Mechanics**:
- **Base temp**: Varies by biome
- **Clothing**: Adds insulation
- **Wetness**: Drastically drops temperature
- **Time of day**: Night is colder

**Death by Cold**:
Common in snow biome without proper gear - bring campfire materials

### Wetness
**Cause**: Swimming, rain, snow
**Effect**: Decreases body temperature (makes you colder)
**Threshold**: 50%+ wetness makes even temperate biome dangerous at night

**Drying**:
- Stand near heat source (fire, furnace)
- Wait over time
- Get out of water/rain

### Hot (Overheating)
**Cause**: Desert biome, too much clothing in hot areas
**Effect**: HP drain (rare, less common than cold)
**Solution**: Remove clothing layers, seek shade, drink water

### Weather

#### Rain
**Effect**: Masks footstep sounds (stealth advantage)
**Wetness**: Causes wetness status
**Strategy**: Perfect for sneaky plays, base raids

#### Snow
**Effect**: Same as rain in snow biomes
**Visibility**: Slightly reduced
**Cold**: Increases cold effect

## Status Effects Summary

### Beneficial
- **Comfort**: Faster healing, slower hunger drain
- **Well Fed**: High hunger = passive regen
- **Hydrated**: High water = passive regen

### Detrimental
- **Bleeding**: HP loss over time, stops regen
- **Radiation**: HP drain in rad zones
- **Cold**: HP drain below 5°C
- **Hot**: HP drain when overheating (rare)
- **Hunger**: HP drain when starving
- **Dehydration**: HP drain when no water
- **Wet**: Lowers temperature drastically
- **Food Poisoning**: HP drain over time

## Survival Priorities

### Immediate (First 5 Minutes)
1. **Find cloth**: Make sleeping bag (respawn point)
2. **Find food**: Hunger starts depleting
3. **Find water**: Hydration critical
4. **Get stone tools**: Efficiency increase

### Short Term (First Hour)
1. **Build base**: Shelter = safety
2. **Secure food source**: Hunt animals, farm monuments
3. **Water catcher**: Renewable water
4. **Furnace**: Cook food
5. **Campfire**: Warmth + cooking

### Long Term (Ongoing)
1. **Stockpile food**: 50+ cooked meat
2. **Medical supplies**: 20+ bandages, 10+ syringes
3. **Comfort setup**: Chair in base
4. **Extra sleeping bags**: Spread around map

## Loadout Essentials

### Roaming Loadout
- Weapon + ammo
- 5 medical syringes
- 3-5 bandages
- 10 cooked meat
- 1 water bottle
- Sleeping bag (place before fight)

### Monument Run Loadout
- Hazmat suit (radiation)
- Weapon + 120 rounds
- 10 syringes
- 5 bandages
- Food + water
- Keycard(s) and fuses

### Raid Defense Loadout
- Best armor
- Multiple weapons
- 15+ syringes
- 10 bandages
- 20+ food items
- Large medkits if available

## Pro Survival Tips

1. **Always carry food**: Hunger kills noobs
2. **Place bags everywhere**: Respawn insurance
3. **Comfort heal in base**: Save meds
4. **Mushrooms are OP**: Faster than syringes in combat
5. **Bandage THEN syringe**: Stop bleed first
6. **Water catcher**: Craft early, never worry about water
7. **Hazmat protects from rad AND cold**: Very versatile
8. **Cook meat in furnace**: Faster than campfire
9. **Stock base with meds**: Craft when safe, not during raid
10. **Don't fight while hungry/thirsty**: You're at a disadvantage

## Common Death Causes

1. **Starvation**: Forgot to eat
2. **Cold**: Snow without gear
3. **Bleeding out**: Didn't bandage
4. **Radiation**: Wrong monument without hazmat
5. **Fall damage**: Misjudged jump
6. **Animals**: Bears/wolves when undergeared
7. **Dehydration**: Forgot water in desert
8. **Food poisoning**: Ate raw meat

**Avoid These**: Preparation and awareness prevents 90% of environmental deaths

## Healing Efficiency Chart

| Situation | Best Healing Method | Why |
|-----------|-------------------|-----|
| Combat (actively fighting) | Mushrooms or Syringe | Fast usage |
| Post-combat bleeding | Bandage → Syringe → Food | Stops bleed, restores HP, regen |
| Base recovery | Sit in chair + food | Free, passive |
| Emergency low HP | Large Medkit | Instant, massive HoT |
| Chip damage | Food + wait | Cheap, effective |
| Constant fighting | Syringe spam | Fast repeated healing |

## Conclusion

**Master these survival systems to stay alive longer, fight better, and dominate RUST. Most new player deaths are from survival mistakes, not PVP.**
