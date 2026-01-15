<template>
    <div class="custom-card">
        <img :src="image" alt="Card Image" />
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    image: {
        type: String
    }
})
</script>
<style scoped>
.custom-card {
    background: #fff;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, .08);
    transition: transform .2s;
}

.custom-card:hover {
    transform: translateY(-6px);
}

.custom-card img {
    width: 100%;
    border-radius: 12px;
}
</style>