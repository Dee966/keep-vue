<template>
    <div id="manager-home">
      <div style="display: flex;margin-top: 10px">
        <img :src=logo alt="" width="20px" height="20px">&nbsp;&nbsp;
        <h1>后台管理系统</h1>
      </div>

      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-submenu index="1">
          <template slot="title">会员管理</template>
          <el-menu-item index="1-2"><router-link :to="{name:'logCusLink'}">会员登记</router-link></el-menu-item>
          <el-menu-item index="1-1"><router-link :to="{name:'regCusLink'}">会员注册</router-link></el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">教练管理</template>
          <el-menu-item index="2-2"><router-link :to="{name:'logCoachLink'}">教练考勤</router-link></el-menu-item>
          <el-menu-item index="2-1"><router-link :to="{name:'regCoachLink'}">上传（注册）教练</router-link></el-menu-item>
        </el-submenu>
        <el-menu-item index="3"><router-link :to="{name:'maShareLink'}" style="color:#909399" id="chang-color"><span>大保圈管理</span></router-link></el-menu-item>
<!--        <el-menu-item index="5"></el-menu-item>-->
        <el-submenu index="3">
          <template slot="title">退会处理</template>
          <el-menu-item index="3-1"><router-link :to="{name:'leaveCusLink'}">会员退会</router-link></el-menu-item>
          <el-menu-item index="3-2"><router-link :to="{name:'leaveCoachLink'}">教练离职</router-link></el-menu-item>
        </el-submenu>
      </el-menu>
      <router-view/>
    </div>
</template>

<script>
    export default {
        name: "MaHome",
      data(){
        return{
          activeIndex:'1-2',
          logo:'/static/img/logo.jfif'
        }
      },
      methods:{

      }
    }
</script>

<style scoped>
  #manager-home{
    padding: 0px 100px;
  }
  #chang-color span:hover{
    color: #448aff;
  }
</style>
