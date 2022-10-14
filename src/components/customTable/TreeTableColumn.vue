<template>
    <el-table-column
        :sortable="itemColumns.sortable ? true : false"
        :filter-multiple="false"
        :key="itemColumns.key"
        :prop="itemColumns.key"
        :fixed="itemColumns.fixed"
        :align="itemColumns.align?itemColumns.align:'left'"
        :column-key="itemColumns.columnKey"
        :label="itemColumns.title"
        :filters="itemColumns.filters"
        :filtered-value="itemColumns.filteredValue"
        :width="itemColumns.width"
        :show-overflow-tooltip="true"
        :minWidth="itemColumns.minWidth">
        <template slot="header" slot-scope="scope" v-if="itemColumns.renderHeader">
            <Expand :row="scope.row" :render="itemColumns.renderHeader"></Expand>
        </template>
        <template slot-scope="scope">
            <Expand :key="scope.row ? scope.row._rowKey : index" :row="scope.row"
                    :render="itemColumns.render" :index="scope.row._index"></Expand>
        </template>
        <template v-if="itemColumns.children&&!itemColumns.isHide">
            <!-- 使用自身组件会导致勾选同比环比列表显示异常暂时这样写,目前列表只支持最多两层 -->
            <template v-for="(item,index) of itemColumns.children">
                <tree-table-column :sortable="item.sortable ? true : false"
                                   :filter-multiple="false"
                                   :key="index"
                                   :prop="item.key"
                                   :fixed="item.fixed"
                                   :align="item.align?item.align:'center'"
                                   :column-key="item.columnKey"
                                   :item-columns="item"
                                   :label="item.title"
                                   :filters="item.filters"
                                   :filtered-value="item.filteredValue"
                                   :width="item.width"
                                   :minWidth="item.minWidth"
                                   v-if="!item.isHide">
                    <template slot="header" slot-scope="scope" v-if="item.renderHeader">
                        <Expand :row="scope.row" :render="item.renderHeader"></Expand>
                    </template>
                    <template slot-scope="scope">
                        <Expand :key="scope.row ? scope.row._rowKey : index" :row="scope.row"
                                :render="item.render" :index="scope.row._index"></Expand>
                    </template>

                </tree-table-column>
            </template>
        </template>
    </el-table-column>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import Expand from './expands'

@Component({
    name: 'TreeTableColumn',
    components: {Expand}
})
export default class TreeTableColumn extends Vue {

    @Prop({
        type: Object,
        default: () => {
            return {}
        }
    })
    itemColumns!: any
}
</script>

<style scoped>

</style>