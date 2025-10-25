// RUST BASE DESIGNER - ACCURATE VERSION
// Uses actual RUST building mechanics: Squares + Triangles

function createSmartBaseDesigner() {
    return `
        <div class="ai-tool-header">
            <h1>🏗️ RUST Base Designer</h1>
            <p class="ai-subtitle">Accurate base designs using square + triangle foundations</p>
        </div>

        <div class="ai-tool-grid">
            <div class="ai-input-section">
                <h3>⚙️ Configure:</h3>

                <div class="input-group">
                    <label>Group Size:</label>
                    <select id="groupSize">
                        <option value="solo">Solo</option>
                        <option value="duo" selected>Duo</option>
                        <option value="trio">Trio (3-4)</option>
                        <option value="clan">Clan (5+)</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Base Design:</label>
                    <select id="baseDesign">
                        <option value="2x1">2x1 Starter</option>
                        <option value="2x2" selected>2x2 Classic</option>
                        <option value="2x2-bunker">2x2 Bunker</option>
                        <option value="2x2-trap">2x2 Trap Base</option>
                        <option value="3x3">3x3 Fortress</option>
                        <option value="triangle-core">Triangle Core</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Honeycomb Layers:</label>
                    <select id="honeycombLayers">
                        <option value="0">None (Starter)</option>
                        <option value="1" selected>1 Layer</option>
                        <option value="2">2 Layers</option>
                        <option value="3">3 Layers (Max)</option>
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

                <button class="ai-generate-btn" onclick="generateRustBase()">
                    🏗️ Generate Base Design
                </button>
            </div>

            <div class="ai-output-section" id="baseOutput">
                <div class="ai-thinking">
                    <p>🏗️ Select options and generate a base design</p>
                    <p style="color: #888; margin-top: 10px;">Uses real RUST mechanics: square & triangle foundations</p>
                </div>
            </div>
        </div>
    `;
}

function generateRustBase() {
    const groupSize = document.getElementById('groupSize').value;
    const baseDesign = document.getElementById('baseDesign').value;
    const honeycombLayers = parseInt(document.getElementById('honeycombLayers').value);
    const serverType = document.getElementById('serverType').value;

    document.getElementById('baseOutput').innerHTML = `
        <div class="ai-thinking">
            <div class="ai-loader"></div>
            <p>🏗️ Generating ${baseDesign} base...</p>
        </div>
    `;

    setTimeout(() => {
        const base = buildRustBase(baseDesign, honeycombLayers, groupSize, serverType);
        displayRustBase(base);
    }, 1200);
}

function buildRustBase(design, honeycomb, groupSize, serverType) {
    // Base templates using actual RUST foundation shapes
    // ■ = Square foundation
    // ▲ = Triangle foundation
    // Legend: TC=Tool Cupboard, L=Loot, A=Airlock, F=Furnace, S=Storage, E=Exit, T=Trap

    const designs = {
        '2x1': {
            name: "2x1 Starter Base",
            core: [
                ['■TC', '■L']
            ],
            honeycomb1: [
                ['▲', '▲', '▲', '▲'],
                ['▲', '■TC', '■L', '▲'],
                ['▲', '▲', '▲', '▲']
            ],
            description: "Simple 2-square starter. Fast to build, upgrade to stone ASAP.",
            rooms: ["Square 1: TC", "Square 2: Loot + Sleeping Bag"],
            cost_base: { stone: 8000, metal: 2000, hqm: 100 },
            raid_base: 8800
        },
        '2x2': {
            name: "2x2 Classic",
            core: [
                ['■TC', '■L'],
                ['■S', '■F']
            ],
            honeycomb1: [
                ['▲', '▲', '▲', '▲', '▲', '▲'],
                ['▲', '■TC', '▲', '▲', '■L', '▲'],
                ['▲', '▲', '▲', '▲', '▲', '▲'],
                ['▲', '▲', '▲', '▲', '▲', '▲'],
                ['▲', '■S', '▲', '▲', '■F', '▲'],
                ['▲', '▲', '▲', '▲', '▲', '▲']
            ],
            honeycomb2: [
                ['▲', '▲', '▲', '▲', '▲', '▲', '▲', '▲'],
                ['▲', '▲', '▲', '▲', '▲', '▲', '▲', '▲'],
                ['▲', '▲', '■TC', '▲', '▲', '■L', '▲', '▲'],
                ['▲', '▲', '▲', '▲', '▲', '▲', '▲', '▲'],
                ['▲', '▲', '▲', '▲', '▲', '▲', '▲', '▲'],
                ['▲', '▲', '■S', '▲', '▲', '■F', '▲', '▲'],
                ['▲', '▲', '▲', '▲', '▲', '▲', '▲', '▲'],
                ['▲', '▲', '▲', '▲', '▲', '▲', '▲', '▲']
            ],
            description: "Most popular base. 4 squares in 2x2 grid. Triangle honeycomb for protection.",
            rooms: ["Square 1: TC (armored)", "Square 2: Loot Room", "Square 3: Storage", "Square 4: Furnaces"],
            cost_base: { stone: 30000, metal: 10000, hqm: 500 },
            raid_base: 35200
        },
        '2x2-bunker': {
            name: "2x2 Bunker Base",
            core: [
                ['■TC', '■L'],
                ['■A', '■B']
            ],
            honeycomb1: [
                ['▲', '▲', '▲', '▲', '▲', '▲'],
                ['▲', '■TC', '▲', '▲', '■L', '▲'],
                ['▲', '▲', '▲', '▲', '▲', '▲'],
                ['▲', '▲', '▲', '▲', '▲', '▲'],
                ['▲', '■A', '▲', '▲', '■B', '▲'],
                ['▲', '▲', '▲', '▲', '▲', '▲']
            ],
            description: "2x2 with bunker entrance. No door when closed - removes stairs to seal.",
            rooms: ["Square 1: TC (armored)", "Square 2: Loot Room", "Square 3: Airlock", "Square 4: BUNKER entrance (staircase stability)"],
            features: ["Stability bunker - remove stairs to seal", "No raidable door when offline", "Requires precise building"],
            cost_base: { stone: 35000, metal: 12000, hqm: 600 },
            raid_base: 44000
        },
        '2x2-trap': {
            name: "2x2 Trap Base",
            core: [
                ['■TC', '■L'],
                ['■T', '■F']
            ],
            honeycomb1: [
                ['▲', '▲', '▲', '▲', '▲', '▲'],
                ['▲', '■TC', '▲', '▲', '■L', '▲'],
                ['▲', '▲', '▲', '▲', '▲', '▲'],
                ['▲', '▲', '▲', '▲', '▲', '▲'],
                ['▲', '■T', '▲', '▲', '■F', '▲'],
                ['▲', '▲', '▲', '▲', '▲', '▲']
            ],
            description: "2x2 with dedicated trap floor. Shotgun traps + auto-turrets.",
            rooms: ["Square 1: TC", "Square 2: Loot Room", "Square 3: TRAP FLOOR (shotgun traps, turrets)", "Square 4: Furnace + Storage"],
            features: ["Murder corridors with shotgun traps", "Auto-turret coverage", "Fake loot room to bait raiders"],
            cost_base: { stone: 32000, metal: 11000, hqm: 550 },
            raid_base: 37400
        },
        '3x3': {
            name: "3x3 Fortress",
            core: [
                ['■', '■', '■'],
                ['■', '■TC', '■'],
                ['■', '■', '■']
            ],
            honeycomb1: [
                ['▲', '▲', '▲', '▲', '▲', '▲', '▲'],
                ['▲', '■', '▲', '■', '▲', '■', '▲'],
                ['▲', '▲', '▲', '▲', '▲', '▲', '▲'],
                ['▲', '■', '▲', '■TC', '▲', '■', '▲'],
                ['▲', '▲', '▲', '▲', '▲', '▲', '▲'],
                ['▲', '■', '▲', '■', '▲', '■', '▲'],
                ['▲', '▲', '▲', '▲', '▲', '▲', '▲']
            ],
            description: "Large 3x3 grid (9 squares). Center TC. Triangle honeycomb creates maze.",
            rooms: ["9 Square foundations", "Center: TC (armored)", "4 corners: Loot rooms", "4 sides: Storage, Furnaces, Airlocks, Traps"],
            cost_base: { stone: 70000, metal: 25000, hqm: 1500 },
            raid_base: 88000
        },
        'triangle-core': {
            name: "Triangle Core Base",
            core: [
                ['·', '▲TC', '·'],
                ['▲L', '▲', '▲S'],
                ['·', '▲F', '·']
            ],
            honeycomb1: [
                ['▲', '▲', '▲', '▲', '▲'],
                ['▲', '·', '▲TC', '·', '▲'],
                ['▲', '▲L', '▲', '▲S', '▲'],
                ['▲', '·', '▲F', '·', '▲'],
                ['▲', '▲', '▲', '▲', '▲']
            ],
            description: "Unique triangle-based core. Confusing layout for raiders.",
            rooms: ["6 Triangle foundations forming hexagon", "Center triangles: TC, Loot, Storage, Furnace"],
            features: ["Asymmetric - harder to raid efficiently", "Compact design", "Good for tight spaces"],
            cost_base: { stone: 25000, metal: 8000, hqm: 400 },
            raid_base: 30800
        }
    };

    const template = designs[design];

    // Select appropriate layout based on honeycomb layers
    let layout = template.core;
    if (honeycomb >= 1 && template.honeycomb1) layout = template.honeycomb1;
    if (honeycomb >= 2 && template.honeycomb2) layout = template.honeycomb2;

    // Calculate costs based on server type
    const serverMult = { vanilla: 1, '2x': 0.5, '5x': 0.2, '10x': 0.1 };
    const mult = serverMult[serverType] * (1 + honeycomb * 0.5);

    const costs = {
        stone: Math.floor(template.cost_base.stone * mult),
        metal: Math.floor(template.cost_base.metal * mult),
        hqm: Math.floor(template.cost_base.hqm * mult)
    };

    const raidCost = Math.floor(template.raid_base * (1 + honeycomb * 1.5));

    return {
        ...template,
        layout,
        honeycomb,
        costs,
        raidCost,
        serverType
    };
}

function displayRustBase(base) {
    const layoutHTML = base.layout.map(row =>
        `<div class="rust-row">${row.map(cell => {
            const isSquare = cell.includes('■');
            const isTriangle = cell.includes('▲') || cell.includes('▼');
            const isEmpty = cell === '·' || cell === '';
            const cellClass = isSquare ? 'square' : isTriangle ? 'triangle' : 'empty';
            const label = cell.replace('■', '').replace('▲', '').replace('▼', '');
            return `<div class="rust-cell ${cellClass}" title="${getFoundationName(cell)}">${cell}</div>`;
        }).join('')}</div>`
    ).join('');

    document.getElementById('baseOutput').innerHTML = `
        <div class="rust-base-result">
            <div class="base-header">
                <h2>${base.name}</h2>
                <p class="base-desc">${base.description}</p>
                <div class="base-tags">
                    <span class="tag">${base.honeycomb} Honeycomb Layer${base.honeycomb !== 1 ? 's' : ''}</span>
                    <span class="tag">${base.serverType}</span>
                </div>
            </div>

            <div class="base-foundation-layout">
                <h3>🏗️ Foundation Layout</h3>
                <p class="layout-note">Top-down view of foundations</p>
                <div class="rust-grid">
                    ${layoutHTML}
                </div>
                <div class="foundation-legend">
                    <div><strong>■</strong> = Square Foundation</div>
                    <div><strong>▲</strong> = Triangle Foundation</div>
                    <div><strong>TC</strong> = Tool Cupboard</div>
                    <div><strong>L</strong> = Loot Room</div>
                    <div><strong>S</strong> = Storage</div>
                    <div><strong>F</strong> = Furnace</div>
                    <div><strong>A</strong> = Airlock</div>
                    <div><strong>T</strong> = Trap</div>
                    <div><strong>B</strong> = Bunker</div>
                </div>
            </div>

            <div class="base-rooms">
                <h3>🚪 Room Configuration</h3>
                <ul>
                    ${base.rooms.map(room => `<li>${room}</li>`).join('')}
                </ul>
            </div>

            ${base.features ? `
                <div class="base-features">
                    <h3>⚡ Special Features</h3>
                    <ul>
                        ${base.features.map(f => `<li>${f}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}

            <div class="base-stats-grid">
                <div class="stat-box">
                    <h4>💰 Build Cost</h4>
                    <p>${base.costs.stone.toLocaleString()} Stone</p>
                    <p>${base.costs.metal.toLocaleString()} Metal Frags</p>
                    <p>${base.costs.hqm.toLocaleString()} HQM</p>
                </div>
                <div class="stat-box">
                    <h4>🛡️ Raid Cost</h4>
                    <p style="color: #ce422b; font-size: 1.5em;">${base.raidCost.toLocaleString()}</p>
                    <p>Sulfur</p>
                    <p>${Math.ceil(base.raidCost / 2200)} C4 | ${Math.ceil(base.raidCost / 1400)} Rockets</p>
                </div>
            </div>

            <div class="build-tips">
                <h3>💡 Build Tips</h3>
                <ul>
                    <li>Place foundations first, then upgrade before adding walls</li>
                    <li>Build honeycomb triangles AFTER core is complete</li>
                    <li>Upgrade TC room to armored first</li>
                    <li>Add airlocks and doors before logging off</li>
                    <li>Place sleeping bags in multiple locations</li>
                </ul>
            </div>

            <button class="ai-generate-btn" onclick="generateRustBase()" style="margin-top: 20px;">
                🔄 Generate Different Design
            </button>
        </div>
    `;
}

function getFoundationName(cell) {
    if (cell.includes('■')) return 'Square Foundation: ' + cell.replace('■', '');
    if (cell.includes('▲')) return 'Triangle Foundation: ' + cell.replace('▲', '');
    return 'Empty';
}

// Placeholder for Map Location (coming soon)
function createMapLocationAnalyzer() {
    return `<div class="ai-tool-header"><h1>📍 Map Location AI</h1><p>Coming soon!</p></div>`;
}

function findBestLocation() {
    alert('Map Location feature - Coming soon!');
}

// Export to global scope
window.createSmartBaseDesigner = createSmartBaseDesigner;
window.generateRustBase = generateRustBase;
window.createMapLocationAnalyzer = createMapLocationAnalyzer;
window.findBestLocation = findBestLocation;

console.log('✅ RUST Base Designer loaded (with actual square + triangle foundations!)');
