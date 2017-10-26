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

    export function objToArr(obj:any, out?:any[]) {
        if (!out) {
            out = [];
        }
        if (obj) {
            let keys = Object.keys(obj);
            for (let i = 0, len = keys.length; i < len; i++) {
                let key = keys[i];
                out.push(obj[key]);
            }
        }
        return out;
    }

    export function getValue(source:any, key:string, defaultValue?:any) {
        if (!source || typeof source === 'number') {
            return defaultValue;
        } else if (source.hasOwnProperty(key)) {
            return source[key];
        } else if (key.indexOf('.'))
        {
            let keys = key.split('.');
            let parent = source;
            let value = defaultValue;
            //  Use for loop here so we can break early
            for (var i = 0; i < keys.length; i++) {
                if (parent.hasOwnProperty(keys[i])) {
                    //  Yes it has a key property, let's carry on down
                    value = parent[keys[i]];
                    parent = parent[keys[i]];
                } else {
                    //  Can't go any further, so reset to default
                    value = defaultValue;
                    break;
                }
            }
            return value;
        } else {
            return defaultValue;
        }
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
}