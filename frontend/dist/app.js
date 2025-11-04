// API Configuration
const API_BASE = window.location.origin + '/api';
let authToken = localStorage.getItem('authToken');
let currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

// Utility Functions
const api = async (endpoint, options = {}) => {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (authToken && !options.skipAuth) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers,
        });

        if (response.status === 401) {
            logout();
            return null;
        }

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Request failed');
        }

        if (response.status === 204) {
            return null;
        }

        return await response.json();
    } catch (error) {
        showToast(error.message, 'error');
        throw error;
    }
};

const showToast = (message, type = 'success') => {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
};

const showModal = (title, contentHTML) => {
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `<h2>${title}</h2>${contentHTML}`;
    modal.classList.remove('hidden');
};

const hideModal = () => {
    document.getElementById('modal').classList.add('hidden');
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

// Authentication
const login = async (username, password) => {
    const data = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        skipAuth: true,
    });

    if (data) {
        authToken = data.token;
        currentUser = data.user;
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showApp();
    }
};

const register = async (username, email, password, role) => {
    const data = await api('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password, role }),
        skipAuth: true,
    });

    if (data) {
        authToken = data.token;
        currentUser = data.user;
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        showApp();
    }
};

const logout = () => {
    authToken = null;
    currentUser = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    showLogin();
};

// Screen Navigation
const showLogin = () => {
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('registerScreen').classList.add('hidden');
    document.getElementById('appScreen').classList.add('hidden');
};

const showRegister = () => {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('registerScreen').classList.remove('hidden');
    document.getElementById('appScreen').classList.add('hidden');
};

const showApp = () => {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('registerScreen').classList.add('hidden');
    document.getElementById('appScreen').classList.remove('hidden');
    document.getElementById('userName').textContent = currentUser.username;

    // Show/hide admin-only elements
    const isAdmin = currentUser.role === 'admin';
    document.querySelectorAll('.admin-only').forEach(el => {
        el.style.display = isAdmin ? '' : 'none';
    });

    loadDashboard();
};

// View Navigation
const showView = (viewName) => {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    document.getElementById(`${viewName}View`).classList.add('active');
    document.querySelector(`[data-view="${viewName}"]`).classList.add('active');

    // Load view data
    switch(viewName) {
        case 'dashboard': loadDashboard(); break;
        case 'inventory': loadInventory(); break;
        case 'items': loadItems(); break;
        case 'purchases': loadPurchases(); break;
        case 'budgets': loadBudgets(); break;
        case 'requests': loadRequests(); break;
        case 'locations': loadLocations(); break;
        case 'users': loadUsers(); break;
    }

    // Close mobile menu
    document.getElementById('sideNav').classList.remove('open');
};

// Dashboard
const loadDashboard = async () => {
    try {
        const [lowStock, overstock, requests, purchases] = await Promise.all([
            api('/inventory/low-stock'),
            api('/inventory/overstock'),
            api('/requests?status=pending'),
            api('/purchases?status=pending'),
        ]);

        document.getElementById('lowStockCount').textContent = lowStock?.length || 0;
        document.getElementById('overstockCount').textContent = overstock?.length || 0;
        document.getElementById('pendingRequestsCount').textContent = requests?.length || 0;
        document.getElementById('pendingPurchasesCount').textContent = purchases?.length || 0;

        // Low stock table
        const lowStockHTML = lowStock && lowStock.length > 0 ? `
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Location</th>
                        <th>Current</th>
                        <th>Reorder Level</th>
                    </tr>
                </thead>
                <tbody>
                    ${lowStock.slice(0, 5).map(item => `
                        <tr>
                            <td>${item.item_name}</td>
                            <td>${item.location_name}</td>
                            <td><span class="badge badge-danger">${item.quantity}</span></td>
                            <td>${item.reorder_level}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        ` : '<p class="empty-state">No low stock items</p>';

        document.getElementById('lowStockList').innerHTML = lowStockHTML;

        // Recent requests table
        const requestsHTML = requests && requests.length > 0 ? `
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Location</th>
                        <th>Quantity</th>
                        <th>Priority</th>
                        <th>Requested By</th>
                    </tr>
                </thead>
                <tbody>
                    ${requests.slice(0, 5).map(req => `
                        <tr>
                            <td>${req.item_name}</td>
                            <td>${req.location_name}</td>
                            <td>${req.quantity}</td>
                            <td><span class="badge badge-${req.priority === 'urgent' ? 'danger' : 'warning'}">${req.priority}</span></td>
                            <td>${req.requested_by_username}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        ` : '<p class="empty-state">No pending requests</p>';

        document.getElementById('recentRequestsList').innerHTML = requestsHTML;
    } catch (error) {
        console.error('Dashboard error:', error);
    }
};

// Inventory
const loadInventory = async (locationId = null, filter = null) => {
    try {
        let url = '/inventory';
        const params = new URLSearchParams();
        if (locationId) params.append('location_id', locationId);
        if (params.toString()) url += '?' + params.toString();

        if (filter === 'low') url = '/inventory/low-stock';
        else if (filter === 'over') url = '/inventory/overstock';

        const inventory = await api(url);

        const html = inventory && inventory.length > 0 ? `
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>SKU</th>
                        <th>Location</th>
                        <th>Quantity</th>
                        <th>Reorder Level</th>
                        <th>Overstock Level</th>
                        <th>Last Updated</th>
                    </tr>
                </thead>
                <tbody>
                    ${inventory.map(item => {
                        let badge = 'badge-success';
                        if (item.quantity <= item.reorder_level) badge = 'badge-danger';
                        else if (item.quantity >= item.overstock_level) badge = 'badge-warning';

                        return `
                        <tr>
                            <td>${item.item_name}</td>
                            <td>${item.sku}</td>
                            <td>${item.location_name}</td>
                            <td><span class="badge ${badge}">${item.quantity}</span></td>
                            <td>${item.reorder_level}</td>
                            <td>${item.overstock_level}</td>
                            <td>${formatDate(item.last_updated)}</td>
                        </tr>
                    `}).join('')}
                </tbody>
            </table>
        ` : '<p class="empty-state">No inventory records found</p>';

        document.getElementById('inventoryList').innerHTML = html;
    } catch (error) {
        console.error('Inventory error:', error);
    }
};

// Load locations for filters
const loadLocationsForFilters = async () => {
    const locations = await api('/locations');
    if (locations) {
        const options = locations.map(loc => `<option value="${loc.id}">${loc.name}</option>`).join('');
        document.querySelectorAll('[id$="LocationFilter"]').forEach(select => {
            select.innerHTML = '<option value="">All Locations</option>' + options;
        });
    }
};

// Items
const loadItems = async () => {
    try {
        const items = await api('/items');

        const html = items && items.length > 0 ? `
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>SKU</th>
                        <th>Category</th>
                        <th>Unit Price</th>
                        <th>Reorder Level</th>
                        <th>Overstock Level</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${items.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td>${item.sku}</td>
                            <td>${item.category}</td>
                            <td>${formatCurrency(item.unit_price)}</td>
                            <td>${item.reorder_level}</td>
                            <td>${item.overstock_level}</td>
                            <td>
                                <button class="action-btn edit" onclick="editItem(${item.id})">Edit</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        ` : '<p class="empty-state">No items found</p>';

        document.getElementById('itemsList').innerHTML = html;
    } catch (error) {
        console.error('Items error:', error);
    }
};

// Purchases
const loadPurchases = async (locationId = null, status = null) => {
    try {
        let url = '/purchases';
        const params = new URLSearchParams();
        if (locationId) params.append('location_id', locationId);
        if (status) params.append('status', status);
        if (params.toString()) url += '?' + params.toString();

        const purchases = await api(url);

        const html = purchases && purchases.length > 0 ? `
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Location</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Vendor</th>
                        <th>Status</th>
                        <th>Ordered By</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${purchases.map(p => `
                        <tr>
                            <td>${p.item_name}</td>
                            <td>${p.location_name}</td>
                            <td>${p.quantity}</td>
                            <td>${formatCurrency(p.total_price)}</td>
                            <td>${p.vendor}</td>
                            <td><span class="badge badge-${getStatusBadge(p.status)}">${p.status}</span></td>
                            <td>${p.ordered_by_username}</td>
                            <td>${formatDate(p.ordered_at)}</td>
                            <td>
                                ${p.status === 'pending' ? `
                                    <button class="action-btn approve" onclick="updatePurchaseStatus(${p.id}, 'approved')">Approve</button>
                                    <button class="action-btn reject" onclick="updatePurchaseStatus(${p.id}, 'cancelled')">Cancel</button>
                                ` : ''}
                                ${p.status === 'approved' ? `
                                    <button class="action-btn complete" onclick="updatePurchaseStatus(${p.id}, 'completed')">Complete</button>
                                ` : ''}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        ` : '<p class="empty-state">No purchases found</p>';

        document.getElementById('purchasesList').innerHTML = html;
    } catch (error) {
        console.error('Purchases error:', error);
    }
};

// Budgets
const loadBudgets = async (locationId = null) => {
    try {
        let url = '/budgets';
        if (locationId) url += `?location_id=${locationId}`;

        const budgets = await api(url);

        const html = budgets && budgets.length > 0 ? `
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Spent</th>
                        <th>Remaining</th>
                        <th>Progress</th>
                        <th>Period</th>
                    </tr>
                </thead>
                <tbody>
                    ${budgets.map(b => {
                        const remaining = b.amount - b.spent;
                        const progress = (b.spent / b.amount * 100).toFixed(1);
                        const badgeClass = progress > 90 ? 'badge-danger' : progress > 75 ? 'badge-warning' : 'badge-success';

                        return `
                        <tr>
                            <td>${b.name}</td>
                            <td>${formatCurrency(b.amount)}</td>
                            <td>${formatCurrency(b.spent)}</td>
                            <td>${formatCurrency(remaining)}</td>
                            <td><span class="badge ${badgeClass}">${progress}%</span></td>
                            <td>${formatDate(b.start_date)} - ${formatDate(b.end_date)}</td>
                        </tr>
                    `}).join('')}
                </tbody>
            </table>
        ` : '<p class="empty-state">No budgets found</p>';

        document.getElementById('budgetsList').innerHTML = html;
    } catch (error) {
        console.error('Budgets error:', error);
    }
};

// Requests
const loadRequests = async (locationId = null, status = null) => {
    try {
        let url = '/requests';
        const params = new URLSearchParams();
        if (locationId) params.append('location_id', locationId);
        if (status) params.append('status', status);
        if (params.toString()) url += '?' + params.toString();

        const requests = await api(url);

        const html = requests && requests.length > 0 ? `
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Location</th>
                        <th>Quantity</th>
                        <th>Priority</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Requested By</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${requests.map(r => `
                        <tr>
                            <td>${r.item_name}</td>
                            <td>${r.location_name}</td>
                            <td>${r.quantity}</td>
                            <td><span class="badge badge-${getPriorityBadge(r.priority)}">${r.priority}</span></td>
                            <td>${r.reason}</td>
                            <td><span class="badge badge-${getStatusBadge(r.status)}">${r.status}</span></td>
                            <td>${r.requested_by_username}</td>
                            <td>${formatDate(r.requested_at)}</td>
                            <td>
                                ${r.status === 'pending' && (currentUser.role === 'admin' || currentUser.role === 'manager') ? `
                                    <button class="action-btn approve" onclick="updateRequestStatus(${r.id}, 'approved')">Approve</button>
                                    <button class="action-btn reject" onclick="updateRequestStatus(${r.id}, 'rejected')">Reject</button>
                                ` : ''}
                                ${r.status === 'approved' ? `
                                    <button class="action-btn complete" onclick="updateRequestStatus(${r.id}, 'fulfilled')">Fulfill</button>
                                ` : ''}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        ` : '<p class="empty-state">No requests found</p>';

        document.getElementById('requestsList').innerHTML = html;
    } catch (error) {
        console.error('Requests error:', error);
    }
};

// Locations
const loadLocations = async () => {
    try {
        const locations = await api('/locations');

        const html = locations && locations.length > 0 ? `
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Created</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${locations.map(loc => `
                        <tr>
                            <td>${loc.name}</td>
                            <td>${loc.address}</td>
                            <td>${formatDate(loc.created_at)}</td>
                            <td>
                                <button class="action-btn edit" onclick="editLocation(${loc.id})">Edit</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        ` : '<p class="empty-state">No locations found</p>';

        document.getElementById('locationsList').innerHTML = html;
    } catch (error) {
        console.error('Locations error:', error);
    }
};

// Users
const loadUsers = async () => {
    if (currentUser.role !== 'admin') return;

    try {
        const users = await api('/users');

        const html = users && users.length > 0 ? `
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    ${users.map(user => `
                        <tr>
                            <td>${user.username}</td>
                            <td>${user.email}</td>
                            <td><span class="badge badge-info">${user.role}</span></td>
                            <td>${formatDate(user.created_at)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        ` : '<p class="empty-state">No users found</p>';

        document.getElementById('usersList').innerHTML = html;
    } catch (error) {
        console.error('Users error:', error);
    }
};

// Status helpers
const getStatusBadge = (status) => {
    const map = {
        'pending': 'warning',
        'approved': 'info',
        'completed': 'success',
        'fulfilled': 'success',
        'cancelled': 'danger',
        'rejected': 'danger',
    };
    return map[status] || 'info';
};

const getPriorityBadge = (priority) => {
    const map = {
        'low': 'success',
        'medium': 'warning',
        'high': 'warning',
        'urgent': 'danger',
    };
    return map[priority] || 'info';
};

// Actions
const updatePurchaseStatus = async (id, status) => {
    try {
        await api(`/purchases/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status }),
        });
        showToast(`Purchase ${status} successfully`);
        loadPurchases();
    } catch (error) {
        console.error('Update purchase error:', error);
    }
};

const updateRequestStatus = async (id, status) => {
    try {
        await api(`/requests/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status }),
        });
        showToast(`Request ${status} successfully`);
        loadRequests();
        loadDashboard();
    } catch (error) {
        console.error('Update request error:', error);
    }
};

// Modal forms
const showAddItemForm = () => {
    const form = `
        <form id="addItemForm">
            <div class="form-group">
                <label>Name</label>
                <input type="text" name="name" required>
            </div>
            <div class="form-group">
                <label>SKU</label>
                <input type="text" name="sku" required>
            </div>
            <div class="form-group">
                <label>Category</label>
                <input type="text" name="category" required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea name="description"></textarea>
            </div>
            <div class="form-group">
                <label>Unit Price</label>
                <input type="number" step="0.01" name="unit_price" required>
            </div>
            <div class="form-group">
                <label>Reorder Level</label>
                <input type="number" name="reorder_level" required>
            </div>
            <div class="form-group">
                <label>Overstock Level</label>
                <input type="number" name="overstock_level" required>
            </div>
            <div class="form-actions">
                <button type="button" class="btn-secondary" onclick="hideModal()">Cancel</button>
                <button type="submit" class="btn-primary">Add Item</button>
            </div>
        </form>
    `;

    showModal('Add New Item', form);

    document.getElementById('addItemForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        data.unit_price = parseFloat(data.unit_price);
        data.reorder_level = parseInt(data.reorder_level);
        data.overstock_level = parseInt(data.overstock_level);

        try {
            await api('/items', {
                method: 'POST',
                body: JSON.stringify(data),
            });
            showToast('Item added successfully');
            hideModal();
            loadItems();
        } catch (error) {
            console.error('Add item error:', error);
        }
    });
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if logged in
    if (authToken && currentUser) {
        showApp();
    } else {
        showLogin();
    }

    // Login form
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        await login(username, password);
    });

    // Register form
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const role = document.getElementById('registerRole').value;
        await register(username, email, password, role);
    });

    // Toggle auth screens
    document.getElementById('showRegister').addEventListener('click', (e) => {
        e.preventDefault();
        showRegister();
    });

    document.getElementById('showLogin').addEventListener('click', (e) => {
        e.preventDefault();
        showLogin();
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', logout);

    // Menu toggle
    document.getElementById('menuToggle').addEventListener('click', () => {
        document.getElementById('sideNav').classList.toggle('open');
    });

    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            showView(item.dataset.view);
        });
    });

    // Modal close
    document.querySelector('.modal-close').addEventListener('click', hideModal);

    // Filters
    document.getElementById('inventoryLocationFilter').addEventListener('change', (e) => {
        loadInventory(e.target.value || null);
    });

    document.getElementById('showLowStockBtn').addEventListener('click', () => {
        loadInventory(null, 'low');
    });

    document.getElementById('showOverstockBtn').addEventListener('click', () => {
        loadInventory(null, 'over');
    });

    document.getElementById('purchaseLocationFilter').addEventListener('change', (e) => {
        const status = document.getElementById('purchaseStatusFilter').value;
        loadPurchases(e.target.value || null, status || null);
    });

    document.getElementById('purchaseStatusFilter').addEventListener('change', (e) => {
        const location = document.getElementById('purchaseLocationFilter').value;
        loadPurchases(location || null, e.target.value || null);
    });

    document.getElementById('budgetLocationFilter').addEventListener('change', (e) => {
        loadBudgets(e.target.value || null);
    });

    document.getElementById('requestLocationFilter').addEventListener('change', (e) => {
        const status = document.getElementById('requestStatusFilter').value;
        loadRequests(e.target.value || null, status || null);
    });

    document.getElementById('requestStatusFilter').addEventListener('change', (e) => {
        const location = document.getElementById('requestLocationFilter').value;
        loadRequests(location || null, e.target.value || null);
    });

    // Add buttons
    document.getElementById('addItemBtn').addEventListener('click', showAddItemForm);

    // Load locations for filters
    if (authToken) {
        loadLocationsForFilters();
    }
});

// Service Worker Registration (for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed:', err));
    });
}
