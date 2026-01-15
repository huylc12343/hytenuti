<script setup>
import bannerImage from '../../assets/images/dvkx.png';
import NQButton from '@/components/nq-button/NQButton.vue';
import NQCard from '@/components/nq-card/NQCard.vue';
import pic2 from '../../assets/images/products/pic2.jpg';
import NQGrid from '@/components/nq-grid/NQGrid.vue';
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
        <div class="banner d-flex">
            <img :src="bannerImage" alt="">
            <div class="banner-overlay">
                <h1>Chào mừng đến với dịch vụ ký xấu</h1>
                <p>Khám phá các sản phẩm của chúng mình</p>
            </div>
        </div>
        <!-- Featured Products -->
        <section class="featured">
            <h2 class="d-flex d-items-center d-justify-center">Sản phẩm nổi bật</h2>

            <NQGrid>
                <router-link v-for="p in products" :key="p.id" :to="`/product/${p.id}`" class="product-card">
                    <NQCard :image="p.image">
                        <h3>{{ p.name }}</h3>
                        <p class="price">{{ formatPrice(p.price) }}</p>
                        <NQButton text="Xem chi tiết" />
                    </NQCard>

                </router-link>
            </NQGrid>
        </section>
    </div>
</template>

<style scoped>
/* Banner */
.banner {
    width: 100%;
    position: relative;
    overflow: hidden;
    max-height: 500px;
}

.banner img {
    width: 100%;
    height: auto;
    display: block;
}

.banner-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.banner-overlay h1 {
    font-size: 48px;
    margin-bottom: 16px;
    font-weight: bold;
}

.banner-overlay p {
    font-size: 20px;
}

.featured {
    width: 100%;
    max-width: 1400px;
    padding: 60px 40px;
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

.banner-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
}
</style>
