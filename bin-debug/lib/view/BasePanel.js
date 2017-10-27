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
 * 游戏中弹出面板
 *
 * Created by hh on 2017/10/19 0010.
 */
var BasePanel = (function (_super) {
    __extends(BasePanel, _super);
    function BasePanel(data, option) {
        var _this = _super.call(this, data) || this;
        /** 层级 */
        _this.layer = "layer";
        /** 互斥 */
        _this.mutex = false;
        /** 灰底 */
        _this.modal = false;
        /** 灰底ALPHA */
        _this.modalAlpha = 0.6;
        /** 存在模式 0:永远存在 1:关闭即销毁 */
        _this.existMode = 0;
        /** 打开特效 0:没有动画 1:中间弹出 2:上进 3:下进 4:左进 5:右进 */
        _this.effectType = 0;
        _this.effectType = Util.getValue(option, "effect", 1);
        _this.modal = true;
        return _this;
    }
    BasePanel.prototype.$onClick = function (e) {
        var name = e.target.name;
        if (name == "closeBtn" || name == "close") {
            Pop.close(this);
        }
        else {
            this.onClick(name);
        }
    };
    return BasePanel;
}(ExComponent));
__reflect(BasePanel.prototype, "BasePanel");
