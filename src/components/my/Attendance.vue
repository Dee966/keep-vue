<template>
  <div id="attendance">
    <div style="position: fixed;top: 0;width: 100%;height: 40px;padding-top: 8px;">
      <el-page-header @back="goBack" content="考勤查询">
      </el-page-header>
    </div>
    <div id="ch-date">
      开始日期：<el-date-picker
        v-model="value1"
        type="date"
        placeholder="选择日期"
        style="margin-top: 15%"
      >
      </el-date-picker>
      <br>
      结束日期：<el-date-picker
        v-model="value2"
        type="date"
        placeholder="选择日期"
      >
      </el-date-picker>
      <el-button type="primary" @click="checkAttendance()">查询</el-button>
    </div>
    <br>


    <el-table
      :data="tableData"
      border
      style="width: 100%;">
      <el-table-column
        prop="start"
        label="起始">
      </el-table-column>
      <el-table-column
        prop="end"
        label="结束">
      </el-table-column>
      <el-table-column
        prop="attendant"
        label="日期"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "Attendance",
    data(){
      return{
        tableData:[],
        value1:'',
        value2:''
      }
    },
    methods:{
      goBack() {
        this.$router.go(-1);//返回上一层
      },
      listAttendance(){
        this.$axios.get('http://'+localStorage.getItem('ipAddress')+':8082/coach/list_time/'+localStorage.getItem('userId')).then(res =>{
          if (res.data.code !== 0 ){
            alert(res.data.msg)
            return
          }
          for (let i = 0;i < res.data.data.length;i ++){
            res.data.data[i].start = this.timestampToTime2(res.data.data[i].start)
            res.data.data[i].end = this.timestampToTime2(res.data.data[i].end)
            res.data.data[i].attendant = this.timestampToTime(res.data.data[i].attendant)
          }
          this.tableData = res.data.data
        }).catch(err =>{
          alert('系统错误')
        })
      },
      checkAttendance(){
        console.log(parseInt(this.value1.getTime()))
        console.log(parseInt(this.value2.getTime()))
        let attendanceVo = {
          id:localStorage.getItem('userId'),
          start:parseInt(this.value1.getTime()),
          end:parseInt(this.value2.getTime())
        }
        console.log(attendanceVo)
        this.$axios.post('http://'+localStorage.getItem('ipAddress')+':8082/coach/list_date/',attendanceVo).then(res =>{
          if (res.data.code !== 0 ){
            alert(res.data.msg)
            return
          }
          console.log(res.data.data)
          for (let i = 0;i < res.data.data.length;i ++){
            res.data.data[i].start = this.timestampToTime2(res.data.data[i].start)
            res.data.data[i].end = this.timestampToTime2(res.data.data[i].end)
            res.data.data[i].attendant = this.timestampToTime(res.data.data[i].attendant)
          }
          this.tableData = res.data.data
        }).catch(err =>{
          alert('系统错误')
        })
      },
      timestampToTime:function (timestamp) {
        let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
        let strDate = Y+M+D;
        return strDate;
      },
      timestampToTime2:function (timestamp) {
        let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let H = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()) + ' ';
        let strDate = H+m+s;
        return strDate;
      }
    },
    mounted() {
      this.listAttendance()
    }
  }
</script>

<style scoped>
#ch-date{
  width: 100%;
}
</style>
