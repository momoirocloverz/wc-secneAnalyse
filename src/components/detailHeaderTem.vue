<template>
    <div class="detailHeader">
        <div class="title">
            <div class="left">
                <span>{{ title }}</span>
            </div>
            <div class="right" @click="$router.back()">
                <customIcon iconClass="uniE012"></customIcon>
                返回
            </div>
        </div>

    </div>
</template>
<script lang="ts">
import {Vue, Component, Prop} from "vue-property-decorator";

@Component({
    components: {}
})
export default class detailHeaderTem extends Vue {

    @Prop({
        type: String,
        default: ""
    })
    title!: string

}
</script>

<style scoped lang="scss">
.detailHeader {

    .title {
        padding: 12px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #DBDBDB;
        background: #FFFFFF;

        .left {
            span {
                font-size: 18px;
                color: #333333;
                font-weight: bold;
            }

            .tips {
                font-size: 14px;
                color: #999999;
                margin-left: 20px;
            }
        }

        .right {
            color: #999999;
            font-size: 14px;
            cursor: pointer;
        }
    }
}
</style>
