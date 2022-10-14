<template>
    <div class="select-date">
        <capsule-select
            class="search-item"
            :disable-code-list="disableCodeList"
            :selected.sync="queryDate.capsule"></capsule-select>
        <div class="search-item link-capsule">
            <template v-if="dateType==='W'">
                <el-date-picker
                    v-if="isRadio"
                    key="W1"
                    class="search-date"
                    v-model="queryDate.week"
                    type="week"
                    format="yyyy-W"
                    placeholder="请选择"
                    :picker-options="pickerOptionsW"
                    :unlink-panels="true"
                    style="width: 180px"
                    align="right"
                    :clearable="false">
                </el-date-picker>
                <self-picker
                    v-else
                    key="W"
                    class="search-date"
                    v-model="queryDate.week"
                    type="weekrange"
                    range-separator="至"
                    format="YYYY-W"
                    placeholder="请选择"
                    :picker-options="pickerOptionsW"
                    :unlink-panels="true"
                    style="width: 180px"
                    align="right"
                    :clearable="false">
                </self-picker>
            </template>
            <template v-else-if="dateType==='M'">
                <el-date-picker
                    key="M"
                    range-separator="至"
                    placeholder="请选择"
                    class="search-date"
                    v-model="queryDate.month"
                    style="width: 180px"
                    :type="isRadio?'month':'monthrange'"
                    format="yyyy-MM"
                    :unlink-panels="true"
                    prefix-icon="el-icon-date"
                    :picker-options="pickerOptionsMByIsRadio"
                    align="right"
                    :clearable="false">
                </el-date-picker>
            </template>
            <template v-else-if="dateType==='Q'">
                <self-picker
                    key="W"
                    class="search-date"
                    v-model="queryDate.quarter"
                    :type="isRadio?'quarter':'quarterrange'"
                    range-separator="至"
                    format="YYYY-Q"
                    placeholder="请选择"
                    :picker-options="pickerOptionsQ"
                    :unlink-panels="true"
                    style="width: 180px"
                    align="right"
                    :clearable="false">
                </self-picker>
            </template>
            <template v-else-if="dateType==='Y'">
                <self-picker
                    key="Y"
                    range-separator="至"
                    class="search-date"
                    :unlink-panels="true"
                    placeholder="请选择"
                    v-model="queryDate.year"
                    :picker-options="pickerOptionsY"
                    :type="isRadio?'year':'yearrange'"
                    style="width: 180px"
                    format="yyyy"
                    prefix-icon="el-icon-date"
                    align="right"
                    :clearable="false">
                </self-picker>
            </template>
            <template v-else>
                <el-date-picker
                    key="D"
                    placeholder="请选择"
                    class="search-date"
                    v-model="queryDate.day"
                    style="width: 180px"
                    type="date"
                    format="yyyy-MM-dd"
                    prefix-icon="el-icon-date"
                    :picker-options="pickerOptionsD"
                    align="right"
                    :clearable="false">
                </el-date-picker>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
import CapsuleSelect from './CapsuleSelect.vue'
import m from 'moment'
import selfPicker from '@/components/date-picker/src/picker/date-picker.js'
import _ from 'lodash'

type dateType = 'W' | 'M' | 'Q' | 'Y' | 'D';

//输入输出类型
type valueType = {
    capsule: dateType
    startDate: string
    endDate: string
}

export {
    dateType,
    valueType
}

@Component({
    components: {CapsuleSelect, selfPicker}
})
export default class SelectDate extends Vue {

    @Prop({
        type: Boolean,
        default: false
    })
    isRadio!: boolean

    @Prop({
        type: Array,
        default() {
            return []
        }
    })
    disableCodeList!: string[]

    @Prop({
        type: Object,
        default() {
            //默认近6个月
            return SelectDate.getInitData()
        }
    })
    value!: {}

    //获取对应类型默认数据,
    public static getInitData(type: dateType = 'M', isRadio = false): valueType | undefined {
        //isRadio单选时返回固定的日期
        switch (type) {
            case "W":
                return {
                    capsule: 'W',
                    startDate: m().add(-6, "w").startOf('w').format('YYYY-MM-DD HH:mm:ss'),
                    endDate: m().add(-1, "w").startOf('w').format('YYYY-MM-DD HH:mm:ss')
                }
            case "M":
                return {
                    capsule: 'M',
                    startDate: m().add(-6, "M").startOf('M').format('YYYY-MM-DD HH:mm:ss'),
                    endDate: m().add(-1, "M").endOf('M').format('YYYY-MM-DD 23:59:59')
                }
            case "Q":
                return {
                    capsule: 'Q',
                    startDate: m().add(-4, "Q").startOf('Q').format('YYYY-MM-DD HH:mm:ss'),
                    endDate: m().add(-1, "Q").endOf('Q').format('YYYY-MM-DD HH:mm:ss')
                }
            case "Y":
                return {
                    capsule: 'Y',
                    startDate: m().add(-1, "y").startOf('y').format('YYYY-MM-DD HH:mm:ss'),
                    endDate: m().add(-1, "y").endOf('y').format('YYYY-MM-DD 23:59:59')
                }
            case "D":
                return {
                    capsule: 'D',
                    startDate: m().add(-1, "day").startOf('day').format('YYYY-MM-DD HH:mm:ss'),
                    endDate: m().add(-1, "day").endOf('day').format('YYYY-MM-DD 23:59:59')
                }
        }
    }

    pickerOptionsD = {
        disabledDate(time: any) {
            return m(time).isAfter(m().add(-1, 'day'));
        }
    }

    pickerOptionsY = {
        disabledDate(time: any) {
            return m(time).isAfter(m().add(-1, 'y'));
        }
    }

    pickerOptionsW = {
        disabledDate(time: any) {
            return m(time).isAfter(m().add(-1, 'w'));
        }
    }

    pickerOptionsQ = {
        disabledDate(time: any) {
            //console.log(m(time).format('YYYY-MM-DD'),m().add(-1, 'W').format('YYYY-MM-DD'))
            return m(time).isAfter(m().add(-1, 'Q'));
        }
    }


    get pickerOptionsMByIsRadio() {
        let res = _.cloneDeep(this.pickerOptionsM)
        if (this.isRadio) {
            delete res.shortcuts;
        }
        return res
    }

    pickerOptionsM = {
        disabledDate(time: any) {
            return m(time).isAfter(m().add(-1, 'M'));
        },
        shortcuts: [
            {
                text: '最近一个月',
                onClick(picker: any) {
                    picker.$emit('pick', [
                        m().add(-1, "M").startOf('M').format('YYYY-MM-DD HH:mm:ss'),
                        m().add(-1, "M").endOf('M').format('YYYY-MM-DD 23:59:59')
                    ]);
                }
            },
            {
                text: '最近三个月',
                onClick(picker: any) {
                    picker.$emit('pick', [
                        m().add(-3, "M").startOf('M').format('YYYY-MM-DD HH:mm:ss'),
                        m().add(-1, "M").endOf('M').format('YYYY-MM-DD 23:59:59')
                    ]);
                }
            },
            {
                text: '最近半年',
                onClick(picker: any) {
                    picker.$emit('pick', [
                        m().add(-6, "M").startOf('M').format('YYYY-MM-DD HH:mm:ss'),
                        m().add(-1, "M").endOf('M').format('YYYY-MM-DD 23:59:59')
                    ]);
                }
            },
            {
                text: '最近一年',
                onClick(picker: any) {
                    picker.$emit('pick', [
                        m().add(-12, "M").startOf('M').format('YYYY-MM-DD HH:mm:ss'),
                        m().add(-1, "M").endOf('M').format('YYYY-MM-DD 23:59:59')
                    ]);
                }
            }
        ]
    }


    @Watch('value', {
        deep: true,
        immediate: true
    })
    watchValue(data: valueType) {
        this.queryDate.capsule = data.capsule;
        //星期时差一天导致无限循环,默认取开始时间+1天
        this.date = [data.startDate, data.endDate];
    }

    //所有元素禁止时设置为选择天
    @Watch('disableCodeList', {
        deep: true,
        immediate: true
    })
    watchDisableCodeList(data: string[] = []) {
        if (data.length >= 4 || this.queryDate.capsule === 'D') {
            let cp = _.cloneDeep(this.queryRange)
            //todo 判断是否全部禁用
            if (data.length >= 4) {
                cp.capsule = 'D'
            } else if (this.queryDate.capsule === 'D') {
                //todo 从单天切换回范围选择时恢复成月
                cp.capsule = "M"
            }
            let initData: any = SelectDate.getInitData(cp.capsule)
            cp.startDate = initData.startDate
            cp.endDate = initData.endDate
            //todo 暂时手动发送更新事件
            this.$emit('input', cp)
        }

    }

    queryDate: {
        capsule: dateType,
        week: string
        month: string
        quarter: string
        year: string,
        day: string
    } = {
        capsule: 'M',
        week: '',
        month: '',
        quarter: '',
        year: '',
        day: ''
    }

    get date(): any {
        switch (this.dateType) {
            case "W":
                if (this.isRadio) {
                    return this.queryDate.week[1]
                } else {
                    return this.queryDate.week
                }
            case "M":
                if (this.isRadio) {
                    return this.queryDate.month[1]
                } else {
                    return this.queryDate.month
                }
            case "Q":
                if (this.isRadio) {
                    return this.queryDate.quarter[1]
                } else {
                    return this.queryDate.quarter
                }
            case "Y":
                if (this.isRadio) {
                    return this.queryDate.year[1]
                } else {
                    return this.queryDate.year
                }
            case "D":
                if (this.isRadio) {
                    return this.queryDate.day
                } else {
                    //todo 暂时天直接返回一天
                    return this.queryDate.day
                }
        }
        return ''
    }

    set date(data) {
        //todo 暂时天直接返回一天
        data = this.isRadio || this.dateType === 'D' ? data[1] : data;
        switch (this.dateType) {
            case "W":
                this.queryDate.week = data;
                break;
            case "M":
                this.queryDate.month = data
                break;
            case "Q":
                this.queryDate.quarter = data;
                break
            case "Y":
                this.queryDate.year = data;
                break;
            case "D":
                this.queryDate.day = data;
                break;
        }
    }


    getDateByType(type: dateType, date: string) {
        switch (this.dateType) {
            case "W":
                return m(date).add(-1, 'day').format('YYYY-MM-DD HH:mm:ss')
        }
        return m(date).format('YYYY-MM-DD HH:mm:ss');
    }

    getStartDate(type: any, date?: any): string {
        date = date || this.date;
        if (Array.isArray(date)) {
            date = date[0]
        }
        date = date ? m(date).startOf(type) : ''
        if (date) {
            date = this.getDateByType(type, date)
        }
        return date
    }

    getEndDate(type: any, date?: any): string {
        date = date || this.date;
        if (Array.isArray(date)) {
            date = date[1]
        }
        date = date ? m(date).endOf(type) : ''
        if (date) {
            date = this.getDateByType(type, date)
        }
        return date
    }

    /**
     * 当前的时间范围
     */
    get queryRange(): valueType {
        let res = {
            capsule: this.dateType,
            startDate: '',
            endDate: ''
        }
        res.startDate = this.getStartDate(this.queryDate.capsule)
        res.endDate = this.getEndDate(this.queryDate.capsule)
        return res;
    }

    //todo 会造成死循环,正式研发的时候再解决
    /*@Watch('queryRange', {
        //deep: true
    })
    watchQueryRange(data: valueType) {
        console.log(JSON.stringify(data))
        this.$emit('input', data)
    }*/

    @Watch('queryDate.capsule')
    watchQueryDateCapsule() {
        if (!this.queryRange.startDate || !this.queryRange.endDate) {
            let initData: any = SelectDate.getInitData(this.queryRange.capsule)
            this.date = [initData.startDate, initData.endDate]
        }
    }

    get dateType() {
        return this.queryDate.capsule
    }
}
</script>

<style scoped lang="scss">
.select-date {
    display:flex;

    .search-item, .search-date {
    }

    .link-capsule {
        margin-left:10px;
    }
}
</style>