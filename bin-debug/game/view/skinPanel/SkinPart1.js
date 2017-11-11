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
var SkinPart1 = (function (_super) {
    __extends(SkinPart1, _super);
    function SkinPart1(owner) {
        var _this = _super.call(this) || this;
        _this.owner = owner;
        _this.skinName = SkinPart1Skin;
        return _this;
    }
    SkinPart1.prototype.init = function () {
        this.tabBar.addEventListener(egret.Event.CHANGING, this.onSelectChange, this);
    };
    SkinPart1.prototype.onSelectChange = function () {
        var subType = (this.tabBar.selectedIndex || 0) + 1;
        var arr = SkinModel.getDataProvider(1, subType);
        this.owner.setData(arr);
    };
    SkinPart1.prototype.active = function () {
    };
    return SkinPart1;
}(ExComponent));
__reflect(SkinPart1.prototype, "SkinPart1");
