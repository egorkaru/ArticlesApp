import Vue from 'vue'
import Electron from 'vue-electron'

Vue.use(Electron)
Vue.config.debug = true
Vue.config.devtools = true

import App from './App'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/ru-RU'

Vue.use(ElementUI, { locale })

new Vue({
  ...App
}).$mount('#app')
