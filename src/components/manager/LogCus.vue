<template>
    <div id="log-cus">
      <el-input v-model="input" placeholder="手机号码" style="width: 30%;margin: 10px 0px"></el-input>&nbsp;&nbsp;&nbsp;
      <el-button type="primary" plain @click="getCus()">查找</el-button>

      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="手机号码">
        </el-table-column>
        <el-table-column
          prop="times"
          label="次数">
        </el-table-column>
        <el-table-column
          prop="joinTime"
          label="加入时间">
        </el-table-column>
      </el-table>
      <el-button type="success" plain style="float: right;margin-top: 10px" @click="updateCusTimes()">登记</el-button>
    </div>
</template>

<script>
    export default {
        name: "LogCus",
      data(){
          return{
            input:'',
            tableData:[],
            cusId:0
          }
      },
      methods:{
        getCus(){
          this.$axios.get('http://'+localStorage.getItem('ipAddress')+':8082/manager/'+this.input).then(res =>{
            if (res.data.code !== 0){
              alert(res.data.msg)
              this.tableData = []
              return
            }
            this.cusId = res.data.data.customerId
            let table = [res.data.data]
            this.tableData = table
            console.log(table)
          }).catch(err =>{
            alert('系统错误')
          })
        },
        updateCusTimes(){
          this.$axios.put('http://'+localStorage.getItem('ipAddress')+':8082/manager/update/'+this.cusId).then(res =>{
            if (res.data.code !== 0){
              alert(res.data.msg)
              return
            }
            this.getCus()
          })
        }
      }
    }
</script>

<style scoped>

</style>
