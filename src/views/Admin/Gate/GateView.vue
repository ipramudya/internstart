<script setup lang="ts">
import Logo from '@/assets/logo.svg';
import GateForm from './GateForm.vue';
</script>

<template>
    <section class="grid min-h-screen grid-cols-2">
        <div class="col-span-1 flex flex-col items-center">
            <div class="pt-6">
                <div class="mx-auto mb-2 aspect-square w-[40px]">
                    <img :src="Logo" alt="internstart-logo" class="w-full object-cover" />
                </div>
                <h2 class="text-xl font-medium text-neutral-800">Internstart</h2>
            </div>
            <!-- login card -->
            <GateForm />
        </div>
        <div class="col-span-1 bg-sky-700"></div>
    </section>
</template>

<style scoped>
.parent-shadow {
    box-shadow: rgba(3, 105, 161, 0.2) 0px 7px 29px 0px;
}
</style>
