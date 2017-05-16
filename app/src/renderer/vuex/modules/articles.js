const state = {
    count: -1,
    list: []
}

let articleTemplate = {
    id: 0,
    author: '',
    year: '',
    journal: '',
    abstract: '',
    tags: [],
    note: '',
	file_name: '',
	file_path: ''
}


const mutations = {
    ['CREATE_ARTICLE'] () {
        const _state = Object.assign({}, state)
        _state.count += 1
        let created = Object.assign({}, articleTemplate, {id: _state.count})
        _state.list.push(created)
        state.count = _state.count
        state.list = [..._state.list]
        },
    ['EDIT_ARTICLE'] (state, article) {
        const _state = Object.assign({}, state)
        const edited = Object.assign({}, articleTemplate, article)
        console.log('e',edited,'_',_state)
        const targetA = _state.list.some(a => (a.id === article.id))
        if (targetA) state.list = _state.list.map(a => (a.id === edited.id) ? edited : a)
    }
}


export default {
    state,
    mutations
}
