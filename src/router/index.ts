import { useUserStore } from '@/stores/user.store';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: import('@/layouts/InternstartLayout.vue'),
            children: [
                {
                    path: '',
                    name: 'landing',
                    component: import('@/views/Landing/LandingView.vue'),
                },
                {
                    path: 'submission',
                    name: 'submission',
                    component: import('@/views/Submission/SubmissionView.vue'),
                },
                {
                    path: 'report',
                    name: 'report',
                    component: import('@/views/Report/ReportView.vue'),
                },
            ],
        },
        {
            path: '/admin',
            name: 'admin',
            component: import('@/views/Admin/Gate/GateView.vue'),
        },
        {
            path: '/dashboard',
            component: import('@/layouts/DashboardLayout.vue'),
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: import('@/views/Admin/Dashboard/DashboardView.vue'),
                },
            ],
        },
        {
            path: '/:params(.*)',
            name: 'not-found',
            component: import('../views/NotFound.vue'),
        },
    ],
});

router.beforeEach((to, from, next) => {
    const store = useUserStore();

    if (to.path === '/admin' && store.user) {
        return next('/dashboard');
    }
    if (to.path === '/dashboard' && !store.user) {
        return next('/admin');
    }

    next();
});

export default router;
