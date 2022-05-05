import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Antd from 'ant-design-vue'

import ElementPlus from 'element-plus'; //需要加入的代码
import "element-plus/dist/index.css";

library.add(faList)
createApp(App).component('font-awesome-icon',FontAwesomeIcon).use(Antd).use(ElementPlus).use(store).use(router).mount('#app')
