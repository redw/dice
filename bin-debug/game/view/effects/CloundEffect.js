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
var CloundEffect = (function (_super) {
    __extends(CloundEffect, _super);
    function CloundEffect() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = false;
        _this.touchChildren = false;
        _this._positions = [[-230, 645], [-250, -710], [100, 645], [-390, -1060], [-148, 645], [-200, -850]];
        _this.skinName = "CloudEffectSkin";
        return _this;
    }
    /**
     * 开始去效果
     * @param closeBack     闭合回调
     * @param completeBack  效果完成后的回调
     * @param context       回调上下文
     */
    CloundEffect.prototype.start = function (closeBack, completeBack, context) {
        this.switchEffect(closeBack, completeBack, context);
    };
    CloundEffect.prototype.switchEffect = function (t, e, i) {
        this.effectCloud(this.icloud0, this._positions[0]);
        this.effectCloud(this.icloud1, this._positions[1]);
        this.effectCloud(this.icloud2, this._positions[2]);
        this.effectCloud(this.icloud3, this._positions[3]);
        this.effectCloud(this.icloud4, this._positions[4]);
        this.icloud5.x = this._positions[4][1];
        egret.Tween.get(this.icloud5).to({
            x: this._positions[4][0]
        }, 500, egret.Ease.quartIn).call(function () {
            null != t && t.call(i);
            egret.Tween.get(this.icloud5).wait(500).call(function () {
                egret.Tween.get(this.icloud5).to({
                    x: this._positions[4][1]
                }, 500, egret.Ease.quartOut).call(function () {
                    null != e && e.call(i);
                }, this);
            }, this);
        }, this);
    };
    CloundEffect.prototype.effectCloud = function (t, e) {
        t.x = e[1];
        egret.Tween.get(t).to({
            x: e[0]
        }, 500, egret.Ease.quartIn).wait(500).call(function () {
            egret.Tween.get(t).to({
                x: e[1]
            }, 500, egret.Ease.quartOut);
        }, this);
    };
    return CloundEffect;
}(eui.Component));
__reflect(CloundEffect.prototype, "CloundEffect");
//# sourceMappingURL=CloundEffect.js.map