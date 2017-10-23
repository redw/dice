class ISOSceneBackground extends egret.DisplayObjectContainer {
    private inner = 3;
    private des = 1;
    private build = 1;
    private road = 1;
    private scene:ISOScene;

    public constructor(scene:ISOScene) {
        super();
        this.scene = scene;
    }

    /**
     * 创建背景
     * @param inner
     * @param des
     * @param build
     * @param road
     */
    public create(inner:number, des = 1, build = 1, road = 1) {
        this.inner = inner;
        this.des = des;
        this.build = build;
        this.road = road;
        this.drawBackGround();
    }

    private drawBackGround() {
        let container = this;

        // 内圈
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

        // 路
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

        // 建筑物
        start = this.des;
        end = start + this.inner + this.road * 2 + this.build;
        for (let i = start; i <= end; i++) {
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
        let pos = this.getGridPos(xx, yy);
        bitmap.x = pos.x + offX;
        bitmap.y = pos.y + offY;
        container.addChild(bitmap);
    }

    private getGridPos(xx:number, yy:number) {
        return this.scene.getGridPos(xx, yy);
    }
}