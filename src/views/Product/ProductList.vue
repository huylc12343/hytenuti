<template>
    <div class="container d-flex d-flex-col d-items-center d-justify-center">
        <div class="filter d-flex d-justify-between">
            <div class="left">
                <NQSelect label="Danh mục">
                    <option>Tất cả</option>
                    <option>Áo</option>
                    <option>Quần</option>
                    <option>Váy</option>
                </NQSelect>
            </div>
            <div class="right">
                <select>
                    <option>Mới nhất</option>
                    <option>Giá thấp → cao</option>
                    <option>Giá cao → thấp</option>
                </select>
            </div>
        </div>

        <section class="products d-flex d-flex-col d-items-center">
            <h2>Danh sách toàn bộ cửa hàng</h2>
            <NQGrid :column="3" :row="3">
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
<script setup>
import NQCard from '@/components/nq-card/NQCard.vue';
import NQButton from '@/components/nq-button/NQButton.vue';
import pic2 from '../../assets/images/products/pic2.jpg';
import NQGrid from '@/components/nq-grid/NQGrid.vue';
import NQSelect from '@/components/nq-select/NQSelect.vue';
const products = [
    { id: 1, name: 'Áo thun basic', price: 199000, image: pic2 },
    { id: 2, name: 'Áo hoodie', price: 399000, image: pic2 },
    { id: 3, name: 'Áo sơ mi', price: 299000, image: pic2 },
    { id: 4, name: 'Quần jeans', price: 459000, image: pic2 },
    { id: 5, name: 'Áo khoác', price: 499000, image: pic2 },
    { id: 6, name: 'Váy nữ', price: 349000, image: pic2 },
    { id: 7, name: 'Áo len', price: 279000, image: pic2 },
    { id: 8, name: 'Quần short', price: 189000, image: pic2 },
    { id: 9, name: 'Quần short', price: 189000, image: pic2 },
]

const formatPrice = (p) => p.toLocaleString('vi-VN') + 'đ'
</script>
<style scoped>
.filter,
.products {
    width: 80%;
    padding: 40px 60px;
    min-width: 1000px;
}
</style>