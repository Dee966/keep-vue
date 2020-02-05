<template>
  <div id="login">
    <div class="login-title">
      <h2>大保健身房</h2>
    </div>
    <div class="login-logo">
      <img :src="img" style="width: 20%;height: 20%;">
    </div>
    <div class="login-input">
      <el-input type="text" v-model="username" placeholder="用户名"></el-input>
      <br><br>
      <el-input type="password" v-model="password" placeholder="密码"></el-input>
      <br><br>
      <el-radio v-model="radio" label="会员">会员</el-radio>
      <el-radio v-model="radio" label="教练">教练</el-radio>
      <el-button round style="float: right" @click="login()"><strong>登 录</strong></el-button>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'Login',
    data(){
      return{
        msg:[],
        username:'',
        password:'',
        radio:'会员',
        img:'./static/img/logo.jfif'
      }
    },
    methods:{
      listCustomer(){
        this.$axios.get('http://'+localStorage.getItem('ipAddress')+':8082/customer/info/'+1).then(res => {
          this.msg = res.data.data
        })
      },
      login(){
        let loginVo = {
          username: this.username,
          password: this.password
        }
        if (this.radio === '会员'){
          this.$axios.post('http://'+localStorage.getItem('ipAddress')+':8082/login/customer',loginVo).then(res =>{
            if (res.data.code !== 0){
              alert(res.data.msg)
              return
            }
            localStorage.setItem('token',res.data.data.token)
            localStorage.setItem('userId',res.data.data.id)
            localStorage.setItem('name',res.data.data.name)
            localStorage.setItem('user',this.radio)
            this.$router.push('/home')
          }).catch(err =>{
            alert('系统错误')
          })
        } else if (this.radio === '教练'){
          this.$axios.post('http://'+localStorage.getItem('ipAddress')+':8082/login/coach',loginVo).then(res =>{
            if (res.data.code !== 0){
              alert(res.data.msg)
              return
            }
            localStorage.setItem('token',res.data.data.token)
            localStorage.setItem('userId',res.data.data.id)
            localStorage.setItem('name',res.data.data.name)
            localStorage.setItem('user',this.radio)
            this.$router.push('/home')
          }).catch(err =>{
            alert('系统错误')
          })
        } else {
          alert('系统错误')
        }
      }
    }
  }
</script>

<style>
  #login{
    margin: 0px 5px;
  }
  .login-title{
    margin-top: 50px;
    width: 100%;
    text-align: center;
  }
  .login-logo{
    display: flex;
    justify-content: center;
  }
  .login-input{
    margin-top: 80px;
  }
</style>
