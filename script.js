// ==================== ADMIN TRACKING FUNCTIONS ====================

// Initialize admin tracking
function initAdminTracking() {
    // Load or create admin data
    let adminData = JSON.parse(localStorage.getItem('takistore_admin_data')) || {
        stats: {
            totalOrders: 0,
            totalRevenue: 0,
            totalProducts: 6, // Default product count
            totalVisitors: 0,
            todayVisitors: 0
        },
        analytics: {
            visits: [],
            sales: []
        }
    };
    
    // Track this visit
    trackVisit();
    
    // Save updated data
    localStorage.setItem('takistore_admin_data', JSON.stringify(adminData));
}

// Track each visit
function trackVisit() {
    let adminData = JSON.parse(localStorage.getItem('takistore_admin_data')) || {};
    
    if (!adminData.stats) adminData.stats = {};
    if (!adminData.analytics) adminData.analytics = {};
    if (!adminData.analytics.visits) adminData.analytics.visits = [];
    
    // Increment visitor count
    adminData.stats.totalVisitors = (adminData.stats.totalVisitors || 0) + 1;
    
    // Get today's date
    const today = new Date().toISOString().split('T')[0];
    
    // Check if we already tracked today
    const todayIndex = adminData.analytics.visits.findIndex(v => v.date === today);
    
    if (todayIndex >= 0) {
        // Increment today's count
        adminData.analytics.visits[todayIndex].count++;
        adminData.stats.todayVisitors = adminData.analytics.visits[todayIndex].count;
    } else {
        // Add new entry for today
        adminData.analytics.visits.push({
            date: today,
            count: 1
        });
        adminData.stats.todayVisitors = 1;
    }
    
    // Keep only last 90 days of data
    if (adminData.analytics.visits.length > 90) {
        adminData.analytics.visits = adminData.analytics.visits.slice(-90);
    }
    
    localStorage.setItem('takistore_admin_data', JSON.stringify(adminData));
}

// Track cart addition (modify existing addVariantToCartFunc)
function trackCartAddition(product, variant) {
    let adminData = JSON.parse(localStorage.getItem('takistore_admin_data')) || {};
    
    if (!adminData.analytics) adminData.analytics = {};
    if (!adminData.analytics.cartAdds) adminData.analytics.cartAdds = [];
    
    adminData.analytics.cartAdds.push({
        timestamp: new Date().toISOString(),
        product: product.name,
        variant: variant.name,
        price: variant.price
    });
    
    localStorage.setItem('takistore_admin_data', JSON.stringify(adminData));
}

// Track purchase completion (modify confirmBtn event listener)
function trackPurchaseCompletion(cartItems, totalAmount, paymentMethod) {
    let adminData = JSON.parse(localStorage.getItem('takistore_admin_data')) || {};
    
    if (!adminData.stats) adminData.stats = {};
    if (!adminData.analytics) adminData.analytics = {};
    if (!adminData.analytics.sales) adminData.analytics.sales = [];
    
    // Create order object
    const order = {
        id: 'TS-' + Date.now(),
        timestamp: new Date().toISOString(),
        items: cartItems.map(item => ({
            product: item.name,
            variant: item.variantName,
            quantity: item.quantity,
            price: item.price
        })),
        total: totalAmount,
        paymentMethod: paymentMethod,
        status: 'pending'
    };
    
    // Update statistics
    adminData.stats.totalOrders = (adminData.stats.totalOrders || 0) + 1;
    adminData.stats.totalRevenue = (adminData.stats.totalRevenue || 0) + totalAmount;
    
    // Add to sales history
    adminData.analytics.sales.push(order);
    
    // Update product sales count
    if (!adminData.products) {
        // Initialize products from main products array
        adminData.products = products.map(p => ({
            id: p.id,
            name: p.name,
            sold: 0,
            revenue: 0
        }));
    }
    
    // Update each product in cart
    cartItems.forEach(item => {
        const product = adminData.products.find(p => p.id === item.id);
        if (product) {
            product.sold += item.quantity;
            product.revenue += item.price * item.quantity;
        }
    });
    
    localStorage.setItem('takistore_admin_data', JSON.stringify(adminData));
    
    // Return order ID for WhatsApp message
    return order.id;
}

// ==================== MODIFY EXISTING FUNCTIONS ====================

// In addVariantToCartFunc(), add:
trackCartAddition(currentProduct, selectedVariant);

// In confirmBtn event listener, replace WhatsApp message generation with:
const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
const orderId = trackPurchaseCompletion(cart, total, selectedPaymentMethod);

// Update WhatsApp message to include order ID
let message = `Halo, saya ingin membeli aplikasi premium dari TakiStore:\n\n`;
message += `Order ID: ${orderId}\n\n`;

cart.forEach(item => {
    message += `Barang: ${item.name} - ${item.variantName}\n`;
    message += `Jumlah: ${item.quantity}\n`;
    message += `Subtotal: ${formatRupiah(item.price * item.quantity)}\n\n`;
});

message += `Total: ${formatRupiah(total)}\n`;
message += `Metode Pembayaran: ${selectedPaymentMethod === 'dana' ? 'DANA' : 'QRIS'}`;

// In init() function, add:
initAdminTracking();
