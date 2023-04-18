
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './axios'

import store from './vuex'


//import './vuex'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')


