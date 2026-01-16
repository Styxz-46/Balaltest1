// ==================== KONFIGURASI ====================
const ADMIN_CONFIG = {
    password: "admin123", // Password default
    autoSaveInterval: 30000, // 30 detik
    sessionDuration: 3600000, // 1 jam
};

// ==================== DATA STORE ====================
let adminData = {
    // Statistik
    stats: {
        totalOrders: 0,
        totalRevenue: 0,
        totalProducts: 0,
        totalVisitors: 0,
        todayVisitors: 0,
        conversionRate: 0
    },
    
    // Produk
    products: [],
    
    // Pesanan
    orders: [],
    
    // Analitik
    analytics: {
        revenueData: [],
        visitorData: [],
        bestSellers: [],
        recentActivity: []
    },
    
    // Pengaturan
    settings: {
        storeName: "TakiStore",
        currency: "IDR",
        taxRate: 0,
        adminEmail: "admin@takistore.com"
    }
};

// ==================== CHART INSTANCES ====================
let revenueChart = null;
let productsChart = null;

// ==================== DOM ELEMENTS ====================
const passwordModal = document.getElementById('passwordModal');
const dashboardContent = document.getElementById('dashboardContent');
const adminPasswordInput = document.getElementById('adminPassword');
const submitPasswordBtn = document.getElementById('submitPassword');
const closePasswordModal = document.getElementById('closePasswordModal');
const passwordError = document.getElementById('passwordError');
const logoutBtn = document.getElementById('logoutBtn');
const navItems = document.querySelectorAll('.nav-item');

// ==================== FUNGSI UTAMA ====================

// Initialize dashboard
function initDashboard() {
    loadAdminData();
    updateDashboard();
    initCharts();
    setupEventListeners();
    startAutoUpdate();
    startSessionTimer();
}

// Load data from localStorage
function loadAdminData() {
    const savedData = localStorage.getItem('takistore_admin_data');
    if (savedData) {
        adminData = JSON.parse(savedData);
    } else {
        generateSampleData();
        saveAdminData();
    }
}

// Save data to localStorage
function saveAdminData() {
    localStorage.setItem('takistore_admin_data', JSON.stringify(adminData));
}

// Generate sample data for demo
function generateSampleData() {
    // Sample products
    const products = [
        {
            id: 1,
            name: "Alight Motion Pro",
            category: "Video Editing",
            sold: 156,
            stock: "Unlimited",
            revenue: 312000,
            rating: 4.8,
            status: "active",
            variants: 2,
            lastSale: "2024-01-15"
        },
        {
            id: 2,
            name: "CapCut Pro",
            category: "Video Editing",
            sold: 203,
            stock: "Unlimited",
            revenue: 1827000,
            rating: 4.9,
            status: "active",
            variants: 2,
            lastSale: "2024-01-14"
        },
        {
            id: 3,
            name: "Canva Pro",
            category: "Design Grafis",
            sold: 98,
            stock: "Unlimited",
            revenue: 588000,
            rating: 4.7,
            status: "active",
            variants: 2,
            lastSale: "2024-01-14"
        },
        {
            id: 4,
            name: "Wink Pro",
            category: "AI Enchancer",
            sold: 75,
            stock: "Unlimited",
            revenue: 450000,
            rating: 4.5,
            status: "active",
            variants: 3,
            lastSale: "2024-01-13"
        },
        {
            id: 5,
            name: "Spotify Premium",
            category: "Music",
            sold: 120,
            stock: "Unlimited",
            revenue: 1920000,
            rating: 4.9,
            status: "active",
            variants: 3,
            lastSale: "2024-01-13"
        },
        {
            id: 6,
            name: "iQIYI Premium",
            category: "Film",
            sold: 85,
            stock: "Unlimited",
            revenue: 595000,
            rating: 4.6,
            status: "active",
            variants: 3,
            lastSale: "2024-01-12"
        }
    ];

    // Sample orders
    const orders = [
        {
            id: "TS-2024-001",
            products: ["Alight Motion Pro - iOS"],
            customer: "customer@email.com",
            total: 2000,
            paymentMethod: "DANA",
            status: "completed",
            date: "2024-01-15 14:30",
            notes: "Pembayaran sukses"
        },
        {
            id: "TS-2024-002",
            products: ["CapCut Pro - 1 Month"],
            customer: "user123@gmail.com",
            total: 10000,
            paymentMethod: "QRIS",
            status: "completed",
            date: "2024-01-14 16:45",
            notes: ""
        },
        {
            id: "TS-2024-003",
            products: ["Spotify Premium - Family Plan"],
            customer: "musiclover@yahoo.com",
            total: 16000,
            paymentMethod: "DANA",
            status: "pending",
            date: "2024-01-14 09:20",
            notes: "Menunggu konfirmasi"
        },
        {
            id: "TS-2024-004",
            products: ["Canva Pro - 1 Month Owner"],
            customer: "designer@protonmail.com",
            total: 6000,
            paymentMethod: "QRIS",
            status: "completed",
            date: "2024-01-13 20:15",
            notes: ""
        },
        {
            id: "TS-2024-005",
            products: ["iQIYI Premium - 1 Year", "Wink Pro - 2 Week"],
            customer: "moviebuff@outlook.com",
            total: 21000,
            paymentMethod: "DANA",
            status: "completed",
            date: "2024-01-12 11:30",
            notes: "Beli paket combo"
        }
    ];

    // Calculate statistics
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalProducts = products.length;
    const totalVisitors = 1245;
    const todayVisitors = Math.floor(Math.random() * 50) + 30;
    const conversionRate = parseFloat(((totalOrders / totalVisitors) * 100).toFixed(2));

    // Generate revenue data for last 30 days
    const revenueData = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Generate realistic revenue data
        const baseRevenue = 50000;
        const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
        const multiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 1.5 : 1; // Weekend higher
        const randomFactor = 0.7 + Math.random() * 0.6; // 0.7 to 1.3
        const revenue = Math.floor(baseRevenue * multiplier * randomFactor);
        
        revenueData.push({
            date: date.toISOString().split('T')[0],
            revenue: revenue
        });
    }

    // Generate visitor data
    const visitorData = [];
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        const visitors = Math.floor(Math.random() * 50) + 20;
        visitorData.push({
            date: date.toISOString().split('T')[0],
            visitors: visitors
        });
    }

    // Get best sellers
    const bestSellers = [...products]
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 5);

    // Recent activity
    const recentActivity = [
        { action: "Pesanan baru", details: "TS-2024-005", time: "2 jam yang lalu" },
        { action: "Produk terjual", details: "Alight Motion Pro", time: "4 jam yang lalu" },
        { action: "Pengunjung baru", details: "+45 pengunjung hari ini", time: "6 jam yang lalu" },
        { action: "Pembayaran sukses", details: "DANA - Rp 16,000", time: "1 hari yang lalu" }
    ];

    adminData = {
        stats: {
            totalOrders,
            totalRevenue,
            totalProducts,
            totalVisitors,
            todayVisitors,
            conversionRate
        },
        products,
        orders,
        analytics: {
            revenueData,
            visitorData,
            bestSellers,
            recentActivity
        }
    };
}

// Update dashboard display
function updateDashboard() {
    // Update stats
    document.getElementById('statOrders').textContent = 
        adminData.stats.totalOrders.toLocaleString();
    document.getElementById('statRevenue').textContent = 
        formatRupiah(adminData.stats.totalRevenue);
    document.getElementById('statProducts').textContent = 
        adminData.stats.totalProducts.toLocaleString();
    document.getElementById('statVisitors').textContent = 
        adminData.stats.totalVisitors.toLocaleString();

    // Update tables
    updateOrdersTable();
    updateProductsTable();
}

// Format Rupiah
function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Update orders table
function updateOrdersTable() {
    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = '';
    
    // Get latest 5 orders
    const recentOrders = [...adminData.orders]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
    
    recentOrders.forEach(order => {
        const row = document.createElement('tr');
        
        // Status badge
        let statusBadge = '';
        if (order.status === 'completed') {
            statusBadge = `<span class="status-badge status-success">
                <i class="fas fa-check-circle"></i> Selesai
            </span>`;
        } else if (order.status === 'pending') {
            statusBadge = `<span class="status-badge status-pending">
                <i class="fas fa-clock"></i> Pending
            </span>`;
        } else {
            statusBadge = `<span class="status-badge status-warning">
                <i class="fas fa-exclamation-circle"></i> ${order.status}
            </span>`;
        }
        
        row.innerHTML = `
            <td><strong>${order.id}</strong></td>
            <td>
                <div class="product-cell">
                    <div>${order.products.join(', ')}</div>
                </div>
            </td>
            <td>${order.customer}</td>
            <td><strong>${formatRupiah(order.total)}</strong></td>
            <td>${statusBadge}</td>
            <td>${formatDate(order.date)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn" style="padding: 6px 12px; font-size: 0.75rem;" onclick="viewOrder('${order.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn" style="padding: 6px 12px; font-size: 0.75rem; background: var(--light);" onclick="editOrder('${order.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Update products table
function updateProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = '';
    
    // Sort by sold quantity
    const sortedProducts = [...adminData.products]
        .sort((a, b) => b.sold - a.sold);
    
    sortedProducts.forEach(product => {
        const row = document.createElement('tr');
        
        // Rating stars
        const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
        
        row.innerHTML = `
            <td>
                <div class="product-cell">
                    <div>
                        <div style="font-weight: 600;">${product.name}</div>
                        <div style="font-size: 0.85rem; color: var(--gray);">${product.variants} varian</div>
                    </div>
                </div>
            </td>
            <td><span style="background: var(--light); padding: 4px 12px; border-radius: 20px; font-size: 0.85rem;">${product.category}</span></td>
            <td><strong>${product.sold.toLocaleString()}</strong></td>
            <td>${product.stock}</td>
            <td><strong>${formatRupiah(product.revenue)}</strong></td>
            <td>
                <div style="color: var(--warning);">${stars}</div>
                <div style="font-size: 0.85rem; color: var(--gray);">${product.rating}/5</div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn" style="padding: 6px 12px; font-size: 0.75rem;" onclick="viewProduct(${product.id})">
                        <i class="fas fa-chart-line"></i>
                    </button>
                    <button class="btn" style="padding: 6px 12px; font-size: 0.75rem; background: var(--light);" onclick="editProduct(${product.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

// Initialize charts
function initCharts() {
    // Destroy existing charts
    if (revenueChart) revenueChart.destroy();
    if (productsChart) productsChart.destroy();
    
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    const revenueData = adminData.analytics.revenueData.slice(-30); // Last 30 days
    
    revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: revenueData.map(data => {
                const date = new Date(data.date);
                return date.getDate() + ' ' + date.toLocaleDateString('id-ID', { month: 'short' });
            }),
            datasets: [{
                label: 'Pendapatan',
                data: revenueData.map(data => data.revenue),
                borderColor: '#6366f1',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#6366f1',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return formatRupiah(context.raw);
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        borderDash: [5, 5]
                    },
                    ticks: {
                        callback: function(value) {
                            if (value >= 1000000) {
                                return 'Rp' + (value / 1000000).toFixed(1) + 'jt';
                            }
                            if (value >= 1000) {
                                return 'Rp' + (value / 1000).toFixed(0) + 'rb';
                            }
                            return 'Rp' + value;
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
    
    // Products Chart
    const productsCtx = document.getElementById('productsChart').getContext('2d');
    const bestSellers = adminData.analytics.bestSellers;
    
    productsChart = new Chart(productsCtx, {
        type: 'bar',
        data: {
            labels: bestSellers.map(product => product.name.substring(0, 12) + '...'),
            datasets: [{
                label: 'Terjual',
                data: bestSellers.map(product => product.sold),
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(139, 92, 246, 0.8)'
                ],
                borderColor: [
                    '#6366f1',
                    '#10b981',
                    '#f59e0b',
                    '#ef4444',
                    '#8b5cf6'
                ],
                borderWidth: 1,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        borderDash: [5, 5]
                    },
                    ticks: {
                        callback: function(value) {
                            return value + ' pcs';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    // Password submission
    submitPasswordBtn.addEventListener('click', function() {
        const password = adminPasswordInput.value;
        
        if (password === ADMIN_CONFIG.password) {
            // Success
            passwordModal.classList.remove('active');
            dashboardContent.style.display = 'block';
            initDashboard();
            
            // Save login timestamp
            localStorage.setItem('takistore_admin_login', new Date().toISOString());
            
            // Clear password field
            adminPasswordInput.value = '';
            passwordError.style.display = 'none';
        } else {
            // Error
            passwordError.style.display = 'block';
            adminPasswordInput.focus();
            adminPasswordInput.style.borderColor = 'var(--danger)';
            
            // Shake animation
            passwordModal.querySelector('.modal').style.animation = 'none';
            setTimeout(() => {
                passwordModal.querySelector('.modal').style.animation = 'modalSlideIn 0.3s ease-out';
            }, 10);
        }
    });
    
    // Enter key in password field
    adminPasswordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitPasswordBtn.click();
        }
    });
    
    // Close password modal
    closePasswordModal.addEventListener('click', function() {
        passwordModal.classList.remove('active');
    });
    
    // Logout
    logoutBtn.addEventListener('click', function() {
        if (confirm('Yakin ingin logout dari dashboard admin?')) {
            dashboardContent.style.display = 'none';
            passwordModal.classList.add('active');
            
            // Clear session
            localStorage.removeItem('takistore_admin_login');
        }
    });
    
    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Load section
            const section = this.getAttribute('data-section');
            loadSection(section);
        });
    });
    
    // Revenue period selector
    document.getElementById('revenuePeriod').addEventListener('change', function() {
        updateRevenueChart(parseInt(this.value));
    });
    
    // Refresh products button
    document.getElementById('refreshProducts').addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        setTimeout(() => {
            loadAdminData();
            updateDashboard();
            initCharts();
            this.innerHTML = '<i class="fas fa-sync-alt"></i>';
            
            showNotification('Data produk berhasil diperbarui!');
        }, 1000);
    });
    
    // View all orders button
    document.getElementById('viewAllOrders').addEventListener('click', function() {
        showNotification('Membuka halaman semua pesanan...');
        // In real implementation, this would navigate to orders page
    });
    
    // Manage products button
    document.getElementById('manageProducts').addEventListener('click', function() {
        showNotification('Membuka halaman kelola produk...');
        // In real implementation, this would navigate to products page
    });
    
    // User menu
    document.getElementById('userMenu').addEventListener('click', function() {
        alert('Menu pengguna:\n\n1. Profil Admin\n2. Ubah Password\n3. Logout');
    });
}

// Update revenue chart with different period
function updateRevenueChart(days) {
    const revenueData = adminData.analytics.revenueData.slice(-days);
    
    revenueChart.data.labels = revenueData.map(data => {
        const date = new Date(data.date);
        return date.getDate() + ' ' + date.toLocaleDateString('id-ID', { month: 'short' });
    });
    revenueChart.data.datasets[0].data = revenueData.map(data => data.revenue);
    revenueChart.update();
}

// Load section content
function loadSection(section) {
    // For now, just show notification
    // In a complete implementation, you would load different content
    showNotification(`Memuat halaman ${section}...`);
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.dashboard-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'dashboard-notification';
    
    let icon = 'info-circle';
    let bgColor = 'var(--primary)';
    
    if (type === 'success') {
        icon = 'check-circle';
        bgColor = 'var(--secondary)';
    } else if (type === 'error') {
        icon = 'exclamation-circle';
        bgColor = 'var(--danger)';
    } else if (type === 'warning') {
        icon = 'exclamation-triangle';
        bgColor = 'var(--warning)';
    }
    
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 100px;
            right: 30px;
            background: ${bgColor};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 2000;
            display: flex;
            align-items: center;
            gap: 12px;
            animation: slideIn 0.3s ease-out;
            max-width: 400px;
        ">
            <i class="fas fa-${icon}" style="font-size: 1.2rem;"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Start auto-update
function startAutoUpdate() {
    setInterval(() => {
        // Simulate data updates
        simulateLiveData();
        updateDashboard();
        
        // Update charts if they exist
        if (revenueChart) {
            revenueChart.update();
        }
        if (productsChart) {
            productsChart.update();
        }
        
        console.log('Dashboard auto-updated at', new Date().toLocaleTimeString());
    }, ADMIN_CONFIG.autoSaveInterval);
}

// Simulate live data updates
function simulateLiveData() {
    // Randomly add new visitors
    const visitorIncrease = Math.floor(Math.random() * 5);
    adminData.stats.totalVisitors += visitorIncrease;
    adminData.stats.todayVisitors += visitorIncrease;
    
    // Randomly add new orders (10% chance)
    if (Math.random() < 0.1) {
        const newOrder = {
            id: `TS-${new Date().getFullYear()}-${(adminData.orders.length + 1).toString().padStart(3, '0')}`,
            products: [adminData.products[Math.floor(Math.random() * adminData.products.length)].name],
            customer: `customer${Math.floor(Math.random() * 1000)}@email.com`,
            total: [2000, 6000, 10000, 16000][Math.floor(Math.random() * 4)],
            paymentMethod: Math.random() > 0.5 ? 'DANA' : 'QRIS',
            status: Math.random() > 0.3 ? 'completed' : 'pending',
            date: new Date().toISOString(),
            notes: ''
        };
        
        adminData.orders.unshift(newOrder);
        adminData.stats.totalOrders++;
        adminData.stats.totalRevenue += newOrder.total;
        
        // Update product sold count
        const productName = newOrder.products[0].split(' - ')[0];
        const product = adminData.products.find(p => p.name === productName);
        if (product) {
            product.sold++;
            product.revenue += newOrder.total;
            product.lastSale = new Date().toISOString().split('T')[0];
        }
    }
    
    // Update conversion rate
    adminData.stats.conversionRate = parseFloat(
        ((adminData.stats.totalOrders / adminData.stats.totalVisitors) * 100).toFixed(2)
    );
    
    saveAdminData();
}

// Start session timer
function startSessionTimer() {
    const loginTime = localStorage.getItem('takistore_admin_login');
    if (loginTime) {
        const loginDate = new Date(loginTime);
        const now = new Date();
        const sessionTime = now - loginDate;
        
        if (sessionTime > ADMIN_CONFIG.sessionDuration) {
            // Session expired
            showNotification('Sesi telah habis. Silakan login kembali.', 'warning');
            logoutBtn.click();
        } else {
            // Update remaining time every minute
            setInterval(() => {
                const remaining = ADMIN_CONFIG.sessionDuration - (new Date() - loginDate);
                if (remaining <= 60000) { // 1 minute left
                    showNotification('Sesi akan segera habis. Simpan pekerjaan Anda.', 'warning');
                }
            }, 60000); // Check every minute
        }
    }
}

// ==================== FUNGSI HELPER ====================
function viewOrder(orderId) {
    const order = adminData.orders.find(o => o.id === orderId);
    if (order) {
        alert(`Detail Pesanan:\n\nID: ${order.id}\nProduk: ${order.products.join(', ')}\nTotal: ${formatRupiah(order.total)}\nStatus: ${order.status}\nTanggal: ${formatDate(order.date)}`);
    }
}

function editOrder(orderId) {
    showNotification('Fitur edit pesanan dalam pengembangan', 'info');
}

function viewProduct(productId) {
    const product = adminData.products.find(p => p.id === productId);
    if (product) {
        alert(`Detail Produk:\n\nNama: ${product.name}\nKategori: ${product.category}\nTerjual: ${product.sold}\nPendapatan: ${formatRupiah(product.revenue)}\nRating: ${product.rating}/5\nStatus: ${product.status}`);
    }
}

function editProduct(productId) {
    showNotification('Fitur edit produk dalam pengembangan', 'info');
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
    // Check if already logged in
    const loginTime = localStorage.getItem('takistore_admin_login');
    if (loginTime) {
        const loginDate = new Date(loginTime);
        const now = new Date();
        const sessionTime = now - loginDate;
        
        if (sessionTime < ADMIN_CONFIG.sessionDuration) {
            // Still logged in
            dashboardContent.style.display = 'block';
            initDashboard();
        } else {
            // Session expired
            localStorage.removeItem('takistore_admin_login');
            passwordModal.classList.add('active');
        }
    } else {
        // Show password modal
        passwordModal.classList.add('active');
    }
    
    // Add CSS for notifications
    if (!document.querySelector('#dashboard-notification-style')) {
        const style = document.createElement('style');
        style.id = 'dashboard-notification-style';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});
