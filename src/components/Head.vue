<template>
 <div class="head">
      <div class="head_title">{{msg}}</div>
    </div>
</template>
<script>
export default {
  name: 'Head',
  props: {
    msg: String
  },methods:{
    aa(){
      console.log("wq ")
        this.$emit("ListenToChildEvent","这是啥啊")
    }
  }
}
</script>

<style scoped lang="scss">
.x{}
</style>
