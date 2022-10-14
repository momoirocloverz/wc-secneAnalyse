/**
 * Created by ArvinChen9539 on 2019/3/13.
 */
import * as socket from '@/util/socket';
import _ from 'lodash'
import {envData} from '@/util';
import {ticketUtil, goto} from 'sso2-access-util';
import {Notification} from 'element-ui';

const {logout} = goto;

//接受消息时的回调
let callBacks:any;

//发送消息时的回调,发送频率
let sendCalls:any, sendTime:any;
//发送频率
const sendFrequency:number = 30000;

//socket实例
let socketClient:any;

/**
 * 初始化socket实例
 * @param cb 打开连接时的回调
 */
//
// console.log(window.location)
const initConnect = function (cb?:Function){
    socketClient = socket.init(`${window.location.protocol === 'https:'? 'wss':'ws'}://${window.location.host}${envData.VUE_APP_SERVICE_PATH_WS}/socketService/${ticketUtil.ticket() || '77f06c31656d469583e0aa308294bed0'}`, {
        onOpen() {
            if (!callBacks) {
                callBacks = {};
            }

            if (cb) {
                cb();
            }

            sendAll();
            sendTime = setInterval(() => {
                sendAll()
            }, sendFrequency);
        },
        onMessage(data) {
            // console.log(data)//接口返回的数据
            if(typeof data === 'string'){
                data = eval('(' +data + ')')
            }
            try {
                if (data.status === 200) {
                    let call = callBacks[data.data.key];
                    if (call) {
                        call(data.data)
                    }
                } else if (data.status === 401) {
                    logout(window.location.href);
                } else {
                    console.log(data)
                    // @ts-ignore
                    Notification.error({title: data.message+'：'+data.data.data});
                }
            } catch (e) {
                console.error(e)
                // @ts-ignore
                Notification.error({title: '数据异常'});
            }
        },
        onClose() {
            callBacks = null;
        }
    });
};

const sendAll = function () {
    _.each(sendCalls, (item, key:string) => {
        if (item) {
            send(key, item());
        } else {
            send(key);
        }
    });
};

/**
 * 添加回调函数
 * @param key 数据key
 * @param cb 函数
 */
const addCallBack = function (key:string, cb:Function) {
    //关闭连接时清空了callBacks,可能会存在为空的情况
    if (!callBacks) {
        callBacks = {};
    }
    callBacks[key] = cb;
};

/**
 * 清除某个回调
 * @param key
 */
const delCallBack = function (key:string) {
    if (!callBacks) {
        return;
    }
    delete callBacks[key];
};

/**
 * 添加发送信息的回调
 * @param key
 * @param cb
 */
const addSend = function (key:string, cb:Function) {
    if (!sendCalls) {
        sendCalls = {};
    }
    sendCalls[key] = cb;

};

/**
 * 删除发送消息时的回调
 * @param key
 */
const delSend = function (key:string) {
    if (!sendCalls) {
        return;
    }
    delete sendCalls[key];
};


/**
 * 发送信息
 * @param key 发送key
 * @param data 发送的数据
 */
const send = function (key:string, data?:any) {
    let params:any = {
        contentPath: key,
        ...data
    };
    // console.log(params)//接口传参
    socketClient.send(JSON.stringify(params));
};

/**
 * 关闭连接
 */
const close = function () {
    if (socketClient) {
        clearInterval(sendTime);
        callBacks = null;
        socketClient.close();
        socketClient = null;
    }
};
export {
    initConnect,
    addCallBack,
    delCallBack,
    addSend,
    delSend,
    send,
    close,
    sendAll
}
