/**
 * Created by ArvinChen9539 on 2019/7/22.
 * 简单封装webSocket的创建
 */
interface options {
    onOpen?():void,
    onMessage?(data:any):void,
    onClose?():void,
    onError?():void
}
const init = function (url:string, options:options = {}) {
    if (typeof(WebSocket) == "undefined") {
        console.error("您的浏览器不支持WebSocket");
    } else {
        const socket = new WebSocket(url);
        //打开连接事件
        socket.onopen = function () {
            if (options.onOpen) {
                options.onOpen.bind(socket)();
            }
        };
        //获得消息事件
        socket.onmessage = function (msg) {
            if (options.onMessage) {
                try {
                    options.onMessage.bind(socket)(JSON.parse(msg.data));
                }catch (e) {
                    options.onMessage.bind(socket)(msg.data);
                }
            }
        };
        //关闭连接事件
        socket.onclose = function () {
            if (options.onClose) {
                options.onClose.bind(socket)();
            }
        };
        //发生了错误事件
        socket.onerror = function () {
            console.error("Socket发生了错误");
            //todo 统一提示信息
            if (options.onError) {
                options.onError.bind(socket)();
            }
        };
        return socket;
    }
};
//socket.send('发送给服务端的信息');
//socket.close();关闭连接

export {
    init
}