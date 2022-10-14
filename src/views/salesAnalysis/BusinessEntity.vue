<template>
    <div class="content">
        <bgAnim></bgAnim>
        <OneSizeContainer :width="1920" :height="1080" :maxRatio="2">
            <Head title="经营主体统计分析" @back="back"></Head>
            <div class="main">
                <div class="top">
                    <selfTitle>
                        当前区域分布
                        <span class="mark">（图表可左右拖动查看）</span>
                    </selfTitle>
                    <div class="chart" ref="topLeftChart"></div>
                </div>
                <div class="top">
                    <selfTitle>最新销售记录</selfTitle>
                    <ul>
                        <li class="greenTitle">
                            <span>经营户</span>
                            <span>农贸市场</span>
                            <span>农产品名称</span>
                            <span>成交时间</span>
                            <span>成交量</span>
                            <span>成交价格</span>
                        </li>
                        <vue-seamless-scroll :data="topData" :class-option="classOption" class="seamless-warp">
                            <li v-for="(item,index) in topData" :key="index">
                                <span>{{item.saleSubjectName}}</span>
                                <span>{{item.marketName}}</span>
                                <span>{{item.type}}</span>
                                <span>{{item.tmpDate}}</span>
                                <span>{{item.saleNum}}Kg</span>
                                <span>{{item.price}}元</span>
                            </li>
                        </vue-seamless-scroll>
                    </ul>
                </div>
                <div class="bottom">
                    <selfTitle>农产品价格趋势</selfTitle>
                    <ul>
                        <li class="yellowTitle">
                            <span>农产品名称</span>
                            <span>2019年<br>平均价格</span>
                            <span>2020年<br>平均价格</span>
                            <span>2021年<br>平均价格</span>
                        </li>
                        <vue-seamless-scroll :data="bottomData" :class-option="classOption" class="seamless-warp">
                            <li v-for="(item,index) in bottomData" :key="index">
                                <span>{{item.type}}</span>
                                <span>{{item['3farmPrice']}}元/Kg</span>
                                <span>{{item['2farmPrice']}}元/Kg</span>
                                <span>{{item['1farmPrice']}}元/Kg</span>
                            </li>
                        </vue-seamless-scroll>
                    </ul>
                </div>
                <div class="bottom">
                    <selfTitle>当前农贸市场分布Top5</selfTitle>
                    <div class="chart" ref="bottomMidChart"></div>
                </div>
                <div class="bottom">
                    <selfTitle>
                        当前销售排行榜
                        <span class="mark">（图表可左右拖动查看）</span>
                    </selfTitle>
                    <div class="chart" ref="bottomRightChart"></div>
                </div>
            </div>
        </OneSizeContainer>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import Head from "../../components/Head/Head.vue";
import { animateValue, noPassByName } from "@/util";
import * as echarts from "echarts";
import bgAnim from "@/components/bgAnim/BgAnim.vue";
import vueSeamlessScroll from "vue-seamless-scroll";
import * as socketClient from "@/views/socketClient";
import m from "moment";
import selfTitle from "./Title.vue"

@Component({
    components: {
        Head,
        bgAnim,
        vueSeamlessScroll,
        selfTitle
    }
})
export default class salesAnalysis extends Vue {
    $refs!: {
        topLeftChart:HTMLDivElement,
        bottomMidChart:HTMLDivElement,
        bottomRightChart:HTMLDivElement,
    };

    currentYear: any = m().format('YYYY')
    currentMonth: any = m().format('MM')
    currentDay: any = m().format('DD')

    apiList:any = {
        topLeft:{
            url:'/saleSubjectCount/listAreaCount',
            params:{
                year: this.currentYear
            }
        },
        topRight:{
            url:'/saleSubjectCount/listSaleRecord',
            params:{}
        },
        bottomLeft:{
            url:'/saleSubjectCount/listFarmYearPrice',
            params:{
                year: this.currentYear
            }
        },
        bottomMid:{
            url:'/saleSubjectCount/listMarketCount',
            params:{
                year: this.currentYear
            }
        },
        bottomRight:{
            url:'/saleSubjectCount/listSaleRank',
            params:{
                year: this.currentYear
            }
        },
    }

    classOption: Object = {
        step: 0.2,
        limitMoveNum: 7
    };

    timeout:any = null
    timer1:any = null

    topData:any = []
    bottomData:any = []

    getMidRightChart(xData: any, data1: any, data2: any) {
        let myChart = echarts.init(this.$refs.topLeftChart);
        let chartdata1: any = [];
        let chartdata2: any = [];
        if(data1 && data1.length > 0){
            data1.forEach((item: any) => {
                chartdata1.push(1)
            })
        }
        if(data2 && data2.length > 0){
            data2.forEach((item: any) => {
                chartdata2.push(1)
            })
        }
        let option: any = {
            textStyle: {
                color: "#c0c3cd",
                fontSize: 14
            },
            legend:{
                data:['成交笔','成交金额'],
                selectedMode:false,
                itemWidth:8,
                itemHeight:8,
                itemGap:70,
                padding:[20,0,0,0],
                textStyle:{
                    color:'#fff'
                },
            },
            dataZoom: {
                type: "inside",
                minValueSpan: 4,
                maxValueSpan: 6
            },
            grid: {
                left: '5%',
                right: '5%',
                bottom: '15%',
                top: '17%',
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
                        if (index===0||index===3) {
                            str += `${index == 0 ?'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#62BD31;"></span>':item.marker}
                            ${item.seriesName} ：${item.value.toLocaleString()}${index===0?'笔':'万元'}<br>`
                        }
                    })
                    return `${val[0].axisValue} <br>` + str
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
                    textStyle: {
                        color: '#FFFFFF',
                        fontSize: 14,
                    },
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
                    name: '笔',
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontWeight: 'bold',
                        fontSize:14,
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
                            fontSize: 14,
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                },
                {
                    type: 'value',
                    name: '万元',
                    position:'right',
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontWeight: 'bold',
                        fontSize:14,
                        padding: [0, -40, 0, 0]
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
                            fontSize: 14,
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                }
            ],
            series: [
                {
                    name:'成交笔',
                    data: data1,
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
                    data: chartdata1,
                    type: "pictorialBar",
                    barMaxWidth: "20",
                    symbol: "diamond",
                    symbolOffset: [-13, "50%"],
                    symbolSize: [20, 10],
                    color:'#26BF40'
                },
                {
                    data: data1,
                    type: "pictorialBar",
                    barMaxWidth: "20",
                    symbolPosition: "end",
                    symbol: "diamond",
                    symbolOffset: [-13, "-50%"],
                    symbolSize: [20, 12],
                    zlevel: 2,
                    color:'#26BF40'
                },
                {
                    name:'成交金额',
                    data: data2,
                    type: "bar",
                    barMaxWidth: "auto",
                    yAxisIndex:1,
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
                                    color: "#e6bb45"
                                },
                                {
                                    offset: 1,
                                    color: "rgba(230,187,69,.3)"
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
                        color: "#e6bb45",
                        shadowColor: "#fff",
                        shadowBlur: 4,
                        shadowOffsetX: 0,
                        shadowOffsetY: 4
                    }
                },
                {
                    data: chartdata2,
                    type: "pictorialBar",
                    yAxisIndex:1,
                    barMaxWidth: "20",
                    symbol: "diamond",
                    symbolOffset: [13, "50%"],
                    symbolSize: [20, 10],
                    color: "#e6bb45",
                },
                {
                    data: data2,
                    type: "pictorialBar",
                    yAxisIndex:1,
                    barMaxWidth: "20",
                    symbolPosition: "end",
                    symbol: "diamond",
                    symbolOffset: [13, "-50%"],
                    symbolSize: [20, 12],
                    zlevel: 2,
                    color: "#e6bb45",
                }
            ]
        };
        this.$nextTick(() => {
            myChart.setOption(option);
        });
    }

    getBottomMidChart(data1: any, data2: any) {
        let chart = echarts.init(this.$refs.bottomMidChart);
        let option: any = {
            title: {
                show: true,
                text: '成交笔数                                                   成交金额',
                top: 350,
                left: 110,
                textStyle: {
                    color: "#FFFFFF",
                    fontSize: 16,
                    fontWeight:400
                }
            },
            tooltip: {
                trigger: 'item',
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
                    let str: string = `${val.marker}${val.seriesName} ：${val.value.toLocaleString()}${val.seriesName==='成交笔数'?'笔':'万元'}<br>`
                    return `${val.name} <br>` + str
                }
            },
            series: [
                {
                    name: "成交笔数",
                    type: "pie",
                    radius: ["30%", "50%"],
                    center: ["25%", "45%"],
                    avoidLabelOverlap: false,
                    colorBy:'series',
                    roseType: "radius",
                    itemStyle:{
                        normal:{
                            color:function(params:any) {
                            //自定义颜色
                            var colorList = ['#2681FF', '#3AE2FF', '#FCCD4C', '#62BD31', '#E7FC92'];
                                return colorList[params.dataIndex]
                             }
                        }
                    },
                    label: {
                        show:false,
                        formatter: ["{a|{d}%}", "{b|{c}亩}"].join("\n"),
                        position: 'inner',
                        rich: {
                            a: {
                                fontSize: 22,
                                fontFamily: "YouSheBiaoTiHei",
                                fontWeight: 400,
                                color:'#fff'
                            },
                            b: {
                                fontSize: 22,
                                fontFamily: "YouSheBiaoTiHei",
                                fontWeight: 400,
                                color:'#fff'
                            }
                        }
                    },
                    labelLine: {
                        show: false,
                    },
                    data: data1
                },
                {
                    name: "成交金额",
                    type: "pie",
                    radius: ["30%", "50%"],
                    center: ["75%", "45%"],
                    avoidLabelOverlap: false,
                    roseType: "radius",
                    itemStyle:{
                        normal:{
                            color:function(params:any) {
                            //自定义颜色
                            var colorList = ['#2681FF', '#3AE2FF', '#FCCD4C', '#62BD31', '#E7FC92'];
                                return colorList[params.dataIndex]
                             }
                        }
                    },
                    title: {
                        show: true,
                        text: '种植面积占比',
                        top: 220,
                        left: 55,
                        textStyle: {
                            color: "#FFFFFF",
                            fontSize: 16,
                            fontWeight:400
                        }
                    },
                    label: {
                        show:false,
                        formatter: ["{a|{d}%}", "{b|{c}亩}"].join("\n"),
                        position: 'inner',
                        rich: {
                            a: {
                                fontSize: 24,
                                fontFamily: "YouSheBiaoTiHei",
                                fontWeight: 400,
                                color:'#fff'
                            },
                            b: {
                                fontSize: 24,
                                fontFamily: "YouSheBiaoTiHei",
                                fontWeight: 400,
                                color:'#fff'
                            }
                        }
                    },
                    labelLine: {
                        show: false,
                    },
                    data: data2
                }
            ]
        };
        this.$nextTick(() => {
            chart.setOption(option);
            let len = 0;
            clearInterval(this.timer1);
            this.timer1 = setInterval(() => {
                if (len === data1.length) {
                    len = 0;
                }
                data1.forEach((item: any, index:any) => {
                    if(index !== len) {
                        chart.dispatchAction({
                            type: "downplay",
                            seriesIndex: [0,1],
                            dataIndex: index
                        });
                    }
                })
                chart.dispatchAction({ type: "highlight", seriesIndex: [0,1], dataIndex: len }); //设置默认选中高亮部分
                chart.on("mouseover", function(e: any) {
                    if (e.dataIndex != len) {
                        data1.forEach((item: any, index:any) => {
                                chart.dispatchAction({
                                    type: "downplay",
                                    seriesIndex: [0,1],
                                    dataIndex: index
                                });
                        })
                        chart.dispatchAction({ type: "highlight", seriesIndex: [0,1], dataIndex: e.dataIndex });
                    }
                });
            
                chart.on("mouseout", function(e: any) {
                    data1.forEach((item: any, index:any) => {
                            chart.dispatchAction({
                                type: "downplay",
                                seriesIndex: [0,1],
                                dataIndex: index
                            });
                    })
                    chart.dispatchAction({ type: "highlight", seriesIndex: [0,1], dataIndex: len });
                });
                len++;
            }, 3000);
        });
    }


    getBottomRightChart(xData: any, data1: any, data2: any) {
        let myChart = echarts.init(this.$refs.bottomRightChart);
        let chartdata1: any = [];
        let chartdata2: any = [];
        if(data1 && data1.length > 0){
            data1.forEach((item: any) => {
                chartdata1.push(1)
            })
        }
        if(data2 && data2.length > 0){
            data2.forEach((item: any) => {
                chartdata2.push(1)
            })
        }
        let option: any = {
            textStyle: {
                color: "#c0c3cd",
                fontSize: 14
            },
            legend:{
                data:['累计采购量（吨）','累计采购金额（万元）'],
                selectedMode:false,
                itemWidth:8,
                itemHeight:8,
                itemGap:70,
                padding:[20,0,0,0],
                textStyle:{
                    color:'#fff'
                },
            },
            dataZoom: {
                type: "inside",
                minValueSpan: 4,
                maxValueSpan: 6
            },
            grid: {
                left: '8%',
                right: '8%',
                bottom: '15%',
                top: '17%',
            },
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
                    value[0].data.params.ssSaleRanks.forEach((item:any) => {
                        str += `<li style="position: relative;display:flex;height:20px;line-height:20px;">
                                    <span style="flex:1;">${item.type}</span>
                                    <span style="flex:1;">${item.saleNum}（吨）</span>
                                    <span style="flex:1;">${item.turnover}万元</span>
                                </li>`
                    });
                    let res = 
                        `<div style="width:450px;background-color:rgba(0, 0, 0, .5);margin:-10px;padding:10px;border-radius:5px;">
                            <div style="width:100%;display:flex;">
                                <span style="flex:1;">${value[0].name}</span>
                                <span style="flex:1;">${value[0].data.params.township}</span>
                                <span style="flex:1;">${value[0].data.params.marketName}</span>
                            </div>
                            <br>
                            <div style="width:100%;display:flex;">
                                <span style="flex:1;">农产品类型</span>
                                <span style="flex:1;">累计采购量（吨）</span>
                                <span style="flex:1;">累计采购金额（万元）</span>
                            </div>
                            <ul style="margin-top:10px;">
                                ${str}
                            <ul>
                        </div>`
                    return res
                },
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
                    textStyle: {
                        color: '#FFFFFF',
                        fontSize: 14,
                    },
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
                    name: '吨',
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontWeight: 'bold',
                        fontSize:14,
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
                            fontSize: 14,
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                },
                {
                    type: 'value',
                    name: '万元',
                    position:'right',
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontWeight: 'bold',
                        fontSize:14,
                        padding: [0, -40, 0, 0]
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
                            fontSize: 14,
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                }
            ],
            series: [
                {
                    name:'累计采购量（吨）',
                    data: data1,
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
                    data: chartdata1,
                    type: "pictorialBar",
                    barMaxWidth: "20",
                    symbol: "diamond",
                    symbolOffset: [-13, "50%"],
                    symbolSize: [20, 10],
                    color:'#26BF40'
                },
                {
                    data: data1,
                    type: "pictorialBar",
                    barMaxWidth: "20",
                    symbolPosition: "end",
                    symbol: "diamond",
                    symbolOffset: [-13, "-50%"],
                    symbolSize: [20, 12],
                    zlevel: 2,
                    color:'#26BF40'
                },
                {
                    name:'累计采购金额（万元）',
                    data: data2,
                    type: "bar",
                    barMaxWidth: "auto",
                    yAxisIndex:1,
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
                                    color: "#e6bb45"
                                },
                                {
                                    offset: 1,
                                    color: "rgba(230,187,69,.3)"
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
                        color: "#e6bb45",
                        shadowColor: "#fff",
                        shadowBlur: 4,
                        shadowOffsetX: 0,
                        shadowOffsetY: 4
                    }
                },
                {
                    data: chartdata2,
                    type: "pictorialBar",
                    yAxisIndex:1,
                    barMaxWidth: "20",
                    symbol: "diamond",
                    symbolOffset: [13, "50%"],
                    symbolSize: [20, 10],
                    color: "#e6bb45",
                },
                {
                    data: data2,
                    type: "pictorialBar",
                    yAxisIndex:1,
                    barMaxWidth: "20",
                    symbolPosition: "end",
                    symbol: "diamond",
                    symbolOffset: [13, "-50%"],
                    symbolSize: [20, 12],
                    zlevel: 2,
                    color: "#e6bb45",
                }
            ]
        };
        this.$nextTick(() => {
            myChart.setOption(option);
        });
    }

    back() {
        this.$router.push('/salesAnalysis/Index')
    }
    
    getData(res: any) {
        this.timeout = setTimeout(() => {
            if (res.key===this.apiList.topLeft.url) {
                let township:any = []
                let saleNum:any = []
                let turnover:any = []
                res.data.forEach((item:any) => {
                    township.push(item.township)
                    saleNum.push(item.saleNum)
                    turnover.push(item.turnover)
                });
                this.getMidRightChart(township,saleNum,turnover)
            } else if (res.key===this.apiList.topRight.url) {
                res.data.forEach((item:any) => {
                    item.tmpDate = m(item.tmpDate).format('YYYY-MM-DD')
                    item.saleSubjectName = noPassByName(item.saleSubjectName)
                });
                this.topData = res.data
            } else if (res.key===this.apiList.bottomLeft.url) {
                let arr:any = []
                res.data.forEach((item:any) => {
                    let flag = false
                    let num = 0
                    arr.forEach((element:any,index:number)=>{
                        if (element.type===item.type) {
                            flag = true
                            num = index
                        }
                    })
                    if (flag) {
                        this.$set(arr[num],`${this.currentYear-item.year}farmPrice`,item.farmPrice)
                    } else {
                        arr.push({type:item.type})
                        this.$set(arr[arr.length-1],`${this.currentYear-item.year}farmPrice`,item.farmPrice)
                    }
                });
                this.bottomData = arr
            } else if (res.key===this.apiList.bottomMid.url) {
                let saleNum:any = []
                let turnover:any = []
                res.data.forEach((item:any) => {
                    saleNum.push({name:item.marketName,value:item.saleNum})
                    turnover.push({name:item.marketName,value:item.turnover})
                });
                this.getBottomMidChart(saleNum,turnover)
            } else if (res.key===this.apiList.bottomRight.url) {
                let xData:any = []
                let data1:any = []
                let data2:any = []
                res.data.forEach((item:any) => {
                    xData.push(noPassByName(item.saleSubjectName))
                    data1.push({value:item.saleNumSum,params:item})
                    data2.push(item.turnoverSum)
                })
                this.getBottomRightChart(xData, data1, data2)
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
        if (value.path==='/salesAnalysis/businessEntity') {
            this.query()
        } else {
            clearInterval(this.timeout)
        }
    }

    mounted() {
        //接口调用
        if (this.$route.path==='/salesAnalysis/businessEntity') {
            this.query()
        }
    }
}
</script>

<style scoped lang="scss">
.content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: url("../../assets/images/salesAnalysis/bg.jpg") no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
    .main {
        width: 100%;
        display: flex;
        padding-left: 30px;
        flex-wrap: wrap;
        align-content: flex-start;
        overflow: hidden;
        .top {
            width: 910px;
            height: 460px;
            margin-bottom: 20px;
            &:nth-child(1) {
                margin-right: 40px;
            }
        }
        .bottom {
            width: 600px;
            height: 460px;
            margin-right: 30px;
        }
        >div {
            .chart {
                width: 100%;
                height: 420px;
                background-color: rgba(255, 255, 255, .2);
            }
            ul{
                width: 100%;
                height: 420px;
                background-color: rgba(255, 255, 255, .2);
                font-size: 14px;
                li {
                    width: 100%;
                    height: 35px;
                    padding-left: 40px;
                    color: #fff;
                    line-height: 35px;
                    display: flex;
                    span {
                        flex: 1;
                        margin-right: 12px;
                        vertical-align: middle;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                }
                .greenTitle {
                    background-color: rgba(98, 189, 49, .3);
                    font-size: 14px;
                    font-weight: 700;
                    color: #6FD638;
                    height: 40px;
                }
                .yellowTitle {
                    background-color: rgba(252, 205, 76, .3);
                    font-size: 14px;
                    font-weight: 700;
                    color: #FCCD4C;
                    height: 40px;
                    line-height: 20px;
                    span {
                        &:nth-child(1) {
                            line-height: 40px;
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
