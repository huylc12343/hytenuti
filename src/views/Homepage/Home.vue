<script setup>
import bannerImage from '../../assets/images/dvkx.png';
import pic2 from '../../assets/images/products/pic2.jpg';
const products = [
    { id: 1, name: 'Áo thun basic', price: 199000, image: pic2 },
    { id: 2, name: 'Áo hoodie', price: 399000, image: pic2 },
    { id: 3, name: 'Áo sơ mi', price: 299000, image: pic2 },
    { id: 4, name: 'Quần jeans', price: 459000, image: pic2 },
    { id: 5, name: 'Áo khoác', price: 499000, image: pic2 },
    { id: 6, name: 'Váy nữ', price: 349000, image: pic2 },
    { id: 7, name: 'Áo len', price: 279000, image: pic2 },
    { id: 8, name: 'Quần short', price: 189000, image: pic2 }
]

const formatPrice = (p) => p.toLocaleString('vi-VN') + 'đ'
</script>

<template>
    <div class="container d-flex d-flex-col d-items-center">
        <div class="banner">
            <img :src="bannerImage" alt="">
        </div>
        <!-- Featured Products -->
        <section class="featured">
            <h2 class="d-flex d-items-center d-justify-center">Sản phẩm nổi bật</h2>

            <div class="product-grid">
                <router-link v-for="p in products" :key="p.id" :to="`/product/${p.id}`" class="product-card">
                    <img :src="p.image" />
                    <h3>{{ p.name }}</h3>
                    <p class="price">{{ formatPrice(p.price) }}</p>
                </router-link>
            </div>
        </section>
    </div>
</template>

<style scoped>
.banner img {
    width: 100%;
    height: auto;
}

.featured {
    padding: 60px 40px;
}

.product-grid {
    margin-top: 30px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    /* 4 SP / hàng */
    grid-template-rows: repeat(2, auto);
    /* 2 hàng */
    gap: 24px;
}

.product-card {
    background: #fff;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, .08);
    transition: transform .2s;
}

.product-card:hover {
    transform: translateY(-6px);
}

.product-card img {
    width: 100%;
    border-radius: 12px;
}

.price {
    font-weight: bold;
    margin: 8px 0;
}

button {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    background: black;
    color: white;
    border: none;
    cursor: pointer;
}
</style>
