var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var STAGE;
var PLATFORM;
var Engine = (function () {
    function Engine(dis, mainView) {
        var _this = this;
        this.stage = dis.stage;
        STAGE = this.stage;
        this.mainView = mainView;
        this.readyCount = 0;
        this.progress = window["__progress"] || 50;
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
        this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadGroupComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onLoadGroupProgress, this);
        LoadManager.boot();
        var platform = ExternalUtil.getPlatform();
        RES.getResByUrl("resource/config_" + platform + ".json?v=" + Date.now(), function (data) {
            egret.log("load config_json complete");
            _this.addProgress(1);
            _this.requestServerPath(data);
            RES.loadGroup("preload");
        }, this, RES.ResourceItem.TYPE_JSON);
        this.loadDefaultRes();
    }
    Engine.prototype.showProgress = function (value, tip) {
        if (tip === void 0) { tip = ""; }
        if (value) {
            this.progress = value;
            if (window["showProgress"]) {
                window["showProgress"](value, tip);
            }
        }
    };
    Engine.prototype.addProgress = function (add) {
        if (+add) {
            this.progress += add;
            this.showProgress(this.progress);
        }
    };
    Engine.prototype.requestServerPath = function (data) {
        var _this = this;
        if (data.h_host) {
            this.sendEnterCmd(data);
        }
        else {
            ExternalUtil.getServerInfo(function (serverPath) {
                data.h_host = serverPath;
                _this.addProgress(1);
                _this.sendEnterCmd(data);
            }, null);
        }
    };
    Engine.prototype.sendEnterCmd = function (data) {
        GameDataProxy.boot(data);
        Net.sendMessage(CmdConst.ENTER, null, this.onEnterComplete, this);
        this.addProgress(1);
    };
    Engine.prototype.loadDefaultRes = function () {
        var resVer = "1.0.0";
        var resURL = "resource/default.res.json?v=" + resVer;
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onLoadDefResComplete, this);
        RES.loadConfig(resURL, "resource/");
    };
    Engine.prototype.loadSkin = function () {
        var useXJS = window["__useXJS"];
        if (useXJS) {
            this.showProgress(90);
            var xmlJsRes = "";
            window["AWY_SDK"].loadSingleScript(xmlJsRes, function () {
                this.onLoadSkinComplete();
            });
        }
        else {
            var themeURL = "resource/default.thm.json";
            var theme = new eui.Theme(themeURL, STAGE);
            theme.once(eui.UIEvent.COMPLETE, this.onLoadSkinComplete, this);
        }
    };
    Engine.prototype.onLoadDefResComplete = function (e) {
        egret.log("load default_res complete");
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onLoadDefResComplete, this);
        var target = e.target;
        if (target && target.resConfig && target.resConfig.keyMap) {
            var resConfig = target.resConfig.keyMap;
            var configURL = resConfig.blank_png ? resConfig.blank_png.url : "resource/blank.png";
            LoadManager.loadConfigData(configURL, this.onLoadJsonComplete, this);
            RES.loadGroup("preload");
        }
        else {
            egret.warn("获取到资源配置信息");
        }
    };
    Engine.prototype.onLoadJsonComplete = function () {
        egret.log("load json complete");
        this.addReadyCount();
    };
    Engine.prototype.onLoadSkinComplete = function () {
        egret.log("load skin complete");
        this.addReadyCount();
    };
    Engine.prototype.onEnterComplete = function () {
        egret.log("load enter complete");
        this.addReadyCount();
    };
    Engine.prototype.onGroupComplete = function () {
        egret.log("load group complete");
        this.addReadyCount();
    };
    Engine.prototype.onLoadGroupComplete = function (e) {
        if (e.groupName == "preload") {
            this.onGroupComplete();
            this.loadSkin();
        }
    };
    Engine.prototype.onLoadGroupProgress = function () {
    };
    Engine.prototype.addReadyCount = function () {
        this.readyCount++;
        if (this.readyCount >= 4) {
            this.enterGame();
        }
    };
    Engine.prototype.onEnterFrame = function () {
        dragonBones.WorldClock.clock.advanceTime(0.025);
        GameLoop.$onEnterFrame();
    };
    Engine.prototype.enterGame = function () {
        var V = egret.getDefinitionByName(this.mainView);
        var v = new V();
        var stage = STAGE;
        if (window["hideProgress"]) {
            window["hideProgress"]();
        }
        stage.removeChildren();
        stage.addChild(v);
        GameLoop.boot();
        stage.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    return Engine;
}());
__reflect(Engine.prototype, "Engine");
//# sourceMappingURL=Engine.js.map