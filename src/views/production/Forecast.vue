<template>
    <div class="vegetable">
        <bgAnim></bgAnim>
        <OneSizeContainer :width="1920" :height="1080" :maxRatio="2">
            <selfHead title="杨梅产量预测" @back="back"></selfHead>
            <div class="content">
                <div class="left">
                    <div class="leftTop">
                        <selfTitle>病虫害经济损失与受灾面积<span class="tip">（图表可左右拖动查看）</span></selfTitle>
                        <div class="leftTopChart" ref="leftTopChart"></div>
                    </div>
                    <div class="leftMid">
                        <selfTitle>日照时间</selfTitle>
                        <div class="leftMidChart">
                            <div ref="leftMidLeftChart"></div>
                            <div ref="leftMidRightChart"></div>
                        </div>
                    </div>
                    <div class="leftBottom">
                        <selfTitle>降水量分析<span class="tip">（图表可左右拖动查看）</span></selfTitle>
                        <div class="leftBottomChart" ref="leftBottomChart"></div>
                    </div>
                </div>
                <div class="mid">
                    <div class="midTop">
                        <selfTitle>杨梅种植分布监测分析</selfTitle>
                        <div class="midTopChart" ref="midTopChart"></div>

                    </div>
                    <div class="midBom">
                        <selfTitle>近4年杨梅产量趋势分布</selfTitle>
                        <div class="midBomChart" ref="midBomChart"></div>
                    </div>
                </div>
                <div class="right">
                    <div class="rightTop">
                        <selfTitle>杨梅种植比例</selfTitle>
                        <div class="rightTopChart" ref="rightTopChart"></div>
                    </div>
                    <div class="rightMid">
                        <selfTitle>杨梅产量预测因子</selfTitle>
                        <div class="rightMidChart">
                            <div class="rightMidChart-left">
                                <div class="bom-left-bom-left-item">
                                    <div class="bom-left-bom-left-item-num" ref="yield"></div>
                                    <div class="bom-left-bom-left-item-title">预测产量 (吨)</div>
                                </div>
                            </div>
                            <div class="rightMidChart-right">
                                <el-row class="bom-left-bom-right-header">
                                    <el-col :span="11">影响因子</el-col>
                                    <el-col :span="5" style="text-align: left">数值&nbsp;&nbsp;</el-col>
                                </el-row>
                                <vue-seamless-scroll :data="influence" :class-option="classOption"
                                                     class="seamless-warp influence">
                                    <el-row class="bom-left-bom-right-cell" v-for="(item,index) in influence"
                                            :key="index">
                                        <el-col :span="11" class="bom-left-bom-right-cell-title" :title="item.title">
                                            <span>{{ item.title }}</span></el-col>
                                        <el-col :span="6">{{ item.value }}</el-col>
                                    </el-row>
                                </vue-seamless-scroll>
                            </div>
                        </div>
                    </div>

                    <div class="rightBottom">
                        <selfTitle>温度湿度分析<span class="tip">（图表可左右拖动查看）</span></selfTitle>
                        <div class="rightBomChart" ref="rightBomChart"></div>
                    </div>
                </div>
            </div>
        </OneSizeContainer>
    </div>
</template>

<script lang="ts">
import {Component, Mixins, Vue} from "vue-property-decorator";
import selfHead from "../../components/Head/Head.vue"
import bgAnim from '@/components/bgAnim/BgAnim.vue'
import selfTitle from '../vegetable/Title.vue'
import * as echarts from 'echarts';
import map from '../vegetable/map.json'
import {animateValue} from "@/util";
import autoResizeMixin from "@/mixins/echarts/autoResizeMixin"
import * as socketClient from '@/views/socketClient';
import vueSeamlessScroll from "vue-seamless-scroll";
import m from "moment"
import _ from "lodash";

@Component({
    name: "Forecast",
    components: {
        selfHead,
        bgAnim,
        selfTitle,
        vueSeamlessScroll
    },
    mixins: [autoResizeMixin]
})
export default class Forecast extends Mixins(autoResizeMixin) {
    public $refs!: {
        leftTopChart: HTMLDivElement,
        leftMidLeftChart: HTMLDivElement,
        leftMidRightChart: HTMLDivElement,
        leftBottomChart: HTMLDivElement,
        midTopChart: HTMLDivElement,
        midBomChart: HTMLDivElement,
        rightTopChart: HTMLDivElement,
        rightMidChart: HTMLDivElement,
        rightBomChart: HTMLDivElement,
        yield: HTMLSpanElement,
    }

    influence: any[] = []

    currentYear: any = m().format('YYYY')

    timeout: any = null;
    timer0: any = null;
    timer1: any = null;
    timer2: any = null;

    classOption: Object = {
        step: 0.2,
        limitMoveNum: 7
    };


    apiurl: any = {
        leftTop: '/yieldPrediction/listPestLoss',
        leftMid: '/yieldPrediction/sunshineCount',
        leftBottom: '/yieldPrediction/weatherCount',
        midTop: '/yieldPrediction/plantingDistributionCount',
        midBom: '/yieldPrediction/listDistributionTrend',
        rightTop: '/yieldPrediction/plantingPropCount',
        rightMid: '/yieldPrediction/yieldFactorsCount',
    }

    setLeftTopChart(data: any) {
        let myChart = echarts.init(this.$refs.leftTopChart)
        let list: any[] = _.cloneDeep(data)
        let xData: any [] = []
        let barData: any [] = []
        let moneyData: any [] = []
        list.forEach((item: any) => {
            xData.push(item.township)
            barData.push(Number(item.affectedArea) / Number(item.allArea) * 100)
            moneyData.push(Number(item.economicLoss) / 10000)
        })
        let option: any = {
            // 缩放平移组件
            dataZoom: [
                {
                    type: 'inside',  //slider有滑块，inside内置
                    disabled: false,  //是否停止组件功能
                    xAxisIndex: 0,  //x轴,可以用数组表示多个轴
                    zoomLock: true,  //是否锁定区域大小（true,只能平移不能缩放）
                    preventDefaultMouseMove: false,
                    filterMode: "empty",
                    startValue: 0,  //一行有几个（起始数组下标）
                    endValue: 5,    //一行有几个（结束数组下标）
                    start: null,
                    end: null,
                },
            ],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
                backgroundColor: 'rgba(3,3,3,0.5)',
                borderWidth: 0,
                textStyle: {
                    color: '#ffffff',
                    fontSize: '14',
                },
                formatter: (val:any) => {
                    let str: string = ''
                    let unit = ['%','万元']
                    val.forEach((item: any,index:number) => {
                        str += `
                                    ${item.marker}
                                    ${item.seriesName} ：
                                    ${Number(Number(item.value).toFixed(2)).toLocaleString()}${unit[index]}<br>
                               `
                    })

                    return `${val[0].axisValue} <br>`+str
                }
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '5%',
                top: '20%',
                //	padding:'0 0 10 0',
                containLabel: true,
            },
            legend: {
                //图例组件，颜色和名字
                right: 'center',
                top: '3%',
                itemGap: 16,
                itemWidth: 8,
                itemHeight: 8,
                selectedMode: false,
                icon: 'rect',
                data: [{name: '总面积', itemStyle: {color: '#000000'}}, {
                    name: '受灾面积',
                    itemStyle: {color: '#FF4C4C'}
                }, {name: '经济损失', itemStyle: {color: '#E6BB45'}}],
                textStyle: {
                    color: '#a8aab0',
                    fontSize: 12,
                },
            },
            xAxis: [
                {
                    type: 'category',
                    //	boundaryGap: true,//坐标轴两边留白
                    data: xData,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#CCCCCC',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    axisLabel: {
                        //坐标轴刻度标签的相关设置。
                        //		interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
                        //	margin:15,
                        textStyle: {
                            color: '#FFFFFF',
                            fontSize: 14,
                        },
                        // rotate: 50,
                    },
                    axisTick: {
                        //坐标轴刻度相关设置。
                        show: false,
                    },
                    splitLine: {
                        //坐标轴在 grid 区域中的分隔线。
                        show: false,
                    },
                },
            ],
            yAxis: [
                {
                    name: "占比",
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        align: 'right',
                        // fontWeight: 'bold',
                        padding: [0, 5, 0, 0]
                    },
                    max: 100,
                    min: 0,
                    type: 'value',

                    axisLabel: {
                        formatter: function (value: any, index: any) {
                            return value + '%';
                        },
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: 14,
                        },
                    },
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(204, 204, 204, 0.2)',
                            type: "dashed"
                        }
                    },
                },
                {
                    name: "万元",
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        // align: 'center',
                        // fontWeight: 'bold',
                        padding: [0, 0, 0, 45]
                    },
                    min: 0,
                    type: 'value',
                    axisLabel: {
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: 14,
                        },
                    },
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(204, 204, 204, 0.2)',
                            type: "dashed"
                        }
                    },
                },
            ],
            series: [

                {
                    name: '受灾面积',
                    type: 'bar',
                    data: barData,
                    barWidth: 12,
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(0, 0, 0, 0.4)'
                    },
                    // barGap: 0, //柱间距离
                    // barGap: '-100%',
                    zlevel: 1,
                    itemStyle: {
                        normal: {
                            show: true,
                            color: 'rgba(255, 76, 76, 1)',
                            barBorderRadius: [6, 6, 0, 0],
                            borderWidth: 0,
                        },
                    },
                },
                {
                    name: '经济损失',
                    zlevel: 2,
                    type: 'bar',
                    xAxisIndex: 0,
                    yAxisIndex: 1,
                    data: moneyData,
                    barWidth: 12,
                    barGap: 0, //柱间距离
                    itemStyle: {
                        normal: {
                            show: true,
                            color: 'rgba(230, 187, 69, 1)',
                            barBorderRadius: [6, 6, 0, 0],
                            borderWidth: 0,
                        },
                    },
                },
            ],
        };
        myChart.setOption(option);
    }

    getLeftMidChart(data: any) {
        let leftChart = echarts.init(this.$refs.leftMidLeftChart);
        let rightChart = echarts.init(this.$refs.leftMidRightChart);
        let res: any = _.cloneDeep(data)
        let day = m(new Date()).subtract(1, 'months').daysInMonth()
        // console.log(res)
        let titleList: string [] = ['月日照总时长', '日均日照时长']

        const option: any = {
            title: [{
                text: titleList[0],
                textStyle: {
                    color: '#fff',
                    fontSize: 16
                },
                left: 'center',
                bottom: '3%'
            }],
            angleAxis: {
                polarIndex: 0,
                min: 0,
                max: 100,
                show: false,
                boundaryGap: ['100%', '100%'],
                startAngle: 90,
            },
            radiusAxis: {
                type: 'category',
                show: true,
                axisLabel: {
                    show: false,
                },
                axisLine: {
                    show: false,

                },
                axisTick: {
                    show: false
                },
            },
            polar: [{
                center: ['50%', '50%'], //中心点位置
                radius: '120%' //图形大小
            }],
            xAxis: [],
            yAxis: [],
            series: [

                {
                    type: 'bar',
                    z: 10,
                    name: "完成度",
                    data: [res.sunshineLastMonth],
                    showBackground: false,
                    backgroundStyle: {
                        borderWidth: 10,
                        width: 10
                    },
                    coordinateSystem: 'polar',
                    roundCap: true,
                    barWidth: 24, //大的占比环
                    itemStyle: {
                        normal: {
                            opacity: 1,
                            color: "rgba(252, 146, 76, 1)"
                        }
                    },
                },
                {
                    type: 'pie',
                    name: '内层细圆环',
                    radius: ['45%', '75%'],
                    center: ['50%', '50%'], //中心点位置
                    startAngle: 90,
                    hoverAnimation: false,
                    clockWise: true,
                    silent: true,
                    itemStyle: {
                        normal: {
                            color: 'rgba(252, 146, 76, 0.2)',
                            shadowBlur: 0,
                            shadowColor: '#66666a',
                        }
                    },
                    tooltip: {
                        show: false,
                        backgroundColor: 'rgba(3,3,3,0.5)',
                        borderWidth: 0,
                        textStyle: {
                            color: '#ffffff',
                            fontSize: '14',
                        },
                    },
                    label: {
                        show: true,
                        position: 'center',
                        color: '#fff',
                        fontFamily: 'YouSheBiaoTiHei',
                        fontSize: 30,
                        formatter: (val: any) => {
                            // console.log(val);
                            return res.sunshineLastMonth + 'h'
                        }
                    },
                    data: [day * 24]
                }
            ]
        };
        const options: any = {
            title: [{
                text: titleList[1],
                textStyle: {
                    color: '#fff',
                    fontSize: 16
                },
                left: 'center',
                bottom: '3%'
            }],
            grid: [{
                // top: '10%',
                // width: '50%',
                // left: '45%',
                // containLabel: true
            }],
            angleAxis: {
                polarIndex: 0,
                min: 0,
                max: 100,
                show: false,
                boundaryGap: ['100%', '100%'],
                startAngle: 90,
            },
            radiusAxis: {
                type: 'category',
                show: true,
                axisLabel: {
                    show: false,
                },
                axisLine: {
                    show: false,

                },
                axisTick: {
                    show: false
                },
            },
            polar: [{
                center: ['50%', '50%'], //中心点位置
                radius: '120%' //图形大小
            }],
            xAxis: [],
            yAxis: [],
            series: [

                {
                    type: 'bar',
                    z: 10,
                    name: "完成度",
                    data: [res.sunshineYesterday == undefined?0:res.sunshineYesterday],
                    showBackground: false,
                    backgroundStyle: {
                        borderWidth: 10,
                        width: 10
                    },
                    coordinateSystem: 'polar',
                    roundCap: true,
                    barWidth: 24, //大的占比环
                    itemStyle: {
                        normal: {
                            opacity: 1,
                            color: "rgba(252, 146, 76, 1)"
                        }
                    },
                },
                {
                    type: 'pie',
                    name: '内层细圆环',
                    radius: ['45%', '75%'],
                    center: ['50%', '50%'], //中心点位置
                    startAngle: 90,
                    hoverAnimation: false,
                    clockWise: true,
                    silent: true,
                    itemStyle: {
                        normal: {
                            color: 'rgba(252, 146, 76, 0.2)',
                            shadowBlur: 0,
                            shadowColor: '#66666a',
                        }
                    },
                    tooltip: {
                        show: false,
                        backgroundColor: 'rgba(3,3,3,0.5)',
                        borderWidth: 0,
                        textStyle: {
                            color: '#ffffff',
                            fontSize: '14',
                        },
                    },
                    label: {
                        show: true,
                        position: 'center',
                        color: '#fff',
                        fontFamily: 'YouSheBiaoTiHei',
                        fontSize: 30,
                        formatter: (val: any) => {
                            // console.log(val);
                            return res.sunshineYesterday == undefined?0+ 'h':res.sunshineYesterday + 'h'
                        }
                    },
                    data: [24]
                }
            ]
        };
        leftChart.setOption(option);
        rightChart.setOption(options);
    }

    getLeftBottomChart(data: any) {
        let myChart = echarts.init(this.$refs.leftBottomChart);
        let list: any[] = _.cloneDeep(data)
        let xData: any[] = []
        let barData: any[] = []
        let arr: any[] = list.sort((a: any, b: any) => {
            return a.month - b.month
        })
        arr.forEach((item: any) => {
            xData.push(item.month + '月')
            barData.push(item.avgPrecipitation)
        })
        const option: any = {
            dataZoom: [
                {
                    type: 'inside',  //slider有滑块，inside内置
                    disabled: false,  //是否停止组件功能
                    xAxisIndex: 0,  //x轴,可以用数组表示多个轴
                    zoomLock: true,  //是否锁定区域大小（true,只能平移不能缩放）
                    preventDefaultMouseMove: false,
                    filterMode: "empty",
                    startValue: 0,  //一行有几个（起始数组下标）
                    endValue: 5,    //一行有几个（结束数组下标）
                    start: null,
                    end: null,
                },
            ],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
                backgroundColor: 'rgba(3,3,3,0.5)',
                borderWidth: 0,
                textStyle: {
                    color: '#ffffff',
                    fontSize: '14',
                },
                formatter: (val:any) => {
                    let str: string = ''
                    let unit = ['%','万元']
                    // console.log(val)
                    val.forEach((item: any,index:number) => {
                        str += `
                                  <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#FCCD4C;"></span>
                                    降水量 ：
                                    ${Number(item.value)}mm<br>
                               `
                    })

                    return `${val[0].axisValue} <br>`+str
                }
            },
            grid: {
                left: '12%',
                top: '10%',
                bottom: '12%',
                right: '8%',
            },
            xAxis: {
                data: xData,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#CCCCCC',
                        width: 1,
                        type: 'solid'
                    }
                },
                axisLabel: {
                    //坐标轴刻度标签的相关设置。
                    //		interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
                    //	margin:15,
                    textStyle: {
                        color: '#FFFFFF',
                        fontSize: 14,
                    },
                    // rotate: 50,
                },
                axisTick: {
                    //坐标轴刻度相关设置。
                    show: false,
                },
                splitLine: {
                    //坐标轴在 grid 区域中的分隔线。
                    show: false,
                },
            },
            yAxis: [
                {
                    axisLabel: {
                        //坐标轴刻度标签的相关设置。
                        //		interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
                        //	margin:15,
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: 14,
                        },
                        // rotate: 50,
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(204, 204, 204, 0.2)',
                            type: "dashed"
                        }
                    },
                },
            ],
            series: [
                {
                    type: 'pictorialBar',
                    barCategoryGap: '0%',
                    symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                    label: {
                        show: true,
                        position: 'top',
                        distance: 5,
                        color: '#FCCD4C',
                        fontWeight: 'bolder',
                        fontFamily: 'YouSheBiaoTiHei',
                        fontSize: 15,
                    },
                    itemStyle: {
                        normal: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: 'rgba(252, 205, 76, 0.8)',
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgba(252, 205, 76, 0.3)',
                                    },
                                ],
                                global: false, //  缺省为  false
                            },
                        },
                        emphasis: {
                            opacity: 1,
                        },
                    },
                    data: barData,
                },
            ],
        };
        myChart.setOption(option);
    }

    getMap(data: any) {
        let myChart = echarts.init(this.$refs.midTopChart);

        echarts.registerMap("map", map);
        let arr: any[] = []
        let list: any[] = _.cloneDeep(data)
        list.forEach((item: any) => {
            arr.push({name: item.township, ...item})
        });
        const option: any = {
            tooltip: {
                backgroundColor: 'rgba(3,3,3,0)',
                borderWidth: 0,
                formatter: (value: any) => {
                    let res = ``
                    let color = '#CC5252'
                    if (value.data) {
                        res = `<div style='width:220px;height:200px;background-color:rgba(255, 255, 255, 0.6);margin:-10px;border-radius:5px;'>
                        <div style='display:flex;justify-content:space-between;width:100%;height:30px;background-color:${color};border-radius:5px 5px 0 0;padding:5px 10px;font-size:14px;'>
                            <span style="color: #FFFFFF">${value.name}</span>

                        </div>
                        <ul style="color:#525866;margin:10px 0;font-size:12px;width: 100%">
                            <li style="margin-bottom:10px;width: 100%;">
                                <span style="display:inline-block;width: 100%">
                                    <span style="width:50%;text-align: right;display: inline-block">种植基地数量：</span>
                                    <span style="width:50%;display: inline-block;">${value.data.baseCount || '-'}个</span>
                                </span>
                            </li>
                            <li style="margin-bottom:10px;width: 100%">
                                <span style="display:inline-block;width: 100%">
                                    <span style="width:50%;text-align: right;display: inline-block">种植面积：</span>
                                    <span style="width:50%;display: inline-block;">${value.data.plantAreaCount || '-'}亩</span>
                                </span>
                            </li>
                            <li style="margin-bottom:10px;width: 100%">
                                <span style="display:inline-block;width: 100%">
                                    <span style="width:50%;text-align: right;display: inline-block">杨梅产量：</span>
                                    <span style="width:50%;display: inline-block;">${value.data.yieldCount || '-'}吨</span>
                                </span>
                            </li>
                            <li style="margin-bottom:10px;width: 100%">
                                <span style="display:inline-block;width: 100%">
                                    <span style="width:50%;text-align: right;display: inline-block">经度：</span>
                                    <span style="width:50%;display: inline-block;">${value.data.longitude || '-'}</span>
                                </span>
                            </li>
                            <li style="margin-bottom:10px;width: 100%">
                                <span style="display:inline-block;width: 100%">
                                    <span style="width:50%;text-align: right;display: inline-block">纬度：</span>
                                    <span style="width:50%;display: inline-block;">${value.data.latitude || '-'}</span>
                                </span>
                            </li>
                        </ul>
                    </div>`
                        // }
                        return res
                    }
                }
            },
            series: [
                {
                    type: "map",
                    selectedMode: false,
                    mapType: "map", // 自定义扩展图表类型
                    zoom: 1.2,
                    label: {
                        show: false,
                        emphasis: {
                            show: true,  //开启悬浮事件
                        }
                    },

                    data: arr,
                    itemStyle: {
                        normal: {
                            borderColor: 'rgba(230, 92, 92, 1)',//区域边框颜色
                            areaColor: "rgba(230, 92, 92, 0.2)",//区域颜色
                        },
                        emphasis: {
                            borderColor: 'rgba(230, 92, 92, 1)',
                            areaColor: "rgba(230, 92, 92, 1)"
                        },
                    },
                },
            ],
        };
        myChart.setOption(option);
        clearInterval(this.timer2)
        this.timer2 = null
        let len = 0
        if(!this.timer2){
            this.timer2 = setInterval(() => {
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
            clearInterval(this.timer2)
            this.timer2 = null
        });
        myChart.on('mouseout', (params: any) => {
            if(!this.timer2){
                this.timer2 = setInterval(() => {
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

    getMidBomChart(data: any) {
        let myChart = echarts.init(this.$refs.midBomChart);
        let list: any[] = _.cloneDeep(data)
        let arr: any[] = []
        let nameList: any[] = []
        let yearList:any[] = []
        //获取所有数据年份
        list.forEach((item: any) => {
            yearList.push(item.year)
            nameList.push(item.township)
        })
        yearList = Array.from(new Set(yearList));
        nameList = Array.from(new Set(nameList));
        let obj:any = {}
        nameList.forEach((item:any) => {
            obj[item] = []
        })

        list.forEach((item:any) => {
            for (const key in obj) {
                if(item.township == key){
                    obj[key].push(item)
                }
            }

        })
        let xData:any[] = []
        for (const key in obj) {
            xData.push(key)

        }
        let dataArr:any[] = []
        yearList.forEach((item:any) => {
            let dataList:any = []
            for (const key in obj) {
                obj[key].forEach((items:any) => {
                    if(items.year == item){
                        dataList.push(items.production)
                    }
                })
            }
            dataArr.push(dataList)
        })
        // console.log(xData)
        // console.log(dataArr)
        let seriesData:any[] = []
        let colorList = ['#E45B5B','#FC924C','#E6BB45','#85CC3D']
        dataArr.forEach((item:any,i:number) => {
            if(i==0){
                seriesData.push(
                    {
                        name: yearList[i]+'年',
                        type: 'bar',
                        barWidth: 14,
                        itemStyle: {
                            barBorderRadius: 20,
                            color: colorList[i]
                        },
                        data: item
                    },
                    {  // 替代柱状图 默认不显示颜色，是最下方柱图（邮件营销）的value值 - 20
                        type: 'bar',
                        barWidth: 14,
                        barGap: '-100%',
                        stack: '广告',
                        itemStyle: {
                            color: 'transparent'
                        },
                        data: item
                    }
                    )
            }else {
                seriesData.push(
                    {
                        name: yearList[i]+'年',
                        type: 'bar',
                        barWidth: 14,
                        barGap: '-100%',
                        stack: '广告',
                        itemStyle: {
                            barBorderRadius: 20,
                            color: colorList[i]
                        },
                        data: item
                    },
                )
            }
        })
        const option: any = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                backgroundColor: 'rgba(3,3,3,0.5)',
                borderWidth: 0,
                textStyle: {
                    color: '#ffffff',
                    fontSize: '14',
                },
                formatter: (val:any) => {
                    let str: string = ''

                    val.forEach((item: any,index:number) => {
                        if(index == 1){
                            return false
                        }
                        str += `
                                    ${item.marker}
                                    ${item.seriesName} ：
                                    ${Number(Number(item.value).toFixed(2)).toLocaleString()}吨<br>
                               `
                    })

                    return `${val[0].axisValue} <br>`+str
                }
            },
            legend: {
                // data:['2018年','2018年','2019年','2020年'],
                textStyle: {
                    color: '#fff'
                },
                itemWidth: 8,
                itemHeight: 8,
                top: '5%'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '5%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: xData,
                    axisLabel: {
                        //坐标轴刻度标签的相关设置。
                        //		interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
                        //	margin:15,
                        textStyle: {
                            color: '#FFFFFF',
                            fontSize: 14,
                        },
                        // rotate: 50,
                    },
                    axisTick: {
                        //坐标轴刻度相关设置。
                        show: false,
                    },
                    splitLine: {
                        //坐标轴在 grid 区域中的分隔线。
                        show: false,
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#CCCCCC',
                            width: 1,
                            type: 'solid'
                        }
                    },
                }
            ],
            yAxis: [
                {
                    name: '吨',
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        padding: [0, 30, 0, 0]
                    },
                    type: 'value',
                    axisLabel: {
                        //坐标轴刻度标签的相关设置。
                        //		interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
                        //	margin:15,
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: 14,
                        },
                        // rotate: 50,
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        show: false,
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(204, 204, 204, 0.2)',
                            type: "dashed"
                        }
                    },
                }
            ],
            series: seriesData
        };
        myChart.setOption(option);
        clearInterval(this.timer1)
        let len = 0
        this.timer1 = setInterval(() => {
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
        }, 1500)
    }


    getRightTopChart(data: any) {
        let myChart = echarts.init(this.$refs.rightTopChart);
        let res: any = _.cloneDeep(data)
        let pieData: any[] = [
            // {
            //     name: '耕地面积'
            // },
            {
                name: '杨梅种植面积'
            },
        ];

        let titleArr: any = [],
            seriesArr: any = [];

        pieData.forEach((item, index) => {
            titleArr.push({
                text: item.name,
                bottom: '5%',
                left: index == 0 ? index * 35 + 40 + '%' : index * 35 + 27 + '%',
                textStyle: {
                    color: '#fff',
                    fontSize: 14
                }
            })
            seriesArr.push(
                {
                    name: item.name,
                    type: 'pie',
                    clockWise: false,
                    radius: ['45%', '65%'],
                    startAngle: 90,
                    itemStyle: {
                        normal: {
                            color: '#FC924C',
                            label: {
                                show: false,
                            },
                            labelLine: {
                                show: false,
                            },
                        },
                    },
                    hoverAnimation: false,
                    center: [index * 48 + 50 + '%', '45%'],
                    data: [

                        {
                            value: res.plantAreaUseCount,
                            name: '杨梅种植面积',
                            label: {
                                normal: {
                                    formatter: function (params: any) {
                                        // console.log(params)
                                        return params.name + '\n' + params.percent + `%\n${params.value}亩`;
                                    },
                                    position: 'inside',
                                    show: true,
                                    textStyle: {
                                        fontSize: '24',
                                        fontFamily: 'YouSheBiaoTiHei',
                                        color: '#fff',
                                    },
                                },
                            },
                        },
                        {
                            value:  (res.plantAreaCount - res.plantAreaUseCount),
                            name: '其他种植面积',
                            itemStyle: {
                                normal: {
                                    color: 'rgba(0, 0, 0, 0.4)',
                                },

                            },
                            label: {
                                normal: {
                                    formatter: function (params: any) {
                                        // console.log(params)
                                        return params.name + '\n' + params.percent + `%\n${params.value}亩`;
                                    },
                                    position: 'inside',
                                    show: true,
                                    textStyle: {
                                        fontSize: '24',
                                        fontFamily: 'YouSheBiaoTiHei',
                                        color: '#fff',
                                    },
                                },
                            },
                        },
                    ],
                },
            )
        });


        const option: any = {
            title: titleArr,
            grid: {
                left: '5%',
                right: '2%',
                bottom: '0%',
                top: '0%',
                containLabel: false,
            },
            series: seriesArr,
        };
        myChart.setOption(option);
    }

    getRightBomChart(data: any) {
        let myChart = echarts.init(this.$refs.rightBomChart);
        let list: any[] = _.cloneDeep(data)
        let xData: any[] = []
        let HumidityData: any[] = []
        let TemperatureData: any[] = []
        let arr: any[] = list.sort((a: any, b: any) => {
            return a.month - b.month
        })
        arr.forEach((item: any) => {
            xData.push(item.month + '月')
            HumidityData.push(item.avgHumidity)
            TemperatureData.push(item.avgTemperature)
        })
        let option: any = {
            dataZoom: [
                {
                    type: 'inside',  //slider有滑块，inside内置
                    disabled: false,  //是否停止组件功能
                    xAxisIndex: 0,  //x轴,可以用数组表示多个轴
                    zoomLock: true,  //是否锁定区域大小（true,只能平移不能缩放）
                    preventDefaultMouseMove: false,
                    filterMode: "empty",
                    startValue: 0,  //一行有几个（起始数组下标）
                    endValue: 5,    //一行有几个（结束数组下标）
                    start: null,
                    end: null,
                },
            ],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
                backgroundColor: 'rgba(3,3,3,0.5)',
                borderWidth: 0,
                textStyle: {
                    color: '#ffffff',
                    fontSize: '14',
                },
                formatter: (val:any) => {
                    let str: string = ''
                    let unit = ['%','℃']
                    val.forEach((item: any,index:number) => {
                        str += `
                                    ${item.marker}
                                    ${item.seriesName} ：
                                    ${Number(Number(item.value).toFixed(2)).toLocaleString()}${unit[index]}<br>
                               `
                    })

                    return `${val[0].axisValue} <br>`+str
                }
            },
            legend: {
                // data:['2018年','2018年','2019年','2020年'],
                textStyle: {
                    color: '#fff'
                },
                itemWidth: 8,
                itemHeight: 8,
                top: '5%',
                icon:'rect'
            },
            grid: {
                top: '20%',
                left: '15%',
                right: '15%',
                bottom: '15%',
                containLabel: false
            },

            xAxis: {
                data: xData,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#CCCCCC',
                        width: 1,
                        type: 'solid'
                    }
                },
                axisLabel: {
                    //坐标轴刻度标签的相关设置。
                    //		interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
                    //	margin:15,
                    textStyle: {
                        color: '#FFFFFF',
                        fontSize: 14,
                    },
                    // rotate: 50,
                },
                axisTick: {
                    //坐标轴刻度相关设置。
                    show: false,
                },
                splitLine: {
                    //坐标轴在 grid 区域中的分隔线。
                    show: false,
                },
            },

            yAxis: [
                {
                    type: 'value',
                    name: '湿度',
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontWeight: 'bold',
                        padding: [0, 40, 0, 0]
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(204, 204, 204, 0.2)',
                            type: "dashed"
                        }
                    },
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: true,
                        margin: 10,
                        textStyle: {
                            color: '#d1e6eb',
                        },
                        formatter: function (value: any, index: any) {
                            return value + '%';
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                },
                {
                    type: 'value',
                    name: '温度',
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontWeight: 'bold',
                        padding: [0, 0, 0, 45]
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(204, 204, 204, 0.2)',
                            type: "dashed"
                        }
                    },
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: true,
                        margin: 10,
                        textStyle: {
                            color: '#d1e6eb',
                        },
                        formatter: function (value: any, index: any) {
                            return value + '℃';
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                }
            ],
            series: [
                {
                    name: '月均湿度',
                    type: 'line',
                    showAllSymbol: true,
                    symbol: 'circle',
                    symbolSize: 12,
                    yAxisIndex: 0,
                    lineStyle: {
                        normal: {
                            color: "#E65C5C",
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 0,
                            shadowOffsetY: 5,
                            shadowOffsetX: 5,
                        },
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: function (value: any, index: any) {
                            return value.value + '%';
                        },
                        textStyle: {
                            color: '#E65C5C',
                            fontFamily: 'YouSheBiaoTiHei'
                        }
                    },

                    itemStyle: {
                        color: "#E65C5C",
                        borderColor: "#fff",
                        borderWidth: 2,
                        shadowColor: 'rgba(0, 0, 0, .3)',
                        shadowBlur: 0,
                        shadowOffsetY: 2,
                        shadowOffsetX: 2,
                    },

                    data: HumidityData,
                },
                {
                    type: 'line',
                    name: '月均温度',
                    showAllSymbol: true,
                    yAxisIndex: 1,
                    symbol: 'circle',
                    symbolSize: 12,
                    lineStyle: {
                        normal: {
                            color: "#FCCD4C",
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 0,
                            shadowOffsetY: 5,
                            shadowOffsetX: 5,
                        },
                    },
                    label: {
                        show: true,
                        position: 'top',
                        formatter: function (value: any, index: any) {
                            return value.value + '℃';
                        },
                        textStyle: {
                            color: '#FCCD4C',
                            fontFamily: 'YouSheBiaoTiHei'
                        }
                    },

                    itemStyle: {
                        color: "#FCCD4C",
                        borderColor: "#fff",
                        borderWidth: 2,
                        shadowColor: 'rgba(0, 0, 0, .3)',
                        shadowBlur: 0,
                        shadowOffsetY: 2,
                        shadowOffsetX: 2,
                    },

                    data: TemperatureData,
                },

            ]
        };
        myChart.setOption(option);
    }


    back() {
        this.$router.push('/production')
    }

    getData(res: any) {
        // console.log(res)
        if (res.key == this.apiurl.leftTop) {
            this.setLeftTopChart(res.data)
        } else if (res.key == this.apiurl.leftMid) {
            this.getLeftMidChart(res.data)
        } else if (res.key == this.apiurl.leftBottom) {
            let list = _.cloneDeep(res.data)
            this.getLeftBottomChart(res.data)
            this.getRightBomChart(res.data)
        } else if (res.key == this.apiurl.midTop) {
            // console.log(res.data)
            this.getMap(res.data)
        } else if (res.key == this.apiurl.midBom) {
            // console.log(res.data);
            this.getMidBomChart(res.data)
        } else if (res.key == this.apiurl.rightTop) {
            // console.log(res.data)
            this.getRightTopChart(res.data)
        } else if (res.key == this.apiurl.rightMid) {
            let arrData: any = _.cloneDeep(res.data)
            animateValue(this.$refs.yield, arrData.yieldCount, 1000)
            this.influence = [
                {

                    title: '年度杨梅总种植面积',
                    value: arrData.plantAreaCount.toLocaleString() + '亩'
                },
                {

                    title: '年度杨梅长势判断',
                    value: arrData.growth
                },
                {

                    title: '3月降水量',
                    value: arrData.precipitation3 + 'mm'
                },
                {
                    title: '4月降水量',
                    value: arrData.precipitation4 + 'mm'
                },
                {

                    title: '5月降水量',
                    value: arrData.precipitation5 + 'mm'
                },
                {
                    title: '6月降水量',
                    value: arrData.precipitation6 + 'mm'
                },
                // {
                //     title: '7月干旱天数',
                //     value: arrData.droughtDays7 + '天'
                // },
                // {
                //     title: '8月干旱天数',
                //     value: arrData.droughtDays8 + '天'
                // },
                // {
                //     title: '9月干旱天数',
                //     value: arrData.droughtDays9 + '天'
                // },
                {
                    title: '4月低湿天数',
                    value: arrData.lowHumidity + '天'
                },
                {
                    title: '冬季低温天',
                    value: arrData.lowTemperature + '天'
                },
                {
                    title: '年度病虫害发生情况',
                    value: arrData.pestLevel
                },
                // {
                //     title: '历年杨梅年产量',
                //     value: arrData.formerYearYieldCount.toLocaleString() + '吨'
                // }
            ]
        }
    }

    getParams(params?: any) {
        //拼接查询条件
        return () => {
            return params
        }
    }

    queryData() {
        for (const key in this.apiurl) {
            let params: any = {}
            let Last_month = new Date().getMonth();
            Last_month = ((Last_month == 0) ? (12) : (Last_month));
            params = {type: '杨梅', year: this.currentYear, month: Last_month, day: new Date().getDate()}
            socketClient.addCallBack(this.apiurl[key], this.getData);
            socketClient.addSend(this.apiurl[key], this.getParams(params));
        }
        setTimeout(() => {
            socketClient.sendAll()
        }, 500);
    }

    mounted() {
        this.queryData()
        let day = m(new Date()).subtract(1, 'months').daysInMonth()
    }

    beforeDestroy() {
        clearInterval(this.timer0)
        clearInterval(this.timer1)
        for (const key in this.apiurl) {
            socketClient.delCallBack(this.apiurl[key]);
            socketClient.delSend(this.apiurl[key]);
        }
    }
}
</script>

<style scoped lang="scss">
.vegetable {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: url('./images/forecastbg.jpg');
    background-size: cover;
    padding-bottom: 110px;

    .content {
        position: relative;
        z-index: 999;
        display: flex;

        overflow: hidden;
        width: 100%;
        padding: 0 35px;
        //padding-top: 120px;

        .tip {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.5);
        }

        .left {
            width: 440px;

            .leftTop {
                width: 440px;
                height: 300px;
                margin-bottom: 20px;

                .leftTopChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, .2);

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
                    display: flex;

                    div {
                        width: 50%;
                        height: 100%;
                    }
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
            }

            .midBom {
                width: 100%;
                height: 300px;
                margin-bottom: 20px;

                .midBomChart {
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
                height: 300px;
                margin-bottom: 20px;

                .rightTopChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, .2);
                }
            }

            .rightMid {
                width: 440px;
                height: 300px;
                margin-bottom: 20px;

                .rightMidChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, .2);
                    padding: 20px 0;
                    display: flex;

                    .rightMidChart-left {
                        width: 180px;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        padding-left: 20px;

                        .bom-left-bom-left-item {
                            width: 140px;
                            height: 140px;
                            background: rgba(0, 0, 0, 0.3);
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex-direction: column;

                            .bom-left-bom-left-item-title {
                                font-size: 14px;
                                font-weight: bold;
                                color: #FFFFFF;
                            }

                            .bom-left-bom-left-item-num {
                                font-size: 36px;
                                font-family: YouSheBiaoTiHei;
                                color: #F6BD16;
                            }
                        }
                    }

                    .rightMidChart-right {
                        width: 240px;
                        height: 100%;

                        .bom-left-bom-right-header {
                            display: flex;
                            align-items: center;
                            justify-content: space-evenly;
                            width: 100%;
                            height: 40px;
                            background: rgba(0, 0, 0, 0.3);
                            border-radius: 20px;

                            .el-col {
                                margin-left: -15px;
                            }

                            div {
                                width: 50%;
                                //text-align: left;
                                display: flex;
                                justify-content: center;
                                font-size: 16px;
                                font-weight: bold;
                                color: #F6BD16;
                                line-height: 36px;
                                text-shadow: 0px 0px 20px #F6BD16;
                                //padding-left: 50px;
                            }
                        }

                        .bom-left-bom-right-cell {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            font-size: 14px;
                            font-weight: 400;
                            color: #FFFFFF;
                            line-height: 30px;

                            div {
                                //width: 50%;

                                //text-align: left;
                                //padding-left: 50px;
                            }

                            .bom-left-bom-right-cell-title {
                                height: 100%;

                                span {
                                    display: inline-block;
                                    vertical-align: middle;
                                    width: 100px;
                                    height: 100%;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }

                                white-space: nowrap !important;
                            }
                        }
                    }
                }
            }

            .rightBottom {
                width: 440px;
                height: 300px;
                margin-bottom: 20px;

                .rightBomChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, .2);
                }
            }
        }
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
