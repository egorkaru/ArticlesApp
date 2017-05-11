<template>
  <el-input
        placeholder="Поиск по абстракту"
        icon="search"
        v-model="searchQuery"
        :on-icon-click="handleSearchClick"
        @change="fuzzySearch">
  </el-input>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    data () {
      return {
        searchQuery: '',
        results: []
      }
    },
    computed: {
        ...mapGetters({
            articles: 'articlesList',
            blockUI: 'tableBlockUI'
            })
    },
    methods: {
        fuzzySearch(query){
            if(!!query && (this.blockUI < 0)){
                let expr = RegExp(`.*${query}.*`);
                this.results = this.articles.filter(
                    row => !! (row.abstract.match(expr))
                )
                /*this.results = this.articles.filter(
                    row => {
                        let lastFoundChar = 0
                        for (let i of query) {
                            let currentChar = query[lastFoundChar]
                            if (currentChar == ' ') continue
                            lastFoundChar = row.abstract.indexOf(currentChar, lastFoundChar) 
                            if (lastFoundChar == -1) return false
                            }
                        return true
                        })*/
                this.$store.dispatch('updateTableView', this.results)
                } else {
                this.reloadTable()
                }
            },
        handleSearchClick() {
            this.fuzzySearch(searchQuery)
            },
        reloadTable() {
            this.$store.dispatch('updateTableView', this.articles)
            }
        }
  }
</script>
