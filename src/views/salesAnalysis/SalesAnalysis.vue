<template>
    <div class="content">
        <bgAnim></bgAnim>
        <OneSizeContainer :width="1920" :height="1080" :maxRatio="2">
            <Head title="销售端分析" @back="back">
                <template slot="leftBtn">
                    <div class="linkLeft">
                        <div class="link" @click="jump('businessEntity')">经营主体分析</div>
                        <div class="link" @click="jump('priceRedLine')">价格红线预警</div>
                    </div>
                </template>
                <template slot="rightBtn">
                    <div class="linkRight">
                        <div class="link" @click="jump('segionalSalesMutation')">区域销量突变预警</div>
                        <div class="link" @click="jump('individualEarlyWarning')">个体销量预警</div>
                    </div>
                </template>
            </Head>
            <div class="main">
                <!-- 第一排 -->
                <el-row class="mapList" :gutter="30">
                    <el-col :span="6" class="item">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">市场数量、经营户总数和区域分布</p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-left">
                                <div class="marketQuantity">
                                    <span class="num" ref="marketQuantityNum">{{ form.marketQuantityNum || 0 }}</span>
                                    <span class="text">市场数量</span>
                                </div>
                                <div class="operating">
                                    <span class="num" ref="operatingAccount">{{ form.operatingAccount || 0 }}</span>
                                    <span class="text">经营户总数</span>
                                </div>
                            </div>
                            <div class="chart-right"><div ref="marketQuantityOperating" class="echart"></div></div>
                        </div>
                    </el-col>
                    <el-col :span="12" class="item">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">
                                    {{ lastMonth.toString() + "月 · 销售数据统计" }}
                                    <span class="titleSpan">（按月统计）</span>
                                </p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="salesData">
                                <div class="saleCount">
                                    <span class="num" ref="saleCount">{{ form.saleCount || 0 }}</span>
                                    <span class="text">销售数量 (吨)</span>
                                </div>
                                <div class="saleType">
                                    <span class="num" ref="saleType">{{ form.saleType || 0 }}</span>
                                    <span class="text">销售种类 (类)</span>
                                </div>
                                <div class="saleMoney">
                                    <span class="num" ref="saleMoney">{{ form.saleMoney || 0 }}</span>
                                    <span class="text">销售额 (万元)</span>
                                </div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6" class="item">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">农产品销量及销售额走势图</p>
                            </div>
                        </div>
                        <div class="chart"><div ref="salesTrend" class="echart"></div></div>
                    </el-col>
                </el-row>
                <!-- 第二排 -->
                <el-row class="mapList" :gutter="30">
                    <el-col :span="6" class="item">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">
                                    在售农产品类型及数量
                                    <span class="titleSpan">（可滚动缩放左右拖动查看）</span>
                                </p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-right"><div ref="produceTypeNum" class="echart"></div></div>
                        </div>
                    </el-col>
                    <el-col :span="6" class="item">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">主要农产品实时价格列表</p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-item">
                                <el-row class="chart-tr">
                                    <el-col :span="7" class="chart-tr-title">农产品名称</el-col>
                                    <el-col :span="8" class="chart-tr-title">价格</el-col>
                                    <el-col :span="5" class="chart-tr-title">日期</el-col>
                                    <el-col :span="4" class="chart-tr-title">较昨日</el-col>
                                </el-row>
                                <vue-seamless-scroll
                                    :data="farmRealPriceList"
                                    :class-option="classOption"
                                    class="seamless-warp"
                                >
                                    <el-row class="chart-th" v-for="(item, index) in farmRealPriceList" :key="index">
                                        <el-col 
                                          :span="7" 
                                          class="chart-th-item" 
                                          :style="{textShadow: item.farmName === '糯米山药'? '1px 1px 0px #ffffff':'none'}">
                                            {{ item.farmName || "-" }}
                                        </el-col>
                                        <el-col :span="8" class="chart-th-item">
                                            {{ item.farmPrice || "-" }}元/Kg
                                        </el-col>
                                        <el-col :span="5" class="chart-th-item">{{ item.resultDate || "-" }}</el-col>
                                        <el-col
                                            :span="4"
                                            class="chart-th-item compare"
                                            :style="{ color: item.compare === 1 ? '#29CC44' : '#FF4C4C' }"
                                        >
                                            <img
                                                src="../../assets/images/salesAnalysis/decline.png"
                                                v-if="item.compare === 1"
                                                alt=""
                                            />
                                            <img src="../../assets/images/salesAnalysis/top.png" v-else alt="" />
                                            <span>{{ item.farmRate || "-" }}%</span>
                                        </el-col>
                                    </el-row>
                                </vue-seamless-scroll>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6" class="item">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">当前价格与历史价格趋势比对</p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-item">
                                <el-row class="chart-tr">
                                    <el-col :span="7" class="chart-tr-title">农产品名称</el-col>
                                    <el-col :span="8" class="chart-tr-title">本月平均价格</el-col>
                                    <el-col :span="5" class="chart-tr-title">同比</el-col>
                                    <el-col :span="4" class="chart-tr-title">较昨日</el-col>
                                </el-row>
                                <vue-seamless-scroll
                                    :data="farmMonthPriceList"
                                    :class-option="classOption"
                                    class="seamless-warp"
                                >
                                    <el-row class="chart-th" v-for="(item, index) in farmMonthPriceList" :key="index">
                                        <el-col 
                                          :span="7" 
                                          class="chart-th-item"
                                          :style="{textShadow: item.farmName === '糯米山药'? '1px 1px 0px #ffffff':'none'}">
                                            {{ item.farmName || "-" }}
                                        </el-col>
                                        <el-col :span="8" class="chart-th-item">
                                            {{ item.farmPrice || "-" }}元/Kg
                                        </el-col>
                                        <el-col
                                            :span="5"
                                            class="chart-th-item compare"
                                            :style="{ color: item.grewRateType === 1 ? '#29CC44' : '#FF4C4C' }"
                                        >
                                            <img
                                                src="../../assets/images/salesAnalysis/decline.png"
                                                v-if="item.grewRateType === 1"
                                                alt=""
                                            />
                                            <img src="../../assets/images/salesAnalysis/top.png" v-else alt="" />
                                            <span>{{ item.grewRate || "-" }}%</span>
                                        </el-col>
                                        <el-col
                                            :span="4"
                                            class="chart-th-item compare"
                                            :style="{ color: item.ringRatioType === 1 ? '#29CC44' : '#FF4C4C' }"
                                        >
                                            <img
                                                src="../../assets/images/salesAnalysis/decline.png"
                                                v-if="item.ringRatioType === 1"
                                                alt=""
                                            />
                                            <img src="../../assets/images/salesAnalysis/top.png" v-else alt="" />
                                            <span>{{ item.ringRatio || "-" }}%</span>
                                        </el-col>
                                    </el-row>
                                </vue-seamless-scroll>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="6" class="item">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">销量突变预警</p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-item">
                                <el-row class="chart-tr">
                                    <el-col :span="7" class="chart-tr-title">农产品名称</el-col>
                                    <el-col :span="8" class="chart-tr-title">异常销量（吨）</el-col>
                                    <el-col :span="5" class="chart-tr-title">历史销量</el-col>
                                    <el-col :span="4" class="chart-tr-title">时间</el-col>
                                </el-row>
                                <vue-seamless-scroll
                                    :data="farmSalesMutationWarnList"
                                    :class-option="classOption"
                                    class="seamless-warp"
                                >
                                    <el-row
                                        class="chart-th"
                                        v-for="(item, index) in farmSalesMutationWarnList"
                                        :key="index"
                                    >
                                        <el-col 
                                          :span="7" 
                                          class="chart-th-item"
                                          :style="{textShadow: item.farmName === '糯米山药'? '1px 1px 0px #ffffff':'none'}">
                                            {{ item.farmName || "-" }}
                                        </el-col>
                                        <el-col :span="8" class="chart-th-item">
                                            {{ item.abnormalSales || "-" }}
                                        </el-col>
                                        <el-col :span="5" class="chart-th-item">{{ item.hisSales || "-" }}</el-col>
                                        <el-col :span="4" class="chart-th-item ">{{ item.resultDate || "-" }}</el-col>
                                    </el-row>
                                </vue-seamless-scroll>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <!-- 第三排 -->
                <el-row class="mapList" :gutter="30">
                    <el-col :span="6" class="item">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">农产品来源分布</p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-right"><div ref="source" class="echart"></div></div>
                        </div>
                    </el-col>
                    <el-col :span="6" class="item">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">农产品成交金额Top10</p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-right"><div ref="transactionAmount" class="echart"></div></div>
                        </div>
                    </el-col>
                    <el-col :span="6" class="item">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">
                                    农产品成交数量Top10
                                    <span class="titleSpan">（可滚动缩放左右拖动查看）</span>
                                </p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-right"><div ref="transactionNum" class="echart"></div></div>
                        </div>
                    </el-col>
                    <el-col :span="6" class="item">
                        <div class="title">
                            <i class="icon-head"></i>
                            <div class="title-right">
                                <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
                                <p class="title-text">个体销量预警</p>
                            </div>
                        </div>
                        <div class="chart">
                            <div class="chart-item">
                                <el-row class="chart-tr">
                                    <el-col :span="7" class="chart-tr-title">经营户名称</el-col>
                                    <el-col :span="8" class="chart-tr-title">异常销量（吨）</el-col>
                                    <el-col :span="5" class="chart-tr-title">历史销量</el-col>
                                    <el-col :span="4" class="chart-tr-title">时间</el-col>
                                </el-row>
                                <vue-seamless-scroll
                                    :data="farmIndividualSalesList"
                                    :class-option="classOption"
                                    class="seamless-warp"
                                >
                                    <el-row
                                        class="chart-th"
                                        v-for="(item, index) in farmIndividualSalesList"
                                        :key="index"
                                    >
                                        <el-col :span="7" class="chart-th-item">{{ item.individualName }}</el-col>
                                        <el-col :span="8" class="chart-th-item">{{ item.abnormalSales }}</el-col>
                                        <el-col :span="5" class="chart-th-item">{{ item.hisSales }}</el-col>
                                        <el-col :span="4" class="chart-th-item ">{{ item.resultDate }}</el-col>
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
import { animateValue, noPassByName } from "@/util";
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
        marketQuantityNum: any;
        marketQuantityOperating: any;
        saleCount: any;
        saleType: any;
        saleMoney: any;
        salesTrend: any;
        operatingAccount: any;
        produceTypeNum: any;
        source: any;
        transactionAmount: any;
        transactionNum: any;
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
            //销售基础统计(上月)
            path: "/saleCount/saleBasicCount",
            params: {
                year: m().format("YYYY"),
                month: m().format("MM")
            }
        },
        {
            //当前市场数据
            path: "/saleCount/marketOperatorCount",
            params: {
                year: m().format("YYYY")
            }
        },
        {
            //农产品销量及销售额走势(上月)
            path: "/saleCount/listFarmSalesTrend",
            params: {
                year: m().format("YYYY"),
                month: m().format("MM")
            }
        },
        {
            //在售农产品列表
            path: "/saleCount/listFarmYearCount",
            params: {
                year: m().format("YYYY")
            }
        },
        {
            // 主要农产品今日价格列表
            path: "/saleCount/listFarmRealPrice",
            params: {
                // year: 2020,
                // month: '02',
                // day: '01'
                year: m().format("YYYY"),
                month: m().format("MM"),
                day: m().format("DD")
            }
        },
        {
            // 主要农产品历史价格趋势比对(近1月)
            path: "/saleCount/listFarmMonthPrice",
            params: {
                // year: 2020,
                // month: '03',
                year: m().format("YYYY"),
                month: m().format("MM")
            }
        },
        {
            // 销量突变预警
            path: "/saleCount/listFarmSalesMutationWarn",
            params: {
                // year: 2020,
                // month: '03',
                // day: '01'
                year: m().format("YYYY"),
                month: m().format("MM"),
                day: m().format("DD")
            }
        },
        {
            // 农产品来源分布
            path: "/saleCount/countFarmSource",
            params: {
                year: m().format("YYYY")
            }
        },
        {
            // 农产品成交金额前十
            path: "/saleCount/listFarmYearCountByTurnover",
            params: {
                year: m().format("YYYY")
            }
        },
        {
            // 农产品成交数量前十
            path: "/saleCount/listFarmYearCountByCount",
            params: {
                year: m().format("YYYY")
            }
        },
        {
            // 个体销售预警
            path: "/saleCount/listFarmIndividualSales",
            params: {
                year: m().format("YYYY"),
                month: m().format("MM"),
                day: m().format("DD")
            }
        }
    ];

    form: any = {};

    classOption: Object = {
        step: 0.2,
        limitMoveNum: 7
    };

    farmRealPriceList: any = [];

    farmMonthPriceList: any = [];

    farmSalesMutationWarnList: any = [];

    farmIndividualSalesList: any = [];

    //市场数量、经营户总数和区域分布
    setMarketQuantityOperatingChart(marketQuantityOperatingData: any) {
        let chart = echarts.init(this.$refs.marketQuantityOperating);
        let option: any = {
            color: ["#2681FF", "#3AE2FF", "#FCCD4C", "#22AC38", "#E7FC92"],
            title: {
                text: "区域分布Top5",
                bottom: 10,
                left: "center",
                textStyle: {
                    fontSize: 16,
                    color: "#FFFFFF",
                    fontFamily: "Source Han Sans SC",
                    fontWeight: 400
                }
            },
            series: [
                {
                    name: "区域分布Top5",
                    type: "pie",
                    radius: ["60%", "90%"],
                    center: ["50%", "50%"],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: "center"
                    },
                    // itemStyle: {
                    //     normal: {
                    //         borderWidth: 1, // 间距的宽度
                    //         borderColor: "#4D4D4A" ,//背景色
                    //     }
                    // },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: "20",
                            fontWeight: "bold",
                            formatter: ["{a|{d}%}", "{b|{b}}"].join("\n"),
                            rich: {
                                a: {
                                    fontSize: 30,
                                    fontFamily: "YouSheBiaoTiHei",
                                    fontWeight: 400,
                                    color: "#FFFFFF"
                                },
                                b: {
                                    fontSize: 16,
                                    fontFamily: "YouSheBiaoTiHei",
                                    fontWeight: 400,
                                    color: "#FFFFFF"
                                }
                            }
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: marketQuantityOperatingData
                }
            ]
        };
        this.$nextTick(() => {
            chart.setOption(option);
            if(!this.timer0) {
                let len = 0;
                // clearInterval(this.timer0);
                this.timer0 = setInterval(() => {
                    if (len === marketQuantityOperatingData.length) {
                        len = 0;
                    }
                    marketQuantityOperatingData.forEach((item: any, index:any) => {
                        if(index !== len) {
                            chart.dispatchAction({
                                type: "downplay",
                                seriesIndex: 0,
                                dataIndex: index
                            });
                        }
                    })
                    chart.dispatchAction({ type: "highlight", seriesIndex: 0, dataIndex: len }); //设置默认选中高亮部分
                
                    chart.on("mouseover", function(e: any) {
                        if (e.dataIndex != len) {
                            marketQuantityOperatingData.forEach((item: any, index:any) => {
                                    chart.dispatchAction({
                                        type: "downplay",
                                        seriesIndex: 0,
                                        dataIndex: index
                                    });
                            })
                            chart.dispatchAction({ type: "highlight", seriesIndex: 0, dataIndex: e.dataIndex });
                        }
                    });
                
                    chart.on("mouseout", function(e: any) {
                        marketQuantityOperatingData.forEach((item: any, index:any) => {
                                chart.dispatchAction({
                                    type: "downplay",
                                    seriesIndex: 0,
                                    dataIndex: index
                                });
                        })
                        chart.dispatchAction({ type: "highlight", seriesIndex: 0, dataIndex: len });
                    });
                    len++;
                }, 3000);
            }
        });
    }

    //农产品销量及销售额走势图
    setSalesTrendChart(xAxisData: any, saleCountData: any, saleMoneyData: any) {
        let chart = echarts.init(this.$refs.salesTrend);
        let option: any = {
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            },
            legend: {
                type: "plain",
                icon: "rect",
                itemHeight: 8,
                itemWidth: 8,
                textStyle: {
                    color: "#ffffff",
                    fontSize: 12,
                    fontFamily: "Source Han Sans SC",
                    fontWeight: 400
                },
                data: ["农场品销量", "销售额"],
                top: 20,
                right: "auto"
            },
            xAxis: {
                type: "category",
                data: xAxisData,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#ffffff",
                        opacity: 0.5,
                        fontSize: 14
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "#ffffff",
                    nterval:0,
                }
            },
            yAxis: [
                {
                    type: "value",
                    name: "吨",
                    nameLocation: "end",
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#ffffff",
                            opacity: 0.5,
                            fontSize: 14
                        }
                    },
                    axisLabel: {
                        color: (value: any, index: any) => {
                            return (value = "#BAB5B5");
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            type: "dashed",
                            color: "#ffffff",
                            opacity: 0.5
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    nameTextStyle: {
                        padding: [0, 40, 0, 0],
                        color: "#BAB5B5"
                    }
                },
                {
                    type: "value",
                    name: "万元",
                    nameLocation: "end",
                    position: "right",
                    nameTextStyle: {
                        padding: [0, 0, 0, 40],
                        color: "#BAB5B5"
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "#ffffff",
                            opacity: 0.5,
                            fontSize: 14
                        }
                    },
                    max: 500,
                    splitNumber: 10,
                    axisLabel: {
                        color: (value: any, index: any) => {
                            return (value = "#BAB5B5");
                        }
                    }
                }
            ],
            tooltip: {
                trigger: "axis",
                backgroundColor: 'rgba(3,3,3,0.5)',
                borderWidth: 0,
                textStyle: {
                      color: '#ffffff',
                      fontSize: '14',
                },
                formatter: function(datas: any) {
                    let res = datas[0].name + "<br/>",
                        val;
                    for (let i = 0, length = datas.length; i < length; i++) {
                        val = datas[i].value + (i == 0 ? "吨" : "万元");
                        res += datas[i].marker + datas[i].seriesName + "：" + val + "<br/>";
                    }
                    return res;
                }
            },
            series: [
                {
                    data: saleCountData,
                    type: "line",
                    name: "农场品销量",
                    symbolSize: 15, //拐点大小
                    symbol: "circle", //拐点样式
                    itemStyle: {
                        normal: {
                            color: "#29CC44", //拐点颜色
                            borderColor: "#fff",
                            borderWidth: 3,
                            shadowOffsetX: -1, // 折线的X偏移
                            shadowOffsetY: 4, // 折线的Y偏移
                            shadowBlur: 3, // 折线模糊
                            shadowColor: "rgba(3,3,3, 0.4)", //折线颜色
                            label: {
                                show: true,
                                fontSize: 16,
                                fontWeight: 400,
                                fontFamily: "YouSheBiaoTiHei",
                                color: "#29CC44",
                                // textShadowColor: "#000",
                                // textShadowBlur: 40,
                                // textShadowOffsetX: 3,
                                // textShadowOffsetY: 4
                            }
                        }
                    },

                    yAxisIndex: 0, //对应标签yAxis中的第一个数据
                    lineStyle: {
                        // 阴影部分
                        shadowBlur: 2,
                        shadowColor: "#333333",
                        shadowOffsetY: 4,
                        shadowOffsetX: -4,
                    }
                },
                {
                    data: saleMoneyData,
                    type: "line",
                    name: "销售额",
                    symbolSize: 15, //拐点大小
                    symbol: "circle", //拐点样式
                    itemStyle: {
                        normal: {
                            color: "#FCCD4C", //拐点颜色
                            borderColor: "#fff",
                            borderWidth: 3,
                            shadowOffsetX: -1, // 折线的X偏移
                            shadowOffsetY: 4, // 折线的Y偏移
                            shadowBlur: 3, // 折线模糊
                            shadowColor: "rgba(3,3,3, 0.4)", //折线颜色
                            label: {
                                show: true,
                                fontSize: 16,
                                fontWeight: 400,
                                fontFamily: "YouSheBiaoTiHei",
                                color: "#FCCD4C",
                                // textShadowColor: "#000",
                                // textShadowBlur: 40,
                                // textShadowOffsetX: 3,
                                // textShadowOffsetY: 4
                            }
                        }
                    },
                    yAxisIndex: 1, //对应标签yAxis中的第二个数据
                    lineStyle: {
                        // 阴影部分
                        shadowBlur: 2,
                        shadowColor: "#333333",
                        shadowOffsetY: 4,
                        shadowOffsetX: -4,
                    }
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

    //在售农产品类型及数量
    setProduceTypeNumChart(xAxisData: any, farmCountData: any) {
        let chart = echarts.init(this.$refs.produceTypeNum);
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
                    formatter: (value: any) => {
                        return `{${value === "糯米山药"? "a" : "b"}|${value}}`;
                    },
                    rich: {
                        a: {
                            color: '#ffffff',
                            fontSize: 14,
                            // fontWeight: 800,
                            textBorderColor: '#ffffff',
                            textBorderWidth: 1,
                            textBorderDashOffset: 20,
                        },
                        b: {
                            color: '#ffffff',
                            fontSize: 14,
                            // fontWeight: 400,
                        }
                    },
                    interval: 0
                    // rotate:40,//倾斜度
                }
            },
            yAxis: [
                {
                    type: "value",
                    // name: "万元",
                    // nameLocation: "end",
                    // nameTextStyle: {
                    //     padding: [0, 40, 0, 0],
                    //     color: "#BAB5B5"
                    // },
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
            dataZoom: {
                type: "inside",
                minValueSpan: 5,
                maxValueSpan: 5
            },
            series: [
                {
                    type: "pictorialBar",
                    barCategoryGap: "0%",
                    symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
                    barWidth: 37,
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
                    data: farmCountData
                }
            ]
        };
        this.$nextTick(() => {
            chart.setOption(option);
            // let len = 0;
            // clearInterval(this.timer2);
            // this.timer2 = setInterval(() => {
            //     // if (len === xAxisData.length) {
            //     //     len = 0;
            //     // }
            //     if (len === 100) {
            //         len = 0;
            //     }
            //     chart.dispatchAction({ type: "dataZoom", start: len, end: len + 20});
            //     len = len + 20;
            // }, 3000);
        });
    }

    //农产品来源分布
    setSourceChart(countFarmSourceData: any) {
        let chart = echarts.init(this.$refs.source);
        let option: any = {
            color: ["#2681FF", "#3AE2FF", "#FCCD4C", "#22AC38", "#E7FC92"],
            title: {
                show: countFarmSourceData.length ? true : false,
                text: "来源",
                top: "center",
                left: "center",
                textStyle: {
                    fontSize: 18,
                    fontFamily: "Source Han Sans SC",
                    fontWeight: "bold",
                    color: "#FFFFFF",
                    textShadowColor: "#006AFF",
                    textShadowBlur: 8,
                    textShadowOffsetX: 0,
                    textShadowOffsetY: 0
                }
            },
            series: [
                {
                    name: "区域分布Top5",
                    type: "pie",
                    radius: ["40%", "70%"],
                    center: ["50%", "50%"],
                    avoidLabelOverlap: false,
                    label: {
                        formatter: ["{a|{d}%}", "{b|{b}}"].join("\n"),
                        rich: {
                            a: {
                                fontSize: 24,
                                fontFamily: "YouSheBiaoTiHei",
                                fontWeight: 400,
                                color: "#FFFFFF"
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
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: "20",
                            fontWeight: "bold",
                            formatter: ["{a|{d}%}", "{b|{b}}"].join("\n"),
                            rich: {
                                a: {
                                    fontSize: 24,
                                    fontFamily: "YouSheBiaoTiHei",
                                    fontWeight: 400
                                    // color: "#FFFFFF"
                                },
                                b: {
                                    fontSize: 12,
                                    fontFamily: "YouSheBiaoTiHei",
                                    fontWeight: 400
                                    // color: "#FFFFFF"
                                }
                            }
                        }
                    },
                    data: countFarmSourceData
                }
            ]
        };
        this.$nextTick(() => {
            chart.setOption(option);
            if (!this.timer3) {
                let len = 0;
                // clearInterval(this.timer3);
                this.timer3 = setInterval(() => {
                    if (len === countFarmSourceData.length) {
                        len = 0;
                    }
                    countFarmSourceData.forEach((item: any, index:any) => {
                        if(index !== len) {
                            chart.dispatchAction({
                                type: "downplay",
                                seriesIndex: 0,
                                dataIndex: index
                            });
                        }
                    })
                    chart.dispatchAction({ type: "highlight", seriesIndex: 0, dataIndex: len }); //设置默认选中高亮部分
                
                    chart.on("mouseover", function(e: any) {
                        if (e.dataIndex != len) {
                            countFarmSourceData.forEach((item: any, index:any) => {
                                    chart.dispatchAction({
                                        type: "downplay",
                                        seriesIndex: 0,
                                        dataIndex: index
                                    });
                            })
                            chart.dispatchAction({ type: "highlight", seriesIndex: 0, dataIndex: e.dataIndex });
                        }
                    });
                
                    chart.on("mouseout", function(e: any) {
                        countFarmSourceData.forEach((item: any, index:any) => {
                                chart.dispatchAction({
                                    type: "downplay",
                                    seriesIndex: 0,
                                    dataIndex: index
                                });
                        })
                        chart.dispatchAction({ type: "highlight", seriesIndex: 0, dataIndex: len });
                    });
                    len++;
                }, 3000);
            }
        });
    }

    //农产品成交金额Top10
    setTransactionAmountChart(yAxisData: any, yAxisDataT: any, data: any, markPointData: any) {
        let chart = echarts.init(this.$refs.transactionAmount);
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
                        interval:0,
                        formatter: (value: any) => {
                            return `{${value === "糯米山药"? "a" : "b"}|${value}}`;
                        },
                        rich: {
                            a: {
                                color: '#ffffff',
                                fontSize: 14,
                                // fontWeight: 800,
                                textBorderColor: '#ffffff',
                                textBorderWidth: 1,
                                textBorderDashOffset: 20,
                            },
                            b: {
                                color: '#ffffff',
                                fontSize: 14,
                                // fontWeight: 400,
                            }
                        },
                        
                        // rotate:40,//倾斜度
                    },
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
                    let res =
                        data[0].marker +
                        data[0].name + '：' +
                        data[0].value +
                        "万元";
                    return res;
                },
                backgroundColor: 'rgba(3,3,3,0.5)',
                borderWidth: 0,
                textStyle: {
                      color: '#ffffff',
                      fontSize: '14',
                },
            },
        };
        this.$nextTick(() => {
            chart.setOption(option);
            if(!this.timer4) {
                let len = yAxisData.length;
                // clearInterval(this.timer4);
                this.timer4 = setInterval(() => {
                    if (len === 0) {
                        len = yAxisData.length;
                    }
                    chart.dispatchAction({ type: "showTip", seriesIndex: 0, dataIndex: len-1 }); //设置默认选中高亮部分
                    len--;
                }, 3000);
            }
        });
    }

    //农产品成交数量Top10
    setTransactionNumChart(categoryData: any, chartdata: any) {
        let chart = echarts.init(this.$refs.transactionNum);
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
            legend: {
                // top: 10,
                // itemWidth: 8,
                // itemHeight: 8,
                icon: "circle",
                left: "center",
                padding: 0,
                textStyle: {
                    color: "#c0c3cd",
                    fontSize: 14,
                    padding: [2, 0, 0, 0]
                }
            },
            color: ["#26BF40", "rgba(38, 191, 64, 0.9)"],
            grid: {
                top: "10%",
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            },
            dataZoom: {
                type: "inside",
                minValueSpan: 4,
                maxValueSpan: 4
            },
            xAxis: {
                axisLabel: {
                    interval:0,
                    formatter: (value: any) => {
                        return `{${value === "糯米山药"? "a" : "b"}|${value}}`;
                    },
                    rich: {
                        a: {
                            color: '#ffffff',
                            fontSize: 14,
                            // fontWeight: 800,
                            textBorderColor: '#ffffff',
                            textBorderWidth: 1,
                            textBorderDashOffset: 20,
                        },
                        b: {
                            color: '#ffffff',
                            fontSize: 14,
                            // fontWeight: 400,
                        }
                    },
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
                data: categoryData,
                type: "category"
            },
            yAxis: {
                axisLabel: {
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 14
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
                        // color: '#333',
                        width: 1
                        // "type": "dashed"
                    }
                    // show: true,
                },
                name: ""
            },
            series: [
                {
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
            ],
            tooltip: {
                show: true,
                formatter: (data: any) => {
                    let res =
                        data.marker +
                        data.name + '：' +
                        data.value;
                    return res;
                },
                backgroundColor: 'rgba(3,3,3,0.5)',
                borderWidth: 0,
                textStyle: {
                      color: '#ffffff',
                      fontSize: '14',
                },
            }
        };
        this.$nextTick(() => {
            chart.setOption(option);
            // let len = 0;
            // clearInterval(this.timer5);
            // this.timer5 = setInterval(() => {
            //     // if (len === categoryData.length) {
            //     //     len = 0;
            //     // }
            //     if (len === 100) {
            //         len = 0;
            //     }
            //     chart.dispatchAction({ type: "dataZoom", start: len, end: len + 20});
            //     len = len + 20;
            // }, 3000);
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
    //             echarts.init(that.$refs.transactionNum).resize();
    //             echarts.init(that.$refs.transactionAmount).resize();
    //             echarts.init(that.$refs.source).resize();
    //             echarts.init(that.$refs.produceTypeNum).resize();
    //             echarts.init(that.$refs.salesTrend).resize();
    //             echarts.init(that.$refs.marketQuantityOperating).resize();
    //             that.timer = false;
    //         }, 400);
    //     }
    // }

    getData(data: any) {
        setTimeout(() => {
            console.log(data, 111);
            let xAxisData: any = [],
                marketQuantityOperatingData: any = [],
                saleCountData: any = [],
                saleMoneyData: any = [],
                farmCountData: any = [],
                countFarmSourceData: any = [],
                farmYearCountByTurnoverData: any = [],
                yAxisData: any = [],
                yAxisDataT: any = [],
                markPointData: any = [],
                farmYearCountByCountData: any = [];
            switch (data.key) {
                case "/saleCount/saleBasicCount": //销售基础统计(上月)
                    this.form.saleCount = data.data.saleCount || 0;
                    this.form.saleType = data.data.saleType || 0;
                    this.form.saleMoney = data.data.saleMoney || 0;
                    this.$nextTick(() => {
                        animateValue(this.$refs.saleCount, this.form.saleCount, 1000);
                        animateValue(this.$refs.saleType, this.form.saleType, 1000);
                        animateValue(this.$refs.saleMoney, this.form.saleMoney, 1000);
                    });
                    break;
                case "/saleCount/marketOperatorCount": //当前市场数据
                    this.form.marketQuantityNum = data.data.marketQuantityNum || 0;
                    this.form.operatingAccount = data.data.operatingAccount || 0;
                    data.data.areaMarketCounts.forEach((item: any, index: number) => {
                        let obj = {
                            value: item.marketCount,
                            name: item.areaName
                        };
                        marketQuantityOperatingData.push(obj);
                    });
                    this.$nextTick(() => {
                        animateValue(this.$refs.marketQuantityNum, this.form.marketQuantityNum, 1000);
                        animateValue(this.$refs.operatingAccount, this.form.operatingAccount, 1000);
                        this.setMarketQuantityOperatingChart(marketQuantityOperatingData);
                    });
                    break;
                case "/saleCount/listFarmSalesTrend": //农产品销量及销售额走势(上月)
                    data.data.forEach((item: any, index: number) => {
                        let time = item.resultDate.substring(5);
                        xAxisData.push(time);
                        saleCountData.push(item.saleCount);
                        saleMoneyData.push(item.saleMoney);
                    });
                    this.$nextTick(() => {
                        this.setSalesTrendChart(xAxisData, saleCountData, saleMoneyData);
                    });
                    break;
                case "/saleCount/listFarmYearCount": //在售农产品列表
                    data.data.forEach((item: any, index: number) => {
                        xAxisData.push(item.farmType);
                        farmCountData.push(item.farmCount);
                    });
                    this.$nextTick(() => {
                        this.setProduceTypeNumChart(xAxisData, farmCountData);
                    });
                    break;
                case "/saleCount/listFarmRealPrice": //主要农产品今日价格列表
                    this.farmRealPriceList = data.data;
                    this.farmRealPriceList.forEach((item: any) => {
                        this.$set(item, "compare", item.farmRate > 0 ? 2 : 1);
                        item.farmRate = Math.abs(item.farmRate);
                        item.resultDate = item.resultDate.substring(5);
                    });
                    break;
                case "/saleCount/listFarmMonthPrice": //主要农产品历史价格趋势比对(近1月)
                    this.farmMonthPriceList = data.data;
                    this.farmMonthPriceList.forEach((item: any) => {
                        this.$set(item, "ringRatioType", item.ringRatio > 0 ? 2 : 1);
                        item.ringRatio = Math.abs(item.ringRatio);
                        this.$set(item, "grewRateType", item.grewRate > 0 ? 2 : 1);
                        item.grewRate = Math.abs(item.grewRate);
                    });
                    break;
                case "/saleCount/listFarmSalesMutationWarn": //销量突变预警
                    this.farmSalesMutationWarnList = data.data;
                    this.farmSalesMutationWarnList.forEach((item: any) => {
                        item.resultDate =
                            item.month.toString() +
                            "/" +
                            (item.day >= 10 ? item.day.toString() : "0" + item.day.toString());
                    });
                    break;
                case "/saleCount/countFarmSource": //农产品来源分布
                    data.data.forEach((item: any, index: number) => {
                        let obj = {
                            value: item.sourceCount,
                            name: item.sourceType
                        };
                        countFarmSourceData.push(obj);
                    });
                    this.$nextTick(() => {
                        this.setSourceChart(countFarmSourceData);
                    });
                    break;
                case "/saleCount/listFarmYearCountByTurnover": //农产品成交金额前十
                    data.data.forEach((item: any, index: number) => {
                        let obj = {
                            yAxis: data.data.length - (1 + index),
                            xAxis: parseFloat((item.farmTurnover / 10000).toFixed(4)),
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
                        yAxisData.unshift(item.farmType);
                        yAxisDataT.unshift(parseFloat((item.farmTurnover / 10000).toFixed(4)) + "万元");
                        farmYearCountByTurnoverData.unshift(parseFloat((item.farmTurnover / 10000).toFixed(4)));
                        markPointData.unshift(obj);
                    });
                    this.$nextTick(() => {
                        this.setTransactionAmountChart(
                            yAxisData,
                            yAxisDataT,
                            farmYearCountByTurnoverData,
                            markPointData
                        );
                    });
                    break;
                case "/saleCount/listFarmYearCountByCount": //农产品成交数量前十
                    data.data.forEach((item: any, index: number) => {
                        farmYearCountByCountData.push(item.farmCount);
                        xAxisData.push(item.farmType);
                    });
                    this.$nextTick(() => {
                        this.setTransactionNumChart(xAxisData, farmYearCountByCountData);
                    });
                    break;
                case "/saleCount/listFarmIndividualSales": //个体销量预警
                    this.farmIndividualSalesList = data.data;
                    this.farmIndividualSalesList.forEach((item: any) => {
                        item.resultDate =
                            item.month.toString() +
                            "/" +
                            (item.day >= 10 ? item.day.toString() : "0" + item.day.toString());
                        item.individualName = noPassByName(item.individualName)
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
        this.$router.push({ path: '/home' });
    }
    
    jump(url: string) {
        this.$router.push(`/salesAnalysis/${url}`)
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
        clearInterval(this.timer0);
        clearInterval(this.timer1);
        // clearInterval(this.timer2);
        clearInterval(this.timer3);
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
            padding: 0 20px;
            .chart-tr-title {
                font-size: 16px;
                font-family: Source Han Sans SC;
                font-weight: bold;
                color: #fccd4c;
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
