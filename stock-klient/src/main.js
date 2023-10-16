import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { Bar } from 'vue-chartjs'

const app = createApp(App)

app.use(router)

app.mount('#app')
