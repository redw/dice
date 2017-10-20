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
 * 游戏中通用的component
 *
 * -添加了对象的生命周期
 * -添加了点击事件
 * -添加了舞台事件
 *
 * Created by hh on 2017/10/10 0010.
 */
var ExComponent = (function (_super) {
    __extends(ExComponent, _super);
    function ExComponent(data) {
        var _this = _super.call(this) || this;
        _this._dataOk = false;
        _this._viewOk = false;
        if (data !== undefined) {
            _this.setData(data);
        }
        return _this;
    }
    ExComponent.prototype.$onAddToStage = function (stage, nestLevel) {
        _super.prototype.$onAddToStage.call(this, stage, nestLevel);
        this.addToStage();
    };
    ExComponent.prototype.$onRemoveFromStage = function () {
        _super.prototype.$onRemoveFromStage.call(this);
        this.removeFromStage();
    };
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
        this.onClick(name);
    };
    /**
     * 点击事件
     * @param name
     */
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
    /**
     * 界面初始化完成
     */
    ExComponent.prototype.init = function () {
    };
    /**
     * 对象激活
     * 可触发多次
     */
    ExComponent.prototype.active = function () {
    };
    /**
     * 添加到舞台
     */
    ExComponent.prototype.addToStage = function () {
    };
    /**
     * 从舞台上移除
     */
    ExComponent.prototype.removeFromStage = function () {
    };
    /**
     * 对失眠(处理待回收状态)
     */
    ExComponent.prototype.disActive = function () {
    };
    /**
     * 释放
     */
    ExComponent.prototype.dispose = function () {
        this.disActive();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.$onClick, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return ExComponent;
}(eui.Component));
__reflect(ExComponent.prototype, "ExComponent", ["ILifeCycle"]);
//# sourceMappingURL=ExComponent.js.map