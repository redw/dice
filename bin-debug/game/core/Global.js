var Global;
(function (Global) {
    Global.TEST = false;
    Global.GAME_ID = 0;
    Global.TOKEN = "";
    Global.H_HOST = "";
    Global.S_HOST = "";
    Global.S_PORT = 0;
    function boot(data) {
        Global.GAME_ID = data.id;
        Global.TOKEN = data.token;
        Global.H_HOST = data.h_host;
        Global.S_HOST = data.s_host;
        Global.S_PORT = data.s_port;
        Global.SHARE_ENABLED = data.share;
        Global.TEST = data.test;
    }
    Global.boot = boot;
})(Global || (Global = {}));
//# sourceMappingURL=Global.js.map