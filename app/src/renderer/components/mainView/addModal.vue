<template>
    <div>
        <el-button type="primary" @click="dialogFormVisible = true">Добавить статью</el-button>
        <el-dialog title="Добавление статьи" :visible.sync="dialogFormVisible">
            <el-form :model="form" ref="newArticleDialog">
                <el-form-item label="Автор" label-width="100px">
                    <el-input v-model="form.author" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Год" label-width="100px">
                    <el-date-picker
                        v-model="form.year"
                        type="year"
                        placeholder="Гооод">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="Журнал" label-width="100px">
                    <el-input v-model="form.journal" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Абстракт" label-width="100px">
                    <el-input v-model="form.abstract" type="textarea" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Теги" label-width="100px">
                    <el-select v-model="form.tags" multiple allow-create filterable placeholder="Select">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Ссылка на пдфку" label-width="100px">
                    <el-upload
                        class="upload-demo"
                        action="false"
                        :before-upload="handlePdf">
                        <el-button size="small" type="primary">Click to upload</el-button>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Отмена</el-button>
                <el-button type="primary" @click="articleSave">Сохранить</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
  export default {
      name: 'add-article',
      data () {
        return {
            dialogFormVisible: false,
            form: {
                author: '',
                year: '',
                journal: '',
                abstract: '',
                tags: [],
                note: '',
                href: ''
                },
            formLabelWidth: '240px',
            }
        },
    computed: {
        allTags: function(){
            return this.$store.getters['tagsList']
        },
        options: function(){
            return this.allTags.map(tag => ({label: tag, value: tag}))
        }
    },
    methods: {
        handlePdf(file) {
            this.form.href = file.path
        },
        articleSave(){
            this.$store.dispatch('createArticle')
            let newArticle = Object.assign({}, this.form, {id: this.$store.getters['articlesCount']})
            this.$store.dispatch('editArticle', newArticle)
            this.$store.dispatch('updateTableView', this.$store.getters['articlesList'])
            this.dialogFormVisible = false
            this.$refs['newArticleDialog'].resetFields()
        },
    },
    watch: {
        form: {
            handler: (val, oldVal) => { val.year = val.year.getFullYear() || val.year },
            deep: true
        }
    }
  }
</script>
