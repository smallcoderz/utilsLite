<template style="width:100%;height: 100%;overflow-x: hidden;">
    <div class="searchPageBox">
        <div class="headerBox">
            <div class="searchTitle">
                搜券
            </div>
            <div class="searchFeature">
                <span class="backBtn" @tap="backHome"></span>
                <input type="text" class="searchInput" v-model="searchName">
                <button class="searchBtn" @tap="searchTap">搜索</button>
            </div>
        </div>
        <div class="content">
            <div class="searchClass">
                <p class="title">热门搜索</p>
                <div class="clear">
                    <span class="item" v-for="list in hotkeydata" :key="list" v-text="list" @tap="searchHotkey(list)"></span>
                </div>
            </div>
            <!--<div class="searchClass">-->
                <!--<p class="title">热门搜索</p>-->
                <!--<div class="clear">-->
                    <!--<span class="item">口红</span>-->
                <!--</div>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    export default {
        props:['hotkeydata'],
        data () {
            return {
                swiperDate:[],
                searchName:'',
            }
        },
        components: {},
        computed: {},
        methods: {
            backHome(){ //返回主页
                this.$emit('closeSearchPage')
            },
            searchTap(){
                this.$emit('searchInfo',this.searchName)
            },
            getKeyword(){  //获取关键字数据
                wx.request({
                    url: 'https://www.00sg.com/u/wxapp/api/router?m=shop.goods.keyword',
                    data: {},
                    success: (res) => {
                        console.log('关键字数据',res)
                        if(res.data.ok){
                            this.swiperDate = res.data.lunbo;
                        }
                    }
                })
            },
            searchHotkey(val){ //点击关键字搜索
                this.$emit('searchInfo',val)
            }
        },
        onLoad () {

        },
        showLoad(){

        },
        created () {
        }
    }
</script>

<style scoped>
    page {
        height: 100%;
        width: 100%;
        overflow-x: hidden;
    }
    .searchPageBox{
        width: 100%;
        height: 100%;
        position: relative;
        top: 0;
        left: 0;
        background-color: #fff;
    }
    .headerBox{
        width: 100%;
        height: 90px;
        background: -moz-linear-gradient(left,#FF3D6F,#FF5BA6);
        background: -webkit-linear-gradient(left,#FF3D6F,#FF5BA6);
        background: -o-linear-gradient(left,#FF3D6F,#FF5BA6);
    }
    .searchTitle{
        padding-top: 15px;
        color: #fff;
        font-size: 18px;
        text-align: center;
    }
    .searchFeature{
        width: 100%;
        position: relative;
        margin-top: 10px;
    }
    .backBtn{
        position: absolute;
        left: 20px;
        width: 28px;
        height: 28px;
        background: url(http://www.00sg.com/img/imgs.png) -32px 0 no-repeat;
        background-size: 287px 800px;
        float: left;
    }
    .searchInput{
        border-radius: 20px;
        background-color: #fff;
        width: 180px;
        height: 28px;
        line-height: 28px;
        color: #333;
        font-size: 12px;
        margin-left: 60px;
        padding-left: 20px;
        padding-right: 70px;
    }
    .searchBtn{
        width: 18%;
        height: 29px;
        background: #FFB925;
        color: #fff;
        float: right;
        margin-top: -28px;
        position: relative;
        border-radius: 15px;
        margin-right: 9%;
        z-index: 10;
        font-size: 15px;
        line-height: 29px;
        font-weight: 200;
    }
    .content{

    }
    .searchClass{
        width: 100%;
        padding: 20px 10px;
    }
    .searchClass .title{
        display: block;
        height: 20px;
        line-height: 20px;
        font-size: .9em;
        color: #999;
        margin-bottom: 10px;
    }
    .searchClass .item{
        float: left;
        border-radius: 22px;
        padding: 0 10px;
        height: 23px;
        line-height: 23px;
        background-color: #f6f6f6;
        margin: 10px;
        position: relative;
        font-size: 13px;
        color: #333;
    }
</style>
