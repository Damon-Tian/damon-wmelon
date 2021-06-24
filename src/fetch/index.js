import axios from "axios"
import { ElMessage as Message } from "element-plus"
import store from "/@/store/index.js"
const fetch = axios.create({
    baseURL: "https://tj.wmelon.cn/l",
})

fetch.interceptors.request.use((config) => {
    if (config.params && config.params.isLoading) {
        store.commit("changeLoading", true)
    }
    return config
})

fetch.interceptors.response.use(
    (res) => {
        store.commit("changeLoading", false)
        if (res.data.status_code == 100) {
            res.data.suc = true
            return res.data
        } else {
            Message({ message: res.data.error_msg, type: "error" })
            return Promise.reject(res.data.error_msg)
        }
    },
    (err) => {
        Message({ message: err, type: "error" })
        store.commit("changeLoading", false)
        return Promise.reject(err)
    }
)

fetch.POSTS = (url, formdata, option = {}) => {
    return fetch.post(url, getFormData(formdata), option)
}

const getFormData = (obj) => {
    let formdata = new FormData()
    for (let i in obj) {
        formdata.append(i, obj[i])
    }
    return formdata
}

export default fetch
