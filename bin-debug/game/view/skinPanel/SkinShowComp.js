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
var SkinShowComp = (function (_super) {
    __extends(SkinShowComp, _super);
    function SkinShowComp() {
        var _this = _super.call(this) || this;
        _this.itemArr = [];
        _this.freeItemArr = [];
        _this.skinName = SkinShowCompSkin;
        _this.partList = Array(4);
        return _this;
    }
    SkinShowComp.prototype.setSkinInfo = function (arr, type) {
        this.skinData = arr;
        while (this.itemArr.length) {
            var item = this.itemArr.pop();
            DisplayUtil.removeFromParent(item);
            this.freeItemArr.push(item);
        }
        for (var i = 0, len = arr.length; i < len; i++) {
            var comp = null;
            if (this.freeItemArr.length) {
                comp = this.freeItemArr.pop();
            }
            else {
                comp = new SkinItemRen();
            }
            this.itemArr.push(comp);
            comp.setData(arr[i], type);
            this.itemContainer.addChild(comp);
        }
        for (var i = 0, len = this.partList.length; i < len; i++) {
            var view = this.partList[i];
            if (i == type) {
                if (!view) {
                    view = new (egret.getDefinitionByName("SkinPart" + i));
                    this.partList[i] = view;
                }
                if (!view.parent) {
                    this.addChild(view);
                }
            }
            else {
                DisplayUtil.removeFromParent(view);
            }
        }
        this.showSomeSkinInfo(arr[0], type);
    };
    SkinShowComp.prototype.showSomeSkinInfo = function (obj, type) {
        var view = this.partList[type];
        if (view && view.showSomeInfo) {
            view.showSomeInfo(obj, type);
        }
        else {
        }
    };
    return SkinShowComp;
}(eui.Component));
__reflect(SkinShowComp.prototype, "SkinShowComp");
