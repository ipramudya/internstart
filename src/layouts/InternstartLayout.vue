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
import Footer from './Footer.vue';
import DefaultHeader from './Header/DefaultHeader.vue';
</script>

<style scoped>
.el-button :deep(.el-icon) {
    font-size: 1rem;
}
</style>
