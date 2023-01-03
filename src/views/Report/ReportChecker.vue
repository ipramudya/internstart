<script setup lang="ts">
import checkReport from '@/services/report/check-report';
import type { DocumentResult, Document } from '@/services/report/check-report.types';
import { ClipboardDocumentCheckIcon } from '@heroicons/vue/24/outline';
import { ElButton, ElFormItem, ElInput } from 'element-plus';
import { Field, Form, type SubmissionHandler } from 'vee-validate';
import { reactive, ref, watch } from 'vue';
import * as Yup from 'yup';
import ReportResult from './ReportResult.vue';

const schema = Yup.object({
    npm: Yup.string().required('Data NPM masih kosong').length(11, 'NPM tidak valid'),
});

const repportLoading = ref(false);
const reportData = reactive<DocumentResult>({
    empty: null,
    document: null,
});

const onRepportSubmit: SubmissionHandler<{ npm: string }> = ({ npm }, actions) => {
    repportLoading.value = true;
    checkReport(npm).then(({ document, empty }) => {
        reportData.document = document;
        reportData.empty = empty;
    });

    repportLoading.value = false;
    actions.resetForm();
};

watch(reportData, () => console.log('data', reportData));
</script>

<template>
    <section class="flex flex-col items-center">
        <Form
            :validation-schema="schema"
            @submit="onRepportSubmit as any"
            as="el-form"
            label-position="top"
            class="flex flex-col items-center"
        >
            <Field name="npm" v-slot="{ value, errorMessage, handleChange }">
                <el-form-item
                    :error="errorMessage"
                    label="Nomor Pokok Mahasiswa (NPM)"
                    required
                    class="min-w-[400px]"
                >
                    <el-input
                        placeholder="Masukan NPM"
                        size="large"
                        :model-value="value"
                        @update:model-value="handleChange"
                        type="number"
                    />
                </el-form-item>
            </Field>
            <el-button
                plain
                :icon="ClipboardDocumentCheckIcon"
                class="ease-transition mt-4 w-fit rounded-md !border-sky-500 !bg-white !text-sky-500 hover:!bg-sky-50"
                :loading="repportLoading"
                native-type="submit"
            >
                Cek Pengiriman Laporan
            </el-button>
        </Form>
        <Transition
            class="ease-transition"
            enter-from-class="-translate-y-2 opacity-0"
            leave-to-class="-translate-y-2 opacity-0"
        >
            <ReportResult
                v-if="!reportData.empty && reportData.document"
                :repport-data="(reportData.document as Document)"
            />
        </Transition>
    </section>
</template>

<style>
.el-form-item__error {
    margin-top: 4px;
}
</style>

<style scoped>
.el-button :deep(.el-icon) {
    font-size: 1.25rem;
}
</style>
