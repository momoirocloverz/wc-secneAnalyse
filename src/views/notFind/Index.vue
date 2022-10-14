<template>
    <div class="error404">
        <div class="error404-body-con">
            <el-card>
                <div class="error404-body-con-title">4<span><i class="el-icon-location"></i></span>4</div>
                <p class="error404-body-con-message">页面不存在</p>
                <div class="error404-btn-con">
                    <el-button @click="goHome" type="text">返回首页</el-button>
                    <el-button @click="backPage" style="margin-left: 40px;" type="primary">
                        返回上一页
                    </el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'

@Component
export default class NotFind extends Vue {
    backPage() {
        this.$router.go(-1);
    }

    goHome() {
        this.$router.push({
            path: '/main'
        });
    }
}
</script>
<style lang="scss" scoped>
@keyframes error404animation {
    0% {
        transform:rotateZ(0deg);
    }
    20% {
        transform:rotateZ(-60deg);
    }
    40% {
        transform:rotateZ(-10deg);
    }
    60% {
        transform:rotateZ(50deg);
    }
    80% {
        transform:rotateZ(-20deg);
    }
    100% {
        transform:rotateZ(0deg);
    }
}

.error404 {
    &-body-con {
        width:700px;
        height:500px;
        position:absolute;
        left:50%;
        top:50%;
        transform:translate(-50%, -50%);

        &-title {
            text-align:center;
            font-size:240px;
            font-weight:700;
            color:#2d8cf0;
            height:260px;
            line-height:260px;
            margin-top:40px;

            span {
                display:inline-block;
                color:#19be6b;
                font-size:230px;
                animation:error404animation 3s ease 0s infinite alternate;
            }
        }

        &-message {
            display:block;
            text-align:center;
            font-size:30px;
            font-weight:500;
            letter-spacing:12px;
            color:#dddde2;
        }
    }

    &-btn-con {
        text-align:center;
        padding:20px 0;
        margin-bottom:40px;
    }
}
</style>