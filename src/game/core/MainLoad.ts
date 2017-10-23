/**
 * 进入之前的加载
 *
 * Created by hh on 2017/10/17.
 */
module MainLoad {
    let dataOk = false;
    let resOk = false;
    let skinOk = false;
    let jsonOk = false;
    let progress = 0;
    let resConfig:any;

    let back:Function;
    let context:any;

    export function start($back:Function, $context:any){
        back = $back;
        context = $context;
        showProgress(window["__loadProgress"] || 50);
        loadPlatformConfig();
        loadDefaultRes();
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, onLoadGroupComplete, null);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, onLoadGroupProgress, null);
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
            Global.boot(data);
            dataOk = true;
            // Net.boot();
            // Net.addCmdListener(CmdConst.ENTER, onDataRes, MainLoad);
            requestServerPath();
        }, null, RES.ResourceItem.TYPE_JSON);
    }

    function  loadDefaultRes() {
        let resVer = "1.0.0";
        let resURL = `resource/default.res.json?v=${resVer}`;
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, onLoadDefResComplete, MainLoad);
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
        // let data = {};
        // if (from) {
        //     data["from"] = from;
        // }
        // if (friendId) {
        //     data["inviteId"] = friendId;
        // }
        // Net.sendMessage(CmdConst.ENTER,data);
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
        egret.log("load enter_data complete");
        Net.removeCmdListener(CmdConst.ENTER, onDataRes, MainLoad);
        addProgress(2);
        dataOk = true;
        enterGame();
    }

    function onLoadGameConfigComplete(data:any) {
        egret.log("load json_res complete");
        jsonOk = true;
        GameConfig.setData(data);
        enterGame();
    }

    function  onLoadDefResComplete(e:RES.ResourceEvent) {
        egret.log("load default_res complete");
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, onLoadDefResComplete, MainLoad);
        let target = e.target;
        if (target && target.resConfig && target.resConfig.keyMap) {
            resConfig = target.resConfig.keyMap;
            let configURL = resConfig.blank_png ? resConfig.blank_png.url : "resource/blank.png";
            LoadManager.loadConfigData(configURL, onLoadGameConfigComplete, MainLoad);
            RES.loadGroup("preload");
        } else {
            egret.warn("获取到资源配置信息");
        }
    }

    function  loadSkin() {
        let useXJS = window["__useXJS"];
        if (useXJS) {
            showProgress(90);
            let xmlJsRes = resConfig["xml_js"].url;
            window["AWY_SDK"].loadSingleScript(xmlJsRes, function () {
                egret.log("load skin_res complete");
                skinOk = true;
                enterGame();
            });
        } else {
            let themeURL = "resource/default.thm.json";
            let theme = new eui.Theme(themeURL, __STAGE);
            theme.once(eui.UIEvent.COMPLETE, onLoadSkinComplete, MainLoad);
        }
    }

    function onLoadSkinComplete() {
        egret.log("load skin_res complete");
        skinOk = true;
        enterGame();
    }

    function  enterGame() {
        if (dataOk && resOk && skinOk && jsonOk) {
            if (window["hideProgress"]) {
                window["hideProgress"]();
            }
            if (back) {
                back.call(context);
            }
        }
    }
}
