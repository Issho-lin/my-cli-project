<template>
  <div id="app">
    <div class="header">
        <!-- 1.0 导航栏头部 -->
        <div class="head-top">
            <div class="section">
                <div class="left-box">
                    <span>Kangin's Shop</span>
                    <a target="_blank" href="#"></a>
                    <a target="_blank" href="#"></a>
                </div>
                <div id="menu" class="right-box">
                    <span v-show="!$store.state.isLogin">
                        <router-link to="/login">登录</router-link>
                        <strong>|</strong>
                        <a href="" class="">注册</a>
                        <strong>|</strong>
                    </span>
                    <span v-show="$store.state.isLogin">
                        <router-link to="/user">会员中心</router-link>
                        <strong>|</strong>
                        <a @click="logout">退出</a>
                        <strong>|</strong>
                    </span>
                    <router-link to="/cart">
                        <i class="iconfont icon-cart" ref="cart"></i>购物车(
                        <span id="shoppingCartCount">
                            <span>{{ $store.getters.goodsCount }}</span>
                            <!-- <span>{{ $store.state.totalCount }}</span> -->
                        </span>)
                    </router-link>
                </div>
            </div>
        </div>
        <!-- <button @click="addCount">点击</button> -->

        <!-- 2.0 导航条 -->
        <div class="head-nav">
            <div class="section">
                <div id="menu2" class="nav-box menuhd">
                    <ul>
                        <li class="index">
                            <router-link to="/index">
                                <span class="out" style="top: 0px;">首页</span>
                            </router-link>
                        </li>
                        <li class="news">
                            <router-link to="/news">
                                <span class="out" style="top: 0px;">每日精选</span>
                            </router-link>
                        </li>
                        <li class="photo">
                            <router-link to="/photo">
                                <span class="out" style="top: 0px;">秒杀专区</span>
                            </router-link>
                        </li>
                        <li class="video">
                            <router-link to="/video">
                                <span class="out" style="top: 0px;">特惠超市</span>
                            </router-link>
                        </li>
                        <li class="down">
                            <router-link to="/down">
                                <span class="out" style="top: 0px;">会员权益</span>
                            </router-link>
                        </li>
                        <li class="goods">
                            <router-link to="/goods">
                                <span class="out" style="top: 0px;">购物商城</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="search-box">
                    <div class="input-box">
                        <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){};" placeholder="输入关健字" x-webkit-speech="">
                    </div>
                    <a href="javascript:;">
                        <i class="iconfont icon-search"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <keep-alive include="index">
        <router-view></router-view>    
    </keep-alive>

    <div class="footer">
        <div class="section">
            <div class="foot-nav">
                <a href="">关于我们</a>
                <strong>|</strong>
                <a href="">联系我们</a>
                <strong>|</strong>
                <a href="">联系客服</a>
                <strong>|</strong>
                <a href="">合作招商</a>
                <strong>|</strong>
                <a href="">商家帮助</a>
                <strong>|</strong>
                <a href="">营销中心</a>
                <strong>|</strong>
                <a href="">隐私政策</a>
            </div>
            <div class="foot-box">
                <div class="copyright">
                    <p>版权所有 KimKangin </p>
                    <p>公司地址： 联系电话：</p>
                    <p class="gray">Copyright © 2009-2018 itcast Corporation,All Rights Reserved.</p>
                </div>
                <div class="service">
                    <p>周一至周日 9:00-24:00</p>
                    <a href="#">
                        <i class="iconfont icon-phone"></i>在线客服</a>
                </div>
            </div>
        </div>
    </div>
    <BackTop :height="100" :bottom="50">
        <div class="top"><i class="ivu-icon ivu-icon-ios-arrow-up"></i></div>
    </BackTop>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  mounted() {
    let that = this;
    that.$("#menu2 li a").wrapInner( '<span class="out"></span>' );
	that.$("#menu2 li a").each(function() {
		that.$( '<span class="over">' +  that.$(this).text() + '</span>' ).appendTo( this );
	});

	that.$("#menu2 li a").hover(function() {
		that.$(".out",	this).stop().animate({'top': '48px'},300); // move down - hide
		that.$(".over",	this).stop().animate({'top': '0px'},300); // move down - show
	}, function() {
		that.$(".out",	this).stop().animate({'top': '0px'},300); // move up - show
		that.$(".over",	this).stop().animate({'top': '-48px'},300); // move up - hide
	});
  },
  methods: {
      logout() {
          this.$axios.get('/site/account/logout').then(res=>{
              if(res.data.status == 0){
                  this.$Message.info('欢迎再次回来');
                  this.$router.push('/login');
                  this.$store.commit('loginStatus',false);
              }
          });
      }
  }
}
</script>

<style>
@import url('assets/statics/site/css/style.css');
.menuhd ul li a span.over{
    background-color: yellowgreen;
}
.top{
    /* padding: 10px; */
    background: rgba(0, 153, 229, .7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
}
.ivu-notice{
    text-align: left;
}
.header .head-nav .search-box .input-box input{
    height: 38px;
    line-height: 38px;
    outline: none;
    border: 0;
    font-size: 14px;
}
.header .head-top .left-box span{
    font-size: 16px;
}
</style>
