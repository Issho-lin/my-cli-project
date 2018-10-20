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
                                <li class="active">
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
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <div id="orderForm" name="orderForm" url="">
                                <div class="form-box address-info">
                                    <el-form-item label="收货人姓名" prop="accept_name">
                                        <el-input v-model="ruleForm.accept_name"></el-input>
                                    </el-form-item>
                                    <!-- <dl class="form-group">
                                        <dt>所属地区：</dt>
                                        <dd>
                                            <select id="province" name="province" class="select">
                                            <option value="">所属省份</option>
                                            <option value="北京市">北京市</option>
                                            <option value="天津市">天津市</option>
                                            <option value="河北省">河北省</option>
                                            <option value="山西省">山西省</option>
                                            <option value="内蒙古自治区">内蒙古自治区</option>
                                            <option value="辽宁省">辽宁省</option>
                                            <option value="吉林省">吉林省</option>
                                            <option value="黑龙江省">黑龙江省</option>
                                            <option value="上海市">上海市</option>
                                            <option value="江苏省">江苏省</option>
                                            <option value="浙江省">浙江省</option>
                                            <option value="安徽省">安徽省</option>
                                            <option value="福建省">福建省</option>
                                            <option value="江西省">江西省</option>
                                            <option value="山东省">山东省</option>
                                            <option value="河南省">河南省</option>
                                            <option value="湖北省">湖北省</option>
                                            <option value="湖南省">湖南省</option>
                                            <option value="广东省">广东省</option>
                                            <option value="广西壮族自治区">广西壮族自治区</option>
                                            <option value="海南省">海南省</option>
                                            <option value="重庆市">重庆市</option>
                                            <option value="四川省">四川省</option>
                                            <option value="贵州省">贵州省</option>
                                            <option value="云南省">云南省</option>
                                            <option value="西藏自治区">西藏自治区</option>
                                            <option value="陕西省">陕西省</option>
                                            <option value="甘肃省">甘肃省</option>
                                            <option value="青海省">青海省</option>
                                            <option value="宁夏回族自治区">宁夏回族自治区</option>
                                            <option value="新疆维吾尔自治区">新疆维吾尔自治区</option>
                                            <option value="香港特别行政区">香港特别行政区</option>
                                            <option value="澳门特别行政区">澳门特别行政区</option>
                                            <option value="台湾省">台湾省</option>
                                            <option value="其它">其它</option>
                                        </select>
                                            <select id="city" name="city" class="select">
                                            <option value="">所属城市</option>
                                        </select>
                                            <select id="area" name="area" class="select" datatype="*" sucmsg=" ">
                                            <option value="">所属地区</option>
                                        </select>
                                            <span class="Validform_checktip">*请选择您所在的地区</span>
                                        </dd>
                                    </dl> -->
                                    <el-form-item label="所属区域" prop="area">
                                        <v-distpicker :province="ruleForm.area.province.value" :city="ruleForm.area.city.value" :area="ruleForm.area.area.value" @selected="areaChange"></v-distpicker>
                                    </el-form-item>
                                    <el-form-item label="详细地址" prop="address">
                                        <el-input v-model="ruleForm.address"></el-input>
                                    </el-form-item>
                                    <el-form-item label="手机号码" prop="mobile" autocomplete="off">
                                        <el-input v-model="ruleForm.mobile"></el-input>
                                    </el-form-item>
                                    <el-form-item label="电子邮箱" prop="email">
                                        <el-input v-model="ruleForm.email"></el-input>
                                    </el-form-item>
                                    <el-form-item label="邮政编码" prop="post_code">
                                        <el-input v-model="ruleForm.post_code"></el-input>
                                    </el-form-item>
                                </div>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                        <el-radio v-model="ruleForm.payment_id" label="6">在线支付</el-radio>
                                        <em>&nbsp;手续费：0.00元</em>
                                    </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <label>
                                            <el-radio @change="changeEx(20)" v-model="ruleForm.express_id" label="1">顺丰</el-radio>
                                            <em>&nbsp;费用：20.00元&nbsp;&nbsp;&nbsp;</em>
                                            <el-radio @change="changeEx(0)" v-model="ruleForm.express_id" label="2">圆通</el-radio>
                                            <em>&nbsp;费用：00.00元&nbsp;&nbsp;&nbsp;</em>
                                            <el-radio @change="changeEx(10)" v-model="ruleForm.express_id" label="3">韵达</el-radio>
                                            <em>&nbsp;费用：10.00元&nbsp;&nbsp;&nbsp;</em>
                                            <!-- <span class="Validform_checktip"></span> -->
                                        </label>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="item in goodlist" :key="item.id">
                                            <td width="68">
                                                <a target="_blank" href="/goods/show-89.html">
                                                    <img :src="item.img_url" class="img">
                                                </a>
                                            </td>
                                            <td>
                                                <a target="_blank" href="/goods/show-89.html">{{ item.title }}</a>
                                            </td>
                                            <td>
                                                <span class="red">
                                                ￥{{ item.sell_price }}
                                            </span>
                                            </td>
                                            <td align="center">{{ item.buycount }}</td>
                                            <td>
                                                <span class="red">
                                                ￥{{ item.sell_price*item.buycount }}
                                            </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <dt>订单备注(100字符以内)</dt>
                                            <dd>
                                                <textarea v-model="ruleForm.message" name="message" class="input" style="height:35px;"></textarea>
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{ totalcount }}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{ ruleForm.goodsAmount }}.00</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{ ruleForm.expressMoment }}.00</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{ ruleForm.expressMoment+ruleForm.goodsAmount }}.00</label>
                                        </p>
                                        <p class="btn-box">
                                            <router-link class="btn button" to="/cart">返回购物车</router-link>
                                            <a id="btnSubmit" @click="submit" class="btn submit">确认提交</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'order',
        data() {
            var validateMobile = (rule, value, callback) => {
                console.log(value);
                setTimeout(()=>{
                    if(!(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(value))) {
                        callback(new Error('请输入正确手机号码格式'));
                    }else {
                        callback();     
                    }
                },1000);
            };
            var validateEmail = (rule, value, callback) => {
                setTimeout(()=>{
                    if(!(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value))) {
                        callback(new Error('请输入正确邮箱格式'));
                    }else {
                        callback();
                    }
                },1000);
                
            };
            var validatePost = (rule, value, callback) => {
                setTimeout(()=>{
                    if(!(/^[1-9]\d{5}(?!\d)$/.test(value))) {
                        callback(new Error('请输入正确手机号码格式'));
                    }else {
                        callback();
                    }
                },1000);
            };
            return {
                goodlist: [],
                totalcount: 0,
                orderId: '94',
                ruleForm: {
                    goodsAmount: 0,
                    expressMoment: 20,
                    accept_name: 'Kangin',
                    area: {
                        province: {
                            code: '440000',
                            value: "广东省"
                            },
                        city:{ 
                            code: '440300',
                            value: "广州市"
                            },
                        area: {
                            code: '440306',
                            value: "海珠区"
                            }
                    },
                    address: '西堤二马路',
                    mobile: '18718286708',
                    email: '1439205655@qq.com',
                    post_code: '518116',    
                    payment_id: '6',
                    express_id: '1',
                    message: '',
                    goodsids: '',
                    cargoodsobj: {},
                },
                rules: {
                    accept_name: [
                        { required: true, message: '*请输入收货人姓名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 5 个字符', trigger: 'change' }
                    ],
                    address: [
                        { required: true, message: '*请输入除上面所属地区外的详细地址', trigger: 'blur' },
                        { min: 2, message: '长度至少为 2 个字符', trigger: 'change' }
                    ],
                    mobile: [
                        { required: true, message: '*请输入手机号码', trigger: 'blur' },
                        { validator: validateMobile, trigger: 'change' }
                    ],
                    email: [
                        { validator: validateEmail, trigger: 'change' }
                    ],
                    post_code: [
                        { validator: validatePost, trigger: 'change' }
                    ]
                }
            }
        },
        methods: {
            areaChange(value) {
                // console.log(value);
                this.ruleForm.area = value;
            },
            changeEx(value) {
                // console.log(value);
                this.ruleForm.expressMoment = value;
            },
            submit() {
                this.ruleForm.goodsids.split(',').forEach(v=>{
                    this.$store.commit('delGoods',v)
                });
                this.$axios.post(`site/validate/order/setorder`,this.ruleForm).then(res=>{
                    console.log(res);
                    this.orderId = res.data.message.orderid;
                    console.log(this.orderId);
                    this.$router.push(`/pay/${this.orderId}`);
                });
            }
        },
        created() {
            this.ruleForm.goodsids = this.$route.params.ids;
            this.$axios.get(`site/validate/order/getgoodslist/${this.ruleForm.goodsids}`).then(res=>{
                console.log(res);
                res.data.message.forEach(v => {
                    v.buycount = this.$store.state.cartGoods[v.id];
                    this.totalcount += v.buycount;
                    this.ruleForm.goodsAmount += (v.buycount*v.sell_price);
                    this.ruleForm.cargoodsobj[v.id] = v.buycount;
                });
                this.goodlist = res.data.message;
            });
        }
    }
</script>
<style>
.el-form-item { 
    width: 600px;
    margin: 22px auto;
}
</style>
