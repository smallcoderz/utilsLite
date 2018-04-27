<template style="width:100%;height: 100%;">
  <div class="calendar_box">
      <view class="headbox">
          <view class="headdate">日</view>
          <view class="headdate">一</view>
          <view class="headdate">二</view>
          <view class="headdate">三</view>
          <view class="headdate">四</view>
          <view class="headdate">五</view>
          <view class="headdate">六</view>
      </view>
      <view class="mouth" v-for="(list,index) in date" :key="index">
          <view class="mouthhead">{{list[index].year}}年{{list[index].month}}月</view>
          <view class="daybox">
              <view class="day" v-if="weeks[index]>0"></view>
              <view class="day" v-if="weeks[index]>1"></view>
              <view class="day" v-if="weeks[index]>2"></view>
              <view class="day" v-if="weeks[index]>3"></view>
              <view class="day" v-if="weeks[index]>4"></view>
              <view class="day" v-if="weeks[index]>5"></view>

              <span  v-for="(item,idx) in list" :key="idx">
                   <span
                       class="day active"
                       v-if="list[index].year == year && list[index].month == month && item.day == day"
                       :key="idx">
                       <span class="gongliItem" v-text="item.day"></span>
                       <span class="nongliItem" v-if="!item.nongli.gongLiJieRi" v-text="item.nongli.IMonthCn +' '+ item.nongli.IDayCn"></span>
                       <span class="jieriItem" v-if="item.nongli.gongLiJieRi" v-text="item.nongli.gongLiJieRi"></span>
                    </span>
                  <span
                       class="day"
                       v-if="list[index].year != year || list[index].month != month || item.day != day"
                       :key="idx">
                       <span class="gongliItem" v-text="item.day"></span>
                       <span class="nongliItem" v-if="!item.nongli.gongLiJieRi" v-text="item.nongli.IMonthCn +' '+ item.nongli.IDayCn"></span>
                       <span class="jieriItem" v-if="item.nongli.gongLiJieRi" v-text="item.nongli.gongLiJieRi"></span>
                    </span>
              </span>
          </view>
      </view>
  </div>
</template>

<script>
import Nonglu from '../../../static/js/nongli/nongli'
export default {
  data () {
    return {
      userInfo: {},
      date: '',
      weeks: '',
      year: '', // 当年
      month: '', // 当月
      day: '' // 当天
    }
  },
  components: {},
  computed: {
  },
  methods: {
    dateData () {
      let dataAll = [] // 总日历数据
      let dataAll2 = [] // 总日历数据
      let dataMonth = [] // 月日历数据
      let date = new Date // 当前日期
//      let asd = Nonglu.solar2lunar(1987, 11, 1)
//      console.log('asd', asd)
      this.month = date.getMonth() + 1 // 当前月份
      this.day = date.getDate() // 当天
      let year = date.getFullYear() // 当前年
      let week = date.getDay() // 当天星期几
      let weeks = []
      this.year = date.getFullYear() // 当前年
      let month = date.getMonth() + 1// 当前月份
      let day = 1 // 当天
      let daysCount = 366 // 一共显示多少天
      let dayscNow = 0 // 计数器
      let monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] // 月份列表
      let nowMonthList = [] // 本年剩余年份
      for (let i = month; i < 13; i++) {
        nowMonthList.push(i)
      }
      let yearList = [year] // 年份最大可能
      for (let i = 0; i < daysCount / 365 + 2; i++) {
        yearList.push(year + i + 1)
      }
      let leapYear = function (Year) { // 判断是否闰年
        if (((Year % 4) == 0) && ((Year % 100) != 0) || ((Year % 400) == 0)) {
          return (true)
        } else { return (false) }
      }
      for (let i = 0; i < yearList.length; i++){ // 遍历年
        let mList
        if (yearList[i] == year){ // 判断当前年份
          mList = nowMonthList
        }else{
          mList = monthList
        }
        for (let j = 0; j < mList.length; j++){ // 循环月份
          dataMonth = []
          let t_days = [31, 28 + leapYear(yearList[i]), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
          let t_days_thisYear = []
          if (yearList[i] == year) {
            for (let m = 0; m < nowMonthList.length; m++) {
              t_days_thisYear.push(t_days[mList[m] - 1])
            }
            t_days = t_days_thisYear
          } else {
            t_days = [31, 28 + leapYear(yearList[i]), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
          }
          for (let k = 0; k < t_days[j];k++){ // 循环每天
            dayscNow++
            let nowData
            if (dayscNow < daysCount) { // 如果计数器没满
              let days = k + 1
              if (days < 10) {
                days = '0' + days
              }
              if (yearList[i] == year && mList[j] == month){ // 判断当年当月
                if (k + 1 >= day) {
                  nowData = {
                    year: yearList[i],
                    month: mList[j],
                    day: k + 1,
                    date: yearList[i] + '' + mList[j] + days,
                    selected: 0,
                    re: yearList[i] + '-' + mList[j] + '-' + days,
                    nongli: Nonglu.solar2lunar(yearList[i],mList[j],k + 1)
                  }
                  dataMonth.push(nowData)
                  if (k + 1 == day) {
                    let date = new Date(yearList[i] + '-' + mList[j] + '-' + (k + 1))
                    let weekss = date.getDay() // 获取每个月第一天是周几
                    weeks.push(weekss)
                  }
                }
              }            else { // 其他情况
                nowData = { // 组装自己需要的数据
                  year: yearList[i],
                  month: mList[j],
                  day: k + 1,
                  date: yearList[i] + '' + mList[j] + days,
                  selected: 0,
                  re: yearList[i] + '-' + mList[j] + '-' + days,
                  nongli: Nonglu.solar2lunar(yearList[i],mList[j],k + 1)
                }
                dataMonth.push(nowData)
                if (k == 0) {
                  let date = new Date(yearList[i] + '-' + mList[j] + '-' + k + 1)
                  let weekss = date.getDay() // 获取每个月第一天是周几
                  weeks.push(weekss)
                }
              }
            } else {
              break
            }
          }
          dataAll.push(dataMonth)
        }
      }
      for (let i = 0; i < dataAll.length; i++) {
        if (dataAll[i].length != 0) {
          dataAll2.push(dataAll[i])
        }
      }
      this.date = dataAll2
      this.weeks = weeks
      console.log('date',JSON.parse(JSON.stringify(dataAll2)))
      console.log('weeks',JSON.parse(JSON.stringify(weeks)))
    }
  },
  onLoad () {
    this.dateData();
  },
  created () {
  }
}
</script>

<style scoped>
    .calendar_box{
        background-color: #fdfdfd;
    }
    .headdate{
        height: 20px;
        flex:1;
        text-align: center;
        line-height: 20px;
        padding-bottom: 10px;
        color: #14142C;
    }
    .headbox{
        display: flex;
        position: fixed;
        width: 100%;
        display: -webkit-flex;
        border-bottom: 1px solid #dedede;
        background-color: white;
        z-index: 2;
    }
    .mouthhead{
        height: 44px;
        background-color: #fdfdfd;
        width: 100%;
        line-height: 44px;
        text-align: center;
    }
    .mouth{
        /* background-color: white; */
        /* padding-top: 10px;
        padding-bottom: 10px;  */
    }
    .daybox{

        background-color: #fdfdfd;
        padding-top: 5px;
        padding-bottom: 5px;

    }
    .day{
        width: 53.5px;
        height: 53.5px;
        /*line-height: 53.5px;*/
        text-align: center;
        display: inline-block;
        position: relative;
        top: 0;
        overflow: hidden;
        color: #14142C;
        font-size: 20px;
        border-radius: 5px;
    }
    .day.active{
        background-color: #14142C;
        color: #fdfdfd;
    }
    .gongliItem{
        display: block;
        text-align: center;
        margin-top: 5px;
    }
    .nongliItem{
        font-size: 10px;
        display: block;
    }
    .jieriItem{
        font-size: 10px;
        display: block;
        margin-top: 2px;
        color: #ff4664;
    }
</style>
