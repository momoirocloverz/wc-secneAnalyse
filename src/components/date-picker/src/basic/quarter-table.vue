<template>
    <table @click="handleMonthTableClick" @mousemove="handleMouseMove" class="el-month-table week-table">
        <tbody>
        <tr v-for="(row, key) in rows" :key="key">
            <td :class="getCellStyle(cell)" v-for="(cell, key) in row" :key="key">
                <div>
                    <a class="cell">{{ cell.text }}</a>
                </div>
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script type="text/babel">
import Locale from 'element-ui/src/mixins/locale';
import {isDate} from 'element-ui/src/utils/date-util';
import {hasClass} from 'element-ui/src/utils/dom';
import {arrayFindIndex, coerceTruthyValueToArray, arrayFind} from 'element-ui/src/utils/util';
import m from 'moment'

const clearDate = (date) => {
    return m(date).startOf('Q').toDate();
};

const getWeekTimestamp = function (time) {
    if (typeof time === 'number' || typeof time === 'string') {
        return clearDate(new Date(time)).getTime();
    } else if (time instanceof Date) {
        return clearDate(time).getTime();
    } else {
        return NaN;
    }
};
export default {
    props: {
        disabledDate: {},
        value: {},
        selectionMode: {},
        minDate: {},

        maxDate: {},
        defaultValue: {
            validator(val) {
                // null or valid Date Object
                return val === null || isDate(val) || (Array.isArray(val) && val.every(isDate));
            }
        },
        date: {},
        rangeState: {
            default() {
                return {
                    endDate: null,
                    selecting: false
                };
            }
        }
    },

    mixins: [Locale],

    watch: {
        'rangeState.endDate'(newVal) {
            this.markRange(this.minDate, newVal);
        },

        minDate(newVal, oldVal) {
            if (getWeekTimestamp(newVal) !== getWeekTimestamp(oldVal)) {
                this.markRange(this.minDate, this.maxDate);
            }
        },

        maxDate(newVal, oldVal) {
            if (getWeekTimestamp(newVal) !== getWeekTimestamp(oldVal)) {
                this.markRange(this.minDate, this.maxDate);
            }
        }
    },

    data() {
        return {
            tableRows: [[]],
            lastRow: null,
            lastColumn: null
        };
    },

    methods: {
        cellMatchesDate(cell, date) {
            const value = new Date(date);
            return this.date.getFullYear() === value.getFullYear() && Number(cell.text) === value.getMonth();
        },
        getCellStyle(cell) {
            const style = {};
            const year = this.date.getFullYear();
            const quarter = cell.text + '';
            const defaultValue = this.defaultValue ? Array.isArray(this.defaultValue) ? this.defaultValue : [this.defaultValue] : [];
            style.disabled = typeof this.disabledDate === 'function'
                ? cell.disabled : false;
            style.current = arrayFindIndex(coerceTruthyValueToArray(this.value), date => date.getFullYear() === year && m(date).format('Q') === quarter) >= 0;
            style.today = cell.type === 'today';
            style.default = defaultValue.some(date => this.cellMatchesDate(cell, date));

            if (cell.inRange) {
                style['in-range'] = true;

                if (cell.start) {
                    style['start-date'] = true;
                }

                if (cell.end) {
                    style['end-date'] = true;
                }
            }
            return style;
        },
        getWeekOfCell(w) {
            const year = this.date.getFullYear();
            return m(year + '-' + (w + 1), 'YYYY-Q').toDate();
        },
        markRange(minDate, maxDate) {
            if (!minDate || !maxDate) {
                return
            }
            minDate = minDate.getTime();
            maxDate = maxDate.getTime() || minDate.getTime();
            [minDate, maxDate] = [Math.min(minDate, maxDate), Math.max(minDate, maxDate)];
            const rows = this.rows;
            const numOfWeeks = m(this.date).weeksInYear();
            for (let i = 0, k = rows.length; i < k; i++) {
                const row = rows[i];
                for (let j = 0, l = row.length; j < l; j++) {
                    const cell = row[j];
                    const index = i * 4 + j;
                    if (index >= numOfWeeks) {
                        continue
                    }
                    const time = m(this.date.getFullYear() + '-' + (index + 1), 'YYYY-Q').toDate().getTime();
                    cell.inRange = minDate && time >= minDate && time <= maxDate;
                    cell.start = minDate && time === minDate;
                    cell.end = maxDate && time === maxDate;
                }
            }
        },
        handleMouseMove(event) {
            if (!this.rangeState.selecting) return;

            let target = event.target;
            if (target.tagName === 'A') {
                target = target.parentNode.parentNode;
            }
            if (target.tagName === 'DIV') {
                target = target.parentNode;
            }
            if (target.tagName !== 'TD') return;

            const row = target.parentNode.rowIndex;
            const column = target.cellIndex;
            // can not select disabled date
            if (this.rows[row][column].disabled) return;

            // only update rangeState when mouse moves to a new cell
            // this avoids frequent Date object creation and improves performance
            if (row !== this.lastRow || column !== this.lastColumn) {
                this.lastRow = row;
                this.lastColumn = column;
                this.$emit('changerange', {
                    minDate: this.minDate,
                    maxDate: this.maxDate,
                    rangeState: {
                        selecting: true,
                        endDate: this.getWeekOfCell(row * 4 + column)
                    }
                });
            }
        },
        handleMonthTableClick(event) {
            let target = event.target;
            if (target.tagName === 'A') {
                target = target.parentNode.parentNode;
            }
            if (target.tagName === 'DIV') {
                target = target.parentNode;
            }
            if (target.tagName !== 'TD') return;
            if (hasClass(target, 'disabled')) return;
            const column = target.cellIndex;
            const row = target.parentNode.rowIndex;
            const month = row * 4 + column;
            const newDate = this.getWeekOfCell(month);
            if (this.selectionMode === 'range') {
                if (!this.rangeState.selecting) {
                    this.$emit('pick', {minDate: newDate, maxDate: null});
                    this.rangeState.selecting = true;
                } else {
                    if (newDate >= this.minDate) {
                        this.$emit('pick', {minDate: this.minDate, maxDate: newDate});
                    } else {
                        this.$emit('pick', {minDate: newDate, maxDate: this.minDate});
                    }
                    this.rangeState.selecting = false;
                }
            } else {
                this.$emit('pick', month);
            }
        }
    },

    computed: {
        rows() {
            // TODO: refactory rows / getCellClasses
            //重置数据修复元素变多变少时显示问题
            this.tableRows = [[]];
            const rows = this.tableRows;
            const disabledDate = this.disabledDate;
            const selectedDate = [];
            const now = getWeekTimestamp(new Date());
            const numOfWeeks = m(this.date).weeksInYear();
            const year = m(this.date).format('YYYY')

            for (let i = 0; i < 1; i++) {
                const row = rows[i];
                for (let j = 0; j < 4; j++) {
                    const index = i * 4 + j;
                    if (index >= numOfWeeks) {
                        continue
                    }
                    let cell = row[j];
                    if (!cell) {
                        cell = {row: i, column: j, type: 'normal', inRange: false, start: false, end: false};
                    }
                    cell.text = index + 1;
                    cell.type = 'normal';
                    let time = m(year + '-' + cell.text, 'YYYY-Q').toDate().getTime();
                    cell.inRange = this.minDate && this.maxDate && time >= this.minDate.getTime() && time <= this.maxDate.getTime();
                    cell.start = this.minDate && time === getWeekTimestamp(this.minDate);
                    cell.end = this.maxDate && time === getWeekTimestamp(this.maxDate);
                    const isToday = time === now;
                    if (isToday) {
                        cell.type = 'today';
                    }

                    let cellDate = new Date(time);
                    cell.disabled = typeof disabledDate === 'function' && disabledDate(cellDate);
                    cell.selected = arrayFind(selectedDate, date => date.getTime() === cellDate.getTime());

                    this.$set(row, j, cell);
                }
            }
            return rows;
        }
    }
};
</script>
<style lang="scss">
.el-month-table.week-table {
    /deep/ td {
        padding: 4px 0;

        .cell {
            width: 25px;
            height: 25px;
            line-height: 25px;
        }

        > div {
            padding: 3px 0;
            height: unset;
        }

        &.start-date {
            div {
                border-top-left-radius: 12px;
                border-bottom-left-radius: 12px
            }
        }
    }
}
</style>
