// AI-Powered RUST Tools - ENHANCED VERSION

// ===================================
// 1. SMART BASE DESIGNER AI - ENHANCED
// ===================================

function createSmartBaseDesigner() {
    return `
        <div class="ai-tool-header">
            <h1>🤖 Smart Base Designer AI</h1>
            <p class="ai-subtitle">Get custom base designs with visual layouts and detailed room breakdowns</p>
        </div>

        <div class="ai-tool-grid">
            <div class="ai-input-section">
                <h3>📊 Configure Your Base:</h3>

                <div class="input-group">
                    <label>Group Size:</label>
                    <select id="groupSize">
                        <option value="solo">Solo</option>
                        <option value="duo">Duo (2 players)</option>
                        <option value="trio" selected>Trio (3 players)</option>
                        <option value="quad">Quad (4 players)</option>
                        <option value="zerg">Zerg (5+ players)</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Server Type:</label>
                    <select id="serverType">
                        <option value="vanilla">Vanilla</option>
                        <option value="2x" selected>2x</option>
                        <option value="5x">5x</option>
                        <option value="10x">10x</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Base Type:</label>
                    <select id="baseType">
                        <option value="bunker">Bunker Base</option>
                        <option value="tower">Tower Base</option>
                        <option value="compound">Compound</option>
                        <option value="cave">Cave Base</option>
                        <option value="2x2">Classic 2x2</option>
                        <option value="multi">Multi-TC Fortress</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Priority:</label>
                    <select id="priority">
                        <option value="defense">Max Defense</option>
                        <option value="pvp">PVP Focus</option>
                        <option value="farming">Farming/Storage</option>
                        <option value="balanced" selected>Balanced</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Wipe Length:</label>
                    <select id="wipeLength">
                        <option value="weekly">Weekly</option>
                        <option value="biweekly" selected>Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>

                <button class="ai-generate-btn" onclick="generateAdvancedBase()">
                    🤖 Generate Custom Base Design
                </button>
            </div>

            <div class="ai-output-section" id="baseDesignOutput">
                <div class="ai-thinking">
                    <p>🤖 Configure your preferences and generate a custom base design</p>
                    <p style="color: #888; margin-top: 10px;">Each design includes visual layout, room breakdown, and defense strategy</p>
                </div>
            </div>
        </div>
    `;
}

function generateAdvancedBase() {
    const groupSize = document.getElementById('groupSize').value;
    const serverType = document.getElementById('serverType').value;
    const baseType = document.getElementById('baseType').value;
    const priority = document.getElementById('priority').value;
    const wipeLength = document.getElementById('wipeLength').value;

    document.getElementById('baseDesignOutput').innerHTML = `
        <div class="ai-thinking">
            <div class="ai-loader"></div>
            <p>🤖 AI analyzing optimal base design...</p>
            <p class="ai-status">Processing ${baseType} layout for ${groupSize} on ${serverType}...</p>
        </div>
    `;

    setTimeout(() => {
        const design = generateDetailedBase(groupSize, serverType, baseType, priority, wipeLength);
        displayAdvancedBase(design);
    }, 1800);
}

function generateDetailedBase(groupSize, serverType, baseType, priority, wipeLength) {
    const baseTemplates = {
        bunker: {
            name: "Bunker Base",
            layout: [
                ["█", "█", "█", "█", "█"],
                ["█", "L", "A", "T", "█"],
                ["█", "S", "TC", "S", "█"],
                ["█", "F", "E", "F", "█"],
                ["█", "█", "█", "█", "█"]
            ],
            rooms: ["TC Room", "Loot Room", "Airlock", "Furnace x2", "Storage x2", "Trap Floor", "Exit Bunker"],
            features: ["Shooting floor roof", "Hidden bunker entrance", "Auto-turret placement", "Roof access via twig"],
            description: "Compact defensible base with bunker entrance for offline protection"
        },
        tower: {
            name: "Tower Base",
            layout: [
                ["█", "█", "█"],
                ["█", "S", "█"],
                ["█", "TC", "█"],
                ["█", "L", "█"],
                ["█", "F", "█"],
                ["█", "E", "█"],
                ["█", "█", "█"]
            ],
            rooms: ["Ground: Airlock", "Floor 1: TC + Trap", "Floor 2: Loot Room", "Floor 3: Furnaces", "Floor 4: Storage", "Roof: Sniper Nest"],
            features: ["360° roof defense", "Multiple floors for loot spread", "Easy to build vertically", "Quick roof access"],
            description: "Vertical design for height advantage and 360-degree defense"
        },
        compound: {
            name: "Compound Design",
            layout: [
                ["█", "█", "█", "█", "█", "█", "█"],
                ["█", "S", "L", "█", "F", "F", "█"],
                ["█", "█", "█", "█", "█", "█", "█"],
                ["█", "TC", "█", "E", "█", "S", "█"],
                ["█", "█", "█", "█", "█", "█", "█"],
                ["█", "L", "L", "█", "T", "T", "█"],
                ["█", "█", "█", "█", "█", "█", "█"]
            ],
            rooms: ["Main TC Building", "Loot Building x2", "Furnace Building", "Storage Building", "Garage/Trap Building", "External TCs"],
            features: ["Multiple buildings", "Compound walls", "Vehicle storage", "Separated loot for raid defense"],
            description: "Multi-building compound for large groups with separated loot"
        },
        cave: {
            name: "Cave Base",
            layout: [
                ["~", "~", "█", "█", "█", "~", "~"],
                ["~", "█", "E", "A", "S", "█", "~"],
                ["█", "█", "TC", "█", "L", "█", "█"],
                ["█", "F", "F", "█", "L", "S", "█"],
                ["~", "█", "T", "█", "█", "█", "~"],
                ["~", "~", "█", "█", "~", "~", "~"]
            ],
            rooms: ["Natural Cave Entrance", "TC Deep Inside", "Loot Rooms x2", "Furnace Area", "Storage", "Trap Tunnel"],
            features: ["Natural cave protection", "Hard to raid foundation", "Multiple angles", "Cave-specific defenses"],
            description: "Built inside natural cave for maximum protection"
        },
        "2x2": {
            name: "Classic 2x2",
            layout: [
                ["█", "█", "█", "█"],
                ["█", "TC", "L", "█"],
                ["█", "S", "F", "█"],
                ["█", "█", "█", "█"]
            ],
            rooms: ["Core: TC + Loot", "Core: Storage + Furnace", "Honeycomb All Around", "Roof with Shooting Floor"],
            features: ["Simple and efficient", "Easy to honeycomb", "Quick to build", "Classic meta design"],
            description: "Time-tested 2x2 design - simple, effective, easy to build"
        },
        multi: {
            name: "Multi-TC Fortress",
            layout: [
                ["█", "█", "█", "█", "█", "█", "█", "█"],
                ["█", "TC", "L", "█", "█", "S", "F", "█"],
                ["█", "█", "█", "█", "█", "█", "█", "█"],
                ["█", "█", "█", "█", "█", "█", "█", "█"],
                ["█", "T", "TC", "█", "█", "L", "TC", "█"],
                ["█", "█", "█", "█", "█", "█", "█", "█"],
                ["█", "█", "█", "█", "█", "█", "█", "█"],
                ["█", "F", "S", "█", "█", "L", "S", "█"],
                ["█", "█", "█", "█", "█", "█", "█", "█"]
            ],
            rooms: ["3x TC Buildings", "6x Loot Rooms", "4x Storage", "3x Furnace Areas", "2x Trap Areas", "Multiple Airlocks"],
            features: ["Spread loot across multiple TCs", "Massive raid cost", "Multiple respawn points", "Redundant systems"],
            description: "Massive fortress with multiple TCs for maximum security"
        }
    };

    const template = baseTemplates[baseType];

    // Calculate costs based on server type and group size
    const serverMultipliers = { vanilla: 1, "2x": 0.5, "5x": 0.2, "10x": 0.1 };
    const baseCosts = {
        bunker: { stone: 45000, metal: 8000, hqm: 500 },
        tower: { stone: 35000, metal: 6000, hqm: 300 },
        compound: { stone: 95000, metal: 15000, hqm: 1200 },
        cave: { stone: 25000, metal: 5000, hqm: 200 },
        "2x2": { stone: 30000, metal: 5000, hqm: 250 },
        multi: { stone: 150000, metal: 25000, hqm: 2000 }
    };

    const groupMultiplier = { solo: 0.6, duo: 0.8, trio: 1, quad: 1.3, zerg: 1.8 };
    const multiplier = serverMultipliers[serverType] * groupMultiplier[groupSize];

    const costs = {
        stone: Math.floor(baseCosts[baseType].stone * multiplier),
        metal: Math.floor(baseCosts[baseType].metal * multiplier),
        hqm: Math.floor(baseCosts[baseType].hqm * multiplier),
        wood: Math.floor(20000 * multiplier)
    };

    // Raid costs
    const raidCostBase = {
        bunker: 60000,
        tower: 45000,
        compound: 120000,
        cave: 35000,
        "2x2": 40000,
        multi: 200000
    };

    const priorityFeatures = {
        defense: ["Extra honeycomb layer", "Armored TC room", "Hidden loot rooms", "Auto-turret positions"],
        pvp: ["Roof access ladders", "Shooting floors", "Quick gear rooms", "Peek downs"],
        farming: ["Large furnace base", "Organized storage", "Quick box access", "Sorting system"],
        balanced: ["Standard honeycomb", "Good loot spread", "Roof defense", "Efficient layout"]
    };

    const buildTimes = { bunker: 90, tower: 60, compound: 150, cave: 70, "2x2": 45, multi: 240 };
    const upkeepCosts = { bunker: 3500, tower: 2800, compound: 7500, cave: 2000, "2x2": 2500, multi: 12000 };

    return {
        ...template,
        costs,
        raidCost: Math.floor(raidCostBase[baseType] * multiplier * 1.2),
        buildTime: Math.floor(buildTimes[baseType] / groupMultiplier[groupSize]),
        upkeep: Math.floor(upkeepCosts[baseType] * multiplier),
        priorityFeatures: priorityFeatures[priority],
        wipeLength,
        serverType,
        groupSize
    };
}

function displayAdvancedBase(design) {
    const layoutHTML = design.layout.map(row =>
        `<div class="base-row">${row.map(cell => {
            const cellClass = cell === '█' ? 'wall' : cell === '~' ? 'empty' : 'room';
            return `<div class="base-cell ${cellClass}" title="${getCellName(cell)}">${cell}</div>`;
        }).join('')}</div>`
    ).join('');

    document.getElementById('baseDesignOutput').innerHTML = `
        <div class="base-design-result">
            <div class="design-header">
                <h2>🏗️ ${design.name}</h2>
                <p class="design-desc">${design.description}</p>
                <div class="design-badges">
                    <span class="badge">${design.groupSize.toUpperCase()}</span>
                    <span class="badge">${design.serverType}</span>
                    <span class="badge">${design.wipeLength}</span>
                </div>
            </div>

            <div class="design-layout">
                <h3>📐 Base Layout</h3>
                <div class="base-grid">
                    ${layoutHTML}
                </div>
                <div class="layout-legend">
                    <span><strong>█</strong> = Wall/Honeycomb</span>
                    <span><strong>TC</strong> = Tool Cupboard</span>
                    <span><strong>L</strong> = Loot Room</span>
                    <span><strong>S</strong> = Storage</span>
                    <span><strong>F</strong> = Furnace</span>
                    <span><strong>E</strong> = Entrance</span>
                    <span><strong>A</strong> = Airlock</span>
                    <span><strong>T</strong> = Trap</span>
                    <span><strong>~</strong> = Open/Cave</span>
                </div>
            </div>

            <div class="design-rooms">
                <h3>🚪 Room Breakdown</h3>
                <ul class="room-list">
                    ${design.rooms.map(room => `<li>✓ ${room}</li>`).join('')}
                </ul>
            </div>

            <div class="design-features">
                <h3>⚡ Key Features</h3>
                <ul class="feature-list">
                    ${design.features.map(f => `<li>🔹 ${f}</li>`).join('')}
                </ul>
            </div>

            <div class="design-priority">
                <h3>🎯 Priority Optimizations</h3>
                <ul class="feature-list">
                    ${design.priorityFeatures.map(f => `<li>⭐ ${f}</li>`).join('')}
                </ul>
            </div>

            <div class="design-stats">
                <div class="stat-card">
                    <h4>💰 Build Cost</h4>
                    <p>${design.costs.stone.toLocaleString()} Stone<br>
                    ${design.costs.metal.toLocaleString()} Metal Frags<br>
                    ${design.costs.hqm.toLocaleString()} HQM<br>
                    ${design.costs.wood.toLocaleString()} Wood</p>
                </div>
                <div class="stat-card">
                    <h4>🛡️ Raid Cost</h4>
                    <p><strong style="color: #ce422b">${design.raidCost.toLocaleString()}</strong> Sulfur</p>
                    <p>${Math.ceil(design.raidCost / 2200)} C4<br>
                    or ${Math.ceil(design.raidCost / 1400)} Rockets</p>
                </div>
                <div class="stat-card">
                    <h4>⏱️ Build Time</h4>
                    <p><strong>${design.buildTime}</strong> minutes</p>
                    <p>${Math.floor(design.buildTime / 60)}h ${design.buildTime % 60}m estimated</p>
                </div>
                <div class="stat-card">
                    <h4>📅 Daily Upkeep</h4>
                    <p>${design.upkeep.toLocaleString()} resources/day</p>
                    <p>Plan for ${Math.ceil(design.upkeep / 1000)}K per day</p>
                </div>
            </div>

            <div class="design-tips">
                <h3>💡 Pro Tips for This Design</h3>
                <div class="tips-grid">
                    <div class="tip">
                        <strong>Building Priority:</strong>
                        <p>1. Build TC first and honeycomb<br>
                        2. Add airlock and doors<br>
                        3. Build loot rooms<br>
                        4. Add shooting floor/roof</p>
                    </div>
                    <div class="tip">
                        <strong>Defense Setup:</strong>
                        <p>Place auto-turrets at key choke points. Use shotgun traps in airlocks. Keep roof clear for PVP.</p>
                    </div>
                    <div class="tip">
                        <strong>Loot Organization:</strong>
                        <p>Spread valuable items across multiple rooms. Use small boxes for important BPs. Keep boom separate.</p>
                    </div>
                </div>
            </div>

            <button class="ai-generate-btn" onclick="generateAdvancedBase()" style="margin-top: 20px;">
                🔄 Generate New Design
            </button>
        </div>
    `;
}

function getCellName(cell) {
    const names = {
        '█': 'Wall/Honeycomb',
        'TC': 'Tool Cupboard',
        'L': 'Loot Room',
        'S': 'Storage',
        'F': 'Furnace',
        'E': 'Entrance',
        'A': 'Airlock',
        'T': 'Trap',
        '~': 'Open Space'
    };
    return names[cell] || 'Room';
}

// ===================================
// 2. MAP LOCATION ANALYZER
// ===================================

function createMapLocationAnalyzer() {
    return `Map Location Analyzer - Coming Soon!`;
}

function findBestLocation() {
    alert('Map Location feature - Coming soon!');
}

// Export functions to global scope
window.createSmartBaseDesigner = createSmartBaseDesigner;
window.generateAdvancedBase = generateAdvancedBase;
window.getCellName = getCellName;
window.createMapLocationAnalyzer = createMapLocationAnalyzer;
window.findBestLocation = findBestLocation;

console.log('✅ AI Tools Part 1 loaded (Enhanced Smart Base Designer, Map Location Analyzer)');
