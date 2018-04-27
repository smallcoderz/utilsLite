<template style="width:100%;height: 100%;">
  <div class="compassBox">
      <div class="compassContent">
          <p v-text="angle" v-if="angle"></p>
          <p v-text="direction" v-if="direction"></p>
      </div>
      <image class="compassbg" :src="compassSrc" :style="compassStyle"></image>
  </div>
</template>

<script>

export default {
  data () {
    return {
      userInfo: {},
      compassSrc: '../../static/img/compass.png',
      angle: '',
      direction: '',
      rotates: '' // 罗盘数据
    }
  },
  components: {},
  computed: {
    compassStyle () {
      return 'transform:rotate(' + this.rotates + 'deg)'
    }
  },
  methods: {
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
    },
    compassInfo () {
      wx.onCompassChange((res) => {
        this.angle = res.direction.toFixed(2) + '°'
        this.rotates = 360 - res.direction.toFixed(0)
        this.direction = this.check(this.rotates);
        console.log('rotates', this.rotates)
      })
    },
    check (i) {
      if (i >= 15 && i <= 75) {
        return '东北'
      } else if (i > 75 && i < 105) {
        return '正东'
      } else if (i >= 105 && i <= 165) {
        return '东南'
      } else if (i > 165 && i < 195) {
        return '正南'
      } else if (i >= 195 && i <= 255) {
        return '西南'
      } else if (i > 255 && i < 285) {
        return '正西'
      } else if (i >= 285 && i <= 345) {
        return '西北'
      } else {
        return '正北'
      }
    }
  },
  onLoad () {
    this.compassInfo() // 获取罗盘数据
  },
  created () {
  }
}
</script>

<style scoped>
.compassBox{
    text-align: center;
    margin-top: 80px;
}
.compassContent{
    font-size: 20px;
    text-align: center;
    margin-top: 30px;
}
.compassbg{
    width: 260px;
    height: 260px;
    margin: 20px auto;
    object-fit: contain;
}
</style>
