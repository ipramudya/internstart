<template>
    <div class="flex w-full animate-pulse flex-col divide-y divide-slate-200">
        <div class="p-3">
            <div class="h-6 w-full rounded-md bg-slate-200" />
        </div>
        <div
            class="p-3"
            v-for="n in 10"
            :key="`table-skeleton-${n}`"
            :class="{ '!border-b !border-b-slate-200': n === 10 }"
        >
            <div class="h-12 w-full rounded-md bg-slate-200" />
        </div>
    </div>
</template>
