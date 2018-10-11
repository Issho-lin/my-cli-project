import Vue from 'vue';
import App from './App.vue';
import vueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import index from './components/index.vue';
import detail from './components/detail.vue';
import axios from "axios";
import moment from "moment";
import VueLazyload from 'vue-lazyload'

axios.defaults.baseURL = 'http://111.230.232.110:8899';
Vue.prototype.$axios = axios;

Vue.use(VueLazyload, {
  error: require('./assets/imgs/loading2.gif'),
  loading: require('./assets/imgs/loading2.gif')
})

Vue.use(vueRouter);
Vue.use(ElementUI);
Vue.use(iView);
const routes = [
  {
    path: '/',
    component: index
    // redirect: '/index'
  },{
    path: '/index',
    component: index
  },{
    path: '/detail/:id',
    component: detail
  }
];

const router = new vueRouter({
  routes
});

Vue.config.productionTip = false;

Vue.filter('beautifyTime',(value,str1,str2,str3,bool)=>{
  if(bool)
    return moment(value).format(`YYYY${str1}MM${str2}DD${str3} hh:mm:ss`);
  else
    return moment(value).format(`YYYY${str1}MM${str2}DD${str3}`);
});

new Vue({
  render: h => h(App),
  router
}).$mount('#app');
