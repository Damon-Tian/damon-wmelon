import { createApp } from "vue"

import App from "./App.vue"
import router from "./router/router.js"
import store from "./store/index.js"
import ElementPlus from "element-plus"
import "element-plus/lib/theme-chalk/index.css"
// import fetch from "./fetch/index.js"
const app = createApp(App)
// app.config.globalProperties.fetch = fetch
// import mavonEditor from "mavon-editor"
// import "mavon-editor/dist/css/index.css"

app.use(router)
      .use(store)
      .use(ElementPlus)
      // .use(mavonEditor)
      .mount("#app")
