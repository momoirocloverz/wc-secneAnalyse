<template>
    <div class="layout">
        <bgAnim></bgAnim>
            <transition name="fade">
                <div class="tips" v-show="showTips">
                    建议使用全屏窗口浏览，全屏快捷键<span class="F11">F11</span>
                </div>
            </transition>
        <OneSizeContainer style="z-index:999;" :width="1920" :height="1080" :maxRatio="3">
            <selfHead @back="back" title="文成县农业场景分析" style="z-index:999;" :isBack="false" time="2021-11-05 14:23"></selfHead>
            <div class="content" >
                <div class="img img1 topImg"></div>
                <div class="img img2 topImg"></div>
                <div class="img img3 topImg"></div>
                <div class="img img4 bottomImg"></div>
                <div class="img img5 bottomImg"></div>
                <div class="img img6 bottomImg"></div>
                <div class="img img7 midImg" @click="goSys('production')" @mouseenter="showBg('scdfxHover')" @mouseleave="hidBg('scdfxHover')">
                    <img src="../../assets/images/layout/scdfx.png" alt="">
                    <span>生产端分析</span>
                </div>
                <transition name="fade">
                    <img class="scdfxHover" v-show="scdfxHover" src="../../assets/images/layout/scdfxHover.png">
                </transition>
                <div class="img img8 midImg" @click="goSys('salesAnalysis/Index')" @mouseenter="showBg('xsdfxHover')" @mouseleave="hidBg('xsdfxHover')">
                    <img src="../../assets/images/layout/xsdfx.png" alt="">
                    <span>销售端分析</span>
                </div>
                <transition name="fade">
                    <img class="xsdfxHover" v-show="xsdfxHover" src="../../assets/images/layout/xsdfxHover.png">
                </transition>
                <div class="img img9 midImg" @click="goSys('vegetable')" @mouseenter="showBg('gsscHover')" @mouseleave="hidBg('gsscHover')">
                    <img src="../../assets/images/layout/sc.png" alt="">
                    <span>高山蔬菜<br>大数据分析</span>
                </div>
                <transition name="fade">
                    <img class="gsscHover" v-show="gsscHover" src="../../assets/images/layout/gsscHover.png">
                </transition>
            </div>
        </OneSizeContainer>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import RouterViewAnim from "@/components/RouterViewAnim.vue";
import _ from 'lodash'
import selfHead from '@/components/Head/Head.vue'
import bgAnim from '@/components/bgAnim/BgAnim.vue'

@Component({
    name: "Layout",
    components: {
        RouterViewAnim,
        selfHead,
        bgAnim
    },
})
export default class Layout extends Vue {
    public $refs!: {
    }

    scdfxHover:boolean = false
    xsdfxHover:boolean = false
    gsscHover:boolean = false
    showTips:boolean = true

    showBg(type:any) {
        if (type==='scdfxHover') {
            this.scdfxHover = true
        } else if (type==='xsdfxHover') {
            this.xsdfxHover = true   
        } else if (type==='gsscHover') {
            this.gsscHover = true   
        }
    }

    hidBg(type:any) {
        if (type==='scdfxHover') {
            this.scdfxHover = false
        } else if (type==='xsdfxHover') {
            this.xsdfxHover = false
        } else if (type==='gsscHover') {
            this.gsscHover = false
        }
    }

    back() {
        window.open('http://wencheng-jsc.anchu.vip/home')
    }

    goSys(sys:string) {
        this.$router.push(`/${sys}`)
    }

    mounted() {
        setTimeout(() => {
            this.showTips = false
        }, 2000);
    }
}
</script>

<style scoped lang="scss">
.layout {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url("../../assets/images/layout/bg.jpg");
    background-size: cover;
    .tips {
        position: absolute;
        top: 130px;
        left: 50%;
        padding: 0 40px;
        line-height: 50px;
        height: 50px;
        transform: translateX(-50%);
        background-color: rgba(27,31,38,0.75);
        color: #fff;
        text-align: center;
        font-size: 15px;
        .F11 {
            border: 1px solid #fff;
        }
    }
    .content {
        position: absolute;
        top: 210px;
        left: 400px;
        width: 1130px;
        height: 710px;
        .img {
            width: 250px;
            height: 222px;
            position: absolute;
        }
        .topImg {
            background-image: url("../../assets/images/layout/topImg.png");
            background-size: cover;
        }
        .bottomImg {
            background-image: url("../../assets/images/layout/bottomImg.png");
            background-size: cover;
        }
        .midImg {
            background-image: url("../../assets/images/layout/midImg.png");
            background-size: cover;
            padding-top: 44px;
            text-align: center;
            font-size: 24px;
            font-weight: 700;
            color: #fff;
            cursor: pointer;
            img {
                width: 120px;
                margin: auto;
            }
        }
        .img1 {
            top: 120px;
            left: 220px;
        }
        .img2 {
            top: 0px;
            left: 440px;
        }
        .img3 {
            top: 120px;
            left: 660px;
        }
        .img4 {
            top: 380px;
            left: 220px;
        }
        .img5 {
            top: 510px;
            left: 440px;
        }
        .img6 {
            top: 380px;
            left: 660px;
        }
        .img7 {
            top: 255px;
            left: 0px;
            transition: top 1s;
            &:hover{
                top:245px
            }
        }
        .img8 {
            top: 255px;
            left: 440px;
            transition: top 1s;
            &:hover{
                top:245px
            }
        }
        .img9 {
            top: 255px;
            left: 880px;
            transition: top 1s;
            &:hover{
                top:245px
            }
        }
        .scdfxHover {
            position: absolute;
            top: -30px;
            left: 180px;
        }
        .xsdfxHover {
            position: absolute;
            top: 460px;
            left: 555px;
        }
        .gsscHover {
            position: absolute;
            top: 45px;
            left: 585px;
        }
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: all 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
    opacity: 0;
}
</style>
