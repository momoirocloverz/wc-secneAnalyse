<template>
    <div class="switch">
        <el-switch ref="switch" class="switch-style" v-model="isCheck" :width="width" @change="change"
                   :active-color="activeColor" :inactive-color="inactiveColor">
        </el-switch>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: true
        },
        width: {
            type: Number,
            default: 60
        },
        activeText: {
            type: String,
            default: ''
        },
        inactiveText: {
            type: String,
            default: ''
        },
        inactiveColor: {
            type: String,
            default: '#C0C4CC'
        },
        activeColor: {
            type: String,
            default: '#2D57CC'
        }
    },
    data() {
        return {
            isCheck: true
        }
    },

    mounted() {
        this.$nextTick(() => {
            this.$refs.switch.$el.children[1].setAttribute('data-active', this.inactiveText);
            this.$refs.switch.$el.children[1].setAttribute('data-inactive', this.activeText)
        })
    },

    watch: {
        value: {
            handler: function (value) {
                this.$nextTick(() => {
                    this.isCheck = value;
                })
            },
            immediate: true
        }
    },

    methods: {
        change() {
            this.$emit('change', this.isCheck)
        }
    }
}
</script>

<style scoped lang="scss">
.switch {
    /deep/ .el-switch {
        &.switch-style {
            .el-switch__core {
                height: 24px;
                color: #fff;
                font-size: 13px;
                line-height: 21px;
                border-radius: 12px;
            }
        }
    }

    /deep/ .el-switch__core::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
    }

    .is-checked /deep/ .el-switch__core::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        margin-left: -22px

    }

    /deep/ .el-switch__core::before {
        content: attr(data-active);
        position: absolute;
        height: 24px;
        right: 5px;
    }

    .is-checked /deep/ .el-switch__core::before {
        content: attr(data-inactive);
        position: absolute;
        height: 24px;
        left: 5px;
    }
}
</style>
