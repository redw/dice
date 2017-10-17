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
 * 简单按钮
 */
var SimpleButton = (function (_super) {
    __extends(SimpleButton, _super);
    function SimpleButton() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.touchScaleEffect = true;
        return _this;
    }
    SimpleButton.prototype.setPos = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Object.defineProperty(SimpleButton.prototype, "touchScaleEffect", {
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
    SimpleButton.prototype.onTouchBegin = function () {
        EffectUtil.playScaleEffect(this, 0.9);
    };
    SimpleButton.prototype.release = function () {
        DisplayUtil.removeFromParent(this);
        this.setPos(0, 0);
    };
    SimpleButton.pool = new ObjPool(SimpleButton);
    return SimpleButton;
}(eui.Image));
__reflect(SimpleButton.prototype, "SimpleButton");
//# sourceMappingURL=SimpleButton.js.map