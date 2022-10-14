<template>
    <div class="vegetable" v-if="$route.path==='/vegetable'">
        <bgAnim></bgAnim>
        <OneSizeContainer style="z-index:999;" :width="1920" :height="1080" :maxRatio="3">
            <selfHead title="高山蔬菜大数据分析" @back="back" style="z-index:999;">
                <template slot="leftBtn">
                    <div class="linkLeft">
                        <div class="link" @click="goSunPage('baseResources')">基础资源分析</div>
                        <div class="link" @click="goSunPage('mainStatus')">主体情况分析</div>
                    </div>
                </template>
                <template slot="rightBtn">
                    <div class="linkRight">
                        <div class="link" @click="goSunPage('allIndustry')">全产业链分析</div>
                        <div class="link" @click="goSunPage('supervise')">产业监管分析</div>
                        <div class="link" @click="goSunPage('publicService')">公共服务分析</div>
                    </div>
                </template>
            </selfHead>
            <div class="content">
                <div class="left">
                    <div class="leftTop">
                        <selfTitle>高山蔬菜种植概况</selfTitle>
                        <ul>
                            <li class="title">
                                <span>农产品名称</span>
                                <span>种植面积</span>
                                <span>耕地面积</span>
                                <span>日平均日照</span>
                                <span>日平均温度</span>
                                <span>月降水量</span>
                            </li>
                            <vue-seamless-scroll :data="leftTopData" :class-option="classOption" class="seamless-warp">
                                <li v-for="(item, index) in leftTopData" :key="index">
                                    <span>{{item.vegetablesName}}</span>
                                    <span>{{item.plantAreaCount}}亩</span>
                                    <span>{{item.cultivatedArea}}亩</span>
                                    <span>{{item.avgSunshine}}h</span>
                                    <span>{{item.avgTemperature}}℃</span>
                                    <span>{{item.precipitation}}mm</span>
                                </li>
                            </vue-seamless-scroll>
                        </ul>
                    </div>
                    <div class="leftMid">
                        <selfTitle>近7年高山蔬菜种植</selfTitle>
                        <div class="leftMidChart" ref="leftMidChart"></div>
                    </div>
                    <div class="leftBottom">
                        <selfTitle>近7年长势监测分析</selfTitle>
                        <div class="leftBottomChart" ref="leftBottomChart"></div>
                    </div>
                </div>
                <div class="mid">
                    <div class="midTop">
                        <selfTitle>种植分布监测分析</selfTitle>
                        <div class="midTopChart" ref="midTopChart"></div>
                        <ul class="sum">
                            <li>
                                <span class="label">蔬菜种类</span>
                                <span class="num" ref="vegetablesCount">{{sum.vegetablesCount}}</span>
                                <span>种</span>
                            </li>
                            <li>
                                <span class="label">产量预估</span>
                                <span class="num" ref="yieldValue">{{sum.yieldValue}}</span>
                                <span>吨</span>
                            </li>
                            <li>
                                <span class="label">销售额预估</span>
                                <span class="num" ref="outputValue">{{sum.outputValue}}</span>
                                <span>元</span>
                            </li>
                        </ul>
                        <ul class="legend">
                            <li>
                                <img src="../../assets/images/vegetable/green.png" alt="">
                                产量正常
                            </li>
                            <li>
                                <img src="../../assets/images/vegetable/yellow.png" alt="">
                                产量可能减少
                            </li>
                            <li>
                                <img src="../../assets/images/vegetable/red.png" alt="">
                                产量减少
                            </li>
                        </ul>
                    </div>
                    <div class="midLeft">
                        <selfTitle>近4年产量预估分析</selfTitle>
                        <div class="midLeftChart" ref="midLeftChart"></div>
                    </div>
                    <div class="midRight">
                        <selfTitle>近7年气象灾害监测分析</selfTitle>
                        <div class="midRightChart" ref="midRightChart"></div>
                    </div>
                </div>
                <div class="right">
                    <div class="rightTop">
                        <selfTitle>近7年农业干旱监测分析</selfTitle>
                        <div class="rightTopChart" ref="rightTopChart"></div>
                    </div>
                    <div class="rightMid1">
                        <selfTitle>近7年高山蔬菜销售分析</selfTitle>
                        <div class="rightMidChart" ref="rightMidChart"></div>
                    </div>
                    <div class="rightMid2">
                        <selfTitle>高山蔬菜肥药售卖趋势</selfTitle>
                        <ul class="rightMidTable">
                            <li class="title">
                                <span>年份</span>
                                <span>购买人总量</span>
                                <span>农资销售总额</span>
                                <!-- <span>总额同比</span> -->
                                <span>总额环比</span>
                            </li>
                            <vue-seamless-scroll :data="rightMidData" :class-option="classOption1" class="seamless-warp">
                                <li v-for="(item, index) in rightMidData" :key="index">
                                    <span>{{item.year}}年</span>
                                    <span>{{item.buyPersonCount}}人</span>
                                    <span>{{item.saleMoney}}元</span>
                                    <!-- <span :class="item.growRate>0?'down':'up'">
                                        <img v-if="item.growRate>0" src="../../assets/images/vegetable/up.png">
                                        <img v-else src="../../assets/images/vegetable/down.png">
                                        {{item.growRate}}
                                    </span> -->
                                    <span :class="item.ringRatio>0?'down':'up'">
                                        <img v-if="item.ringRatio>0" src="../../assets/images/vegetable/up.png">
                                        <img v-else src="../../assets/images/vegetable/down.png">
                                        {{item.ringRatio}}
                                    </span>
                                </li>
                            </vue-seamless-scroll>
                        </ul>
                    </div>
                    <div class="rightBottom">
                        <selfTitle>公共服务数据统计</selfTitle>
                        <ul class="rightBottomContent">
                            <li>
                                <span class="label">农业公共服务中心总数量</span>
                                <span class="num blue" ref="publicServiceCenter">{{rightBottomData.publicServiceCenter}}</span>
                            </li>
                            <li>
                                <span class="label">科研院所总数量</span>
                                <span class="num green" ref="researchInstitutes">{{rightBottomData.researchInstitutes}}</span>
                            </li>
                            <li>
                                <span class="label">现代农业科技示范基地总数量</span>
                                <span  class="num blue" ref="technologyDemonstration">{{rightBottomData.technologyDemonstration}}</span>
                            </li>
                            <li>
                                <span class="label">培训基地总数量</span>
                                <span class="num green" ref="trainingBase">{{rightBottomData.trainingBase}}</span>
                            </li>
                            <li>
                                <span class="label">农技专家总数量</span>
                                <span  class="num blue" ref="specialisNum">{{rightBottomData.specialisNum}}</span>
                            </li>
                            <li>
                                <span class="label">新型职业农民总数量</span>
                                <span class="num green" ref="newPracticingFarmer">{{rightBottomData.newPracticingFarmer}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </OneSizeContainer>
    </div>
    <router-view v-else></router-view>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import selfHead from "../../components/Head/Head.vue"
import bgAnim from '@/components/bgAnim/BgAnim.vue'
import selfTitle from './Title.vue'
import * as echarts from 'echarts';
import map from './map.json'
import {animateValue} from "@/util";
import * as socketClient from '@/views/socketClient';
import vueSeamlessScroll from "vue-seamless-scroll";
import m from "moment"
import _ from 'lodash'

@Component({
    name: "Vegetable",
    components: {
        selfHead,
        bgAnim,
        selfTitle,
        vueSeamlessScroll
    }
})
export default class Index extends Vue {
    public $refs!: {
        leftMidChart: HTMLDivElement,
        leftBottomChart: HTMLDivElement,
        midTopChart: HTMLDivElement,
        midLeftChart: HTMLDivElement,
        midRightChart: HTMLDivElement,
        rightTopChart: HTMLDivElement,
        rightMidChart: HTMLDivElement,
        num: HTMLSpanElement,
        num1: HTMLSpanElement
    }

    currentYear: any = m().format('YYYY')

    timeout: any = null;

    timer1: any = null;
    timer2: any = null;
    timer3: any = null;
    timer4: any = null;
    timer5: any = null;
    timer6: any = null;

    classOption: Object = {
        step: 0.2,
        limitMoveNum: 7
    };

    classOption1: Object = {
        step: 0.2,
        limitMoveNum: 5
    };

    sum:any = {}
    sum1:any = {}

    leftTopData:any = []

    rightBottomData:any = {}

    rightMidData:any = []

    apiList:any = {
        leftTop: {
            url:'/alpineVegetables/vegetableCultivation',
            params:{
                year:this.currentYear-1
            }
        },
        leftMid:{
            url:'/alpineVegetables/yearVegetableTrend',
            params:{}
        },
        leftBottom:{
            url:'/alpineVegetables/growthCount',
            params:{}
        },
        midTop:{
            url:'/alpineVegetables/plantingDistribution',
            params:{
                year:this.currentYear-1
            }
        },
        mapOption:{
            url:'/alpineVegetables/plantingDistributionYearCount',
            params:{
                year:this.currentYear-1
            }
        },
        midLeft:{
            url:'/alpineVegetables/vegetableYearYieldPredict',
            params:{}
        },
        midRight:{
            url:'/alpineVegetables/vegetableYearWeather',
            params:{}
        },
        rightTop:{
            url:'/alpineVegetables/vegetableYearDrought',
            params:{}
        },
        rightMid1:{
            url:'/alpineVegetables/vegetableYearSale',
            params:{}
        },
        rightMid2:{
            url:'/alpineVegetables/fertilizerMedicine',
            params:{}
        },
        rightBottom:{
            url:'/alpineVegetables/vegetablePublicService',
            params:{
                year:this.currentYear-1
            }
        },
    }

    getLeftMidChart(year:any,yieldCount:any,plantAreaCount:any,outputValue:any) {
        let myChart = echarts.init(this.$refs.leftMidChart);
        // this.$set(this.mixinChartConfig,'leftMidChart',myChart)
        myChart.hideLoading();
        const option:any = {
            color: ['#26BF40', '#FCCD4C', '#43D1C5'],
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(3,3,3,0)',
                borderWidth: 0,
                textStyle: {
                    color: '#ffffff',
                    fontSize: '14',
                },
                axisPointer: {
                    type: 'shadow'
                },
                formatter: (value:any) => {
                    let str = ''
                    let unit = ''
                    value.forEach((item:any) => {
                        if (item.seriesName==='面积(亩)') {
                            unit = 'w亩'
                        } else if(item.seriesName==='产量(吨)') {
                            unit = 'w吨'
                        } else if(item.seriesName==='产值(万元)') {
                            unit = '万元'
                        }
                        str+=`<li style="position: relative;display:flex;height:20px;line-height:20px;">
                                <div style="width:10px;height:10px;border-radius:50%;background-color:#fff;position: absolute;top: 50%;transform: translateY(-50%);background-color:${item.color};"></div>
                                <div style="margin-left:15px;">${item.seriesName}：${item.data}${unit}</div>
                            </li>`
                    });
                    let res = `<div style="background-color:rgba(0, 0, 0, .5);margin:-10px;padding:10px;border-radius:5px;">
                        <span>${value[0].name}</span>
                        <ul style="margin-top:10px;">
                        ${str}
                        <ul>
                    </div>`
                    return res
                }
            },
            grid: {
                right: '25%',
                left: '15%',
                top: '20%',
                bottom: '10%',
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#dfdfdf",
                        }
                    },
                    data: year
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '产量(吨)',
                    position: 'right',
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#26BF40"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine:{
                        show: true,
                        lineStyle:{
                            type: 'dashed',
                            color: '#fff',
                            opacity: 0.4
                        }
                    },
                    nameTextStyle: {
                        padding: [0,0,0,40]
                    },
                    axisLabel: {
                        formatter: (value:any) => {
                            return `${value}w`
                        }
                    }
                },
                {
                    type: 'value',
                    name: '产值(万元)',
                    position: 'right',
                    offset: 60,
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#FCCD4C'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine:{
                        show:false
                    },
                    nameTextStyle: {
                        padding: [0,0,0,40]
                    },
                    axisLabel: {
                        formatter: (value:any) => {
                            return value
                        }
                    }
                },
                {
                    type: 'value',
                    name: '面积(亩)',
                    position: 'left',
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#43D1C5'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine:{
                        show:false
                    },
                    nameTextStyle: {
                        padding: [0,35,0,0]
                    },
                    axisLabel: {
                        formatter: (value:any) => {
                            return `${value}w`
                        }
                    }
                }
            ],
            series: [
                {
                    name: '产量(吨)',
                    type: 'line',
                    data: yieldCount,
                    lineStyle:{
                        shadowColor:'#000',
                        shadowBlur: 5,
                        shadowOffsetY:2
                    },
                },
                {
                    name: '产值(万元)',
                    type: 'line',
                    symbol: "none",
                    smooth:true,
                    yAxisIndex: 1,
                    lineStyle:{
                        shadowColor:'#000',
                        shadowBlur: 5,
                        shadowOffsetY:2
                    },
                    areaStyle:{
                        normal:{
                            color: new echarts.graphic.LinearGradient(0,0,0,1,[{
                                offset:0,
                                color:"#FCCD4C"
                            },{
                                offset:0.8,
                                color:"rgba(137,189,27,0)"
                            }],false)
                        }
                    },
                    data: outputValue
                },
                {
                    name: '面积(亩)',
                    type: 'bar',
                    yAxisIndex: 2,
                    barWidth : 20,
                    itemStyle: {
                        normal:{
                            barBorderRadius:[5,5,0,0]
                        }
                    },
                    data: plantAreaCount
                }
            ]
        }
        myChart.setOption(option);
        let len = 0
        clearInterval(this.timer1)
        this.timer1 = setInterval(() => {
            if (len === year.length) {
                len = 0
            }
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: len,
            })
            len++
        }, 3800)
    }

    getLeftBottomChart(year:any,growth:any,rainCount:any,soilCapacity:any) {
        let myChart = echarts.init(this.$refs.leftBottomChart);
        // this.$set(this.mixinChartConfig,'leftBottomChart',myChart)
        myChart.hideLoading();
        const option:any = {
            color: ['#26BF40', '#FCCD4C', 'rgba(80, 142, 230, 0.5)'],
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(3,3,3,0)',
                borderWidth: 0,
                textStyle: {
                    color: '#ffffff',
                    fontSize: '14',
                },
                axisPointer: {
                    type: 'shadow'
                },
                formatter: (value:any) => {
                    let str:any = ''
                    let data:any = ''
                    value.forEach((item:any) => {
                        if (item.seriesName==='长势') {
                            if (item.data===1) {
                                data = '低'
                            } else if(item.data===2) {
                                data = '中'
                            } else if(item.data===3) {
                                data = '高'
                            }
                        } else if(item.seriesName==='土壤能力等级') {
                            data = item.data
                        } else if(item.seriesName==='年降水量') {
                            data = -item.data
                        }
                        str+=`<li style="position: relative;display:flex;height:20px;line-height:20px;">
                                <div style="width:10px;height:10px;border-radius:50%;background-color:#fff;position: absolute;top: 50%;transform: translateY(-50%);background-color:${item.color};"></div>
                                <div style="margin-left:15px;">${item.seriesName}：${data}</div>
                            </li>`
                    });
                    let res = `<div style="background-color:rgba(0, 0, 0, .5);margin:-10px;padding:10px;border-radius:5px;">
                        <span>${value[0].name}</span>
                        <ul style="margin-top:10px;">
                        ${str}
                        <ul>
                    </div>`
                    return res
                }
            },
            legend: {
                data: ['长势', '土壤能力等级', '年降水量'],
                textStyle:{
                    color:"#fff"
                }
            },
            grid: {
                right: '5%',
                top: '20%',
                bottom: '10%',
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(255, 255, 255, 0.5)",
                        }
                    },
                    data: year
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    position: 'left',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(255, 255, 255, 0.5)"
                        }
                    },
                    max: (value:any) => {
                        const { max, min } = value;
                        const absMax = Math.max(Math.abs(max), Math.abs(min));
                        return Math.floor(absMax * 1);
                    },
                    min: (value:any) => {
                        const { max, min } = value;
                        const absMax = Math.max(Math.abs(max), Math.abs(min));
                        return Math.floor(-absMax * 1);
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine:{
                        show:true,
                        lineStyle:{
                            type: 'dashed',
                            color: '#fff',
                            opacity: 0.4
                        }
                    },
                    nameTextStyle: {
                        padding: [0,9999,0,0],
                    },
                    axisLabel: {
                        formatter: (value:any) => {
                            if (value===1) {
                                return '低'
                            } else if (value===2) {
                                return '中'
                            } else if (value===3) {
                                return '高'
                            } else {
                                return ''
                            }
                        }
                    }
                },
                {
                    type: 'value',
                    position: 'left',
                    max: (value:any) => {
                        const { max, min } = value;
                        const absMax = Math.max(Math.abs(max), Math.abs(min));
                        return Math.floor(absMax * 1);
                    },
                    min: (value:any) => {
                        const { max, min } = value;
                        const absMax = Math.max(Math.abs(max), Math.abs(min));
                        return Math.floor(-absMax * 1);
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(255, 255, 255, 0.5)"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine:{
                        show:false,
                        lineStyle:{
                            type: 'dashed',
                            color: '#fff',
                            opacity: 0.4
                        }
                    },
                    nameTextStyle: {
                        padding: [0,9999,0,0],
                    },
                    axisLabel: {
                        formatter: (value:any) => {
                            if (value<=0) {
                                return -value
                            } else {
                                return ''
                            }
                        }
                    }
                }
            ],
            series: [
                {
                    name: '长势',
                    type: 'line',
                    data: growth,
                    symbol: "none",
                    smooth:true,
                    lineStyle:{
                        shadowColor:'#000',
                        shadowBlur: 5,
                        shadowOffsetY:2
                    },
                    areaStyle:{
                        normal:{
                            color: new echarts.graphic.LinearGradient(0,0,0,1,[{
                                offset:0,
                                color:"#26BF40"
                            },{
                                offset:0.8,
                                color:"rgba(137,189,27,0)"
                            }],false)
                        }
                    },
                },
                {
                    name: '土壤能力等级',
                    type: 'bar',
                    barWidth : 20,
                    stack: 'Total',
                    itemStyle: {
                        normal:{
                            barBorderRadius:[5,5,0,0]
                        }
                    },
                    data: soilCapacity
                },
                {
                    name: '年降水量',
                    type: 'bar',
                    barWidth : 20,
                    yAxisIndex:1,
                    stack: 'Total',
                    itemStyle: {
                        normal:{
                            barBorderRadius:[0,0,5,5]
                        }
                    },
                    data: rainCount
                }
            ]
        }
        myChart.setOption(option);
        let len = 0
        clearInterval(this.timer2)
        this.timer2 = setInterval(() => {
            if (len === year.length) {
                len = 0
            }
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: len,
            })
            len++
        }, 3800)
    }

    getMap(data:any) {
      let myChart = echarts.init(this.$refs.midTopChart);
    //   this.$set(this.mixinChartConfig,'midTopChart',myChart)
      myChart.hideLoading();
      echarts.registerMap("map", map);
      const option:any = {
        tooltip: {
            backgroundColor: 'rgba(3,3,3,0)',
            borderWidth: 0,
            textStyle: {
                  color: '#ffffff',
                  fontSize: '14',
            },
            formatter: (value:any) => {
                let res = ``
                let color = '#26BF40'
                // 判断产量是否下滑
                // if (value.data&&value.data.selfType==='green') {
                //     color = '#26BF40'
                // } else if(value.data&&value.data.selfType==='red') {
                //     color = '#f74e4e'
                // } else if(value.data&&value.data.selfType==='yellow') {
                //     color = '#eac24d'
                // }
                if (value.data) {
                    res = `<div style='width:220px;height:230px;background-color:rgba(255, 255, 255, 0.7);margin:-10px;border-radius:5px;box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.6);'>
                        <div style='display:flex;justify-content:space-between;width:100%;height:30px;background-color:${color};border-radius:5px 5px 0 0;padding:5px 10px;font-size:14px;'>
                            <span>${value.data.name}</span>
                            <span>产量正常</span>
                        </div>
                        <ul  style="color:#525866;margin:10px 20px;font-size:12px;">
                            <li style="display:flex;margin-bottom:10px;">
                                <span  style="flex:1;text-align:right;">
                                    高山蔬菜种植面积：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.plantAreaCount}亩
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:10px;">
                                <span style="display:inline-block;width:110px;text-align:right;">
                                    耕地面积：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.cultivatedArea}亩
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:10px;">
                                <span style="display:inline-block;width:110px;text-align:right;">
                                    蔬菜种植种类：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.vegetablesCount}种
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:10px;">
                                <span style="display:inline-block;width:110px;text-align:right;">
                                    平均温度 (按月)：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.avgTemperature}℃
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:10px;">
                                <span style="display:inline-block;width:110px;text-align:right;">
                                    平均湿度 (按月)：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.avgHum}
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:10px;">
                                <span style="display:inline-block;width:110px;text-align:right;">
                                    平均降水量 (按月)：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.precipitation}mm
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
            type: "map",
            selectedMode:false,
            mapType: "map", // 自定义扩展图表类型
            zoom:1.2,
            label: {
              show: true,
              formatter: (value:any) => {
                  let res = `{green|}`
                // 判断产量是否下滑
                //   if (value.data&&value.data.selfType==='green') {
                //       res = '{green|}'
                //   } else if(value.data&&value.data.selfType==='red') {
                //       res = '{red|}'
                //   } else if(value.data&&value.data.selfType==='yellow') {
                //       res = '{yellow|}'
                //   }
                  return res
              },
              rich:{
                  green:{
                    backgroundColor:{
                        image:require('@/assets/images/vegetable/green.png')
                    },
                    width:30,
                    height:23
                  },
                  red:{
                    backgroundColor:{
                        image:require('@/assets/images/vegetable/red.png')
                    },
                    width:30,
                    height:23
                  },
                  yellow:{
                    backgroundColor:{
                        image:require('@/assets/images/vegetable/yellow.png')
                    },
                    width:30,
                    height:23
                  },
              },
              emphasis: {
                show: true,  //开启悬浮事件
              }
            },
            data,
            itemStyle: {
              normal: {
                borderColor: 'rgba(67, 209, 197, 1)',//区域边框颜色
                areaColor: "rgba(67, 209, 197, 0.1)",//区域颜色
              },
              emphasis: {
                borderColor: 'rgba(67, 209, 197, 1)',
                areaColor: "rgba(67, 209, 197, 1)"
              },
            },
          },
        ],
      };
      myChart.setOption(option);
      myChart.on('mouseover',(params:any) => {
        this.sum.vegetablesCount = params.data.vegetablesCount
        this.sum.outputValue = params.data.outputValue
        this.sum.yieldValue = params.data.yieldValue
        for (const key in this.sum) {
            if ((this.$refs as any)[key]) {
                animateValue((this.$refs as any)[key], this.sum[key], 600)
            }
        }
      });
      myChart.on('mouseout', (params:any) => {
          this.sum = _.cloneDeep(this.sum1)
          for (const key in this.sum) {
              if ((this.$refs as any)[key]) {
                  animateValue((this.$refs as any)[key], this.sum[key], 600)
              }
          }
      });
    }

    getMidLeftChart(year:any,predictOutput:any,actualOutput:any) {
        let myChart = echarts.init(this.$refs.midLeftChart);
        // this.$set(this.mixinChartConfig,'midLeftChart',myChart)
        let data1:any = []
        year.forEach((item:any,index:number) => {
            if (index<3) {
                data1.push([item,actualOutput[index]])
            }
        });
        let data2:any = [[year[3],actualOutput[3]]]
        data2.unshift(data1[data1.length-1])
        myChart.hideLoading();
        const option:any = {
            color:['#FCCD4C','#26BF40'],
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(3,3,3,0)',
                borderWidth: 0,
                textStyle: {
                    color: '#ffffff',
                    fontSize: '14',
                },
                axisPointer: {
                    type: 'shadow'
                },
                formatter: (value:any) => {
                    let str:any = ''
                    value.forEach((item:any,index:number) => {
                        if (index < 2) {
                            str+=`<li style="position: relative;display:flex;height:20px;line-height:20px;">
                                    <div style="width:10px;height:10px;border-radius:50%;background-color:#fff;position: absolute;top: 50%;transform: translateY(-50%);background-color:${item.color};"></div>
                                    <div style="margin-left:15px;">${item.seriesName}：${typeof(item.data)!=='string'?item.data[1]:item.data}吨</div>
                                </li>`
                        }
                    });
                    let res = `<div style="background-color:rgba(0, 0, 0, .5);margin:-10px;padding:10px;border-radius:5px;">
                        <span>${value[0].axisValue}</span>
                        <ul style="margin-top:10px;">
                        ${str}
                        <ul>
                    </div>`
                    return res
                }
            },
            legend: {
                data: ['预估产量', '实际产量'],
                textStyle:{
                    color:"#fff"
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                // data: year,
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(255, 255, 255, 0.5)",
                    }
                },
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(255, 255, 255, 0.5)"
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine:{
                    show:true,
                    lineStyle:{
                        type: 'dashed',
                        color: '#fff',
                        opacity: 0.4
                    }
                },
            },
            series: [
                {
                    name: '预估产量',
                    type: 'line',
                    itemStyle:{
                        normal:{
                            lineStyle:{
                                width:3,
                                type:'dashed',
                                shadowColor:'#000',
                                shadowBlur: 5,
                                shadowOffsetY:2
                            }
                        }
                    },
                    data: predictOutput
                },
                {
                    name: '实际产量',
                    type: 'line',
                    itemStyle:{
                        normal:{
                            color:'#26BF40',
                            lineStyle:{
                                width:3,
                                shadowColor:'#000',
                                shadowBlur: 5,
                                shadowOffsetY:2
                            }
                        }
                    },
                    data: data1
                },
                {
                    name: '实际产量',
                    type: 'line',
                    itemStyle:{
                        normal:{
                            lineStyle:{
                                width:3,
                                type:'dashed',
                                shadowColor:'#000',
                                shadowBlur: 5,
                                shadowOffsetY:2
                            }
                        }
                    },
                    data: data2
                }
            ]
        };
        myChart.setOption(option);
        let len = 0
        clearInterval(this.timer3)
        this.timer3 = setInterval(() => {
            if (len === year.length) {
                len = 0
            }
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: len,
            })
            len++
        }, 3800)
    }
    
    getMidRightChart(year:any,historyData:any,predictData:any,actualOutput:any,estimateOutput:any) {
        let myChart = echarts.init(this.$refs.midRightChart);
        // this.$set(this.mixinChartConfig,'midRightChart',myChart)
        myChart.hideLoading();

        let data1 = historyData.map((item:any)=>{
            return [item.name,item.value]
        })
        
        let data2 = predictData.map((item:any)=>{
            return [item.name,item.value]
        })
        data2.unshift([data1[data1.length-1][0],0])
        
        const option:any = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(3,3,3,0)',
                borderWidth: 0,
                textStyle: {
                    color: '#ffffff',
                    fontSize: '14',
                },
                axisPointer: {
                    type: 'shadow'
                },
                formatter: (value:any) => {
                    let str = ''
                    value.forEach((item:any) => {
                        if (item.data) {
                            str+=`<li style="position: relative;display:flex;height:20px;line-height:20px;">
                                    <div style="width:10px;height:10px;border-radius:50%;background-color:#fff;position: absolute;top: 50%;transform: translateY(-50%);background-color:${item.color};"></div>
                                    <div style="margin-left:15px;">${item.seriesName}：${(item.seriesName==='减产率'||item.seriesName==='预测产量')?item.data[1]:item.data}${item.seriesName==='减产率'?'%':'吨'}</div>
                                </li>`
                        }
                    });
                    let res = `<div style="background-color:rgba(0, 0, 0, .5);margin:-10px;padding:10px;border-radius:5px;">
                        <span>${value[0].name}</span>
                        <ul style="margin-top:10px;">
                        ${str}
                        <ul>
                    </div>`
                    return res
                },
            },
            grid:{
                right: '10px',
                bottom: '0',
                left: '10px',
                top: '48px',
                containLabel: true
            },
            legend:{
                data:['减产率','预测产量','实际产量','预估产量'],
                textStyle:{
                    color:'#fff'
                },
            },
            xAxis:{
                type:'category',
                axisTick:{
                    show:false
                },
                axisLabel:{
                    color:'rgba(255, 255, 255, .5)'
                },
                axisLine:{
                    lineStyle:{
                        color:'rgba(255, 255, 255, .5)'
                    }
                }
            },
            yAxis:[
                {   
                    axisTick:{
                        show:false
                    },
                    axisLine:{
                        show:false
                    },
                    axisLabel:{
                        color:'rgba(255, 255, 255, .5)'
                    },
                    splitLine:{
                        lineStyle:{
                            type:'dashed',
                            color:'rgba(255, 255, 255, .5)'
                        }
                    }
                },
                {   
                    type: 'value',
                    name: '%',
                    position: 'right',
                    axisTick:{
                        show:false
                    },
                    axisLine:{
                        show:false,
                        lineStyle: {
                            color: "rgba(255, 255, 255, .5)"
                        }
                    },
                    axisLabel:{
                        color:'rgba(255, 255, 255, .5)'
                    },
                    splitLine:{
                        show:false,
                        lineStyle:{
                            type:'dashed',
                            color:'rgba(255, 255, 255, .5)'
                        }
                    },
                }
            ],
            series:[
                {
                    name:'减产率',
                    type:'line',
                    data:data1,
                    yAxisIndex: 1,
                    itemStyle:{
                        normal:{
                            color:'#FF4C4C',
                            lineStyle:{
                                shadowColor:'#000',
                                shadowBlur: 5,
                                shadowOffsetY:2
                            }
                        }
                    },
                },
                {
                    name:'预测产量',
                    type:'line',
                    data:data2,
                    itemStyle:{
                        normal:{
                            color:'rgba(255, 236, 129, 1)',
                        }
                    },
                    lineStyle:{
                        type:'dashed',
                        shadowColor:'#000',
                        shadowBlur: 5,
                        shadowOffsetY:2
                    }
                },
                {
                    name:'预测产量',
                    type:'bar',
                    barWidth : 20,
                    barGap: '-100%',
                    data:[data2[1]],
                    z:1,
                    itemStyle:{
                        normal:{
                            color:'rgba(255, 236, 129, 1)',
                        }
                    }
                },
                {
                    name:'实际产量',
                    type:'bar',
                    barWidth : 20,
                    z:1,
                    data:actualOutput,
                    itemStyle:{
                        normal:{
                            color:'#26BF40',
                        }
                    }
                },
                {
                    name:'预估产量',
                    type:'bar',
                    barWidth : 20,
                    z:0,
                    data:estimateOutput,
                    itemStyle:{
                        normal:{
                            color:'rgba(0, 0, 0, .5)',
                        }
                    }
                },
            ]
        }
        myChart.setOption(option);
        let len = 0
        clearInterval(this.timer4)
        this.timer4 = setInterval(() => {
            if (len === year.length) {
                len = 0
            }
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: len,
            })
            len++
        }, 3800)
    }

    getRightTopChart(year:any,historyData:any,predictData:any,actualOutput:any,estimateOutput:any) {
        let myChart = echarts.init(this.$refs.rightTopChart);
        // this.$set(this.mixinChartConfig,'midRightChart',myChart)
        myChart.hideLoading();

        let data1 = historyData.map((item:any)=>{
            return [item.name,item.value]
        })
        let data2 = predictData.map((item:any)=>{
            return [item.name,item.value]
        })
        data2.unshift([data1[data1.length-1][0],0])
        
        const option:any = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(3,3,3,0)',
                borderWidth: 0,
                textStyle: {
                    color: '#ffffff',
                    fontSize: '14',
                },
                axisPointer: {
                    type: 'shadow'
                },
                formatter: (value:any) => {
                    let str = ''
                    value.forEach((item:any) => {
                        if (item.data) {
                            str+=`<li style="position: relative;display:flex;height:20px;line-height:20px;">
                                    <div style="width:10px;height:10px;border-radius:50%;background-color:#fff;position: absolute;top: 50%;transform: translateY(-50%);background-color:${item.color};"></div>
                                    <div style="margin-left:15px;">${item.seriesName}：${(item.seriesName==='减产率'||item.seriesName==='预测产量')?item.data[1]:item.data}${item.seriesName==='减产率'?'%':'吨'}</div>
                                </li>`
                        }
                    });
                    let res = `<div style="background-color:rgba(0, 0, 0, .5);margin:-10px;padding:10px;border-radius:5px;">
                        <span>${value[0].name}</span>
                        <ul style="margin-top:10px;">
                        ${str}
                        <ul>
                    </div>`
                    return res
                },
            },
            grid:{
                right: '10px',
                bottom: '0',
                left: '10px',
                top: '48px',
                containLabel: true
            },
            legend:{
                data:['减产率','预测产量','实际产量','预估产量'],
                textStyle:{
                    color:'#fff'
                },
            },
            xAxis:{
                type:'category',
                axisTick:{
                    show:false
                },
                axisLabel:{
                    color:'rgba(255, 255, 255, .5)'
                },
                axisLine:{
                    lineStyle:{
                        color:'rgba(255, 255, 255, .5)'
                    }
                }
            },
            yAxis:[
                {   
                    axisTick:{
                        show:false
                    },
                    axisLine:{
                        show:false
                    },
                    axisLabel:{
                        color:'rgba(255, 255, 255, .5)'
                    },
                    splitLine:{
                        lineStyle:{
                            type:'dashed',
                            color:'rgba(255, 255, 255, .5)'
                        }
                    }
                },
                {   
                    type: 'value',
                    name: '%',
                    position: 'right',
                    axisTick:{
                        show:false
                    },
                    axisLine:{
                        show:false,
                        lineStyle: {
                            color: "rgba(255, 255, 255, .5)"
                        }
                    },
                    axisLabel:{
                        color:'rgba(255, 255, 255, .5)'
                    },
                    splitLine:{
                        show:false,
                        lineStyle:{
                            type:'dashed',
                            color:'rgba(255, 255, 255, .5)'
                        }
                    },
                }
            ],
            series:[
                {
                    name:'减产率',
                    type:'line',
                    data:data1,
                    yAxisIndex: 1,
                    itemStyle:{
                        normal:{
                            color:'#FF4C4C',
                            lineStyle:{
                                shadowColor:'#000',
                                shadowBlur: 5,
                                shadowOffsetY:2
                            }
                        }
                    }
                },
                {
                    name:'预测产量',
                    type:'line',
                    data:data2,
                    itemStyle:{
                        normal:{
                            color:'rgba(255, 236, 129, 1)',
                        }
                    },
                    lineStyle:{
                        type:'dashed',
                        shadowColor:'#000',
                        shadowBlur: 5,
                        shadowOffsetY:2
                    }
                },
                {
                    name:'预测产量',
                    type:'bar',
                    barWidth : 20,
                    barGap: '-100%',
                    z:1,
                    data:[data2[1]],
                    itemStyle:{
                        normal:{
                            color:'rgba(255, 236, 129, 1)',
                        }
                    }
                },
                {
                    name:'实际产量',
                    type:'bar',
                    barWidth : 20,
                    data:actualOutput,
                    z:1,
                    itemStyle:{
                        normal:{
                            color:'#26BF40',
                        }
                    }
                },
                {
                    name:'预估产量',
                    type:'bar',
                    barWidth : 20,
                    data:estimateOutput,
                    z:0,
                    itemStyle:{
                        normal:{
                            color:'rgba(0, 0, 0, .5)',
                        }
                    }
                },
            ]
        }
        myChart.setOption(option);
        let len = 0
        clearInterval(this.timer5)
        this.timer5 = setInterval(() => {
            if (len === year.length) {
                len = 0
            }
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: len,
            })
            len++
        }, 3800)
    }

    getRightMidChart(year:any,agriculturalProductionPrice:any,stock:any,vegetablePrice:any,output:any) {
        let myChart = echarts.init(this.$refs.rightMidChart);
        // this.$set(this.mixinChartConfig,'rightMidChart',myChart)
        myChart.hideLoading();
        const option:any = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(3,3,3,0)',
                borderWidth: 0,
                textStyle: {
                    color: '#ffffff',
                    fontSize: '14',
                },
                axisPointer: {
                    type: 'shadow'
                },
                formatter: (value:any) => {
                    let str = ''
                    value.forEach((item:any) => {
                        str+=`<li style="position: relative;display:flex;height:20px;line-height:20px;">
                                <div style="width:10px;height:10px;border-radius:50%;background-color:#fff;position: absolute;top: 50%;transform: translateY(-50%);background-color:${item.color};"></div>
                                <div style="margin-left:15px;">${item.seriesName}：${item.data}${(item.seriesName==='农资价格'||item.seriesName==='蔬菜价格')?'元':'吨'}</div>
                            </li>`
                    });
                    let res = `<div style="background-color:rgba(0, 0, 0, .5);margin:-10px;padding:10px;border-radius:5px;">
                        <span>${value[0].name}</span>
                        <ul style="margin-top:10px;">
                        ${str}
                        <ul>
                    </div>`
                    return res
                },
            },
            grid:{
                top:'50px',
                left:'30px',
                right:'30px',
                bottom:'30px',
            },
            legend: {
                data: ['农资价格', '蔬菜价格', '库存', '产量'],
                textStyle:{
                    color:"#fff"
                }
            },
            xAxis:{
                type:'category',
                axisTick:{
                    show:false
                },
                axisLabel:{
                    color:'rgba(255, 255, 255, .5)'
                },
                axisLine:{
                    lineStyle:{
                        color:'rgba(255, 255, 255, .5)'
                    }
                },
                data:year
            },
           yAxis:[
                {   
                    axisTick:{
                        show:false
                    },
                    axisLine:{
                        show:false
                    },
                    axisLabel:{
                        color:'rgba(255, 255, 255, .5)'
                    },
                    splitLine:{
                        lineStyle:{
                            type:'dashed',
                            color:'rgba(255, 255, 255, .5)'
                        }
                    }
                },
                {   
                    type: 'value',
                    position: 'right',
                    axisTick:{
                        show:false
                    },
                    axisLine:{
                        show:false,
                        lineStyle: {
                            color: "rgba(255, 255, 255, .5)"
                        }
                    },
                    axisLabel:{
                        color:'rgba(255, 255, 255, .5)'
                    },
                    splitLine:{
                        show:false,
                        lineStyle:{
                            type:'dashed',
                            color:'rgba(255, 255, 255, .5)'
                        }
                    },
                }
            ],
            series: [
                {
                    name:'农资价格',
                    data: agriculturalProductionPrice,
                    type: 'bar',
                    stack: 'total',
                    barWidth:10,
                    yAxisIndex: 1,
                    itemStyle:{
                        normal:{
                            color:'#26BF40'
                        }
                    }
                },
                {
                    name:'蔬菜价格',
                    data: vegetablePrice,
                    type: 'bar',
                    stack: 'total',
                    barWidth:10,
                    yAxisIndex: 1,
                    itemStyle:{
                        normal:{
                            color:'#43D1C5'
                        }
                    }
                },
                {
                    name:'产量',
                    data: output,
                    type: 'bar',
                    stack: 'total1',
                    barWidth:10,
                    itemStyle:{
                        normal:{
                            color:'#FCCD4C'
                        }
                    }
                },
                {
                    name:'库存',
                    data: stock,
                    type: 'bar',
                    stack: 'total1',
                    barWidth:10,
                    itemStyle:{
                        normal:{
                            color:'#E6E1B8'
                        }
                    }
                },
            ]
        }
        myChart.setOption(option);
        let len = 0
        clearInterval(this.timer6)
        this.timer6 = setInterval(() => {
            if (len === year.length) {
                len = 0
            }
            myChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: len,
            })
            len++
        }, 3800)
    }

    back() {
        this.$router.push('/home')
    }
    
    goSunPage(name:string) {
        this.$router.push(`/vegetable/${name}`)
    }

    getData(res: any) {
        if (this.$route.path!=='/vegetable'){
            return
        }
        this.timeout = setTimeout(() => {
            if (res.key===this.apiList.leftTop.url) {
                this.leftTopData = res.data
            } else if (res.key===this.apiList.leftMid.url) {
                let year:any = []
                let yieldCount:any = []
                let plantAreaCount:any = []
                let outputValue:any = []
                res.data.forEach((item:any) => {
                    year.push(item.year)
                    yieldCount.push(item.yieldCount)
                    plantAreaCount.push(item.plantAreaCount)
                    outputValue.push(item.outputValue)
                });
                this.getLeftMidChart(year,yieldCount,plantAreaCount,outputValue)
            } else if(res.key===this.apiList.leftBottom.url) {
                let year:any = []
                let growth:any = []
                let rainCount:any = []
                let soilCapacity:any = []
                res.data.forEach((item:any) => {
                    year.push(item.year)
                    if (item.growth==='低') {
                        growth.push(1)
                    } else if (item.growth==='中') {
                        growth.push(2)
                    } else if (item.growth==='高') {
                        growth.push(3)
                    }
                    if (item.soilCapacity==='低') {
                        soilCapacity.push(1)
                    } else if (item.soilCapacity==='中') {
                        soilCapacity.push(2)
                    } else if (item.soilCapacity==='高') {
                        soilCapacity.push(3)
                    }
                    rainCount.push(-item.rainCount)
                });
                this.getLeftBottomChart(year,growth,rainCount,soilCapacity)
            } else if(res.key===this.apiList.midTop.url) {
                let data:any = []
                res.data.forEach((item:any) => {
                    data.push({name:item.area,...item})
                });
                this.getMap(data)
            } else if(res.key===this.apiList.midLeft.url) {
                let year:any = []
                let predictOutput:any = []
                let actualOutput:any = []
                res.data.forEach((item:any) => {
                    year.push(item.year)
                    predictOutput.push(item.predictOutput)
                    actualOutput.push(item.actualOutput)
                });
                this.getMidLeftChart(year,predictOutput,actualOutput)
            } else if(res.key===this.apiList.midRight.url) {
                let year:any = []
                let historyData:any = []
                let predictData:any = []
                let actualOutput:any = []
                let estimateOutput:any = []
                res.data.forEach((item:any,index:number) => {
                    if (item.reduceProduction&&index!==6) {
                        historyData.push({
                            name:item.year,
                            value:item.reduceProduction
                        })
                    }
                    if (item.predictOutput) {
                        predictData.push({
                            name:item.year,
                            value:item.predictOutput
                        })
                    }
                    year.push(item.year)
                    actualOutput.push(item.actualOutput)
                    estimateOutput.push(item.estimateOutput)
                });
                this.getMidRightChart(year,historyData,predictData,actualOutput,estimateOutput)
            } else if(res.key===this.apiList.rightTop.url) {
                let year:any = []
                let historyData:any = []
                let predictData:any = []
                let actualOutput:any = []
                let estimateOutput:any = []
                res.data.forEach((item:any,index:number) => {
                    if (item.reduceProduction&&index!==6) {
                        historyData.push({
                            name:item.year,
                            value:item.reduceProduction
                        })
                    }
                    if (item.predictOutput) {
                        predictData.push({
                            name:item.year,
                            value:item.predictOutput
                        })
                    }
                    year.push(item.year)
                    actualOutput.push(item.actualOutput)
                    estimateOutput.push(item.estimateOutput)
                });
                this.getRightTopChart(year,historyData,predictData,actualOutput,estimateOutput)
            } else if(res.key===this.apiList.rightMid1.url) {
                let year:any = []
                let agriculturalProductionPrice:any = []
                let stock:any = []
                let vegetablePrice:any = []
                let output:any = []
                res.data.forEach((item:any) => {
                    year.push(item.year)
                    agriculturalProductionPrice.push(item.agriculturalProductionPrice)
                    stock.push(item.stock)
                    vegetablePrice.push(item.vegetablePrice)
                    output.push(item.yield)
                });
                this.getRightMidChart(year,agriculturalProductionPrice,stock,vegetablePrice,output)
            } else if(res.key===this.apiList.rightMid2.url) {
                this.rightMidData = res.data
            } else if(res.key===this.apiList.rightBottom.url) {
                this.rightBottomData = res.data
                for (const key in this.rightBottomData) {
                    if ((this.$refs as any)[key]) {
                        animateValue((this.$refs as any)[key], this.rightBottomData[key], 600)
                    }
                }
            } else if(res.key===this.apiList.mapOption.url) {
                this.sum = res.data
                this.sum1 = _.cloneDeep(res.data)
                for (const key in this.sum) {
                    if ((this.$refs as any)[key]) {
                        animateValue((this.$refs as any)[key], this.sum[key], 600)
                    }
                }
            }
        }, 300);
    }

    getParams(params?: any) {
        //拼接查询条件
        return ()=>{
            return params
        }
    }

    query() {
        if (this.$route.path!=='/vegetable'){
            return
        }
        for (const key in this.apiList) {
            socketClient.addCallBack(this.apiList[key].url, this.getData);
            socketClient.addSend(this.apiList[key].url, this.getParams(this.apiList[key].params));
        }
        setTimeout(() => {
            socketClient.sendAll()
        }, 500);
    }

    @Watch('$route')
    routeWatch(value:any) {
        for (const key in this.apiList) {
            socketClient.delCallBack(this.apiList[key].url);
            socketClient.delSend(this.apiList[key].url);
        }
        clearInterval(this.timer1)
        clearInterval(this.timer2)
        clearInterval(this.timer3)
        clearInterval(this.timer4)
        clearInterval(this.timer5)
        clearInterval(this.timer6)
        if (value.path==='/vegetable') {
            this.query()
        }
    }

    mounted() {
        //接口调用
        if (this.$route.path==='/vegetable') {
            this.query()
        }
    }

    beforeDestroy() {
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
    background-image: url('../../assets/images/vegetable/bg.jpg');
    background-size: cover;
    padding-bottom: 110px;
    .content {
        position: relative;
        z-index: 999;
        display: flex;
        width: 1860px;
        margin: auto;
        overflow: hidden;
        .left {
            width: 440px;
            .leftTop {
                width: 440px;
                height: 300px;
                margin-bottom: 20px;
                font-size: 14px;
                ul {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, .2);
                    li {
                        width: 100%;
                        height: 35px;
                        padding-left: 20px;
                        color: #fff;
                        span {
                            display: inline-block;
                            margin-right: 12px;
                            vertical-align: middle;
                            &:nth-child(1) {
                                width: 70px;
                            }
                            &:nth-child(2),
                            &:nth-child(3),
                            &:nth-child(6) {
                                width: 57px;
                            }
                            &:nth-child(4),
                            &:nth-child(5) {
                                width: 45px;
                                line-height: 17px;
                            }
                        }
                    }
                    .title {
                        background-color: rgba(67, 209, 197, .3);
                        font-size: 14px;
                        font-weight: 700;
                        color: #43D1C5;
                        height: 40px;
                    }
                }
            }
            .leftMid {
                width: 440px;
                height: 300px;
                margin-bottom: 20px;
                .leftMidChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, .2);
                }
            }
            .leftBottom {
                width: 440px;
                height: 300px;
                margin-bottom: 20px;
                .leftBottomChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, .2);
                }
            }
        }
        .mid {
            width: 910px;
            margin: 0 30px;
            .midTop {
                position: relative;
                width: 100%;
                height: 620px;
                margin-bottom: 20px;
                .midTopChart {
                    width: 100%;
                    height: 580px;
                    background-color: rgba(255, 255, 255, .2);
                }
                .sum {
                    position: absolute;
                    left: 39px;
                    bottom: 42px;
                    font-size: 14px;
                    li {
                        margin-bottom: 20px;
                        color: #fff;
                        .label {
                            display: inline-block;
                            width: 80px;
                            text-align: right;
                        }
                        .num {
                            color: #43D1C5;
                            font-size: 30px;
                            font-family: YouSheBiaoTiHei;
                            margin: 0 20px;
                        }
                    }
                }
                .legend {
                    position: absolute;
                    right: 39px;
                    bottom: 42px;
                    font-size: 14px;
                    li {
                        margin-bottom: 20px;
                        color: #fff;
                        img {
                            display: inline-block;
                            vertical-align: middle;
                            margin-right: 10px;
                        }
                    }
                }
            }
            .midLeft {
                display: inline-block;
                width: 440px;
                height: 300px;
                margin-bottom: 20px;
                .midLeftChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, .2);
                }
            }
            .midRight {
                display: inline-block;
                width: 440px;
                height: 300px;
                margin-bottom: 20px;
                margin-left: 30px;
                .midRightChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, .2);
                }
            }
        }
        .right {
            width: 440px;
            .rightTop {
                width: 440px;
                height: 220px;
                margin-bottom: 20px;
                .rightTopChart {
                    width: 100%;
                    height: 180px;
                    background-color: rgba(255, 255, 255, .2);
                }
            }
            .rightMid1 {
                width: 440px;
                height: 220px;
                margin-bottom: 20px;
                .rightMidChart {
                    width: 100%;
                    height: 180px;
                    background-color: rgba(255, 255, 255, .2);
                }
            }
            .rightMid2 {
                width: 440px;
                height: 220px;
                margin-bottom: 20px;
                .rightMidTable {
                    width: 100%;
                    height: 180px;
                    background-color: rgba(255, 255, 255, .2);
                    font-size: 14px;
                    li {
                        width: 100%;
                        height: 35px;
                        padding-left: 20px;
                        color: #fff;
                        span {
                            display: inline-block;
                            margin-right: 12px;
                            vertical-align: middle;
                            &:nth-child(1) {
                                width: 70px;
                            }
                            &:nth-child(2) {
                                width: 90px;
                            }
                            &:nth-child(3) {
                                width: 104px;
                            }
                            &:nth-child(4),
                            &:nth-child(5) {
                                width: 60px;
                            }
                            img {
                                display: inline-block; 
                                vertical-align: middle;
                            }
                        }
                        .up {
                            color: #26BF40;
                        }
                        .down {
                            color: #FF4C4C;
                        }
                    }
                    .title {
                        background-color: rgba(67, 209, 197, .3);
                        font-size: 14px;
                        font-weight: 700;
                        color: #43D1C5;
                        height: 40px;
                        line-height: 40px;
                    }
                }
            }
            .rightBottom {
                width: 440px;
                height: 220px;
                margin-bottom: 20px;
                .rightBottomContent {
                    width: 100%;
                    height: 180px;
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    li {
                        width: 215px;
                        height: 56px;
                        background-color: rgba(255, 255, 255, .2);
                        .blue {
                            color: #43D1C5;
                        }
                        .green {
                            color: #26BF40;
                        }
                        .num {
                            font-size: 24px;
                            font-family: YouSheBiaoTiHei;
                            line-height: 56px;
                        }
                        .label {
                            display: inline-block;
                            width: 84px;
                            text-align: right;
                            font-size: 12px;
                            color: #fff;
                            vertical-align: middle;
                            margin: 0 20px 0 15px;
                        }
                    }
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
        font-family: 35--Regular;
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
