<template>
      <div>
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
export default {
      components: { music },
      setup(props) {
            let home = ref(true)
            function checkHome() {
                  if (
                        location.pathname == "/" ||
                        location.pathname == "/home"
                  ) {
                        home.value = true
                  } else {
                        home.value = false
                  }
            }
            // checkHome()
            onUpdated(() => {
                  checkHome()
            })
            return {
                  home
            }
      },
      computed: {
            isLoading() {
                  return this.$store.state.isLoading
            }
      }
}
</script>
