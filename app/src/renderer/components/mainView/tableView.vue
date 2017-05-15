<template>
  <el-table
    :data="tableData"
    :default-expand-all=true
    border
    style="width: 100%">
    <el-table-column type="expand">
      <template scope="props">
        <el-button type="text" icon="edit" size="small" @click="makeNote(props.$index, props.row, 'abstract')">Абстракт</el-button>
        <span v-show="(props.$index != editableRow) || ((props.$index == editableRow) && (editableRowName != 'abstract'))">{{ props.row.abstract }} <br><br></span>
        <div class="articleNote" v-show="(props.$index == editableRow) && (editableRowName === 'abstract')">
            <el-input type="textarea" form autosize placeholder="Please input" v-model="props.row.abstract"></el-input>
            <el-button type="success" style="float: right;" size="small" @click="saveNote(props.$index)">Сохранить</el-button>
        </div>
        <el-button type="text" icon="edit" size="small" @click="makeNote(props.$index, props.row, 'note')">Заметка</el-button>
        <span v-show="(props.$index != editableRow) || ((props.$index == editableRow) && (editableRowName != 'note'))">{{ props.row.note }} <br><br></span>
        <div class="articleNote" v-show="(props.$index == editableRow) && (editableRowName === 'note')">
            <el-input type="textarea" form autosize placeholder="Please input" v-model="props.row.note"></el-input>
            <el-button type="success" style="float: right;" size="small" @click="saveNote(props.$index)">Сохранить</el-button>
        </div>
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
      :filters="filterTagsArray"
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
  .articleNote {
    margin-bottom: 15px;
  }
  .el-textarea {
      margin-bottom: 10px;
  }
  .abstract {
      padding: 10px;
      background-color: white;
      border-radius: 2px;
      border: 1px solid #D3DCE6;
  }
</style>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
              editableRowName: '',
            }
        },
    computed: {
        ...mapGetters({
            tableData: 'tableViewRows',
            tagsList: 'tagsList',
            editableRow: 'tableBlockUI'
            }),
        filterTagsArray: function() {
            return this.tagsList.map(tag => ({text: tag, value: tag}))
        }
    },
    methods: {
      articleLink(path){
        this.$electron.shell.openItem(path)
      },
      filterTag(value, row) {
        return row.tags.some(tag => tag == value)
      },
      makeNote(index, row, name){
        if (this.editableRow > -1) this.saveNote(this.editableRow)
        this.$store.dispatch('editNote', index)
        this.editableRowName = name
      },
      saveNote(index){
        this.$store.dispatch('editNote', -1)
        this.$store.dispatch('editArticle', this.tableData[index])
        this.editableRowName = ''
      }
    }
  }
</script>