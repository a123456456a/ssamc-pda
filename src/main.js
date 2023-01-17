import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-notification.css'
import 'element-plus/theme-chalk/el-message.css'
import './assets/css/table.css'
import router from './router/index.js'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(router).use(createPinia()).mount('#app')
