var GameLoad;
(function (GameLoad) {
    var dataOk = true;
    var resOk = false;
    var skinOk = false;
    var jsonOk = false;
    var progress = 0;
    var resConfig;
    var finish;
    var context;
    function start($finish, $context) {
        finish = $finish;
        context = $context;
        showProgress(window["__loadProgress"] || 50);
        loadPlatformConfig();
        loadDefaultRes();
        GameWorker.boot();
        GameWorker.loadConfig();
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onLoadGroupComplete, null);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, onLoadGroupProgress, null);
        EventManager.inst.addEventListener(GameEvents.LOAD_CONFIG_COMPLETE, onLoadGameConfigComplete, null);
    }
    GameLoad.start = start;
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
            Global.initConfig(data);
            GameDataProxy.boot();
            Net.addCmdListener(CmdConst.ENTER, onDataRes, GameLoad);
            requestServerPath();
        }, null, RES.ResourceItem.TYPE_JSON);
    }
    function loadDefaultRes() {
        var assetAdapter = new AssetAdapter();
        var resVer = "1.0.0";
        var resURL = "resource/default.res.json?v=" + resVer;
        __STAGE.registerImplementation("eui.IAssetAdapter", assetAdapter);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, onLoadDefResComplete, GameLoad);
        RES.loadConfig(resURL, "resource/");
    }
    function requestServerPath() {
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
        addProgress(1);
        // let from:string = window["AWY_SDK"].getURLVar("cp_from");
        // let friendId:string = window["AWY_SDK"].getURLVar("fuid") || 1;
        // window["AWY_SDK"].shareParams({"cp_from":"msg"});
        var req = { cmd: "enter" };
        // if (from) {
        //     req.from = from;
        // }
        // if (friendId) {
        //     req.inviteId = friendId;
        // }
        Net.sendHMessage(req);
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
    function onDataRes() {
        Net.removeCmdListener(CmdConst.ENTER, onDataRes, GameLoad);
        addProgress(2);
        dataOk = true;
        enterGame();
    }
    function onLoadGameConfigComplete() {
        jsonOk = true;
        enterGame();
    }
    function onLoadDefResComplete(e) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, onLoadDefResComplete, GameLoad);
        var target = e.target;
        if (target && target.resConfig && target.resConfig.keyMap) {
            resConfig = target.resConfig.keyMap;
            egret.log("load default_res complete");
            RES.loadGroup("preload");
        }
    }
    function loadSkin() {
        var useXJS = window["__useXJS"];
        if (useXJS) {
            showProgress(90);
            var xmlJsRes = resConfig["xml_js"].url;
            window["AWY_SDK"].loadSingleScript(xmlJsRes, function () {
                skinOk = true;
                enterGame();
            });
        }
        else {
            var themeURL = "resource/default.thm.json?";
            var theme = new eui.Theme(themeURL, __STAGE);
            theme.once(eui.UIEvent.COMPLETE, onLoadSkinComplete, GameLoad);
        }
    }
    function onLoadSkinComplete() {
        skinOk = true;
        enterGame();
    }
    function enterGame() {
        if (dataOk && resOk && skinOk && jsonOk) {
            finish.call(context);
        }
    }
})(GameLoad || (GameLoad = {}));
//# sourceMappingURL=GameLoad.js.map