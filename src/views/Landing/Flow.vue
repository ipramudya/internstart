<template>
    <article class="grid grid-cols-2">
        <div class="col-span-1 flex flex-col space-y-6">
            <div class="flex flex-col space-y-3">
                <h3 class="text-[36px] font-bold text-neutral-800">Tata cara pengajuan</h3>
                <p class="text-neutral-600">
                    Simak langkah-langkah berikut untuk mengetahui cara bagaimana<br />
                    melakukan pengajuan berkas magang
                </p>
            </div>
            <div class="flex space-x-6">
                <span class="font-bold text-sky-600">01.</span>
                <div class="flex flex-col space-y-3">
                    <p class="font-medium text-neutral-800">
                        Siapkan semua berkas-berkas yang diperlukan
                    </p>
                    <p class="text-neutral-600">
                        Berkas yang diperlukan yaitu meliputi surat pengajuan dan surat peneriman
                        dari perusahaan tempat berlangsungnya magang atau praktik kerja.
                    </p>
                </div>
            </div>
            <div class="flex space-x-6">
                <span class="font-bold text-sky-600">02.</span>
                <div class="flex flex-col space-y-3">
                    <p class="font-medium text-neutral-800">Buka halaman pengajuan</p>
                    <p class="text-neutral-600">
                        Silahkan buka halaman pengajuan pada navigation bar pada bagian atas halaman
                    </p>
                </div>
            </div>
            <div class="flex space-x-6">
                <span class="font-bold text-sky-600">03.</span>
                <div class="flex flex-col space-y-3">
                    <p class="font-medium text-neutral-800">
                        Isi seluruh kolom pada form dengan benar
                    </p>
                    <p class="text-neutral-600">
                        Saat melakukan pengisian pastikan data diri dan berkas yang diisikan pada
                        formulir sudah lengkap dan benar. Apabila sudah terisi semua silahkan tekan
                        tombol submit.
                    </p>
                </div>
            </div>
        </div>
        <div class="flex items-center justify-end">
            <div class="w-[456px]">
                <img :src="GuideFlowImage" alt="guide-flow-pic" class="w-full object-cover" />
            </div>
        </div>
    </article>
</template>

<script setup lang="ts">
import GuideFlowImage from '@/assets/landing-vector.svg';
</script>

<style scoped></style>
