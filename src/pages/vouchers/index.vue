<template style="width:100%;height: 100%;">
    <div class="page">

        <!-- 搜索页面组件 -->
        <div class="searchPageBox" :class="{height100 : searchPageIsShow}">
            <SearchPage @closeSearchPage="closeSearchPage" @searchInfo="searchInfo"></SearchPage>
        </div>

        <!--商品分类组件-->
        <div class="searchClassBox" :class="{height100 : searchClassIsShow}" @touchmove="catchtouchmove">
            <div class="topTitle" @tap="showSearchClass"></div>
            <SearchClass @closeSearchClass="closeSearchClass" @searchClassInfo="searchClassInfo"></SearchClass>
        </div>

        <div class="searchTitle clear">
            <span class="main-logo fl">搬券大师</span>
            <div class="fl searchBox">
                <icon class="searchIcon" type="search" size="14"/>
                <div class="searchInput" @tap="showSearchPage" v-if="!param.q">来搜一搜吧，海量优惠</div>
                <div class="searchInput" @tap="showSearchPage" v-if="param.q" v-text="param.q"></div>
            </div>

            <!--商品分类-->
            <div class="searchClassBtn" @tap="showSearchClass"></div>
        </div>

        <!--滚动区域-->
        <scroll-view class="scrollView" :class="{ noscroll: !isNoscroll }" :scroll-y="isNoscroll" @scrolltolower="onPullUp" lower-threshold="400">

            <!--轮播模块-->
            <swiper indicator-dots="true" autoplay="true">
                <div v-for="list in swiperDate" :key="list">
                    <swiper-item>
                        <image class="compassbg slide-image" :src=list></image>
                    </swiper-item>
                </div>
            </swiper>

            <!--商品item-->
            <div class="merchandiseBox">
                <div class="titleBox">
                    <div class="title"></div>
                </div>
                <div class="merchandiseItemBox clear">
                    <view class="merchandiseItem" v-for="list in merchDate" :key="list" @tap="toDetailTap(list.num_iid)">
                        <div class="imgInfo">
                            <image mode="aspectFix" class="image" :src=list.pict_url ></image>
                        </div>
                        <div class="textInfo" v-text="list.title"></div>
                        <div class="priceInfo clear">
                            <div class="fl price">
                                <span class="stress" v-text="'￥'+list.coupon_final_price"></span>券后
                            </div>
                            <div class="fr volume">
                                <span v-text="'销量'+list.volume"></span>
                            </div>

                        </div>
                    </view>
                </div>
            </div>
        </scroll-view>
    </div>
</template>

<script>
    import SearchPage from './components/searchPage'
    import SearchClass from './components/searchClass'
    export default {
        data () {
            return {
                swiperDate:[], //轮播数据
                merchDate:[], //商品数据
                isNoscroll: true, //是否禁止滚动
                searchPageIsShow: false, //商品搜索
                searchClassIsShow: false, //商品分类
                page:1,
                param:{
                    m: 'shop.goods.search',
                    q:'', //关键字
                    c:'', //商品类目 1.女装、2.男装、3.鞋品、4.箱包、5.母婴、6.美妆、7.内衣、8.配饰、9.美食、10.数码家电、11.居家日用、12.家装家纺、13.文娱车品、14.户外运动
                    page:'', //页数
                    sort:'', //排序方式 1.销量从高到低；2.价格从低到高；3.价格从高到低；
                    start_price:'', //价格区间起始值
                    end_price:'', //价格区间结束值
                    is_hy:'', //有此参数表示限定为海外购
                    is_tm:'', //有此参数表示限定为天猫
                    is_by:'', //有此参数表示限定为包邮
                },
                isLoad: false,
            }
        },
        components: {
            SearchPage,
            SearchClass,
        },
        computed: {},
        methods: {
            initialize(request){
                request.page = this.page;
                for(let keyName in request){
                    if(!request[keyName]){
                        delete request[keyName];
                    }
                }
                wx.request({
                    url: 'https://wxapp.00sg.com/api/router',
                    data: request,
                    success: (res) => {
                        this.isLoad = false;
                        console.log('搜索结果',res)
                        if(res.data.ok){
                            if(this.page == 1){
                                this.merchDate = res.data.data.goods;
                            }else {
                                this.merchDate = this.merchDate.concat(res.data.data.goods);
                            }
                            this.page = res.data.data.next_page;
                        }
                    }
                })
            },
            getViewpagerDate(){  //获取轮播图
//                let res = {"ok":true,"code":100,"lunbo":["http:\/\/www.00sg.com\/ad\/01.jpg","http:\/\/www.00sg.com\/ad\/01.jpg","http:\/\/www.00sg.com\/ad\/02.jpg","http:\/\/www.00sg.com\/ad\/03.jpg","http:\/\/www.00sg.com\/ad\/04.jpg","http:\/\/www.00sg.com\/ad\/05.jpg"]};
//                console.log('res',res);
//                if(res.ok){
//                    this.swiperDate = res.lunbo;
//                }
                 wx.request({
                     url: 'https://wxapp.00sg.com/api/router?m=shop.pub.ad',
                     data: {},
                     success: (res) => {
                         console.log('轮播图',res)
                         if(res.data.ok){
                             this.swiperDate = res.data.lunbo;
                         }
                     }
                 })
            },
            reset(){ //重置参数
                this.param = {
                    m: 'shop.goods.search',
                    q:'', //关键字
                    c:'', //商品类目 1.女装、2.男装、3.鞋品、4.箱包、5.母婴、6.美妆、7.内衣、8.配饰、9.美食、10.数码家电、11.居家日用、12.家装家纺、13.文娱车品、14.户外运动
                    page:'', //页数
                    sort:'', //排序方式 1.销量从高到低；2.价格从低到高；3.价格从高到低；
                    start_price:'', //价格区间起始值
                    end_price:'', //价格区间结束值
                    is_hy:'', //有此参数表示限定为海外购
                    is_tm:'', //有此参数表示限定为天猫
                    is_by:'', //有此参数表示限定为包邮
                }
            },
            showSearchPage(){ //显示搜索页面
                this.searchPageIsShow = !this.searchPageIsShow;
                this.isNoscroll = !this.isNoscroll;
            },
            showSearchClass(){
                this.searchClassIsShow = !this.searchClassIsShow;
                this.isNoscroll = !this.isNoscroll;
            },
            closeSearchPage(){
                this.showSearchPage();
            },
            closeSearchClass(){
                this.showSearchClass();
            },
            onPullUp(){ //上拉刷新
                if(!this.isLoad){
                    this.initialize(this.param); // 搜索
                }
                this.isLoad = true;
            },
            catchtouchmove(){

            },
            searchInfo(val){ //模糊搜索
                this.reset()
                this.param.q = val;
                this.page = 1;
                this.initialize(this.param);
                this.showSearchPage();
            },
            searchClassInfo(val){ //点击分类搜索
                this.reset();
                this.param.c = val;
                this.page = 1;
                this.initialize(this.param);
                this.showSearchClass();
            },
            toDetailTap(val){ //进入详情页面
                wx.navigateTo({url: '../merchdetail/merchdetail?id=' + val})
            }
        },
        onLoad () {

        },
        showLoad(){

        },
        created () {
            this.initialize(this.param); // 搜索
            this.getViewpagerDate(); //获取轮播图数据
        },
//        onPullDownRefresh(){
//            wx.showLoading({
//                title: '加载中',
//                mask: true,
//            });
//            setTimeout(function(){
//                wx.hideLoading()
//            },2000);
//            wx.stopPullDownRefresh();
//            console.log('下拉刷新');
//        },
    }
</script>

<style scoped>
    .page {
        height: 100%;
        font-weight: 100;
        overflow-x: hidden;
        background-color: #faf5f6;
    }
    .noscroll {
        top: 0 !important;
        left:0 !important;
        bottom: 0 !important;
        right: 0 !important;
        overflow:hidden !important;
        position:fixed !important;
        z-index:0 !important;
    }
    .scrollView{
        height: 90% ;
        margin-top: 44px;
    }
    .searchTitle {
        width: 100%;
        height: 44px;
        background: -moz-linear-gradient(left,#FF3D6F,#FF5BA6);
        background: -webkit-linear-gradient(left,#FF3D6F,#FF5BA6);
        background: -o-linear-gradient(left,#FF3D6F,#FF5BA6);
        position: fixed;
        top: 0;
    }
    .searchTitle .main-logo {
        max-width: 97px;
        font-weight: 700;
        font-size: 19px;
        margin-left: 10px;
        color: #fff;
        overflow: hidden;
        line-height: 44px;
    }
    .searchBox{
        width: 230px;
        background-color: #fff;
        border-radius: 5px;
        min-width: 50%;
        margin-left: 10px;
        line-height: 28px;
        height: 28px;
        position: relative;
        top: 9px;
    }
    .searchIcon{
        position: absolute;
        font-weight: bold;
        top: 7px;
        left: 8px
    }
    .searchInput{
        font-size: 14px;
        color: #666;
        padding-left: 30px;
    }
    .searchClassBtn{
        position: relative;
        z-index: 7;
        background: url(http://www.00sg.com/img/imgs.png) 0 2px no-repeat;
        background-size: 287px 800px;
        width: 30px;
        height: 30px;
        margin-left: 2px;
        top: 9px;
        right: 10px;
        float: right;
    }
    .searchClassBox,.searchPageBox{
        position: fixed;
        top:0;
        left: 0;
        width: 100%;
        height: 0;
        z-index: 10;
        overflow: hidden;
        transition: 0.5s ease;
    }
    .height100{
        height: 100% !important;
    }
    .searchClassBox .topTitle{
        width: 100%;
        height: 44px;
        background-color: transparent
    }
    .compassbg{
        width: 100%;
        height: 100%;
        display: block;
        object-fit: cover;
    }
    /*商品item模块*/
    .merchandiseBox{
        width: 100%;

    }
    .merchandiseBox .titleBox{
        padding: 11px .5rem .5rem;
        height: 14px;
    }
    .merchandiseBox .title{
        color: #363535;
        width: 84px;
        height: 16px;
        background: url(http://www.00sg.com/img/imgs.png) -13px -29px no-repeat;
        background-size: 287px 800px;
        padding-left: .5rem;
        border-left: 3px solid #fe4a65;
    }
    .merchandiseItemBox{
        margin-bottom: 10px;
    }
    .merchandiseItem{
        margin-left: 10px;
        margin-top: 10px;
        width: 46%;
        display: block;
        text-align: left;
        float: left;
        border: 1px solid #cccccc;
        box-sizing: border-box;
    }
    .merchandiseItem:nth-child(2n) {
        float: right;
        margin-right: 10px;
    }
    .merchandiseItem .imgInfo{
        width: 100%;
    }
    .merchandiseItem .image{
        width: 100%;
        height: 145px;
    }
    .merchandiseItem .textInfo{
        word-break: break-all;
        overflow: hidden;
        color: #777;
        font-size: 13px;
        line-height: 18px;
        text-align: left;
        margin: 0 5px;
        height: 36px;
        font-weight: 200;
    }
    .merchandiseItem .priceInfo{
        width: 100%;
        color: #aaa;
        font-size: 12px;
        display: inline-block;
        margin-left: 5px;
    }
    .merchandiseItem .priceInfo .price{
        margin-top: 5px;
    }
    .merchandiseItem .priceInfo .price .stress{
        color: #FE0000;
        font-size: 15px;
        margin-right: 5px;
    }
    .merchandiseItem .priceInfo .volume{
        margin-right: 15px;
        margin-top: 8px;
    }
</style>
