import {Component, Vue} from 'vue-property-decorator';
import {Action, State} from 'vuex-class'
import {VuexStore} from '@/store'

/**
 * 系统枚举相关
 */
@Component
export default class Enums extends Vue {
    @State('ENUMS')
    ENUMS!: typeof VuexStore.prototype.ENUMS

    @Action('syncEnums')
    syncEnums!: () => Promise<any>

    //列表渲染中有时无法获取到登录用户信息,改为函数返回
    $getEnums() {
        return this.ENUMS
    }
}