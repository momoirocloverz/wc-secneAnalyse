import {Component, Vue} from 'vue-property-decorator';
import BaseChartInterface from "@/mixins/echarts/baseChartInterface ";
import echarts from "echarts";
import _ from "lodash";

@Component
export default class AutoResizeMixin extends Vue implements BaseChartInterface {
    mixinChartConfig: {
        [propName: string]: echarts.ECharts
    } = {}

    mixinChartResize() {
        if (!this.mixinChartConfig) {
            return
        }
        let keys = Object.keys(this.mixinChartConfig)
        for (let key of keys) {
            let chart = this.mixinChartConfig[key];
            if (chart && _.isFunction(chart.resize)) {
                //元素不显示时不执行重置大小,防止元素隐藏时调整窗口导致图表缩在一起
                //@ts-ignore
                if (chart._dom && chart._dom && chart._dom.offsetParent !== null) {
                    chart.resize();
                }

            } else {
                console.warn('图表实例异常', key, chart)
            }
        }
    }

    created() {
        this.mixinChartResize = _.throttle(this.mixinChartResize, 200)
    }

    mounted() {
        setTimeout(() => {
            this.mixinChartResize();
        }, 500)
        window.addEventListener("resize", this.mixinChartResize)
    }

    beforeDestroy() {
        window.removeEventListener('resize', this.mixinChartResize);
    }
}