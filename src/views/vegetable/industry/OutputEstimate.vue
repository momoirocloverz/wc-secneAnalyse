<template>
    <div class="outputEstimate">
        <bgAnim></bgAnim>
        <OneSizeContainer style="z-index:999;" :width="1920" :height="1080" :maxRatio="3">
            <selfHead title="产量预估分析" @back="back" style="z-index:999;"></selfHead>
            <div class="content">
                <div class="left">
                    <div class="leftTop">
                        <selfTitle>
                            <span class="yellow">减产预警</span>
                        </selfTitle>
                        <ul>
                            <li class="title">
                                <span>关注区域</span>
                                <span>时间</span>
                                <span>所属季度</span>
                                <span>蔬菜品类</span>
                                <span>平均单产</span>
                                <span>预估单产</span>
                                <span>预计减产</span>
                            </li>
                            <vue-seamless-scroll :data="leftTopData" :class-option="classOption" class="seamless-warp">
                                <li v-for="(item, index) in leftTopData" :key="index">
                                    <span>{{item.area}}</span>
                                    <span>{{item.year}}年</span>
                                    <span>第{{item.quarter}}季度</span>
                                    <span>{{item.vegetablesName}}</span>
                                    <span>{{item.avgPerYield}}吨</span>
                                    <span>{{item.predictPerYield}}吨</span>
                                    <span>{{item.predictProduction}}元</span>
                                </li>
                            </vue-seamless-scroll>
                        </ul>
                    </div>
                    <div class="leftMid">
                        <selfTitle>
                            <span class="yellow">产量变化趋势</span>
                        </selfTitle>
                        <div class="leftMidChart" ref="leftMidChart"></div>
                    </div>
                    <div class="leftBottom">
                        <selfTitle>
                            <span class="yellow">季节产量分布</span>
                        </selfTitle>
                        <div class="leftBottomChart" ref="leftBottomChart"></div>
                    </div>
                </div>
                <div class="right">
                    <div class="rightTop">
                        <selfTitle class="title">
                            <span class="yellow">关注区产量预估分析</span>
                        </selfTitle>
                        <div class="map" ref="map"></div>
                        <div class="mapInfo">
                            <ul>
                                <li>
                                    <img src="../../../assets/images/vegetable/outputEstimate/gzqy.png" alt="">
                                    <div>
                                        <div class="num" ref="area">{{rightData.area}}</div>
                                        <div class="name">关注区域</div>
                                    </div>
                                </li>
                                <li>
                                    <img src="../../../assets/images/vegetable/outputEstimate/scpl.png" alt="">
                                    <div>
                                        <div class="num" ref="vegetablesType">{{rightData.vegetablesType}}</div>
                                        <div class="name">蔬菜品类</div>
                                    </div>
                                </li>
                                <li>
                                    <img src="../../../assets/images/vegetable/outputEstimate/zzmj.png" alt="">
                                    <div>
                                        <div class="num" ref="plantAreaCount">{{rightData.plantAreaCount}}</div>
                                        <div class="name">种植面积（万亩）</div>
                                    </div>
                                </li>
                                <li>
                                    <img src="../../../assets/images/vegetable/outputEstimate/ygzc.png" alt="">
                                    <div>
                                        <div class="num" ref="totalOutput">{{rightData.totalOutput}}</div>
                                        <div class="name">预估总产（万元）</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="rightBottom">
                        <selfTitle>
                            <span class="yellow">历史监测产量记录列表</span>
                        </selfTitle>
                        <ul>
                            <li class="title">
                                <span>关注区域</span>
                                <span>时间</span>
                                <span>所属季度</span>
                                <span>蔬菜品类</span>
                                <span>种植面积</span>
                                <span>亩产</span>
                                <span>总产</span>
                                <span>产值</span>
                            </li>
                            <vue-seamless-scroll :data="rightBottomData" :class-option="classOption" class="seamless-warp">
                                <li v-for="(item, index) in rightBottomData" :key="index">
                                    <span>{{item.area}}</span>
                                    <span>{{item.year}}年</span>
                                    <span>第{{item.quarter}}季度</span>
                                    <span>{{item.vegetablesName}}</span>
                                    <span>{{item.plantAreaCount}}亩</span>
                                    <span>{{item.perMuYield}}吨</span>
                                    <span>{{item.totalOutput}}吨</span>
                                    <span>{{item.outputValue}}元</span>
                                </li>
                            </vue-seamless-scroll>
                        </ul>
                    </div>
                </div>
            </div>
        </OneSizeContainer>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import selfHead from "../../../components/Head/Head.vue"
import bgAnim from '@/components/bgAnim/BgAnim.vue'
import selfTitle from '../Title.vue'
import * as echarts from 'echarts';
import map from '../map.json'
import * as socketClient from '@/views/socketClient';
import vueSeamlessScroll from "vue-seamless-scroll";
import {animateValue} from "@/util";
import m from "moment"

@Component({
    name: "OutputEstimate",
    components: {
        selfHead,
        bgAnim,
        selfTitle,
        vueSeamlessScroll
    }
})
export default class Index extends Vue {
    public $refs!: {
        leftMidChart:HTMLDivElement,
        leftBottomChart:HTMLDivElement,
        map:HTMLDivElement,
    }

    timeout:any = null
    timer1:any = null
    timer2:any = null
    timer3:any = null
    
    classOption: Object = {
        step: 0.2,
        limitMoveNum: 7
    };

    currentYear: any = m().format('YYYY')

    apiList:any = {
        leftTop:{
            url:'/productionForecastAnalysis/pfaProductionWarn',
            params:{}
        },
        leftMid:{
            url:'/productionForecastAnalysis/pfaYieldChangeTrend',
            params:{}
        },
        leftBottom:{
            url:'/productionForecastAnalysis/pfaQuarterYieldDistribute',
            params:{
                year:this.currentYear-1
            }
        },
        map:{
            url:'/productionForecastAnalysis/pfaProductionArea',
            params:{
                year:this.currentYear-1
            }
        },
        mapInfo:{
            url:'/productionForecastAnalysis/pfaYieldSurvey',
            params:{
                year:this.currentYear-1
            }
        },
        rightBottom:{
            url:'/productionForecastAnalysis/pfaProductionRecord',
            params:{
                year:this.currentYear-1
            }
        },
    }

    leftTopData:any = []

    rightData:any = []

    rightBottomData:any = []

    getLeftMidChart(xData:any, totalOutput:any, perMuYield:any, totalOutputGrew:any, perMuYieldGrew:any)  {
        let myChart = echarts.init(this.$refs.leftMidChart);
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
                        str += `${index == 0 ?'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#62BD31;"></span>':item.marker}
                        ${item.seriesName} ：${item.value.toLocaleString()}${(index == 0 || index == 1) ? '万元' : '%'}<br>`

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
                data: [
                    {
                        name: '总产值',
                        icon: 'rect'
                    },
                    {
                        name: '亩产值',
                        icon: 'rect'
                    },
                    {
                        name: '总产同比',
                        icon: 'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',
                        lineStyle: {
                            width: 16, 
                            type: 'solid',
                        }
                    },
                    {
                        name: '亩产同比',
                        icon: 'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',
                        lineStyle: {
                            width: 16, 
                            type: 'solid',
                        }
                    }
                ],
                left: 'center',
                top: '5%',
                textStyle: {
                    color: '#fff',
                    fontSize:14
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
                        fontSize: 14,
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
                    name: '万元',
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
                        formatter: (value:any) => {
                            return value + '%'
                        },
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: 14,
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                },
            ],
            series: [
                {
                    name: '总产值',
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
                        },
                    },
                    data: totalOutput,
                },
                {
                    name: '亩产值',
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
                        },
                    },
                    data: perMuYield,
                },
                {
                    name: '总产同比',
                    type: 'line',
                    yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                    smooth: false, //平滑曲线显示
                    symbol: 'circle', //标记的图形为实心圆
                    symbolSize: 8, //标记的大小
                    itemStyle: {
                        color: "#62BD31",
                        borderColor: "#62BD31",
                        borderWidth: 2,
                        shadowColor:'#000',
                        shadowBlur: 5,
                        shadowOffsetY:2
                    },
                    lineStyle: {
                        normal: {
                            color: "#62BD31",
                            shadowColor:'#000',
                            shadowBlur: 5,
                            shadowOffsetY:2
                        },
                    },
                    data: totalOutputGrew,
                },
                {
                    name: '亩产同比',
                    type: 'line',
                    yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                    smooth: false, //平滑曲线显示
                    symbol: 'circle', //标记的图形为实心圆
                    symbolSize: 8, //标记的大小
                    itemStyle: {
                        color: "#F6BD16",
                        borderColor: "#F6BD16",
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
                    data: perMuYieldGrew,
                },
            ],
        };
        myChart.setOption(option);
        let len = 0
        clearInterval(this.timer2)
        this.timer2 = setInterval(() => {
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
    }

    getLeftBottomChart(xData:any,yieldValue:any) {
        let myChart = echarts.init(this.$refs.leftBottomChart);
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
                        str += `${index == 0 ?'<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#62BD31;"></span>':item.marker}
                        ${item.seriesName} ：${item.value.toLocaleString()}万吨<br>`

                    })
                    return `${val[0].axisValue} <br>` + str
                }
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '14%',
                top: '20%',
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
                    name: '万吨',
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
                    name: '总产值',
                    type: 'bar',
                    barWidth: 60,
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
                                    fontSize:24,
                                    color: '#E6BB45',
                                    fontFamily:'YouSheBiaoTiHei'
                                }
                            },
                            barBorderRadius: [5, 5, 0, 0],
                        },
                    },
                    data: yieldValue,
                }
            ]
        };
        myChart.setOption(option);
        let len = 0
        clearInterval(this.timer3)
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
        }, 3800)
    }

    getMap(data:any) {
      let myChart = echarts.init(this.$refs.map);
      myChart.hideLoading();
      echarts.registerMap("map", map);
      const option:any = {
          grid:{
              left:'50%'
          },
        tooltip: {
            backgroundColor: 'rgba(3,3,3,0)',
            borderWidth: 0,
            textStyle: {
                  color: '#ffffff',
                  fontSize: '14',
            },
            position: ['20', '100'],
            formatter: (value:any) => {
                let res = ``
                if (value.data) {
                    res = `<div style='width:220px;height:370px;background-color:rgba(255, 255, 255, 0.7);margin:-10px;border-radius:5px;box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.6);position: relative;z-index:99999;'>
                        <div style='display:flex;justify-content:space-between;width:100%;height:30px;background-color:#DBA914;border-radius:5px 5px 0 0;padding:5px 10px;font-size:14px;'>
                            <span>${value.data.name}</span>
                        </div>
                        <ul  style="color:#525866;margin:10px 20px;font-size:12px;">
                            <li style="display:flex;margin-bottom:3px;">
                                <span  style="display:inline-block;width:110px;text-align:right;">
                                    蔬菜品类：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.vegetablesName}种
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:3px;">
                                <span style="display:inline-block;width:110px;text-align:right;">
                                    种植面积：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.plantAreaCount}亩
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:3px;">
                                <span style="display:inline-block;width:110px;text-align:right;">
                                    温度：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.tmp}℃
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:3px;">
                                <span style="display:inline-block;width:110px;text-align:right;">
                                    湿度：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.hum}%
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:3px;">
                                <span style="display:inline-block;width:110px;text-align:right;">
                                    光照：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.illumination}h
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:3px;">
                                <span style="display:inline-block;width:110px;text-align:right;">
                                    土壤有机质：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.soilOrganic}
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:3px;">
                                <span style="display:inline-block;width:110px;text-align:right;">
                                    氮：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.nitrogen}
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:3px;">
                                <span style="display:inline-block;width:110px;text-align:right;">
                                    磷：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.phosphorus}
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:3px;">
                                <span style="display:inline-block;width:110px;text-align:right;">
                                    钾：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.potassium}
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:3px;">
                                <span style="display:inline-block;width:110px;text-align:right;">
                                    PH值：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.ph}
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:3px;">
                                <span style="display:inline-block;width:110px;text-align:right;">
                                    影响权重：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.nfluenceWeight}
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:3px;">
                                <span style="display:inline-block;width:110px;text-align:right;">
                                    预计产值：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.predictYield}
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:3px;">
                                <span style="display:inline-block;width:110px;text-align:right;">
                                    较3年平均变化：
                                </span>
                                <span style="display:flex;align-items: center;flex:1;text-align:left;color:${value.data.changeValue<0?'#26BF40':'#FF4C4C'}">
                                    <img style="width:12px;height:12px;" src="${require(value.data.changeValue<0
                                            ? "@/assets/images/vegetable/down.png"
                                            : "@/assets/images/vegetable/up.png")}" />
                                    ${value.data.changeValue}%
                                </span>
                            </li>
                        </ul>
                    </div>`
                }
                return res
            },
        },
        series: [
          {
            type: "map",
            selectedMode:'single',
            mapType: "map", // 自定义扩展图表类型
            zoom:1.2,
            left:'40%',
            label: {
              show: false,
              emphasis: {
                show: false,  //开启悬浮事件
              }
            },
            data,
            itemStyle: {
              normal: {
                borderColor: '#F6BD16',//区域边框颜色
                areaColor: "rgba(246, 189, 22, .1)",//区域颜色
              },
              emphasis: {
                borderColor: '#F6BD16',
                areaColor: "#F6BD16"
              },
            },
            select: {
                itemStyle:{
                    borderColor: '#F6BD16',
                    areaColor: "#F6BD16"
                },
                label:{
                    show:false
                }
            },
          },
        ],
      };
      myChart.setOption(option);
      clearInterval(this.timer1)
        // 地图轮播
        let len = 0
        let flag = true
        this.timer1 = setInterval(() => {
            if (flag) {
                if (len === data.length) {
                    len = 0
                }
                myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: len,
                })
                myChart.dispatchAction({
                    type:"mapSelect",
                    seriesIndex:0,
                    dataIndex:len
                });
                len++
            }
        }, 3800)
        //鼠标移入停止轮播
        myChart.on("mouseover", (e:any) => {
            myChart.dispatchAction({
                type:"mapSelect",
                name:e.name
            });
            flag = false
        })
        myChart.on("mouseout", (e:any) => {
            myChart.dispatchAction({
                type:"mapUnSelect",
                name:e.name
            });
            flag = true
        })
    }

    getData(res: any) {
        this.timeout = setTimeout(() => {
            if (res.key===this.apiList.leftTop.url) {
                this.leftTopData = res.data
            } else if(res.key===this.apiList.leftMid.url) {
                let year:any = []
                let totalOutput:any = []
                let perMuYield:any = []
                let totalOutputGrew:any = []
                let perMuYieldGrew:any = []
                res.data.forEach((item:any) => {
                    year.push(item.year)
                    totalOutput.push(item.totalOutput)
                    perMuYield.push(item.perMuYield)
                    totalOutputGrew.push(item.totalOutputGrew)
                    perMuYieldGrew.push(item.perMuYieldGrew)
                });
                this.getLeftMidChart(year,totalOutput,perMuYield,totalOutputGrew,perMuYieldGrew)
            } else if(res.key===this.apiList.leftBottom.url) {
                let quarter:any = []
                let yieldValue:any = []
                res.data.forEach((item:any) => {
                    if (item.quarter===1) {
                        quarter.push('第一季度')
                    } else if(item.quarter===2) {
                        quarter.push('第二季度')
                    } else if(item.quarter===3) {
                        quarter.push('第三季度')
                    } else if(item.quarter===4) {
                        quarter.push('第四季度')
                    }
                    yieldValue.push(item.yieldValue)
                });
                this.getLeftBottomChart(quarter,yieldValue)
            } else if(res.key===this.apiList.map.url) {
                res.data.forEach((item:any) => {
                    item.name = item.township
                });
                this.getMap(res.data)
            } else if(res.key===this.apiList.mapInfo.url) {
                this.rightData = res.data
                for (const key in this.rightData) {
                    if ((this.$refs as any)[key]) {
                        animateValue((this.$refs as any)[key], this.rightData[key], 600, true)
                    }
                }
            } else if(res.key===this.apiList.rightBottom.url) {
                this.rightBottomData = res.data
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

    back() {
        this.$router.push('/vegetable/allIndustry')
    }

    @Watch('$route')
    routeWatch(value:any) {
        for (const key in this.apiList) {
            socketClient.delCallBack(this.apiList[key].url);
            socketClient.delSend(this.apiList[key].url);
        }
        if (value.path==='/vegetable/allIndustry/outputEstimate') {
            this.query()
        } else {
            clearInterval(this.timeout)
            clearInterval(this.timer1)
            clearInterval(this.timer2)
        }
    }

    mounted() {
        //接口调用
        if (this.$route.path==='/vegetable/allIndustry/outputEstimate') {
            this.query()
        }
    }
}
</script>

<style scoped lang="scss">
.outputEstimate {
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
        width: 1860px;
        margin: auto;
        overflow: hidden;
        .left {
            width: 600px;
            margin-right: 30px;
            .leftTop {
                width: 100%;
                height: 300px;
                margin-bottom: 20px;
                ul {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, .2);
                    font-size: 14px;
                    li {
                        display: flex;
                        width: 100%;
                        height: 35px;
                        padding-left: 20px;
                        color: #fff;
                        line-height: 35px;
                        span {
                            margin-right: 12px;
                            vertical-align: middle;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            &:nth-child(1),
                            &:nth-child(2),
                            &:nth-child(3) {
                                width: 60px;
                            }
                            &:nth-child(4),
                            &:nth-child(5),
                            &:nth-child(6) {
                                width: 85px;
                                flex-shrink:1;
                            }
                        }
                    }
                    .title {
                        background-color: rgba(255, 76, 76, .3);
                        font-size: 14px;
                        font-weight: 700;
                        color: #FF4C4C;
                        height: 40px;
                    }
                }
            }
            .leftMid {
                width: 100%;
                height: 300px;
                margin-bottom: 20px;
                .leftMidChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, .2);
                }
            }
            .leftBottom {
                width: 100%;
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
            width: 1230px;
            .rightTop {
                width: 100%;
                height: 620px;
                margin-bottom: 20px;
                display: flex;
                flex-wrap: wrap;
                .title {
                    width: 100%;
                }
                .map {
                    width: 800px;
                    height: 580px;
                    background-color: rgba(255, 255, 255, .2);
                    margin-right: 5px;
                }
                .mapInfo {
                    width: 425px;
                    height: 580px;
                    background-color: rgba(255, 255, 255, .2);
                    ul {
                        margin-left: 32px;
                        margin-top: 26px;
                        li {
                            display: flex;
                            background: linear-gradient(0deg, #F6BD16 0%, #FFFFFF 100%);
                            background-clip: text;
                            -webkit-text-fill-color: transparent;
                            font-family: YouSheBiaoTiHei;
                            cursor: default;
                            margin-bottom: 50px;
                            img {
                                width: 102px;
                                height: 94px;
                            }
                            .num {
                                height: 60px;
                                font-size: 60px;
                                line-height: 60px;
                            }
                            .name {
                                font-size: 24px;
                                line-height: 24px;
                            }
                        }
                    }
                }
            }
            .rightBottom {
                width: 100%;
                height: 300px;
                margin-bottom: 20px;
                ul {
                    width: 100%;
                    height: 260px;
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
                    .title {
                        background-color: rgba(230, 187, 69, .3);
                        font-size: 14px;
                        font-weight: 700;
                        color: #E6BB45;
                        height: 40px;
                    }
                }
            }
        }
        .yellow {
            color: #E6BB45;
            text-shadow: 0px 0px 20px #F6BD16;
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
