<template>
    <div>
        <el-button type="primary" @click="dialogFormVisible = true">Добавить статью</el-button>
        <el-dialog title="Shipping address" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="Автор" :label-width="formLabelWidth">
                    <el-input v-model="form.author" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Год" :label-width="formLabelWidth">
                    <el-date-picker
                        v-model="form.year"
                        type="year"
                        placeholder="Гооод">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="Журнал" :label-width="formLabelWidth">
                    <el-input v-model="form.journal" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Абстракт" :label-width="formLabelWidth">
                    <el-input v-model="form.abstract" type="textarea" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="Теги" :label-width="formLabelWidth">
                    <el-select v-model="form.tags" multiple allow-create filterable placeholder="Select">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="Ссылка на пдфку" :label-width="formLabelWidth">
                    <el-upload
                        class="upload-demo"
                        action="false"
                        :on-preview="handlePdf">
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
            formLabelWidth: '240px'
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
            this.form.href = file
        },
        articleSave(){
            this.$store.dispatch('createArticle')
            console.log(this.form)
            this.$store.dispatch('editArticle', this.form)
            this.dialogFormVisible = false
            this.$store.dispatch('updateTableView', this.$store.getters['articlesList'])
        }
    }
  }
</script>
