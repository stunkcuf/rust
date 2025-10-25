// RUST Knowledge Base - Main App

const KB_BASE_PATH = 'rust-knowledge-base';
let allGuides = [];
let searchIndex = [];

// Guide metadata
const guides = {
    'overview': {
        title: 'Overview',
        path: 'rust-knowledge-base/README.md',
        category: 'General'
    },
    'core-mechanics/01-progression-system': {
        title: 'Progression System',
        path: 'rust-knowledge-base/core-mechanics/01-progression-system.md',
        category: 'Core Mechanics'
    },
    'building/01-building-tiers-and-upgrade': {
        title: 'Building Tiers & Upgrades',
        path: 'rust-knowledge-base/building/01-building-tiers-and-upgrade.md',
        category: 'Building'
    },
    'building/02-base-designs-raid-defense': {
        title: 'Base Designs & Raid Defense',
        path: 'rust-knowledge-base/building/02-base-designs-raid-defense.md',
        category: 'Building'
    },
    'combat/01-weapons-tier-list-2025': {
        title: 'Weapons & Combat Guide 2025',
        path: 'rust-knowledge-base/combat/01-weapons-tier-list-2025.md',
        category: 'Combat'
    },
    'monuments/01-monument-guide-overview': {
        title: 'Monuments Guide',
        path: 'rust-knowledge-base/monuments/01-monument-guide-overview.md',
        category: 'Monuments'
    },
    'resources/01-resource-gathering-guide': {
        title: 'Resource Gathering',
        path: 'rust-knowledge-base/resources/01-resource-gathering-guide.md',
        category: 'Resources'
    },
    'servers/01-wipe-cycles-server-types': {
        title: 'Servers & Wipe Cycles',
        path: 'rust-knowledge-base/servers/01-wipe-cycles-server-types.md',
        category: 'Servers'
    },
    'survival/01-healing-food-environmental-systems': {
        title: 'Survival & Healing',
        path: 'rust-knowledge-base/survival/01-healing-food-environmental-systems.md',
        category: 'Survival'
    }
};

// Quick reference data
const quickData = {
    'force-wipe': {
        title: '⏰ Force Wipe Schedule',
        content: `
# Force Wipe Schedule

**When:** First Thursday of every month
**Time:** 2:00 PM EST / 7:00 PM GMT / 11:00 AM PST

## What Gets Wiped
- All player buildings and items
- All deployed items and storage
- All sleeping bags and beds
- Fresh map generation

## What Persists
- Learned blueprints (unless BP wipe announced)
- Player stats and reputation (varies by server)

## Next Steps
After wipe, rush to:
1. Secure sleeping bag placement
2. Build starter base
3. Farm scrap for workbench
4. Research key items
        `
    },
    'raid-costs': {
        title: '💣 Raid Costs Quick Reference',
        content: `
# Raid Costs (Most Efficient Methods)

## Walls

| Material | Best Method | Sulfur Cost |
|----------|-------------|-------------|
| **Twig** | Melee weapon | 0 |
| **Wood** | Fire arrows | ~100 |
| **Stone** | 2 C4 | 4,400 |
| **Sheet Metal** | 4 C4 | 8,800 |
| **Armored** | 8 C4 | 17,600 |

## Doors

| Material | Best Method | Sulfur Cost |
|----------|-------------|-------------|
| **Wood** | Melee weapon | 0 |
| **Sheet Metal** | 1 Rocket + 8 Explo Ammo | 1,800 |
| **Armored** | 2 C4 + 35 Explo Ammo | 5,275 |

## Explosive Costs

- **C4:** 2,200 sulfur each
- **Rocket:** 1,400 sulfur each
- **Satchel:** 480 sulfur each
- **63 Explosive Ammo:** 1,575 sulfur (= 1 rocket equivalent)

## Quick Calculate
- Small 2x2 stone base: ~8,000-12,000 sulfur
- Medium 3x3 sheet metal: ~20,000-30,000 sulfur
- Large clan compound: 50,000+ sulfur
        `
    },
    'top-weapons': {
        title: '⚔️ Top Weapons (2025 Meta)',
        content: `
# Top Weapons Tier List

## S-Tier (Best)

### AK-47 (Assault Rifle)
- **Damage:** 30
- **Pros:** Best versatility, excellent at all ranges
- **Cons:** Hardest recoil, requires mastery
- **Attachments:** Muzzle brake essential

### LR-300 Assault Rifle
- **Damage:** 25 (5 less than AK)
- **Pros:** Much easier recoil, faster fire rate
- **Cons:** Cannot craft (crate only)

### Bolt Action Rifle
- **Damage:** 80 (one-shot headshot potential)
- **Pros:** Dominates long range
- **Cons:** Single shot, useless close range

### M249 (LMG)
- **Damage:** 30
- **Mag:** 100 rounds
- **Pros:** Squad wiper, devastating DPS
- **Cons:** Cannot craft, heavy recoil

## A-Tier (Strong)

- **Thompson:** Best budget weapon, easy recoil
- **MP5:** 30-round mag, very controllable
- **M39 Rifle:** Semi-auto, 45 damage, accurate
- **Python Revolver:** Best early-game handgun

## Progression Path

1. **Early:** Python, Double Barrel
2. **Mid:** Thompson, SAR
3. **Late:** AK, Bolt Action, LR-300
        `
    },
    'scrap-farming': {
        title: '💰 Best Scrap Farming Methods',
        content: `
# Best Scrap Farming Routes (2025)

## Highest Yield Methods

### 1. Underwater Labs (3,000 scrap/hour)
- **Risk:** High
- **Group:** Squads/Clans
- **Gear:** Submarine or diving tank, full kit
- **Notes:** Best overall but requires team

### 2. Launch Site + Scrap Tea (2,000+ scrap/hour)
- **Risk:** Very High
- **Group:** Solo possible, duo better
- **Gear:** Hazmat, weapons, meds, scrap tea
- **Notes:** Highest solo yield, expect PVP

### 3. Train Yard + Scrap Tea (1,500 scrap/hour)
- **Risk:** High
- **Group:** Solo/Duo
- **Gear:** Hazmat, weapon, scrap tea
- **Notes:** Balanced risk/reward

### 4. Military Tunnels (1,200 scrap/hour)
- **Risk:** High
- **Group:** Duo/Trio
- **Gear:** Full kit, meds
- **Notes:** High value per run

### 5. Underground Tunnels (800-1,000 scrap/hour)
- **Risk:** Low-Medium
- **Group:** Solo
- **Gear:** Basic weapon, low-grade fuel
- **Notes:** Safest consistent farming

## Low-Risk Beginner Route
**Path:** Gas Station → Supermarket → Mining Outpost
- **Time:** 15 minutes
- **Scrap:** 150-200
- **Risk:** Very Low
- **Recycle:** Outpost (safe zone)

## Pro Tips
1. **Always use Scrap Tea:** +50% scrap from all sources
2. **Recycle at safe zones:** Outpost/Bandit Camp
3. **Place bags near monuments:** Respawn if killed
4. **Farm during off-hours:** Less competition
        `
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeSearch();
    initializeQuickActions();
    initializeTools();

    // Load default content
    const hash = window.location.hash.slice(1);
    if (hash && guides[hash]) {
        loadGuide(hash);
    }
});

// Navigation
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.guide-category');
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const guideKey = e.currentTarget.dataset.guide;
            loadGuide(guideKey);

            // Update active state
            navButtons.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');

            // Update URL
            window.location.hash = guideKey;
        });
    });
}

// Load guide
async function loadGuide(guideKey) {
    const contentArea = document.getElementById('contentArea');
    const searchResults = document.getElementById('searchResults');

    // Hide search results
    searchResults.style.display = 'none';

    // Show loading
    contentArea.innerHTML = '<div class="loading">Loading guide</div>';

    try {
        const guide = guides[guideKey];
        if (!guide) {
            throw new Error('Guide not found');
        }

        const response = await fetch(guide.path);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const markdown = await response.text();
        const html = marked.parse(markdown);

        contentArea.innerHTML = html;

        // Scroll to top
        contentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });

    } catch (error) {
        console.error('Error loading guide:', error);
        contentArea.innerHTML = `
            <div class="error">
                <h2>⚠️ Error Loading Guide</h2>
                <p>Could not load the requested guide. Please try again.</p>
                <p class="error-detail">${error.message}</p>
            </div>
        `;
    }
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    let searchTimeout;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();

        if (query.length < 2) {
            document.getElementById('searchResults').style.display = 'none';
            return;
        }

        searchTimeout = setTimeout(() => performSearch(query), 300);
    });
}

async function performSearch(query) {
    const searchResults = document.getElementById('searchResults');
    const searchResultsList = document.getElementById('searchResultsList');
    const contentArea = document.getElementById('contentArea');

    // Build search index if not built
    if (searchIndex.length === 0) {
        await buildSearchIndex();
    }

    // Search
    const results = searchIndex.filter(item =>
        item.content.toLowerCase().includes(query.toLowerCase()) ||
        item.title.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length === 0) {
        searchResultsList.innerHTML = '<p>No results found.</p>';
        searchResults.style.display = 'block';
        return;
    }

    // Display results
    searchResultsList.innerHTML = results.slice(0, 10).map(result => `
        <div class="search-result-item" onclick="loadGuide('${result.guide}')">
            <h3>${result.title}</h3>
            <p>${result.preview}...</p>
            <small>${result.category}</small>
        </div>
    `).join('');

    contentArea.style.display = 'none';
    searchResults.style.display = 'block';
}

async function buildSearchIndex() {
    for (const [key, guide] of Object.entries(guides)) {
        try {
            const response = await fetch(guide.path);
            const content = await response.text();

            // Create searchable chunks
            const sections = content.split(/\n##\s+/);
            sections.forEach((section, idx) => {
                if (section.trim()) {
                    const lines = section.split('\n');
                    const title = lines[0].replace(/^#\s+/, '');
                    const preview = lines.slice(1, 3).join(' ').substring(0, 150);

                    searchIndex.push({
                        guide: key,
                        title: idx === 0 ? guide.title : title,
                        category: guide.category,
                        content: section,
                        preview: preview
                    });
                }
            });
        } catch (error) {
            console.error(`Error indexing ${key}:`, error);
        }
    }
}

// Quick actions
function initializeQuickActions() {
    const quickLinks = document.querySelectorAll('[data-action]');
    quickLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const action = e.currentTarget.dataset.action;
            showQuickRef(action);
        });
    });
}

function showQuickRef(action) {
    const data = quickData[action];
    if (!data) return;

    const contentArea = document.getElementById('contentArea');
    const searchResults = document.getElementById('searchResults');

    searchResults.style.display = 'none';
    contentArea.innerHTML = marked.parse(data.content);

    // Scroll to top
    contentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Tools
function initializeTools() {
    const toolLinks = document.querySelectorAll('[data-tool]');
    toolLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const tool = e.currentTarget.dataset.tool;
            showTool(tool);
        });
    });
}

function showTool(tool) {
    const contentArea = document.getElementById('contentArea');
    const searchResults = document.getElementById('searchResults');

    searchResults.style.display = 'none';

    let toolHTML = '';

    switch(tool) {
        case 'raid-calculator':
            toolHTML = createRaidCalculator();
            break;
        case 'monument-router':
            toolHTML = createMonumentRouter();
            break;
        case 'wipe-timer':
            toolHTML = createWipeTimer();
            break;
    }

    contentArea.innerHTML = toolHTML;
}

function createRaidCalculator() {
    return `
        <h1>💣 Raid Calculator</h1>
        <div class="tool-container">
            <div class="tool-section">
                <label>Structure Type:</label>
                <select id="structureType" onchange="calculateRaid()">
                    <option value="stone_wall">Stone Wall</option>
                    <option value="sheet_metal_wall">Sheet Metal Wall</option>
                    <option value="armored_wall">Armored Wall</option>
                    <option value="sheet_metal_door">Sheet Metal Door</option>
                    <option value="armored_door">Armored Door</option>
                </select>
            </div>

            <div class="tool-section">
                <label>Explosive Type:</label>
                <select id="explosiveType" onchange="calculateRaid()">
                    <option value="c4">C4</option>
                    <option value="rockets">Rockets</option>
                    <option value="satchels">Satchels</option>
                </select>
            </div>

            <div class="tool-section">
                <label>Quantity:</label>
                <input type="number" id="quantity" value="1" min="1" onchange="calculateRaid()">
            </div>

            <div id="raidResult" class="tool-result"></div>
        </div>
        <script>calculateRaid();</script>
    `;
}

function calculateRaid() {
    const costs = {
        stone_wall: { c4: 2, rockets: 4, satchels: 10, sulfur_c4: 4400, sulfur_rocket: 5600, sulfur_satchel: 4800 },
        sheet_metal_wall: { c4: 4, rockets: 8, satchels: 23, sulfur_c4: 8800, sulfur_rocket: 11200, sulfur_satchel: 11040 },
        armored_wall: { c4: 8, rockets: 15, satchels: 60, sulfur_c4: 17600, sulfur_rocket: 21000, sulfur_satchel: 28800 },
        sheet_metal_door: { c4: 2, rockets: 2, satchels: 4, sulfur_c4: 4400, sulfur_rocket: 2800, sulfur_satchel: 1920 },
        armored_door: { c4: 3, rockets: 4, satchels: 18, sulfur_c4: 6600, sulfur_rocket: 5600, sulfur_satchel: 8640 }
    };

    const structure = document.getElementById('structureType')?.value || 'stone_wall';
    const explosive = document.getElementById('explosiveType')?.value || 'c4';
    const quantity = parseInt(document.getElementById('quantity')?.value) || 1;

    const data = costs[structure];
    const explosivesNeeded = data[explosive] * quantity;
    const sulfurNeeded = data[`sulfur_${explosive}`] * quantity;

    const resultDiv = document.getElementById('raidResult');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <h3>Results:</h3>
            <p><strong>${explosivesNeeded}</strong> ${explosive.toUpperCase()}</p>
            <p><strong>${sulfurNeeded.toLocaleString()}</strong> Sulfur</p>
            <p><strong>${Math.ceil(sulfurNeeded / 1000)}</strong> stacks of Sulfur Ore (stacks of 1000)</p>
        `;
    }
}

function createMonumentRouter() {
    return `
        <h1>🗺️ Monument Route Planner</h1>
        <div class="tool-container">
            <div class="tool-section">
                <label>Playstyle:</label>
                <select id="playstyle" onchange="recommendRoute()">
                    <option value="solo">Solo (Low Risk)</option>
                    <option value="duo">Duo (Medium Risk)</option>
                    <option value="clan">Clan (High Yield)</option>
                    <option value="safe">Safe Farming</option>
                </select>
            </div>

            <div id="routeResult" class="tool-result"></div>
        </div>
        <script>recommendRoute();</script>
    `;
}

function recommendRoute() {
    const routes = {
        solo: { path: 'Gas Station → Supermarket → Mining Outpost', time: 15, scrap: 150, risk: 'Very Low' },
        duo: { path: 'Harbor → Satellite Dish → Power Plant', time: 25, scrap: 400, risk: 'Medium' },
        clan: { path: 'Train Yard → Airfield → Water Treatment', time: 40, scrap: 800, risk: 'High' },
        safe: { path: 'Underground Tunnels (multiple stations)', time: 25, scrap: 300, risk: 'Low-Medium' }
    };

    const playstyle = document.getElementById('playstyle')?.value || 'solo';
    const route = routes[playstyle];

    const resultDiv = document.getElementById('routeResult');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <h3>Recommended Route:</h3>
            <p><strong>Path:</strong> ${route.path}</p>
            <p><strong>Time:</strong> ~${route.time} minutes</p>
            <p><strong>Scrap:</strong> ~${route.scrap} scrap</p>
            <p><strong>Risk:</strong> ${route.risk}</p>
        `;
    }
}

function createWipeTimer() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    // Find next first Thursday
    let nextWipe = new Date(currentYear, currentMonth, 1);

    // Find first Thursday of current month
    while (nextWipe.getDay() !== 4) {
        nextWipe.setDate(nextWipe.getDate() + 1);
    }

    // If we've passed it, go to next month
    if (now > nextWipe) {
        nextWipe = new Date(currentYear, currentMonth + 1, 1);
        while (nextWipe.getDay() !== 4) {
            nextWipe.setDate(nextWipe.getDate() + 1);
        }
    }

    // Set time to 2 PM EST (14:00)
    nextWipe.setHours(14, 0, 0, 0);

    const diff = nextWipe - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return `
        <h1>⏰ Force Wipe Timer</h1>
        <div class="tool-container">
            <div class="wipe-timer">
                <h2>Next Force Wipe:</h2>
                <p class="wipe-date">${nextWipe.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p class="wipe-time">2:00 PM EST / 7:00 PM GMT / 11:00 AM PST</p>
                <div class="countdown">
                    <h3>${days} days, ${hours} hours</h3>
                </div>
            </div>

            <div class="wipe-info">
                <h3>What to Expect:</h3>
                <ul>
                    <li>✓ All buildings and items wiped</li>
                    <li>✓ Fresh map generation</li>
                    <li>✓ Blueprints persist (unless BP wipe announced)</li>
                    <li>✓ High server population on wipe day</li>
                </ul>
            </div>
        </div>

        <style>
            .wipe-timer {
                background: var(--bg);
                padding: 2rem;
                border-radius: 12px;
                text-align: center;
                margin-bottom: 2rem;
            }
            .wipe-date {
                font-size: 1.5rem;
                color: var(--primary);
                font-weight: 600;
                margin: 1rem 0;
            }
            .countdown {
                background: var(--primary);
                color: white;
                padding: 1.5rem;
                border-radius: 8px;
                margin-top: 1rem;
            }
            .countdown h3 {
                font-size: 2rem;
                margin: 0;
            }
            .wipe-info {
                background: var(--bg);
                padding: 1.5rem;
                border-radius: 12px;
            }
            .wipe-info ul {
                list-style: none;
                padding: 0;
            }
            .wipe-info li {
                padding: 0.5rem 0;
                font-size: 1.1rem;
            }
        </style>
    `;
}

// Expose global functions
window.loadGuide = loadGuide;
window.showQuickRef = showQuickRef;
window.calculateRaid = calculateRaid;
window.recommendRoute = recommendRoute;
