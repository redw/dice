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
var __STAGE;
/**
 * 游戏入口
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        console.log(' _       _');
        console.log('| |__   | |__');
        console.log('|  _ \\  |  _ \\');
        console.log('| | | | | | | |');
        console.log('|_| |_| |_| |_|');
        console.log('我是hh, qq:503872749');
        console.log('专业专注小游戏,小程序');
        console.log('用最好的产品回报给大家!');
        if (_this.stage) {
            _this.onAddToStage();
        }
        else {
            _this.once(egret.Event.ADDED_TO_STAGE, _this.onAddToStage, _this);
        }
        return _this;
    }
    Main.prototype.onAddToStage = function () {
        __STAGE = this.stage;
        var stage = this.stage;
        var assetAdapter = new AssetAdapter();
        stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
        stage.scaleMode = egret.StageScaleMode.SHOW_ALL;
        LoadManager.boot();
        MainLoad.start(this.enterGame, this);
    };
    Main.prototype.enterGame = function () {
        var mainView = new MainView();
        this.addChild(mainView);
        Pop.boot(this);
        GameLoop.boot();
        GameLoop.registerEnterFrame(this.onEnterFrame, this);
    };
    Main.prototype.onEnterFrame = function () {
        dragonBones.WorldClock.clock.advanceTime(0.025);
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map