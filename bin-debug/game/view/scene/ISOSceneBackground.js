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
var ISOSceneBackground = (function (_super) {
    __extends(ISOSceneBackground, _super);
    function ISOSceneBackground(scene) {
        var _this = _super.call(this) || this;
        _this.inner = 3;
        _this.des = 1;
        _this.build = 1;
        _this.road = 1;
        _this.scene = scene;
        return _this;
    }
    /**
     * 创建背景
     * @param inner
     * @param des
     * @param build
     * @param road
     */
    ISOSceneBackground.prototype.create = function (inner, des, build, road) {
        if (des === void 0) { des = 1; }
        if (build === void 0) { build = 1; }
        if (road === void 0) { road = 1; }
        this.inner = inner;
        this.des = des;
        this.build = build;
        this.road = road;
        this.drawBackGround();
    };
    ISOSceneBackground.prototype.drawBackGround = function () {
        var container = this;
        // 内圈
        var start = this.des + this.build + this.road;
        var end = start + this.inner;
        for (var i = start; i < end; i++) {
            for (var j = start; j < end; j++) {
                this.addTileToLayer(i, j, "ground_10_png", container);
            }
        }
        this.addTileToLayer(start, start, "ground_13_png", container, -6, 3);
        this.addTileToLayer(end, start, "ground_14_png", container, -19, -28);
        this.addTileToLayer(end, end, "ground_15_png", container, 25, -61);
        this.addTileToLayer(start, end, "ground_12_png", container, 54, -52);
        // 路
        start = this.des + this.build;
        end = start + this.inner + this.road;
        for (var i = start + 1; i < end; i++) {
            this.addTileToLayer(i, start, "road_05_png", container);
            this.addTileToLayer(end, i, "road_05_png", container);
            this.addTileToLayer(i, end, "road_05_png", container);
            this.addTileToLayer(start, i, "road_05_png", container);
        }
        this.addTileToLayer(start, start, "road_03_png", container);
        this.addTileToLayer(end, start, "road_04_png", container);
        this.addTileToLayer(start, end, "road_02_png", container);
        this.addTileToLayer(end, end, "road_01_png", container);
        // 建筑物
        start = this.des;
        end = start + this.inner + this.road * 2 + this.build;
        for (var i = start; i <= end; i++) {
            this.addTileToLayer(i, start, "ground_09_png", container);
            this.addTileToLayer(end, i, "ground_09_png", container);
            this.addTileToLayer(i, end, "ground_09_png", container);
            this.addTileToLayer(start, i, "ground_09_png", container);
        }
        // 边圈
        start = 0;
        end = start + this.inner + this.road * 2 + this.build * 2;
        this.addTileToLayer(start, start, "ground_05_png", container);
        this.addTileToLayer(end + 1, start, "ground_06_png", container);
        this.addTileToLayer(end + 1, end + 1, "ground_08_png", container, -4, -2);
        this.addTileToLayer(start, end + 1, "ground_01_png", container, 0, -2);
        for (var i = start; i < end; i++) {
            this.addTileToLayer(i + 1, 0, "ground_03_png", container);
            this.addTileToLayer(end + 1, i + 1, "ground_07_png", container);
            this.addTileToLayer(i + 1, end + 1, "ground_02_png", container, -4, -2);
            this.addTileToLayer(start, i + 1, "ground_04_png", container);
        }
    };
    ISOSceneBackground.prototype.addTileToLayer = function (xx, yy, source, container, offX, offY) {
        if (offX === void 0) { offX = 0; }
        if (offY === void 0) { offY = 0; }
        var bitmap = new AutoBitmap();
        bitmap.source = source;
        var pos = this.getGridPos(xx, yy);
        bitmap.x = pos.x + offX;
        bitmap.y = pos.y + offY;
        container.addChild(bitmap);
    };
    ISOSceneBackground.prototype.getGridPos = function (xx, yy) {
        return this.scene.getGridPos(xx, yy);
    };
    return ISOSceneBackground;
}(egret.DisplayObjectContainer));
__reflect(ISOSceneBackground.prototype, "ISOSceneBackground");
//# sourceMappingURL=ISOSceneBackground.js.map