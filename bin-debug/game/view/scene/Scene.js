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
 * 游戏场景
 */
var Scene = (function (_super) {
    __extends(Scene, _super);
    /**
     * 构造函数
     * @param tileW     格子宽度
     * @param tileH     格子高度
     * @param inner     内部大小
     * @param road      环道
     * @param build     建筑
     * @param des       装饰
     */
    function Scene(tileW, tileH, inner, road, build, des) {
        if (inner === void 0) { inner = 3; }
        if (road === void 0) { road = 1; }
        if (build === void 0) { build = 1; }
        if (des === void 0) { des = 1; }
        var _this = _super.call(this) || this;
        _this.rowCount = 1;
        _this.colCount = 1;
        _this.tileW = 100;
        _this.tileH = 100;
        _this.inner = 3;
        _this.road = 1;
        _this.build = 1;
        _this.des = 1;
        _this.size = 1;
        _this.tileW = tileW;
        _this.tileH = tileH;
        _this.inner = inner;
        _this.road = road;
        _this.build = build;
        _this.des = des;
        _this.x = __STAGE.stageWidth * 0.5;
        var count = inner + (road + build + des) * 2;
        _this.size = count;
        _this.backGroundLayer = new egret.DisplayObjectContainer();
        _this.addChild(_this.backGroundLayer);
        _this.roadLayer = new egret.DisplayObjectContainer();
        _this.addChild(_this.roadLayer);
        _this.grassLayer = new egret.DisplayObjectContainer();
        _this.addChild(_this.grassLayer);
        _this.diceBGLayer = new egret.DisplayObjectContainer();
        _this.addChild(_this.diceBGLayer);
        _this.addBackGround();
        return _this;
    }
    /**
     * 游戏场景缩放(只考虑等比缩放)
     * @param value
     */
    Scene.prototype.scale = function (value) {
        value = MathUtil.clamp(value, 0.5, 1);
        this.scaleX = value;
        this.scaleY = value;
    };
    // 添加背景
    Scene.prototype.addBackGround = function () {
        var container = this.backGroundLayer;
        var start = this.road + this.build + this.des;
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
        start = this.build + this.des + 1;
        var step = this.inner;
        for (var i = 0; i < this.inner; i++) {
            this.addTileToLayer(start + i, start - 1, "road_05_png", container);
            this.addTileToLayer(start + step, start + i, "road_05_png", container);
            this.addTileToLayer(start + i, start + step, "road_05_png", container);
            this.addTileToLayer(start - 1, start + i, "road_05_png", container);
        }
        this.addTileToLayer(start - 1, start - 1, "road_03_png", container);
        this.addTileToLayer(start + step, start - 1, "road_04_png", container);
        this.addTileToLayer(start - 1, start + step, "road_02_png", container);
        this.addTileToLayer(start + step, start + step, "road_01_png", container);
        start = this.build + 1;
        step = this.build + this.road + this.inner;
        for (var i = 0; i <= end; i++) {
            this.addTileToLayer(start + i - 1, start - 1, "ground_09_png", container);
            this.addTileToLayer(start + step, start + i - 1, "ground_09_png", container);
            this.addTileToLayer(start + i, start + step, "ground_09_png", container);
            this.addTileToLayer(start - 1, start + i, "ground_09_png", container);
        }
        start = this.build + this.des + 1;
        step = this.inner;
        for (var i = 0; i < step; i++) {
            this.addTileToLayer(start + i, start - 1, "road_05_png", container);
            this.addTileToLayer(start + step, start + i, "road_05_png", container);
            this.addTileToLayer(start + i, start + step, "road_05_png", container);
            this.addTileToLayer(start - 1, start + i, "road_05_png", container);
        }
        this.addTileToLayer(start - 1, start - 1, "road_03_png", container);
        this.addTileToLayer(start + step, start - 1, "road_04_png", container);
        this.addTileToLayer(start - 1, start + step, "road_02_png", container);
        this.addTileToLayer(start + step, start + step, "road_01_png", container);
        // 外围
        start = 0;
        step = this.size - 2;
        for (var i = 0; i < step; i++) {
            this.addTileToLayer(i + 1, start, "ground_03_png", container);
            this.addTileToLayer(step + 1, i + i, "ground_07_png", container);
            this.addTileToLayer(i + 1, step + 1, "ground_02_png", container);
            this.addTileToLayer(start, i + 1, "ground_04_png", container);
        }
        // this.addTileToLayer(start - 1, start - 1, "road_03_png", container);
        // this.addTileToLayer(start + step, start - 1, "road_04_png", container);
        // this.addTileToLayer(start - 1, start + step, "road_02_png", container);
        // this.addTileToLayer(start + step, start + step, "road_01_png", container);
    };
    Scene.prototype.addTileToLayer = function (xx, yy, source, container, offX, offY) {
        if (offX === void 0) { offX = 0; }
        if (offY === void 0) { offY = 0; }
        var bitmap = new AutoBitmap();
        bitmap.source = source;
        var pos = this.getGridLTPos(xx, yy);
        bitmap.x = pos.x + offX;
        bitmap.y = pos.y + offY;
        container.addChild(bitmap);
    };
    Scene.prototype.getGridLTPos = function (xx, yy) {
        var x = (xx - yy - 1) * this.tileW * 0.5;
        var y = (xx + yy) * this.tileH * 0.5;
        return { x: x, y: y };
    };
    Scene.prototype.getGridCTPos = function (xx, yy) {
    };
    return Scene;
}(egret.DisplayObjectContainer));
__reflect(Scene.prototype, "Scene");
