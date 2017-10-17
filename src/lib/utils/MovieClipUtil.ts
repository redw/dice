/**
 * mc工具
 *
 * Created by hh on 2017/5/15.
 */
module MovieClipUtil {
    let pool:any = {};
    let countMap:any = {};
    let mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory();

    export function init(){
        egret.setInterval(checkCount, MovieClipUtil, 120000);
    }

    export function checkCount(){
        let keys = Object.keys(countMap);
        let len = keys.length;
        for (let i = 0; i < len; i++) {
            let key = keys[i];
            if (countMap[key]) {
                if (countMap[key] = countMap[key] - 1) {
                    if (!countMap[key]) {
                        let arr = pool[key];
                        if (arr && arr.length > 0) {
                            for (let j = 0; j < arr.length; j++) {
                                arr[j] = null;
                            }
                            pool[key] = [];
                        }
                    }
                }
            }
        }
    }

    function addCount(name:string) {
        if (!countMap[name]) {
            countMap[name] = 1;
        } else {
            countMap[name] = countMap[name] + 1;
        }
    }

    export function createMovieClip(name:string, suffix:string="_"):egret.MovieClip {
        if (pool[name] && pool[name].length > 0) {
            addCount(name);
            return pool[name].pop();
        } else {
            let dataRes:any = RES.getRes(`${name}${suffix}json`);
            let textureRes:any = RES.getRes(`${name}${suffix}png`);
            if (!dataRes || !textureRes) {
                return null;
            } else {
                mcFactory.mcDataSet = dataRes;
                mcFactory.texture = textureRes;
                let mc = new egret.MovieClip(mcFactory.generateMovieClipData(name));
                if (!mc.totalFrames) {
                    mc = null;
                    console.error(`资源${name}错误`);
                }
                return mc;
            }
        }
    }

    export function createMovieClipByRes(dataRes:any, textureRes:any, mcName:string, cacheName?:string) {
        let name = cacheName || mcName;
        if (pool[name] && pool[name].length > 0) {
            addCount(name);
            return pool[name].pop();
        } else {
            if (!dataRes || !textureRes) {
                return null;
            } else {
                mcFactory.mcDataSet = dataRes;
                mcFactory.texture = textureRes;
                return new egret.MovieClip(mcFactory.generateMovieClipData(mcName));
            }
        }
    }

    /**
     * mc上是否存在标签
     * @param label
     * @param mc
     * @returns {boolean}
     */
    export function existMCLabel(label:string, mc:egret.MovieClip){
        let result = false;
        if (mc && "frameLabels" in mc) {
            let arr = mc["frameLabels"];
            let len = arr ? arr.length : 0;
            for (let i = 0; i < len; i++) {
                let frameLabel:egret.FrameLabel = arr[i];
                if (frameLabel.name == label) {
                    result = true;
                    break;
                }
            }
        }
        return result;
    }

    /**
     * 是否有空闲的mc
     *
     * @param name
     * @returns {any|boolean}
     */
    export function hasFreeMC(name:string) {
        return pool[name] && pool[name].length > 0;
    }

    /**
     * 把mc放到对象池
     *
     * @param mc
     * @param name  别名
     */
    export function release(mc:egret.MovieClip, name?:string){
        if (mc) {
            var mcName = name || mc.name;
            if (!pool[mcName]) {
                pool[mcName] = [];
            }
            mc.gotoAndStop(1);
            DisplayUtil.removeFromParent(mc);
            pool[mcName].push(mc);
        }
    }
}
