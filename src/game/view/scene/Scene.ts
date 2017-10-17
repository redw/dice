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

    public constructor(tileW:number, tileH:number, rowCount:number, colCount:number) {
        super();


        this.rowCount = rowCount;
        this.colCount = colCount;
        this.tileW = tileW;
        this.tileH = tileH;

        this.x = __STAGE.stageWidth * 0.5;

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
        for (let i = 0; i < this.rowCount; i++) {
            for (let j = 0; j < this.colCount; j++) {
                this.addTileToLayer(j, i, "tile_bg_png", container);
            }
        }
    }

    // 添加路
    private addRoad() {
        let container = this.roadLayer;
        this.addTileToLayer(2, 2, "road_10_png", container);
        this.addTileToLayer(3, 2, "road_03_png", container);
        this.addTileToLayer(4, 2, "road_04_png", container);
        this.addTileToLayer(5, 2, "road_03_png", container);
        this.addTileToLayer(6, 2, "road_11_png", container);

        this.addTileToLayer(6, 3, "road_07_png", container);
        this.addTileToLayer(6, 4, "road_08_png", container);
        this.addTileToLayer(6, 5, "road_07_png", container);

        this.addTileToLayer(2, 6, "road_11_png", container);
        this.addTileToLayer(3, 6, "road_05_png", container);
        this.addTileToLayer(4, 6, "road_06_png", container);
        this.addTileToLayer(5, 6, "road_05_png", container);
        this.addTileToLayer(6, 6, "road_12_png", container);

        this.addTileToLayer(2, 3, "road_01_png", container);
        this.addTileToLayer(2, 4, "road_02_png", container);
        this.addTileToLayer(2, 5, "road_01_png", container);
    }

    // 添加草坪
    private addGrass() {
        let container = this.grassLayer;
        for (let i = 0; i < this.rowCount; i++) {
            for (let j = 0; j < this.colCount; j++) {
                if (i == 0 || j == 0 || i == this.rowCount - 1 || j == this.colCount - 1) {
                    this.addTileToLayer(j, i, "ground_04_png", container);
                }
            }
        }
    }

    // 色子背景
    private addDiceBackground() {
        let container = this.diceBGLayer;
        for (let i = 3; i < 6; i++) {
            for (let j = 3; j < 6; j++) {
                if (i == 4 && j == 4) {
                    this.addTileToLayer(j, i, "ground_json.ground_11_png", container);
                } else {
                    this.addTileToLayer(j, i, "ground_json.ground_10_png", container);
                }
            }
        }
    }

    private addAround() {
        let container = this.roadLayer;
        for (let i = 0; i < 9; i++) {
            this.addTileToLayer(i, 0, "edge_6_png", container, 53, -73);
            this.addTileToLayer(8, i, "edge_5_png", container, 51, 34);
            this.addTileToLayer(i, 8, "edge_7_png", container, -127, 37);
            this.addTileToLayer(0, i, "edge_8_png", container, -135, -74);
        }
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