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
    SkinItemRen.prototype.selected = function (obj) {
        DisplayUtil.setChildProp(this, "selectedImg", obj.id == this.cdata.id, "visible");
    };
    SkinItemRen.prototype.setData = function (obj, type) {
        var cObj = SkinModel.getSkinConfigObj(obj, type);
        var nameTxt = DisplayUtil.getChildByName(this, "nameTxt");
        var name = cObj.name;
        var count = 1;
        if (type == 0) {
            nameTxt.text = name;
        }
        else {
            name = name + "{0}";
            TextUtil.color(nameTxt, name, "     x" + count, 0xb55826);
        }
    };
    return SkinItemRen;
}(eui.Component));
__reflect(SkinItemRen.prototype, "SkinItemRen");
//# sourceMappingURL=SkinItemRen.js.map