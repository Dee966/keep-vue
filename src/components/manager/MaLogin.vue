<template>
  <div id="manager-login">
    <div id="login-input">
      <h2>大保健身房--后台管理系统</h2>
      <img :src=logo width="30%" height="30%">
      <div style="margin-top: 20px">
        <el-input type="text" v-model="username" placeholder="用户名"></el-input>
        <br><br>
        <el-input type="password" v-model="password" placeholder="密码"></el-input>
        <br><br>
        <el-button type="success" style="width: 100%" @click="login()">成功按钮</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MaLogin",
    data(){
      return{
        username:'',
        password:'',
        logo:'/static/img/logo.jfif'
      }
    },
    methods:{
      login(){
        let loginVo = {
          username:this.username,
          password:this.password
        }
        this.$axios.post('http://'+localStorage.getItem('ipAddress')+':8082/login/manager',loginVo).then(res =>{
          if (res.data.code !== 0){
            alert(res.data.msg)
            return
          }
          localStorage.setItem('token',res.data.data.token)
          localStorage.setItem('userId',res.data.data.id)
          this.$router.push('/heard')
        }).catch(err =>{
          alert('系统错误')
        })
      }
    }
  }
</script>

<style scoped>
  #login-input {
    width: 40%;
    border-radius: 10px;
    border: solid #c1c3c7 1px;
    padding: 100px;
    text-align: center;
    margin-top: 80px;
    background-color: #e5e9f2;
  }
  #manager-login{
    width: 100%;
    display: flex;
    justify-content: center;
  }
</style>
