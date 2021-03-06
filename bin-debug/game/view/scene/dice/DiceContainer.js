var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DiceContainer = (function (_super) {
    __extends(DiceContainer, _super);
    function DiceContainer(homeLand) {
        var _this = _super.call(this) || this;
        _this.throwCount = 0;
        _this.throwValue = 0;
        _this.completeCount = 0;
        _this.size = 4;
        _this.homeLand = homeLand;
        _this.layer = new egret.DisplayObjectContainer();
        _this.addChild(_this.layer);
        _this.gridIndexArr = [];
        _this.diceIndexArr = [];
        var off = homeLand.des + homeLand.build + homeLand.road;
        var span = homeLand.des * 2 + homeLand.build * 2 + homeLand.road * 2 + homeLand.inner;
        var len = homeLand.inner;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < len; j++) {
                var value = (off + i) * span + off + j;
                _this.gridIndexArr.push(value);
            }
        }
        _this.diceArr = [];
        _this.addEventListener("DICE_ANI_COMPLETE", _this.diceAniComplete, _this);
        return _this;
    }
    // 添加随机色子
    DiceContainer.prototype.addRandomDice = function (value) {
        if (value === void 0) { value = 1; }
        while (true) {
            var pos = ArrayUtil.getRandomItem(this.gridIndexArr);
            if (this.diceIndexArr.indexOf(+pos) < 0) {
                var span = this.homeLand.des * 2 + this.homeLand.build * 2 + this.homeLand.road * 2 + this.homeLand.inner;
                var yy = ~~(pos / span);
                var xx = pos % span;
                this.addDice(xx, yy, value);
                break;
            }
        }
    };
    /**
     * 添加色子
     * @param xx    列数
     * @param yy    排数
     * @param value 色子点数
     * @param posX  色子相对于自身的X偏移
     * @param posY  色子相对于自身的Y偏移
     * @returns {Dice}
     */
    DiceContainer.prototype.addDice = function (xx, yy, value, posX, posY) {
        if (value === void 0) { value = 1; }
        if (posX === void 0) { posX = 48; }
        if (posY === void 0) { posY = 34; }
        var dice = new Dice(value);
        dice.xx = xx;
        dice.yy = yy;
        var span = this.homeLand.des * 2 + this.homeLand.build * 2 + this.homeLand.road * 2 + this.homeLand.inner;
        dice.order = yy * span + xx;
        this.diceIndexArr.push(yy * span + xx);
        var point = this.getGirdPosByXXYY(xx, yy);
        dice.setPos(point.x + posX, point.y + posY);
        this.layer.addChild(dice);
        this.sortDisplay();
        this.diceArr.push(dice);
        return dice;
    };
    // 得到色子值
    DiceContainer.prototype.getDiceValues = function () {
        var len = this.diceArr.length;
        var result = [];
        for (var i = 0; i < len; i++) {
            result.push(this.diceArr[i].getValue());
        }
        return result;
    };
    /**
     * 抛色子
     */
    DiceContainer.prototype.throwDice = function (values, method) {
        this.timerId = GameLoop.registerEnterFrame(this.sortDisplay, this);
        var len = this.diceArr.length;
        if (!values || !values.length) {
            values = [];
            for (var i = 0; i < len; i++) {
                var value_1 = ArrayUtil.getRandomItem(ArrayUtil.numberArray(1, 6));
                values.push(value_1);
            }
        }
        this.throwCount = values.length;
        this.completeCount = 0;
        var value = 0;
        var time = 400 + ~~(Math.random() * 100);
        var indexArr = this.gridIndexArr.concat();
        this.diceIndexArr = [];
        var count = 0;
        var span = this.homeLand.des * 2 + this.homeLand.build * 2 + this.homeLand.road * 2 + this.homeLand.inner;
        var throwInfo = [];
        var step = 0;
        var methodIndexArr = [];
        while (count < this.throwCount || step > 1000) {
            step++;
            var index = ArrayUtil.getRandomItem(indexArr);
            var methodIndex = Util.getRandomInt(0, 4);
            if (this.diceIndexArr.indexOf(index) < 0 && (methodIndexArr.length >= 5 || methodIndexArr.indexOf(methodIndex) < 0)) {
                var xx = index % span;
                var yy = ~~(index / span);
                var offArr = DiceContainer.DICE_OFF[methodIndex];
                var ok = true;
                for (var i = 0; i < offArr.length; i += 2) {
                    var newXX = xx + offArr[i];
                    var newYY = yy + offArr[i + 1];
                    var newIndex = newYY * span + newXX;
                    if (this.gridIndexArr.indexOf(newIndex) >= 0) {
                        ok = false;
                        break;
                    }
                }
                if (ok) {
                    count++;
                    throwInfo.push(DiceContainer.DICE_METHOD[methodIndex], xx, yy);
                    this.diceIndexArr.push(index);
                    methodIndexArr.push(methodIndex);
                    for (var i = 0; i < offArr.length; i += 2) {
                        var newXX = xx + offArr[i];
                        var newYY = yy + offArr[i + 1];
                        var newIndex = newYY * span + newXX;
                        this.diceIndexArr.push(newIndex);
                    }
                }
            }
        }
        if (step >= 1000) {
            console.log("抛色子算法错误");
        }
        else {
            for (var i = 0, len_1 = throwInfo.length; i < len_1; i += 3) {
                var dice = this.diceArr[~~(i / 3)];
                if (!dice) {
                    this.addRandomDice(1);
                }
                var method_1 = throwInfo[i];
                var xx = throwInfo[i + 1];
                var yy = throwInfo[i + 2];
                dice.xx = xx;
                dice.yy = yy;
                var index = yy * span + xx;
                dice.order = index;
                var point = this.getGridPosByIndex(index);
                value += dice.throw(point.x + 48, point.y + 34, values[i], method_1, time);
            }
            this.throwValue = value;
        }
    };
    DiceContainer.prototype.diceAniComplete = function () {
        this.completeCount++;
        if (this.throwCount == this.completeCount) {
            GameLoop.clearTimer(this.timerId);
            EventManager.inst.dispatchEventWith(GameEvents.DICE_COMPLETE);
        }
    };
    // 色子排序
    DiceContainer.prototype.sortDisplay = function () {
        this.diceArr.sort(Util.ascendSort);
        var len = this.diceArr.length;
        for (var i = 0; i < len; i++) {
            var dice = this.diceArr[i];
            this.layer.setChildIndex(dice, i);
        }
    };
    DiceContainer.prototype.getGridPosByIndex = function (index) {
        var span = this.homeLand.des * 2 + this.homeLand.build * 2 + this.homeLand.road * 2 + this.homeLand.inner;
        var xx = index % span;
        var yy = ~~(index / span);
        return this.getGirdPosByXXYY(xx, yy);
    };
    DiceContainer.prototype.getGirdPosByXXYY = function (xx, yy) {
        return this.homeLand.getGridPosByXXYY(xx, yy);
    };
    DiceContainer.DICE_METHOD = ["1", "2", "2_x", "3", "3_x"];
    DiceContainer.DICE_OFF = [[], [0, -1], [1, 0], [0, -1, 0 - 2], [1, 0, 2, 0]];
    return DiceContainer;
}(egret.DisplayObjectContainer));
__reflect(DiceContainer.prototype, "DiceContainer");
