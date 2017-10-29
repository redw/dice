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
var SkinItemRen = (function (_super) {
    __extends(SkinItemRen, _super);
    function SkinItemRen() {
        var _this = _super.call(this) || this;
        _this.skinName = SkinItemRenSkin;
        return _this;
    }
    SkinItemRen.prototype.$onAddToStage = function (stage, nestLevel) {
        _super.prototype.$onAddToStage.call(this, stage, nestLevel);
        this.useImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUseSkin, this);
    };
    SkinItemRen.prototype.$onRemoveFromStage = function () {
        _super.prototype.$onRemoveFromStage.call(this);
        this.useImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onUseSkin, this);
    };
    SkinItemRen.prototype.onUseSkin = function (e) {
        e.stopImmediatePropagation();
        var type = this.data.type;
        if (type == 0) {
            Net.sendMessage(CmdConst.CHANGE_SKIN, { sid: this.data.id });
        }
        else if (type == 1) {
            Net.sendMessage(CmdConst.CHANGE_CHESS, { cid: this.data.id });
        }
        else if (type == 2) {
            Net.sendMessage(CmdConst.CHANGE_DICE, { did: this.data.id });
        }
        else {
            Net.sendMessage(CmdConst.CHANGE_VEHICLE, { vid: this.data.id });
        }
    };
    SkinItemRen.prototype.dataChanged = function () {
        var obj = this.data;
        var type = obj.type;
        this.cData = SkinModel.getSkinConfigObj(obj);
        var curProp = SkinModel.getCurProp(type);
        var name = this.cData.name;
        this.lockImg.visible = Boolean(!obj.lv);
        if (curProp == obj.lv) {
            this.useImg.visible = true;
        }
        else {
            this.useImg.visible = Boolean(obj.lv);
        }
        var count = 1;
        if (type == 0) {
            this.nameTxt.text = name;
        }
        else {
            name = name + "{0}";
            TextUtil.color(this.nameTxt, name, "     x" + count, 0xb55826);
        }
        switch (type) {
            case 0:
                this.iconImg.source = URLConfig.getCitySkinIcon(obj.id);
                this.seatImg.visible = false;
                this.iconImg.scaleX = 1.5;
                this.iconImg.scaleY = 1.5;
                this.seatGroup.y = -30;
                break;
            case 1:
                this.iconImg.source = URLConfig.getChessObjSkinIcon(obj.id);
                this.seatImg.visible = true;
                this.iconImg.scaleX = 1;
                this.iconImg.scaleY = 1;
                this.seatGroup.y = 0;
                break;
            case 2:
                this.iconImg.source = URLConfig.getDiceSkinIcon(obj.id);
                this.seatImg.visible = true;
                this.iconImg.scaleX = 1;
                this.iconImg.scaleY = 1;
                this.seatGroup.y = 0;
                break;
            case 3:
                this.iconImg.source = URLConfig.getVehicleSkinIcon(obj.id);
                this.seatImg.visible = true;
                this.iconImg.scaleX = 1;
                this.iconImg.scaleY = 1;
                this.seatGroup.y = 0;
                break;
        }
    };
    return SkinItemRen;
}(eui.ItemRenderer));
__reflect(SkinItemRen.prototype, "SkinItemRen");
//# sourceMappingURL=SkinItemRen.js.map