<template>
    <div class="space-y-1">
        <label class="text-sm text-neutral-600">{{ label }}</label>
        <el-input
            :class="$props.class"
            size="large"
            v-model="value"
            :placeholder="placeholder"
            :type="inputType"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);
const props = withDefaults(
    defineProps<{
        modelValue: any;
        label: string;
        placeholder: string;
        inputType?: 'text' | 'textarea' | 'number';
    }>(),
    { inputType: 'text' }
);

const value = computed({
    get() {
        return props.modelValue;
    },
    set(value) {
        emit('update:modelValue', value);
    },
});
</script>

<style scoped lang="postcss">
.el-textarea :deep(textarea) {
    @apply !min-h-[120px] !px-[15px] pt-3;
}
</style>
