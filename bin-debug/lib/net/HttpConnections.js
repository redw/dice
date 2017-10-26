var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HttpConnect = (function () {
    function HttpConnect(host, token, back, context) {
        this.MEAN_WHILE = 2;
        this.host = "";
        this.token = "";
        this.requestCount = 0;
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
    HttpConnect.prototype.send = function (body, backFun, context, method) {
        if (method === void 0) { method = "get"; }
        var reqInfo = null;
        if (this.freeReqList.length) {
            reqInfo = this.freeReqList.pop();
        }
        else {
            reqInfo = {};
        }
        if (typeof body == "string") {
            reqInfo.body = { cmd: body };
        }
        else {
            reqInfo.body = body;
        }
        reqInfo.now = Date.now();
        reqInfo.method = method;
        reqInfo.backFun = backFun;
        reqInfo.context = context;
        this.reqList.push(reqInfo);
        this.next();
    };
    HttpConnect.prototype.get = function (body, backFun, context) {
        this.send(body, backFun, context);
    };
    HttpConnect.prototype.post = function (body, backFun, context) {
        this.send(body, backFun, context, "post");
    };
    HttpConnect.prototype.next = function () {
        if (this.reqList.length > 0 && this.requestCount < this.MEAN_WHILE) {
            this.requestCount++;
            var reqInfo = this.reqList.shift();
            var request = this.getRequest(reqInfo);
            var loader = this.getLoader();
            loader["__reqInfo"] = reqInfo;
            loader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
            loader.load(request);
        }
    };
    HttpConnect.prototype.getRequest = function (req) {
        var args = req.body;
        var request;
        var url = this.host + "/" + "game" + "?";
        var isGet = true;
        var keyValue = "token=" + this.token;
        for (var key in args) {
            if (key == "method") {
                isGet = args[key] != "post";
            }
            else {
                keyValue += "&" + key + "=" + args[key];
            }
        }
        if (isGet) {
            request = new egret.URLRequest(url + keyValue);
            request.method = egret.URLRequestMethod.GET;
        }
        else {
            request = new egret.URLRequest(url);
            request.method = egret.URLRequestMethod.POST;
            request.data = new egret.URLVariables(keyValue);
        }
        return request;
    };
    HttpConnect.prototype.getLoader = function () {
        var loader = this.freeLoaderList.pop();
        if (!loader) {
            loader = new egret.URLLoader();
            loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        }
        return loader;
    };
    HttpConnect.prototype.onComplete = function (e) {
        var loader = e.target;
        this.execute(loader);
    };
    HttpConnect.prototype.onError = function (e) {
        var loader = e.target;
        this.execute(loader);
    };
    HttpConnect.prototype.execute = function (loader) {
        var reqInfo = loader["__reqInfo"];
        var end = false;
        var req = reqInfo.body;
        var cmd = req.cmd;
        var res = JSON.parse(loader.data) || { error: -1 };
        var error = +res.error;
        if (error) {
            if (this.stateMap[cmd] === undefined) {
                this.stateMap[cmd] = 1;
            }
            else {
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
            }
            else {
                var request = this.getRequest(req);
                loader.load(request);
            }
        }
        else {
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
    };
    return HttpConnect;
}());
__reflect(HttpConnect.prototype, "HttpConnect");
//# sourceMappingURL=HttpConnections.js.map