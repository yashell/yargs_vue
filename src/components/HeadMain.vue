<template>
 <div class="head">
   <!-- <div @click="goBack">   
     <img class="head-image" src="../assets/images/back.png"></div> -->
     <img src="../assets/images/menu.png" class="index_head_meun" bindtap="showview">
      <!-- <div class="head_title">{{msg}}</div> -->
       <div class="index_head_txt">
        <img src="../assets/images/rote.png" class="myrotate">
        <span class="index_head_loc">当前位置：</span>
        <span class="index_head_city">昆明市</span>
      </div>
    </div>




</template>
<script>
export default {
  name: 'HeadMain',
  props: {
    msg: String
  },methods:{
    goBack:function(){
      this.$router.go(-1); 
    }
  }
}
</script>

<style scoped lang="scss">
.x{}
</style>