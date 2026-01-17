[file name]: script.js
[file content begin]
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
                price: 2000,
                image: "alight.png"
            },
            {
                id: "alight-android",
                name: "Alight Motion Android",
                description: "Versi untuk Android",
                price: 2000,
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
        id: 5,
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
        id: 6,
        name: "iQIYI Premium",
        description: "Aplikasi streaming film, drama Asia, anime, dan variety show dengan subtitle Indonesia.",
        baseImage: "iqiyi.png",
        category: "Film",
        variants: [
            {
                id: "iqiyi-01",
                name: "iQIYI 1 Month Premium Share",
                description: "Nikmati streaming tanpa iklan selama 1 bulan. Akses konten eksklusif, episode terbaru lebih cepat, dan kualitas video HD hingga Full HD. Cocok untuk pecinta drama, film, dan anime Asia.",
                price: 7000,
                image: "iqiyi.png"
            },
            {
                id: "iqiyi-02",
                name: "iQIYI 1 Month Standar Share",
                description: "Akses iQIYI versi standar untuk menonton berbagai film, drama, dan anime dengan kualitas video dasar. Cocok untuk pengguna yang ingin hiburan hemat dengan fitur utama iQIYI.",
                price: 6000,
                image: "iqiyi.png"
            },
            {
                id: "iqiyi-03",
                name: "iQIYI 1 Year Premium Share",
                description: "Paket premium tahunan dengan harga lebih hemat. Streaming tanpa iklan, akses semua konten eksklusif, kualitas video HD / Full HD, dan pengalaman menonton nyaman sepanjang tahun tanpa perlu perpanjang bulanan.",
                price: 15000,
                image: "iqiyi.png"
            }      
        ]
    }
];

// Data pengguna (simulasi database lokal)
let users = JSON.parse(localStorage.getItem('takistore_users')) || [];

// Data OTP yang dikirim (simulasi)
let otpData = JSON.parse(localStorage.getItem('takistore_otp')) || {};

// Data keranjang per user
let userCart = JSON.parse(localStorage.getItem('takistore_user_cart')) || {};

// Data rating dan ulasan per produk
let productReviews = JSON.parse(localStorage.getItem('takistore_reviews')) || {};

// Data keranjang dari localStorage (untuk user yang login)
let cart = [];

// User saat ini yang login
let currentUser = JSON.parse(localStorage.getItem('takistore_current_user')) || null;

// Variabel untuk metode pembayaran dan varian
let selectedPaymentMethod = null;
let currentProduct = null;
let selectedVariant = null;
let variantQuantity = 1;

// Variabel untuk rating
let currentRatingProduct = null;
let userRatingValue = 0;
let filteredReviews = null;
let currentReviewFilter = 'all';

// Variabel untuk auth
let currentOtp = null;
let otpTimer = null;
let resendTimer = null;
let forgotEmailValue = null;

// DOM Elements
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

// Auth Modal Elements
const authModal = document.getElementById('authModal');
const authModalTitle = document.getElementById('authModalTitle');
const openAuthBtn = document.getElementById('openAuth');
const closeAuthBtn = document.getElementById('closeAuth');
const authTabs = document.querySelectorAll('.auth-tab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const forgotForm = document.getElementById('forgotForm');
const otpForm = document.getElementById('otpForm');
const resetPasswordForm = document.getElementById('resetPasswordForm');
const userSection = document.getElementById('userSection');

// Rating Modal Elements
const ratingModal = document.getElementById('ratingModal');
const ratingModalTitle = document.getElementById('ratingModalTitle');
const closeRating = document.getElementById('closeRating');
const ratingSummary = document.getElementById('ratingSummary');
const ratingForm = document.getElementById('ratingForm');
const userRatingStars = document.getElementById('userRatingStars');
const userRatingValue = document.getElementById('userRatingValue');
const reviewComment = document.getElementById('reviewComment');
const submitRatingBtn = document.getElementById('submitRatingBtn');
const alreadyReviewed = document.getElementById('alreadyReviewed');
const reviewFilters = document.getElementById('reviewFilters');
const reviewsList = document.getElementById('reviewsList');
const addReviewBtn = document.getElementById('addReviewBtn');

// Login Elements (tetap sama)
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');
const loginBtn = document.getElementById('loginBtn');
const forgotPassword = document.getElementById('forgotPassword');
const goToRegister = document.getElementById('goToRegister');

// Register Elements (tetap sama)
const registerUsername = document.getElementById('registerUsername');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const registerConfirmPassword = document.getElementById('registerConfirmPassword');
const registerBtn = document.getElementById('registerBtn');
const goToLogin = document.getElementById('goToLogin');

// Forgot Password Elements (tetap sama)
const forgotEmail = document.getElementById('forgotEmail');
const sendOtpBtn = document.getElementById('sendOtpBtn');
const backToLoginFromForgot = document.getElementById('backToLoginFromForgot');

// OTP Elements (tetap sama)
const otpInputs = document.querySelectorAll('.otp-input');
const otpTimerDisplay = document.getElementById('otpTimer');
const timer = document.getElementById('timer');
const resendOtpBtn = document.getElementById('resendOtpBtn');
const resendTimerDisplay = document.getElementById('resendTimer');
const verifyOtpBtn = document.getElementById('verifyOtpBtn');

// Reset Password Elements (tetap sama)
const resetPassword = document.getElementById('resetPassword');
const resetConfirmPassword = document.getElementById('resetConfirmPassword');
const resetPasswordBtn = document.getElementById('resetPasswordBtn');

// Success Message (tetap sama)
const successMessage = document.getElementById('successMessage');
const successText = document.getElementById('successText');

// Format harga ke Rupiah
function formatRupiah(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// ==================== RATING FUNCTIONS ====================

// Hitung rating average dan distribusi
function calculateRatingStats(productId) {
    const reviews = productReviews[productId] || [];
    
    if (reviews.length === 0) {
        return {
            average: 0,
            count: 0,
            distribution: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
            percentages: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
        };
    }
    
    // Hitung total rating
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = total / reviews.length;
    
    // Hitung distribusi
    const distribution = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
    reviews.forEach(review => {
        distribution[review.rating]++;
    });
    
    // Hitung persentase
    const percentages = {};
    for (let i = 1; i <= 5; i++) {
        percentages[i] = Math.round((distribution[i] / reviews.length) * 100);
    }
    
    return {
        average: parseFloat(average.toFixed(1)),
        count: reviews.length,
        distribution: distribution,
        percentages: percentages
    };
}

// Generate stars HTML
function generateStars(rating, size = 'normal') {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += `<i class="fas fa-star ${size === 'small' ? 'product-rating-star' : size === 'review' ? 'review-rating-star' : 'rating-summary-star'}" style="color: #ffc107;"></i>`;
    }
    
    if (hasHalfStar) {
        starsHTML += `<i class="fas fa-star-half-alt ${size === 'small' ? 'product-rating-star' : size === 'review' ? 'review-rating-star' : 'rating-summary-star'}" style="color: #ffc107;"></i>`;
    }
    
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += `<i class="far fa-star ${size === 'small' ? 'product-rating-star' : size === 'review' ? 'review-rating-star' : 'rating-summary-star'}" style="color: #ffc107;"></i>`;
    }
    
    return starsHTML;
}

// Render rating summary
function renderRatingSummary(productId) {
    const stats = calculateRatingStats(productId);
    const product = products.find(p => p.id === productId);
    
    let summaryHTML = `
        <div class="rating-summary-score">
            <div class="rating-summary-average">${stats.average}</div>
            <div class="rating-summary-stars">
                ${generateStars(stats.average, 'summary')}
            </div>
            <div class="rating-summary-count">${stats.count} ulasan</div>
        </div>
        <div class="rating-distribution">
    `;
    
    // Render distribution bars (dari 5 ke 1)
    for (let i = 5; i >= 1; i--) {
        const percentage = stats.percentages[i] || 0;
        summaryHTML += `
            <div class="rating-bar">
                <div class="rating-bar-label">
                    ${i} bintang
                </div>
                <div class="rating-bar-progress">
                    <div class="rating-bar-fill" style="width: ${percentage}%"></div>
                </div>
                <div style="width: 40px; text-align: right; font-size: 0.9rem;">
                    ${percentage}%
                </div>
            </div>
        `;
    }
    
    summaryHTML += `</div>`;
    ratingSummary.innerHTML = summaryHTML;
}

// Render reviews list
function renderReviewsList(productId, filter = 'all') {
    const reviews = productReviews[productId] || [];
    let filtered = [...reviews];
    
    // Filter berdasarkan rating
    if (filter !== 'all') {
        const rating = parseInt(filter);
        filtered = reviews.filter(review => review.rating === rating);
    }
    
    // Urutkan berdasarkan tanggal (terbaru dulu)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    if (filtered.length === 0) {
        reviewsList.innerHTML = `
            <div class="no-reviews">
                <i class="fas fa-comment-slash" style="font-size: 2rem; margin-bottom: 10px;"></i>
                <p>Belum ada ulasan ${filter !== 'all' ? `dengan rating ${filter} bintang` : 'untuk produk ini'}</p>
            </div>
        `;
        return;
    }
    
    let reviewsHTML = '';
    
    filtered.forEach(review => {
        const date = new Date(review.date);
        const formattedDate = date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        
        const isCurrentUserReview = currentUser && review.userId === currentUser.id;
        
        reviewsHTML += `
            <div class="review-item">
                <div class="review-header">
                    <div style="display: flex; align-items: center;">
                        <div class="reviewer-name">${review.username}</div>
                        ${isCurrentUserReview ? '<div class="user-review-badge">Anda</div>' : ''}
                    </div>
                    <div class="review-date">${formattedDate}</div>
                </div>
                <div class="review-rating">
                    ${generateStars(review.rating, 'review')}
                </div>
                <div class="review-comment">
                    ${review.comment || '<em>Tidak ada komentar</em>'}
                </div>
            </div>
        `;
    });
    
    reviewsList.innerHTML = reviewsHTML;
}

// Cek apakah user sudah memberikan review untuk produk ini
function hasUserReviewed(productId) {
    if (!currentUser) return false;
    
    const reviews = productReviews[productId] || [];
    return reviews.some(review => review.userId === currentUser.id);
}

// Get user's review untuk produk ini
function getUserReview(productId) {
    if (!currentUser) return null;
    
    const reviews = productReviews[productId] || [];
    return reviews.find(review => review.userId === currentUser.id);
}

// Update rating form berdasarkan status user
function updateRatingForm(productId) {
    const hasReviewed = hasUserReviewed(productId);
    
    if (!currentUser) {
        // User belum login
        ratingForm.style.display = 'none';
        alreadyReviewed.style.display = 'none';
        addReviewBtn.style.display = 'block';
        return;
    }
    
    if (hasReviewed) {
        // User sudah review
        ratingForm.style.display = 'none';
        alreadyReviewed.style.display = 'flex';
        
        const userReview = getUserReview(productId);
        if (userReview) {
            // Isi form dengan review user sebelumnya
            const stars = userRatingStars.querySelectorAll('.rating-star');
            stars.forEach(star => {
                const value = parseInt(star.getAttribute('data-value'));
                if (value <= userReview.rating) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            });
            userRatingValue.textContent = userReview.rating;
            reviewComment.value = userReview.comment || '';
        }
    } else {
        // User belum review
        ratingForm.style.display = 'block';
        alreadyReviewed.style.display = 'none';
        addReviewBtn.style.display = 'none';
        
        // Reset form
        const stars = userRatingStars.querySelectorAll('.rating-star');
        stars.forEach(star => {
            star.classList.remove('active');
            star.classList.remove('hover');
        });
        userRatingValue.textContent = '0';
        reviewComment.value = '';
        submitRatingBtn.disabled = true;
    }
}

// Buka rating modal
function openRatingModal(productId) {
    // Cek apakah user sudah login (untuk memberi rating)
    if (!currentUser) {
        showSuccessMessage('Silakan login untuk melihat rating dan memberikan ulasan');
        openAuthModal();
        return;
    }
    
    currentRatingProduct = products.find(p => p.id === productId);
    
    if (!currentRatingProduct) return;
    
    // Set judul modal
    ratingModalTitle.textContent = `Rating & Ulasan - ${currentRatingProduct.name}`;
    
    // Render rating summary
    renderRatingSummary(productId);
    
    // Update rating form
    updateRatingForm(productId);
    
    // Render reviews list
    renderReviewsList(productId, currentReviewFilter);
    
    // Buka modal
    ratingModal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Tutup rating modal
function closeRatingModal() {
    ratingModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentRatingProduct = null;
    userRatingValue = 0;
    currentReviewFilter = 'all';
}

// Submit rating dan review
function submitRating() {
    if (!currentUser || !currentRatingProduct) return;
    
    const comment = reviewComment.value.trim();
    const rating = parseInt(userRatingValue.textContent);
    
    if (rating === 0) {
        showSuccessMessage('Silakan beri rating terlebih dahulu');
        return;
    }
    
    // Inisialisasi jika belum ada reviews untuk produk ini
    if (!productReviews[currentRatingProduct.id]) {
        productReviews[currentRatingProduct.id] = [];
    }
    
    // Cek apakah user sudah review sebelumnya
    const existingReviewIndex = productReviews[currentRatingProduct.id].findIndex(
        review => review.userId === currentUser.id
    );
    
    const newReview = {
        id: Date.now(),
        userId: currentUser.id,
        username: currentUser.username,
        rating: rating,
        comment: comment,
        date: new Date().toISOString()
    };
    
    if (existingReviewIndex !== -1) {
        // Update review yang sudah ada
        productReviews[currentRatingProduct.id][existingReviewIndex] = newReview;
    } else {
        // Tambah review baru
        productReviews[currentRatingProduct.id].push(newReview);
    }
    
    // Simpan ke localStorage
    localStorage.setItem('takistore_reviews', JSON.stringify(productReviews));
    
    // Update UI
    renderRatingSummary(currentRatingProduct.id);
    updateRatingForm(currentRatingProduct.id);
    renderReviewsList(currentRatingProduct.id, currentReviewFilter);
    
    // Update rating di product card
    updateProductRating(currentRatingProduct.id);
    
    // Tampilkan notifikasi
    showSuccessMessage('Terima kasih! Rating dan ulasan Anda telah disimpan.');
    
    // Reset form
    const stars = userRatingStars.querySelectorAll('.rating-star');
    stars.forEach(star => {
        star.classList.remove('active');
        star.classList.remove('hover');
    });
    userRatingValue.textContent = '0';
    reviewComment.value = '';
    submitRatingBtn.disabled = true;
}

// Update rating di product card
function updateProductRating(productId) {
    const stats = calculateRatingStats(productId);
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    
    if (productCard) {
        const ratingElement = productCard.querySelector('.product-rating');
        if (ratingElement) {
            ratingElement.innerHTML = `
                <div class="product-rating-stars">
                    ${generateStars(stats.average, 'small')}
                </div>
                <div class="product-rating-score">${stats.average}</div>
                <div class="product-rating-count">(${stats.count})</div>
            `;
        }
    }
}

// ==================== AUTH FUNCTIONS ====================

// ... (semua fungsi auth sebelumnya tetap sama) ...

// ==================== PRODUCT FUNCTIONS ====================

// Render produk ke halaman dengan rating
function renderProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-product-id', product.id);
        
        // Hitung rating stats
        const stats = calculateRatingStats(product.id);
        
        // Cek apakah user sudah login
        if (!currentUser) {
            productCard.innerHTML += `
                <div class="auth-required">
                    <h4>Login Diperlukan</h4>
                    <p>Silakan login untuk melihat harga dan membeli produk</p>
                    <button class="login-btn" style="margin-top: 10px;" id="loginFromProduct">
                        <i class="fas fa-user"></i>
                        Login Sekarang
                    </button>
                </div>
            `;
        }
        
        productCard.innerHTML += `
            <div class="product-image-container">
                <img src="${product.baseImage}" alt="${product.name}" class="product-image">
                <div class="product-badge">${product.category}</div>
            </div>
            <div class="product-content">
                <div class="product-meta">
                    <div class="product-category">${product.category}</div>
                    ${stats.count > 0 ? `
                        <div class="product-rating">
                            <div class="product-rating-stars">
                                ${generateStars(stats.average, 'small')}
                            </div>
                            <div class="product-rating-score">${stats.average}</div>
                            <div class="product-rating-count">(${stats.count})</div>
                        </div>
                    ` : ''}
                </div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                
                ${stats.count > 0 ? `
                    <div class="product-reviews">
                        <div class="review-item" style="border: none; padding: 0; margin: 0;">
                            <div class="review-header" style="margin-bottom: 4px;">
                                <div class="reviewer-name">${productReviews[product.id][0].username}</div>
                                <div class="review-rating" style="margin: 0;">
                                    ${generateStars(productReviews[product.id][0].rating, 'review')}
                                </div>
                            </div>
                            <div class="review-comment" style="font-size: 0.9rem;">
                                ${productReviews[product.id][0].comment ? 
                                    productReviews[product.id][0].comment.substring(0, 100) + 
                                    (productReviews[product.id][0].comment.length > 100 ? '...' : '') 
                                    : '<em>Tidak ada komentar</em>'}
                            </div>
                        </div>
                        ${stats.count > 1 ? `
                            <button class="view-reviews-btn" data-id="${product.id}">
                                <i class="fas fa-comments"></i>
                                Lihat ${stats.count - 1} ulasan lainnya
                            </button>
                        ` : ''}
                    </div>
                ` : ''}
                
                <div class="product-footer">
                    <button class="add-to-cart" data-id="${product.id}" ${!currentUser ? 'disabled' : ''}>
                        <i class="fas fa-cart-plus"></i> ${currentUser ? 'Pilih Varian' : 'Login untuk Beli'}
                    </button>
                    ${stats.count > 0 ? `
                        <button class="view-reviews-btn" style="margin-top: 10px;" data-id="${product.id}">
                            <i class="fas fa-star"></i>
                            Lihat Rating & Ulasan
                        </button>
                    ` : currentUser ? `
                        <button class="view-reviews-btn" style="margin-top: 10px;" data-id="${product.id}">
                            <i class="fas fa-star"></i>
                            Beri Rating Pertama
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Tambahkan event listener ke tombol pilih varian
    document.querySelectorAll('.add-to-cart').forEach(button => {
        if (!button.disabled) {
            button.addEventListener('click', openVariantModal);
        }
    });
    
    // Tambahkan event listener untuk tombol login dari product
    document.querySelectorAll('#loginFromProduct').forEach(button => {
        button.addEventListener('click', openAuthModal);
    });
    
    // Tambahkan event listener untuk tombol lihat rating
    document.querySelectorAll('.view-reviews-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            openRatingModal(productId);
        });
    });
}

// Buka modal pilihan varian (fungsi sebelumnya dengan pengecekan login)
function openVariantModal(event) {
    // Cek apakah user sudah login
    if (!currentUser) {
        showSuccessMessage('Silakan login terlebih dahulu');
        openAuthModal();
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

// Render daftar varian (DENGAN HARGA)
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

// ... (fungsi-fungsi lainnya tetap sama) ...

// Inisialisasi aplikasi
function init() {
    // Bersihkan OTP yang kedaluwarsa
    cleanupExpiredOTP();
    
    // Set viewport height untuk mobile
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
    
    // Update UI berdasarkan login status
    updateAuthUI();
    
    renderProducts();
    updateCart();
    
    // ==================== RATING EVENT LISTENERS ====================
    
    // Event listener untuk rating stars
    const ratingStars = userRatingStars.querySelectorAll('.rating-star');
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));
            userRatingValue = value;
            
            // Update stars display
            ratingStars.forEach(s => {
                const starValue = parseInt(s.getAttribute('data-value'));
                if (starValue <= value) {
                    s.classList.add('active');
                    s.classList.remove('hover');
                } else {
                    s.classList.remove('active');
                    s.classList.remove('hover');
                }
            });
            
            userRatingValue.textContent = value;
            submitRatingBtn.disabled = false;
        });
        
        star.addEventListener('mouseover', function() {
            const value = parseInt(this.getAttribute('data-value'));
            
            ratingStars.forEach(s => {
                const starValue = parseInt(s.getAttribute('data-value'));
                if (starValue <= value) {
                    s.classList.add('hover');
                } else {
                    s.classList.remove('hover');
                }
            });
        });
        
        star.addEventListener('mouseout', function() {
            ratingStars.forEach(s => {
                s.classList.remove('hover');
            });
        });
    });
    
    // Event listener untuk submit rating
    submitRatingBtn.addEventListener('click', submitRating);
    
    // Event listener untuk review filters
    document.querySelectorAll('.review-filter').forEach(filter => {
        filter.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active filter
            document.querySelectorAll('.review-filter').forEach(f => {
                f.classList.remove('active');
            });
            this.classList.add('active');
            
            currentReviewFilter = filterValue;
            
            if (currentRatingProduct) {
                renderReviewsList(currentRatingProduct.id, filterValue);
            }
        });
    });
    
    // Event listener untuk add review button (untuk user belum login)
    addReviewBtn.addEventListener('click', () => {
        closeRatingModal();
        openAuthModal();
    });
    
    // Event listener untuk close rating modal
    closeRating.addEventListener('click', closeRatingModal);
    
    // Event listener untuk overlay (tambahkan close rating modal)
    overlay.addEventListener('click', () => {
        closeCart();
        closeModalFunc();
        closeVariantModal();
        closeAuthModal();
        closeRatingModal();
    });
    
    // ==================== AUTH EVENT LISTENERS ====================
    
    // ... (event listeners auth sebelumnya tetap sama) ...
    
    // ==================== CART & PAYMENT EVENT LISTENERS ====================
    
    // ... (event listeners cart dan payment sebelumnya tetap sama) ...
    
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
    
    // Event listener untuk auth modal
    openAuthBtn.addEventListener('click', openAuthModal);
    closeAuthBtn.addEventListener('click', closeAuthModal);
    
    // Event listener untuk auth tabs
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchAuthTab(tabName);
            clearFormErrors();
        });
    });
    
    // Event listener untuk switch antara login dan register
    goToRegister.addEventListener('click', () => {
        switchAuthTab('register');
        clearFormErrors();
    });
    
    goToLogin.addEventListener('click', () => {
        switchAuthTab('login');
        clearFormErrors();
    });
    
    backToLoginFromForgot.addEventListener('click', () => {
        switchAuthTab('login');
        clearFormErrors();
    });
    
    // Event listener untuk OTP inputs
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => handleOTPInput(e, index));
        input.addEventListener('keydown', (e) => {
            // Navigasi dengan panah kiri/kanan
            if (e.key === 'ArrowLeft' && index > 0) {
                otpInputs[index - 1].focus();
            } else if (e.key === 'ArrowRight' && index < 5) {
                otpInputs[index + 1].focus();
            } else if (e.key === 'Backspace' && input.value === '' && index > 0) {
                otpInputs[index - 1].focus();
            }
        });
    });
    
    // Event listener untuk login
    loginBtn.addEventListener('click', () => {
        let isValid = true;
        
        // Validasi username/email
        if (!loginUsername.value.trim()) {
            showFormError('loginUsername', 'Username atau email harus diisi');
            isValid = false;
        } else {
            hideFormError('loginUsername');
        }
        
        // Validasi password
        if (!loginPassword.value.trim()) {
            showFormError('loginPassword', 'Password harus diisi');
            isValid = false;
        } else {
            hideFormError('loginPassword');
        }
        
        if (isValid) {
            const result = login(loginUsername.value.trim(), loginPassword.value.trim());
            
            if (result.success) {
                currentUser = result.user;
                localStorage.setItem('takistore_current_user', JSON.stringify(currentUser));
                updateAuthUI();
                renderProducts();
                loadUserCart();
                closeAuthModal();
                showSuccessMessage('Login berhasil! Selamat datang ' + currentUser.username);
            } else {
                showFormError('loginUsername', result.message);
                showFormError('loginPassword', result.message);
            }
        }
    });
    
    // Event listener untuk register
    registerBtn.addEventListener('click', () => {
        let isValid = true;
        
        // Validasi username
        if (!registerUsername.value.trim() || registerUsername.value.trim().length < 3) {
            showFormError('registerUsername', 'Username minimal 3 karakter');
            isValid = false;
        } else {
            hideFormError('registerUsername');
        }
        
        // Validasi email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!registerEmail.value.trim() || !emailRegex.test(registerEmail.value.trim())) {
            showFormError('registerEmail', 'Email tidak valid');
            isValid = false;
        } else {
            hideFormError('registerEmail');
        }
        
        // Validasi password
        if (!registerPassword.value.trim() || registerPassword.value.trim().length < 6) {
            showFormError('registerPassword', 'Password minimal 6 karakter');
            isValid = false;
        } else {
            hideFormError('registerPassword');
        }
        
        // Validasi konfirmasi password
        if (registerPassword.value.trim() !== registerConfirmPassword.value.trim()) {
            showFormError('registerConfirmPassword', 'Password tidak sama');
            isValid = false;
        } else {
            hideFormError('registerConfirmPassword');
        }
        
        if (isValid) {
            const result = register(
                registerUsername.value.trim(),
                registerEmail.value.trim(),
                registerPassword.value.trim()
            );
            
            if (result.success) {
                currentUser = result.user;
                localStorage.setItem('takistore_current_user', JSON.stringify(currentUser));
                updateAuthUI();
                renderProducts();
                loadUserCart();
                switchAuthTab('login');
                showSuccessMessage('Pendaftaran berhasil! Silakan login');
                
                // Clear form
                clearFormInputs();
            } else {
                if (result.message.includes('Email')) {
                    showFormError('registerEmail', result.message);
                } else if (result.message.includes('Username')) {
                    showFormError('registerUsername', result.message);
                }
            }
        }
    });
    
    // Event listener untuk lupa password
    forgotPassword.addEventListener('click', () => {
        switchAuthTab('forgot');
        clearFormErrors();
    });
    
    // Event listener untuk kirim OTP
    sendOtpBtn.addEventListener('click', () => {
        const email = forgotEmail.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email || !emailRegex.test(email)) {
            showFormError('forgotEmail', 'Email tidak valid');
            return;
        }
        
        // Cek apakah email terdaftar
        const userExists = users.some(u => u.email === email);
        if (!userExists) {
            showFormError('forgotEmail', 'Email tidak terdaftar');
            return;
        }
        
        hideFormError('forgotEmail');
        
        // Simpan email untuk reset password
        forgotEmailValue = email;
        
        // Kirim OTP
        sendOTP(email);
        
        // Switch ke OTP form
        switchAuthTab('otp');
        
        // Clear OTP inputs
        otpInputs.forEach(input => input.value = '');
        
        // Start timers
        otpTimerDisplay.style.display = 'block';
        startOTPTimer();
        startResendTimer();
        
        // Focus ke OTP input pertama
        otpInputs[0].focus();
    });
    
    // Event listener untuk resend OTP
    resendOtpBtn.addEventListener('click', () => {
        if (!forgotEmailValue) return;
        
        // Kirim ulang OTP
        sendOTP(forgotEmailValue);
        
        // Restart timers
        clearTimers();
        startOTPTimer();
        startResendTimer();
        
        showSuccessMessage('Kode OTP baru telah dikirim ke email Anda');
    });
    
    // Event listener untuk verifikasi OTP
    verifyOtpBtn.addEventListener('click', () => {
        const otp = getOTPValue();
        
        if (otp.length !== 6) {
            showFormError('otpError', 'Kode OTP harus 6 digit');
            otpInputs.forEach(input => input.classList.add('error'));
            return;
        }
        
        if (!forgotEmailValue) {
            showFormError('otpError', 'Sesi telah berakhir, silakan ulangi proses');
            return;
        }
        
        const isValid = verifyOTP(forgotEmailValue, otp);
        
        if (isValid) {
            // Hapus OTP yang sudah digunakan
            delete otpData[forgotEmailValue];
            localStorage.setItem('takistore_otp', JSON.stringify(otpData));
            
            // Switch ke reset password form
            switchAuthTab('reset');
            clearFormErrors();
            clearTimers();
        } else {
            showFormError('otpError', 'Kode OTP tidak valid atau sudah kedaluwarsa');
            otpInputs.forEach(input => input.classList.add('error'));
        }
    });
    
    // Event listener untuk reset password
    resetPasswordBtn.addEventListener('click', () => {
        let isValid = true;
        
        // Validasi password baru
        if (!resetPassword.value.trim() || resetPassword.value.trim().length < 6) {
            showFormError('resetPassword', 'Password minimal 6 karakter');
            isValid = false;
        } else {
            hideFormError('resetPassword');
        }
        
        // Validasi konfirmasi password
        if (resetPassword.value.trim() !== resetConfirmPassword.value.trim()) {
            showFormError('resetConfirmPassword', 'Password tidak sama');
            isValid = false;
        } else {
            hideFormError('resetConfirmPassword');
        }
        
        if (isValid && forgotEmailValue) {
            const result = resetUserPassword(forgotEmailValue, resetPassword.value.trim());
            
            if (result.success) {
                showSuccessMessage('Password berhasil direset! Silakan login dengan password baru');
                
                // Reset semua
                forgotEmailValue = null;
                clearFormInputs();
                clearFormErrors();
                
                // Kembali ke login form
                switchAuthTab('login');
            } else {
                showFormError('resetPassword', result.message);
            }
        }
    });
    
    // Event listener untuk keranjang
    openCartBtn.addEventListener('click', openCart);
    closeCartBtn.addEventListener('click', closeCart);
    
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
        
        // Tampilkan modal konfirmasi
        orderSummary.innerHTML = generateOrderSummary();
        openModal();
        
        // Kosongkan keranjang
        cart = [];
        saveUserCart();
        updateCart();
        
        // Reset metode pembayaran
        selectedPaymentMethod = null;
        document.querySelectorAll('.payment-method').forEach(method => {
            method.classList.remove('selected');
        });
        
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
[file content end]
