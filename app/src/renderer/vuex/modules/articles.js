const state = {
    count: -1,
    list: [],
    currentId: 0,
}

const mutations = {
    ['CREATE_ARTICLE'] (state) {
        const newArticle = {
            author: '',
            year: '',
            journal: '',
            abstract: '',
            tags: [],
            note: '',
            href: ''
        }
        state.count++
        state.list.push(newArticle)
        state.currentId = state.count
        },
    ['EDIT_ARTICLE'] (state, article) {
        state.list[state.currentId] = article
    },
    ['SET_ACTIVE_ARTICLE'] (state, id) {
        state.currentId = id
    }
}

export default {
  state,
  mutations
}
