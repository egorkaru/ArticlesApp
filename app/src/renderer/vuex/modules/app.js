const state = {
    show: [],
    edit: -1 //-1 just viewing, else it's article id
}

const mutations = {
    ['UPDATE_VIEW'] (state, articlesList) {
        const _state = Object.assign({}, state)
        _state.show = articlesList
        state.show = _state.show
    },
    ['EDIT_ROW'] (state, id) {
        const _state = Object.assign({}, state)
        _state.edit = id
        state.edit = _state.edit
    },
}

export default {
  state,
  mutations
}
