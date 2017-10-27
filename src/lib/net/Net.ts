module Net {
    let eventDisPatcher:egret.EventDispatcher;
    let httpConnect;
    let socketConnect;
    let test:string;

    export function boot(obj:any, httpBack:Function, socketBack:Function, context:any) {
        eventDisPatcher = new egret.EventDispatcher();
        test = obj.test;
        let httpHost = obj.h_host;
        let socketHost = obj.s_host;
        let token = obj.token;
        httpConnect = new HttpConnect(httpHost, token, httpBack, context);
        socketConnect = new SocketConnect(socketHost, token, socketBack, context);
    }

    /**
     * 发送http请求
     * @param req       请求信息    命令或 {cmd:命令, key:value}
     * @param backFun   回调函数
     * @param context   回调函数上下文
     * @param method    请求方式    小写get/post
     */
    export function sendHMessage(req:any, backFun?:Function, context?:any, method="get") {
        if (DEBUG) {
            console.log("%c[http]" , "color: #e5bd9c", Date.now(), ":", req);
        }
        httpConnect.send(req, backFun, context, method);
    }

    /**
     * 发送socket请求
     */
    export function sendSMessage(req:any) {
        if (DEBUG) {
            console.log("%c[socket]" , "color: #e5bd9c", Date.now(), ":", req);
        }
        httpConnect.send(req);
    }

    export function sendMessage(req:any, data?:any, backFun?:Function, context?:any) {
        if (test) {
            sendTestMessage(req, backFun, context);
        } else {
            let info:any = {};
            if (typeof req == "string") {
                info.cmd = req;
            } else {
                Util.mixin(data, info);
            }
            sendHMessage(info, backFun, context);
        }
    }

    export function sendTestMessage(cmd:string, compFun:Function, context) {
        let url = `http/${cmd}.json`;
        RES.getResByUrl(url, compFun, context);
    }

    export function dispatch(cmd:string, data:any):void {
        eventDisPatcher.dispatchEventWith(cmd, false, data);
    }

    export function has(cmd:string):boolean {
        return eventDisPatcher.hasEventListener(cmd);
    }

    export function on(cmd:string, listener:Function, thisObj:any):void {
        eventDisPatcher.addEventListener(cmd, listener, thisObj);
    }

    export function off(cmd:string, listener:Function, thisObj:any):void {
        eventDisPatcher.removeEventListener(cmd, listener, thisObj);
    }
}