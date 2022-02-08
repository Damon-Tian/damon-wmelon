<template>
    <div>
        <headers></headers>
        <div class="d-content">
            <transition name="write" mode="out-in">
                <div v-if="!writing">
                    <div class="writeBlog">
                        <span @click="writing = true">Write Something</span>
                    </div>
                    <div class="pubu">
                        <div ref="first">
                            <div
                                v-for="(item, index) in blogList && blogList[0]"
                                :key="index"
                            >
                                <blog-block :item="item"></blog-block>
                            </div>
                        </div>
                        <div ref="second">
                            <div
                                v-for="(item, index) in blogList && blogList[1]"
                                :key="index"
                            >
                                <blog-block :item="item"></blog-block>
                            </div>
                        </div>
                        <div ref="third">
                            <div
                                v-for="(item, index) in blogList && blogList[2]"
                                :key="index"
                            >
                                <blog-block :item="item"></blog-block>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <home-write
                        :show="writing"
                        @changeShow="writing = false"
                        @refreshData="refreshData"
                    ></home-write>
                </div>
            </transition>
            <div v-show="isLoading" class="page-loading">
                <i class="el-icon-loading"></i>
            </div>
        </div>
    </div>
</template>

<script>
import {
    nextTick,
    watch,
    ref,
    onMounted,
    onBeforeUnmount,
    onUnmounted,
} from "vue"
import blogBlock from "/@/components/blogBlock.vue"
import { jieliu, scrolls } from "/@/util/index.js"
import headers from "/@/components/header.vue"
import realBack from "/image/back.jpg"
import { getHomeArticles } from "/@/api/blog.js"
import homeWrite from "/@/components/homeWrite.vue"

export default {
    name: "HelloWorld",
    components: {
        blogBlock,
        headers,
        homeWrite,
    },
    props: {
        msg: String,
    },
    setup(props) {
        let blogList = ref([[], [], []])
        let first = ref(null)
        let second = ref(null)
        let third = ref(null)
        const limit = 10
        let writing = ref(false)
        let isLoading = ref(false)
        let backIMG = new Image()
        backIMG.onload = () => {
            setTimeout(() => {
                $("#loading").css({
                    transition: "all 3s",
                    opacity: 0,
                })
                setTimeout(() => {
                    $("#loading").hide()
                }, 3000)
            }, 2000)
        }
        backIMG.src = realBack
        function showFall(list, i) {
            if (!first.value) return
            if (i >= list.length) {
                scrolls()
                return
            }
            let origin =
                first.value.offsetHeight <= second.value.offsetHeight
                    ? first
                    : second
            let final =
                origin.value.offsetHeight <= third.value.offsetHeight
                    ? origin
                    : third

            let finalNum = final == first ? 0 : final == second ? 1 : 2
            blogList.value[finalNum] && blogList.value[finalNum].push(list[i])
            i++
            nextTick(() => {
                showFall(list, i)
            })
        }
        let curPage = ref(1)
        let getPageLoading = false
        async function getList() {
            //如要分页   当前页curPage   每页数量limit
            if (curPage.value == -1) {
                return
            }
            isLoading.value = true
            nextTick(async () => {
                if (getPageLoading) return
                getPageLoading = true
                if (curPage.value != 1) {
                    var h = $(document).height() - $(window).height()
                    $("html,body").animate({ scrollTop: h }, 500)
                }
                let [res, timeout] = await Promise.all([
                    getHomeArticles(curPage.value, limit),
                    z(),
                ])
                getPageLoading = false
                isLoading.value = false
                if (res.data != "") {
                    curPage.value++
                    let i = 0
                    showFall(res.data, i)
                } else {
                    curPage.value = -1
                }
            })
        }

        async function z() {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve(1)
                }, 1000)
            })
        }
        const jj = (() => jieliu(500, scrolls(getList)))()

        onMounted(() => {
            window.addEventListener("scroll", jj)
        })
        onBeforeUnmount(() => {
            window.removeEventListener("scroll", jj)
        })
        getList()
        watch(writing, async (val) => {
            if (val == true) {
                window.removeEventListener("scroll", jj)
            } else {
                window.addEventListener("scroll", jj)
            }
        })
        const refreshData = () => {
            blogList.value = [[], [], []]
            curPage.value = 0
            getList()
        }
        return {
            blogList,
            curPage,
            first,
            second,
            third,
            jj,
            writing,
            getList,
            refreshData,
            isLoading,
        }
    },
}
</script>
<style lang="less">
.page-loading {
    text-align: center;
    padding: 10px;
    color: red;
}
</style>
<style lang="less" scoped>
.content {
    padding-top: 20px;
}
.writeBlog {
    z-index: 9999;
    margin: 0;
    position: relative;
    top: -45px;
    transition: all 0.3s;
    margin-bottom: 10px;
    span {
        cursor: pointer;
        display: inline-block;
        border-radius: 30px;
        position: absolute;
        right: 0;
        transition: all 0.3s;
        box-shadow: 0px 1px 7px 0px rgba(0, 0, 0, 0.12);
        padding: 4px 18px;
        border: 1px solid rgba(0, 0, 0, 0.12);
        overflow: hidden;
        &::before {
            content: "";
            border-radius: 30px;
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            transition: all 0.5s ease-in-out;
            z-index: -1;
            transform: translateX(-100%);
        }
        &:hover {
            &::before {
                transform: translateX(0%);
                background-color: darken(red, 10%);
            }
            color: ghostwhite;
        }
    }
}
.pubu {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-around;
    align-items: flex-start;
    font-size: 14px;
    & > div {
        width: 32%;
        display: flex;
        flex-direction: column;
        & > div {
            position: relative;
            transition: all 0.2s;
            margin-bottom: 10px;
            &:hover {
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.22);
            }
        }
    }
}
@media screen and (max-width: 900px) {
    .pubu {
        flex-wrap: wrap;
        & > div {
            width: 90%;
            // display: flex;
            // flex-direction: column;
            & > div {
                position: relative;
                transition: all 0.2s;
                margin-bottom: 10px;
                &:hover {
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.22);
                }
            }
        }
    }
}
</style>
