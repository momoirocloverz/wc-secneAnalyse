import Vue from 'vue'
import VueRouter from 'vue-router'
import {getComponentByRootPath} from './util'
import salesAnalysis from './salesAnalysis';
import _ from "lodash";

Vue.use(VueRouter)

let getComponent;

//开发环境下不使用按需加载打包模式,提升打包速度
getComponent = getComponentByRootPath('');
const root = {
    path: '/',
    name: '',
    redirect: {path: '/home'}
};

const list = [
    {
        path:'/home',
        name:'文成农业场景分析首页',
        component:getComponent('layout/Index'),
    },
    {
        path:'/production',
        name:'生产端分析',
        component:getComponent('production/Index'),
        children: [
            {
                path:'/production/forecast',
                name:'杨梅产量预测',
                component:getComponent('production/Forecast'),
            },
            {
                path:'/production/pests',
                name:'高山大米病虫害预警',
                component:getComponent('production/Pests'),
            },
            {
                path:'/production/productionCount',
                name:'生产主体统计分析',
                component:getComponent('production/ProductionCount'),
            }
        ]
    },

    {
        path:'/vegetable',
        name:'高山蔬菜大数据分析',
        component:getComponent('vegetable/Index'),
        children: [
            {
                path: "/vegetable/allIndustry",
                name: "高山蔬菜全产业链分析",
                component:getComponent("vegetable/AllIndustry"),
                children:[
                    {
                        path: "/vegetable/allIndustry/growth",
                        name: "长势监测分析",
                        component:getComponent("vegetable/industry/Growth"),
                    },
                    {
                        path: "/vegetable/allIndustry/meteorological",
                        name: "气象灾害监测分析",
                        component:getComponent("vegetable/industry/Meteorological"),
                    },
                    {
                        path: "/vegetable/allIndustry/outputEstimate",
                        name: "产量预估分析",
                        component:getComponent("vegetable/industry/OutputEstimate"),
                    },
                    {
                        path: "/vegetable/plantingDistribution",
                        name: "高山蔬菜种植分布监测分析",
                        component:getComponent("vegetable/PlantingDistribution"),
                    },
                    {
                        path: "/vegetable/SalesAnalysis",
                        name: "高山蔬菜销售分析",
                        component:getComponent("vegetable/SalesAnalysis"),
                    },
                    {
                        path: "/vegetable/allIndustry/drought",
                        name: "农业干旱监测分析",
                        component:getComponent("vegetable/industry/Drought"),
                    }
                ]
            },
            {
                path: "/vegetable/baseResources",
                name: "高山蔬菜基础资源分析",
                component:getComponent("vegetable/BaseResources"),
            },
            {
                path: "/vegetable/mainStatus",
                name: "高山蔬菜主体情况分析",
                component:getComponent("vegetable/MainStatus"),
            },{
                path: "/vegetable/supervise",
                name: "高山蔬菜产业监管分析",
                component:getComponent("vegetable/Supervise"),
            },
            {
                path:"publicService",
                name: "公共服务分析",
                component:getComponent("vegetable/PublicService"),
            },
            
        ]
    },
    ...salesAnalysis,
]

const router = new VueRouter({
    routes: [
        root,
        ...list
    ]
});

// const appRouter = home.children

// export {
//     appRouter
// }

export default router
