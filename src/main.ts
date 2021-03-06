import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import routes from './route'

// style reset
import 'modern-css-reset'
import '@/theme/main.less'

const app = createApp(App)
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
app.use(router)
app.mount('#app')
