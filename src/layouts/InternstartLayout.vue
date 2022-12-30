<template>
    <main class="mx-auto max-w-7xl">
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
                        <p class="font-medium text-neutral-700">Beranda</p>
                    </RouterLink>
                    <RouterLink to="/submission" exact-active-class="font-medium">
                        <p class="text-neutral-700">Pengajuan</p>
                    </RouterLink>
                    <RouterLink to="/repporting" exact-active-class="font-medium">
                        <p class="text-neutral-700">Cek Laporan</p>
                    </RouterLink>
                </div>
            </div>
            <el-button class="ease-transition bg-sky-500 !text-white hover:bg-sky-600">
                <span class="font-normal">Masuk sebagai admin</span>
            </el-button>
        </header>
        <main>
            <RouterView />
        </main>
        <!--  -->
    </main>
</template>

<script setup lang="ts">
import Logo from '@/assets/logo.svg';
</script>

<style scoped></style>
