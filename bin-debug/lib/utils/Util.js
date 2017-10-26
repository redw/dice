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
    function getValue(source, key, defaultValue) {
        if (!source || typeof source === 'number') {
            return defaultValue;
        }
        else if (source.hasOwnProperty(key)) {
            return source[key];
        }
        else if (key.indexOf('.')) {
            var keys = key.split('.');
            var parent_1 = source;
            var value = defaultValue;
            //  Use for loop here so we can break early
            for (var i = 0; i < keys.length; i++) {
                if (parent_1.hasOwnProperty(keys[i])) {
                    //  Yes it has a key property, let's carry on down
                    value = parent_1[keys[i]];
                    parent_1 = parent_1[keys[i]];
                }
                else {
                    //  Can't go any further, so reset to default
                    value = defaultValue;
                    break;
                }
            }
            return value;
        }
        else {
            return defaultValue;
        }
    }
    Util.getValue = getValue;
    // 升序
    function ascendSort(a, b) {
        if (a && b) {
            return a.order - b.order;
        }
        return 0;
    }
    Util.ascendSort = ascendSort;
    // 降序
    function descendSort(a, b) {
        if (a && b) {
            return b.order - a.order;
        }
        return 0;
    }
    Util.descendSort = descendSort;
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
})(Util || (Util = {}));
//# sourceMappingURL=Util.js.map