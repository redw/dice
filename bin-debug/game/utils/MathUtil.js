/**
 * 数学工具
 * @author j
 *
 */
var MathUtil;
(function (MathUtil) {
    var _hasInit = false;
    var _unitValue = [];
    var totalCount = 0;
    MathUtil.unitKey = ["k", "m", "b", "t"];
    var lowercaseLetter = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    init();
    function init() {
        if (_hasInit == false) {
            _hasInit = true;
            totalCount = 4;
            for (var i = 0; i < 26; i++) {
                for (var j = 0; j < 26; j++) {
                    for (var t = 0; t < 26; t++) {
                        var key = lowercaseLetter[j] + lowercaseLetter[t];
                        if (totalCount >= 680) {
                            key = lowercaseLetter[i] + key;
                        }
                        MathUtil.unitKey.push(key);
                        totalCount++;
                    }
                }
            }
            for (var i = 0; i < totalCount; i++) {
                _unitValue.push((i + 1) * 3);
                // totalCount++;
            }
        }
    }
    /**
     * 把数字转化为百分比
     * @param value
     * @returns {string}
     */
    function toPercentage(value, fractionDigits) {
        if (fractionDigits === void 0) { fractionDigits = 0; }
        if (value * 100 < 1000) {
            return StringUtil.toFixed(value * 100, fractionDigits) + "%";
        }
        else {
            return MathUtil.easyNumber(value * 100) + "%";
        }
    }
    MathUtil.toPercentage = toPercentage;
    /**
     * 两点之间的距离
     * @param pos1
     * @param pos2
     * @returns {number}
     */
    function pointDistance(pos1, pos2) {
        return Math.sqrt((pos1.x - pos2.x) * (pos1.x - pos2.x) + (pos1.y - pos2.y) * (pos1.y - pos2.y));
    }
    MathUtil.pointDistance = pointDistance;
    /**
     * 数值上下限制
     * @param value
     * @param min
     * @param max
     * @returns {number}
     */
    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
    MathUtil.clamp = clamp;
    /**
     * 区间随机数
     * @param min
     * @param max
     * @returns {number}
     */
    function rangeRandom(min, max) {
        return MathUtil.clamp(Math.floor(Math.random() * (max - min + 1) + min), min, max);
    }
    MathUtil.rangeRandom = rangeRandom;
    function easyNumber(value) {
        var num = new BigNum(value);
        if (num.e < 3) {
            var n = num.n * Math.pow(10, num.e);
            if (num.e == 0) {
                return Math.round(n).toString();
            }
            else if (num.e == 1) {
                return Math.round(n).toString();
            }
            else {
                return Math.round(n).toString();
            }
        }
        for (var i = 0; i < totalCount; i++) {
            var diff = num.e - _unitValue[i];
            if (diff < 3) {
                var n = num.n * Math.pow(10, diff);
                if (diff == 0) {
                    return parseFloat(n.toFixed(2)) + MathUtil.unitKey[i];
                }
                else if (diff == 1) {
                    return parseFloat(n.toFixed(1)) + MathUtil.unitKey[i];
                }
                else {
                    return parseFloat(n.toFixed(0)) + MathUtil.unitKey[i];
                }
            }
        }
        return num + MathUtil.unitKey[MathUtil.unitKey.length - 1];
    }
    MathUtil.easyNumber = easyNumber;
})(MathUtil || (MathUtil = {}));
//# sourceMappingURL=MathUtil.js.map