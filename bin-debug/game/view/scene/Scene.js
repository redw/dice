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
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene(width, height, tileW, tileH) {
        var _this = _super.call(this) || this;
        _this.tileW = 100;
        _this.tileH = 50;
        _this.sceneWidth = 1920;
        _this.sceneHeight = 2260;
        _this.sceneWidth = width;
        _this.sceneHeight = height;
        _this.tileW = tileW;
        _this.tileH = tileH;
        _this.background = new SceneBackGround();
        _this.addChild(_this.background);
        _this.isoScene = new ISOScene(tileW, tileH);
        _this.addChild(_this.isoScene);
        _this.center();
        return _this;
    }
    Scene.prototype.center = function () {
        this.x = (__STAGE.stageWidth - this.sceneWidth) * 0.5;
        this.y = (__STAGE.stageHeight - this.sceneHeight) * 0.5;
        this.isoScene.x = this.x * -1 + __STAGE.stageWidth * 0.5;
        this.isoScene.y = this.y * -1 + 200;
    };
    Scene.prototype.create = function (inner) {
        if (inner === void 0) { inner = 3; }
        this.background.create();
        this.isoScene.create(inner);
    };
    return Scene;
}(egret.DisplayObjectContainer));
__reflect(Scene.prototype, "Scene");
//# sourceMappingURL=Scene.js.map