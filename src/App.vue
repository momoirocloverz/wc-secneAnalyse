<template>
    <router-view/>
</template>

<script lang="ts">
import {Component, Mixins} from 'vue-property-decorator'
import SystemInfo from "@/mixins/systmeInfo";
import * as socketClient from '@/views/socketClient';
import {wcscene_admin} from '@/api'
import {ticket} from '@/util/ticket'

@Component({
    mixins: [SystemInfo]
})
export default class App extends Mixins(SystemInfo) {
    async mounted() {
        //todo 正式上线前对接对方系统的登录
        let data:any = await wcscene_admin.wcscene_admin_login_login_post({
            data: {
                loginName: 'admin',
                password: 'Aa123456'
            }
        })
        ticket(data.data.ticket)
        socketClient.initConnect()//初始化
    }

    beforeDestroy() {
        socketClient.close();//关闭
    }
}
</script>

<style lang="scss">

#app {
    background: rgba(228, 231, 237, 1);
}
</style>
