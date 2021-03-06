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
     * @param inner     内部大小
     * @param tileW     格子宽度
     * @param tileH     格子高度
     * @param road      环道
     * @param build     建筑
     * @param des       装饰
     */
    function Scene(inner, tileW, tileH) {
        if (inner === void 0) { inner = 3; }
        var _this = _super.call(this) || this;
        _this.tileW = 100;
        _this.tileH = 100;
        _this.inner = 3;
        _this.road = 1;
        _this.build = 1;
        _this.des = 1;
        _this.size = 7;
        _this.inner = inner;
        _this.tileW = tileW;
        _this.tileH = tileH;
        var count = inner + (_this.road + _this.build + _this.des) * 2;
        _this.size = count;
        _this.backGround = new SceneBG();
        _this.addChild(_this.backGround);
        _this.backGround.draw();
        _this.homeLand = new HomeLand(95, 67, inner);
        _this.addChild(_this.homeLand);
        return _this;
        // this.initDice();
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
    // // 实始化色子
    // private initDice(count = 2) {
    //     let diceArr = ArrayUtil.numberArray(0, 9);
    //     while (count--) {
    //         let randomValue = ArrayUtil.removeRandomItem(diceArr);
    //         this.diceContainer.addRandomDice(randomValue);
    //     }
    // }
    //
    Scene.prototype.throwDice = function () {
        this.homeLand.throwDice();
    };
    Scene.getGridPosByXXYY = function (xx, yy, width, height) {
        if (width === void 0) { width = 95; }
        if (height === void 0) { height = 67; }
        var x = (xx - yy - 1) * width * 0.5;
        var y = (xx + yy) * height * 0.5;
        return { x: x, y: y };
    };
    Scene.getBuildConfigInfo = function (source) {
        source = source.replace("_png", "");
        var obj = RES.getRes("build_json");
        return obj[source];
    };
    return Scene;
}(egret.DisplayObjectContainer));
__reflect(Scene.prototype, "Scene");
