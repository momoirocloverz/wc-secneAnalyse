<template>
    <div class="watermark" :style="{background:`url(${bgImg})`}">
        <canvas ref="canvas" style="display: none" width="120" height="120"></canvas>
    </div>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import loginInfo from '@/mixins/loginInfo'
//水印
@Component({
    mixins: [loginInfo]
})
export default class Watermark extends Mixins(loginInfo) {
    $refs!: {
        canvas: HTMLCanvasElement
    }

    //背景图片
    bgImg: string = ''

    createBgCanvas() {
        const ctx = this.$refs.canvas.getContext('2d');
        if (ctx) {
            ctx.fillStyle = "rgba(0,0,0,.08)";
            ctx.font = "20px Arial";
            ctx.rotate(330 * Math.PI / 180);
            //登录用户名存在时使用户名
            ctx.fillText(this.LOGIN_INFO.loginName || "CTR星汉", 10, 70);
            this.bgImg = this.$refs.canvas.toDataURL("png");
        }
    }

    //转为图片设为背景图
    mounted() {
        this.createBgCanvas();
    }

}
</script>

<style scoped lang="scss">
.watermark {
    position:absolute;
    pointer-events:none;
    z-index:99999999;
    top:0;
    width:100%;
    height:100%;
}
</style>