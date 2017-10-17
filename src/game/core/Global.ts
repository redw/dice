module Global {
    export let GAME_ID = 0;
    export let TOKEN = "";
    export let H_HOST = "";
    export let S_HOST = "";
    export let S_PORT = 0;
    export let SHARE_ENABLED: boolean;// 是否可分享

    export function initConfig(data: any): void {
        Global.GAME_ID = data.id;
        Global.TOKEN = data.token;
        Global.H_HOST = data.h_host;
        Global.S_HOST = data.s_host;
        Global.S_PORT = data.s_port;
        Global.SHARE_ENABLED = data.share;
    }

    export function getStageWidth(): number {
        return __STAGE.stageWidth;
    }

    export function getStageHeight(): number {
        return __STAGE.stageHeight;
    }
}
