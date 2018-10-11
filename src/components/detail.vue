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
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div class="pic-box"></div>
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
                                                <el-input-number size="small" :min="1" :max="goodsinfo.stock_quantity" v-model="buyNum"></el-input-number>
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
                                                <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a href="javascript:;" :class="{selected:isSelected}" @click="isSelected=true">商品介绍</a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" :class="{selected:!isSelected}" @click="isSelected=false">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-content entry" v-show="isSelected" v-html="goodsinfo.content">
                                
                            </div>
                            <div class="tab-content" v-show="!isSelected">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
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
                                                    <span>{{ item.add_time | beautifyTime('/','/',' ',1)}}</span>
                                                </div>
                                                <p>{{ item.content }}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <div id="pagination" class="digg">
                                            <Page :total="totalcount" show-sizer show-elevator placement="top" :page-size-opts="[5,10,15,20]" :page-size="pageSize" @on-change="changePage" @on-page-size-change="changeSize"/>
                                        </div>
                                    </div>
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
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="`/detail/${item.id}`">{{ item.title }}</router-link>
                                            <span>{{ item.add_time | beautifyTime('-','-',' ')}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'detail',
    data() {
        return {
            id: '',
            goodsinfo: {},
            hotgoodslist: [],
            imglist: [],
            commentlist: [],
            totalcount: 0,
            isSelected: true,
            buyNum: 1,
            pageSize: 5,
            pageIndex: 1,
            comment: ''
        }
    },
    methods: {
        getProductData() {
            this.$axios.get(`/site/goods/getgoodsinfo/${this.id}`).then(res=>{
                // console.log(res);
                this.goodsinfo = res.data.message.goodsinfo;
                this.hotgoodslist = res.data.message.hotgoodslist;
                this.imglist = res.data.message.imglist;
            });
        },
        getCommentData() {
            this.$axios.get(`/site/comment/getbypage/goods/${this.id}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`).then(res=>{
                console.log(res);
                this.commentlist = res.data.message;
                this.totalcount = res.data.totalcount;
            });
        },
        changePage(val) {
            this.pageIndex = val;
            this.getCommentData();
        },
        changeSize(val) {
            this.pageSize = val;
            this.getCommentData();
        },
        addComment() {
            let data = new URLSearchParams();                    
            data.append('commenttxt',this.comment);                  
            this.$axios({
                url: `site/validate/comment/post/goods/${this.id}`,
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data
            }).then(res=>{
                // console.log(res);
                this.getCommentData();
                this.comment = '';
            });
        }
    },
    created() {
        this.id = this.$route.params.id;
        this.getProductData();
        this.getCommentData();
    },
    watch: {
        $route(to){
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
</style>

