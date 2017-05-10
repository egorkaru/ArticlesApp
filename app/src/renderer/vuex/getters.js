export const articlesList = state => state.articles.list

export const tableViewRows = state => state.app.show

export const tagsList = (state) => {
        let tagsAsMap = new Map()
        state.articles.list.map(row => row.tags.map((tag) => tagsAsMap.set(tag, 0)))
        return [...tagsAsMap.keys()]
}
