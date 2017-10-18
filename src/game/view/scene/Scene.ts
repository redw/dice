/**
 * 游戏场景
 */
class Scene extends egret.DisplayObjectContainer {
    private backGroundLayer:egret.DisplayObjectContainer;

    private roadLayer:egret.DisplayObjectContainer;
    private grassLayer:egret.DisplayObjectContainer;
    private diceBGLayer:egret.DisplayObjectContainer;

    private rowCount = 1;
    private colCount = 1;
    private tileW = 100;
    private tileH = 100;
    private inner = 3;
    private road = 1;
    private build = 1
    private des = 1;
    private size = 1;

    /**
     * 构造函数
     * @param tileW     格子宽度
     * @param tileH     格子高度
     * @param inner     内部大小
     * @param road      环道
     * @param build     建筑
     * @param des       装饰
     */
    public constructor(tileW:number, tileH:number, inner = 3, road = 1, build = 1, des = 1) {
        super();
        this.tileW = tileW;
        this.tileH = tileH;
        this.inner = inner;
        this.road = road;
        this.build = build;
        this.des = des;

        this.x = __STAGE.stageWidth * 0.5;
        let count = inner + (road + build + des) * 2;
        this.size = count;

        this.backGroundLayer = new egret.DisplayObjectContainer();
        this.addChild(this.backGroundLayer);

        this.roadLayer = new egret.DisplayObjectContainer();
        this.addChild(this.roadLayer);

        this.grassLayer = new egret.DisplayObjectContainer();
        this.addChild(this.grassLayer);

        this.diceBGLayer = new egret.DisplayObjectContainer();
        this.addChild(this.diceBGLayer);

        this.addBackGround();
    }

    /**
     * 游戏场景缩放(只考虑等比缩放)
     * @param value
     */
    public scale(value:number) {
        value = MathUtil.clamp(value, 0.5, 1);
        this.scaleX = value;
        this.scaleY = value;
    }

    // 添加背景
    private addBackGround() {
        let container = this.backGroundLayer;
        let start = this.road + this.build + this.des;
        let end = start + this.inner;
        for (let i = start; i < end; i++) {
            for (let j = start; j < end; j++) {
                this.addTileToLayer(i, j, "ground_10_png", container);
            }
        }
        this.addTileToLayer(start, start, "ground_13_png", container, -6, 3);
        this.addTileToLayer(end, start, "ground_14_png", container, -19, -28);
        this.addTileToLayer(end, end, "ground_15_png", container, 25, -61);
        this.addTileToLayer(start, end, "ground_12_png", container, 54, -52);

        start = this.build + this.des + 1;
        let step = this.inner;
        for (let i = 0; i < this.inner; i++) {
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
        for (let i = 0; i <= end; i++) {
            this.addTileToLayer(start + i - 1, start - 1, "ground_09_png", container);
            this.addTileToLayer(start + step, start + i - 1, "ground_09_png", container);
            this.addTileToLayer(start + i, start + step, "ground_09_png", container);
            this.addTileToLayer(start - 1, start + i, "ground_09_png", container);
        }

        start = this.build + this.des + 1;
        step = this.inner;
        for (let i = 0; i < step; i++) {
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
        for (let i = 0; i < step; i++) {
            this.addTileToLayer(i + 1, start, "ground_03_png", container);
            this.addTileToLayer(step + 1, i, "ground_07_png", container);

            this.addTileToLayer(i + 1, step + 1, "ground_02_png", container);
            this.addTileToLayer(start, i + 1, "ground_04_png", container);
        }
        // this.addTileToLayer(start - 1, start - 1, "road_03_png", container);
        // this.addTileToLayer(start + step, start - 1, "road_04_png", container);
        // this.addTileToLayer(start - 1, start + step, "road_02_png", container);
        // this.addTileToLayer(start + step, start + step, "road_01_png", container);
    }

    public addTileToLayer(xx:number, yy:number, source:string, container:egret.DisplayObjectContainer, offX = 0, offY = 0) {
        let bitmap = new AutoBitmap();
        bitmap.source = source;
        let pos = this.getGridLTPos(xx, yy);
        bitmap.x = pos.x + offX;
        bitmap.y = pos.y + offY;
        container.addChild(bitmap);
    }

    private getGridLTPos(xx:number, yy:number) {
        let x = (xx - yy - 1) * this.tileW * 0.5;
        let y = (xx + yy) * this.tileH * 0.5;
        return {x:x, y:y};
    }

    private getGridCTPos(xx:number, yy:number) {

    }

}