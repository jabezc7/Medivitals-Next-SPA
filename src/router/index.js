import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes, configurationRoutes } from '@niftee-group/niftee-core/src'

const routes = [
    ...authRoutes,
    {
        path: '/mock-device',
        name: 'mock-device',
        component: () => import('../views/mock-device/MockDevice.vue'),
        meta: { title: 'Mock Device', guard: false }
    },
    {
        path: '/',
        component: () => import('../layouts/Default.vue'),
        redirect: '/dashboard',
        children: [
            {
                path: 'permission-error',
                name: 'permission-error',
                component: () => import('@niftee-group/niftee-core/src/views/PermissionError.vue'),
                meta: { title: 'Permission Error', guard: false }
            },
            {
                path: 'user-settings',
                component: () => import('@niftee-group/niftee-core/src/layout/SubRoot.vue'),
                children: [
                    {
                        name: 'user-settings',
                        path: '',
                        component: () => import('../views/user-settings/UserSettings.vue'),
                        meta: { title: 'User Settings' }
                    }
                ]
            },
            {
                path: 'dashboard',
                component: () => import('@niftee-group/niftee-core/src/layout/SubRoot.vue'),
                children: [
                    {
                        name: 'dashboard',
                        path: '',
                        component: () => import('../views/Dashboard.vue'),
                        meta: { title: 'Dashboard', guard: false }
                    }
                ]
            },
            {
                path: 'configuration',
                component: () => import('@niftee-group/niftee-core/src/layout/SubRoot.vue'),
                children: [
                    {
                        path: '',
                        redirect: '/dashboard'
                    },
                    ...configurationRoutes,
                    {
                        name: 'templates',
                        path: 'template',
                        component: () => import('../views/templates/Templates.vue')
                    },
                    {
                        name: 'edit-template',
                        path: 'templates/:id/edit',
                        component: () => import('../views/templates/Form.vue'),
                        meta: { title: 'Edit Template' },
                        props: (route) => ({
                            id: route.params.id,
                            type: 'Edit'
                        })
                    },
                    {
                        name: 'create-template',
                        path: 'templates/create',
                        component: () => import('../views/templates/Form.vue'),
                        meta: { title: 'New Template' },
                        props: {
                            type: 'New'
                        }
                    },
                ]
            },
            {
                path: 'patients',
                component: () => import('@niftee-group/niftee-core/src/layout/SubRoot.vue'),
                children: [
                    {
                        name: 'patients',
                        path: '',
                        component: () => import('../views/patients/Patients.vue'),
                        meta: { title: 'Patients', guard: false }
                    },
                    {
                        name: 'create-patient',
                        path: 'create',
                        component: () => import('../views/patients/Form.vue'),
                        meta: { title: 'New Patient' },
                        props: {
                            type: 'New'
                        }
                    },
                    {
                        name: 'edit-patient',
                        path: ':id/edit',
                        component: () => import('../views/patients/Form.vue'),
                        meta: { title: 'Edit Patient' },
                        props: (route) => ({
                            type: 'Edit',
                            id: route.params.id
                        })
                    },
                    {
                        name: 'view-patient',
                        path: ':id/view',
                        component: () => import('../views/patients/Patient.vue'),
                        meta: { title: 'View Patient' },
                        props: (route) => ({
                            id: route.params.id
                        })
                    }
                ]
            },
            {
                path: 'devices',
                component: () => import('@niftee-group/niftee-core/src/layout/SubRoot.vue'),
                children: [
                    {
                        name: 'devices',
                        path: '',
                        component: () => import('../views/devices/Devices.vue'),
                        meta: { title: 'Devices', guard: false }
                    },
                    {
                        name: 'create-device',
                        path: 'create',
                        component: () => import('../views/devices/Form.vue'),
                        meta: { title: 'New Device' },
                        props: {
                            type: 'New'
                        }
                    },
                    {
                        name: 'edit-device',
                        path: ':id/edit',
                        component: () => import('../views/devices/Form.vue'),
                        meta: { title: 'Edit Device' },
                        props: (route) => ({
                            type: 'Edit',
                            id: route.params.id
                        })
                    },
                    {
                        name: 'view-device',
                        path: ':id/view',
                        component: () => import('../views/devices/Device.vue'),
                        meta: { title: 'View Device' },
                        props: (route) => ({
                            id: route.params.id
                        })
                    }
                ]
            },
            {
                path: 'automations',
                component: () => import('@niftee-group/niftee-core/src/layout/SubRoot.vue'),
                children: [
                    {
                        name: 'automations',
                        path: '',
                        component: () => import('../views/automations/Automations.vue'),
                        meta: { title: 'Automations', guard: false }
                    },
                    {
                        name: 'create-automation',
                        path: 'create',
                        component: () => import('../views/automations/Form.vue'),
                        meta: { title: 'New Automation' },
                        props: {
                            type: 'New'
                        }
                    },
                    {
                        name: 'edit-automation',
                        path: ':id/edit',
                        component: () => import('../views/automations/Form.vue'),
                        meta: { title: 'Edit Automation' },
                        props: (route) => ({
                            type: 'Edit',
                            id: route.params.id
                        })
                    },
                    {
                        name: 'view-automation',
                        path: ':id/view',
                        component: () => import('../views/automations/Automation.vue'),
                        meta: { title: 'View Automation' },
                        props: (route) => ({
                            id: route.params.id
                        })
                    }
                ]
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    base: import.meta.env.BASE_URL,
    routes
})

export default router
