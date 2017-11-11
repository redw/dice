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
var WoodEffect = (function (_super) {
    __extends(WoodEffect, _super);
    function WoodEffect() {
        var _this = _super.call(this) || this;
        _this._effecting = false;
        _this._ids = [1, 2, 3, 4, 5, 1, 2, 1, 2, 1, 2];
        _this._bars = [];
        _this._intervalHeight = 120;
        _this._effecting = !1;
        _this.touchChildren = false;
        _this.touchEnabled = false;
        _this.skinName = "WoodEffectSkin";
        return _this;
    }
    WoodEffect.prototype.childrenCreated = function () {
        for (var e = this._ids.length, i = 0, n = 0; e > n; n++) {
            var s = new eui.Image;
            s.source = "wood" + this._ids[n] + "_png";
            s.width = 669;
            this._bars.push(s);
            n % 2 == 0 ? s.x = -s.width : s.x = STAGE.stageWidth;
            s.y = i;
            i += this._intervalHeight;
            this.addChildAt(s, 0);
        }
        this.switchEffect(true);
    };
    WoodEffect.prototype.switchEffect = function (showSeal, cb, cbComplete, cbThis) {
        if (!this._effecting) {
            this._effecting = !0;
            this._showSeal = showSeal;
            this._cb = cb;
            this._cbComplete = cbComplete;
            this._cbThis = cbThis;
            for (var s = this._bars.length, r = 0; s > r; r++)
                this.effectBar(this._bars[r], r == s - 1);
        }
    };
    WoodEffect.prototype.effectBar = function (t, end) {
        egret.Tween.removeTweens(t);
        var i = (STAGE.stageWidth - t.width) / 2;
        egret.Tween.get(t).to({
            x: i
        }, 500, egret.Ease.quartIn).wait(500).call(function () {
            if (end) {
                if (this._cb) {
                    this._cb.call(this._cbThis);
                }
                this._showSeal ? this.showEffect() : this.open();
            }
        }, this);
    };
    WoodEffect.prototype.showEffect = function () {
        var t = this;
        BoneUtil.createArmatureSync("chaping_2", function (armature) {
            t._effect = armature;
            t._effect.addEventListener(dragonBones.MovieEvent.COMPLETE, t.onComplete, t);
            t._effect.animation.gotoAndPlayByFrame("zhang_appear", 1, 1);
            t._effectDisplay = t._effect.display;
            t._effectDisplay.scaleX = t._effectDisplay.scaleY = .75;
            t.effectGroup.addChild(t._effectDisplay);
        }, null);
    };
    WoodEffect.prototype.onComplete = function (t) {
        this._effect.removeEventListener(dragonBones.MovieEvent.COMPLETE, this.onComplete, this);
        this.open();
    };
    WoodEffect.prototype.open = function () {
        console.log("open");
        for (var t = this._bars.length, e = 0; t > e; e++)
            this.openBar(this._bars[e], e % 2 == 0 ? -this._bars[e].width : STAGE.stageWidth, e == t - 1);
    };
    WoodEffect.prototype.openBar = function (t, e, i) {
        var n = this;
        egret.Tween.get(t).to({
            x: e
        }, 500, egret.Ease.quartOut).call(function () {
            i && (DisplayUtil.removeFromParent(n._effectDisplay),
                null != n._cbComplete && n._cbComplete.call(n._cbThis),
                n._effecting = !1);
        }, this);
    };
    return WoodEffect;
}(eui.Component));
__reflect(WoodEffect.prototype, "WoodEffect");
//# sourceMappingURL=WoodEffect.js.map