<template>
    <div class="vegetable">

        <bgAnim></bgAnim>
        <OneSizeContainer :width="1920" :height="1080" :maxRatio="2">
            <selfHead title="高山蔬菜产业监管分析" @back="back"></selfHead>
            <div class="content">
                <div class="left">
                    <div class="leftTop">
                        <selfTitle>肥药售卖情况概况</selfTitle>
                        <div class="leftTopChart">
                            <div class="leftTopChart-box" v-for="(item,index) in superviseIconList" :key="index">
                                <img :src="item.icon" class="leftTopChart-icon" alt="">
                                <div class="leftTopChart-num" ref="num"></div>
                                <div class="leftTopChart-title">{{ item.title }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="leftMid">
                        <selfTitle>肥药最新售卖记录</selfTitle>
                        <div class="leftMidChart">
                            <el-row class="leftMidChart-header">
                                <el-col :span="3">农资店名称</el-col>
                                <el-col :span="3">商品名称</el-col>
                                <el-col :span="3">购买人</el-col>
                                <el-col :span="2">购买人 <br>田亩数</el-col>
                                <el-col :span="3">计价单位</el-col>
                                <el-col :span="2">计价数量</el-col>
                                <el-col :span="2">销售金额</el-col>
                                <el-col :span="3">购买时间</el-col>
                                <el-col :span="3">所属乡镇</el-col>
                            </el-row>
                            <vue-seamless-scroll :data="record" :class-option="classOption"
                                                 class="seamless-warp influence">
                                <el-row class="leftMidChart-cell" :class="{'warn':item.warnStatus == 'y'}"
                                        v-for="(item,index) in record"
                                        :key="index">
                                    <el-col :span="3" :title="item.storeName" style="padding-left:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{{ item.storeName }}</el-col>
                                    <el-col :span="3">{{ item.goodsName }}</el-col>
                                    <el-col :span="3">{{ item.buyer }}</el-col>
                                    <el-col :span="2">{{ item.buyerFarmland }}亩</el-col>
                                    <el-col :span="3">{{ item.valuationUnit }}</el-col>
                                    <el-col :span="2">{{ item.pricingQuantity }}</el-col>
                                    <el-col :span="2">{{ item.salesAmount }}元</el-col>
                                    <el-col :span="3">{{ item.buyTime }}</el-col>
                                    <el-col :span="3">{{ item.township }}</el-col>

                                </el-row>
                            </vue-seamless-scroll>
                        </div>
                    </div>
                    <div class="leftBottom">
                        <selfTitle>上1年肥药售卖时间分布</selfTitle>
                        <div class="leftBottomChart" ref="leftBottomChart"></div>
                    </div>
                </div>

                <div class="right">
                    <div class="rightTop">
                        <selfTitle>肥药售卖区域分布<span class="tip">（图表可左右拖动查看）</span></selfTitle>
                        <div class="rightTopChart" ref="rightTopChart"></div>
                    </div>

                    <div class="rightBottom">
                        <selfTitle>异常购买信息</selfTitle>
                        <div class="rightBomChart">
                            <el-row class="rightBomChart-header">
                                <el-col :span="3">农资店名称</el-col>
                                <el-col :span="3">商品名称</el-col>
                                <el-col :span="3">购买人</el-col>
                                <el-col :span="2">购买人 <br>田亩数</el-col>
                                <el-col :span="3">计价单位</el-col>
                                <el-col :span="2">计价数量</el-col>
                                <el-col :span="2">销售金额</el-col>
                                <el-col :span="3">购买时间</el-col>
                                <el-col :span="3">所属乡镇</el-col>
                            </el-row>
                            <vue-seamless-scroll :data="warnRecord" :class-option="warnOption"
                                                 class="seamless-warp influence">
                                <el-row class="rightBomChart-cell" v-for="(item,index) in warnRecord"
                                        :key="index">
                                    <el-col :span="3" :title="item.storeName" style="padding-left:3px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">{{ item.storeName }}</el-col>
                                    <el-col :span="3">{{ item.goodsName }}</el-col>
                                    <el-col :span="3">{{ item.person }}</el-col>
                                    <el-col :span="2">{{ item.buyerFarmland }}亩</el-col>
                                    <el-col :span="3">{{ item.valuationUnit }}</el-col>
                                    <el-col :span="2">{{ item.pricingQuantity }}</el-col>
                                    <el-col :span="2">{{ item.salesAmount }}元</el-col>
                                    <el-col :span="3">{{ item.buyTime }}</el-col>
                                    <el-col :span="3">{{ item.township }}</el-col>

                                </el-row>
                            </vue-seamless-scroll>
                        </div>
                    </div>
                </div>
            </div>
        </OneSizeContainer>
    </div>
</template>

<script lang="ts">
import {Component, Mixins, Vue} from "vue-property-decorator";
import selfHead from "../../components/Head/Head.vue"
import bgAnim from '@/components/bgAnim/BgAnim.vue'
import selfTitle from '../vegetable/Title.vue'
import * as echarts from 'echarts';
import map from '../vegetable/map.json'
import {animateValue, noPassByName} from "@/util";
import autoResizeMixin from "@/mixins/echarts/autoResizeMixin"
import * as socketClient from '@/views/socketClient';
import vueSeamlessScroll from "vue-seamless-scroll";
import m from "moment"
import _ from "lodash";

@Component({
    name: "Supervise",
    components: {
        selfHead,
        bgAnim,
        selfTitle,
        vueSeamlessScroll
    },
    mixins: [autoResizeMixin]
})
export default class Supervise extends Mixins(autoResizeMixin) {
    public $refs!: {

        leftBottomChart: HTMLDivElement,

        rightTopChart: HTMLDivElement,
        yield: HTMLSpanElement,
        num: HTMLSpanElement,
    }

    influence: any[] = []
    superviseIconList: any[] = [
        {
            icon: require("../../assets/images/vegetable/superviseicon1.png"),
            title: '农资店总数'
        }, {
            icon: require("../../assets/images/vegetable/superviseicon2.png"),
            title: '售卖次数'
        }, {
            icon: require("../../assets/images/vegetable/superviseicon3.png"),
            title: '服务人数'
        }, {
            icon: require("../../assets/images/vegetable/superviseicon4.png"),
            title: '销售金额(万元)'
        }, {
            icon: require("../../assets/images/vegetable/superviseicon5.png"),
            title: '覆盖田亩数'
        },
    ]
    record: any[] = []
    warnRecord: any[] = []
    currentYear: any = m().format('YYYY')

    timeout: any = null;
    timer2: any = null;

    classOption: Object = {
        step: 0.2,
        limitMoveNum: 6
    };
    warnOption: Object = {
        step: 0.2,
        limitMoveNum: 11
    };


    apiurl: any = {
        leftTop: '/vegetableIndustrySupervision/visFatMedicineSaleSurvey',
        leftMid: '/vegetableIndustrySupervision/visFertilizerMedicineSaleRecord',
        leftBottom: '/vegetableIndustrySupervision/visFertilizerMedicineSaleDistribute',
        rightTop: '/vegetableIndustrySupervision/visFertilizerMedicineSaleAreaDistribute',
        rightBom: '/vegetableIndustrySupervision/visFertilizerMedicineSaleWarn',
    }


    getLeftBottomChart(data: any) {
        let myChart = echarts.init(this.$refs.leftBottomChart);
        let list: any[] = _.cloneDeep(data)
        let xData: any[] = []
        let barData: any[] = []
        let lineData: any[] = []
        list.forEach((item: any) => {
            xData.push(item.month + '月')
            barData.push(item.acresCoveredNum)
            lineData.push(Number(item.salesAmount) / 10000)
        })
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
                        ${item.seriesName} ：${item.value.toLocaleString()}${index == 0 ? '亩' : '万元'}<br>`

                    })

                    return `${val[0].axisValue} <br>` + str
                }
            },
            grid: {
                left: '7%',
                right: '7%',
                bottom: '14%',
                top: '20%',
                containLabel: false,
            },
            legend: {
                itemWidth: 8,
                itemHeight: 8,
                data: [
                    {
                        name: '覆盖田亩数',
                        icon: 'rect',
                        itemStyle: {
                            color: '#62BD31'
                        }
                    },
                    {
                        name: '销售金额',
                        icon: 'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',
                        lineStyle: {
                            width: 16, type: 'solid'
                        }
                    }
                ],
                left: 'center',
                top: '5%',
                textStyle: {
                    color: '#fff',
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
                        fontSize: 13,
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
                    name: '亩',
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
                            color: 'rgba(255, 255, 255, 0.5)',
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                },
                {
                    type: 'value',
                    name: '万元',
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontWeight: 'bold',
                        padding: [0, 0, 0, 45]
                    },
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
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.5)',
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                },
            ],
            series: [
                {
                    name: '覆盖田亩数',
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
                            barBorderRadius: [10, 10, 0, 0],
                        },
                    },
                    data: barData,
                },
                {
                    name: '销售金额',
                    type: 'line',
                    yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                    smooth: false, //平滑曲线显示

                    symbol: 'circle', //标记的图形为实心圆
                    symbolSize: 8, //标记的大小
                    itemStyle: {
                        color: "#F6BD16",
                        borderColor: "#fff",
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

                    data: lineData,
                },
            ],
        };
        myChart.setOption(option);
        if(!this.timer2){
            let len = 0
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
            }, 2000)
        }

    }

    getRightTopChart(data: any) {
        let myChart = echarts.init(this.$refs.rightTopChart);
        let list: any[] = _.cloneDeep(data)
        let chartdata: any [] = []
        let chartdata2: any [] = []
        let xdata: any [] = []

        for (let i = 0; i < list.length; i++) {
            xdata.push(list[i].township)
            chartdata.push(list[i].acresCoveredNum)
            chartdata2.push((Number(list[i].salesAmount) / 10000))
        }
        let max: any = chartdata.sort((a: any, b: any) => {
            return b - a
        })
        let option: any = {
            // 缩放平移组件
            dataZoom: [
                {
                    type: 'inside',  //slider有滑块，inside内置
                    disabled: false,  //是否停止组件功能
                    xAxisIndex: 0,  //x轴,可以用数组表示多个轴
                    zoomLock: true,  //是否锁定区域大小（true,只能平移不能缩放）
                    preventDefaultMouseMove: false,
                    filterMode: "empty",
                    startValue: 0,  //一行有几个（起始数组下标）
                    endValue: 10,    //一行有几个（结束数组下标）
                    start: null,
                    end: null,
                },
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
                        if (index == 1 || index == 4) {
                            str += `${item.marker}  ${item.seriesName} ：${val[index - 1].value.toLocaleString()}${index == 1 ? '亩' : '万元'}<br>`
                        }
                    })
                    return `${val[0].axisValue} <br>` + str
                }
            },
            textStyle: {
                color: "#c0c3cd",
                fontSize: 14
            },
            color: ["#26BF40"],
            legend: {
                top: '3%',
                left: 'center',
                itemWidth: 8,
                itemHeight: 8,
                textStyle: {
                    color: '#fff'
                },
                selectedMode: false
            },
            grid: {
                top: "15%",
                left: "10%",
                right: "10%",
                bottom: "10%",
                containLabel: false
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
                data: xdata,
                type: "category"
            },
            yAxis: [
                {
                    type: 'value',
                    name: '亩',
                    max: max[0] * 1.5,
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
                            color: 'rgba(255, 255, 255, 0.5)',
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                },
                {
                    type: 'value',
                    name: '万元',
                    nameTextStyle: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontWeight: 'bold',
                        padding: [0, 0, 0, 45]
                    },
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
                        textStyle: {
                            color: 'rgba(255, 255, 255, 0.5)',
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                },
            ],
            series: [
                {
                    data: chartdata,
                    name: '覆盖田亩数',
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
                        },

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
                    name: '覆盖田亩数',
                    data: chartdata,
                    type: "pictorialBar",
                    barMaxWidth: "20",
                    symbol: "diamond",
                    symbolOffset: ['-63%', '50%'],
                    symbolSize: [20, 20 * 0.5],
                    zlevel: 2
                },
                {
                    name: '覆盖田亩数',
                    data: chartdata,
                    type: "pictorialBar",
                    barMaxWidth: "20",
                    symbolPosition: "end",
                    symbol: "diamond",
                    symbolOffset: ['-63%', '-50%'],
                    symbolSize: [20, 20 * 0.5],
                    zlevel: 3
                },
                //----------------
                {
                    data: chartdata2,
                    name: '销售金额',
                    yAxisIndex: '1',
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
                    name: '销售金额',
                    data: [1, 1, 1, 1, 1, 1],
                    yAxisIndex: '1',
                    type: "pictorialBar",
                    barMaxWidth: "20",
                    symbol: "diamond",
                    symbolOffset: ['63%', '50%'],
                    symbolSize: [20, 20 * 0.5],
                    itemStyle: {
                        color: '#E6BB45'
                    },
                    zlevel: 2
                },
                {
                    name: '销售金额',
                    data: chartdata2,
                    yAxisIndex: '1',
                    type: "pictorialBar",
                    barMaxWidth: "20",
                    symbolPosition: "end",
                    symbol: "diamond",
                    symbolOffset: ['63%', '-50%'],
                    symbolSize: [20, 20 * 0.5],
                    itemStyle: {
                        color: '#E6BB45'
                    },
                    zlevel: 3
                }
            ],

        };
        myChart.setOption(option);
    }


    back() {
        this.$router.push('/vegetable')
    }

    getData(res: any) {
        // console.log(res)
        if (res.key == this.apiurl.leftTop) {
            this.$nextTick(() => {
                let data: any = _.cloneDeep(res.data)
                if (data) {
                    let list: any = this.$refs.num
                    list.forEach((item: any, index: number) => {
                        switch (index) {
                            case 0:
                                animateValue(item, data.agriculturalMaterialsStore, 1000)
                                break;
                            case 1:
                                animateValue(item, data.salesNum, 1000)
                                break;
                            case 2:
                                animateValue(item, data.serviceNum, 1000)
                                break;
                            case 3:
                                animateValue(item, data.salesAmount, 1000)
                                break;
                            case 4:
                                animateValue(item, data.acresCoveredNum, 1000)
                                break;
                        }
                    })
                }
            })
        } else if (res.key == this.apiurl.leftMid) {
            console.log(res);
            
            let data: any[] = _.cloneDeep(res.data)
            data.forEach((item: any) => {
                item.buyTime = m(item.buyTime).format("YYYY-MM-DD")
                item.buyer = noPassByName(item.buyer)
            })
            // console.log(data)
            this.record = data

        } else if (res.key == this.apiurl.leftBottom) {
            let list = _.cloneDeep(res.data)
            this.getLeftBottomChart(res.data)

        } else if (res.key == this.apiurl.rightTop) {
            // console.log(res.data)
            this.getRightTopChart(res.data)
        } else if (res.key == this.apiurl.rightBom) {
            let arrData: any = _.cloneDeep(res.data)
            arrData.forEach((item: any) => {
                item.buyTime = m(item.buyTime).format("YYYY-MM-DD")
                item.person = noPassByName(item.buyer)
            })
            this.warnRecord = arrData
        }
    }

    getParams(params?: any) {
        //拼接查询条件
        return () => {
            return params
        }
    }

    queryData() {
        for (const key in this.apiurl) {
            let params: any = {}
            // if (key === 'leftBom'||key === 'rightTop') {
            //     params = {year: this.currentYear-1,}
            // } else {
            //     params = {}
            // }

            params = {year: this.currentYear - 1}
            socketClient.addCallBack(this.apiurl[key], this.getData);
            socketClient.addSend(this.apiurl[key], this.getParams(params));
        }
        setTimeout(() => {
            socketClient.sendAll()
        }, 500);
    }

    mounted() {
        this.queryData()
    }

    beforeDestroy() {
        clearInterval(this.timer2)
        for (const key in this.apiurl) {
            socketClient.delCallBack(this.apiurl[key]);
            socketClient.delSend(this.apiurl[key]);
        }
    }
}
</script>

<style scoped lang="scss">
.vegetable {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: url('../../assets/images/vegetable/bg.jpg');
    background-size: cover;
    padding-bottom: 110px;

    .content {
        position: relative;
        z-index: 999;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        width: 100%;
        padding: 0 35px;
        //padding-top: 120px;

        .tip {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.5);
        }

        .left {
            width: 910px;

            .leftTop {
                width: 910px;
                height: 300px;
                margin-bottom: 20px;

                .leftTopChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, .2);
                    display: flex;
                    align-items: center;

                    .leftTopChart-box {
                        width: 182px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;

                        &:not(:first-child) {
                            border-left: 1px solid rgba(255, 255, 255, 0.2);
                        }

                        .leftTopChart-icon {
                            width: 84px;
                            height: 76px;
                        }

                        .leftTopChart-title {
                            font-size: 14px;
                            color: #FFFFFF;
                        }

                        .leftTopChart-num {
                            font-size: 36px;
                            font-family: YouSheBiaoTiHei;
                            color: #F6BD16;
                        }
                    }
                }

            }

            .leftMid {
                width: 910px;
                height: 300px;
                margin-bottom: 20px;

                .leftMidChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(255, 255, 255, .2);
                    padding-bottom: 20px;

                    .leftMidChart-header {
                        display: flex;
                        align-items: center;
                        padding-left: 20px;
                        height: 40px;
                        background: rgba(38, 191, 64, 0.3);
                        font-size: 14px;
                        font-weight: bold;
                        color: rgba(38, 191, 64, 1);
                    }

                    .leftMidChart-cell {
                        padding-left: 20px;
                        font-size: 14px;
                        color: #FFFFFF;
                        line-height: 34px;

                        &.warn {
                            color: #FF4C4C;
                        }

                    }
                }
            }

            .leftBottom {
                width: 910px;
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
            width: 910px;

            .rightTop {
                width: 910px;
                height: 460px;
                margin-bottom: 20px;

                .rightTopChart {
                    width: 100%;
                    height: 420px;
                    background-color: rgba(255, 255, 255, .2);
                }
            }

            .rightBottom {
                width: 910px;
                height: 460px;
                margin-bottom: 20px;

                .rightBomChart {
                    width: 100%;
                    height: 420px;
                    background-color: rgba(255, 255, 255, .2);
                    padding-bottom: 20px;

                    .rightBomChart-header {
                        display: flex;
                        align-items: center;
                        padding-left: 20px;
                        height: 40px;
                        background: rgba(255, 76, 76, 0.3);
                        font-size: 14px;
                        font-weight: bold;
                        color: rgba(255, 76, 76, 1);
                    }

                    .rightBomChart-cell {
                        padding-left: 20px;
                        font-size: 14px;
                        color: #FFFFFF;
                        line-height: 34px;

                        .light {
                            color: #E6BB45;
                        }

                        .heavy {
                            color: #FF4C4C;
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
