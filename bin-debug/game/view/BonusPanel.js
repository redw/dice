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
var BonusPanel = (function (_super) {
    __extends(BonusPanel, _super);
    function BonusPanel() {
        var _this = _super.call(this) || this;
        _this.time = 3;
        _this.isClose = false;
        _this.layer = PanelLayer.TOP_LAYER;
        _this.skinName = BounsPanelSkin;
        _this.horizontalCenter = 0;
        _this.verticalCenter = 0;
        return _this;
    }
    BonusPanel.prototype.active = function () {
        this.back = this.data["back"];
        this.backContext = this.data["backContext"];
        this.imgIcon.source = this.data["icon"];
        this.awardName.text = this.data["name"] || "";
        this.toX = this.data["toX"];
        this.toY = this.data["toY"];
        this.tweenLight(360);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.timerId = GameLoop.registerTimer(this.onTouch, this, 700);
    };
    BonusPanel.prototype.onTouch = function (e) {
        var _this = this;
        if (this.timerId) {
            GameLoop.clearTimer(this.timerId);
            this.timerId = 0;
        }
        if (this.isClose) {
            return;
        }
        this.isClose = true;
        this.awardName.visible = false;
        egret.Tween.get(this.groupIcon).to({ scaleX: 1.5, scaleY: 1.5 }, 350, egret.Ease.elasticOut).call(function () {
            _this.imgLight.visible = false;
            egret.Tween.removeTweens(_this.imgLight);
            var toX = _this.toX;
            var toY = _this.toY;
            egret.Tween.get(_this.groupIcon).to({ x: toX, y: toY, alpha: 0.4, scaleX: 1, scaleY: 1 }, 350).call(function () {
                _this.hidePanel();
            }, _this);
        }, this);
    };
    BonusPanel.prototype.onInterval = function (e) {
        this.time = this.time - 1;
        if (this.time <= 0) {
            this.onTouch(null);
        }
    };
    BonusPanel.prototype.tweenLight = function (value) {
        var _this = this;
        egret.Tween.get(this.imgLight).to({ rotation: value }, 10000).call(function () {
            _this.tweenLight(value);
        }, this);
    };
    BonusPanel.prototype.hidePanel = function () {
        Pop.close(this);
        if (this.back) {
            this.back.call(this.backContext);
        }
    };
    return BonusPanel;
}(BasePanel));
__reflect(BonusPanel.prototype, "BonusPanel");
