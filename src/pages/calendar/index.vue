<template style="width:100%;height: 100%;">
    <div class="calendar_box">
        <view class="calendarDetail">
            <view class="headerBox clear">
                <view v-text="day" class="day fl"></view>
                <view class="fl date">
                    {{dateDetail.IMonthCn}} {{dateDetail.IDayCn}}
                    <view>{{dateDetail.ncWeek}}</view>
                </view>
                <view class="fl kieriBox">
                    <view v-if="dateDetail.longLiJieRi">{{dateDetail.longLiJieRi}}</view>
                    <view v-if="dateDetail.gongLiJieRi">{{dateDetail.gongLiJieRi}}</view>
                </view>
            </view>
            <view class="longLiDetail">
                {{dateDetail.Animal}} {{dateDetail.gzYear}}
            </view>
            <!--<view>生肖:{{dateDetail.Animal}}</view>-->
            <!--<view>年（农历）:{{dateDetail.gzYear}}</view>-->
            <!--<view>月（农历）:{{dateDetail.gzMonth}}</view>-->
            <!--<view>日（农历）:{{dateDetail.gzDay}}</view>-->
            <!--<view>节气:{{dateDetail.Term}}</view>-->
        </view>
        <view class="section clear">
            <span class="iconfont icon-left fl" @tap="changeDate('left')"></span>
            <picker class="fl" v-model="date" mode="date" @change="bindDateChange">
                <span class="picker mouthhead">
                    {{showDate}}
                </span>
            </picker>
            <span class="iconfont icon-right fl" @tap="changeDate('right')"></span>
            <span class="todayBtn fl" @tap="today">今</span>
        </view>
        <view class="mouth">
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
                <!--占位-->
                <view class="day" v-for="i in week" :key="i"></view>

                <span v-for="(item,idx) in days" :key="idx">
                   <span
                       class="day active"
                       @tap="toDetail(item)"
                       v-if="item.year == year && item.month == month && item.day == day"
                       :key="idx">
                       <span class="gongliItem weekend" v-if="item.nongli.nWeek == 6 || item.nongli.nWeek == 7" v-text="item.day"></span>
                       <span class="gongliItem" v-if="item.nongli.nWeek != 6 && item.nongli.nWeek != 7" v-text="item.day"></span>
                       <span class="nongliItem" v-if="!item.nongli.gongLiJieRi"
                             v-text="item.dayHan"></span>
                       <span class="jieriItem" v-if="item.nongli.gongLiJieRi" v-text="item.nongli.gongLiJieRi"></span>
                    </span>
                  <span
                      class="day"
                      @tap="toDetail(item)"
                      v-if="item.year != year || item.month != month || item.day != day"
                      :key="idx">
                       <span class="gongliItem weekend" v-if="item.nongli.nWeek == 6 || item.nongli.nWeek == 7" v-text="item.day"></span>
                       <span class="gongliItem" v-if="item.nongli.nWeek != 6 && item.nongli.nWeek != 7" v-text="item.day"></span>
                       <span class="nongliItem" v-if="!item.nongli.gongLiJieRi"
                             v-text="item.dayHan"></span>
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
                dateDetail: {}, //详情数据
                days:[], //展示的日历
                showDate: '',
                date : '',
                week: '',
                year: '', // 当年
                month: '', // 当月
                day: '' // 当天
            }
        },
        components: {},
        computed: {},
        methods: {
            dateData (year,month,day) {
                this.year = year; //当前年
                this.month = month; //当cue前月份
                this.day = day; //当天
                this.date = year+'-'+ month +'-'+ day;

                let showMonth = month+'';
                let showDay = day+'';
                if(showMonth.length === 1){
                    showMonth = '0'+showMonth;
                }
                if(showDay.length === 1){
                    showDay = '0'+showDay;
                }
                this.dateDetail = Nonglu.solar2lunar(year,month,day);
                this.showDate = year+'年'+showMonth+'月'+showDay+'日';
                this.days = [];
                let dayDetail = []; // 月日历数据

                let date = new Date; // 当前日期

                let d = new Date(year, month, 0);
                let d1 = new Date(year, month-1, 1);
                let daysCount = d.getDate() + 1; // 一共显示多少天
                let week = d1.getDay() // 星期几
                this.week = week;
                let dayscNow = 0; // 计数器
                let leapYear = function (Year) { // 判断是否闰年
                    if (((Year % 4) === 0) && ((Year % 100) !== 0) || ((Year % 400) === 0)) {
                        return (true)
                    } else {
                        return (false)
                    }
                };
                dayDetail = [];
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
                            nongli: Nonglu.solar2lunar(year, month, k + 1),
                            dayHan: Nonglu.toChinaDay(days),
                        }
                        dayDetail.push(nowData);
                    } else {
                        break
                    }
                }
                this.days = dayDetail;
                console.log('days',dayDetail);
            },
            bindDateChange(e) { //选择日期
                let curDate = e.mp.detail.value;
                let year = parseInt(curDate.split('-')[0]);
                let month = parseInt(curDate.split('-')[1]);
                let day = parseInt(curDate.split('-')[2]);
                this.dateData(year,month,day);
            },
            changeDate(flag){ //点击左右按钮选择日期
                let year = this.year;
                let month = this.month;
                let day = this.day;
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
                this.dateData(year,month,day);
            },
            toDetail(list){
                let year = list.year;
                let month = list.month;
                let day = list.day;
                this.dateData(year,month,day);
            },
            today(){
                let date = new Date();
                let curYear = date.getFullYear(); //当前年
                let curMonth = date.getMonth() + 1; //当前月份
                let curDay = date.getDate(); //当天
//                this.dateDetail = Nonglu.solar2lunar(curYear,curMonth,curDay);
                this.dateData(curYear,curMonth,curDay);
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
    page {
        height: 100%;
        font-weight: 100;
        overflow-x: hidden;
    }
    .calendarDetail{
        width: 100%;
        height: 150px;
        background-color: #14142C;
        color: #fdfdfd;
        padding: 25px 20px 10px 20px;
        box-sizing: border-box;
    }
    .calendarDetail .headerBox .day{
        font-size: 50px;
        color: #fdfdfd;
        line-height: 50px;
        margin-right: 10px;
        margin-left: 20px;
        font-weight: 400;
    }
    .calendarDetail .headerBox .date{
        font-size: 15px;
        line-height: 25px;
        font-weight: bold;
    }
    .calendarDetail .headerBox .kieriBox{
        font-size: 15px;
        line-height: 25px;
        margin-left: 80px;
    }
    .longLiDetail{
        width: 100%;
        padding: 0 20px;
        margin-top: 10px;
    }
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
        margin-top: 8px;
    }
    .section .icon-left{
        margin-right: 10px;
    }
    .section .icon-right{
        margin-left: 10px;
    }
    .section .todayBtn{
        margin-left: 30px;
        border-radius: 100%;
        color: #fdfdfd;
        background-color: #14142C;
        width: 25px;
        height: 25px;
        font-size: 15px;
        line-height: 25px;
        margin-top: 9px;
        text-align: center;
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

    .daybox .day {
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
        box-sizing: border-box;
    }

    .day.active {
        /*background-color: #14142C;*/
        /*color: #fdfdfd;*/
        border: 2px solid #14142C;
    }

    .gongliItem {
        display: block;
        text-align: center;
        margin-top: 2px;
    }
    .gongliItem.weekend{
        color: #ff4664 !important;
    }
    .nongliItem {
        font-size: 10px;
        display: block;
    }

    .jieriItem {
        font-size: 10px;
        display: block;
        color: #ff4664;
    }
</style>
