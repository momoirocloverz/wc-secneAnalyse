declare namespace ServiceTypeWcsceneAdmin {
    namespace Schemas {
        /**
         * Enum
         */
        export interface Enum {
        }
        /**
         * LicenseInfo
         */
        export interface LicenseInfo {
            info?: string;
            issued?: string; // date-time
            notAfter?: string; // date-time
            notBefore?: string; // date-time
            subject?: string;
        }
        /**
         * LoginLog
         */
        export interface LoginLog {
            actionType?: "login" | "logout";
            clientIp?: string;
            created?: string; // date-time
            deviceType?: "app" | "pc";
            loginName?: string;
            name?: string;
            remarks?: string;
            status?: "fail" | "success";
            uid?: string;
            userUid?: string;
        }
        /**
         * MeteorologicalStatisticsVo
         */
        export interface MeteorologicalStatisticsVo {
            js?: number; // bigdecimal
            sd?: number; // bigdecimal
            wd?: number; // bigdecimal
        }
        /**
         * OptLog
         */
        export interface OptLog {
            appCode?: string;
            category?: string;
            categoryName?: string;
            clientIp?: string;
            endTime?: string; // date-time
            loginName?: string;
            message?: string;
            name?: string;
            originAppCode?: string;
            params?: string;
            startTime?: string; // date-time
            status?: "fail" | "success";
            timeConsuming?: number; // int64
            type?: string;
            typeName?: string;
            uid?: string;
            userUid?: string;
        }
        /**
         * 产量影响因素表yieldFactors
         */
        export interface 产量影响因素表yieldFactors {
            /**
             * 上年7月干旱天数
             */
            droughtDays7?: number; // int32
            /**
             * 上年8月干旱天数
             */
            droughtDays8?: number; // int32
            /**
             * 上年9月干旱天数
             */
            droughtDays9?: number; // int32
            /**
             * 杨梅长势(很差/较差/一般/较好/很好
             */
            growth?: string;
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 当年4月低湿天数
             */
            lowHumidity?: number; // int32
            /**
             * 上年冬季低温天数
             */
            lowTemperature?: number; // int32
            /**
             * 种植面积
             */
            plantAreaCount?: number; // int32
            /**
             * 当年3月降水量
             */
            precipitation3?: number; // int32
            /**
             * 当年4月降水量
             */
            precipitation4?: number; // int32
            /**
             * 当年5月降水量
             */
            precipitation5?: number; // int32
            /**
             * 当年6月降水量
             */
            precipitation6?: number; // int32
            /**
             * 农产品类型
             */
            type?: string;
            /**
             * 年份
             */
            year?: number; // int32
            /**
             * 农产品产量
             */
            yieldCount?: number; // int32
        }
        /**
         * 产量预估分析vegetableYearYieldPredict
         */
        export interface 产量预估分析vegetableYearYieldPredict {
            /**
             * 实际产量
             */
            actualOutput?: string;
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 预估产量
             */
            predictOutput?: string;
            /**
             * 年份
             */
            year?: number; // int32
        }
        /**
         * 公共服务统计vegetablePublicService
         */
        export interface 公共服务统计vegetablePublicService {
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 新型农民
             */
            newPracticingFarmer?: number; // int32
            /**
             * 农业公共服务中心数量
             */
            publicServiceCenter?: number; // int32
            /**
             * 科研院所总数量
             */
            researchInstitutes?: number; // int32
            /**
             * 专家数量
             */
            specialisNum?: number; // int32
            /**
             * 农业科技示范基地数量
             */
            technologyDemonstration?: number; // int32
            /**
             * 培训基地总数量
             */
            trainingBase?: number; // int32
            /**
             * 年份
             */
            year?: number; // int32
        }
        /**
         * 农业干旱监测分析vegetableYearDrought
         */
        export interface 农业干旱监测分析vegetableYearDrought {
            /**
             * 实际产量
             */
            actualOutput?: string;
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 预计产量
             */
            estimateOutput?: string;
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 预估产量
             */
            predictOutput?: string;
            /**
             * 减产率
             */
            reduceProduction?: string;
            /**
             * 年份
             */
            year?: number; // int32
        }
        /**
         * 农产品个体销量预警farmIndividualSales
         */
        export interface 农产品个体销量预警farmIndividualSales {
            /**
             * 异常销量
             */
            abnormalSales?: number; // int32
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 天
             */
            day?: number; // int32
            /**
             * 历史销量
             */
            hisSales?: number; // int32
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 经营户名称
             */
            individualName?: string;
            /**
             * 月份
             */
            month?: number; // int32
            /**
             * 具体时间
             */
            tmpDate?: string; // date-time
            /**
             * 年份
             */
            year?: number; // int32
        }
        /**
         * 农产品产量yieldCount
         */
        export interface 农产品产量yieldCount {
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 农产品类型
             */
            type?: string;
            /**
             * 年份
             */
            year?: number; // int32
            /**
             * 农产品产量
             */
            yieldCount?: number; // int32
        }
        /**
         * 农产品基础统计basicFarmCount
         */
        export interface 农产品基础统计basicFarmCount {
            /**
             * 种植基地数量
             */
            baseCount?: number; // int32
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 价格
             */
            farmPrice?: number; // bigdecimal
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 种植面积
             */
            plantAreaCount?: number; // int32
            /**
             * 生产主体数量
             */
            productCount?: number; // int32
            /**
             * 生产主体类别
             */
            productType?: number; // int32
            /**
             * 种植乡镇数量
             */
            townshipCount?: number; // int32
            /**
             * 农产品类型
             */
            type?: string;
            /**
             * 年份
             */
            year?: number; // int32
        }
        /**
         * 农产品实时价格farmRealPrice
         */
        export interface 农产品实时价格farmRealPrice {
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 农产品名称
             */
            farmName?: string;
            /**
             * 农产品价格
             */
            farmPrice?: number; // bigdecimal
            /**
             * 较昨日
             */
            farmRate?: number; // bigdecimal
            /**
             * 主键
             */
            id?: number; // int64
            resultDate?: string;
            /**
             * 具体时间
             */
            tmpDate?: string; // date-time
        }
        /**
         * 农产品年度价格farmYearPrice
         */
        export interface 农产品年度价格farmYearPrice {
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 农产品价格
             */
            farmPrice?: number; // bigdecimal
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 农产品类型
             */
            type?: string;
            /**
             * 年份
             */
            year?: number; // int32
        }
        /**
         * 农产品月份价格farmMonthPrice
         */
        export interface 农产品月份价格farmMonthPrice {
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 农产品名称
             */
            farmName?: string;
            /**
             * 农产品价格
             */
            farmPrice?: number; // bigdecimal
            /**
             * 同比
             */
            grewRate?: number; // bigdecimal
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 月份
             */
            month?: number; // int32
            /**
             * 环比
             */
            ringRatio?: number; // bigdecimal
            /**
             * 具体时间
             */
            tmpDate?: string; // date-time
            /**
             * 年份
             */
            year?: number; // int32
        }
        /**
         * 农产品来源farmSource
         */
        export interface 农产品来源farmSource {
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 来源数量
             */
            sourceCount?: number; // int32
            /**
             * 来源类型
             */
            sourceType?: string;
            /**
             * 年份
             */
            year?: number; // int32
        }
        /**
         * 农产品类型统计farmYearCount
         */
        export interface 农产品类型统计farmYearCount {
            /**
             * 农产品数量
             */
            farmCount?: number; // int32
            /**
             * 成交金额
             */
            farmTurnover?: number; // int32
            /**
             * 农产品类型
             */
            farmType?: string;
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 成交数量
             */
            transactCount?: number; // int32
            /**
             * 年份
             */
            year?: number; // int32
        }
        /**
         * 农产品销售走势farmSalesTrend
         */
        export interface 农产品销售走势farmSalesTrend {
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 月份
             */
            month?: number; // int32
            resultDate?: string;
            /**
             * 销售量
             */
            saleCount?: number; // int32
            /**
             * 销售额
             */
            saleMoney?: number; // bigdecimal
            /**
             * 具体时间
             */
            tmpDate?: string; // date-time
            /**
             * 年份
             */
            year?: number; // int32
        }
        /**
         * 农产品销量突变预警farmSalesMutationWarn
         */
        export interface 农产品销量突变预警farmSalesMutationWarn {
            /**
             * 异常销量
             */
            abnormalSales?: number; // int32
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 天
             */
            day?: number; // int32
            /**
             * 农产品名称
             */
            farmName?: string;
            /**
             * 历史销量
             */
            hisSales?: number; // int32
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 月份
             */
            month?: number; // int32
            /**
             * 具体时间
             */
            tmpDate?: string; // date-time
            /**
             * 年份
             */
            year?: number; // int32
        }
        /**
         * 区域市场数量areaMarketCount
         */
        export interface 区域市场数量areaMarketCount {
            /**
             * 区域名称
             */
            areaName?: string;
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 市场数量
             */
            marketCount?: number; // int32
            /**
             * 年份
             */
            year?: number; // int32
        }
        /**
         * 市场经营户统计marketOperatorCount
         */
        export interface 市场经营户统计marketOperatorCount {
            areaMarketCounts?: /* 区域市场数量areaMarketCount */ 区域市场数量areaMarketCount[];
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 市场数量
             */
            marketQuantityNum?: number; // int32
            /**
             * 经营户总数
             */
            operatingAccount?: number; // int32
            /**
             * 获利
             */
            reapProfit?: number; // bigdecimal
            /**
             * 销售量
             */
            saleCount?: number; // int32
            /**
             * 销售额
             */
            saleMoney?: number; // bigdecimal
            /**
             * 销售种类
             */
            saleType?: number; // int32
            /**
             * 年份
             */
            year?: number; // int32
        }
        /**
         * 接口统一返回实体«LicenseInfo»
         */
        export interface 接口统一返回实体LicenseInfo {
            /**
             * 具体数据对象
             */
            data?: /* LicenseInfo */ LicenseInfo;
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«Enum»»
         */
        export interface 接口统一返回实体ListEnum {
            /**
             * 具体数据对象
             */
            data?: /* Enum */ Enum[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«LoginLog»»
         */
        export interface 接口统一返回实体ListLoginLog {
            /**
             * 具体数据对象
             */
            data?: /* LoginLog */ LoginLog[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«OptLog»»
         */
        export interface 接口统一返回实体ListOptLog {
            /**
             * 具体数据对象
             */
            data?: /* OptLog */ OptLog[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«string»»
         */
        export interface 接口统一返回实体ListString {
            /**
             * 具体数据对象
             */
            data?: string[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«产量预估分析vegetableYearYieldPredict»»
         */
        export interface 接口统一返回实体List产量预估分析vegetableYearYieldPredict {
            /**
             * 具体数据对象
             */
            data?: /* 产量预估分析vegetableYearYieldPredict */ 产量预估分析vegetableYearYieldPredict[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«农业干旱监测分析vegetableYearDrought»»
         */
        export interface 接口统一返回实体List农业干旱监测分析vegetableYearDrought {
            /**
             * 具体数据对象
             */
            data?: /* 农业干旱监测分析vegetableYearDrought */ 农业干旱监测分析vegetableYearDrought[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«农产品个体销量预警farmIndividualSales»»
         */
        export interface 接口统一返回实体List农产品个体销量预警farmIndividualSales {
            /**
             * 具体数据对象
             */
            data?: /* 农产品个体销量预警farmIndividualSales */ 农产品个体销量预警farmIndividualSales[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«农产品产量yieldCount»»
         */
        export interface 接口统一返回实体List农产品产量yieldCount {
            /**
             * 具体数据对象
             */
            data?: /* 农产品产量yieldCount */ 农产品产量yieldCount[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«农产品基础统计basicFarmCount»»
         */
        export interface 接口统一返回实体List农产品基础统计basicFarmCount {
            /**
             * 具体数据对象
             */
            data?: /* 农产品基础统计basicFarmCount */ 农产品基础统计basicFarmCount[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«农产品实时价格farmRealPrice»»
         */
        export interface 接口统一返回实体List农产品实时价格farmRealPrice {
            /**
             * 具体数据对象
             */
            data?: /* 农产品实时价格farmRealPrice */ 农产品实时价格farmRealPrice[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«农产品年度价格farmYearPrice»»
         */
        export interface 接口统一返回实体List农产品年度价格farmYearPrice {
            /**
             * 具体数据对象
             */
            data?: /* 农产品年度价格farmYearPrice */ 农产品年度价格farmYearPrice[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«农产品月份价格farmMonthPrice»»
         */
        export interface 接口统一返回实体List农产品月份价格farmMonthPrice {
            /**
             * 具体数据对象
             */
            data?: /* 农产品月份价格farmMonthPrice */ 农产品月份价格farmMonthPrice[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«农产品来源farmSource»»
         */
        export interface 接口统一返回实体List农产品来源farmSource {
            /**
             * 具体数据对象
             */
            data?: /* 农产品来源farmSource */ 农产品来源farmSource[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«农产品类型统计farmYearCount»»
         */
        export interface 接口统一返回实体List农产品类型统计farmYearCount {
            /**
             * 具体数据对象
             */
            data?: /* 农产品类型统计farmYearCount */ 农产品类型统计farmYearCount[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«农产品销售走势farmSalesTrend»»
         */
        export interface 接口统一返回实体List农产品销售走势farmSalesTrend {
            /**
             * 具体数据对象
             */
            data?: /* 农产品销售走势farmSalesTrend */ 农产品销售走势farmSalesTrend[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«农产品销量突变预警farmSalesMutationWarn»»
         */
        export interface 接口统一返回实体List农产品销量突变预警farmSalesMutationWarn {
            /**
             * 具体数据对象
             */
            data?: /* 农产品销量突变预警farmSalesMutationWarn */ 农产品销量突变预警farmSalesMutationWarn[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«操作日志类别logCategory，包含logType列表»»
         */
        export interface 接口统一返回实体List操作日志类别logCategory包含logType列表 {
            /**
             * 具体数据对象
             */
            data?: /* 操作日志类别logCategory，包含logType列表 */ 操作日志类别logCategory包含logType列表[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«操作日志类型表logType»»
         */
        export interface 接口统一返回实体List操作日志类型表logType {
            /**
             * 具体数据对象
             */
            data?: /* 操作日志类型表logType */ 操作日志类型表logType[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«数据字典表dic»»
         */
        export interface 接口统一返回实体List数据字典表dic {
            /**
             * 具体数据对象
             */
            data?: /* 数据字典表dic */ 数据字典表dic[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«权限表resource»»
         */
        export interface 接口统一返回实体List权限表resource {
            /**
             * 具体数据对象
             */
            data?: /* 权限表resource */ 权限表resource[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«权限角色关联表resourceRole»»
         */
        export interface 接口统一返回实体List权限角色关联表resourceRole {
            /**
             * 具体数据对象
             */
            data?: /* 权限角色关联表resourceRole */ 权限角色关联表resourceRole[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«气象灾害监测分析vegetableYearWheather»»
         */
        export interface 接口统一返回实体List气象灾害监测分析vegetableYearWheather {
            /**
             * 具体数据对象
             */
            data?: /* 气象灾害监测分析vegetableYearWheather */ 气象灾害监测分析vegetableYearWheather[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«用户临时授权表userResource»»
         */
        export interface 接口统一返回实体List用户临时授权表userResource {
            /**
             * 具体数据对象
             */
            data?: /* 用户临时授权表userResource */ 用户临时授权表userResource[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«用户信息»»
         */
        export interface 接口统一返回实体List用户信息 {
            /**
             * 具体数据对象
             */
            data?: /* 用户信息 */ 用户信息[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«用户角色关联表userRole»»
         */
        export interface 接口统一返回实体List用户角色关联表userRole {
            /**
             * 具体数据对象
             */
            data?: /* 用户角色关联表userRole */ 用户角色关联表userRole[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«种植分布plantingDistribution»»
         */
        export interface 接口统一返回实体List种植分布plantingDistribution {
            /**
             * 具体数据对象
             */
            data?: /* 种植分布plantingDistribution */ 种植分布plantingDistribution[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«组织机构表org»»
         */
        export interface 接口统一返回实体List组织机构表org {
            /**
             * 具体数据对象
             */
            data?: /* 组织机构表org */ 组织机构表org[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«组织类型字典表orgDic»»
         */
        export interface 接口统一返回实体List组织类型字典表orgDic {
            /**
             * 具体数据对象
             */
            data?: /* 组织类型字典表orgDic */ 组织类型字典表orgDic[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«蔬菜种植概况vegetableCultivation»»
         */
        export interface 接口统一返回实体List蔬菜种植概况vegetableCultivation {
            /**
             * 具体数据对象
             */
            data?: /* 蔬菜种植概况vegetableCultivation */ 蔬菜种植概况vegetableCultivation[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«角色信息表role»»
         */
        export interface 接口统一返回实体List角色信息表role {
            /**
             * 具体数据对象
             */
            data?: /* 角色信息表role0 */ 角色信息表role0[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«长势趋势growthCount»»
         */
        export interface 接口统一返回实体List长势趋势growthCount {
            /**
             * 具体数据对象
             */
            data?: /* 长势趋势growthCount */ 长势趋势growthCount[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«高山蔬菜种植趋势yearVegetableTrend»»
         */
        export interface 接口统一返回实体List高山蔬菜种植趋势yearVegetableTrend {
            /**
             * 具体数据对象
             */
            data?: /* 高山蔬菜种植趋势yearVegetableTrend */ 高山蔬菜种植趋势yearVegetableTrend[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«高山蔬菜肥药售卖趋势fertilizerMedicine»»
         */
        export interface 接口统一返回实体List高山蔬菜肥药售卖趋势fertilizerMedicine {
            /**
             * 具体数据对象
             */
            data?: /* 高山蔬菜肥药售卖趋势fertilizerMedicine */ 高山蔬菜肥药售卖趋势fertilizerMedicine[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«List«高山蔬菜销售分析vegetableYearSale»»
         */
        export interface 接口统一返回实体List高山蔬菜销售分析vegetableYearSale {
            /**
             * 具体数据对象
             */
            data?: /* 高山蔬菜销售分析vegetableYearSale */ 高山蔬菜销售分析vegetableYearSale[];
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«Map«int,List«高山大米病虫害pestCount»»»
         */
        export interface 接口统一返回实体MapIntList高山大米病虫害pestCount {
            /**
             * 具体数据对象
             */
            data?: {
                [name: string]: /* 高山大米病虫害pestCount0 */ 高山大米病虫害pestCount0[];
            };
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«Map«string,bigdecimal»»
         */
        export interface 接口统一返回实体MapStringBigdecimal {
            /**
             * 具体数据对象
             */
            data?: {
                [name: string]: number; // bigdecimal
            };
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«Map«string,List«Enum»»»
         */
        export interface 接口统一返回实体MapStringListEnum {
            /**
             * 具体数据对象
             */
            data?: {
                [name: string]: /* Enum */ Enum[];
            };
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«Map«string,List«数据字典表dic»»»
         */
        export interface 接口统一返回实体MapStringList数据字典表dic {
            /**
             * 具体数据对象
             */
            data?: {
                [name: string]: /* 数据字典表dic */ 数据字典表dic[];
            };
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«Map«string,MeteorologicalStatisticsVo»»
         */
        export interface 接口统一返回实体MapStringMeteorologicalStatisticsVo {
            /**
             * 具体数据对象
             */
            data?: {
                [name: string]: /* MeteorologicalStatisticsVo */ MeteorologicalStatisticsVo;
            };
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«object»
         */
        export interface 接口统一返回实体Object {
            /**
             * 具体数据对象
             */
            data?: {
                [key: string]: any;
            };
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«string»
         */
        export interface 接口统一返回实体String {
            /**
             * 具体数据对象
             */
            data?: string;
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«产量影响因素表yieldFactors»
         */
        export interface 接口统一返回实体产量影响因素表yieldFactors {
            /**
             * 具体数据对象
             */
            data?: /* 产量影响因素表yieldFactors */ 产量影响因素表yieldFactors;
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«公共服务统计vegetablePublicService»
         */
        export interface 接口统一返回实体公共服务统计vegetablePublicService {
            /**
             * 具体数据对象
             */
            data?: /* 公共服务统计vegetablePublicService */ 公共服务统计vegetablePublicService;
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«市场经营户统计marketOperatorCount»
         */
        export interface 接口统一返回实体市场经营户统计marketOperatorCount {
            /**
             * 具体数据对象
             */
            data?: /* 市场经营户统计marketOperatorCount */ 市场经营户统计marketOperatorCount;
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«权限表resource»
         */
        export interface 接口统一返回实体权限表resource {
            /**
             * 具体数据对象
             */
            data?: /* 权限表resource0 */ 权限表resource0;
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«生产主体统计productionSubject»
         */
        export interface 接口统一返回实体生产主体统计productionSubject {
            /**
             * 具体数据对象
             */
            data?: /* 生产主体统计productionSubject */ 生产主体统计productionSubject;
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«用户信息»
         */
        export interface 接口统一返回实体用户信息 {
            /**
             * 具体数据对象
             */
            data?: /* 用户信息 */ 用户信息;
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«用户信息表user»
         */
        export interface 接口统一返回实体用户信息表user {
            /**
             * 具体数据对象
             */
            data?: /* 用户信息表user0 */ 用户信息表user0;
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«组织机构表org»
         */
        export interface 接口统一返回实体组织机构表org {
            /**
             * 具体数据对象
             */
            data?: /* 组织机构表org */ 组织机构表org;
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«角色信息表role»
         */
        export interface 接口统一返回实体角色信息表role {
            /**
             * 具体数据对象
             */
            data?: /* 角色信息表role */ 角色信息表role;
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 接口统一返回实体«销售基础统计saleCount»
         */
        export interface 接口统一返回实体销售基础统计saleCount {
            /**
             * 具体数据对象
             */
            data?: /* 销售基础统计saleCount */ 销售基础统计saleCount;
            /**
             * 返回消息
             */
            message?: string;
            /**
             * 扩展数据对象
             */
            options?: {
                [key: string]: any;
            };
            /**
             * 页码
             */
            pageNum?: number; // int32
            /**
             * 分页大小
             */
            pageSize?: number; // int32
            /**
             * 总分页数
             */
            pages?: number; // int32
            /**
             * 状态码
             */
            status?: number; // int32
            /**
             * 总记录数
             */
            total?: number; // int64
            uid?: string;
        }
        /**
         * 操作日志类别logCategory，包含logType列表
         */
        export interface 操作日志类别logCategory包含logType列表 {
            /**
             * 应用UID
             */
            appUid?: string;
            /**
             * 编码
             */
            code?: string;
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 创建人UID
             */
            createdBy?: string;
            /**
             * 操作列表
             */
            logTypeList?: /* 操作日志类型表logType */ 操作日志类型表logType[];
            /**
             * 最后修改时间
             */
            modified?: string; // date-time
            /**
             * 最后修改人UID
             */
            modifiedBy?: string;
            /**
             * 名称
             */
            name?: string;
            /**
             * 排序
             */
            sort?: number; // int32
            /**
             * 主键
             */
            uid?: string;
        }
        /**
         * 操作日志类型表logType
         */
        export interface 操作日志类型表logType {
            /**
             * 应用UID
             */
            appUid?: string;
            /**
             * 日志类别UID
             */
            categoryUid?: string;
            /**
             * 编码
             */
            code?: string;
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 创建人UID
             */
            createdBy?: string;
            /**
             * 最后修改时间
             */
            modified?: string; // date-time
            /**
             * 最后修改人UID
             */
            modifiedBy?: string;
            /**
             * 名称
             */
            name?: string;
            /**
             * 排序
             */
            sort?: number; // int32
            /**
             * 主键
             */
            uid?: string;
        }
        /**
         * 数据字典表dic
         */
        export interface 数据字典表dic {
            /**
             * 字典值
             */
            code?: string;
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 修改时间
             */
            modified?: string; // date-time
            /**
             * 字典名称
             */
            name?: string;
            /**
             * 排序
             */
            sort?: number; // int32
            /**
             * 字典类型
             */
            type?: "age" | "sex";
        }
        /**
         * 权限表resource
         */
        export interface 权限表resource {
            /**
             * 应用UID
             */
            appUid?: string;
            /**
             * 权限CODE
             */
            code?: string;
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 创建人UID
             */
            createdBy?: string;
            /**
             * 图标
             */
            icon?: string;
            /**
             * 层级
             */
            level?: number; // int32
            /**
             * 最后修改时间
             */
            modified?: string; // date-time
            /**
             * 最后修改人UID
             */
            modifiedBy?: string;
            /**
             * 权限名称
             */
            name?: string;
            /**
             * 父节点UID
             */
            parentUid?: string;
            /**
             * 排序
             */
            sort?: number; // int32
            /**
             * 状态,启用:y;停用:n;逻辑删除:del
             */
            status?: "del" | "n" | "y";
            /**
             * 类型，menu:菜单;api:接口;
             */
            type?: "api" | "menu";
            /**
             * 主键
             */
            uid?: string;
            /**
             * url地址
             */
            url?: string;
        }
        /**
         * 权限表resource0
         */
        export interface 权限表resource0 {
            /**
             * 应用UID
             */
            appUid?: string;
            /**
             * 权限CODE
             */
            code?: string;
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 创建人UID
             */
            createdBy?: string;
            /**
             * 图标
             */
            icon?: string;
            /**
             * 层级
             */
            level?: number; // int32
            /**
             * 最后修改时间
             */
            modified?: string; // date-time
            /**
             * 最后修改人UID
             */
            modifiedBy?: string;
            /**
             * 权限名称
             */
            name?: string;
            /**
             * 父节点UID
             */
            parentUid?: string;
            /**
             * 排序
             */
            sort?: number; // int32
            /**
             * 状态,启用:y;停用:n;逻辑删除:del
             */
            status?: "del" | "n" | "y";
            /**
             * 类型，menu:菜单;api:接口;
             */
            type?: "api" | "menu";
            /**
             * 主键
             */
            uid?: string;
            /**
             * url地址
             */
            url?: string;
        }
        /**
         * 权限角色关联表resourceRole
         */
        export interface 权限角色关联表resourceRole {
            /**
             * 权限UID
             */
            resourceUid?: string;
            /**
             * 角色UID
             */
            roleUid?: string;
            /**
             * 主键
             */
            uid?: string;
        }
        /**
         * 气象灾害监测分析vegetableYearWheather
         */
        export interface 气象灾害监测分析vegetableYearWheather {
            /**
             * 实际产量
             */
            actualOutput?: string;
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 预计产量
             */
            estimateOutput?: string;
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 预估产量
             */
            predictOutput?: string;
            /**
             * 减产率
             */
            reduceProduction?: string;
            /**
             * 年份
             */
            year?: number; // int32
        }
        /**
         * 生产主体统计productionSubject
         */
        export interface 生产主体统计productionSubject {
            /**
             * 类别数量
             */
            categoryCount?: number; // int32
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 生产主体类别
             */
            productNum?: number; // int32
            /**
             * 年份
             */
            year?: number; // int32
        }
        /**
         * 用户临时授权表userResource
         */
        export interface 用户临时授权表userResource {
            /**
             * 应用UID
             */
            appUid?: string;
            /**
             * 角色UID
             */
            resourceUid?: string;
            /**
             * 赋予give,限制restrict
             */
            type?: "give" | "restrict";
            /**
             * 主键
             */
            uid?: string;
            /**
             * 用户UID
             */
            userUid?: string;
        }
        /**
         * 用户信息
         */
        export interface 用户信息 {
            /**
             * 联系地址
             */
            addr?: string;
            /**
             * 修改密码，是y否n
             */
            changePwd?: "n" | "y";
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 创建人UID
             */
            createdBy?: string;
            /**
             * 创建人姓名
             */
            createdName?: string;
            /**
             * 钉钉持久授权码
             */
            dingAuthCode?: string;
            /**
             * 钉钉unionid
             */
            dingUnionId?: string;
            /**
             * 邮箱
             */
            email?: string;
            /**
             * 性别,男:mail;女:female
             */
            gender?: "female" | "male" | "unknown";
            /**
             * 所属的用户组UID列表
             */
            groupUidList?: string[];
            /**
             * 证件号码
             */
            idNumber?: string;
            /**
             * 用户名
             */
            loginName?: string;
            /**
             * 最后修改时间
             */
            modified?: string; // date-time
            /**
             * 最后修改人UID
             */
            modifiedBy?: string;
            /**
             * 姓名
             */
            name?: string;
            /**
             * 部门
             */
            orgCode?: string;
            /**
             * 机构名称（多个）
             */
            orgNames?: string;
            /**
             * 岗位编码
             */
            postCode?: string;
            /**
             * 职务名称
             */
            postName?: string;
            /**
             * 企业微信userid
             */
            qywxUserId?: string;
            /**
             * 角色名称:以、的形式隔开
             */
            roleName?: string;
            /**
             * 排序
             */
            sort?: number; // int32
            /**
             * 状态,启用:y;停用:n;逻辑删除:del
             */
            status?: "del" | "n" | "y";
            /**
             * 同步标识
             */
            syncUid?: string;
            /**
             * 同步用户（是y,否n）
             */
            syncUser?: "n" | "y";
            /**
             * 联系电话
             */
            telephone?: string;
            /**
             * 用户类型,normal普通用户、appAdmin应用管理员、ssoAdmin平台管理员
             */
            type?: "admin" | "common";
            /**
             * 主键
             */
            uid?: string;
            /**
             * 部门信息
             */
            userOrgs?: /* 用户组织关联表userOrg */ 用户组织关联表userOrg[];
            /**
             * 角色信息
             */
            userRoles?: /* 用户角色关联表userRole */ 用户角色关联表userRole[];
            /**
             * 微信unionId
             */
            wxUnionId?: string;
        }
        /**
         * 用户信息表user
         */
        export interface 用户信息表user {
            /**
             * 联系地址
             */
            addr?: string;
            /**
             * 修改密码，是y否n
             */
            changePwd?: "n" | "y";
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 创建人UID
             */
            createdBy?: string;
            /**
             * 钉钉持久授权码
             */
            dingAuthCode?: string;
            /**
             * 钉钉unionid
             */
            dingUnionId?: string;
            /**
             * 邮箱
             */
            email?: string;
            expire?: number; // int64
            /**
             * 性别,男:mail;女:female
             */
            gender?: "female" | "male" | "unknown";
            /**
             * 证件号码
             */
            idNumber?: string;
            lastLoginTime?: string; // date-time
            /**
             * 用户名
             */
            loginName?: string;
            /**
             * 最后修改时间
             */
            modified?: string; // date-time
            /**
             * 最后修改人UID
             */
            modifiedBy?: string;
            /**
             * 姓名
             */
            name?: string;
            /**
             * 部门
             */
            orgCode?: string;
            /**
             * 岗位编码
             */
            postCode?: string;
            pubRedirectUrl?: string;
            /**
             * 企业微信userid
             */
            qywxUserId?: string;
            redirectUrl?: string;
            resources?: /* 权限表resource */ 权限表resource[];
            roles?: /* 角色信息表role */ 角色信息表role[];
            /**
             * 排序
             */
            sort?: number; // int32
            /**
             * 状态,启用:y;停用:n;逻辑删除:del
             */
            status?: "del" | "n" | "y";
            syncOrg?: "n" | "y";
            /**
             * 同步标识
             */
            syncUid?: string;
            syncUser?: "n" | "y";
            syncUserOrg?: "n" | "y";
            /**
             * 联系电话
             */
            telephone?: string;
            /**
             * ticket
             */
            ticket?: string;
            /**
             * 用户类型,normal普通用户、appAdmin应用管理员、ssoAdmin平台管理员
             */
            type?: "admin" | "common";
            /**
             * 主键
             */
            uid?: string;
            userOrgCodeList?: string[];
            /**
             * 微信unionId
             */
            wxUnionId?: string;
        }
        /**
         * 用户信息表user0
         */
        export interface 用户信息表user0 {
            /**
             * 联系地址
             */
            addr?: string;
            /**
             * 修改密码，是y否n
             */
            changePwd?: "n" | "y";
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 创建人UID
             */
            createdBy?: string;
            /**
             * 钉钉持久授权码
             */
            dingAuthCode?: string;
            /**
             * 钉钉unionid
             */
            dingUnionId?: string;
            /**
             * 邮箱
             */
            email?: string;
            /**
             * 性别,男:mail;女:female
             */
            gender?: "female" | "male" | "unknown";
            /**
             * 证件号码
             */
            idNumber?: string;
            /**
             * 用户名
             */
            loginName?: string;
            /**
             * 最后修改时间
             */
            modified?: string; // date-time
            /**
             * 最后修改人UID
             */
            modifiedBy?: string;
            /**
             * 姓名
             */
            name?: string;
            /**
             * 部门
             */
            orgCode?: string;
            /**
             * 岗位编码
             */
            postCode?: string;
            /**
             * 企业微信userid
             */
            qywxUserId?: string;
            /**
             * 排序
             */
            sort?: number; // int32
            /**
             * 状态,启用:y;停用:n;逻辑删除:del
             */
            status?: "del" | "n" | "y";
            /**
             * 同步标识
             */
            syncUid?: string;
            /**
             * 同步用户（是y,否n）
             */
            syncUser?: "n" | "y";
            /**
             * 联系电话
             */
            telephone?: string;
            /**
             * 用户类型,normal普通用户、appAdmin应用管理员、ssoAdmin平台管理员
             */
            type?: "admin" | "common";
            /**
             * 主键
             */
            uid?: string;
            /**
             * 微信unionId
             */
            wxUnionId?: string;
        }
        /**
         * 用户组织关联表userOrg
         */
        export interface 用户组织关联表userOrg {
            /**
             * 用户UID
             */
            orgUid?: string;
            /**
             * 主键
             */
            uid?: string;
            /**
             * 用户UID
             */
            userUid?: string;
        }
        /**
         * 用户角色关联表userRole
         */
        export interface 用户角色关联表userRole {
            /**
             * 角色UID
             */
            roleUid?: string;
            /**
             * 主键
             */
            uid?: string;
            /**
             * 用户UID
             */
            userUid?: string;
        }
        /**
         * 种植分布plantingDistribution
         */
        export interface 种植分布plantingDistribution {
            /**
             * 地区
             */
            area?: string;
            /**
             * 平均湿度
             */
            avgHum?: number; // bigdecimal
            /**
             * 平均温度
             */
            avgTemperature?: number; // bigdecimal
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 耕地面积
             */
            cultivatedArea?: number; // bigdecimal
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 产值
             */
            outputValue?: number; // int32
            /**
             * 种植面积
             */
            plantAreaCount?: number; // int32
            /**
             * 降水量
             */
            precipitation?: number; // bigdecimal
            /**
             * 蔬菜种类
             */
            vegetablesCount?: number; // int32
            /**
             * 年份
             */
            year?: number; // int32
            /**
             * 产量
             */
            yieldValue?: number; // int32
        }
        /**
         * 组织机构表org
         */
        export interface 组织机构表org {
            /**
             * 编码
             */
            code?: string;
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 创建人UID
             */
            createdBy?: string;
            /**
             * 组织类型CODE
             */
            dicCode?: string;
            /**
             * 层级
             */
            level?: number; // int32
            /**
             * 最后修改时间
             */
            modified?: string; // date-time
            /**
             * 最后修改人UID
             */
            modifiedBy?: string;
            /**
             * 名称
             */
            name?: string;
            /**
             * 父级UID
             */
            parentUid?: string;
            /**
             * 排序
             */
            sort?: number; // int32
            /**
             * 同步组织（是y,否n）
             */
            syncOrg?: "n" | "y";
            /**
             * 同步标识
             */
            syncUid?: string;
            /**
             * 主键
             */
            uid?: string;
        }
        /**
         * 组织机构表org0
         */
        export interface 组织机构表org0 {
            canSelect?: boolean;
            children?: /* 组织机构表org0 */ 组织机构表org0[];
            /**
             * 编码
             */
            code?: string;
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 创建人UID
             */
            createdBy?: string;
            /**
             * 组织类型CODE
             */
            dicCode?: string;
            /**
             * 层级
             */
            level?: number; // int32
            /**
             * 最后修改时间
             */
            modified?: string; // date-time
            /**
             * 最后修改人UID
             */
            modifiedBy?: string;
            /**
             * 名称
             */
            name?: string;
            /**
             * 父级UID
             */
            parentUid?: string;
            selected?: boolean;
            show?: boolean;
            /**
             * 排序
             */
            sort?: number; // int32
            /**
             * 同步组织（是y,否n）
             */
            syncOrg?: "n" | "y";
            /**
             * 同步标识
             */
            syncUid?: string;
            /**
             * 主键
             */
            uid?: string;
        }
        /**
         * 组织类型字典表orgDic
         */
        export interface 组织类型字典表orgDic {
            /**
             * 类型编码
             */
            code?: string;
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 创建人UID
             */
            createdBy?: string;
            createdName?: string;
            /**
             * 最后修改时间
             */
            modified?: string; // date-time
            /**
             * 最后修改人UID
             */
            modifiedBy?: string;
            /**
             * 类型名称
             */
            name?: string;
            /**
             * 排序
             */
            sort?: number; // int32
            /**
             * 状态,启用:y;停用:n;逻辑删除:del
             */
            status?: "del" | "n" | "y";
            /**
             * 主键
             */
            uid?: string;
        }
        /**
         * 蔬菜种植概况vegetableCultivation
         */
        export interface 蔬菜种植概况vegetableCultivation {
            /**
             * 平均日照
             */
            avgSunshine?: number; // bigdecimal
            /**
             * 平均温度
             */
            avgTemperature?: number; // bigdecimal
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 耕地面积
             */
            cultivatedArea?: number; // bigdecimal
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 种植面积
             */
            plantAreaCount?: number; // int32
            /**
             * 月降水量
             */
            precipitation?: number; // bigdecimal
            /**
             * 蔬菜名称
             */
            vegetablesName?: string;
            /**
             * 年份
             */
            year?: number; // int32
        }
        /**
         * 角色信息表role
         */
        export interface 角色信息表role {
            /**
             * 应用UID
             */
            appUid?: string;
            /**
             * 角色CODE
             */
            code?: string;
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 创建人UID
             */
            createdBy?: string;
            /**
             * 最后修改时间
             */
            modified?: string; // date-time
            /**
             * 最后修改人UID
             */
            modifiedBy?: string;
            /**
             * 角色名称
             */
            name?: string;
            /**
             * 状态,启用:y;停用:n;逻辑删除:del
             */
            status?: "del" | "n" | "y";
            /**
             * 角色类型,normal(普通),sys(系统)
             */
            type?: "normal" | "sys";
            /**
             * 主键
             */
            uid?: string;
        }
        /**
         * 角色信息表role0
         */
        export interface 角色信息表role0 {
            /**
             * 应用UID
             */
            appUid?: string;
            /**
             * 角色CODE
             */
            code?: string;
            /**
             * 创建人姓名
             */
            createName?: string;
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 创建人UID
             */
            createdBy?: string;
            /**
             * 最后修改时间
             */
            modified?: string; // date-time
            /**
             * 最后修改人UID
             */
            modifiedBy?: string;
            /**
             * 角色名称
             */
            name?: string;
            /**
             * 状态,启用:y;停用:n;逻辑删除:del
             */
            status?: "del" | "n" | "y";
            /**
             * 角色类型,normal(普通),sys(系统)
             */
            type?: "normal" | "sys";
            /**
             * 主键
             */
            uid?: string;
            userUid?: string;
        }
        /**
         * 销售基础统计saleCount
         */
        export interface 销售基础统计saleCount {
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 月份
             */
            month?: number; // int32
            /**
             * 获利
             */
            reapProfit?: number; // bigdecimal
            /**
             * 销售量
             */
            saleCount?: number; // int32
            /**
             * 销售额
             */
            saleMoney?: number; // bigdecimal
            /**
             * 销售种类
             */
            saleType?: number; // int32
            /**
             * 具体时间
             */
            tmpDate?: string;
            /**
             * 年份
             */
            year?: number; // int32
        }
        /**
         * 长势趋势growthCount
         */
        export interface 长势趋势growthCount {
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 长势
             */
            growth?: string;
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 降水量
             */
            rainCount?: string;
            /**
             * 土壤能力
             */
            soilCapacity?: string;
            /**
             * 年份
             */
            year?: number; // int32
        }
        /**
         * 高山大米病虫害pestCount
         */
        export interface 高山大米病虫害pestCount {
            /**
             * 实际产值
             */
            actualOutputValue?: string;
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 病虫害等级
             */
            pestLevel?: string;
            /**
             * 病虫害类型
             */
            pestType?: string;
            /**
             * 年份
             */
            year?: number; // int32
        }
        /**
         * 高山大米病虫害pestCount0
         */
        export interface 高山大米病虫害pestCount0 {
            /**
             * 实际产值
             */
            actualOutputValue?: string;
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 病虫害等级
             */
            pestLevel?: string;
            /**
             * 病虫害类型
             */
            pestType?: string;
            typeList?: /* 高山大米病虫害pestCount */ 高山大米病虫害pestCount[];
            /**
             * 年份
             */
            year?: number; // int32
        }
        /**
         * 高山蔬菜种植趋势yearVegetableTrend
         */
        export interface 高山蔬菜种植趋势yearVegetableTrend {
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 产值
             */
            outputValue?: number; // int32
            /**
             * 种植面积
             */
            plantAreaCount?: number; // int32
            /**
             * 年份
             */
            year?: number; // int32
            /**
             * 产量
             */
            yieldCount?: number; // int32
        }
        /**
         * 高山蔬菜肥药售卖趋势fertilizerMedicine
         */
        export interface 高山蔬菜肥药售卖趋势fertilizerMedicine {
            /**
             * 购买人总量
             */
            buyPersonCount?: number; // int32
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 总额同比
             */
            growRate?: number; // bigdecimal
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 总额环比
             */
            ringRatio?: number; // bigdecimal
            /**
             * 农资销售总额
             */
            saleMoney?: number; // bigdecimal
            /**
             * 年份
             */
            year?: number; // int32
        }
        /**
         * 高山蔬菜销售分析vegetableYearSale
         */
        export interface 高山蔬菜销售分析vegetableYearSale {
            /**
             * 农资价格
             */
            agriculturalProductionPrice?: string;
            /**
             * 创建时间
             */
            created?: string; // date-time
            /**
             * 主键
             */
            id?: number; // int64
            /**
             * 库存
             */
            stock?: string;
            /**
             * 蔬菜价格
             */
            vegetablePrice?: string;
            /**
             * 年份
             */
            year?: number; // int32
            /**
             * 产量
             */
            yield?: string;
        }
    }
}
declare namespace ServiceTypePathsWcsceneAdmin {
    namespace AddUsingPOST7 {
        namespace Parameters {
            export type AppUid = string;
            export type UserResourceList0AppUid = string;
            export type UserResourceList0ResourceUid = string;
            export type UserResourceList0Type = "give" | "restrict";
            export type UserResourceList0Uid = string;
            export type UserResourceList0UserUid = string;
            export type UserUid = string;
        }
        export interface QueryParameters {
            appUid: Parameters.AppUid;
            "userResourceList[0].appUid"?: Parameters.UserResourceList0AppUid;
            "userResourceList[0].resourceUid"?: Parameters.UserResourceList0ResourceUid;
            "userResourceList[0].type"?: Parameters.UserResourceList0Type;
            "userResourceList[0].uid"?: Parameters.UserResourceList0Uid;
            "userResourceList[0].userUid"?: Parameters.UserResourceList0UserUid;
            userUid: Parameters.UserUid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace AuthImagesUsingDELETE {
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace AuthImagesUsingGET {
        namespace Responses {
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace AuthImagesUsingHEAD {
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace AuthImagesUsingOPTIONS {
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace AuthImagesUsingPATCH {
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace AuthImagesUsingPOST {
        namespace Responses {
            export interface $201 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace AuthImagesUsingPUT {
        namespace Responses {
            export interface $201 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace AuthImagesUsingTRACE {
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace BaseProductionSubjectUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace CheckStatusUsingPOST7 {
        namespace Parameters {
            export type Status = string;
            export type Uid = string;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
        export interface UndefinedParameters {
            status: Parameters.Status;
            uid: Parameters.Uid;
        }
    }
    namespace CountFarmSourceUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace FarmYearPriceUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace FertilizerMedicineUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace GetLicenseInfoUsingGET7 {
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace GetPemessionByUserUsingPOST7 {
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace GetPermissionByUserUsingPOST7 {
        namespace Parameters {
            export type UserUid = string;
        }
        export interface QueryParameters {
            userUid: Parameters.UserUid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace GetRoleListUsingPOST7 {
        namespace Parameters {
            export type Uid = string;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
        export interface UndefinedParameters {
            uid: Parameters.Uid;
        }
    }
    namespace GetUidsByUserUsingPOST7 {
        namespace Parameters {
            export type UserUid = string;
        }
        export interface QueryParameters {
            userUid: Parameters.UserUid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace GetUserResourceUsingPOST7 {
        namespace Parameters {
            export type AppUid = string;
            export type UserUid = string;
        }
        export interface QueryParameters {
            appUid: Parameters.AppUid;
            userUid: Parameters.UserUid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace GetUsingPOST15 {
        namespace Parameters {
            export type Uid = string;
        }
        export interface QueryParameters {
            uid: Parameters.Uid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace GetUsingPOST23 {
        namespace Parameters {
            export type Uid = string;
        }
        export interface QueryParameters {
            uid: Parameters.Uid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace GetUsingPOST31 {
        namespace Parameters {
            export type Uid = string;
        }
        export interface QueryParameters {
            uid: Parameters.Uid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace GetUsingPOST39 {
        namespace Parameters {
            export type Uid = string;
        }
        export interface QueryParameters {
            uid?: Parameters.Uid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace GetUsingPOST7 {
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace GetYieldFactorsUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace GrowthCountUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace ListFarmIndividualSalesUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace ListFarmMonthPriceUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace ListFarmRealPriceUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace ListFarmSalesMutationWarnUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace ListFarmSalesTrendUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace ListFarmYearCountByCountUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace ListFarmYearCountByTurnoverUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace ListFarmYearCountUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace LoginUsingPOST7 {
        namespace Parameters {
            export type LoginName = string;
            export type Password = string;
        }
        export interface QueryParameters {
            loginName: Parameters.LoginName;
            password: Parameters.Password;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace LogoutUsingPOST7 {
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace MapAllUsingPOST7 {
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace MarketOperatorCountUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace MeteorologicalCountUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace MeteorologicalStatisticsUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace OrgLinkMultiUsersUsingPOST7 {
        namespace Parameters {
            export type OrgUid = string;
            export type UserUids = string[];
        }
        export interface QueryParameters {
            orgUid: Parameters.OrgUid;
            userUids: Parameters.UserUids;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace OrgLinkUsingPOST7 {
        namespace Parameters {
            export type OrgUidList = string[];
            export type Uid = string;
        }
        export interface QueryParameters {
            orgUidList: Parameters.OrgUidList;
            uid: Parameters.Uid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace PestCountUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace PlantingDistributionUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace ProductionSubjectUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace QueryAllUsingPOST {
        namespace Parameters {
            export type PageNum = number; // int32
            export type PageSize = number; // int32
        }
        export interface QueryParameters {
            pageNum?: Parameters.PageNum /* int32 */;
            pageSize?: Parameters.PageSize /* int32 */;
        }
        namespace Responses {
            export interface $201 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
            export interface $404 {
            }
        }
    }
    namespace QueryByTypeUsingPOST7 {
        namespace Parameters {
            export type DicType = "age" | "sex";
        }
        export interface QueryParameters {
            dicType?: Parameters.DicType;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace QueryEnumsUsingPOST15 {
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace QueryEnumsUsingPOST7 {
        namespace Parameters {
            export type Key = string;
        }
        export interface QueryParameters {
            key: Parameters.Key;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace QueryResourceRoleUsingPOST7 {
        namespace Parameters {
            export type RoleUid = string;
        }
        export interface QueryParameters {
            roleUid: Parameters.RoleUid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace QueryTreeByUserOrgUsingPOST7 {
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace QueryTreeUsingPOST15 {
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace QueryTreeUsingPOST7 {
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace QueryUsingPOST15 {
        namespace Parameters {
            export type CategoryUid = string;
        }
        export interface QueryParameters {
            categoryUid?: Parameters.CategoryUid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace QueryUsingPOST23 {
        namespace Parameters {
            export type ActionType = "login" | "logout";
            export type EndTime = string;
            export type LoginName = string;
            export type PageNum = number; // int32
            export type PageSize = number; // int32
            export type StartTime = string;
            export type Status = "fail" | "success";
        }
        export interface QueryParameters {
            actionType?: Parameters.ActionType;
            endTime?: Parameters.EndTime;
            loginName?: Parameters.LoginName;
            pageNum: Parameters.PageNum /* int32 */;
            pageSize: Parameters.PageSize /* int32 */;
            startTime?: Parameters.StartTime;
            status?: Parameters.Status;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace QueryUsingPOST31 {
        namespace Parameters {
            export type AppCode = string;
            export type Category = string;
            export type LoginName = string;
            export type Name = string;
            export type PageNum = number; // int32
            export type PageSize = number; // int32
            export type QueryEndTime = string;
            export type QueryStartTime = string;
            export type Status = "fail" | "success";
            export type Type = string;
        }
        export interface QueryParameters {
            category?: Parameters.Category;
            loginName?: Parameters.LoginName;
            name?: Parameters.Name;
            pageNum: Parameters.PageNum /* int32 */;
            pageSize: Parameters.PageSize /* int32 */;
            queryEndTime?: Parameters.QueryEndTime;
            queryStartTime?: Parameters.QueryStartTime;
            status?: Parameters.Status;
            type?: Parameters.Type;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
        export interface UndefinedParameters {
            appCode: Parameters.AppCode;
        }
    }
    namespace QueryUsingPOST39 {
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace QueryUsingPOST47 {
        namespace Parameters {
            export type PageNum = number; // int32
            export type PageSize = number; // int32
        }
        export interface QueryParameters {
            pageNum: Parameters.PageNum /* int32 */;
            pageSize: Parameters.PageSize /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace QueryUsingPOST55 {
        namespace Parameters {
            export type AppUid = string;
        }
        export interface QueryParameters {
            appUid: Parameters.AppUid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace QueryUsingPOST63 {
        namespace Parameters {
            export type Name = string;
            export type PageNum = number; // int32
            export type PageSize = number; // int32
        }
        export interface QueryParameters {
            pageNum?: Parameters.PageNum /* int32 */;
            pageSize?: Parameters.PageSize /* int32 */;
            name?: Parameters.Name;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace QueryUsingPOST7 {
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace QueryUsingPOST71 {
        namespace Parameters {
            export type LoginName = string;
            export type Name = string;
            export type OrderField = string;
            export type OrderType = string;
            export type OrgUid = string;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
        export interface UndefinedParameters {
            loginName?: Parameters.LoginName;
            name?: Parameters.Name;
            orderField?: Parameters.OrderField;
            orderType?: Parameters.OrderType;
            orgUid?: Parameters.OrgUid;
        }
    }
    namespace ReinstallLicenseUsingGET7 {
        namespace Parameters {
            export type Addr = string;
            export type ChangePwd = "n" | "y";
            export type Created = string; // date-time
            export type CreatedBy = string;
            export type DingAuthCode = string;
            export type DingUnionId = string;
            export type Email = string;
            export type Expire = number; // int64
            export type Gender = "female" | "male" | "unknown";
            export type IdNumber = string;
            export type LastLoginTime = string; // date-time
            export type LoginName = string;
            export type Modified = string; // date-time
            export type ModifiedBy = string;
            export type Name = string;
            export type OrgCode = string;
            export type PostCode = string;
            export type PubRedirectUrl = string;
            export type QywxUserId = string;
            export type RedirectUrl = string;
            export type Resources0AppUid = string;
            export type Resources0Code = string;
            export type Resources0Created = string; // date-time
            export type Resources0CreatedBy = string;
            export type Resources0Icon = string;
            export type Resources0Level = number; // int32
            export type Resources0Modified = string; // date-time
            export type Resources0ModifiedBy = string;
            export type Resources0Name = string;
            export type Resources0ParentUid = string;
            export type Resources0Sort = number; // int32
            export type Resources0Status = "del" | "n" | "y";
            export type Resources0Type = "api" | "menu";
            export type Resources0Uid = string;
            export type Resources0Url = string;
            export type Roles0AppUid = string;
            export type Roles0Code = string;
            export type Roles0Created = string; // date-time
            export type Roles0CreatedBy = string;
            export type Roles0Modified = string; // date-time
            export type Roles0ModifiedBy = string;
            export type Roles0Name = string;
            export type Roles0Status = "del" | "n" | "y";
            export type Roles0Type = "normal" | "sys";
            export type Roles0Uid = string;
            export type Sort = number; // int32
            export type Status = "del" | "n" | "y";
            export type SyncOrg = "n" | "y";
            export type SyncUid = string;
            export type SyncUser = "n" | "y";
            export type SyncUserOrg = "n" | "y";
            export type Telephone = string;
            export type Ticket = string;
            export type Type = "admin" | "common";
            export type Uid = string;
            export type UserOrgCodeList = string[];
            export type WxUnionId = string;
        }
        export interface QueryParameters {
            addr?: Parameters.Addr;
            changePwd?: Parameters.ChangePwd;
            created?: Parameters.Created /* date-time */;
            createdBy?: Parameters.CreatedBy;
            dingAuthCode?: Parameters.DingAuthCode;
            dingUnionId?: Parameters.DingUnionId;
            email?: Parameters.Email;
            expire?: Parameters.Expire /* int64 */;
            gender?: Parameters.Gender;
            idNumber?: Parameters.IdNumber;
            lastLoginTime?: Parameters.LastLoginTime /* date-time */;
            loginName?: Parameters.LoginName;
            modified?: Parameters.Modified /* date-time */;
            modifiedBy?: Parameters.ModifiedBy;
            name?: Parameters.Name;
            orgCode?: Parameters.OrgCode;
            postCode?: Parameters.PostCode;
            pubRedirectUrl?: Parameters.PubRedirectUrl;
            qywxUserId?: Parameters.QywxUserId;
            redirectUrl?: Parameters.RedirectUrl;
            "resources[0].appUid"?: Parameters.Resources0AppUid;
            "resources[0].code"?: Parameters.Resources0Code;
            "resources[0].created"?: Parameters.Resources0Created /* date-time */;
            "resources[0].createdBy"?: Parameters.Resources0CreatedBy;
            "resources[0].icon"?: Parameters.Resources0Icon;
            "resources[0].level"?: Parameters.Resources0Level /* int32 */;
            "resources[0].modified"?: Parameters.Resources0Modified /* date-time */;
            "resources[0].modifiedBy"?: Parameters.Resources0ModifiedBy;
            "resources[0].name"?: Parameters.Resources0Name;
            "resources[0].parentUid"?: Parameters.Resources0ParentUid;
            "resources[0].sort"?: Parameters.Resources0Sort /* int32 */;
            "resources[0].status"?: Parameters.Resources0Status;
            "resources[0].type"?: Parameters.Resources0Type;
            "resources[0].uid"?: Parameters.Resources0Uid;
            "resources[0].url"?: Parameters.Resources0Url;
            "roles[0].appUid"?: Parameters.Roles0AppUid;
            "roles[0].code"?: Parameters.Roles0Code;
            "roles[0].created"?: Parameters.Roles0Created /* date-time */;
            "roles[0].createdBy"?: Parameters.Roles0CreatedBy;
            "roles[0].modified"?: Parameters.Roles0Modified /* date-time */;
            "roles[0].modifiedBy"?: Parameters.Roles0ModifiedBy;
            "roles[0].name"?: Parameters.Roles0Name;
            "roles[0].status"?: Parameters.Roles0Status;
            "roles[0].type"?: Parameters.Roles0Type;
            "roles[0].uid"?: Parameters.Roles0Uid;
            sort?: Parameters.Sort /* int32 */;
            status?: Parameters.Status;
            syncOrg?: Parameters.SyncOrg;
            syncUid?: Parameters.SyncUid;
            syncUser?: Parameters.SyncUser;
            syncUserOrg?: Parameters.SyncUserOrg;
            telephone?: Parameters.Telephone;
            ticket?: Parameters.Ticket;
            type?: Parameters.Type;
            uid?: Parameters.Uid;
            userOrgCodeList?: Parameters.UserOrgCodeList;
            wxUnionId?: Parameters.WxUnionId;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace RemoveUsingPOST15 {
        namespace Parameters {
            export type Uid = string;
        }
        export interface QueryParameters {
            uid: Parameters.Uid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace RemoveUsingPOST23 {
        namespace Parameters {
            export type Uid = string;
        }
        export interface QueryParameters {
            uid: Parameters.Uid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace RemoveUsingPOST31 {
        namespace Parameters {
            export type Uid = string;
        }
        export interface QueryParameters {
            uid: Parameters.Uid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace RemoveUsingPOST39 {
        namespace Parameters {
            export type Uid = string;
        }
        export interface QueryParameters {
            uid: Parameters.Uid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace RemoveUsingPOST47 {
        namespace Parameters {
            export type Uid = string;
        }
        export interface QueryParameters {
            uid: Parameters.Uid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace RemoveUsingPOST55 {
        namespace Parameters {
            export type Uid = string;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
        export interface UndefinedParameters {
            uid: Parameters.Uid;
        }
    }
    namespace RemoveUsingPOST7 {
        namespace Parameters {
            export type Uid = string;
        }
        export interface QueryParameters {
            uid: Parameters.Uid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace RoleLinkUsingPOST7 {
        namespace Parameters {
            export type RoleUidList0 = string;
            export type Uid = string;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
        export interface UndefinedParameters {
            "roleUidList[0]": Parameters.RoleUidList0;
            uid: Parameters.Uid;
        }
    }
    namespace RolePemessionUsingPOST7 {
        namespace Parameters {
            export type RoleUid = string;
        }
        export interface QueryParameters {
            roleUid: Parameters.RoleUid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace SaleBasicCountUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace SaveCommonUsingPOST7 {
        namespace Parameters {
            export type Addr = string;
            export type Email = string;
            export type Gender = string;
            export type IdNumber = string;
            export type LoginName = string;
            export type Name = string;
            export type OrgUid = string;
            export type Password = string;
            export type Telephone = string;
            export type Type = string;
        }
        export interface QueryParameters {
            password?: Parameters.Password;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
        export interface UndefinedParameters {
            addr?: Parameters.Addr;
            email?: Parameters.Email;
            gender?: Parameters.Gender;
            idNumber?: Parameters.IdNumber;
            loginName: Parameters.LoginName;
            name: Parameters.Name;
            orgUid: Parameters.OrgUid;
            telephone: Parameters.Telephone;
            type: Parameters.Type;
        }
    }
    namespace SaveUsingPOST15 {
        namespace Parameters {
            export type CategoryUid = string;
            export type Code = string;
            export type Name = string;
            export type Sort = number; // int32
            export type Uid = string;
        }
        export interface QueryParameters {
            categoryUid: Parameters.CategoryUid;
            code: Parameters.Code;
            name: Parameters.Name;
            sort: Parameters.Sort /* int32 */;
            uid?: Parameters.Uid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace SaveUsingPOST23 {
        namespace Parameters {
            export type Code = string;
            export type DicCode = string;
            export type Name = string;
            export type ParentUid = string;
            export type Sort = string;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
        export interface UndefinedParameters {
            code: Parameters.Code;
            dicCode: Parameters.DicCode;
            name: Parameters.Name;
            parentUid: Parameters.ParentUid;
            sort: Parameters.Sort;
        }
    }
    namespace SaveUsingPOST31 {
        namespace Parameters {
            export type Code = string;
            export type Name = string;
            export type Sort = string;
            export type Status = "del" | "n" | "y";
            export type Uid = string;
        }
        export interface QueryParameters {
            code: Parameters.Code;
            name: Parameters.Name;
            sort: Parameters.Sort;
            status?: Parameters.Status;
            uid?: Parameters.Uid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace SaveUsingPOST39 {
        namespace Parameters {
            export type Code = string;
            export type Icon = string;
            export type Level = number; // int32
            export type Name = string;
            export type ParentUid = string;
            export type Sort = number; // int32
            export type Type = "api" | "menu";
            export type Uid = string;
            export type Url = string;
        }
        export interface QueryParameters {
            code?: Parameters.Code;
            icon?: Parameters.Icon;
            level?: Parameters.Level /* int32 */;
            name?: Parameters.Name;
            parentUid?: Parameters.ParentUid;
            sort?: Parameters.Sort /* int32 */;
            type: Parameters.Type;
            uid?: Parameters.Uid;
            url?: Parameters.Url;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace SaveUsingPOST47 {
        namespace Parameters {
            export type AppUid = string;
            export type Code = string;
            export type Name = string;
            export type RoleType = "normal" | "sys";
            export type Status = "del" | "n" | "y";
            export type Uid = string;
        }
        export interface QueryParameters {
            appUid?: Parameters.AppUid;
            code: Parameters.Code;
            name: Parameters.Name;
            roleType: Parameters.RoleType;
            status?: Parameters.Status;
            uid?: Parameters.Uid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace SaveUsingPOST55 {
        namespace Parameters {
            export type Addr = string;
            export type Email = string;
            export type Gender = string;
            export type GroupUidList = string;
            export type IdNumber = string;
            export type LoginName = string;
            export type Name = string;
            export type OrgUid = string;
            export type Password = string;
            export type Telephone = string;
            export type Type = string;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
        export interface UndefinedParameters {
            addr?: Parameters.Addr;
            email?: Parameters.Email;
            gender?: Parameters.Gender;
            groupUidList?: Parameters.GroupUidList;
            idNumber?: Parameters.IdNumber;
            loginName: Parameters.LoginName;
            name: Parameters.Name;
            orgUid: Parameters.OrgUid;
            password: Parameters.Password;
            telephone: Parameters.Telephone;
            type: Parameters.Type;
        }
    }
    namespace SaveUsingPOST7 {
        namespace Parameters {
            export type Code = string;
            export type Name = string;
            export type Sort = number; // int32
            export type Uid = string;
        }
        export interface QueryParameters {
            code: Parameters.Code;
            name: Parameters.Name;
            sort: Parameters.Sort /* int32 */;
            uid?: Parameters.Uid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace UnbindingDingUsingPOST7 {
        namespace Parameters {
            export type UserUid = string;
        }
        export interface QueryParameters {
            userUid: Parameters.UserUid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace UpdatePwByAdminUsingPOST7 {
        namespace Parameters {
            export type NewPassword = string;
            export type UserUid = string;
        }
        export interface QueryParameters {
            newPassword: Parameters.NewPassword;
            userUid: Parameters.UserUid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace UpdateRolePemessionUsingPOST7 {
        namespace Parameters {
            export type AppCode = string;
            export type DeleteRoles = string[];
            export type Uid = string;
            export type Uids = string;
        }
        export interface QueryParameters {
            appCode?: Parameters.AppCode;
            deleteRoles?: Parameters.DeleteRoles;
            uid: Parameters.Uid;
            uids: Parameters.Uids;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace UpdateUserPasswordUsingPOST7 {
        namespace Parameters {
            export type NewPassword = string;
        }
        export interface QueryParameters {
            newPassword?: Parameters.NewPassword;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace UpdateUserRoleUsingPOST7 {
        namespace Parameters {
            export type AppCode = string;
            export type DeleteRoles = string[];
            export type Uid = string;
            export type Uids = string;
        }
        export interface QueryParameters {
            appCode?: Parameters.AppCode;
            deleteRoles?: Parameters.DeleteRoles;
            uid: Parameters.Uid;
            uids: Parameters.Uids;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace UpdateUsingPOST15 {
        namespace Parameters {
            export type CategoryUid = string;
            export type Code = string;
            export type Name = string;
            export type Sort = number; // int32
            export type Uid = string;
        }
        export interface QueryParameters {
            categoryUid: Parameters.CategoryUid;
            code?: Parameters.Code;
            name?: Parameters.Name;
            sort: Parameters.Sort /* int32 */;
            uid: Parameters.Uid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace UpdateUsingPOST23 {
        namespace Parameters {
            export type Code = string;
            export type DicCode = string;
            export type Name = string;
            export type Owner = string;
            export type ParentUid = string;
            export type Sort = string;
            export type Uid = string;
            export type UserName = string;
        }
        export interface QueryParameters {
            code: Parameters.Code;
            dicCode: Parameters.DicCode;
            name: Parameters.Name;
            owner?: Parameters.Owner;
            parentUid: Parameters.ParentUid;
            sort: Parameters.Sort;
            uid: Parameters.Uid;
            userName?: Parameters.UserName;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace UpdateUsingPOST31 {
        namespace Parameters {
            export type Code = string;
            export type Name = string;
            export type Sort = string;
            export type Status = "del" | "n" | "y";
            export type Uid = string;
        }
        export interface QueryParameters {
            code: Parameters.Code;
            name: Parameters.Name;
            sort: Parameters.Sort;
            status?: Parameters.Status;
            uid: Parameters.Uid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace UpdateUsingPOST39 {
        namespace Parameters {
            export type Code = string;
            export type Icon = string;
            export type Level = number; // int32
            export type Name = string;
            export type ParentUid = string;
            export type Sort = number; // int32
            export type Type = "api" | "menu";
            export type Uid = string;
            export type Url = string;
        }
        export interface QueryParameters {
            code?: Parameters.Code;
            icon?: Parameters.Icon;
            level?: Parameters.Level /* int32 */;
            name?: Parameters.Name;
            parentUid?: Parameters.ParentUid;
            sort?: Parameters.Sort /* int32 */;
            type: Parameters.Type;
            uid?: Parameters.Uid;
            url?: Parameters.Url;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace UpdateUsingPOST47 {
        namespace Parameters {
            export type AppUid = string;
            export type Code = number; // int64
            export type Name = string;
            export type RoleType = "normal" | "sys";
            export type Status = "del" | "n" | "y";
            export type Uid = string;
        }
        export interface QueryParameters {
            appUid?: Parameters.AppUid;
            code: Parameters.Code /* int64 */;
            name: Parameters.Name;
            roleType: Parameters.RoleType;
            status?: Parameters.Status;
            uid: Parameters.Uid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace UpdateUsingPOST55 {
        namespace Parameters {
            export type Addr = string;
            export type Email = string;
            export type Gender = string;
            export type IdNumber = string;
            export type Name = string;
            export type Telephone = string;
            export type Type = string;
            export type Uid = string;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
        export interface UndefinedParameters {
            addr?: Parameters.Addr;
            email?: Parameters.Email;
            gender?: Parameters.Gender;
            idNumber?: Parameters.IdNumber;
            name: Parameters.Name;
            telephone: Parameters.Telephone;
            type: Parameters.Type;
            uid: Parameters.Uid;
        }
    }
    namespace UpdateUsingPOST7 {
        namespace Parameters {
            export type Code = string;
            export type Name = string;
            export type Sort = number; // int32
            export type Uid = string;
        }
        export interface QueryParameters {
            code?: Parameters.Code;
            name?: Parameters.Name;
            sort: Parameters.Sort /* int32 */;
            uid: Parameters.Uid;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace UploadLicenseUsingPOST7 {
        namespace Parameters {
            export type Addr = string;
            export type ChangePwd = "n" | "y";
            export type Created = string; // date-time
            export type CreatedBy = string;
            export type DingAuthCode = string;
            export type DingUnionId = string;
            export type Email = string;
            export type Expire = number; // int64
            export type Gender = "female" | "male" | "unknown";
            export type IdNumber = string;
            export type LastLoginTime = string; // date-time
            export type LoginName = string;
            export type Modified = string; // date-time
            export type ModifiedBy = string;
            export type Name = string;
            export type OrgCode = string;
            export type PostCode = string;
            export type PubRedirectUrl = string;
            export type QywxUserId = string;
            export type RedirectUrl = string;
            export type Resources0AppUid = string;
            export type Resources0Code = string;
            export type Resources0Created = string; // date-time
            export type Resources0CreatedBy = string;
            export type Resources0Icon = string;
            export type Resources0Level = number; // int32
            export type Resources0Modified = string; // date-time
            export type Resources0ModifiedBy = string;
            export type Resources0Name = string;
            export type Resources0ParentUid = string;
            export type Resources0Sort = number; // int32
            export type Resources0Status = "del" | "n" | "y";
            export type Resources0Type = "api" | "menu";
            export type Resources0Uid = string;
            export type Resources0Url = string;
            export type Roles0AppUid = string;
            export type Roles0Code = string;
            export type Roles0Created = string; // date-time
            export type Roles0CreatedBy = string;
            export type Roles0Modified = string; // date-time
            export type Roles0ModifiedBy = string;
            export type Roles0Name = string;
            export type Roles0Status = "del" | "n" | "y";
            export type Roles0Type = "normal" | "sys";
            export type Roles0Uid = string;
            export type Sort = number; // int32
            export type Status = "del" | "n" | "y";
            export type SyncOrg = "n" | "y";
            export type SyncUid = string;
            export type SyncUser = "n" | "y";
            export type SyncUserOrg = "n" | "y";
            export type Telephone = string;
            export type Ticket = string;
            export type Type = "admin" | "common";
            export type Uid = string;
            export type UserOrgCodeList = string[];
            export type WxUnionId = string;
        }
        export interface QueryParameters {
            addr?: Parameters.Addr;
            changePwd?: Parameters.ChangePwd;
            created?: Parameters.Created /* date-time */;
            createdBy?: Parameters.CreatedBy;
            dingAuthCode?: Parameters.DingAuthCode;
            dingUnionId?: Parameters.DingUnionId;
            email?: Parameters.Email;
            expire?: Parameters.Expire /* int64 */;
            gender?: Parameters.Gender;
            idNumber?: Parameters.IdNumber;
            lastLoginTime?: Parameters.LastLoginTime /* date-time */;
            loginName?: Parameters.LoginName;
            modified?: Parameters.Modified /* date-time */;
            modifiedBy?: Parameters.ModifiedBy;
            name?: Parameters.Name;
            orgCode?: Parameters.OrgCode;
            postCode?: Parameters.PostCode;
            pubRedirectUrl?: Parameters.PubRedirectUrl;
            qywxUserId?: Parameters.QywxUserId;
            redirectUrl?: Parameters.RedirectUrl;
            "resources[0].appUid"?: Parameters.Resources0AppUid;
            "resources[0].code"?: Parameters.Resources0Code;
            "resources[0].created"?: Parameters.Resources0Created /* date-time */;
            "resources[0].createdBy"?: Parameters.Resources0CreatedBy;
            "resources[0].icon"?: Parameters.Resources0Icon;
            "resources[0].level"?: Parameters.Resources0Level /* int32 */;
            "resources[0].modified"?: Parameters.Resources0Modified /* date-time */;
            "resources[0].modifiedBy"?: Parameters.Resources0ModifiedBy;
            "resources[0].name"?: Parameters.Resources0Name;
            "resources[0].parentUid"?: Parameters.Resources0ParentUid;
            "resources[0].sort"?: Parameters.Resources0Sort /* int32 */;
            "resources[0].status"?: Parameters.Resources0Status;
            "resources[0].type"?: Parameters.Resources0Type;
            "resources[0].uid"?: Parameters.Resources0Uid;
            "resources[0].url"?: Parameters.Resources0Url;
            "roles[0].appUid"?: Parameters.Roles0AppUid;
            "roles[0].code"?: Parameters.Roles0Code;
            "roles[0].created"?: Parameters.Roles0Created /* date-time */;
            "roles[0].createdBy"?: Parameters.Roles0CreatedBy;
            "roles[0].modified"?: Parameters.Roles0Modified /* date-time */;
            "roles[0].modifiedBy"?: Parameters.Roles0ModifiedBy;
            "roles[0].name"?: Parameters.Roles0Name;
            "roles[0].status"?: Parameters.Roles0Status;
            "roles[0].type"?: Parameters.Roles0Type;
            "roles[0].uid"?: Parameters.Roles0Uid;
            sort?: Parameters.Sort /* int32 */;
            status?: Parameters.Status;
            syncOrg?: Parameters.SyncOrg;
            syncUid?: Parameters.SyncUid;
            syncUser?: Parameters.SyncUser;
            syncUserOrg?: Parameters.SyncUserOrg;
            telephone?: Parameters.Telephone;
            ticket?: Parameters.Ticket;
            type?: Parameters.Type;
            uid?: Parameters.Uid;
            userOrgCodeList?: Parameters.UserOrgCodeList;
            wxUnionId?: Parameters.WxUnionId;
        }
        export type RequestBody = string; // binary
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace VegetableCultivationUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace VegetablePublicServiceUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace VegetableYearDroughtUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace VegetableYearSaleUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace VegetableYearWeatherUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace VegetableYearYieldPredictUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace VerifyUsingGET7 {
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace YearVegetableTrendUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
    namespace YieldCountUsingPOST7 {
        namespace Parameters {
            export type ContentPath = string;
            export type Day = number; // int32
            export type Month = number; // int32
            export type Type = string;
            export type Year = number; // int32
        }
        export interface QueryParameters {
            contentPath?: Parameters.ContentPath;
            day?: Parameters.Day /* int32 */;
            month?: Parameters.Month /* int32 */;
            type?: Parameters.Type;
            year?: Parameters.Year /* int32 */;
        }
        namespace Responses {
            export interface $204 {
            }
            export interface $401 {
            }
            export interface $403 {
            }
        }
    }
}
