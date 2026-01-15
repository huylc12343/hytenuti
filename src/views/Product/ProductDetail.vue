<template>
    <div class="container d-flex d-flex-col d-justify-center d-items-center">
        <div class="return-btn">
            <NQButton icon="arrow-left-i" text="Quay lại" @click="$router.back()" />
        </div>
        <div class="product-detail d-flex d-flex-row d-justify-center">
            <div class="product-left">
                <img :src=product?.image alt="">
            </div>
            <div class="product-right">
                <h1>{{ product?.name }}</h1>
                <p>{{ product?.price }}</p>
                <NQInput label="Số lượng" type="number" min="1" labelPosition="left" v-model="quantity" />
                <NQButton icon="payment-bag-i" color="icon-secondary" text="Thêm vào giỏ hàng" />
            </div>
        </div>
        <div class="product-description">
            <h2>Mô tả sản phẩm</h2>
            <p>Đây là mô tả chi tiết về sản phẩm {{ product?.name }}. Sản phẩm này được làm từ chất liệu cao cấp,
                thiết
                kế hiện đại và phù hợp với nhiều phong cách khác nhau. Với mức giá hợp lý, đây chắc chắn sẽ là lựa chọn
                tuyệt vời cho bạn.</p>
        </div>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import NQButton from '@/components/nq-button/NQButton.vue';
import NQInput from '@/components/nq-input/NQInput.vue';
import pic2 from '../../assets/images/products/pic2.jpg';
const route = useRoute();
const productId = Number(route.params.id);
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

const product = products.find(p => p.id === productId)


</script>
<style scoped>
.return-btn {
    align-self: flex-start;
}

.product-detail {
    padding: 20px;
    max-width: 1000px;
}

.product-detail img {
    width: 400px;
}

.product-detail .product-right {
    margin-left: 40px;
}

.product-left {
    margin-right: 60px;
}

.product-description {
    text-align: justify;
    max-width: 800px;
    margin-top: 40px;
    padding: 0 20px;
}
</style>