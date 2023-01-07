<script setup lang="ts">
import type { Document } from '@/services/report/check-report.types';
import { computed } from 'vue';
const props = defineProps<{
    repportData: Document;
}>();

const reportMessage = computed(() => {
    if (!props.repportData.partner?.approval) {
        return {
            message: 'Menunggu Persetujuan',
            style: 'border-amber-500 text-amber-500',
        };
    } else if (props.repportData.partner.approval === 'Disetujui') {
        return {
            message: 'Ajuan berhasil disetujui',
            style: 'border-emerald-500 text-emerald-500',
        };
    } else {
        return {
            message: 'Ajuan ditolak',
            style: 'border-rose-500 text-rose-500',
        };
    }
});
</script>

<template>
    <div
        class="data-shadow mx-auto mt-[80px] min-w-[600px] flex-col rounded-lg border border-sky-100 bg-white py-6"
    >
        <div class="flex flex-col items-center">
            <h2 class="mb-3 text-2xl font-bold text-neutral-800">Data Pelaporan Kelompok</h2>
            <span
                class="b mb-6 rounded-full border bg-white px-2 py-1 text-xs"
                :class="reportMessage.style"
            >
                {{ reportMessage.message }}
            </span>
            <div class="flex flex-col space-y-2">
                <div class="data-wrapper">
                    <h3 class="data-title">Nama Ketua Kelompok</h3>
                    <p class="data-value">
                        <span class="pr-1">:</span>
                        {{ repportData.lead }}
                    </p>
                </div>
                <template v-for="(member, idx) in repportData.group" :key="member.npm">
                    <div v-if="+idx !== 0" class="data-wrapper">
                        <h3 class="data-title">Nama Anggota {{ +idx }}</h3>
                        <p class="data-value">
                            <span class="pr-1">:</span>
                            {{ member.name }}
                        </p>
                    </div>
                </template>
                <div class="data-wrapper">
                    <h3 class="data-title">Nama Perusahaan</h3>
                    <p class="data-value">
                        <span class="pr-1">:</span>
                        {{ repportData.partner.name }}
                    </p>
                </div>
                <div class="data-wrapper">
                    <h3 class="data-title">Alamat Perusahaan</h3>
                    <p class="data-value">
                        <span class="pr-1">:</span>
                        {{ repportData.partner.address }}
                    </p>
                </div>
            </div>
            <div class="mt-6 flex items-center space-x-6">
                <a
                    :href="repportData.partner.files.coverLetter.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="link-button bg-sky-500 text-white hover:bg-opacity-80"
                    >Surat Pengantar</a
                >
                <a
                    :href="repportData.partner.files.responseLetter.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="link-button border border-sky-500 bg-white text-sky-500 hover:border-opacity-60"
                    >Surat Balasan</a
                >
            </div>
        </div>
    </div>
</template>

<style scoped lang="postcss">
.data-shadow {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
}
.data-wrapper {
    @apply flex items-center space-x-2;
}
.data-title {
    @apply min-w-[200px] font-medium text-neutral-600;
}
.data-value {
    @apply to-neutral-600;
}
.link-button {
    @apply ease-transition block rounded-md py-2 px-[15px] text-sm;
    line-height: normal;
}
</style>
