<template>
    <div class="vegetable">

        <bgAnim></bgAnim>
        <OneSizeContainer :width="1920" :height="1080" :maxRatio="2">
            <selfHead title="生产主体统计分析" @back="back"></selfHead>
            <div class="content">
                <div class="left">
                    <div class="leftTop">
                        <selfTitle>生产主体来源类型<span class="tip">（图表可左右拖动查看）</span></selfTitle>
                        <div class="leftTopChart" ref="leftTopChart">

                        </div>
                    </div>
                    <div class="leftMid">
                        <selfTitle>生产主体区域分布<span class="tip">（图表可左右拖动查看）</span></selfTitle>
                        <div class="leftMidChart" ref="leftMidChart"></div>
                    </div>
                    <div class="leftBottom">
                        <selfTitle>生产主体注册信息</selfTitle>
                        <div class="leftBottomChart">
                            <el-row class="leftBottomChart-header">
                                <el-col :span="4">名称</el-col>

                                <el-col :span="4">地址</el-col>
                                <el-col :span="4">类型</el-col>
                                <el-col :span="4">负责人</el-col>
                                <el-col :span="4">联系电话</el-col>
                                <el-col :span="4">注册日期</el-col>
<!--                                <el-col :span="2">从业<br>总人数</el-col>-->
<!--                                <el-col :span="2">培训<br>人数</el-col>-->
<!--                                <el-col :span="2">装备<br>数量</el-col>-->
<!--                                <el-col :span="2">场地<br>面积</el-col>-->
<!--                                <el-col :span="2">雇佣<br>人数</el-col>-->
<!--                                <el-col :span="2">服务<br>人数</el-col>-->
<!--                                <el-col :span="2">收入</el-col>-->
                                <el-col :span="2">乡镇</el-col>
                            </el-row>
                            <vue-seamless-scroll :data="registerList" :class-option="classOption"
                                                 class="seamless-warp influence">
                                <el-row class="leftBottomChart-cell" v-for="(item,index) in registerList" :key="index">
                                    <el-col :span="4" :title="item.name">{{
                                            item.name
                                        }}
                                    </el-col>
                                    <el-col :span="4" :title="item.address">{{
                                            item.address
                                        }}
                                    </el-col>
                                    <el-col :span="4" :title="item.type">{{
                                            item.type
                                        }}
                                    </el-col>

                                    <el-col :span="4" :title="item.charge">{{
                                            item.person
                                        }}
                                    </el-col>
                                    <el-col :span="4" :title="item.tel">{{ item.tel }}</el-col>
                                    <el-col :span="4" :title="item.registerDate">
                                        {{ item.registerDate }}
                                    </el-col>
<!--                                    <el-col :span="2" style="max-width: 60px" :title="item.practiceTotal+'人'">-->
<!--                                        {{ item.practiceTotal }}人-->
<!--                                    </el-col>-->
<!--                                    <el-col :span="2" style="max-width: 60px" :title="item.trainTotal+'人'">-->
<!--                                        {{ item.trainTotal }}人-->
<!--                                    </el-col>-->
<!--                                    <el-col :span="2" style="max-width: 60px" :title="item.equipmentTotal+'个'">-->
<!--                                        {{ item.equipmentTotal }}个-->
<!--                                    </el-col>-->
<!--                                    <el-col :span="2" style="max-width: 60px" :title="item.siteArea+'亩'">{{-->
<!--                                            item.siteArea-->
<!--                                        }}亩-->
<!--                                    </el-col>-->
<!--                                    <el-col :span="2" style="max-width: 60px" :title="item.hireNum+'人'">{{-->
<!--                                            item.hireNum-->
<!--                                        }}人-->
<!--                                    </el-col>-->
<!--                                    <el-col :span="2" style="max-width: 60px" :title="item.serviceNum+'人'">-->
<!--                                        {{ item.serviceNum }}人-->
<!--                                    </el-col>-->
<!--                                    <el-col :span="2" style="max-width: 60px" :title="(item.income/10000)+'万元'">{{-->
<!--                                            item.income/10000-->
<!--                                        }}万元-->
<!--                                    </el-col>-->
                                    <el-col :span="2" :title="item.township">{{
                                            item.township
                                        }}
                                    </el-col>

                                </el-row>
                            </vue-seamless-scroll>
                        </div>
                    </div>
                </div>

                <div class="right">
                    <div class="rightTop">
                        <selfTitle>农产品价格趋势</selfTitle>
                        <div class="rightTopChart">
                            <el-row class="rightTopChart-header">
                                <el-col :span="6">农产品名称</el-col>
                                <el-col :span="6" style="padding-left: 40px">{{new Date().getFullYear()-3}}年<br>平均价格</el-col>
                                <el-col :span="6" style="padding-left: 40px">{{new Date().getFullYear()-2}}年<br>平均价格</el-col>
                                <el-col :span="6" style="padding-left: 40px">{{new Date().getFullYear()-1}}年<br>平均价格</el-col>
                            </el-row>
                            <vue-seamless-scroll :data="priceList" :class-option="classOption"
                                                 class="seamless-warp influence">
                                <el-row class="rightTopChart-cell" v-for="(item,index) in priceList" :key="index">
                                    <el-col :span="6">{{ item.type }}</el-col>
                                    <el-col :span="6" style="padding-left: 40px">{{ item['parice'+ (currentYear-3)] }}元/Kg</el-col>
                                    <el-col :span="6" style="padding-left: 40px">{{ item['parice'+(currentYear-2)] }}元/Kg</el-col>
                                    <el-col :span="6" style="padding-left: 40px">{{ item['parice'+(currentYear-1)] }}元/Kg</el-col>


                                </el-row>
                            </vue-seamless-scroll>
                        </div>
                    </div>
                    <div class="rightMid">
                        <selfTitle>农产品区域分布<span class="tip">（图表可左右拖动查看）</span></selfTitle>
                        <div class="rightMidChart" ref="rightMidChart"></div>
                    </div>
                    <div class="rightBottom">
                        <selfTitle>农产品类型分布<span class="tip">（图表可左右拖动查看）</span></selfTitle>
                        <div class="rightBomChart" ref="rightBomChart">

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
import selfTitle from '../vegetable/Title.vue'
import * as echarts from 'echarts';
import autoResizeMixin from "@/mixins/echarts/autoResizeMixin"
import * as socketClient from '@/views/socketClient';
import vueSeamlessScroll from "vue-seamless-scroll";
import m from "moment"
import _ from "lodash";
import {animateValue,noPassByName} from "@/util";

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
        leftTopChart: HTMLDivElement,
        leftMidChart: HTMLDivElement,
        rightMidChart: HTMLDivElement,
        rightBomChart: HTMLDivElement,
        day: HTMLDivElement,
        area: HTMLDivElement,
        yield: HTMLDivElement,
        money: HTMLDivElement,
        frequency: HTMLDivElement,
        influenceArea: HTMLDivElement,
        yieldSum: HTMLDivElement,
    }

    registerList: any[] = []
    priceList: any[] = []
    record: any[] = []
    typeList: any[] = []
    curtYear: any = {}
    currentYear: any = m().format('YYYY')

    timeout: any = null;

    classOption: Object = {
        step: 0.2,
        limitMoveNum: 6
    };
    warnOption: Object = {
        step: 0.2,
        limitMoveNum: 11
    };


    apiurl: any = {
        leftTop: '/productSubjectCount/listTypeCount',
        leftMid: '/productSubjectCount/listAreaCount',
        leftBom: '/productSubjectCount/listPsRegisterInfo',
        rightTop: '/productSubjectCount/listFarmYearPrice',
        rightBom: '/productSubjectCount/listFarmTypeCount',
    }
    getLeftTopChart(data: any) {
        // console.log(data)
        let myChart = echarts.init(this.$refs.leftTopChart);
        let list: any[] = _.cloneDeep(data)
        // console.log(list)
        let xData:any[] = []

        let numData:any[] = []
        let incomeData:any[] = []

        list.forEach((item:any) => {
            xData.push(item.type)
            numData.push(item.number)
            incomeData.push(item.income/10000)
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
                    let unit = ['个','万元']
                    let color = ['#62BD31','#FCCD4C']
                    val.forEach((item: any, index: number) => {

                        str += `${index == 0 || index ==1 ?'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+color[index]+'"></span>':item.marker}
                        ${item.seriesName} ：${item.value}${unit[index]}<br>`

                    })

                    return `${val[0].axisValue} <br>` + str
                }
            },
            grid: {
                left: '7%',
                right: '7%',
                bottom: '10%',
                top: '16%',
                containLabel: false
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
                    name: '个',
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
                    name: '数量',
                    type: 'bar',
                    barWidth: '16px',

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
                    data: numData
                },
                {
                    yAxisIndex: 1,
                    name: '收入',
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
                    data: incomeData
                },
            ]
        };
        myChart.setOption(option);
    }

    getLeftMidChart(data: any) {
        let myChart = echarts.init(this.$refs.leftMidChart);
        let list: any[] = _.cloneDeep(data)
        // console.log(list)
        let xData:any[] = []

        let numData:any[] = []
        let incomeData:any[] = []

        list.forEach((item:any) => {
            xData.push(item.township)
            numData.push(item.number)
            incomeData.push(item.income/10000)
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
                    let unit = ['个','万元']
                    let color = ['#62BD31','#FCCD4C']
                    val.forEach((item: any, index: number) => {

                        str += `${index == 0 || index ==1 ?'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+color[index]+'"></span>':item.marker}
                        ${item.seriesName} ：${item.value}${unit[index]}<br>`

                    })

                    return `${val[0].axisValue} <br>` + str
                }
            },
            grid: {
                left: '7%',
                right: '7%',
                bottom: '10%',
                top: '16%',
                containLabel: false
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
                    name: '个',
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
                    name: '数量',
                    type: 'bar',
                    barWidth: '16px',

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
                    data: numData
                },
                {
                    yAxisIndex: 1,
                    name: '收入',
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
                    data: incomeData
                },
            ]
        };
        myChart.setOption(option);
    }



    getRightMidChart(data: any) {
        let myChart = echarts.init(this.$refs.rightMidChart);
        let xData: any[] = []
        let barData: any[] = []
        let lineData: any[] = []
        let list: any[] = _.cloneDeep(data)
        list.forEach((item: any) => {
            xData.push(item.township)
            barData.push(item.totalOutput / 10000)
            lineData.push(Number(item.totalOutputValue) / 10000)
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
                        ${item.seriesName} ：${item.value.toLocaleString()}${index == 0 ? '万吨' : '万元'}<br>`

                    })

                    return `${val[0].axisValue} <br>` + str
                }
            },
            grid: {
                left: '7%',
                right: '7%',
                bottom: '10%',
                top: '16%',
                containLabel: false
            },
            legend: {
                itemWidth: 8,
                itemHeight: 8,
                left: 'center',
                top: '5%',
                textStyle: {
                    color: '#fff',
                },
                data: [{name: '产量', icon: 'rect'}, {name: '产值', icon: 'rect',}],
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
                    name: '万吨',
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
                    name: '产量',
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
                    name: '产值',
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

    getRightBottomChart(data: any) {
        // console.log(data)
        let myChart = echarts.init(this.$refs.rightBomChart);
        let xData: any[] = []
        let barData: any[] = []
        let lineData: any[] = []
        let list: any[] = _.cloneDeep(data)
        list.forEach((item: any) => {
            xData.push(item.type)
            barData.push(item.totalOutput / 10000)
            lineData.push(Number(item.totalOutputValue) / 10000)
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
                    endValue: 10,    //一行有几个（结束数组下标）
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
                        ${item.seriesName} ：${item.value.toLocaleString()}${index == 0 ? '万吨' : '万元'}<br>`

                    })

                    return `${val[0].axisValue} <br>` + str
                }
            },
            grid: {
                left: '7%',
                right: '7%',
                bottom: '10%',
                top: '16%',
                containLabel: false
            },
            legend: {
                itemWidth: 8,
                itemHeight: 8,
                left: 'center',
                top: '5%',
                textStyle: {
                    color: '#fff',
                },
                data: [{name: '产量', icon: 'rect'}, {name: '产值', icon: 'rect',}],
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
                    name: '万吨',
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
                    name: '产量',
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
                    name: '产值',
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

    back() {
        this.$router.push('/production')
    }

    getData(res: any) {
        // console.log(res)
        if (res.key == this.apiurl.leftTop) {
            this.getLeftTopChart(res.data)
        } else if (res.key == this.apiurl.leftMid) {
            this.getLeftMidChart(res.data)
            this.getRightMidChart(res.data)
        } else if (res.key == this.apiurl.leftBom) {
            let list = _.cloneDeep(res.data)
            list.forEach((item:any) => {
                item.registerDate = m(item.registerDate).format("YYYY-MM-DD")
                item.person = noPassByName(item.charge)
            })
            this.registerList = list
        } else if (res.key == this.apiurl.rightTop) {
            // console.log(res)
            let list:any [] = _.cloneDeep(res.data)
            let nameList: any[] = []
            list.forEach((item: any) => {
                nameList.push(item.type)
            })
            nameList = Array.from(new Set(nameList));
            let obj: any = {}
            nameList.forEach((item: any) => {
                obj[item] = []
            })
            list.forEach((item: any) => {
                for (const key in obj) {
                    if (item.type == key) {
                        obj[key].push(item)
                    }
                }
            })
            let dataList:any[] = []
            for (const key in obj) {
                let _obj:any = {}
                _obj.type = key
                obj[key].forEach((item:any) => {
                    _obj['parice'+item.year] = item.farmPrice
                })
                dataList.push(_obj)
            }
            this.priceList = dataList
        }  else if (res.key == this.apiurl.rightBom) {
            this.getRightBottomChart(res.data)


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
            if (key === 'leftBom') {
                params = {year: this.currentYear}
            }else if (key === 'rightTop'||key === 'leftTop'||key === 'leftMid'||key === 'rightBom') {
                let Last_month = new Date().getMonth()+1;
                Last_month = ((Last_month == 0) ? (12) : (Last_month));
                params = {year: this.currentYear,month: Last_month, day: new Date().getDate()}
            }else {
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
    background-image: url('./images/productionCountbg.jpg');
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
        /deep/ .el-col {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

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
                    padding-bottom: 15px;
                    .leftBottomChart-header {
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

                    .leftBottomChart-cell {
                        padding-left: 20px;
                        font-size: 14px;
                        color: #FFFFFF;
                        line-height: 34px;
                        display: flex;
                        &.warn {
                            color: #FF4C4C;
                        }

                    }
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
                    background-color: rgba(255, 255, 255, .2);
                    padding-bottom: 15px;
                    .rightTopChart-header {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding:0 40px;
                        height: 40px;
                        background: rgba(252, 205, 76, 0.3);
                        font-size: 14px;
                        font-weight: bold;
                        color: rgba(252, 205, 76, 1);
                    }

                    .rightTopChart-cell {
                        padding:0 40px;
                        font-size: 14px;
                        color: #FFFFFF;
                        line-height: 34px;

                        &.warn {
                            color: #FF4C4C;
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

                    .rightBomChart-box {
                        display: flex;

                        .rightBomChart-box-left {
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

                        .rightBomChart-box-right {
                            padding: 40px 0px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            flex-direction: column;
                            width: 295px;

                            .rightBomChart-box-right-row {
                                width: 100%;
                                display: flex;
                                align-items: center;

                                .rightBomChart-box-right-row-title {
                                    text-align: right;
                                    font-size: 16px;
                                    font-weight: bold;
                                    color: #FFFFFF;
                                    width: 45%;
                                }

                                .rightBomChart-box-right-row-value {
                                    width: 55%;
                                    padding-left: 30px;
                                    font-size: 26px;
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
