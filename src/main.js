import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 支持cordova插件
import VueCordova from 'vue-cordova'




//支持axios
import Axios from 'axios'
import qs from 'qs'

Vue.prototype.$Axios = Axios
Vue.prototype.$qs=qs





Vue.use(VueCordova, {
  optionTestKey: 'optionTestValue'
})



// add cordova.js only if serving the app through file://
if (window.location.protocol === 'file:' || window.location.port === '3001') {
  var cordovaScript = document.createElement('script')
  cordovaScript.setAttribute('type', 'text/javascript')
  cordovaScript.setAttribute('src', 'cordova.js')
  document.body.appendChild(cordovaScript)
}


Vue.config.productionTip = false




new Vue({
  router,
  store,
  render: h => h(App),
  data: function () {
    return {
      cordova: Vue.cordova
    }
  }
}).$mount('#app')





