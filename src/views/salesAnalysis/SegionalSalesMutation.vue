<template>
    <div class="content">
        <bgAnim></bgAnim>
        <OneSizeContainer :width="1920" :height="1080" :maxRatio="2">
            <Head title="区域销量突变预警" @back="back"></Head>
            <div class="main">
                <!-- 第一排 -->
                <el-row class="mapList" :gutter="30">
                    <el-col :span="8" class="item">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">每日农产品成交概况</p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-item">
                                <el-row class="chart-tr" style="background-color: rgba(252, 205, 76, 0.3);">
                                    <el-col :span="6" class="chart-tr-title">农产品名称</el-col>
                                    <el-col :span="6" class="chart-tr-title">总成交笔数</el-col>
                                    <el-col :span="6" class="chart-tr-title">总成交金额</el-col>
                                    <el-col :span="6" class="chart-tr-title">所属乡镇</el-col>
                                </el-row>
                                <vue-seamless-scroll
                                    :data="salesRecordList"
                                    :class-option="classOption"
                                    class="seamless-warp"
                                >
                                    <el-row class="chart-th" v-for="(item, index) in salesRecordList" :key="index">
                                        <!-- <el-col :span="6" class="chart-th-item">{{ item.type || "-" }}</el-col> -->
                                        <el-col
                                          :span="6" 
                                          class="chart-th-item"
                                          :style="{textShadow: item.type === '糯米山药'? '1px 1px 0px #ffffff':'none'}">
                                            {{ item.type || "-" }}
                                        </el-col>
                                        <el-col :span="6" class="chart-th-item">
                                            {{ item.transactCount || "-" }}笔
                                        </el-col>
                                        <el-col :span="6" class="chart-th-item">{{ item.turnover || "-" }}万元</el-col>
                                        <el-col :span="6" class="chart-th-item">{{ item.township || "-" }}</el-col>
                                    </el-row>
                                </vue-seamless-scroll>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="16" class="item">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">
                                    当前价格预警区域分布
                                    <span class="titleSpan">（可滚动缩放左右拖动查看）</span>
                                </p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-right"><div ref="midTop" class="echart"></div></div>
                        </div>
                    </el-col>
                  <!--  <el-col :span="8" class="item">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">
                                    当年价格预警市场分布
                                    <span class="titleSpan">（可滚动缩放左右拖动查看）</span>
                                </p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-right"><div ref="rightTop" class="echart"></div></div>
                        </div>
                    </el-col> -->
                </el-row>
                <!-- 第二排 -->
                <el-row class="mapList" :gutter="30">
                    <el-col :span="8" class="item">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">最新区域销量预警</p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-item">
                                <el-row class="chart-tr" style="background-color: rgba(255, 102, 102, 0.3);">
                                    <el-col :span="4" class="chart-tr-title tr-bottom">农产品名称</el-col>
                                    <el-col :span="4" class="chart-tr-title tr-bottom">总成交笔数</el-col>
                                    <el-col :span="4" class="chart-tr-title tr-bottom">总成交金额</el-col>
                                    <el-col :span="4" class="chart-tr-title tr-bottom">所属乡镇</el-col>
                                    <el-col :span="4" class="chart-tr-title tr-bottom">预警时间</el-col>
                                    <el-col :span="4" class="chart-tr-title tr-bottom">预警原因</el-col>
                                </el-row>
                                <vue-seamless-scroll
                                    :data="saleWarnList"
                                    :class-option="classOption1"
                                    class="seamless-warp"
                                >
                                    <el-row class="chart-th chart-padding" v-for="(item, index) in saleWarnList" :key="index">
                                        <!-- <el-col :span="4" class="chart-th-item">{{ item.type || "-" }}</el-col> -->
                                        <el-col
                                          :span="4" 
                                          class="chart-th-item"
                                          :style="{textShadow: item.type === '糯米山药'? '1px 1px 0px #ffffff':'none'}">
                                            {{ item.type || "-" }}
                                        </el-col>
                                        <el-col :span="4" class="chart-th-item">
                                            {{ item.transactCount || "-" }}笔
                                        </el-col>
                                        <el-col :span="4" class="chart-th-item">{{ item.turnover || "-" }}万元</el-col>
                                        <el-col :span="4" class="chart-th-item">{{ item.township || "-" }}</el-col>
                                        <el-col :span="4" class="chart-th-item">{{ item.warnDate || "-" }}</el-col>
                                        <el-col :span="4" class="chart-th-item">{{ item.warnReason || "-" }}</el-col>
                                    </el-row>
                                </vue-seamless-scroll>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8" class="item">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">预警排行榜Top5</p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-right"><div ref="midBottom" class="echart"></div></div>
                        </div>
                    </el-col>
                    <el-col :span="8" class="item">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">近1年销量时间分布</p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-right"><div ref="rightBottom" class="echart"></div></div>
                        </div>
                    </el-col>
                </el-row>
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

@Component({
    components: {
        Head,
        bgAnim,
        vueSeamlessScroll
    }
})
export default class salesAnalysis extends Vue {
    $refs!: {
        midBottom: any;
        // rightTop: any;
        midTop: any;
        rightBottom: any;
    };

    screenWidth: string = "";

    timer: any = false;

    lastMonth: number = Number(m().format("MM")) - 1;

    timer0: any = null;
    timer1: any = null;
    timer2: any = null;
    timer3: any = null;
    timer4: any = null;
    timer5: any = null;

    apiKeyList: any = [
        {
            //昨日农产品成交概况
            path: "/areaSaleWarn/listSalesRecord",
            params: {
                year: m().format("YYYY"),
                month: m().format("MM"),
                day: m().format("DD")
            }
        },
        {
            //价格预警区域分布(当年)
            path: "/areaSaleWarn/listAreaWarn",
            params: {
                year: m().format("YYYY")
            }
        },
        // {
        //     //销量预警市场分布(当年)
        //     path: "/areaSaleWarn/listMarketWarn",
        //     params: {
        //         year: m().format("YYYY")
        //     }
        // },
        {
            //最新区域销量预警
            path: "/areaSaleWarn/listSaleWarn",
            params: {
                year: m().format("YYYY")
            }
        },
        {
            // 预警排行榜(当年)
            path: "/areaSaleWarn/listWarnRank",
            params: {
                year: m().format("YYYY")
            }
        },
        {
            // 销量预警时间分布(去年)
            path: "/areaSaleWarn/listMonthWarn",
            params: {
                year: m().format("YYYY")
            }
        }
    ];

    form: any = {};

    classOption: Object = {
        step: 0.2,
        limitMoveNum: 11
    };
    
    classOption1: Object = {
        step: 0.2,
        limitMoveNum: 9
    };

    salesRecordList: any = [];

    saleWarnList: any = [];

    //当前价格预警区域分布
    setMidTopChart(xAxisData: any, data: any) {
        let chart = echarts.init(this.$refs.midTop);
        let option: any = {
            grid: {
                top: "15%",
                left: "3%",
                right: "6%",
                bottom: "5%",
                containLabel: true
            },
            xAxis: {
                type: "category",
                data: xAxisData,
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
                }
            },
            yAxis: {
                type: "value",
                name: "次",
                axisLabel: {
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 14
                },
                nameTextStyle: {
                    padding: [0, 40, 0, 0],
                    color: "#BAB5B5"
                },
                axisTick: {
                    lineStyle: {
                        color: "#668092",
                        width: 1
                    },
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "rgba(255,255,255,0.3)",
                        type: "dashed"
                    }
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        width: 1
                    }
                }
            },
            tooltip: {
                show: true,
                formatter: (data: any) => {
                    let res =
                        `<span style="display:inline-block;margin-right:4px;
                        border-radius:10px;width:10px;height:10px;
                        background-color:rgba(98, 189, 49, 1);"></span>` +
                        data.name +
                        "<br/>" +
                        `<span style="display:inline-block;margin-right:4px;
                        border-radius:10px;width:10px;height:10px;
                        background-color:rgba(98, 189, 49, 0);"></span>` +
                        data.name +
                        "：" +
                        data.value;
                    return res;
                },
                backgroundColor: "rgba(3,3,3,0.5)",
                borderWidth: 0,
                textStyle: {
                    color: "#ffffff",
                    fontSize: "14"
                }
            },
            dataZoom: {
                type: "inside",
                minValueSpan: 7,
                maxValueSpan: 7
            },
            series: [
                {
                    data: data,
                    type: "bar",
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
                                    color: "rgba(98, 189, 49, 0.2)"
                                },
                                {
                                    offset: 1,
                                    color: "rgba(98, 189, 49, 1)"
                                }
                            ]
                        },
                        barBorderRadius: [10, 10, 0, 0]
                    },
                    label: {
                        show: true,
                        fontSize: 16,
                        fontWeight: 400,
                        fontFamily: "YouSheBiaoTiHei",
                        color: "#62BD31",
                        position: "top" //在上方显示
                    },
                    barMaxWidth: "auto",
                    barWidth: 20
                }
            ]
        };
        this.$nextTick(() => {
            chart.setOption(option);
            // let len = 0;
            // clearInterval(this.timer2);
            // this.timer2 = setInterval(() => {
            //     if (len === xAxisData.length) {
            //         len = 0;
            //     }
            //     chart.dispatchAction({ type: "showTip", seriesIndex: 0, dataIndex: len }); //设置默认选中高亮部分
            //     len++;
            // }, 3000);
        });
    }

    //近1年销量时间分布
    setRightBottomChart(xAxisData: any, farmCountData: any) {
        let chart = echarts.init(this.$refs.rightBottom);
        let option: any = {
            grid: {
                top: "15%",
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            },
            xAxis: {
                data: xAxisData,
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: "rgba(255, 129, 109,.1)",
                        width: 1 //这里是为了突出显示加上的
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "#fff",
                        fontSize: 14
                    },
                    interval: 0
                    // rotate:40,//倾斜度
                }
            },
            yAxis: [
                {
                    type: "value",
                    name: "销量（吨）",
                    nameLocation: "end",
                    nameTextStyle: {
                        padding: [0, 40, 0, 0],
                        color: "#BAB5B5"
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "rgba(255, 129, 109, 0.1)",
                            width: 1 //这里是为了突出显示加上的
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: "#999",
                            fontSize: 14
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: "rgba(255,255,255,.5)"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: "dashed",
                            color: "#ffffff",
                            opacity: 0.5
                        }
                    }
                }
            ],
            // dataZoom: {
            //     type: "inside",
            //     minValueSpan: 3,
            //     maxValueSpan: 3
            // },
            series: [
                {
                    type: "pictorialBar",
                    barCategoryGap: "0%",
                    symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
                    label: {
                        show: true,
                        position: "top",
                        distance: 0,
                        color: "#43D1C5",
                        fontSize: 16,
                        fontWeight: 400,
                        textShadowColor: "#000",
                        textShadowBlur: 40,
                        textShadowOffsetX: 3,
                        textShadowOffsetY: 4,
                        fontFamily: "YouSheBiaoTiHei"
                    },
                    barWidth: 30,
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
                                        color: "rgba(67, 209, 197, 0)"
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(67, 209, 197, 1)"
                                    }
                                ],
                                global: false //  缺省为  false
                            }
                        },
                        emphasis: {
                            opacity: 1
                        }
                    },
                    data: farmCountData
                }
            ]
        };
        this.$nextTick(() => {
            chart.setOption(option);
            // let len = 0;
            // clearInterval(this.timer1);
            // this.timer1 = setInterval(() => {
            //     if (len === xAxisData.length) {
            //         len = 0;
            //     }
            //     chart.dispatchAction({ type: "showTip", seriesIndex: 0, dataIndex: len }); //设置默认选中高亮部分
            //     len++;
            // }, 3000);
        });
    }

    //预警排行榜Top5
    setMidBottomChart(yAxisData: any, yAxisDataT: any, data: any, toolTipData: any) {
        let chart = echarts.init(this.$refs.midBottom);
        let option: any = {
            color: ["#FC924C"],
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
                        fontSize: 14,
                        fontWeight: 400,
                        interval: 0
                        // rotate:40,//倾斜度
                    }
                }
            ],
            series: [
                {
                    type: "bar",
                    showBackground: true,
                    backgroundStyle: {
                        color: "rgba(0,0,0,0.4)"
                    },
                    barWidth: 20,
                    data: data
                }
            ],
            tooltip: {
                trigger: "axis",
                axisPointer: {
                    type: "shadow"
                },
                formatter: (data: any) => {
                    // console.log(data)
                    let res: string = `<p style="font-size: 16px">${data[0].marker}${data[0].name}</p>` + '<br />' +
                                      `<p style="display: flex; width: 240px; justify-content: space-between; align-items: center; margin-bottom: 5px">
                                              <span style="font-size: 12px">合作社</span>
                                              <span style="font-size: 12px">预警次数</span>
                                        </p>`
                    toolTipData[data[0].dataIndex].forEach((item: any, index: number) => {
                        res +=  `<p style="display: flex; width: 240px; justify-content: space-between; align-items: center; margin-bottom: 5px">
                                       <span style="font-size: 12px">${item.cooperative}</span>
                                       <span style="font-size: 12px">${item.warnNumSum}次</span>
                                </p>`
                               ;
                    });
                    return res;
                },
                backgroundColor: "rgba(3,3,3,0.5)",
                borderWidth: 0,
                textStyle: {
                    color: "#ffffff",
                    fontSize: "14"
                }
            }
        };
        this.$nextTick(() => {
            chart.setOption(option);
            if(!this.timer4) {
                let len = yAxisData.length - 1;
                // clearInterval(this.timer4);
                this.timer4 = setInterval(() => {
                    if (len < 0) {
                        len = yAxisData.length - 1;
                    }
                    chart.dispatchAction({ type: "showTip", seriesIndex: 0, dataIndex: len }); //设置默认选中高亮部分
                    len--;
                }, 2500);
            }
        });
    }

    //当年价格预警市场分布
    // setRightTopChart(categoryData: any, chartdata: any) {
    //     let chart = echarts.init(this.$refs.rightTop);
    //     let chartdata1: any = [];
    //     if (chartdata && chartdata.length > 0) {
    //         chartdata.forEach((item: any) => {
    //             chartdata1.push(1);
    //         });
    //     }
    //     let option: any = {
    //         textStyle: {
    //             color: "#c0c3cd",
    //             fontSize: 14
    //         },
    //         toolbox: {
    //             show: false,
    //             feature: {
    //                 saveAsImage: {
    //                     backgroundColor: "#031245"
    //                 },
    //                 restore: {}
    //             },
    //             iconStyle: {
    //                 borderColor: "#c0c3cd"
    //             }
    //         },
    //         legend: {
    //             // top: 10,
    //             // itemWidth: 8,
    //             // itemHeight: 8,
    //             icon: "circle",
    //             left: "center",
    //             padding: 0,
    //             textStyle: {
    //                 color: "#c0c3cd",
    //                 fontSize: 14,
    //                 padding: [2, 0, 0, 0]
    //             }
    //         },
    //         color: ["#e6bb45", "rgba(218, 181, 80, 0.9)"],
    //         grid: {
    //             top: "10%",
    //             left: "3%",
    //             right: "4%",
    //             bottom: "3%",
    //             containLabel: true
    //         },
    //         dataZoom: {
    //             type: "inside",
    //             minValueSpan: 4,
    //             maxValueSpan: 6
    //         },
    //         xAxis: {
    //             axisLabel: {
    //                 color: "#ffffff",
    //                 fontSize: 14,
    //                 interval: 0
    //             },
    //             axisTick: {
    //                 show: false,
    //                 lineStyle: {
    //                     color: "#384267",
    //                     width: 1
    //                 }
    //             },
    //             splitLine: {
    //                 show: false
    //             },
    //             axisLine: {
    //                 lineStyle: {
    //                     color: "#335971"
    //                 },
    //                 show: false
    //             },
    //             data: categoryData,
    //             type: "category"
    //         },
    //         yAxis: {
    //             axisLabel: {
    //                 color: "rgba(255,255,255,0.5)",
    //                 fontSize: 14
    //             },
    //             axisTick: {
    //                 lineStyle: {
    //                     color: "#668092",
    //                     width: 1
    //                 },
    //                 show: false
    //             },
    //             splitLine: {
    //                 show: true,
    //                 lineStyle: {
    //                     color: "rgba(255,255,255,0.3)",
    //                     type: "dashed"
    //                 }
    //             },
    //             axisLine: {
    //                 show: false,
    //                 lineStyle: {
    //                     // color: '#333',
    //                     width: 1
    //                     // "type": "dashed"
    //                 }
    //                 // show: true,
    //             },
    //             type: "value",
    //             name: "次",
    //             nameLocation: "end",
    //             nameTextStyle: {
    //                 padding: [0, 40, 0, 0],
    //                 color: "#BAB5B5"
    //             }
    //         },
    //         series: [
    //             {
    //                 data: chartdata,
    //                 type: "bar",
    //                 barMaxWidth: "auto",
    //                 barWidth: 20,
    //                 itemStyle: {
    //                     color: {
    //                         x: 0,
    //                         y: 1,
    //                         x2: 0,
    //                         y2: 0,
    //                         type: "linear",
    //                         colorStops: [
    //                             {
    //                                 offset: 0,
    //                                 color: "#e6bb45"
    //                             },
    //                             {
    //                                 offset: 1,
    //                                 color: "rgba(218, 181, 80, 0.3)"
    //                             }
    //                         ]
    //                     }
    //                 },
    //                 label: {
    //                     show: true,
    //                     position: "top",
    //                     distance: 10,
    //                     // color: '#fff',
    //                     fontSize: 16,
    //                     fontFamily: "YouSheBiaoTiHei",
    //                     fontWeight: 400,
    //                     color: "#e6bb45",
    //                     shadowColor: "#fff",
    //                     shadowBlur: 4,
    //                     shadowOffsetX: 0,
    //                     shadowOffsetY: 4
    //                 }
    //             },
    //             {
    //                 data: chartdata1,
    //                 type: "pictorialBar",
    //                 barMaxWidth: "20",
    //                 symbol: "diamond",
    //                 symbolOffset: [0, "50%"],
    //                 symbolSize: [20, 10]
    //             },
    //             {
    //                 data: chartdata,
    //                 type: "pictorialBar",
    //                 barMaxWidth: "20",

    //                 symbolPosition: "end",
    //                 symbol: "diamond",
    //                 symbolOffset: [0, "-50%"],
    //                 symbolSize: [20, 12],
    //                 zlevel: 2
    //             }
    //         ],
    //         tooltip: {
    //             show: true,
    //             formatter: (data: any) => {
    //                 let res = data.marker + data.name + "：" + data.value + "次";
    //                 return res;
    //             },
    //             backgroundColor: "rgba(3,3,3,0.5)",
    //             borderWidth: 0,
    //             textStyle: {
    //                 color: "#ffffff",
    //                 fontSize: "14"
    //             }
    //         }
    //     };
    //     this.$nextTick(() => {
    //         chart.setOption(option);
    //         // let len = 0;
    //         // clearInterval(this.timer5);
    //         // this.timer5 = setInterval(() => {
    //         //     // if (len === categoryData.length) {
    //         //     //     len = 0;
    //         //     // }
    //         //     if (len === 100) {
    //         //         len = 0;
    //         //     }
    //         //     chart.dispatchAction({ type: "dataZoom", start: len, end: len + 20});
    //         //     len = len + 20;
    //         // }, 3000);
    //     });
    // }

    getData(data: any) {
        setTimeout(() => {
            console.log(data, 111);
            let xAxisData: any = [],
                yAxisData: any = [],
                valueData: any = [],
                toolTipData: any = [];
            switch (data.key) {
                case "/areaSaleWarn/listSalesRecord": //昨日农产品成交概况
                    data.data.forEach((item: any) => {
                        item.turnover = parseFloat((item.turnover / 10000).toFixed(4));
                    });
                    this.$nextTick(() => {
                        this.salesRecordList = data.data;
                    });
                    break;
                case "/areaSaleWarn/listAreaWarn": //价格预警区域分布(当年)
                    data.data.forEach((item: any) => {
                        xAxisData.push(item.township);
                        valueData.push(item.warnNum);
                    });
                    this.$nextTick(() => {
                        this.setMidTopChart(xAxisData, valueData);
                    });
                    break;
                // case "/areaSaleWarn/listMarketWarn": //销量预警市场分布(当年)
                //     data.data.forEach((item: any, index: number) => {
                //         xAxisData.push(item.market);
                //         valueData.push(item.warnNum);
                //     });
                //     this.$nextTick(() => {
                //         this.setRightTopChart(xAxisData, valueData);
                //     });
                //     break;
                case "/areaSaleWarn/listSaleWarn": //最新区域销量预警
                    data.data.forEach((item: any, index: number) => {
                        item.turnover = parseFloat((item.turnover / 10000).toFixed(4));
                        item.warnDate = m(item.warnDate).format("YYYY-MM-DD");
                    });
                    this.$nextTick(() => {
                        this.saleWarnList = data.data;
                    });
                    break;
                case "/areaSaleWarn/listWarnRank": //预警排行榜(当年)
                    data.data.forEach((item: any, index: number) => {
                        yAxisData.unshift(item.township);
                        xAxisData.unshift(item.warnNumSum + "次");
                        valueData.unshift(item.warnNumSum);
                        toolTipData.unshift(item.cooperativeWarnVos);
                    });
                    this.$nextTick(() => {
                        this.setMidBottomChart(yAxisData, xAxisData, valueData, toolTipData);
                    });
                    break;
                case "/areaSaleWarn/listMonthWarn": //销量预警时间分布(去年)
                    data.data.forEach((item: any, index: number) => {
                        xAxisData.push(item.month + '月');
                        valueData.push(item.saleCount);
                    });
                    this.$nextTick(() => {
                        this.setRightBottomChart(xAxisData, valueData);
                    });
                    break;
            }
        }, 300);
    }

    getParams(index: number) {
        //拼接查询条件
        return () => {
            return this.apiKeyList[index] && this.apiKeyList[index].params ? this.apiKeyList[index].params : {};
        };
    }

    back() {
        // this.$router.go(-1);
        this.$router.push('index');
    }

    mounted() {
        // const that = this;
        // window.onresize = () => {
        //     return (() => {
        //         window.screenWidth = document.body.clientWidth;
        //         that.screenWidth = window.screenWidth;
        //     })();
        // };
        //添加回调
        this.apiKeyList.forEach((item: any, index: number) => {
            socketClient.addCallBack(item.path, this.getData);
            socketClient.addSend(item.path, this.getParams(index));
        });
        setTimeout(() => {
            socketClient.sendAll();
        }, 800);
    }

    beforeDestroy() {
        //清除回调
        this.apiKeyList.forEach((item: any) => {
            socketClient.delCallBack(item.path);
            socketClient.delSend(item.path);
        });
        // clearInterval(this.timer0);
        // clearInterval(this.timer1);
        // clearInterval(this.timer2);
        // clearInterval(this.timer3);
        clearInterval(this.timer4);
        // clearInterval(this.timer5);
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
.main {
    padding: 0 30px;
}
.mapList {
    margin-bottom: 20px;
    .item {
        // background: #FFFFFF;
        // opacity: 0.2;
    }
    .title {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        .title-right {
            height: 35px;
            width: calc(100% - 10px);
            display: flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.2);
        }
        .icon-head {
            content: "";
            width: 5px;
            height: 35px;
            object-fit: cover;
            margin-right: 5px;
            background: #ffffff;
            opacity: 0.4;
            display: inline-block;
        }
        @keyframes imageAnimation_2685 {
            0% {
                opacity: 1;
                transform: none;
            }
            25% {
                opacity: 1;
                transform: none;
            }
            50% {
                opacity: 0.2;
                transform: none;
            }
            75% {
                opacity: 1;
                transform: none;
            }
            100% {
                opacity: 1;
                transform: none;
            }
        }
        .image-icon {
            border-radius: unset;
            cursor: pointer;
            pointer-events: auto;
            animation-name: imageAnimation_2685;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            animation-duration: 2s;
            animation-delay: 0s;
            -webkit-user-drag: none;
            filter: none;
        }
        .title-text {
            // padding: 7px;
            font-size: 20px;
            font-family: Source Han Sans SC;
            font-weight: bold;
            color: #ffffff;
            text-shadow: 0px 0px 20px rgba(255, 255, 255, 0.5);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .titleSpan {
            font-size: 12px;
            font-family: Source Han Sans SC;
            font-weight: 400;
            color: #ffffff;
            opacity: 0.5;
        }
    }
    .chart {
        background: rgba(255, 255, 255, 0.2);
        height: 420px;
        width: 100%;
        // padding: 20px 0;
        display: flex;
        .chart-item {
            width: 100%;
            height: 100%;
        }
        .echart {
            height: 420px;
            width: 100%;
        }
        .chart-left {
            flex: 1;
            display: flex;
            flex-flow: column;
            justify-content: space-around;
            align-items: center;
            padding: 20px;
            padding-left: 30px;
            .marketQuantity {
                display: flex;
                flex-flow: column;
                justify-content: center;
                align-items: center;
                width: 100%;
                border-bottom: 1px solid rgba(255, 255, 255, 0.4);
                padding-bottom: 30px;
                .num {
                    font-size: 40px;
                    font-family: YouSheBiaoTiHei;
                    font-weight: 400;
                    color: #fccd4c;
                }
                .text {
                    font-size: 16px;
                    font-family: Source Han Sans SC;
                    font-weight: 400;
                    color: #ffffff;
                }
            }
            .operating {
                display: flex;
                flex-flow: column;
                justify-content: center;
                align-items: center;
                .num {
                    font-size: 40px;
                    font-family: YouSheBiaoTiHei;
                    font-weight: 400;
                    color: #29cc44;
                }
                .text {
                    font-size: 16px;
                    font-family: Source Han Sans SC;
                    font-weight: 400;
                    color: #ffffff;
                }
            }
        }
        .chart-right {
            flex: 1;
            width: 100%;
        }
        .salesData {
            display: flex;
            align-items: center;
            justify-content: space-around;
            width: 100%;
            div {
                display: flex;
                flex-flow: column;
                justify-content: center;
                align-items: center;
            }
            .num {
                font-size: 60px;
                font-family: YouSheBiaoTiHei;
                font-weight: 400;
                color: #29cc44;
                text-shadow: 0px 0px 30px rgba(38, 191, 64, 0.5);
                margin-bottom: 20px;
            }
            .text {
                font-size: 18px;
                font-family: Source Han Sans SC;
                font-weight: bold;
                color: #ffffff;
            }
        }
        .chart-tr {
            background: rgba(0, 0, 0, 0.2);
            padding: 2px 20px;
            .chart-tr-title {
                font-size: 14px;
                font-family: Source Han Sans SC;
                font-weight: bold;
                color: #fccd4c;
                line-height: 36px;
                text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);
                text-align: left;
            }
            .tr-bottom {
                text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);
                color: rgba(255, 102, 102, 1);
            }
        }
        .chart-th {
            padding: 0 20px;
            .chart-th-item {
                font-size: 14px;
                font-family: Source Han Sans SC;
                font-weight: 400;
                color: #ffffff;
                line-height: 34px;
            }
            .compare {
                display: flex;
                align-items: center;
            }
        }
        .chart-padding {
            padding: 4px 20px;
        }
        .seamless-warp {
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
}
</style>
