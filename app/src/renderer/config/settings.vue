<template>
</template>

<script>
    import Store from './store'
    import { parseDataFile, saveDataFile } from './store'
    const userSettings = new Store({
        configName: 'user-preferences',
        defaults: {
            path: ''
        },
    })

    export default {
        name: 'settings',
        data () {
            return {
                db: Object.assign({}),
            }
        },
        created(){
            if (userSettings.get('path') != ''){
                this.db = parseDataFile(userSettings.get('path'))
                for(let article of this.db.articles){
                    this.$store.dispatch('createArticle')
                    this.$store.dispatch('editArticle', article)
                }
                this.$store.dispatch('updateTableView', this.$store.getters['articlesList'])
            }else{
                this.$electron.remote.dialog.showOpenDialog({
                    title:"Путь куда сохранять настройки",
                    properties: ["openDirectory"]
                }, (folderPaths) => {
                    if(folderPaths === undefined){
                        console.log("No destination folder selected");
                        return;
                    }else{
                        userSettings.setPath(folderPaths[0]);
                    }
                })
            }
        },
        beforeDestroy(){
            saveDataFile(userSettings.get('path'), this.db)
        }
    }
</script>
