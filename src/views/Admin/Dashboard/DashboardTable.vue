<script setup lang="ts">
import { EllipsisVerticalIcon } from '@heroicons/vue/24/outline';
import staticData from './data.constant';
</script>

<template>
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
                <tr v-for="({ email, name, npm, partner }, idx) in staticData" :key="npm">
                    <td>{{ idx + 1 }}</td>
                    <td>
                        <div class="flex flex-col space-y-1">
                            <p>{{ name }}</p>
                            <p class="text-sm">{{ npm }}</p>
                        </div>
                    </td>
                    <td>{{ partner }}</td>
                    <td>{{ email }}</td>
                    <td class="min-w-[100px]">Disetujui</td>
                    <td>
                        <div class="flex items-center justify-center">
                            <el-dropdown trigger="click">
                                <button class="ease-transition p-2 hover:text-neutral-800">
                                    <EllipsisVerticalIcon class="h-5 w-5" />
                                </button>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item>Detail</el-dropdown-item>
                                        <el-dropdown-item>Setujui</el-dropdown-item>
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

<style scoped lang="postcss">
tbody {
    @apply divide-y divide-slate-200;
}
tbody :deep(tr) {
    @apply ease-transition hover:!bg-slate-50;
}
tr :deep(th) {
    @apply py-3 font-medium text-neutral-800;
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
</style>
