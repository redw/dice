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
 * 家园背景
 */
var HomeLandBG = (function (_super) {
    __extends(HomeLandBG, _super);
    /**
     * 构造函数
     * @param tileW     格子宽度
     * @param tileH     格子高度
     * @param inner     内部大小
     * @param road      环道
     * @param build     建筑
     * @param des       装饰
     */
    function HomeLandBG(homeLand) {
        var _this = _super.call(this) || this;
        _this.tileW = 100;
        _this.tileH = 100;
        _this.inner = 3;
        _this.road = 1;
        _this.build = 1;
        _this.des = 1;
        _this.size = 1;
        _this.homeLand = homeLand;
        _this.tileW = homeLand.tileW;
        _this.tileH = homeLand.tileH;
        _this.inner = homeLand.inner;
        _this.road = homeLand.road;
        _this.build = homeLand.build;
        _this.des = homeLand.des;
        _this.size = homeLand.size;
        _this.draw();
        return _this;
    }
    /**
     * 游戏场景缩放(只考虑等比缩放)
     * @param value
     */
    HomeLandBG.prototype.scale = function (value) {
        value = MathUtil.clamp(value, 0.5, 1);
        this.scaleX = value;
        this.scaleY = value;
    };
    // 添加背景
    HomeLandBG.prototype.draw = function () {
        var container = this;
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
        start = this.des;
        end = start + this.inner + this.road * 2 + this.build;
        for (var i = start; i <= end; i++) {
            this.addTileToLayer(i, start, "ground_09_png", container);
            this.addTileToLayer(end, i, "ground_09_png", container);
            this.addTileToLayer(i, end, "ground_09_png", container);
            this.addTileToLayer(start, i, "ground_09_png", container);
        }
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
    HomeLandBG.prototype.addTileToLayer = function (xx, yy, source, container, offX, offY) {
        if (offX === void 0) { offX = 0; }
        if (offY === void 0) { offY = 0; }
        var bitmap = new AutoBitmap();
        bitmap.source = source;
        var pos = this.homeLand.getGridPosByXXYY(xx, yy);
        bitmap.x = pos.x + offX;
        bitmap.y = pos.y + offY;
        container.addChild(bitmap);
    };
    return HomeLandBG;
}(egret.DisplayObjectContainer));
__reflect(HomeLandBG.prototype, "HomeLandBG");
