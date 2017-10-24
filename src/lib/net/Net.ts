module Net {
    let eventDisPatcher:egret.EventDispatcher;

    export function boot(obj:any, httpBack:Function, socketBack:Function, context:any) {
        eventDisPatcher = new egret.EventDispatcher();

        let httpHost = Global.H_HOST;
        let token = Global.TOKEN;
        let socketHost = Global.S_HOST;

        HttpConnect.boot(httpHost, token, httpBack, context);
        SocketConnect.boot(socketHost, token, socketBack, context);
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
        HttpConnect.send(req, backFun, context, method);
    }

    /**
     * 发送socket请求
     */
    export function sendSMessage(req:any) {
        if (DEBUG) {
            console.log("%c[socket]" , "color: #e5bd9c", Date.now(), ":", req);
        }
        SocketConnect.send(req);
    }

    export function sendMessage(req:any, data:any) {

    }

    export function sendTestMessage(cmd:string, compFun:Function, context) {
        let url = `http/${cmd}.json`;
        RES.getResByUrl(url, compFun, context);
    }

    export function dispatchCmd(cmd:string, data:any):void {
        eventDisPatcher.dispatchEventWith(cmd, false, data);
    }

    export function hasCmdListener(cmd:string):boolean {
        return eventDisPatcher.hasEventListener(cmd);
    }

    export function addCmdListener(cmd:string, listener:Function, thisObj:any):void {
        eventDisPatcher.addEventListener(cmd, listener, thisObj);
    }

    export function removeCmdListener(cmd:string, listener:Function, thisObj:any):void {
        eventDisPatcher.removeEventListener(cmd, listener, thisObj);
    }
}