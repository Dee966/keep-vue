<template>
  <div id="share">
    <div style="position: fixed;top: 0;width:100%;height: 40px;padding-top: 8px;display: flex;justify-content: space-between">
      <el-page-header @back="goBack" content="大保圈">
      </el-page-header>
      <router-link to="/postShare">
        <span style="font-size: 30px;margin-right: 5px"><i class="el-icon-camera-solid"></i></span>
      </router-link>
    </div>
    <img src="/static/img/share.jfif" style="width: 100%;height: 250px;margin-bottom: 5px">

    <div v-for="(share,i) in shares" :key="i">
      <div id="share-content">
        <span style="color: #448aff">分享人：{{share.name}}</span>
        <span style="float: right;color: #d0d1d4" @click="dialogVisible = true,shareId = share.shareId" v-if="share.name == name">删除</span>
        <p>{{share.content}}</p>
        <el-row v-if="share.firImg != ''">
          <el-col :span="8" v-if="share.firImg != ''">
            <div class="grid-content bg-purple">
              <img :src="share.firImg" alt="" style="height: 120px;">
            </div>
          </el-col>
          <el-col :span="8" v-if="share.secImg != ''">
            <div class="grid-content bg-purple-light">
              <img :src="share.secImg" alt="" style="height: 120px;">
            </div>
          </el-col>
          <el-col :span="8" v-if="share.thiImg != ''">
            <div class="grid-content bg-purple">
              <img :src="share.thiImg" alt="" style="height: 120px;">
            </div>
          </el-col>
        </el-row>
        <br>
        <span style="color: #d0d1d4">{{timestampToTime(share.shareTime)}}</span>
        <br>
        <div style="margin-left: 78%;font-size: 20px">
          <i class="el-icon-chat-dot-round" @click="toComment(share.shareId)"></i>&nbsp;&nbsp;
          <i :id=share.shareId class="el-icon-star-off" @click="like(share.shareId)"></i>&nbsp;<span :id=praise+share.shareId style="font-size: 15px">{{share.praise}}</span>
        </div>
      </div>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="100%"
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
    name: "Share",
    data() {
      return {
        msg:'大保圈',
        shares:[],
        praise:'p',
        name:'',
        shareId:0,
        dialogVisible:false
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1);//返回上一层
      },
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
      toComment(id) {
        console.log(id)
        this.$router.push('/comment/' + id)
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
      like(id) {
        let num = document.getElementById(this.praise+id).innerHTML

        let className = document.getElementById(id).className
        if (className === 'el-icon-star-off') {
          this.$axios.put('http://' + localStorage.getItem('ipAddress') + ':8082/customer/praise', {
            judge: 0,
            shareId: id
          }).then(res => {
            if (res.data.code !== 0) {
              alert(res.data.msg)
            }
            className = document.getElementById(id).className = 'el-icon-star-on'
            num = parseInt(num) + 1
            document.getElementById(this.praise+id).innerHTML = num
          }).catch(err => {
            alert('系统错误')
          })
        } else {
          this.$axios.put('http://' + localStorage.getItem('ipAddress') + ':8082/customer/praise', {
            judge: 1,
            shareId: id
          }).then(res => {
            if (res.data.code !== 0) {
              alert(res.data.msg)
            }
            className = document.getElementById(id).className = 'el-icon-star-off'
            num = parseInt(num) - 1
            document.getElementById(this.praise+id).innerHTML = num
          }).catch(err => {
            alert('系统错误')
          })
        }
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
      }
    },
    mounted() {
      this.listShare()
      this.name = localStorage.getItem('name')
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
