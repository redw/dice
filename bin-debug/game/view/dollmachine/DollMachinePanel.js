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
var DollMachinePanel = (function (_super) {
    __extends(DollMachinePanel, _super);
    function DollMachinePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = DollMachinePanelSkin;
        _this.layer = PanelLayer.TOP_LAYER;
        return _this;
    }
    DollMachinePanel.prototype.init = function () {
        LoadManager.loadGroup(["zhuawawaji_ske_json", "zhuawawaji_tex_json", "zhuawawaji_tex_png"], this.onLoadWawaji, this);
    };
    DollMachinePanel.prototype.onLoadWawaji = function () {
        this.armature = BoneUtil.createArmature("zhuawawaji");
        var display = this.armature.display;
        display.x = 320;
        display.y = 620;
        this.handGroup.addChild(display);
        this.armature.animation.gotoAndPlay("idle", 0, 0, 0);
    };
    DollMachinePanel.prototype.start = function () {
    };
    return DollMachinePanel;
}(BasePanel));
__reflect(DollMachinePanel.prototype, "DollMachinePanel");
//# sourceMappingURL=DollMachinePanel.js.map