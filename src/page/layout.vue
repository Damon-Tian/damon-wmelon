<template>
    <div class="damon">
        <router-view v-slot="{ Component }">
            <transition name="page" mode="out-in">
                <component :is="Component" />
            </transition>
        </router-view>
        <div v-if="isLoading" class="loading">
            <i class="el-icon-loading"></i>
        </div>
        <music></music>
    </div>
</template>

<script>
import { onUpdated, ref } from "vue"
import music from "/@/components/music.vue"
import { useStore } from "vuex"
export default {
    components: { music },
    setup(props) {
        let home = ref(true)
        function checkHome() {
            if (location.pathname == "/" || location.pathname == "/home") {
                home.value = true
            } else {
                home.value = false
            }
        }
        const store = useStore()

        setTimeout(() => {
            let theme = localStorage.getItem("theme")
            if (!theme) {
                let isDark = window.matchMedia("(prefers-color-scheme: dark)")
                theme = isDark ? "dark" : "light"
            }
            store.commit("setTheme", theme)
        }, 0)
        // checkHome()
        onUpdated(() => {
            checkHome()
        })
        return {
            home,
        }
    },
    computed: {
        isLoading() {
            return this.$store.state.isLoading
        },
    },
}
</script>
