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
/**
 * 家园
 * Created by hh on 2017/10/23 0023.
 */
var HomeLand = (function (_super) {
    __extends(HomeLand, _super);
    /**
     * 构造函数
     * @param tileW     格子宽度
     * @param tileH     格子高度
     * @param inner     内部大小
     */
    function HomeLand(tileW, tileH, inner) {
        if (inner === void 0) { inner = 3; }
        var _this = _super.call(this) || this;
        _this.tileW = 100;
        _this.tileH = 100;
        _this.inner = 3;
        _this.road = 1;
        _this.build = 1;
        _this.des = 1;
        _this.size = 7;
        _this.tileW = tileW;
        _this.tileH = tileH;
        _this.inner = inner;
        var count = inner + (_this.road + _this.build + _this.des) * 2;
        _this.size = count;
        _this.backGround = new HomeLandBG(_this);
        _this.addChild(_this.backGround);
        _this.decorateLayer0 = new SceneDecorateLayer("up", inner);
        _this.addChild(_this.decorateLayer0);
        _this.buildLayer0 = new SceneBuildLayer("up", inner);
        _this.addChild(_this.buildLayer0);
        _this.diceContainer = new DiceContainer(_this);
        _this.addChild(_this.diceContainer);
        _this.buildLayer1 = new SceneBuildLayer("down", inner);
        _this.addChild(_this.buildLayer1);
        _this.decorateLayer1 = new SceneDecorateLayer("down", inner);
        _this.addChild(_this.decorateLayer1);
        _this.decorateLayer0.drawUp();
        _this.initDice();
        return _this;
    }
    HomeLand.prototype.createDice = function (x, y) {
        var dice = BoneUtil.createArmature("dice_roll");
        var display = dice.display;
        display.x = x;
        display.y = y;
        dice.animation.gotoAndPlay("1-1", 0, 0, 0);
        this.addChild(display);
    };
    HomeLand.prototype.getGridPosByXXYY = function (xx, yy) {
        var x = (xx - yy - 1) * this.tileW * 0.5;
        var y = (xx + yy) * this.tileH * 0.5;
        return { x: x, y: y };
    };
    // 实始化色子
    HomeLand.prototype.initDice = function (count) {
        if (count === void 0) { count = 5; }
        this.diceContainer.addDice(4, 4, 1);
        var diceArr = ArrayUtil.numberArray(0, 9);
        while (count--) {
            var randomValue = ArrayUtil.removeRandomItem(diceArr);
            this.diceContainer.addRandomDice(randomValue);
        }
    };
    HomeLand.prototype.throwDice = function () {
        this.diceContainer.throwDice();
    };
    return HomeLand;
}(egret.DisplayObjectContainer));
__reflect(HomeLand.prototype, "HomeLand");
