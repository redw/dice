var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SocketConnect = (function (_super) {
    __extends(SocketConnect, _super);
    function SocketConnect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.connecting = false;
        _this.host = "";
        _this.token = "";
        return _this;
    }
    SocketConnect.prototype.construct = function (host, token, back, context) {
        this.host = host;
        this.token = token;
        this.socket = new WebSocket(host);
        this.socket.onopen = this.onOpen;
        this.socket.onmessage = this.onMessage;
        this.socket.onerror = this.onError;
    };
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
}(egret.EventDispatcher));
__reflect(SocketConnect.prototype, "SocketConnect");
//# sourceMappingURL=SocketConnections.js.map