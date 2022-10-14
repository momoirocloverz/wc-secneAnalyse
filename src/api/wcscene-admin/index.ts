import {AxiosRequestConfig} from 'axios'
import instance from './instance';
import { convertRESTAPI } from '../util';
declare type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
/** 高山蔬菜肥药售卖趋势 */
function wcscene_admin_alpineVegetables_fertilizerMedicine_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.FertilizerMedicineUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/alpineVegetables/fertilizerMedicine',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List高山蔬菜肥药售卖趋势fertilizerMedicine>)
}

/** 长势监测分析 */
function wcscene_admin_alpineVegetables_growthCount_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.GrowthCountUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/alpineVegetables/growthCount',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List长势趋势growthCount>)
}

/** 种植分布 */
function wcscene_admin_alpineVegetables_plantingDistribution_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.PlantingDistributionUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/alpineVegetables/plantingDistribution',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List种植分布plantingDistribution>)
}

/** 高山蔬菜种植概况 */
function wcscene_admin_alpineVegetables_vegetableCultivation_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.VegetableCultivationUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/alpineVegetables/vegetableCultivation',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List蔬菜种植概况vegetableCultivation>)
}

/** 公共服务 */
function wcscene_admin_alpineVegetables_vegetablePublicService_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.VegetablePublicServiceUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/alpineVegetables/vegetablePublicService',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体公共服务统计vegetablePublicService>)
}

/** 农业干旱监测分析 */
function wcscene_admin_alpineVegetables_vegetableYearDrought_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.VegetableYearDroughtUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/alpineVegetables/vegetableYearDrought',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List农业干旱监测分析vegetableYearDrought>)
}

/** 高山蔬菜销售分析(近7年) */
function wcscene_admin_alpineVegetables_vegetableYearSale_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.VegetableYearSaleUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/alpineVegetables/vegetableYearSale',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List高山蔬菜销售分析vegetableYearSale>)
}

/** 气象灾害监测分析 */
function wcscene_admin_alpineVegetables_vegetableYearWeather_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.VegetableYearWeatherUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/alpineVegetables/vegetableYearWeather',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List气象灾害监测分析vegetableYearWheather>)
}

/** 产量预估分析 */
function wcscene_admin_alpineVegetables_vegetableYearYieldPredict_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.VegetableYearYieldPredictUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/alpineVegetables/vegetableYearYieldPredict',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List产量预估分析vegetableYearYieldPredict>)
}

/** 近7年高山蔬菜种植 */
function wcscene_admin_alpineVegetables_yearVegetableTrend_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.YearVegetableTrendUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/alpineVegetables/yearVegetableTrend',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List高山蔬菜种植趋势yearVegetableTrend>)
}

/** authImages */
function wcscene_admin_userCheck_post(opts?:Overwrite<AxiosRequestConfig,{data?:any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/userCheck',
    opts: opts
  });
  return (i as Promise<unknown>)
}

/** authImages */
function wcscene_admin_userCheck_get(opts?:Overwrite<AxiosRequestConfig,{data?:any}>) {
  let i = instance({
    method: 'get',
    url:  '/wcscene-admin/userCheck',
    opts: opts
  });
  return (i as Promise<unknown>)
}

/** 所有的字典值 */
function wcscene_admin_dic_mapAll_post(opts?:Overwrite<AxiosRequestConfig,{data?:any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/dic/mapAll',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体MapStringList数据字典表dic>)
}

/** 查询列表 */
function wcscene_admin_dic_queryByType_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.QueryByTypeUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/dic/queryByType',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List数据字典表dic>)
}

/** 获取系统的所有枚举值 */
function wcscene_admin_general_queryEnums_post(opts?:Overwrite<AxiosRequestConfig,{data?:any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/general/queryEnums',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体MapStringListEnum>)
}

/** 获取系统某个枚举值 */
function wcscene_admin_general_queryEnumsByKey_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.QueryEnumsUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/general/queryEnumsByKey',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体ListEnum>)
}

/** 查询模块列表 */
function wcscene_admin_logCategory_query_post(opts?:Overwrite<AxiosRequestConfig,{data?:any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/logCategory/query',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List操作日志类别logCategory包含logType列表>)
}

/** 删除 */
function wcscene_admin_logCategory_remove_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.RemoveUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/logCategory/remove',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体Object>)
}

/** 新增 */
function wcscene_admin_logCategory_save_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.SaveUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/logCategory/save',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体Object>)
}

/** 修改 */
function wcscene_admin_logCategory_update_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.UpdateUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/logCategory/update',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体Object>)
}

/** 查询操作列表 */
function wcscene_admin_logType_query_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.QueryUsingPOST15.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/logType/query',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List操作日志类型表logType>)
}

/** 删除 */
function wcscene_admin_logType_remove_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.RemoveUsingPOST15.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/logType/remove',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体Object>)
}

/** 新增 */
function wcscene_admin_logType_save_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.SaveUsingPOST15.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/logType/save',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体Object>)
}

/** 修改 */
function wcscene_admin_logType_update_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.UpdateUsingPOST15.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/logType/update',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体Object>)
}

/** 获取用户登录信息 */
function wcscene_admin_login_get_post(opts?:Overwrite<AxiosRequestConfig,{data?:any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/login/get',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体用户信息表user>)
}

/** 账密登录 */
function wcscene_admin_login_login_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.LoginUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/login/login',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体用户信息表user>)
}

/** 注销 */
function wcscene_admin_login_logout_post(opts?:Overwrite<AxiosRequestConfig,{data?:any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/login/logout',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体Object>)
}

/** 查询登录日志列表（分页） */
function wcscene_admin_loginLog_query_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.QueryUsingPOST23.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/loginLog/query',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体ListLoginLog>)
}

/** 查询操作日志列表（分页） */
function wcscene_admin_optLog_query_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.QueryUsingPOST31.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/optLog/query',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体ListOptLog>)
}

/** 组织详情 */
function wcscene_admin_org_get_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.GetUsingPOST15.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/org/get',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体组织机构表org>)
}

/** 根据用户UID查询用户所属组织UID列表 */
function wcscene_admin_org_getUidsByUser_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.GetUidsByUserUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/org/getUidsByUser',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体ListString>)
}

/** 查询组织 */
function wcscene_admin_org_query_post(opts?:Overwrite<AxiosRequestConfig,{data?:any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/org/query',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List组织机构表org>)
}

/** 查询组织树 */
function wcscene_admin_org_queryTree_post(opts?:Overwrite<AxiosRequestConfig,{data?:any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/org/queryTree',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List组织机构表org>)
}

/** 查询用户所属组织的组织树 */
function wcscene_admin_org_queryTreeByUserOrg_post(opts?:Overwrite<AxiosRequestConfig,{data?:any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/org/queryTreeByUserOrg',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List组织机构表org>)
}

/** 删除组织 */
function wcscene_admin_org_remove_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.RemoveUsingPOST23.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/org/remove',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体Object>)
}

/** 新建组织 */
function wcscene_admin_org_save_post(opts?:Overwrite<AxiosRequestConfig,{data?:any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/org/save',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体String>)
}

/** 修改组织 */
function wcscene_admin_org_update_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.UpdateUsingPOST23.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/org/update',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体String>)
}

/** 组织类型详情 */
function wcscene_admin_orgDic_get_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.GetUsingPOST23.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/orgDic/get',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体String>)
}

/** 查询组织类型 */
function wcscene_admin_orgDic_query_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.QueryUsingPOST47.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/orgDic/query',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List组织类型字典表orgDic>)
}

/** 删除组织类型 */
function wcscene_admin_orgDic_remove_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.RemoveUsingPOST31.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/orgDic/remove',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体Object>)
}

/** 新建组织类型 */
function wcscene_admin_orgDic_save_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.SaveUsingPOST31.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/orgDic/save',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体String>)
}

/** 修改组织类型 */
function wcscene_admin_orgDic_update_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.UpdateUsingPOST31.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/orgDic/update',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体String>)
}

/** 生产主体分析 */
function wcscene_admin_productCount_baseProductionSubject_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.BaseProductionSubjectUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/productCount/baseProductionSubject',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List农产品基础统计basicFarmCount>)
}

/** 农产品年度价格 */
function wcscene_admin_productCount_farmYearPrice_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.FarmYearPriceUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/productCount/farmYearPrice',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List农产品年度价格farmYearPrice>)
}

/** 农产品预测 */
function wcscene_admin_productCount_getYieldFactors_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.GetYieldFactorsUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/productCount/getYieldFactors',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体产量影响因素表yieldFactors>)
}

/** 气象月统计 */
function wcscene_admin_productCount_meteorologicalCount_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.MeteorologicalCountUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/productCount/meteorologicalCount',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体MapStringBigdecimal>)
}

/** 气象统计 */
function wcscene_admin_productCount_meteorologicalStatistics_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.MeteorologicalStatisticsUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/productCount/meteorologicalStatistics',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体MapStringMeteorologicalStatisticsVo>)
}

/** 病虫害 */
function wcscene_admin_productCount_pestCount_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.PestCountUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/productCount/pestCount',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体MapIntList高山大米病虫害pestCount>)
}

/** 生产主体总统计 */
function wcscene_admin_productCount_productionSubject_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.ProductionSubjectUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/productCount/productionSubject',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体生产主体统计productionSubject>)
}

/** 农产品产量 */
function wcscene_admin_productCount_yieldCount_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.YieldCountUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/productCount/yieldCount',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List农产品产量yieldCount>)
}

/** 获取许可证信息 */
function wcscene_admin_productKey_getLicenseInfo_get(opts?:Overwrite<AxiosRequestConfig,{data?:any}>) {
  let i = instance({
    method: 'get',
    url:  '/wcscene-admin/productKey/getLicenseInfo',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体LicenseInfo>)
}

/** 从数据库复制文件到本地，重新安装证书文件 */
function wcscene_admin_productKey_reinstallLicense_get(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.ReinstallLicenseUsingGET7.QueryParameters|any}>) {
  let i = instance({
    method: 'get',
    url:  '/wcscene-admin/productKey/reinstallLicense',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体LicenseInfo>)
}

/** 上传许可文件 */
function wcscene_admin_productKey_uploadLicense_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.UploadLicenseUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/productKey/uploadLicense',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体String>)
}

/** 验证许可证信息 */
function wcscene_admin_productKey_verify_get(opts?:Overwrite<AxiosRequestConfig,{data?:any}>) {
  let i = instance({
    method: 'get',
    url:  '/wcscene-admin/productKey/verify',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体LicenseInfo>)
}

/** 获取权限详情 */
function wcscene_admin_resource_get_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.GetUsingPOST31.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/resource/get',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体权限表resource>)
}

/** 查询应用下的权限列表 */
function wcscene_admin_resource_query_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.QueryUsingPOST55.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/resource/query',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List权限表resource>)
}

/** 查询角色拥有的权限 */
function wcscene_admin_resource_queryResourceRole_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.QueryResourceRoleUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/resource/queryResourceRole',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List权限角色关联表resourceRole>)
}

/** 查询权限树 */
function wcscene_admin_resource_queryTree_post(opts?:Overwrite<AxiosRequestConfig,{data?:any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/resource/queryTree',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List权限表resource>)
}

/** 删除权限 */
function wcscene_admin_resource_remove_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.RemoveUsingPOST39.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/resource/remove',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体String>)
}

/** 添加权限 */
function wcscene_admin_resource_save_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.SaveUsingPOST39.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/resource/save',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体权限表resource>)
}

/** 修改权限 */
function wcscene_admin_resource_update_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.UpdateUsingPOST39.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/resource/update',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体权限表resource>)
}

/** 查询当前登录人的所有权限 */
function wcscene_admin_role_getPemessionByUser_post(opts?:Overwrite<AxiosRequestConfig,{data?:any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/role/getPemessionByUser',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List权限角色关联表resourceRole>)
}

/** 查询用户所有权限 */
function wcscene_admin_role_getPermissionByUser_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.GetPermissionByUserUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/role/getPermissionByUser',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List权限角色关联表resourceRole>)
}

/** 查询角色列表 */
function wcscene_admin_role_query_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.QueryUsingPOST63.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/role/query',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List角色信息表role>)
}

/** 查询角色列表 */
function wcscene_admin_role_queryAll_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.QueryAllUsingPOST.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/role/queryAll',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List角色信息表role>)
}

/** 删除角色 */
function wcscene_admin_role_remove_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.RemoveUsingPOST47.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/role/remove',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体Object>)
}

/** 查询角色对应的权限 */
function wcscene_admin_role_rolePemession_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.RolePemessionUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/role/rolePemession',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List权限角色关联表resourceRole>)
}

/** 新建角色 */
function wcscene_admin_role_save_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.SaveUsingPOST47.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/role/save',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体角色信息表role>)
}

/** 修改 */
function wcscene_admin_role_update_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.UpdateUsingPOST47.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/role/update',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体String>)
}

/** 操作角色权限关联 */
function wcscene_admin_role_updateRolePemession_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.UpdateRolePemessionUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/role/updateRolePemession',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体String>)
}

/** 操作用户角色关联 */
function wcscene_admin_role_updateUserRole_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.UpdateUserRoleUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/role/updateUserRole',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体String>)
}

/** 农产品来源分布(去年) */
function wcscene_admin_saleCount_countFarmSource_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.CountFarmSourceUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/saleCount/countFarmSource',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List农产品来源farmSource>)
}

/** 个体销量预警(上月) */
function wcscene_admin_saleCount_listFarmIndividualSales_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.ListFarmIndividualSalesUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/saleCount/listFarmIndividualSales',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List农产品个体销量预警farmIndividualSales>)
}

/** 主要农产品历史价格趋势比对(当月) */
function wcscene_admin_saleCount_listFarmMonthPrice_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.ListFarmMonthPriceUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/saleCount/listFarmMonthPrice',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List农产品月份价格farmMonthPrice>)
}

/** 主要农产品价格列表(今日) */
function wcscene_admin_saleCount_listFarmRealPrice_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.ListFarmRealPriceUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/saleCount/listFarmRealPrice',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List农产品实时价格farmRealPrice>)
}

/** 销量突变预警(上月) */
function wcscene_admin_saleCount_listFarmSalesMutationWarn_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.ListFarmSalesMutationWarnUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/saleCount/listFarmSalesMutationWarn',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List农产品销量突变预警farmSalesMutationWarn>)
}

/** 农产品销量及销售额走势(上月) */
function wcscene_admin_saleCount_listFarmSalesTrend_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.ListFarmSalesTrendUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/saleCount/listFarmSalesTrend',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List农产品销售走势farmSalesTrend>)
}

/** 在售农产品列表(去年) */
function wcscene_admin_saleCount_listFarmYearCount_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.ListFarmYearCountUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/saleCount/listFarmYearCount',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List农产品类型统计farmYearCount>)
}

/** 农产品成交数量前十(去年) */
function wcscene_admin_saleCount_listFarmYearCountByCount_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.ListFarmYearCountByCountUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/saleCount/listFarmYearCountByCount',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List农产品类型统计farmYearCount>)
}

/** 农产品成交金额前十(去年) */
function wcscene_admin_saleCount_listFarmYearCountByTurnover_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.ListFarmYearCountByTurnoverUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/saleCount/listFarmYearCountByTurnover',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List农产品类型统计farmYearCount>)
}

/** 市场数据(去年) */
function wcscene_admin_saleCount_marketOperatorCount_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.MarketOperatorCountUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/saleCount/marketOperatorCount',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体市场经营户统计marketOperatorCount>)
}

/** 销售基础统计(上月) */
function wcscene_admin_saleCount_saleBasicCount_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.SaleBasicCountUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/saleCount/saleBasicCount',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体销售基础统计saleCount>)
}

/** 用户启用/停用接口 */
function wcscene_admin_user_checkStatus_post(opts?:Overwrite<AxiosRequestConfig,{data?:any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/user/checkStatus',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体String>)
}

/** 根据uid获取用户信息 */
function wcscene_admin_user_get_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.GetUsingPOST39.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/user/get',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体用户信息>)
}

/** 获取用户已关联角色列表 */
function wcscene_admin_user_getRoleList_post(opts?:Overwrite<AxiosRequestConfig,{data?:any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/user/getRoleList',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List用户角色关联表userRole>)
}

/** 用户组织关联（多组织单用户） */
function wcscene_admin_user_orgLink_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.OrgLinkUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/user/orgLink',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体String>)
}

/** 用户组织关联（单组织多用户） */
function wcscene_admin_user_orgLinkMultiUsers_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.OrgLinkMultiUsersUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/user/orgLinkMultiUsers',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体String>)
}

/** 列表查询 */
function wcscene_admin_user_query_post(opts?:Overwrite<AxiosRequestConfig,{data?:any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/user/query',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List用户信息>)
}

/** 用户删除 */
function wcscene_admin_user_remove_post(opts?:Overwrite<AxiosRequestConfig,{data?:any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/user/remove',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体String>)
}

/** 用户角色关联 */
function wcscene_admin_user_roleLink_post(opts?:Overwrite<AxiosRequestConfig,{data?:any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/user/roleLink',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体String>)
}

/** 新增用户接口 */
function wcscene_admin_user_save_post(opts?:Overwrite<AxiosRequestConfig,{data?:any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/user/save',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体用户信息表user>)
}

/** 新增普通用户接口 */
function wcscene_admin_user_saveCommon_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.SaveCommonUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/user/saveCommon',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体用户信息表user>)
}

/** 解绑钉钉账号 */
function wcscene_admin_user_unbindingDing_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.UnbindingDingUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/user/unbindingDing',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体用户信息表user>)
}

/** 用户修改 */
function wcscene_admin_user_update_post(opts?:Overwrite<AxiosRequestConfig,{data?:any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/user/update',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体用户信息表user>)
}

/** 管理员修改其他用户密码 */
function wcscene_admin_user_updatePwByAdmin_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.UpdatePwByAdminUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/user/updatePwByAdmin',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体Object>)
}

/** 用户自己重置密码 */
function wcscene_admin_user_updateUserPassword_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.UpdateUserPasswordUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/user/updateUserPassword',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体Object>)
}

/** 用户授权 */
function wcscene_admin_userPms_add_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.AddUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/userPms/add',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体String>)
}

/** 查询用户特殊授权 */
function wcscene_admin_userPms_getUserResource_post(opts?:Overwrite<AxiosRequestConfig,{data?:ServiceTypePathsWcsceneAdmin.GetUserResourceUsingPOST7.QueryParameters|any}>) {
  let i = instance({
    method: 'post',
    url:  '/wcscene-admin/userPms/getUserResource',
    opts: opts
  });
  return (i as Promise<unknown> as Promise<ServiceTypeWcsceneAdmin.Schemas.接口统一返回实体List用户临时授权表userResource>)
}

export {
  wcscene_admin_alpineVegetables_fertilizerMedicine_post,
  wcscene_admin_alpineVegetables_growthCount_post,
  wcscene_admin_alpineVegetables_plantingDistribution_post,
  wcscene_admin_alpineVegetables_vegetableCultivation_post,
  wcscene_admin_alpineVegetables_vegetablePublicService_post,
  wcscene_admin_alpineVegetables_vegetableYearDrought_post,
  wcscene_admin_alpineVegetables_vegetableYearSale_post,
  wcscene_admin_alpineVegetables_vegetableYearWeather_post,
  wcscene_admin_alpineVegetables_vegetableYearYieldPredict_post,
  wcscene_admin_alpineVegetables_yearVegetableTrend_post,
  wcscene_admin_userCheck_post,
  wcscene_admin_userCheck_get,
  wcscene_admin_dic_mapAll_post,
  wcscene_admin_dic_queryByType_post,
  wcscene_admin_general_queryEnums_post,
  wcscene_admin_general_queryEnumsByKey_post,
  wcscene_admin_logCategory_query_post,
  wcscene_admin_logCategory_remove_post,
  wcscene_admin_logCategory_save_post,
  wcscene_admin_logCategory_update_post,
  wcscene_admin_logType_query_post,
  wcscene_admin_logType_remove_post,
  wcscene_admin_logType_save_post,
  wcscene_admin_logType_update_post,
  wcscene_admin_login_get_post,
  wcscene_admin_login_login_post,
  wcscene_admin_login_logout_post,
  wcscene_admin_loginLog_query_post,
  wcscene_admin_optLog_query_post,
  wcscene_admin_org_get_post,
  wcscene_admin_org_getUidsByUser_post,
  wcscene_admin_org_query_post,
  wcscene_admin_org_queryTree_post,
  wcscene_admin_org_queryTreeByUserOrg_post,
  wcscene_admin_org_remove_post,
  wcscene_admin_org_save_post,
  wcscene_admin_org_update_post,
  wcscene_admin_orgDic_get_post,
  wcscene_admin_orgDic_query_post,
  wcscene_admin_orgDic_remove_post,
  wcscene_admin_orgDic_save_post,
  wcscene_admin_orgDic_update_post,
  wcscene_admin_productCount_baseProductionSubject_post,
  wcscene_admin_productCount_farmYearPrice_post,
  wcscene_admin_productCount_getYieldFactors_post,
  wcscene_admin_productCount_meteorologicalCount_post,
  wcscene_admin_productCount_meteorologicalStatistics_post,
  wcscene_admin_productCount_pestCount_post,
  wcscene_admin_productCount_productionSubject_post,
  wcscene_admin_productCount_yieldCount_post,
  wcscene_admin_productKey_getLicenseInfo_get,
  wcscene_admin_productKey_reinstallLicense_get,
  wcscene_admin_productKey_uploadLicense_post,
  wcscene_admin_productKey_verify_get,
  wcscene_admin_resource_get_post,
  wcscene_admin_resource_query_post,
  wcscene_admin_resource_queryResourceRole_post,
  wcscene_admin_resource_queryTree_post,
  wcscene_admin_resource_remove_post,
  wcscene_admin_resource_save_post,
  wcscene_admin_resource_update_post,
  wcscene_admin_role_getPemessionByUser_post,
  wcscene_admin_role_getPermissionByUser_post,
  wcscene_admin_role_query_post,
  wcscene_admin_role_queryAll_post,
  wcscene_admin_role_remove_post,
  wcscene_admin_role_rolePemession_post,
  wcscene_admin_role_save_post,
  wcscene_admin_role_update_post,
  wcscene_admin_role_updateRolePemession_post,
  wcscene_admin_role_updateUserRole_post,
  wcscene_admin_saleCount_countFarmSource_post,
  wcscene_admin_saleCount_listFarmIndividualSales_post,
  wcscene_admin_saleCount_listFarmMonthPrice_post,
  wcscene_admin_saleCount_listFarmRealPrice_post,
  wcscene_admin_saleCount_listFarmSalesMutationWarn_post,
  wcscene_admin_saleCount_listFarmSalesTrend_post,
  wcscene_admin_saleCount_listFarmYearCount_post,
  wcscene_admin_saleCount_listFarmYearCountByCount_post,
  wcscene_admin_saleCount_listFarmYearCountByTurnover_post,
  wcscene_admin_saleCount_marketOperatorCount_post,
  wcscene_admin_saleCount_saleBasicCount_post,
  wcscene_admin_user_checkStatus_post,
  wcscene_admin_user_get_post,
  wcscene_admin_user_getRoleList_post,
  wcscene_admin_user_orgLink_post,
  wcscene_admin_user_orgLinkMultiUsers_post,
  wcscene_admin_user_query_post,
  wcscene_admin_user_remove_post,
  wcscene_admin_user_roleLink_post,
  wcscene_admin_user_save_post,
  wcscene_admin_user_saveCommon_post,
  wcscene_admin_user_unbindingDing_post,
  wcscene_admin_user_update_post,
  wcscene_admin_user_updatePwByAdmin_post,
  wcscene_admin_user_updateUserPassword_post,
  wcscene_admin_userPms_add_post,
  wcscene_admin_userPms_getUserResource_post
};
