<template>
  <div class="page">
    <div class="user_main_info">

     
        <img  class="user_photo" src="../assets/images/user_photo.png">
        冷然

        <!-- <router-link class="user_main_info_login" to="/user/UserReg">点击登录</router-link> -->

    </div>


    <div class="list-item">
      <img class="item-image" src="../assets/images/password.png">
      <router-link class="item-text" to="/user/UserInfo">修改密码</router-link>
      <img class="item-image" src="../assets/images/right.png">
    </div>
    <div class="list-item-line"></div>
    <div class="list-item">
      <img class="item-image" src="../assets/images/album_nav.png">
      <router-link class="item-text" to="/user">我的相册</router-link>
      <img class="item-image" src="../assets/images/right.png">
    </div>
    <div class="list-item-line"></div>
    <div class="list-item">
      <img class="item-image" src="../assets/images/chart.png">
      <router-link class="item-text" to="/user">分析统计</router-link>
      <img class="item-image" src="../assets/images/right.png">
    </div>
    <div class="list-item-line"></div>
    <div class="list-item">
      <img class="item-image" src="../assets/images/map.png">
      <router-link class="item-text" to="/user">位置分享</router-link>
      <img class="item-image" src="../assets/images/right.png">
    </div>
    <div class="list-item-line"></div>
    <div class="list-item">
      <img class="item-image" src="../assets/images/sweepCode.png">
      <router-link class="item-text" to="/user">扫二维码</router-link>
      <img class="item-image" src="../assets/images/right.png">
    </div>
    <div class="list-item-line"></div>
<div class="list-item">
      <img class="item-image" src="../assets/images/creatSweepCode.png">
      <router-link class="item-text" to="/user/UserQrcode">我的二维码</router-link>
      <img class="item-image" src="../assets/images/right.png">
    </div>
    <div class="list-item-line"></div>
    <div class="list-item">
      <img class="item-image" src="../assets/images/callphone.png">
      <a class="item-text" href="tel:13648711629">拨打电话</a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "user_main",
  components: {}
};
</script>
<style lang="scss" scoped>
.x {
}
</style>
