<template style="width:100%;height: 100%;">
    <div class="page">
        <scroll-view style="height: 100% ;" scroll-y="true" @scrolltolower="onPullUp" lower-threshold="400">
            <div class="main-title clear">
                <a href="/" class="main-logo fl">搬券大师</a>
                <div class="fl searchBox">
                    <icon class="searchIcon" type="search" size="14"/>
                    <div class="searchInput" @tap="showSearchPage">来搜一搜吧，海量优惠</div>
                </div>
                <div class="searchClass"></div>
                <!-- 搜索页面组件 -->
                <div class="searchPage" v-if="searchPageIsShow">
                    <SearchPage @closeSearchPage="closeSearchPage"></SearchPage>
                </div>
            </div>
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
                    <view class="merchandiseItem"></view>
                    <view class="merchandiseItem"></view>
                    <view class="merchandiseItem"></view>
                    <view class="merchandiseItem"></view>
                    <view class="merchandiseItem"></view>
                    <view class="merchandiseItem"></view>
                    <view class="merchandiseItem"></view>
                    <view class="merchandiseItem"></view>
                    <view class="merchandiseItem"></view>
                    <view class="merchandiseItem"></view>
                    <view class="merchandiseItem"></view>
                    <view class="merchandiseItem"></view>
                    <view class="merchandiseItem"></view>
                    <view class="merchandiseItem"></view>
                    <view class="merchandiseItem"></view>
                    <view class="merchandiseItem"></view>
                </div>
            </div>
        </scroll-view>
    </div>
</template>

<script>
    import SearchPage from './components/searchPage'
    export default {
        data () {
            return {
                swiperDate:[],
                searchPageIsShow: false,
            }
        },
        components: {
            SearchPage,
        },
        computed: {},
        methods: {
            getViewpagerDate(){  //获取轮播图
                let res = {"ok":true,"code":100,"lunbo":["http:\/\/www.00sg.com\/ad\/01.jpg","http:\/\/www.00sg.com\/ad\/01.jpg","http:\/\/www.00sg.com\/ad\/02.jpg","http:\/\/www.00sg.com\/ad\/03.jpg","http:\/\/www.00sg.com\/ad\/04.jpg","http:\/\/www.00sg.com\/ad\/05.jpg"]};
                console.log('res',res);
                if(res.ok){
                    this.swiperDate = res.lunbo;
                }
                // wx.request({
                //     url: 'https://wxapp.00sg.com/api/router?m=shop.pub.ad',
                //     data: {},
                //     success: (res) => {
                //         console.log('res',res)
                //         if(res.ok){
                //             this.swiperDate = res.lunbo;
                //         }
                //     }
                // })
            },
            showSearchPage(){ //显示搜索页面
                console.log('q123123');
                this.searchPageIsShow = true;
            },
            closeSearchPage(){ //关闭搜索页面
                this.searchPageIsShow = false;
            },
            onPullUp(){ //上拉刷新
                wx.showLoading({
                    title: '加载中',
                    mask: true,
                });
                setTimeout(function(){
                    wx.hideLoading()
                },2000);
                console.log('上拉加载');
            }
        },
        onLoad () {

        },
        showLoad(){

        },
        created () {
            this.getViewpagerDate(); //获取轮播图数据
        },
        onPullDownRefresh(){
            wx.showLoading({
                title: '加载中',
                mask: true,
            });
            setTimeout(function(){
                wx.hideLoading()
            },2000);
            wx.stopPullDownRefresh();
            console.log('下拉刷新');
        },
    }
</script>

<style scoped>
    .page {
        height: 100%;
        font-weight: 100;
        overflow-x: hidden;
        background-color: #faf5f6;
    }
    .main-title {
        width: 100%;
        left: 50%;
        height: 44px;
        background: -moz-linear-gradient(left,#FF3D6F,#FF5BA6);
        background: -webkit-linear-gradient(left,#FF3D6F,#FF5BA6);
        background: -o-linear-gradient(left,#FF3D6F,#FF5BA6);
    }
    .main-title .main-logo {
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
        left: 8px;
    }
    .searchInput{
        font-size: 14px;
        color: #666;
        padding-left: 30px;
    }
    .searchClass{
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
    .searchPage{
        width: 100%;
        height: 100%;
    }
    .searchPage{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 10;
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
        height: 100px;
        margin-left: 10px;
        margin-top: 10px;
        background-color: burlywood;
        width: 46%;
        display: block;
        text-align: left;
        float: left;
    }
    .merchandiseItem:nth-child(2n) {
        float: right;
        margin-right: 10px;
    }
</style>
