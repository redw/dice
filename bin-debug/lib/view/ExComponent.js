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
 * Created by hh on 2017/10/10 0010.
 */
var ExComponent = (function (_super) {
    __extends(ExComponent, _super);
    function ExComponent(data) {
        var _this = _super.call(this) || this;
        _this._dataOk = false;
        _this._viewOk = false;
        /** 打开特效
         * 0:没有动画
         * 1:中间弹出
         * 2:上进
         * 3:下进
         * 4:左进
         * 5:右进
         */
        _this.effectType = 0;
        if (data !== undefined) {
            _this.setData(data);
        }
        return _this;
    }
    ExComponent.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.$onClick, this);
        this.init();
        this._viewOk = true;
        if (this._dataOk) {
            this.active();
        }
    };
    ExComponent.prototype.$onClick = function (e) {
        var name = e.target.name;
        if (name == "closeBtn" || name == "close") {
            Pop.close(this);
        }
        else {
            this.onClick(name);
        }
    };
    ExComponent.prototype.onClick = function (name) {
    };
    ExComponent.prototype.setData = function (data) {
        this._data = data;
        this._dataOk = true;
        if (this._viewOk) {
            this.active();
        }
    };
    ExComponent.prototype.setPos = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Object.defineProperty(ExComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    ExComponent.prototype.init = function () {
    };
    ExComponent.prototype.active = function () {
    };
    ExComponent.prototype.disActive = function () {
    };
    ExComponent.prototype.dispose = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.$onClick, this);
    };
    return ExComponent;
}(eui.Component));
__reflect(ExComponent.prototype, "ExComponent", ["ILifeCycle"]);
//# sourceMappingURL=ExComponent.js.map