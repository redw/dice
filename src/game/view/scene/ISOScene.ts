class ISOScene extends egret.DisplayObjectContainer {
    private background:ISOSceneBackground;
    private tileW = 100;
    private tileH = 50;


    public constructor(tileW:number, tileH:number) {
        super();
        this.tileW = tileW;
        this.tileH = tileH;
        this.background = new ISOSceneBackground(this);
        this.addChild(this.background);
    }

    public create(inner:number) {
        this.background.create(inner);
        let timer = new egret.Timer(5000, 1);
        timer.addEventListener(egret.TimerEvent.COMPLETE, this.outSize, this);
        timer.addEventListener(egret.TimerEvent.TIMER, this.outSize, this);
        timer.start();
    }

    private outSize() {
        console.log("background", __STAGE.stageWidth, this.background.width, this.background.height);
    }

    public getGridPos(xx:number, yy:number) {
        let x = (xx - yy - 1) * this.tileW * 0.5;
        let y = (xx + yy) * this.tileH * 0.5;
        return {x:x, y:y};
    }
}