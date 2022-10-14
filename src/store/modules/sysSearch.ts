/**
 * Created by ArvinChen9539 on 2018/8/17.
 * 系统搜索存储
 */
import {VuexModule, Module, Mutation} from 'vuex-module-decorators';

type QueryType = {
    name: string,
    industry: any
}

@Module({name: 'sysSearch', namespaced: true})
class VuexStore extends VuexModule {
    public query: QueryType = {
        name: '',
        industry: []
    }

    @Mutation
    public setName(name: string) {
        this.query.name = name;
    }

    @Mutation
    public setIndustry(info: any) {
        console.log(info)
        this.query.industry = info;
    }

    @Mutation
    public setQuery(query: QueryType) {
        this.query = query;
    }

}

export {
    QueryType
}
export default VuexStore
