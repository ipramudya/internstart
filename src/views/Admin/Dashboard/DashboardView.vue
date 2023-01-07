<script setup lang="ts">
import { MagnifyingGlassIcon } from '@heroicons/vue/24/outline';
import DashboardTable from './DashboardTable.vue';
</script>

<template>
    <section class="mb-[36px]">
        <h2 class="text-[48px] font-bold text-neutral-800">Selamat datang kembali!</h2>
        <div class="mt-4 flex items-center justify-between">
            <p class="text-neutral-600">
                Mari cek data terbaru tentang proses magang dan <br />
                kerja praktik mahasiswa
            </p>
            <el-input
                size="large"
                placeholder="Cari mahasiswa..."
                class="max-w-[400px]"
                :suffix-icon="MagnifyingGlassIcon"
            />
        </div>
    </section>

    <DashboardTable />
</template>

<style scoped>
.el-input :deep(.el-icon) {
    font-size: 1.25rem;
}
</style>
