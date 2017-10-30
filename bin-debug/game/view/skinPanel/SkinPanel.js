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
var SkinPanel = (function (_super) {
    __extends(SkinPanel, _super);
    function SkinPanel() {
        var _this = _super.call(this) || this;
        _this.skinName = SkinPanelSkin;
        _this.layer = PanelLayer.TOP_LAYER;
        return _this;
    }
    SkinPanel.prototype.init = function () {
        this.tabBar.addEventListener(egret.Event.CHANGING, this.onSelectChange, this);
        Net.on(CmdConst.SKIN_UP, this.skinUpRes, this);
        this.onSelectChange();
    };
    SkinPanel.prototype.onSelectChange = function () {
        var selectIndex = this.tabBar.selectedIndex;
        var type = Math.max(selectIndex, 0);
        if (type == 1) {
            var arr = SkinModel.getDataProvider(type, 1);
            this.skinShowComp.setData(arr);
        }
        else {
            var arr = SkinModel.getDataProvider(type);
            this.skinShowComp.setData(arr);
        }
    };
    SkinPanel.prototype.skinUpRes = function () {
        var selectIndex = this.tabBar.selectedIndex;
        var type = Math.max(selectIndex, 0);
        var arr = SkinModel.getDataProvider(type);
        this.skinShowComp.refresh(arr);
    };
    return SkinPanel;
}(BasePanel));
__reflect(SkinPanel.prototype, "SkinPanel");
