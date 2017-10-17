let __PLATFORM = "avu";
class ExternalUtil{
    public static boot() {
        __PLATFORM = ExternalUtil.getPlatform() || "avu";
    }

    public static refresh() {
        window.location.reload();
    }

    public static copyUID(uid:string|number) {
        window["AWY_SDK"].copy(uid);
    }

    public static joinChatRoom() {
        window["AWY_SDK"].joinChatRoom();
    }

    public static getToken() {
        return window["AWY_SDK"].token;
    }

    public static getVersion() {
        return window["game_version"] || "1"
    }

    public static getPlatform() {
        if (window["AWY_SDK"]) {
            return window["AWY_SDK"].getURLVar("channel") || "avu";
        }
        return "avu"
    }

    public static isYYB() {
        return ExternalUtil.getPlatform() == "yyb";
    }

    public static isHT(){
        return ExternalUtil.getPlatform() == "hortor";
    }

    public static is4399() {
        return ExternalUtil.getPlatform() == "4399";
    }

    public static isAVU():boolean{
        return ExternalUtil.getPlatform() == "avu";
    }

    public static share(){
        // TODO
    }

    public static init() {
        // TODO
    }

    public static showFriend() {
        if (window["AWY_SDK"]) {
            window["AWY_SDK"].showFriend();
        }
    }

    public static getServerInfo(callBack:Function, callBackThisObj:any) {
        if (window["AWY_SDK"]) {
            window["AWY_SDK"].getServerURL((serverURL:string) => {
                if (serverURL) {
                    callBack.call(callBackThisObj, serverURL);
                } else {
                    console.log("没有serverURL");
                }
            });
        }
    }

    public static pay(pid:number):void {
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
    }

    /**
     * 过滤敏感词
     * @param content
     * @param func
     * @param context
     */
    public static filterWorks(content:string, func:Function, context?:any) {
        let sdk = window["AWY_SDK"];
        if (sdk) {
            let url = 'http://api.11h5.com:4100/common?cmd=filterText&text=' + content;
            sdk.httpGet(url, (value)=>{
                func.call(context, value.text);
            }, "json");
        } else {
            func.call(context, content);
        }
    }
}