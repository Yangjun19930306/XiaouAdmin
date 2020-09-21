<template>
  <div id="app">
    <el-container>
        <el-aside width="200px">
            <NavMenu />
        </el-aside>
        <el-container>
          <el-header>Header</el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
import NavMenu from "./components/NavMenu"
export default {
  name: "App",
  components:{
      NavMenu
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body,
#app,
.el-container{
  width: 100%;
  height: 100%;
}
  .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    height: 100%;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 100%;
  }
  .el-button--primary{
    margin: 10px 0px;
  }
  .el-breadcrumb{margin-bottom: 20px;}
  .el-pagination{float: right;}
</style>
