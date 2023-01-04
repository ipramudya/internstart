<script setup lang="ts">
import Logo from '@/assets/logo.svg';
import authLogout from '@/services/admin/auth-logout';
import { ElMessage, ElButton } from 'element-plus';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const logoutLoading = ref(false);

const onLogout = async () => {
    logoutLoading.value = true;
    const { error, message } = await authLogout();

    if (error) {
        ElMessage({
            message: 'Gagal melakukan logout...',
            type: 'error',
            showClose: true,
        });
    } else {
        ElMessage({
            message,
            type: 'success',
            showClose: true,
        });
    }
    logoutLoading.value = false;
};
</script>

<template>
    <header class="flex items-center justify-between py-6">
        <RouterLink to="/" class="mr-[100px] flex items-center space-x-3">
            <div class="aspect-square w-[40px]">
                <img :src="Logo" alt="internstart-logo" class="w-full object-cover" />
            </div>
            <h2 class="text-xl font-medium text-neutral-800">Internstart Dashboard</h2>
        </RouterLink>
        <el-button
            plain
            @click="onLogout"
            class="ease-transition rounded-md border !border-rose-500 !text-rose-600 hover:!border-rose-400 hover:!text-rose-400"
        >
            <span class="font-normal">Keluar akun</span>
        </el-button>
    </header>
</template>

<style scoped></style>
