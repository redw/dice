var Net;
(function (Net) {
    var eventDisPatcher;
    var httpConnect;
    var socketConnect;
    var test;
    function boot(obj, httpBack, socketBack, context) {
        eventDisPatcher = new egret.EventDispatcher();
        test = obj.test;
        var httpHost = obj.h_host;
        var socketHost = obj.s_host;
        var token = obj.token;
        httpConnect = new HttpConnect(httpHost, token, httpBack, context);
        socketConnect = new SocketConnect(socketHost, token, socketBack, context);
    }
    Net.boot = boot;
    /**
     * 发送http请求
     * @param req       请求信息    命令或 {cmd:命令, key:value}
     * @param backFun   回调函数
     * @param context   回调函数上下文
     * @param method    请求方式    小写get/post
     */
    function sendHMessage(req, backFun, context, method) {
        if (method === void 0) { method = "get"; }
        if (true) {
            console.log("%c[http]", "color: #e5bd9c", Date.now(), ":", req);
        }
        httpConnect.send(req, backFun, context, method);
    }
    Net.sendHMessage = sendHMessage;
    /**
     * 发送socket请求
     */
    function sendSMessage(req) {
        if (true) {
            console.log("%c[socket]", "color: #e5bd9c", Date.now(), ":", req);
        }
        httpConnect.send(req);
    }
    Net.sendSMessage = sendSMessage;
    function sendMessage(req, data, backFun, context) {
        if (test) {
            sendTestMessage(req, backFun, context);
        }
        else {
            var info = {};
            if (typeof req == "string") {
                info.cmd = req;
            }
            else {
                Util.mixin(data, info);
            }
            sendHMessage(info, backFun, context);
        }
    }
    Net.sendMessage = sendMessage;
    function sendTestMessage(cmd, compFun, context) {
        var url = "http/" + cmd + ".json";
        RES.getResByUrl(url, compFun, context);
    }
    Net.sendTestMessage = sendTestMessage;
    function dispatch(cmd, data) {
        eventDisPatcher.dispatchEventWith(cmd, false, data);
    }
    Net.dispatch = dispatch;
    function has(cmd) {
        return eventDisPatcher.hasEventListener(cmd);
    }
    Net.has = has;
    function on(cmd, listener, thisObj) {
        eventDisPatcher.addEventListener(cmd, listener, thisObj);
    }
    Net.on = on;
    function off(cmd, listener, thisObj) {
        eventDisPatcher.removeEventListener(cmd, listener, thisObj);
    }
    Net.off = off;
})(Net || (Net = {}));
