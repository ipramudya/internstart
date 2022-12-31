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
                    <FileUpload
                        :file-ref="internFiles.coverLetter"
                        label="Unggah surat pengantar"
                        @file-change="onUploadFile"
                        id="coverLetter"
                    />
                    <FileUpload
                        :file-ref="internFiles.responseLetter"
                        label="Unggah surat balasan"
                        @file-change="onUploadFile"
                        id="responseLetter"
                    />
                </div>
            </div>
            <!-- submit button -->
            <el-button
                plain
                :icon="CloudArrowUpIcon"
                class="ease-transition w-fit rounded-md !bg-sky-500 !text-white hover:!bg-sky-400"
                @click="onSubmitSubmission"
                :loading="uploadLoading"
            >
                Ajukan Laporan
            </el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    uploadBytes,
    ref as firebaseStorageRef,
    getDownloadURL,
    type UploadResult,
} from 'firebase/storage';
import { storage, db } from '@/lib/firebase';
import { PlusCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline';
import { CloudArrowUpIcon } from '@heroicons/vue/24/solid';
import { ElButton, ElDivider } from 'element-plus';
import { addDoc, collection } from 'firebase/firestore';
import { reactive, ref } from 'vue';
import type { InternFiles, UploadHandlerParam, UploadStorageRefs } from './field.types';
import FileUpload from './FileUpload.vue';
import FormField from './FormField.vue';

const uploadLoading = ref(false);
const memberFields = reactive([{ name: '', npm: '', grade: '', email: '' }]);
const companyFields = reactive({ name: '', address: '' });
const internFiles = reactive<InternFiles>({
    coverLetter: { file: null, fileName: '' },
    responseLetter: { file: null, fileName: '' },
});

const onIncrementTotalMember = () => {
    memberFields.push({ name: '', npm: '', grade: '', email: '' });
};
const onFindAndDeleteMember = (idx: number) => {
    memberFields.splice(idx, 1);
};
const onUploadFile = (event: UploadHandlerParam) => {
    internFiles[event.slug].file = new Blob([event.file[0]], { type: event.file[0].type });
    internFiles[event.slug].fileName = event.file[0].name.replace(/\s+/g, '_');
};
const onSubmitSubmission = async () => {
    try {
        // declare vars
        uploadLoading.value = true;
        let uploadStorageRef: UploadStorageRefs = {
            coverLetterStorageRef: null as any,
            responseLetterStorageRef: null as any,
        };

        // creating storage ref
        (Object.keys(internFiles) as (keyof InternFiles)[]).forEach((internFile) => {
            uploadStorageRef[`${internFile}StorageRef`] = firebaseStorageRef(
                storage,
                `${memberFields[0].npm ?? 'temp'}/${internFiles[internFile].fileName}`
            );
        });

        // creating upload bytes promises to solve
        let beforeUploadPromises: any[] = [];
        (Object.keys(internFiles) as (keyof InternFiles)[]).forEach((upload) => {
            beforeUploadPromises.push(
                uploadBytes(
                    uploadStorageRef[`${upload}StorageRef`] as NonNullable<
                        UploadStorageRefs[`${typeof upload}StorageRef`]
                    >,
                    internFiles[upload].file as Blob
                )
            );
        });
        const uploadResult = await Promise.all<UploadResult>(beforeUploadPromises);

        // get download url promises
        let beforeGetDownloadURL: any[] = [];
        uploadResult.forEach((result) => {
            beforeGetDownloadURL.push(getDownloadURL(result.ref));
        });
        const downloadURL = await Promise.all<string>(beforeGetDownloadURL);

        // store to firestore
        await addDoc(collection(db, 'students'), {
            lead: memberFields[0].name,
            npm: memberFields[0].npm,
            group: { ...memberFields },
            partner: {
                ...companyFields,
                files: {
                    coverLetter: {
                        fileName: internFiles.coverLetter.fileName,
                        url: downloadURL[0],
                    },
                    responseLetter: {
                        fileName: internFiles.responseLetter.fileName,
                        url: downloadURL[1],
                    },
                },
            },
        });
    } catch (error: unknown) {
        console.log(error);
    } finally {
        uploadLoading.value = false;
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
