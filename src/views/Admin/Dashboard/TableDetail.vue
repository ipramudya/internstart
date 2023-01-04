<script setup lang="ts">
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline';
import { CheckBadgeIcon } from '@heroicons/vue/24/solid';
import { computed, ref } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps<{
    modelValue: any;
}>();
const value = computed({
    get() {
        return props.modelValue;
    },
    set(val) {
        emit('update:modelValue', val);
    },
});

const activeNames = ref([]);
const isDropdownOpen = ref(false);
</script>

<template>
    <el-dialog v-model="value" align-center width="456px" :show-close="false">
        <template #header>
            <div class="flex justify-center">
                <h4 class="font-medium text-neutral-800">Detail Data Kelompok</h4>
            </div>
        </template>
        <div class="flex flex-col space-y-[15px]">
            <!-- Kepala informasi -->
            <div class="flex justify-between">
                <p class="text-sm text-neutral-600">Status</p>
                <p class="badge relative font-medium text-neutral-800">Disetujui</p>
            </div>
            <div class="flex justify-between">
                <p class="text-sm text-neutral-600">Nama Ketua Kelompok</p>
                <p class="font-medium text-neutral-800">Chernobog Ahriman Alexander</p>
            </div>
            <div class="flex justify-between">
                <p class="text-sm text-neutral-600">NPM</p>
                <p class="font-medium text-neutral-800">34868568045</p>
            </div>
            <div class="flex justify-between">
                <p class="text-sm text-neutral-600">Email</p>
                <p class="font-medium text-neutral-800">viva.damore80@hotmail.com</p>
            </div>
            <div class="flex justify-between">
                <p class="text-sm text-neutral-600">Perusahaan Mitra</p>
                <p class="font-medium text-neutral-800">PT. Gena Feofilakt Ermolai</p>
            </div>
            <!-- Berkas ajuan -->
            <div class="flex items-center justify-between">
                <p class="text-sm text-neutral-600">Berkas Ajuan</p>
                <el-dropdown trigger="click">
                    <button class="btn border border-slate-200">
                        <span class="text-sm font-medium text-neutral-800">Lihat berkas</span>
                        <EllipsisVerticalIcon class="h-4 w-4 text-neutral-600" />
                    </button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item @click="() => (isDropdownOpen = !isDropdownOpen)"
                                >Surat pengantar</el-dropdown-item
                            >
                            <el-dropdown-item>Surat balasan</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <!-- Collapsible -->
            <el-collapse v-model="activeNames">
                <el-collapse-item class="collapsed" title="Anggota Kelompok 1" name="1">
                    <div class="flex flex-col space-y-2">
                        <div class="flex justify-between">
                            <p class="text-sm text-neutral-600">Nama</p>
                            <p class="font-medium text-neutral-800">Chernobog Ahriman Alexander</p>
                        </div>
                        <div class="flex justify-between">
                            <p class="text-sm text-neutral-600">NPM</p>
                            <p class="font-medium text-neutral-800">34868568045</p>
                        </div>
                        <div class="flex justify-between">
                            <p class="text-sm text-neutral-600">Email</p>
                            <p class="font-medium text-neutral-800">viva.damore80@hotmail.com</p>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
            <!-- Action button -->
            <div class="flex justify-between pt-6">
                <button
                    @click="$emit('update:modelValue')"
                    class="btn border border-slate-200 hover:bg-slate-50"
                >
                    Tutup
                </button>
                <div class="space-x-2">
                    <button class="btn items-start bg-emerald-600 text-white hover:bg-opacity-80">
                        <CheckBadgeIcon class="mt-1 h-4 w-4" />
                        <span class="h-fit">Approve pengajuan</span>
                    </button>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<style scoped lang="postcss">
.btn {
    @apply ease-transition flex items-center space-x-2 rounded-md px-3 py-[6px];
}
.collapsed :deep(.el-collapse-item__header) {
    @apply text-sm font-normal text-neutral-600;
}
.badge::after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    top: 7px;
    left: -12px;
    @apply bg-emerald-600;
}
</style>

<style lang="postcss">
.el-dialog {
    @apply rounded-lg;
}
.el-dialog__header {
    @apply m-0;
}
</style>
