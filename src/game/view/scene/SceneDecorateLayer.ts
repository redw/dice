class SceneDecorateLayer extends egret.DisplayObjectContainer {
    private inner:number;
    private dir:string;
    private size:number;


    public constructor(dir:string, inner:number) {
        super();
        this.touchChildren = false;
        this.touchEnabled = false;
        this.dir = dir;
        this.inner = inner;
        this.size = inner + 6;
    }

    public drawUp() {
        for (let i = 0; i < this.size; i++) {
            let pos = Scene.getGridPosByXXYY(i, 0);
            let image = new eui.Image("tree_07_png");
            let obj = Scene.getBuildConfigInfo("tree_07_png");
            image.x = pos.x + obj.offX;
            image.y = pos.y + obj.offY;
            console.log(obj, "......");
            this.addChild(image);

            // var redPoint = new egret.Shape();
            // redPoint.graphics.beginFill(0xff0000);
            // redPoint.graphics.drawCircle(0,0,5);
            // redPoint.graphics.endFill();
            // this.addChild(redPoint);
            // redPoint.x = pos.x;
            // redPoint.y = pos.y;
        }
    }

    public drawDown() {

    }
}