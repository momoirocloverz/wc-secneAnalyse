<template>
    <div class="AllIndustry">
        <bgAnim></bgAnim>
        <OneSizeContainer style="z-index:999;" :width="1920" :height="1080" :maxRatio="3">
            <selfHead title="基础资源分析" @back="back" style="z-index:999;"></selfHead>
            <div class="content">
                <div class="left">
                    <div class="leftTop">
                        <selfTitle>近1年高山蔬菜种类</selfTitle>
                        <div class="chart" ref="leftTopChart"></div>
                    </div>
                    <div class="rightTop">
                        <selfTitle>近1年面积占比</selfTitle>
                        <div class="chart" ref="rightTopChart"></div>
                    </div>
                    <div class="leftBottom">
                        <selfTitle>近1年蔬菜分布统计</selfTitle>
                        <ul>
                            <li class="title">
                                <span>乡镇</span>
                                <span>种植面积</span>
                                <span>耕地面积</span>
                                <span>农民数量</span>
                                <span>主要蔬菜</span>
                            </li>
                            <vue-seamless-scroll :data="leftBottomData" :class-option="classOption" class="seamless-warp">
                                <li v-for="(item, index) in leftBottomData" :key="index">
                                    <span>{{item.township}}</span>
                                    <span>{{item.plantAreaCount}}亩</span>
                                    <span>{{item.cultivatedArea}}亩</span>
                                    <span>{{item.farmerNum}}人</span>
                                    <span>{{item.pointVegetables}}</span>
                                </li>
                            </vue-seamless-scroll>
                        </ul>
                    </div>
                    <div class="rightBottom">
                        <selfTitle>
                            种植面积与收入关系
                            <span class="mark">（图表可左右拖动查看）</span>
                        </selfTitle>
                        <div class="chart" ref="rightBottomChart"></div>
                    </div>
                    <div class="bottom">
                        <selfTitle>近10年蔬菜种植面积趋势</selfTitle>
                        <div class="chart" ref="bottomChart"></div>
                    </div>
                </div>
                <div class="right">
                    <div class="map" ref="map"></div>
                </div>
            </div>
        </OneSizeContainer>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import selfHead from "../../components/Head/Head.vue"
import bgAnim from '@/components/bgAnim/BgAnim.vue'
import selfTitle from './Title.vue'
import * as echarts from 'echarts';
import vueSeamlessScroll from "vue-seamless-scroll";
import map from './map.json'
import * as socketClient from '@/views/socketClient';
import m from "moment"

@Component({
    name: "AllIndustry",
    components: {
        selfHead,
        bgAnim,
        selfTitle,
        vueSeamlessScroll
    },
})
export default class Index extends Vue {
    public $refs!: {
        leftTopChart:HTMLDivElement,
        rightTopChart:HTMLDivElement,
        rightBottomChart:HTMLDivElement,
        bottomChart:HTMLDivElement,
        map:HTMLDivElement
    }

    currentYear: any = m().format('YYYY')

    apiList:any = {
        leftTop:{
            url:'/basicResource/brVegetableSpecies',
            params:{
                year:this.currentYear-1
            }
        },
        rightTop:{
            url:'/basicResource/brAreaProportion',
            params:{
                year:this.currentYear-1
            }
        },
        leftBottom:{
            url:'/basicResource/brVegetableDistribution',
            params:{
                year:this.currentYear-1
            }
        },
        rightBottom:{
            url:'/basicResource/brVegetableSpeciesIncome',
            params:{
                year:this.currentYear-1
            }
        },
        bottom:{
            url:'/basicResource/brAreaProportionThread',
            params:{}
        },
        map:{
            url:'/basicResource/brAreaDistribution',
            params:{}
        },
    }

    timeout: any = null;
    timer:any = null
    timer1:any = null
    timer2:any = null
    timer3:any = null
    timer4:any = null
    timer5:any = null

    classOption: Object = {
        step: 0.2,
        limitMoveNum: 7
    };

    leftBottomData:any = []

    setLeftTopChart(countFarmSourceData: any) {
        let arr:any = []
        countFarmSourceData.forEach((item:any,index:number) => {
            if (arr.length<5&&item.vegetablesType!=='其他') {
                arr.push({
                    name:item.vegetablesType,
                    value:item.plantAreaCount
                })
            }
        });
        let chart = echarts.init(this.$refs.leftTopChart);
        let option: any = {
            color: ["#85CC3D", "#FCCD4C", "#43D1C5", "#E7FC92", "#22AC38", "#BFBFBF"],
            title: {
                show: true,
                text: ["{a|TOP5}", `{b|共计${countFarmSourceData.length}种类}`].join("\n"),
                top: "center",
                left: "center",
                textStyle: {
                    color: "#FFFFFF",
                    textShadowColor: "#43D1C5",
                    textShadowBlur: 8,
                    textShadowOffsetX: 0,
                    textShadowOffsetY: 0,
                    lineHeight: 30,
                    rich: {
                        a: {
                            fontSize: 30,
                            fontWeight: 700,
                            fontFamily: "YouSheBiaoTiHei",
                        },
                        b: {
                            fontSize: 12,
                            fontWeight: 400,
                        }
                    }
                }
            },
            series: [
                {
                    name: "区域分布Top5",
                    type: "pie",
                    radius: ["50%", "70%"],
                    center: ["50%", "50%"],
                    avoidLabelOverlap: false,
                    label: {
                        formatter: (data: any) => {
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
                                color: "#85CC3D"
                            },
                            a2: {
                                fontSize: 24,
                                fontFamily: "YouSheBiaoTiHei",
                                fontWeight: 400,
                                color: "#FCCD4C"
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
                                color: "#E7FC92"
                            },
                            a5: {
                                fontSize: 24,
                                fontFamily: "YouSheBiaoTiHei",
                                fontWeight: 400,
                                color: "#22AC38"
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
                    data: arr
                }
            ]
        };
        this.$nextTick(() => {
            chart.setOption(option);
            if (!this.timer) {
                let len = 0;
                this.timer = setInterval(() => {
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
    
    setRightTopChart(data1: any, data2: any) {
        let chart = echarts.init(this.$refs.rightTopChart);
        let option: any = {
            title: {
                show: true,
                text: '种植面积占比                           耕地面积占比',
                top: 220,
                left: 60,
                textStyle: {
                    color: "#FFFFFF",
                    fontSize: 16,
                    fontWeight:400
                }
            },
            series: [
                {
                    name: "种植面积占比",
                    type: "pie",
                    radius: ["30%", "50%"],
                    center: ["25%", "45%"],
                    avoidLabelOverlap: false,
                    colorBy:'series',
                    itemStyle:{
                        normal:{
                            color:function(params:any) {
                            //自定义颜色
                            var colorList = ['#85CC3D', 'rgba(0, 0, 0, 0.4)'];
                                return colorList[params.dataIndex]
                             }
                        }
                    },
                    label: {
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
                    name: "耕地面积占比",
                    type: "pie",
                    radius: ["30%", "50%"],
                    center: ["75%", "45%"],
                    avoidLabelOverlap: false,
                    itemStyle:{
                        normal:{
                            color:function(params:any) {
                            //自定义颜色
                            var colorList = ['#43D1C5', 'rgba(0, 0, 0, 0.4)'];
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

    getRightBottomChart(type:any,data1:any,data2:any) {
        let myChart = echarts.init(this.$refs.rightBottomChart);
        // this.$set(this.mixinChartConfig,'leftMidChart',myChart)
        myChart.hideLoading();
        const option:any = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(0,0,0,0)',
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
                    value.forEach((item:any) => {
                        str+=`<li style="position: relative;display:flex;height:20px;line-height:20px;">
                                <div style="width:10px;height:10px;border-radius:50%;background-color:#fff;position: absolute;top: 50%;transform: translateY(-50%);background-color:${item.color};"></div>
                                <div style="margin-left:15px;">${item.seriesName}：${item.data}${item.seriesName==='人均收入'?'万元':'亩'}</div>
                            </li>`
                    });
                    let res = `<div style="background-color:rgba(0, 0, 0, .5);margin:-10px;padding:10px;border-radius:5px;">
                        <span>${value[0].name}</span>
                        <ul style="margin-top:10px;">
                        ${str}
                        <ul>
                    </div>`
                    return res
                },
            },
            legend: {
                data: ['人均收入', '面积'],
                textStyle:{
                    color:"#fff"
                }
            },
            dataZoom: {
                type: "inside",
                minValueSpan: 4,
                maxValueSpan: 6
            },
            grid: {
                right: '25%',
                left: '15%',
                top: '20%',
                bottom: '10%',
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "#dfdfdf",
                        }
                    },
                    data: type
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '万元',
                    position: 'right',
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "rgba(255, 255, 255, .5)"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine:{
                        show: true,
                        lineStyle:{
                            type: 'dashed',
                            color: '#fff',
                            opacity: 0.4
                        }
                    },
                    nameTextStyle: {
                        padding: [0,0,0,40]
                    }
                },
                {
                    type: 'value',
                    name: '面积',
                    position: 'left',
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: "rgba(255, 255, 255, .5)"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine:{
                        show:false
                    },
                    nameTextStyle: {
                        padding: [0,35,0,0]
                    }
                }
            ],
            series: [
                {
                    name: '人均收入',
                    type: 'line',
                    data: data1,
                    color:'#FCCD4C',
                    lineStyle:{
                        shadowColor:'#000',
                        shadowBlur: 5,
                        shadowOffsetY:2
                    },
                },
                {
                    name: '面积',
                    type: 'bar',
                    yAxisIndex: 1,
                    barWidth : 20,
                    color:'#85CC3D',
                    itemStyle: {
                        normal:{
                            barBorderRadius:[5,5,0,0]
                        }
                    },
                    data: data2
                }
            ]
        }
        myChart.setOption(option);
        // let len = 0
        // clearInterval(this.timer2)
        // this.timer2 = setInterval(() => {
        //     if (len === type.length) {
        //         len = 0
        //     }
        //     myChart.dispatchAction({
        //         type: 'showTip',
        //         seriesIndex: 0,
        //         dataIndex: len,
        //     })
        //     len++
        // }, 3800)
    }

    getBottomChart(year:any,plantAreaCount:any) {
        let myChart = echarts.init(this.$refs.bottomChart);
        // this.$set(this.mixinChartConfig,'leftMidChart',myChart)
        myChart.hideLoading();
        const option:any = {
            grid: {
                right: '5%',
                left: '5%',
                top: '15%',
                bottom: '10%',
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(3,3,3,.2)',
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
                    value.forEach((item:any) => {
                        str+=`<li style="position: relative;display:flex;height:20px;line-height:20px;">
                                <div style="width:10px;height:10px;border-radius:50%;background-color:#fff;position: absolute;top: 50%;transform: translateY(-50%);background-color:${item.color};"></div>
                                <div style="margin-left:15px;">${item.seriesName}：${item.data}亩</div>
                            </li>`
                    });
                    let res = `<div style="background-color:rgba(0, 0, 0, .5);margin:-10px;padding:10px;border-radius:5px;">
                        <span>${value[0].name}</span>
                        <ul style="margin-top:10px;">
                        ${str}
                        <ul>
                    </div>`
                    return res
                },
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#fff'
                    }
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#dfdfdf",
                    }
                },
                data: year
            },
            yAxis: {
                type: 'value',
                name: '亩',
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "rgba(255, 255, 255, .5)"
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine:{
                    show: true,
                    lineStyle:{
                        type: 'dashed',
                        color: '#fff',
                        opacity: 0.4
                    }
                },
                nameTextStyle: {
                    padding: [0,0,0,-40]
                }
            },
            series: [
                {
                    name:'种植面积',
                    data: plantAreaCount,
                    type: 'line',
                    color:'#43D1C5',
                    areaStyle: {
                        color:'rgba(67, 209, 197, .25)'
                    },
                    lineStyle:{
                        shadowColor:'#000',
                        shadowBlur: 5,
                        shadowOffsetY:2
                    },
                    itemStyle:{
                        normal:{
                            label: {
                                show:true,
                                fontSize:16,
                                fontFamily: 'YouSheBiaoTiHei',
                                color:'#43D1C5'
                            }
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
        let len = 0
        clearInterval(this.timer3)
        this.timer3 = setInterval(() => {
            if (len === year.length) {
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
    //   this.$set(this.mixinChartConfig,'midTopChart',myChart)
      myChart.hideLoading();
      echarts.registerMap("map", map);
      const option:any = {
        title:{
            text:'{a|          有高山蔬菜的乡/镇}',
            top:'top',
            left:400,
            textStyle:{
                color:'#F6BD16',
                rich:{
                  a:{
                    backgroundColor:{
                        image:require('@/assets/images/vegetable/yellow.png')
                    },
                    width:30,
                    height:23,
                    fontSize:14
                  },
              },
            }
        },
        tooltip: {
            backgroundColor: 'rgba(3,3,3,0)',
            borderWidth: 0,
            textStyle: {
                  color: '#ffffff',
                  fontSize: '14',
            },
            formatter: (value:any) => {
                let res = ``
                if (value.data) {
                    res = `<div style='width:220px;height:230px;background-color:rgba(255, 255, 255, 0.8);margin:-10px;border-radius:5px;box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.6);'>
                        <div style='display:flex;justify-content:space-between;width:100%;height:30px;background-color:#319990;border-radius:5px 5px 0 0;padding:5px 10px;font-size:14px;'>
                            <span>${value.data.name}</span>
                            <span>${value.data.isHighMountain}高山蔬菜</span>
                        </div>
                        <ul style="color:#525866;margin:10px 20px;font-size:12px;">
                            <li style="display:flex;margin-bottom:10px;">
                                <span style="flex:1;text-align:right;">
                                    种植面积：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.plantAreaCount}亩
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:10px;">
                                <span style="flex:1;text-align:right;">
                                    人口数量：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.personNum}人
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:10px;">
                                <span style="flex:1;text-align:right;">
                                    农民收入：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.perCapitaIncome}元
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:10px;">
                                <span style="flex:1;text-align:right;">
                                    气候条件：
                                </span>
                                <span style="flex:1;text-align:left;">
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:10px;">
                                <span style="flex:1;text-align:right;">
                                    年平均降水：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.rainCount}mm
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:10px;">
                                <span style="flex:1;text-align:right;">
                                    年平均温度：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.avgTmp}℃
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
            top:'12%',
            zoom:1.2,
            label: {
              show: true,
              formatter: (value:any) => {
                  if (value.data.isHighMountain==='有') {
                      return `{yellow|}`
                  } else {
                      return ``
                  }
              },
              rich:{
                  yellow:{
                    backgroundColor:{
                        image:require('@/assets/images/vegetable/yellow.png')
                    },
                    width:30,
                    height:23
                  },
              },
              emphasis: {
                show: true,  //开启悬浮事件
              }
            },
            data,
            itemStyle: {
              normal: {
                borderColor: '#43D1C5',//区域边框颜色
                areaColor: "rgba(67, 209, 197, 0.1)",//区域颜色
              },
              emphasis: {
                borderColor: '#43D1C5',
                areaColor: "#43D1C5"
              },
            },
            select: {
                itemStyle:{
                    borderColor: '#43D1C5',
                    areaColor: "#43D1C5"
                }
            },
          },
        ],
      };
      myChart.setOption(option);
        let len = 0
        let flag = true
        clearInterval(this.timer4)
        this.timer4 = setInterval(() => {
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
                this.setLeftTopChart(res.data)
            } else if(res.key===this.apiList.rightTop.url) {
                let data1 = [{name:'种植总面积',value:res.data[0].plantAreaCount},{name:'种植使用面积',value:res.data[0].plantAreaUseCount}]
                let data2 = [{name:'耕地总面积',value:res.data[0].cultivatedArea},{name:'耕地使用面积',value:res.data[0].cultivatedAreaUse}]
                this.setRightTopChart(data1,data2)
            } else if(res.key===this.apiList.leftBottom.url) {
                this.leftBottomData = res.data
            } else if(res.key===this.apiList.rightBottom.url) {
                let type:any = []
                let data1:any = []
                let data2:any = []
                res.data.forEach((item:any) => {
                    type.push(item.vegetablesType)
                    data1.push(item.perCapitaIncome)
                    data2.push(item.plantAreaCount)
                });
                this.getRightBottomChart(type,data1,data2)
            } else if(res.key===this.apiList.bottom.url) {
                let year:any = []
                let plantAreaCount:any = []
                res.data.forEach((item:any) => {
                    year.push(item.year)
                    plantAreaCount.push(item.plantAreaCount)
                });
                this.getBottomChart(year,plantAreaCount)
            } else if(res.key===this.apiList.map.url) {
                res.data.forEach((item:any) => {
                    item.name = item.township
                });
                this.getMap(res.data)
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
        }, 1000);
    }

    back() {
        this.$router.push('/vegetable')
    }

    mounted() {
        if (this.$route.path==='/vegetable/baseResources') {
            this.query()
        }
    }
    beforeDestroy() {
        for (const key in this.apiList) {
            socketClient.delCallBack(this.apiList[key].url);
            socketClient.delSend(this.apiList[key].url);
        }
    }
}
</script>

<style scoped lang="scss">
.AllIndustry {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: url('../../assets/images/vegetable/bg.jpg');
    background-size: cover;
    padding-bottom: 110px;
    .content {
        display: flex;
        width: 100%;
        padding-left: 30px;
        overflow: hidden;
        .left {
            display: flex;
            width: 910px;
            height: 940px;
            flex-wrap: wrap;
            >div {
                width: 440px;
                height: 300px;
                .chart,
                ul {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, .2);
                }
            }
            .leftTop {
                margin-bottom: 20px;
                margin-right: 30px;
            }
            .rightTop {
                margin-bottom: 20px;
            }
            .leftBottom {
                margin-bottom: 20px;
                margin-right: 30px;
                width: 440px;
                height: 300px;
                ul {
                    font-size: 14px;
                    li {
                        width: 100%;
                        height: 35px;
                        line-height: 35px;
                        padding-left: 20px;
                        color: #fff;
                        span {
                            display: inline-block;
                            margin-right: 12px;
                            vertical-align: middle;
                            width: 70px;
                            &:nth-child(1) {
                                width: 80px;
                            }
                            &:nth-child(5) {
                                width: 70px;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                            }
                        }
                    }
                    .title {
                        background-color: rgba(67, 209, 197, .3);
                        font-weight: 700;
                        color: #43D1C5;
                        height: 40px;
                    }
                }
            }
            .rightBottom {
                margin-bottom: 20px;
                
            }
            .bottom {
                width: 100%;
            }
        }
        .right {
            flex: 1;
            height: 940px;
            .map {
                width: 100%;
                height: 100%;
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
