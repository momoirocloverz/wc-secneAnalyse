/**
 * Created by ArvinChen9539 on 2019/2/18.
 */
import {initEnv, traversingTree} from 'pp-js-util';
import {Vue} from 'vue-property-decorator';
import _ from 'lodash';
import {setting} from "sso2-access-util";
import {setConfig, verify} from 'pp-product-verify'
import printJS from 'print-js';

//统一用到的配置数据
const envData: {
    VUE_APP_SERVICE_PATH: string
    VUE_APP_SERVICE_PATH_WS: string
} = initEnv(process.env);

//todo 暂时使用这个控件完成截取地址栏令牌的功能
setting({
    ssoLoginUrl: '',
    ssoServiceUrl: '',
    appCode: '',
}, {
    ssoLoginUrl: '',
    ssoServiceUrl: '',
    appCode: '',
}, {
    isVerify: false
});
setConfig({
    servicePath: envData.VUE_APP_SERVICE_PATH
})
//产品校验
verify().then()

const findComponentsDownward = function (context: Vue, componentName: string): Vue[] {
    return context.$children.reduce((components: Vue[], child: Vue) => {
        if (child.$options.name === componentName) components.push(child);
        const foundChilds = findComponentsDownward(child, componentName);
        return components.concat(foundChilds);
    }, []);
};

const findComponentUpward = function (context: Vue, componentName: string | string[]): any {
    let componentNames: string[];
    if (typeof componentName === 'string') {
        componentNames = [componentName];
    } else {
        componentNames = componentName;
    }

    let parent = context.$parent;
    let name = parent.$options.name;
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
        parent = parent.$parent;
        if (parent) name = parent.$options.name;
    }
    return parent;
};

/**
 * 获取单个实例
 */
const getInstance = function <T>(fn: Function) {
    let result: any;
    return function (...params: any[]): T {
        //首个参数为null时释放资源
        if (arguments[0] === null) {
            result = null
            return result;
        }
        //@ts-ignore
        let that: any = this;
        return result || (result = fn.apply(that, arguments));
    }
};


const readAsDataURL = function (file: File, cb: Function) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (e: any) {
        if (cb) {
            cb(this.result, e.target.result);
        }

    }
};

/**
 * 转换数字为逗号隔开的格式
 * @param num 数字
 * @param n 保留小数位数 默认2
 */
function numFormatMoney(num: string | number, n: number = 2) {
    //存在逗号时直接返回元数据
    if (num && (num + '').indexOf(',') !== -1) {
        return num;
    }
    num = _.toNumber(num + '')
    num = num.toFixed(n);
    num = parseFloat(num)
    num = num.toLocaleString();
    return num;
}

/**
 * 数字加载动效
 * @param obj
 * @param end 需要滚动到的数字
 * @param duration 动画持续时间 默认1s
 * @param isThousandth 是否显示千分位 默认不显示
 * @param decimal 是否保留两位小数 默认不保留
 */
const animateValue = function animateValue(obj: any, end: number, duration?: number,isThousandth?:boolean,decimal?:boolean) {
    if (!obj) {
        return
    }
    let durations = duration ? duration : 600
    let startTimestamp: any = null;
    const step = (timestamp: any) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / durations, 1);
        if(!decimal) {
            if(isThousandth){
                obj.innerHTML = Number(Math.floor(progress * (end - 0) + 0)).toLocaleString();
            }else {
                obj.innerHTML = Math.floor(progress * (end - 0) + 0);
            }
        }else{
            if(isThousandth){
                obj.innerHTML = Number(Number(progress * (end - 0) + 0).toFixed(2)).toLocaleString();
            }else {
                obj.innerHTML = Number(progress * (end - 0) + 0).toFixed(2);
            }
        }


        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

const printdiv = function (printpage: any, type: printJS.PrintTypes = 'image', title = '') {
    printJS({
        printable: printpage,
        type,
        maxWidth: 1000,
        honorColor: true,
        // 继承原来的所有样式
        targetStyles: ['*'],
        documentTitle: '',
        font_size: ''
    })
}

/**
 * 姓名脱敏
 * @param str 传入的姓名
 */
const noPassByName = function noPassByName(str: string){
    if(str){
        if(str.length==2){
            return str.substring(0,1)+'*' //截取name 字符串截取第一个字符，
        }else if(str.length==3){
            return str.substring(0,1)+"*"+str.substring(2,3)//截取第一个和第三个字符
        }else if(str.length>3){
            return str.substring(0,1)+"*"+'*'+str.substring(3,str.length)//截取第一个和大于第4个字符
        }
    } else {
        return "";
    }
}

export {
    findComponentsDownward,
    findComponentUpward,
    readAsDataURL,
    traversingTree,
    envData,
    getInstance,
    numFormatMoney,
    printdiv,
    animateValue,
    noPassByName
}
