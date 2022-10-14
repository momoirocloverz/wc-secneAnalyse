import VueRouter, {Route} from 'vue-router'

declare module 'vue/types/vue' {
    interface Vue {
        $router: VueRouter
        $route: Route,

        //默认消息提醒
        readonly DEFAULT_MSG: {
            SUCCESS: '操作成功!',
            FAIL: '操作失败!'
        }

        //根据权限码判断当前登录用户是否拥有权限
        $SSO_AUC(code: string): boolean

        //全局根路径
        $baseUrl: string
    }
}
