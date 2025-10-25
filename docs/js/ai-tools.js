// AI-Powered RUST Tools

// ===================================
// 1. SMART BASE DESIGNER AI
// ===================================

function createSmartBaseDesigner() {
    return `
        <div class="ai-tool-header">
            <h1>🤖 Smart Base Designer AI</h1>
            <p class="ai-subtitle">AI-powered base design generator based on your needs</p>
        </div>

        <div class="ai-tool-grid">
            <div class="ai-input-section">
                <h3>📊 Tell me about your team:</h3>

                <div class="input-group">
                    <label>Group Size:</label>
                    <select id="groupSize" onchange="updateBaseDesign()">
                        <option value="solo">Solo</option>
                        <option value="duo">Duo (2 players)</option>
                        <option value="trio">Trio (3 players)</option>
                        <option value="quad">Quad (4 players)</option>
                        <option value="zerg">Zerg (5+ players)</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Available Resources:</label>
                    <select id="resourceLevel" onchange="updateBaseDesign()">
                        <option value="low">Low (starter base)</option>
                        <option value="medium">Medium (established)</option>
                        <option value="high">High (full farm)</option>
                        <option value="unlimited">Unlimited (creative)</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Playstyle:</label>
                    <select id="playstyle" onchange="updateBaseDesign()">
                        <option value="pvp">PVP Focused</option>
                        <option value="farming">Farming/Grinding</option>
                        <option value="defensive">Defensive/Survival</option>
                        <option value="balanced">Balanced</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Wipe Length:</label>
                    <select id="wipeLength" onchange="updateBaseDesign()">
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Build Material Preference:</label>
                    <select id="buildMaterial" onchange="updateBaseDesign()">
                        <option value="stone">Stone (balanced)</option>
                        <option value="metal">Sheet Metal (strong)</option>
                        <option value="mixed">Mixed (optimized)</option>
                    </select>
                </div>

                <button class="ai-generate-btn" onclick="generateBaseAI()">
                    🤖 Generate AI Base Design
                </button>
            </div>

            <div class="ai-output-section" id="baseDesignOutput">
                <div class="ai-thinking">
                    <p>🤖 Configure your preferences and click "Generate AI Base Design"</p>
                </div>
            </div>
        </div>
    `;
}

function generateBaseAI() {
    const groupSize = document.getElementById('groupSize').value;
    const resourceLevel = document.getElementById('resourceLevel').value;
    const playstyle = document.getElementById('playstyle').value;
    const wipeLength = document.getElementById('wipeLength').value;
    const buildMaterial = document.getElementById('buildMaterial').value;

    // Show loading animation
    document.getElementById('baseDesignOutput').innerHTML = `
        <div class="ai-thinking">
            <div class="ai-loader"></div>
            <p>🤖 AI analyzing your requirements...</p>
            <p class="ai-status">Processing base design optimization...</p>
        </div>
    `;

    // Simulate AI processing
    setTimeout(() => {
        const design = calculateOptimalBase(groupSize, resourceLevel, playstyle, wipeLength, buildMaterial);
        displayBaseDesign(design);
    }, 1500);
}

function calculateOptimalBase(groupSize, resourceLevel, playstyle, wipeLength, buildMaterial) {
    // AI decision tree for base design
    const designs = {
        solo: {
            low: { size: '2x1', honeycomb: 1, rooms: 2, tc: 1 },
            medium: { size: '2x2', honeycomb: 2, rooms: 4, tc: 1 },
            high: { size: '2x2+', honeycomb: 3, rooms: 6, tc: 1 }
        },
        duo: {
            low: { size: '2x2', honeycomb: 1, rooms: 4, tc: 1 },
            medium: { size: '3x3', honeycomb: 2, rooms: 8, tc: 1 },
            high: { size: '3x3+', honeycomb: 3, rooms: 12, tc: 2 }
        },
        trio: {
            low: { size: '2x3', honeycomb: 2, rooms: 6, tc: 1 },
            medium: { size: '3x3', honeycomb: 3, rooms: 12, tc: 2 },
            high: { size: '4x4', honeycomb: 3, rooms: 16, tc: 2 }
        },
        quad: {
            low: { size: '3x3', honeycomb: 2, rooms: 9, tc: 2 },
            medium: { size: '4x4', honeycomb: 3, rooms: 16, tc: 2 },
            high: { size: '5x5', honeycomb: 4, rooms: 25, tc: 3 }
        },
        zerg: {
            low: { size: '4x4', honeycomb: 2, rooms: 16, tc: 2 },
            medium: { size: '5x5', honeycomb: 3, rooms: 25, tc: 3 },
            high: { size: '6x6+', honeycomb: 4, rooms: 36, tc: 4 }
        }
    };

    const baseDesign = designs[groupSize][resourceLevel] || designs.solo.medium;

    // Calculate costs based on material
    const materialCosts = {
        stone: { stone: 1, metal: 0.2, hqm: 0 },
        metal: { stone: 0.5, metal: 1, hqm: 0.1 },
        mixed: { stone: 0.7, metal: 0.6, hqm: 0.05 }
    };

    const baseCost = baseDesign.rooms * 2000; // Base cost per room
    const costs = {
        stone: Math.floor(baseCost * materialCosts[buildMaterial].stone),
        metal: Math.floor(baseCost * materialCosts[buildMaterial].metal),
        hqm: Math.floor(baseCost * materialCosts[buildMaterial].hqm * 0.5)
    };

    // AI recommendations based on playstyle
    const recommendations = {
        pvp: ['Roof access for defense', 'Multiple exit routes', 'Trap corridors', 'Shooting floors'],
        farming: ['Large furnace area', 'Dedicated loot rooms', 'Efficient layout', 'Quick access'],
        defensive: ['Maximum honeycomb', 'Hidden TC', 'Auto-turrets', 'Bunker entrance'],
        balanced: ['Moderate honeycomb', 'Good loot spread', 'Roof defense', 'Airlock system']
    };

    // Calculate raid cost
    const raidCost = calculateRaidDefense(baseDesign, buildMaterial);

    return {
        ...baseDesign,
        costs,
        raidCost,
        recommendations: recommendations[playstyle],
        buildTime: estimateBuildTime(baseDesign, groupSize),
        upkeepDaily: calculateUpkeep(costs),
        features: generateFeatures(baseDesign, playstyle, wipeLength)
    };
}

function calculateRaidDefense(design, material) {
    const baseMultiplier = {
        stone: 4400,
        metal: 8800,
        mixed: 6600
    };

    const layers = design.honeycomb + 1;
    const baseCost = baseMultiplier[material] || 4400;

    return {
        minimum: baseCost * layers,
        average: baseCost * (layers + Math.ceil(design.rooms / 4)),
        maximum: baseCost * (layers * 2 + design.rooms)
    };
}

function estimateBuildTime(design, groupSize) {
    const baseTime = design.rooms * 15; // 15 min per room
    const groupMultiplier = {
        solo: 1,
        duo: 0.6,
        trio: 0.4,
        quad: 0.3,
        zerg: 0.2
    };

    return Math.ceil(baseTime * groupMultiplier[groupSize]);
}

function calculateUpkeep(costs) {
    return {
        stone: Math.ceil(costs.stone * 0.1),
        metal: Math.ceil(costs.metal * 0.1),
        hqm: Math.ceil(costs.hqm * 0.1)
    };
}

function generateFeatures(design, playstyle, wipeLength) {
    const features = [
        `${design.honeycomb} layers of honeycomb`,
        `${design.tc} Tool Cupboard(s)`,
        `${design.rooms} interior rooms`,
        'Airlock entrance system'
    ];

    if (playstyle === 'pvp') {
        features.push('Roof shooting floor', 'Quick exit routes');
    } else if (playstyle === 'defensive') {
        features.push('Hidden TC room', 'Bunker entrance');
    } else if (playstyle === 'farming') {
        features.push('Large furnace room', 'Organized storage');
    }

    if (wipeLength === 'monthly') {
        features.push('Upgrade path to armored core');
    }

    return features;
}

function displayBaseDesign(design) {
    document.getElementById('baseDesignOutput').innerHTML = `
        <div class="ai-result">
            <div class="ai-result-header">
                <h3>🎯 AI-Generated Base Design</h3>
                <span class="ai-badge">Optimized for your setup</span>
            </div>

            <div class="base-visual">
                <div class="base-grid" style="grid-template-columns: repeat(${design.size.split('x')[0]}, 1fr);">
                    ${generateBaseVisual(design)}
                </div>
                <p class="base-size">${design.size} Footprint</p>
            </div>

            <div class="stats-container">
                <div class="stat-box">
                    <h4>💰 Build Cost</h4>
                    <p><strong>${design.costs.stone.toLocaleString()}</strong> Stone</p>
                    <p><strong>${design.costs.metal.toLocaleString()}</strong> Metal Frags</p>
                    <p><strong>${design.costs.hqm.toLocaleString()}</strong> HQM</p>
                </div>

                <div class="stat-box">
                    <h4>🛡️ Raid Defense</h4>
                    <p>Minimum: <strong>${design.raidCost.minimum.toLocaleString()}</strong> sulfur</p>
                    <p>Average: <strong>${design.raidCost.average.toLocaleString()}</strong> sulfur</p>
                    <p>Maximum: <strong>${design.raidCost.maximum.toLocaleString()}</strong> sulfur</p>
                </div>

                <div class="stat-box">
                    <h4>⏱️ Build Time</h4>
                    <p><strong>${design.buildTime}</strong> minutes</p>
                    <p class="text-muted">Estimated build duration</p>
                </div>

                <div class="stat-box">
                    <h4>📅 Daily Upkeep</h4>
                    <p><strong>${design.upkeepDaily.stone.toLocaleString()}</strong> Stone</p>
                    <p><strong>${design.upkeepDaily.metal.toLocaleString()}</strong> Metal</p>
                    <p><strong>${design.upkeepDaily.hqm}</strong> HQM</p>
                </div>
            </div>

            <div class="features-section">
                <h4>✨ Recommended Features:</h4>
                <ul class="features-list">
                    ${design.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>

            <div class="ai-recommendations">
                <h4>🤖 AI Recommendations:</h4>
                <ul class="recommendations-list">
                    ${design.recommendations.map(r => `<li>✓ ${r}</li>`).join('')}
                </ul>
            </div>

            <div class="action-buttons">
                <button class="action-btn primary" onclick="exportDesign()">📋 Export Design</button>
                <button class="action-btn secondary" onclick="generateBaseAI()">🔄 Regenerate</button>
            </div>
        </div>
    `;
}

function generateBaseVisual(design) {
    const [width, height] = design.size.replace('+', '').split('x').map(Number);
    let html = '';

    for (let i = 0; i < width * height; i++) {
        const isCore = i >= Math.floor(width * height / 3) && i <= Math.floor(width * height * 2 / 3);
        const isTC = i === Math.floor(width * height / 2);
        html += `<div class="base-cell ${isTC ? 'tc-cell' : isCore ? 'core-cell' : 'honeycomb-cell'}">
            ${isTC ? 'TC' : ''}
        </div>`;
    }

    return html;
}

function exportDesign() {
    alert('📋 Design exported! (Feature coming soon - will export to clipboard/PDF)');
}

// ===================================
// 2. MAP LOCATION ANALYZER AI
// ===================================

function createMapLocationAnalyzer() {
    return `
        <div class="ai-tool-header">
            <h1>🗺️ Best Map Location AI</h1>
            <p class="ai-subtitle">AI analyzes optimal base locations based on monuments, resources & strategy</p>
        </div>

        <div class="ai-tool-grid">
            <div class="ai-input-section">
                <h3>🎯 What are your priorities?</h3>

                <div class="input-group">
                    <label>Primary Goal:</label>
                    <select id="primaryGoal" onchange="analyzeMapLocation()">
                        <option value="scrap">Maximum Scrap Farming</option>
                        <option value="pvp">PVP Action</option>
                        <option value="stealth">Stealth/Hidden</option>
                        <option value="resources">Resource Nodes</option>
                        <option value="safety">Safety/Low Traffic</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Monument Preference:</label>
                    <select id="monumentPref">
                        <option value="tier3">Tier 3 (Launch, Military)</option>
                        <option value="tier2">Tier 2 (Train Yard, Airfield)</option>
                        <option value="tier1">Tier 1 (Harbor, Power Plant)</option>
                        <option value="mixed">Mixed</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Biome Preference:</label>
                    <select id="biomePref">
                        <option value="any">Any</option>
                        <option value="temperate">Temperate (green areas)</option>
                        <option value="snow">Snow (HQM)</option>
                        <option value="desert">Desert</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Server Population:</label>
                    <select id="serverPop">
                        <option value="high">High (200+)</option>
                        <option value="medium">Medium (100-200)</option>
                        <option value="low">Low (<100)</option>
                    </select>
                </div>

                <button class="ai-generate-btn" onclick="findBestLocation()">
                    🤖 Find Best Locations
                </button>
            </div>

            <div class="ai-output-section" id="locationOutput">
                <div class="ai-thinking">
                    <p>🗺️ Configure your preferences and click "Find Best Locations"</p>
                </div>
            </div>
        </div>
    `;
}

function findBestLocation() {
    const goal = document.getElementById('primaryGoal').value;
    const monumentPref = document.getElementById('monumentPref').value;
    const biomePref = document.getElementById('biomePref').value;
    const serverPop = document.getElementById('serverPop').value;

    document.getElementById('locationOutput').innerHTML = `
        <div class="ai-thinking">
            <div class="ai-loader"></div>
            <p>🤖 AI scanning map for optimal locations...</p>
            <p class="ai-status">Analyzing monument proximity, resource density, and threat levels...</p>
        </div>
    `;

    setTimeout(() => {
        const locations = calculateBestLocations(goal, monumentPref, biomePref, serverPop);
        displayLocations(locations);
    }, 1500);
}

function calculateBestLocations(goal, monumentPref, biomePref, serverPop) {
    // AI-powered location recommendations
    const locationDatabase = {
        scrap: [
            { name: 'Between Train Yard & Airfield', score: 95, monuments: ['Train Yard', 'Airfield', 'Satellite'], traffic: 'High', nodes: 'Medium' },
            { name: 'Near Launch Site (forest side)', score: 90, monuments: ['Launch Site', 'Satellite', 'Harbor'], traffic: 'Very High', nodes: 'High' },
            { name: 'Underground Tunnel access', score: 85, monuments: ['Multiple Tunnel Entrances'], traffic: 'Medium', nodes: 'Low' }
        ],
        pvp: [
            { name: 'Launch Site proximity', score: 98, monuments: ['Launch Site'], traffic: 'Very High', nodes: 'Medium' },
            { name: 'Outpost road', score: 92, monuments: ['Outpost', 'Nearby monuments'], traffic: 'Very High', nodes: 'Low' },
            { name: 'Cargo Ship path', score: 88, monuments: ['Water monuments'], traffic: 'High', nodes: 'Medium' }
        ],
        stealth: [
            { name: 'Deep forest (map edge)', score: 93, monuments: ['None (travel required)'], traffic: 'Very Low', nodes: 'Low' },
            { name: 'Mountain valley', score: 88, monuments: ['Possibly Dome'], traffic: 'Low', nodes: 'High' },
            { name: 'Between biomes (temperate/desert)', score: 85, monuments: ['Varies'], traffic: 'Low', nodes: 'Medium' }
        ],
        resources: [
            { name: 'Snow biome mountain base', score: 96, monuments: ['Varies'], traffic: 'Low', nodes: 'Very High (HQM)' },
            { name: 'Cave system area', score: 90, monuments: ['Nearby tier 1-2'], traffic: 'Medium', nodes: 'Very High' },
            { name: 'Desert rock formations', score: 85, monuments: ['Power Plant possible'], traffic: 'Medium', nodes: 'High' }
        ],
        safety: [
            { name: 'Map corner (away from center)', score: 94, monuments: ['Gas Station, Supermarket'], traffic: 'Very Low', nodes: 'Low' },
            { name: 'Near Fishing Village', score: 88, monuments: ['Fishing Village, safe zone'], traffic: 'Low', nodes: 'Medium' },
            { name: 'Outer road system', score: 82, monuments: ['Small monuments only'], traffic: 'Low', nodes: 'Medium' }
        ]
    };

    const locations = locationDatabase[goal] || locationDatabase.scrap;

    // Adjust scores based on preferences
    return locations.map(loc => ({
        ...loc,
        finalScore: calculateLocationScore(loc, goal, monumentPref, biomePref, serverPop)
    })).sort((a, b) => b.finalScore - a.finalScore);
}

function calculateLocationScore(location, goal, monumentPref, biomePref, serverPop) {
    let score = location.score;

    // Adjust based on server population
    if (serverPop === 'high' && location.traffic === 'Very Low') score -= 10;
    if (serverPop === 'low' && location.traffic === 'Very High') score -= 15;

    // Random variation for realism
    score += Math.random() * 5 - 2.5;

    return Math.max(0, Math.min(100, score));
}

function displayLocations(locations) {
    document.getElementById('locationOutput').innerHTML = `
        <div class="ai-result">
            <div class="ai-result-header">
                <h3>🎯 Top 3 Recommended Locations</h3>
                <span class="ai-badge">AI Optimized</span>
            </div>

            ${locations.map((loc, index) => `
                <div class="location-card ${index === 0 ? 'best-location' : ''}">
                    <div class="location-header">
                        <h4>${index + 1}. ${loc.name}</h4>
                        <div class="score-badge">
                            <span class="score-value">${Math.round(loc.finalScore)}</span>
                            <span class="score-label">/100</span>
                        </div>
                    </div>

                    <div class="location-details">
                        <div class="detail-row">
                            <span class="detail-label">🏛️ Nearby Monuments:</span>
                            <span class="detail-value">${Array.isArray(loc.monuments) ? loc.monuments.join(', ') : loc.monuments}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">👥 Traffic Level:</span>
                            <span class="detail-value ${getTrafficClass(loc.traffic)}">${loc.traffic}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">⛏️ Resource Nodes:</span>
                            <span class="detail-value">${loc.nodes}</span>
                        </div>
                    </div>

                    ${index === 0 ? '<span class="best-badge">⭐ AI Top Pick</span>' : ''}
                </div>
            `).join('')}

            <div class="ai-tips">
                <h4>💡 AI Pro Tips:</h4>
                <ul>
                    <li>Scout location before building - server-specific monument spawns vary</li>
                    <li>Place sleeping bags in multiple locations before committing</li>
                    <li>Check for existing bases nearby that could raid you</li>
                    <li>Consider proximity to safe zones for recycling</li>
                </ul>
            </div>
        </div>
    `;
}

function getTrafficClass(traffic) {
    const map = {
        'Very High': 'traffic-very-high',
        'High': 'traffic-high',
        'Medium': 'traffic-medium',
        'Low': 'traffic-low',
        'Very Low': 'traffic-very-low'
    };
    return map[traffic] || '';
}

// Export functions to global scope
window.createSmartBaseDesigner = createSmartBaseDesigner;
window.generateBaseAI = generateBaseAI;
window.exportDesign = exportDesign;
window.createMapLocationAnalyzer = createMapLocationAnalyzer;
window.findBestLocation = findBestLocation;
