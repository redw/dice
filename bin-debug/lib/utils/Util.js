/**
 * 一些常用的工具
 *
 * Created by hh on 2017/6/13 0013.
 */
var Util;
(function (Util) {
    function mixin(from, to) {
        if (!from || typeof (from) !== "object") {
            return to;
        }
        for (var key in from) {
            var o = from[key];
            var type = typeof (from[key]);
            if (!from[key] || type !== "object") {
                if (to === null) {
                    to = new from.constructor();
                }
                to[key] = from[key];
            }
            else {
                if (typeof (to[key]) === type) {
                    to[key] = mixin(from[key], to[key]);
                }
                else {
                    to[key] = mixin(from[key], new o.constructor());
                }
            }
        }
        return to;
    }
    Util.mixin = mixin;
    /**
     * 对象转化成数组
     * @param obj
     * @param out
     * @returns {any[]}
     */
    function objToArr(obj, out) {
        if (!out) {
            out = [];
        }
        if (obj) {
            var keys = Object.keys(obj);
            for (var i = 0, len = keys.length; i < len; i++) {
                var key = keys[i];
                out.push(obj[key]);
            }
        }
        return out;
    }
    Util.objToArr = objToArr;
    /**
     * 根据对象的order属性 从小到大排序
     * @param a
     * @param b
     * @returns {number}
     */
    function sortByOrder(a, b) {
        if (a && b) {
            return a.order - b.order;
        }
        return 0;
    }
    Util.sortByOrder = sortByOrder;
    /**
     * 根据对象的order属性 从大到小排序
     * @param a
     * @param b
     * @returns {number}
     */
    function sortByOrder1(a, b) {
        if (a && b) {
            return b.order - a.order;
        }
        return 0;
    }
    Util.sortByOrder1 = sortByOrder1;
    function getRandomInt(from, end) {
        var len = end - from;
        var value = from;
        if (len > 0) {
            value = from + Math.round(Math.random() * len);
        }
        return value;
    }
    Util.getRandomInt = getRandomInt;
    function isSimpleType(value) {
        var t = typeof (value);
        return t == "number" || t == "boolean" || t == "string";
    }
    Util.isSimpleType = isSimpleType;
    function getPropValue(obj, prop, defV) {
        if (!obj) {
            return defV;
        }
        else {
            if (obj.hasOwnProperty(prop)) {
                return obj.prop;
            }
            else {
                return defV;
            }
        }
    }
    Util.getPropValue = getPropValue;
    // export function getProperty(obj:any, prop:string) {
    //     let parts = prop.split("."),
    //         last = parts.pop(),
    //         len = parts.length,
    //         i = 1,
    //         current = parts[0];
    //     while (i < len && (obj == obj[current])) {
    //         current = parts[i];
    //         i++;
    //     }
    //     if (obj) {
    //         return obj[last];
    //     } else {
    //         return null;
    //     }
    // }
    //
    // export function setProperty(obj:any, prop:string, value:any) {
    //     let parts = prop.split("."),
    //         last = parts.pop(),
    //         len = parts.length,
    //         i = 1,
    //         current = parts[0];
    //     while (i < len && (obj == obj[current])) {
    //         current = parts[i];
    //         i++;
    //     }
    //     if (obj) {
    //         obj[last] = value;
    //     }
    //     return obj;
    // }
})(Util || (Util = {}));
