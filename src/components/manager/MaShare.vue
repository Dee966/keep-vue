<template>
    <div id="ma-share">
      <div v-for="(share,i) in shares" :key="i">
        <div id="share-content">
          <span style="color: #448aff">分享人：{{share.name}}</span>
          <span style="float: right;color: #d0d1d4" @click="dialogVisible = true,shareId = share.shareId">删除</span>
          <p>{{share.content}}</p>
          <el-row v-if="share.firImg != ''">
            <el-col :span="8" v-if="share.firImg != ''">
              <div class="grid-content bg-purple">
                <img :src="share.firImg" alt="" style="height: 200px;">
              </div>
            </el-col>
            <el-col :span="8" v-if="share.secImg != ''">
              <div class="grid-content bg-purple-light">
                <img :src="share.secImg" alt="" style="height: 200px;">
              </div>
            </el-col>
            <el-col :span="8" v-if="share.thiImg != ''">
              <div class="grid-content bg-purple">
                <img :src="share.thiImg" alt="" style="height: 200px;">
              </div>
            </el-col>
          </el-row>
          <br>
          <span style="color: #d0d1d4">{{timestampToTime(share.shareTime)}}</span>
        </div>
      </div>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%"
      >
        <span>确定要删除这条大保圈吗？</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="dialogVisible = false,delShare(shareId)">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "MaShare",
      data(){
          return{
            shares:[],
            dialogVisible:false
          }
      },
      methods:{
        listShare() {
          this.$axios.get('http://' + localStorage.getItem('ipAddress') + ':8082/customer/listShare').then(res => {
            if (res.data.code) {
              alert(res.data.msg)
            }
            this.shares = res.data.data
            console.log(this.shares)
          }).catch(err => {
            alert('请求失败')
          })
        },
        delShare(id){
          this.$axios.delete('http://' + localStorage.getItem('ipAddress') + ':8082/manager/share/'+id).then(res =>{
            if (res.data.code !== 0){
              alert(res.data.msg)
            }
            alert('删除成功');
            this.$router.go(0);
          }).catch(err =>{
            alert('系统错误')
          })
        },
        timestampToTime: function (timestamp) {
          let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
          let Y = date.getFullYear() + '-';
          let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
          let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
          let H = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
          let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ' ';
          let strDate = Y + M + D + H + m;
          return strDate;
        },
      },
      mounted() {
          this.listShare()
      }
    }
</script>

<style scoped>
  #share-content{
    width: 100%;
    /*height: 250px;*/
    padding: 10px;
    /*background-color: ;*/
    border-bottom: solid 1px #d0d1d4;
  }
</style>
