<template>
      <div style="transition:all .3s">
            <el-card class="box-card">
                  <div>
                        <span class="userTime">{{ item.gmtCreate }}</span>
                        <span class="userName">{{ item.userName }}</span>
                  </div>
                  <pre>{{ item.content }}</pre>

                  <div class="logo">
                        <img
                              @click="lookForComments($event)"
                              src="/image/img/comment.png"
                              title="评论"
                              alt=""
                        />
                  </div>

                  <transition name="fade">
                        <div class="comments" v-if="commentShow">
                              <p v-if="commentLoading">数据加载中~~~</p>
                              <div v-else>
                                    <comment
                                          @getData="lookForComments"
                                          :blogId="id"
                                          :datas="commentData"
                                          @refresh="getData"
                                    ></comment>
                              </div>
                        </div>
                  </transition>
            </el-card>
      </div>
</template>

<script>
import comment from "./comment.vue"
import { getComment } from "/@/api/blog.js"
export default {
      props: ["item"],
      data() {
            return {
                  data1: "",
                  commentData: "",
                  commentShow: false,
                  commentLoading: true,
                  id: this.item.id
            }
      },
      components: {
            comment
      },
      methods: {
            async lookForComments(e) {
                  let that = this
                  this.commentShow = !this.commentShow
                  if (!this.commentShow) {
                        this.commentLoading = true
                  } else {
                        this.getData()
                  }
            },
            async getData() {
                  let res = await getComment(this.id)
                  this.commentData = res.data
                  this.$nextTick(() => {
                        this.commentLoading = false
                  })
            }
      }
}
</script>

<style lang="less" scoped>
pre {
      white-space: pre-wrap; /* css-3 */
      white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
      white-space: -pre-wrap; /* Opera 4-6 */
      white-space: -o-pre-wrap; /* Opera 7 */
      word-wrap: break-word; /* Internet Explorer 5.5+ */
      word-break: break-all;
      overflow: hidden;
}
.userName {
      font-weight: 700;
      font-size: 18px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}
.userTime {
      float: right;
      font-size: 14px;
}
.logo {
      text-align: right;
      img {
            cursor: pointer;
            width: 23px;
      }
}
.fade-enter,
.fade-leave-to {
      transform: translateY(-20px);
      opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
      transition: all 0.3s;
}
</style>
