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
    function SkinPart0() {
        var _this = _super.call(this) || this;
        _this.skinName = SkinPart0Skin;
        return _this;
    }
    SkinPart0.prototype.showSomeInfo = function (obj, type) {
    };
    return SkinPart0;
}(eui.Component));
__reflect(SkinPart0.prototype, "SkinPart0");
//# sourceMappingURL=SkinPart0.js.map