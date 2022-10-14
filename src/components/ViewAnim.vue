<template>
    <div class="router-view-anim">
        <transition :name="type" v-if="!$slots.default||$slots.default.length===1">
            <slot></slot>
        </transition>
        <transition-group :name="type" v-else>
            <slot></slot>
        </transition-group>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
//为指定元素提供显示隐藏动画效果的功能
@Component({
    name: 'view-anim'
})
export default class ViewAnim extends Vue {

    @Prop({
        type: String,
        default: 'slide'
    })
    type!: string
}
</script>

<style scoped lang="scss">
.router-view-anim {
    overflow: hidden;
    //设置动画时长
    .slide-enter-active {
        transition: all 0.3s ease-in-out;
    }

    .slide-leave-active {
        transition: all 0.2s ease-in;
    }

    .slide-enter, .slide-leave-to {
        position: absolute;
        opacity: 0;
        transform: translateX(20px)
    }
}
</style>