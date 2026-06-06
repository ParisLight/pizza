import { createApp } from "vue"
import { router } from "./providers"
import { createPinia } from "pinia"
import App from "./App.vue"
import { vMaska } from "maska/vue"

export const app = createApp(App).use(router).use(createPinia()).directive("maska", vMaska)
