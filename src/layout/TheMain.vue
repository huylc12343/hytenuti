<script setup></script>
<template>
    <div class="main">
        <router-view />
    </div>
</template>
<style scoped>
.main {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #f1f2f1;
    min-width: 0;
}
</style>