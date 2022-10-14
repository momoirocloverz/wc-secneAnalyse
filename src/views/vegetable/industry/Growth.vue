<template>
    <div class="vegetable">
        <bgAnim></bgAnim>
        <OneSizeContainer style="z-index:999;" :width="1920" :height="1080" :maxRatio="3">
            <selfHead title="长势监测分析" @back="back" style="z-index:999;"></selfHead>
            <div class="content">
                <div class="left">
                    <div class="icon-box" v-for="(item,index) in iconList" :key="index">
                        <div class="icon-box-left">
                            <img class="icon-box-left-icon" :src="item.icon" alt="">
                        </div>
                        <div class="icon-box-right">
                            <div class="icon-box-right-num" ref="num"></div>
                            <div class="icon-box-right-title">{{ item.title }}</div>
                        </div>
                    </div>
                    <div class="icon-box">
                        <div class="icon-box-left">
                            <img class="icon-box-left-icon" :src="growthInfo.icon" alt="">
                        </div>
                        <div class="icon-box-right">
                            <div class="icon-box-right-num">{{ growth }}</div>
                            <div class="icon-box-right-title">{{ growthInfo.title }}</div>
                        </div>
                    </div>
                </div>
                <div class="mid" ref="midChart"></div>
                <div class="right">
                    <div class="right-box" v-for="(item,index) in growthList" :key="index">
                        <div class="right-box-num" ref="level"></div>
                        <div class="right-box-title">{{ item.title }}</div>
                        <div class="right-box-bar" :style="getBarStyle(item.num)"></div>
                    </div>
                </div>
            </div>
        </OneSizeContainer>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import selfHead from "@/components/Head/Head.vue"
import bgAnim from '@/components/bgAnim/BgAnim.vue'
import selfTitle from '../Title.vue'
import * as echarts from 'echarts';
import map from '../map.json'
import {animateValue} from "@/util";
import * as socketClient from '@/views/socketClient';
import vueSeamlessScroll from "vue-seamless-scroll";
import m from "moment"
import _ from "lodash";

@Component({
    name: "Growth",
    components: {
        selfHead,
        bgAnim,
        selfTitle,
        vueSeamlessScroll
    }
})
export default class Growth extends Vue {
    public $refs!: {
        midChart: HTMLDivElement,
        num: HTMLDivElement,
        level: HTMLDivElement,
    }

    currentYear: any = m().format('YYYY')

    timeout: any = null;

    timer2: any = null;
    timer3: any = null;
    timer4: any = null;
    growth: string = ''
    iconList: any[] = [
        {
            icon: require("../../../assets/images/vegetable/Growthicon1.png"),
            title: '监测点数量'
        }, {
            icon: require("../../../assets/images/vegetable/Growthicon2.png"),
            title: '上报样品数量'
        }, {
            icon: require("../../../assets/images/vegetable/Growthicon3.png"),
            title: '工作人员数量'
        }
    ]
    growthInfo: any = {
        icon: require("../../../assets/images/vegetable/Growthicon4.png"),
        title: '今年整体长势'
    }
    growthList: any[] = []


    sum: any = {}


    apiList: any = {
        left: '/growthMonitor/gmGrowthMonitorSurvey',
        mid: '/growthMonitor/gmGrowthAreaDistribute',
        right: '/growthMonitor/gmGrowthAssessment',
    }

    @Watch("$route", {
        deep: true,
        immediate: true
    })
    watchRoute(val: string) {
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        // this.query()
    }

    getBarStyle(data: number) {
        if (this.growthList.length == 0) {
            return {width: '0%', display: 'block'}
        }
        let list: any = _.cloneDeep(this.growthList)
        let max: any = list.sort((a: any, b: any) => {
            return b.num - a.num
        })[0]
        if (max.num == 0) {
            return {width: '50%', display: 'block'}
        }
        // console.log(max)
        return {width: `${Number((data / max.num) * 100).toFixed(2)}%`, display: 'block'}
    }

    getMap(data?: any) {
        // console.log(data)
        let myChart = echarts.init(this.$refs.midChart);
        let list: any[] = data?_.cloneDeep(data):[]
        list.forEach((item: any) => {
            item.name = item.township
            item.collectionTime = m(item.collectionTime).format("YYYY-MM-DD HH:mm")
            // item.itemStyle = {normal: {borderColor: 'rgba(78, 145, 236, 1)', areaColor: "rgba(67, 209, 197, 0.1)", label: {show: false,}}}
            // item.emphasis =  {borderColor: 'rgba(78, 145, 236, 1)',areaColor: "rgba(67, 209, 197, 1)", label: {show: false,}}
        })
        echarts.registerMap("map", map);
        const option: any = {
            tooltip: {
                backgroundColor: 'rgba(3,3,3,0)',
                // appendToBody: true,
                borderWidth: 0,
                textStyle: {
                    color: '#ffffff',
                    fontSize: '12',
                },
                formatter: (value: any) => {
                    let res = ``
                    let color = '#3D71BA'
                    if (value.data) {
                        res = `<div style='width:230px;height:320px;background: rgba(255, 255, 255, 0.6);margin:-10px;border-radius: 5px;'>
                        <div style='display:flex;justify-content:space-between;width:100%;height:30px;background-color:${color};border-radius:5px 5px 0 0;padding:5px 10px;font-size:12px;'>
                            <span>${value.name}</span>

                        </div>
                        <ul style="color:#525866;padding:10px 20px;font-size:12px;width: 100%">
                            <li style="width: 100%;line-height: 24px;">
                                <span style="display:inline-block;width: 100%">
                                    <span style="width:72px;text-align: right;display: inline-block">采集时间：</span>
                                    <span style="width:95px;display: inline-block;">${value.data.collectionTime || '-'}</span>
                                </span>
                            </li>
                            <li style="width: 100%;line-height: 24px;">
                                <span style="display:inline-block;width: 100%">
                                    <span style="width:72px;text-align: right;display: inline-block">温度：</span>
                                    <span style="width:95px;display: inline-block;">${value.data.tmp || '-'}℃ </span>
                                </span>
                            </li>
                            <li style="width: 100%;line-height: 24px;">
                                <span style="display:inline-block;width: 100%">
                                    <span style="width:72px;text-align: right;display: inline-block">湿度：</span>
                                    <span style="width:95px;display: inline-block;">${value.data.hum || '-'}%</span>
                                </span>
                            </li>
                            <li style="width: 100%;line-height: 24px;">
                                <span style="display:inline-block;width: 100%">
                                    <span style="width:72px;text-align: right;display: inline-block">光照：</span>
                                    <span style="width:95px;display: inline-block;">${value.data.illumination || '-'}h</span>
                                </span>
                            </li>
                            <li style="width: 100%;line-height: 24px;">
                                <span style="display:inline-block;width: 100%">
                                    <span style="width:72px;text-align: right;display: inline-block">有机质：</span>
                                    <span style="width:95px;display: inline-block;">${value.data.soilOrganic || '-'}</span>
                                </span>
                            </li>
                            <li style="width: 100%;line-height: 24px;">
                                <span style="display:inline-block;width: 100%">
                                    <span style="width:72px;text-align: right;display: inline-block">氮：</span>
                                    <span style="width:95px;display: inline-block;">${value.data.nitrogen || '-'}</span>
                                </span>
                            </li>
                            <li style="width: 100%;line-height: 24px;">
                                <span style="display:inline-block;width: 100%">
                                    <span style="width:72px;text-align: right;display: inline-block">磷：</span>
                                    <span style="width:95px;display: inline-block;">${value.data.phosphorus || '-'}</span>
                                </span>
                            </li>
                            <li style="width: 100%;line-height: 24px;">
                                <span style="display:inline-block;width: 100%">
                                    <span style="width:72px;text-align: right;display: inline-block">钾：</span>
                                    <span style="width:95px;display: inline-block;">${value.data.potassium || '-'}</span>
                                </span>
                            </li>
                            <li style="width: 100%;line-height: 24px;">
                                <span style="display:inline-block;width: 100%">
                                    <span style="width:72px;text-align: right;display: inline-block">PH值：</span>
                                    <span style="width:95px;display: inline-block;">${value.data.ph || '-'}</span>
                                </span>
                            </li>
                            <li style="width: 100%;line-height: 24px;">
                                <span style="display:inline-block;width: 100%">
                                    <span style="width:72px;text-align: right;display: inline-block">长势评价：</span>
                                    <span style="width:95px;display: inline-block;">${value.data.growthInfo || '-'}</span>
                                </span>
                            </li>
                            <li style="width: 100%;line-height: 24px;">
                                <span style="display:inline-block;width: 100%">
                                    <span style="width:72px;text-align: right;display: inline-block">较历史同期：</span>
                                    <span style="width:95px;display: inline-block;">${value.data.compareSync || '-'}</span>
                                </span>
                            </li>
                        </ul>
                    </div>`
                    }
                    return res
                },
            },
            series: [
                {

                    zoom: 1.2,
                    type: 'map',
                    map: 'map',
                    data:list,
                    selectedMode : false,  // 选中效果固话
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },
                    itemStyle: {    //地图颜色
                        normal: {
                            borderColor: 'rgba(78, 145, 236, 1)',//区域边框颜色
                            areaColor: "rgba(67, 209, 197, 0.1)",//区域颜色
                        },
                        emphasis: {
                            borderColor: 'rgba(78, 145, 236, 1)',//区域边框颜色
                            areaColor: "rgba(67, 209, 197, 1)",//区域颜色
                        }
                    }
                },
            ],
        };
        myChart.setOption(option);
        clearInterval(this.timer4)
        this.timer4 = null

        let len = 0
        if(!this.timer4){
            this.timer4 = setInterval(() => {
                myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: len-1,
                })
                if (len === list.length) {
                    len = 0
                }
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: len,
                })
                myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: len,
                })


                len++
            }, 1700)
        }
        myChart.on('mouseover', (params: any) => {
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: len-1,
            })
            // console.log(params)
            clearInterval(this.timer4)
            this.timer4 = null
        });
        myChart.on('mouseout', (params: any) => {
            if(!this.timer4){
                this.timer4 = setInterval(() => {
                    myChart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        dataIndex: len-1,
                    })
                    if (len === list.length) {
                        len = 0
                    }
                    myChart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: len,
                    })
                    myChart.dispatchAction({
                        type: 'showTip',
                        seriesIndex: 0,
                        dataIndex: len,
                    })
                    len++
                }, 1700)
            }
        });
    }


    getNum() {

    }

    back() {
        this.$router.push('/vegetable/allIndustry')
    }

    getData(res: any) {
        this.timeout = setTimeout(() => {
            if (res.key == this.apiList.left) {
                // console.log(res)
                let data: any = _.cloneDeep(res.data)
                this.$nextTick(() => {
                    setTimeout(() => {
                        let donmList: any = this.$refs.num
                        donmList.forEach((item: any, index: number) => {
                            switch (index) {
                                case 0:
                                    animateValue(item, data && data.monitorPointNum ? data.monitorPointNum : 0, 600,true)
                                    break;
                                case 1:
                                    animateValue(item, data && data.sampleNum ? data.sampleNum : 0, 600,true)
                                    break;
                                case 2:
                                    animateValue(item, data && data.staffNum ? data.staffNum : 0, 600,true)
                                    break;
                            }
                        })
                        this.growth = data && data.staffNum ? data.growthInfo : '较好'
                    }, 500)

                })

                // animateValue(this.$refs.yield, arrData.yieldCount, 1000)
            } else if (res.key == this.apiList.mid) {
                // console.log(res)
                this.getMap(res.data)
            } else if (res.key == this.apiList.right) {
                // console.log(res)
                let data: any = _.cloneDeep(res.data)
                this.$nextTick(() => {
                    setTimeout(() => {
                        let donmList: any = this.$refs.level
                        donmList.forEach((item: any, index: number) => {
                            switch (index) {
                                case 0:

                                    animateValue(item, data && data.level5 ? data.level5 : 0, 600,true)
                                    break;
                                case 1:
                                    animateValue(item, data && data.level4 ? data.level4 : 0, 600,true)
                                    break;
                                case 2:
                                    animateValue(item, data && data.level3 ? data.level3 : 0, 600,true)
                                    break;
                                case 3:
                                    animateValue(item, data && data.level2 ? data.level2 : 0, 600,true)
                                    break;
                                case 4:
                                    animateValue(item, data && data.level1 ? data.level1 : 0, 600,true)
                                    break;
                            }
                        })

                    })
                    this.growthList = [
                        {
                            num: data && data.level5 ? data.level5 : 0,
                            title: '长势很好'
                        },
                        {
                            num: data && data.level5 ? data.level4 : 0,
                            title: '长势较好'
                        },
                        {
                            num: data && data.level5 ? data.level3 : 0,
                            title: '长势一般'
                        },
                        {
                            num: data && data.level5 ? data.level2 : 0,
                            title: '长势较差'
                        },
                        {
                            num: data && data.level5 ? data.level1 : 0,
                            title: '长势很差'
                        },
                    ]
                })

            }
        }, 300);
    }

    getParams(params?: any) {
        //拼接查询条件
        return () => {
            return params
        }
    }

    query() {
        for (const key in this.apiList) {
            socketClient.addCallBack(this.apiList[key], this.getData);
            socketClient.addSend(this.apiList[key], this.getParams({year: this.currentYear}));
        }
        setTimeout(() => {
            socketClient.sendAll()
        }, 500);
    }

    @Watch('$route')
    routeWatch(value: any) {
        // for (const key in this.apiList) {
        //     socketClient.delCallBack(this.apiList[key].url);
        //     socketClient.delSend(this.apiList[key].url);
        // }
        // clearInterval(this.timer1)
        // clearInterval(this.timer2)
        // clearInterval(this.timer3)
        // clearInterval(this.timer4)
        // clearInterval(this.timer5)
        // clearInterval(this.timer6)
        // if (value.path==='/vegetable') {
        //     this.query()
        // }
    }

    mounted() {
        // this.getMap()
        //接口调用
        if (this.$route.path === '/vegetable/allIndustry/growth') {
            this.query()
        }
    }

    beforeDestroy() {
        clearInterval(this.timer2)
        for (const key in this.apiList) {
            socketClient.delCallBack(this.apiList[key].url);
            socketClient.delSend(this.apiList[key].url);
        }
    }
}
</script>

<style scoped lang="scss">
.vegetable {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: url('../../../assets/images/vegetable/bg.jpg');
    background-size: cover;
    padding-bottom: 110px;

    .content {
        position: relative;
        z-index: 999;
        display: flex;
        justify-content: space-between;
        //width: 1860px;
        //height: 100%;
        margin: auto 30px;
        overflow: hidden;
        //background: rgba(0, 11, 26, 0.75);
        .left {
            width: 440px;
            height: 938px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;

            .icon-box {
                display: flex;
                align-items: center;

                .icon-box-left {
                    .icon-box-left-icon {
                        width: 110px;
                        height: 104px;
                    }
                }

                .icon-box-right {
                    margin-left: 25px;
                    font-family: YouSheBiaoTiHei;
                    font-weight: 400;
                    color: #FFFFFF;
                    text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.26);

                    background: linear-gradient(0deg, #4E91EC 0%, #FFFFFF 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;

                    .icon-box-right-num {
                        font-size: 60px;
                        margin-top: -20px;
                        margin-bottom: -15px;
                        height: 90px;
                    }

                    .icon-box-right-title {
                        font-size: 30px;
                    }
                }
            }
        }

        .mid {
            width: 912px;
            height: 938px;
            margin: 0 30px;
            padding: 30px 0;
        }

        .right {
            width: 440px;
            display: flex;
            height: 938px;
            flex-direction: column;
            justify-content: space-evenly;

            .right-box {
                font-family: YouSheBiaoTiHei;
                font-weight: 400;
                color: #FFFFFF;
                text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.26);
                background: linear-gradient(0deg, #4E91EC 0%, #FFFFFF 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                padding-left: 40px;

                .right-box-num {
                    height: 90px;
                    font-size: 60px;
                    margin-bottom: -25px;
                }

                .right-box-title {
                    font-size: 30px;
                }

                .right-box-bar {
                    display: none;
                    width: 0%;
                    height: 26px;
                    background: linear-gradient(-90deg, #4E91EC 0%, rgba(78, 145, 236, 0.19) 100%);
                    border-radius: 0px 13px 13px 0px;
                    transition: width 2s;
                    -webkit-transition: width 2s;
                }
            }
        }
    }

    .linkLeft {
        display: flex;
        align-items: center;
    }

    .linkRight {
        display: flex;
        align-items: center;
    }

    .link {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.5);
        padding: 0 11px;
        font-size: 18px;
        color: #ffffff;
        font-family: 35 --Regular;
        font-weight: 400;
        display: flex;
        align-items: center;
        margin-left: 10px;
        height: 40px;
        cursor: pointer;
    }

    .link:hover {
        background: rgba(255, 255, 255, 0.5) !important;
        border: 1px solid rgba(255, 255, 255, 0.8) !important;
    }

    .seamless-warp {
        overflow: hidden;
        height: calc(100% - 40px);
        overflow: hidden;
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -ms-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-perspective: 1000;
        -moz-perspective: 1000;
        -ms-perspective: 1000;
        perspective: 1000; /* Other transform properties here */
    }
}
</style>
