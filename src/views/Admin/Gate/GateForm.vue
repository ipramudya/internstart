<script setup lang="ts">
import { Form, Field, type SubmissionHandler } from 'vee-validate';
import { ref } from 'vue';
import * as Yup from 'yup';

const schema = Yup.object({
    email: Yup.string().required('Email tidak boleh kosong').email('Email tidak valid'),
    password: Yup.string()
        .required('Kata sandi tidak boleh kosong')
        .length(6, 'Kata sandi tidak boleh kurang dari 6 karakter'),
});

const authLoading = ref(false);

const onLoginSubmit: SubmissionHandler<{ email: string; password: string }> = (
    { email, password },
    actions
) => {
    console.log('email', email);
};
</script>

<template>
    <div
        class="parent-shadow mt-[20%] flex min-w-[458px] flex-col space-y-6 rounded-lg border border-sky-100 bg-white px-8 py-16"
    >
        <div class="flex flex-col text-center">
            <h2 class="mb-2 text-xl font-medium text-neutral-800">Masuk Sebagai Admin.</h2>
            <p class="text-sm text-neutral-600">Silahkan masuk ke akun anda</p>
        </div>
        <Form
            as="el-form"
            :validation-schema="schema"
            label-position="top"
            class="flex flex-col items-center"
            @submit="onLoginSubmit as any"
        >
            <Field name="email" v-slot="{ value, errorMessage, handleChange }">
                <el-form-item
                    :error="errorMessage"
                    label="Email"
                    required
                    class="min-w-[330px]"
                    :class="{ 'ease-transition mb-6': !!errorMessage }"
                >
                    <el-input
                        placeholder="masukan email admin..."
                        size="large"
                        :model-value="value"
                        @update:model-value="handleChange"
                    />
                </el-form-item>
            </Field>
            <Field name="password" v-slot="{ value, errorMessage, handleChange }">
                <el-form-item
                    :error="errorMessage"
                    label="Kata sandi"
                    required
                    class="min-w-[330px]"
                    :class="{ 'ease-transition mb-6': !!errorMessage }"
                >
                    <el-input
                        placeholder="masukan kata sandi..."
                        size="large"
                        :model-value="value"
                        type="password"
                        show-password
                        @update:model-value="handleChange"
                    />
                </el-form-item>
            </Field>
            <el-button
                plain
                :loading="authLoading"
                native-type="submit"
                class="ease-transition mt-4 !min-h-[38px] w-[330px] !border-none !bg-sky-500 !text-white hover:!bg-opacity-80"
            >
                <span class="font-medium">Masuk</span>
            </el-button>
        </Form>
    </div>
</template>

<style scoped>
.parent-shadow {
    box-shadow: rgba(3, 105, 161, 0.2) 0px 7px 29px 0px;
}
</style>
