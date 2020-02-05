<template>
    <div id="check-code">
      <br>
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
        name: "CheckCode",
      data(){
          return{
            safeCode:''
          }
      },
      methods:{
        getCode(){
          if ($('#but-get').text() === '获取'){
            $('#but-get').text('验证')
            this.$axios
              .get('http://' + localStorage.getItem('ipAddress') + ':8082/login/mail?' +
                'customerId='+localStorage.getItem('id')+'&email='+localStorage.getItem('email')).then(res =>{
              if (res.data.code !== 0){
                alert(res.data.msg)
                return
              }
            }).catch(err =>{
              alert('系统错误')
            })
          } else if ($('#but-get').text() === '验证'){
            // console.log('验证')
            let codeVo = {
              code:this.safeCode,
              customerId:localStorage.getItem('id'),
              email:localStorage.getItem('email')
            }
            this.$axios.post('http://' + localStorage.getItem('ipAddress') + ':8082/login/judge',codeVo).then(res =>{
              if (res.data.code !== 0){
                alert(res.data.msg)
              }else {
                alert('验证成功！')
                this.$router.push('/regCus')
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
