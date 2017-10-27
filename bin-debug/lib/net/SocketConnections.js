var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SocketConnect = (function () {
    function SocketConnect(host, token, back, context) {
        this.connecting = false;
        this.host = "";
        this.token = "";
        this.host = host;
        this.token = token;
        this.back = back;
        this.context = context;
        this.socket = new WebSocket(host);
        this.socket.onopen = this.onOpen;
        this.socket.onmessage = this.onMessage;
        this.socket.onerror = this.onError;
    }
    SocketConnect.prototype.onOpen = function (e) {
        this.connecting = true;
        egret.log("connect socket success");
    };
    SocketConnect.prototype.onMessage = function (e) {
        this.back.call(this.context, JSON.parse(e.data));
    };
    SocketConnect.prototype.onError = function (e) {
        this.back.call(this.context, "error");
        egret.log("connect socket error");
    };
    SocketConnect.prototype.send = function (obj) {
        var reqInfo = { _T: 0 };
        if (Util.isSimpleType(obj)) {
            reqInfo.cmd = obj;
        }
        else {
            for (var key in obj) {
                reqInfo[key] = obj[key];
            }
        }
        this.socket.send(reqInfo);
    };
    return SocketConnect;
}());
__reflect(SocketConnect.prototype, "SocketConnect");
//# sourceMappingURL=SocketConnections.js.map