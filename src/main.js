import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import index from './components/index.vue';
import detail from './components/detail.vue';
import cart from './components/cart.vue';
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
  }
];

const router = new VueRouter({
  routes
});

Vue.filter('beautifyTime',(value,str1,str2,str3,bool)=>{
  if(bool)
    return moment(value).format(`YYYY${str1}MM${str2}DD${str3} hh:mm:ss`);
  else
    return moment(value).format(`YYYY${str1}MM${str2}DD${str3}`);
});

const store = new Vuex.Store({
  state: {
    cartGoods: JSON.parse(localStorage.getItem('cartGoods')) || {},
    totalCount: 0
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
    }
  }
});

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app');

window.onbeforeunload = ()=>{
  localStorage.setItem('cartGoods',JSON.stringify(store.state.cartGoods));
}