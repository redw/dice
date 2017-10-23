/**
 * 处理游戏中的加载
 */
module LoadManager {
    let uid =  0;
    let loadWorker;
    let loadingParamList;
    let hadListener = false;

    export function boot() {
        hadListener = true;
        loadingParamList = [];
        loadWorker = new Worker(getBasePath() + "src/lib/netWorker.js");
        loadWorker.onmessage = onNetMessage;
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, groupLoadComplete, LoadManager);
    }

    function onNetMessage(e) {
        let info = e.data;
        doLoadComplete(info.url, info.content);
    }

    export function loadConfigData(url:string, back:Function, context:any) {
        url = getBasePath() + url;
        loadingParamList.push(url, back, context);
        loadWorker.postMessage({action:"loadGameConfig", param:url});
    }

    function groupLoadComplete(e:RES.ResourceEvent) {
        let name = e.groupName;
        doLoadComplete(name);
    }

    function doLoadComplete(name:string, data?:any) {
        let len = loadingParamList ? loadingParamList.length : 0;
        for (let i = 0; i < len; i+= 3) {
            if (loadingParamList[i] == name) {
                let fun = loadingParamList[i + 1];
                let context = loadingParamList[i + 2];
                fun.call(context, data);
                loadingParamList.splice(i, 3);
                break;
            }
        }
    }

    /**
     * 加载group资源
     * @param urlList
     * @param back
     * @param context
     * @param property
     */
    export function loadGroup(urlList:string[], back:any, context:any, property?:number) {
        if (!hadListener) {
            hadListener = true;
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, groupLoadComplete, LoadManager);
        }
        uid++;
        let name = `group_#_${uid}`;
        loadingParamList.push([name, back, context]);
        RES.createGroup(name, urlList);
        RES.loadGroup(name, property);
    }

    /**
     * 加载list
     * @param urlList
     * @param compFunc
     * @param progFunc
     * @param thisObject
     */
    export function loadList(urlList:string[], compFunc:any, progFunc:any, thisObject:any):void {
        let resList:Object = {};
        let urlLen:number = urlList.length;
        function next():void {
            let url:string = urlList.shift();
            RES.getResByUrl(url, function(res: any):void {
                    resList[url] = res;
                    if (progFunc) {
                        progFunc.call(thisObject, (urlLen - urlList.length) / urlLen);
                    }
                    if (urlList.length <= 0) {
                        compFunc.call(thisObject, resList);
                    } else {
                        next();
                    }
                }, this);
        }
        next();
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
}  