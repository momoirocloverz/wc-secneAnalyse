import { getComponentByRootPath } from "./util";

const rootPath = "/salesAnalysis";
let getComponent;

//开发环境下不使用按需加载打包模式,提升打包速度
getComponent = getComponentByRootPath(rootPath);

const getPath = function(path: string) {
  return `${rootPath}${path}`;
};

export default [
  {
    path: rootPath,
    name: "销售分析",
    // icon: "icon-uniE00C",
    meta: {
        isMenu: true,
    },
    component: getComponent("Index"),
    children: [
        {
            path: getPath("/Index"),
            name: "销售端分析",
            meta: {
                isMenu: true,
            },
            component: getComponent("SalesAnalysis"),
        },
        {
            path: getPath("/segionalSalesMutation"),
            name: "区域销量突变预警",
            meta: {
                isMenu: true,
            },
            component: getComponent("SegionalSalesMutation"),
        },
        {
            path: getPath("/individualEarlyWarning"),
            name: "个体销量突变预警",
            meta: {
                isMenu: true,
            },
            component: getComponent("IndividualEarlyWarning"),
        },
        {
            path: getPath("/priceRedLine"),
            name: "价格红线预警",
            meta: {
                isMenu: true,
            },
            component: getComponent("PriceRedLine"),
        },
        {
            path: getPath("/businessEntity"),
            name: "价格红线预警",
            meta: {
                isMenu: true,
            },
            component: getComponent("BusinessEntity"),
        },
    ],
},
];
