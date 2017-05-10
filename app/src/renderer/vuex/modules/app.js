const state = {
    show: [],
}

const mutations = {
    ['UPDATE_VIEW'] (state, articlesList) {
        state.show = articlesList
    },
}

export default {
  state,
  mutations
}
