import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import index from './components/index.vue';
import detail from './components/detail.vue';
import cart from './components/cart.vue';
import order from './components/order.vue';
import login from './components/login.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios';
import VueLazyload from 'vue-lazyload';
import moment from 'moment';
import ProductZoomer from 'vue-product-zoomer';
import Vuex from 'vuex';

Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://111.230.232.110:8899';
axios.defaults.withCredentials = true;

Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(iView);
Vue.use(ProductZoomer);

Vue.use(VueLazyload, {
  error: require('./assets/imgs/loading.gif'),
  loading: require('./assets/imgs/loading2.gif')
});

Vue.use(Vuex)

const routes = [
  {
    path: '/',
    component: index
  },{
    path: '/index',
    component: index
  },{
    path: '/detail/:id',
    component: detail
  },{
    path: '/cart',
    component: cart
  },{
    path: '/order',
    component: order
  },{
    path: '/login',
    component: login
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if(to.path == '/order'){
    axios.get('/site/account/islogin').then(res=>{
      if(res.data.code == 'nologin'){
        Vue.prototype.$Message.warning('请先登录填写订单！');
        router.push('/login');
      }else{
        next();
      }
    });
  }else{
    next();
  }
})

Vue.filter('beautifyTime',(value,str1,str2,str3,bool)=>{
  if(bool)
    return moment(value).format(`YYYY${str1}MM${str2}DD${str3} hh:mm:ss`);
  else
    return moment(value).format(`YYYY${str1}MM${str2}DD${str3}`);
});

const store = new Vuex.Store({
  state: {
    cartGoods: JSON.parse(localStorage.getItem('cartGoods')) || {},
    totalCount: 0,
    isLogin: false
  },
  getters: {
    goodsCount(state) {
      state.totalCount = 0;
      for (const key in state.cartGoods) {
        state.totalCount += state.cartGoods[key]
      }
      return state.totalCount;
    }
  },
  mutations: {
    addGoods(state,obj) {
      if(state.cartGoods[obj.id] == undefined){
        Vue.set(state.cartGoods, obj.id, obj.addNum);
      }else{
        state.cartGoods[obj.id] += obj.addNum;
      }
    },
    editCount(state,obj) {
      state.cartGoods[obj.id] = obj.newNum;
    },
    loginStatus(state,status) {
      state.isLogin = status;
    }
  }
});

new Vue({
  render: h => h(App),
  router,
  store,
  created() {
    axios.get('/site/account/islogin').then(res=>{
      if(res.data.code == 'nologin'){
        store.commit('loginStatus',false);
      }else{
        store.commit('loginStatus',true);
      }
    });
  }
}).$mount('#app');

window.onbeforeunload = ()=>{
  localStorage.setItem('cartGoods',JSON.stringify(store.state.cartGoods));
}