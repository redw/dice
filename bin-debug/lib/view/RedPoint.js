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
 * 小红点
 * @author j
 * 2016/1/25
 */
var RedPoint = (function (_super) {
    __extends(RedPoint, _super);
    function RedPoint(source) {
        if (source === void 0) { source = "red_point_png"; }
        var _this = _super.call(this) || this;
        _this.jump = true;
        _this.bitmap = new AutoBitmap();
        _this.bitmap.x = -RedPoint.POINT_RADIUS / 2;
        _this.bitmap.y = -RedPoint.POINT_RADIUS / 2;
        _this.bitmap.source = source;
        _this.addChild(_this.bitmap);
        _this.startJump();
        return _this;
    }
    RedPoint.prototype.setJump = function (bool) {
        this.jump = bool;
        this.startJump();
    };
    RedPoint.prototype.startJump = function () {
        if (this.jump) {
            egret.Tween.get(this.bitmap).to({ y: -20 }, 200, egret.Ease.sineIn).to({ y: -RedPoint.POINT_RADIUS / 2 }, 500, egret.Ease.bounceOut).wait(5000).call(function () {
                this.startJump();
            }, this);
        }
        else {
            this.bitmap.x = -RedPoint.POINT_RADIUS / 2;
            this.bitmap.y = -RedPoint.POINT_RADIUS / 2;
            egret.Tween.removeTweens(this.bitmap);
        }
    };
    RedPoint.prototype.clear = function () {
        egret.Tween.removeTweens(this.bitmap);
    };
    RedPoint.POINT_RADIUS = 20;
    return RedPoint;
}(egret.Sprite));
__reflect(RedPoint.prototype, "RedPoint");
//# sourceMappingURL=RedPoint.js.map