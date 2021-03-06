import vue from "@vitejs/plugin-vue"
const path = require("path")
/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
      base: "/",
      resolve: {
            alias: [{ find: "/@", replacement: path.resolve(__dirname, "src") }]
      },
      plugins: [vue()]
}
