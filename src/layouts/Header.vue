<template>
    <header class="flex items-center justify-between py-6">
        <div class="flex items-center">
            <div class="mr-[100px] flex items-center space-x-2">
                <div class="aspect-square w-[40px]">
                    <img :src="Logo" alt="internstart-logo" class="w-full object-cover" />
                </div>
                <h2 class="text-xl font-medium text-neutral-800">Internstart</h2>
            </div>
            <div class="flex space-x-4">
                <RouterLink to="/" exact-active-class="font-medium">
                    <p class="font-medium text-neutral-600">Beranda</p>
                </RouterLink>
                <RouterLink to="/submission" exact-active-class="font-medium">
                    <p class="text-neutral-600">Pengajuan</p>
                </RouterLink>
                <RouterLink to="/repporting" exact-active-class="font-medium">
                    <p class="text-neutral-600">Pelaporan</p>
                </RouterLink>
            </div>
        </div>
        <el-button
            plain
            class="ease-transition rounded-md border border-sky-500 text-sky-600 hover:border-sky-400 hover:text-sky-400"
            :icon="ArrowRightOnRectangleIcon"
        >
            <span class="font-normal">Masuk sebagai admin</span>
        </el-button>
    </header>
</template>

<script setup lang="ts">
import Logo from '@/assets/logo.svg';
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline';
</script>

<style scoped>
.el-button :deep(.el-icon) {
    font-size: 1rem;
}
</style>
