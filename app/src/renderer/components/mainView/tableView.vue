<template>
  <el-table
    :data="tableData"
    :default-expand-all=true
    border
    style="width: 100%">
    <el-table-column type="expand">
      <template scope="props">
        <p>Абстракт: {{ props.row.abstract }}</p>
        <p>Заметка: {{ props.row.note }}</p>
        <a @click="articleLink(props.row.href)">{{props.row.href}}</a>
      </template>
    </el-table-column>
    <el-table-column
      label="Автор"
      prop="author"
      sortable>
    </el-table-column>
    <el-table-column
      label="Год"
      prop="year"
      sortable>
    </el-table-column>
    <el-table-column
      label="Журнал"
      prop="journal"
      sortable>
    </el-table-column>
    <el-table-column
      label="Теги"
      prop="tags"
      :filters=filterTagsArray
      :filter-method="filterTag"
      filter-placement="bottom-end">>
      <template scope="scope">
        <el-tag
          :key="tag"
          type="success"
          v-for="tag in scope.row.tags">
          {{ tag }}
        </el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
  a {
    color: rgb(50, 174, 110);
    text-decoration: none;
  }

  a:hover {
    color: rgb(40, 56, 76);
  }
  .el-tag {
    margin-right: 5px;
  }
</style>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            }
        },
    computed: {
        ...mapGetters({
            tableData: 'tableViewRows',
            tagsList: 'tagsList'
            }),
        filterTagsArray: function() {
            return this.tagsList.map(tag => ({text: tag, value: tag}))
            },
        },
    methods: {
      articleLink(path){
        this.$electron.shell.openItem(path)
      },
      filterTag(value, row) {
        return row.tags.some(tag => tag == value)
      },
    },
    created() {
    }
  }
</script>