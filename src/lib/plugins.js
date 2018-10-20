import Vue from 'vue';

// 图片懒加载插件
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
    error: require('../assets/imgs/loading.gif'),
    loading: require('../assets/imgs/loading2.gif')
  });

// 放大镜插件
import ProductZoomer from 'vue-product-zoomer';
Vue.use(ProductZoomer);

// 省市联动插件
import VDistpicker from 'v-distpicker';
Vue.component('v-distpicker', VDistpicker);

// 二维码插件
import VueQriously from 'vue-qriously';
Vue.use(VueQriously);

// jquery
import $ from 'jquery';
Vue.prototype.$ = $;

// axios
import axios from 'axios';
Vue.prototype.$axios = axios;
axios.defaults.baseURL = 'http://111.230.232.110:8899';
axios.defaults.withCredentials = true;
export default axios;



