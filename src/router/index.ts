import { createRouter, createWebHistory } from 'vue-router';
import SubmissionView from '@/views/Submission/SubmissionView.vue';
import LandingPage from '@/views/Landing/LandingView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: import('../layouts/InternstartLayout.vue'),
            children: [
                {
                    path: '',
                    name: 'landing',
                    component: LandingPage,
                },
                {
                    path: 'submission',
                    name: 'submission',
                    component: SubmissionView,
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
