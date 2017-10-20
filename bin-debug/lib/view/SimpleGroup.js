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
 * Created by Administrator on 12/1 0001.
 */
var SimpleGroup = (function (_super) {
    __extends(SimpleGroup, _super);
    function SimpleGroup() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.touchScaleEffect = true;
        return _this;
    }
    Object.defineProperty(SimpleGroup.prototype, "touchScaleEffect", {
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
    SimpleGroup.prototype.onTouchBegin = function () {
        EffectUtil.playScaleEffect(this, 0.9);
    };
    return SimpleGroup;
}(eui.Group));
__reflect(SimpleGroup.prototype, "SimpleGroup");
