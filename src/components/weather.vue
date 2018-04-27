<template style="width:100%;height: 100%;">
  <div class="weather_box">
      <div class="weather_content clear" v-if="weatherInfo">
          <div class="weather_temperature fl">
              <p v-text="degree + '°'"></p>
              <p class="weather_address" v-text="place.ad_info.city + ' ' + weatherInfo.forecast_1h[0].weather" v-if="place.ad_info"></p>
              <!--<span class="weather_state" v-text="currentdate"></span>-->
          </div>

          <div class="weather_logo fr">
              <span class="iconfont icon-qingtian" v-if="weatherStatus==1"></span>
              <span class="iconfont icon-duoyun" v-if="weatherStatus==2"></span>
              <span class="iconfont icon-zhongyu1" v-if="weatherStatus==3"></span>
              <span class="iconfont icon-wu1" v-if="weatherStatus==4"></span>
              <span class="iconfont icon-bingbao" v-if="weatherStatus==5"></span>
              <span class="iconfont icon-daxue1" v-if="weatherStatus==6"></span>
              <span class="iconfont icon-shachen" v-if="weatherStatus==7"></span>
              <span class="iconfont icon-taifeng" v-if="weatherStatus==8"></span>
              <p class="weather_date" v-text="currentdate"></p>
          </div>

          <p class="weather_text fr" v-text="detail"></p>
      </div>
  </div>
</template>

<script>
import QQMapWX from '../../static/js/qqmap-wx-jssdk1.0/qqmap-wx-jssdk.min'

export default {
  data () {
    return {
      userInfo: {},
      qqmapsdk: '',
      place: '', // 地理位置
      weatherInfo: '', // 天气信息
      degree: '00', // 温度
      detail: '今天是个好日子~',
      weatherStatus: 1, // 天气状态
      currentdate: '' // 当前日期
    }
  },

  components: {
    QQMapWX
  },

  methods: {
    bindViewTap () {
      const url = '../logs/logs'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    getLoaction () {
      wx.getLocation({ // 获取位置坐标
        type: 'wgs84',
        success: (res) => {
          this.loadCity(res.longitude, res.latitude)
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    loadCity (longitude, latitude) { // 根据坐标获取城市明名称
      this.qqmapsdk.reverseGeocoder({
        location: {
          latitude: latitude, // 使用 wx.getLocation 的返回值
          longitude: longitude
        },
        success: (res) => {
          if (res.status === 0) {
            // 获取到城市名
            console.log('城市信息', JSON.parse(JSON.stringify(res)))
            this.place = res.result
            let province = res.result.ad_info.province
            let city = res.result.ad_info.city
            this.getWeather(province, city)
          }
        },
        fail: (res) => {
          console.log(res)
        },
        complete: (res) => {
          //  console.log(res);
        }
      })
    },
    getWeather (province, city) {
      wx.request({
        url: 'https://wis.qq.com/weather/common?source=pc&weather_type=observe|forecast_1h|forecast_24h|index|alarm|limit|tips|rise&province=' + province + '&city=' + city + '',
        data: {},
        success: (res) => {
          if (res.statusCode === 200) {
            console.log('天气信息', JSON.parse(JSON.stringify(res.data.data)))
            this.weatherInfo = res.data.data
            this.degree = res.data.data.forecast_1h[0].degree || '00'
            this.detail = res.data.data.index.sports.detail || '今天是个好日子~'
            let weather = this.weatherInfo.forecast_1h[0].weather
            if (/晴/.test(weather)) {
              this.weatherStatus = 1
            } else if (/云/.test(weather) || /阴/.test(weather)) {
              this.weatherStatus = 2
            } else if (/雨/.test(weather)) {
              this.weatherStatus = 3
            } else if (/雾/.test(weather)) {
              this.weatherStatus = 4
            } else if (/冰/.test(weather)) {
              this.weatherStatus = 5
            } else if (/雪/.test(weather)) {
              this.weatherStatus = 6
            } else if (/沙/.test(weather)) {
              this.weatherStatus = 7
            } else if (/风/.test(weather)) {
              this.weatherStatus = 8
            }
          }
        }
      })
    },
    getNowFormatDate () {
      let date = new Date()
      let monthArr = new Array('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Spt', 'Oct', 'Nov', 'Dec')
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
//      if (month >= 1 && month <= 9) {
//        month = '0' + month
//      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      this.currentdate = strDate + ' ' + monthArr[month] + ' ' + year
    }
  },
  onLoad () {
    // 实例化API核心类
    this.qqmapsdk = new QQMapWX({
      key: 'BJTBZ-KCL33-KLO3T-Y5UPU-JYER6-O4BOG'
    })
  },
  created () {
    this.getLoaction()
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
    this.getNowFormatDate() // 获取当前日期
  }
}
</script>

<style scoped>
/*天气*/
.weather_box{
    width: 100%;
    height: 100%;
    background-color: #fdfdfd;
}
.weather_content{
    z-index: 2;
    color: #14142C;
    text-align: center;
}
.weather_temperature{
    font-size: 35px;
    text-align: center;
    padding: 34px 0 0 30px;
}
.weather_logo{
    text-align: right;
    padding: 15px 30px 0 0;
}
.weather_logo span{
    font-size: 55px;
    vertical-align: top;
}
.weather_state{
    font-size: 20px;
    margin-left: 5px;
}
.weather_date{
    font-size: 16px !important;
    margin-top: 7px;
}
.weather_text{
    font-size: 14px !important;
    margin-top: 10px;
    text-align: left;
    padding: 5px 10px;
    text-indent: 28px;
}
.weather_address{
    font-size: 16px;
}
</style>
