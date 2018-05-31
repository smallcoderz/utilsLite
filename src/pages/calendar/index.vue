<template style="width:100%;height: 100%;">
    <div class="calendar_box">

        <view class="section clear">
            <span class="iconfont icon-left fl" @tap="changeDate('left')"></span>
            <picker class="fl" v-model="showDate" mode="date" @change="bindDateChange">
                <span class="picker mouthhead">
                    {{showDate}}
                </span>
            </picker>
            <span class="iconfont icon-right fl" @tap="changeDate('right')"></span>
        </view>
        <view class="mouth" v-for="(list,index) in date" :key="index">
            <!--<view class="mouthhead">{{list[index].year}}年{{list[index].month}}月</view>-->

            <view class="headbox">
                <view class="headdate">日</view>
                <view class="headdate">一</view>
                <view class="headdate">二</view>
                <view class="headdate">三</view>
                <view class="headdate">四</view>
                <view class="headdate">五</view>
                <view class="headdate">六</view>
            </view>

            <view class="daybox">
                <view class="day" v-if="weeks[index]>0"></view>
                <view class="day" v-if="weeks[index]>1"></view>
                <view class="day" v-if="weeks[index]>2"></view>
                <view class="day" v-if="weeks[index]>3"></view>
                <view class="day" v-if="weeks[index]>4"></view>
                <view class="day" v-if="weeks[index]>5"></view>

                <span v-for="(item,idx) in list" :key="idx">
                   <span
                       class="day active"
                       v-if="list[index].year == year && list[index].month == month && item.day == day"
                       :key="idx">
                       <span class="gongliItem" v-text="item.day"></span>
                       <span class="nongliItem" v-if="!item.nongli.gongLiJieRi"
                             v-text="item.nongli.IMonthCn +' '+ item.nongli.IDayCn"></span>
                       <span class="jieriItem" v-if="item.nongli.gongLiJieRi" v-text="item.nongli.gongLiJieRi"></span>
                    </span>
                  <span
                      class="day"
                      v-if="list[index].year != year || list[index].month != month || item.day != day"
                      :key="idx">
                       <span class="gongliItem" v-text="item.day"></span>
                       <span class="nongliItem" v-if="!item.nongli.gongLiJieRi"
                             v-text="item.nongli.IMonthCn +' '+ item.nongli.IDayCn"></span>
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
                date: [],
                currentDate: '2018.5.1',
                showDate: '',
                weeks: '',
                year: '', // 当年
                month: '', // 当月
                day: '' // 当天
            }
        },
        components: {},
        computed: {},
        methods: {
            dateData (year,month,day) {
                let showMonth = month+'';
                let showDay = day+'';
                if(showMonth.length == 1){
                    showMonth = '0'+showMonth;
                }
                if(showDay.length == 1){
                    showDay = '0'+showDay;
                }
                this.showDate = year+'年'+showMonth+'月'+showDay+'日';
                this.date = [];
                let dataAll = []; // 总日历数据
                let dataAll2 = []; // 总日历数据
                let dataMonth = []; // 月日历数据

                let date = new Date; // 当前日期
                let curYear = date.getFullYear(); //当前年
                let curMonth = date.getMonth() + 1; //当前月份
                let curDay = date.getDate(); //当天

                this.year = curYear; //当前年
                this.month = curMonth; //当cue前月份
                this.day = curDay; //当天
//              let week = date.getDay() // 当天星期几
                let weeks = [];
                let d = new Date(year, month, 0);
                let daysCount = d.getDate() + 1; // 一共显示多少天
                let dayscNow = 0; // 计数器
                let leapYear = function (Year) { // 判断是否闰年
                    if (((Year % 4) === 0) && ((Year % 100) !== 0) || ((Year % 400) === 0)) {
                        return (true)
                    } else {
                        return (false)
                    }
                };
                dataMonth = [];
                let t_days = [31, 28 + leapYear(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                for (let k = 0; k < t_days[month-1]; k++) { // 循环每天
                    dayscNow++;
                    let nowData;
                    if (dayscNow < daysCount) { // 如果计数器没满
                        let days = k + 1;
                        if (days < 10) {
                            days = '0' + days
                        }
                        nowData = { // 组装自己需要的数据
                            year: year,
                            month: month,
                            day: k + 1,
                            date: year + '' + month + days,
                            selected: 0,
                            re: year + '-' + month + '-' + days,
                            nongli: Nonglu.solar2lunar(year, month, k + 1)
                        }
                        dataMonth.push(nowData);
                        if (k === 0) {
                            let date = new Date(year + '-' + month + '-' + k + 1);
                            let weekss = date.getDay(year,month-1,0);// 获取每个月第一天是周几
                            weeks.push(weekss)
                        }
                    } else {
                        break
                    }
                }
                dataAll.push(dataMonth)
                for (let i = 0; i < dataAll.length; i++) {
                    if (dataAll[i].length !== 0) {
                        dataAll2.push(dataAll[i])
                    }
                }
                this.date = dataAll2;
                this.weeks = weeks;
            },
            bindDateChange(e) { //选择日期
                let curDate = e.mp.detail.value;
                let year = curDate.split('-')[0];
                let month = curDate.split('-')[1];
                let day = curDate.split('-')[2];
                this.currentDate = year+'.'+month+'.'+day;
                this.dateData(year,month,day);
            },
            changeDate(flag){ //点击左右按钮选择日期
                let curDate = this.currentDate;
                let year = curDate.split('.')[0];
                let month = curDate.split('.')[1];
                let day = curDate.split('.')[2];
                if(flag === 'left'){
                    if( month <= 1 ){
                        year--
                        month = 12
                    }else{
                        month--
                    }
                    day = 1;
                }else{
                    if( month >= 12 ){
                        year++
                        month = 1
                    }else{
                        month++
                    }
                    day = 1;
                }
                this.currentDate = year+'.'+month+'.'+day;
                this.dateData(year,month,day);
            }
        },
        onLoad () {
            let date = new Date();
            this.dateData(date.getFullYear(),date.getMonth() + 1,1); //初始化日历
        },
        showLoad(){

        },
        created () {
        }
    }
</script>

<style scoped>
    .calendar_box {
        background-color: #fdfdfd;
    }

    .headbox {
        background-color: #fdfdfd;
        padding-top: 5px;
        padding-bottom: 5px;
        margin: auto;
    }

    .headdate {
        width: 14.2%;
        text-align: center;
        display: inline-block;
        position: relative;
        top: 0px;
        overflow: hidden;
        color: #14142C;
        font-size: 15px;
        border-radius: 5px;
        font-weight: 200;
    }

    .section{
        margin-left: 20px;
        text-align: left;
        line-height: 44px;
    }
    .section .icon-left{
        margin-right: 10px;
    }
    .section .icon-right{
        margin-left: 10px;
    }
    .mouthhead {
        height: 44px;
        background-color: #fdfdfd;
        width: 100%;
        line-height: 44px;
        /*color: #ff4664;*/
    }

    .mouth {
        background-color: white;
        padding-bottom: 10px;
    }

    .daybox {
        background-color: #fdfdfd;
        padding-top: 5px;
        padding-bottom: 5px;
        margin: auto;
    }

    .day {
        width: 14.2%;
        height: 53.5px;
        text-align: center;
        display: inline-block;
        position: relative;
        top: 0px;
        overflow: hidden;
        color: #14142C;
        font-size: 20px;
        border-radius: 5px;
        font-weight: 400;
    }

    .day.active {
        background-color: #14142C;
        color: #fdfdfd;
    }

    .gongliItem {
        display: block;
        text-align: center;
        margin-top: 5px;
    }

    .nongliItem {
        font-size: 10px;
        display: block;
    }

    .jieriItem {
        font-size: 10px;
        display: block;
        margin-top: 2px;
        color: #ff4664;
    }
</style>
