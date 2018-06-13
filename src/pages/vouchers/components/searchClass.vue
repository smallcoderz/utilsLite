<template style="width:100%;height: 100%;overflow-x: hidden;">
    <div class="searchClassifyBox">
        <div class="title">
            全部分类
            <span class="closeBtn">
                <span class="iconfont icon-top" @tap="backHome"></span>
            </span>
        </div>
        <div class="classItem clear">
            <div class="item" v-for="list in classList" :key="list">
                <image class="itemImg" :src=list.path></image>
                <span v-text="list.name"></span>
            </div>
        </div>
    </div>
</template>
<!-- http://www.00sg.com/img/cat1.png -->
<script>
    export default {
        data () {
            return {
                classList: [
                    {
                        path:'http://www.00sg.com/img/cat1.png',
                        name: '女装',
                    },{
                        path:'http://www.00sg.com/img/cat2.png',
                        name: '男装',
                    },{
                        path:'http://www.00sg.com/img/cat3.png',
                        name: '鞋品',
                    },{
                        path:'http://www.00sg.com/img/cat4.png',
                        name: '箱包',
                    },{
                        path:'http://www.00sg.com/img/cat5.png',
                        name: '母婴',
                    },{
                        path:'http://www.00sg.com/img/cat6.png',
                        name: '美妆',
                    },{
                        path:'http://www.00sg.com/img/cat7.png',
                        name: '内衣',
                    },{
                        path:'http://www.00sg.com/img/cat8.png',
                        name: '配饰',
                    },{
                        path:'http://www.00sg.com/img/cat9.png',
                        name: '美食',
                    },{
                        path:'http://www.00sg.com/img/cat10.png',
                        name: '数码家电',
                    },{
                        path:'http://www.00sg.com/img/cat11.png',
                        name: '居家日用',
                    },{
                        path:'http://www.00sg.com/img/cat12.png',
                        name: '家装家纺',
                    },{
                        path:'http://www.00sg.com/img/cat13.png',
                        name: '文娱车品',
                    },{
                        path:'http://www.00sg.com/img/cat14.png',
                        name: '户外运动',
                    },
                ]
            }
        },
        components: {},
        computed: {},
        methods: {
            backHome(){ //返回主页
                this.$emit('closeSearchClass')
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
    .searchClassifyBox{
        width: 100%;
        height: 100%;
        position: relative;
        top: 0;
        left: 0;
        background-color: #fff;
    }
    .searchClassifyBox .title{
        font-weight: 400;
        font-size: 16px;
        border-bottom: solid #eee 1px;
        line-height: 44px;
        text-align: center;
        position: relative;
    }
    .searchClassifyBox .closeBtn{
        width: 44px;
        height: 44px;
        position: absolute;
        right: 5px;
    }
    .searchClassifyBox .classItem{
        margin-top: 30px;
    }
    .searchClassifyBox .item{
        width: 25%;
        padding-bottom: 20px;
        float: left;
        text-align: center;
        font-size: 14px;
    }
    .searchClassifyBox .itemImg{
        display: block;
        margin: auto;
        width: 60%;
        height: 50px;
    }
</style>
