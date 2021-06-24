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

import VMdEditor from "@kangc/v-md-editor"
import "@kangc/v-md-editor/lib/style/base-editor.css"
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js"
import "@kangc/v-md-editor/lib/theme/style/github.css"

import VMdPreviewHtml from "@kangc/v-md-editor/lib/preview-html"
import "@kangc/v-md-editor/lib/style/preview-html.css"

// 引入使用主题的样式
// import '@kangc/v-md-editor/lib/theme/style/vuepress';

VMdEditor.xss.extend({
    // extend white list
    whiteList: {
        source: [],
        iframe: [
            "src",
            "width",
            "height",
            "border",
            "frameborder",
            "scrolling",
            "framespacing",
            "allowfullscreen",
        ],
    },
})
VMdEditor.use(githubTheme)

app.use(router)
    .use(store)
    .use(ElementPlus)
    .use(VMdEditor)
    .use(VMdPreviewHtml)
    // .use(mavonEditor)
    .mount("#app")
