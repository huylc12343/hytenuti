<template>
    <button class="btn-custom d-flex">
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
    }
});
</script>
<style scoped>
.btn-custom {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    cursor: pointer;

}
</style>