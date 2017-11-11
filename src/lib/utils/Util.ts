/**
 * 一些常用的工具
 *
 * Created by hh on 2017/6/13 0013.
 */
module Util {
    export function mixin(from:any, to:any) {
        if (!from || typeof (from) !== "object") {
            return to;
        }
        for (let key in from) {
            let o = from[key];
            let type = typeof (from[key]);
            if (!from[key] || type !== "object") {
                if (to === null) {
                    to = new from.constructor();
                }
                to[key] = from[key];
            } else {
                if (typeof (to[key]) === type) {
                    to[key] = mixin(from[key], to[key]);
                } else {
                    to[key] = mixin(from[key], new o.constructor());
                }
            }
        }
        return to;
    }

    /**
     * 此处修改了数据源.
     * @param obj
     * @param out
     * @param autoAddId
     * @returns {any[]}
     */
    export function objToArr(obj:any, out?:any[], autoAddId = false) {
        if (!out) {
            out = [];
        }
        if (obj) {
            let keys = Object.keys(obj);
            for (let i = 0, len = keys.length; i < len; i++) {
                let key = keys[i];
                if (autoAddId) {
                    obj[key].id = +key;
                }
                out.push(obj[key]);
            }
        }
        return out;
    }



    // 升序
    export function ascendSort(a:{order:number}, b:{order:number}) {
        if (a && b) {
            return a.order - b.order;
        }
        return 0;
    }

    // 降序
    export function descendSort(a:{order:number}, b:{order:number}) {
        if (a && b) {
            return b.order - a.order;
        }
        return 0;
    }

    export function getRandomInt(from:number, end:number) {
        let len = end - from;
        let value = from;
        if (len > 0) {
            value = from + Math.round(Math.random() * len);
        }
        return value;
    }

    export function isSimpleType(value:any) {
        let t = typeof (value);
        return t == "number" || t == "boolean" || t == "string";
    }

    export function getPropValue(source:any, key:string, defaultValue?:any) {
        if (!source || typeof source === 'number') {
            return defaultValue;
        } else if (source.hasOwnProperty(key) || typeof key === 'number') {
            return source[key];
        } else if (key.indexOf('.') >= 0) {
            let keys = key.split('.');
            let parent = source;
            let value = defaultValue;
            for (let i = 0, len = keys.length; i < len; i++) {
                if (parent && parent.hasOwnProperty(keys[i])) {
                    value = parent[keys[i]];
                    parent = parent[keys[i]];
                } else {
                    value = defaultValue;
                    break;
                }
            }
            return value;
        } else {
            return defaultValue;
        }
    }
}