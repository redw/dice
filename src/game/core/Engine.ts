let STAGE:egret.Stage;
let PLATFORM:string;

class Engine {
    mainView:any;
    stage:egret.Stage;
    progress:number;
    readyCount:number;
    costTime = 0;

    constructor(dis:egret.DisplayObject, mainView:any) {
        this.stage = dis.stage;
        STAGE = this.stage;
        this.mainView = mainView;

        this.readyCount = 0;
        this.progress = window["__progress"] || 50;

        let assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
        this.stage.scaleMode = egret.StageScaleMode.SHOW_ALL;

        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onLoadGroupComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onLoadGroupProgress, this);

        LoadManager.boot();
        let platform = ExternalUtil.getPlatform();
        RES.getResByUrl(`resource/config_${platform}.json?v=${Date.now()}`, (data) => {
            egret.log("load config_json complete");
            this.addProgress(1);
            this.requestServerPath(data);
            RES.loadGroup("preload");
        }, this, RES.ResourceItem.TYPE_JSON);
        this.loadDefaultRes();
    }

    showProgress(value:number, tip = "") {
        if (value) {
            this.progress = value;
            if (window["showProgress"]) {
                window["showProgress"](value, tip);
            }
        }
    }

    addProgress(add:number) {
        if (+add) {
            this.progress += add;
            this.showProgress(this.progress);
        }
    }

    requestServerPath(data:any) {
        if (data.h_host) {
            this.sendEnterCmd(data);
        } else {
            ExternalUtil.getServerInfo((serverPath) => {
                data.h_host = serverPath;
                this.addProgress(1);
                this.sendEnterCmd(data);
            }, null);
        }
    }

    sendEnterCmd(data) {
        GameDataProxy.boot(data);
        Net.sendMessage(CmdConst.ENTER, null, this.onEnterComplete, this);
        this.addProgress(1);
    }

    loadDefaultRes() {
        let resVer = "1.0.0";
        let resURL = `resource/default.res.json?v=${resVer}`;
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onLoadDefResComplete, this);
        RES.loadConfig(resURL, "resource/");
    }

    loadSkin() {
        let useXJS = window["__useXJS"];
        if (useXJS) {
            this.showProgress(90);
            let xmlJsRes = "";
            window["AWY_SDK"].loadSingleScript(xmlJsRes, function () {
                this.onLoadSkinComplete();
            });
        } else {
            this.costTime = egret.getTimer();
            console.time("theme");
            let themeURL = "resource/default.thm.json";
            let theme = new eui.Theme(themeURL, STAGE);
            theme.once(eui.UIEvent.COMPLETE, this.onLoadSkinComplete, this);
        }
    }

    onLoadDefResComplete(e:RES.ResourceEvent) {
        egret.log("load default_res complete");
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onLoadDefResComplete, this);
        let target = e.target;
        if (target && target.resConfig && target.resConfig.keyMap) {
            let resConfig = target.resConfig.keyMap;
            let configURL = resConfig.blank_png ? resConfig.blank_png.url : "resource/blank.png";
            LoadManager.loadConfigData(configURL, this.onLoadJsonComplete, this);
            RES.loadGroup("preload");
        } else {
            egret.warn("获取到资源配置信息");
        }
    }

    onLoadJsonComplete() {
        egret.log("load json complete");
        this.addReadyCount();
    }

    onLoadSkinComplete() {
        console.timeEnd("theme");
        egret.log("load skin complete" + (egret.getTimer() - this.costTime));
        this.addReadyCount();
    }

    onEnterComplete() {
        egret.log("load enter complete");
        this.addReadyCount();
    }

    onGroupComplete() {
        egret.log("load group complete");
        this.addReadyCount();
    }

    onLoadGroupComplete(e:RES.ResourceEvent) {
        if (e.groupName == "preload") {
            this.onGroupComplete();
            this.loadSkin();
        }
    }

    onLoadGroupProgress() {

    }

    addReadyCount() {
        this.readyCount++;
        if (this.readyCount >= 4) {
            this.enterGame();
        }
    }

    onEnterFrame() {
        dragonBones.WorldClock.clock.advanceTime(0.025);
        GameLoop.$onEnterFrame();
    }

    enterGame() {
        let stage = this.stage;
        stage.removeChildren();

        GameLoop.boot();
        stage.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);

        let V = egret.getDefinitionByName(this.mainView);
        let v = new V();
        let popLayer = new egret.DisplayObjectContainer();
        stage.addChild(v);
        stage.addChild(popLayer);
        Pop.boot(popLayer);

        if (window["hideProgress"]) {
            window["hideProgress"]();
        }
    }
}