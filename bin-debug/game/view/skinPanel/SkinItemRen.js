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
        _this.touchChildren = false;
        return _this;
    }
    SkinItemRen.prototype.selected = function (obj) {
        // this.selectedImg.visible = obj.id == this.cdata.id;
    };
    /**
     * 配置数组
     * @param obj
     */
    SkinItemRen.prototype.setData = function (obj) {
        this.cdata = obj;
        var name = obj.name;
        var nameTxt = DisplayUtil.getChildByName(this, "nameTxt");
        name = name + "{0}";
        TextUtil.color(nameTxt, name, "   x1", 0xb55826);
    };
    return SkinItemRen;
}(eui.Component));
__reflect(SkinItemRen.prototype, "SkinItemRen");
//# sourceMappingURL=SkinItemRen.js.map