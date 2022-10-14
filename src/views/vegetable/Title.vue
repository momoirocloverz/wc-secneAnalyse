<template>
    <div class="titleContent">
        <div class="line"></div>
        <div class="title" :class="isDark?'dark':''">
            <img src="../../assets/images/salesAnalysis/triangle.png" class="image-icon" />
            <span>
                <slot></slot>
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from "vue-property-decorator";

@Component({
    name: "Title",
    components: {},
})
export default class Index extends Vue {
    public $refs!: {}
    
    @Prop({
        type:Boolean,
        default: false
    })
    isDark!: boolean;
}
</script>

<style scoped lang="scss">
@keyframes imageAnimation_2685 {
    0% {
        opacity: 1;
        transform: none;
    }
    25% {
        opacity: 1;
        transform: none;
    }
    50% {
        opacity: 0.2;
        transform: none;
    }
    75% {
        opacity: 1;
        transform: none;
    }
    100% {
        opacity: 1;
        transform: none;
    }
}
.titleContent {
    width: 100%;
    height: 35px;
    display: flex;
    line-height: 35px;
    margin-bottom: 5px;
    .line {
        width: 5px;
        height: 35px;
        background-color: #fff;
        opacity: .4;
        margin-right: 5px;
    }
    .title {
        display: flex;
        position: relative;
        flex: 1;
        height: 35px;
        background-color: rgba(255, 255, 255, .2);
        .image-icon {
            border-radius: unset;
            pointer-events: auto;
            animation-name: imageAnimation_2685;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            animation-duration: 2s;
            animation-delay: 0s;
            -webkit-user-drag: none;
            filter: none;
        }
        span {
            color: #fff;
            font-size: 20px;
            font-weight: 700;
            opacity: 1;
        }
        .mark {
            font-size: 12px;
            color: #fff;
            opacity: 0.5;
        }
    }
    .dark {
        background-color: rgba(0, 0, 0, .2);
    }
}
</style>
