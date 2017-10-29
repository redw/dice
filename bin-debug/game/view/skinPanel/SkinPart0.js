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
var SkinPart0 = (function (_super) {
    __extends(SkinPart0, _super);
    function SkinPart0(owner) {
        var _this = _super.call(this) || this;
        _this.skinName = SkinPart0Skin;
        _this.owner = owner;
        return _this;
    }
    SkinPart0.prototype.init = function () {
        this.upgradeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkinUP, this);
    };
    SkinPart0.prototype.onSkinUP = function () {
        Net.sendMessage(CmdConst.SKIN_UP, { sid: this.data.id });
    };
    SkinPart0.prototype.onClick = function (name) {
        if (name == "upgradeBtn") {
            this.onSkinUP();
        }
    };
    SkinPart0.prototype.active = function () {
        var obj = this.data;
        var cData = SkinModel.getSkinConfigObj(obj);
        var lv = obj.lv;
        var maxLv = cData.cost.length;
        var levelTxt = DisplayUtil.getChildByName(this.contentGroup, "levelTxt");
        levelTxt.text = lv || "未解锁";
        var extraTxt = DisplayUtil.getChildByName(this.contentGroup, "extraTxt");
        extraTxt.text = cData.reward_1;
        var diamondTxt = DisplayUtil.getChildByName(this.contentGroup, "diamondTxt");
        diamondTxt.text = cData.cost[Math.min(lv, maxLv - 1)];
    };
    return SkinPart0;
}(ExComponent));
__reflect(SkinPart0.prototype, "SkinPart0");
//# sourceMappingURL=SkinPart0.js.map