<template>
    <div class="mx-auto max-w-7xl">
        <Header />
        <main class="flex flex-col py-[160px]">
            <RouterView />
        </main>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import Header from './Header.vue';
import Footer from './Footer.vue';
</script>

<style scoped>
.el-button :deep(.el-icon) {
    font-size: 1rem;
}
</style>
