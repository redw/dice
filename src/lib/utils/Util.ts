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

    export function getPropValue(obj:any, prop:string, defV?:any) {
        if (!obj) {
            return defV;
        } else {
            if (obj.hasOwnProperty(prop)) {
                return obj.prop;
            } else {
                return defV;
            }
        }
    }

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
}