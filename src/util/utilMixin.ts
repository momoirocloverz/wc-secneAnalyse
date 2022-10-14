/**
 * Created by ArvinChen9539 on 2018/8/28.
 * 工具和常用常量混入
 */
import Vue from "vue";

const install = function (Vue: Vue.VueConstructor) {
    const options: any = {
        data() {
            return {}
        },
        methods: {
            //全局默认返回事件
            $backPage() {
                let that: any = this;
                that.$router.back()
            }
        }

    }
    //公用工具函数
    Vue.mixin(options);
};

const exp = {
    install: install
};
export default exp;
