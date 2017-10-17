module SocketConnect {
    let connecting = false;

    let socket:WebSocket;
    let host = "";
    let port:any;
    let backFun:Function;
    let context:any;

    export function boot($host:string, $token:string, $backFun?:Function, $context?:any) {
        backFun = $backFun;
        context = $context;
        host = $host;
        port = $token;

        socket = new WebSocket(host);
        socket.onopen = onOpen;
        socket.onmessage = onMessage;
        socket.onerror = onError;
    }

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

    export function send(obj:{cmd:string}) {
        let reqInfo:any = {_T:0};
        if (Util.isSimpleType(obj)) {
            reqInfo.cmd = obj;
        } else {
            for (let key in obj) {
                reqInfo[key] = obj[key];
            }
        }
        socket.send(reqInfo);
    }
}
