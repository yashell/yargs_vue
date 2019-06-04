<template>
  <div class="page">
    <Head msg="资讯"/>
    <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
      <ul>
        <!-- 
          //这段为远程调取
          <li
          class="refresh-li"
          v-for="(item,index) in listdata"
          :key="index"
        >{{item.groupnm+"|"+item.groupnames}}</li>-->

        <li class="dropListItem" v-for="(item,index) in listdata" :key="index" @click="goshow(index)">
          <img v-if="item.isurl" class="dropListItem_pic" :src="item.url">
          <span class="dropListItem_tit">{{item.title}}</span>
          <span class="dropListItem_time">{{item.systm | reTime}}</span>
        </li>
      </ul>
    </v-scroll>
  </div>
</template>
<script>
// import Scroll from './y-scroll/scroll';

import refresh from "@/components/refresh.vue";
import Head from "@/components/Head.vue";

export default {
  data() {
    return {
      pageIndex: 1, //当前第几页
      pageNumber: 0, //总共有多少页 这个需要在第一次执行方法的时候取出来
      pageSize: 12, //一页有多少条
      recordNumber: 0, //总共有多少条数据  这个需要在第一次执行方法的时候取出来
      listdata: []
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
          // "http://hzz.test.lonhcloud.cn/lhHzzTtcServerlet/commonServerlet?prj=lhHzzTtcManager&bean=TtcManagerSS&method=findTasktargetbPageListByOrder&1=" +
          //   that.pageIndex +
          //   "&2=" +
          //   that.pageSize +
          //   "&3=-1&4=13871&5=1,2,3&6=&7=-1&8=&9="

          "List.json"
        )
        .then(
          response => {
            console.log(response.data);
            console.log(response.data.dataList);
            if (that.pageIndex == 1) {
              // that.listdata = response.data.dataList;
              that.listdata = response.data;
            } else {
              // that.listdata = that.listdata.concat(response.data.dataList);
              that.listdata = that.listdata.concat(response.data);
            }
          },
          error => {
            console.log("error" + error);
          }
        );
    },
    onRefresh(done) {
      // 下拉刷新
      let that = this;
      that.pageIndex = 1;
      this.getList();
      done(); // call done
    },
    onInfinite(done) {
      // 上拉加载
      let that = this;
      that.pageIndex++;

      let timer = setTimeout(() => {
        that.getList(), done(), clearTimeout(timer);
      }, 2000);
    },
    goshow:function(num){

         this.$router.push({ name: "infoShow",params:{num:num} });


    }
  },
  components: {
    "v-scroll": refresh,
    Head
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
