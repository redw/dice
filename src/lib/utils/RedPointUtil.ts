/**
 * 红点工具
 * 通常只需调注册registerRedPoint
 *
 * Created by hh on 2017/4/18.
 */
module RedPointUtil {
    import DisplayObjectContainer = egret.DisplayObjectContainer;

    let interval = 0;
    let disList:{fun:Function, context?:any, dis:egret.DisplayObject, offX:number, offY:number, param?:string}[] = [];

    export function startTick() {
        interval = egret.setInterval(RedPointUtil.onSecondTick, RedPointUtil, 1000);
    }

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
    export function registerRedPoint(dis:egret.DisplayObject, fun:Function, context?:any, offX:number = 0, offY:number = 0, param:any = null) {
        let exist:boolean = false;
        for (let i = 0; i < disList.length; i++) {
            if (disList[i].dis == dis) {
                disList[i].param = param;
                exist = true;
                break;
            }
        }
        if (!exist) {
            disList.push({dis:dis, fun:fun, context:context, offX:offX, offY:offY, param:param})
        }
    }

    export function unRegisterRedPoint(dis:egret.DisplayObject) {
        let len = disList.length;
        for (let i = 0; i < len; i++) {
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

    export function changeParam(dis:egret.DisplayObject, param:string = null) {
        for (let i = 0; i < disList.length; i++) {
            if (disList[i].dis == dis) {
                disList[i].param = param;
                break;
            }
        }
    }

    export function onSecondTick() {
        let len = disList.length;
        for (let i = 0; i < len; i++) {
            if (!disList[i] || !disList[i].dis || !disList[i].dis.stage) {
                disList.splice(i, 1);
                i--;
                len--;
            } else {
                if (disList[i] && disList[i].dis.visible && disList[i].dis.width > 0 && disList[i].dis.height > 0) {
                    let fun = disList[i].fun;
                    let context = disList[i].context;
                    let param = disList[i].param;
                    let dis = disList[i].dis;
                    let offX = disList[i].offX || 0;
                    let offY = disList[i].offY || 0;
                    let isNeedShow = false;
                    if (!context) {
                        isNeedShow = fun(param)
                    } else {
                        isNeedShow = fun.call(context, param);
                    }
                    if (isNeedShow) {
                        addRedPoint(dis, offX, offY);
                    } else {
                        removeRedPoint(dis);
                    }
                }
            }
        }
    }

    export function addRedPoint(dis:egret.DisplayObject, offX = 0, offY = 0, w = 0, source = "red_point_png") {
        if (dis) {
            let redPoint:RedPoint = dis["red_point"];
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
            } else {
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

    export function removeRedPoint(dis:egret.DisplayObject) {
        if ("red_point" in dis) {
            unRegisterRedPoint(dis);
            // (dis["red_point"]).parent.removeChild(dis["red_point"]);
            // delete dis["red_point"];
        }
    }
}
