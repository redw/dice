module Global {
    export let TEST = false;
    export let GAME_ID = 0;
    export let TOKEN = "";
    export let H_HOST = "";
    export let S_HOST = "";
    export let S_PORT = 0;
    export let SHARE_ENABLED: boolean;// 是否可分享

    export function boot(data: any): void {
        GAME_ID = data.id;
        TOKEN = data.token;
        H_HOST = data.h_host;
        S_HOST = data.s_host;
        S_PORT = data.s_port;
        SHARE_ENABLED = data.share;
        TEST = data.test;
    }
}
