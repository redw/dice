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
var ISOScene = (function (_super) {
    __extends(ISOScene, _super);
    function ISOScene(tileW, tileH) {
        var _this = _super.call(this) || this;
        _this.tileW = 100;
        _this.tileH = 50;
        _this.tileW = tileW;
        _this.tileH = tileH;
        _this.background = new ISOSceneBackground(_this);
        _this.addChild(_this.background);
        return _this;
    }
    ISOScene.prototype.create = function (inner) {
        this.background.create(inner);
        var timer = new egret.Timer(5000, 1);
        timer.addEventListener(egret.TimerEvent.COMPLETE, this.outSize, this);
        timer.addEventListener(egret.TimerEvent.TIMER, this.outSize, this);
        timer.start();
    };
    ISOScene.prototype.outSize = function () {
        console.log("background", __STAGE.stageWidth, this.background.width, this.background.height);
    };
    ISOScene.prototype.getGridPos = function (xx, yy) {
        var x = (xx - yy - 1) * this.tileW * 0.5;
        var y = (xx + yy) * this.tileH * 0.5;
        return { x: x, y: y };
    };
    return ISOScene;
}(egret.DisplayObjectContainer));
__reflect(ISOScene.prototype, "ISOScene");
//# sourceMappingURL=ISOScene.js.map