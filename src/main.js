import Vue from 'vue';
import App from './App.vue';
import router from './lib/router';
import axios from './lib/plugins';
import store from './lib/store';
import './lib/filters';
import './lib/ui';

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