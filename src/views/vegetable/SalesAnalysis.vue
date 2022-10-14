<template>
    <div class="content">
        <bgAnim></bgAnim>
        <OneSizeContainer :width="1920" :height="1080" :maxRatio="2">
            <Head title="高山蔬菜销售分析" @back="back"></Head>
            <div class="main">
                <!-- 第一排 -->
                <el-row class="mapList" :gutter="30">
                    <el-col :span="8">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">今日在售高山蔬菜实时价格列表</p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-item">
                                <el-row class="chart-tr">
                                    <el-col :span="6" class="chart-tr-title">高山蔬菜名称</el-col>
                                    <el-col :span="8" class="chart-tr-title">价格</el-col>
                                    <el-col :span="7" class="chart-tr-title">日期</el-col>
                                    <el-col :span="3" class="chart-tr-title">较昨日</el-col>
                                </el-row>
                                <vue-seamless-scroll
                                    :data="avsRealTimePriceList"
                                    :class-option="classOption"
                                    class="seamless-warp"
                                >
                                    <el-row class="chart-th" v-for="(item, index) in avsRealTimePriceList" :key="index">
                                        <el-col :span="6" class="chart-th-item">{{ item.vgtName || "-" }}</el-col>
                                        <el-col :span="8" class="chart-th-item">{{ item.price || "-" }}元/Kg</el-col>
                                        <el-col :span="7" class="chart-th-item">{{ item.tmpDate || "-" }}</el-col>
                                        <el-col
                                            :span="3"
                                            class="chart-th-item compare"
                                            :style="{ color: item.comparedYesterday < 0 ? '#29CC44' : '#FF4C4C' }"
                                        >
                                            <img
                                                src="../../assets/images/salesAnalysis/decline.png"
                                                v-if="item.comparedYesterday < 0"
                                                alt=""
                                            />
                                            <img src="../../assets/images/salesAnalysis/top.png" v-else alt="" />
                                            <span>{{ Math.abs(item.comparedYesterday) || "-" }}%</span>
                                        </el-col>
                                    </el-row>
                                </vue-seamless-scroll>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">销售概况</p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-right">
                                <el-row class="chartRow">
                                    <el-col :span="8">
                                        <div class="chartItem">
                                            <img
                                                src="../../assets/images/vegetable/salesAnalysisIcon-1.png"
                                                class="iconChart"
                                            />
                                            <p class="num" ref="salesCategory">{{ form.salesCategory || 0 }}</p>
                                            <p class="text">销售种类 (类)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="chartItem line">
                                            <img
                                                src="../../assets/images/vegetable/salesAnalysisIcon-2.png"
                                                class="iconChart"
                                            />
                                            <p class="num" ref="salesVolume">{{ form.salesVolume || 0 }}</p>
                                            <p class="text">销售数量 (吨)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="chartItem">
                                            <img
                                                src="../../assets/images/vegetable/salesAnalysisIcon-3.png"
                                                class="iconChart"
                                            />
                                            <p class="num" ref="salesValue">{{ form.salesValue || 0 }}</p>
                                            <p class="text">销售额 (万元)</p>
                                        </div>
                                    </el-col>
                                </el-row>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">近7天蔬菜成交金额Top10</p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-right"><div ref="alrea" class="echart"></div></div>
                        </div>
                    </el-col>
                </el-row>
                <!-- 第二排 -->
                <el-row class="mapList" :gutter="30">
                    <el-col :span="8">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">销售额来源占比</p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-right"><div ref="yeld" class="echart"></div></div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">
                                    <span>今日在售类型与库存</span>
                                    <span class="titleSpan">（图表可左右拖动查看）</span>
                                    <!-- <span class="tabs">
                                        <i :class="{ active: activeType === 1 }" @click="setActive(1)">个人</i>
                                        <i :class="{ active: activeType === 2 }" @click="setActive(2)">合作社</i>
                                        <i :class="{ active: activeType === 3 }" @click="setActive(3)">家庭农场</i>
                                    </span> -->
                                </p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-right"><div ref="highYieldValue" class="echart"></div></div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">
                                    <span>近7天蔬菜成交量Top10</span>
                                    <!-- <span class="tabs">
                                        <i :class="{ activeT: activeTypeT === 1 }" @click="setActiveT(1)">个人</i>
                                        <i :class="{ activeT: activeTypeT === 2 }" @click="setActiveT(2)">合作社</i>
                                        <i :class="{ activeT: activeTypeT === 3 }" @click="setActiveT(3)">家庭农场</i>
                                    </span> -->
                                </p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-right"><div ref="lowYieldValue" class="echart"></div></div>
                        </div>
                    </el-col>
                </el-row>
                <!-- 第三排 -->
                <el-row class="mapList" :gutter="30">
                    <el-col :span="12">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">近1年销售价格月度分布</p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-right"><div ref="mainOutputValue" class="echart"></div></div>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">近1年蔬菜产量、销量及库存分布</p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-right"><div ref="transactionNum" class="echart"></div></div>
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
        transactionNum: any;
        salesCategory: any;
        salesVolume: any;
        salesValue: any;
        alrea: any;
        yeld: any;
        highYieldValue: any;
        lowYieldValue: any;
        mainOutputValue: any;
        personalArea: any;
        cooperativeArea: any;
        familyArea: any;
    };

    screenWidth: string = "";

    timer: any = false;
    timer1: any = null;
    timer2: any = null;
    timer3: any = null;
    timer4: any = null;
    timer5: any = null;

    lastMonth: number = Number(m().format("MM")) - 1;

    apiKeyList: any = [
        {
            //在售高山蔬菜实时价格列表(今日)
            path: "/vegetableSales/avsRealTimePrice",
            params: {
                year: parseInt(m().format("YYYY")) - 1,
                month: parseInt(m().format("MM")),
                day: parseInt(m().format("DD"))
            }
        },
        {
            //销售概况
            path: "/vegetableSales/avsSalesSurvey",
            params: {
                year: parseInt(m().format("YYYY")) - 1
            }
        },
        {
            //成交金额
            path: "/vegetableSales/avsVegetablesHangMoney",
            params: {
                // year: parseInt(m().format("YYYY")) - 1
            }
        },
        {
            //销售额来源占比
            path: "/vegetableSales/avsSalesSource",
            params: {
                year: parseInt(m().format("YYYY")) - 1
            }
        },
        {
            //在售类型与库存(今日)
            path: "/vegetableSales/avsOnSalesStock",
            params: {
                year: parseInt(m().format("YYYY")) - 1,
                month: parseInt(m().format("MM")),
                day: parseInt(m().format("DD"))
            }
        },
        {
            //近7天蔬菜成交量Top10
            path: "/vegetableSales/avsVegetablesHangTurnover",
            params: {
                // year: parseInt(m().format("YYYY")) - 1
            }
        },
        {
            //近1年销售价格月度分布
            path: "/vegetableSales/avsSalesTrendPrice",
            params: {
                year: parseInt(m().format("YYYY")) - 1
            }
        },
        {
            //蔬菜产量、销量及库存分布(近1年)
            path: "/vegetableSales/avsSalesTrendTurnover",
            params: {
                year: parseInt(m().format("YYYY")) - 1
            }
        }
    ];

    form: any = {};

    lowOutputValue: any = {
        personal: {
            xAxisData: [],
            yAxisData: []
        },
        cooperative: {
            xAxisData: [],
            yAxisData: []
        },
        family: {
            xAxisData: [],
            yAxisData: []
        }
    };

    classOption: Object = {
        step: 0.2,
        limitMoveNum: 7
    };

    avsRealTimePriceList: any = [];

    //近1年蔬菜产量、销量及库存分布
    setTransactionNumChart(xAxisData: any, yAxisData: any, yAxisData1: any, yAxisData2: any) {
        let chart = echarts.init(this.$refs.transactionNum);
        let option: any = {
            grid: {
                left: "7%",
                right: "7%",
                bottom: "10%",
                top: "15%"
                // containLabel: true,
            },
            legend: {
                itemWidth: 8,
                itemHeight: 8,
                data: [
                    {
                        name: "产量",
                        icon: "rect",
                        itemStyle: {
                            color: "rgba(98, 189, 49, 1)"
                        }
                    },
                    {
                        name: "销量",
                        icon: "rect",
                        itemStyle: {
                            color: "rgba(252, 205, 76, 1)"
                        }
                    },
                    {
                        name: "库存",
                        icon: "rect",
                        itemStyle: {
                            color: "rgba(67, 209, 197, 1)"
                        }
                    }
                ],
                left: "center",
                top: "5%",
                textStyle: {
                    color: "#fff"
                }
            },
            xAxis: {
                type: "category",
                data: xAxisData,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "rgba(204, 204, 204, 0.5)",
                        width: 1,
                        type: "solid"
                    }
                },
                axisLabel: {
                    //坐标轴刻度标签的相关设置。
                    //		interval: 0,//设置为 1，表示『隔一个标签显示一个标签』
                    //	margin:15,
                    textStyle: {
                        color: "#FFFFFF",
                        fontSize: 13
                    }
                    // rotate: 50,
                },
                axisTick: {
                    //坐标轴刻度相关设置。
                    show: false
                },
                splitLine: {
                    //坐标轴在 grid 区域中的分隔线。
                    show: false
                }
            },

            yAxis: [
                {
                    type: "value",
                    name: "吨",
                    nameTextStyle: {
                        color: "rgba(255, 255, 255, 0.5)",
                        fontWeight: "bold",
                        padding: [0, 40, 0, 0]
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(204, 204, 204, 0.2)",
                            type: "dashed"
                        }
                    },
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        margin: 10,
                        textStyle: {
                            color: "rgba(255, 255, 255, 0.5)"
                        }
                    },
                    axisTick: {
                        show: false
                    }
                }
            ],
            series: [
                {
                    name: "产量",
                    type: "bar",
                    barWidth: 10,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: "rgba(98, 189, 49, 1)"
                                },
                                {
                                    offset: 1,
                                    color: "rgba(98, 189, 49, 0.2)"
                                }
                            ]),
                            barBorderRadius: [10, 10, 0, 0]
                        }
                    },
                    data: yAxisData
                },
                {
                    name: "销量",
                    type: "bar",
                    barWidth: 10,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: "rgba(252, 205, 76, 1)"
                                },
                                {
                                    offset: 1,
                                    color: "rgba(252, 205, 76, 0.2)"
                                }
                            ]),
                            barBorderRadius: [10, 10, 0, 0]
                        }
                    },
                    data: yAxisData1
                },
                {
                    name: "库存",
                    type: "bar",
                    barWidth: 10,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: "rgba(67, 209, 197, 1)"
                                },
                                {
                                    offset: 1,
                                    color: "rgba(67, 209, 197, 0.2)"
                                }
                            ]),
                            barBorderRadius: [10, 10, 0, 0]
                        }
                    },
                    data: yAxisData2
                }
            ],
            tooltip: {
                backgroundColor: "rgba(3,3,3,0.5)",
                borderWidth: 0,
                textStyle: {
                    color: "#ffffff",
                    fontSize: "14"
                },
                trigger: "axis",
                axisPointer: {
                    type: "shadow"
                },
                formatter: (data: any) => {
                    let res =
                        data[0].name +
                        "<br />" +
                        data[0].marker +
                        data[0].seriesName +
                        "：" +
                        data[0].value +
                        "吨" +
                        "<br />" +
                        data[1].marker +
                        data[1].seriesName +
                        "：" +
                        data[1].value +
                        "吨" +
                        "<br />" +
                        data[2].marker +
                        data[2].seriesName +
                        "：" +
                        data[2].value +
                        "吨";
                    return res;
                }
            }
        };
        this.$nextTick(() => {
            chart.setOption(option);
            if (!this.timer4) {
                let len = 0;
                // clearInterval(this.timer4);
                this.timer4 = setInterval(() => {
                    if (len === xAxisData.length) {
                        len = 0;
                    }
                    chart.dispatchAction({ type: "showTip", seriesIndex: 0, dataIndex: len }); //设置默认选中高亮部分
                    len = len + 1;
                }, 3000);
            }
        });
    }

    //近7天蔬菜成交金额Top10
    setalreaChart(yAxisData: any, yAxisDataT: any, data: any, markPointData: any) {
        let chart = echarts.init(this.$refs.alrea);
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
                        fontSize: 14,
                        fontWeight: 400,
                        interval: 0
                        // rotate:40,//倾斜度
                    }
                }
            ],
            dataZoom: [
                {
                    type: "inside",
                    yAxisIndex: [0, 1],
                    minValueSpan: 10,
                    maxValueSpan: 10,
                    startValue: yAxisData.length,
                    endValue: yAxisData.length - 10
                }
            ],
            series: [
                {
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
                trigger: "axis",
                axisPointer: {
                    type: "shadow"
                },
                formatter: (data: any) => {
                    let amount = data[0].value.toString().replace(/\d{1,3}(?=(\d{3})+$)/g, function(s: number) {
                        return s + ",";
                    });
                    let res = data[0].marker + data[0].name + "：" + amount + "元";
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
            if (!this.timer5) {
                let len = yAxisData.length;
                // clearInterval(this.timer5);
                this.timer5 = setInterval(() => {
                    if (len === 0) {
                        len = yAxisData.length;
                    }
                    chart.dispatchAction({ type: "showTip", seriesIndex: 0, dataIndex: len - 1 }); //设置默认选中高亮部分
                    len--;
                }, 2800);
            }
        });
    }

    //销售额来源占比
    setyYeldChart(countFarmSourceData: any) {
        let chart = echarts.init(this.$refs.yeld);
        let labelColor: string = "";
        let option: any = {
            color: ["#62BD31", "#E6BB45", "#43D1C5", "#2681FF", "#E7FC92"],
            title: {
                show: countFarmSourceData.length ? true : false,
                text: "销售额",
                top: "center",
                left: "center",
                textStyle: {
                    fontSize: 36,
                    fontFamily: "Source Han Sans SC",
                    fontWeight: "bold",
                    color: "#FFFFFF",
                    textShadowColor: "#ffffff",
                    textShadowBlur: 8,
                    textShadowOffsetX: 0,
                    textShadowOffsetY: 0
                }
            },
            series: [
                {
                    name: "销售额",
                    type: "pie",
                    radius: ["60%", "90%"],
                    center: ["50%", "50%"],
                    avoidLabelOverlap: true,
                    label: {
                        formatter: (data: any) => {
                            // console.log(data);
                            let res = [
                                `{${
                                    (data.dataIndex + 1) % 5 === 1
                                        ? "a1"
                                        : (data.dataIndex + 1) % 5 === 2
                                        ? "a2"
                                        : (data.dataIndex + 1) % 5 === 3
                                        ? "a3"
                                        : (data.dataIndex + 1) % 5 === 4
                                        ? "a4"
                                        : "a5"
                                }|${data.percent}%}`,
                                `{b|${data.name}}`
                            ].join("\n");
                            return res;
                        },
                        // formatter: ["{a|{d}%}", "{b|{b}}"].join("\n"),
                        rich: {
                            a1: {
                                fontSize: 24,
                                fontFamily: "YouSheBiaoTiHei",
                                fontWeight: 400,
                                color: "#62BD31"
                            },
                            a2: {
                                fontSize: 24,
                                fontFamily: "YouSheBiaoTiHei",
                                fontWeight: 400,
                                color: "#E6BB45"
                            },
                            a3: {
                                fontSize: 24,
                                fontFamily: "YouSheBiaoTiHei",
                                fontWeight: 400,
                                color: "#43D1C5"
                            },
                            a4: {
                                fontSize: 24,
                                fontFamily: "YouSheBiaoTiHei",
                                fontWeight: 400,
                                color: "#2681FF"
                            },
                            a5: {
                                fontSize: 24,
                                fontFamily: "YouSheBiaoTiHei",
                                fontWeight: 400,
                                color: "#E7FC92"
                            },
                            b: {
                                fontSize: 12,
                                fontFamily: "SourceHanSansSC-Regular",
                                fontWeight: 400,
                                color: "#FFFFFF"
                            }
                        }
                    },
                    labelLine: {
                        show: true,
                        lineStyle: {
                            color: "#ffffff"
                        }
                    },
                    roseType: "radius",
                    // emphasis: {
                    //     label: {
                    //         show: true,
                    //         fontSize: "20",
                    //         fontWeight: "bold",
                    //         formatter: ["{a|{d}%}", "{b|{b}}"].join("\n"),
                    //         rich: {
                    //             a: {
                    //                 fontSize: 24,
                    //                 fontFamily: "YouSheBiaoTiHei",
                    //                 fontWeight: 400
                    //                 // color: "#FFFFFF"
                    //             },
                    //             b: {
                    //                 fontSize: 12,
                    //                 fontFamily: "YouSheBiaoTiHei",
                    //                 fontWeight: 400
                    //                 // color: "#FFFFFF"
                    //             }
                    //         }
                    //     }
                    // },
                    data: countFarmSourceData
                }
            ]
        };
        this.$nextTick(() => {
            chart.setOption(option);
        });
    }

    //在售类型与库存(今日)
    setHighYieldValueChart(xAxisData: any, data: any) {
        let chart = echarts.init(this.$refs.highYieldValue);
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
                name: "吨",
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
                        background-color:rgba(246, 189, 22, 0);"></span>` +
                        data.name +
                        "：" +
                        data.value + '吨';
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
                        }
                    },
                    barMaxWidth: "auto",
                    barWidth: 20
                }
            ]
        };
        this.$nextTick(() => {
            chart.setOption(option);
            // if(!this.timer1) {
            //     let len = 0;
            //     // clearInterval(this.timer1);
            //     this.timer1 = setInterval(() => {
            //         if (len === xAxisData.length) {
            //             len = 0;
            //         }
            //         chart.dispatchAction({ type: "showTip", seriesIndex: 0, dataIndex: len }); //设置默认选中高亮部分
            //         len++;
            //     }, 3000);
            // }
        });
    }

    //近7天蔬菜成交量Top10
    setLowYieldValueChart(xAxisData: any, data: any) {
        let chart = echarts.init(this.$refs.lowYieldValue);
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
                name: "吨",
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
                        background-color:rgba(246, 189, 22, 1);"></span>` +
                        data.name +
                        "<br/>" +
                        `<span style="display:inline-block;margin-right:4px;
                        border-radius:10px;width:10px;height:10px;
                        background-color:rgba(246, 189, 22, 0);"></span>` +
                        data.name +
                        "：" +
                        data.value + '吨';
                    return res;
                },
                backgroundColor: "rgba(3,3,3,0.5)",
                borderWidth: 0,
                textStyle: {
                    color: "#ffffff",
                    fontSize: "14"
                }
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
                                    color: "rgba(246, 189, 22, 0.2)"
                                },
                                {
                                    offset: 1,
                                    color: "rgba(246, 189, 22, 1)"
                                }
                            ]
                        }
                    },
                    barMaxWidth: "auto",
                    barWidth: 20
                }
            ]
        };
        this.$nextTick(() => {
            chart.setOption(option);
            if (!this.timer2) {
                let len = 0;
                // clearInterval(this.timer2);
                this.timer2 = setInterval(() => {
                    if (len === xAxisData.length) {
                        len = 0;
                    }
                    chart.dispatchAction({ type: "showTip", seriesIndex: 0, dataIndex: len }); //设置默认选中高亮部分
                    len++;
                }, 3000);
            }
        });
    }

    //近1年销售价格月度分布
    setMainOutputValueChart(xAxisData: any, data: any) {
        let chart = echarts.init(this.$refs.mainOutputValue);
        let option: any = {
            color: ["#F6BD16"],
            tooltip: {
                trigger: "axis",
                backgroundColor: "rgba(3,3,3,0)",
                borderWidth: 0,
                textStyle: {
                    color: "#ffffff",
                    fontSize: "14"
                },
                axisPointer: {
                    type: "shadow"
                },
                formatter: (value: any) => {
                    let str = "";
                    value.forEach((item: any) => {
                        str += `<li style="position: relative;display:flex;height:20px;line-height:20px;">
                                <div style="width:10px;height:10px;border-radius:50%;background-color:#fff;position: absolute;top: 50%;transform: translateY(-50%);background-color:${
                                    item.color
                                };"></div>
                                <div style="margin-left:15px;">${item.seriesName}：${item.data}元</div>
                            </li>`;
                    });
                    let res = `<div style="background-color:rgba(0, 0, 0, .5);margin:-10px;padding:10px;border-radius:5px;">
                        <span>${value[0].name}</span>
                        <ul style="margin-top:10px;">
                        ${str}
                        <ul>
                    </div>`;
                    return res;
                }
            },
            grid: {
                right: "7%",
                left: "10%",
                top: "20%",
                bottom: "10%"
            },
            // dataZoom: {
            //     type: "inside",
            //     minValueSpan: 5,
            //     maxValueSpan: 5
            // },
            xAxis: [
                {
                    type: "category",
                    boundaryGap: false,
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#fff"
                        },
                        interval: 0
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#dfdfdf"
                        }
                    },
                    data: xAxisData
                }
            ],
            yAxis: [
                {
                    type: "value",
                    name: "元",
                    position: "left",
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "rgba(255,255,255,0.2)"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: "dashed",
                            color: "#fff",
                            opacity: 0.4
                        }
                    },
                    nameTextStyle: {
                        padding: [0, 40, 0, 0]
                    },
                    axisLabel: {
                        show: true
                    }
                }
            ],
            series: [
                {
                    name: "销售价格",
                    type: "line",
                    data: data,
                    // symbol: "none",
                    // smooth: true,
                    endLabel: {
                        show: false
                    },
                    lineStyle: {
                        shadowColor: "#000",
                        shadowBlur: 5,
                        shadowOffsetY: 2
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: "rgba(246, 189, 22, 1)"
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(246, 189, 22, 0.2)"
                                    }
                                ],
                                false
                            )
                        }
                    }
                }
            ]
        };
        this.$nextTick(() => {
            chart.setOption(option);
            if (!this.timer3) {
                let len = 0;
                // clearInterval(this.timer3);
                this.timer3 = setInterval(() => {
                    if (len === xAxisData.length) {
                        len = 0;
                    }
                    chart.dispatchAction({
                        type: "showTip",
                        seriesIndex: 0,
                        dataIndex: len
                    });
                    len++;
                }, 3800);
            }
        });
    }

    // @Watch("screenWidth", {
    //     deep: true
    // })
    // watchScreenWidth(val: string) {
    //     // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
    //     if (!this.timer) {
    //         // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
    //         this.screenWidth = val;
    //         this.timer = true;
    //         let that = this;
    //         setTimeout(function() {
    //             // echarts.init(that.$refs.transactionNum).resize();
    //             // echarts.init(that.$refs.transactionAmount).resize();
    //             // echarts.init(that.$refs.source).resize();
    //             // echarts.init(that.$refs.produceTypeNum).resize();
    //             // echarts.init(that.$refs.salesTrend).resize();
    //             // echarts.init(that.$refs.marketQuantityOperating).resize();
    //             // that.timer = false;
    //         }, 400);
    //     }
    // }

    getData(data: any) {
        setTimeout(() => {
            console.log(data, 111);
            let xAxisData: any = [],
                yAxisData: any = [],
                yAxisDataT: any = [],
                valueData: any = [];
            switch (data.key) {
                case "/vegetableSales/avsRealTimePrice": //在售高山蔬菜实时价格列表(今日)
                    this.avsRealTimePriceList = data.data;
                    this.avsRealTimePriceList.forEach((item: any) => {
                        item.tmpDate = m(item.tmpDate).format("MM-DD");
                    });
                    break;
                case "/vegetableSales/avsSalesSurvey": //销售概况
                    this.form.salesCategory = data.data.categoryCount || 0;
                    this.form.salesVolume = data.data.salesVolumeSum || 0;
                    this.form.salesValue = data.data.salesValueSum || 0;
                    this.$nextTick(() => {
                        animateValue(this.$refs.salesCategory, this.form.salesCategory, 1000);
                        animateValue(this.$refs.salesVolume, this.form.salesVolume, 1000);
                        animateValue(this.$refs.salesValue, this.form.salesValue, 1000,false,true);
                    });
                    break;
                case "/vegetableSales/avsVegetablesHangMoney": //成交金额
                    data.data.forEach((item: any, index: number) => {
                        let obj = {
                            yAxis: data.data.length - (1 + index),
                            xAxis: item.amount,
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
                        let amount = item.amount.toString().replace(/\d{1,3}(?=(\d{3})+$)/g, function(s: number) {
                            return s + ",";
                        });
                        yAxisData.unshift(item.vgtName);
                        yAxisDataT.unshift(amount + "元");
                        valueData.unshift(item.amount);
                        xAxisData.unshift(obj);
                    });
                    this.$nextTick(() => {
                        this.setalreaChart(yAxisData, yAxisDataT, valueData, xAxisData);
                    });
                    break;

                case "/vegetableSales/avsSalesSource": //销售额来源占比
                    data.data.forEach((item: any) => {
                        let obj = {
                            name: item.vgtName,
                            value: item.proportion
                        };
                        valueData.push(obj);
                    });
                    this.$nextTick(() => {
                        this.setyYeldChart(valueData);
                    });
                    break;
                case "/vegetableSales/avsOnSalesStock": //在售类型与库存(今日)
                    data.data.forEach((item: any) => {
                        xAxisData.push(item.vgtName);
                        yAxisData.push(item.stockValue);
                    });
                    this.$nextTick(() => {
                        this.setHighYieldValueChart(xAxisData, yAxisData);
                    });
                    break;
                case "/vegetableSales/avsVegetablesHangTurnover": //近7天蔬菜成交量Top10
                    data.data.forEach((item: any) => {
                        xAxisData.push(item.vgtName);
                        yAxisData.push(item.turnover);
                    });
                    this.$nextTick(() => {
                        this.setLowYieldValueChart(xAxisData, yAxisData);
                    });
                    break;
                case "/vegetableSales/avsSalesTrendPrice": //近1年销售价格月度分布
                    data.data.forEach((item: any) => {
                        xAxisData.push(item.month + "月");
                        valueData.push(item.price);
                    });
                    this.$nextTick(() => {
                        this.setMainOutputValueChart(xAxisData, valueData);
                    });
                    break;
                case "/vegetableSales/avsSalesTrendTurnover": //蔬菜产量、销量及库存分布(近1年)
                    data.data.forEach((item: any) => {
                        xAxisData.push(item.month + "月");
                        yAxisData.push(item.yield);
                        yAxisDataT.push(item.salesVolume);
                        valueData.push(item.stockValue);
                    });
                    this.$nextTick(() => {
                        this.setTransactionNumChart(xAxisData, yAxisData, yAxisDataT, valueData);
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
        this.$router.push("/vegetable/allIndustry");
    }

    mounted() {
        //接口调用
        if (this.$route.path === "/vegetable/salesAnalysis") {
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
    }

    @Watch("$route")
    routeWatch(value: any) {
        //清除回调
        this.apiKeyList.forEach((item: any) => {
            socketClient.delCallBack(item.path);
            socketClient.delSend(item.path);
        });
        // clearInterval(this.timer1);
        clearInterval(this.timer2);
        clearInterval(this.timer3);
        clearInterval(this.timer4);
        clearInterval(this.timer5);
    }

    beforeDestroy() {
        //清除回调
        this.apiKeyList.forEach((item: any) => {
            socketClient.delCallBack(item.path);
            socketClient.delSend(item.path);
        });
        // clearInterval(this.timer1);
        clearInterval(this.timer2);
        clearInterval(this.timer3);
        clearInterval(this.timer4);
        clearInterval(this.timer5);
    }
}
</script>

<style scoped lang="scss">
.content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: url("../../assets/images/vegetable/bg.jpg") no-repeat;
    background-size: 100% 100%;
}

.main {
    padding: 0 30px;
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
.iconChart {
    border-radius: unset;
    cursor: pointer;
    pointer-events: auto;
    animation-name: imageAnimation_2685;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-duration: 5s;
    animation-delay: 0s;
    -webkit-user-drag: none;
    filter: none;
    width: 84px;
    height: 76px;
    object-fit: cover;
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
            // display: flex;
            // align-items: center;
            // justify-content: space-between;
            font-size: 20px;
            font-family: Source Han Sans SC;
            font-weight: bold;
            color: #ffffff;
            text-shadow: 0px 0px 20px rgba(255, 255, 255, 0.5);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
            .tabs {
                font-size: 14px;
                font-family: Source Han Sans SC;
                font-weight: bold;
                color: #ffffff;
                opacity: 0.5;
                padding-right: 14px;
                i {
                    font-style: normal;
                    margin-right: 15px;
                    cursor: pointer;
                    font-size: 14px;
                }
                .active {
                    color: #62bd31;
                    position: relative;
                    font-size: 14px;
                    border-bottom: 1px solid #62bd31;
                    padding-bottom: 3px;
                }
                .activeT {
                    color: #e6bb45;
                    position: relative;
                    font-size: 14px;
                    border-bottom: 1px solid #e6bb45;
                    padding-bottom: 3px;
                }
            }
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
        height: 260px;
        width: 100%;
        // padding: 20px 0;
        display: flex;
        .chart-item {
            width: 100%;
            height: 100%;
        }
        .echart {
            height: 260px;
            width: 100%;
        }
        .chartRow {
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
        }
        .chart-right {
            flex: 1;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .line {
            border-left: 1px dashed rgba(255, 255, 255, 0.2);
            border-right: 1px dashed rgba(255, 255, 255, 0.2);
        }
        .chartItem {
            display: flex;
            flex-flow: column;
            justify-content: space-around;
            align-items: center;
            .num {
                font-size: 36px;
                font-family: YouSheBiaoTiHei;
                font-weight: 400;
                color: #f6bd16;
            }
            .text {
                font-size: 14px;
                font-family: Source Han Sans SC;
                font-weight: 400;
                color: #ffffff;
            }
        }
        .chartAlrea {
            width: 100%;
            height: 100%;
            .num {
                height: 70px;
                color: #62bd31;
                font-size: 36px;
                font-family: YouSheBiaoTiHei;
                font-weight: 400;
                // position: absolute;
                // top: 50%;
                text-align: center;
                width: calc(100% / 3);
            }
            .echart {
                height: 190px;
                width: 100%;
            }
        }
        .chart-tr {
            background: rgba(246, 189, 22, 0.3);
            padding: 0 20px;
            .chart-tr-title {
                font-size: 14px;
                font-family: Source Han Sans SC;
                font-weight: bold;
                color: #f6bd16;
                line-height: 36px;
                // text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
                text-align: left;
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
