/**
 * Created by ArvinChen9539 on 2017/12/8.
 */

import NProgress from 'nprogress'
import 'nprogress/nprogress.css';

import {Loading, Notification} from 'element-ui'
import qs from 'qs'
import {traverseArray} from 'pp-js-util'
import {envData} from './index'
import store from '@/store'
import * as ticketUtil from './ticket'

import {AxiosInstance, AxiosResponse} from 'axios'


const apiConfig = {
    servicePath: envData.VUE_APP_SERVICE_PATH,
    ticket: ticketUtil.ticket
}

const setInterceptors = (instance: AxiosInstance) => {
    if (!instance) {
        return;
    }
    // 添加请求拦截器
    instance.interceptors.request.use((config) => {
        //设置统一令牌
        config.headers.common['ticket'] = apiConfig.ticket();

        //上传判断
        if (config.isUpload) {
            config.headers['Content-Type'] = 'multipart/form-data';
            config.headers['processData'] = false;

            //修复上传文件时不能传输复杂类型的问题
            config.data = traverseArray(config.data, true);

            let fd = new FormData();
            for (let key of Object.keys(config.data)) {
                let val = config.data[key];
                if (val === null) {
                    break;
                }
                if (Array.isArray(val)) {
                    for (let item of val) {
                        fd.append(key, item);
                    }
                } else {
                    fd.append(key, val);
                }
            }

            fd.append('ticket', apiConfig.ticket());

            config.data = fd;
        } else {
            //修复application/json传参的问题
            if (config.headers['Content-Type'] !== 'application/json') {
                //allowDots:转换复杂类型对象; strArray:是否纯字符串数组,暂时不要混合复杂类型和纯数组提交;
                config.data = qs.stringify(config.data, {
                    allowDots: true,
                    arrayFormat: config.strArray ? 'brackets' : undefined
                });
            }
        }

        // 在发送请求之前做些什么
        if (!config.load) {
            config.load = {}
        }
        if (!config.load.noLoading) {
            let loadConfig = config.load;

            if (loadConfig.fullLoading) {//全屏遮罩
                config.loadingInstance = Loading.service({
                    fullscreen: true,
                    text: loadConfig.msg || '正在加载...'
                });
            } else {
                //延迟启动,如果等待时间过短不启动动画
                config.loadTimeout = setTimeout(() => {
                    if (loadConfig.el) {
                        config.loadingInstance = Loading.service({
                            target: (<HTMLElement>loadConfig.el),
                            text: loadConfig.msg || '正在加载...'
                        });
                    } else {
                        NProgress.start();
                    }
                }, 500)
            }

        }
        return config;
    }, function (error) {
        hideLoad(error);
        // 对请求错误做些什么
        return Promise.reject(error);
    });

    //正常响应回调
    async function responseCallBack(response: AxiosResponse, data: any, resolve: Function, reject: Function) {
        if (data.status === 200) {
            resolve(data);
        } else if (data.status === 1000 || data.status === 1001 || data.status === 401) {
            //不做处理
            if (!response.config.notProcessed) {
                await store.dispatch('logout')
            }
            reject(data)
            //} else if(data.status === 444){
            //todo 证书过期

        } else {
            //不做处理
            if (!response.config.notProcessed) {
                Notification.error({
                    title: '操作失败',
                    message: data.message ? data.message : undefined
                });
            }
            reject(data)
        }
    }

// 添加响应拦截器
    instance.interceptors.response.use(function (response: any) {
        // 对响应数据做点什么
        hideLoad(response);

        let data = response.data || {};
        return new Promise(function (resolve, reject) {
            //下载文件,当blob类型为application/json时认为返回失败,解析成json按照正常逻辑处理
            if (data.toString() === "[object Blob]") {
                if (data.type === "application/json") {
                    //将blob转成json
                    let reader = new FileReader();
                    reader.onload = function (e: any) {
                        responseCallBack(response, JSON.parse(e.target.result), resolve, reject)
                    }
                    reader.readAsText(data)
                } else {
                    //下载文件时返回整个response
                    downloadFile(response);
                    resolve(response);
                }
            } else {
                responseCallBack(response, data, resolve, reject)
            }
        });
    }, function (error: any) {
        hideLoad(error);
        let data = error.data || {};
        //不做处理
        if (!error.config || !error.config.notProcessed) {
            // 对响应错误做点什么
            Notification.error({
                title: '服务异常',
                message: data.message ? data.message : undefined
            });
        }
        return Promise.reject(error);
    });
}

let hideLoad = (response: any) => {
    let config = response.config;
    config = Object.assign({load: {}}, config);
    //当请求关闭加载显示时不取消加载动画,修复隐藏重复执行的接口关闭动画的问题
    if (config.load.noLoading) {
        return;
    }
    if (config.loadingInstance && typeof config.loadingInstance.close === "function") {
        config.loadingInstance.close()
    }
    if (config.loadTimeout) {
        clearTimeout(config.loadTimeout);
    }
    NProgress.done();
};

/**
 * blob下载（兼容IE）
 * @param  response
 */
function downloadFile(response: any) {
    let content: Blob
    const filename = decodeURI(escape(response.headers['content-disposition'].split('filename=')[1]))
    if ('download' in document.createElement('a')) {
        content = response.data
    } else {
        Notification.error('浏览器不支持');
        return;
    }
    const blob = new Blob([content]);
    // IE
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename)
    } else {
        downloadByA(window.URL.createObjectURL(blob), filename)
    }
}

/**
 * 通过a标签模拟下载
 * @param {String} href
 * @param {String} filename
 */
function downloadByA(href: string, filename: string) {
    const a = document.createElement('a')
    a.download = filename
    a.style.display = 'none'
    a.href = href
    document.body.appendChild(a)
    a.click()
    a.remove()
    window.URL.revokeObjectURL(href)
}


const options = {
    servicePath: process.env.VUE_APP_SERVICE_PATH,
    ticket: ticketUtil.ticket
}

/**
 * 通用文件下载,不支持参数为文件
 * @param url 下载的接口地址
 * @param data 参数
 * @param method 方式
 * @param target 跳转方式(和a标签一致)
 */
const ajaxDownload = function (url: string, data: any = {}, method?: string, target?: string) {
    url = options.servicePath + url;
    data = Object.assign(true, {ticket: options.ticket()}, data);
    let delKeys: any = [];
    for (let index of Object.keys(data)) {
        let item: any = data[index];
        if (item == undefined || item == 'undefined') {
            delKeys.push(index);
        }
        if (Array.isArray(item)) {
            data[index] = item.join(',')
        }
    }
    for (let item of delKeys) {
        delete data[item];
    }
    // 获取url和data
    if (url && data) {
        // 把参数组装成 form的 input
        let inputs = '';
        for (let key of Object.keys(data)) {
            let value = data[key];
            if (!Array.isArray(value)) {
                inputs += `<input type="hidden" name="${key}" value="${value}" />`;
            } else {
                // 数组
                for (let [index, item] of value.entries()) {
                    if (Array.isArray(item)) {
                        inputs += `<input type="hidden" name="${key}[]" value="${item}" />`;
                    } else {
                        if (!item) {
                            continue
                        }
                        for (let sKey of Object.keys(item)) {
                            let sValue = item[sKey];
                            inputs += `<input type="hidden" name="${key}[${index}].${sKey}" value="${sValue}" />`;
                        }
                    }
                }
            }
        }
        // request发送请求
        const formEle: HTMLFormElement = document.createElement('form');
        formEle.innerHTML = inputs;
        formEle.action = url;
        formEle.method = method || 'post';
        formEle.target = target || '_target';
        document.body.appendChild(formEle);
        formEle.submit();
        formEle.remove();
    }
};


export {
    setInterceptors,
    ajaxDownload
}
