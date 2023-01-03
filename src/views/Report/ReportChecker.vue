<script setup lang="ts">
import type { DocumentResult } from '@/services/report/check-report.types';
import checkReport from '@/services/report/check-report';
import { ClipboardDocumentCheckIcon } from '@heroicons/vue/24/outline';
import { ElFormItem, ElInput, ElButton } from 'element-plus';
import { Field, Form, type SubmissionHandler } from 'vee-validate';
import { reactive, ref } from 'vue';
import * as Yup from 'yup';

const schema = Yup.object({
    npm: Yup.string().required('Data NPM masih kosong').length(11, 'NPM tidak valid'),
});

const repportLoading = ref(false);
const foundData = reactive<DocumentResult>({
    empty: null,
    document: null,
});

const onRepportSubmit: SubmissionHandler<{ npm: string }> = ({ npm }, actions) => {
    repportLoading.value = true;
    checkReport(npm).then(({ document, empty }) => {
        foundData.document = document;
        foundData.empty = empty;
    });

    repportLoading.value = false;
    actions.resetForm();
};
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
                class="ease-transition mt-[24px] w-fit rounded-md !border-sky-500 !bg-white !text-sky-500 hover:!bg-sky-50"
                :loading="repportLoading"
                native-type="submit"
            >
                Cek Pengiriman Laporan
            </el-button>
        </Form>
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
