<template>
    <div class="flex flex-col space-y-1">
        <p class="text-sm text-neutral-600">{{ label }}</p>
        <div
            class="flex items-center justify-between space-x-3 overflow-hidden rounded border border-[#e5e7eb] pl-[15px]"
        >
            <p class="text-sm text-stone-400" :class="{ 'text-[#606266]': placeholder }">
                {{ placeholder ?? 'Pilih berkas...' }}
            </p>
            <div class="relative">
                <label
                    :for="id"
                    class="ease-transition flex w-fit cursor-pointer items-center justify-center bg-neutral-100 py-2 px-3 text-sm font-medium text-neutral-600 hover:bg-neutral-200"
                    >Browse</label
                >
                <input
                    type="file"
                    :id="id"
                    :ref="fileRef"
                    class="absolute inset-0 h-0 w-0"
                    @change="(e) => {
                        $emit('fileChange', {file: (e.target as any).files, slug: id}, )
                        placeholder = (e.target as any).files[0].name
                    }"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
defineProps(['fileRef', 'placeholder', 'label', 'id']);
defineEmits(['fileChange']);

const placeholder = ref(null);
</script>
