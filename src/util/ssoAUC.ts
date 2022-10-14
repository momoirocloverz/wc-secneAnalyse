/**
 * Created by ArvinChen9539 on 2018/8/28.
 * 权限控制
 */
import {mapGetters, mapState} from 'vuex'
import {VueConstructor} from "vue";

//排除权限控制(因为消息提醒没有激活任何菜单 手动排除)
const excludeCodes: string[] = [];

const install = function (Vue: VueConstructor) {
    //全局组件混入权限控制
    Vue.mixin({
        computed: {
            ...mapState(['LOGIN_INFO']),
            ...mapGetters(['userP'])
        },
        methods: {
            $SSO_AUC(code: string) {
                //无权限时的提示或其他操作
                if (excludeCodes.indexOf(code) !== -1) {
                    return true;
                }

                //@ts-ignore
                if (this.LOGIN_INFO.$isAdmin) {
                    return true
                }

                //todo 暂时授予用户全部权限
                // return true
                //@ts-ignore
                return this.userP[code] ? true : false;
            }
        }
    });
};

const exp = {
    install: install
};
export default exp;