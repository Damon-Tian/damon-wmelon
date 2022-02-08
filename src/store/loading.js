export default {
    state: {
        isLoading: false,
        isDamon: localStorage.getItem("damon"),
        theme: "light",
    },
    mutations: {
        changeLoading(state, value) {
            state.isLoading = value
        },
        setTheme(state, value) {
            state.theme = value
            localStorage.setItem("theme", value)
            value == "dark"
                ? (document.documentElement.classList = "dark")
                : (document.documentElement.classList = "")
        },
    },
    actions: {
        changeLoading({ commit }, value) {
            commit(changeLoading, value)
        },
    },
}
