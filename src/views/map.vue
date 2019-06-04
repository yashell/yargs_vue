<template>
  <div class="page">
    <Head msg="出行"/>
    <div class="amap-demo" id="myAMap">
      <div class="amap-demo-s">
   
      </div>
    </div>

    <div class="bus_loc">
      <img class="buimgB" src="../assets/images/loc.png">
      {{cityName}}
    </div>

    <div class="bus_route" @click="line">
      <img class="buimg" src="../assets/images/map_route.png">
    </div>

    <div class="bus_site" @click="line">
      <img class="buimg" src="../assets/images/map_site.png">
    </div>

    <div class="bus_code" @click="line">
      <img class="buimg" src="../assets/images/map_SweepCode.png">
    </div>
    <div class="bus">
      <div class="bus_top">
        <div class="bus_top_left">簸箕乡</div>
        <div class="bus_top_mid">30公里</div>
        <div class="bus_top_left">威信客运站</div>
      </div>

      <div class="bus_bot">
        <div class="bus_del_T">
          <div class="bus_del_one" v-for="(item,index) in List" :key="index">
            <div class="bus_del_left">
              运输
              中
            </div>
            <div class="bus_del_right">
              <div class="bus_del_right_A">{{item.VIN}}</div>
              <div class="bus_del_right_B">{{item.SaleSeats}}/{{item.Seating}}座</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>





<script>
import Head from "@/components/Head.vue";
import AMap from "AMap";
import store from "@/store.js";

export default {
  data() {
    return {
      AMap: "",
      List: [],
      zoom: 12,
      center: [105.0392532349, 27.8657885049],
      cityName: "定位中…",


      markers: [
        {
          position: [104.663140131, 25.0585733749],
          events: {
            click: () => {
              alert("click marker");
            }
          },
          visible: true,
          draggable: false,
          template: "<span>1</span>"
        }
      ]
    };
  },
  mounted() {
    this.init();
    this.drawLine();
    this.loadcity(); //获取当前位置所在城市
  },
  methods: {
    /*
     *获取当前位置所在城市
     *
     */
    init: function() {
      let that = this;
      that.AMap = new AMap.Map("myAMap", {
        resizeEnable: true,
        center: that.center,
        zoom: 10
      });

      // //实时路况图层
      // var trafficLayer = new AMap.TileLayer.Traffic({
      //   zIndex: 10
      // });
      // that.AMap.add(trafficLayer); //添加图层到地图

      // 插件
      that.AMap.plugin(
        [ "AMap.Geolocation","AMap.CitySearch"],
        function() {
          // that.AMap.addControl(new AMap.ToolBar());
          // that.AMap.addControl(new AMap.Scale());
  
          that.AMap.addControl(new AMap.Geolocation());
          
     
                
        }
  
      );
    
      // 
    },

    /*
     *获取当前位置所在城市
     *
     */
    loadcity: function() {
      var options = {
        enableHighAccuracy: true,
        maximumAge: 3600000
      };

      navigator.geolocation.getCurrentPosition(
        onSuccess => {
          // https://restapi.amap.com/v3/geocode/regeo?output=json&location=104.662140131,25.0585733749&key=f93f00a27151d556a1140c574910e5eb&radius=1000&extensions=all&batch=true
          this.$Axios
            .get(
              store.state.mapHttp +
                "/v3/geocode/regeo?output=json&location=" +
                onSuccess.coords.longitude +
                "," +
                onSuccess.coords.latitude +
                "&key=" +
                store.state.mapKey +
                "&radius=1000&extensions=all&batch=true"
            )
            .then(
              res => {
                console.log(res.data.regeocodes[0].addressComponent.city);
                this.cityName = res.data.regeocodes[0].addressComponent.city;
              },
              res => {
                console.log(res);
                console.info("调用失败");
              }
            );
        },
        onError => {
          console.log(onError);
        },
        options
      );
    },
    drawLine: function() {
      var that = this;
      this.$Axios
        .get(
          "https://llyapi.laiyunyou.cn/NKOrderManage/NK_Station/GetNKInfo?beginStationId=820&endStationId=152"
        )
        .then(
          res => {
            // console.log(res.data.resultdata.NKCarList);
            // console.log(res.data.resultdata.NK_RouteInfo.DrawingPoint);
            that.List = res.data.resultdata.NKCarList;

            var mypoint = [];

            var arrA = res.data.resultdata.NK_RouteInfo.DrawingPoint;
            var arrB = arrA.split(";");

            for (let i = 0; i < arrB.length; i++) {
              const arrC = arrB[i];
              const arrD = arrC.split(",");
              const objd = [];
              const d1 = parseFloat(arrD[0]);
              const d2 = parseFloat(arrD[1]);
              objd.push(d1, d2);
              mypoint.push(objd);
            }

            // 绘制折线
            var path = new AMap.Polyline({
              path: mypoint,
              isOutline: false, //线条是否带描边，默认false
              outlineColor: "#ffeeff", //线条描边颜色，此项仅在isOutline为true时有效，默认：#000000
              borderWeight: 1, //描边的宽度，默认为1
              strokeColor: "#28F", //线条颜色，使用16进制颜色代码赋值。默认值为#006600
              strokeOpacity: 1, //线条透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
              strokeWeight: 6, //线条宽度，单位：像素
              // 折线样式还支持 'dashed'
              strokeStyle: "solid", //线样式，实线:solid，虚线:dashed
              // strokeStyle是dashed时有效
              showDir: true,
              strokeDasharray: [10, 5], //勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效
              lineJoin: "round", //折线拐点的绘制样式，默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角
              lineCap: "round", //折线两端线帽的绘制样式，默认值为'butt'无头，其他可选值：'round'圆头、'square'方头
              zIndex: 50 //折线覆盖物的叠加顺序。默认叠加顺序，先添加的线在底层，后添加的线在上层。通过该属性可调整叠加顺序，使级别较高的折线覆盖物在上层显示默认zIndex：50、
            });
            // 将折线添加至地图实例
            that.AMap.add(path);

            var StaP = mypoint[0];
            var EndP = mypoint[mypoint.length - 1];

            var startIcon = new AMap.Icon({
              size: new AMap.Size(25, 34),
              // 图标的取图地址
              image: require("../assets/images/dir-marker.png"),
              // 图标所用图片大小
              imageSize: new AMap.Size(135, 40),
              // 图标取图偏移量
              imageOffset: new AMap.Pixel(-9, -3)
            });

            var startMarker = new AMap.Marker({
              position: new AMap.LngLat(
                parseFloat(StaP.lng),
                parseFloat(StaP.lat)
              ),
              offset: new AMap.Pixel(-10, -10),
              icon: startIcon, // 添加 Icon 实例
              title: res.data.resultdata.NK_RouteInfo.BeginStationName
            });

            startMarker.setLabel({
              offset: new AMap.Pixel(0, 30), //设置文本标注偏移量
              content: res.data.resultdata.NK_RouteInfo.BeginStationName, //设置文本标注内容
              direction: "center" //设置文本标注方位
            });

            that.AMap.add(startMarker);

            var endIcon = new AMap.Icon({
              size: new AMap.Size(25, 34),
              // 图标的取图地址
              // image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
              image: require("../assets/images/dir-marker.png"),

              // 图标所用图片大小
              imageSize: new AMap.Size(135, 40),
              imageOffset: new AMap.Pixel(-95, -3)
            });

            var endMarker = new AMap.Marker({
              position: new AMap.LngLat(
                parseFloat(EndP.lng),
                parseFloat(EndP.lat)
              ),
              offset: new AMap.Pixel(-10, -10),
              icon: endIcon, // 添加 Icon 实例
              title: res.data.resultdata.NK_RouteInfo.EndStationName
            });

            endMarker.setLabel({
              offset: new AMap.Pixel(0, 30), //设置文本标注偏移量
              content: res.data.resultdata.NK_RouteInfo.EndStationName, //设置文本标注内容
              direction: "center" //设置文本标注方位
            });

            that.AMap.add(endMarker);
//-小车开1---------------------------


 var carIcon = new AMap.Icon({
              size: new AMap.Size(36, 18),
              // 图标的取图地址
              image: require("../assets/images/car.png"),
              // 图标所用图片大小
              imageSize: new AMap.Size(36, 18),
              // 图标取图偏移量
              // imageOffset: new AMap.Pixel(-9, -3)
            });



            var mypointImps = [];
            for (let v in mypoint) {
              if(v>mypoint.length/2){
              var m1 = [];
              m1.push(mypoint[v].lng, mypoint[v].lat);

              mypointImps.push(m1);
              }
            }

            var onmarker = new AMap.Marker({
              AMap: AMap,
              position: mypointImps[0],
              icon: carIcon,
              offset: new AMap.Pixel(-26, -13),
              autoRotation: true,
              angle: -90
            });

            that.AMap.add(onmarker);
            that.AMap.setFitView();
            onmarker.moveAlong(mypointImps, 100);

            //-小车开2---------------------------

         var mypointImps2 = [];
            for (let v in mypoint) {
              var m2 = [];
              m2.push(mypoint[v].lng, mypoint[v].lat);

              mypointImps2.push(m2);
            }

          var onmarker2 = new AMap.Marker({
              AMap: AMap,
              position: mypointImps[0],
              icon: carIcon,
              offset: new AMap.Pixel(-26, -13),
              autoRotation: true,
              angle: -90
            });

            that.AMap.add(onmarker2);
            that.AMap.setFitView();
            onmarker2.moveAlong(mypointImps2, 100);


             //-小车开3---------------------------

         var mypointImps3 = [];
            for (let v in mypoint) {
               if(v>mypoint.length/1.8){
              let m2 = [];
              m2.push(mypoint[v].lng, mypoint[v].lat);

              mypointImps3.push(m2);
               }
            }

          var onmarker3 = new AMap.Marker({
              AMap: AMap,
              position: mypointImps[0],
              icon:carIcon,
              offset: new AMap.Pixel(-26, -13),
              autoRotation: true,
              angle: -90
            });

            that.AMap.add(onmarker3);
            that.AMap.setFitView();
            onmarker3.moveAlong(mypointImps3, 100);



            
             //-小车开4---------------------------



          var onmarker4 = new AMap.Marker({
              AMap: AMap,
              position: mypointImps[mypointImps.length/1.2],
              icon: carIcon,
              offset: new AMap.Pixel(-26, -13),
              autoRotation: true,
              angle: -90
            });

            that.AMap.add(onmarker4);
       


            


          },
          res => {
            console.log(res);
            console.info("调用失败");
          }
        );
    },
    line: function() {
      this.AMap.setFitView();
    },
  
  },
  components: {
    Head
  }
};
</script>
<style lang="scss" >
.x {
}
.amap-marker-label {
  position: absolute;
  z-index: 2;
  border: 1px solid #ccc;
  background-color: white;
  white-space: nowrap;
  cursor: default;
  color: #666;
  padding: 3px;
  font-size: 12px;
  line-height: 14px;
}
</style>

