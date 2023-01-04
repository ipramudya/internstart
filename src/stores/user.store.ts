import type { User } from 'firebase/auth';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            user: null as null | User,
        };
    },
    actions: {
        setUser(user: User) {
            this.user = user;
        },
    },
});
