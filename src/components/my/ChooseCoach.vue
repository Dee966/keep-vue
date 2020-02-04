<template>
  <div id="choose-coach">
    <div style="position: fixed;top: 0;width: 100%;height: 40px;padding-top: 8px;">
      <el-page-header @back="goBack" content="选择教练">
      </el-page-header>
    </div>
    <div style="font-size: 13px;color: #999;margin-top: 50px"  v-for="(coach,i) in coaches" :key="i">
      <div class="grid-content bg-purple coach-card"  @click="dialogVisible = true,coachId = coach.coachId">
        <img :src=coach.img style="height: 70%;width: 100%">
        <div>教练：{{coach.name}}</div>
        <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">身高：{{coach.tall}}</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple-light">体重：{{coach.weight}}</div></el-col>
        </el-row>
        <div>执教经验：{{coach.workExperience}}</div>
        <div>头衔：{{coach.title}}</div>
      </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="100%"
    >
      <span>确定要选择这位教练吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="success" @click="dialogVisible = false,chCoach(coachId)">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "ChooseCoach",
    data(){
      return{
        coaches:[],
        dialogVisible:false,
        coachId:0
      }
    },
    methods:{
      goBack() {
        this.$router.go(-1);//返回上一层
      },
      listCoach(){
        this.$axios.get('http://'+localStorage.getItem('ipAddress')+':8082/coach/list_coach/').then(res =>{
          if (res.data.code !== 0){
            alert(res.data.msg)
            return
          }
          this.coaches = res.data.data
        }).catch(err =>{
          alert('系统错误')
        })
      },
      chCoach(id){
        let chCoachVo = {
          customerId:localStorage.getItem('userId'),
          coachId:id
        }
        this.$axios.put('http://'+localStorage.getItem('ipAddress')+':8082/customer/choose',chCoachVo).then(res =>{
          if (res.data.code !== 0){
            alert(res.data.msg)
            return
          }
          alert('选择教练成功！')
        })
      }
    },
    mounted() {
      this.listCoach()
    }
  }
</script>

<style scoped>
.coach-card{
  width: 95%;
  height: 300px;
  padding: 5px 10px;
  border-radius: 4px;
  border: solid #999;
  margin-top: 20px;
  margin-left: 10px
}
</style>
