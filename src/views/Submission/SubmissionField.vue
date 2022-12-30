<template>
    <div class="space-y-1">
        <label :for="`member-${props.index}-${props.field}`" class="text-sm text-neutral-600">
            <slot></slot>
        </label>
        <el-input
            size="large"
            :id="`member-${props.index}-${props.field}`"
            :placeholder="props.placeholder"
        />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    index: number;
    field: string;
    placeholder: string;
    modelValue: {
        type: String;
        default: '';
    };
}>();
</script>
