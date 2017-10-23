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
/**
 * 位图
 * @author j
 * 2016/6/8
 */
var AutoBitmap = (function (_super) {
    __extends(AutoBitmap, _super);
    function AutoBitmap(value) {
        var _this = _super.call(this) || this;
        if (value) {
            _this.source = value;
        }
        return _this;
    }
    Object.defineProperty(AutoBitmap.prototype, "source", {
        set: function (value) {
            var _this = this;
            if (typeof (value) == "string") {
                if (RES.hasRes(value)) {
                    RES.getResAsync(value, function (res) {
                        _this.texture = res;
                    }, this);
                }
                else {
                    RES.getResByUrl(value, function (res) {
                        _this.texture = res;
                    }, this, RES.ResourceItem.TYPE_IMAGE);
                }
            }
            else {
                this.texture = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    return AutoBitmap;
}(egret.Bitmap));
__reflect(AutoBitmap.prototype, "AutoBitmap");
//# sourceMappingURL=AutoBitmap.js.map