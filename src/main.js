import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 引入 Element Plus 组件库
import ElementPlus from 'element-plus'
// 引入 Element Plus 全套样式
import 'element-plus/dist/index.css'

// 把组件库挂到项目上，之后所有页面都能直接用 el-xxx 组件
createApp(App).use(ElementPlus).mount('#app')
