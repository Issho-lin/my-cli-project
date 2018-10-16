<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>
                    <div id="loginform" name="loginform" class="login-box">
                        <div class="input-box">
                            <input id="txtUserName" v-model="username" name="txtUserName" type="text" placeholder="用户名/手机/邮箱" maxlength="50">
                        </div>
                        <div class="input-box">
                            <input id="txtPassword" v-model="password" name="txtPassword" type="password" placeholder="输入登录密码" maxlength="16">
                        </div>
                        <div class="btn-box">
                            <input id="btnSubmit" name="btnSubmit" @click="login" type="submit" value="立即登录">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'login',
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login() {
                this.$axios.post('/site/account/login',{
                    user_name: this.username,
                    password: this.password
                }).then(res=>{
                    console.log(res);
                    if(res.data.status == 1){
                        this.$Notice.warning({
                            title: '温馨提示',
                            desc: res.data.message
                        });
                    }else{
                        this.$Notice.success({
                            title: '欢迎您',
                            desc: res.data.message
                        });
                        this.$router.go(-1);
                        this.$store.commit('loginStatus',true);
                    }
                });
            }
        }
    }
</script>
<style>
.login-box .input-box{
    padding: 0;
}
.login-box .input-box input{
    height: 100%;
    padding-left: 10px;
}
</style>
