<template style="width:100%;height: 100%;">
    <scroll-view class="page" :scroll-y="!isShowMask">
        <div class="content">
            <div class="headerImgBox">
                <image class="headerImg" mode="aspectFix" :src=detailDate.pict_url ></image>
            </div>

            <div class="detailDescBox">
                <div class="detailTitle">
                    <span class="ddqIcon">咚咚抢</span>
                    {{detailDate.title}}
                </div>
                <div class="detailContent clear">
                    <div class="detailPrice fl">
                        <div class="clear">
                            <span class="fl">
                                <span class="finalPrice" v-text="'￥'+ detailDate.coupon_final_price"></span>
                                <span class="couponPrice">券后价</span>
                            </span>

                            <span class="couponBox fl">
                                <span class="quanIcon">券</span>
                                <span class="couponValue" v-text="detailDate.coupon_value"></span>
                            </span>
                        </div>
                    </div>
                    <div class="detailVolume fr">
                        <i class="icon"></i>
                        <span class="volume" v-text="detailDate.volume"></span>
                        <span class="sale">已买</span>
                    </div>
                </div>
                <div class="labelourceBox">
                    <span class="labelource" v-if="detailDate.user_type==0">淘宝</span>
                    <span class="labelource" v-if="detailDate.user_type==1">天猫</span>
                </div>
            </div>

            <!--图文详情-->
            <div class="textImgDetail clear">
                <div class="toggleTuWen" @tap="toggleTuwenFn">
                    <span class="text">查看图文详情</span>
                    <div class="fr unfoldBtn">
                        点击展开<i class="rightIcon" :class="{todown:isShowTuWen}"></i>
                    </div>
                </div>
                <div class="textImgContent" v-if="isShowTuWen">
                    <image v-for="list in tuwenData" :key="list" class="tuwenImg" mode="aspectFix" :src=list></image>
                </div>
            </div>
        </div>

        <!--小编推荐-->
        <div class="recommendBox">
            <div class="recommendTitle">
                <div class="recommendContent">
                    <i class="leftIcon"></i>
                    小编推荐
                    <i class="rightIcon"></i>
                </div>
            </div>
            <div class="merchItemBox clear">
                <div class="merchItem" v-for="list in recommendDate" :key="list" @tap="updateDate(list.num_iid)">
                    <div class="merchItemImgBox">
                        <image class="merchItemImg" mode="aspectFix" :src=list.pict_url></image>
                        <div class="discountIcon">
                            <span>￥</span>
                            <span>80</span>
                        </div>
                    </div>
                    <div class="title" v-text="list.title"></div>
                    <div class="purchaseInfo clear">
                        <div class="finalPriceBox fl">
                            <span class="finalPrice" v-text="'￥'+list.coupon_final_price"></span>
                            券后
                        </div>
                        <div class="volumeBox fl">
                            <span class="volume" v-text="list.volume"></span>
                            人已买
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footerBox clear">
            <div class="shareBtn fl" @tap="toggleCopyFn">
                <i class="buyIcon"></i>
                分享
            </div>

            <!--todo 暂时隐藏 个人觉得可以省略这一步-->
            <!--<div class="share" :class="{fadeinup:isShowTuWen}">-->
                <!--<i class="shareIcon"></i>-->
                <!--通过口令分享-->
            <!--</div>-->

            <div class="purchaseBtn fl" @tap="purchaseFn">领券购买</div>
        </div>

        <!--弹出层-->
        <div class="modalBox" :class="{modalboxshow:isShowCopy}">
            <div class="body">
                <div class="title">
                    复制分享信息
                </div>
                <div class="content">
                    {{detailDate.title}} <br>
                    【原价】{{detailDate.zk_final_price}}元<br>
                    【券后】{{detailDate.coupon_final_price}}元<br>
                    【复制此信息打开手机淘宝即可查看并下单】<br>
                    {{detailDate.tkl}}
                </div>
                <p class="text">长按文字区域手动复制淘口令</p>
                <div class="footer" @tap="copyText" :class="{textsuccess:copySuccess}">
                    一键复制
                </div>
            </div>
        </div>

        <div class="masking" :class="{maskingin:isShowMask,maskingout:!isShowMask}"></div>
    </scroll-view>
</template>

<script>
    export default {
        data () {
            return {
                params:{
                    m: 'shop.goods.item',
                    id:'',
                },
                detailDate:{}, //商品详情
                recommendDate:[], //推荐商品
                tuwenData:[], //图文信息
                isShowMask: false, //是否显示蒙板
                isShowTuWen: false, //是否显示图文信息
                isShowCopy: false, //是否显示复制面板
                copySuccess:false,
            }
        },
        components: {

        },
        computed: {},
        methods: {
            initialize(request){ //获取商品详情信息
                wx.request({
                    url: 'https://www.00sg.com/u/wxapp/api/router',
                    data: request,
                    success: (res) => {
                        console.log('商品详情数据',JSON.parse(JSON.stringify(res)))
                        if(res.data.ok){
                            this.detailDate = res.data.data;
                        }
                    }
                })
            },
            getRecommend(){ //获取商品详情信息
                let data = {
                    m: 'shop.goods.recommend',
                    id: this.params.id,
                };
                wx.request({
                    url: 'https://www.00sg.com/u/wxapp/api/router',
                    data: data,
                    success: (res) => {
                        console.log('获取推荐商品',JSON.parse(JSON.stringify(res)))
                        if(res.data.ok){
                            this.recommendDate = res.data.data;
                        }
                    }
                })
            },
            getShowTuwenData(id){ //获取商品详情信息
                let data = {
                    data:{"item_num_id":id},
                    type:'json',
                    callback:'showTuwen'
                };
                wx.request({
                    url: 'https://hws.m.taobao.com/cache/mtop.wdetail.getItemDescx/4.1/',
                    data: data,
                    success: (res) => {
                        console.log('获取图文信息',JSON.parse(JSON.stringify(res)));
                        if(res.statusCode === 200){
                            this.tuwenData = res.data.data.images;
                        }
//                        console.log('this.tuwenData',JSON.stringify(this.tuwenData));
                    }
                })
            },
            toggleTuwenFn(){ //是否显示图文详情
                this.isShowTuWen = !this.isShowTuWen;
            },
            toggleCopyFn(){ //是否显示复制面板
                this.isShowCopy = !this.isShowCopy;
                this.isShowMask = this.isShowCopy;
                rhis.copySuccess = false;
            },
            updateDate(id){ //点击商品展示详情
                this.recommendDate = [];
                this.params.id = id;
                this.initialize(this.params);
                this.getRecommend();
                this.getShowTuwenData(id);
            },
            copyText(){ // 一键复制
                wx.setClipboardData({
                    data: this.detailDate.tkl,
                    success: (res) => {
                        this.copySuccess = true;
                        wx.showToast({
                            title: '打开淘宝APP即可'
                        });
                    },
                })
            },
            purchaseFn(){ //领券购买
                wx.setClipboardData({
                    data: this.detailDate.tkl,
                    success: (res) => {
                        wx.showToast({
                            title: '打开淘宝APP即可！'
                        });
                    },
                })
            },
            maskShow(){ //显示蒙板
                this.isShowMask = true;
            },
            maskHide(){ //关闭蒙板
                this.isShowMask = false;
            }

        },
        onLoad (options) {
            // this.params.id = options.id;
            this.params.id = '553096266147';
            this.initialize(this.params);
            this.getRecommend();
            this.getShowTuwenData(this.params.id);
        },
        showLoad(){

        },
        created () {
        },

    }
</script>

<style scoped>
    .page {
        width: 100%;
        height: 100%;
        background-color: #F9F9F9;
    }
    .content{
        width: 100%;
        font-weight: 300;
        background-color: #fff;
    }
    .headerImg{
        width: 100%;
        height: 300px;
    }
    .detailTitle{
        position: relative;
        font-size: 16px;
        width: 100%;
        height: 18px;
        overflow: hidden;
        color: #454545;
        line-height: 18px;
        box-sizing: border-box;
        margin-top: 10px;
    }
    .detailDescBox{
        padding: 15px;
    }
    .ddqIcon{
        background: #fe4a65;
        height: 16px;
        position: relative;
        left: 0;
        font-size: 12px;
        padding: 0 3px;
        line-height: 16px;
        text-align: center;
        float: left;
        margin-right: 5px;
        color: white;
    }
    .detailPrice .finalPrice{
        color: #fe0000;
        margin-right: 7px;
        font-size: 20px;
        position: relative;
        top: 2px;
    }
    .couponPrice{
        font-size: 12px;
        color: #999;
    }
    .couponBox{
        height: 24px;
        width: 50px;
        display: block;
        font-size: 10px;
        position: relative;
        color: #fff;
        margin-top: 9px;
        margin-left: 10px;
    }
    .couponBox .quanIcon{
        position: absolute;
        left: 0;
        width: 19px;
        height: 17px;
        text-align: center;
        background: #ff9950;
        line-height: 17px;
    }
    .couponBox .couponValue{
        position: absolute;
        left: 17px;
        margin: 0;
        font-size: 12px;
        text-indent: 0;
        text-align: center;
        padding: 0 5px;
        color: #ff6a00;
        background: white;
        line-height: 16px;
        height: 15px;
        border: #ff9950 1px solid;
    }
    .detailContent{
        margin-top: 5px;
    }
    .detailVolume{
        color: #aaa;
        font-size: 14px;
        position: relative;
        padding-left: 19px;
        margin-top: 8px;
    }
    .detailVolume .icon{
        width: 16px;
        height: 16px;
        position: absolute;
        left: 0;
        top: 4px;
        background: url(http://www.00sg.com/img/goods_num.png) 0 0 no-repeat;
        background-size: 100%;
    }
    .detailVolume .volume{
        color: #fe0000;
        font-weight: normal
    }
    .detailVolume .sale{
        color: #aaa;
        font-size: 14px;
        position: relative;
        padding-left: 3px;
    }
    .textImgDetail{
        position: relative;
        z-index: 0;
        padding:0 10px;
        border-bottom: #e9e5e6 1px solid;
        border-top: #e9e5e6 1px solid;
    }
    .toggleTuWen{
        height: 25px;
        padding: 15px 15px;
    }
    .textImgDetail .text{
        line-height: 25px;
        font-size: 16px;
        text-align: left;
        text-indent: 15px;
        color: #666;
    }
    .textImgDetail .textImgContent{
        width: 100%;
    }
    .textImgDetail .textImgContent .tuwenImg{
        width: 100%;
        height: 300px;
    }

    .textImgDetail .unfoldBtn{
        line-height: 25px;
        color: #999;
        font-size: 16px;
        font-style: normal;
    }
    .textImgDetail .rightIcon{
        background: url(http://www.00sg.com/img/cms_06.png) center center no-repeat;
        background-size: 100% auto;
        height: 25px;
        width: 20px;
        float: right;
        transition: 0.3s;
    }
    .todown{
        transform: rotate(90deg);
    }

    .labelourceBox{
        color: #fe4a65;
        display: block;
        height: 32px;
    }
    .labelource{
        border: 1px solid #fe4a65;
        padding: 1px 4px 0;
        font-size: 13px;
        border-radius: 3px;
        line-height: 32px;
        font-weight: 300;
    }
    /*小编推荐*/
    .recommendBox{
        padding: 15px;
        font-weight: 300;
        margin-bottom: 50px;
    }
    .recommendTitle{
        width: 100%;
    }
    .recommendTitle .recommendContent{
        line-height: 16px;
        text-align: center;
        color: #999;
        font-size: 15px;
        height: 30px;
        width: 78px;
        padding: 0 32px;
        margin: 0 auto;
        position: relative;
    }
    .recommendTitle .leftIcon{
        position: absolute;
        background: url(http://www.00sg.com/img/cms-img.png) -134px -116px no-repeat;
        background-size: 287px 800px;
        width: 32px;
        height: 16px;
        top: 0;
        left: 0;
    }
    .recommendTitle .rightIcon{
        position: absolute;
        background: url(http://www.00sg.com/img/cms-img.png) -179px -116px no-repeat;
        background-size: 287px 800px;
        width: 32px;
        height: 16px;
        top: 0;
        right: 0;
    }
    .merchItemBox{
        width: 100%;
    }
    .merchItemBox .merchItem{
        width: 48%;
        float: left;
        text-align: left;
        margin-top: 10px;
        margin-bottom: 10px;
        margin-right: 2%;
        position: relative;
    }
    .merchItemBox .merchItem:nth-child(2n){
        margin-right: 0;
        margin-left: 2%;
    }
    .merchItemImgBox .discountIcon{
        position: absolute;
        top: 0;
        right: 0;
        z-index: 10;
        font-size: 16px;
        background: url(http://www.00sg.com/img/coupon.png) no-repeat;
        background-size: contain;
        height: 50px;
        line-height: 62px;
        width: 50px;
        color: #f8f509;
        text-align: center;
        font-weight: 300;
    }
    .merchItemBox .merchItemImg{
        width: 100%;
        height: 150px;
    }
    .merchItemBox .merchItem .title{
        word-break: break-all;
        width: 100%;
        overflow: hidden;
        color: #a3a3a3;
        font-size: 12px;
        line-height: 18px;
        height: 18px;
    }
    .merchItemBox .finalPriceBox{
        color: #a3a3a3;
        font-size: 12px;
    }
    .merchItemBox .finalPriceBox .finalPrice{
        color: #FE0000;
        font-size: 15px;
    }
    .merchItemBox .volumeBox{
        color: #888;
        font-size: 12px;
        float: right;
        margin-top: 4px;
    }
    .merchItemBox .volumeBox .volume{
        color: #FE0000;
    }

    /*底部按钮*/
    .footerBox{
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        z-index: 99;
    }
    .footerBox .shareBtn{
        width: 40%;
        color: #666;
        background-color: #fff;
        font-size: 12px;
        position: relative;
    }
    .footerBox .shareBtn .buyIcon{
        display: block;
        margin: auto;
        width: 50px;
        height: 50px;
        background: url(http://www.00sg.com/img/share.svg) no-repeat center center;
        background-size: 50% auto;
    }
    .footerBox .share{
        width: 95%;
        left: 2.5%;
        line-height: 50px;
        height: 50px;
        text-align: center;
        color: #666;
        display: block;
        font-size: 16px;
        background-color: #fff;
        position: absolute;
        top: 100%;
        border-radius: 5px;
        z-index: 99;
    }
    .footerBox .share:before{
        content: '';
        position: absolute;
        left: 5%;
        bottom: -10px;
        width: 0;
        height: 0;
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
        border-top: 12px solid #fff;
    }
    .footerBox .shareIcon{
        width: 20px;
        height: 20px;
        top: 5px;
        right: 5px;
        display: inline-block;
        position: relative;
        z-index: 1;
        background: url(http://www.00sg.com/img/buy_fx_code.svg) center center no-repeat;
        background-size: 100% 100%;
    }
    .footerBox .purchaseBtn{
        width: 60%;
        background-color: #FE4A65;
        color: #fff;
    }
    /*弹出层*/
    .modalBox{
        width: 90%;
        height: 0;
        opacity: 0;
        overflow: hidden;
        /*top: 10%;*/
        /*left: 5%;*/
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        position: fixed;
        background-color: #fff;
        border-radius: 5px;
        font-weight: 300;
        box-sizing: border-box;
        z-index: 99;
        transition: opacity 0.3s;
    }
    .modalBox .body{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0 15px 15px 15px;
    }
    .modalboxshow{
        height: 70%;
        opacity: 1;
    }
    .modalBox .title{
        text-align: center;
        background: linear-gradient(to right, #FD65EA, #FFBF63);
        -webkit-background-clip: text;
        color: transparent;
        font-size: 20px;
        padding: 10px 0;
    }
    .modalBox .content{
        padding: 15px;
        box-sizing: border-box;
        background: #F1F1F1;
        color: #333;
        font-size: 18px;
        line-height: 24px;
        height: 260px;
        border-radius: 4px;
        overflow: hidden
    }
    .modalBox .text{
        line-height: 28px;
        color: #AAA;
        font-size: 12px;
        padding-bottom: 10px;
    }
    .modalBox .footer{
        display: block;
        border-radius: 50px;
        line-height: 40px;
        height: 40px;
        background-color: #FE4A65;
        text-align: center;
        color: #fff;
        font-size: 16px;
    }
    .textsuccess{
        background-color: #1FB931 !important;
    }
    /*蒙板*/
    .masking{
        width: 100%;
        height: 0;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #000;
        z-index: 90;
        transition:opacity 0.3s;
    }
    .maskingin{
        opacity: 0.7;
        height: 100%;
    }
    .maskingout{
        opacity: 0;
    }
    .fadeinup{
        animation:fade-in-up 0.3s ease-in-out forwards;
    }
    .fadeindown{
        animation:fade-in-down 0.3s ease-in-out forwards;
    }

    /*动画*/
    @keyframes fade-in-up {
        0% {
            top:100%
        }
        70% {
            top:-170%
        }
        100% {
            top:-150%;
        }
    }
    /*动画*/
    @keyframes fade-in-down {
        0% {
            top:-150%
        }
        100% {
            top:100%
        }
    }
</style>
