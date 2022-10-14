/**
 * Created by ArvinChen9539 on 2018/8/17.
 * 公用正则表达式
 */
import {VuexModule, Module} from 'vuex-module-decorators';

@Module({name:'pattern',namespaced:true})
class VuexStore extends VuexModule {
    public money = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d{1,2}?$)/
    //身份证号码 idNumber
    public idNumber = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
}

export default VuexStore
