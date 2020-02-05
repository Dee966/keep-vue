<template>
    <div id="res-coach">
      <br>
      <el-input type="text" v-model="username" placeholder="用户名" style="width: 50%"></el-input><br><br>
      <el-input type="password" v-model="password" placeholder="密码" style="width: 50%"></el-input><br><br>
      <el-input type="text" v-model="name" placeholder="姓名" style="width: 50%"></el-input><br><br>
      <el-input type="text" v-model="email" placeholder="邮箱" style="width: 50%"></el-input><br><br>
      <el-input type="text" v-model="telephone" placeholder="手机" style="width: 50%"></el-input><br><br>
      <el-input type="text" v-model="sex" placeholder="性别" style="width: 25%"></el-input>&nbsp;
      <el-input type="text" v-model="age" placeholder="年龄" style="width: 25%"></el-input><br><br>
      <el-input type="text" v-model="tall" placeholder="身高" style="width: 25%"></el-input>&nbsp;
      <el-input type="text" v-model="weight" placeholder="体重" style="width: 25%"></el-input><br><br>
      <el-input type="text" v-model="workExperience" placeholder="工作经验" style="width: 50%"></el-input><br><br>
      <el-input type="text" v-model="title" placeholder="头衔" style="width: 50%"></el-input>&nbsp;&nbsp;<br><br>

      <form id="upload_img" enctype="multipart/form-data">
        上传教练照片：<input type="file" id="img" name="img">
      </form>
      <br>
      <el-button type="primary" plain @click="regCoach()" id="but-get">注册</el-button>
      <br><br>
    </div>
</template>

<script>
    export default {
        name: "ResCoach",
      data(){
          return{
            username:'',
            password:'',
            name:'',
            email:'',
            telephone:'',
            sex:'',
            age:'',
            tall:'',
            weight:'',
            workExperience:'',
            title:'',
            img:''
          }
      },
      methods:{
        regCoach(){
          let formData = new FormData($('#upload_img')[0]);
          let config = {
            headers:{'Content-Type':'multipart/form-data'}
          };
          this.$axios.post('http://' + localStorage.getItem('ipAddress') + ':8082/manager/coach_img',formData,config).then(res =>{
            if (res.data.code !== 0){
              alert(res.data.msg)
              return
            }
            this.img = res.data.data
            let registerVo = {
              username:this.username,
              password:this.password,
              name:this.name,
              email:this.email,
              telephone:this.telephone,
              sex:this.sex,
              age:this.age,
              tall:this.tall,
              weight:this.weight,
              workExperience:this.workExperience,
              title:this.title,
              workTime:new Date(),
              img:this.img,
              managerId:localStorage.getItem('userId')
            }
            this.$axios.post('http://' + localStorage.getItem('ipAddress') + ':8082/login/reg_coach',registerVo).then(res =>{
              if (res.data.code !== 0){
                alert(res.data.msg)
                return
              }
              localStorage.setItem('email',this.email)
              localStorage.setItem('id',res.data.data)
              console.log(res.data.data)
              alert('注册成功!')
              this.$router.go(0);
            }).catch(err =>{
              alert('系统错误')
            })
          }).catch(err =>{
            alert('注册失败，请联系系统管理员')
          })
        },
      }
    }
</script>

<style scoped>

</style>
