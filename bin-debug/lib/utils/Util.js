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
    function isSimpleType(value) {
        var t = typeof (value);
        return t == "number" || t == "boolean" || t == "string";
    }
    Util.isSimpleType = isSimpleType;
    function getNumber(obj, key, defaultValue) {
        if (obj) {
            var value = obj[key];
            if (value == null || value === "NaN") {
                return defaultValue;
            }
            return +value || 0;
        }
        return defaultValue;
    }
    Util.getNumber = getNumber;
    function getString(obj, key, defaultValue) {
        if (obj) {
            if (key in obj) {
                return String(obj[key]);
            }
            return defaultValue;
        }
        return defaultValue;
    }
    Util.getString = getString;
    function getProperty(obj, prop) {
        var parts = prop.split("."), last = parts.pop(), len = parts.length, i = 1, current = parts[0];
        while (i < len && (obj == obj[current])) {
            current = parts[i];
            i++;
        }
        if (obj) {
            return obj[last];
        }
        else {
            return null;
        }
    }
    Util.getProperty = getProperty;
    function setProperty(obj, prop, value) {
        var parts = prop.split("."), last = parts.pop(), len = parts.length, i = 1, current = parts[0];
        while (i < len && (obj == obj[current])) {
            current = parts[i];
            i++;
        }
        if (obj) {
            obj[last] = value;
        }
        return obj;
    }
    Util.setProperty = setProperty;
})(Util || (Util = {}));
