import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
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
                    name: 'Dashboard',
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

export default router;
