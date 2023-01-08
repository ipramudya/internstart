<script setup lang="ts">
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { onBeforeMount } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import { useUserStore } from './stores/user.store';

const userState = useUserStore();
const route = useRoute();
const router = useRouter();

onBeforeMount(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            userState.setUser(user);
            if (route.path.includes('admin')) {
                router.push('/dashboard');
                return;
            }
        } else {
            return userState.$reset();
        }
    });
});
</script>

<template>
    <RouterView />
</template>
