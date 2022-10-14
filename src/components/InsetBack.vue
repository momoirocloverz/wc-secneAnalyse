<template>
    <view-anim>
        <div v-show="!isShowInset" :key="1">
            <slot></slot>
        </div>
        <div v-if="isShowInset" :key="2">
            <router-view @backEvent="backPage" @saveEvent="savePage"></router-view>
        </div>
    </view-anim>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator'
    import ViewAnim from './ViewAnim.vue';

    /**
     * 嵌入返回组件
     */
    @Component({
        components: {
            ViewAnim
        }
    })
    export default class InsetBack extends Vue {
        //当前页面的路由地址
        @Prop({required: true})
        pageName: any

        @Prop({
            type: Function,
            default: () => {
            }
        })
        saveCall: any;

        @Prop({
            type: Array,
            default: () => {
                return []
            }
        })
        saveParams: any


        @Prop({
            type: Function,
            default: () => {
            }
        })
        backCall: any

        @Prop({
            type: Array,
            default: () => {
                return []
            }
        })
        backParams: any

        get isShowInset() {
            return (this.$route.path || '').startsWith(this.pageName) && this.$route.path !== this.pageName;
        }

        //返回事件函数,支持传参 不传默认使用父级传参
        backPage(...params: any[]) {
            let funParams = params;
            if (!funParams.length) {
                funParams = this.backParams;
            }

            this.backCall(...funParams);
            this.$router.push({path: this.pageName})

        }

        savePage(...params: any[]) {
            let funParams = params;
            if (!funParams.length) {
                funParams = this.saveParams;
            }
            this.saveCall(...funParams);
            this.$router.push({path: this.pageName})
        }
    }
</script>

<style scoped lang="scss">
</style>

