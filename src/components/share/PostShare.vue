<template>
    <div id="share">
      <div style="position: fixed;top: 0;width: 100%;height: 40px;padding-top: 8px;display: flex;justify-content: space-between">
        <el-page-header @back="goBack" content="分享">
        </el-page-header>
        <el-button type="success" style="padding-top: 8px" @click="postShare()">发表</el-button>
      </div>

      <div style="margin: 50px 0px 10px 0px">
        <el-input
          type="textarea"
          :rows="6"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>


      </div>
      <form id="share_form" method="post" enctype="multipart/form-data" ref="uploadform">
        <input type="file" id="picture1" name="picture" multiple="multiple" style="display: none" @change="changePic1()">
        <img :src="uploadImg" style="width: 80px;height: 80px;" id="img1" @click="clickPic1()">
        <img src="" style="width: 80px;height: 80px;display: none" id="preview1">

        <input type="file" id="picture2" name="picture" multiple="multiple" style="display: none" @change="changePic2()">
        <img :src="uploadImg"  style="width: 80px;height: 80px;display: none" id="img2" @click="clickPic2()">
        <img src="" style="width: 80px;height: 80px;display: none" id="preview2">

        <input type="file" id="picture3" name="picture" multiple="multiple" style="display: none" @change="changePic3()">
        <img :src="uploadImg"  style="width: 80px;height: 80px;display: none" id="img3" @click="clickPic3()">
        <img src="" style="width: 80px;height: 80px;display: none" id="preview3">
        <input type="hidden" id="content" name="content">
        <input type="hidden" id="name" name="name">
        <input type="hidden" id="praise" name="praise">
        <input type="hidden" id="share-time" name="shareTime">
      </form>
      <a :href="this.ipAddress" id="move-share" style="color: white;float: right">m</a>
    </div>
</template>

<script>
  export default {
    name: "PostShare",
    data() {
      return {
        textarea: '',
        firImg: '',
        secImg: '',
        thiImg: '',
        ipAddress:'',
        uploadImg:'./static/img/pic04.jpg'
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      postShare() {
        $('#content').val(this.textarea)
        $('#name').val(localStorage.getItem('name'))
        $('#praise').val(0)
        $('#share-time').val(new Date())
        let formData = new FormData($('#share_form')[0]);//获取表单中的文件
        console.log(formData)
        $.ajax({
          url:'http://'+localStorage.getItem('ipAddress')+':8082/manager/upload/',//后台的接口地址
          type:"post",//post请求方式
          data:formData,//参数
          cache: false,
          processData: false,
          contentType: false,
          success:function (res) {
            if (res.code !== 0){
              alert(res.msg)
            }
            alert('分享成功')
            history.back()
          }
        })
      },
      clickPic1() {
        $("#picture1").click()
      },
      changePic1() {
        // let objUrl = this.getObjectURL(this.files[0]) ;//获取文件信息
        let objUrl = this.getObjectURL($('#picture1')[0].files[0]) ;//获取文件信息
        console.log("objUrl = "+objUrl);
        if (objUrl) {
          document.getElementById("preview1").style.display="";
          document.getElementById("img1").style.display="none";
          document.getElementById("img2").style.display="";
          $("#preview1").attr("src", objUrl);
        }
      },
      clickPic2(){
        $("#picture2").click()
      },
      changePic2(){
        let objUrl = this.getObjectURL($('#picture2')[0].files[0]) ;//获取文件信息
        console.log("objUrl = "+objUrl);
        if (objUrl) {
          document.getElementById("preview2").style.display="";
          document.getElementById("img2").style.display="none";
          document.getElementById("img3").style.display="";
          $("#preview2").attr("src", objUrl);
        }
      },
      clickPic3(){
        $("#picture3").click()
      },
      changePic3(){
        let objUrl = this.getObjectURL($('#picture3')[0].files[0]) ;//获取文件信息
        console.log("objUrl = "+objUrl);
        if (objUrl) {
          document.getElementById("preview3").style.display="";
          document.getElementById("img3").style.display="none";
          // document.getElementById("img3").style.display="";
          $("#preview3").attr("src", objUrl);
        }
      },
      getObjectURL(file) {
        let url = null;
        if (window.createObjectURL !== undefined) {
          url = window.createObjectURL(file);
        } else if (window.URL !== undefined) { // mozilla(firefox)
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL !== undefined) { // webkit or chrome
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      }
    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>
