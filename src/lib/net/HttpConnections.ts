module HttpConnect {
    let MEAN_WHILE = 2;

    let host = "";
    let token = "";
    let requestCount;
    let reqList:any[];
    let stateMap:any;
    let errorArr:string[];
    let freeLoaderList: egret.URLLoader[];
    let backFun:Function;
    let context:any;

    export function boot($host:string, $token:string, $backFun?:Function, $context?:any) {
        backFun = $backFun;
        context = $context;
        host = $host;
        token = $token;

        requestCount = 0;
        reqList = [];
        stateMap = {};
        errorArr = [];
        freeLoaderList = [];
    }

    /**
     * 向服务器端请求消息
     * @param body      消息体
     * @param backFun   回调函数
     * @param context   回调函数上下文
     * @param method    post/get
     */
    export function send(body:string|{cmd:string}, backFun?:Function, context?:any, method="get") {
        let reqInfo:any = {};
        if (Util.isSimpleType(body)) {
            reqInfo.body = {cmd:body};
        } else {
            reqInfo.body = body;
        }
        reqInfo.now = Date.now();
        reqInfo.method = method;
        reqInfo.backFun = backFun;
        reqInfo.context = context;
        reqList.push(reqInfo);
        next();
    }

    export function get(body:string|{cmd:string}, backFun?:Function, context?:any){
        this.send(body, backFun, context);
    }

    export function post(body:string|{cmd:string}, backFun?:Function, context?:any) {
        this.send(body, backFun, context, "post");
    }

    function next() {
        if (reqList.length > 0 && requestCount < MEAN_WHILE) {
            requestCount++;
            let reqInfo = reqList.shift();
            let request = getRequest(reqInfo);
            let loader = getLoader();
            loader["reqInfo"] = reqInfo;
            loader.addEventListener(egret.Event.COMPLETE, onComplete, Net);
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, onError, Net);
            loader.load(request);
        }
    }

    function getRequest(req:any) {
        let args:any = req.body;
        let request:egret.URLRequest;
        let url = host + "/" + "game" + "?";
        let isGet = true;
        let keyValue = `token=${token}`;
        for (let key in args) {
            if (key == "method") {
                isGet = args[key] != "post"
            } else {
                keyValue += `&${key}=${args[key]}`;
            }
        }
        if (isGet) {
            request = new egret.URLRequest(url + keyValue);
            request.method = egret.URLRequestMethod.GET;
        } else {
            request = new egret.URLRequest(url);
            request.method = egret.URLRequestMethod.POST;
            request.data = new egret.URLVariables(keyValue);
        }
        return request;
    }

    function getLoader() {
        let loader = freeLoaderList.pop();
        if (!loader) {
            loader = new egret.URLLoader();
            loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        }
        return loader;
    }

    function onComplete(e:egret.Event){
        let loader:egret.URLLoader = e.target;
        execute(loader);
    }

    function onError(e:egret.IOErrorEvent) {
        let loader:egret.URLLoader = e.target;
        execute(loader);
    }

    function execute(loader:egret.URLLoader) {
        let reqInfo = loader["reqInfo"];
        let end = false;
        let req = reqInfo.body;
        let cmd = req.cmd;
        let res = JSON.parse(loader.data) || {error:-1};
        let error = +res.error;
        if (error) {
            if (stateMap[cmd] === undefined) {
                stateMap[cmd] = 1;
            } else {
                stateMap[cmd] = stateMap[cmd] + 1;
                if (stateMap[cmd] > 3) {
                    errorArr.push(cmd);
                }
                if (errorArr.length > 1) {
                    backFun.call(context, req, null);
                }
            }
            if (stateMap[cmd] >= 3) {
                end = true;
            } else {
                let request = getRequest(req);
                loader.load(request);
            }
        } else {
            end = true;
        }

        if (end) {
            if (reqInfo.backFun && reqInfo.context) {
                reqInfo.backFun.call(reqInfo.context, req, res);
            }
            stateMap[cmd] = 0;
            loader.removeEventListener(egret.Event.COMPLETE, onComplete, HttpConnect);
            loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, onError, HttpConnect);
            loader["reqInfo"] = null;
            freeLoaderList.push(loader);
            ArrayUtil.removeItem(errorArr, cmd);
            backFun.call(context, req, res);
            requestCount -= 1;
            next();
        }
    }
}
