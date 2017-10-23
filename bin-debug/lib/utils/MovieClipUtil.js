/**
 * mc工具
 *
 * Created by hh on 2017/5/15.
 */
var MovieClipUtil;
(function (MovieClipUtil) {
    var pool = {};
    var countMap = {};
    var mcFactory = new egret.MovieClipDataFactory();
    function init() {
        egret.setInterval(checkCount, MovieClipUtil, 120000);
    }
    MovieClipUtil.init = init;
    function checkCount() {
        var keys = Object.keys(countMap);
        var len = keys.length;
        for (var i = 0; i < len; i++) {
            var key = keys[i];
            if (countMap[key]) {
                if (countMap[key] = countMap[key] - 1) {
                    if (!countMap[key]) {
                        var arr = pool[key];
                        if (arr && arr.length > 0) {
                            for (var j = 0; j < arr.length; j++) {
                                arr[j] = null;
                            }
                            pool[key] = [];
                        }
                    }
                }
            }
        }
    }
    MovieClipUtil.checkCount = checkCount;
    function addCount(name) {
        if (!countMap[name]) {
            countMap[name] = 1;
        }
        else {
            countMap[name] = countMap[name] + 1;
        }
    }
    function createMovieClip(name, suffix) {
        if (suffix === void 0) { suffix = "_"; }
        if (pool[name] && pool[name].length > 0) {
            addCount(name);
            return pool[name].pop();
        }
        else {
            var dataRes = RES.getRes("" + name + suffix + "json");
            var textureRes = RES.getRes("" + name + suffix + "png");
            if (!dataRes || !textureRes) {
                return null;
            }
            else {
                mcFactory.mcDataSet = dataRes;
                mcFactory.texture = textureRes;
                var mc = new egret.MovieClip(mcFactory.generateMovieClipData(name));
                if (!mc.totalFrames) {
                    mc = null;
                    console.error("\u8D44\u6E90" + name + "\u9519\u8BEF");
                }
                return mc;
            }
        }
    }
    MovieClipUtil.createMovieClip = createMovieClip;
    function createMovieClipByRes(dataRes, textureRes, mcName, cacheName) {
        var name = cacheName || mcName;
        if (pool[name] && pool[name].length > 0) {
            addCount(name);
            return pool[name].pop();
        }
        else {
            if (!dataRes || !textureRes) {
                return null;
            }
            else {
                mcFactory.mcDataSet = dataRes;
                mcFactory.texture = textureRes;
                return new egret.MovieClip(mcFactory.generateMovieClipData(mcName));
            }
        }
    }
    MovieClipUtil.createMovieClipByRes = createMovieClipByRes;
    /**
     * mc上是否存在标签
     * @param label
     * @param mc
     * @returns {boolean}
     */
    function existMCLabel(label, mc) {
        var result = false;
        if (mc && "frameLabels" in mc) {
            var arr = mc["frameLabels"];
            var len = arr ? arr.length : 0;
            for (var i = 0; i < len; i++) {
                var frameLabel = arr[i];
                if (frameLabel.name == label) {
                    result = true;
                    break;
                }
            }
        }
        return result;
    }
    MovieClipUtil.existMCLabel = existMCLabel;
    /**
     * 是否有空闲的mc
     *
     * @param name
     * @returns {any|boolean}
     */
    function hasFreeMC(name) {
        return pool[name] && pool[name].length > 0;
    }
    MovieClipUtil.hasFreeMC = hasFreeMC;
    /**
     * 把mc放到对象池
     *
     * @param mc
     * @param name  别名
     */
    function release(mc, name) {
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
    MovieClipUtil.release = release;
})(MovieClipUtil || (MovieClipUtil = {}));
