<template>
    <div class="right-auto">
        <div class="bg-wrap" style="min-height: 765px;">
            <div class="sub-tit">
                <ul>
                    <li class="selected">
                        <a href="/user/order-list.html">交易订单</a>
                    </li>
                </ul>
            </div>
            <div class="table-wrap">
                <table width="100%" border="0" cellspacing="0" cellpadding="0" class="ftable">
                    <tbody>
                        <tr>
                            <th width="16%" align="left">订单号</th>
                            <th width="10%">姓名</th>
                            <th width="12%">订单金额</th>
                            <th width="11%">下单时间</th>
                            <th width="10%">状态</th>
                            <th width="12%">操作</th>
                        </tr>
                        <tr v-for="item in orderlist" :key="item.id">
                            <td>{{ item.order_no }}</td>
                            <td align="left">{{ item.accept_name }}</td>
                            <td align="left">
                                <strong style="color: red;">￥{{ item.order_amount }}</strong>
                                <br> {{ item.paymentTitle }}
                            </td>
                            <td align="left">{{ item.add_time }}</td>
                            <td align="left">
                                {{ item.statusName }}
                            </td>
                            <td align="left">
                                <router-link :to="`/user/orderDetail/${item.id}`">查看订单</router-link>
                                <!-- <a href="#/site/member/orderinfo/12" class=""></a> -->
                                <br>
                                <router-link :to="`/pay/${item.id}`" v-if="item.status==1">去付款</router-link>
                                <br>
                                <a href="javascript:void(0)">取消</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="page-foot">
                    <el-pagination
                    @size-change="sizeChange"
                    @current-change="indexChange"
                    :current-page="pageIndex"
                    :page-sizes="[4, 6, 8, 10]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalcount">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'orderList',
    data() {
        return {
            pageIndex: 1,
            pageSize: 10,
            totalcount: 0,
            orderlist: [],
        }
    },
    created() {
        this.getAxios();
    },
    methods: {
        getAxios() {
            this.$axios.get(`site/validate/order/userorderlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`).then(res=>{
                    // console.log(res);
                    this.orderlist = res.data.message;
                    this.totalcount = res.data.totalcount
                });
            },
        sizeChange(val) {
            this.pageSize = val;
            this.getAxios();
        },
        indexChange(val) {
            this.pageIndex = val;
            this.getAxios();
        }
    }
}
</script>
<style>

</style>
