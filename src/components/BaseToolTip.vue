<template>
    <div class="tooltip-wrap" :class="{'width-auto': isIcon}">
        <template v-if="(title != null && title != '-' && title != '') || isIcon">
            <el-tooltip max-width="200" class="item" :effect="effect"
                        :placement="placement">
                <div slot="content">
                    <template v-if="Array.isArray(content)">
                        <div v-for="(val, index) in content" :key="index">{{ val }}；
                            <template v-if="index !== (content.length - 1)"><br/></template>
                        </div>
                    </template>
                    <span v-else v-html="content || title"></span>
                </div>
                <span class="name" v-if="!isIcon" :style="{'color': color}">{{ title }}</span>
                <i v-else class="el-icon-warning-outline" style="cursor: pointer"></i>
            </el-tooltip>
        </template>
        <span v-else class="name" :style="{'color': color}">{{ title }}</span>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';

@Component({
    name: 'BaseToolTip'
})
export default class BaseToolTip extends Vue {
    @Prop({
        type: [String, Number],
        default: null
    })
    title!: string;

    @Prop({
        type: [String, Array],
        default: null
    })
    content!: string;

    @Prop({
        type: String,
        default: '#505050'
    })
    color!: string

    @Prop({
        type: Boolean,
        default: false
    })
    isIcon!: boolean

    @Prop({
        type: String,
        default: 'bottom-start'
    })
    placement!: string

    @Prop({
        type: String,
        default: 'dark'
    })
    effect!: string
}
</script>

<style scoped lang="scss">
.tooltip-wrap {
    width: 100%;

    &.width-auto {
        display: inline-block;
        width: auto;
        margin-left: .3rem;

        /deep/ .el-tooltip:hover {
            color: $primary;
        }
    }

    /deep/ .el-tooltip {
        width: 100%;
    }

    .name {
        display: inline-block;
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}
</style>