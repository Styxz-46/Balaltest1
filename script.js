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

// Login Elements
const loginUsername = document.getElementById('loginUsername');
const loginPassword = document.getElementById('loginPassword');
const loginBtn = document.getElementById('loginBtn');
const forgotPassword = document.getElementById('forgotPassword');
const goToRegister = document.getElementById('goToRegister');

// Register Elements
const registerUsername = document.getElementById('registerUsername');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const registerConfirmPassword = document.getElementById('registerConfirmPassword');
const registerBtn = document.getElementById('registerBtn');
const goToLogin = document.getElementById('goToLogin');

// Forgot Password Elements
const forgotEmail = document.getElementById('forgotEmail');
const sendOtpBtn = document.getElementById('sendOtpBtn');
const backToLoginFromForgot = document.getElementById('backToLoginFromForgot');

// OTP Elements
const otpInputs = document.querySelectorAll('.otp-input');
const otpTimerDisplay = document.getElementById('otpTimer');
const timer = document.getElementById('timer');
const resendOtpBtn = document.getElementById('resendOtpBtn');
const resendTimerDisplay = document.getElementById('resendTimer');
const verifyOtpBtn = document.getElementById('verifyOtpBtn');

// Reset Password Elements
const resetPassword = document.getElementById('resetPassword');
const resetConfirmPassword = document.getElementById('resetConfirmPassword');
const resetPasswordBtn = document.getElementById('resetPasswordBtn');

// Rating Modal Elements
const ratingModal = document.getElementById('ratingModal');
const ratingModalTitle = document.getElementById('ratingModalTitle');
const closeRating = document.getElementById('closeRating');
const ratingSummary = document.getElementById('ratingSummary');
const ratingForm = document.getElementById('ratingForm');
const userRatingStars = document.getElementById('userRatingStars');
const userRatingValueDisplay = document.getElementById('userRatingValue');
const reviewComment = document.getElementById('reviewComment');
const submitRatingBtn = document.getElementById('submitRatingBtn');
const alreadyReviewed = document.getElementById('alreadyReviewed');
const reviewFilters = document.getElementById('reviewFilters');
const reviewsList = document.getElementById('reviewsList');
const addReviewBtn = document.getElementById('addReviewBtn');

// Success Message
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
        if (size === 'small') {
            starsHTML += '<i class="fas fa-star product-rating-star" style="color: #ffc107;"></i>';
        } else if (size === 'review') {
            starsHTML += '<i class="fas fa-star review-rating-star" style="color: #ffc107;"></i>';
        } else if (size === 'summary') {
            starsHTML += '<i class="fas fa-star" style="color: #ffc107; font-size: 1.2rem;"></i>';
        } else {
            starsHTML += '<i class="fas fa-star" style="color: #ffc107;"></i>';
        }
    }
    
    if (hasHalfStar) {
        if (size === 'small') {
            starsHTML += '<i class="fas fa-star-half-alt product-rating-star" style="color: #ffc107;"></i>';
        } else if (size === 'review') {
            starsHTML += '<i class="fas fa-star-half-alt review-rating-star" style="color: #ffc107;"></i>';
        } else if (size === 'summary') {
            starsHTML += '<i class="fas fa-star-half-alt" style="color: #ffc107; font-size: 1.2rem;"></i>';
        } else {
            starsHTML += '<i class="fas fa-star-half-alt" style="color: #ffc107;"></i>';
        }
    }
    
    for (let i = 0; i < emptyStars; i++) {
        if (size === 'small') {
            starsHTML += '<i class="far fa-star product-rating-star" style="color: #ffc107;"></i>';
        } else if (size === 'review') {
            starsHTML += '<i class="far fa-star review-rating-star" style="color: #ffc107;"></i>';
        } else if (size === 'summary') {
            starsHTML += '<i class="far fa-star" style="color: #ffc107; font-size: 1.2rem;"></i>';
        } else {
            starsHTML += '<i class="far fa-star" style="color: #ffc107;"></i>';
        }
    }
    
    return starsHTML;
}

// Render rating summary
function renderRatingSummary(productId) {
    const stats = calculateRatingStats(productId);
    const product = products.find(p => p.id === productId);
    
    let summaryHTML = `
        <div class="rating-summary-score">
            <div class="rating-summary-average">${stats.average.toFixed(1)}</div>
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
        const count = stats.distribution[i] || 0;
        summaryHTML += `
            <div class="rating-bar">
                <div class="rating-bar-label">
                    ${i} bintang
                </div>
                <div class="rating-bar-progress">
                    <div class="rating-bar-fill" style="width: ${percentage}%"></div>
                </div>
                <div style="width: 40px; text-align: right; font-size: 0.9rem;">
                    ${count}
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
                    <div class="reviewer-name">
                        ${review.username}
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
            userRatingValueDisplay.textContent = userReview.rating;
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
        userRatingValueDisplay.textContent = '0';
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
    const rating = parseInt(userRatingValueDisplay.textContent);
    
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
    userRatingValueDisplay.textContent = '0';
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
                <div class="product-rating-score">${stats.average.toFixed(1)}</div>
                <div class="product-rating-count">(${stats.count})</div>
            `;
        }
        
        // Update reviews preview
        const reviewsContainer = productCard.querySelector('.product-reviews');
        if (reviewsContainer && stats.count > 0) {
            const latestReview = productReviews[productId][0];
            reviewsContainer.innerHTML = `
                <div class="review-item" style="border: none; padding: 0; margin: 0;">
                    <div class="review-header" style="margin-bottom: 4px;">
                        <div class="reviewer-name" style="font-size: 0.9rem;">${latestReview.username}</div>
                        <div class="review-rating" style="margin: 0;">
                            ${generateStars(latestReview.rating, 'review')}
                        </div>
                    </div>
                    <div class="review-comment" style="font-size: 0.9rem;">
                        ${latestReview.comment ? 
                            latestReview.comment.substring(0, 100) + 
                            (latestReview.comment.length > 100 ? '...' : '') 
                            : '<em>Tidak ada komentar</em>'}
                    </div>
                </div>
                ${stats.count > 1 ? `
                    <button class="view-reviews-btn" data-id="${productId}">
                        <i class="fas fa-comments"></i>
                        Lihat ${stats.count - 1} ulasan lainnya
                    </button>
                ` : ''}
            `;
            
            // Re-add event listener
            const viewReviewsBtn = reviewsContainer.querySelector('.view-reviews-btn');
            if (viewReviewsBtn) {
                viewReviewsBtn.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    openRatingModal(productId);
                });
            }
        }
    }
}

// ==================== AUTH FUNCTIONS ====================

// Generate OTP 6 digit
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Simpan OTP (simulasi mengirim email)
function sendOTP(email) {
    const otp = generateOTP();
    const expiry = Date.now() + 5 * 60 * 1000; // 5 menit
    
    otpData[email] = {
        otp: otp,
        expiry: expiry
    };
    
    localStorage.setItem('takistore_otp', JSON.stringify(otpData));
    
    // Simulasi: tampilkan di console (di real app, kirim ke email)
    console.log(`OTP untuk ${email}: ${otp} (berlaku 5 menit)`);
    
    return otp;
}

// Verifikasi OTP
function verifyOTP(email, otp) {
    const storedOtp = otpData[email];
    
    if (!storedOtp) {
        return false;
    }
    
    if (Date.now() > storedOtp.expiry) {
        delete otpData[email];
        localStorage.setItem('takistore_otp', JSON.stringify(otpData));
        return false;
    }
    
    return storedOtp.otp === otp;
}

// Hapus OTP yang sudah kedaluwarsa
function cleanupExpiredOTP() {
    const now = Date.now();
    let changed = false;
    
    for (const email in otpData) {
        if (now > otpData[email].expiry) {
            delete otpData[email];
            changed = true;
        }
    }
    
    if (changed) {
        localStorage.setItem('takistore_otp', JSON.stringify(otpData));
    }
}

// Update UI berdasarkan status login
function updateAuthUI() {
    if (currentUser) {
        // Tampilkan info user
        userSection.innerHTML = `
            <div class="user-info">
                <div class="user-avatar">${currentUser.username.charAt(0).toUpperCase()}</div>
                <span class="user-name">${currentUser.username}</span>
                <button class="logout-btn" id="logoutBtn">
                    <i class="fas fa-sign-out-alt"></i>
                </button>
            </div>
        `;
        
        // Tambahkan event listener untuk logout
        document.getElementById('logoutBtn').addEventListener('click', logout);
        
        // Load cart user
        loadUserCart();
    } else {
        // Tampilkan tombol login
        userSection.innerHTML = `
            <button class="login-btn" id="openAuth">
                <i class="fas fa-user"></i>
                <span>Login / Daftar</span>
            </button>
        `;
        
        // Tambahkan event listener untuk open auth
        document.getElementById('openAuth').addEventListener('click', openAuthModal);
        
        // Kosongkan cart
        cart = [];
        updateCart();
    }
}

// Login user
function login(usernameOrEmail, password) {
    // Cari user berdasarkan username atau email
    const user = users.find(u => 
        (u.username === usernameOrEmail || u.email === usernameOrEmail) && 
        u.password === password
    );
    
    if (user) {
        currentUser = {
            id: user.id,
            username: user.username,
            email: user.email
        };
        
        localStorage.setItem('takistore_current_user', JSON.stringify(currentUser));
        return { success: true, user: currentUser };
    }
    
    return { success: false, message: 'Username/email atau password salah' };
}

// Register user
function register(username, email, password) {
    // Validasi email unik
    if (users.some(u => u.email === email)) {
        return { success: false, message: 'Email sudah terdaftar' };
    }
    
    // Validasi username unik
    if (users.some(u => u.username === username)) {
        return { success: false, message: 'Username sudah digunakan' };
    }
    
    const newUser = {
        id: Date.now(),
        username: username,
        email: email,
        password: password,
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('takistore_users', JSON.stringify(users));
    
    return { 
        success: true, 
        user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email
        }
    };
}

// Reset password
function resetUserPassword(email, newPassword) {
    const userIndex = users.findIndex(u => u.email === email);
    
    if (userIndex === -1) {
        return { success: false, message: 'Email tidak ditemukan' };
    }
    
    users[userIndex].password = newPassword;
    localStorage.setItem('takistore_users', JSON.stringify(users));
    
    return { success: true };
}

// Logout
function logout() {
    // Simpan cart user sebelum logout
    saveUserCart();
    
    currentUser = null;
    localStorage.removeItem('takistore_current_user');
    cart = [];
    updateAuthUI();
    renderProducts();
    
    showSuccessMessage('Berhasil logout');
    
    // Tutup auth modal jika terbuka
    closeAuthModal();
}

// Load cart user yang login
function loadUserCart() {
    if (currentUser && userCart[currentUser.id]) {
        cart = userCart[currentUser.id];
    } else {
        cart = [];
    }
    updateCart();
}

// Save cart user
function saveUserCart() {
    if (currentUser) {
        userCart[currentUser.id] = cart;
        localStorage.setItem('takistore_user_cart', JSON.stringify(userCart));
    }
}

// Start OTP timer
function startOTPTimer() {
    let timeLeft = 300; // 5 menit dalam detik
    
    otpTimer = setInterval(() => {
        timeLeft--;
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(otpTimer);
            otpTimerDisplay.style.display = 'none';
        }
    }, 1000);
}

// Start resend timer
function startResendTimer() {
    let timeLeft = 60; // 60 detik
    
    resendOtpBtn.disabled = true;
    
    resendTimer = setInterval(() => {
        timeLeft--;
        resendTimerDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(resendTimer);
            resendOtpBtn.disabled = false;
            resendTimerDisplay.textContent = '60';
        }
    }, 1000);
}

// Clear all timers
function clearTimers() {
    if (otpTimer) {
        clearInterval(otpTimer);
        otpTimer = null;
    }
    
    if (resendTimer) {
        clearInterval(resendTimer);
        resendTimer = null;
    }
}

// Show success message
function showSuccessMessage(message) {
    successText.textContent = message;
    successMessage.classList.add('show');
    
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

// Switch auth tab
function switchAuthTab(tabName) {
    // Update tabs
    authTabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Update forms
    const forms = [loginForm, registerForm, forgotForm, otpForm, resetPasswordForm];
    forms.forEach(form => form.classList.remove('active'));
    
    switch(tabName) {
        case 'login':
            loginForm.classList.add('active');
            authModalTitle.textContent = 'Selamat Datang';
            break;
        case 'register':
            registerForm.classList.add('active');
            authModalTitle.textContent = 'Daftar Akun Baru';
            break;
        case 'forgot':
            forgotForm.classList.add('active');
            authModalTitle.textContent = 'Lupa Password';
            break;
        case 'otp':
            otpForm.classList.add('active');
            authModalTitle.textContent = 'Verifikasi OTP';
            break;
        case 'reset':
            resetPasswordForm.classList.add('active');
            authModalTitle.textContent = 'Reset Password';
            break;
    }
}

// Open auth modal
function openAuthModal() {
    authModal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset form
    switchAuthTab('login');
    clearFormErrors();
    clearTimers();
}

// Close auth modal
function closeAuthModal() {
    authModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset semua form
    switchAuthTab('login');
    clearFormErrors();
    clearFormInputs();
    clearTimers();
}

// Clear form errors
function clearFormErrors() {
    document.querySelectorAll('.form-error').forEach(error => {
        error.classList.remove('show');
    });
    
    document.querySelectorAll('.form-control').forEach(input => {
        input.classList.remove('error');
    });
    
    otpInputs.forEach(input => {
        input.classList.remove('error');
    });
}

// Clear form inputs
function clearFormInputs() {
    document.querySelectorAll('.form-control').forEach(input => {
        input.value = '';
    });
    
    otpInputs.forEach(input => {
        input.value = '';
    });
}

// Show form error
function showFormError(inputId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(inputId + 'Error');
    
    if (input) input.classList.add('error');
    if (error) {
        error.textContent = message;
        error.classList.add('show');
    }
}

// Hide form error
function hideFormError(inputId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(inputId + 'Error');
    
    if (input) input.classList.remove('error');
    if (error) error.classList.remove('show');
}

// Get OTP value
function getOTPValue() {
    let otp = '';
    otpInputs.forEach(input => {
        otp += input.value;
    });
    return otp;
}

// Handle OTP input
function handleOTPInput(e, index) {
    const input = e.target;
    const value = input.value;
    
    // Hanya angka yang diizinkan
    if (!/^\d*$/.test(value)) {
        input.value = '';
        return;
    }
    
    // Pindah ke input berikutnya
    if (value !== '' && index < 5) {
        otpInputs[index + 1].focus();
    }
    
    // Kembali ke input sebelumnya saat menghapus
    if (value === '' && index > 0) {
        otpInputs[index - 1].focus();
    }
}

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
        let authRequiredHTML = '';
        if (!currentUser) {
            authRequiredHTML = `
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
        
        // Reviews preview
        let reviewsHTML = '';
        if (stats.count > 0) {
            const latestReview = productReviews[product.id][0];
            reviewsHTML = `
                <div class="product-reviews">
                    <div class="review-item" style="border: none; padding: 0; margin: 0;">
                        <div class="review-header" style="margin-bottom: 4px;">
                            <div class="reviewer-name" style="font-size: 0.9rem;">${latestReview.username}</div>
                            <div class="review-rating" style="margin: 0;">
                                ${generateStars(latestReview.rating, 'review')}
                            </div>
                        </div>
                        <div class="review-comment" style="font-size: 0.9rem;">
                            ${latestReview.comment ? 
                                latestReview.comment.substring(0, 100) + 
                                (latestReview.comment.length > 100 ? '...' : '') 
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
            `;
        }
        
        productCard.innerHTML = `
            ${authRequiredHTML}
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
                            <div class="product-rating-score">${stats.average.toFixed(1)}</div>
                            <div class="product-rating-count">(${stats.count})</div>
                        </div>
                    ` : ''}
                </div>
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                
                ${reviewsHTML}
                
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

// Buka modal pilihan varian
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

// Tutup modal varian
function closeVariantModal() {
    variantModal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Tambah varian ke keranjang
function addVariantToCartFunc() {
    // Cek apakah user sudah login
    if (!currentUser) {
        showSuccessMessage('Silakan login terlebih dahulu');
        closeVariantModal();
        openAuthModal();
        return;
    }
    
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
    
    // Simpan cart user
    saveUserCart();
    
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
    if (!document.querySelector('#notification-style')) {
        const style = document.createElement('style');
        style.id = 'notification-style';
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
    // Hapus semua item cart-item yang ada
    const existingItems = cartItemsContainer.querySelectorAll('.cart-item');
    existingItems.forEach(item => {
        item.remove();
    });
    
    // Jika keranjang kosong, keluar dari fungsi
    if (cart.length === 0) {
        return;
    }
    
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
        saveUserCart();
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
        saveUserCart();
        updateCart();
    }
}

// Hapus item dari keranjang
function removeItem(variantId) {
    cart = cart.filter(item => item.variantId !== variantId);
    saveUserCart();
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
    
    cart.forEach(item => {
        message += `Barang: ${item.name} - ${item.variantName}\n`;
        message += `Jumlah: ${item.quantity}\n`;
        message += `Subtotal: ${formatRupiah(item.price * item.quantity)}\n\n`;
    });
    
    // Hitung total semua barang
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `Total: ${formatRupiah(total)}\n`;
    message += `Metode Pembayaran: ${selectedPaymentMethod === 'dana' ? 'DANA' : 'QRIS'}\n`;
    message += `Pelanggan: ${currentUser ? currentUser.username : 'Guest'}`;
    
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
        <div class="order-item">
            <div><strong>Pelanggan</strong></div>
            <div>${currentUser ? currentUser.username : 'Guest'}</div>
        </div>
        <div class="order-total">
            <span>Total</span>
            <span>${formatRupiah(total)}</span>
        </div>
    `;
    
    return summary;
}

// Buka keranjang
function openCart() {
    // Cek apakah user sudah login
    if (!currentUser && cart.length > 0) {
        showSuccessMessage('Silakan login untuk melihat keranjang');
        openAuthModal();
        return;
    }
    
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
    // Cek apakah user sudah login
    if (!currentUser) {
        showSuccessMessage('Silakan login terlebih dahulu');
        openAuthModal();
        return false;
    }
    
    if (cart.length === 0) {
        showSuccessMessage('Keranjang belanja kosong! Tambahkan produk terlebih dahulu.');
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
            
            userRatingValueDisplay.textContent = value;
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
    
    // ==================== AUTH EVENT LISTENERS ====================
    
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
    
    // ==================== CART & PAYMENT EVENT LISTENERS ====================
    
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
        closeAuthModal();
        closeRatingModal();
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
