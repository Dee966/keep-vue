<template>
    <div id="coach-my">
      <div style="position: fixed;top: 0;width: 100%;height: 40px;padding-top: 8px;">
        <el-page-header @back="goBack" content="个人中心">
        </el-page-header>
      </div>

      <div class="my-card">
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">
            <img :src="coach.img" alt="" style="width: 80px;height: 80px;margin-top: 92%;margin-left: 2%">
            <div style="margin: 2%;color: #e5e9f2">{{coach.name}}</div>
          </div></el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light" style="margin-top: 50%;color:#e5e9f2;">
              <div><em>email:{{coach.email}}</em></div>
              <div><em>加入时间：{{timestampToTime(coach.workTime)}}</em></div>
              <div><em>头衔：{{coach.title}}</em></div>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="my-list" @click="dialogVisible = true" style="margin-top: 10%">
        <span>修改个人信息</span>
      </div>
      <div class="my-list" @click="clockIn()">
        <span>打卡</span>
      </div>
      <router-link :to="{name:'attendanceLink'}" style="color: rgba(0,0,0,0.87)">
        <div class="my-list">
          <span>打卡查询</span>
        </div>
      </router-link>


      <div class="my-list" style="margin-top: 5%" @click="quitLogin()">
        <span>退出登录</span>
      </div>
      <el-dialog
        title="修改个人信息："
        :visible.sync="dialogVisible"
        width="100%"
      >
        <el-input type="text" v-model="coach.name" placeholder="姓名" style="margin-bottom: 5px"></el-input>
        <el-input type="text" v-model="coach.age" placeholder="年龄" style="margin-bottom: 5px"></el-input>
        <el-input type="text" v-model="coach.tall" placeholder="身高" style="margin-bottom: 5px"></el-input>
        <el-input type="text" v-model="coach.weight" placeholder="体重" style="margin-bottom: 5px"></el-input>
        <el-input type="text" v-model="coach.telephone" placeholder="手机号码" style="margin-bottom: 5px"></el-input>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false,updateInfo()">修 改</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "CoachMy",
      data(){
          return{
            img:'/static/img/heard.jfif',
            coach:{},
            dialogVisible:false
          }
      },
      methods:{
        goBack() {
          this.$router.go(-1);//返回上一层
        },
        moveUpdPass(){
          localStorage.setItem('email',this.email)
          this.$router.push('/updPass')
        },
        quitLogin(){
          localStorage.setItem('token','')
          localStorage.setItem('userId','')
          localStorage.setItem('name','')
          localStorage.setItem('user','')
          this.$router.push('/login')
        },
        updateInfo(){
          let coachVo = {
            name: this.coach.name,
            age: this.coach.age,
            tall: this.coach.tall,
            weight: this.coach.weight,
            telephone: this.coach.telephone
          }
          this.$axios.put('http://'+localStorage.getItem('ipAddress')+':8082/coach/info/'+localStorage.getItem('userId'),coachVo).then(res =>{
            if (res.data.code !== 0){
              alert(res.data.msg)
              return
            }
            alert('修改成功')
            this.$router.go(0);
          }).catch(err =>{
            alert('系统错误')
          })
        },
        clockIn(){
          let clockInVo = {
            clockInTime:new Date(),
            coachId:localStorage.getItem('userId')
          }
          this.$axios.post('http://'+localStorage.getItem('ipAddress')+':8082/coach/clock_in',clockInVo).then(res =>{
            if (res.data.code !== 0){
              alert(res.data.msg)
              return
            }
            alert('打卡成功')
          }).catch(err =>{
            alert('系统错误')
          })
        },
        getCoach(){
          this.$axios.get('http://'+localStorage.getItem('ipAddress')+':8082/coach/info/'+localStorage.getItem('userId')).then(res =>{
            if (res.data.code !== 0){
              alert(res.data.msg)
              return
            }
            this.coach = res.data.data
            console.log(this.coach)
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
      },
      mounted() {
          this.getCoach()
      }
    }
</script>

<style scoped>
  .my-card{
    margin-top: 10%;
    width: 100%;
    height: 220px;
    background-color: #448aff;
  }
  .my-list{
    width: 100%;
    height: 55px;
    /*background-color: green;*/
    padding: 16px 16px 8px 16px;
    font-size: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)

  }
</style>
