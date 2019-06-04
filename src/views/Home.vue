<template>
  <div class="page">
    <HeadMain :msg=haha />
   
   <div class="mainDiv">
    <div class="swiper-container">
    <div class="swiper-wrapper">
        <div v-for="(item) in imgList" :key="item" class="swiper-slide">
          <img class="swiper-slide" :src="item">
        </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <!-- <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div> -->
    <!-- 如果需要滚动条 -->
    <div class="swiper-scrollbar"></div>
  </div>




    <div class="index_horiroll">
      <ul>
        <img class="index_horiroll_item" src="../assets/images/lo_1.png">
        <img class="index_horiroll_item" src="../assets/images/lo_2.png">
        <img class="index_horiroll_item" src="../assets/images/lo_3.png">
        <img class="index_horiroll_item" src="../assets/images/lo_4.png">
        <img class="index_horiroll_item" src="../assets/images/lo_5.png">
        <img class="index_horiroll_item" src="../assets/images/lo_6.png">
      </ul>
    </div>


   </div>


   
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" @ListenToChildEvent="bb"/>
    {{haha}} -->
  </div>
</template>

<script>
import store from '@/store.js';
// import HelloWorld from "@/components/HelloWorld.vue";
import HeadMain from "@/components/HeadMain.vue";



import Swiper from "swiper"
import 'swiper/dist/css/swiper.min.css';


export default {
  store,
  name: "home",
  data: function() {
    return {
      haha: store.state.AppName,
       imgList: [require("../assets/images/swiper1.jpg"),require("../assets/images/swiper2.jpg"),require("../assets/images/swiper3.jpg"),require("../assets/images/swiper4.jpg")],
    };
  },
  components: {
    // HelloWorld,
    HeadMain

  },
    mounted(){
  new Swiper('.swiper-container', {
        
    //  // 如果需要分页器
  // 如果需要分页器
    pagination: '.swiper-pagination',
    
    // 如果需要前进后退按钮
    // nextButton: '.swiper-button-next',
    // prevButton: '.swiper-button-prev',
    
    // 如果需要滚动条
    // scrollbar: '.swiper-scrollbar',
 autoplay : 3000,
   loop : true,
     speed:2000,


    autoplayDisableOnInteraction: true,  // 用户操作swiper之后，是否禁止autoplay，默认为true
  })
},
  methods: {
    bb: function(data) {
      this.haha = data;
      console.log(data);
    }
  }
};
</script>
<style lang="scss" scoped>
.x {
}
</style>
