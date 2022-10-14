import {ElLoadingComponent} from "element-ui/types/loading";

/**
 * 扩展axios的类型
 */
declare module 'axios' {
    type loadOption = {
        //是否显示全屏遮罩
        fullLoading?:boolean
        //是否不使用加载效果(包括顶部进度条)
        noLoading?:boolean
        //全屏或传入dom时的提示语
        msg?:string,
        //传入dom对象请求接口时自动增加遮罩动画
        el?:Element|HTMLElement
    }
    interface AxiosRequestConfig {
        //请求地址
        url?:string
        //请求参数
        data?:any
        //是否字符串数组
        strArray?:boolean
        load?:loadOption,
        //不使用系统自带的返回控制(如登录超时返回登录页,异常自动显示提示等功能)
        notProcessed?:boolean,
        //请求头配置
        headers?:any
        //是否使用上传接口配置
        isUpload?:boolean,
        //loading实例
        loadingInstance?:ElLoadingComponent,
        loadTimeout?:number|NodeJS.Timeout,
        fileKey?:string
    }
}
