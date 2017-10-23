var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __PLATFORM = "avu";
var ExternalUtil = (function () {
    function ExternalUtil() {
    }
    ExternalUtil.boot = function () {
        __PLATFORM = ExternalUtil.getPlatform() || "avu";
    };
    ExternalUtil.refresh = function () {
        window.location.reload();
    };
    ExternalUtil.copyUID = function (uid) {
        window["AWY_SDK"].copy(uid);
    };
    ExternalUtil.joinChatRoom = function () {
        window["AWY_SDK"].joinChatRoom();
    };
    ExternalUtil.getToken = function () {
        return window["AWY_SDK"].token;
    };
    ExternalUtil.getVersion = function () {
        return window["game_version"] || "1";
    };
    ExternalUtil.getPlatform = function () {
        if (window["AWY_SDK"]) {
            return window["AWY_SDK"].getURLVar("channel") || "avu";
        }
        return "avu";
    };
    ExternalUtil.isYYB = function () {
        return ExternalUtil.getPlatform() == "yyb";
    };
    ExternalUtil.isHT = function () {
        return ExternalUtil.getPlatform() == "hortor";
    };
    ExternalUtil.is4399 = function () {
        return ExternalUtil.getPlatform() == "4399";
    };
    ExternalUtil.isAVU = function () {
        return ExternalUtil.getPlatform() == "avu";
    };
    ExternalUtil.share = function () {
        // TODO
    };
    ExternalUtil.init = function () {
        // TODO
    };
    ExternalUtil.showFriend = function () {
        if (window["AWY_SDK"]) {
            window["AWY_SDK"].showFriend();
        }
    };
    ExternalUtil.getServerInfo = function (callBack, callBackThisObj) {
        if (window["AWY_SDK"]) {
            window["AWY_SDK"].getServerURL(function (serverURL) {
                if (serverURL) {
                    callBack.call(callBackThisObj, serverURL);
                }
                else {
                    console.log("没有serverURL");
                }
            });
        }
    };
    ExternalUtil.pay = function (pid) {
        // if (Global.PAY_ENABLED) {
        //     let area = window["__qu__"] || 1;
        //     if(this.getIsHT())
        //     {
        //         var htPid:number = this.checkHTPid(pid);
        //         window["AWY_SDK"].hortorPay({userdata:area, product_id: htPid,uid:UserProxy.inst.uid,gameid:Global.GAME_ID});
        //     }
        //     else if(ExternalUtil.inst.getIsYYB())
        //     {
        //         var yybPid:number = this.checkYYBPid(pid);
        //         window["AWY_SDK"].pay({userdata:area, pid:yybPid});
        //     }
        //     else if(ExternalUtil.inst.getIs4399())
        //     {
        //         var newPid:number = this.checkPidFor4399(pid);
        //         window["AWY_SDK"].pay4399({userdata:area, product_id: newPid,uid:UserProxy.inst.uid,gameid:Global.GAME_ID});
        //     }
        //     else
        //     {
        //         window["AWY_SDK"].pay({userdata:area, pid: pid});
        //     }
        // } else{
        //     Alert.show("充值系统正在维护！");
        // }
    };
    /**
     * 过滤敏感词
     * @param content
     * @param func
     * @param context
     */
    ExternalUtil.filterWorks = function (content, func, context) {
        var sdk = window["AWY_SDK"];
        if (sdk) {
            var url = 'http://api.11h5.com:4100/common?cmd=filterText&text=' + content;
            sdk.httpGet(url, function (value) {
                func.call(context, value.text);
            }, "json");
        }
        else {
            func.call(context, content);
        }
    };
    return ExternalUtil;
}());
__reflect(ExternalUtil.prototype, "ExternalUtil");
