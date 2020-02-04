<template>
    <div id="comment">
      <div style="position: fixed;top: 0;width: 100%;height: 40px;padding-top: 8px;display: flex;justify-content: space-between">
        <el-page-header @back="goBack" content="评论">
        </el-page-header>
        <el-button type="success" style="padding-top: 8px" @click="postComment()">发表</el-button>
      </div>
      <div style="margin: 50px 0px 10px 0px">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>

      </div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">评论</el-menu-item>
      </el-menu>
      <br>
      <div id="show-comment" v-for="(comment,i) in comments" :key="i">
        <span style="color: #3b4151e3">{{comment.name}}：</span>
        <br>
        <p>{{comment.content}}</p>
        <div style="margin-left: 90%" @click="dialogVisible = true,commentId = comment.commentId" v-if="comment.name == name">删除</div>
      </div>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="100%"
      >
        <span>确定要删除这条评论吗？</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="danger" @click="dialogVisible = false,delComment(commentId)">确 定</el-button>
        </span>
      </el-dialog>

    </div>
</template>

<script>
  export default {
    name: "Comment",
    data() {
      return{
        shareId:0,
        comments:[],
        textarea: '',
        activeIndex:'1',
        dialogVisible: false,
        commentId:0,
        name:''
      }
    },
    methods:{
      goBack() {
        this.$router.go(-1);//返回上一层
      },
      listComment(){
        this.$axios.get('http://'+localStorage.getItem('ipAddress')+':8082/customer/comment/'+this.shareId).then(res =>{
          if (res.data.code !== 0){
            console.log(res.data.msg)
          }
          this.comments = res.data.data
          console.log(this.comments)
        }).catch(err =>{
          alert("系统错误")
        })
      },
      postComment(){
        let commentVo = {
          commentId:0,
          content:this.textarea,
          shareId:this.shareId,
          name:localStorage.getItem('name')
        }
        this.$axios.post('http://'+localStorage.getItem('ipAddress')+':8082/customer/comment',commentVo).then(res =>{
          if (res.data.code !== 0){
            alert(res.data.msg)
          }
          alert('评论成功')
          this.$router.go(0);
        }).catch(err =>{
          alert('系统错误')
        })
      },
      delComment(id){
        this.$axios.delete('http://'+localStorage.getItem('ipAddress')+':8082/customer/comment/'+id).then(res =>{
          if (res.data.code !== 0){
            alert(res.data.msg)
          }
          this.$router.go(0);
        }).catch(err =>{
          alert('系统错误')
        })
      }

    },

    mounted() {
      this.shareId = this.$route.params.id
      this.listComment()
      this.name = localStorage.getItem('name')
    }
  }
</script>

<style scoped>
  #show-comment{
    margin: 0px 10px;
    border-bottom: solid 1px #d0d1d4;;
  }
</style>
