var HttpConnect;
(function (HttpConnect) {
    var MEAN_WHILE = 2;
    var host = "";
    var token = "";
    var requestCount;
    var reqList;
    var stateMap;
    var errorArr;
    var freeLoaderList;
    var backFun;
    var context;
    function boot($host, $token, $backFun, $context) {
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
    HttpConnect.boot = boot;
    /**
     * ����������������Ϣ
     * @param body      ��Ϣ��
     * @param backFun   �ص�����
     * @param context   �ص�����������
     * @param method    post/get
     */
    function send(body, backFun, context, method) {
        if (method === void 0) { method = "get"; }
        var reqInfo = {};
        if (Util.isSimpleType(body)) {
            reqInfo.body = { cmd: body };
        }
        else {
            reqInfo.body = body;
        }
        reqInfo.now = Date.now();
        reqInfo.method = method;
        reqInfo.backFun = backFun;
        reqInfo.context = context;
        reqList.push(reqInfo);
        next();
    }
    HttpConnect.send = send;
    function get(body, backFun, context) {
        this.send(body, backFun, context);
    }
    HttpConnect.get = get;
    function post(body, backFun, context) {
        this.send(body, backFun, context, "post");
    }
    HttpConnect.post = post;
    function next() {
        if (reqList.length > 0 && requestCount < MEAN_WHILE) {
            requestCount++;
            var reqInfo = reqList.shift();
            var request = getRequest(reqInfo);
            var loader = getLoader();
            loader["reqInfo"] = reqInfo;
            loader.addEventListener(egret.Event.COMPLETE, onComplete, Net);
            loader.addEventListener(egret.IOErrorEvent.IO_ERROR, onError, Net);
            loader.load(request);
        }
    }
    function getRequest(req) {
        var args = req.body;
        var request;
        var url = host + "/" + "game" + "?";
        var isGet = true;
        var keyValue = "token=" + token;
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
    }
    function getLoader() {
        var loader = freeLoaderList.pop();
        if (!loader) {
            loader = new egret.URLLoader();
            loader.dataFormat = egret.URLLoaderDataFormat.TEXT;
        }
        return loader;
    }
    function onComplete(e) {
        var loader = e.target;
        execute(loader);
    }
    function onError(e) {
        var loader = e.target;
        execute(loader);
    }
    function execute(loader) {
        var reqInfo = loader["reqInfo"];
        var end = false;
        var req = reqInfo.body;
        var cmd = req.cmd;
        var res = JSON.parse(loader.data) || { error: -1 };
        var error = +res.error;
        if (error) {
            if (stateMap[cmd] === undefined) {
                stateMap[cmd] = 1;
            }
            else {
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
            }
            else {
                var request = getRequest(req);
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
})(HttpConnect || (HttpConnect = {}));
//# sourceMappingURL=HttpConnections.js.map