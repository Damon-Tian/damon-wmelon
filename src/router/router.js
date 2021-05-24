import { defineAsyncComponent } from "vue"
import { createRouter, createWebHistory } from "vue-router"
import Layout from "/@/page/layout.vue"
const Home = () => import("/@/page/home/home.vue")
const Other = () => import("/@/page/home/otherPage.vue")

const Article = () => import("/@/page/article/article.vue")
const ArticleId = () => import("/@/page/article/idArticle.vue")

const Photo = () => import("/@/page/photo/photo.vue")
const Write = () => import("/@/page/write/write.vue")
const NotFound = () => import("/@/page/404.vue")
const routes = [
    {
        path: "/",
        component: Layout,
        children: [
            {
                path: "",
                component: Home,
            },
            {
                path: "",
                component: Other,
                children: [
                    {
                        path: "/article",
                        component: Article,
                    },
                    {
                        path: "/article/:id",
                        component: ArticleId,
                    },
                    {
                        path: "/photo",
                        component: Photo,
                    },
                    {
                        path: "/write",
                        component: Write,
                        name: "write",
                    },
                ],
            },
            {
                path: "/:pathMatch(.*)*",
                name: "NotFound",
                component: NotFound,
            },
        ],
    },
]

export default createRouter({
    history: createWebHistory(),
    scrollBehavior: () =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ left: 0, top: 0 })
            }, 500)
        }),
    routes,
})
