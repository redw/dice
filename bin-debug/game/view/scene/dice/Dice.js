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
var Dice = (function (_super) {
    __extends(Dice, _super);
    function Dice(value) {
        var _this = _super.call(this) || this;
        _this.isTransforming = false;
        _this.pointCount = 0;
        _this.xx = 0;
        _this.yy = 0;
        _this.offX = 0;
        _this.offY = 0;
        _this.scaleX = 0.5;
        _this.scaleY = 0.5;
        var armature = BoneUtil.createArmature("dice_roll");
        var name = 1 + "-1";
        armature.animation.play(name, 1);
        _this.addChild(armature.display);
        _this.armature = armature;
        return _this;
    }
    Dice.prototype.setPos = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Dice.prototype.getValue = function () {
        return this.pointCount;
    };
    Object.defineProperty(Dice.prototype, "factor", {
        //添加factor的set,get方法,注意用public
        get: function () {
            return 0;
        },
        //计算方法参考 二次贝塞尔公式
        //(1 - t)^2 P0 + 2 t (1 - t) P1 + t^2 P2
        set: function (value) {
            var t = value;
            var p0_x = this.p0_x;
            var p0_y = this.p0_y;
            var p1_x = this.p1_x;
            var p1_y = this.p1_y;
            var p2_x = this.p2_x;
            var p2_y = this.p2_y;
            this.x = (1 - t) * (1 - t) * p0_x + 2 * t * (1 - t) * p1_x + t * t * p2_x;
            this.y = (1 - t) * (1 - t) * p0_y + 2 * t * (1 - t) * p1_y + t * t * p2_y;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 抛色子
     * @param toX
     * @param toY
     * @param value
     * @param method
     * @param dropTime  下落时间
     * @returns {any}
     */
    Dice.prototype.throw = function (toX, toY, value, method, dropTime) {
        if (!value) {
            value = ArrayUtil.getRandomItem(ArrayUtil.numberArray(1, 6));
        }
        if (!method) {
            method = 1;
        }
        if (!dropTime) {
            dropTime = 1000;
        }
        this.pointCount = value;
        this.method = method;
        this.dropTime = dropTime;
        if (this.isTransforming) {
            return NaN;
        }
        else {
            var tween = egret.Tween.get(this);
            tween.to({ alpha: 0 }, 200).call(this.throw1, this, [toX, toY]);
        }
        return value;
    };
    // 空中抛
    Dice.prototype.throw1 = function (toX, toY) {
        var name = this.pointCount + "-" + this.method;
        this.armature.animation.play(name, 1);
        this.alpha = 1;
        this.scaleX = 0.3;
        this.scaleY = 0.3;
        this.x = this.x - 100;
        this.y = this.y - 500;
        var offX = toX;
        var offY = this.y;
        this.to(toX, toY, offX, offY);
    };
    // 着地
    Dice.prototype.throw2 = function () {
        var method = this.method;
        var value = this.pointCount;
        var name = value + "-" + method;
        this.armature.animation.play(name, 1);
        this.armature.addEventListener(dragonBones.AnimationEvent.COMPLETE, this.throwComplete, this);
    };
    Dice.prototype.throwComplete = function () {
        this.armature.removeEventListener(dragonBones.AnimationEvent.COMPLETE, this.throwComplete, this);
        this.isTransforming = false;
        this.dispatchEventWith("DICE_ANI_COMPLETE", true);
    };
    Dice.prototype.to = function (toX, toY, offX, offY) {
        var _this = this;
        if (!this.isTransforming) {
            this.isTransforming = true;
            var tween = egret.Tween.get(this);
            var prop = {};
            var time = this.dropTime;
            if (offX !== undefined && offY != undefined) {
                this.p0_x = this.x;
                this.p0_y = this.y;
                this.p1_x = offX;
                this.p1_y = offY;
                this.p2_x = toX;
                this.p2_y = toY;
                prop.factor = 1;
                prop.scaleY = 0.5;
                prop.scaleX = 0.5;
            }
            else {
                prop.x = toX;
                prop.y = toY;
            }
            tween.to(prop, time, egret.Ease.cubicIn).call(function () {
                _this.throw2();
            }, this);
            return true;
        }
        return false;
    };
    return Dice;
}(egret.DisplayObjectContainer));
__reflect(Dice.prototype, "Dice");
