<template>
  <div>
    <el-row>
      <!--<el-col :span="6">
        <img src="./mainView/assets/logo.png" alt="electron-vue">
      </el-col>-->
      <el-col :span="4">
        <add-modal></add-modal>
      </el-col>
      <el-col :offset="8" :span="12">
        <action-bar></action-bar>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <table-view></table-view>
      </el-col>
    </el-row>
  </div>
</template>

<script>


  import TableView from './mainView/tableView'
  import AddModal from './mainView/addModal'
  import ActionBar from './mainView/actionBar'
  export default {
    components: {
      TableView,
      AddModal,
      ActionBar,
    },
    mounted(){
      /**/
    }
  }
</script>

<style scoped>
  img {
    //margin-top: -25px;
    width: 150px;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
