<template>
 <div class="head">
   <div @click="goBack">   
     <img class="head-image" src="../assets/images/back.png"></div>
      <div class="head_title">{{msg}}</div>
       <div>
          <img class="head-image" src="../assets/images/null.png">
       </div>
    </div>
</template>
<script>
export default {
  name: 'Head',
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