/**
 * Created by ArvinChen9539 on 2019/2/27.
 * 令牌工具
 */
import * as cookie from 'tiny-cookie'

if (!cookie.isEnabled()) {
    console.error('浏览器居然还不支持cookie!部分功能可能出现意料之外的错误ヾ(｡ꏿ﹏ꏿ)ﾉﾞ');
}
let key = 'ticket';

/**
 * 设置和获取ticket
 * @param ticket
 * @return {string}
 */
const ticket = function (ticket?: string): any {
    if (ticket === undefined) {
        return cookie.get(key) || '';
    } else {
        cookie.set(key, ticket, {path: ""});
    }
};

/**
 * 清除ticket
 */
const clearTicket = function () {
    cookie.remove(key, {path: ""});
};

/**
 * 设置保存令牌的key名
 * @param k
 */
const setKey = function (k: string) {
    key = k;
};

/**
 * 获取令牌的key名
 * @return {string}
 */
const getKey = function (): string {
    return key;
};

export {
    ticket,
    clearTicket,
    setKey,
    getKey
}