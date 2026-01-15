<template>
    <button class="btn-custom d-fle" :class="[background]">
        <i v-if="icon" class="icon" :class="[icon, color]"></i>
        <span v-if="text" class="text">{{ text }}</span>
    </button>
</template>
<script setup>
const props = defineProps({
    icon: {
        type: String,
        default: ''
    },
    text: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: 'icon-primary-white'
    },
    background: {
        type: String,
        default: 'bg-primary' //bg-primary, bg-secondary, bg-transparent, bg-outline
    }
});
</script>
<style scoped>
.btn-custom {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
}
</style>