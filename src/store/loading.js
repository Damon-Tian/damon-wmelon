export default {
      state: {
            isLoading: false
      },
      mutations: {
            changeLoading(state, value) {
                  state.isLoading = value
            }
      },
      actions: {
            changeLoading({ commit }, value) {
                  commit(changeLoading, value)
            }
      }
}
