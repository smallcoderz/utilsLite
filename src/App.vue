<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    console.log('app created and cache logs by setStorageSync')
  }
}
</script>

<style>
    page {
        height: 100%;
        font-weight: 100;
        background-color: #fdfdfd;
        overflow-x: hidden;
    }

    .container {
        /*height: 100%;*/
        /*display: flex;*/
        /*flex-direction: column;*/
        /*align-items: center;*/
        /*justify-content: space-between;*/
        /*padding: 200rpx 0;*/
        /*box-sizing: border-box;*/
    }

    /* this rule will be remove */
    /** {*/
        /*transition: width 2s;*/
        /*-moz-transition: width 2s;*/
        /*-webkit-transition: width 2s;*/
        /*-o-transition: width 2s;*/
    /*}*/
    /* project id 616773 */
    @font-face {
        font-family: 'iconfont';
        src: url('//at.alicdn.com/t/font_616773_mbl6lshxog.eot');
        src: url('//at.alicdn.com/t/font_616773_mbl6lshxog.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_616773_mbl6lshxog.woff') format('woff'),
        url('//at.alicdn.com/t/font_616773_mbl6lshxog.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_616773_mbl6lshxog.svg#iconfont') format('svg');
    }

    .clear::after {
        content:" ";
        display:block;
        clear:both;
    }

    .fl{
        float: left;
    }

    .fr{
        float: right;
    }

    .iconfont {
        font-family:"iconfont" !important;
        font-size:16px;
        font-style:normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    .icon-top:before { content: "\e637"; }

    .icon-right:before { content: "\e6a7"; }

    .icon-left:before { content: "\e697"; }

    .icon-iconfonterweima:before { content: "\e620"; }

    .icon-wc:before { content: "\ed94"; }

    .icon-ai-calendar:before { content: "\e627"; }

    .icon-zhinanzhen:before { content: "\e655"; }

    .icon-weibiaoti556:before { content: "\e644"; }

    .icon-duoyun:before { content: "\e646"; }

    .icon-zhongyu1:before { content: "\e648"; }

    .icon-wu1:before { content: "\e649"; }

    .icon-leizhenyu1:before { content: "\e64a"; }

    .icon-bingbao:before { content: "\e64b"; }

    .icon-daxue1:before { content: "\e64c"; }

    .icon-shachen:before { content: "\e64d"; }

    .icon-taifeng:before { content: "\e64e"; }

    .icon-kuaidi:before { content: "\e645"; }

    .icon-qingtian:before { content: "\e60a"; }

    .icon-yule:before { content: "\e66c"; }

    .icon-gongjiao:before { content: "\e604"; }


</style>
