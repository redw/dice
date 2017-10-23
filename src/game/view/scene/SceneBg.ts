/**
 * 游戏场景
 */
class SceneBg extends egret.DisplayObjectContainer {
    private scene:Scene;
    private tileW = 100;
    private tileH = 100;
    private inner = 3;
    private road = 1;
    private build = 1;
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
    public constructor(scene:Scene) {
        super();
        this.scene = scene;
        this.tileW = scene.tileW;
        this.tileH = scene.tileH;
        this.inner = scene.inner;
        this.road = scene.road;
        this.build = scene.build;
        this.des = scene.des;
        this.size = scene.size;

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
        let container = this;
        let start = this.des + this.build + this.road;
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

        start = this.des + this.build;
        end = start + this.inner + this.road;
        for (let i = start + 1; i < end; i++) {
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
        for (let i = start; i <= end; i++) {
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
        this.addTileToLayer(start, end + 1, "ground_01_png", container,0, -2);
        for (let i = start; i < end; i++) {
            this.addTileToLayer(i + 1, 0, "ground_03_png", container);
            this.addTileToLayer(end + 1, i + 1, "ground_07_png", container);
            this.addTileToLayer(i + 1, end + 1, "ground_02_png", container, -4, -2);
            this.addTileToLayer(start, i + 1, "ground_04_png", container);
        }
    }

    public addTileToLayer(xx:number, yy:number, source:string, container:egret.DisplayObjectContainer, offX = 0, offY = 0) {
        let bitmap = new AutoBitmap();
        bitmap.source = source;
        let pos = this.scene.getGridPosByXXYY(xx, yy);
        bitmap.x = pos.x + offX;
        bitmap.y = pos.y + offY;
        container.addChild(bitmap);
    }
}