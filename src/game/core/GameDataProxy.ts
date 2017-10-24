/** 游戏中所有的数据(不包含配置等 */
const GameData:IGameData = <IGameData>{};

/**
 * 游戏数据代理
 */
module GameDataProxy {
    export function boot(obj:any) {
        Net.boot(obj, httpBack, socketBack, GameDataProxy);
    }

    // 处理错误
    function doError(code:number) {
        console.error(code);
    }

    export function doHttpRes(req:any, res:any) {
        let cmd = req.cmd;
        Util.mixin(res, GameData);
        Net.dispatchCmd(cmd, res);
    }

    function doSocketRes(res:any) {
        let cmd = res.cmd;
        let body = res;
        Util.mixin(body, GameData);
        Net.dispatchCmd(cmd, body);
    }

    function httpBack(req:any, res:any) {
        if (!res) {
            console.error("服务器异常,需断开链接");
        } else {
            let errorCode = res.error;
            if (errorCode) {
                doError(errorCode);
            } else {
                console.log("%c[http]" , "color: #44ff44", Date.now(), ":", res);
                doHttpRes(req, res);
            }
        }
    }

    function socketBack(res:any) {
        if (DEBUG) {
            console.log("%c[socket]" , "color: #44ff44", Date.now(), ":", res);
            doSocketRes(res);
        }
    }
}

interface IGameData {
    headimgurl:string;
    land:{number:{lv:string,event:number}}[];
    nickname:string;
    serverTime:number;
    sex:number;
    tech:{number:number}[];
    uid:number;
    skinObj:any;
    chessObj:any;
    diceObj:any;
    vehicleObj:any;
}