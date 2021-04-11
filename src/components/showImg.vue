<template>
      <transition name="showImg">
            <div id="showImg" v-if="modelValue" @click="close">
                  <img
                        :src="src"
                        :style="{
                              transform: isSmall ? 'translate(-50%,-50%)' : '',
                              top: isSmall ? '50%' : ''
                        }"
                  />
                  <img
                        src="/image/img/close.png"
                        style="position:fixed;right:5%;left:auto;top:5%;width:20px"
                  />
            </div>
      </transition>
</template>

<script>
import { onUpdated, ref, nextTick } from "vue"
export default {
      props: ["modelValue", "src"],
      setup(props, { emit }) {
            const close = () => {
                  emit("update:modelValue", false)
            }
            let toCenter = {
                  transform: "translate(-50%,-50%)",
                  top: "50%"
            }
            let isSmall = ref(false)
            onUpdated(() => {
                  let img = new Image()
                  img.onload = e => {
                        // debugger
                        let height = e.target.height
                        let isMax = e.target.width > $(window).width() * 0.8
                        let isHeightMax = e.target.height > $(window).height()
                        if (isMax) {
                              height =
                                    e.target.height /
                                    (e.target.width / ($(window).width() * 0.8))
                              if (height < $(window).height()) {
                                    isSmall.value = true
                                    return
                              }
                        } else {
                              if (!isHeightMax) {
                                    isSmall.value = true
                                    return
                              }
                        }
                        isSmall.value = false
                  }
                  img.src = props.src
            })

            return {
                  close,
                  isSmall
            }
      }
}
</script>

<style lang="less" scoped>
.showImg-enter-active,
.showImg-leave-active {
      transition: all 0.4s;
}
.showImg-enter-from,
.showImg-leave-to {
      opacity: 0;
}
#showImg {
      z-index: 999;
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      min-height: 100vh;
      overflow-y: auto;
      // height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      img {
            position: absolute;
            // top: 50%;
            transform: translate(-50%, 0%);
            left: 50%;
            max-width: 80%;
      }
}
</style>
