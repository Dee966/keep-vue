<template>
  <div id="reg-cus">
    <br>
    <el-input type="text" v-model="username" placeholder="用户名" style="width: 50%"></el-input><br><br>
    <el-input type="password" v-model="password" placeholder="密码" style="width: 50%"></el-input><br><br>
    <el-input type="text" v-model="name" placeholder="姓名" style="width: 50%"></el-input><br><br>
    <el-input type="text" v-model="email" placeholder="邮箱" style="width: 50%"></el-input><br><br>
    <el-input type="text" v-model="telephone" placeholder="手机" style="width: 50%"></el-input><br><br>
    <el-input type="text" v-model="times" placeholder="次数" style="width: 50%"></el-input><br><br>
    <el-button type="primary" plain @click="regCustomer()" id="but-get">注册</el-button>
  </div>
</template>

<script>
  export default {
    name: "RegCus",
    data(){
      return{
        username:'',
        password:'',
        name:'',
        email:'',
        telephone:'',
        times:''
      }
    },
    methods:{
      regCustomer(){
        let registerVo = {
          username:this.username,
          password:this.password,
          name:this.name,
          email:this.email,
          telephone:this.telephone,
          times:this.times,
          joinTime:new Date()
        }
        this.$axios.post('http://' + localStorage.getItem('ipAddress') + ':8082/login/reg_customer',registerVo).then(res =>{
          if (res.data.code !== 0){
            alert(res.data.msg)
            return
          }
          localStorage.setItem('email',this.email)
          localStorage.setItem('id',res.data.data)
          console.log(res.data.data)
          alert('注册成功，请验证用户...')
          this.$router.push('/checkCode')
        }).catch(err =>{
          alert('系统错误')
        })
      }
    }
  }
</script>

<style scoped>

</style>
