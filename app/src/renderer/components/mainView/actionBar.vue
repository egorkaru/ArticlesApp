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
                    row => !! (row.abstract.toLowerCase().match(expr))
                )
                this.reloadTable(this.results)
                } else {
                this.reloadTable(this.articles)
                }
            },
        handleSearchClick() {
            this.fuzzySearch(searchQuery)
            },
        reloadTable(newData) {
            if (blockUI < 0 ) this.$store.dispatch('updateTableView', newData)
            }
        }
  }
</script>
