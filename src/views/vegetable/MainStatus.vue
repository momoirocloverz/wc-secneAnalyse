<template>
    <div class="content">
        <bgAnim></bgAnim>
        <OneSizeContainer :width="1920" :height="1080" :maxRatio="2">
            <Head title="主体情况分析" @back="back"></Head>
            <div class="main">
                <!-- 第一排 -->
                <el-row class="mapList" :gutter="30">
                    <el-col :span="8">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">上1年主体分类统计</p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-right"><div ref="transactionNum" class="echart"></div></div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">主体情况概况</p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-right">
                                <el-row class="chartRow">
                                    <el-col :span="8">
                                        <div class="chartItem">
                                            <img src="../../assets/images/vegetable/mainIcon-1.png" class="iconChart" />
                                            <p class="num" ref="mainCount">{{ form.mainCount || 0 }}</p>
                                            <p class="text">种植主体总数量(个)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="chartItem line">
                                            <img src="../../assets/images/vegetable/mainIcon-2.png" class="iconChart" />
                                            <p class="num" ref="totalOutput">{{ form.totalOutput || 0 }}</p>
                                            <p class="text">去年总产量(吨)</p>
                                        </div>
                                    </el-col>
                                    <el-col :span="8">
                                        <div class="chartItem">
                                            <img src="../../assets/images/vegetable/mainIcon-3.png" class="iconChart" />
                                            <p class="num" ref="totalOutputValue">{{ form.totalOutputValue || 0 }}</p>
                                            <p class="text">去年总产值(万元)</p>
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
                                <p class="title-text">上1年主体种植面积分布</p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chartAlrea">
                                <div ref="alrea" class="echart"></div>
                                <div style="display: flex;">
                                    <p class="num">
                                        <span ref="personalArea">{{ form.personalArea || 0 }}</span>
                                        <span>亩</span>
                                    </p>
                                    <p class="num">
                                        <span ref="cooperativeArea">{{ form.cooperativeArea || 0 }}</span>
                                        <span>亩</span>
                                    </p>
                                    <p class="num">
                                        <span ref="familyArea">{{ form.familyArea || 0 }}</span>
                                        <span>亩</span>
                                    </p>
                                </div>
                            </div>
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
                                <p class="title-text">上1年主体产量分布</p>
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
                                    <span>主体高产值Top10</span>
                                    <span class="tabs">
                                        <i :class="{ active: activeType === 1 }" @click="setActive(1)">个人</i>
                                        <i :class="{ active: activeType === 2 }" @click="setActive(2)">合作社</i>
                                        <i :class="{ active: activeType === 3 }" @click="setActive(3)">家庭农场</i>
                                    </span>
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
                                    <span>主体低产值Top10</span>
                                    <span class="tabs">
                                        <i :class="{ activeT: activeTypeT === 1 }" @click="setActiveT(1)">个人</i>
                                        <i :class="{ activeT: activeTypeT === 2 }" @click="setActiveT(2)">合作社</i>
                                        <i :class="{ activeT: activeTypeT === 3 }" @click="setActiveT(3)">家庭农场</i>
                                    </span>
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
                    <el-col :span="8">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">上1年主体产值分布</p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-right"><div ref="mainOutputValue" class="echart"></div></div>
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">种植主体列表</p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-item">
                                <el-row class="chart-tr">
                                    <el-col :span="4" class="chart-tr-title">主体名称</el-col>
                                    <el-col :span="3" class="chart-tr-title">乡镇</el-col>
                                    <el-col :span="3" class="chart-tr-title">产量</el-col>
                                    <el-col :span="3" class="chart-tr-title">产值</el-col>
                                    <el-col :span="3" class="chart-tr-title">主体分类</el-col>
                                    <el-col :span="3" class="chart-tr-title">从业人数</el-col>
                                    <el-col :span="3" class="chart-tr-title">场地面积</el-col>
                                    <!-- <el-col :span="3" class="chart-tr-title">装备数量</el-col> -->
                                    <el-col :span="2" class="chart-tr-title">注册时间</el-col>
                                </el-row>
                                <vue-seamless-scroll
                                    :data="plantingSubjectList"
                                    :class-option="classOption"
                                    class="seamless-warp"
                                >
                                    <el-row class="chart-th" v-for="(item, index) in plantingSubjectList" :key="index">
                                        <el-col :span="4" class="chart-th-item">{{ item.name }}</el-col>
                                        <el-col :span="3" class="chart-th-item">{{ item.township }}</el-col>
                                        <el-col :span="3" class="chart-th-item">{{ item.totalOutput }}吨</el-col>
                                        <el-col :span="3" class="chart-th-item">{{ item.totalOutputValue }}万元</el-col>
                                        <el-col :span="3" class="chart-th-item">{{ item.type }}</el-col>
                                        <el-col :span="3" class="chart-th-item">{{ item.practiceNum }}人</el-col>
                                        <el-col :span="3" class="chart-th-item">{{ item.siteArea }}亩</el-col>
                                        <!-- <el-col :span="3" class="chart-th-item">{{ item.equipNum }}</el-col> -->
                                        <el-col :span="2" class="chart-th-item">{{ item.registDate }}</el-col>
                                    </el-row>
                                </vue-seamless-scroll>
                            </div>
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
        mainCount: any;
        totalOutput: any;
        totalOutputValue: any;
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
    timer0: any = null;
    timer1: any = null;
    timer2: any = null;
    // timer3: any = null;
    // timer5: any = null;

    lastMonth: number = Number(m().format("MM")) - 1;

    activeType: number = 1; //1.个人 2.合作社 3.家庭农场
    activeTypeT: number = 1; //1.个人 2.合作社 3.家庭农场

    apiKeyList: any = [
        {
            //主体分类统计
            path: "/subjectSituation/ztMainClassify",
            params: {
                year: parseInt(m().format("YYYY")) - 1
            }
        },
        {
            //主体情况概览
            path: "/subjectSituation/ztMainClassifySurvey",
            params: {
                year: parseInt(m().format("YYYY")) - 1
            }
        },
        {
            //主体种植面积分布
            path: "/subjectSituation/ztPlantAreaDistribut",
            params: {
                year: parseInt(m().format("YYYY")) - 1
            }
        },
        {
            //主体产量分布
            path: "/subjectSituation/ztMainClassifyYield",
            params: {
                year: parseInt(m().format("YYYY")) - 1
            }
        },
        {
            //高产值top10
            path: "/subjectSituation/ztHighOutputValue",
            params: {
                year: parseInt(m().format("YYYY")) - 1
            }
        },
        {
            //低产值top10
            path: "/subjectSituation/ztLowOutputValue",
            params: {
                year: parseInt(m().format("YYYY")) - 1
            }
        },
        {
            //主体产值分布
            path: "/subjectSituation/ztMainClassifyOutPut",
            params: {
                year: parseInt(m().format("YYYY")) - 1
            }
        },
        {
            //种植主体列表
            path: "/subjectSituation/ztPlantSubjectRecord",
            params: {
                year: parseInt(m().format("YYYY")) - 1
            }
        }
    ];

    form: any = {};

    highOutputValue: any = {
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

    plantingSubjectList: any = [];

    //农产品成交数量Top10
    setTransactionNumChart(xAxisData: any, chartdata: any, chartdata0: any) {
        let chart = echarts.init(this.$refs.transactionNum);
        let chartdata1: any = [],
            chartdata2: any = [];
        if (chartdata && chartdata.length > 0) {
            chartdata.forEach((item: any) => {
                chartdata1.push(1);
            });
        }
        if (chartdata0 && chartdata0.length > 0) {
            chartdata0.forEach((item: any) => {
                chartdata2.push(1);
            });
        }
        let option: any = {
            textStyle: {
                color: "#c0c3cd",
                fontSize: 14
            },
            legend: {
                type: "plain",
                icon: "rect",
                selectedMode: false,
                itemHeight: 8,
                itemWidth: 8,
                textStyle: {
                    color: "#ffffff",
                    fontSize: 12,
                    fontFamily: "Source Han Sans SC",
                    fontWeight: 400
                },
                data: ["总产量", "总产值"],
                top: 10,
                right: "auto"
            },
            tooltip: {
                show: true,
                formatter: (data: any) => {
                    let res =
                        data.marker +
                        data.name +
                        "<br/>" +
                        data.seriesName +
                        data.value +
                        (data.seriesName === "总产量" ? "吨" : "万元");
                    return res;
                },
                backgroundColor: "rgba(3,3,3,0.5)",
                borderWidth: 0,
                textStyle: {
                    color: "#ffffff",
                    fontSize: "14"
                }
            },
            toolbox: {
                show: false,
                feature: {
                    saveAsImage: {
                        backgroundColor: "#031245"
                    },
                    restore: {}
                },
                iconStyle: {
                    borderColor: "#c0c3cd"
                }
            },
            color: ["#26BF40", "rgba(38, 191, 64, 0.9)"],
            grid: {
                top: "20%",
                left: "3%",
                right: "6%",
                bottom: "5%",
                containLabel: true
            },
            // dataZoom: {
            //     type: "inside",
            //     minValueSpan: 4,
            //     maxValueSpan: 6
            // },
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
                data: xAxisData,
                type: "category"
            },
            yAxis: [
                {
                    name: "吨",
                    type: "value",
                    axisLabel: {
                        color: "rgba(255,255,255,0.5)",
                        fontSize: 14
                    },
                    nameTextStyle: {
                        padding: [0, 25, 0, 0],
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
                {
                    name: "万元",
                    type: "value",
                    position: "right",
                    axisLabel: {
                        color: "rgba(255,255,255,0.5)",
                        fontSize: 14
                    },
                    nameTextStyle: {
                        padding: [0, 0, 0, 40],
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
                        show: false,
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
                }
            ],
            series: [
                {
                    name: "总产量",
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
                    name: "总产量",
                    data: chartdata1,
                    type: "pictorialBar",
                    barMaxWidth: "20",
                    symbol: "diamond",
                    symbolOffset: ["-65%", "50%"],
                    symbolSize: [20, 10]
                },
                {
                    name: "总产量",
                    data: chartdata,
                    type: "pictorialBar",
                    barMaxWidth: "20",

                    symbolPosition: "end",
                    symbol: "diamond",
                    symbolOffset: ["-65%", "-50%"],
                    symbolSize: [20, 12],
                    zlevel: 2
                },
                {
                    name: "总产值",
                    data: chartdata0,
                    type: "bar",
                    barMaxWidth: "auto",
                    yAxisIndex: 1, //对应标签yAxis中的第二个数据
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
                    name: "总产值",
                    data: chartdata2,
                    type: "pictorialBar",
                    yAxisIndex: 1, //对应标签yAxis中的第二个数据
                    barMaxWidth: "20",
                    symbol: "diamond",
                    itemStyle: {
                        color: "#E6BB45"
                    },
                    symbolOffset: ["65%", "50%"],
                    symbolSize: [20, 10]
                },
                {
                    name: "总产值",
                    data: chartdata0,
                    type: "pictorialBar",
                    barMaxWidth: "20",
                    yAxisIndex: 1, //对应标签yAxis中的第二个数据
                    itemStyle: {
                        color: "#E6BB45"
                    },
                    symbolPosition: "end",
                    symbol: "diamond",
                    symbolOffset: ["65%", "-50%"],
                    symbolSize: [20, 12],
                    zlevel: 2
                }
            ]
        };
        this.$nextTick(() => {
            chart.setOption(option);
            // let len = 0;
            // clearInterval(this.timer5);
            // this.timer5 = setInterval(() => {
            //     if (len === xAxisData.length) {
            //         len = 0;
            //     }
            //     chart.dispatchAction({ type: "showTip", seriesIndex: 0, dataIndex: len }); //设置默认选中高亮部分
            //     len = len + 1;
            // }, 3000);
        });
    }

    //上1年个人种植面积分布
    setalreaChart(value: any, value1: any, value2: any) {
        let chart = echarts.init(this.$refs.alrea);
        let option: any = {
            series: [
                {
                    type: "gauge",
                    startAngle: 90,
                    endAngle: -270,
                    radius: "70%", //仪表盘半径
                    center: ["17%", "50%"], //仪表盘位置
                    itemStyle: {
                        color: "#62BD31"
                    },
                    pointer: {
                        show: false
                    },
                    progress: {
                        show: true,
                        overlap: false,
                        roundCap: true,
                        clip: false,
                        itemStyle: {
                            borderWidth: 1,
                            borderColor: "#62BD31"
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            width: 20,
                            color: [[1, "rgba(98, 189, 49, 0.2)"]]
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    data: [
                        {
                            value: value,
                            name: "个人"
                        }
                    ],
                    title: {
                        fontSize: 16,
                        fontFamily: "Source Han Sans SC",
                        fontWeight: "bold",
                        color: "#FFFFFF",
                        offsetCenter: [0, 0]
                    },
                    detail: {
                        show: false
                    }
                },
                {
                    type: "gauge",
                    startAngle: 90,
                    endAngle: -270,
                    radius: "70%", //仪表盘半径
                    center: ["50%", "50%"], //仪表盘位置
                    itemStyle: {
                        color: "#62BD31"
                    },
                    pointer: {
                        show: false
                    },
                    progress: {
                        show: true,
                        overlap: false,
                        roundCap: true,
                        clip: false,
                        itemStyle: {
                            borderWidth: 1,
                            borderColor: "#62BD31"
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            width: 20,
                            color: [[1, "rgba(98, 189, 49, 0.2)"]]
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    data: [
                        {
                            value: value1,
                            name: "合作社"
                        }
                    ],
                    title: {
                        fontSize: 16,
                        fontFamily: "Source Han Sans SC",
                        fontWeight: "bold",
                        color: "#FFFFFF",
                        offsetCenter: [0, 0]
                    },
                    detail: {
                        show: false
                    }
                },
                {
                    type: "gauge",
                    startAngle: 90,
                    endAngle: -270,
                    radius: "70%", //仪表盘半径
                    center: ["83%", "50%"], //仪表盘位置
                    itemStyle: {
                        color: "#62BD31"
                    },
                    pointer: {
                        show: false
                    },
                    progress: {
                        show: true,
                        overlap: false,
                        roundCap: true,
                        clip: false,
                        itemStyle: {
                            borderWidth: 1,
                            borderColor: "#62BD31"
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            width: 20,
                            color: [[1, "rgba(98, 189, 49, 0.2)"]]
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    data: [
                        {
                            value: value2,
                            name: "家庭农场"
                        }
                    ],
                    title: {
                        fontSize: 16,
                        fontFamily: "Source Han Sans SC",
                        fontWeight: "bold",
                        color: "#FFFFFF",
                        offsetCenter: [0, 0]
                    },
                    detail: {
                        show: false
                    }
                }
            ]
        };
        this.$nextTick(() => {
            chart.setOption(option);
        });
    }

    //上1年主体产量分布
    setyYeldChart(countFarmSourceData: any) {
        let chart = echarts.init(this.$refs.yeld);
        let option: any = {
            color: ["#62BD31", "#E6BB45", "#43D1C5", "#2681FF", "#E7FC92"],
            title: {
                show: countFarmSourceData.length ? true : false,
                text: "产量",
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
                    name: "产量",
                    type: "pie",
                    radius: ["40%", "70%"],
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
                                fontFamily: "YouSheBiaoTiHei",
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

    //主体高产值Top10
    setHighYieldValueChart() {
        let chart = echarts.init(this.$refs.highYieldValue);
        let xAxisData: any =
            this.activeType === 1
                ? this.highOutputValue.personal.xAxisData
                : this.activeType === 2
                ? this.highOutputValue.cooperative.xAxisData
                : this.activeType === 3
                ? this.highOutputValue.family.xAxisData
                : [];
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
                    interval: 0,
                    formatter: function(params: string) {
                        let newParamsName = ""; // 最终拼接成的字符串
                        let paramsNameNumber = params.length; // 实际标签的个数
                        let provideNumber = 6; // 每行能显示的字的个数
                        let rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                        /**
                         * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                         */
                        // 条件等同于rowNumber>1
                        if (paramsNameNumber > provideNumber) {
                            /** 循环每一行,p表示行 */
                            for (let p = 0; p < rowNumber; p++) {
                                let tempStr = ""; // 表示每一次截取的字符串
                                let start = p * provideNumber; // 开始截取的位置
                                let end = start + provideNumber; // 结束截取的位置
                                // 此处特殊处理最后一行的索引值
                                if (p == rowNumber - 1) {
                                    // 最后一次不换行
                                    tempStr = params.substring(start, paramsNameNumber);
                                } else {
                                    // 每一次拼接字符串并换行
                                    tempStr = params.substring(start, end) + "\n";
                                }
                                newParamsName += tempStr; // 最终拼成的字符串
                            }
                        } else {
                            // 将旧标签的值赋给新标签
                            newParamsName = params;
                        }
                        //将最终的字符串返回
                        return newParamsName;
                    }
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
                name: "万元",
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
                        data.name + '：' +
                        data.value +
                        "万元";
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
                    data:
                        this.activeType === 1
                            ? this.highOutputValue.personal.yAxisData
                            : this.activeType === 2
                            ? this.highOutputValue.cooperative.yAxisData
                            : this.activeType === 3
                            ? this.highOutputValue.family.yAxisData
                            : [],
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
            if(!this.timer1) {
                let len = 0;
                // clearInterval(this.timer1);
                this.timer1 = setInterval(() => {
                    if (len === xAxisData.length) {
                        len = 0;
                    }
                    chart.dispatchAction({ type: "showTip", seriesIndex: 0, dataIndex: len }); //设置默认选中高亮部分
                    len++;
                }, 3000);
            }
        });
    }

    //主体低产值Top10
    setLowYieldValueChart() {
        let chart = echarts.init(this.$refs.lowYieldValue);
        let xAxisData: any = this.activeTypeT === 1
                        ? this.lowOutputValue.personal.xAxisData
                        : this.activeTypeT === 2
                        ? this.lowOutputValue.cooperative.xAxisData
                        : this.activeTypeT === 3
                        ? this.lowOutputValue.family.xAxisData
                        : []
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
                    interval: 0,
                    formatter: function(params: string) {
                        let newParamsName = ""; // 最终拼接成的字符串
                        let paramsNameNumber = params.length; // 实际标签的个数
                        let provideNumber = 6; // 每行能显示的字的个数
                        let rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                        /**
                         * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                         */
                        // 条件等同于rowNumber>1
                        if (paramsNameNumber > provideNumber) {
                            /** 循环每一行,p表示行 */
                            for (let p = 0; p < rowNumber; p++) {
                                let tempStr = ""; // 表示每一次截取的字符串
                                let start = p * provideNumber; // 开始截取的位置
                                let end = start + provideNumber; // 结束截取的位置
                                // 此处特殊处理最后一行的索引值
                                if (p == rowNumber - 1) {
                                    // 最后一次不换行
                                    tempStr = params.substring(start, paramsNameNumber);
                                } else {
                                    // 每一次拼接字符串并换行
                                    tempStr = params.substring(start, end) + "\n";
                                }
                                newParamsName += tempStr; // 最终拼成的字符串
                            }
                        } else {
                            // 将旧标签的值赋给新标签
                            newParamsName = params;
                        }
                        //将最终的字符串返回
                        return newParamsName;
                    }
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
                name: "万元",
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
                        data.name + '：' +
                        data.value +
                        "万元";
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
                    data:
                        this.activeTypeT === 1
                            ? this.lowOutputValue.personal.yAxisData
                            : this.activeTypeT === 2
                            ? this.lowOutputValue.cooperative.yAxisData
                            : this.activeTypeT === 3
                            ? this.lowOutputValue.family.yAxisData
                            : [],
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
            if(!this.timer2) {
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

    //上1年主体产值分布
    setMainOutputValueChart(countFarmSourceData: any) {
        let chart = echarts.init(this.$refs.mainOutputValue);
        let option: any = {
            color: ["#62BD31", "#E6BB45", "#43D1C5", "#2681FF", "#E7FC92"],
            title: {
                show: countFarmSourceData.length ? true : false,
                text: "产值",
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
                    name: "产值",
                    type: "pie",
                    radius: ["40%", "70%"],
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
                                fontFamily: "YouSheBiaoTiHei",
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
            // console.log(data, 111);
            let xAxisData: any = [],
                yAxisData: any = [],
                yAxisData1: any = [],
                valueData: any = [];
            let personalProportion: number = 0,
                cooperativeProportion: number = 0,
                familyProportion: number = 0;
            switch (data.key) {
                case "/subjectSituation/ztMainClassify": //主体分类统计
                    data.data.forEach((item: any) => {
                        xAxisData.push(item.type);
                        yAxisData.push(item.totalOutput);
                        yAxisData1.push(item.totalOutputValue);
                    });
                    this.$nextTick(() => {
                        this.setTransactionNumChart(xAxisData, yAxisData, yAxisData1);
                    });
                    break;
                case "/subjectSituation/ztMainClassifySurvey": //主体情况概览
                    this.form.mainCount = data.data[0].mainCount || 0;
                    this.form.totalOutput = data.data[0].totalOutput || 0;
                    this.form.totalOutputValue = data.data[0].totalOutputValue || 0;
                    this.$nextTick(() => {
                        animateValue(this.$refs.mainCount, this.form.mainCount, 1000);
                        animateValue(this.$refs.totalOutput, this.form.totalOutput, 1000);
                        animateValue(this.$refs.totalOutputValue, this.form.totalOutputValue, 1000);
                    });
                    break;
                case "/subjectSituation/ztPlantAreaDistribut": //主体种植面积分布
                    data.data.forEach((item: any) => {
                        if (item.type === "个人") {
                            this.form.personalArea = item.plantAreaCount || 0;
                            personalProportion = parseFloat((item.plantAreaCount / item.allPlantArea).toFixed(2)) * 100;
                        } else if (item.type === "合作社") {
                            this.form.cooperativeArea = item.plantAreaCount || 0;
                            cooperativeProportion =
                                parseFloat((item.plantAreaCount / item.allPlantArea).toFixed(2)) * 100;
                        } else if (item.type === "家庭农场") {
                            this.form.familyArea = item.plantAreaCount || 0;
                            familyProportion = parseFloat((item.plantAreaCount / item.allPlantArea).toFixed(2)) * 100;
                        }
                    });
                    this.$nextTick(() => {
                        animateValue(this.$refs.personalArea, this.form.personalArea, 1000);
                        animateValue(this.$refs.cooperativeArea, this.form.cooperativeArea, 1000);
                        animateValue(this.$refs.familyArea, this.form.familyArea, 1000);
                        this.setalreaChart(personalProportion, cooperativeProportion, familyProportion);
                    });
                    break;
                case "/subjectSituation/ztMainClassifyYield": //主体产量分布
                    data.data.forEach((item: any) => {
                        let obj = {
                            name: item.type,
                            value: item.totalOutput
                        };
                        valueData.push(obj);
                    });
                    this.$nextTick(() => {
                        this.setyYeldChart(valueData);
                    });
                    break;
                case "/subjectSituation/ztHighOutputValue": //高产值top10
                    this.highOutputValue = {
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
                    data.data.forEach((item: any) => {
                        if (item.type === "个人") {
                            this.highOutputValue.personal.xAxisData.push(item.name);
                            this.highOutputValue.personal.yAxisData.push(item.totalOutput);
                        } else if (item.type === "合作社") {
                            this.highOutputValue.cooperative.xAxisData.push(item.name);
                            this.highOutputValue.cooperative.yAxisData.push(item.totalOutput);
                        } else if (item.type === "家庭农场") {
                            this.highOutputValue.family.xAxisData.push(item.name);
                            this.highOutputValue.family.yAxisData.push(item.totalOutput);
                        }
                    });
                    this.$nextTick(() => {
                        this.setHighYieldValueChart();
                    });
                    break;
                case "/subjectSituation/ztLowOutputValue": //低产值top10
                    this.lowOutputValue = {
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
                    data.data.forEach((item: any) => {
                        if (item.type === "个人") {
                            this.lowOutputValue.personal.xAxisData.push(item.name);
                            this.lowOutputValue.personal.yAxisData.push(item.totalOutput);
                        } else if (item.type === "合作社") {
                            this.lowOutputValue.cooperative.xAxisData.push(item.name);
                            this.lowOutputValue.cooperative.yAxisData.push(item.totalOutput);
                        } else if (item.type === "家庭农场") {
                            this.lowOutputValue.family.xAxisData.push(item.name);
                            this.lowOutputValue.family.yAxisData.push(item.totalOutput);
                        }
                    });
                    this.$nextTick(() => {
                        this.setLowYieldValueChart();
                    });
                    break;
                case "/subjectSituation/ztMainClassifyOutPut": //主体产值分布
                    data.data.forEach((item: any) => {
                        let obj = {
                            name: item.type,
                            value: item.totalOutputValue
                        };
                        valueData.push(obj);
                    });
                    this.$nextTick(() => {
                        this.setMainOutputValueChart(valueData);
                    });
                    break;
                case "/subjectSituation/ztPlantSubjectRecord": //种植主体列表
                    this.plantingSubjectList = data.data;
                    this.plantingSubjectList.forEach((item: any) => {
                        item.registDate = m(item.registDate).format("YYYY-MM-DD");
                    });
                    break;
            }
        }, 300);
    }

    setActive(type: number) {
        this.activeType = type;
        this.setHighYieldValueChart();
    }
    setActiveT(type: number) {
        this.activeTypeT = type;
        this.setLowYieldValueChart();
    }

    getParams(index: number) {
        //拼接查询条件
        return () => {
            return this.apiKeyList[index] && this.apiKeyList[index].params ? this.apiKeyList[index].params : {};
        };
    }

    back() {
        // this.$router.go(-1);
        this.$router.push({ path: '/vegetable' });
    }

    mounted() {
        //接口调用
        if (this.$route.path==='/vegetable/mainStatus') {
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
                this.timer0 = setInterval(() => {
                    if (this.activeType === 3) {
                        this.setActive(1);
                    } else {
                        this.setActive(this.activeType + 1);
                    }
                    if (this.activeTypeT === 3) {
                        this.setActiveT(1);
                    } else {
                        this.setActiveT(this.activeTypeT + 1);
                    }
                }, 10000);
            }, 800);
        }
    }
    
    @Watch('$route')
    routeWatch(value:any) {
        //清除回调
        this.apiKeyList.forEach((item: any) => {
            socketClient.delCallBack(item.path);
            socketClient.delSend(item.path);
        });
        clearInterval(this.timer0);
        clearInterval(this.timer1);
        clearInterval(this.timer2);
    }

    beforeDestroy() {
        //清除回调
        this.apiKeyList.forEach((item: any) => {
            socketClient.delCallBack(item.path);
            socketClient.delSend(item.path);
        });
        clearInterval(this.timer0);
        clearInterval(this.timer1);
        clearInterval(this.timer2);
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
            display: flex;
            align-items: center;
            justify-content: space-between;
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
                font-size: 12px;
                font-family: Source Han Sans SC;
                font-weight: bold;
                color: #ffffff;
                opacity: 0.5;
                padding-right: 14px;
                i {
                    font-style: normal;
                    margin-right: 15px;
                    cursor: pointer;
                    font-size: 12px;
                }
                .active {
                    color: #62bd31;
                    position: relative;
                    font-size: 12px;
                    border-bottom: 1px solid #62bd31;
                    padding-bottom: 3px;
                }
                .activeT {
                    color: #e6bb45;
                    position: relative;
                    font-size: 12px;
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
                font-size: 30px;
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
            background: rgba(111, 214, 56, 0.3);
            padding: 0 20px;
            .chart-tr-title {
                font-size: 16px;
                font-family: Source Han Sans SC;
                font-weight: bold;
                color: #6fd638;
                line-height: 36px;
                text-shadow: 0px 0px 10px rgba(252, 205, 76, 0.6);
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
