/**
 * 处理游戏中的加载
 */
var LoadManager;
(function (LoadManager) {
    var uid = 0;
    var loadWorker;
    var loadingParamList;
    var hadListener = false;
    function boot() {
        loadingParamList = [];
        loadWorker = new Worker(getBasePath() + "resource/web/netWorker.js");
        loadWorker.onmessage = onNetMessage;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, groupLoadComplete, LoadManager);
    }
    LoadManager.boot = boot;
    function onNetMessage(e) {
        var info = e.data;
        doLoadComplete(info.url, info.content);
    }
    function loadConfigData(url, back, context) {
        url = getBasePath() + url;
        loadingParamList.push(url, back, context);
        loadWorker.postMessage({ action: "loadGameConfig", param: url });
    }
    LoadManager.loadConfigData = loadConfigData;
    function groupLoadComplete(e) {
        var name = e.groupName;
        doLoadComplete(name);
    }
    function doLoadComplete(name, data) {
        var len = loadingParamList ? loadingParamList.length : 0;
        for (var i = 0; i < len; i += 3) {
            if (loadingParamList[i] == name) {
                var fun = loadingParamList[i + 1];
                var context = loadingParamList[i + 2];
                fun.call(context, data);
                loadingParamList.splice(i, 3);
                break;
            }
        }
    }
    /**
     * 加载group资源
     * @param urlList
     * @param back
     * @param context
     * @param property
     */
    function loadGroup(urlList, back, context, property) {
        uid++;
        var name = "group_#_" + uid;
        loadingParamList.push(name, back, context);
        RES.createGroup(name, urlList);
        RES.loadGroup(name, property);
    }
    LoadManager.loadGroup = loadGroup;
    /**
     * 加载dragonBone资源
     * @param name
     * @param back
     * @param context
     * @param property
     */
    function loadDragonBone(name, back, context, property) {
        var res = [];
        if (typeof name == "string") {
            res.push(name + "_ske_json");
            res.push(name + "_tex_json");
            res.push(name + "_tex_png");
        }
        else {
            for (var i = 0, len = name.length; i < len; i++) {
                res.push(name[i] + "_ske_json");
                res.push(name[i] + "_tex_json");
                res.push(name[i] + "_tex_png");
            }
        }
        loadGroup(res, back, context, property);
    }
    LoadManager.loadDragonBone = loadDragonBone;
    /**
     * 加载list
     * @param urlList
     * @param compFunc
     * @param progFunc
     * @param thisObject
     */
    function loadList(urlList, compFunc, progFunc, thisObject) {
        var resList = {};
        var urlLen = urlList.length;
        function next() {
            var url = urlList.shift();
            RES.getResByUrl(url, function (res) {
                resList[url] = res;
                if (progFunc) {
                    progFunc.call(thisObject, (urlLen - urlList.length) / urlLen);
                }
                if (urlList.length <= 0) {
                    compFunc.call(thisObject, resList);
                }
                else {
                    next();
                }
            }, this);
        }
        next();
    }
    LoadManager.loadList = loadList;
    function getBasePath() {
        var origin = window.location.origin;
        var pathName = window.location.pathname;
        var index = origin.indexOf(".com");
        if (index >= 0) {
            origin = origin.substr(0, index + 4) + pathName;
        }
        else {
            origin = window.location.href + "/";
        }
        var path = origin.replace("\/index.html", "");
        return path;
    }
})(LoadManager || (LoadManager = {}));
//# sourceMappingURL=LoadManager.js.map