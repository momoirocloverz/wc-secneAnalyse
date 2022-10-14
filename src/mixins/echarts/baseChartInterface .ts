//echarts功能必须实现的接口
export default interface BaseChartInterface {
    //统一存放echarts实例的对象
    mixinChartConfig: {
        [propName: string]: echarts.ECharts
    }
}