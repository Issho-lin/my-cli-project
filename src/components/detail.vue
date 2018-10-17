<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <!-- <button @click="addCount">点击++</button> -->
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box" v-if="images.normal_size.length!=0">
                                <ProductZoomer :base-images="images" :base-zoomer-options="zoomerOptions" />
                            </div>
                            <div class="goods-spec">
                                <h1>{{ goodsinfo.title }}</h1>
                                <p class="subtitle">{{ goodsinfo.sub_title }}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{ goodsinfo.goods_no }}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{ goodsinfo.market_price }}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{ goodsinfo.sell_price }}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="buyNum" @change="handleChange" :min="1" :max="goodsinfo.stock_quantity" size="small"></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                    库存
                                                    <em id="commodityStockNum">{{ goodsinfo.stock_quantity }}</em>件
                                                </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="addCart" class="add" ref="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" :class="{selected:isSelected}" @click="isSelected = true">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" :class="{selected:!isSelected}" @click="isSelected=false">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div class="tab-content entry" v-show="isSelected" v-html="goodsinfo.content">
                            </div>
                            <div class="tab-content" v-show="!isSelected">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！" v-model="comment" @keyup.enter="addComment"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit" @click="addComment">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in commentlist" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{ item.user_name }}</span>
                                                    <span>{{ item.add_time | beautifyTime('/','/',' ',1) }}</span>
                                                </div>
                                                <p>{{ item.content }}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[5,10,15,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalcount">
                                    </el-pagination>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="`/detail/${item.id}`">
                                                <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                                <img :src="item.img_url">
                                                <!-- </a> -->
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <!-- <a href="#/site/goodsinfo/90" class=""> -->
                                            <router-link :to="`/detail/${item.id}`">
                                                {{ item.title }}
                                            </router-link>
                                            <!-- </a> -->
                                            <span>{{ item.add_time | beautifyTime('-','-',' ') }}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <img :src="imglist.length==0?'':imglist[0].thumb_path" class="fly-img" ref="flyImg" style="display:none">
    </div>
</template>
<script>
import $ from 'jquery';
    export default {
        name: 'detail',
        data() {
            return {
                id: '',
                goodsinfo: {},
                hotgoodslist: [],
                imglist: [],
                pageIndex: 1,
                pageSize: 5,
                currentPage4: 1,
                totalcount: 0,
                commentlist: [],
                comment: '',
                buyNum: 1,
                count: 0,
                isSelected: true,
                // goodsCount: 0,
                // goodsAtCart: {},
                images: {
                    normal_size: [],
                },
                zoomerOptions: {
                    zoomFactor: 4,
                    pane: 'container-round',
                    hoverDelay: 300,
                    namespace: 'inline-zoomer',
                    move_by_click:true,
                    scroll_items: 5,
                    choosed_thumb_border_color: "#bbdefb"
                }
            }
        },
        methods: {
            getProductData() {
                this.images.normal_size = [];
                this.$axios.get(`/site/goods/getgoodsinfo/${this.id}`).then(res => {
                    // console.log(res);
                    // this.productlist = res.data.message;
                    this.goodsinfo = res.data.message.goodsinfo;
                    this.hotgoodslist = res.data.message.hotgoodslist;
                    this.imglist = res.data.message.imglist;
                    this.imglist.forEach(v => {
                        this.images.normal_size.push({
                            id: v.id,
                            url: v.thumb_path
                        });
                    });
                });
            },
            getCommentData() {
                this.$axios.get(`/site/comment/getbypage/goods/${this.id}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`).then(res => {
                    // console.log(res);
                    this.commentlist = res.data.message;
                    this.totalcount = res.data.totalcount;
                });
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getCommentData();
            },
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getCommentData();
            },
            handleChange(value) {
                // console.log(value);
                this.count = value;
            },
            addComment() {
                if(!this.comment.trim()){
                    this.$message({
                        message: '评论内容不能为空',
                        type: 'warning'
                    });
                    return;
                }
                let data = new URLSearchParams();
                data.append('commenttxt', this.comment.trim());
                this.$axios({
                    url: `site/validate/comment/post/goods/${this.id}`,
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data
                }).then(res => {
                    // console.log(res);
                    if(res.status==200){
                        this.getCommentData();
                        this.pageIndex = 1;
                        this.comment = '';
                        this.$message({
                            message: '评论成功！',
                            type: 'success'
                        });
                    }else{
                        this.$message.error('评论失败');
                    }
                });
            },
            addCart() {
                $(this.$refs.flyImg).stop().css($(this.$refs.add).offset()).show().addClass('ani').animate($(this.$parent.$refs.cart).offset(),1000,()=>{
                    console.log(this);
                    $(this.$refs.flyImg).removeClass('ani').hide();
                    this.$store.commit('addGoods',{
                        id: this.id,
                        addNum: this.buyNum
                    });
                });

                
                // this.$store.commit('increment')

                // console.log(this.$store.state.count)
                // this.goodsAtCart = this.$store.state.cartGoods;
                // this.goodsCount = this.$store.getters.goodsCount;
                // this.goodsCount = this.$store.state.totalCount;

            }
        },
        created() {
            this.id = this.$route.params.id;
            this.getProductData();
            this.getCommentData();
        },
        watch: {
            $route(to) {
                this.id = to.params.id;
                this.getProductData();
                this.getCommentData();
                this.buyNum = 1;
            }
        }
    }
</script>
<style>
.tab-content.entry img{
    display: block;
}
.pic-box{
    width: 250px;
    margin-left: 50px;
}
.preview-box{
    width: 250px;
    height: 250px;
}
.thumb-list .responsive-image{
    width: 49px;
    height: 49px;
}
.fly-img{
    width: 60px;
    height: 60px;
    position: absolute;
}
.fly-img.ani{
    opacity: 0;
    transform: rotate(1800deg) scale(.2);
    transition: transform 1s,opacity 2s;
}

</style>

