<template>
    <footer class="flex flex-col">
        <div class="grid grid-cols-3 border-b border-neutral-300 pb-[100px]">
            <div class="col-span-2 flex flex-col space-y-4">
                <div class="flex items-center space-x-2">
                    <div class="aspect-square w-[32px]">
                        <img :src="Logo" alt="internstart-logo" class="w-full object-cover" />
                    </div>
                    <h3 class="text-lg font-medium text-neutral-800">Internstart</h3>
                </div>
                <p class="text-neutral-600">
                    Copyright 2022 by Kelompok mata kuliah pemrograman framework. <br />
                    All Right Reserved
                </p>
            </div>
            <div class="flex grid-cols-1 flex-col space-y-4">
                <h4 class="font-medium text-neutral-800">Layanan Kami</h4>
                <ul class="flex flex-col space-y-1 text-neutral-600">
                    <li><RouterLink to="/">Home</RouterLink></li>
                    <li><RouterLink to="/submission">Pengajuan</RouterLink></li>
                    <li><RouterLink to="/repporting">Pelaporan</RouterLink></li>
                </ul>
            </div>
        </div>
        <p class="flex items-center py-6 text-sm text-neutral-600">
            Recreated with <span class="px-1"><HeartIcon class="h-3 w-3 text-sky-600" /></span> by
            kelompok mata kuliah pemrograman framework
        </p>
    </footer>
</template>

<script setup lang="ts">
import { HeartIcon } from '@heroicons/vue/20/solid';
import { RouterLink } from 'vue-router';
import Logo from '@/assets/logo.svg';
</script>

<style scoped></style>
