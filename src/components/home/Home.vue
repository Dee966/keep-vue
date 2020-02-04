<template>
    <div id="home">
      <div style="position: fixed;top: 0;width: 100%;height: 40px;padding-top: 8px;">
        <el-page-header @back="goBack" content="主页">
        </el-page-header>
      </div>

      <section class="my-swiper" style="margin-top: 56px">
        <swiper v-if="items.length>1" :options="swiperOption" style="width: 100%;height: 200px">
          <swiper-slide  class="my-swp-silde" v-for="(slide, key) in items" :key="key" data-id="slide.id">
              <img class="my-swp-img" :src="slide.img" alt="" style="width: 100%;height: 200px" >
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </section>

      <br>
      <h2 style="padding-left: 20px">欢迎来到大保健身房！</h2>
      <br>

      <router-link :to="{name:'shareLink'}">
        <el-row style="margin: 20px 20px 0px 20px;background-color: #fcfcfc">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <img src="/static/img/share.jfif" alt="" width="70px" height="70px">
            </div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light">
              <h3>进入大保圈</h3>
            </div>
          </el-col>
        </el-row>
      </router-link>


      <div @click="toMy()">
        <el-row style="margin: 20px 20px 0px 20px;background-color: #fcfcfc" >
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <img src="/static/img/person.jfif" alt="" width="70px" height="70px">
            </div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple-light">
              <h3 style="color: #448aff">个人中心</h3>
            </div>
          </el-col>
        </el-row>
      </div>



    </div>
</template>

<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import 'swiper/dist/css/swiper.min.css'
    export default {
        name: "Home",
      data(){
          return{
            swiperOption: {
              loop:true,
              autoplay: {
                disableOnInteraction: false,  // 用户操作swiper之后，是否禁止autoplay
                delay: 2000, // 自动切换的时间间隔（单位ms）
              },
              speed: 1500,
              initialSlide: 0,
              loop: true,
              pagination: { el: '.swiper-pagination' }, // 分页按钮
              paginationClickable: true,
              onSlideChangeEnd: swiper => {
                //console.log('onSlideChangeEnd', swiper.realIndex)
              },
              user:''
            },
            items: [
              {img:'/static/img/banner1.jfif'},
              {img:'/static/img/banner2.jfif'}
            ],
            typeClass:'md-elevation-'
          }
      },
      components:{
          swiper,swiperSlide
      },
      methods:{
        goBack() {
          this.$router.go(-1);//返回上一层
        },
        toMy(){
          if (this.user === '会员'){
            this.$router.push('/my')
          } else if (this.user === '教练'){
            this.$router.push('/coachMy')
          } else{
            alert('系统错误')
            return
          }
        }
      },
      mounted() {
          this.user = localStorage.getItem('user')
      }
    }
</script>

<style scoped>

</style>
