<template>
    <el-dialog
        :visible.sync="modalShow"
        :show-close="showClose"
        v-bind="$attrs"
        :width="width+'px'"
        :top="top"
        v-if="modalShow"
        :custom-class="className"
        @close="$emit('on-close')"
        :close-on-click-modal="closeModal"
        :title="title">
        <div slot="title" v-if="$slots.title" class="title">
            <slot name="title"></slot>
        </div>
        <slot></slot>
        <div slot="footer" class="dialog-footer" v-if="!hideFoot">
            <el-button type="primary" class="btu save-btn"
                       v-if="hideSave!='true'&&hideSave!=1" @click="save">{{ saveText }}
            </el-button>
            <el-button v-show="hideClose!='true'&&hideClose!=1" class="btu close-btn" @click="close">{{ closeText }}
            </el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
/**
 * 基础弹窗组件
 */
import {Component, Vue, Prop} from 'vue-property-decorator';


@Component({
    name: 'Open'
})
export default class Open extends Vue {
    @Prop({
        type: String,
        default: '确定'
    })
    saveText!: string;
    @Prop({
        type: String,
        default: '取消'
    })
    closeText!: string;
    @Prop({
        type: Boolean,
        default: false
    })
    hideSave!: boolean;
    @Prop({
        type: Boolean,
        default: false
    })
    hideClose!: boolean;
    @Prop({
        type: Boolean,
        default: false
    })
    hideFoot!: boolean;
    @Prop({
        type: String,
        default: '信息'
    })
    title!: string;
    @Prop({
        type: [Number, String],
        default: 410
    })
    width!: number | string;
    @Prop({
        type: String
    })
    className!: string;
    @Prop({
        type: Boolean,
        default: true
    })
    showClose!: boolean;
    @Prop({
        type: Boolean,
        default: false
    })
    closeModal!: boolean;

    modalShow: boolean = false;
    top: any = '15vh'

    save() {
        this.$emit('on-save');
    }

    close() {
        this.$emit('on-close');
        this.modalShow = false;
        window.removeEventListener("resize", this.dialogPosition)
    }

    dialogPosition() {
        if (document.body.clientHeight <= 600) {
            this.top = '2vh'
        } else if (document.body.clientHeight > 600 && document.body.clientHeight <= 700) {
            this.top = '10vh'
        } else {
            this.top = '15vh'
        }
    }

    open() {
        //初始化父组件中的data值
        //需要将this.$parent.$options.data函数的this指向this.$parent再执行 保证函数中的this指向正常
        //修复表单校验自定义函数报错的问题
        //@ts-ignore
        Object.assign(this.$parent.$data, this.$parent.$options.data.bind(this.$parent)());

        //修复验证信息直接提示的问题
        this.modalShow = false;
        this.$nextTick(() => {
            //打开弹窗之前显示弹窗
            this.modalShow = true;
            this.$nextTick(() => {
                //@ts-ignore
                this.isOpen = true;
                this.dialogPosition()
                window.addEventListener("resize", this.dialogPosition)
            });
        });
    }
}

interface OpenInterface {
    open: (...params: any[]) => any
}

export {
    OpenInterface
}
</script>

<style scoped lang="scss">
/deep/ .el-dialog {
    .el-dialog__header {
        padding: 0 20px;
        height: 40px;
        line-height: 40px;
        //border-bottom: 1px solid rgba(220, 224, 229, 1);
        //background: $gray;
        background: rgba(250, 250, 250, 1);
        box-shadow: 0 1px 0 0 rgba(230, 230, 230, 1);
        border-radius: 5px 5px 0 0;

        .el-dialog__title {
            color: #505050;
            font-size: 14px;
            font-weight: bold;
        }

        .el-dialog__headerbtn {
            top: 12px;

            .el-dialog__close {
                color: $black;
            }
        }
    }

    .el-dialog__footer {
        text-align: center;
        padding: 10px 0;
        background: #EBEDF2;
        box-shadow: 0px -1px 0px 0px #DBDBDB;
        border-radius: 0px 0px 5px 5px;

        .el-button {
            width: 80px;
            height: 36px;
            line-height: 36px;
            padding-top: 0;
            padding-bottom: 0;
            border-radius: 5px;
        }

        .el-button--primary {
            font-size: 14px;
            border-color: transparent;
            background: $primary;
        }

        & .btu:nth-child(2) {
            margin-left: 30px;
        }

        .close-btn {

            background: $white;
            color: colorGrey();
            border-color: #D9D9D9;
        }
    }
}

.title {
    color: #464C5B;
    font-size: 14px;
    font-weight: bold;
}
</style>
