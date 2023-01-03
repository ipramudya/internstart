<script setup lang="ts">
import BlobLeft from '@/assets/blobs/blob1.svg';
import BlobTop from '@/assets/blobs/blob2.svg';
import BlobTopRight from '@/assets/blobs/blob3.svg';
import BlobBottomRight from '@/assets/blobs/blob4.svg';
import BlobSmall from '@/assets/blobs/blob5.svg';
</script>

<template>
    <div class="absolute top-[16%] left-[-17%] aspect-square w-[300px]">
        <img :src="BlobLeft" class="w-full object-cover" />
    </div>
    <div class="absolute left-1/2 top-[-10%] aspect-square w-[250px] -translate-x-1/2">
        <img :src="BlobTop" class="w-full object-cover" />
    </div>
    <div class="absolute top-[10%] right-[5%] aspect-square w-[100px]">
        <img :src="BlobTopRight" class="w-full object-cover" />
    </div>
    <div class="absolute bottom-[-12%] right-0 aspect-square w-[200px]">
        <img :src="BlobBottomRight" class="w-full object-cover" />
    </div>
    <div class="absolute bottom-[-30%] left-[-20%] aspect-square w-[500px] rotate-[75deg]">
        <img :src="BlobLeft" class="w-full object-cover" />
    </div>
    <div class="absolute bottom-[16%] right-[25%] aspect-square w-[100px]">
        <img :src="BlobSmall" class="w-full object-cover" />
    </div>
</template>
