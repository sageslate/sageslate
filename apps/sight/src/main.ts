// eslint-disable-next-line import/order
import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import { apollo } from './plugins/apollo'
import { i18n } from './plugins/i18n'
import { pinia } from './plugins/pinia'
import { router } from './plugins/router'

const app = createApp(App)

app.use(apollo)
app.use(i18n)
app.use(pinia)
app.use(router)

app.mount('#app')
