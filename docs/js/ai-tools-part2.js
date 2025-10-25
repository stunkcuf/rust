// AI Tools Part 2: Advanced Raid Calculator & Wipe Planner

// ===================================
// 3. ADVANCED RAID CALCULATOR AI
// ===================================

function createAdvancedRaidCalculator() {
    return `
        <div class="ai-tool-header">
            <h1>💣 Advanced Raid Calculator AI</h1>
            <p class="ai-subtitle">AI-powered raid planning with optimal explosive combinations</p>
        </div>

        <div class="ai-tool-grid">
            <div class="ai-input-section">
                <h3>🎯 Describe the base:</h3>

                <div class="input-group">
                    <label>Base Size:</label>
                    <select id="raidBaseSize">
                        <option value="small">Small (2x1, 2x2)</option>
                        <option value="medium">Medium (3x3, 2x3)</option>
                        <option value="large">Large (4x4+)</option>
                        <option value="compound">Compound (multiple buildings)</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Main Material:</label>
                    <select id="raidMaterial">
                        <option value="wood">Wood</option>
                        <option value="stone">Stone</option>
                        <option value="metal">Sheet Metal</option>
                        <option value="armored">Armored</option>
                        <option value="mixed">Mixed</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Honeycomb Layers:</label>
                    <select id="raidHoneycomb">
                        <option value="0">None</option>
                        <option value="1">1 Layer</option>
                        <option value="2">2 Layers</option>
                        <option value="3">3 Layers</option>
                        <option value="4">4+ Layers</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Doors Count:</label>
                    <input type="number" id="doorsCount" value="2" min="1" max="20">
                </div>

                <div class="input-group">
                    <label>TC Location:</label>
                    <select id="tcLocation">
                        <option value="obvious">Obvious/Easy to find</option>
                        <option value="hidden">Hidden/Hard to find</option>
                        <option value="unknown">Unknown</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Defenses:</label>
                    <div class="checkbox-group">
                        <label><input type="checkbox" id="hasTurrets"> Auto-Turrets</label>
                        <label><input type="checkbox" id="hasTraps"> Shotgun Traps</label>
                        <label><input type="checkbox" id="hasBunker"> Bunker Entrance</label>
                    </div>
                </div>

                <div class="input-group">
                    <label>Your Available Explosives:</label>
                    <div class="explosive-inputs">
                        <input type="number" id="ownC4" placeholder="C4" min="0" value="0">
                        <input type="number" id="ownRockets" placeholder="Rockets" min="0" value="0">
                        <input type="number" id="ownSatchels" placeholder="Satchels" min="0" value="0">
                        <input type="number" id="ownSulfur" placeholder="Sulfur" min="0" value="0">
                    </div>
                </div>

                <button class="ai-generate-btn" onclick="calculateAdvancedRaid()">
                    🤖 Calculate Optimal Raid
                </button>
            </div>

            <div class="ai-output-section" id="raidCalcOutput">
                <div class="ai-thinking">
                    <p>💣 Configure the base details and click "Calculate Optimal Raid"</p>
                </div>
            </div>
        </div>
    `;
}

function calculateAdvancedRaid() {
    const baseSize = document.getElementById('raidBaseSize').value;
    const material = document.getElementById('raidMaterial').value;
    const honeycomb = parseInt(document.getElementById('raidHoneycomb').value);
    const doors = parseInt(document.getElementById('doorsCount').value);
    const tcLocation = document.getElementById('tcLocation').value;
    const hasTurrets = document.getElementById('hasTurrets').checked;
    const hasTraps = document.getElementById('hasTraps').checked;
    const hasBunker = document.getElementById('hasBunker').checked;

    document.getElementById('raidCalcOutput').innerHTML = `
        <div class="ai-thinking">
            <div class="ai-loader"></div>
            <p>🤖 AI analyzing base structure...</p>
            <p class="ai-status">Computing optimal raid paths and explosive combinations...</p>
        </div>
    `;

    setTimeout(() => {
        const raidPlan = computeRaidStrategy(baseSize, material, honeycomb, doors, tcLocation, hasTurrets, hasTraps, hasBunker);
        displayRaidPlan(raidPlan);
    }, 1800);
}

function computeRaidStrategy(baseSize, material, honeycomb, doors, tcLocation, hasTurrets, hasTraps, hasBunker) {
    // Base costs per material
    const materialCosts = {
        wood: { c4: 0, rockets: 0, satchels: 3, sulfur: 1440 },
        stone: { c4: 2, rockets: 4, satchels: 10, sulfur: 4400 },
        metal: { c4: 4, rockets: 8, satchels: 23, sulfur: 8800 },
        armored: { c4: 8, rockets: 15, satchels: 60, sulfur: 17600 },
        mixed: { c4: 3, rockets: 6, satchels: 15, sulfur: 6600 }
    };

    const baseCost = materialCosts[material];

    // Size multipliers
    const sizeMultipliers = {
        small: { walls: 4, estimate: 1 },
        medium: { walls: 8, estimate: 1.5 },
        large: { walls: 16, estimate: 2.5 },
        compound: { walls: 24, estimate: 4 }
    };

    const size = sizeMultipliers[baseSize];

    // Calculate total cost
    const totalWalls = size.walls + (honeycomb * size.walls * 0.8);
    const doorCost = doors * (baseCost.c4 * 0.5);

    const totalCost = {
        c4: Math.ceil((totalWalls * baseCost.c4) / 4 + doorCost),
        rockets: Math.ceil((totalWalls * baseCost.rockets) / 4 + doors * 2),
        satchels: Math.ceil((totalWalls * baseCost.satchels) / 4 + doors * 4),
        sulfur: Math.ceil((totalWalls * baseCost.sulfur) / 4 + (doors * 1800))
    };

    // AI optimization - find cheapest path
    const paths = [
        { method: 'C4 Only', c4: totalCost.c4, rockets: 0, satchels: 0, sulfur: totalCost.c4 * 2200 },
        { method: 'Rockets Only', c4: 0, rockets: totalCost.rockets, satchels: 0, sulfur: totalCost.rockets * 1400 },
        { method: 'Mixed (C4 + Rockets)', c4: Math.ceil(totalCost.c4 * 0.6), rockets: Math.ceil(totalCost.rockets * 0.4), satchels: 0, sulfur: 0 },
        { method: 'Budget (Satchels)', c4: 0, rockets: 0, satchels: totalCost.satchels, sulfur: totalCost.satchels * 480 }
    ];

    // Calculate sulfur for mixed
    paths[2].sulfur = (paths[2].c4 * 2200) + (paths[2].rockets * 1400);

    // Sort by sulfur cost
    paths.sort((a, b) => a.sulfur - b.sulfur);

    // Generate AI recommendations
    const recommendations = [];

    if (hasTurrets) recommendations.push('⚠️ Bring explosive ammo for turrets');
    if (hasTraps) recommendations.push('⚠️ Watch for shotgun traps - bring armor');
    if (hasBunker) recommendations.push('💡 Scout for bunker entrance mechanism');
    if (tcLocation === 'hidden') recommendations.push('🔍 Expect to destroy extra rooms finding TC');
    if (honeycomb >= 3) recommendations.push('💰 High honeycomb - consider smaller raid or offline timing');

    // Calculate success probability
    const ownC4 = parseInt(document.getElementById('ownC4').value) || 0;
    const ownRockets = parseInt(document.getElementById('ownRockets').value) || 0;
    const ownSulfur = parseInt(document.getElementById('ownSulfur').value) || 0;

    const hasEnough = ownSulfur >= paths[0].sulfur || (ownC4 >= paths[0].c4 && ownRockets >= paths[0].rockets);

    return {
        paths,
        totalCost,
        recommendations,
        baseSize,
        material,
        honeycomb,
        hasEnough,
        timeEstimate: estimateRaidTime(baseSize, hasTurrets, hasTraps),
        risk: calculateRaidRisk(baseSize, material, honeycomb, hasTurrets)
    };
}

function estimateRaidTime(baseSize, hasTurrets, hasTraps) {
    const base = { small: 10, medium: 20, large: 35, compound: 60 }[baseSize];
    const defenseTime = (hasTurrets ? 5 : 0) + (hasTraps ? 3 : 0);
    return base + defenseTime;
}

function calculateRaidRisk(baseSize, material, honeycomb, hasTurrets) {
    let risk = 30; // Base risk

    if (baseSize === 'large' || baseSize === 'compound') risk += 20;
    if (material === 'metal') risk += 15;
    if (material === 'armored') risk += 25;
    if (honeycomb >= 3) risk += 20;
    if (hasTurrets) risk += 10;

    return Math.min(100, risk);
}

function displayRaidPlan(plan) {
    document.getElementById('raidCalcOutput').innerHTML = `
        <div class="ai-result">
            <div class="ai-result-header">
                <h3>💣 AI Raid Strategy</h3>
                <span class="ai-badge">Optimized Plan</span>
            </div>

            <div class="raid-paths">
                <h4>🎯 Explosive Options (Best to Worst):</h4>
                ${plan.paths.map((path, i) => `
                    <div class="raid-option ${i === 0 ? 'best-option' : ''}">
                        <div class="option-header">
                            <h5>${i + 1}. ${path.method}</h5>
                            ${i === 0 ? '<span class="best-badge">⭐ Most Efficient</span>' : ''}
                        </div>
                        <div class="option-details">
                            ${path.c4 > 0 ? `<span><strong>${path.c4}</strong> C4</span>` : ''}
                            ${path.rockets > 0 ? `<span><strong>${path.rockets}</strong> Rockets</span>` : ''}
                            ${path.satchels > 0 ? `<span><strong>${path.satchels}</strong> Satchels</span>` : ''}
                            <span class="sulfur-cost"><strong>${path.sulfur.toLocaleString()}</strong> Sulfur</span>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="raid-stats">
                <div class="stat-box">
                    <h4>⏱️ Time Estimate</h4>
                    <p><strong>${plan.timeEstimate}</strong> minutes</p>
                    <p class="text-muted">Actual raid duration</p>
                </div>

                <div class="stat-box">
                    <h4>⚠️ Risk Level</h4>
                    <div class="risk-meter">
                        <div class="risk-bar" style="width: ${plan.risk}%; background: ${getRiskColor(plan.risk)}"></div>
                    </div>
                    <p><strong>${plan.risk}%</strong> ${getRiskLabel(plan.risk)}</p>
                </div>

                <div class="stat-box">
                    <h4>📊 Your Resources</h4>
                    <p class="${plan.hasEnough ? 'text-success' : 'text-danger'}">
                        ${plan.hasEnough ? '✅ You have enough!' : '❌ Need more explosives'}
                    </p>
                </div>
            </div>

            ${plan.recommendations.length > 0 ? `
                <div class="ai-recommendations">
                    <h4>🤖 AI Raid Tips:</h4>
                    <ul class="recommendations-list">
                        ${plan.recommendations.map(r => `<li>${r}</li>`).join('')}
                        <li>💡 Bring extra meds and ammo for defense</li>
                        <li>🎒 Have bags nearby for respawns</li>
                        <li>👥 Coordinate with team on voice chat</li>
                    </ul>
                </div>
            ` : ''}

            <div class="action-buttons">
                <button class="action-btn primary" onclick="exportRaidPlan()">📋 Export Raid Plan</button>
                <button class="action-btn secondary" onclick="calculateAdvancedRaid()">🔄 Recalculate</button>
            </div>
        </div>
    `;
}

function getRiskColor(risk) {
    if (risk < 40) return '#4caf50';
    if (risk < 70) return '#ff9800';
    return '#f44336';
}

function getRiskLabel(risk) {
    if (risk < 40) return 'Low Risk';
    if (risk < 70) return 'Medium Risk';
    return 'High Risk';
}

function exportRaidPlan() {
    alert('📋 Raid plan exported! (Feature coming soon - will export to clipboard)');
}

// ===================================
// 4. WIPE STRATEGY PLANNER AI
// ===================================

function createWipeStrategyPlanner() {
    return `
        <div class="ai-tool-header">
            <h1>📅 Live Wipe Strategy Planner AI</h1>
            <p class="ai-subtitle">AI creates your hour-by-hour wipe day game plan</p>
        </div>

        <div class="ai-tool-grid">
            <div class="ai-input-section">
                <h3>🎯 Configure your wipe:</h3>

                <div class="input-group">
                    <label>Group Size:</label>
                    <select id="wipeGroupSize">
                        <option value="solo">Solo</option>
                        <option value="duo">Duo</option>
                        <option value="trio">Trio</option>
                        <option value="squad">Squad (4+)</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Play Time Available:</label>
                    <select id="playTime">
                        <option value="2">2 hours (casual)</option>
                        <option value="4">4 hours (standard)</option>
                        <option value="8">8 hours (dedicated)</option>
                        <option value="12">12+ hours (no-life)</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Server Type:</label>
                    <select id="wipeServerType">
                        <option value="vanilla">Vanilla (1x)</option>
                        <option value="2x">2x</option>
                        <option value="5x">5x</option>
                        <option value="10x">10x+</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Server Population:</label>
                    <select id="wipeServerPop">
                        <option value="high">High (200+)</option>
                        <option value="medium">Medium (100-200)</option>
                        <option value="low">Low (<100)</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Primary Strategy:</label>
                    <select id="wipeStrategy">
                        <option value="aggressive">Aggressive (rush PVP)</option>
                        <option value="farming">Farming Focus</option>
                        <option value="defensive">Defensive/Turtle</option>
                        <option value="balanced">Balanced</option>
                    </select>
                </div>

                <div class="input-group">
                    <label>Experience Level:</label>
                    <select id="wipeExperience">
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="expert">Expert</option>
                    </select>
                </div>

                <button class="ai-generate-btn" onclick="generateWipeStrategy()">
                    🤖 Generate Wipe Plan
                </button>
            </div>

            <div class="ai-output-section" id="wipePlanOutput">
                <div class="ai-thinking">
                    <p>📅 Configure your wipe settings and click "Generate Wipe Plan"</p>
                </div>
            </div>
        </div>
    `;
}

function generateWipeStrategy() {
    const groupSize = document.getElementById('wipeGroupSize').value;
    const playTime = parseInt(document.getElementById('playTime').value);
    const serverType = document.getElementById('wipeServerType').value;
    const serverPop = document.getElementById('wipeServerPop').value;
    const strategy = document.getElementById('wipeStrategy').value;
    const experience = document.getElementById('wipeExperience').value;

    document.getElementById('wipePlanOutput').innerHTML = `
        <div class="ai-thinking">
            <div class="ai-loader"></div>
            <p>🤖 AI building your personalized wipe strategy...</p>
            <p class="ai-status">Optimizing for ${playTime} hours of gameplay...</p>
        </div>
    `;

    setTimeout(() => {
        const plan = buildWipePlan(groupSize, playTime, serverType, serverPop, strategy, experience);
        displayWipePlan(plan);
    }, 2000);
}

function buildWipePlan(groupSize, playTime, serverType, serverPop, strategy, experience) {
    const timeline = [];

    // Hour 0-1: The Rush
    timeline.push({
        hour: '0:00-1:00',
        phase: 'Initial Rush',
        objectives: [
            '🏃 Spawn in and grab cloth/wood immediately',
            '🪓 Craft stone tools ASAP',
            groupSize !== 'solo' ? '👥 Group up with team quickly' : '🎒 Stay mobile',
            '🏠 Build tiny starter (2x1) or find temporary shelter',
            '🛏️ Place sleeping bag in hidden spot',
            experience === 'expert' ? '⚔️ Look for bow fights if geared' : '🌲 Focus on gathering'
        ],
        priority: 'Survival & Spawn Security',
        scrapGoal: serverType === 'vanilla' ? '50-100' : '200-300'
    });

    // Hour 1-2: Establishment
    timeline.push({
        hour: '1:00-2:00',
        phase: 'Base Establishment',
        objectives: [
            '🏗️ Build main starter base (2x2 for solo/duo, 3x3 for larger)',
            '⚙️ Craft Level 1 Workbench',
            '🔥 Set up furnaces (2-3)',
            '🔒 Research/unlock: Code Lock, Furnace, Sleeping Bag',
            '⛏️ Farm nodes nearby for metal/stone',
            strategy === 'aggressive' ? '⚔️ Craft weapons (bow, spear)' : '🛡️ Upgrade to stone walls'
        ],
        priority: 'Secure Base & WB1',
        scrapGoal: serverType === 'vanilla' ? '200-400' : '500-800'
    });

    // Hour 2-4: Expansion
    if (playTime >= 4) {
        timeline.push({
            hour: '2:00-4:00',
            phase: 'Tech & Territory',
            objectives: [
                '🏛️ Start monument runs (gas station, supermarket, satellite)',
                '📜 Farm scrap for tech tree unlocks',
                '⚙️ Craft Level 2 Workbench',
                '🔫 Unlock weapon BPs: Revolver, SAR, or Thompson',
                '🛡️ Get road sign armor',
                experience === 'expert' ? '💀 Look for pvp opportunities' : '📦 Build loot rooms',
                '⛽ Keep furnaces running (metal, sulfur)'
            ],
            priority: 'WB2 & Mid-Game Gear',
            scrapGoal: serverType === 'vanilla' ? '1,000-2,000' : '2,000-4,000'
        });
    }

    // Hour 4-8: Domination
    if (playTime >= 8) {
        timeline.push({
            hour: '4:00-8:00',
            phase: 'Power Spike',
            objectives: [
                '⚙️ Craft Level 3 Workbench',
                '🏛️ Run T2/T3 monuments (Train Yard, Airfield, Launch)',
                '🔫 Unlock AK/LR-300 if found or tech tree',
                '🏗️ Upgrade base to sheet metal core',
                '💣 Start farming sulfur for raids',
                groupSize === 'squad' ? '🎯 Coordinate small raids on neighbors' : '🛡️ Fortify base',
                '🔋 Set up electricity if needed',
                '📦 Organize loot and hide valuables'
            ],
            priority: 'WB3 & Raiding Prep',
            scrapGoal: serverType === 'vanilla' ? '5,000+' : '10,000+'
        });
    }

    // Hour 8-12: Late Game
    if (playTime >= 12) {
        timeline.push({
            hour: '8:00-12:00',
            phase: 'Late Wipe Dominance',
            objectives: [
                '💣 Execute planned raids (10k+ sulfur farmed)',
                '🏰 Expand base or build raid base',
                '⚔️ Full PVP kit (metal armor, AK)',
                '🎯 Control key monuments',
                '🤝 Form alliances or eliminate threats',
                '📡 Set up advanced defenses (auto-turrets, traps)',
                '💰 Accumulate wealth for rest of wipe'
            ],
            priority: 'Server Dominance',
            scrapGoal: 'Unlimited - recycle everything'
        });
    }

    // Generate success metrics
    const milestones = [
        { time: '1:00', goal: 'Starter base built', importance: 'Critical' },
        { time: '2:00', goal: 'Level 1 Workbench', importance: 'Critical' },
        { time: '4:00', goal: 'Level 2 Workbench + weapon', importance: 'High' },
        playTime >= 8 ? { time: '8:00', goal: 'Level 3 Workbench + AK BP', importance: 'High' } : null,
        playTime >= 12 ? { time: '12:00', goal: 'First raid completed', importance: 'Medium' } : null
    ].filter(Boolean);

    return {
        timeline,
        milestones,
        groupSize,
        playTime,
        strategy,
        serverType
    };
}

function displayWipePlan(plan) {
    document.getElementById('wipePlanOutput').innerHTML = `
        <div class="ai-result">
            <div class="ai-result-header">
                <h3>📅 Your AI Wipe Day Strategy</h3>
                <span class="ai-badge">${plan.playTime} Hour Plan</span>
            </div>

            <div class="timeline-container">
                ${plan.timeline.map((phase, i) => `
                    <div class="timeline-phase">
                        <div class="phase-header">
                            <span class="phase-time">${phase.hour}</span>
                            <h4>${phase.phase}</h4>
                            <span class="phase-priority">${phase.priority}</span>
                        </div>
                        <div class="phase-content">
                            <ul class="objectives-list">
                                ${phase.objectives.map(obj => `<li>${obj}</li>`).join('')}
                            </ul>
                            <div class="phase-goal">
                                <strong>Scrap Goal:</strong> ${phase.scrapGoal}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="milestones-section">
                <h4>🎯 Success Milestones:</h4>
                <div class="milestones-grid">
                    ${plan.milestones.map(m => `
                        <div class="milestone-card ${m.importance.toLowerCase()}">
                            <div class="milestone-time">${m.time}</div>
                            <div class="milestone-goal">${m.goal}</div>
                            <div class="milestone-badge">${m.importance}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="ai-protips">
                <h4>🤖 AI Pro Tips for Success:</h4>
                <ul>
                    <li>✅ Set alarms for each phase if playing long session</li>
                    <li>✅ Have food/drinks ready - don't waste time IRL</li>
                    <li>✅ Pre-plan with team on voice before wipe</li>
                    <li>✅ Place multiple bags early - death recovery crucial</li>
                    <li>✅ Don't be greedy - bank scrap often at safe zones</li>
                    <li>✅ Adapt plan if server is too contested</li>
                    ${plan.strategy === 'aggressive' ? '<li>⚔️ PVP early to deny others progression</li>' : ''}
                    ${plan.groupSize === 'solo' ? '<li>🏃 Stay mobile, avoid fights you can\'t win</li>' : ''}
                </ul>
            </div>

            <div class="action-buttons">
                <button class="action-btn primary" onclick="exportWipePlan()">📋 Export Plan</button>
                <button class="action-btn secondary" onclick="printWipePlan()">🖨️ Print Plan</button>
            </div>
        </div>
    `;
}

function exportWipePlan() {
    alert('📋 Wipe plan exported! (Feature coming soon - will export to clipboard/PDF)');
}

function printWipePlan() {
    window.print();
}

// Export functions to global scope
window.createAdvancedRaidCalculator = createAdvancedRaidCalculator;
window.calculateAdvancedRaid = calculateAdvancedRaid;
window.exportRaidPlan = exportRaidPlan;
window.createWipeStrategyPlanner = createWipeStrategyPlanner;
window.generateWipeStrategy = generateWipeStrategy;
window.exportWipePlan = exportWipePlan;
window.printWipePlan = printWipePlan;
