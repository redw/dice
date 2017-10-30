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
        _this.skinName = SkinShowCompSkin;
        return _this;
    }
    SkinShowComp.prototype.init = function () {
        this.list.itemRenderer = SkinItemRen;
        this.list.addEventListener(eui.PropertyEvent.PROPERTY_CHANGE, this.onSelectItem, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this, true, Number.MAX_VALUE);
        this.partList = Array(4);
    };
    SkinShowComp.prototype.onTouchEnd = function (e) {
        var _this = this;
        var touchMoved = this.scroll["$Scroller"][5];
        if (touchMoved) {
            e.stopImmediatePropagation();
            var scrollH_1 = Math.abs(this.list.scrollH);
            scrollH_1 = Math.round(scrollH_1 / 225) * 225;
            egret.setTimeout(function () {
                _this.list.scrollH = scrollH_1;
                _this.scroll["$Scroller"][5] = false;
            }, this, 0);
        }
    };
    SkinShowComp.prototype.active = function () {
        var arr = this.data;
        this.skinData = arr;
        this.list.dataProvider = new eui.ArrayCollection(arr);
        this.list.selectedIndex = 0;
        var type = arr[0].type;
        for (var i = 0, len = this.partList.length; i < len; i++) {
            var view = this.partList[i];
            if (i == type) {
                if (!view) {
                    view = new (egret.getDefinitionByName("SkinPart" + i))(this);
                    this.partList[i] = view;
                }
                if (!view.parent) {
                    this.partGroup.addChild(view);
                }
            }
            else {
                DisplayUtil.removeFromParent(view);
            }
        }
    };
    SkinShowComp.prototype.onSelectItem = function () {
        var obj = this.list.selectedItem;
        var type = obj.type;
        var view = this.partList[type];
        if (view) {
            view.setData(obj);
        }
        else {
        }
    };
    SkinShowComp.prototype.refresh = function (arr) {
        var dataProvider = this.list.dataProvider;
        dataProvider.replaceAll(arr);
        this.onSelectItem();
    };
    return SkinShowComp;
}(ExComponent));
__reflect(SkinShowComp.prototype, "SkinShowComp");
