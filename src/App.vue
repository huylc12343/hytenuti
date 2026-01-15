<script setup>
import TheHeader from './layout/TheHeader.vue';
import TheMain from './layout/TheMain.vue';
import NQFooter from './components/nq-footer/NQFooter.vue';
</script>

<template>
  <div class="container">

    <TheHeader />
    <div class="content">
      <TheMain />
    </div>
    <NQFooter />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  overflow: auto;
}
</style>
