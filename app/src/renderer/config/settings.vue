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
                db: {},
            }
        },
        created(){
            if (userSettings.get('path') != ''){
                this.db = parseDataFile(userSettings.get('path'))
                for(let article of this.db){
                    this.$store.dispatch('newArticle', article)
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
            this.$store.subscribe((mutation, state) => {
                //console.log(mutation, state)
                if (mutation.type == "EDIT_ARTICLE") this.db = this.$store.getters['articlesList']
            })
        },
        watch:{
            db: {
                handler: function (val, oldVal) { 
                    saveDataFile(userSettings.get('path'), this.db)
                    },
                deep: true
            }
        },
        beforeDestroy(){
            saveDataFile(userSettings.get('path'), this.db)
        }
    }
</script>
