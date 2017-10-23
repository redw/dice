/**
 * 数学工具
 * @author j
 *
 */
module MathUtil {
    let _hasInit:boolean = false;
    let _unitValue:number[] = [];
    let totalCount = 0;

    export let unitKey:string[] = ["k", "m", "b", "t"];
    let lowercaseLetter:string[] = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

    init();

    function init():void {
        if (_hasInit == false) {
            _hasInit = true;
            totalCount = 4;
            for (let i = 0; i < 26; i++) {
                for (let j = 0; j < 26; j++) {
                    for (let t = 0; t < 26; t++) {
                        let key = lowercaseLetter[j] + lowercaseLetter[t];
                        if (totalCount >= 680) {
                            key = lowercaseLetter[i] + key;
                        }
                        unitKey.push(key);
                        totalCount++;
                    }
                }
            }

            for (let i = 0; i < totalCount; i++) {
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
    export function toPercentage(value:number, fractionDigits:number = 0) {
        if (value * 100 < 1000) {
            return StringUtil.toFixed(value * 100, fractionDigits) + "%"
        } else {
            return MathUtil.easyNumber(value * 100) + "%"
        }
    }

    /**
     * 两点之间的距离
     * @param pos1
     * @param pos2
     * @returns {number}
     */
    export function pointDistance(pos1:egret.Point, pos2:egret.Point):number {
        return Math.sqrt((pos1.x - pos2.x) * (pos1.x - pos2.x) + (pos1.y - pos2.y) * (pos1.y - pos2.y));
    }

    /**
     * 数值上下限制
     * @param value
     * @param min
     * @param max
     * @returns {number}
     */
    export function clamp(value:number, min:number, max:number):number {
        return Math.min(Math.max(value, min), max);
    }

    /**
     * 区间随机数
     * @param min
     * @param max
     * @returns {number}
     */
    export function rangeRandom(min:number, max:number):number {
        return MathUtil.clamp(Math.floor(Math.random() * (max - min + 1) + min), min, max);
    }

    export function easyNumber(value:any):string {
        var num:BigNum = new BigNum(value);

        if (num.e < 3) {
            var n:number = num.n * Math.pow(10, num.e);

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
            var diff:number = num.e - _unitValue[i];
            if (diff < 3) {
                var n:number = num.n * Math.pow(10, diff);

                if (diff == 0) {
                    return parseFloat(n.toFixed(2)) + unitKey[i];
                }
                else if (diff == 1) {
                    return parseFloat(n.toFixed(1)) + unitKey[i];
                }
                else {
                    return parseFloat(n.toFixed(0)) + unitKey[i];
                }
            }
        }
        return num + unitKey[unitKey.length - 1];
    }
}