// Google OAuth Configuration
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'; // Ganti dengan Client ID Anda
// Atau gunakan testing client ID (tidak untuk production)
const TEST_CLIENT_ID = '1073168714455-9v9bv8v8v8v8v8v8v8v8v8v8v8v8v8v8.apps.googleusercontent.com';

// Fix untuk mobile viewport
function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Data produk aplikasi premium dengan varian
const products = [
    {
        id: 1,
        name: "Alight Motion Pro",
        description: "Aplikasi edit video premium dengan efek profesional untuk content creator.",
        baseImage: "alight.png",
        category: "Video Editing",
        variants: [
            {
                id: "alight-ios",
                name: "Alight Motion iOS",
                description: "Versi untuk iPhone dan iPad",
                price: 3000,
                image: "alight.png"
            },
            {
                id: "alight-android",
                name: "Alight Motion Android",
                description: "Versi untuk Android",
                price: 3000,
                image: "alight.png"
            },
        ]
    },
    {
        id: 2,
        name: "CapCut Pro",
        description: "Editor video dengan template eksklusif dan efek premium tanpa watermark.",
        baseImage: "capcut.png",
        category: "Video Editing",
        variants: [
            {
                id: "capcut-01",
                name: "CapCut 1 Week",
                description: "Capcut 1 Week",
                price: 6000,
                image: "capcut.png"
            },
            {
                id: "capcut-02",
                name: "CapCut 1 Month",
                description: "Versi untuk smartphone Android",
                price: 10000,
                image: "capcut.png"
            }
        ]
    },
    {
        id: 3,
        name: "Canva Pro",
        description: "Template premium, elemen desain lengkap, download transparan & animasi.",
        baseImage: "canva.png",
        category: "Design Grafis",
        variants: [
            {
                id: "canva-01",
                name: "Canva 1 Month Admin",
                description: "Akses penuh Canva Pro selama 1 bulan dengan kontrol admin.",
                price: 4000,
                image: "canva.png"
            },
            {
                id: "canva-02",
                name: "Canva 1 Month Owner",
                description: "Akses penuh Canva Pro selama 1 bulan dengan kontrol Owner.",
                price: 6000,
                image: "canva.png"
            }
        ]
    },
    {
        id: 4,
        name: "Wink Pro",
        description: "Meningkatkan kualitas foto dan video ke HD, Ultra HD, atau 4K",
        baseImage: "wink.png",
        category: "AI Enchancer",
        variants: [
            {
                id: "wink-01",
                name: "Wink 1 Week",
                description: "Nikmati akses penuh Wink Pro selama 1 minggu.",
                price: 4000,
                image: "wink.png"
            },
            {
                id: "wink-02",
                name: "Wink 2 Week",
                description: "Nikmati akses penuh Wink Pro selama 2 minggu.",
                price: 6000,
                image: "wink.png"
            },
            {
                id: "wink-03",
                name: "Wink 3 Week",
                description: "Nikmati akses penuh Wink Pro selama 3 minggu.",
                price: 8000,
                image: "inshot-pro.png"
            }
        ]
    },
    {
        id: 6,
        name: "Spotify Premium",
        description: "Streaming musik tanpa iklan dengan kualitas tinggi dan download offline.",
        baseImage: "spotify.png",
        category: "Music",
        variants: [
            {
                id: "spotify-01",
                name: "Spotify 1 Month Family Plan",
                description: "Akses premium Spotify untuk seluruh anggota keluarga",
                price: 16000,
                image: "spotify.png"
            },
            {
                id: "spotify-02",
                name: "Spotify 1 Month Individu Plan",
                description: "Akses premium Spotify untuk 1 pengguna.",
                price: 14000,
                image: "spotify.png"
            },
            {
                id: "spotify-03",
                name: "Spotify 3 Month Individu Plan",
                description: "Paket individu dengan durasi 3 bulan.",
                price: 20000,
                image: "spotify.png"
            }
        ]
    },
    {
        id: 7,
        name: "iQIYI Premium",
        description: "Aplikasi streaming film, drama Asia, anime, dan variety show dengan subtitle Indonesia.",
        baseImage: "iqiyi.png",
        category: "Film",
        variants: [
            {
                id: "iqiyi-01",
                name: "iQIYI 1 Month Premium",
                description: "Nikmati streaming tanpa iklan selama 1 bulan. Akses konten eksklusif, episode terbaru lebih cepat, dan kualitas video HD hingga Full HD. Cocok untuk pecinta drama, film, dan anime Asia.",
                price: 7000,
                image: "iqiyi.png"
            },
            {
                id: "iqiyi-02",
                name: "iQIYI 1 Month Standar",
                description: "Akses iQIYI versi standar untuk menonton berbagai film, drama, dan anime dengan kualitas video dasar. Cocok untuk pengguna yang ingin hiburan hemat dengan fitur utama iQIYI.",
                price: 6000,
                image: "iqiyi.png"
            },
            {
                id: "iqiyi-03",
                name: "iQIYI",
                description: "Paket premium tahunan dengan harga lebih hemat. Streaming tanpa iklan, akses semua konten eksklusif, kualitas video HD / Full HD, dan pengalaman menonton nyaman sepanjang tahun tanpa perlu perpanjang bulanan.",
                price: 15000,
                image: "iqiyi.png"
            }      
        ]
    }
];

// Variabel global
let user = null;
let cart = [];
let selectedPaymentMethod = null;
let currentProduct = null;
let selectedVariant = null;
let variantQuantity = 1;
let orders = [];
let ratings = [];

// DOM Elements
const loginModal = document.getElementById('loginModal');
const mainContent = document.getElementById('mainContent');
const googleLoginBtn = document.getElementById('googleLoginBtn');
const googleButtonContainer = document.getElementById('googleButtonContainer');
const userProfile = document.getElementById('userProfile');
const userAvatar = document.getElementById('userAvatar');
const userName = document.getElementById('userName');

const productsGrid = document.getElementById('productsGrid');
const cartItemsContainer = document.getElementById('cartItems');
const emptyCart = document.getElementById('emptyCart');
const cartCount = document.getElementById('cartCount');
const totalPrice = document.getElementById('totalPrice');
const confirmBtn = document.getElementById('confirmBtn');
const openCartBtn = document.getElementById('openCart');
const closeCartBtn = document.getElementById('closeCart');
const cartSidebar = document.getElementById('cartSidebar');
const overlay = document.getElementById('overlay');
const orderModal = document.getElementById('orderModal');
const orderSummary = document.getElementById('orderSummary');
const closeModal = document.getElementById('closeModal');
const paymentSection = document.getElementById('paymentSection');
const paymentError = document.getElementById('paymentError');

// Variant Modal Elements
const variantModal = document.getElementById('variantModal');
const variantModalTitle = document.getElementById('variantModalTitle');
const variantList = document.getElementById('variantList');
const closeVariant = document.getElementById('closeVariant');
const variantQty = document.getElementById('variantQty');
const decreaseQty = document.getElementById('decreaseQty');
const increaseQty = document.getElementById('increaseQty');
const addVariantToCart = document.getElementById('addVariantToCart');

// Orders Section
const ordersList = document.getElementById('ordersList');
const ratingsGrid = document.getElementById('ratingsGrid');

// Format harga ke Rupiah
function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Sensor nama pengguna
function censorName(fullName) {
    if (!fullName) return 'Anonymous';
    
    const names = fullName.split(' ');
    let censored = '';
    
    names.forEach(name => {
        if (name.length <= 2) {
            censored += name.charAt(0) + '*';
        } else {
            censored += name.charAt(0);
            for (let i = 1; i < name.length - 1; i++) {
                censored += '*';
            }
            censored += name.charAt(name.length - 1);
        }
        censored += ' ';
    });
    
    return censored.trim();
}

// Fungsi untuk menginisialisasi Google Sign-In
function initializeGoogleSignIn() {
    google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: false
    });
    
    // Render Google Sign-In button
    google.accounts.id.renderButton(
        googleButtonContainer,
        {
            type: 'standard',
            theme: 'outline',
            size: 'large',
            text: 'continue_with',
            shape: 'rectangular',
            logo_alignment: 'left'
        }
    );
}

// Handle Google Sign-In response
function handleCredentialResponse(response) {
    const responsePayload = JSON.parse(atob(response.credential.split('.')[1]));
    
    user = {
        id: responsePayload.sub,
        name: responsePayload.name,
        email: responsePayload.email,
        picture: responsePayload.picture,
        token: response.credential
    };
    
    // Simpan user ke localStorage
    localStorage.setItem('takistore_user', JSON.stringify(user));
    
    // Load data user dari localStorage
    loadUserData();
    
    // Tampilkan konten utama
    showMainContent();
}

// Login dengan Google
function loginWithGoogle() {
    google.accounts.id.prompt();
}

// Logout
function logout() {
    google.accounts.id.disableAutoSelect();
    localStorage.removeItem('takistore_user');
    localStorage.removeItem('takistore_cart');
    localStorage.removeItem('takistore_orders');
    localStorage.removeItem('takistore_ratings');
    
    user = null;
    cart = [];
    orders = [];
    ratings = [];
    
    // Tampilkan login modal
    showLoginModal();
}

// Tampilkan modal login
function showLoginModal() {
    loginModal.style.display = 'flex';
    mainContent.style.display = 'none';
}

// Tampilkan konten utama
function showMainContent() {
    loginModal.style.display = 'none';
    mainContent.style.display = 'block';
    
    // Update user profile
    updateUserProfile();
    
    // Load data
    loadCart();
    loadOrders();
    loadRatings();
    
    // Render konten
    renderProducts();
    updateCart();
    renderOrders();
    renderRatings();
}

// Update user profile di header
function updateUserProfile() {
    if (user) {
        userName.textContent = user.name;
        userAvatar.innerHTML = `<img src="${user.picture}" alt="${user.name}">`;
    }
}

// Load user data dari localStorage
function loadUserData() {
    const savedUser = localStorage.getItem('takistore_user');
    if (savedUser) {
        user = JSON.parse(savedUser);
    }
}

// Load cart dari localStorage
function loadCart() {
    const savedCart = localStorage.getItem(`takistore_cart_${user?.id}`);
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Save cart ke localStorage
function saveCart() {
    if (user) {
        localStorage.setItem(`takistore_cart_${user.id}`, JSON.stringify(cart));
    }
}

// Load orders dari localStorage
function loadOrders() {
    const savedOrders = localStorage.getItem('takistore_orders');
    if (savedOrders) {
        orders = JSON.parse(savedOrders).filter(order => order.userId === user?.id);
    }
}

// Save orders ke localStorage
function saveOrders() {
    const allOrders = JSON.parse(localStorage.getItem('takistore_orders') || '[]');
    
    // Hapus orders user yang lama
    const otherOrders = allOrders.filter(order => order.userId !== user?.id);
    
    // Tambahkan orders user yang baru
    const updatedOrders = [...otherOrders, ...orders];
    localStorage.setItem('takistore_orders', JSON.stringify(updatedOrders));
}

// Load ratings dari localStorage
function loadRatings() {
    const savedRatings = localStorage.getItem('takistore_ratings');
    if (savedRatings) {
        ratings = JSON.parse(savedRatings);
    }
}

// Save ratings ke localStorage
function saveRatings() {
    localStorage.setItem('takistore_ratings', JSON.stringify(ratings));
}

// Render produk ke halaman
function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${product.baseImage}" alt="${product.name}" class="product-image">
                <div class="product-badge">${product.category}</div>
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <button class="add-to-cart" data-id="${product.id}">
                        <i class="fas fa-cart-plus"></i> Pilih Varian
                    </button>
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Tambahkan event listener ke tombol pilih varian
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', openVariantModal);
    });
}

// Buka modal pilihan varian
function openVariantModal(event) {
    if (!user) {
        alert('Silakan login terlebih dahulu!');
        return;
    }
    
    const productId = parseInt(event.currentTarget.getAttribute('data-id'));
    currentProduct = products.find(p => p.id === productId);
    
    if (!currentProduct) return;
    
    // Reset pilihan varian dan quantity
    selectedVariant = null;
    variantQuantity = 1;
    variantQty.textContent = '1';
    addVariantToCart.disabled = true;
    
    // Set judul modal
    variantModalTitle.textContent = `Pilih Varian - ${currentProduct.name}`;
    
    // Render daftar varian
    renderVariants();
    
    // Buka modal
    variantModal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Render daftar varian
function renderVariants() {
    variantList.innerHTML = '';
    
    currentProduct.variants.forEach(variant => {
        const variantItem = document.createElement('div');
        variantItem.className = 'variant-item';
        variantItem.setAttribute('data-id', variant.id);
        
        variantItem.innerHTML = `
            <div>
                <div class="variant-name">${variant.name}</div>
                <div class="variant-description">${variant.description}</div>
            </div>
            <div class="variant-price">${formatRupiah(variant.price)}</div>
        `;
        
        // Event listener untuk memilih varian
        variantItem.addEventListener('click', () => {
            // Hapus seleksi dari semua varian
            document.querySelectorAll('.variant-item').forEach(item => {
                item.classList.remove('selected');
            });
            
            // Tambah seleksi ke varian yang dipilih
            variantItem.classList.add('selected');
            selectedVariant = variant;
            addVariantToCart.disabled = false;
        });
        
        variantList.appendChild(variantItem);
    });
}

// Tutup modal varian
function closeVariantModal() {
    variantModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Tambah varian ke keranjang
function addVariantToCartFunc() {
    if (!currentProduct || !selectedVariant) return;
    
    // Cek apakah varian sudah ada di keranjang
    const existingItem = cart.find(item => item.variantId === selectedVariant.id);
    
    if (existingItem) {
        existingItem.quantity += variantQuantity;
    } else {
        cart.push({
            id: currentProduct.id,
            name: currentProduct.name,
            variantId: selectedVariant.id,
            variantName: selectedVariant.name,
            price: selectedVariant.price,
            image: selectedVariant.image,
            quantity: variantQuantity
        });
    }
    
    // Simpan ke localStorage
    saveCart();
    
    // Update tampilan keranjang
    updateCart();
    
    // Tutup modal varian
    closeVariantModal();
    
    // Buka keranjang
    openCart();
    
    // Tampilkan notifikasi sukses
    showNotification(`${selectedVariant.name} ditambahkan ke keranjang!`);
}

// Tampilkan notifikasi
function showNotification(message) {
    // Hapus notifikasi sebelumnya jika ada
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Buat elemen notifikasi
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--secondary);
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            z-index: 2000;
            display: flex;
            align-items: center;
            gap: 12px;
            animation: slideIn 0.3s ease-out;
        ">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Hapus notifikasi setelah 3 detik
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
    
    // Tambahkan animasi CSS
    const style = document.createElement('style');
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
    if (!document.querySelector('#notification-style')) {
        style.id = 'notification-style';
        document.head.appendChild(style);
    }
}

// Update tampilan keranjang
function updateCart() {
    // Update jumlah item di ikon keranjang
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Tampilkan atau sembunyikan keranjang kosong
    if (cart.length === 0) {
        emptyCart.style.display = 'flex';
        paymentSection.style.display = 'none';
        confirmBtn.disabled = true;
    } else {
        emptyCart.style.display = 'none';
        paymentSection.style.display = 'block';
        
        // Reset metode pembayaran jika keranjang kosong
        selectedPaymentMethod = null;
        document.querySelectorAll('.payment-method').forEach(method => {
            method.classList.remove('selected');
        });
        
        // Enable/disable tombol konfirmasi berdasarkan pemilihan metode
        updateConfirmButtonState();
        
        // Render item di keranjang
        renderCartItems();
    }
    
    // Update total harga
    updateTotalPrice();
}

// Render item di keranjang
function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    
    // Jika keranjang kosong, tampilkan pesan
    if (cart.length === 0) {
        emptyCart.style.display = 'flex';
        return;
    }
    
    emptyCart.style.display = 'none';
    
    // Tambahkan item baru
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.setAttribute('data-id', item.variantId);
        
        cartItem.innerHTML = `
            <img src="${item.image || item.baseImage || 'default.png'}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-variant">${item.variantName}</div>
                <div class="cart-item-price">${formatRupiah(item.price)}</div>
            </div>
            <div class="cart-item-controls">
                <div class="quantity-control">
                    <button class="quantity-btn decrease">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button class="quantity-btn increase">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <button class="remove-item">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Tambahkan event listener untuk kontrol kuantitas
    attachCartEventListeners();
}

// Fungsi untuk menambahkan event listener ke item keranjang
function attachCartEventListeners() {
    // Event listener untuk tombol tambah
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const cartItem = this.closest('.cart-item');
            const variantId = cartItem.getAttribute('data-id');
            increaseQuantity(variantId);
        });
    });
    
    // Event listener untuk tombol kurang
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const cartItem = this.closest('.cart-item');
            const variantId = cartItem.getAttribute('data-id');
            decreaseQuantity(variantId);
        });
    });
    
    // Event listener untuk tombol hapus
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const cartItem = this.closest('.cart-item');
            const variantId = cartItem.getAttribute('data-id');
            removeItem(variantId);
        });
    });
}

// Update total harga
function updateTotalPrice() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPrice.textContent = formatRupiah(total);
}

// Tambah jumlah item
function increaseQuantity(variantId) {
    const item = cart.find(item => item.variantId === variantId);
    if (item) {
        item.quantity += 1;
        saveCart();
        updateCart();
    }
}

// Kurangi jumlah item
function decreaseQuantity(variantId) {
    const item = cart.find(item => item.variantId === variantId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            // Jika jumlah menjadi 0, hapus item dari keranjang
            cart = cart.filter(cartItem => cartItem.variantId !== variantId);
        }
        saveCart();
        updateCart();
    }
}

// Hapus item dari keranjang
function removeItem(variantId) {
    cart = cart.filter(item => item.variantId !== variantId);
    saveCart();
    updateCart();
}

// Fungsi untuk memilih metode pembayaran
function selectPaymentMethod(method) {
    // Hapus seleksi dari semua metode
    document.querySelectorAll('.payment-method').forEach(method => {
        method.classList.remove('selected');
    });
    
    // Tambah seleksi ke metode yang dipilih
    const selectedElement = document.querySelector(`[data-method="${method}"]`);
    selectedElement.classList.add('selected');
    
    // Simpan metode yang dipilih
    selectedPaymentMethod = method;
    
    // Sembunyikan pesan error
    paymentError.style.display = 'none';
    
    // Update state tombol konfirmasi
    updateConfirmButtonState();
}

// Update state tombol konfirmasi berdasarkan kondisi
function updateConfirmButtonState() {
    if (cart.length === 0) {
        confirmBtn.disabled = true;
    } else if (selectedPaymentMethod) {
        confirmBtn.disabled = false;
    } else {
        confirmBtn.disabled = true;
    }
}

// Generate pesan untuk WhatsApp sesuai format yang diminta
function generateWhatsAppMessage() {
    let message = `Halo, saya ingin membeli aplikasi premium dari TakiStore:\n\n`;
    message += `Nama: ${user.name}\n`;
    message += `Email: ${user.email}\n\n`;
    
    cart.forEach(item => {
        message += `Barang: ${item.name} - ${item.variantName}\n`;
        message += `Jumlah: ${item.quantity}\n`;
        message += `Subtotal: ${formatRupiah(item.price * item.quantity)}\n\n`;
    });
    
    // Hitung total semua barang
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `Total: ${formatRupiah(total)}\n`;
    message += `Metode Pembayaran: ${selectedPaymentMethod === 'dana' ? 'DANA' : 'QRIS'}`;
    
    return encodeURIComponent(message);
}

// Generate ringkasan pesanan untuk modal
function generateOrderSummary() {
    let summary = '';
    
    cart.forEach(item => {
        summary += `
            <div class="order-item">
                <div>
                    <div><strong>${item.name}</strong></div>
                    <div style="font-size: 0.85rem; color: var(--gray);">${item.variantName}</div>
                    <div style="font-size: 0.9rem; color: var(--gray);">${item.quantity} x ${formatRupiah(item.price)}</div>
                </div>
                <div>${formatRupiah(item.price * item.quantity)}</div>
            </div>
        `;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Tambahkan metode pembayaran di ringkasan
    let paymentMethodText = '';
    if (selectedPaymentMethod === 'dana') {
        paymentMethodText = 'DANA';
    } else if (selectedPaymentMethod === 'qris') {
        paymentMethodText = 'QRIS';
    }
    
    summary += `
        <div class="order-item">
            <div><strong>Metode Pembayaran</strong></div>
            <div>${paymentMethodText}</div>
        </div>
        <div class="order-total">
            <span>Total</span>
            <span>${formatRupiah(total)}</span>
        </div>
    `;
    
    return summary;
}

// Buat pesanan baru
function createOrder() {
    const orderId = 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    const orderDate = new Date().toISOString();
    
    const order = {
        id: orderId,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        date: orderDate,
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        paymentMethod: selectedPaymentMethod,
        status: 'shipping', // Sedang dikirim
        rating: null // Belum ada rating
    };
    
    orders.push(order);
    saveOrders();
    
    // Kosongkan keranjang
    cart = [];
    saveCart();
    
    return order;
}

// Render pesanan
function renderOrders() {
    ordersList.innerHTML = '';
    
    if (orders.length === 0) {
        ordersList.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--gray);">
                <i class="fas fa-box-open" style="font-size: 3rem; margin-bottom: 16px;"></i>
                <h3>Belum ada pesanan</h3>
                <p>Belum ada pesanan yang Anda buat</p>
            </div>
        `;
        return;
    }
    
    // Urutkan pesanan berdasarkan tanggal (terbaru dulu)
    orders.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    orders.forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = 'order-card';
        
        // Format tanggal
        const date = new Date(order.date);
        const formattedDate = date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Status text
        let statusText = 'Sedang Dikirim';
        let statusClass = 'status-shipping';
        
        if (order.status === 'delivered') {
            statusText = 'Sudah Dikirim';
            statusClass = 'status-delivered';
        } else if (order.status === 'pending') {
            statusText = 'Menunggu';
            statusClass = 'status-pending';
        }
        
        orderCard.innerHTML = `
            <div class="order-header">
                <div>
                    <div class="order-id">${order.id}</div>
                    <div class="order-date">${formattedDate}</div>
                </div>
                <div class="order-status ${statusClass}">${statusText}</div>
            </div>
            
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item-detail">
                        <div>
                            <div class="order-item-name">${item.name} - ${item.variantName}</div>
                            <div class="order-item-quantity">${item.quantity} x ${formatRupiah(item.price)}</div>
                        </div>
                        <div>${formatRupiah(item.price * item.quantity)}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="order-footer">
                <div class="order-total-amount">Total: ${formatRupiah(order.total)}</div>
                ${order.status === 'delivered' && !order.rating ? `
                    <button class="submit-rating-btn" data-order-id="${order.id}">
                        Beri Rating
                    </button>
                ` : ''}
                ${order.rating ? `
                    <div class="already-rated">
                        <i class="fas fa-star"></i>
                        Anda sudah memberi rating ${order.rating}/5
                    </div>
                ` : ''}
            </div>
            
            ${order.status === 'delivered' && !order.rating ? `
                <div class="rating-section" id="ratingSection-${order.id}" style="display: none;">
                    <div class="rating-title">Beri Rating untuk Pesanan ini</div>
                    <div class="rating-stars" id="stars-${order.id}">
                        ${[1, 2, 3, 4, 5].map(star => `
                            <i class="fas fa-star rating-star" data-rating="${star}" data-order-id="${order.id}"></i>
                        `).join('')}
                    </div>
                    <button class="submit-rating-btn" id="submitRating-${order.id}" data-order-id="${order.id}" disabled>
                        Kirim Rating
                    </button>
                </div>
            ` : ''}
        `;
        
        ordersList.appendChild(orderCard);
    });
    
    // Tambahkan event listener untuk rating
    setupRatingListeners();
}

// Setup rating listeners
function setupRatingListeners() {
    // Event listener untuk tombol "Beri Rating"
    document.querySelectorAll('.submit-rating-btn[data-order-id]').forEach(button => {
        if (!button.id.startsWith('submitRating-')) {
            button.addEventListener('click', function() {
                const orderId = this.getAttribute('data-order-id');
                const ratingSection = document.getElementById(`ratingSection-${orderId}`);
                ratingSection.style.display = 'block';
                this.style.display = 'none';
            });
        }
    });
    
    // Event listener untuk bintang rating
    document.querySelectorAll('.rating-star').forEach(star => {
        star.addEventListener('click', function() {
            const orderId = this.getAttribute('data-order-id');
            const rating = parseInt(this.getAttribute('data-rating'));
            
            // Update tampilan bintang
            const stars = document.querySelectorAll(`#stars-${orderId} .rating-star`);
            stars.forEach((s, index) => {
                if (index < rating) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });
            
            // Enable tombol submit
            const submitBtn = document.getElementById(`submitRating-${orderId}`);
            submitBtn.disabled = false;
            submitBtn.setAttribute('data-rating', rating);
        });
    });
    
    // Event listener untuk submit rating
    document.querySelectorAll('[id^="submitRating-"]').forEach(button => {
        button.addEventListener('click', function() {
            const orderId = this.getAttribute('data-order-id');
            const rating = parseInt(this.getAttribute('data-rating'));
            
            // Tambahkan rating ke order
            const order = orders.find(o => o.id === orderId);
            if (order) {
                order.rating = rating;
                
                // Tambahkan rating ke daftar ratings
                const newRating = {
                    id: 'RAT-' + Date.now(),
                    orderId: orderId,
                    userId: user.id,
                    userName: user.name,
                    rating: rating,
                    date: new Date().toISOString(),
                    productNames: order.items.map(item => item.name).join(', ')
                };
                
                ratings.push(newRating);
                saveRatings();
                saveOrders();
                
                // Update tampilan
                renderOrders();
                renderRatings();
                
                // Tampilkan notifikasi
                showNotification('Terima kasih telah memberikan rating!');
            }
        });
    });
}

// Render ratings
function renderRatings() {
    ratingsGrid.innerHTML = '';
    
    if (ratings.length === 0) {
        ratingsGrid.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--gray); grid-column: 1 / -1;">
                <i class="fas fa-star" style="font-size: 3rem; margin-bottom: 16px;"></i>
                <h3>Belum ada ulasan</h3>
                <p>Jadilah yang pertama memberikan ulasan</p>
            </div>
        `;
        return;
    }
    
    // Urutkan ratings berdasarkan tanggal (terbaru dulu)
    ratings.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Ambil 10 rating terbaru
    const recentRatings = ratings.slice(0, 10);
    
    recentRatings.forEach(rating => {
        const ratingCard = document.createElement('div');
        ratingCard.className = 'rating-card';
        
        // Format tanggal
        const date = new Date(rating.date);
        const formattedDate = date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        // Sensor nama
        const censoredName = censorName(rating.userName);
        
        // Bintang rating
        const stars = '★'.repeat(rating.rating) + '☆'.repeat(5 - rating.rating);
        
        ratingCard.innerHTML = `
            <div class="rating-header">
                <div class="rating-user">${censoredName}</div>
                <div class="rating-date">${formattedDate}</div>
            </div>
            <div class="rating-stars-display">${stars}</div>
            <div class="rating-comment">Membeli: ${rating.productNames}</div>
        `;
        
        ratingsGrid.appendChild(ratingCard);
    });
}

// Buka keranjang
function openCart() {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Tutup keranjang
function closeCart() {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Buka modal
function openModal() {
    orderModal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Tutup modal
function closeModalFunc() {
    orderModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Validasi sebelum konfirmasi
function validateBeforeConfirm() {
    if (cart.length === 0) {
        alert('Keranjang belanja kosong! Tambahkan produk terlebih dahulu.');
        return false;
    }
    
    if (!selectedPaymentMethod) {
        // Tampilkan pesan error
        paymentError.style.display = 'block';
        
        // Scroll ke bagian pembayaran
        paymentSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Animasi error
        paymentSection.style.animation = 'none';
        setTimeout(() => {
            paymentSection.style.animation = 'shake 0.5s ease-in-out';
        }, 10);
        
        return false;
    }
    
    return true;
}

// Simulasikan pengiriman (ubah status dari shipping ke delivered setelah 5 detik)
function simulateDelivery(orderId) {
    setTimeout(() => {
        const order = orders.find(o => o.id === orderId);
        if (order && order.status === 'shipping') {
            order.status = 'delivered';
            saveOrders();
            renderOrders();
            showNotification('Pesanan sudah terkirim! Silakan beri rating.');
        }
    }, 5000); // 5 detik untuk simulasi
}

// Inisialisasi aplikasi
function init() {
    // Set viewport height untuk mobile
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
    
    // Load user data
    loadUserData();
    
    if (user) {
        // User sudah login
        showMainContent();
    } else {
        // User belum login
        showLoginModal();
        
        // Inisialisasi Google Sign-In
        if (typeof google !== 'undefined') {
            initializeGoogleSignIn();
        } else {
            // Fallback jika Google API belum load
            googleLoginBtn.addEventListener('click', () => {
                alert('Google Sign-In sedang dimuat. Silakan coba lagi.');
            });
        }
    }
    
    // Event listener untuk metode pembayaran
    document.querySelectorAll('.payment-method').forEach(method => {
        method.addEventListener('click', function() {
            const methodName = this.getAttribute('data-method');
            selectPaymentMethod(methodName);
        });
    });
    
    // Event listener untuk kontrol quantity di modal varian
    decreaseQty.addEventListener('click', () => {
        if (variantQuantity > 1) {
            variantQuantity--;
            variantQty.textContent = variantQuantity;
        }
    });
    
    increaseQty.addEventListener('click', () => {
        variantQuantity++;
        variantQty.textContent = variantQuantity;
    });
    
    // Event listener untuk tombol tambah ke keranjang di modal varian
    addVariantToCart.addEventListener('click', addVariantToCartFunc);
    
    // Event listener untuk tutup modal varian
    closeVariant.addEventListener('click', closeVariantModal);
    
    // Event listener untuk overlay
    overlay.addEventListener('click', () => {
        closeCart();
        closeModalFunc();
        closeVariantModal();
    });
    
    // Event listener untuk keranjang
    openCartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    
    // Event listener untuk user profile (logout)
    userProfile.addEventListener('click', () => {
        if (confirm('Apakah Anda ingin logout?')) {
            logout();
        }
    });
    
    // Event listener untuk tombol konfirmasi
    confirmBtn.addEventListener('click', () => {
        // Validasi sebelum konfirmasi
        if (!validateBeforeConfirm()) {
            return;
        }
        
        // Nomor WhatsApp Anda
        const phoneNumber = "6287716817586";
        const message = generateWhatsAppMessage();
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        
        // Buka WhatsApp di tab baru
        window.open(whatsappUrl, '_blank');
        
        // Buat pesanan baru
        const newOrder = createOrder();
        
        // Tampilkan modal konfirmasi
        orderSummary.innerHTML = generateOrderSummary();
        openModal();
        
        // Update tampilan keranjang
        updateCart();
        
        // Update tampilan pesanan
        renderOrders();
        
        // Reset metode pembayaran
        selectedPaymentMethod = null;
        document.querySelectorAll('.payment-method').forEach(method => {
            method.classList.remove('selected');
        });
        
        // Simulasikan pengiriman
        simulateDelivery(newOrder.id);
        
        // Tutup keranjang
        setTimeout(() => {
            closeCart();
        }, 1000);
    });
    
    // Event listener untuk tutup modal
    closeModal.addEventListener('click', closeModalFunc);
    
    // Tambahkan animasi shake untuk error
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
}

// Jalankan aplikasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', init);
