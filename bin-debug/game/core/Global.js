var Global;
(function (Global) {
    Global.GAME_ID = 0;
    Global.TOKEN = "";
    Global.H_HOST = "";
    Global.S_HOST = "";
    Global.S_PORT = 0;
    function initConfig(data) {
        Global.GAME_ID = data.id;
        Global.TOKEN = data.token;
        Global.H_HOST = data.h_host;
        Global.S_HOST = data.s_host;
        Global.S_PORT = data.s_port;
        Global.SHARE_ENABLED = data.share;
    }
    Global.initConfig = initConfig;
    function getStageWidth() {
        return __STAGE.stageWidth;
    }
    Global.getStageWidth = getStageWidth;
    function getStageHeight() {
        return __STAGE.stageHeight;
    }
    Global.getStageHeight = getStageHeight;
})(Global || (Global = {}));
//# sourceMappingURL=Global.js.map