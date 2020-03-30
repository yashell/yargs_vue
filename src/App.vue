<template>
  <div id="app" class="allpage">
    <div class="main">
      <!-- <div @click="ss" style>点我相机</div>
  <div @click="geolocation" style>获取经纬度</div>
     <div @click="vibration" >点我震动</div>
     <div @click="getcode">点击扫描二维码</div>

      <button @click="vibrationPattern">PATTERN</button>-->

      <!--
      <div>{{vue}}</div>-->

      <router-view/>


    </div>


   <div class="nav">
       <!--
      <div class="navItem" @click="nav(0)">
        <img v-if="img0" src="./assets/images/nav1.png">
        <img v-else src="./assets/images/nav1_active.png">
        首页
      </div>
      <div class="navItem" @click="nav(1)">
        <img v-if="img1" src="./assets/images/nav2.png">
        <img v-else src="./assets/images/nav2_active.png">
        出行
      </div>
      <div class="navItem" @click="nav(2)">
        <img v-if="img2" src="./assets/images/nav3.png">
        <img v-else src="./assets/images/nav3_active.png">
        资讯
      </div>
      <div class="navItem" @click="nav(3)">
        <img v-if="img3" src="./assets/images/nav4.png">
        <img v-else src="./assets/images/nav4_active.png">
        个人
      </div>
     -->
      <router-link class="navItem" to="/" ><img src="./assets/images/nav1.png">首页11</router-link>
      <router-link class="navItem" to="/map" ><img src="./assets/images/nav2.png">出行</router-link>
      <router-link class="navItem" to="/info"><img src="./assets/images/nav3.png">资讯</router-link>
      <router-link class="navItem" to="/user"><img src="./assets/images/nav4.png">个人</router-link>


     </div>
  </div>
</template>

<script>
import Vue from "vue";
import store from "@/store.js";
export default {
  store,
  data: function() {
    return {
      cordova: Vue.cordova,
      vue: store.state.HTTP,

      img0: false,
      img1: true,
      img2: true,
      img3: true
    };
  },
  methods: {
    nav: function(e) {
      for (let i = 0; i < 4; i++) {

        if (e == 0) {
          this.$router.push({ path: "/" });
           this.img0= false;
            this.img1= true;
            this.img2= true;
            this.img3= true;


        } else if (e == 1) {
          this.$router.push({ path: "/map" });
          this.img0= true;
            this.img1= false;
            this.img2= true;
            this.img3= true;
        } else if (e == 2) {
          this.$router.push({ path: "/info" });
          this.img0= true;
            this.img1= true;
            this.img2= false;
            this.img3= true;
        } else if (e == 3) {
          this.$router.push({ path: "/user" });
          this.img0= true;
            this.img1= true;
            this.img2= true;
            this.img3= false;
        }
      }
    },

    ss: function() {
      this.vue = Vue.cordova.camera;
      console.log(Vue);
      if (!Vue.cordova.camera) {
        window.alert("Vue.cordova.camera not found !");
        return;
      }
      Vue.cordova.camera.getPicture(
        imageURI => {
          window.alert("Photo URI : " + imageURI);
        },
        message => {
          window.alert("FAILED : " + message);
        },
        {
          quality: 50,
          destinationType: Vue.cordova.camera.DestinationType.FILE_URI
        }
      );
    },
    vibration: function() {
      navigator.vibrate(3000);
    },
    vibrationPattern: function() {
      let pattern = [1000, 1000, 1000, 1000];
      navigator.vibrate(pattern);
    },
    geolocation: function() {
      var options = {
        enableHighAccuracy: true,
        maximumAge: 3600000
      };

      navigator.geolocation.getCurrentPosition(
        onSuccess => {
          window.alert(
            "Photo URI : " +
              onSuccess.coords.latitude +
              "|" +
              onSuccess.coords.longitude
          );
        },
        onError => {
          window.alert("FAILED : " + onError);
        },
        options
      );
    },

    getcode() {
      store.state.HTTP = "www.baidu.com";
      this.vue = store.state.HTTP;
    }
  },




};
</script>

<style lang="scss" scoped>
.x {
}
</style>
