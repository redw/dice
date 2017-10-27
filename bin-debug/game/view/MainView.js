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
var MainView = (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        var _this = _super.call(this) || this;
        _this.scene = new Scene(95, 67, 5);
        _this.addChild(_this.scene);
        _this.leftView = new LeftView();
        _this.leftView.left = 0;
        _this.addChild(_this.leftView);
        _this.rightView = new RightView();
        _this.rightView.right = 0;
        _this.addChild(_this.rightView);
        _this.bottomView = new BottomView();
        _this.bottomView.y = 780;
        _this.addChild(_this.bottomView);
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick, _this);
        return _this;
    }
    MainView.prototype.onClick = function (e) {
        var name = e.target.name;
        switch (name) {
            case "diceBtn":
                this.scene.throwDice();
                break;
            case "skinBtn":
                Pop.open(SkinPanel);
                break;
        }
    };
    return MainView;
}(egret.DisplayObjectContainer));
__reflect(MainView.prototype, "MainView");
//# sourceMappingURL=MainView.js.map