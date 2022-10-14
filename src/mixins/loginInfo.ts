import {Component, Vue} from 'vue-property-decorator';
import {Action, State} from 'vuex-class'

/**
 * 获取登录用户信息
 */
@Component
export default class LoginInfo extends Vue {
    @State('LOGIN_INFO')
    LOGIN_INFO!: sys.loginInfo

    @Action('syncLoginInfo')
    syncLoginInfo!: () => Promise<any>

    @Action('logout')
    logout!: () => Promise<any>

    //列表渲染中有时无法获取到登录用户信息,改为函数返回
    $getLoginInfo(): sys.loginInfo {
        return this.LOGIN_INFO
    }
}