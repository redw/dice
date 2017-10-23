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
var SceneBackGround = (function (_super) {
    __extends(SceneBackGround, _super);
    function SceneBackGround() {
        var _this = _super.call(this) || this;
        _this.resList = ["beijing_01_png", "beijing_10_png", "beijing_11_png", "beijing_12_png"];
        return _this;
    }
    SceneBackGround.prototype.create = function () {
        this.drawBackground();
    };
    SceneBackGround.prototype.drawBackground = function (row, col, tileW, tileH) {
        if (row === void 0) { row = 4; }
        if (col === void 0) { col = 10; }
        if (tileW === void 0) { tileW = 192; }
        if (tileH === void 0) { tileH = 540; }
        for (var i = 0; i < row; i++) {
            for (var j = 0; j < col; j++) {
                var image = new eui.Image();
                image.source = this.resList[i];
                image.x = j * tileW;
                image.y = i * tileH;
                this.addChild(image);
            }
        }
    };
    return SceneBackGround;
}(egret.DisplayObjectContainer));
__reflect(SceneBackGround.prototype, "SceneBackGround");
//# sourceMappingURL=SceneBackGround.js.map