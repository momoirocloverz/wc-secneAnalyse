<template>
    <div class="anim">
        <div class="yanwu"></div>
        <div class="yanwu1"></div>
        <div class="rightYanwu"></div>
        <div class="rightYanwu1"></div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component({
    name: "BgAnim",
    components: {}
})
export default class Layout extends Vue {
    public $refs!: {
    }
}
</script>

<style scoped lang="scss">
@keyframes marquee {
    0% {
        transform: translate3d(0, 0, 0);
    }
    100% {
        transform: translate3d(-300vw, 0, 0);
    }
}
.anim {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    .yanwu {
        position: absolute;
        height: 100vh;
        width: 300vw;
        background: url("./images/fog-1.png") repeat-x;
        background-size: 100% 100%;
        background-position: center;
        animation: marquee 60s linear infinite;
    }
    .yanwu1 {
        position: absolute;
        height: 100vh;
        width: 300vw;
        background: url("./images/fog-2.png") repeat-x;
        background-size: 100% 100%;
        background-position: center;
        animation: marquee 40s linear infinite;
    } 
    .rightYanwu {
        position: absolute;
        height: 100vh;
        width: 300vw;
        left: 300vw;
        background: url("./images/fog-1.png") repeat-x;
        background-size: 100% 100%;
        background-position: center;
        animation: marquee 60s linear infinite;
    }
    .rightYanwu1 {
        position: absolute;
        height: 100vh;
        width: 300vw;
        left: 300vw;
        background: url("./images/fog-2.png") repeat-x;
        background-size: 100% 100%;
        background-position: center;
        animation: marquee 40s linear infinite;
    } 
}
</style>
