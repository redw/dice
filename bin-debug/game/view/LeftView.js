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
var LeftView = (function (_super) {
    __extends(LeftView, _super);
    function LeftView() {
        var _this = _super.call(this) || this;
        _this.skinName = LeftViewSkin;
        return _this;
    }
    /**
     * 点击事件
     * @param name
     */
    LeftView.prototype.onClick = function (name) {
        switch (name) {
            case "taskBtn":
                Pop.open(SkinPanel);
                break;
            case "activityBtn":
                Pop.open(DollMachinePanel);
                break;
        }
    };
    return LeftView;
}(ExComponent));
__reflect(LeftView.prototype, "LeftView");
//# sourceMappingURL=LeftView.js.map