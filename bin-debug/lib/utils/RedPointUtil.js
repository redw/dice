/**
 * 红点工具
 * 通常只需调注册registerRedPoint
 *
 * Created by hh on 2017/4/18.
 */
var RedPointUtil;
(function (RedPointUtil) {
    var interval = 0;
    var disList = [];
    function startTick() {
        interval = egret.setInterval(RedPointUtil.onSecondTick, RedPointUtil, 1000);
    }
    RedPointUtil.startTick = startTick;
    /**
     * 注册红点
     *
     * @param dis       显示对象
     * @param funName   函数
     * @param context   函数调用时的上下文
     * @param offX      相对左上角的x方向偏移
     * @param offY      相对左上角的y方向偏移
     * @param param     参数
     */
    function registerRedPoint(dis, fun, context, offX, offY, param) {
        if (offX === void 0) { offX = 0; }
        if (offY === void 0) { offY = 0; }
        if (param === void 0) { param = null; }
        var exist = false;
        for (var i = 0; i < disList.length; i++) {
            if (disList[i].dis == dis) {
                disList[i].param = param;
                exist = true;
                break;
            }
        }
        if (!exist) {
            disList.push({ dis: dis, fun: fun, context: context, offX: offX, offY: offY, param: param });
        }
    }
    RedPointUtil.registerRedPoint = registerRedPoint;
    function unRegisterRedPoint(dis) {
        var len = disList.length;
        for (var i = 0; i < len; i++) {
            if (disList[i].dis == dis) {
                disList.splice(i, 1);
                len--;
                break;
            }
        }
        if ("red_point" in dis) {
            (dis["red_point"]).parent.removeChild(dis["red_point"]);
            delete dis["red_point"];
        }
    }
    RedPointUtil.unRegisterRedPoint = unRegisterRedPoint;
    function changeParam(dis, param) {
        if (param === void 0) { param = null; }
        for (var i = 0; i < disList.length; i++) {
            if (disList[i].dis == dis) {
                disList[i].param = param;
                break;
            }
        }
    }
    RedPointUtil.changeParam = changeParam;
    function onSecondTick() {
        var len = disList.length;
        for (var i = 0; i < len; i++) {
            if (!disList[i] || !disList[i].dis || !disList[i].dis.stage) {
                disList.splice(i, 1);
                i--;
                len--;
            }
            else {
                if (disList[i] && disList[i].dis.visible && disList[i].dis.width > 0 && disList[i].dis.height > 0) {
                    var fun = disList[i].fun;
                    var context = disList[i].context;
                    var param = disList[i].param;
                    var dis = disList[i].dis;
                    var offX = disList[i].offX || 0;
                    var offY = disList[i].offY || 0;
                    var isNeedShow = false;
                    if (!context) {
                        isNeedShow = fun(param);
                    }
                    else {
                        isNeedShow = fun.call(context, param);
                    }
                    if (isNeedShow) {
                        addRedPoint(dis, offX, offY);
                    }
                    else {
                        removeRedPoint(dis);
                    }
                }
            }
        }
    }
    RedPointUtil.onSecondTick = onSecondTick;
    function addRedPoint(dis, offX, offY, w, source) {
        if (offX === void 0) { offX = 0; }
        if (offY === void 0) { offY = 0; }
        if (w === void 0) { w = 0; }
        if (source === void 0) { source = "red_point_png"; }
        if (dis) {
            var redPoint = dis["red_point"];
            if (redPoint && redPoint.parent) {
                redPoint.parent.removeChild(redPoint);
            }
            if (!w) {
                w = dis.width;
            }
            if (!redPoint) {
                redPoint = new RedPoint();
            }
            redPoint.x = w + offX - 14;
            redPoint.y = offY + 12;
            if (egret.is(dis, "DisplayObjectContainer")) {
                dis["addChild"](redPoint);
            }
            else {
                redPoint.x += dis.x;
                redPoint.y += dis.y;
                if (dis.parent) {
                    dis.parent.addChild(redPoint);
                }
            }
            dis["red_point"] = redPoint;
            redPoint.bitmap.source = source;
        }
    }
    RedPointUtil.addRedPoint = addRedPoint;
    function removeRedPoint(dis) {
        if ("red_point" in dis) {
            unRegisterRedPoint(dis);
            // (dis["red_point"]).parent.removeChild(dis["red_point"]);
            // delete dis["red_point"];
        }
    }
    RedPointUtil.removeRedPoint = removeRedPoint;
})(RedPointUtil || (RedPointUtil = {}));
//# sourceMappingURL=RedPointUtil.js.map