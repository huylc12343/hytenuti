<template>
    <div class="container d-flex d-flex-col d-justify-center d-items-center">
        <!-- Return button -->
        <div class="return-btn">
            <NQButton icon="arrow-left-i" text="Quay lại" @click="handleBack" />
        </div>

        <!-- Product not found -->
        <div v-if="!product" class="not-found">
            <h2>Không tìm thấy sản phẩm</h2>
            <p>Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <NQButton text="Về trang chủ" @click="$router.push('/')" />
        </div>

        <!-- Product detail -->
        <template v-else>
            <div class="product-detail d-flex d-flex-row d-justify-center">
                <div class="product-left">
                    <img :src="product.image" :alt="product.name" loading="lazy">
                    <div v-if="product.discount" class="discount-badge">
                        -{{ product.discount }}%
                    </div>
                </div>

                <div class="product-right">
                    <h1>{{ product.name }}</h1>

                    <!-- Price display -->
                    <div class="price-section">
                        <p class="price">{{ formatPrice(product.price) }}</p>
                        <p v-if="product.originalPrice" class="original-price">
                            {{ formatPrice(product.originalPrice) }}
                        </p>
                    </div>

                    <!-- Stock status -->
                    <div class="stock-status" :class="stockStatusClass">
                        <span>{{ stockStatusText }}</span>
                    </div>

                    <!-- Quantity input -->
                    <NQInput label="Số lượng" type="number" :min="1" :max="product.stock || 999" labelPosition="left"
                        v-model="quantity" :error="quantityError" @change="validateQuantity" />

                    <!-- Total price -->
                    <div v-if="quantity > 0" class="total-price">
                        <span>Tổng tiền:</span>
                        <strong>{{ formatPrice(totalPrice) }}</strong>
                    </div>

                    <!-- Action buttons -->
                    <div class="action-buttons">
                        <NQButton icon="payment-bag-i" color="icon-secondary" text="Thêm vào giỏ hàng"
                            :disabled="!canAddToCart" @click="addToCart" />
                        <NQButton text="Mua ngay" color="primary" :disabled="!canAddToCart" @click="buyNow" />
                    </div>

                    <!-- Product meta info -->
                    <div v-if="product.category || product.sku" class="product-meta">
                        <p v-if="product.category">
                            <strong>Danh mục:</strong> {{ product.category }}
                        </p>
                        <p v-if="product.sku">
                            <strong>Mã sản phẩm:</strong> {{ product.sku }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Product description -->
            <div class="product-description">
                <h2>Mô tả sản phẩm</h2>
                <div v-if="product.description" v-html="product.description"></div>
                <p v-else>
                    Đây là mô tả chi tiết về sản phẩm {{ product.name }}. Sản phẩm này được làm từ chất liệu cao cấp,
                    thiết kế hiện đại và phù hợp với nhiều phong cách khác nhau. Với mức giá hợp lý, đây chắc chắn sẽ là
                    lựa chọn
                    tuyệt vời cho bạn.
                </p>
            </div>

            <!-- Product specifications -->
            <div v-if="product.specifications" class="product-specs">
                <h2>Thông số kỹ thuật</h2>
                <table>
                    <tr v-for="(value, key) in product.specifications" :key="key">
                        <td class="spec-label">{{ key }}</td>
                        <td class="spec-value">{{ value }}</td>
                    </tr>
                </table>
            </div>

            <!-- Related products -->
            <div v-if="relatedProducts.length > 0" class="related-products">
                <h2>Sản phẩm liên quan</h2>
                <div class="related-products-grid">
                    <div v-for="item in relatedProducts" :key="item.id" class="related-product-card"
                        @click="navigateToProduct(item.id)">
                        <img :src="item.image" :alt="item.name">
                        <h3>{{ item.name }}</h3>
                        <p>{{ formatPrice(item.price) }}</p>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import NQButton from '@/components/nq-button/NQButton.vue';
import NQInput from '@/components/nq-input/NQInput.vue';
import pic2 from '../../assets/images/products/pic2.jpg';

const route = useRoute();
const router = useRouter();

// State
const quantity = ref(1);
const quantityError = ref('');

// Mock data - nên chuyển sang store (Pinia/Vuex) hoặc API
const products = [
    { id: 1, name: 'Áo thun basic', price: 199000, image: pic2, stock: 50, category: 'Áo thun' },
    { id: 2, name: 'Áo hoodie', price: 399000, image: pic2, stock: 30, category: 'Áo hoodie' },
    { id: 3, name: 'Áo sơ mi', price: 299000, image: pic2, stock: 0, category: 'Áo sơ mi' },
    { id: 4, name: 'Quần jeans', price: 459000, image: pic2, stock: 20, category: 'Quần' },
    { id: 5, name: 'Áo khoác', price: 499000, image: pic2, stock: 15, category: 'Áo khoác' },
    { id: 6, name: 'Váy nữ', price: 349000, image: pic2, stock: 25, category: 'Váy' },
    { id: 7, name: 'Áo len', price: 279000, image: pic2, stock: 40, category: 'Áo len' },
    { id: 8, name: 'Quần short', price: 189000, image: pic2, stock: 35, category: 'Quần' }
];

// Computed
const productId = computed(() => Number(route.params.id));

const product = computed(() => products.find(p => p.id === productId.value));

const totalPrice = computed(() => {
    if (!product.value || !quantity.value) return 0;
    return product.value.price * quantity.value;
});

const stockStatusClass = computed(() => {
    const stock = product.value?.stock || 0;
    if (stock === 0) return 'out-of-stock';
    if (stock < 10) return 'low-stock';
    return 'in-stock';
});

const stockStatusText = computed(() => {
    const stock = product.value?.stock || 0;
    if (stock === 0) return 'Hết hàng';
    if (stock < 10) return `Chỉ còn ${stock} sản phẩm`;
    return 'Còn hàng';
});

const canAddToCart = computed(() => {
    return product.value &&
        product.value.stock > 0 &&
        quantity.value > 0 &&
        quantity.value <= product.value.stock &&
        !quantityError.value;
});

const relatedProducts = computed(() => {
    if (!product.value) return [];
    return products
        .filter(p => p.id !== product.value.id && p.category === product.value.category)
        .slice(0, 4);
});

// Methods
const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
};

const validateQuantity = () => {
    if (!product.value) return;

    const qty = Number(quantity.value);
    const stock = product.value.stock || 0;

    if (qty < 1) {
        quantityError.value = 'Số lượng tối thiểu là 1';
    } else if (qty > stock) {
        quantityError.value = `Chỉ còn ${stock} sản phẩm`;
    } else {
        quantityError.value = '';
    }
};

const addToCart = () => {
    if (!canAddToCart.value) return;

    // TODO: Implement add to cart logic
    const cartItem = {
        productId: product.value.id,
        name: product.value.name,
        price: product.value.price,
        quantity: quantity.value,
        image: product.value.image
    };

    console.log('Thêm vào giỏ hàng:', cartItem);

    // Show success message
    alert(`Đã thêm ${quantity.value} ${product.value.name} vào giỏ hàng`);
};

const buyNow = () => {
    if (!canAddToCart.value) return;

    // TODO: Implement buy now logic
    addToCart();
    router.push('/checkout');
};

const handleBack = () => {
    router.back();
};

const navigateToProduct = (id) => {
    router.push(`/product/${id}`);
};

// Watch route changes
watch(() => route.params.id, () => {
    quantity.value = 1;
    quantityError.value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Validate quantity on mount
validateQuantity();
</script>

<style scoped>
.container {
    min-height: 100vh;
    padding: 20px;
}

.return-btn {
    align-self: flex-start;
    margin-bottom: 20px;
}

.not-found {
    text-align: center;
    padding: 60px 20px;
}

.not-found h2 {
    margin-bottom: 16px;
    color: #e74c3c;
}

.not-found p {
    margin-bottom: 24px;
    color: #666;
}

.product-detail {
    padding: 20px;
    max-width: 1000px;
    gap: 60px;
}

.product-left {
    position: relative;
}

.product-detail img {
    width: 400px;
    height: 400px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.discount-badge {
    position: absolute;
    top: 16px;
    right: 16px;
    background-color: #e74c3c;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-weight: bold;
}

.product-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.product-right h1 {
    font-size: 28px;
    margin: 0;
    color: #333;
}

.price-section {
    display: flex;
    align-items: center;
    gap: 12px;
}

.price {
    font-size: 32px;
    font-weight: bold;
    color: #e74c3c;
    margin: 0;
}

.original-price {
    font-size: 20px;
    color: #999;
    text-decoration: line-through;
    margin: 0;
}

.stock-status {
    padding: 8px 12px;
    border-radius: 4px;
    font-weight: 500;
    display: inline-block;
    width: fit-content;
}

.stock-status.in-stock {
    background-color: #d4edda;
    color: #155724;
}

.stock-status.low-stock {
    background-color: #fff3cd;
    color: #856404;
}

.stock-status.out-of-stock {
    background-color: #f8d7da;
    color: #721c24;
}

.total-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: #f8f9fa;
    border-radius: 4px;
    font-size: 18px;
}

.total-price strong {
    color: #e74c3c;
    font-size: 24px;
}

.action-buttons {
    display: flex;
    gap: 12px;
    margin-top: 8px;
}

.action-buttons button {
    flex: 1;
}

.product-meta {
    border-top: 1px solid #eee;
    padding-top: 16px;
    font-size: 14px;
}

.product-meta p {
    margin: 8px 0;
    color: #666;
}

.product-description,
.product-specs,
.related-products {
    max-width: 1000px;
    margin-top: 40px;
    padding: 0 20px;
    width: 100%;
}

.product-description h2,
.product-specs h2,
.related-products h2 {
    margin-bottom: 16px;
    color: #333;
    border-bottom: 2px solid #3498db;
    padding-bottom: 8px;
}

.product-description p {
    text-align: justify;
    line-height: 1.6;
    color: #555;
}

.product-specs table {
    width: 100%;
    border-collapse: collapse;
}

.product-specs tr {
    border-bottom: 1px solid #eee;
}

.product-specs td {
    padding: 12px 0;
}

.spec-label {
    font-weight: 500;
    color: #666;
    width: 200px;
}

.spec-value {
    color: #333;
}

.related-products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.related-product-card {
    cursor: pointer;
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 12px;
    transition: transform 0.2s, box-shadow 0.2s;
}

.related-product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.related-product-card img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 4px;
    margin-bottom: 8px;
}

.related-product-card h3 {
    font-size: 16px;
    margin: 8px 0;
    color: #333;
}

.related-product-card p {
    font-size: 18px;
    font-weight: bold;
    color: #e74c3c;
    margin: 0;
}

/* Responsive */
@media (max-width: 768px) {
    .product-detail {
        flex-direction: column;
        gap: 24px;
    }

    .product-detail img {
        width: 100%;
        max-width: 400px;
    }

    .action-buttons {
        flex-direction: column;
    }

    .related-products-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>