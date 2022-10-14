<template>
    <div class="content">
        <bgAnim></bgAnim>
        <OneSizeContainer :width="1920" :height="1080" :maxRatio="2">
            <Head title="价格红线预警" @back="back"></Head>
            <div class="main">
                <div>
                    <selfTitle>每日价格概况</selfTitle>
                    <ul>
                        <li class="greenTitle">
                            <span>农产品名称</span>
                            <span>价格</span>
                            <span>所属乡镇</span>
                        </li>
                        <vue-seamless-scroll :data="topLeftData" :class-option="classOption" class="seamless-warp">
                            <li v-for="(item,index) in topLeftData" :key="index">
                                <span>{{item.type}}</span>
                                <span>{{item.price}}元/Kg</span>
                                <span>{{item.township}}</span>
                            </li>
                        </vue-seamless-scroll>
                    </ul>
                </div>
                <div>
                    <selfTitle>
                        当年价格预警区域分布
                        <span class="mark">（图表可左右拖动查看）</span>
                    </selfTitle>
                    <div class="chart" ref="topRightChart"></div>
                </div>
                <div>
                    <selfTitle>价格预警模块</selfTitle>
                    <ul>
                        <li class="yellowTitle">
                            <span>农产品名称</span>
                            <span>价格</span>
                            <span>所属乡镇</span>
                            <span>预警时间</span>
                            <span>预警原因</span>
                        </li>
                        <vue-seamless-scroll :data="midLeftData" :class-option="classOption" class="seamless-warp">
                            <li v-for="(item,index) in midLeftData" :key="index">
                                <span>{{item.type}}</span>
                                <span>{{item.price}}元/Kg</span>
                                <span>{{item.township}}</span>
                                <span>{{item.warnDate}}</span>
                                <span>{{item.warnReason}}</span>
                            </li>
                        </vue-seamless-scroll>
                    </ul>
                </div>
                <div>
                    <selfTitle>近1年价格预警时间分布</selfTitle>
                    <div class="chart" ref="midRightChart"></div>
                </div>
                <!-- <div>
                    <selfTitle>预警排行榜Top5</selfTitle>
                    <div class="chart" ref="bottomLeftChart"></div>
                </div>
                <div>
                    <selfTitle>
                        当年价格预警市场分布
                        <span class="mark">（图表可左右拖动查看）</span>
                    </selfTitle>
                    <div class="chart" ref="bottomRightChart"></div>
                </div> -->
            </div>
        </OneSizeContainer>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import Head from "../../components/Head/Head.vue";
import { animateValue } from "@/util";
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
        topRightChart:HTMLDivElement,
        midRightChart:HTMLDivElement,
        bottomLeftChart:HTMLDivElement,
        bottomRightChart:HTMLDivElement,
    };

    currentYear: any = m().format('YYYY')
    currentMonth: any = m().format('MM')
    currentDay: any = m().format('DD')

    apiList:any = {
        leftTop:{
            url:'/priceWarn/listPriceRecord',
            params:{
                year:this.currentYear,
                month:this.currentMonth,
                day:this.currentDay
            }
        },
        topRight:{
            url:'/priceWarn/listAreaWarn',
            params:{
                year:this.currentYear,
            }
        },
        midLeft:{
            url:'/priceWarn/listPriceWarn',
            params:{}
        },
        midRight:{
            url:'/priceWarn/listMonthWarn',
            params:{
                year:this.currentYear,
            }
        },
        bottomLeft:{
            url:'/priceWarn/listWarnRank',
            params:{
                year:this.currentYear,
            }
        },
        bottomRight:{
            url:'/priceWarn/listMarketWarn',
            params:{
                year:this.currentYear,
            }
        },
    }

    classOption: Object = {
        step: 0.2,
        limitMoveNum: 7
    };

    timeout:any = null
    timer1:any = null
    timer2:any = null

    topLeftData:any = []

    midLeftData:any = []

    getTopRightChart(xData:any,yieldValue:any) {
        let myChart = echarts.init(this.$refs.topRightChart);
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
                    val.forEach((item: any, index: number) => {
                        str += `${index == 0 ?'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#E6BB45;"></span>':item.marker}
                        ${item.seriesName} ：${item.value.toLocaleString()}次<br>`

                    })
                    return `${val[0].axisValue} <br>` + str
                }
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
                    name: '次',
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
                }
            ],
            series: [
                {
                    name: '预警次数',
                    type: 'bar',
                    barWidth: 20,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgba(230, 187, 69, 1)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(230, 187, 69, 0.3)',
                                },
                            ]),
                            label:{
                                show:true,
                                position:'top',
                                textStyle:{
                                    fontSize:16,
                                    color: '#E6BB45',
                                    fontFamily:'YouSheBiaoTiHei'
                                }
                            },
                            barBorderRadius: [12, 12, 0, 0],
                        },
                    },
                    data: yieldValue,
                }
            ]
        };
        myChart.setOption(option);
    }

    getMidRightChart(xData: any, chartdata: any) {
        let myChart = echarts.init(this.$refs.midRightChart);
        let chartdata1: any = [];
        if(chartdata && chartdata.length > 0){
            chartdata.forEach((item: any) => {
                chartdata1.push(1)
            })
        }
        let option: any = {
            textStyle: {
                color: "#c0c3cd",
                fontSize: 14
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
                        if (index===0) {
                            str += `${index == 0 ?'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#62BD31;"></span>':item.marker}
                            ${item.seriesName} ：${item.value.toLocaleString()}次<br>`
                        }
                    })
                    return `${val[0].axisValue} <br>` + str
                }
            },
            color: ["#26BF40", "rgba(38, 191, 64, 0.9)"],
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
                    name: '次',
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
                }
            ],
            series: [
                {
                    name:'预警次数',
                    data: chartdata,
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
                    symbolOffset: [0, "50%"],
                    symbolSize: [20, 10]
                },
                {
                    data: chartdata,
                    type: "pictorialBar",
                    barMaxWidth: "20",

                    symbolPosition: "end",
                    symbol: "diamond",
                    symbolOffset: [0, "-50%"],
                    symbolSize: [20, 12],
                    zlevel: 2
                }
            ]
        };
        this.$nextTick(() => {
            myChart.setOption(option);
            let len = 0
            clearInterval(this.timer1)
            this.timer1 = setInterval(() => {
                if (len === xData.length) {
                    len = 0
                }
                myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: len,
                })
                len++
            }, 3800)
        });
    }

    setBottomLeftChart(yAxisData: any, yAxisDataT: any, data: any, markPointData: any) {
        let chart = echarts.init(this.$refs.bottomLeftChart);
        let option: any = {
            color: ["#21A637"],
            grid: {
                top: "7%",
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            },
            xAxis: {
                show: false
            },
            yAxis: [
                {
                    type: "category",
                    data: yAxisData,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        color: (value: any, index: any) => {
                            return (value = "#ffffff");
                        },
                        fontSize: 14,
                        fontWeight: 400,
                        interval: 0
                        // rotate:40,//倾斜度
                    }
                },
                {
                    type: "category",
                    data: yAxisDataT,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        color: (value: any, index: any) => {
                            return (value = "#ffffff");
                        },
                        fontSize: 24,
                        fontWeight: 400,
                        fontFamily:'YouSheBiaoTiHei',
                        interval: 0
                    }
                }
            ],
            series: [
                {
                    name:'预警次数',
                    type: "bar",
                    markPoint: {
                        // symbol: 'pin',
                        data: markPointData
                    },
                    showBackground: true,
                    backgroundStyle: {
                        color: "rgba(0,0,0,0.4)"
                    },
                    barWidth: 10,
                    data: data
                }
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
                        if (index===0) {
                            str += `${index == 0 ?'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#62BD31;"></span>':item.marker}
                            ${item.seriesName} ：${item.value.toLocaleString()}次<br>`
                        }
                    })
                    return `${val[0].axisValue} <br>` + str
                }
            },
        };
        this.$nextTick(() => {
            chart.setOption(option);
            let len = 4;
            clearInterval(this.timer2);
            this.timer2 = setInterval(() => {
                if (len === 0) {
                    len = 4;
                }
                chart.dispatchAction({ type: "showTip", seriesIndex: 0, dataIndex: len }); //设置默认选中高亮部分
                len--;
            }, 3700);
        });
    }

    setBottomRightChart(xAxisData: any, data: any) {
        let chart = echarts.init(this.$refs.bottomRightChart);
        let option: any = {
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
                        if (index===0) {
                            str += `${index == 0 ?'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#DAB550;"></span>':item.marker}
                            ${item.seriesName} ：${item.value.toLocaleString()}次<br>`
                        }
                    })
                    return `${val[0].axisValue} <br>` + str
                }
            },
            xAxis: {
                type: 'category',
                data: xAxisData,
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
                    name: '次',
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
                }
            ],
            series: [
                {
                    name:'预警次数',
                    type: "pictorialBar",
                    barCategoryGap: "0%",
                    symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
                    label: {
                        show: true,
                        position: "top",
                        distance: 0,
                        color: "#DAB550",
                        fontSize: 16,
                        fontWeight: 400,
                        textShadowColor: "#000",
                        textShadowBlur: 40,
                        textShadowOffsetX: 3,
                        textShadowOffsetY: 4,
                        fontFamily: "YouSheBiaoTiHei"
                    },
                    itemStyle: {
                        normal: {
                            color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: "rgba(218, 181, 80, 0)"
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(218, 181, 80, 1)"
                                    }
                                ],
                                global: false //  缺省为  false
                            }
                        },
                        emphasis: {
                            opacity: 1
                        }
                    },
                    data: data
                }
            ]
        };
        this.$nextTick(() => {
            chart.setOption(option);
        });
    }

    back() {
        this.$router.push('/salesAnalysis/Index')
    }
    
    getData(res: any) {
        this.timeout = setTimeout(() => {
            if (res.key===this.apiList.leftTop.url) {
                this.topLeftData = res.data
            } else if(res.key===this.apiList.topRight.url) {
                let xData:any = []
                let warnNum:any = []
                res.data.forEach((item:any) => {
                    xData.push(item.township)
                    warnNum.push(item.warnNum)
                });
                this.getTopRightChart(xData,warnNum)
            } else if (res.key===this.apiList.midLeft.url) {
                res.data.forEach((item:any) => {
                    item.warnDate = m(item.warnDate).format('YYYY-MM-DD')
                });
                this.midLeftData = res.data                
            } else if (res.key===this.apiList.midRight.url) {
                let xData:any = []
                let warnNum:any = []
                res.data.forEach((item:any) => {
                    xData.push(`${item.month}月`)
                    warnNum.push(item.warnNum)
                });
                this.getMidRightChart(xData,warnNum)
            } else if (res.key===this.apiList.bottomLeft.url) {
                let yAxisData:any = []
                let yAxisDataT:any = []
                let data:any = []
                let markPointData:any = []
                res.data.forEach((item:any, index:number) => {
                    let obj = {
                        yAxis: res.data.length - (1 + index),
                        xAxis: item.warnNum,
                        symbolSize: 18,
                        symbol: "circle",
                        itemStyle: {
                            normal: {
                                color: "#FCCD4C",
                                shadowBlur: 8,
                                shadowColor: "#FCCD4C"
                            }
                        }
                    };
                    yAxisData.unshift(item.type)
                    yAxisDataT.unshift(`${item.warnNum}次`)
                    data.unshift(item.warnNum)
                    markPointData.unshift(obj)
                });
                this.setBottomLeftChart(yAxisData, yAxisDataT, data, markPointData)
            } else if (res.key===this.apiList.bottomRight.url) {
                let xAxisData:any = []
                let data:any = []
                res.data.forEach((item:any) => {
                    xAxisData.push(item.market)
                    data.push(item.warnNum)
                });
                this.setBottomRightChart(xAxisData,data)
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
        if (value.path==='/salesAnalysis/priceRedLine') {
            this.query()
        } else {
            clearInterval(this.timeout)
            clearInterval(this.timer1)
            clearInterval(this.timer2)
        }
    }

    mounted() {
        //接口调用
        if (this.$route.path==='/salesAnalysis/priceRedLine') {
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
        >div {
            width: 910px;
            height: 450px;
            margin-bottom: 20px;
            margin-right: 30px;
            ul{
                width: 100%;
                height: 410px;
                background-color: rgba(255, 255, 255, .2);
                font-size: 14px;
                li {
                    width: 100%;
                    height: 35px;
                    padding-left: 20px;
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
                    background-color: rgba(43, 217, 72, .3);
                    font-size: 14px;
                    font-weight: 700;
                    color: #2BD948;
                    height: 40px;
                }
                .yellowTitle {
                    background-color: rgba(252, 205, 76, .3);
                    font-size: 14px;
                    font-weight: 700;
                    color: #FCCD4C;
                    height: 40px;
                }
            }
            .chart {
                width: 100%;
                height: 410px;
                background-color: rgba(255, 255, 255, .2);
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
