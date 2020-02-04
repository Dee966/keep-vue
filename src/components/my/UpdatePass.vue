<template>
  <div id="update-pass">
    <div style="position: fixed;top: 0;width: 100%;height: 40px;padding-top: 8px;">
      <el-page-header @back="goBack" content="密码修改">
      </el-page-header>
    </div>
    <h2 style="margin-top: 55px;margin-left: 5px">邮箱验证：</h2>

    <el-row>
      <el-col :span="18">
        <div class="grid-content bg-purple">
          <el-input type="text" v-model="safeCode" placeholder="填写邮箱收到的验证码" style="margin-left: 2px"></el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-light">
          &nbsp;&nbsp;<el-button type="primary" plain @click="getCode()" id="but-get">获取</el-button>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
  export default {
    name: "UpdatePass",
    data(){
      return{
        safeCode:''
      }
    },
    methods:{
      goBack() {
        this.$router.go(-1);//返回上一层
      },
      getCode(){
        if ($('#but-get').text() === '获取'){
          $('#but-get').text('验证')
          this.$axios
            .get('http://' + localStorage.getItem('ipAddress') + ':8082/login/mail?' +
              'customerId='+localStorage.getItem('userId')+'&email='+localStorage.getItem('email')).then(res =>{
                if (res.data.code !== 0){
                  alert(res.data.msg)
                }
          }).catch(err =>{
            alert('系统错误')
          })
        } else if ($('#but-get').text() === '验证'){
          // console.log('验证')
          let codeVo = {
            code:this.safeCode,
            customerId:localStorage.getItem('userId'),
            email:localStorage.getItem('email')
          }
          this.$axios.post('http://' + localStorage.getItem('ipAddress') + ':8082/login/judge',codeVo).then(res =>{
            if (res.data.code !== 0){
              alert(res.data.msg)
            }else {
              alert('验证成功！')
              this.$router.push('/inputPass')
            }
          })
        } else {
          alert('系统错误')
        }
      }
    }
  }
</script>

<style scoped>

</style>
