class Scene extends egret.DisplayObjectContainer {
    private background:SceneBackGround;
    private isoScene:ISOScene;
    private tileW = 100;
    private tileH = 50;
    private sceneWidth = 1920;
    private sceneHeight = 2260;

    public constructor(width:number, height:number, tileW:number, tileH:number) {
        super();
        this.sceneWidth = width;
        this.sceneHeight = height;
        this.tileW = tileW;
        this.tileH = tileH;

        this.background = new SceneBackGround();
        this.addChild(this.background);

        this.isoScene = new ISOScene(tileW, tileH);
        this.addChild(this.isoScene);

        this.center();
    }

    public center() {
        this.x = ( __STAGE.stageWidth - this.sceneWidth) * 0.5;
        this.y = (__STAGE.stageHeight - this.sceneHeight) * 0.5;
        this.isoScene.x = this.x * -1 + __STAGE.stageWidth * 0.5;
        this.isoScene.y = this.y * -1 + 200;
    }

    public create(inner = 3) {
        this.background.create();
        this.isoScene.create(inner);
    }
}