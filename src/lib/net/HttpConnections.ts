class HttpConnect{
    MEAN_WHILE = 2;
    host = "";
    token = "";
    stateMap:any;
    errorArr:string[];
    requestCount = 0;
    reqList:any[];
    freeReqList:any[];
    freeLoaderList: egret.URLLoader[];
    back:Function;
    context:any;

    public constructor(host:string, token:string, back?:Function, context?:any) {
        this.host = host;
        this.token = token;
        this.requestCount = 0;
        this.reqList = [];
        this.stateMap = {};
        this.errorArr = [];
        this.freeLoaderList = [];
        this.freeReqList = [];
        this.back = back;
        this.context = context;
    }

    public send(body:string|{cmd:string}, backFun?:Function, context?:any, method="get") {
        let reqInfo:any = null;
        if (this.freeReqList.length) {
            reqInfo = this.freeReqList.pop();
        } else {
            reqInfo = {};
        }
        if (typeof body == "string") {
            reqInfo.body = {cmd:body};
        } else {
            reqInfo.body = body;
        }
        reqInfo.now = Date.now();
        reqInfo.method = method;
        reqInfo.backFun = backFun;
        reqInfo.context = context;
        this.reqList.push(reqInfo);
        this.next();
    }

    public get(body:string|{cmd:string}, backFun?:Function, context?:any){
        this.send(body, backFun, context);
    }

    public post(body:string|{cmd:string}, backFun?:Function, context?:any) {
        this.send(body, backFun, context, "post");
    }

    next() {
        if (this.reqList.length > 0 && this.requestCount < this.MEAN_WHILE) {
            this.requestCount++;
            let reqInfo = this.reqList.shift();
            let request = this.getRequest(reqInfo);
            let loader = this.getLoader();
            loader["__reqInfo"] = reqInfo;
            loader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
            loader.load(request);
        }
    }

    getRequest(req:any) {
        let args:any = req.body;
        let request:egret.URLRequest;
        let url = this.host + "/" + "game" + "?";
        let isGet = true;
        let keyValue = `token=${this.token}`;
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

    getLoader() {
        let loader = this.freeLoaderList.pop();
        if (!loader) {
            loader = new egret.URLLoader();
            loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        }
        return loader;
    }

    onComplete(e:egret.Event){
        let loader:egret.URLLoader = e.target;
        this.execute(loader);
    }

    onError(e:egret.IOErrorEvent) {
        let loader:egret.URLLoader = e.target;
        this.execute(loader);
    }

    execute(loader:egret.URLLoader) {
        let reqInfo:any = loader["__reqInfo"];
        let end = false;
        let req = reqInfo.body;
        let cmd = req.cmd;
        let res = JSON.parse(loader.data) || {error:-1};
        let error = +res.error;
        if (error) {
            if (this.stateMap[cmd] === undefined) {
                this.stateMap[cmd] = 1;
            } else {
                this.stateMap[cmd] = this.stateMap[cmd] + 1;
                if (this.stateMap[cmd] > 3) {
                    this.errorArr.push(cmd);
                }
                if (this.errorArr.length > 1) {
                    this.back.call(this.context);
                }
            }
            if (this.stateMap[cmd] >= 3) {
                end = true;
            } else {
                let request = this.getRequest(req);
                loader.load(request);
            }
        } else {
            end = true;
        }

        if (end) {
            if (reqInfo.backFun && reqInfo.context) {
                reqInfo.backFun.call(reqInfo.context, req, res);
            }
            this.stateMap[cmd] = 0;
            loader["__reqInfo"] = null;
            loader.removeEventListener(egret.Event.COMPLETE, this.onComplete, this);
            loader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
            reqInfo.body = null;
            reqInfo.now = 0;
            reqInfo.method = null;
            reqInfo.backFun = null;
            reqInfo.conetxt = null;
            this.freeReqList.push(reqInfo);
            this.freeLoaderList.push(loader);
            ArrayUtil.removeItem(this.errorArr, cmd);
            this.requestCount -= 1;
            this.next();
        }
    }
}
