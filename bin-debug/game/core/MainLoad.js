/**
 * 进入之前的加载
 *
 * Created by hh on 2017/10/17.
 */
var MainLoad;
(function (MainLoad) {
    var dataOk = false;
    var resOk = false;
    var skinOk = false;
    var jsonOk = false;
    var progress = 0;
    var resConfig;
    var back;
    var context;
    function start($back, $context) {
        back = $back;
        context = $context;
        showProgress(window["__loadProgress"] || 50);
        loadPlatformConfig();
        loadDefaultRes();
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onLoadGroupComplete, null);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, onLoadGroupProgress, null);
    }
    MainLoad.start = start;
    function showProgress(value, tip) {
        if (tip === void 0) { tip = ""; }
        if (value) {
            progress = value;
            if (window["showProgress"]) {
                window["showProgress"](value, tip);
            }
        }
    }
    function addProgress(add) {
        if (+add) {
            progress += add;
            showProgress(progress);
        }
    }
    function loadPlatformConfig() {
        var platform = ExternalUtil.getPlatform();
        RES.getResByUrl("resource/config_" + platform + ".json?v=" + Date.now(), function (data) {
            egret.log("load config_json complete");
            addProgress(1);
            Global.boot(data);
            GameDataProxy.boot(data);
            requestServerPath(data);
        }, null, RES.ResourceItem.TYPE_JSON);
    }
    function loadDefaultRes() {
        var resVer = "1.0.0";
        var resURL = "resource/default.res.json?v=" + resVer;
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, onLoadDefResComplete, MainLoad);
        RES.loadConfig(resURL, "resource/");
    }
    function requestServerPath(data) {
        if (Global.H_HOST) {
            sendEnterCmd();
        }
        else {
            ExternalUtil.getServerInfo(function (serverPath) {
                Global.H_HOST = serverPath;
                addProgress(1);
                sendEnterCmd();
            }, null);
        }
    }
    function sendEnterCmd() {
        if (Global.TEST) {
            Net.sendTestMessage(CmdConst.ENTER, onDataRes, MainLoad);
        }
        else {
            var data = {};
            Net.sendMessage(CmdConst.ENTER, data);
        }
        addProgress(1);
    }
    function onLoadGroupComplete(e) {
        var groupName = e.groupName;
        if (groupName == "preload") {
            resOk = true;
            loadSkin();
        }
    }
    function onLoadGroupProgress(e) {
        // let groupName = e.groupName;
        addProgress(3);
    }
    function onDataRes(data) {
        egret.log("load enter_data complete");
        if (data && Global.TEST) {
            GameDataProxy.doHttpRes({ cmd: CmdConst.ENTER }, data);
        }
        Net.removeCmdListener(CmdConst.ENTER, onDataRes, MainLoad);
        addProgress(2);
        dataOk = true;
        enterGame();
    }
    function onLoadGameConfigComplete(data) {
        egret.log("load json_res complete");
        jsonOk = true;
        GameConfig.setData(data);
        enterGame();
    }
    function onLoadDefResComplete(e) {
        egret.log("load default_res complete");
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, onLoadDefResComplete, MainLoad);
        var target = e.target;
        if (target && target.resConfig && target.resConfig.keyMap) {
            resConfig = target.resConfig.keyMap;
            var configURL = resConfig.blank_png ? resConfig.blank_png.url : "resource/blank.png";
            LoadManager.loadConfigData(configURL, onLoadGameConfigComplete, MainLoad);
            RES.loadGroup("preload");
        }
        else {
            egret.warn("获取到资源配置信息");
        }
    }
    function loadSkin() {
        var useXJS = window["__useXJS"];
        if (useXJS) {
            showProgress(90);
            var xmlJsRes = resConfig["xml_js"].url;
            window["AWY_SDK"].loadSingleScript(xmlJsRes, function () {
                egret.log("load skin_res complete");
                skinOk = true;
                enterGame();
            });
        }
        else {
            var themeURL = "resource/default.thm.json";
            var theme = new eui.Theme(themeURL, __STAGE);
            theme.once(eui.UIEvent.COMPLETE, onLoadSkinComplete, MainLoad);
        }
    }
    function onLoadSkinComplete() {
        egret.log("load skin_res complete");
        skinOk = true;
        enterGame();
    }
    function enterGame() {
        if (dataOk && resOk && skinOk && jsonOk) {
            if (window["hideProgress"]) {
                window["hideProgress"]();
            }
            if (back) {
                back.call(context);
            }
        }
    }
})(MainLoad || (MainLoad = {}));
//# sourceMappingURL=MainLoad.js.map