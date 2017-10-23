class SceneBG extends egret.DisplayObjectContainer {
    private sourceArr = ["beijing_01_png", "beijing_10_png", "beijing_11_png", "beijing_12_png"];
    private tileW = 192;
    private tileH = 540;

    public constructor() {
        super();
    }

    public draw() {
        let len = this.sourceArr.length;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < 10; j++) {
                let image = new eui.Image();
                image.source = this.sourceArr[i];
                image.y = i * this.tileH;
                image.x = j * this.tileW;
                this.addChild(image);
            }
        }
    }
}
