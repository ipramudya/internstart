<template>
    <div class="mx-auto max-w-7xl">
        <Header />
        <main class="flex flex-col" :class="{ 'py-[160px]': !route.path.includes('admin') }">
            <RouterView />
        </main>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import Header from './Header.vue';
import Footer from './Footer.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style scoped>
.el-button :deep(.el-icon) {
    font-size: 1rem;
}
</style>
