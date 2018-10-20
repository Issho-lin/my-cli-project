import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

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
      delGoods(state,id){
        Vue.delete(state.cartGoods,id);
      },
      editCount(state,obj) {
        state.cartGoods[obj.id] = obj.newNum;
      },
      loginStatus(state,status) {
        state.isLogin = status;
      }
    }
  });

  export default store;