module GameLoad {
    let dataOk = true;
    let resOk = false;
    let skinOk = false;
    let jsonOk = false;
    let progress = 0;
    let resConfig;

    let finish:Function;
    let context:any;
    export function start($finish:Function, $context:any){
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

    function showProgress(value:number, tip = "") {
        if (value) {
            progress = value;
            if (window["showProgress"]) {
                window["showProgress"](value, tip);
            }
        }
    }

    function addProgress(add:number) {
        if (+add) {
            progress += add;
            showProgress(progress);
        }
    }

    function  loadPlatformConfig() {
        let platform = ExternalUtil.getPlatform();
        RES.getResByUrl(`resource/config_${platform}.json?v=${Date.now()}`, (data) => {
            egret.log("load config_json complete");
            addProgress(1);
            Global.initConfig(data);
            GameDataProxy.boot();
            Net.addCmdListener(CmdConst.ENTER, onDataRes, GameLoad);
            requestServerPath();
        }, null, RES.ResourceItem.TYPE_JSON);
    }

    function  loadDefaultRes() {
        let assetAdapter = new AssetAdapter();
        let resVer = "1.0.0";
        let resURL = `resource/default.res.json?v=${resVer}`;
        __STAGE.registerImplementation("eui.IAssetAdapter", assetAdapter);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, onLoadDefResComplete, GameLoad);
        RES.loadConfig(resURL, "resource/");
    }

    function  requestServerPath() {
        if (Global.H_HOST) {
            sendEnterCmd();
        } else {
            ExternalUtil.getServerInfo((serverPath) => {
                Global.H_HOST = serverPath;
                addProgress(1);
                sendEnterCmd();
            }, null);
        }
    }

    function  sendEnterCmd() {
        addProgress(1);
        // let from:string = window["AWY_SDK"].getURLVar("cp_from");
        // let friendId:string = window["AWY_SDK"].getURLVar("fuid") || 1;
        // window["AWY_SDK"].shareParams({"cp_from":"msg"});
        let req:any = {cmd:"enter"};
        // if (from) {
        //     req.from = from;
        // }
        // if (friendId) {
        //     req.inviteId = friendId;
        // }
        Net.sendHMessage(req);
    }

    function  onLoadGroupComplete(e:RES.ResourceEvent) {
        let groupName = e.groupName;
        if (groupName == "preload") {
            resOk = true;
            loadSkin();
        }
    }

    function onLoadGroupProgress(e:RES.ResourceEvent) {
        // let groupName = e.groupName;
        addProgress(3);
    }

    function onDataRes() {
        Net.removeCmdListener(CmdConst.ENTER, onDataRes, GameLoad);
        addProgress(2);
        dataOk = true;
        enterGame();
    }

    function  onLoadGameConfigComplete() {
        jsonOk = true;
        enterGame();
    }

    function  onLoadDefResComplete(e:RES.ResourceEvent) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, onLoadDefResComplete, GameLoad);
        let target = e.target;
        if (target && target.resConfig && target.resConfig.keyMap) {
            resConfig = target.resConfig.keyMap;
            egret.log("load default_res complete");
            RES.loadGroup("preload");
        }
    }

    function  loadSkin() {
        let useXJS = window["__useXJS"];
        if (useXJS) {
            showProgress(90);
            let xmlJsRes = resConfig["xml_js"].url;
            window["AWY_SDK"].loadSingleScript(xmlJsRes, function () {
                skinOk = true;
                enterGame();
            });
        } else {
            let themeURL = "resource/default.thm.json?";
            let theme = new eui.Theme(themeURL, __STAGE);
            theme.once(eui.UIEvent.COMPLETE, onLoadSkinComplete, GameLoad);
        }
    }

    function onLoadSkinComplete() {
        skinOk = true;
        enterGame();
    }

    function  enterGame() {
        if (dataOk && resOk && skinOk && jsonOk) {
            finish.call(context);
        }
    }
}
