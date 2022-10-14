<template>
    <div class="vegetable">

        <bgAnim></bgAnim>
        <OneSizeContainer :width="1920" :height="1080" :maxRatio="2">
            <selfHead title="高山大米病虫害预警" @back="back"></selfHead>
            <div class="content">
                <div class="left">
                    <div class="leftTop">
                        <selfTitle>上1年病虫害上报记录</selfTitle>
                        <div class="leftTopChart">
                            <el-row class="leftTopChart-header">
                                <el-col :span="3">发生年月</el-col>
                                <el-col :span="3">乡镇</el-col>
                                <el-col :span="3">极端天气</el-col>
                                <el-col :span="4">病虫害类型</el-col>
                                <el-col :span="4">病虫害等级</el-col>
                                <el-col :span="3">受灾面积</el-col>
                                <el-col :span="4">经济损失</el-col>
                            </el-row>
                            <vue-seamless-scroll :data="lastRecord" :class-option="classOption"
                                                 class="seamless-warp influence">
                                <el-row class="leftTopChart-cell" v-for="(item,index) in lastRecord"
                                        :key="index">
                                    <el-col :span="3">{{
                                            item.year
                                        }}-{{ item.month >= 10 ? item.month : '0' + item.month }}
                                    </el-col>
                                    <el-col :span="3">{{ item.township }}</el-col>
                                    <el-col :span="3">{{ item.extremeNum }}天</el-col>
                                    <el-col :span="4">{{ item.pestType }}</el-col>
                                    <el-col :span="4"
                                            :class="{'light':item.pestLevel == '轻度','heavy':item.pestLevel == '重度'}">
                                        {{ item.pestLevel }}
                                    </el-col>
                                    <el-col :span="3">{{ item.affectedArea.toLocaleString() }}亩</el-col>
                                    <el-col :span="4">{{ Number(Number(item.economicLoss) / 10000).toLocaleString() }}万元</el-col>
                                </el-row>
                            </vue-seamless-scroll>
                        </div>
                    </div>

                    <div class="leftBottom">
                        <selfTitle>上1年病虫害地区分布<span class="tip">（图表可左右拖动查看）</span></selfTitle>
                        <div class="leftBottomChart" ref="leftBottomChart"></div>
                    </div>
                </div>
                <div class="mid">
                    <div class="midTop">
                        <selfTitle>上1年病虫害等级分布</selfTitle>
                        <div class="midTopChart" ref="midTopChart"></div>
                    </div>
                    <div class="midMid">
                        <selfTitle>上1年病虫害月度分布<span class="tip">（图表可左右拖动查看）</span></selfTitle>
                        <div class="midMidChart" ref="midMidChart"></div>
                    </div>
                    <div class="midBom">
                        <selfTitle>上1年病虫害类型分布</selfTitle>
                        <div class="midBomChart">
                            <div class="midBomChart-left">
                                <div class="midBomChart-title">{{
                                        typeList.length > 0 ? typeList[0].pestType : ''
                                    }}
                                </div>
                                <div class="midBomChartLeft" ref="midBomChartLeft"></div>
                                <div class="midBomChartRight" ref="midBomChartRight"></div>
                            </div>
                            <div class="midBomChart-left">
                                <div class="midBomChart-title">{{
                                        typeList.length > 1 ? typeList[1].pestType : ''
                                    }}
                                </div>
                                <div class="midBomChartLeft" ref="midBomChartLeftRight"></div>
                                <div class="midBomChartRight" ref="midBomChartRightRight"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="rightTop">
                        <selfTitle>当年病虫害统计</selfTitle>
                        <div class="rightTopChart">
                            <div class="rightTopChart-top">
                                <div class="rightTopChart-top-box" v-for="(item,index) in pestSum" :key="index">
                                    <img class="rightTopChart-top-box-icon" :src="item.icon" alt="">
                                    <div class="rightTopChart-top-box-num" ref="num"></div>
                                    <div class="rightTopChart-top-box-title">{{ item.title }}</div>
                                </div>
                            </div>
                            <div class="rightTopChart-bom">
                                <el-row class="rightTopChart-header">
                                    <el-col :span="3">发生年月</el-col>
                                    <el-col :span="3">乡镇</el-col>
                                    <el-col :span="3">极端天气</el-col>
                                    <el-col :span="4">病虫害类型</el-col>
                                    <el-col :span="4">病虫害等级</el-col>
                                    <el-col :span="3">受灾面积</el-col>
                                    <el-col :span="4">经济损失</el-col>
                                </el-row>
                                <vue-seamless-scroll :data="currentRecord" :class-option="classOption1"
                                                     class="seamless-warp influence">
                                    <el-row class="rightTopChart-cell" v-for="(item,index) in currentRecord"
                                            :key="index">
                                        <el-col :span="3">{{
                                                item.year
                                            }}-{{ item.month >= 10 ? item.month : '0' + item.month }}
                                        </el-col>
                                        <el-col :span="3">{{ item.township }}</el-col>
                                        <el-col :span="3">{{ item.extremeNum }}天</el-col>
                                        <el-col :span="4">{{ item.pestType }}</el-col>
                                        <el-col :span="4"
                                                :class="{'light':item.pestLevel == '轻度','heavy':item.pestLevel == '重度'}">
                                            {{ item.pestLevel }}
                                        </el-col>
                                        <el-col :span="3">{{ item.affectedArea.toLocaleString() }}亩</el-col>
                                        <el-col :span="4">{{ Number(Number(item.economicLoss) / 10000).toLocaleString() }}万元</el-col>
                                    </el-row>
                                </vue-seamless-scroll>
                            </div>
                        </div>
                    </div>
                    <div class="rightBottom">
                        <selfTitle>当年病虫害预警</selfTitle>
                        <div class="rightBomChart">
                            <el-row class="rightBomChart-header">
                                <el-col :span="5">病害类型</el-col>
                                <el-col :span="5">病害等级</el-col>
                                <el-col :span="5">发生月份</el-col>
                                <el-col :span="6">发生乡镇</el-col>
                                <el-col :span="3">发生概率</el-col>

                            </el-row>
                            <vue-seamless-scroll :data="warnList" :class-option="classOption"
                                                 class="seamless-warp influence">
                                <el-row class="rightBomChart-cell" :class="{'warn':item.occurrence >= 50}"
                                        v-for="(item,index) in warnList"
                                        :key="index">
                                    <el-col :span="5">{{ item.pestType }}</el-col>
                                    <el-col :span="5"
                                            :class="{'light':item.pestLevel == '轻度','heavy':item.pestLevel == '重度'}">
                                        {{ item.pestLevel }}
                                    </el-col>
                                    <el-col :span="5">
                                        {{ item.year }}-{{ item.month >= 10 ? item.month : '0' + item.month }}
                                    </el-col>
                                    <el-col :span="6">{{ item.township }}</el-col>
                                    <el-col :span="3">{{ item.occurrence }}%</el-col>
                                </el-row>
                            </vue-seamless-scroll>
                        </div>
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
import {animateValue} from "@/util";
import autoResizeMixin from "@/mixins/echarts/autoResizeMixin"
import * as socketClient from '@/views/socketClient';
import vueSeamlessScroll from "vue-seamless-scroll";
import m from "moment"
import _ from "lodash";

@Component({
    name: "Pests",
    components: {
        selfHead,
        bgAnim,
        selfTitle,
        vueSeamlessScroll
    },
    mixins: [autoResizeMixin]
})
export default class Pests extends Mixins(autoResizeMixin) {
    public $refs!: {
        leftTopChart: HTMLDivElement,
        leftBottomChart: HTMLDivElement,
        midTopChart: HTMLDivElement,
        midMidChart: HTMLDivElement,
        midBomChartLeft: HTMLDivElement,
        midBomChartRight: HTMLDivElement,
        midBomChartLeftRight: HTMLDivElement,
        midBomChartRightRight: HTMLDivElement,
        rightTopChart: HTMLDivElement,
        rightBomChart: HTMLDivElement,
        yield: HTMLSpanElement,
        num: any,
    }

    pestSum: any [] = [{
        title: '病虫害事件总数(起)',
        icon: require("./images/pestsIcon1.png")
    }, {
        title: '总受灾面积(亩)',
        icon: require("./images/pestsIcon2.png")
    }, {
        title: '总经济损失(万元)',
        icon: require("./images/pestsIcon3.png")
    }]

    typeList: any[] = []
    lastRecord: any[] = []
    currentRecord: any [] = []
    warnList: any [] = []

    currentYear: any = m().format('YYYY')

    timeout: any = null;

    classOption: Object = {
        step: 0.2,
        limitMoveNum: 11
    };

    classOption1: Object = {
        step: 0.2,
        limitMoveNum: 5
    };

    sum: any = [
        {
            label: '蔬菜种类',
            num: 53,
            dw: '种'
        },
        {
            label: '产量预估',
            num: 460,
            dw: '亩'
        },
        {
            label: '销售额预估',
            num: 16547,
            dw: '元'
        },
    ]

    leftTopData: any = []

    rightBottomData: any = []

    rightMidData: any = []

    apiurl: any = {
        leftTop: '/pestCount/listPestUpRecord',
        leftBottom: '/pestCount/listPestAreaDistribution',
        midTop: '/pestCount/listPestLevelDistribution',
        midMid: '/pestCount/listPestMonthDistribution',
        midBom: '/pestCount/listPestTypeDistribution',
        rightTop: '/pestCount/pestInfoCountVo',
        rightBottom: '/pestCount/listPestWarn',
    }


    getLeftBottomChart(data: any) {
        let myChart = echarts.init(this.$refs.leftBottomChart);
        let list: any[] = _.cloneDeep(data)
        let chartdata: any [] = []
        let chartdata2: any [] = []
        let xdata: any [] = []

        for (let i = 0; i < list.length; i++) {
            xdata.push(list[i].township)
            chartdata.push(list[i].affectedArea)
            chartdata2.push(Number(list[i].economicLoss) / 10000)
        }
        let max: any = chartdata.sort((a: any, b: any) => {
            return b - a
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
            textStyle: {
                color: "#c0c3cd",
                fontSize: 14
            },
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

                    val.forEach((item: any, index: number) => {
                        if (index == 1 || index == 4) {
                            str += `${item.marker}  ${item.seriesName} ：${val[index-1].value.toLocaleString()}${index == 1 ? '亩' : '万元'}<br>`
                        }
                    })

                    return `${val[0].axisValue} <br>` + str
                }
            },
            legend: {
                top: '3%',
                left: 'center',
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: '#fff'
                },
                data: [{name: '受灾面积', itemStyle: {color: '#62BD31'}}, {name: '经济损失', itemStyle: {color: '#E6BB45'}}],
                selectedMode: false,
            },
            color: ["#26BF40"],
            grid: {
                top: "15%",
                left: "10%",
                right: "10%",
                bottom: "10%",
                containLabel: false
            },
            xAxis: {
                axisLabel: {
                    color: "#ffffff",
                    fontSize: 14,
                    interval: 0
                },
                axisTick: {
                    show: false,
                    lineStyle: {
                        color: "#384267",
                        width: 1
                    }
                },
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: "#335971"
                    },
                    show: false
                },
                data: xdata,
                type: "category"
            },
            yAxis: [
                {
                    type: 'value',
                    name: '亩',
                    max: max[0] * 2,
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
                            color: 'rgba(255, 255, 255, 0.5)',
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                },
                {
                    type: 'value',
                    name: '万元',
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontWeight: 'bold',
                        padding: [0, 0, 0, 45]
                    },
                    splitLine: {
                        show: false,
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
                            color: 'rgba(255, 255, 255, 0.5)',
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                },
            ],
            series: [
                {
                    data: chartdata,
                    name: '受灾面积',
                    type: "bar",
                    barMaxWidth: "auto",
                    barWidth: 20,
                    itemStyle: {
                        color: {
                            x: 0,
                            y: 1,
                            x2: 0,
                            y2: 0,
                            type: "linear",
                            colorStops: [
                                {
                                    offset: 0,
                                    color: "#26BF40"
                                },
                                {
                                    offset: 1,
                                    color: "rgba(38, 191, 64, 0.3)"
                                }
                            ]
                        }
                    },
                    label: {
                        show: true,
                        position: "top",
                        distance: 10,
                        // color: '#fff',
                        fontSize: 16,
                        fontFamily: "YouSheBiaoTiHei",
                        fontWeight: 400,
                        color: "#26BF40",
                        shadowColor: "#fff",
                        shadowBlur: 4,
                        shadowOffsetX: 0,
                        shadowOffsetY: 4
                    }
                },
                {
                    name: '受灾面积',
                    data: chartdata,
                    type: "pictorialBar",
                    barMaxWidth: "20",
                    symbol: "diamond",
                    symbolOffset: ['-63%', '50%'],
                    symbolSize: [20, 20 * 0.5],
                    zlevel: 2
                },
                {
                    name: '受灾面积',
                    data: chartdata,
                    type: "pictorialBar",
                    barMaxWidth: "20",
                    symbolPosition: "end",
                    symbol: "diamond",
                    symbolOffset: ['-63%', '-50%'],
                    symbolSize: [20, 20 * 0.5],
                    zlevel: 3
                },
                //----------------
                {
                    data: chartdata2,
                    name: '经济损失',
                    yAxisIndex: '1',
                    type: "bar",
                    barMaxWidth: "auto",
                    barWidth: 20,
                    itemStyle: {
                        color: {
                            x: 0,
                            y: 1,
                            x2: 0,
                            y2: 0,
                            type: "linear",
                            colorStops: [
                                {
                                    offset: 0,
                                    color: "#E6BB45"
                                },
                                {
                                    offset: 1,
                                    color: "rgba(230, 187, 69, 0.3)"
                                }
                            ]
                        }
                    },
                    label: {
                        show: true,
                        position: "top",
                        distance: 10,
                        // color: '#fff',
                        fontSize: 16,
                        fontFamily: "YouSheBiaoTiHei",
                        fontWeight: 400,
                        color: "#E6BB45",
                        shadowColor: "#fff",
                        shadowBlur: 4,
                        shadowOffsetX: 0,
                        shadowOffsetY: 4
                    }
                },
                {
                    name: '经济损失',
                    data: [1, 1, 1, 1, 1, 1],
                    yAxisIndex: '1',
                    type: "pictorialBar",
                    barMaxWidth: "20",
                    symbol: "diamond",
                    symbolOffset: ['63%', '50%'],
                    symbolSize: [20, 20 * 0.5],
                    itemStyle: {
                        color: '#E6BB45'
                    },
                    zlevel: 2
                },
                {
                    name: '经济损失',
                    data: chartdata2,
                    yAxisIndex: '1',
                    type: "pictorialBar",
                    barMaxWidth: "20",
                    symbolPosition: "end",
                    symbol: "diamond",
                    symbolOffset: ['63%', '-50%'],
                    symbolSize: [20, 20 * 0.5],
                    itemStyle: {
                        color: '#E6BB45'
                    },
                    zlevel: 3
                }
            ],
        };
        myChart.setOption(option);
    }

    getMidTopChart(data: any) {
        // console.log(data)
        let myChart = echarts.init(this.$refs.midTopChart);
        let arr: any[] = []
        let list: any[] = _.cloneDeep(data)
        list.forEach((item: any) => {
            let array: any[] = []
            array.push(item.pestScale)
            array.push(item.curation)
            array.push(item.economicLoss)
            array.push(item.affectedArea)
            array.push(item.reduceProduction)
            arr.push(array)
        })
        const option: any = {
            color: ['#F6BD16', '#FF4C4C'],
            tooltip: {
                // trigger: 'axis',
                // axisPointer: {
                //     type: 'shadow',
                // },
                backgroundColor: 'rgba(3,3,3,0.5)',
                borderWidth: 0,
                textStyle: {
                    color: '#fff',
                    fontSize: '14',
                },
                formatter: (val:any) => {
                    // console.log(val)
                    let str: string = ''
                    str += `病虫害规模 ：${val.value[0]}%<br>`
                    str += `持续时间 ：${val.value[1]}%<br>`
                    str += `经济损失 ：${val.value[2]}%<br>`
                    str += `受灾面积 ：${val.value[3]}%<br>`
                    str += `减少产量 ：${val.value[4]}%<br>`
                    return `${val.name} <br>` + str
                }
            },
            legend: {
                top: '14',
                right: '5%',
                itemWidth: 8,
                itemHeight: 8,
                orient: 'vertical',
                textStyle: {
                    color: '#fff'
                },
                data: ['轻度', '重度']
            },
            radar: {
                // 设置成相对的百分比
                center: ['50%', '55%'],
                indicator: [
                    {name: '病虫害规模'},
                    {name: '持续时间'},
                    {name: '经济损失'},
                    {name: '受灾面积'},
                    {name: '减少产量'}
                ],
                name: {
                    textStyle: {
                        color: '#fff',
                        fontSize: 16
                    },
                },
                splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
                    show: true,
                    areaStyle: { // 分隔区域的样式设置。
                        color: 'rgba(0, 0, 0, 0.2)', // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
                    }
                },
                axisLine: { //指向外圈文本的分隔线样式
                    lineStyle: {
                        color: '#CCCCCC'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#CCCCCC', // 分隔线颜色
                        width: 1, // 分隔线线宽
                    }
                },
            },
            series: [
                {
                    name: '病虫害等级分布',
                    type: 'radar',
                    data: [
                        {
                            value: arr[0],
                            name: '轻度',
                            areaStyle: {
                                normal: { // 单项区域填充样式
                                    color: 'rgba(246, 189, 22, 0.2)',
                                    opacity: 1 // 区域透明度
                                }
                            }
                        },
                        {
                            value: arr[1],
                            name: '重度',
                            areaStyle: {
                                normal: { // 单项区域填充样式
                                    color: 'rgba(255, 76, 76, 0.2)',
                                    opacity: 1 // 区域透明度
                                }
                            }
                        }
                    ]
                }
            ]
        };
        myChart.setOption(option);
    }

    getMidMidChart(data: any) {
        // console.log(data)
        let myChart = echarts.init(this.$refs.midMidChart);
        let xData: any[] = []
        let barData: any[] = []
        let lineData: any[] = []
        let list: any[] = _.cloneDeep(data)
        list.forEach((item: any) => {
            xData.push(item.month+'月')
            barData.push(item.affectedArea)
            lineData.push(Number(item.economicLoss) / 10000)
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

                    val.forEach((item: any, index: number) => {

                        str += `${index == 0 ?'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#62BD31;"></span>':item.marker}
                        ${item.seriesName} ：${item.value.toLocaleString()}${index == 0 ? '亩' : '万元'}<br>`

                    })

                    return `${val[0].axisValue} <br>` + str
                }
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '14%',
                top: '20%',
                // containLabel: true,
            },
            legend: {
                itemWidth: 8,
                itemHeight: 8,
                data: [{name: '受灾面积', icon: 'rect'}, {
                    name: '经济损失',
                    icon: 'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',
                    lineStyle: {width: 16, type: 'solid'}
                }],
                left: 'center',
                top: '5%',
                textStyle: {
                    color: '#fff',
                }
            },
            xAxis: {
                type: 'category',
                data: xData,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(204, 204, 204, 0.5)',
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
                        fontSize: 13,
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
                    name: '亩',
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
                            color: 'rgba(255, 255, 255, 0.5)',
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                },
                {
                    type: 'value',
                    name: '万元',
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontWeight: 'bold',
                        padding: [0, 0, 0, 45]
                    },
                    splitLine: {
                        show: false,
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
                            color: 'rgba(255, 255, 255, 0.5)',
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                },
            ],
            series: [
                {
                    name: '受灾面积',
                    type: 'bar',
                    barWidth: 20,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: '#62BD31',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(98, 189, 49, 0.2)',
                                },
                            ]),
                            barBorderRadius: [10, 10, 0, 0],
                        },
                    },
                    data: barData,
                },
                {
                    name: '经济损失',
                    type: 'line',
                    yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                    smooth: false, //平滑曲线显示

                    symbol: 'circle', //标记的图形为实心圆
                    symbolSize: 8, //标记的大小
                    itemStyle: {
                        color: "#F6BD16",
                        borderColor: "#fff",
                        borderWidth: 2,
                        shadowColor: 'rgba(0, 0, 0, .3)',
                        shadowBlur: 0,
                        shadowOffsetY: 2,
                        shadowOffsetX: 2,
                    },
                    lineStyle: {
                        normal: {
                            color: "#F6BD16",
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 0,
                            shadowOffsetY: 5,
                            shadowOffsetX: 5,
                        },
                    },

                    data: lineData,
                },
            ],
        };
        myChart.setOption(option);
    }

    getMidBomChartLeft(data: any) {
        // console.log(data)
        let leftChart = echarts.init(this.$refs.midBomChartLeft);
        let rightChart = echarts.init(this.$refs.midBomChartRight);
        const option: any = {
            title: [{
                text: data.affectedArea + '亩',
                textStyle: {
                    color: 'rgba(98, 189, 49, 1)',
                    fontSize: 24,
                    fontFamily: 'YouSheBiaoTiHei',
                    textShadowColor: '#62BD31',
                    textShadowBlur: 10
                },
                left: 'center',
                bottom: '5%'
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
                center: ['50%', '40%'], //中心点位置
                radius: '120%' //图形大小
            }],
            xAxis: [],
            yAxis: [],
            series: [

                {
                    type: 'bar',
                    z: 10,
                    name: "完成度",
                    data: [Number(data.affectedArea) / Number(data.totalArea) * 100],
                    showBackground: false,
                    backgroundStyle: {
                        borderWidth: 10,
                        width: 10
                    },
                    coordinateSystem: 'polar',
                    roundCap: true,
                    barWidth: 15, //大的占比环
                    itemStyle: {
                        normal: {
                            opacity: 1,
                            color: "#62BD31"
                        }
                    },
                },
                {
                    type: 'pie',
                    name: '内层细圆环',
                    radius: ['45%', '75%'],
                    center: ['50%', '40%'], //中心点位置
                    startAngle: 90,
                    hoverAnimation: false,
                    clockWise: true,
                    silent: true,
                    itemStyle: {
                        normal: {
                            color: 'rgba(98, 189, 49, 0.2)',
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
                        fontSize: 14,
                        formatter: (val: any) => {
                            // console.log(val);
                            return '受灾面积'
                        }
                    },
                    data: [100]
                }
            ]
        };
        const options: any = {
            title: [{
                text: Number(data.economicLoss) / 10000 + '万元',
                textStyle: {
                    color: '#E6BB45',
                    fontSize: 24,
                    fontFamily: 'YouSheBiaoTiHei',
                    textShadowColor: '#E6BB45',
                    textShadowBlur: 10
                },
                left: 'center',
                bottom: '5%'
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
                center: ['50%', '40%'], //中心点位置
                radius: '120%' //图形大小
            }],
            xAxis: [],
            yAxis: [],
            series: [

                {
                    type: 'bar',
                    z: 10,
                    name: "完成度",
                    data: [Number(data.economicLoss) / Number(data.totalEconomicLoss) * 100],
                    showBackground: false,
                    backgroundStyle: {
                        borderWidth: 10,
                        width: 10
                    },
                    coordinateSystem: 'polar',
                    roundCap: true,
                    barWidth: 15, //大的占比环
                    itemStyle: {
                        normal: {
                            opacity: 1,
                            color: "rgba(230, 187, 69, 1)"
                        }
                    },
                },
                {
                    type: 'pie',
                    name: '内层细圆环',
                    radius: ['45%', '75%'],
                    center: ['50%', '40%'], //中心点位置
                    startAngle: 90,
                    hoverAnimation: false,
                    clockWise: true,
                    silent: true,
                    itemStyle: {
                        normal: {
                            color: 'rgba(230, 187, 69, 0.2)',
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
                        fontSize: 14,
                        formatter: (val: any) => {
                            // console.log(val);
                            return '损失经济'
                        }
                    },
                    data: [100]
                }
            ]
        };
        leftChart.setOption(option);
        rightChart.setOption(options);
    }

    getMidBomChartRight(data: any) {
        let leftChart = echarts.init(this.$refs.midBomChartLeftRight);
        let rightChart = echarts.init(this.$refs.midBomChartRightRight);
        const option: any = {
            title: [{
                text: data.affectedArea + '亩',
                textStyle: {
                    color: 'rgba(98, 189, 49, 1)',
                    fontSize: 24,
                    fontFamily: 'YouSheBiaoTiHei',
                    textShadowColor: '#62BD31',
                    textShadowBlur: 10
                },
                left: 'center',
                bottom: '5%'
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
                center: ['50%', '40%'], //中心点位置
                radius: '120%' //图形大小
            }],
            xAxis: [],
            yAxis: [],
            series: [

                {
                    type: 'bar',
                    z: 10,
                    name: "完成度",
                    data: [Number(data.affectedArea) / Number(data.totalArea) * 100],
                    showBackground: false,
                    backgroundStyle: {
                        borderWidth: 10,
                        width: 10
                    },
                    coordinateSystem: 'polar',
                    roundCap: true,
                    barWidth: 15, //大的占比环
                    itemStyle: {
                        normal: {
                            opacity: 1,
                            color: "#62BD31"
                        }
                    },
                },
                {
                    type: 'pie',
                    name: '内层细圆环',
                    radius: ['45%', '75%'],
                    center: ['50%', '40%'], //中心点位置
                    startAngle: 90,
                    hoverAnimation: false,
                    clockWise: true,
                    silent: true,
                    itemStyle: {
                        normal: {
                            color: 'rgba(98, 189, 49, 0.2)',
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
                        fontSize: 14,
                        formatter: (val: any) => {
                            // console.log(val);
                            return '受灾面积'
                        }
                    },
                    data: [100]
                }
            ]
        };
        const options: any = {
            title: [{
                text: Number(data.economicLoss) / 10000 + '万元',
                textStyle: {
                    color: '#E6BB45',
                    fontSize: 24,
                    fontFamily: 'YouSheBiaoTiHei',
                    textShadowColor: '#E6BB45',
                    textShadowBlur: 10
                },
                left: 'center',
                bottom: '5%'
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
                center: ['50%', '40%'], //中心点位置
                radius: '120%' //图形大小
            }],
            xAxis: [],
            yAxis: [],
            series: [

                {
                    type: 'bar',
                    z: 10,
                    name: "完成度",
                    data: [Number(data.economicLoss) / Number(data.totalEconomicLoss) * 100],
                    showBackground: false,
                    backgroundStyle: {
                        borderWidth: 10,
                        width: 10
                    },
                    coordinateSystem: 'polar',
                    roundCap: true,
                    barWidth: 15, //大的占比环
                    itemStyle: {
                        normal: {
                            opacity: 1,
                            color: "rgba(230, 187, 69, 1)"
                        }
                    },
                },
                {
                    type: 'pie',
                    name: '内层细圆环',
                    radius: ['45%', '75%'],
                    center: ['50%', '40%'], //中心点位置
                    startAngle: 90,
                    hoverAnimation: false,
                    clockWise: true,
                    silent: true,
                    itemStyle: {
                        normal: {
                            color: 'rgba(230, 187, 69, 0.2)',
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
                        fontSize: 14,
                        formatter: (val: any) => {
                            // console.log(val);
                            return '损失经济'
                        }
                    },
                    data: [100]
                }
            ]
        };
        leftChart.setOption(option);
        rightChart.setOption(options);
    }


    back() {
        this.$router.push('/production')
    }

    getData(res: any) {
        // console.log(res)
        if (res.key == this.apiurl.leftTop) {
            this.lastRecord = res.data
        } else if (res.key == this.apiurl.leftBottom) {
            this.getLeftBottomChart(res.data)
        } else if (res.key == this.apiurl.midTop) {
            this.getMidTopChart(res.data)
        } else if (res.key == this.apiurl.midMid) {
            this.getMidMidChart(res.data)
        } else if (res.key == this.apiurl.midBom) {
            // console.log(res.data);
            this.typeList = res.data
            this.getMidBomChartLeft(res.data[0])
            this.getMidBomChartRight(res.data[1])
        } else if (res.key == this.apiurl.rightTop) {
            // console.log(res.data)
            let data: any = _.cloneDeep(res.data)
            this.currentRecord = data.pestUpRecords
            delete data.pestUpRecords
            this.$nextTick(() => {
                let list: any [] = this.$refs.num
                list.forEach((item: any, index: number) => {
                    switch (index) {
                        case 0:
                            animateValue(item, data.eventNum, 1000)
                            break;
                        case 1:
                            animateValue(item, data.affectedArea, 1000)
                            break;
                        case 2:
                            animateValue(item, Number(data.economicLoss) / 10000, 1000)
                            break;
                        default:
                            break;
                    }
                })
            })
        } else if (res.key == this.apiurl.rightBottom) {
            this.warnList = res.data
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
            // if (key === 'leftTop' || key === 'leftBottom' || key === 'midTop' || key === 'midMid' || key === 'midBom') {
            //     params = {year: this.currentYear}
            // } else {
            //     params = {year: this.currentYear}
            // }
            params = {year: this.currentYear}
            socketClient.addCallBack(this.apiurl[key], this.getData);
            socketClient.addSend(this.apiurl[key], this.getParams(params));
        }
        setTimeout(() => {
            socketClient.sendAll()
        }, 500);
    }

    mounted() {
        this.queryData()

    }

    beforeDestroy() {
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
    background-image: url('./images/pestsbg.jpg');
    background-size: cover;
    padding-bottom: 110px;

    /deep/ .titleContent {
        .title {
            span {
                font-weight: bold;
                color: #F6BD16;
                text-shadow: 0px 0px 20px #F6BD16;
                .tip {
                    font-size: 12px;
                    color: rgba(255, 255, 255, 0.5);
                }
            }
        }
    }

    .content {
        position: relative;
        z-index: 999;
        display: flex;

        overflow: hidden;
        width: 100%;
        padding: 0 35px;
        //padding-top: 120px;



        .left {
            width: 600px;

            .leftTop {
                width: 100%;
                height: 460px;
                margin-bottom: 20px;

                .leftTopChart {
                    width: 100%;
                    height: 420px;
                    background-color: rgba(255, 255, 255, .2);
                    padding-bottom: 20px;

                    .leftTopChart-header {
                        display: flex;
                        align-items: center;
                        padding-left: 20px;
                        height: 40px;
                        background: rgba(246, 189, 22, 0.3);
                        font-size: 14px;
                        font-weight: bold;
                        color: #F6BD16;
                        line-height: 36px;
                    }

                    .leftTopChart-cell {
                        padding-left: 20px;
                        font-size: 14px;
                        color: #FFFFFF;
                        line-height: 34px;

                        .light {
                            color: #E6BB45;
                        }

                        .heavy {
                            color: #FF4C4C;
                        }
                    }
                }

            }

            .leftBottom {
                width: 100%;
                height: 460px;
                margin-bottom: 20px;

                .leftBottomChart {
                    width: 100%;
                    height: 420px;
                    background-color: rgba(255, 255, 255, .2);
                }
            }
        }

        .mid {
            width: 600px;
            margin: 0 30px;

            .midTop {
                position: relative;
                width: 100%;
                height: 300px;
                margin-bottom: 20px;

                .midTopChart {
                    width: 100%;
                    padding: 15px 0;
                    height: 260px;
                    background-color: rgba(255, 255, 255, .2);
                }
            }

            .midMid {
                width: 100%;
                height: 300px;
                margin-bottom: 20px;

                .midMidChart {
                    width: 100%;
                    height: 260px;
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
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .midBomChart-left {
                        width: 297px;
                        height: 260px;
                        background-color: rgba(255, 255, 255, .2);
                        display: flex;
                        align-items: center;
                        flex-wrap: wrap;

                        .midBomChart-title {
                            width: 100%;
                            padding-top: 30px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 20px;
                            font-weight: bold;
                            color: #FFFFFF;
                        }

                        div:not(.midBomChart-title) {
                            width: 50%;
                            height: 180px;
                        }
                    }

                }
            }

        }

        .right {
            width: 600px;

            .rightTop {
                width: 100%;
                height: 460px;
                margin-bottom: 20px;

                .rightTopChart {
                    width: 100%;
                    height: 420px;
                    background-color: rgba(255, 255, 255, .2);

                    .rightTopChart-top {
                        height: 156px;
                        padding: 20px 0;
                        display: flex;
                        align-items: center;

                        .rightTopChart-top-box {
                            width: 200px;
                            display: flex;
                            align-items: center;
                            flex-direction: column;
                            justify-content: center;

                            &:nth-child(2) {
                                border-left: 1px solid rgba(255, 255, 255, 0.2);
                                border-right: 1px solid rgba(255, 255, 255, 0.2);
                            }

                            .rightTopChart-top-box-icon {
                                width: 84px;
                                height: 76px;
                            }

                            .rightTopChart-top-box-num {
                                font-size: 36px;
                                font-family: YouSheBiaoTiHei;
                                color: #F6BD16;
                                margin-top: -14px;
                            }

                            .rightTopChart-top-box-title {
                                margin-top: -5px;
                                font-size: 14px;
                                color: #FFFFFF;
                            }
                        }
                    }

                    .rightTopChart-bom {
                        height: 244px;

                        .rightTopChart-header {
                            display: flex;
                            align-items: center;
                            padding-left: 20px;
                            height: 40px;
                            background: rgba(246, 189, 22, 0.3);
                            font-size: 14px;
                            font-weight: bold;
                            color: #F6BD16;
                            line-height: 36px;
                        }

                        .rightTopChart-cell {
                            padding-left: 20px;
                            font-size: 14px;
                            color: #FFFFFF;
                            line-height: 34px;

                            .light {
                                color: #E6BB45;
                            }

                            .heavy {
                                color: #FF4C4C;
                            }
                        }
                    }
                }
            }

            .rightBottom {
                width: 100%;
                height: 460px;
                margin-bottom: 20px;

                .rightBomChart {
                    width: 100%;
                    height: 420px;
                    background-color: rgba(255, 255, 255, .2);
                    padding-bottom: 20px;

                    .rightBomChart-header {
                        display: flex;
                        align-items: center;
                        padding: 0 20px;
                        height: 40px;
                        background: rgba(246, 189, 22, 0.3);
                        font-size: 14px;
                        font-weight: bold;
                        color: #F6BD16;
                        line-height: 36px;
                    }

                    .rightBomChart-cell {
                        padding: 0 20px;
                        font-size: 14px;
                        color: #FFFFFF;
                        line-height: 34px;

                        &.warn {
                            background: rgba(255, 76, 76, 0.4);
                        }

                        .light {
                            color: #E6BB45;
                        }

                        .heavy {
                            color: #FF4C4C;
                        }
                    }
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
