import { createApp } from "vue";
import { router } from './providers'
import { createPinia } from 'pinia'
import App from './App.vue'
import { mask } from 'vue-the-mask'

export const app = createApp(App).use(router).use(createPinia()).directive('maska', mask)
console.log(app , 'APPP_+')
