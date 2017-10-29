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
var Stage = egret.Stage;
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
     */
    function Scene(width, height) {
        if (width === void 0) { width = 1920; }
        if (height === void 0) { height = 2160; }
        var _this = _super.call(this) || this;
        _this.changeSceneSize(width, height);
        _this.backGround = new SceneBG();
        _this.addChild(_this.backGround);
        _this.backGround.draw();
        _this.createHomeLand(width * 0.5, height * 0.5);
        _this.center();
        STAGE.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onMouseDown, _this);
        return _this;
    }
    Scene.prototype.changeSceneSize = function (width, height) {
        this.sceneWidth = width;
        this.sceneHeight = height;
    };
    Scene.prototype.center = function () {
        this.x = (this.sceneWidth - STAGE.stageWidth) * -0.5;
        this.y = (this.sceneHeight) * -0.5;
    };
    /**
     * 创建家园
     * @param tileW
     * @param tileH
     * @param inner
     */
    Scene.prototype.createHomeLand = function (x, y, inner) {
        if (inner === void 0) { inner = 3; }
        this.homeLand = new HomeLand(95, 67, inner);
        this.homeLand.x = x;
        this.homeLand.y = y + 200;
        this.addChild(this.homeLand);
    };
    Scene.prototype.createDice = function (x, y) {
        var dice = BoneUtil.createArmature("dice_roll");
        var display = dice.display;
        display.x = x;
        display.y = y;
        dice.animation.gotoAndPlay("1-1", 0, 0, 0);
        this.addChild(display);
    };
    Scene.prototype.getGridPosByXXYY = function (xx, yy) {
        var x = (xx - yy - 1) * 59 * 0.5;
        var y = (xx + yy) * 67 * 0.5;
        return { x: x, y: y };
    };
    Scene.prototype.onMouseDown = function (e) {
        this.mouseDownX = e.stageX;
        this.mouseDownY = e.stageY;
        this.startX = this.x;
        this.startY = this.y;
        STAGE.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMouseMove, this);
    };
    Scene.prototype.onMouseUp = function (e) {
        STAGE.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMouseMove, this);
    };
    Scene.prototype.onMouseMove = function (e) {
        var stageX = e.stageX;
        var stageY = e.stageY;
        var offX = stageX - this.mouseDownX;
        var offY = stageY - this.mouseDownY;
        this.x = this.startX + offX;
        this.y = this.startY + offY;
        var maxX = 0;
        var maxY = 0;
        var minX = STAGE.stageWidth - this.sceneWidth;
        var minY = STAGE.stageHeight - this.sceneHeight;
        if (this.x > maxX) {
            this.x = maxX;
        }
        if (this.x < minX) {
            this.x = minX;
        }
        if (this.y > maxY) {
            this.y = maxY;
        }
        if (this.y < minY) {
            this.y = minY;
        }
    };
    Scene.prototype.throwDice = function () {
        this.homeLand.throwDice();
    };
    return Scene;
}(egret.DisplayObjectContainer));
__reflect(Scene.prototype, "Scene");
//# sourceMappingURL=Scene.js.map