<template>
    <div id="ip">
      <el-input v-model="input" placeholder="请输入服务器ip"></el-input>
      <el-button icon="el-icon-check" circle @click="saveIp()"></el-button>
    </div>
</template>

<script>
    export default {
        name: "Ip",
      data(){
          return{
            input:''
          }
      },
      methods:{
          saveIp(){
            localStorage.setItem('ipAddress',this.input)
            this.$router.push('/login')
          }
      }
    }
</script>

<style scoped>
#ip{
  display: flex;
  justify-content: start;
  margin: 0px 5px;
}
</style>
