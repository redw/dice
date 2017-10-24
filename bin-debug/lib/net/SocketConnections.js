var SocketConnect;
(function (SocketConnect) {
    var connecting = false;
    var socket;
    var host = "";
    var port;
    var backFun;
    var context;
    function boot($host, $token, $backFun, $context) {
        backFun = $backFun;
        context = $context;
        host = $host;
        port = $token;
        socket = new WebSocket(host);
        socket.onopen = onOpen;
        socket.onmessage = onMessage;
        socket.onerror = onError;
    }
    SocketConnect.boot = boot;
    function onOpen(e) {
        connecting = true;
        egret.log("connect socket success");
    }
    function onMessage(e) {
        if (backFun) {
            backFun.call(context, e.data);
        }
    }
    function onError(e) {
        egret.log("connect socket error");
    }
    function send(obj) {
        var reqInfo = { _T: 0 };
        if (Util.isSimpleType(obj)) {
            reqInfo.cmd = obj;
        }
        else {
            for (var key in obj) {
                reqInfo[key] = obj[key];
            }
        }
        socket.send(reqInfo);
    }
    SocketConnect.send = send;
})(SocketConnect || (SocketConnect = {}));
