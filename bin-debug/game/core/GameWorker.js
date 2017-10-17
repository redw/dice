/**
 * Created by hh on 2017/8/7 0007.
 */
var GameWorker;
(function (GameWorker) {
    var netWorker;
    var skeRes = {};
    function boot() {
        netWorker = new Worker(getBasePath() + "resource/web/netWorker.js");
        netWorker.onmessage = onNetMessage;
    }
    GameWorker.boot = boot;
    function onNetMessage(event) {
        var info = event.data;
        if (info.url.indexOf(".png") >= 0) {
            GameConfig.setData(info.content);
            EventManager.inst.dispatchEventWith(GameEvents.LOAD_CONFIG_COMPLETE);
        }
        else if (info.url.indexOf("_bone_ske.json") >= 0) {
            var id = +(info.url.replace("_bone_ske.json", ""));
            skeRes[id] = info.content;
            EventManager.inst.dispatchEventWith(GameEvents.LOAD_SKE_COMPLETE, false, id);
        }
    }
    function getBasePath() {
        var origin = window.location.origin;
        var pathName = window.location.pathname;
        var index = origin.indexOf(".com");
        if (index >= 0) {
            origin = origin.substr(0, index + 4) + pathName;
        }
        else {
            origin = window.location.href + "/";
        }
        var path = origin.replace("\/index.html", "");
        return path;
    }
    function loadConfig() {
        var url = getBasePath() + "resource/blank.png";
        netWorker.postMessage({ action: "loadGameConfig", param: url });
    }
    GameWorker.loadConfig = loadConfig;
    function loadSke(id) {
        if (skeRes[id] === undefined) {
            skeRes[id] = 0;
            var url = getBasePath() + "resource/ske/" + id + "_bone.json";
            netWorker.postMessage({ action: "loadSkeFile", param: url });
        }
    }
    GameWorker.loadSke = loadSke;
    function getSke(id) {
        return skeRes[id];
    }
    GameWorker.getSke = getSke;
})(GameWorker || (GameWorker = {}));
//# sourceMappingURL=GameWorker.js.map