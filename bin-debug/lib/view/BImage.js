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
var BImage = (function (_super) {
    __extends(BImage, _super);
    function BImage() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.touchScaleEffect = true;
        return _this;
    }
    BImage.prototype.setPos = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Object.defineProperty(BImage.prototype, "touchScaleEffect", {
        set: function (enabled) {
            if (enabled) {
                this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            }
            else {
                this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            }
        },
        enumerable: true,
        configurable: true
    });
    BImage.prototype.onTouchBegin = function () {
        var view = this;
        var lastX = view.x;
        var lastY = view.y;
        var lastScaleX = view.scaleX;
        var lastScaleY = view.scaleY;
        var scale = 0.9;
        var tween = egret.Tween.get(view);
        var obj1 = { scaleX: lastScaleX * scale, scaleY: lastScaleY * scale, x: lastX + view.width * (1 - scale) / 2, y: lastY + view.height * (1 - scale) / 2 };
        var obj2 = { scaleX: lastScaleX, scaleY: lastScaleY, x: lastX, y: lastY };
        tween.to(obj1, 100, egret.Ease.sineIn).to(obj2, 100, egret.Ease.sineOut);
    };
    BImage.prototype.release = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        egret.Tween.removeTweens(this);
        DisplayUtil.removeFromParent(this);
        this.setPos(0, 0);
    };
    return BImage;
}(eui.Image));
__reflect(BImage.prototype, "BImage");
//# sourceMappingURL=BImage.js.map