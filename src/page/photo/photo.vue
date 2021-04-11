<template>
      <div class="d-content">
            <h3 class="top-word">Some Photos</h3>
            <el-card class="box-card">
                  <div class="pubu">
                        <div class="column" ref="first">
                              <img
                                    @click="bigImg(item)"
                                    :data-origin="
                                          '/image/img/photos/' + item + '.png'
                                    "
                                    src="/image/img/loading.gif"
                                    alt=""
                                    v-for="(item, index) in data1"
                                    :key="index"
                              />
                        </div>
                        <div class="column" ref="second">
                              <img
                                    @click="bigImg(item)"
                                    :data-origin="
                                          '/image/img/photos/' + item + '.png'
                                    "
                                    src="/image/img/loading.gif"
                                    alt=""
                                    v-for="(item, index) in data2"
                                    :key="index"
                              />
                        </div>
                        <div class="column" ref="third">
                              <img
                                    @click="bigImg(item)"
                                    :data-origin="
                                          '/image/img/photos/' + item + '.png'
                                    "
                                    src="/image/img/loading.gif"
                                    alt=""
                                    v-for="(item, index) in data3"
                                    :key="index"
                              />
                        </div>
                  </div>
            </el-card>
            <showImg :src="showSrc" v-model="bigImgShow"></showImg>
      </div>
</template>

<script>
import { jieliu } from "/@/util/index.js"
import showImg from "/@/components/showImg.vue"
export default {
      name: "",
      components: {
            showImg
      },
      data() {
            return {
                  bigImgShow: false,
                  showSrc: "/img/1.png",
                  data1: [],
                  data2: [],
                  data3: []
            }
      },
      mounted() {
            let i = 1,
                  length = 16,
                  that = this
            showFall()
            function showFall() {
                  if (i > length) {
                        return
                  }
                  let origin =
                        that.$refs.first.offsetHeight <=
                        that.$refs.second.offsetHeight
                              ? that.$refs.first
                              : that.$refs.second
                  let final =
                        origin.offsetHeight <= that.$refs.third.offsetHeight
                              ? origin
                              : that.$refs.third
                  for (let v in that.$refs) {
                        if (that.$refs[v] == final) {
                              if (v == "first") {
                                    that.data1.push(i)
                              } else if (v == "second") {
                                    that.data2.push(i)
                              } else {
                                    that.data3.push(i)
                              }
                        }
                  }
                  i++
                  that.$nextTick(() => {
                        showFall()
                  })
            }

            //   for(let i=0;i<11;i++){
            //       let x = i%3;
            //       if(x==0){
            //           this.data1.push(i+1);
            //       }else if(x==1){
            //           this.data2.push(i+1)
            //       }else if(x==2){
            //           this.data3.push(i+1)
            //       }
            //   }
            setTimeout(() => {
                  this.lazyLoad()
            }, 100)
            window.addEventListener("scroll", jieliu(200, this.lazyLoad))
      },
      methods: {
            bigImg(item) {
                  this.showSrc = `/image/img/photos/${item}.png`
                  this.bigImgShow = true
            },
            lazyLoad() {
                  let clientHeight = document.documentElement.clientHeight
                  let scrollTop = document.documentElement.scrollTop
                  //   let imgs = document.getElementsByTagName('img');
                  let imgs = $(".column img")
                  for (let i = 0; i < imgs.length; i++) {
                        if (
                              imgs[i].getBoundingClientRect().top <
                              clientHeight + scrollTop
                        ) {
                              let im = imgs[i].getAttribute("data-origin")
                              let setImg = imgs[i].getAttribute("data-setImg")
                              if (im != null && !setImg) {
                                    imgs[i].setAttribute("src", im)
                                    imgs[i].setAttribute("data-setImg", true)
                              }
                        }
                  }
            }
      }
}
</script>

<style scoped lang="less">
img {
      width: 100%;
}
.pubu {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: space-around;
      .column {
            flex-basis: 32%;
            display: flex;
            flex-direction: column;
            cursor: pointer;
            img {
                  padding: 10px;
                  transition: all 0.3s;
                  &:hover {
                        transform: scale(1.2);
                  }
            }
      }
}
@media screen and (max-width: 900px) {
      .pubu {
            flex-wrap: wrap;
            .column {
                  // flex-basis:50%
            }
      }
}
</style>
