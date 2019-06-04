<template>
  <div class="page">
    <HeadRe msg="我的二维码"/>
    <div>
      <vue-qr  text="二维码显示的内容" :size="600"  :margin="10" class="qrcode"></vue-qr>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import HeadRe from "@/components/HeadRe.vue";
import VueQr from 'vue-qr'
export default {
  name: "user_qrcode",
  components: {
    HeadRe,
      VueQr
  }
};
</script>
<style lang="scss" scoped>
.x {
}
.qrcode{
  width: 90%;
  height: auto;
  margin: 5%;
}
</style>
