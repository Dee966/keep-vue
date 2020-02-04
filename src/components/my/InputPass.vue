<template>
    <div id="input-pass">
      <div style="position: fixed;top: 0;width: 100%;height: 40px;padding-top: 8px;">
        <el-page-header @back="goBack" content="填写新密码">
        </el-page-header>
      </div>

      <div style="margin-top: 55px">
        <h2>填写新密码：</h2>
        <p style="color: red;display: none" id="check-pass">*密码不一致！</p>
        <el-input placeholder="请输入新密码" v-model="input1" show-password></el-input>
        <br><br>
        <el-input placeholder="请确认新密码" v-model="input2" show-password @change="checkPass()"></el-input>
        <br><br>

        <el-button type="success" plain style="float: right" @click="updPassword()">修改密码</el-button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "InputPass",
      data(){
          return{
            input1:'',
            input2:'',
          }
      },
      methods:{
        goBack() {
          this.$router.go(-1);//返回上一层
        },
        checkPass(){
          if (this.input1 !== this.input2){
            document.getElementById("check-pass").style.display="";
          } else {
            document.getElementById("check-pass").style.display="none";
          }
        },
        updPassword(){
          if (this.input1 !== this.input2){
            console.log('密码不一致！')
          } else {
            let newPassVo = {
              id:localStorage.getItem('userId'),
              password:this.input2,
              user:localStorage.getItem('user')
            }
            this.$axios.put('http://' + localStorage.getItem('ipAddress') + ':8082/login/new_pass',newPassVo).then(res =>{
              if (res.data.code !== 0){
                alert(res.data.msg)
              }else {
                alert('修改成功！')
                localStorage.setItem('token','')
                localStorage.setItem('userId','')
                localStorage.setItem('name','')
                localStorage.setItem('user','')
                this.$router.push('/login')
              }
            })
          }
        }
      }
    }
</script>

<style scoped>

</style>
