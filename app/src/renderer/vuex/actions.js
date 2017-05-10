export const createArticle = ({ commit }) => {
    commit('CREATE_ARTICLE')
}

export const editArticle = ({ commit }, article) => {
    delete article.id
    commit('EDIT_ARTICLE', article)
}

export const setActiveArticle = ({ commit }, article) => {
    commit('SET_ACTIVE_ARTICLE', article.id)
}

export const updateTableView = ({ commit }, articlesList) => {
    commit('UPDATE_VIEW', articlesList)
}