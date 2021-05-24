<template>
    <div style="padding-top: 80px">
        <h3 class="top-word">Some Articles</h3>
        <div
            v-for="(item, index) in articles"
            class="card"
            @click="link(item)"
            :key="index"
        >
            <el-image
                class="imgBlock"
                fit="cover"
                :src="
                    item.remarkExtend || imgPath[Math.floor(Math.random() * 4)]
                "
                lazy
            ></el-image>
            <div class="content">
                <p class="title">{{ item.title }}</p>
                <div class="remark">
                    <p>{{ getArticleTime(item.gmtCreate) }}</p>
                    <div v-html="item.content.slice(0, 200)"></div>
                </div>
            </div>
            <div class="delete" v-if="$store.state.isDamon">
                <i
                    class="el-icon-edit-outline"
                    @click.stop="editArticle(item)"
                ></i>
                <i
                    class="el-icon-delete-solid"
                    @click.stop="deleteArticle(item)"
                ></i>
            </div>
        </div>
        <el-dialog title="提示" v-model="confirmPWD" width="300px">
            <p>请输入密码~~~</p>
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
                        @click="confirmDelete"
                        >确 定</el-button
                    >
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { ref, watch, reactive } from "vue"
import { getArticleTime as getTime } from "/@/util"
import { getArticles } from "/@/api/blog.js"
import imgPath1 from "/image/img/article/1.jpg"
import imgPath2 from "/image/img/article/2.jpg"
import imgPath3 from "/image/img/article/3.jpg"
import imgPath4 from "/image/img/article/4.jpg"
import { useRouter } from "vue-router"
import fetch from "/@/fetch/index.js"
export default {
    setup(props) {
        let articles = ref([])
        let deleteItem = ref(null)
        let PWD = ref(null)
        let confirmPWD = ref(false)
        const router = useRouter()
        const imgPath = ref([imgPath1, imgPath2, imgPath3, imgPath4])
        let isLoading = ref(true)
        let getArticleTime = getTime
        async function getData() {
            let res = await getArticles(1, 1)
            if (res.data != "") {
                articles.value = res.data
            }
            isLoading.value = false
        }
        function link(item) {
            router.push("/article/" + item.id)
        }
        getData()

        return {
            isLoading,
            articles,
            getData,
            imgPath,
            getArticleTime,
            link,
            deleteItem,
            PWD,
            confirmPWD,
        }
    },
    methods: {
        editArticle(item) {
            this.$router.push({ name: "write", params: item })
        },
        deleteArticle(item) {
            this.confirmPWD = true
            this.deleteItem = item
        },
        async confirmDelete() {
            if (this.PWD != "qqtianjiang520") {
                this.$message.error("密码错误")
                return
            }
            let res = await fetch.post("/article/delete/" + this.deleteItem.id)
            if (res) {
                this.$message.success("删除成功")
                this.PWD = ""
                this.confirmPWD = false
                this.getData()
            }
        },
    },
    watch: {},
}
</script>
<style lang="less" scoped>
.card {
    position: relative;
    margin: 0 auto 30px;
    display: flex;
    box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.12);
    padding: 20px;
    border-radius: 3px;
    height: 270px;
    transition: all 0.6s;
    max-width: 80%;
    &:nth-child(even) {
        flex-direction: row-reverse;
    }
    &:hover {
        box-shadow: 0 2px 50px rgba(0, 0, 0, 0.52);
        cursor: pointer;
        img {
            transform: scale(1.1);
            transition: all 0.6s;
        }
        .content {
            .title {
                color: red;
                transition: all 0.6s;
            }
            .remark {
                border: none;
                &::before {
                    content: "";
                    position: absolute;
                    left: -20%;
                    width: 200%;
                    top: 0;
                    border-bottom: 1px dashed rgba(255, 0, 0, 0.425);
                    animation: borderAni 3s infinite linear;
                }
            }
        }
        .delete {
            opacity: 1;
        }
    }
    .delete {
        i {
            display: block;
            margin-bottom: 15px;
        }
        opacity: 0;
        position: absolute;
        right: -40px;
        top: 20px;
        transition: opacity 0.3s;
        font-size: 22px;
        color: red;
    }
    .imgBlock {
        width: 100%;
        height: 100%;
        z-index: 1;
        border-radius: 5px;
    }
    .content {
        padding: 0 3%;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .title {
            font-weight: 700;
            font-size: 1.4em;
            background: linear-gradient(to bottom, red, rgba(255, 0, 0, 0.225));
            -webkit-background-clip: text;
            color: transparent;
            -webkit-text-fill-color: transparent;
        }
        .abstract {
            padding: 10px 0;
        }
        .remark {
            padding-top: 3%;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 6;
            overflow: hidden;
            word-break: break-all;
            border-top: 1px dashed gainsboro;
            position: relative;
        }
    }
}
@media screen and (max-width: 500px) {
    .card {
        height: 185px;
        .title {
            margin-top: 0;
        }
        .content {
            .remark {
                padding-top: 0;
                & > p {
                    margin-bottom: 1em;
                }
            }
        }
        p {
            margin-bottom: 0;
            // margin-top: 0;
            padding-top: 0;
        }
    }
}
@keyframes borderAni {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(10%);
    }
}
</style>
