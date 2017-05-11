import modules from './modules'

export const articlesList = () => ([...modules.articles.state.list])
export const articlesCount = () => (modules.articles.state.count)


export const tableViewRows = (state) => [...state.app.show]

export const tagsList = (state) => {
        let tagsAsMap = new Map()
        state.articles.list.map(row => row.tags.map((tag) => tagsAsMap.set(tag, 0)))
        return [...tagsAsMap.keys()]
}

export const tableBlockUI = (state) => parseInt(state.app.edit)
