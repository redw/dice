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
 * 游戏场景
 */
var Scene = (function (_super) {
    __extends(Scene, _super);
    /**
     * 构造函数
     * @param tileW     格子宽度
     * @param tileH     格子高度
     * @param inner     内部大小
     * @param road      环道
     * @param build     建筑
     * @param des       装饰
     */
    function Scene(tileW, tileH, inner) {
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
        _this.x = __STAGE.stageWidth * 0.5;
        var count = inner + (_this.road + _this.build + _this.des) * 2;
        _this.size = count;
        _this.backGround = new SceneBg(_this);
        _this.addChild(_this.backGround);
        _this.diceContainer = new DiceContainer(_this);
        _this.addChild(_this.diceContainer);
        _this.initDice();
        return _this;
    }
    Scene.prototype.createDice = function (x, y) {
        var dice = BoneUtil.createArmature("dice_roll");
        var display = dice.display;
        display.x = x;
        display.y = y;
        dice.animation.gotoAndPlay("1-1", 0, 0, 0);
        this.addChild(display);
    };
    Scene.prototype.getGridPosByXXYY = function (xx, yy) {
        var x = (xx - yy - 1) * this.tileW * 0.5;
        var y = (xx + yy) * this.tileH * 0.5;
        return { x: x, y: y };
    };
    // 实始化色子
    Scene.prototype.initDice = function (count) {
        if (count === void 0) { count = 2; }
        var diceArr = ArrayUtil.numberArray(0, 9);
        while (count--) {
            var randomValue = ArrayUtil.removeRandomItem(diceArr);
            this.diceContainer.addRandomDice(randomValue);
        }
    };
    Scene.prototype.throwDice = function () {
        this.diceContainer.throwDice();
    };
    return Scene;
}(egret.DisplayObjectContainer));
__reflect(Scene.prototype, "Scene");
//# sourceMappingURL=Scene.js.map