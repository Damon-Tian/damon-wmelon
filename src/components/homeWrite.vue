<template>
      <div class="writing">
            <div class="backs">
                  <img :src="item" alt="" v-for="item in fruits" />
            </div>
            <div id="particles-js"></div>
            <el-card class="box-card  ">
                  <div class="wrtingBlock">
                        <span>你的昵称 ~~~~~</span>
                        <el-input style="width:60%" v-model="name"></el-input>
                  </div>

                  <div
                        class="wrtingBlock"
                        style="display:flex;justify-content:center"
                  >
                        <span>你想写些什么 ~~</span>
                        <el-input
                              type="textarea"
                              style="width:60%;"
                              :rows="15"
                              resize="none"
                              v-model="content"
                        ></el-input>
                  </div>

                  <div class="wrtingBlock">
                        <div
                              style="width:60%;display:inline-block;z-index:10;position:relative"
                        >
                              <el-button
                                    size="small"
                                    type="warning"
                                    @click="confirmPWD = true"
                                    >确认</el-button
                              >
                              <el-button
                                    size="small"
                                    type="info"
                                    plain
                                    @click="cancel"
                                    >取消</el-button
                              >
                        </div>
                  </div>
            </el-card>
            <el-dialog title="提示" v-model="confirmPWD" width="300px">
                  <p>请输入4位密码~~~</p>
                  <el-input v-model="PWD"></el-input>
                  <template #footer>
                        <span class="dialog-footer">
                              <el-button
                                    size="small"
                                    type="info"
                                    plain
                                    @click="confirmPWD = false"
                                    >取 消</el-button
                              >
                              <el-button
                                    size="small"
                                    type="warning"
                                    @click="checkPWD"
                                    >确 定</el-button
                              >
                        </span>
                  </template>
            </el-dialog>
      </div>
</template>
<script>
import { watch, ref } from "vue"
import { ElMessage as Message } from "element-plus"
import { saveHomeBlog } from "/@/api/blog.js"
import particalesJson from "/@/assets/js/particales/particales.json"
import "/@/assets/js/particales/style.css"
export default {
      name: "homeWrite",
      props: ["show"],
      emits: ["changeShow", "refreshData"],
      setup(props, { emit }) {
            console.log(props)
            let name = ref(""),
                  content = ref(""),
                  confirmPWD = ref(false),
                  PWD = ref(""),
                  fruits = ref([])
            for (let i = 0; i < 4; i++) {
                  let index = Math.ceil(Math.random() * 10)
                  fruits.value.push(`/image/img/fruit/${index}.png`)
            }
            const cancel = () => {
                  emit("changeShow")
            }
            const checkPWD = () => {
                  if (PWD.value != "1212") {
                        Message({ message: "密码错误~~", type: "warning" })
                        PWD = ""
                  } else {
                        save()
                        confirmPWD = false
                  }
            }
            let save = async () => {
                  let res = await saveHomeBlog({
                        userName: name.value,
                        content: content.value
                  })
                  if (res.suc) {
                        Message.success("上传成功")
                        cancel()
                        emit("refreshData")
                  }
            }
            return {
                  name,
                  content,
                  cancel,
                  save,
                  checkPWD,
                  confirmPWD,
                  PWD,
                  fruits
            }
      },
      mounted() {
            particlesJS("particles-js", particalesJson)
            setTimeout(() => {
                  // window.scrollTo(0, document.body.scrollHeight)
            }, 1000)
      }
}
</script>

<style lang="less">
.writing {
      margin-bottom: 45px;
      .wrtingBlock {
            padding: 10px;
            text-align: center;
            & > span {
                  display: inline-block;
                  text-align: right;
                  margin-right: 30px;
                  width: 20%;
            }
      }
      .backs {
            position: absolute;
            bottom: 0;
            left: 5%;
            z-index: 2;
            img {
                  width: 50px;
            }
      }
}
#particles-js {
      position: absolute;
      width: 100%;
      height: 90%;
}
</style>
