<template>
    <div class="custom-grid" :style="gridStyle">
        <slot />
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    row: {
        type: Number,
        default: 2
    },
    column: {
        type: Number,
        default: 4
    },
    gap: {
        type: Number,
        default: 24
    }
})

const gridStyle = computed(() => ({
    gridTemplateColumns: `repeat(${props.column}, 1fr)`,
    gridTemplateRows: `repeat(${props.row}, auto)`,
    gap: `${props.gap}px`
}))
</script>

<style scoped>
.custom-grid {
    margin-top: 30px;
    display: grid;
}
</style>
