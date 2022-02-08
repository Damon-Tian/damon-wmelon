<template>
    <div class="damon-article">
        <div class="previewIMG">
            <img
                v-if="article.remarkExtend || imgSrc"
                :src="article.remarkExtend || imgSrc"
                alt=""
            />
        </div>
        <div class="content article">
            <h2>{{ article.title }}</h2>
            <p class="time">
                <span>{{ getArticleTime(article.gmtCreate) }}</span>
                <span class="comment" @click="goComment">{{
                    commentLength
                }}</span>
                <span class="like">
                    <svg
                        t="1596810446730"
                        class="icon"
                        viewBox="0 0 1024 1024"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        p-id="7861"
                        width="200"
                        height="200"
                    >
                        <path
                            d="M524.1 171.66c-110.22-11.72-165.6 98.16-165.6 98.16s-94.89-78.33-191.09-23.26S4.8 449.48 147.14 606.6c142.34 157.11 315.27 158.04 315.27 158.04s157.95-70.41 225.07-271.5c67.12-201.1-53.16-309.76-163.38-321.48z"
                            fill="#C53938"
                            p-id="7862"
                        ></path>
                        <path
                            d="M887.36 476.37c-72.82-48.51-151.74 8.1-151.74 8.1s-37.73-89.5-125.17-86.17-187.98 82.47-145.87 244.44 162.74 225.87 162.74 225.87 136.25 8.52 256.75-107.6c120.5-116.13 76.11-236.13 3.29-284.64z"
                            fill="#F5E5E5"
                            p-id="7863"
                        ></path>
                    </svg>
                    2
                </span>
            </p>

            <div class="article-content" v-html="article.content"></div>
            <!-- <v-md-preview-html
                        :html="article.content"
                  ></v-md-preview-html> -->

            <div id="comment-block" class="comment-block">
                <input
                    type="text"
                    v-model="name"
                    placeholder="Name"
                    class="comment-input comment-name"
                />
                <div class="comment-content">
                    <textarea
                        type="textarea"
                        v-model="content"
                        rows="10"
                        placeholder="Say What You Want To Say"
                        class="comment-input"
                    ></textarea>
                    <!-- <div class="fruit">
                              <img
                                    :src="'/img/fruit/' + item + '.png'"
                                    v-for="item in fruit"
                                    alt=""
                              />
                        </div> -->
                </div>
                <div style="text-align: left">
                    <el-button
                        type="danger"
                        size="small"
                        @click="confirmComment"
                        class="comment-confirm"
                        >提交</el-button
                    >
                </div>
            </div>

            <div id="commented" style="width: 100%; height: 0px"></div>
            <!-- <comment
                        @getData="lookForComments"
                        :blogId="id"
                        :datas="commentData"
                        @refresh="getData"
                  ></comment> -->
            <div
                class="commented"
                v-for="(item, index) in commentDatas"
                :key="item.id"
                style="display: flex; padding: 10px 0 20px; position: relative"
            >
                <img
                    :src="'/image/img/people/' + item.remark + '.png'"
                    style="
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        padding: 10px;
                    "
                />
                <div
                    style="
                        display: flex;
                        flex-direction: column;
                        position: relative;
                        top: 8px;
                        border-bottom: 1px solid gainsboro;
                        flex: 2;
                        position: relative;
                    "
                >
                    <p style="color: gray">{{ item.userName }}</p>
                    <p style="color: var(--color)">{{ item.content }}</p>
                    <p style="color: gray; font-size: 12px">
                        {{ item.gmtCreate }}
                    </p>
                    <div
                        style="
                            text-align: right;
                            height: 10px;
                            position: relative;
                            top: -27px;
                        "
                    >
                        <img
                            style="width: 20px; cursor: pointer"
                            @click="reply(item)"
                            src="/image/img/comment.png"
                            title="回复"
                            alt=""
                        />
                    </div>

                    <div
                        v-if="item.subset"
                        style="
                            background-color: rgba(0, 0, 0, 0.02);
                            margin-bottom: 10px;
                            box-shadow: 0 2px 12px 0px rgba(0, 0, 0, 0.12);
                        "
                    >
                        <div
                            v-for="(itemx, indexx) in item.subset.slice()"
                            :key="itemx.id"
                            style="
                                display: flex;
                                padding: 10px 0 20px;
                                position: relative;
                            "
                        >
                            <img
                                :src="
                                    '/image/img/people/' + itemx.remark + '.png'
                                "
                                style="
                                    width: 40px;
                                    height: 40px;
                                    border-radius: 50%;
                                    padding: 10px;
                                "
                            />
                            <div
                                style="
                                    display: flex;
                                    flex-direction: column;
                                    position: relative;
                                    top: 8px;
                                    flex: 2;
                                    position: relative;
                                "
                            >
                                <p style="color: gray">
                                    {{ itemx.userName }}
                                </p>
                                <p style="color: var(--color)">
                                    {{ itemx.content }}
                                </p>
                                <p style="color: gray; font-size: 12px">
                                    {{ itemx.gmtCreate }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, nextTick, watch } from "vue"
import { getArticleTime } from "/@/util"
import { getArticleById } from "/@/api/blog.js"
import { useRouter } from "vue-router"

import imgPath1 from "/image/img/article/1.jpg"
import imgPath2 from "/image/img/article/2.jpg"
import imgPath3 from "/image/img/article/3.jpg"
import imgPath4 from "/image/img/article/4.jpg"

import { getBlogComment, postComment } from "/@/api/blog.js"

function changeIMG() {
    let imgs = $(".article-content")[0].querySelectorAll("img")
    imgs.forEach((item) => {
        $(item).addClass("maxWidth")
        item.style.maxWidth = "100%"
    })
}
export default {
    components: {},
    setup(props) {
        const imgPath = [imgPath1, imgPath2, imgPath3, imgPath4]
        let imgSrc = ref("")
        const router = useRouter()
        let article = ref("")
        let isLoading = ref(true)
        let { id } = router.currentRoute.value.params
        async function getData() {
            let x = await getArticleById(id)
            if (x.data) {
                article.value = x.data
            }
            isLoading.value = false
            nextTick(() => {
                changeIMG()
            })
            imgSrc.value = imgPath[Math.floor(Math.random() * 4)]
            getComment()
        }
        async function getComment() {
            let res = await getBlogComment(article.value.id)
            if (res.suc) {
                commentDatas.value = res.data
                commentLength.value = res.data.length
            }
        }
        getData()
        window.scroll(0, 0)
        let commentDatas = ref([]),
            commentLength = ref(0)
        return {
            article,
            isLoading,
            imgSrc,
            commentDatas,
            commentLength,
            getComment,
        }
    },
    data() {
        return {
            replyName: "",
            content: "",
            name: "",
            fruit: [
                Math.ceil(Math.random() * 10),
                Math.ceil(Math.random() * 10),
                Math.ceil(Math.random() * 10),
                Math.ceil(Math.random() * 10),
            ],
        }
    },
    watch: {
        content(val) {
            this.checkDel(val)
        },
    },
    methods: {
        checkDel(code) {
            if (
                code[0] == "回" &&
                !code.includes(`回复 ${this.replyName} ：`)
            ) {
                this.content = ""
            }
        },
        goComment() {
            $("body,html").animate({
                scrollTop: $("#commented").offset().top - "50",
            })
        },
        reply(item) {
            this.content = `回复 ${item.userName} ：`
            this.replyName = item.userName
            $("body,html").animate({
                scrollTop: $("#comment-block").offset().top - "100",
            })
            $("#content").focus()
        },
        getArticleTime(time) {
            return getArticleTime(time)
        },
        async confirmComment() {
            let that = this,
                rContent = ""
            let parentId = ""
            if (this.content[0] == "回") {
                rContent = this.content.split(`回复 ${this.replyName} ：`)[1]
                parentId = this.commentDatas.find(
                    (item) => item.userName == that.replyName
                ).id
            } else {
                rContent = this.content
            }
            if (!rContent) {
                that.$message.info("请输入内容")
                this.content = ""
                return
            }
            let res = await postComment({
                type: "ARTICLE",
                parentId,
                remark: Math.ceil(Math.random() * 16),
                content: rContent,
                userName: this.name,
                blogId: this.article.id,
            })
            if (res.suc) {
                this.$message.success("评论成功！")
                this.name = ""
                this.content = ""
                that.getComment()
            }
        },
    },
    mounted() {},
}
</script>
<style lang="less" scoped>
@titleColor: #776f6f;
@red: rgba(255, 0, 0, 0.295);
.damon-article {
    color: var(--color);
}
.article-content {
    min-height: 80vh;
    line-height: 36px;
    font-size: 16px;
    @media screen and (max-width: 800px) {
        line-height: 28px;
        font-size: 14px;
    }
    .maxWidth {
        max-width: 100%;
    }
}
.time {
    // color: rgb(122, 85, 85);
    color: #d89191;
    font-size: 0.7em;
    text-align: right;
    span {
        display: inline-block;
        padding-right: 15px;
    }
    .comment {
        position: relative;
        margin-left: 40px;
        &::before {
            content: "";
            width: 22px;
            height: 22px;
            background: url("/image/img/comment.png") no-repeat center/contain;
            position: absolute;
            transform: translateX(-140%);
            cursor: pointer;
            bottom: 0px;
        }
        opacity: 0.7;
        &:hover {
            opacity: 1;
        }
    }
    .like {
        svg {
            width: 30px;
            height: 30px;
            position: relative;
            top: 10px;
            cursor: pointer;
            opacity: 0.7;
            &:hover {
                opacity: 1;
            }
        }
    }
}
.article {
    max-width: 800px;
    width: 60%;
    margin: 0 auto;
}
img {
    max-width: 100%;
    width: 100%;
}
.comment-block {
    margin: 50px 0;
    position: relative;
    color: var(--color);
    .comment-input {
        border: 1px dashed var(--box-shadow);
        border-radius: 3px;
        outline: none;
        padding: 10px;
        transition: all 0.5s;
        width: 100%;
        box-sizing: border-box;
        &:focus {
            border-color: fadein(rgba(0, 0, 0, 0.12), 20%);
        }
        resize: none;
    }
    .comment-content {
        position: relative;
        .fruit {
            position: absolute;
            right: 0;
            bottom: 6px;
            img {
                width: 30px;
                height: 30px;
            }
        }
    }
    .comment-name {
        margin-bottom: 20px;
    }
    // .comment-confirm {
    // width: 40px;
    // cursor: pointer;
    // height: 5px;
    // position: absolute;
    // right: 0;
    // }
    input::-webkit-input-placeholder {
        color: @red;
        font-size: 0.8em;
    }
    input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: @red;
        font-size: 0.8em;
    }
    input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: @red;
        font-size: 0.8em;
    }
    input:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: @red;
        font-size: 0.8em;
    }
    textarea::-webkit-input-placeholder {
        color: @red;
        font-size: 0.8em;
    }
    textarea::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: @red;
        font-size: 0.8em;
    }
    textarea:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: @red;
        font-size: 0.8em;
    }
    textarea:-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: @red;
        font-size: 0.8em;
    }
}
@media screen and (max-width: 900px) {
    .article {
        width: 90%;
    }
}
:deep(.hljs-center) {
    text-align: center;
}
:deep(.hljs-right) {
    text-align: right;
}
:deep(h2) {
    padding-bottom: 0.3em;
    font-size: 1.8em;
    border-bottom: 1px solid #eaecef;
}
:deep(p) {
    text-indent: 2em;
}
:deep(blockquote) {
    padding: 0 1em;
    color: #6a737d;
    border-left: 0.25em solid #dfe2e5;
    p {
        text-indent: 0;
    }
}
.previewIMG {
    width: 100%;
    // margin: 50px auto 0;
    display: flex;
    justify-content: center;
    img {
        width: 100%;
        object-fit: cover;
        height: 70vh;
    }
    @media screen and (max-width: 500px) {
        img {
            width: 100%;
            height: 33vh;
        }
    }
}
.d-content {
    max-width: 100%;
}
</style>
