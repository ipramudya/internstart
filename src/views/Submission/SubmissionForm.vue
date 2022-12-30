<template>
    <div class="flex w-full justify-center">
        <div class="flex min-w-[546px] flex-col space-y-6">
            <div v-for="(_, idx) in memberFields" :key="`member-${idx}`" class="flex flex-col">
                <!-- label -->
                <div class="mb-4 flex items-center justify-between">
                    <div class="flex">
                        <span class="mr-3 font-bold text-sky-600">0{{ idx + 1 }}</span>
                        <p class="font-medium text-neutral-800">
                            {{ idx === 0 ? 'Data Ketua Kelompok' : `Data Anggota ${idx}` }}
                        </p>
                    </div>
                    <button
                        v-if="idx !== 0"
                        class="text-rose-600"
                        @click="() => onFindAndDeleteMember(idx)"
                    >
                        <XCircleIcon class="h-6 w-6" />
                    </button>
                </div>
                <!-- fields -->
                <div class="flex flex-col space-y-2">
                    <!-- name -->
                    <div class="space-y-1">
                        <label :for="`member-${idx}-name`" class="text-sm text-neutral-600"
                            >Nama</label
                        >
                        <el-input
                            size="large"
                            :id="`member-${idx}-nama`"
                            v-model="memberFields[idx].name"
                            placeholder="Masukan nama..."
                        />
                    </div>
                    <!-- npm -->
                    <div class="space-y-1">
                        <label :for="`member-${idx}-npm`" class="text-sm text-neutral-600"
                            >NPM</label
                        >
                        <el-input
                            size="large"
                            :id="`member-${idx}-npm`"
                            v-model="memberFields[idx].npm"
                            placeholder="Masukan npm..."
                        />
                    </div>
                    <!-- angkatan -->
                    <div class="space-y-1">
                        <label :for="`member-${idx}-grade`" class="text-sm text-neutral-600"
                            >Angkatan</label
                        >
                        <el-input
                            size="large"
                            :id="`member-${idx}-grade`"
                            v-model="memberFields[idx].grade"
                            placeholder="Masukan tahun angkatan..."
                        />
                    </div>
                    <!-- email -->
                    <div class="space-y-1">
                        <label :for="`member-${idx}-grade`" class="text-sm text-neutral-600"
                            >Email</label
                        >
                        <el-input
                            type="email"
                            size="large"
                            :id="`member-${idx}-email`"
                            v-model="memberFields[idx].email"
                            placeholder="Masukan email yang valid..."
                        />
                    </div>
                </div>
            </div>
            <!-- action button -->
            <div class="w-full">
                <el-divider>
                    <button
                        class="ease-transition flex items-center space-x-2 font-normal text-sky-500 hover:text-sky-400"
                        @click="onIncrementTotalMember"
                    >
                        <PlusCircleIcon class="h-5 w-5" />
                        <span>Tambah anggota kelompok</span>
                    </button>
                </el-divider>
            </div>
            <!-- company -->
            <div class="flex flex-col">
                <div class="mb-4 flex items-center justify-between">
                    <div class="flex">
                        <span class="mr-3 font-bold text-sky-600"
                            >0{{ memberFields.length + 1 }}</span
                        >
                        <p class="font-medium text-neutral-800">
                            Data Perusahaan dan Upload Berkas
                        </p>
                    </div>
                </div>
                <div class="flex flex-col space-y-2">
                    <!-- company name -->
                    <div class="space-y-1">
                        <label for="company-name" class="text-sm text-neutral-600"
                            >Nama Perusahaan</label
                        >
                        <el-input
                            size="large"
                            id="company-nama"
                            v-model="companyFields.name"
                            placeholder="Masukan nama perusahaan..."
                        />
                    </div>
                    <!-- address name -->
                    <div class="space-y-1">
                        <label for="company-name" class="text-sm text-neutral-600"
                            >Alamat Perusahaan</label
                        >
                        <el-input
                            type="textarea"
                            size="large"
                            id="company-nama"
                            v-model="companyFields.name"
                            placeholder="Masukan alamat perusahaan..."
                            class="min-h-[120px]"
                        />
                    </div>
                </div>
            </div>
            <el-button
                plain
                :icon="CloudArrowUpIcon"
                class="ease-transition w-fit rounded-md !bg-sky-500 !text-white hover:!bg-sky-400"
            >
                Ajukan Laporan
            </el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PlusCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline';
import { CloudArrowUpIcon } from '@heroicons/vue/24/solid';

import { reactive } from 'vue';
export type Fields = {
    name: string;
    npm: string;
    grade: string;
    email: string;
};
const memberFields = reactive([{ name: '', npm: '', grade: '', email: '' }]);
const companyFields = reactive({ name: '', address: '', coverLetter: '', responseLetter: '' });

const onIncrementTotalMember = () => {
    memberFields.push({ name: '', npm: '', grade: '', email: '' });
};
const onFindAndDeleteMember = (idx: number) => {
    memberFields.splice(idx, 1);
};
</script>

<style scoped lang="postcss">
.el-input :deep(div) {
    @apply rounded-md;
}
.el-button :deep(.el-icon) {
    @apply text-[20px];
}
.el-textarea :deep(textarea) {
    @apply !min-h-[120px];
}
</style>
