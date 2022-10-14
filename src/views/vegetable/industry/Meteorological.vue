<template>
    <div class="vegetable">

        <bgAnim></bgAnim>
        <OneSizeContainer :width="1920" :height="1080" :maxRatio="2">
            <selfHead title="气象灾害监测分析" @back="back"></selfHead>
            <div class="content">
                <div class="left">
                    <div class="leftTop">
                        <selfTitle>气象灾害概况</selfTitle>
                        <div class="leftTopChart">
                            <el-row class="leftTopChart-header">
                                <el-col :span="3">发生时间</el-col>
                                <el-col :span="3">乡镇</el-col>
                                <el-col :span="3">灾害类型</el-col>
                                <el-col :span="2">灾害等级</el-col>
                                <el-col :span="3">作物类型</el-col>
                                <el-col :span="2">持续天数</el-col>
                                <el-col :span="2">影响面积</el-col>
                                <el-col :span="3">预计减产量</el-col>
                                <el-col :span="3">预计减产</el-col>
                            </el-row>
                            <vue-seamless-scroll :data="record" :class-option="classOption"
                                                 class="seamless-warp influence">
                                <el-row class="leftTopChart-cell" v-for="(item,index) in record" :key="index">
                                    <el-col :span="3">{{ item.happenTime }}</el-col>
                                    <el-col :span="3">{{ item.township }}</el-col>
                                    <el-col :span="3">{{ item.disasterType }}</el-col>
                                    <el-col :span="2">{{ item.disasterLevel }}</el-col>
                                    <el-col :span="3">{{ item.cropType }}</el-col>
                                    <el-col :span="2">{{ item.durationDays }}天</el-col>
                                    <el-col :span="2">{{ item.influenceArea }}亩</el-col>
                                    <el-col :span="3">{{ item.productionReduction }}吨</el-col>
                                    <el-col :span="3">{{ Number(item.productionReductionValue/10000).toFixed(4) }}万元</el-col>

                                </el-row>
                            </vue-seamless-scroll>
                        </div>
                    </div>
                    <div class="leftMid">
                        <selfTitle>上1年气象灾害类型板块</selfTitle>
                        <div class="leftMidChart" ref="leftMidChart"></div>
                    </div>
                    <div class="leftBottom">
                        <selfTitle>上1年气象灾害月度分布</selfTitle>
                        <div class="leftBottomChart" ref="leftBottomChart"></div>
                    </div>
                </div>

                <div class="right">
                    <div class="rightTop">
                        <selfTitle>今年灾害监测</selfTitle>
                        <div class="rightTopChart">
                            <div class="rightTopChart-left">
                                <div class="rightTopChart-left-row">
                                    <div class="rightTopChart-left-row-title">发生时间</div>
                                    <div class="rightTopChart-left-row-value">{{curtYear.happenTime}}</div>
                                </div>
                                <div class="rightTopChart-left-row">
                                    <div class="rightTopChart-left-row-title">乡镇名称</div>
                                    <div class="rightTopChart-left-row-value">{{curtYear.township}}</div>
                                </div>
                                <div class="rightTopChart-left-row">
                                    <div class="rightTopChart-left-row-title">灾害类型</div>
                                    <div class="rightTopChart-left-row-value">{{curtYear.disasterType}}</div>
                                </div>
                                <div class="rightTopChart-left-row">
                                    <div class="rightTopChart-left-row-title">灾害等级</div>
                                    <div class="rightTopChart-left-row-value">{{curtYear.disasterLevel}}</div>
                                </div>
                                <div class="rightTopChart-left-row">
                                    <div class="rightTopChart-left-row-title">作物类型</div>
                                    <div class="rightTopChart-left-row-value">{{curtYear.cropType}}</div>
                                </div>
                            </div>
                            <div class="rightTopChart-right">
                                <div class="rightTopChart-left-row">
                                    <div class="rightTopChart-left-row-title">预计持续天数 (天)</div>
                                    <div class="rightTopChart-left-row-value" ref="day"></div>
                                </div>
                                <div class="rightTopChart-left-row">
                                    <div class="rightTopChart-left-row-title">预计影响面积 (亩)</div>
                                    <div class="rightTopChart-left-row-value" ref="area"></div>
                                </div>
                                <div class="rightTopChart-left-row">
                                    <div class="rightTopChart-left-row-title">预计减产量 (吨)</div>
                                    <div class="rightTopChart-left-row-value" ref="yield"></div>
                                </div>
                                <div class="rightTopChart-left-row">
                                    <div class="rightTopChart-left-row-title">预计减产金额 (元)</div>
                                    <div class="rightTopChart-left-row-value" ref="money"></div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="rightMid">
                        <selfTitle>上1年受灾区域分布<span class="tip">（图表可左右拖动查看）</span></selfTitle>
                        <div class="rightMidChart" ref="rightMidChart"></div>
                    </div>
                    <div class="rightBottom">
                        <selfTitle>上1年受灾作物分布</selfTitle>
                        <div class="rightBomChart">
                            <div class="rightBomChart-box" v-for="(item,index) in typeList" :key="index">
                                <div class="rightBomChart-box-left">
                                    <img :src="item.icon" :width="item.width" :height="item.height" class="rightBomChart-box-left-img"  alt="">
                                    <div>{{ item.type }}</div>
                                </div>
                                <div class="rightBomChart-box-right">
                                    <div class="rightBomChart-box-right-row">
                                        <div class="rightBomChart-box-right-row-title">受灾次数</div>
                                        <div class="rightBomChart-box-right-row-value" ref="frequency"></div>
                                    </div>
                                    <div class="rightBomChart-box-right-row">
                                        <div class="rightBomChart-box-right-row-title">总影响面积 (亩)</div>
                                        <div class="rightBomChart-box-right-row-value" ref="influenceArea"></div>
                                    </div>
                                    <div class="rightBomChart-box-right-row">
                                        <div class="rightBomChart-box-right-row-title">总产量 (吨)</div>
                                        <div class="rightBomChart-box-right-row-value" ref="yieldSum"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </OneSizeContainer>
    </div>
</template>

<script lang="ts">
import {Component, Mixins, Vue} from "vue-property-decorator";
import selfHead from "@/components/Head/Head.vue"
import bgAnim from '@/components/bgAnim/BgAnim.vue'
import selfTitle from '../../vegetable/Title.vue'
import * as echarts from 'echarts';
import autoResizeMixin from "@/mixins/echarts/autoResizeMixin"
import * as socketClient from '@/views/socketClient';
import vueSeamlessScroll from "vue-seamless-scroll";
import m from "moment"
import _ from "lodash";
import {animateValue} from "@/util";

@Component({
    name: "Meteorological",
    components: {
        selfHead,
        bgAnim,
        selfTitle,
        vueSeamlessScroll
    },
    mixins: [autoResizeMixin]
})
export default class Meteorological extends Mixins(autoResizeMixin) {
    public $refs!: {
        leftMidChart: HTMLDivElement,
        leftBottomChart: HTMLDivElement,
        rightMidChart: HTMLDivElement,
        day: HTMLDivElement,
        area: HTMLDivElement,
        yield: HTMLDivElement,
        money: HTMLDivElement,
        frequency: HTMLDivElement,
        influenceArea: HTMLDivElement,
        yieldSum: HTMLDivElement,
    }

    influence: any[] = []
    record: any[] = []
    typeList: any[] = []
    curtYear:any = {}
    currentYear: any = m().format('YYYY')

    timeout: any = null;
    timer2: any = null;
    timer3: any = null;

    classOption: Object = {
        step: 0.2,
        limitMoveNum: 6
    };
    warnOption: Object = {
        step: 0.2,
        limitMoveNum: 11
    };


    apiurl: any = {
        leftTop: '/growthMonitor/mdWeatherDisasterSurvey',
        leftMid: '/growthMonitor/mdDisasterTypeSection',
        leftBottom: '/growthMonitor/mdDisasterMonthDistribute',
        rightTop: '/growthMonitor/MdWeatherDisasterSurveyThisYear',
        rightMid: '/growthMonitor/mdDisasterAreaDistribute',
        rightBom: '/growthMonitor/MdDisasterFarmDistribute',
    }

    getLeftMidChart(data: any) {
        let myChart = echarts.init(this.$refs.leftMidChart);
        let list: any[] = _.cloneDeep(data);
        let colorList:any[] = ['#FF4C4C','#FCCD4C']
        let pieData: any[] = [
            {
                name: '总受灾次数\n（万次）',
                title: '受灾次数'
            },
            {
                name: '总影响面积\n（万亩）',
                title: '影响面积'
            },
            {
                name: '总影响产量\n（万吨）',
                title: '总产量'
            },
        ];
        let arr: any[] = []
        pieData.forEach((item: any) => {
            list.forEach((items: any) => {
                if (items.type == item.title) {
                    arr.push({
                        ...item,
                        ...items
                    })
                }
            })
        })
        // console.log(arr)

        let titleArr: any[] = [],
            elementArr: any[] = [],
            seriesArr: any[] = [];

        arr.forEach(function (item, index) {
            elementArr.push(
                {
                    type: "text",
                    z: 4,
                    style: {
                        text: item.title,
                        fontSize: 16,
                        fill: '#FFFFFF'
                    },
                    left: index * 31.5 + 17.5 + '%',
                    top: "93%",
                    position: [100, 100],
                },
            )
            titleArr.push({
                text: (item.totalCount / 10000),
                left: index * 31.5 + 20 + '%',
                top: '35%',
                textAlign: 'center',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 30,
                    fontFamily: 'YouSheBiaoTiHei',
                    color: 'white',
                    textAlign: 'center',
                },
                subtext: item.name,
                subtextStyle: {
                    fontSize: 12,
                    color: 'white',
                    lineHeight: 18,
                    textAlign: 'center',
                }
            });
            seriesArr.push(
                {
                    type: 'pie',
                    clockWise: false,
                    radius: ['45%', '65%'],
                    itemStyle: {
                        normal: {

                            label: {
                                show: false,
                            },
                            labelLine: {
                                show: false,
                            },
                        },
                    },
                    hoverAnimation: true,
                    center: [index * 32 + 20 + '%', '50%'],
                    data: [

                        {
                            name: '重度',
                            value: item.severe,
                            itemStyle: {
                                normal: {
                                    color: '#FF4C4C',
                                }
                            },
                            labelLine: {
                                show: true,
                                length: 5,
                                length2: 2,
                                lineStyle: {
                                    opacity: 0
                                }
                            },
                            label: {
                                normal: {
                                    formatter: function (params: any) {
                                        // console.log(params)
                                        return params.percent + "%";
                                    },
                                    position: 'outside',
                                    show: true,
                                    textStyle: {
                                        fontSize: 24,
                                        fontFamily: 'YouSheBiaoTiHei',
                                        // fontWeight: 'bold',
                                        color: colorList[0],
                                    },
                                },
                            },
                        },
                        {
                            name: '轻度',
                            value: item.light,
                            itemStyle: {
                                color: '#FCCD4C',
                            },
                            labelLine: {
                                show: true,
                                length: 5,
                                length2: 2,
                                lineStyle: {
                                    opacity: 0
                                }
                            },
                            label: {
                                normal: {
                                    formatter: function (params: any) {
                                        return params.percent + "%";
                                    },
                                    position: 'outside',
                                    show: true,
                                    textStyle: {
                                        fontSize: 24,
                                        fontFamily: 'YouSheBiaoTiHei',
                                        // fontWeight: 'bold',
                                        color: colorList[1],
                                    },
                                },
                            },
                        }
                    ],
                },
            )
        });

        let option = {
            grid: {
                left: '5%',
                right: '2%',
                bottom: '0%',
                top: '0%',
                containLabel: false,
            },
            legend: {
                itemWidth: 8,
                itemHeight: 8,

                left: 'center',
                top: '5%',
                textStyle: {
                    color: '#fff',
                }
            },
            graphic: {
                elements: elementArr,
            },
            title: titleArr,
            series: seriesArr,
        };
        myChart.setOption(option);
        if(!this.timer2){
            let len = 0
            this.timer2 = setInterval(() => {
                myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: len-1,
                })
                myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 1,
                    dataIndex: len-1,
                })
                myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 2,
                    dataIndex: len-1,
                })
                if (len === 2) {
                    len = 0
                }
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: len,
                })
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 1,
                    dataIndex: len,
                })
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 2,
                    dataIndex: len,
                })
                len++
            }, 5000)
        }
    }

    getLeftBottomChart(data: any) {
        let myChart = echarts.init(this.$refs.leftBottomChart);
        let list: any[] = _.cloneDeep(data)
        // console.log(list)
        let xData:any[] = []

        let areaData:any[] = []
        let yieldData:any[] = []
        let frequencyData:any[] = []
        list.forEach((item:any) => {
            xData.push(item.month + '月')
            areaData.push(item.influenceArea/10000)
            yieldData.push(item.influenceYield/10000)
            frequencyData.push(item.disasteNum/10000)
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
                    let unit = ['万亩','万元','万次']
                    let color = ['#62BD31','#FCCD4C']
                    val.forEach((item: any, index: number) => {

                        str += `${index == 0 || index ==1 ?'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+color[index]+'"></span>':item.marker}
                        ${item.seriesName} ：${item.value.toFixed(2)}${unit[index]}<br>`

                    })

                    return `${val[0].axisValue} <br>` + str
                }
            },
            grid: {
                left: '7%',
                right: '7   %',
                bottom: '10%',
                top: '16%',
                containLabel: false
            },
            legend: {
                itemWidth: 8,
                itemHeight: 8,
                data: [{name: '影响面积', icon: 'rect'},{name: '影响产量', icon: 'rect'}, {
                    name: '受灾次数',
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
                    name: '万亩',
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
                {
                    show:false,
                    type: 'value',
                    name: '万次',
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
                name: '影响面积',
                type: 'bar',
                barWidth: '16px',
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
                            }
                        ]),
                        // barBorderRadius: 6,
                    },
                },
                data: areaData
            },
                {
                    name: '影响产量',
                    type: 'bar',
                    barWidth: '16px',
                    yAxisIndex: 1,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#FCCD4C'
                            }, {
                                offset: 1,
                                color: 'rgba(252, 205, 76, 0.2)'
                            }]),
                            // barBorderRadius: 6,
                        }

                    },
                    data: yieldData
                },
                {
                    name: "受灾次数",
                    type: "line",
                    yAxisIndex: 2, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                    smooth: false, //平滑曲线显示

                    symbol: 'circle', //标记的图形为实心圆
                    symbolSize: 8, //标记的大小
                    itemStyle: {
                        color: "#FF4C4C",
                        borderColor: "#fff",
                        borderWidth: 2,
                        shadowColor: 'rgba(0, 0, 0, .3)',
                        shadowBlur: 0,
                        shadowOffsetY: 2,
                        shadowOffsetX: 2,
                    },
                    lineStyle: {
                        normal: {
                            color: "#FF4C4C",
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 0,
                            shadowOffsetY: 5,
                            shadowOffsetX: 5,
                        },
                    },

                    data: frequencyData
                }
            ]
        };
        myChart.setOption(option);
        if(!this.timer3){
            let len = 0
            this.timer3 = setInterval(() => {
                if (len === xData.length) {
                    len = 0
                }
                myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: len,
                })
                len++
            }, 2000)
        }
    }

    getRightMidChart(data: any) {
        // console.log(data)
        let myChart = echarts.init(this.$refs.rightMidChart);
        let list: any[] = _.cloneDeep(data)
        // console.log(list)
        let xData:any[] = []

        let areaData:any[] = []
        let yieldData:any[] = []
        let frequencyData:any[] = []
        list.forEach((item:any) => {
            xData.push(item.township)
            areaData.push(item.influenceArea/10000)
            yieldData.push(item.influenceYield/10000)
            frequencyData.push(item.disasteNum/10000)
        })
        const option: any = {
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
                    endValue: 7,    //一行有几个（结束数组下标）
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
                    let unit = ['万亩','万元','万次']
                    let color = ['#62BD31','#FCCD4C']
                    val.forEach((item: any, index: number) => {

                        str += `${index == 0 || index ==1 ?'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+color[index]+'"></span>':item.marker}
                        ${item.seriesName} ：${item.value.toFixed(2)}${unit[index]}<br>`

                    })

                    return `${val[0].axisValue} <br>` + str
                }
            },
            grid: {
                left: '7%',
                right: '7   %',
                bottom: '10%',
                top: '16%',
                containLabel: false
            },
            legend: {
                itemWidth: 8,
                itemHeight: 8,
                data: [{name: '影响面积', icon: 'rect'},{name: '影响产量', icon: 'rect'}, {
                    name: '受灾次数',
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
                    name: '万亩',
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
                {
                    show:false,
                    type: 'value',
                    name: '万次',
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
                    name: '影响面积',
                    type: 'bar',
                    barWidth: '16px',
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
                                }
                            ]),
                            // barBorderRadius: 6,
                        },
                    },
                    data: areaData
                },
                {
                    name: '影响产量',
                    type: 'bar',
                    barWidth: '16px',
                    yAxisIndex: 1,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#FCCD4C'
                            }, {
                                offset: 1,
                                color: 'rgba(252, 205, 76, 0.2)'
                            }]),
                            // barBorderRadius: 6,
                        }

                    },
                    data: yieldData
                },
                {
                    name: "受灾次数",
                    type: "line",
                    yAxisIndex: 2, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                    smooth: false, //平滑曲线显示

                    symbol: 'circle', //标记的图形为实心圆
                    symbolSize: 8, //标记的大小
                    itemStyle: {
                        color: "#FF4C4C",
                        borderColor: "#fff",
                        borderWidth: 2,
                        shadowColor: 'rgba(0, 0, 0, .3)',
                        shadowBlur: 0,
                        shadowOffsetY: 2,
                        shadowOffsetX: 2,
                    },
                    lineStyle: {
                        normal: {
                            color: "#FF4C4C",
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 0,
                            shadowOffsetY: 5,
                            shadowOffsetX: 5,
                        },
                    },

                    data: frequencyData
                }
            ]
        };
        myChart.setOption(option);
    }


    back() {
        this.$router.push('/vegetable/allIndustry')
    }

    getData(res: any) {
        // console.log(res)
        if (res.key == this.apiurl.leftTop) {
            let data: any = _.cloneDeep(res.data)
            data.forEach((item: any) => {
                item.happenTime = m(item.happenTime).format("YYYY-MM-DD")
            })
            this.record = data
        } else if (res.key == this.apiurl.leftMid) {
            this.getLeftMidChart(res.data)
        } else if (res.key == this.apiurl.leftBottom) {
            this.getLeftBottomChart(res.data)
        } else if (res.key == this.apiurl.rightTop) {
            let data: any = _.cloneDeep(res.data)
            data.forEach((item: any) => {
                item.happenTime = m(item.happenTime).format("YYYY-MM-DD")
            })
            this.curtYear = data[0]
            animateValue(this.$refs.day, this.curtYear.durationDays, 600,true)
            animateValue(this.$refs.area, this.curtYear.influenceArea, 600,true)
            animateValue(this.$refs.yield, this.curtYear.productionReduction, 600,true)
            animateValue(this.$refs.money, this.curtYear.productionReductionValue, 600,true)
        } else if (res.key == this.apiurl.rightMid) {
            this.getRightMidChart(res.data)
        }else if (res.key == this.apiurl.rightBom) {
            // console.log(res.data)
            let berIcon = require('../../../assets/images/vegetable/bayberryIcon.png')
            let vegetablesIcon = require('../../../assets/images/vegetable/vegetables.png')
            let riceIcon = require('../../production/images/left1.png')
            let data: any = _.cloneDeep(res.data)
            data.forEach((item: any) => {
                if(item.type == '杨梅'){
                    item.icon = berIcon
                    item.width = '90px'
                    item.height = '75px'
                }else {
                    item.width = '90px'
                    item.height = '75px'
                }
                if(item.type == '蔬菜'){
                    item.icon = vegetablesIcon
                }
                if(item.type == '大米'){
                    item.icon = riceIcon
                }
            })
            this.typeList = data
            this.$nextTick(() => {
                let frequency:any = this.$refs.frequency
                let influenceArea:any = this.$refs.influenceArea
                let yieldSum:any = this.$refs.yieldSum
                frequency.forEach((item:any,index:number) => {
                    animateValue(item,data[index].disasteNum,600)
                })
                influenceArea.forEach((item:any,index:number) => {
                    animateValue(item,data[index].influenceArea,600)
                })
                yieldSum.forEach((item:any,index:number) => {
                    animateValue(item,data[index].influenceYield,600)
                })
            })


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
            if (key === 'rightTop') {
                params = { year: this.currentYear}
            } else {
                params = {year: this.currentYear - 1}
            }


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
        clearInterval(this.timer2)
        clearInterval(this.timer3)
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
    background-image: url('../../../assets/images/vegetable/bg.jpg');
    background-size: cover;
    padding-bottom: 110px;

    .content {
        position: relative;
        z-index: 999;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        width: 100%;
        padding: 0 35px;
        //padding-top: 120px;

        .tip {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.5);
        }

        .left {
            width: 910px;

            .leftTop {
                width: 910px;
                height: 300px;
                margin-bottom: 20px;

                .leftTopChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, .2);
                    display: flex;
                    //align-items: center;
                    flex-direction: column;

                    .leftTopChart-header {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        padding-left: 20px;
                        height: 40px;
                        background: rgba(252, 205, 76, 0.3);
                        font-size: 14px;
                        font-weight: bold;
                        color: rgba(252, 205, 76, 1);
                    }

                    .leftTopChart-cell {
                        padding-left: 20px;
                        font-size: 14px;
                        color: #FFFFFF;
                        line-height: 34px;

                        &.warn {
                            color: #FF4C4C;
                        }

                    }

                }

            }

            .leftMid {
                width: 910px;
                height: 300px;
                margin-bottom: 20px;

                .leftMidChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, .2);
                    padding-bottom: 20px;


                }
            }

            .leftBottom {
                width: 910px;
                height: 300px;
                margin-bottom: 20px;

                .leftBottomChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, .2);
                }
            }
        }


        .right {
            width: 910px;

            .rightTop {
                width: 910px;
                height: 300px;
                margin-bottom: 20px;

                .rightTopChart {
                    width: 100%;
                    height: 260px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .rightTopChart-left,.rightTopChart-right{
                        background-color: rgba(255, 255, 255, .2);
                        width: 452px;
                        height: 100%;
                        display: flex;
                        align-content: center;
                        justify-content: space-between;
                        flex-direction: column;
                        padding: 34px 0;
                    }
                    .rightTopChart-left-row{
                        display: flex;
                        align-items: center;

                        .rightTopChart-left-row-title{
                            text-align: right;
                            font-size: 16px;
                            font-weight: bold;
                            color: #FFFFFF;
                            width: 45%;
                        }
                        .rightTopChart-left-row-value{
                            width: 55%;
                            padding-left: 30px;
                            font-size: 26px;
                            font-family: YouSheBiaoTiHei;
                            color: #FCCD4C;

                        }
                    }
                }
            }

            .rightMid {
                width: 910px;
                height: 300px;
                margin-bottom: 20px;

                .rightMidChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, .2);
                    padding-bottom: 20px;

                }
            }

            .rightBottom {
                width: 910px;
                height: 300px;
                margin-bottom: 20px;

                .rightBomChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, .2);
                    padding: 20px;
                    display: flex;
                    .rightBomChart-box{
                        display: flex;
                        .rightBomChart-box-left{
                            width: 150px;
                            height: 220px;
                            background: rgba(0, 0, 0, 0.3);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex-direction: column;
                            font-size: 20px;
                            font-weight: bold;
                            color: #F6BD16;
                            line-height: 20px;
                            text-shadow: 0px 0px 20px #F6BD16;

                        }
                        .rightBomChart-box-right{
                            padding: 40px 0px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            flex-direction: column;
                            width: 295px;
                            .rightBomChart-box-right-row{
                                width: 100%;
                                display: flex;
                                align-items: center;

                                .rightBomChart-box-right-row-title{
                                    text-align: right;
                                    font-size: 16px;
                                    font-weight: bold;
                                    color: #FFFFFF;
                                    width: 45%;
                                }
                                .rightBomChart-box-right-row-value{
                                    width: 55%;
                                    padding-left: 30px;
                                    font-size: 30px;
                                    font-family: YouSheBiaoTiHei;
                                    color: #FCCD4C;

                                }
                            }
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
