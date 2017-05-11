export const createArticle = ({ commit }) => {
    commit('CREATE_ARTICLE')
    }

export const newArticle = ({ commit }, article) => {
    commit('CREATE_ARTICLE')
    commit('EDIT_ARTICLE', article)
    }

export const editArticle = ({ commit }, article) => {
    commit('EDIT_ARTICLE', article)
    }

export const updateTableView = ({ commit }, articlesList) => {
    commit('UPDATE_VIEW', articlesList)
    }

export const editNote = ({ commit }, id) => {
    commit('EDIT_ROW', id)
}