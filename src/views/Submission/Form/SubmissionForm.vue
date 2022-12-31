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
                    <FormField
                        v-model="memberFields[idx].name"
                        placeholder="Masukan nama..."
                        label="Nama"
                    />
                    <FormField
                        v-model="memberFields[idx].npm"
                        placeholder="Masukan nomor pokok mahasiswa..."
                        label="NPM"
                    />
                    <FormField
                        v-model="memberFields[idx].grade"
                        placeholder="Masukan tahun angkatan..."
                        label="Angkatan"
                    />
                    <FormField
                        v-model="memberFields[idx].email"
                        placeholder="Masukan email yang valid..."
                        label="Email"
                    />
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
                    <FormField
                        v-model="companyFields.name"
                        placeholder="Masukan nama perusahaan..."
                        label="Nama Perusahaan"
                    />
                    <FormField
                        v-model="companyFields.address"
                        placeholder="Masukan alamat perusahaan..."
                        label="Alamat Perusahaan"
                        input-type="textarea"
                    />
                </div>
            </div>
            <!-- submit button -->
            <el-button
                plain
                :icon="CloudArrowUpIcon"
                class="ease-transition w-fit rounded-md !bg-sky-500 !text-white hover:!bg-sky-400"
                @click="onSubmitSubmission"
            >
                Ajukan Laporan
            </el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { db } from '@/lib/firebase';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline';
import { CloudArrowUpIcon } from '@heroicons/vue/24/solid';
import { addDoc, collection } from 'firebase/firestore';
import { reactive } from 'vue';
import FormField from './FormField.vue';

const memberFields = reactive([{ name: '', npm: '', grade: '', email: '' }]);
const companyFields = reactive({ name: '', address: '', coverLetter: '', responseLetter: '' });

const onIncrementTotalMember = () => {
    memberFields.push({ name: '', npm: '', grade: '', email: '' });
};
const onFindAndDeleteMember = (idx: number) => {
    memberFields.splice(idx, 1);
};
const onSubmitSubmission = async () => {
    try {
        const docRef = await addDoc(collection(db, 'students'), {
            internship_group: { ...memberFields },
            company_partner: { ...companyFields },
        });
        console.log(docRef);
    } catch (error: unknown) {
        console.log(error);
    }
};
</script>

<style scoped lang="postcss">
.el-input :deep(div) {
    @apply rounded-md;
}
.el-button :deep(.el-icon) {
    @apply text-[20px];
}
</style>
