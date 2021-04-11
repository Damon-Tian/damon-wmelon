<template>
      <div>
            <main-header></main-header>
            <router-view v-slot="{ Component }" class="d-content">
                  <transition name="page" mode="out-in">
                        <component :is="Component" />
                  </transition>
            </router-view>
      </div>
</template>

<script>
import mainHeader from "/@/components/mainHeader.vue"
export default {
      components: { mainHeader }
}
</script>
