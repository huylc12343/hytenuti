<script setup>
import logo from '../assets/images/logo.png';
import NQButton from '@/components/nq-button/NQButton.vue';
const navItems = [
    { name: 'Home', link: '/' },
    { name: 'Products', link: '/products' },
    { name: 'About', link: '/about' },
    { name: 'Contact', link: '/contact' }];
const logoItems = [
    { name: 'bell-i', link: '/cart' },
    { name: 'search-i', link: '/search' },
    { name: 'setting-i', link: '/Admin' }
];
</script>

<template>
    <div class="navbar ">
        <div class="left">
            <div class="logo"><img :src="logo" alt=""></div>
        </div>
        <div class="center d-flex d-items-center">
            <ul class="d-flex d-items-center">
                <li v-for="(item, index) in navItems" :key="index">
                    <a :href="item.link">{{ item.name }}</a>
                </li>
            </ul>
        </div>
        <div class="right">
            <ul class="d-flex d-items-center">
                <li v-for="(item, index) in logoItems" :key="index">
                    <NQButton :icon="item.name" />
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.navbar {
    width: 100%;
    height: 80px;
    display: flex;
    background-color: var(--color-branding-primary);
    justify-content: space-between;
    align-items: center;
    /* padding: 0 20px; */
}

.left {
    margin-left: 30px;
}

.logo img {
    height: 84px;
}

.right {
    margin-right: 30px;
}

ul li a {
    margin: 0 15px;
    text-decoration: none;
    color: white;
}

.right ul li {
    margin: 0 10px;
}
</style>
