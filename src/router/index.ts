import { useUserStore } from '@/stores/user.store';
import { createRouter, createWebHistory } from 'vue-router';
import InternstartLayout from '@/layouts/InternstartLayout.vue';
import LandingView from '@/views/Landing/LandingView.vue';
import SubmissionView from '@/views/Submission/SubmissionView.vue';
import ReportView from '@/views/Report/ReportView.vue';
import GateView from '@/views/Admin/Gate/GateView.vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import DashboardView from '@/views/Admin/Dashboard/DashboardView.vue';
import NotFound from '@/views/NotFound.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: InternstartLayout,
            children: [
                {
                    path: '',
                    name: 'landing',
                    component: LandingView,
                },
                {
                    path: 'submission',
                    name: 'submission',
                    component: SubmissionView,
                },
                {
                    path: 'report',
                    name: 'report',
                    component: ReportView,
                },
            ],
        },
        {
            path: '/admin',
            name: 'admin',
            component: GateView,
        },
        {
            path: '/dashboard',
            component: DashboardLayout,
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: DashboardView,
                },
            ],
        },
        {
            path: '/:params(.*)',
            name: 'not-found',
            component: NotFound,
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
