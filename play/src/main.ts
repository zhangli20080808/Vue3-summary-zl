import { createApp } from 'vue'
import App from './App.vue'

import Icon from '@zhangli-hua/components/icon'
import '@zhangli-hua/theme-chalk/src/index.scss'

const plugins = [Icon]
const app = createApp(App)
plugins.forEach(plugin => app.use(plugin)) // 将组件注册成了全局组件 ，可以直接使用了

app.mount('#app')
