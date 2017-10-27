class SocketConnect{
    connecting = false;
    socket:WebSocket;
    host = "";
    token = "";
    back:Function;
    context:any;

    public constructor(host:string, token:string, back:Function, context:any) {
        this.host = host;
        this.token = token;
        this.back = back;
        this.context = context;
        this.socket = new WebSocket(host);
        this.socket.onopen = this.onOpen;
        this.socket.onmessage = this.onMessage;
        this.socket.onerror = this.onError;
    }

    onOpen(e) {
        this.connecting = true;
        egret.log("connect socket success");
    }

    onMessage(e) {
        this.back.call(this.context, JSON.parse(e.data));
    }

    onError(e) {
        this.back.call(this.context, "error");
        egret.log("connect socket error");
    }

    public send(obj:{cmd:string}) {
        let reqInfo:any = {_T:0};
        if (Util.isSimpleType(obj)) {
            reqInfo.cmd = obj;
        } else {
            for (let key in obj) {
                reqInfo[key] = obj[key];
            }
        }
        this.socket.send(reqInfo);
    }
}
