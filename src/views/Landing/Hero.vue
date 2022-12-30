<template>
    <article class="flex items-center justify-center pt-[140px]">
        <div class="flex flex-col items-center space-y-6 text-center">
            <h2 class="text-[48px] font-bold text-neutral-800">
                Daftarkan pengajuan magangmu <br />
                sekarang juga
            </h2>
            <p class="text-lg text-neutral-600">
                Kami menyediakan fitur untuk pencatatan mahasiswa yang akan atau sedang <br />
                melakukan program magang atau praktik kerja lainnya.
            </p>
            <div class="flex items-center space-x-4">
                <el-button
                    plain
                    size="large"
                    :icon="CloudArrowUpIcon"
                    class="ease-transition rounded-md bg-sky-500 !text-white hover:bg-sky-400"
                >
                    Ajukan Laporan
                </el-button>
                <el-button
                    plain
                    size="large"
                    :icon="ClipboardDocumentCheckIcon"
                    class="ease-transition rounded-md border border-neutral-300 text-neutral-700 hover:border-sky-500 hover:bg-sky-50 hover:text-sky-500"
                >
                    Cek Laporan Magang
                </el-button>
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import { CloudArrowUpIcon, ClipboardDocumentCheckIcon } from '@heroicons/vue/24/outline';
</script>

<style scoped>
.el-button :deep(.el-icon) {
    font-size: 1.5rem;
}
</style>
