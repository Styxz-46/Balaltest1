[file name]: index.html
[file content begin]
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TakiStore | Marketplace Aplikasi Premium</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        /* CSS sebelumnya tetap sama... */
        /* Tambahkan style baru untuk rating */
        
        /* Rating Stars */
        .rating-stars {
            display: flex;
            gap: 4px;
            margin-bottom: 8px;
        }
        
        .rating-star {
            color: var(--light-gray);
            font-size: 1.1rem;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .rating-star.active {
            color: #ffc107;
        }
        
        .rating-star.hover {
            color: #ffc107;
        }
        
        .rating-info {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 16px;
        }
        
        .rating-average {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--dark);
        }
        
        .rating-count {
            color: var(--gray);
            font-size: 0.9rem;
        }
        
        .product-rating {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-bottom: 12px;
        }
        
        .product-rating-stars {
            display: flex;
            gap: 2px;
        }
        
        .product-rating-star {
            color: #ffc107;
            font-size: 0.9rem;
        }
        
        .product-rating-score {
            font-weight: 600;
            color: var(--dark);
        }
        
        .product-rating-count {
            color: var(--gray);
            font-size: 0.85rem;
        }
        
        /* Reviews Section in Product Card */
        .product-reviews {
            margin-top: 16px;
            border-top: 1px solid var(--light-gray);
            padding-top: 16px;
        }
        
        .review-item {
            margin-bottom: 16px;
            padding-bottom: 16px;
            border-bottom: 1px solid #f0f0f0;
        }
        
        .review-item:last-child {
            border-bottom: none;
            margin-bottom: 0;
            padding-bottom: 0;
        }
        
        .review-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }
        
        .reviewer-name {
            font-weight: 600;
            color: var(--dark);
        }
        
        .review-date {
            color: var(--gray);
            font-size: 0.85rem;
        }
        
        .review-rating {
            display: flex;
            gap: 2px;
            margin-bottom: 8px;
        }
        
        .review-rating-star {
            color: #ffc107;
            font-size: 0.8rem;
        }
        
        .review-comment {
            color: var(--dark);
            line-height: 1.5;
            font-size: 0.95rem;
        }
        
        .no-reviews {
            color: var(--gray);
            text-align: center;
            padding: 20px 0;
            font-style: italic;
        }
        
        /* View All Reviews Button */
        .view-reviews-btn {
            background: none;
            border: 1px solid var(--primary);
            color: var(--primary);
            border-radius: 8px;
            padding: 8px 16px;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            transition: var(--transition);
            display: flex;
            align-items: center;
            gap: 6px;
            margin: 20px auto 0;
        }
        
        .view-reviews-btn:hover {
            background: var(--primary);
            color: white;
        }
        
        /* Rating Modal */
        .rating-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.9);
            background: white;
            border-radius: 24px;
            padding: 30px;
            max-width: 500px;
            width: 90%;
            z-index: 1004;
            opacity: 0;
            visibility: hidden;
            transition: var(--transition);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .rating-modal.active {
            opacity: 1;
            visibility: visible;
            transform: translate(-50%, -50%) scale(1);
        }
        
        .rating-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
        }
        
        .rating-header h3 {
            font-size: 1.5rem;
            font-weight: 600;
        }
        
        .close-rating {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--gray);
            transition: var(--transition);
        }
        
        .close-rating:hover {
            color: var(--dark);
            transform: rotate(90deg);
        }
        
        /* Rating Form */
        .rating-form {
            margin-bottom: 30px;
        }
        
        .form-title {
            font-weight: 600;
            margin-bottom: 16px;
            color: var(--dark);
        }
        
        .your-rating {
            margin-bottom: 20px;
        }
        
        .rating-input {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 16px;
        }
        
        .rating-input .rating-stars {
            margin-bottom: 0;
        }
        
        .rating-value {
            font-weight: 600;
            color: var(--dark);
            min-width: 30px;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        .form-label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: var(--dark);
        }
        
        .form-control {
            width: 100%;
            padding: 14px;
            border: 2px solid var(--light-gray);
            border-radius: 12px;
            font-size: 1rem;
            font-family: 'Inter', sans-serif;
            transition: var(--transition);
        }
        
        .form-control:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        .form-control.error {
            border-color: var(--danger);
        }
        
        .form-error {
            color: var(--danger);
            font-size: 0.85rem;
            margin-top: 6px;
            display: none;
        }
        
        .form-error.show {
            display: block;
        }
        
        .submit-rating-btn {
            width: 100%;
            padding: 16px;
            background: linear-gradient(to right, var(--primary), var(--primary-dark));
            color: white;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: var(--transition);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        
        .submit-rating-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(99, 102, 241, 0.2);
        }
        
        .submit-rating-btn:disabled {
            background: var(--light-gray);
            color: var(--gray);
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
        
        /* Reviews List */
        .reviews-list {
            max-height: 300px;
            overflow-y: auto;
            padding-right: 10px;
        }
        
        .reviews-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 20px;
            color: var(--dark);
        }
        
        /* Review Filters */
        .review-filters {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }
        
        .review-filter {
            background: none;
            border: 1px solid var(--light-gray);
            border-radius: 20px;
            padding: 8px 16px;
            font-size: 0.9rem;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .review-filter:hover {
            border-color: var(--primary);
            color: var(--primary);
        }
        
        .review-filter.active {
            background: var(--primary);
            color: white;
            border-color: var(--primary);
        }
        
        /* User Review Badge */
        .user-review-badge {
            background: var(--primary);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 600;
            margin-left: 8px;
        }
        
        /* Add Review Button */
        .add-review-btn {
            background: linear-gradient(to right, var(--secondary), var(--secondary-dark));
            color: white;
            border: none;
            border-radius: 8px;
            padding: 10px 20px;
            font-weight: 600;
            cursor: pointer;
            transition: var(--transition);
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.9rem;
            margin-top: 20px;
        }
        
        .add-review-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(16, 185, 129, 0.2);
        }
        
        .add-review-btn:disabled {
            background: var(--light-gray);
            color: var(--gray);
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
        }
        
        /* Already Reviewed Message */
        .already-reviewed {
            color: var(--secondary);
            font-weight: 500;
            margin-top: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        /* Update Product Card */
        .product-rating-section {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
        }
        
        .product-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        }
        
        .product-category {
            background: rgba(99, 102, 241, 0.1);
            color: var(--primary);
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        /* Rating Summary */
        .rating-summary {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .rating-summary-score {
            text-align: center;
        }
        
        .rating-summary-average {
            font-size: 3rem;
            font-weight: 700;
            color: var(--dark);
            line-height: 1;
        }
        
        .rating-summary-stars {
            display: flex;
            gap: 2px;
            margin: 8px 0;
        }
        
        .rating-summary-count {
            color: var(--gray);
            font-size: 0.9rem;
        }
        
        .rating-distribution {
            flex: 1;
        }
        
        .rating-bar {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 8px;
        }
        
        .rating-bar-label {
            width: 60px;
            font-size: 0.9rem;
            color: var(--gray);
        }
        
        .rating-bar-progress {
            flex: 1;
            height: 8px;
            background: var(--light-gray);
            border-radius: 4px;
            overflow: hidden;
        }
        
        .rating-bar-fill {
            height: 100%;
            background: #ffc107;
            border-radius: 4px;
        }
        
        /* Scrollbar for reviews */
        .reviews-list::-webkit-scrollbar,
        .cart-items-wrapper::-webkit-scrollbar,
        .variant-list::-webkit-scrollbar,
        .order-summary::-webkit-scrollbar {
            width: 6px;
        }
        
        .reviews-list::-webkit-scrollbar-track,
        .cart-items-wrapper::-webkit-scrollbar-track,
        .variant-list::-webkit-scrollbar-track,
        .order-summary::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
        }
        
        .reviews-list::-webkit-scrollbar-thumb,
        .cart-items-wrapper::-webkit-scrollbar-thumb,
        .variant-list::-webkit-scrollbar-thumb,
        .order-summary::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 3px;
        }
        
        .reviews-list::-webkit-scrollbar-thumb:hover,
        .cart-items-wrapper::-webkit-scrollbar-thumb:hover,
        .variant-list::-webkit-scrollbar-thumb:hover,
        .order-summary::-webkit-scrollbar-thumb:hover {
            background: #a1a1a1;
        }
        
        /* Responsive untuk rating */
        @media (max-width: 768px) {
            .rating-modal {
                padding: 20px;
            }
            
            .rating-summary {
                flex-direction: column;
                gap: 15px;
            }
            
            .rating-distribution {
                width: 100%;
            }
        }
        
        @media (max-width: 480px) {
            .rating-header h3 {
                font-size: 1.3rem;
            }
            
            .review-filters {
                justify-content: center;
            }
            
            .rating-summary-average {
                font-size: 2.5rem;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <!-- ... (header tetap sama) ... -->
    </header>

    <!-- Auth Modal -->
    <div class="auth-modal" id="authModal">
        <!-- ... (auth modal tetap sama) ... -->
    </div>

    <!-- Hero Section -->
    <section class="hero">
        <!-- ... (hero section tetap sama) ... -->
    </section>

    <!-- Products Section -->
    <section class="container">
        <h2 class="section-title">
            <i class="fas fa-star"></i> App Premium
        </h2>
        <div class="products-grid" id="productsGrid">
            <!-- Products will be loaded by JavaScript -->
        </div>
    </section>

    <!-- Variant Modal -->
    <div class="variant-modal" id="variantModal">
        <!-- ... (variant modal tetap sama) ... -->
    </div>

    <!-- Rating Modal -->
    <div class="rating-modal" id="ratingModal">
        <div class="rating-header">
            <h3 id="ratingModalTitle">Rating & Ulasan</h3>
            <button class="close-rating" id="closeRating">
                <i class="fas fa-times"></i>
            </button>
        </div>
        
        <!-- Rating Summary -->
        <div class="rating-summary" id="ratingSummary">
            <!-- Summary akan diisi oleh JavaScript -->
        </div>
        
        <!-- Rating Form (hanya untuk user yang sudah login dan belum review) -->
        <div class="rating-form" id="ratingForm">
            <div class="form-title">Beri Rating & Ulasan</div>
            
            <div class="your-rating">
                <div class="form-label">Rating Anda</div>
                <div class="rating-input">
                    <div class="rating-stars" id="userRatingStars">
                        <i class="fas fa-star rating-star" data-value="1"></i>
                        <i class="fas fa-star rating-star" data-value="2"></i>
                        <i class="fas fa-star rating-star" data-value="3"></i>
                        <i class="fas fa-star rating-star" data-value="4"></i>
                        <i class="fas fa-star rating-star" data-value="5"></i>
                    </div>
                    <div class="rating-value" id="userRatingValue">0</div>
                </div>
            </div>
            
            <div class="form-group">
                <label class="form-label" for="reviewComment">Ulasan (opsional)</label>
                <textarea 
                    id="reviewComment" 
                    class="form-control" 
                    rows="4" 
                    placeholder="Bagikan pengalaman Anda menggunakan aplikasi ini..."
                ></textarea>
                <div class="form-error" id="reviewCommentError">Ulasan terlalu pendek</div>
            </div>
            
            <button class="submit-rating-btn" id="submitRatingBtn" disabled>
                <i class="fas fa-paper-plane"></i> Kirim Rating & Ulasan
            </button>
            
            <div class="already-reviewed" id="alreadyReviewed" style="display: none;">
                <i class="fas fa-check-circle"></i>
                <span>Anda sudah memberikan rating untuk produk ini</span>
            </div>
        </div>
        
        <!-- Reviews Filter -->
        <div class="review-filters" id="reviewFilters">
            <button class="review-filter active" data-filter="all">Semua</button>
            <button class="review-filter" data-filter="5">5 bintang</button>
            <button class="review-filter" data-filter="4">4 bintang</button>
            <button class="review-filter" data-filter="3">3 bintang</button>
            <button class="review-filter" data-filter="2">2 bintang</button>
            <button class="review-filter" data-filter="1">1 bintang</button>
        </div>
        
        <!-- Reviews List -->
        <div class="reviews-title">Ulasan Pengguna</div>
        <div class="reviews-list" id="reviewsList">
            <!-- Reviews will be loaded by JavaScript -->
        </div>
        
        <!-- Add Review Button (untuk user yang belum login) -->
        <button class="add-review-btn" id="addReviewBtn" style="display: none;">
            <i class="fas fa-star"></i> Login untuk Memberikan Rating
        </button>
    </div>

    <!-- Cart Sidebar -->
    <div class="cart-sidebar" id="cartSidebar">
        <!-- ... (cart sidebar tetap sama) ... -->
    </div>

    <!-- Overlay -->
    <div class="overlay" id="overlay"></div>

    <!-- Confirmation Modal -->
    <div class="modal" id="orderModal">
        <!-- ... (order modal tetap sama) ... -->
    </div>

    <!-- Footer -->
    <footer>
        <!-- ... (footer tetap sama) ... -->
    </footer>

    <script src="script.js"></script>
</body>
</html>
[file content end]
