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
var BottomView = (function (_super) {
    __extends(BottomView, _super);
    function BottomView() {
        var _this = _super.call(this) || this;
        _this.skinName = BottomViewSkin;
        return _this;
    }
    BottomView.prototype.onClick = function (name) {
        switch (name) {
            case "skinBtn":
                Pop.open(SkinPanel);
                break;
        }
    };
    return BottomView;
}(ExComponent));
__reflect(BottomView.prototype, "BottomView");
