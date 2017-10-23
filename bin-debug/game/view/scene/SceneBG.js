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
var SceneBG = (function (_super) {
    __extends(SceneBG, _super);
    function SceneBG() {
        var _this = _super.call(this) || this;
        _this.sourceArr = ["beijing_01_png", "beijing_10_png", "beijing_11_png", "beijing_12_png"];
        _this.tileW = 192;
        _this.tileH = 540;
        return _this;
    }
    SceneBG.prototype.draw = function () {
        var len = this.sourceArr.length;
        for (var i = 0; i < len; i++) {
            for (var j = 0; j < 10; j++) {
                var image = new eui.Image();
                image.source = this.sourceArr[i];
                image.y = i * this.tileH;
                image.x = j * this.tileW;
                this.addChild(image);
            }
        }
    };
    return SceneBG;
}(egret.DisplayObjectContainer));
__reflect(SceneBG.prototype, "SceneBG");
//# sourceMappingURL=SceneBG.js.map