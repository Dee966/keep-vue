<template>
    <div id="my">
      <div style="position: fixed;top: 0;width: 100%;height: 40px;padding-top: 8px;">
        <el-page-header @back="goBack" content="个人中心">
        </el-page-header>
      </div>


      <div class="my-card">
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">
            <img :src="img" alt="" style="width: 80px;height: 80px;margin-top: 92%;margin-left: 2%">
            <div style="margin: 2%;color: #e5e9f2">{{customer.name}}</div>
          </div></el-col>
          <el-col :span="16">
            <div class="grid-content bg-purple-light" style="margin-top: 50%;color:#e5e9f2;">
            <div><em>email:{{customer.email}}</em></div>
            <div><em>加入时间：{{timestampToTime(customer.joinTime)}}</em></div>
            <div><em>剩余次数：{{customer.times}}次</em></div>
          </div>
          </el-col>
        </el-row>
      </div>

      <div class="my-list" style="margin-top: 10%" @click="moveUpdPass()">
        <span>修改密码</span>
      </div>
      <div class="my-list" @click="dialogVisible = true">
        <span>修改个人信息</span>
      </div>
      <div class="my-list" @click="dialogVisible1 = true">
        <span>查看教练</span>
      </div>
      <router-link :to="{name:'chCoachLink'}" style="color: rgba(0,0,0,0.87)">
        <div class="my-list">
          <span>选择教练</span>
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
        <el-input type="text" v-model="customer.name" placeholder="姓名" style="margin-bottom: 5px"></el-input>
        <el-input type="text" v-model="customer.sex" placeholder="性别" style="margin-bottom: 5px"></el-input>
        <el-input type="text" v-model="customer.age" placeholder="年龄" style="margin-bottom: 5px"></el-input>
        <el-input type="text" v-model="customer.tall" placeholder="身高" style="margin-bottom: 5px"></el-input>
        <el-input type="text" v-model="customer.weight" placeholder="体重" style="margin-bottom: 5px"></el-input>
        <el-input type="text" v-model="customer.telephone" placeholder="手机号码" style="margin-bottom: 5px"></el-input>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false,updateInfo()">修 改</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="我的教练："
        :visible.sync="dialogVisible1"
        width="100%"
      >
<!--        {{customer.coachDto.img}}-->
        <el-row style="height: 80px">
          <el-col :span="8"><div class="grid-content bg-purple">
            <img :src=coach.img alt="" style="width: 80px;height: 80px;">
          </div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light">
            <div>姓名：{{coach.name}}</div>
            <br>
            <div>身高：{{coach.tall}}</div>
<!--            <div>手机号码：{{coach.telephone}}</div>-->
          </div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">
            <div>性别：{{coach.sex}}</div>
            <br>
            <div>体重：{{coach.weight}}</div>
          </div></el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple" style="height: 80px;width: 80px;">

            </div>
          </el-col>
          <el-col :span="16"><div class="grid-content bg-purple-light">
            <div>手机号码：{{coach.telephone}}</div><br>
            <div>邮箱：{{coach.email}}</div><br>
            <div>执教经验：{{coach.workExperience}}</div><br>
            <div>头衔：{{coach.title}}</div>
          </div></el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">返 回</el-button>
<!--        <el-button type="primary" @click="dialogVisible1 = false,showCoach()">修 改</el-button>-->
        </span>
      </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "My",
      data(){
          return{
            realName:'',
            sex:'',
            age:'',
            tall:'',
            weight:'',
            telephone:'',
            email:'',
            img:'/static/img/heard.jfif',
            dialogVisible:false,
            customer:{},
            dialogVisible1:false,
            // coachImg:'',
            coach:{}
          }
      },
      methods:{
        goBack() {
          this.$router.go(-1);//返回上一层
        },
        getCustomer(){
          this.$axios.get('http://'+localStorage.getItem('ipAddress')+':8082/customer/info/'+localStorage.getItem('userId')).then(res =>{
            console.log(res.data)
            if (res.data.code !== 0){
              alert(res.data.msg)
              return
            }
            this.customer = res.data.data
            this.email = this.customer.email
            // this.coach = res.data.data.coachDto
            if (res.data.data.coachDto === null){
              this.coach = {img:''}
            } else {
              this.coach = res.data.data.coachDto
            }
            // this.coachImg = this.coach.img
            console.log(this.customer)
            // this.coachImg = this.customer.coachDto.img
            // this.coach = this.customer.coachDto
          }).catch(err =>{
            alert('系统错误')
          })
        },
        updateInfo(){
          let customerVo = {
            name: this.coach.name,
            sex: this.coach.sex,
            age: this.coach.age,
            tall: this.coach.tall,
            weight: this.coach.weight,
            telephone: this.coach.telephone
          }
          console.log(customerVo)
          this.$axios.put('http://'+localStorage.getItem('ipAddress')+':8082/customer/info/'+localStorage.getItem('userId'),customerVo).then(res =>{
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
        moveUpdPass(){
          localStorage.setItem('email',this.email)
          this.$router.push('/updPass')
        },
        timestampToTime:function (timestamp) {
          let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          let Y = date.getFullYear() + '-';
          let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          let D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
          let strDate = Y+M+D;
          return strDate;
        },
        quitLogin(){
          localStorage.setItem('token','')
          localStorage.setItem('userId','')
          localStorage.setItem('name','')
          localStorage.setItem('user','')
          this.$router.push('/login')
        }
      },
      mounted() {
        this.getCustomer();
      }
    }
</script>

<style scoped>
  .my-list{
    width: 100%;
    height: 55px;
    /*background-color: green;*/
    padding: 16px 16px 8px 16px;
    font-size: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)

  }
  .my-card{
    margin-top: 10%;
    width: 100%;
    height: 220px;
    background-color: #448aff;
  }
</style>
