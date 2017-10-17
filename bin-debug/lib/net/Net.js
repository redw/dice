var Net;
(function (Net) {
    var eventDisPatcher;
    function boot(httpBack, socketBack, context) {
        eventDisPatcher = new egret.EventDispatcher();
        var httpHost = Global.H_HOST;
        var token = Global.TOKEN;
        var socketHost = Global.S_HOST;
        HttpConnect.boot(httpHost, token, httpBack, context);
        SocketConnect.boot(socketHost, token, socketBack, context);
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
        HttpConnect.send(req, backFun, context, method);
    }
    Net.sendHMessage = sendHMessage;
    /**
     * 发送socket请求
     */
    function sendSMessage(req) {
        if (true) {
            console.log("%c[socket]", "color: #e5bd9c", Date.now(), ":", req);
        }
        SocketConnect.send(req);
    }
    Net.sendSMessage = sendSMessage;
    function dispatchCmd(cmd, data) {
        eventDisPatcher.dispatchEventWith(cmd, false, data);
    }
    Net.dispatchCmd = dispatchCmd;
    function hasCmdListener(cmd) {
        return eventDisPatcher.hasEventListener(cmd);
    }
    Net.hasCmdListener = hasCmdListener;
    function addCmdListener(cmd, listener, thisObj) {
        eventDisPatcher.addEventListener(cmd, listener, thisObj);
    }
    Net.addCmdListener = addCmdListener;
    function removeCmdListener(cmd, listener, thisObj) {
        eventDisPatcher.removeEventListener(cmd, listener, thisObj);
    }
    Net.removeCmdListener = removeCmdListener;
})(Net || (Net = {}));
//# sourceMappingURL=Net.js.map