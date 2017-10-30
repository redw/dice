/** 游戏中所有的数据(不包含配置等 */
var GameData = {};
/**
 * 游戏数据代理
 */
var GameDataProxy;
(function (GameDataProxy) {
    function boot(obj) {
        Net.boot(obj, httpBack, socketBack, GameDataProxy);
    }
    GameDataProxy.boot = boot;
    // 处理错误
    function doError(code) {
        console.error(code);
    }
    function doHttpRes(req, res) {
        var cmd = req.cmd;
        Util.mixin(res, GameData);
        Net.dispatch(cmd, res);
    }
    GameDataProxy.doHttpRes = doHttpRes;
    function doSocketRes(res) {
        var cmd = res.cmd;
        var body = res;
        Util.mixin(body, GameData);
        Net.dispatch(cmd, body);
    }
    function httpBack(req, res) {
        if (!res) {
            console.error("服务器异常,需断开链接");
        }
        else {
            var errorCode = res.error;
            if (errorCode) {
                doError(errorCode);
            }
            else {
                console.log("%c[http]", "color: #44ff44", Date.now(), ":", res);
                doHttpRes(req, res);
            }
        }
    }
    function socketBack(res) {
        if (true) {
            console.log("%c[socket]", "color: #44ff44", Date.now(), ":", res);
            doSocketRes(res);
        }
    }
})(GameDataProxy || (GameDataProxy = {}));
