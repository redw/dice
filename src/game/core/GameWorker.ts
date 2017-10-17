/**
 * Created by hh on 2017/8/7 0007.
 */
module GameWorker {
    let netWorker:Worker;
    let skeRes = {};

    export function boot() {
        netWorker = new Worker(getBasePath() + "resource/web/netWorker.js");
        netWorker.onmessage = onNetMessage;
    }

    function onNetMessage(event:any) {
        let info = event.data;
        if (info.url.indexOf(".png") >= 0) {
            GameConfig.setData(info.content);
            EventManager.inst.dispatchEventWith(GameEvents.LOAD_CONFIG_COMPLETE);
        } else if (info.url.indexOf("_bone_ske.json") >= 0) {
            let id = +(info.url.replace("_bone_ske.json", ""));
            skeRes[id] = info.content;
            EventManager.inst.dispatchEventWith(GameEvents.LOAD_SKE_COMPLETE, false, id);
        }
    }

    function getBasePath() {
        let origin = window.location.origin;
        let pathName = window.location.pathname;
        let index = origin.indexOf(".com");
        if (index >= 0) {
            origin = origin.substr(0, index + 4) + pathName;
        } else {
            origin = window.location.href + "/";
        }
        let path = origin.replace("\/index.html", "");
        return path;
    }

    export function loadConfig() {
        let url = getBasePath() + "resource/blank.png";
        netWorker.postMessage({action:"loadGameConfig", param:url});
    }

    export function loadSke(id:number) {
        if (skeRes[id] === undefined) {
            skeRes[id] = 0;
            let url = getBasePath() + "resource/ske/" + id + "_bone.json";
            netWorker.postMessage({action:"loadSkeFile", param:url});
        }
    }

    export function getSke(id:number) {
        return skeRes[id];
    }
}
