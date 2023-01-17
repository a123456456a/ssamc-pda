import { createRouter, createWebHashHistory } from 'vue-router'
import { markRaw } from 'vue'
import mainView from '@/views/mainView.vue'
import { House } from '@element-plus/icons-vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'main',
            component: markRaw(mainView),
            redirect: {path: '/receipt/1'},
            children: [
                {
                    path: '/receipt/:id',
                    name: 'home',
                    title: '行政接收',
                    icon: markRaw(House),
                    component: () => import('@/views/administrationReceipt/index.vue')
                },
                {
                    path: '/inspection/:id',
                    name: 'inspection',
                    title: '进厂检验',
                    icon: markRaw(House),
                    component: () => import('@/views/incomingInspection/index.vue')
                }
            ]
        }
    ]
})
export default router