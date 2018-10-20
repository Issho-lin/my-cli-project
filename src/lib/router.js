import Vue from 'vue';
import VueRouter from 'vue-router';

// import index from '../components/index.vue';
// import detail from '../components/detail.vue';
// import cart from '../components/cart.vue';
// import order from '../components/order.vue';
// import login from '../components/login.vue';
// import pay from '../components/pay.vue';
// import payed from '../components/payed.vue';
// import user from '../components/user.vue';
// import userInfo from '../components/user/userInfo.vue';
// import orderList from '../components/user/orderList.vue';
// import orderDetail from '../components/user/orderDetail.vue';

const index = ()=> import( '../components/index.vue');
const detail = ()=> import( '../components/detail.vue');
const cart = ()=> import( '../components/cart.vue');
const order = ()=> import( '../components/order.vue');
const login = ()=> import( '../components/login.vue');
const pay = ()=> import( '../components/pay.vue');
const payed = ()=> import( '../components/payed.vue');
const user = ()=> import( '../components/user.vue');
const userInfo = ()=> import( '../components/user/userInfo.vue');
const orderList = ()=> import( '../components/user/orderList.vue');
const orderDetail = ()=> import( '../components/user/orderDetail.vue');

Vue.use(VueRouter);
const routes = [
    {
      path: '/',
      component: index,
      meta: {
        title: '首页',
      }
    },{
      path: '/index',
      component: index,
      meta: {
        title: '首页',
      }
    },{
      path: '/detail/:id',
      component: detail,
      meta: {
        title: '商品详情',
      }
    },{
      path: '/cart',
      component: cart,
      meta: {
        title: '购物车',
      }
    },{
      path: '/order/:ids',
      component: order,
      meta: {
        title: '订单',
        checkLogin: true
      }
    },{
      path: '/login',
      component: login,
      meta: {
        title: '登录'
      }
    },{
      path: '/pay/:orderId',
      component: pay,
      meta: {
        title: '支付中心',
        checkLogin: true
      }
    },{
      path: '/payed',
      component: payed,
      meta: {
        title: '支付成功',
        checkLogin: true
      }
    },{
      path: '/user',
      component: user,
      meta: {
        title: '会员中心',
        checkLogin: true
      },
      children: [
        {
          path: '',
          component: userInfo,
          meta: {
            title: '会员中心'
          }
        },{
          path: 'orderList',
          component: orderList,
          meta: {
            title: '订单列表'
          }
        },{
          path: 'userInfo',
          component: userInfo,
          meta: {
            title: '用户信息'
          }
        },{
          path: 'orderDetail/:orderid',
          component: orderDetail,
          meta: {
            title: '订单详情'
          }
        }
      ]
    }
  ];
  
  const router = new VueRouter({
    routes
  });

  router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    if(to.meta.checkLogin){
      Vue.prototype.$axios.get('/site/account/islogin').then(res=>{
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

  export default router;