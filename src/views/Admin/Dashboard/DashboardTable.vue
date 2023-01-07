<script setup lang="ts">
import approveDocs from '@/services/admin/approval';
import cancelApproval from '@/services/admin/cancel-approval';
import getAllInternshipDocs from '@/services/admin/get-all-internship-docs';
import type { InternshipDocs } from '@/services/admin/internship.types';
import { EllipsisHorizontalIcon } from '@heroicons/vue/24/outline';
import { ElMessage } from 'element-plus';
import { onUnmounted, reactive, ref, watch } from 'vue';
import DashboardTableSkeleton from './DashboardTableSkeleton.vue';
import TableDetail from './TableDetail.vue';

const isDetailModalOpen = ref(false);
const displayOnDetail = reactive<{ value: null | InternshipDocs }>({ value: null });
const { internshipDocs, loading, unsubscribe } = getAllInternshipDocs();

onUnmounted(() => unsubscribe());
watch(isDetailModalOpen, () => {
    if (!isDetailModalOpen.value) {
        displayOnDetail.value = null;
    }
});

const displayMessage = (message: string, variant: 'error' | 'success') => {
    ElMessage({
        message,
        type: variant,
        showClose: true,
    });
};

const onCancelApproval = async (npm: string) => {
    const { error, success } = await cancelApproval(npm);
    displayMessage(error || success, !error ? 'success' : 'error');
};
const onRefuseApproval = async (npm: string) => {
    const { error, success } = await approveDocs({ npm, variant: 'refuse' });
    displayMessage(error || success, !error ? 'success' : 'error');
};
</script>

<template>
    <template v-if="loading">
        <DashboardTableSkeleton />
    </template>
    <template v-else>
        <TableDetail
            v-model="isDetailModalOpen"
            :detail-document="displayOnDetail.value as InternshipDocs"
        />
        <section>
            <table class="w-full">
                <thead class="border-b border-slate-200">
                    <tr class="text-left">
                        <th>No.</th>
                        <th>Ketua Kelompok</th>
                        <th>Perusahaan Mitra</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th class="text-center">Opsi</th>
                    </tr>
                </thead>
                <tbody class="text-neutral-600">
                    <tr v-for="({ lead, group, npm, partner }, idx) in internshipDocs" :key="npm">
                        <td>{{ idx + 1 }}</td>
                        <td>
                            <div class="flex flex-col space-y-1">
                                <p>{{ lead }}</p>
                                <p class="text-sm font-normal">{{ npm }}</p>
                            </div>
                        </td>
                        <td>
                            <div class="flex flex-col space-y-1">
                                <p>{{ partner.name }}</p>
                                <p class="max-w-[300px] truncate text-sm font-normal">
                                    {{ partner.address }}
                                </p>
                            </div>
                        </td>
                        <td>
                            <p class="max-w-[200px] truncate">{{ group[0].email }}</p>
                        </td>
                        <td>
                            <div class="flex min-w-[150px] items-center">
                                <div
                                    class="mr-2 h-2 w-2 rounded-full bg-emerald-600"
                                    :class="{
                                        'bg-slate-600': !partner.approval,
                                        'bg-emerald-600': partner?.approval === 'Disetujui',
                                        'bg-rose-600': partner?.approval === 'Ditolak',
                                    }"
                                />
                                <span class="text-sm">{{
                                    !partner?.approval ? 'Belum Disetujui' : partner.approval
                                }}</span>
                            </div>
                        </td>
                        <td>
                            <div class="flex items-center justify-center">
                                <el-dropdown trigger="click">
                                    <button class="ease-transition p-2 hover:text-neutral-800">
                                        <EllipsisHorizontalIcon class="h-5 w-5" />
                                    </button>
                                    <template #dropdown>
                                        <el-dropdown-menu class="ddown">
                                            <el-dropdown-item
                                                @click="
                                                    () => {
                                                        isDetailModalOpen = !isDetailModalOpen;
                                                        displayOnDetail.value = {
                                                            partner,
                                                            group,
                                                            lead,
                                                            npm,
                                                        };
                                                    }
                                                "
                                                >Detail</el-dropdown-item
                                            >
                                            <el-dropdown-item
                                                class="danger"
                                                @click="onRefuseApproval(npm)"
                                                >Tolak Ajuan</el-dropdown-item
                                            >
                                            <el-dropdown-item
                                                class="danger"
                                                @click="onCancelApproval(npm)"
                                                >Batalkan Approval</el-dropdown-item
                                            >
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </template>
</template>

<style scoped lang="postcss">
tbody {
    @apply divide-y divide-slate-200;
}
tbody :deep(tr) {
    @apply ease-transition font-medium text-neutral-600 hover:!bg-slate-50;
}
tr :deep(th) {
    @apply py-3 font-normal text-neutral-800;
}
td {
    @apply py-2;
}
th:first-child,
td:first-child {
    @apply pl-3;
}
th:last-child,
td:last-child {
    @apply pr-3;
}
.ddown :deep(.el-dropdown-menu__item) {
    @apply ease-transition focus:!bg-slate-200 focus:text-neutral-800;
}

.ddown :deep(.danger) {
    @apply focus:!bg-rose-200 focus:text-rose-800;
}
</style>
