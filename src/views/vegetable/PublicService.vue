<template>
    <div class="publicService">
        <bgAnim></bgAnim>
        <OneSizeContainer style="z-index:999;" :width="1920" :height="1080" :maxRatio="3">
            <selfHead title="公共服务分析" @back="back" style="z-index:999;"></selfHead>
            <div class="content">
                <div class="left">
                    <div class="leftTop">
                        <selfTitle isDark>
                            公共服务资源分布情况
                            <span class="mark">（图表可左右拖动查看）</span>
                        </selfTitle>
                        <div class="leftTopChart" ref="leftTopChart"></div>
                    </div>
                    <div class="leftMid">
                        <selfTitle isDark>
                            农技专家和职业农民分布情况
                            <span class="mark">（图表可左右拖动查看）</span>
                        </selfTitle>
                        <div class="leftMidChart" ref="leftMidChart"></div>
                    </div>
                    <div class="leftBottom">
                        <selfTitle isDark>农技专家和职业农民占比</selfTitle>
                        <div class="leftBottomChart" ref="leftBottomChart"></div>
                    </div>
                </div>
                <div class="mid" ref="map"></div>
                <div class="right">
                    <ul>
                        <li>
                            <img src="../../assets/images/vegetable/publicService/nyggfwzx.png" alt="">
                            <div>
                                <div class="num" ref="publicServiceCenter">{{rightData.publicServiceCenter}}</div>
                                <div class="name">农业公共服务中心</div>
                            </div>
                        </li>
                        <li>
                            <img src="../../assets/images/vegetable/publicService/xdny.png" alt="">
                            <div>
                                <div class="num" ref="technologyDemonstration">{{rightData.technologyDemonstration}}</div>
                                <div class="name">现代农业科技示范基地</div>
                            </div>
                        </li>
                        <li>
                            <img src="../../assets/images/vegetable/publicService/kyys.png" alt="">
                            <div>
                                <div class="num" ref="researchInstitutes">{{rightData.researchInstitutes}}</div>
                                <div class="name">科研院所</div>
                            </div>
                        </li>
                        <li>
                            <img src="../../assets/images/vegetable/publicService/pxjd.png" alt="">
                            <div>
                                <div class="num" ref="trainingBase">{{rightData.trainingBase}}</div>
                                <div class="name">培训基地</div>
                            </div>
                        </li>
                        <li class="green">
                            <img src="../../assets/images/vegetable/publicService/njzj.png" alt="">
                            <div>
                                <div class="num" ref="specialisNum">{{rightData.specialisNum}}</div>
                                <div class="name">农技专家</div>
                            </div>
                        </li>
                        <li class="green">
                            <img src="../../assets/images/vegetable/publicService/xxzynm.png" alt="">
                            <div>
                                <div class="num" ref="newPracticingFarmer">{{rightData.newPracticingFarmer}}</div>
                                <div class="name">新型职业农民</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </OneSizeContainer>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import selfHead from "../../components/Head/Head.vue"
import bgAnim from '@/components/bgAnim/BgAnim.vue'
import selfTitle from './Title.vue'
import * as echarts from 'echarts';
import map from './map.json'
import * as socketClient from '@/views/socketClient';
import {animateValue} from "@/util";
import m from "moment"

@Component({
    name: "PublicService",
    components: {
        selfHead,
        bgAnim,
        selfTitle,
    }
})
export default class Index extends Vue {
    public $refs!: {
        leftTopChart:HTMLDivElement,
        leftMidChart:HTMLDivElement,
        leftBottomChart:HTMLDivElement,
        map:HTMLDivElement,
    }

    timeout:any = null
    timer1:any = null

    currentYear: any = m().format('YYYY')

    apiList:any = {
        leftTop:{
            url:'/publicServiceAnalysis/areaDistribute',
            params:{
                year:this.currentYear-1
            }
        },
        leftMid:{
            url:'/publicServiceAnalysis/personDistribute',
            params:{
                year:this.currentYear-1
            }
        },
        leftBottom:{
            url:'/publicServiceAnalysis/psPublicResourcePercentage',
            params:{
                year:this.currentYear-1
            }
        },
        map:{
            url:'/publicServiceAnalysis/mapDistribute',
            params:{
                year:this.currentYear-1
            }
        },
        right:{
            url:'/publicServiceAnalysis/psPublicResourceSurvey',
            params:{
                year:this.currentYear-1
            }
        }
    }

    rightData:any = {}

    getLeftTopChart(xAxisData:any,publicServiceCenter:any,technologyDemonstration:any,researchInstitutes:any,trainingBase:any) {
        let myChart = echarts.init(this.$refs.leftTopChart);
        // this.$set(this.mixinChartConfig,'rightMidChart',myChart)
        myChart.hideLoading();
        const option:any = {
            dataZoom: {
                type: "inside",
                minValueSpan: 4,
                maxValueSpan: 6
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(3,3,3,0)',
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
                                <div style="margin-left:15px;">${item.seriesName}：${item.data}个</div>
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
            grid:{
                top:'50px',
                left:'30px',
                right:'30px',
                bottom:'30px',
            },
            legend: {
                data: ['农业公共服务中心', '现代农业科技示范基地', '科研院所', '培训基地'],
                itemWidth: 8,
                itemHeight: 8,
                textStyle:{
                    color:"#fff",
                    fontSize:12
                }
            },
            xAxis:{
                type:'category',
                axisTick:{
                    show:false
                },
                axisLabel:{
                    color:'rgba(255, 255, 255, .5)'
                },
                axisLine:{
                    lineStyle:{
                        color:'rgba(255, 255, 255, .5)'
                    }
                },
                data:xAxisData
            },
            yAxis:{
                minInterval:1,
                axisTick:{
                    show:false
                },
                axisLine:{
                    show:false
                },
                axisLabel:{
                    color:'rgba(255, 255, 255, .5)'
                },
                splitLine:{
                    lineStyle:{
                        type:'dashed',
                        color:'rgba(255, 255, 255, .5)'
                    }
                }
            },
            series: [
                {
                    name:'农业公共服务中心',
                    data: publicServiceCenter,
                    type: 'bar',
                    stack: 'total',
                    barWidth:10,
                    itemStyle:{
                        normal:{
                            color:'#FCCD4C',
                            barBorderRadius:7
                        }
                    }
                },
                {
                    name:'现代农业科技示范基地',
                    data: researchInstitutes,
                    type: 'bar',
                    stack: 'total',
                    barWidth:10,
                    itemStyle:{
                        normal:{
                            color:'#E45B5B',
                            barBorderRadius:7
                        }
                    }
                },
                {
                    name:'培训基地',
                    data: trainingBase,
                    type: 'bar',
                    stack: 'total',
                    barWidth:10,
                    itemStyle:{
                        normal:{
                            color:'#26BF40',
                            barBorderRadius:7
                        }
                    }
                },
                {
                    name:'科研院所',
                    data: technologyDemonstration,
                    type: 'bar',
                    stack: 'total',
                    barWidth:10,
                    itemStyle:{
                        normal:{
                            color:'#E6E1B8',
                            barBorderRadius:7
                        }
                    }
                },
            ]
        }
        myChart.setOption(option);
        // let len = 0
        // clearInterval(this.timer6)
        // this.timer6 = setInterval(() => {
        //     if (len === xAxisData.length) {
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

    setLeftMidChart(xAxisData: any, specialisNum: any, newPracticingFarmer: any) {
        let chart = echarts.init(this.$refs.leftMidChart);
        let option: any = {
            dataZoom: {
                type: "inside",
                minValueSpan: 4,
                maxValueSpan: 6
            },
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
                data: ["农技专家", "职业农民"],
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
                    nameLocation: "end",
                    minInterval:1,
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
                 axisPointer: {
                    type: 'shadow'
                },
                formatter: function(datas: any) {
                    let res = datas[0].name + "<br/>",
                        val;
                    for (let i = 0, length = datas.length; i < length; i++) {
                        val = datas[i].value + "人";
                        res += datas[i].marker + datas[i].seriesName + "：" + val + "<br/>";
                    }
                    return res;
                }
            },
            series: [
                {
                    data: specialisNum,
                    type: "line",
                    name: "农技专家",
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
                        }
                    },
                    lineStyle: {
                        // 阴影部分
                        // shadowOffsetX: -1, // 折线的X偏移
                        // shadowOffsetY: 4, // 折线的Y偏移
                        // shadowBlur: 3, // 折线模糊
                        // shadowColor: "rgba(3,3,3, 0.6)" //折线颜色
                    }
                },
                {
                    data: newPracticingFarmer,
                    type: "line",
                    name: "职业农民",
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
                        }
                    },
                    lineStyle: {
                        // 阴影部分
                        // shadowOffsetX: -1, // 折线的X偏移
                        // shadowOffsetY: 4, // 折线的Y偏移
                        // shadowBlur: 3, // 折线模糊
                        // shadowColor: "rgba(3,3,3, 0.6)" //折线颜色
                    }
                }
            ]
        };
        chart.setOption(option);
        // this.$nextTick(() => {
        //     let len = 0;
        //     clearInterval(this.timer1);
        //     this.timer1 = setInterval(() => {
        //         if (len === xAxisData.length) {
        //             len = 0;
        //         }
        //         chart.dispatchAction({ type: "showTip", seriesIndex: 0, dataIndex: len }); //设置默认选中高亮部分
        //         len++;
        //     }, 3000);
        // });
    }

    setLeftBottomChart(value: any, value1: any) {
        let chart = echarts.init(this.$refs.leftBottomChart);
        let option: any = {
            series: [
                {
                    type: "gauge",
                    startAngle: 90,
                    endAngle: -270,
                    radius: "55%", //仪表盘半径
                    center: ["25%", "50%"], //仪表盘位置
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
                        show: false,
                    },
                    data: [
                        {
                            value: value,
                            name: "农技专家"
                        }
                    ],
                    title: {
                        fontSize: 16,
                        fontFamily: "Source Han Sans SC",
                        fontWeight: "bold",
                        color: "#FFFFFF",
                        offsetCenter: [0, 100]
                    },
                    detail: {
                        show: true,
                        formatter: '{value}%',
                        offsetCenter: [0, 0],
                        fontSize: 30,
                        color:'#26BF40',
                        fontFamily: "YouSheBiaoTiHei",
                        valueAnimation: true,
                    },
                    labelLine: {
                        show: false,
                    },
                },
                {
                    type: "gauge",
                    startAngle: 90,
                    endAngle: -270,
                    radius: "55%", //仪表盘半径
                    center: ["75%", "50%"], //仪表盘位置
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
                            name: "新型职业农民"
                        }
                    ],
                    title: {
                        fontSize: 16,
                        fontFamily: "Source Han Sans SC",
                        fontWeight: "bold",
                        color: "#FFFFFF",
                        offsetCenter: [0, 100]
                    },
                    detail: {
                        show: true,
                        formatter: '{value}%',
                        offsetCenter: [0, 0],
                        fontSize: 30,
                        color:'#26BF40',
                        fontFamily: "YouSheBiaoTiHei",
                        valueAnimation: true,
                    },
                }
            ]
        };
        chart.setOption(option);
    }

    getMap(data:any) {
      let myChart = echarts.init(this.$refs.map);
      myChart.hideLoading();
      echarts.registerMap("map", map);
      const option:any = {
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
                    res = `<div style='width:220px;height:230px;background-color:rgba(255, 255, 255, 0.7);margin:-10px;border-radius:5px;box-shadow: 0px 0px 50px 0px rgba(0, 0, 0, 0.6);'>
                        <div style='display:flex;justify-content:space-between;width:100%;height:30px;background-color:#21A637;border-radius:5px 5px 0 0;padding:5px 10px;font-size:14px;'>
                            <span>${value.data.name}</span>
                        </div>
                        <ul  style="color:#525866;margin:10px 20px;font-size:12px;">
                            <li style="display:flex;margin-bottom:10px;">
                                <span  style="flex:1;text-align:right;">
                                    农业公共服务中心：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.publicServiceCenter}个
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:10px;">
                                <span style="display:inline-block;width:110px;text-align:right;">
                                    现代农业科技示范基：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.technologyDemonstration}个
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:10px;">
                                <span style="display:inline-block;width:110px;text-align:right;">
                                    科研院所：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.researchInstitutes}个
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:10px;">
                                <span style="display:inline-block;width:110px;text-align:right;">
                                    培训基地：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.trainingBase}个
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:10px;">
                                <span style="display:inline-block;width:110px;text-align:right;">
                                    农技专家：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.specialisNum}人
                                </span>
                            </li>
                            <li style="display:flex;margin-bottom:10px;">
                                <span style="display:inline-block;width:110px;text-align:right;">
                                    新型职业农民：
                                </span>
                                <span style="flex:1;text-align:left;">
                                    ${value.data.newPracticingFarmer}人
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
            label: {
              show: false,
              emphasis: {
                show: false,  //开启悬浮事件
              }
            },
            data,
            itemStyle: {
              normal: {
                borderColor: 'rgba(38, 191, 64, 1)',//区域边框颜色
                areaColor: "rgba(38, 191, 64, .1)",//区域颜色
              },
              emphasis: {
                borderColor: 'rgba(38, 191, 64, 1)',
                areaColor: "rgba(38, 191, 64, 1)"
              },
            },
            select: {
                itemStyle:{
                    borderColor: 'rgba(38, 191, 64, 1)',
                    areaColor: "rgba(38, 191, 64, 1)"
                },
                label:{
                    show:false
                }
            },
          },
        ],
      };
      myChart.setOption(option);
        let len = 0
        let flag = true
        clearInterval(this.timer1)
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
                let xAxisData:any = []
                let publicServiceCenter:any = []
                let technologyDemonstration:any = []
                let researchInstitutes:any = []
                let trainingBase:any = []
                res.data.forEach((item:any) => {
                    xAxisData.push(item.township)
                    publicServiceCenter.push(item.publicServiceCenter)
                    technologyDemonstration.push(item.technologyDemonstration)
                    researchInstitutes.push(item.researchInstitutes)
                    trainingBase.push(item.trainingBase)
                });
                this.getLeftTopChart(xAxisData,publicServiceCenter,technologyDemonstration,researchInstitutes,trainingBase)
            } else if(res.key===this.apiList.leftMid.url) {
                let xAxisData:any = []
                let specialisNum:any = []
                let newPracticingFarmer:any = []
                res.data.forEach((item:any) => {
                    xAxisData.push(item.township)
                    specialisNum.push(item.specialisNum)
                    newPracticingFarmer.push(item.newPracticingFarmer)
                });
                this.setLeftMidChart(xAxisData,specialisNum,newPracticingFarmer)
            } else if(res.key===this.apiList.leftBottom.url) {
                this.setLeftBottomChart(res.data[0].specialisNum/res.data[0].allPerson,res.data[0].newPracticingFarmer/res.data[0].allPerson)
            } else if(res.key===this.apiList.map.url) {
                res.data.forEach((item:any) => {
                    item.name = item.township
                });
                this.getMap(res.data)
            } else if(res.key===this.apiList.right.url) {
                this.rightData = res.data[0]
                for (const key in this.rightData) {
                    if ((this.$refs as any)[key]) {
                        animateValue((this.$refs as any)[key], this.rightData[key], 600, true)
                    }
                }
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
        this.$router.push('/vegetable')
    }

    @Watch('$route')
    routeWatch(value:any) {
        for (const key in this.apiList) {
            socketClient.delCallBack(this.apiList[key].url);
            socketClient.delSend(this.apiList[key].url);
        }
        if (value.path==='/vegetable/publicService') {
            this.query()
        } else {
            clearInterval(this.timeout)
            clearInterval(this.timer1)
        }
    }

    mounted() {
        //接口调用
        if (this.$route.path==='/vegetable/publicService') {
            this.query()
        }
    }
}
</script>

<style scoped lang="scss">
.publicService {
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
        width: 1860px;
        margin: auto;
        overflow: hidden;
        .left {
            width: 440px;
            .leftTop {
                width: 100%;
                height: 300px;
                margin-bottom: 20px;
                .leftTopChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(0, 0, 0, .2);
                }
            }
            .leftMid {
                width: 100%;
                height: 300px;
                margin-bottom: 20px;
                .leftMidChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(0, 0, 0, .2);
                }
            }
            .leftBottom {
                width: 100%;
                height: 300px;
                margin-bottom: 20px;
                .leftBottomChart {
                    width: 100%;
                    height: 260px;
                    background-color: rgba(0, 0, 0, .2);
                }
            }
        }
        .mid {
            width: 910px;
            height: 940px;
            margin: 0 30px;
            background-color: rgba(0, 0, 0, .2);
        }
        .right {
            width: 440px;
            height: 940px;
            background-color: rgba(0, 0, 0, .2);
            ul {
                margin-left: 20px;
                margin-top: 30px;
                li {
                    display: flex;
                    background: linear-gradient(0deg, #F6BD16 0%, #FFFFFF 100%);
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-family: YouSheBiaoTiHei;
                    cursor: default;
                    margin-bottom: 50px;
                    img {
                        width: 110px;
                        height: 104px;
                    }
                    .num {
                        height: 60px;
                        font-size: 60px;
                        line-height: 60px;
                    }
                    .name {
                        font-size: 30px;
                        line-height: 30px;
                    }
                }
                .green {
                    background: linear-gradient(0deg, #25BB3F 0%, #FFFFFF 100%);
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            }
        }
    }
}
</style>
