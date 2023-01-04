<script setup lang="ts">
import DashboardHeader from './Header/DashboardHeader.vue';
</script>

<template>
    <div class="mx-auto max-w-7xl">
        <DashboardHeader />
        <main class="flex flex-col py-[80px]">
            <RouterView />
        </main>
        <Footer />
    </div>
</template>

<style scoped></style>
