const API = window.location.origin + '/api';
let token = localStorage.getItem('token');
let user = JSON.parse(localStorage.getItem('user') || 'null');

const api = async (endpoint, options = {}) => {
    const headers = { 'Content-Type': 'application/json', ...options.headers };
    if (token && !options.skipAuth) headers['Authorization'] = `Bearer ${token}`;
    try {
        const response = await fetch(`${API}${endpoint}`, { ...options, headers });
        if (response.status === 401) { logout(); return null; }
        if (!response.ok) throw new Error(await response.text());
        if (response.status === 204) return null;
        return await response.json();
    } catch (error) {
        showToast(error.message, 'error');
        throw error;
    }
};

const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.getElementById('toastContainer').appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
};

const login = async (username, password) => {
    const data = await api('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        skipAuth: true,
    });
    if (data) {
        token = data.token;
        user = data.user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
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
        token = data.token;
        user = data.user;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        showApp();
    }
};

const logout = () => {
    token = null;
    user = null;
    localStorage.clear();
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('appScreen').classList.add('hidden');
};

const showApp = () => {
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('registerScreen').classList.add('hidden');
    document.getElementById('appScreen').classList.remove('hidden');
    document.getElementById('userName').textContent = user.username;
    document.querySelectorAll('.admin-only').forEach(el => {
        el.style.display = user.role === 'admin' ? '' : 'none';
    });
    loadDashboard();
    loadLocationsForFilters();
};

const showView = (viewName) => {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(`${viewName}View`).classList.add('active');
    document.querySelector(`[data-view="${viewName}"]`).classList.add('active');
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
    document.getElementById('sideNav').classList.remove('open');
};

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

        document.getElementById('lowStockList').innerHTML = lowStock && lowStock.length > 0 ? `
            <table><thead><tr><th>Item</th><th>Location</th><th>Current</th><th>Reorder Level</th></tr></thead>
            <tbody>${lowStock.slice(0, 5).map(item => `<tr><td>${item.item_name}</td><td>${item.location_name}</td>
            <td><span class="badge badge-danger">${item.quantity}</span></td><td>${item.reorder_level}</td></tr>`).join('')}</tbody></table>
        ` : '<p>No low stock items</p>';

        document.getElementById('recentRequestsList').innerHTML = requests && requests.length > 0 ? `
            <table><thead><tr><th>Item</th><th>Location</th><th>Quantity</th><th>Priority</th></tr></thead>
            <tbody>${requests.slice(0, 5).map(r => `<tr><td>${r.item_name}</td><td>${r.location_name}</td>
            <td>${r.quantity}</td><td><span class="badge badge-${r.priority === 'urgent' ? 'danger' : 'warning'}">${r.priority}</span></td></tr>`).join('')}</tbody></table>
        ` : '<p>No pending requests</p>';
    } catch (error) {
        console.error('Dashboard error:', error);
    }
};

const loadInventory = async (locationId = null, filter = null) => {
    try {
        let url = '/inventory';
        if (filter === 'low') url = '/inventory/low-stock';
        else if (filter === 'over') url = '/inventory/overstock';
        else if (locationId) url += `?location_id=${locationId}`;
        const inventory = await api(url);
        document.getElementById('inventoryList').innerHTML = inventory && inventory.length > 0 ? `
            <table><thead><tr><th>Item</th><th>SKU</th><th>Location</th><th>Quantity</th><th>Reorder</th></tr></thead>
            <tbody>${inventory.map(item => {
                let badge = 'badge-success';
                if (item.quantity <= item.reorder_level) badge = 'badge-danger';
                else if (item.quantity >= item.overstock_level) badge = 'badge-warning';
                return `<tr><td>${item.item_name}</td><td>${item.sku}</td><td>${item.location_name}</td>
                <td><span class="badge ${badge}">${item.quantity}</span></td><td>${item.reorder_level}</td></tr>`;
            }).join('')}</tbody></table>
        ` : '<p>No inventory records found</p>';
    } catch (error) {
        console.error('Inventory error:', error);
    }
};

const loadLocationsForFilters = async () => {
    const locations = await api('/locations');
    if (locations) {
        const options = locations.map(loc => `<option value="${loc.id}">${loc.name}</option>`).join('');
        document.querySelectorAll('[id$="LocationFilter"]').forEach(select => {
            select.innerHTML = '<option value="">All Locations</option>' + options;
        });
    }
};

const loadItems = async () => {
    try {
        const items = await api('/items');
        document.getElementById('itemsList').innerHTML = items && items.length > 0 ? `
            <table><thead><tr><th>Name</th><th>SKU</th><th>Category</th><th>Unit Price</th><th>Reorder</th></tr></thead>
            <tbody>${items.map(item => `<tr><td>${item.name}</td><td>${item.sku}</td><td>${item.category}</td>
            <td>$${item.unit_price.toFixed(2)}</td><td>${item.reorder_level}</td></tr>`).join('')}</tbody></table>
        ` : '<p>No items found</p>';
    } catch (error) {
        console.error('Items error:', error);
    }
};

const loadPurchases = async (locationId = null, status = null) => {
    try {
        let url = '/purchases';
        const params = [];
        if (locationId) params.push(`location_id=${locationId}`);
        if (status) params.push(`status=${status}`);
        if (params.length) url += '?' + params.join('&');
        const purchases = await api(url);
        document.getElementById('purchasesList').innerHTML = purchases && purchases.length > 0 ? `
            <table><thead><tr><th>Item</th><th>Location</th><th>Qty</th><th>Total</th><th>Vendor</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>${purchases.map(p => `<tr><td>${p.item_name}</td><td>${p.location_name}</td><td>${p.quantity}</td>
            <td>$${p.total_price.toFixed(2)}</td><td>${p.vendor}</td>
            <td><span class="badge badge-${p.status === 'completed' ? 'success' : 'warning'}">${p.status}</span></td>
            <td>${p.status === 'pending' ? `<button class="action-btn approve" onclick="updatePurchaseStatus(${p.id}, 'approved')">Approve</button>` : ''}
            ${p.status === 'approved' ? `<button class="action-btn approve" onclick="updatePurchaseStatus(${p.id}, 'completed')">Complete</button>` : ''}</td></tr>`).join('')}</tbody></table>
        ` : '<p>No purchases found</p>';
    } catch (error) {
        console.error('Purchases error:', error);
    }
};

const loadBudgets = async (locationId = null) => {
    try {
        let url = '/budgets';
        if (locationId) url += `?location_id=${locationId}`;
        const budgets = await api(url);
        document.getElementById('budgetsList').innerHTML = budgets && budgets.length > 0 ? `
            <table><thead><tr><th>Name</th><th>Amount</th><th>Spent</th><th>Remaining</th><th>Progress</th></tr></thead>
            <tbody>${budgets.map(b => {
                const remaining = b.amount - b.spent;
                const progress = (b.spent / b.amount * 100).toFixed(1);
                const badge = progress > 90 ? 'badge-danger' : progress > 75 ? 'badge-warning' : 'badge-success';
                return `<tr><td>${b.name}</td><td>$${b.amount.toFixed(2)}</td><td>$${b.spent.toFixed(2)}</td>
                <td>$${remaining.toFixed(2)}</td><td><span class="badge ${badge}">${progress}%</span></td></tr>`;
            }).join('')}</tbody></table>
        ` : '<p>No budgets found</p>';
    } catch (error) {
        console.error('Budgets error:', error);
    }
};

const loadRequests = async (locationId = null, status = null) => {
    try {
        let url = '/requests';
        const params = [];
        if (locationId) params.push(`location_id=${locationId}`);
        if (status) params.push(`status=${status}`);
        if (params.length) url += '?' + params.join('&');
        const requests = await api(url);
        document.getElementById('requestsList').innerHTML = requests && requests.length > 0 ? `
            <table><thead><tr><th>Item</th><th>Location</th><th>Qty</th><th>Priority</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>${requests.map(r => `<tr><td>${r.item_name}</td><td>${r.location_name}</td><td>${r.quantity}</td>
            <td><span class="badge badge-${r.priority === 'urgent' ? 'danger' : 'warning'}">${r.priority}</span></td>
            <td><span class="badge badge-${r.status === 'approved' ? 'success' : 'warning'}">${r.status}</span></td>
            <td>${r.status === 'pending' && (user.role === 'admin' || user.role === 'manager') ? `
                <button class="action-btn approve" onclick="updateRequestStatus(${r.id}, 'approved')">Approve</button>
                <button class="action-btn reject" onclick="updateRequestStatus(${r.id}, 'rejected')">Reject</button>` : ''}</td></tr>`).join('')}</tbody></table>
        ` : '<p>No requests found</p>';
    } catch (error) {
        console.error('Requests error:', error);
    }
};

const loadLocations = async () => {
    try {
        const locations = await api('/locations');
        document.getElementById('locationsList').innerHTML = locations && locations.length > 0 ? `
            <table><thead><tr><th>Name</th><th>Address</th></tr></thead>
            <tbody>${locations.map(loc => `<tr><td>${loc.name}</td><td>${loc.address}</td></tr>`).join('')}</tbody></table>
        ` : '<p>No locations found</p>';
    } catch (error) {
        console.error('Locations error:', error);
    }
};

const loadUsers = async () => {
    if (user.role !== 'admin') return;
    try {
        const users = await api('/users');
        document.getElementById('usersList').innerHTML = users && users.length > 0 ? `
            <table><thead><tr><th>Username</th><th>Email</th><th>Role</th></tr></thead>
            <tbody>${users.map(u => `<tr><td>${u.username}</td><td>${u.email}</td>
            <td><span class="badge badge-success">${u.role}</span></td></tr>`).join('')}</tbody></table>
        ` : '<p>No users found</p>';
    } catch (error) {
        console.error('Users error:', error);
    }
};

const updatePurchaseStatus = async (id, status) => {
    try {
        await api(`/purchases/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
        showToast(`Purchase ${status}`);
        loadPurchases();
    } catch (error) {
        console.error('Update purchase error:', error);
    }
};

const updateRequestStatus = async (id, status) => {
    try {
        await api(`/requests/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
        showToast(`Request ${status}`);
        loadRequests();
        loadDashboard();
    } catch (error) {
        console.error('Update request error:', error);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (token && user) {
        showApp();
    }

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await login(document.getElementById('loginUsername').value, document.getElementById('loginPassword').value);
    });

    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await register(
            document.getElementById('registerUsername').value,
            document.getElementById('registerEmail').value,
            document.getElementById('registerPassword').value,
            document.getElementById('registerRole').value
        );
    });

    document.getElementById('showRegister').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('registerScreen').classList.remove('hidden');
    });

    document.getElementById('showLogin').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('registerScreen').classList.add('hidden');
        document.getElementById('loginScreen').classList.remove('hidden');
    });

    document.getElementById('logoutBtn').addEventListener('click', logout);

    document.getElementById('menuToggle').addEventListener('click', () => {
        document.getElementById('sideNav').classList.toggle('open');
    });

    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => showView(item.dataset.view));
    });

    document.getElementById('inventoryLocationFilter').addEventListener('change', (e) => {
        loadInventory(e.target.value || null);
    });

    document.getElementById('showLowStockBtn').addEventListener('click', () => loadInventory(null, 'low'));
    document.getElementById('showOverstockBtn').addEventListener('click', () => loadInventory(null, 'over'));

    document.getElementById('purchaseLocationFilter').addEventListener('change', (e) => {
        loadPurchases(e.target.value || null, document.getElementById('purchaseStatusFilter').value || null);
    });

    document.getElementById('purchaseStatusFilter').addEventListener('change', (e) => {
        loadPurchases(document.getElementById('purchaseLocationFilter').value || null, e.target.value || null);
    });

    document.getElementById('budgetLocationFilter').addEventListener('change', (e) => {
        loadBudgets(e.target.value || null);
    });

    document.getElementById('requestLocationFilter').addEventListener('change', (e) => {
        loadRequests(e.target.value || null, document.getElementById('requestStatusFilter').value || null);
    });

    document.getElementById('requestStatusFilter').addEventListener('change', (e) => {
        loadRequests(document.getElementById('requestLocationFilter').value || null, e.target.value || null);
    });
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW registration failed:', err));
    });
}
