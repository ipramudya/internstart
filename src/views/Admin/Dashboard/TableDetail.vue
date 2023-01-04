<script setup lang="ts">
import type { InternshipDocs } from '@/services/admin/internship.types';
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline';
import { CheckBadgeIcon } from '@heroicons/vue/24/solid';
import { computed, ref, watch } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = defineProps<{
    modelValue: any;
    detailDocument: InternshipDocs;
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
const computedGroup = computed(() => {
    const newGroup = Object.values(props.detailDocument.group);
    return newGroup.filter((_: any, idx: number) => idx !== 0);
});
const badgeColor = computed(() => {
    if (!props.detailDocument?.partner?.approval) {
        return 'text-neutral-500';
    } else if (props.detailDocument?.partner?.approval === 'Ditolak') {
        return 'text-rose-500';
    } else {
        return 'text-emerald-500';
    }
});

watch(props, () => {
    if (!props.modelValue) {
        activeNames.value = [];
    }
});
</script>

<template>
    <template v-if="detailDocument">
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
                    <p class="font-medium" :class="badgeColor">
                        {{
                            !detailDocument?.partner.approval
                                ? 'Belum Disetujui'
                                : detailDocument.partner?.approval
                        }}
                    </p>
                </div>
                <div class="flex justify-between">
                    <p class="text-sm text-neutral-600">Nama Ketua Kelompok</p>
                    <p class="font-medium text-neutral-800">{{ detailDocument.lead }}</p>
                </div>
                <div class="flex justify-between">
                    <p class="text-sm text-neutral-600">NPM</p>
                    <p class="font-medium text-neutral-800">{{ detailDocument.npm }}</p>
                </div>
                <div class="flex justify-between border-b border-slate-200 pb-[15px]">
                    <p class="text-sm text-neutral-600">Email</p>
                    <p class="font-medium text-neutral-800">{{ detailDocument.group[0].email }}</p>
                </div>
                <div class="flex justify-between">
                    <p class="text-sm text-neutral-600">Perusahaan Mitra</p>
                    <p class="font-medium text-neutral-800">{{ detailDocument.partner.name }}</p>
                </div>
                <div class="flex justify-between">
                    <p class="text-sm text-neutral-600">Alamat Perusahaan</p>
                    <p class="max-w-[200px] truncate font-medium text-neutral-800">
                        {{ detailDocument.partner.address }}
                    </p>
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
                                <el-dropdown-item>
                                    <a
                                        :href="detailDocument.partner.files.coverLetter.url"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Surat pengantar
                                    </a>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <a
                                        :href="detailDocument.partner.files.responseLetter.url"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Surat Balasan
                                    </a>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <!-- Collapsible -->
                <el-collapse v-model="activeNames">
                    <el-collapse-item
                        v-for="(member, idx) in computedGroup"
                        :key="member.npm"
                        class="collapsed"
                        :title="`Anggota kelompok ${+idx + 1}`"
                        :name="idx"
                    >
                        <div class="flex flex-col space-y-2">
                            <div class="flex justify-between">
                                <p class="text-sm text-neutral-600">Nama</p>
                                <p class="font-medium text-neutral-800">
                                    {{ member.name }}
                                </p>
                            </div>
                            <div class="flex justify-between">
                                <p class="text-sm text-neutral-600">NPM</p>
                                <p class="font-medium text-neutral-800">{{ member.npm }}</p>
                            </div>
                            <div class="flex justify-between">
                                <p class="text-sm text-neutral-600">Email</p>
                                <p class="font-medium text-neutral-800">
                                    {{ member.email }}
                                </p>
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
                        <button
                            class="btn items-start bg-emerald-600 text-white hover:bg-opacity-80"
                        >
                            <CheckBadgeIcon class="mt-1 h-4 w-4" />
                            <span class="h-fit">Approve pengajuan</span>
                        </button>
                    </div>
                </div>
            </div>
        </el-dialog>
    </template>
</template>

<style scoped lang="postcss">
.btn {
    @apply ease-transition flex items-center space-x-2 rounded-md px-3 py-[6px];
}
.collapsed :deep(.el-collapse-item__header) {
    @apply text-sm font-normal text-neutral-600;
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
