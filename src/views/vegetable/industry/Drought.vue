<template>
    <div class="vegetable">
        <bgAnim></bgAnim>
        <OneSizeContainer :width="1920" :height="1080" :maxRatio="2">
            <selfHead title="农业干旱监测分析" @back="back"></selfHead>
            <div class="content">
                <div class="top">
                    <selfTitle>近7日干旱情况</selfTitle>
                    <div class="topChart">
                        <div class="topChart-left" ref="topLeftChart"></div>
                        <div class="topChart-right">
                            <div class="topChart-right-title">【{{activeTownship}}】近7日干旱情况</div>
                            <div class="topChart-right-tip">（点击左侧地图，切换数据）</div>
                            <div class="topChart-right-content-box">
                                <div class="topChart-right-content-box-item" v-for="(item,index) in timeData" :key="index">
                                    <div class="topChart-right-content-box-item-row">
                                        <div class="topChart-right-content-box-item-title">监测时间：</div>
                                        <div class="topChart-right-content-box-item-value">{{item.tmpDate||'-'}}</div>
                                    </div>
                                    <div class="topChart-right-content-box-item-row">
                                        <div class="topChart-right-content-box-item-title">干旱程度：</div>
                                        <div class="topChart-right-content-box-item-value">{{item.droughtGrade||'-'}}</div>
                                    </div>
                                    <div class="topChart-right-content-box-item-row">
                                        <div class="topChart-right-content-box-item-title">重量含水量：</div>
                                        <div class="topChart-right-content-box-item-value">-</div>
                                    </div>
                                    <div class="topChart-right-content-box-item-row">
                                        <div class="topChart-right-content-box-item-title">容积含水量：</div>
                                        <div class="topChart-right-content-box-item-value">-</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bottom">
                    <selfTitle>农业干旱监测信息列表</selfTitle>
                    <div class="bottomChart">
                        <el-row class="bottomChart-header">
                            <el-col :span="3">发生月份</el-col>
                            <el-col :span="3">乡镇</el-col>
                            <el-col :span="3">干旱等级</el-col>
                            <el-col :span="2">作物类型</el-col>
                            <el-col :span="3">持续天数</el-col>
                            <el-col :span="2">影响面积</el-col>
                            <el-col :span="2">预计减产量</el-col>
                            <el-col :span="3">预计减产</el-col>
                            <el-col :span="3">预计减产率</el-col>
                        </el-row>
                        <vue-seamless-scroll :data="record" :class-option="classOption"
                                             class="seamless-warp influence">
                            <el-row class="bottomChart-cell" v-for="(item,index) in record" :key="index">
                                <el-col :span="3">{{ item.tmpDate }}</el-col>
                                <el-col :span="3">{{ item.township }}</el-col>
                                <el-col :span="3">{{ item.droughtGrade }}</el-col>
                                <el-col :span="2">{{ item.cropType }}</el-col>
                                <el-col :span="3">{{ item.durationDays }}天</el-col>
                                <el-col :span="2">{{ item.influenceArea.toLocaleString() }}亩</el-col>
                                <el-col :span="2">{{ item.productionReduction.toLocaleString() }}吨</el-col>
                                <el-col :span="3">{{ item.productionReductionValue.toLocaleString() }}万元</el-col>
                                <el-col :span="3">{{ item.productionReductionRate }}%</el-col>

                            </el-row>
                        </vue-seamless-scroll>
                    </div>
                </div>

            </div>
        </OneSizeContainer>
    </div>
</template>

<script lang="ts">
import {Component, Mixins, Vue} from "vue-property-decorator";
import selfHead from "@/components/Head/Head.vue"
import bgAnim from '@/components/bgAnim/BgAnim.vue'
import selfTitle from '../../vegetable/Title.vue'
import * as echarts from 'echarts';
import autoResizeMixin from "@/mixins/echarts/autoResizeMixin"
import * as socketClient from '@/views/socketClient';
import vueSeamlessScroll from "vue-seamless-scroll";
import m from "moment"
import _ from "lodash";
import {animateValue} from "@/util";
import map from "@/views/vegetable/map.json";
import date from "@/components/date-picker/src/panel/date.vue";

@Component({
    name: "Meteorological",
    components: {
        selfHead,
        bgAnim,
        selfTitle,
        vueSeamlessScroll
    },
    mixins: [autoResizeMixin]
})
export default class Meteorological extends Mixins(autoResizeMixin) {
    public $refs!: {
        topLeftChart: HTMLDivElement
    }

    record: any[] = []
    typeList: any[] = []
    timeData: any[] = []
    currentYear: any = m().format('YYYY')

    timeout: any = null;
    timer2: any = null;

    classOption: Object = {
        step: 0.2,
        limitMoveNum: 6
    };

    activeTownship:string = ''

    apiurl: any = {
        bom: '/droughtMonitor/admAgriculturalDroughtRecord',
    }

    back() {
        this.$router.push('/vegetable/allIndustry')
    }

    getMap(data?: any) {
        let myChart = echarts.init(this.$refs.topLeftChart);

        echarts.registerMap("map", map);
        let arr: any[] = []
        let list: any[] = _.cloneDeep(data)
        list.forEach((item: any) => {
            arr.push({name: item.township, ...item})
        });

        const option: any = {
            tooltip: {
                backgroundColor: 'rgba(3,3,3,0)',
                borderWidth: 0,
                textStyle: {
                    color: '#fff',
                    fontSize: '14',
                },
                formatter: (value: any) => {
                    let res = ``
                    let color = 'rgba(219, 169, 20, 1)'
                    if (value.data) {
                        res = `<div style='width:220px;height:160px;background-color:rgba(255, 255, 255, 0.6);margin:-10px;border-radius:5px;'>
                        <div style='display:flex;justify-content:space-between;width:100%;height:30px;background-color:${color};border-radius:5px 5px 0 0;padding:5px 10px;font-size:14px;'>
                            <span>${value.name}</span>

                        </div>
                        <ul style="color:#525866;margin:10px 0;font-size:12px;width: 100%">
                            <li style="margin-bottom:10px;width: 100%">
                                <span style="display:inline-block;width: 100%">
                                    <span style="width:50%;text-align: right;display: inline-block">监测时间：</span>
                                    <span style="width:50%;display: inline-block;">${value.data.tmpTime || '-'}</span>
                                </span>
                            </li>
                            <li style="margin-bottom:10px;width: 100%">
                                <span style="display:inline-block;width: 100%">
                                    <span style="width:50%;text-align: right;display: inline-block">干旱程度：</span>
                                    <span style="width:50%;display: inline-block;">${value.data.droughtGrade || '-'}</span>
                                </span>
                            </li>
                            <li style="margin-bottom:10px;width: 100%">
                                <span style="display:inline-block;width: 100%">
                                    <span style="width:50%;text-align: right;display: inline-block">重量含水量：</span>
                                    <span style="width:50%;display: inline-block;">${'-'}</span>
                                </span>
                            </li>
                            <li style="margin-bottom:10px;width: 100%">
                                <span style="display:inline-block;width: 100%">
                                    <span style="width:50%;text-align: right;display: inline-block">容积含水量：</span>
                                    <span style="width:50%;display: inline-block;">${'-'}</span>
                                </span>
                            </li>
                        </ul>
                    </div>`
                        // }
                        return res
                    }
                }
            },
            series: [
                {
                    type: "map",
                    selectedMode : 'single',  // 选中效果固话
                    mapType: "map", // 自定义扩展图表类型
                    zoom: 1.2,
                    label: {
                        normal: {
                            show: false
                        },
                        emphasis: {
                            show: false
                        }
                    },

                    data: arr,
                    itemStyle: {
                        normal: {
                            borderColor: 'rgba(246, 189, 22, 1)',//区域边框颜色
                            areaColor: "rgba(246, 189, 22, 0.1)",//区域颜色
                        },
                        emphasis: {
                            borderColor: 'rgba(246, 189, 22, 1)',
                            areaColor: "rgba(246, 189, 22, 1)"
                        },
                    },
                },
            ],
        };
        myChart.setOption(option);
        clearInterval(this.timer2)
        this.timer2 = null
        let len = 0
        if(!this.timer2){
            this.timer2 = setInterval(() => {
                arr.forEach((item:any,index:number) => {
                    myChart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        dataIndex: index,
                    })
                })

                if (len === list.length) {
                    len = 0
                }
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: len,
                })
                myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: len,
                })
                // console.log(list[len])
                this.activeTownship = list[len].township
                this.getSeven(list[len].township)

                len++
            }, 1700)
        }
        myChart.on('click', (params: any) => {
            // console.log(params)
            this.activeTownship = params.name
            this.getSeven(params.name)
        });
        myChart.on('mouseover', (params: any) => {
            myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: 0,
                dataIndex: len-1,
            })
            // console.log(params)
            clearInterval(this.timer2)
            this.timer2 = null
        });
        myChart.on('mouseout', (params: any) => {
            if(!this.timer2){
                this.timer2 = setInterval(() => {
                    arr.forEach((item:any,index:number) => {
                        myChart.dispatchAction({
                            type: 'downplay',
                            seriesIndex: 0,
                            dataIndex: index,
                        })
                    })
                    arr.forEach((item:any,index:number) => {
                        myChart.dispatchAction({
                            type: 'unselect',
                            seriesIndex: 0,
                            dataIndex: index,
                        })
                    })
                    if (len === list.length) {
                        len = 0
                    }
                    myChart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: len,
                    })
                    myChart.dispatchAction({
                        type: 'showTip',
                        seriesIndex: 0,
                        dataIndex: len,
                    })
                    this.activeTownship = list[len].township
                    this.getSeven(list[len].township)
                    len++
                }, 1700)
            }
        });

    }

    getSeven(name: string) {
        let params = {type: name}
        // console.log(params)
        socketClient.addCallBack('/droughtMonitor/admAgriculturalDroughtByTownShip', this.getSevenData);
        socketClient.addSend('/droughtMonitor/admAgriculturalDroughtByTownShip', this.getParams({type:''}));

        socketClient.send('/droughtMonitor/admAgriculturalDroughtByTownShip', params);
        // socketClient.sendAll()

    }
    getSevenData(res:any){
        // console.log(res)
        setTimeout(() => {
            let list:any[] = _.cloneDeep(res.data)
            list.forEach((item: any) => {
                item.tmpDate = m(item.tmpDate).format("YYYY-MM-DD")
            })
            this.timeData = list
            socketClient.delCallBack('/droughtMonitor/admAgriculturalDroughtByTownShip');
            socketClient.delSend('/droughtMonitor/admAgriculturalDroughtByTownShip');
        })

    }


    getData(res: any) {
        // console.log(res)
        setTimeout(() => {
            if (res.key == this.apiurl.bom) {
                // console.log(res.data)
                let data: any[] = _.cloneDeep(res.data)
                data.forEach((item: any) => {
                    item.tmpTime = m(item.tmpDate).format("YYYY-MM-DD")
                    item.tmpDate = m(item.tmpDate).format("YYYY-MM")

                })
                this.record = data
                let nameList: any[] = []
                data.forEach((item: any) => {
                    nameList.push(item.township)
                })
                nameList = Array.from(new Set(nameList));
                let obj: any = {}
                nameList.forEach((item: any) => {
                    obj[item] = []
                })
                data.forEach((item: any) => {
                    for (const key in obj) {
                        if (item.township == key) {
                            obj[key].push(item)
                        }
                    }
                })
                let mapData: any[] = []
                // console.log(obj)
                for (const key in obj) {
                    if (obj[key].length > 0) {
                        mapData.push(obj[key][0])
                    }
                }
                if (mapData.length > 0 && !this.activeTownship) {
                    // console.log(mapData[0])
                    // mapData[0].selected = true
                    this.getMap(mapData)
                    if(!this.activeTownship){
                        this.activeTownship = mapData[0].township
                        this.getSeven(mapData[0].township)
                    }

                }

            }
        }, 500)


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
            // if (key === 'rightTop') {
            //     params = { year: this.currentYear}
            // } else {
            params = {year: this.currentYear - 1}
            // }


            socketClient.addCallBack(this.apiurl[key], this.getData);
            socketClient.addSend(this.apiurl[key], this.getParams(params));
        }
        setTimeout(() => {
            socketClient.sendAll()

        }, 500);

    }

    mounted() {
        this.queryData()
        // this.getSeven = _.debounce(this.getSeven,500)
        // this.getSevenData = _.debounce(this.getSevenData,1000)
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
    background-image: url('../../../assets/images/vegetable/bg.jpg');
    background-size: cover;
    padding-bottom: 110px;
    /deep/ .titleContent {
        .title {
            span {
                font-weight: bold;
                color: #F6BD16;
                text-shadow: 0px 0px 20px #F6BD16;
                .tip {
                    font-size: 12px;
                    color: rgba(255, 255, 255, 0.5);
                }
            }
        }
    }
    .content {
        position: relative;
        z-index: 999;
        display: flex;
        flex-direction: column;

        overflow: hidden;
        width: 100%;
        padding: 0 30px;
        //padding-top: 120px;



        .top {
            width: 100%;
            height: 620px;
            margin-bottom: 20px;

            .topChart {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .topChart-left {
                    width: 927px;
                    height: 580px;
                    background-color: rgba(255, 255, 255, .2);
                    margin-right: 6px;
                }

                .topChart-right {
                    width: 927px;
                    height: 580px;
                    background-color: rgba(255, 255, 255, .2);
                    padding: 20px 0;
                    padding-left: 20px;
                    .topChart-right-title{
                        font-size: 20px;
                        font-weight: bold;
                        color: #E6BB45;
                        text-shadow: 0px 0px 20px #F6BD16;
                        text-align: center;
                    }
                    .topChart-right-tip{
                        font-size: 12px;
                        color: rgba(255, 255, 255, 0.5);
                        text-align: center;
                    }
                    .topChart-right-content-box{
                        display: flex;
                        align-content: center;
                        flex-wrap: wrap;
                        .topChart-right-content-box-item{
                            width: 282px;
                            height: 148px;
                            background: rgba(0, 0, 0, 0.3);
                            margin-top: 20px;
                            margin-right: 20px;
                            padding: 25px 0;
                            font-size: 14px;
                            font-weight: bold;
                            color: #E6BB45;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            flex-direction: column;
                            .topChart-right-content-box-item-row{
                                width: 100%;
                                display: flex;
                                align-items: center;
                                .topChart-right-content-box-item-title{
                                    width: 50%;
                                    text-align: right;
                                }
                                .topChart-right-content-box-item-value{
                                    width: 50%;
                                    padding-left: 15px;
                                }
                            }
                        }
                    }
                }
            }
        }

        .bottom {
            width: 100%;
            height: 300px;

            .bottomChart {
                width: 100%;
                height: 260px;
                background-color: rgba(255, 255, 255, .2);
                padding-bottom: 20px;

                .bottomChart-header {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    //padding-left: 20px;
                    height: 40px;
                    background: rgba(252, 205, 76, 0.3);
                    font-size: 14px;
                    font-weight: bold;
                    color: rgba(252, 205, 76, 1);
                    padding-left: 60px;
                }

                .bottomChart-cell {
                    padding-left: 60px;
                    font-size: 14px;
                    color: #FFFFFF;
                    line-height: 34px;

                    &.warn {
                        color: #FF4C4C;
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
