<template>
    <div class="mx-auto max-w-7xl">
        <DefaultHeader />
        <main class="flex flex-col py-[160px]">
            <RouterView />
        </main>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import DefaultHeader from './Header/DefaultHeader.vue';
import Footer from './Footer.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<style scoped>
.el-button :deep(.el-icon) {
    font-size: 1rem;
}
</style>
