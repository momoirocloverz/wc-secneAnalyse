<template>
    <div class="AllIndustry" v-if="$route.path==='/vegetable/allIndustry'">
        <bgAnim></bgAnim>
        <OneSizeContainer style="z-index:999;overflow: hidden;" :width="1920" :height="1080" :maxRatio="3">
            <selfHead title="高山蔬菜全产业链分析" @back="back" style="z-index:999;"></selfHead>
            <div class="content" >
                <div class="img img1 bottomImg"></div>
                <div class="img img2 midImg" @click="goSys('plantingDistribution')" @mouseenter="showBg('zzfbHover')" @mouseleave="hidBg('zzfbHover')">
                    <img src="../../assets/images/vegetable/zzfb.png" alt="">
                    <span>种植分布<br>监测分析</span>
                </div>
                <transition name="fade">
                    <img class="zzfbHover" v-show="zzfbHover" src="../../assets/images/vegetable/allIndustry/zzfb.png">
                </transition>
                <div class="img img3 midImg" @click="goSys('allIndustry/meteorological')" @mouseenter="showBg('qxzhHover')" @mouseleave="hidBg('qxzhHover')">
                    <img src="../../assets/images/vegetable/qxzh.png" alt="">
                    <span>气象灾害<br>监测分析</span>
                </div>
                <transition name="fade">
                    <img class="qxzhHover" v-show="qxzhHover" src="../../assets/images/vegetable/allIndustry/qxzh.png">
                </transition>
                <div class="img img4 topImg"></div>
                <div class="img img5 bottomImg"></div>
                <div class="img img6 bottomImg"></div>
                <div class="img img7 topImg"></div>
                <div class="img img8 midImg" @click="goSys('allIndustry/growth')" @mouseenter="showBg('zsjcHover')" @mouseleave="hidBg('zsjcHover')">
                    <img src="../../assets/images/vegetable/zsjc.png" alt="">
                    <span>长势<br>监测分析</span>
                </div>
                <transition name="fade">
                    <img class="zsjcHover" v-show="zsjcHover" src="../../assets/images/vegetable/allIndustry/zsjc.png">
                </transition>
                <div class="img img9 midImg" @click="goSys('allIndustry/drought')" @mouseenter="showBg('nyghHover')" @mouseleave="hidBg('nyghHover')">
                    <img src="../../assets/images/vegetable/nygh.png" alt="">
                    <span>农业干旱<br>监测分析</span>
                </div>
                <transition name="fade">
                    <img class="nyghHover" v-show="nyghHover" src="../../assets/images/vegetable/allIndustry/nygh.png">
                </transition>
                <div class="img img10 bottomImg"></div>
                <div class="img img11 topImg"></div>
                <div class="img img12 bottomImg"></div>
                <div class="img img13 bottomImg"></div>
                <div class="img img14 midImg" @click="goSys('allIndustry/outputEstimate')" @mouseenter="showBg('clygHover')" @mouseleave="hidBg('clygHover')">
                    <img src="../../assets/images/vegetable/clyg.png" alt="">
                    <span>产量<br>预估分析</span>
                </div>
                <transition name="fade">
                    <img class="clygHover" v-show="clygHover" src="../../assets/images/vegetable/allIndustry/clyg.png">
                </transition>
                <div class="img img15 midImg" @click="goSys('salesAnalysis')" @mouseenter="showBg('gsscHover')" @mouseleave="hidBg('gsscHover')">
                    <img src="../../assets/images/vegetable/gssc.png" alt="">
                    <span>高山蔬菜<br>销售分析</span>
                </div>
                <transition name="fade">
                    <img class="gsscHover" v-show="gsscHover" src="../../assets/images/vegetable/allIndustry/gssc.png">
                </transition>
                <div class="img img16 bottomImg"></div>
            </div>
        </OneSizeContainer>
    </div>
    <router-view v-else></router-view>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import selfHead from "../../components/Head/Head.vue"
import bgAnim from '@/components/bgAnim/BgAnim.vue'

@Component({
    name: "AllIndustry",
    components: {
        selfHead,
        bgAnim
    },
})
export default class Index extends Vue {
    public $refs!: {}

    zzfbHover:boolean = false
    qxzhHover:boolean = false
    zsjcHover:boolean = false
    nyghHover:boolean = false
    clygHover:boolean = false
    gsscHover:boolean = false

    showBg(type:any) {
        if (type === 'zzfbHover') {
            this.zzfbHover = true
        } else if (type === 'qxzhHover') {
            this.qxzhHover = true
        } else if (type === 'zsjcHover') {
            this.zsjcHover = true
        } else if (type === 'nyghHover') {
            this.nyghHover = true
        } else if (type === 'clygHover') {
            this.clygHover = true
        } else if (type === 'gsscHover') {
            this.gsscHover = true
        }
    }

    hidBg(type:any) {
        if (type === 'zzfbHover') {
            this.zzfbHover = false
        } else if (type === 'qxzhHover') {
            this.qxzhHover = false
        } else if (type === 'zsjcHover') {
            this.zsjcHover = false
        } else if (type === 'nyghHover') {
            this.nyghHover = false
        } else if (type === 'clygHover') {
            this.clygHover = false
        } else if (type === 'gsscHover') {
            this.gsscHover = false
        }
    }

    back() {
        this.$router.push('/vegetable')
    }

    goSys(path: string) {
        this.zzfbHover = false
        this.qxzhHover = false
        this.zsjcHover = false
        this.nyghHover = false
        this.clygHover = false
        this.gsscHover = false
        this.$router.push('/vegetable/' + path)
    }
}
</script>

<style scoped lang="scss">
.AllIndustry {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: url('../../assets/images/vegetable/bg.jpg');
    background-size: cover;
    padding-bottom: 110px;
        .content {
        position: absolute;
        top: 120px;
        left: 188px;
        width: 1732px;
        height: 960px;
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
            padding-top: 21px;
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
            top: 375px;
            left: 0;
        }
        .img2 {
            top: 250px;
            left: 218px;
            transition: all 1s;
            &:hover{
                top: 240px;
            }
        }
        .img3 {
            top: 500px;
            left: 218px;
            transition: all 1s;
            &:hover{
                top: 490px;
            }
        }
        .img4 {
            top: 125px;
            left: 436px;
        }
        .img5 {
            top: 375px;
            left: 436px;
        }
        .img6 {
            top: 625px;
            left: 436px;
        }
        .img7 {
            top: 0px;
            left: 654px;
        }
        .img8 {
            top: 250px;
            left: 654px;
            transition: all 1s;
            &:hover{
                top: 240px;
            }
        }
        .img9 {
            top: 500px;
            left: 654px;
            transition: all 1s;
            &:hover{
                top: 490px;
            }
        }
        .img10 {
            top: 750px;
            left: 654px;
        }
        .img11 {
            top: 125px;
            left: 872px;
        }
        .img12 {
            top: 375px;
            left: 872px;
        }
        .img13 {
            top: 625px;
            left: 872px;
        }
        .img14 {
            top: 250px;
            left: 1090px;
            transition: all 1s;
            &:hover{
                top: 240px;
            }
        }
        .img15 {
            top: 500px;
            left: 1090px;
            transition: all 1s;
            &:hover{
                top: 490px;
            }
        }
        .img16 {
            top: 375px;
            left: 1308px;
        }
        .zzfbHover {
            position: absolute;
            top: 20px;
            left: -75px;
        }
        .qxzhHover {
            position: absolute;
            top: 705px;
            left: -10px;
        }
        .zsjcHover {
            position: absolute;
            top: 20px;
            left: 625px;
        }
        .nyghHover {
            position: absolute;
            top: 705px;
            left: 825px;
        }
        .clygHover {
            position: absolute;
            top: -5px;
            left: 1200px;
        }
        .gsscHover {
            position: absolute;
            top: 380px;
            left: 1300px;
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
