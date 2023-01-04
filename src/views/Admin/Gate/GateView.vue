<script setup lang="ts">
import Logo from '@/assets/logo.svg';
import GateBlobs from './GateBlobs.vue';
import GateForm from './GateForm.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
    <section class="relative grid min-h-screen grid-cols-2 overflow-hidden">
        <div class="relative col-span-1 flex items-center justify-center bg-sky-600">
            <GateBlobs />
            <div class="z-10 text-white">
                <h2 class="text-[48px] font-bold leading-tight tracking-wide">
                    Selamat datang <br />
                    admin Internstart!
                </h2>
                <p class="mt-4">
                    Silahkan masukkan Email dan Password yang telah terdaftar untuk masuk
                    <br />
                    ke halaman dashboard website Internstart
                </p>
            </div>
        </div>
        <div class="col-span-1 flex flex-col items-center">
            <div class="pt-6">
                <div class="mx-auto mb-2 aspect-square w-[40px]">
                    <img :src="Logo" alt="internstart-logo" class="w-full object-cover" />
                </div>
                <h2 class="text-xl font-medium text-neutral-800">Internstart</h2>
            </div>
            <!-- login card -->
            <GateForm />
            <p class="mt-10 rounded-md text-sm text-sky-700">
                <span>Ingin kembali ke halaman utama?</span>
                <RouterLink to="/" class="pl-2 font-medium underline-offset-2 hover:underline"
                    >Klik disini
                </RouterLink>
            </p>
        </div>
    </section>
</template>
