<template>
    <div class="production" v-if="$route.path==='/production'">
        <bgAnim></bgAnim>
        <OneSizeContainer :width="1920" :height="1080" :maxRatio="2">
            <self-head is-back title="生产端分析" :time="time" @back="back">
                <template slot="leftBtn">
                    <div class="linkLeft">
                        <div class="link" @click="$router.push('/production/forecast')">杨梅产量预测</div>
                    </div>
                </template>
                <template slot="rightBtn">
                    <div class="linkRight">
                        <div class="link" @click="$router.push('/production/pests')">高山大米病虫害预警</div>
                        <div class="link" @click="$router.push('/production/productionCount')">生产主体分析</div>
                    </div>

                </template>
            </self-head>
            <div class="content">
                <div class="top">
                    <div class="top-left">
                        <div class="top-left-left" v-for="(item,index) in leftTopData" :key="index">
                            <div class="top-left-left-img" :class="{'sec':index == 1}">
                                <img :src="item.imgPath" :width="item.width" :height="item.height"
                                     class="top-left-left-img-item" alt="">
                                <div class="top-name">{{ item.type }}</div>
                                <div class="top-desc">种植生产统计</div>
                            </div>
                            <div class="top-left-left-content">
                                <div class="top-left-info border">
                                    <div class="top-left-info-item">
                                        <div class="top-left-info-title">种植乡镇数量</div>
                                        <div class="top-left-info-val" ref="num"></div>
                                    </div>
                                    <div class="top-left-info-item">
                                        <div class="top-left-info-title">种植基地数量</div>
                                        <div class="top-left-info-val" ref="num"></div>
                                    </div>
                                    <div class="top-left-info-item">
                                        <div class="top-left-info-title">种植面积 (亩)</div>
                                        <div class="top-left-info-val" ref="num"></div>
                                    </div>
                                </div>
                                <div class="top-left-info">
                                    <div class="top-left-info-item">
                                        <div class="top-left-info-title">生产主体类别</div>
                                        <el-popover

                                            width="80"
                                            :visible-arrow="false"
                                            trigger="hover">
                                            <div class="popover-content">
                                                <div class="popover-cont">
                                                    <div v-for="(items,index) in item.list" :key="index">
                                                        {{ items.productName }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div slot="reference" class="top-left-info-val count" ref="num"></div>
                                        </el-popover>

                                    </div>
                                    <div class="top-left-info-item">
                                        <div class="top-left-info-title">生产主体数量</div>
                                        <div class="top-left-info-val count" ref="num"></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="top-right">
                        <div class="top-right-title">气象数据 <span>（近一月）</span></div>
                        <div class="top-right-icon" v-for="(item,index) in iconList" :key="index">
                            <img :src="item.imgPath" class="top-right-icon-item" alt="">
                            <div class="top-right-icon-info">
                                <span class="top-right-icon-info-title">{{ item.title }}</span>
                                <span class="top-right-icon-info-val">{{ item.value }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bom">
                    <div class="bom-left">
                        <div class="bom-item">
                            <div class="bom-item-tip"></div>
                            <div class="bom-item-title">
                                <div class="bom-item-title-item">
                                    <img src="./images/hightLine.png" class="triangle" alt="">
                                    <span>杨梅产量预测</span>
                                </div>

                            </div>
                        </div>
                        <div class="bom-content">
                            <div class="bom-left-title">近7年杨梅产量曲线图</div>
                            <div class="bom-left-top" ref="leftChart"></div>
                            <div class="bom-left-title">杨梅当前产期影响产量因素统计列表</div>
                            <div class="bom-left-bom">

                                <div class="bom-left-bom-left">
                                    <div class="bom-left-bom-left-item">
                                        <div class="bom-left-bom-left-item-num" ref="yield"></div>
                                        <div class="bom-left-bom-left-item-title">预测产量 (吨)</div>
                                    </div>
                                </div>
                                <div class="bom-left-bom-right">
                                    <el-row class="bom-left-bom-right-header">
                                        <el-col :span="11">影响因子</el-col>
                                        <el-col :span="5">数值</el-col>
                                    </el-row>
                                    <vue-seamless-scroll :data="influence" :class-option="classOption"
                                                         class="seamless-warp influence">
                                        <el-row class="bom-left-bom-right-cell" v-for="(item,index) in influence"
                                                :key="index">
                                            <el-col :span="11" class="bom-left-bom-right-cell-title"
                                                    :title="item.title">
                                                <span>{{ item.title }}</span></el-col>
                                            <el-col :span="6">{{ item.value }}</el-col>
                                        </el-row>
                                    </vue-seamless-scroll>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bom-left">
                        <div class="bom-item">
                            <div class="bom-item-tip"></div>
                            <div class="bom-item-title">
                                <div class="bom-item-title-item">
                                    <img src="./images/hightLine.png" class="triangle" alt="">
                                    <span>高山大米病虫害预警</span>
                                </div>
                            </div>
                        </div>
                        <div class="bom-content">
                            <div class="bom-left-title">近7年病虫害与气象条件列表</div>
                            <div class="center-top">
                                <el-row class="bom-left-bom-right-header">
                                    <el-col :span="5">年份</el-col>
                                    <el-col :span="6">虫害等级</el-col>
                                    <el-col :span="7">虫害病情</el-col>
                                    <el-col :span="6">实际产值(万元)</el-col>
                                </el-row>

                                <vue-seamless-scroll :data="condition" :class-option="classOption"
                                                     class="seamless-warp condition">
                                    <el-row class="bom-left-bom-right-cell"
                                            :class="{'light':item.pestLevel == '轻度','heavy':item.pestLevel == '重度'}"
                                            v-for="(item,index) in condition" :key="index">
                                        <el-col :span="5">{{ item.year }}</el-col>
                                        <el-col :span="6">{{ item.pestLevel }}</el-col>
                                        <el-col :span="7" class="pestType" :title="item.pestType"><span>{{
                                                item.pestType
                                            }}</span></el-col>
                                        <el-col :span="6">{{
                                                Number((Number(item.actualOutputValue) / 10000).toFixed(2)).toLocaleString()
                                            }}
                                        </el-col>
                                    </el-row>
                                </vue-seamless-scroll>
                            </div>
                            <div class="bom-left-title">近7个月气象统计</div>
                            <div class="center-bom" ref="centerChart"></div>
                        </div>
                    </div>
                    <div class="bom-left">
                        <div class="bom-item">
                            <div class="bom-item-tip"></div>
                            <div class="bom-item-title">
                                <div class="bom-item-title-item">
                                    <img src="./images/hightLine.png" class="triangle" alt="">
                                    <span>生产主体分析</span>
                                </div>
                            </div>
                        </div>
                        <div class="bom-content">
                            <div class="bom-left-title">生产主体统计</div>
                            <div class="right-top">
                                <el-popover

                                    width="270"
                                    :visible-arrow="false"
                                    trigger="hover">
                                    <div class="popover-content">
                                        <div class="popover-cont">
                                            <div v-for="(item,index) in ProductionSubList" :key="index">
                                                {{ item.productName }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="right-top-item" slot="reference">
                                        <div class="right-top-item-val" ref="cart"></div>
                                        <div class="right-top-item-title">生产主体类别</div>
                                    </div>
                                </el-popover>
                                <!--                                <el-popover-->
                                <!--                                    width="270"-->
                                <!--                                    :visible-arrow="false"-->
                                <!--                                    trigger="hover">-->
                                <!--                                    <div class="popover-content">-->
                                <!--&lt;!&ndash;                                        <div class="popover-title">生产主体数量</div>&ndash;&gt;-->
                                <!--                                        <div class="popover-cont">-->
                                <!--                                            <div v-for="(item,index) in ProductionSubList" :key="index">{{ item.productName }}：{{item.categoryCount}}</div>-->
                                <!--                                        </div>-->
                                <!--                                    </div>-->
                                <div class="right-top-item" slot="reference">
                                    <div class="right-top-item-val" ref="main"></div>
                                    <div class="right-top-item-title">生产主体数量</div>
                                </div>
                                <!--                                </el-popover>-->

                            </div>
                            <div class="bom-left-title">近7年农产品价格趋势</div>
                            <div class="right-bom" ref="rightChart"></div>
                        </div>
                    </div>
                </div>
            </div>
        </OneSizeContainer>
    </div>
    <router-view :key="$route.path" v-else></router-view>


</template>

<script lang="ts">
import {Component, Mixins, Vue, Watch} from "vue-property-decorator";
import SelfHead from "../../components/Head/Head.vue"
import {animateValue} from "@/util";
import m from "moment";
import bgAnim from "@/components/bgAnim/BgAnim.vue";
import * as echarts from "echarts";
import CustomTable from "@/components/customTable/Index.vue";
import vueSeamlessScroll from "vue-seamless-scroll";
import * as socketClient from "@/views/socketClient";
import autoResizeMixin from "@/mixins/echarts/autoResizeMixin";

@Component({
    name: "Index",
    components: {
        SelfHead,
        bgAnim,
        CustomTable,
        vueSeamlessScroll
    },
    mixins: [autoResizeMixin]
})
export default class Index extends Mixins(autoResizeMixin) {
    public $refs!: {
        num: HTMLDivElement,
        leftChart: HTMLDivElement,
        centerChart: HTMLDivElement,
        rightChart: HTMLDivElement,
        yield: HTMLDivElement,
        cart: HTMLDivElement,
        main: HTMLDivElement,
        con1: HTMLDivElement,
    }
    time: any = ''
    leftChart!: echarts.ECharts
    centerChart!: echarts.ECharts
    rightChart!: echarts.ECharts
    classOption: Object = {
        step: 0.2,
        limitMoveNum: 5
    };

    iconList: any [] = []
    influence: any [] = []
    condition: any [] = []
    ProductionSubList: any [] = []
    animateLeft: boolean = false
    animateCenter: boolean = false

    leftTopData: any [] = []
    mainNum: number[] = []

    currentYear: any = m().format("YYYY")
    screenWidth: string = "";
    timer: any = false;
    timer0: any = null;
    timer1: any = null;
    timer2: any = null;

    apiurl: any = {
        leftTop: '/productCount/baseProductionSubject',
        rightTop: '/productCount/meteorologicalCount',
        yield: '/productCount/yieldCount',
        forecast: '/productCount/getYieldFactors',
        pest: '/productCount/pestCount',
        meteorological: '/productCount/meteorologicalStatistics',
        productionSub: '/productCount/productionSubject',
        price: '/productCount/farmYearPrice',
    }

    timeout: any = null;

    // @Watch("screenWidth", {
    //     deep: true
    // })
    // watchScreenWidth(val: string) {
    //     // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
    //     if (!this.timer) {
    //         // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
    //         this.screenWidth = val;
    //         this.timer = true;
    //         setTimeout(() => {
    //             this.leftChart.resize()
    //             this.centerChart.resize()
    //             this.rightChart.resize()
    //             this.timer = false;
    //         }, 400);
    //     }
    // }

    @Watch("$route", {
        deep: true,
        immediate: true
    })
    watchRoute(val: string) {
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        this.queryData()
    }

    back() {
        this.$router.push('/home')
    }


    setLeftChart(data: any) {
        this.leftChart = echarts.init(this.$refs.leftChart);

        let xData: any = []
        let list: any = []
        data.forEach((item: any) => {
            xData.push(item.year + '年')
            list.push(item.yieldCount)
        })
        let option: any = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
                backgroundColor: 'rgba(3,3,3,0.5)',
                borderWidth: 0,
                textStyle: {
                    color: '#ffffff',
                    fontSize: '14',
                },
                formatter: (val: any) => {
                    let str: string = ''
                    val.forEach((item: any) => {
                        str += `${item.axisValue} <br>
                                    ${item.marker}
                                    ${item.seriesName} ：
                                    ${item.value.toLocaleString()}吨
                               `
                    })

                    return str
                }
            },
            grid: {
                top: '15%',
                left: '14%',
                right: '10%',
                bottom: '15%',
                // containLabel: true
            },
            xAxis: [{
                type: 'category',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#CCCCCC',
                        width: 1,
                        type: 'solid'
                    }
                },

                axisLabel: {
                    show: true,
                    color: '#fff'
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false,
                },

                data: xData,

            }],

            yAxis: [
                {
                    type: 'value',

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
                            color: '#d1e6eb',
                        },
                        formatter: function (value: any, index: any) {
                            return value.toLocaleString() + '吨';
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                }],
            series: [
                {
                    type: 'line',
                    name: '产量',
                    // smooth: true, //是否平滑
                    showAllSymbol: true,
                    // symbol: 'image://./static/images/guang-circle.png',
                    symbol: 'circle',
                    symbolSize: 12,
                    lineStyle: {
                        normal: {
                            color: "#62BD31",
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 0,
                            shadowOffsetY: 5,
                            shadowOffsetX: 5,
                        },
                    },
                    label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#62BD31',
                            fontFamily: 'YouSheBiaoTiHei'
                        }
                    },

                    itemStyle: {
                        color: "#62BD31",
                        borderColor: "#fff",
                        borderWidth: 2,
                        shadowColor: 'rgba(0, 0, 0, .3)',
                        shadowBlur: 0,
                        shadowOffsetY: 2,
                        shadowOffsetX: 2,
                    },
                    data: list,
                },
            ]
        };
        this.leftChart.setOption(option, true);
        let len = 0

        clearInterval(this.timer0)
        this.timer0 = setInterval(() => {
            if (len === xData.length) {
                len = 0
            }
            this.leftChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: len,
            })
            len++
        }, 3800)
    }

    setCenterChart(data: any) {
        this.centerChart = echarts.init(this.$refs.centerChart);

        let xData: any[] = []
        let jsList: any[] = []
        let wdList: any[] = []
        let sdList: any[] = []
        let arr: any [] = []
        for (let key in data) {
            let obj: any = {}
            obj.title = key
            obj.val = data[key]
            arr.push(obj)
        }
        let list: any = arr.sort((a: any, b: any) => {
            let aValue = a.title.replace('-', '')
            let bValue = b.title.replace('-', '')
            return aValue - bValue
        }).slice(0, 7)
        list.forEach((item: any) => {
            xData.push(item.title)
            // console.log(item.val)
            jsList.push(item.val.js)
            wdList.push(item.val.wd)
            sdList.push(item.val.sd)
        })
        // console.log(list)
        let option: any = {
            color: ['#35CBE6'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
                backgroundColor: 'rgba(3,3,3,0.5)',
                borderWidth: 0,
                textStyle: {
                    color: '#ffffff',
                    fontSize: '14',
                },
                formatter: (val: any) => {
                    let str: string = ''
                    let unit = ['mm', '℃', '%']
                    val.forEach((item: any, index: number) => {
                        str += `${item.marker}  ${item.seriesName} ：${item.value.toLocaleString()}${unit[index]}<br>`
                    })

                    return `${val[0].axisValue}<br>${str}`
                }
            },
            grid: {
                top: '20%',
                left: '14%',
                right: '20%',
                bottom: '15%',
                // containLabel: true
            },
            xAxis: [{
                type: 'category',
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#CCCCCC',
                        width: 1,
                        type: 'solid'
                    }
                },

                axisLabel: {
                    show: true,
                    color: '#fff'
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false,
                },

                data: xData,

            }],

            yAxis: [
                {
                    type: 'value',
                    name: '降水量',
                    nameTextStyle: {
                        color: '#62BD31',
                        align: 'right',
                        fontWeight: 'bold',
                        padding: [0, 10, 0, 0]
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
                            color: '#62BD31',
                        },
                        formatter: function (value: any, index: any) {
                            return value + 'mm';
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                },
                {
                    type: 'value',
                    name: '温度',
                    nameTextStyle: {
                        color: '#F6BD16',
                        fontWeight: 'bold',
                        padding: [0, 0, 0, 50]
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
                            color: '#F6BD16',
                        },
                        formatter: '{value}°C'
                    },
                    axisTick: {
                        show: false,
                    },
                },
                {
                    type: 'value',
                    name: '湿度',
                    position: 'right',
                    offset: 40,
                    nameTextStyle: {
                        color: '#35CBE6',
                        fontWeight: 'bold',
                        padding: [0, 0, 0, 45]
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
                            color: '#35CBE6',
                        },
                        formatter: '{value}%'
                    },
                    axisTick: {
                        show: false,
                    },
                }
            ],
            series: [
                {
                    name: '降水量',
                    type: 'bar',
                    // smooth: true, //是否平滑
                    showAllSymbol: true,
                    itemStyle: {
                        color: '#62BD31',
                        barBorderRadius: [3, 3, 0, 0]
                    },
                    barWidth: '24',
                    data: jsList,
                },
                {
                    name: '温度',
                    type: 'line',
                    smooth: true, //是否平滑
                    yAxisIndex: '1',
                    showAllSymbol: true,
                    symbol: 'circle',
                    symbolSize: 12,
                    lineStyle: {
                        normal: {
                            color: "#F6BD16",
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 0,
                            shadowOffsetY: 5,
                            shadowOffsetX: 5,
                        },
                    },
                    itemStyle: {
                        color: "#545F33",
                        borderColor: "#F6BD16",
                        borderWidth: 2,
                        shadowColor: 'rgba(0, 0, 0, .3)',
                        shadowBlur: 0,
                        shadowOffsetY: 2,
                        shadowOffsetX: 2,
                    },
                    data: wdList,
                },
                {
                    name: '湿度',
                    type: 'line',
                    smooth: true, //是否平滑
                    yAxisIndex: '2',
                    symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
                    showAllSymbol: true,
                    symbolSize: 0,
                    lineStyle: {
                        normal: {
                            color: "#35CBE6",
                        },
                    },
                    areaStyle: { //区域填充样式
                        normal: {
                            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: "rgba(53, 203, 230, 0.5)"


                            },
                                {
                                    offset: 1,
                                    color: "rgba(25,163,223, 0.2)"
                                }
                            ], false),
                            shadowColor: 'rgba(53, 203, 230, 0.2)', //阴影颜色
                            shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                        }
                    },
                    data: sdList,
                },
            ]
        };
        this.centerChart.setOption(option, true);
        let len = 0
        clearInterval(this.timer1)
        this.timer1 = setInterval(() => {
            if (len === xData.length) {
                len = 0
            }
            this.centerChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: len,
            })
            len++
        }, 3800)
    }

    setRightChart(data: any) {
        this.rightChart = echarts.init(this.$refs.rightChart);
        let list: any [] = []
        let xData: any [] = []
        let bayberry: any [] = []
        let rice: any [] = []
        data.forEach((item: any) => {
            xData.push(item.year + '年')
            if (item.type == '杨梅') {
                bayberry.push(item.farmPrice.toFixed(2))
            } else {
                rice.push(item.farmPrice.toFixed(2))
            }
        })
        let option: any = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
                },
                backgroundColor: 'rgba(3,3,3,0.5)',
                borderWidth: 0,
                textStyle: {
                    color: '#ffffff',
                    fontSize: '14',
                },
                formatter: (val: any) => {
                    let str: string = ''
                    val.forEach((item: any, index: number) => {
                        str += `${item.marker}  ${item.seriesName} ：${item.value.toLocaleString()}元/kg<br>`
                    })

                    return `${val[0].axisValue}<br>${str}`
                }
            },

            grid: {
                top: '15%',
                left: '13%',
                right: '5%',
                bottom: '10%',
                // containLabel: true
            },
            legend: {
                align: "left",
                right: '7%',
                top: '2%',
                type: 'plain',
                data: [{name: '杨梅', textStyle: {color: '#FFFFFF'}}, {name: '大米', textStyle: {color: '#FFFFFF'}}],
                icon: 'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',
                itemWidth: 12,
                itemHeight: 12,
            },
            xAxis: [
                {
                    type: 'category',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#CCCCCC',
                            width: 1,
                            type: 'solid'
                        }
                    },

                    axisLabel: {
                        show: true,
                        color: '#fff'
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false,
                    },

                    data: Array.from(new Set(xData)),

                }],

            yAxis: [
                {
                    type: 'value',
                    name: '元/kg',
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
                            color: '#d1e6eb',
                        },
                        formatter: function (value: any, index: any) {
                            return value + '元';
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                }
            ],
            series: [
                {
                    type: 'line',
                    name: '杨梅',
                    showAllSymbol: true,
                    symbol: 'circle',
                    symbolSize: 12,
                    lineStyle: {
                        normal: {
                            color: "#F6BD16",
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 0,
                            shadowOffsetY: 5,
                            shadowOffsetX: 5,
                        },
                    },
                    label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#F6BD16',
                            fontFamily: 'YouSheBiaoTiHei'
                        }
                    },

                    itemStyle: {
                        color: "#F6BD16",
                        borderColor: "#fff",
                        borderWidth: 2,
                        shadowColor: 'rgba(0, 0, 0, .3)',
                        shadowBlur: 0,
                        shadowOffsetY: 2,
                        shadowOffsetX: 2,
                    },

                    data: bayberry,
                },
                {
                    name: '大米',
                    type: 'line',
                    // smooth: true, //是否平滑
                    showAllSymbol: true,
                    // symbol: 'image://./static/images/guang-circle.png',
                    symbol: 'circle',
                    symbolSize: 12,
                    lineStyle: {
                        normal: {
                            color: "#62BD31",
                            shadowColor: 'rgba(0, 0, 0, .3)',
                            shadowBlur: 0,
                            shadowOffsetY: 5,
                            shadowOffsetX: 5,
                        },
                    },
                    label: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: '#62BD31',
                            fontFamily: 'YouSheBiaoTiHei'
                        }
                    },

                    itemStyle: {
                        color: "#62BD31",
                        borderColor: "#fff",
                        borderWidth: 2,
                        shadowColor: 'rgba(0, 0, 0, .3)',
                        shadowBlur: 0,
                        shadowOffsetY: 2,
                        shadowOffsetX: 2,
                    },

                    data: rice,
                },
            ]
        };
        this.rightChart.setOption(option, true);
        let len = 0
        clearInterval(this.timer2)
        this.timer2 = setInterval(() => {

            if (len === xData.length) {
                len = 0
            }
            this.rightChart.dispatchAction({
                type: 'showTip',
                seriesIndex: 0,
                dataIndex: len,
            })
            len++
        }, 3800)
    }


    //左上部分数据处理
    getLeftTopData(data: any) {
        console.log(data)
        if (this.$route.path !== '/production') {
            return
        }
        this.timeout = setTimeout(() => {
            this.mainNum = []
            let arrData: any = data.data
            arrData.forEach((item: any) => {
                if (item.type == '杨梅') {
                    item.width = '90px'
                    item.height = '75px'
                    item.imgPath = require("./images/left2.png")
                } else {
                    item.width = '72px'
                    item.height = '75px'
                    if (item.type == '蔬菜') {
                        item.imgPath = require('../../assets/images/vegetable/vegetables.png')
                    } else {
                        item.imgPath = require("./images/left1.png")
                    }

                }
                this.mainNum.push(item.townshipCount)
                this.mainNum.push(item.baseCount)
                this.mainNum.push(item.plantAreaCount)
                this.mainNum.push(item.productType)
                this.mainNum.push(item.productCount)
            })
            this.leftTopData = arrData
            this.$nextTick(() => {
                let list: any = this.$refs.num
                list.forEach((item: any, index: number) => {
                    animateValue(item, this.mainNum[index], 1000)
                })
            })
        }, 300);
    }

    //右上部分数据处理
    getRightTopData(data: any) {
        if (this.$route.path !== '/production') {
            return
        }
        this.timeout = setTimeout(() => {
            let arrData: any = data.data
            // console.log(arrData)
            this.iconList = [
                {
                    imgPath: require("./images/right1.png"),
                    title: '平均降水量：',
                    value: '110',
                    unit: 'mm'
                },
                {
                    imgPath: require("./images/right2.png"),
                    title: '平均温度：',
                    value: '24.6',
                    unit: '°C'
                },
                {
                    imgPath: require("./images/right3.png"),
                    title: '平均湿度：',
                    value: '56',
                    unit: '%'
                },
                {
                    imgPath: require("./images/right4.png"),
                    title: '平均日照时长：',
                    value: '14',
                    unit: 'h'
                }
            ]
            this.iconList.forEach((item: any) => {
                for (let key in arrData) {
                    if (item.title.indexOf(key) > -1) {
                        item.value = Number(arrData[key]).toFixed(1) + item.unit
                    }
                }
            })

            // this.rightTopData = arrData

        }, 300);
    }

    //产量图表数据处理
    getYieldData(data: any) {
        if (this.$route.path !== '/production') {
            return
        }
        this.timeout = setTimeout(() => {
            let arrData: any = data.data
            // console.log(arrData)
            this.setLeftChart(arrData)
        }, 300);
    }

    //预测产量数据处理
    getForecastData(data: any) {
        if (this.$route.path !== '/production') {
            return
        }
        this.timeout = setTimeout(() => {
            let arrData: any = data.data
            console.log(arrData,11111111111111111)
            this.influence = [
                {

                    title: '年度杨梅总种植面积',
                    value: arrData.plantAreaCount.toLocaleString() + '亩'
                },
                {

                    title: '年度杨梅长势判断',
                    value: arrData.growth
                },
                {

                    title: '3月降水量',
                    value: arrData.precipitation3 + 'mm'
                },
                {
                    title: '4月降水量',
                    value: arrData.precipitation4 + 'mm'
                },
                {

                    title: '5月降水量',
                    value: arrData.precipitation5 + 'mm'
                },
                {
                    title: '6月降水量',
                    value: arrData.precipitation6 + 'mm'
                },
                // {
                //     title: '7月干旱天数',
                //     value: arrData.droughtDays7 + '天'
                // },
                // {
                //     title: '8月干旱天数',
                //     value: arrData.droughtDays8 + '天'
                // },
                // {
                //     title: '9月干旱天数',
                //     value: arrData.droughtDays9 + '天'
                // },
                {
                    title: '4月低湿天数',
                    value: arrData.lowHumidity + '天'
                },
                {
                    title: '冬季低温天',
                    value: arrData.lowTemperature + '天'
                },
                {
                    title: '年度病虫害发生情况',
                    value: arrData.pestLevel
                },
                // {
                //     title: '历年杨梅年产量',
                //     value: arrData.formerYearYieldCount.toLocaleString() + '吨'
                // }
            ]
            animateValue(this.$refs.yield, arrData.yieldCount, 600)
            // this.setLeftChart(arrData)
        }, 300);
    }

    //病虫害列表数据处理
    getPestData(data: any) {
        if (this.$route.path !== '/production') {
            return
        }
        this.timeout = setTimeout(() => {
            let arrData: any = data.data
            this.condition = []
            for (let key in arrData) {
                this.condition.push(arrData[key][0])
            }
        }, 300);
    }

    //气象统计图表数据处理
    getMeteorologicalData(data: any) {
        if (this.$route.path !== '/production') {
            return
        }
        this.timeout = setTimeout(() => {
            let arrData: any = data.data
            // console.log(arrData,11111111111111111)
            this.setCenterChart(arrData)
        }, 300);
    }

    //生产主体统计数据处理
    getProductionSubData(data: any) {
        // console.log(data)
        if (this.$route.path !== '/production') {
            return
        }
        this.timeout = setTimeout(() => {
            let arrData: any = data.data
            this.ProductionSubList = arrData.list
            // console.log(arrData,11111111111111111)
            animateValue(this.$refs.cart, arrData.productNum, 600)
            animateValue(this.$refs.main, arrData.categoryCount, 600)
        }, 300);
    }

    //农产品价格图表数据处理
    getPriceData(data: any) {
        if (this.$route.path !== '/production') {
            return
        }
        this.timeout = setTimeout(() => {
            let arrData: any = data.data
            // console.log(arrData,11111111111111111)
            this.setRightChart(arrData)
        }, 300);
    }

    getLeftTopParams() {
        //拼接查询条件
        return {
            year: this.currentYear - 1
        };
    }

    getForecastParams() {
        //拼接查询条件
        return {
            year: this.currentYear,
            type: '杨梅'
        };
    }

    getPestParams() {
        //拼接查询条件
        return {};
    }


    //获取数据
    queryData() {
        // //主体分析
        socketClient.addCallBack(this.apiurl.leftTop, this.getLeftTopData);
        socketClient.addSend(this.apiurl.leftTop, this.getLeftTopParams);
        // //气象数据
        socketClient.addCallBack(this.apiurl.rightTop, this.getRightTopData);
        socketClient.addSend(this.apiurl.rightTop, this.getLeftTopParams);
        // //产量
        socketClient.addCallBack(this.apiurl.yield, this.getYieldData);
        socketClient.addSend(this.apiurl.yield, this.getLeftTopParams);
        // //预测产量
        socketClient.addCallBack(this.apiurl.forecast, this.getForecastData);
        socketClient.addSend(this.apiurl.forecast, this.getForecastParams);
        // //病虫害
        socketClient.addCallBack(this.apiurl.pest, this.getPestData);
        socketClient.addSend(this.apiurl.pest, this.getPestParams);
        // //气象统计
        socketClient.addCallBack(this.apiurl.meteorological, this.getMeteorologicalData);
        socketClient.addSend(this.apiurl.meteorological, this.getPestParams);
        // //生产主体统计
        socketClient.addCallBack(this.apiurl.productionSub, this.getProductionSubData);
        socketClient.addSend(this.apiurl.productionSub, this.getLeftTopParams);
        // //农产品价格
        socketClient.addCallBack(this.apiurl.price, this.getPriceData);
        socketClient.addSend(this.apiurl.price, this.getPestParams);
        setTimeout(() => {
            socketClient.sendAll()
        }, 500)

    }

    mounted() {
        const that = this;
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth;
                that.screenWidth = window.screenWidth;
            })();
        };
        this.time = m().format("YYYY-MM-DD HH:mm:ss")

        this.queryData()

    }

    beforeDestroy() {

        for (const key in this.apiurl) {
            socketClient.delCallBack(this.apiurl[key]);
            socketClient.delSend(this.apiurl[key]);
        }
        clearInterval(this.timer0)
        clearInterval(this.timer1)
        clearInterval(this.timer2)
    }

}
</script>

<style scoped lang="scss">

.popover-content {
    background: rgba(3, 3, 3, 0.5);
    margin-top: -15px;

    .popover-title {
        color: #FFFFFF;
        display: flex;
        align-items: center;
        padding-left: 10px;
        height: 30px;
        //background: #CC5252;
        border-radius: 5px 5px 0px 0px;
    }

    .popover-cont {
        padding: 10px 20px;
        text-align: center;
        color: #FFFFFF;
        //background: #FFFFFF;
        border-radius: 0px 0px 5px 5px;

        div {
            line-height: 30px;
        }
    }
}


.production {
    //font-family: YouSheBiaoTiHei;
    font-family: SourceHanSansSC-Bold;
    width: 100%;
    min-height: 100%;
    background: url("./images/productionbg.jpg") no-repeat;
    background-size: 100% 100%;
    color: #FFFFFF;
    overflow: hidden;

    /deep/ .el-popover__reference {
        //width: 100%;
        .top-left-info-val {
            &.count {
                cursor: pointer;
            }

            //margin-left: 0 !important;
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
        font-family: 35 --Regular;
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

    .content {
        position: relative;
        z-index: 999;
        display: flex;
        flex-direction: column;
        //width: 1860px;
        margin: auto;


        //图标闪动效果
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
            100% {
                opacity: 1;
                transform: none;
            }
        }

        .seamless-warp {
            &.influence {
                height: 170px;
            }

            &.condition {
                height: 246px;
            }

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

        .top {
            width: 100%;
            height: 250px;
            padding: 0 30px;
            //position: relative;
            z-index: 99;
            //margin-top: 10px;
            display: flex;
            justify-content: space-between;

            .top-left {
                width: 75.5%;
                height: 100%;
                background: url("./images/topbg.png") no-repeat;
                background-size: 100% 100%;
                display: flex;

                .top-name {
                    font-size: 20px;
                    font-family: Source Han Sans SC;
                    font-weight: bold;
                    color: #F6BD16;
                    text-shadow: 0px 0px 20px #F6BD16;
                }

                .top-desc {
                    font-size: 14px;
                    font-family: Source Han Sans SC;
                    font-weight: 400;
                    color: #FFFFFF;
                    line-height: 20px;
                    opacity: 0.5;
                    padding-top: 5px;
                }

                .top-left-left {
                    display: flex;
                    //align-items: center;
                    width: 50%;

                    .top-left-left-img {
                        //flex: 1;
                        width: 150px;
                        height: 250px;
                        background: rgba(255, 255, 255, 0.2);
                        border-radius: 10px 0px 0px 10px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;

                        .top-left-left-img-item {
                            animation-name: imageAnimation_2685;
                            animation-iteration-count: infinite;
                            animation-timing-function: linear;
                            animation-duration: 2s;
                            animation-delay: 0s;
                            -webkit-user-drag: none;
                            filter: none;
                        }

                        &.sec {
                            border-radius: unset;
                            height: 230px;
                            margin-top: 10px;
                        }
                    }

                    .top-left-left-content {
                        width: calc(100% - 150px);
                        display: flex;
                        justify-content: space-between;
                        //flex: 0;
                        .top-left-info {
                            width: 50%;
                            margin: 55px 0;

                            &.border {
                                border-right: 1px solid rgba(255, 255, 255, 0.4);
                            }

                            .top-left-info-item {
                                font-family: Source Han Sans SC;
                                color: #FFFFFF;

                                &:nth-child(2) {
                                    padding: 10px 40px;
                                }

                                padding: 0 40px;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;


                                span {
                                    display: block;
                                    width: 50%;

                                    .top-left-info-val {
                                        width: 100%;
                                        margin-left: 10px;
                                    }
                                }

                                .top-left-info-title {
                                    width: 50%;
                                    font-size: 14px;
                                    white-space: nowrap;
                                }

                                .top-left-info-val {
                                    width: 50%;
                                    font-size: 30px;
                                    font-family: YouSheBiaoTiHei;
                                    color: #F6BD16;
                                    margin-left: 20px;
                                    text-align: left;

                                    &.count {
                                        color: #62BD31;
                                        cursor: pointer;
                                    }
                                }
                            }

                        }
                    }

                }

            }

            .top-right {
                width: 23%;
                padding: 10px 0;
                height: 100%;
                background: url("./images/toprbg.png") no-repeat;
                background-size: 100% 100%;
                position: relative;
                display: flex;
                flex-wrap: wrap;

                .top-right-title {
                    top: -30px;
                    left: 0;
                    position: absolute;
                    font-size: 20px;
                    font-weight: bold;
                    color: #FFFFFF;
                    z-index: 9999999999;

                    span {
                        font-size: 14px;
                        font-weight: 400;
                        color: #FFFFFF;
                        opacity: 0.5;
                    }
                }

                .top-right-icon {
                    width: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;

                    .top-right-icon-item {
                        width: 76px;
                        height: 65px;
                    }

                    .top-right-icon-info {
                        display: flex;
                        align-items: flex-end;
                        color: #FFFFFF;
                        opacity: 0.7;

                        .top-right-icon-info-title {
                            font-size: 13px;
                            white-space: nowrap;
                        }

                        .top-right-icon-info-val {
                            font-family: YouSheBiaoTiHei;
                            font-size: 24px;
                            font-weight: bold;
                            margin-bottom: -5px;
                        }
                    }
                }
            }
        }

        .bom {
            position: relative;
            z-index: 99;
            padding-top: 20px;
            margin-left: 30px;
            margin-right: 30px;
            padding-bottom: 25px;
            display: flex;
            justify-content: space-between;
            overflow: hidden;

            .triangle {
                width: 25px;
                height: 35px;
                border-radius: unset;
                pointer-events: auto;
                animation-name: imageAnimation_2685;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
                animation-duration: 2s;
                animation-delay: 0s;
                -webkit-user-drag: none;
                filter: none;
            }


            .bom-item {
                width: 100%;
                display: flex;

                .bom-item-tip {
                    width: 5px;
                    height: 35px;
                    background: rgba(255, 255, 255, 0.5);
                    margin-right: 5px;
                }

                .bom-item-title {
                    width: 100%;
                    background: rgba(255, 255, 255, 0.2);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .bom-item-title-item {
                        display: flex;
                        align-items: center;
                        font-size: 20px;
                        font-weight: bold;
                        color: #F6BD16;
                        text-shadow: 0px 0px 20px #F6BD16;
                    }

                    .bom-item-title-more {
                        font-size: 14px;
                        font-weight: 400;
                        color: #FFFFFF;
                        margin-right: 10px;
                        cursor: pointer !important;
                    }

                }
            }

            .bom-content {
                margin-top: 5px;
                width: 100%;
                height: 624px;
                background: rgba(255, 255, 255, 0.2);

                .bom-left-title {
                    padding-top: 15px;
                    padding-left: 20px;
                    font-size: 16px;
                    font-weight: bold;
                    color: #FFFFFF;
                }

                .bom-left-top {
                    width: 600px;
                    height: 300px;
                }

                .bom-left-bom {
                    width: 100%;
                    height: 246px;
                    padding: 10px 20px;
                    display: flex;
                    align-items: center;

                    .bom-left-bom-left {
                        width: 45%;
                        display: flex;
                        align-items: center;
                        margin-right: 30px;
                        //justify-content: center;
                        .bom-left-bom-left-item {
                            width: 200px;
                            height: 200px;
                            background: rgba(0, 0, 0, 0.3);
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            flex-direction: column;

                            .bom-left-bom-left-item-num {
                                font-size: 48px;
                                font-family: YouSheBiaoTiHei;
                                color: #F6BD16;
                            }
                        }
                    }

                    .bom-left-bom-right {
                        width: 330px;

                        .bom-left-bom-right-header {
                            display: flex;
                            align-items: center;
                            justify-content: space-evenly;
                            width: 100%;
                            height: 40px;
                            background: rgba(0, 0, 0, 0.3);
                            border-radius: 20px;

                            div {
                                width: 50%;
                                margin-left: -15px;
                                //text-align: left;
                                display: flex;
                                justify-content: center;
                                font-size: 16px;
                                font-weight: bold;
                                color: #F6BD16;
                                line-height: 36px;
                                text-shadow: 0px 0px 20px #F6BD16;
                                //padding-left: 50px;
                                &:first-child {
                                    margin-left: -30px;
                                }
                            }
                        }

                        .bom-left-bom-right-cell {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            font-size: 14px;
                            font-weight: 400;
                            color: #FFFFFF;
                            line-height: 30px;

                            div {
                                //width: 50%;

                                //text-align: left;
                                //padding-left: 50px;
                            }

                            .bom-left-bom-right-cell-title {
                                span {
                                    display: inline-block;
                                    width: 120px;
                                    height: 100%;
                                    vertical-align: middle;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                }

                                white-space: nowrap !important;
                            }
                        }
                    }
                }

                .center-top {
                    //margin-top: 10px;
                    padding: 10px 20px 20px;
                    //margin-bottom: 20px;
                    height: 300px;

                    .bom-left-bom-right-header {
                        padding: 0 30px;
                        display: flex;
                        align-items: center;
                        //justify-content: space-evenly;
                        height: 40px;
                        background: rgba(0, 0, 0, 0.3);
                        border-radius: 20px;

                        div {
                            //width: 50%;
                            //text-align: left;
                            display: flex;
                            font-size: 16px;
                            font-weight: bold;
                            color: #F6BD16;
                            line-height: 30px;
                            text-shadow: 0px 0px 20px #F6BD16;
                            //padding-left: 50px;
                        }
                    }

                    .bom-left-bom-right-cell {
                        padding: 0 30px;
                        display: flex;
                        align-items: center;
                        //justify-content: space-evenly;
                        font-size: 14px;
                        font-weight: 400;
                        color: #FFFFFF;
                        line-height: 33px;

                        .pestType {
                            span {
                                display: inline-block;
                                width: 120px;
                                height: 100%;
                                vertical-align: middle;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }


                        }

                        &.light {
                            color: #F6BD16;
                        }

                        &.heavy {
                            color: #ff6666;
                        }

                        div {
                            //width: 50%;
                        }
                    }
                }

                .center-bom {
                    width: 100%;
                    height: 246px;
                }

                .right-top {
                    display: flex;
                    align-items: center;
                    justify-content: space-evenly;
                    margin-top: 10px;
                    margin-bottom: 30px;

                    .right-top-item {
                        width: 270px;
                        height: 140px;
                        background: rgba(0, 0, 0, 0.3);
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;

                        .right-top-item-title {
                            font-size: 18px;
                            font-weight: bold;
                            color: #FFFFFF;
                        }

                        .right-top-item-val {
                            font-size: 60px;
                            font-family: YouSheBiaoTiHei;
                            font-weight: 400;
                            color: #62BD31;
                            text-shadow: 0px 0px 20px rgba(98, 189, 49, 0.5);
                        }
                    }
                }

                .right-bom {
                    width: 100%;
                    height: 366px;
                }
            }

            .bom-left {
                width: 32%;
            }
        }

    }

}


</style>
