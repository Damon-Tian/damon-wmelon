export default {
    state: {
        isLoading: false,
        isDamon: localStorage.getItem("damon"),
    },
    mutations: {
        changeLoading(state, value) {
            state.isLoading = value
        },
    },
    actions: {
        changeLoading({ commit }, value) {
            commit(changeLoading, value)
        },
    },
}
