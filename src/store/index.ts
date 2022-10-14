import Vue from 'vue'
import Vuex from 'vuex'
import {Action, Module, Mutation, VuexModule} from 'vuex-module-decorators';
import {ticketUtil, goto} from 'sso2-access-util'
import * as tinyCookie from 'tiny-cookie'
import {envData} from '@/util'

//模块
import pattern from './modules/pattern'
import sysSearch from './modules/sysSearch'
import bpmn from './modules/bpmn'
import catchState from './catchState'

Vue.use(Vuex)

@Module
class VuexStore extends VuexModule {
    public LOGIN_INFO: any = {}

    //系统枚举值
    public ENUMS: any = {}

    public orgList: any = []

    get userP() {
        let p: any = {};
        //其他用户通过用户拥有的菜单加载显示
        if (this.LOGIN_INFO.resources) {
            for (let item of this.LOGIN_INFO.resources) {
                p[item.code] = item;
            }
        }
        return p;
    }

    @Mutation
    public setLoginInfo(info: any = {}) {
        this.LOGIN_INFO = info;
        //判断是否是超级管理员
        if (info.loginName === 'admin') {
            this.LOGIN_INFO.$isAdmin = true;
        }
        //todo 判断特殊身份权限标记
    }

    @Mutation
    public clearLogin() {
        this.LOGIN_INFO = {};
        //todo 清除权限等其他信息
        ticketUtil.clearTicket();
        //修复本地异常保存的ticket问题
        tinyCookie.remove(ticketUtil.getKey());
    }

    @Mutation
    setEnums(info: any) {//更新枚举信息
        this.ENUMS = info;
    }

    @Mutation
    setOrg(info: any) {
        this.orgList = info;
    }

    @Action({rawError: true})
    public async logout() {
        // console.log(window.location.href.split('#')[0]+'#/')
        await goto.logout(window.location.href.split('#')[0] + '#/')
        this.context.commit('clearLogin')
    }
}

const store = new Vuex.Store(Object.assign({
        strict: process.env.NODE_ENV !== 'production'
    },
    VuexStore, {
        modules: {pattern, catchState, sysSearch, bpmn}
    }));

Vue.prototype.$store = store;
export default store
export {
    VuexStore
}
