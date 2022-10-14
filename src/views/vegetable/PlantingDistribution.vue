<template>
    <div class="vegetable" v-if="$route.path === '/vegetable/plantingDistribution'">
        <bgAnim></bgAnim>
        <OneSizeContainer style="z-index:999;" :width="1920" :height="1080" :maxRatio="3">
            <selfHead title="种植分布监测分析" @back="back" style="z-index:999;"></selfHead>
            <div class="content">
                <div class="left">
                    <div class="leftTop">
                        <selfTitle>种植概况</selfTitle>
                        <div>
                            <el-row class="row" type="flex" justify="space-between">
                                <el-col :span="12" class="col colLeft">
                                    <p class="numLeft" ref="plantAreaCount">{{form.plantAreaCount}}</p>
                                    <p class="text">高山蔬菜总种植面积 (亩)</p>
                                </el-col>
                                <el-col :span="12" class="col">
                                    <p class="numRight" ref="totalOutputValue">{{form.totalOutputValue}}</p>
                                    <p class="text">总产值 (元)</p>
                                </el-col>
                            </el-row>
                            <el-row class="row" type="flex" justify="space-between">
                                <el-col :span="12" class="col colLeft">
                                    <p class="numLeft" ref="plantAreaAvg">{{form.plantAreaAvg}}</p>
                                    <p class="text">乡镇平均种植面积 (亩)</p>
                                </el-col>
                                <el-col :span="12" class="col">
                                    <p class="numRight" ref="totalOutputValueAvg">{{form.totalOutputValueAvg}}</p>
                                    <p class="text">乡镇平均产值 (元)</p>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="leftMid">
                        <selfTitle>
                            种植面积变化趋势
                            <span class="titleTip">（图表可左右拖动查看）</span>
                        </selfTitle>
                        <div class="leftMidChart" ref="leftMidChart"></div>
                    </div>
                    <div class="leftBottom">
                        <selfTitle>产值变化趋势</selfTitle>
                        <div class="leftBottomChart" ref="leftBottomChart"></div>
                    </div>
                </div>
                <div class="mid">
                    <div class="midTop">
                        <selfTitle>{{switchYear}}年种植行政区域分布<span class="titleTip">（默认展示上一年数据）</span></selfTitle>
                        <div class="midTopChart" ref="midTopChart"></div>
                        <div class="midSwitch">
                            <el-switch
                              v-model="switchYear"
                              :active-value="Number(currentYear)-2"
                              :inactive-value="Number(currentYear)-1"
                              @change="getYear"
                              active-color="#DBA914"
                              inactive-color="#999999">
                            </el-switch>
                            <p class="switchText" :style="{color: switchYear === (Number(currentYear)-2)? '#DBA914':'#999999'}">
                                展示{{switchYear}}年数据
                            </p>
                        </div>
                    </div>
                    <div class="midLeft">
                        <selfTitle>市场均价变化趋势</selfTitle>
                        <div class="midLeftChart" ref="midLeftChart"></div>
                    </div>
                    <div class="midRight">
                        <selfTitle>化肥均价变化趋势</selfTitle>
                        <div class="midRightChart" ref="midRightChart"></div>
                    </div>
                </div>
                <div class="right">
                    <div class="rightTop">
                        <selfTitle>
                            主要蔬菜品类
                            <span class="titleTip">（图表可上下滚动查看）</span>
                        </selfTitle>
                        <div class="rightTopChart" ref="rightTopChart"></div>
                    </div>
                    <div class="rightMid">
                        <selfTitle>
                            主要种植乡镇
                            <span class="titleTip">（图表可左右拖动查看）</span>
                        </selfTitle>
                        <div class="rightMidChart" ref="rightMidChart"></div>
                    </div>
                    <div class="rightBottom">
                        <selfTitle>农药均价变化趋势</selfTitle>
                        <div class="rightBottomChart" ref="rightBottomChart"></div>
                    </div>
                    
                </div>
            </div>
        </OneSizeContainer>
    </div>
    <router-view v-else></router-view>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import selfHead from "../../components/Head/Head.vue";
import bgAnim from "@/components/bgAnim/BgAnim.vue";
import selfTitle from "./Title.vue";
import * as echarts from "echarts";
import map from "./map.json";
import { animateValue } from "@/util";
import * as socketClient from "@/views/socketClient";
import vueSeamlessScroll from "vue-seamless-scroll";
import m from "moment";

@Component({
    name: "Vegetable",
    components: {
        selfHead,
        bgAnim,
        selfTitle,
        vueSeamlessScroll
    }
})
export default class Index extends Vue {
    public $refs!: {
        leftMidChart: HTMLDivElement;
        leftBottomChart: HTMLDivElement;
        midTopChart: HTMLDivElement;
        midLeftChart: HTMLDivElement;
        midRightChart: HTMLDivElement;
        rightTopChart: HTMLDivElement;
        rightMidChart: HTMLDivElement;
        rightBottomChart: HTMLDivElement;
        totalOutputValue: any;
        totalOutputValueAvg: any;
        plantAreaAvg: any;
        plantAreaCount: any;
    };

    currentYear: any = m().format("YYYY");
    switchYear: any = Number(m().format("YYYY"))- 1;
    
    timer1: any = null;
    timer2: any = null;
    timer3: any = null;
    timer4: any = null;
    timer5: any = null;
    timer6: any = null;
    timer7: any = null;

    sum: any = {};

    form: any = {};

    apiList: any = [
        {
           url: "/plantDistributeMonitor/pdPlantDistribute",
           params: {
               year: this.currentYear - 1
           } 
        },
        {
            url: "/plantDistributeMonitor/pdAreaPlantTrendArea",
            params: {
                year: this.currentYear - 1
            }
        },
        {
            url: "/plantDistributeMonitor/pdPriceTrendOutPut",
            params: {
                // year: this.currentYear - 1
            }
        },
        {
            url: "/plantDistributeMonitor/pdAreaPlantTrendMap",
            params: {
                year: this.switchYear
            }
        },
        {
            url: "/plantDistributeMonitor/pdPriceTrendMarket",
            params: {}
        },
        {
            url: "/plantDistributeMonitor/pdPriceTrendChemicalFertilizer",
            params: {}
        },
        {
            url: "/plantDistributeMonitor/pdVegetableType",
            params: {
                year: this.currentYear - 1
            }
        },
        {
            url: "/plantDistributeMonitor/pdAreaPlantTrendTownship",
            params: {
                year: this.currentYear - 1
            }
        },
        {
            url: "/plantDistributeMonitor/pdPriceTrendChemicalPesticides",
            params: {}
        },
    ];
    @Watch("$route", {
        deep: true,
        immediate: true
    })
    watchRoute(val: string) {
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        this.query();
    }

    getLeftMidChart(xAxisData: any, data: any) {
        let myChart = echarts.init(this.$refs.leftMidChart);
        myChart.hideLoading();
        const option: any = {
            color: ["#26BF40"],
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
                    let unit = "";
                    value.forEach((item: any) => {
                        unit = "万亩";
                        str += `<li style="position: relative;display:flex;height:20px;line-height:20px;">
                                <div style="width:10px;height:10px;border-radius:50%;background-color:#fff;position: absolute;top: 50%;transform: translateY(-50%);background-color:${
                                    item.color
                                };"></div>
                                <div style="margin-left:15px;">${item.seriesName}：${item.data / 10000}${unit}</div>
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
            dataZoom: {
                type: "inside",
                minValueSpan: 5,
                maxValueSpan: 5
            },
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
                    name: "万亩",
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
                        formatter: (value: any) => {
                            return `${value / 10000}`;
                        }
                    }
                }
            ],
            series: [
                {
                    name: "产量(吨)",
                    type: "line",
                    data: data,
                    symbol: "none",
                    smooth: true,
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
                                        color: "rgba(38, 191, 64, 1)"
                                    },
                                    {
                                        offset: 1,
                                        color: "rgba(38, 191, 64, 0.2)"
                                    }
                                ],
                                false
                            )
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
        // if(!this.timer1) {
        //    let len = 0;
        //    // clearInterval(this.timer1);
        //    this.timer1 = setInterval(() => {
        //        if (len === xAxisData.length) {
        //            len = 0;
        //        }
        //        myChart.dispatchAction({
        //            type: "showTip",
        //            seriesIndex: 0,
        //            dataIndex: len
        //        });
        //        len++;
        //    }, 3800); 
        // }
    }

    getLeftBottomChart(xAxisData: any, saleCountData: any) {
        let myChart = echarts.init(this.$refs.leftBottomChart);
        // this.$set(this.mixinChartConfig,'leftBottomChart',myChart)
        myChart.hideLoading();
        const option: any = {
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            },
            xAxis: {
                type: "category",
                data: xAxisData,
                boundaryGap: false,
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
                    nterval: 0
                }
            },
            yAxis: [
                {
                    type: "value",
                    name: "万元",
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
                }
            ],
            tooltip: {
                trigger: "axis",
                backgroundColor: "rgba(3,3,3,0.5)",
                borderWidth: 0,
                textStyle: {
                    color: "#ffffff",
                    fontSize: "14"
                },
                formatter: function(datas: any) {
                    let res = datas[0].name + "<br/>",
                        val;
                    for (let i = 0, length = datas.length; i < length; i++) {
                        val = datas[i].value + "万元";
                        res += datas[i].marker + datas[i].seriesName + "：" + val + "<br/>";
                    }
                    return res;
                }
            },
            series: [
                {
                    data: saleCountData,
                    type: "line",
                    name: "产值",
                    symbolSize: 15, //拐点大小
                    symbol: "circle", //拐点样式
                    itemStyle: {
                        normal: {
                            color: "#F6BD16", //拐点颜色
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
                                color: "#F6BD16"
                            }
                        }
                    },
                    lineStyle: {
                        shadowBlur: 2,
                        shadowColor: "#333333",
                        shadowOffsetY: 6,
                        shadowOffsetX: -4,
                    }
                }
            ]
        };
        myChart.setOption(option);
        if(!this.timer2) {
            let len = 0;
            this.timer2 = setInterval(() => {
                if (len === xAxisData.length) {
                    len = 0;
                }
                myChart.dispatchAction({
                    type: "showTip",
                    seriesIndex: 0,
                    dataIndex: len
                });
                len++;
            }, 3800);
        }
    }

    getMap(data: any) {
        let myChart = echarts.init(this.$refs.midTopChart);
        //   this.$set(this.mixinChartConfig,'midTopChart',myChart)
        myChart.hideLoading();
        echarts.registerMap("map", map);
        const option: any = {
            tooltip: {
                backgroundColor: "rgba(3,3,3,0)",
                borderWidth: 0,
                textStyle: {
                    color: "#ffffff",
                    fontSize: "14"
                },
                formatter: (value: any) => {
                    let res = ``;
                    let color = "#DBA914";
                    // 判断产量是否下滑
                    // if (value.data&&value.data.selfType==='green') {
                    //     color = '#26BF40'
                    // } else if(value.data&&value.data.selfType==='red') {
                    //     color = '#f74e4e'
                    // } else if(value.data&&value.data.selfType==='yellow') {
                    //     color = '#eac24d'
                    // }
                    if (value.data) {
                        res = `<div style='width:220px;height:200px;background-color:rgba(255, 255, 255, 0.7);margin:-5px;border-radius:5px;box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.6);'>
                        <div style='display:flex;justify-content:space-between;width:100%;height:30px;background-color:${color};border-radius:5px 5px 0 0;padding:5px 10px;font-size:14px;'>
                            <span>${value.data.name}</span>
                            <span>${this.switchYear}</span>
                        </div>
                        <ul style="color:#525866;margin:10px 20px;font-size:12px;">
                            <li style="margin-bottom:10px; display: flex; align-items: center; justify-content: space-between;">
                                <span style="display:inline-block;width:40px;text-align:right;">
                                    种植面积：
                                </span>
                                <span style="display:inline-block;width:40px;text-align:left;">
                                    ${value.data.plantAreaCount}亩
                                </span>
                                <span style="display:inline-block;width:40px;display: flex; align-items: center;color:${
                                    value.data.plantAreaIncrease < 0 ? "#29CC44" : "#FF4C4C"
                                }">
                                    <img
                                        style="width: 10px; height: 10px;"
                                        src="${require(value.data.plantAreaIncrease < 0
                                            ? "@/assets/images/salesAnalysis/decline.png"
                                            : "@/assets/images/salesAnalysis/top.png")}"
                                        alt=""
                                    />
                                    <span style="font-size: 12px;">${value.data.plantAreaIncrease || "-"}</span>
                                </span>
                            </li>
                            <li style="margin-bottom:10px; display: flex; align-items: center; justify-content: space-between;">
                                <span style="display:inline-block;width:40px;text-align:right;">
                                    总产量：
                                </span>
                                <span style="display:inline-block;width:40px;text-align:left;">
                                    ${value.data.totalOutput}亩
                                </span>
                                <span style="display:inline-block;width:40px;display: flex; align-items: center;color:${
                                    value.data.totalOutputIncrease < 0 ? "#29CC44" : "#FF4C4C"
                                }">
                                    <img
                                        style="width: 10px; height: 10px;"
                                        src="${require(value.data.totalOutputIncrease < 0
                                            ? "@/assets/images/salesAnalysis/decline.png"
                                            : "@/assets/images/salesAnalysis/top.png")}"
                                        alt=""
                                    />
                                    <span style="font-size: 12px;">${value.data.totalOutputIncrease || "-"}</span>
                                </span>
                            </li>
                            <li style="margin-bottom:10px; display: flex; align-items: center; justify-content: space-between;">
                                <span style="display:inline-block;width:40px;text-align:right;">
                                    市场均价：
                                </span>
                                <span style="display:inline-block;width:40px;text-align:left;">
                                    ${value.data.marketAvg}元
                                </span>
                                <span style="display:inline-block;width:40px;display: flex; align-items: center;color:${
                                    value.data.marketAvgIncrease < 0 ? "#29CC44" : "#FF4C4C"
                                }">
                                    <img
                                        style="width: 10px; height: 10px;"
                                        src="${require(value.data.marketAvgIncrease < 0
                                            ? "@/assets/images/salesAnalysis/decline.png"
                                            : "@/assets/images/salesAnalysis/top.png")}"
                                        alt=""
                                    />
                                    <span style="font-size: 12px;">${value.data.marketAvgIncrease || "-"}</span>
                                </span>
                            </li>
                            <li style="margin-bottom:10px; display: flex; align-items: center; justify-content: space-between;">
                                <span style="display:inline-block;width:40px;text-align:right;">
                                    化肥均价：
                                </span>
                                <span style="display:inline-block;width:40px;text-align:left;">
                                    ${value.data.chemicalFertilizerAvg}元
                                </span>
                                <span style="display:inline-block;width:40px;display: flex; align-items: center;color:${
                                    value.data.chemicalFertilizerAvgIncrease < 0 ? "#29CC44" : "#FF4C4C"
                                }">
                                    <img
                                        style="width: 10px; height: 10px;"
                                        src="${require(value.data.chemicalFertilizerAvgIncrease < 0
                                            ? "@/assets/images/salesAnalysis/decline.png"
                                            : "@/assets/images/salesAnalysis/top.png")}"
                                        alt=""
                                    />
                                    <span style="font-size: 12px;">${value.data.chemicalFertilizerAvgIncrease || "-"}</span>
                                </span>
                            </li>
                            <li style="margin-bottom:10px; display: flex; align-items: center; justify-content: space-between;">
                                <span style="display:inline-block;width:40px;text-align:right;">
                                    农药均价：
                                </span>
                                <span style="display:inline-block;width:40px;text-align:left;">
                                    ${value.data.pesticidesAvg}元
                                </span>
                                <span style="display:inline-block;width:40px;display: flex; align-items: center;color:${
                                    value.data.pesticidesAvgIncrease < 0 ? "#29CC44" : "#FF4C4C"
                                }">
                                    <img
                                        style="width: 10px; height: 10px;"
                                        src="${require(value.data.pesticidesAvgIncrease < 0
                                            ? "@/assets/images/salesAnalysis/decline.png"
                                            : "@/assets/images/salesAnalysis/top.png")}"
                                        alt=""
                                    />
                                    <span style="font-size: 12px;">${value.data.pesticidesAvgIncrease || "-"}</span>
                                </span>
                            </li>
                        </ul>
                    </div>`;
                    }
                    return res;
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
                            show: false //开启悬浮事件
                        }
                    },
                    data,
                    itemStyle: {
                        normal: {
                            borderColor: "rgba(246, 189, 22, 1)", //区域边框颜色
                            areaColor: "rgba(246, 189, 22, 0.1)", //区域颜色
                            borderWidth: 2
                        },
                        emphasis: {
                            borderColor: "rgba(246, 189, 22, 1)",
                            areaColor: "rgba(246, 189, 22, 1)"
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
        // clearInterval(this.timer7);
        data.forEach((item: any, index:any) => {
                myChart.dispatchAction({
                    type: "downplay",
                    seriesIndex: 0,
                    dataIndex: index
                });
        })
        myChart.dispatchAction({
            type: 'hideTip'
        })
        if(!this.timer7) {
            let len = 1;
            let active = false;
           this.timer7 = setInterval(() => {
               if(!active) {
                   data.forEach((item: any, index:any) => {
                           myChart.dispatchAction({
                               type: "downplay",
                               seriesIndex: 0,
                               dataIndex: index
                           });
                   })
                   if (len === data.length) {
                       len = 1
                   }
                   myChart.dispatchAction({
                       type: 'highlight',
                       seriesIndex: 0,
                       dataIndex: len-1,
                   })
                   myChart.dispatchAction({
                       type: 'showTip',
                       seriesIndex: 0,
                       dataIndex: len-1,
                   })
                   len++
               }
           }, 3000); 
           myChart.on("mouseover", function(e: any) {
               active = true;
               if (e.dataIndex != len) {
                   data.forEach((item: any, index:any) => {
                           myChart.dispatchAction({
                               type: "downplay",
                               seriesIndex: 0,
                               dataIndex: index
                           });
                   })
                   myChart.dispatchAction({ type: "highlight", seriesIndex: 0, dataIndex: e.dataIndex });
                   myChart.dispatchAction({
                       type: 'showTip',
                       seriesIndex: 0,
                       dataIndex: e.dataIndex,
                   })
               }
           });
           myChart.on("mouseout", function(e: any) {
               data.forEach((item: any, index:any) => {
                       myChart.dispatchAction({
                           type: "downplay",
                           seriesIndex: 0,
                           dataIndex: index
                       });
               })
               active = false
           });
        }
    }

    getMidLeftChart(xAxisData: any, saleCountData: any) {
        let myChart = echarts.init(this.$refs.midLeftChart);
        const option: any = {
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            },
            xAxis: {
                type: "category",
                data: xAxisData,
                boundaryGap: false,
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
                    nterval: 0
                }
            },
            yAxis: [
                {
                    type: "value",
                    name: "元",
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
                }
            ],
            tooltip: {
                trigger: "axis",
                backgroundColor: "rgba(3,3,3,0.5)",
                borderWidth: 0,
                textStyle: {
                    color: "#ffffff",
                    fontSize: "14"
                },
                formatter: function(datas: any) {
                    let res = datas[0].name + "<br/>",
                        val;
                    for (let i = 0, length = datas.length; i < length; i++) {
                        val = datas[i].value + "元";
                        res += datas[i].marker + datas[i].seriesName + "：" + val + "<br/>";
                    }
                    return res;
                }
            },
            series: [
                {
                    data: saleCountData,
                    type: "line",
                    name: "市场均价",
                    symbolSize: 15, //拐点大小
                    symbol: "circle", //拐点样式
                    itemStyle: {
                        normal: {
                            color: "#43D1C5", //拐点颜色
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
                                color: "#43D1C5"
                            }
                        }
                    },
                    lineStyle: {
                        shadowBlur: 2,
                        shadowColor: "#333333",
                        shadowOffsetY: 6,
                        shadowOffsetX: -4,
                    }
                }
            ]
        };
        myChart.setOption(option);
        if(!this.timer3) {
            let len = 0;
            // clearInterval(this.timer3);
            this.timer3 = setInterval(() => {
                if (len === xAxisData.length) {
                    len = 0;
                }
                myChart.dispatchAction({
                    type: "showTip",
                    seriesIndex: 0,
                    dataIndex: len
                });
                len++;
            }, 3800);
        }
    }

    getMidRightChart(xAxisData: any, saleCountData: any) {
        let myChart = echarts.init(this.$refs.midRightChart);
        const option: any = {
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            },
            xAxis: {
                type: "category",
                data: xAxisData,
                boundaryGap: false,
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
                    nterval: 0
                }
            },
            yAxis: [
                {
                    type: "value",
                    name: "元",
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
                }
            ],
            tooltip: {
                trigger: "axis",
                backgroundColor: "rgba(3,3,3,0.5)",
                borderWidth: 0,
                textStyle: {
                    color: "#ffffff",
                    fontSize: "14"
                },
                formatter: function(datas: any) {
                    let res = datas[0].name + "<br/>",
                        val;
                    for (let i = 0, length = datas.length; i < length; i++) {
                        val = datas[i].value + "元";
                        res += datas[i].marker + datas[i].seriesName + "：" + val + "<br/>";
                    }
                    return res;
                }
            },
            series: [
                {
                    data: saleCountData,
                    type: "line",
                    name: "化肥均价",
                    symbolSize: 15, //拐点大小
                    symbol: "circle", //拐点样式
                    itemStyle: {
                        normal: {
                            color: "#26BF40", //拐点颜色
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
                                color: "#26BF40"
                            }
                        }
                    },
                    lineStyle: {
                        shadowBlur: 2,
                        shadowColor: "#333333",
                        shadowOffsetY: 6,
                        shadowOffsetX: -4,
                    }
                }
            ]
        };
        myChart.setOption(option);
        if(!this.timer4) {
            let len = 0;
            // clearInterval(this.timer4);
            this.timer4 = setInterval(() => {
                if (len === xAxisData.length) {
                    len = 0;
                }
                myChart.dispatchAction({
                    type: "showTip",
                    seriesIndex: 0,
                    dataIndex: len
                });
                len++;
            }, 3800);
        }
    }

    getRightTopChart(yAxisData: any, yAxisDataT: any, data: any, markPointData: any) {
        let myChart = echarts.init(this.$refs.rightTopChart);
        const option: any = {
            color: ["#21A637"],
            grid: {
                top: "7%",
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            },
            xAxis: {
                show: false,
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
            dataZoom: [{
                type: 'inside',
                yAxisIndex: [0, 1],
                minValueSpan: 10,
                maxValueSpan: 10,
                startValue: yAxisData.length,
                endValue: yAxisData.length - 10,
            }],
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
                        "亩";
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
        myChart.setOption(option);
        // let len = yAxisData.length-1;
        // clearInterval(this.timer5);
        // this.timer5 = setInterval(() => {
        //     if (len < 0) {
        //         len = yAxisData.length-1;
        //     }
        //     myChart.dispatchAction({
        //         type: "showTip",
        //         seriesIndex: 0,
        //         dataIndex: len
        //     });
        //     len--;
        // }, 3800);
    }

    getRightMidChart(categoryData: any, chartdata: any) {
        // console.log(categoryData,chartdata)
        let myChart = echarts.init(this.$refs.rightMidChart);
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
                top: "7%",
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            },
            dataZoom: {
                type: "inside",
                minValueSpan: 4,
                maxValueSpan: 6
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
                        data.name + '<br />' +
                        '种植面积：'+
                        data.value +
                        "万亩";
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
        myChart.setOption(option);
    }
    
    getRightBottomChart(xAxisData: any, saleCountData: any) {
        let myChart = echarts.init(this.$refs.rightBottomChart);
        const option: any = {
            grid: {
                left: "3%",
                right: "4%",
                bottom: "3%",
                containLabel: true
            },
            xAxis: {
                type: "category",
                data: xAxisData,
                boundaryGap: false,
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
                    nterval: 0
                }
            },
            yAxis: [
                {
                    type: "value",
                    name: "元",
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
                }
            ],
            tooltip: {
                trigger: "axis",
                backgroundColor: "rgba(3,3,3,0.5)",
                borderWidth: 0,
                textStyle: {
                    color: "#ffffff",
                    fontSize: "14"
                },
                formatter: function(datas: any) {
                    let res = datas[0].name + "<br/>",
                        val;
                    for (let i = 0, length = datas.length; i < length; i++) {
                        val = datas[i].value + "元";
                        res += datas[i].marker + datas[i].seriesName + "：" + val + "<br/>";
                    }
                    return res;
                }
            },
            series: [
                {
                    data: saleCountData,
                    type: "line",
                    name: "农药均价",
                    symbolSize: 15, //拐点大小
                    symbol: "circle", //拐点样式
                    itemStyle: {
                        normal: {
                            color: "#E45B5B", //拐点颜色
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
                                color: "#E45B5B"
                            }
                        }
                    },
                    lineStyle: {
                        shadowBlur: 2,
                        shadowColor: "#333333",
                        shadowOffsetY: 6,
                        shadowOffsetX: -4,
                    }
                }
            ]
        };
        myChart.setOption(option);
        if(!this.timer6) {
            let len = 0;
            // clearInterval(this.timer6);
            this.timer6 = setInterval(() => {
                if (len === xAxisData.length) {
                    len = 0;
                }
                myChart.dispatchAction({
                    type: "showTip",
                    seriesIndex: 0,
                    dataIndex: len
                });
                len++;
            }, 3800);
        }
    }

    back() {
        this.$router.push('/vegetable/allIndustry');
    }
    
    getYear() {
        socketClient.send('/plantDistributeMonitor/pdAreaPlantTrendMap', {year: this.switchYear});
    }
    
    getData(res: any) {
        setTimeout(() => {
            console.log(res,111)
            let xAxisData: any = [], data: any = [];
            let yAxisData: any = [],
                yAxisDataT: any = [],
                farmYearCountByTurnoverData: any = [],
                markPointData: any = [];
            switch (res.key) {
                case "/plantDistributeMonitor/pdPlantDistribute": //种植概况
                    this.form.totalOutputValue = res.data.totalOutputValue || 0;
                    this.form.totalOutputValueAvg = res.data.totalOutputValueAvg || 0;
                    this.form.plantAreaAvg = res.data.plantAreaAvg || 0;
                    this.form.plantAreaCount = res.data.plantAreaCount || 0;
                    this.$nextTick(() => {
                        animateValue(this.$refs.totalOutputValue, this.form.totalOutputValue, 1000, true);
                        animateValue(this.$refs.totalOutputValueAvg, this.form.totalOutputValueAvg, 1000, true);
                        animateValue(this.$refs.plantAreaAvg, this.form.plantAreaAvg, 1000, true);
                        animateValue(this.$refs.plantAreaCount, this.form.plantAreaCount, 1000, true);
                    });
                    break;
                case "/plantDistributeMonitor/pdAreaPlantTrendArea": //种植面积变化趋势
                    res.data.forEach((item: any) => {
                        xAxisData.push(item.township)
                        data.push(item.plantAreaCount)
                    })
                    this.$nextTick(() => {
                        this.getLeftMidChart(xAxisData, data);
                    });
                    break;
                case "/plantDistributeMonitor/pdPriceTrendOutPut": //产值变化
                    res.data.forEach((item: any) => {
                        xAxisData.push(item.year)
                        data.push(item.outputValue / 10000)
                    })
                    this.$nextTick(() => {
                        this.getLeftBottomChart(xAxisData, data);
                    });
                    break;
                case "/plantDistributeMonitor/pdAreaPlantTrendMap": //种植行政区域
                        res.data.forEach((item: any) => {
                            data.push({ name: item.township, ...item });
                        });
                    this.$nextTick(() => {
                        this.getMap(data)
                    });
                    break;
                case "/plantDistributeMonitor/pdPriceTrendMarket": //市场均价变化
                    res.data.forEach((item: any) => {
                        xAxisData.push(item.year)
                        data.push(item.marketAvg)
                    })
                    this.$nextTick(() => {
                        this.getMidLeftChart(xAxisData, data);
                    });
                    break;
                case "/plantDistributeMonitor/pdPriceTrendChemicalFertilizer": //化肥均价变化趋势
                    res.data.forEach((item: any) => {
                        xAxisData.push(item.year)
                        data.push(item.chemicalFertilizerAvg)
                    })
                    this.$nextTick(() => {
                        this.getMidRightChart(xAxisData, data);
                    });
                    break;
                case "/plantDistributeMonitor/pdVegetableType": //蔬菜品类
                    res.data.forEach((item: any, index: number) => {
                        let obj = {
                            yAxis: res.data.length - (1 + index),
                            xAxis: parseFloat(item.plantAreaCount),
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
                        yAxisData.unshift(item.type);
                        yAxisDataT.unshift(parseFloat(item.plantAreaCount) + "亩");
                        farmYearCountByTurnoverData.unshift(parseFloat(item.plantAreaCount));
                        markPointData.unshift(obj);
                    });
                    this.$nextTick(() => {
                        this.getRightTopChart(
                            yAxisData,
                            yAxisDataT,
                            farmYearCountByTurnoverData,
                            markPointData
                        );
                    });
                    break;
                case "/plantDistributeMonitor/pdAreaPlantTrendTownship": //种植主要乡镇
                    res.data.forEach((item: any) => {
                        xAxisData.push(item.township)
                        data.push(parseFloat((item.plantAreaCount / 10000).toFixed(4)));
                    })
                    this.$nextTick(() => {
                        this.getRightMidChart(xAxisData, data);
                    });
                    break;
                case "/plantDistributeMonitor/pdPriceTrendChemicalPesticides": //农药均价趋势
                    res.data.forEach((item: any) => {
                        xAxisData.push(item.year)
                        data.push(item.pesticidesAvg)
                    })
                    this.$nextTick(() => {
                        this.getRightBottomChart(xAxisData, data);
                    });
                    break;
            }
        }, 300);
    }

    getParams(params?: any) {
        //拼接查询条件
        return () => {
            return params;
        };
    }

    query() {
        this.apiList.forEach((item: any) => {
            socketClient.addCallBack(item.url, this.getData);
            socketClient.addSend(item.url, this.getParams(item.params));
        })
        setTimeout(() => {
            socketClient.sendAll();
        }, 800);
    }

    @Watch("$route")
    routeWatch(value: any) {
        this.apiList.forEach((item: any) => {
            socketClient.delCallBack(item.url);
            socketClient.delSend(item.url);
        })
        clearInterval(this.timer1);
        clearInterval(this.timer2);
        clearInterval(this.timer3);
        clearInterval(this.timer4);
        // clearInterval(this.timer5);
        clearInterval(this.timer6);
        clearInterval(this.timer7);
        if (value.path === "/vegetable/plantingDistribution") {
            this.query();
        }
    }

    mounted() {
        //接口调用
        if (this.$route.path === "/vegetable/plantingDistribution") {
            this.query();
        }
    }

    beforeDestroy() {
        this.apiList.forEach((item: any) => {
            socketClient.delCallBack(item.url);
            socketClient.delSend(item.url);
        })
        clearInterval(this.timer1);
        clearInterval(this.timer2);
        clearInterval(this.timer3);
        clearInterval(this.timer4);
        // clearInterval(this.timer5);
        clearInterval(this.timer6);
        clearInterval(this.timer7);
    }
}
</script>

<style scoped lang="scss">
.vegetable {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: url("../../assets/images/vegetable/bg.jpg");
    background-size: cover;
    padding-bottom: 110px;
    .content {
        position: relative;
        z-index: 999;
        display: flex;
        width: 1860px;
        margin: auto;
        overflow: hidden;
        .titleTip {
            font-size: 12px;
            font-family: Source Han Sans SC;
            font-weight: 400;
            color: #ffffff;
            opacity: 0.5;
        }
        .left {
            width: 440px;
            .leftTop {
                width: 440px;
                height: 300px;
                margin-bottom: 20px;
                font-size: 14px;
                .row {
                    margin-bottom: 6px;
                }
                .col {
                    background: rgba(255, 255, 255, 0.2);
                    height: 127px;
                    width: 217px;
                    display: flex;
                    flex-flow: column;
                    justify-content: center;
                    align-items: center;
                    .text {
                        font-size: 14px;
                        font-family: Source Han Sans SC;
                        font-weight: 400;
                        color: #ffffff;
                    }
                    .numLeft {
                        font-size: 40px;
                        font-family: YouSheBiaoTiHei;
                        font-weight: 400;
                        color: #26bf40;
                    }
                    .numRight {
                        font-size: 40px;
                        font-family: YouSheBiaoTiHei;
                        font-weight: 400;
                        color: #f6bd16;
                    }
                }
                .colLeft {
                    margin-right: 6px;
                }
            }
            .leftMid {
                width: 440px;
                height: 300px;
                margin-bottom: 20px;
                .leftMidChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, 0.2);
                }
            }
            .leftBottom {
                width: 440px;
                height: 300px;
                margin-bottom: 20px;
                .leftBottomChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, 0.2);
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
                .midSwitch {
                    position: absolute;
                    top: 60px;
                    right: 20px;
                    text-align: right;
                    .switchText {
                        font-size: 14px;
                        font-family: Source Han Sans SC;
                        font-weight: 400;
                        color: #F6BD16;
                        margin-top: 10px;
                    }
                }
                .midTopChart {
                    width: 100%;
                    height: 580px;
                    background-color: rgba(255, 255, 255, 0.2);
                    position: relative;
                }
                .sum {
                    position: absolute;
                    left: 39px;
                    bottom: 42px;
                    li {
                        margin-bottom: 20px;
                        color: #fff;
                        .label {
                            display: inline-block;
                            width: 80px;
                            text-align: right;
                        }
                        .num {
                            color: #43d1c5;
                            font-size: 30px;
                            font-family: YouSheBiaoTiHei;
                            margin: 0 20px;
                        }
                    }
                }
                .legend {
                    position: absolute;
                    right: 39px;
                    bottom: 42px;
                    li {
                        margin-bottom: 20px;
                        color: #fff;
                        img {
                            display: inline-block;
                            vertical-align: middle;
                            margin-right: 10px;
                        }
                    }
                }
            }
            .midLeft {
                display: inline-block;
                width: 440px;
                height: 300px;
                margin-bottom: 20px;
                .midLeftChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, 0.2);
                }
            }
            .midRight {
                display: inline-block;
                width: 440px;
                height: 300px;
                margin-bottom: 20px;
                margin-left: 30px;
                .midRightChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, 0.2);
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
                    background-color: rgba(255, 255, 255, 0.2);
                }
            }
            .rightMid {
                width: 440px;
                height: 300px;
                margin-bottom: 20px;
                .rightMidChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, 0.2);
                }
            }
            .rightBottom {
                width: 440px;
                height: 300px;
                margin-bottom: 20px;
                .rightBottomChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, 0.2);
                }
            }
        }
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
