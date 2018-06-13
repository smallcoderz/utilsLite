<template style="width:100%;height: 100%;">
    <div class="page">
        <div class="headerImgBox">
            <image class="headerImg" mode="aspectFix" :src=detailDate.pict_url ></image>
        </div>
        <div class="detailTitle">
            <span class="dongdongqiang">咚咚抢</span>
            {{detailDate.title}}
        </div>
        <div class="detailContent">
            <div class="detailPrice">
                <div>
                     <span v-text="'￥'+ detailDate.coupon_final_price"></span>
                    券后价
                    <span v-text="detailDate.coupon_value"></span>
                </div>
            </div>
            <div class="detailVolume">
                <i>1</i>
                <span v-text="detailDate.volume"></span>
                已买
            </div>
        </div>
        <div class="textImgDetail">
            查看图文详情
            <div>
                点击展开
                <i> > </i>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                params:{
                    m: 'shop.goods.item',
                    id:'',
                },
                detailDate:{},
            }
        },
        components: {

        },
        computed: {},
        methods: {
            initialize(request){
                wx.request({
                    url: 'https://wxapp.00sg.com/api/router',
                    data: request,
                    success: (res) => {
                        this.isLoad = false;
                        console.log('商品详情数据',res)
                        if(res.data.ok){
                            this.detailDate = res.data.data;
                        }
                    }
                })
            },

        },
        onLoad (options) {
            // this.params.id = options.id;
            this.params.id = '553096266147';
            this.initialize(this.params);
        },
        showLoad(){

        },
        created () {
        },

    }
</script>

<style scoped>
    .page {
        background-color: #F9F9F9;
    }
    .headerImg{
        width: 100%;
    }

</style>
