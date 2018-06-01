<template style="width:100%;height: 100%;">
  <div class="container" @click="clickHandle('test click', $event)">
    <!--<div class="userinfo" @click="bindViewTap">-->
      <!--<img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />-->
      <!--&lt;!&ndash;<div class="userinfo-nickname">&ndash;&gt;-->
        <!--&lt;!&ndash;<card :text="userInfo.nickName"></card>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--</div>-->
      <div class="weather">
          <Weather></Weather>
      </div>
      <view class="section">
          <view class="flex-wrp" style="flex-direction:row;">
              <view class="flex-item" @tap="toCompassTap">
                  <span class="iconfont icon-zhinanzhen"></span>
              </view>
              <view class="flex-item" @tap="toCalendarTap">
                  <span class="iconfont icon-ai-calendar"></span>
              </view>
              <view class="flex-item">
                  <span class="iconfont icon-kuaidi"></span>
              </view>
          </view>

          <view class="flex-wrp" style="flex-direction:row;">
              <view class="flex-item">
                  <span class="iconfont icon-wc"></span>
              </view>
              <view class="flex-item">
                  <span class="iconfont icon-qingtian"></span>
              </view>
              <view class="flex-item">
                  <span class="iconfont icon-gongjiao"></span>
              </view>
          </view>

          <view class="flex-wrp" style="flex-direction:row;">
              <view class="flex-item">
                  <span class="iconfont icon-iconfonterweima"></span>
              </view>
              <view class="flex-item">
                  <span class="iconfont icon-weibiaoti556"></span>
              </view>
              <view class="flex-item">
                  <span class="iconfont icon-yule"></span>
              </view>
          </view>
      </view>
  </div>
</template>

<script>
import Weather from '@/components/weather'

export default {
  data () {
    return {
      userInfo: {}
    }
  },

  components: {
    Weather
  },

  methods: {
    toCompassTap () { // 跳转到指南针页面
      wx.navigateTo({url: '../compass/compass'})
    },
    toCalendarTap () { // 跳转到日历页面
      wx.navigateTo({url: '../calendar/calendar'})
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              console.log('用户信息', res.userInfo)
              this.userInfo = res.userInfo
            }
          })
        }
      })
    }
  },
  onLoad () {
    this.getUserInfo() // 调用应用实例的方法获取全局数据
  },
  onShow () {
  }
}
</script>

<style scoped>
.userinfo {
  /*display: flex;*/
  /*flex-direction: column;*/
  /*align-items: center;*/
}
/*天气*/
.weather{
    width: 100%;
    height: 170px;
    position: relative;
}
/*九宫格菜单*/
.section{
    margin-top: 15px;
}
.flex-wrp {
    display: flex;
}
.flex-item{
    width: 33.3%;
    text-align: center;
    background-color: #14142C;
    /*opacity: 0.8;*/
    border-right: 20px solid #fdfdfd;
    border-bottom: 20px solid #fdfdfd;
    border-radius: 100%;
}
.flex-item:first-child{
    border-left: 20px solid #fdfdfd;
}
.flex-item .iconfont{
    font-size: 45px;
    color: #fff;
    line-height: 95px;
}
.color_arr{
    color: #4690ff;
    color: #f9967c;
    color: #8d989c;

    color: #191919;
    color: #777777;
    color: #d9d9d9;

    color: #2f5bbe;
    color: #b6cbf9;
    color: #ff5d42;

    color: #516161;
    color: #DF6E66;
    color: #14142C;
    color: #798D75;
    color: #BA6162;
    color: #C88D77;
    color: #BDB88D;

    color: #6cd6ff;
    color: #74e6df;
    color: #ffbd99;
    color: #ff9292;
    color: #496e6f;

    color: #93ceff;
    color: #e4ebf6;

    color: #646464;
    color: #ff4664;
    color: #303030;
    color: #9c9c9c;
    color: #bcbcbc;
    color: #dcdcdc;


    color: #8d989c;
    color: #2f5bbe;
    color: #00bc12;
}
</style>
