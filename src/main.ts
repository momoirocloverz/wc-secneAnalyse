//IE11兼容调整
import 'proxy-polyfill'
import 'animate.css'
// import "@/util/rem"
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element';
import "./scss/base.scss";
import "./scss/font.scss"
import {sync} from 'vuex-router-sync'

import {initTicket} from 'sso2-access-util'
//初始化env参数和access配置
import './util'

import ssoAUC from './util/ssoAUC';
import utilMixin from './util/utilMixin';
import moment from "moment";

import customTable from "@/components/customTable/Index.vue";
import customIcon from "@/components/customIcon/Index.vue";
import InsetBack from "@/components/InsetBack.vue";
import OneSize from 'vue-one-size'


import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "./scss/reset.css";

Vue.component('customTable', customTable);
Vue.component('customIcon', customIcon);
Vue.component('InsetBack', InsetBack);

require('promise.prototype.finally').shim()

Vue.use(OneSize)

moment.locale('zh-cn');

// 同步路由状态到vuex中管理
sync(store, router);

Vue.config.productionTip = false;

//开启测试环境调试工具
if (process.env && process.env.VUE_APP_DEV_TOOLS === 'true') {
    Vue.config.devtools = true;
}

//根路径 用于当前项目不是部署在根路径时
Vue.prototype.$baseUrl = process.env.BASE_URL;


enum DEFAULT_MSG {
    SUCCESS = '操作成功!',
    FAIL = '操作失败!'
}

Vue.prototype.DEFAULT_MSG = DEFAULT_MSG

//元素权限控制
Vue.use(ssoAUC);

//全局工具函数
Vue.use(utilMixin);

if (typeof (FileReader.prototype.readAsBinaryString) !== "function") {
    FileReader.prototype.readAsBinaryString = function (fileData) {
        let binary = "";
        let pt: any = this;
        let reader = new FileReader();
        reader.onload = function (e) {
            // @ts-ignore
            let bytes = new Uint8Array(reader.result);
            let length = bytes.byteLength;
            for (let i = 0; i < length; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            let obj: any = {};
            obj.target = {result: binary};
            pt.onload(obj);
        }
        reader.readAsArrayBuffer(fileData);
    }
}

initTicket(() => {
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app');
}).then(r => {
});
