<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span> 放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span> 填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span> 支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-if="$store.getters.goodsCount==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-else v-for="item in cartlist" :key="item.id">
                                    <td>
                                        <el-switch v-model="item.selected" active-color="#13ce66" inactive-color="#ccc">
                                        </el-switch>
                                    </td>
                                    <td><img :src="item.img_url" alt="" style="width: 65px;"></td>
                                    <td>
                                        {{ item.title }}
                                    </td>
                                    <td>{{ item.sell_price }}</td>
                                    <td>
                                        <el-input-number v-model="item.buycount" size="small" @change="countChange(item.id,$event)" :min="1"></el-input-number>
                                    </td>
                                    <td>{{ item.sell_price*item.buycount }}</td>
                                    <td><button type="button" @click="del(item.id)" class="el-button el-button--danger is-circle"><i class="el-icon-delete"></i></button></td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{ totalCount }}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{ totalDollar }}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <router-link to="/index">
                                <button class="button">继续购物</button>
                            </router-link>
                            <router-link to="/order">
                                <button class="submit">立即结算</button>
                            </router-link>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'cart',
        data() {
            return {
                cartlist: [],
            }
        },
        computed: {
            totalCount() {
                let selectedCount = 0;
                this.cartlist.forEach(v => {
                    if (v.selected)
                        selectedCount += v.buycount;
                });
                return selectedCount;
            },
            totalDollar() {
                let sum = 0;
                this.cartlist.forEach(v => {
                    if (v.selected)
                        sum += v.buycount * v.sell_price;
                });
                return sum;
            }
        },
        created() {
            let ids = '';
            for (const key in this.$store.state.cartGoods) {
                ids += key;
                ids += ',';
            }
            ids = ids.slice(0, -1);
            console.log(ids);
            this.$axios.get(`site/comment/getshopcargoods/${ids}`).then(res => {
                console.log(res);
                res.data.message.forEach(v => {
                    v.buycount = this.$store.state.cartGoods[v.id];
                    v.selected = true;
                });
                this.cartlist = res.data.message;
            });
        },
        methods: {
            countChange(id, newNum) {
                console.log(id);
                console.log(newNum);
                this.$store.commit('editCount', {
                    id,
                    newNum
                });
            },
            del(id) {
                this.$confirm('确定将该商品从你的购物车移除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.cartlist.forEach((v,index)=>{
                        if(v.id == id){
                            this.cartlist.splice(index,1);
                            this.$store.state.cartGoods[id] = 0;
                            delete this.$store.state.cartGoods[id];
                        }
                    });

                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>
<style>

</style>
