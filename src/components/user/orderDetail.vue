<template>
<div class="right-auto">
    <div class="bg-wrap" style="min-height: 765px;">
        <div class="sub-tit">
            <router-link to="/user/orderlist" class="add">
            <i class="iconfont icon-reply"></i>返回
            </router-link>
            <ul>
                <li class="selected">
                    <a href="javascript:;">查看订单</a>
                </li>
            </ul>
        </div>
        <div class="order-progress">
            <ul>
                <li class="first active">
                    <div class="progress">下单</div>
                    <div class="info">{{ orderinfo.add_time }}</div>
                </li>
                <li :class="{active:orderinfo.status>=2}">
                    <div class="progress">已付款</div>
                    <div class="info">{{ orderinfo.payment_time }}</div>
                </li>
                <li :class="{active:orderinfo.status>=3}">
                    <div class="progress">已经发货</div>
                    <div class="info">{{ orderinfo.express_time }}</div>
                </li>
                <li class="last" :class="{active:orderinfo.status==4}">
                    <div class="progress">已完成</div>
                    <div class="info">{{ orderinfo.complete_time }}</div>
                </li>
            </ul>
        </div>
        <div class="form-box accept-box form-box1">
            <dl class="head form-group">
                <dd>
                    订单号：{{ orderinfo.order_no }}
                    <router-link class="btn-pay" :to="`/pay/${orderinfo.id}`" v-if="orderinfo.status==1">去付款</router-link>
                    <a class="btn-pay" @click="receive" v-if="orderinfo.status==2 || orderinfo.status==3">签收</a>
                    <!---->
                </dd>
            </dl>
            <dl class="form-group">
                <dt>订单状态：</dt>
                <dd>
                    {{ orderinfo.statusName }}
                </dd>
            </dl>
            <dl class="form-group">
                <dt>快递单号：</dt>
                <dd>
                    {{ orderinfo.express_no }}
                </dd>
            </dl>
            <dl class="form-group">
                <dt>支付方式：</dt>
                <dd>{{ orderinfo.paymentTitle }}</dd>
            </dl>
        </div>
        <div class="table-wrap">
            <table width="100%" border="0" cellspacing="0" cellpadding="5" class="ftable">
                <tbody>
                    <tr>
                        <th align="left">商品信息</th>
                        <th width="60%">名称</th>
                        <th width="10%">单价
                        </th>
                        <th width="10%">数量</th>
                        <th width="10%">金额</th>
                    </tr>
                    <tr v-for="item in goodslist" :key="item.id">
                        <td width="60">
                            <img :src="item.imgurl" class="img">
                        </td>
                        <td align="left">
                            <a target="_blank" href="/goods/show-92.html">{{ item.goods_title }}</a>
                        </td>
                        <td align="center">
                            <s>￥{{ item.goods_price }}</s>
                            <p>￥{{ item.real_price }}</p>
                        </td>
                        <td align="center">{{ item.quantity }}</td>
                        <td align="center">￥{{ item.real_price*item.quantity }}</td>
                    </tr>
                    <tr>
                        <td colspan="7" align="right">
                            <p>商品金额：
                                <b class="red">￥{{ orderinfo.payable_amount }}</b>&nbsp;&nbsp;+&nbsp;&nbsp;运费：
                                <b class="red">￥{{ orderinfo.express_fee }}</b>
                            </p>
                            <p style="font-size: 22px;">应付总金额：
                                <b class="red">￥{{ orderinfo.order_amount }}</b>
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="form-box accept-box">
            <dl class="head form-group">
                <dd>收货信息</dd>
            </dl>
            <dl class="form-group">
                <dt>顾客姓名：</dt>
                <dd>{{ orderinfo.accept_name }}</dd>
            </dl>
            <dl class="form-group">
                <dt>送货地址：</dt>
                <dd>{{ orderinfo.area}},{{ orderinfo.address }}</dd>
            </dl>
            <dl class="form-group">
                <dt>联系电话：</dt>
                <dd>{{ orderinfo.mobile }} </dd>
            </dl>
            <dl class="form-group">
                <dt>电子邮箱：</dt>
                <dd>{{ orderinfo.email }} </dd>
            </dl>
            <dl class="form-group">
                <dt>备注留言：</dt>
                <dd>{{ orderinfo.message }}</dd>
            </dl>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'orderDetail',
    data() {
        return {
            orderId: '',
            goodslist: [],
            orderinfo: {}
        }
    },
    created() {
        this.orderId = this.$route.params.orderid;
        this.getAxios();
    },
    methods: {
        getAxios() {
            this.$axios.get(`site/validate/order/getorderdetial/${this.orderId}`).then(res=>{
                console.log(res);
                this.goodslist = res.data.message.goodslist;
                this.orderinfo = res.data.message.orderinfo;
            });
        },
        receive() {
            this.$axios.get(`site/validate/order/complate/${this.orderId}`).then(res=>{
                // console.log(res);
                if(res.data.status == 0){
                    this.$Message.success('签收成功');
                    this.getAxios();
                }
            });
        }
    }
}
</script>
<style>

</style>
