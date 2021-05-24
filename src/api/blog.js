import fetch from "../fetch/index.js"

export function getHomeArticles(curPage, limit) {
    return fetch({
        method: "get",
        url: "/blog/list_all",
        params: {
            curPage,
            limit,
            isLoading: curPage == 1 ? true : false,
        },
    })
}

export function getArticleById(params) {
    return fetch({
        method: "get",
        url: "/article/info/" + params,
        params: {
            isLoading: true,
        },
    })
}

export function getArticles(curPage, limit) {
    return fetch({
        method: "get",
        url: "/article/list_all",
        params: {
            curPage,
            limit,
            isLoading: true,
        },
    })
}
//首页文字

export function saveHomeBlog(params) {
    return fetch({
        method: "post",
        url: "/blog/save",
        params,
    })
}

// 评论相关
export function getComment(id) {
    return fetch({
        method: "get",
        url: "/comment/list_all?blogId=" + id,
    })
}
export function postComment(params) {
    return fetch({
        method: "post",
        url: "/comment/save",
        params,
    })
}
export function getBlogComment(id) {
    return fetch({
        methods: "get",
        url: "/comment/list_all?blogId=" + id + "&type=ARTICLE",
    })
}
