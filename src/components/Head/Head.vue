<template>
    <!-- <OneSizeContainer :width="1920" :height="100" :maxRatio="2" style="pointer-events: none; top: 0 !important;"> -->
        <div class="bg">
            <span class="backBtn" @click="back" v-if="isBack">
                <img src="./images/back.png">
                返回
            </span>
            <span class="backBtn" @click="back" v-else>
                <img src="./images/home.png">
                返回大数据平台
            </span>
            <span class="leftBtn">
                <slot name="leftBtn"></slot>
            </span>
            
            <span class="title">
                <span>{{title}}</span>
                <div class="time">数据更新时间：{{time}}</div>
            </span>
            <span class="rightBtn">
                <slot name="rightBtn"></slot>
            </span>
            <div class="HighLight">
            </div>
            
        </div>
    <!-- </OneSizeContainer> -->
    
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import m from 'moment'

@Component({
    name: "Head",
    components: {}
})
export default class Layout extends Vue {
    public $refs!: {
    }

    @Prop({
        type:Boolean,
        default: true
    })
    isBack!: boolean;

    @Prop({
        type:String,
        default: ""
    })
    title!: string;

    @Prop({
        type:String,
        default: m().format('YYYY-MM-DD HH:mm')
    })
    time!: string;

    back() {
        this.$emit("back")
    }
}
</script>

<style scoped lang="scss">
@keyframes imageAnimation_2685 
{
    0% {
        opacity: 1; transform: none;
    }
    25% {
        opacity: 1; transform: none;
    }
    50% {
        opacity: 0.2; transform: none;
    }
    75% {
        opacity: 1; transform: none;
    }
    100% {
        opacity: 1; transform: none;
    }
}
    .bg {
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 120px;
        background-image: url(./images/bg.png);
        background-size: 100% 100%;
        background-repeat: no-repeat;
        padding-bottom: 15px;
        z-index: 30;
        .HighLight {
            position: absolute;
            top: 0;
            left: 0;
            //z-index: -1;
            width: 100%;
            height: 120px;
            background-image: url(./images/HighLight.png);
            background-size: 1920px;
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
        .backBtn {
            position: absolute;
            top: 21px;
            left: 21px;
            z-index: 9999;
            font-size: 16px;
            color: #fff;
            cursor: pointer;
            img {
                display: inline-block;
                vertical-align: middle;
                width: 26px;
                margin-right: 8px;
            }
        }
        .title {
            display: inline-block;
            width: 100%;
            height: 100%;
            text-align: center;
            font-size: 44px;
            color: #fff;
            margin-bottom: 10px;
            font-family: regular-35;
            span{
                letter-spacing:20px;
            }
            cursor: default;
            letter-spacing:15px;
            .time {
                opacity: .5;
                font-size: 12px;
                font-family: none;
                letter-spacing:1px;
            }
        }
        .leftBtn {
            position: absolute;
            top: 14px;
            left: 144px;
            z-index: 2;
        }
        .rightBtn {
            position: absolute;
            top: 14px;
            right: 40px;
            z-index: 2;
        }
    }
</style>
