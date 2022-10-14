import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators';


Vue.use(Vuex)

@Module
class VuexStore extends VuexModule {
    public ORDER_INFO:any = window.localStorage.getItem("ORDER_INFO");

    @Mutation
    public setOrderInfo(info:any = {}){
        window.localStorage.setItem("ORDER_INFO",JSON.stringify(info));
    }
}
export default VuexStore

