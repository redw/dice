class SceneBackGround extends egret.DisplayObjectContainer {
    private resList = ["beijing_01_png", "beijing_10_png", "beijing_11_png", "beijing_12_png"]
    public constructor() {
        super();
    }

    public create() {
        this.drawBackground();
    }

    private drawBackground(row = 4, col = 10, tileW = 192, tileH = 540) {
        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                let image = new eui.Image();
                image.source = this.resList[i];
                image.x = j * tileW;
                image.y = i * tileH;
                this.addChild(image);
            }
        }
    }
}