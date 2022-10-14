<template>
    <div class="select-list">
        <div class="select-item"
             :class="{
                selected:selfSelected===item.key,
                disable:disableCodeList.includes(item.key)
             }"
             :key="item.key"
             @click="setSelected(item.key)"
             v-for="item in list">
            {{ item.name }}
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'

@Component
export default class LeftTitle extends Vue {
    @Prop({
        type: Array,
        default() {
            return [
                {name: '周', key: 'W'},
                {name: '月', key: 'M'},
                {name: '季', key: 'Q'},
                {name: '年', key: 'Y'}
            ]
        }
    })
    list!: { name: string, key: string }

    @Prop({
        type: Array,
        default() {
            return []
        }
    })
    disableCodeList!: string[]

    @Prop({
        type: String,
        default: 'W'
    })
    selected!: string

    @Watch('selected', {
        immediate: true
    })
    watchSelected(data: string) {
        this.selfSelected = data
    }

    selfSelected = 'W'

    setSelected(key: string) {
        //选中发生变化时触发事件变化
        if (this.selfSelected !== key) {
            this.$emit('on-change-selected', key);
        }
        this.selfSelected = key;

        this.$emit('update:selected', key);
    }

    mounted() {
        //初始选中不存在时初始化数据
        if (!this.selected) {
            this.$emit('update:selected', this.selfSelected);
        }
    }
}
</script>

<style scoped lang="scss">
.select-list {
    display: flex;
    align-items: center;

    .select-item {
        font-size: 13px;
        color: #3C424D;
        width: 36px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        background: #FFFFFF;
        cursor: pointer;
        border: 1px solid #CCCCCC;


        &:first-child {
            border-radius: 17px 0 0 17px;
        }

        &:last-child {
            border-radius: 0 17px 1.7px 0;
        }

        &.selected {
            border-color: $primary;
            background: $primary-background;
            color: $primary;
        }

        &.disable {
            pointer-events: none;
            background: rgba(245, 245, 245, 1);
            color: rgba(204, 204, 204, 1);
        }


    }
    .select-item:nth-child(n+2){
        border-left: none;
        &.selected {
            border: 1px solid $primary;
            border-color: $primary;
            background: $primary-background;
            color: $primary;
        }

    }
}
</style>