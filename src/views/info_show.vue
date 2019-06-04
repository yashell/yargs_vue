<template>
    <div class="page">
    <HeadRe :msg="title"/>
    <div class="mainDiv">
    <div class='showtitle'>{{data.title}}</div>

    <div class="showmain" v-html="data.content"></div>


    </div>


  </div>

<!-- <scroll-view class="show"  scroll-y='true'>




<rich-text class='showmain' nodes='{{info.content}}'> </rich-text>

</scroll-view>  -->
</template>
<script>
// import Scroll from './y-scroll/scroll';


import HeadRe from "@/components/HeadRe.vue";

export default {
  data() {
    return {
      num:this.$route.params.num,
      title:"",
      data: {},
    };
  },
  mounted: function() {
    this.getList();
  },
  methods: {
    getList() {
      let that = this;
      that.$Axios
        .get(
          "List.json"
        )
        .then(
          response => {
       


            that.title=response.data[this.num].title
            that.data = response.data[this.num];
          },
          error => {
            console.log("error" + error);
          }
        );
    },
   
  },
  components: {
    HeadRe
  },
  filters: {
    reTime(time) {
      var a = time.$date.substr(0, 10);
      return a;
    }
  }
};
</script>

<style lang="scss" scoped>
.x {
}
</style>
