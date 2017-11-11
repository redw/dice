/**
 * 家园
 * Created by hh on 2017/10/23 0023.
 */
class HomeLand extends egret.DisplayObjectContainer {
    private backGround:HomeLandBG;
    private buildLayer0:SceneBuildLayer;
    private buildLayer1:SceneBuildLayer;
    private decorateLayer0:SceneDecorateLayer;
    private decorateLayer1:SceneDecorateLayer;
    private diceContainer: DiceContainer;

    public tileW = 100;
    public tileH = 100;
    public inner = 3;
    public road = 1;
    public build = 1;
    public des = 1;
    public size = 7;

    /**
     * 构造函数
     * @param tileW     格子宽度
     * @param tileH     格子高度
     * @param inner     内部大小
     */
    public constructor(tileW:number, tileH:number, inner = 3) {
        super();
        this.tileW = tileW;
        this.tileH = tileH;
        this.inner = inner;

        let count = inner + (this.road + this.build + this.des) * 2;
        this.size = count;

        this.backGround = new HomeLandBG(this);
        this.addChild(this.backGround);

        this.decorateLayer0 = new SceneDecorateLayer("up", inner);
        this.addChild(this.decorateLayer0);

        this.buildLayer0 = new SceneBuildLayer("up", inner);
        this.addChild(this.buildLayer0);

        this.diceContainer = new DiceContainer(this);
        this.addChild(this.diceContainer);

        this.buildLayer1 = new SceneBuildLayer("down", inner);
        this.addChild(this.buildLayer1);

        this.decorateLayer1 = new SceneDecorateLayer("down", inner);
        this.addChild(this.decorateLayer1);

        this.decorateLayer0.drawUp();

        this.initDice();
    }

    public createDice(x:number, y:number) {
        let dice = BoneUtil.createArmature("dice_roll");
        let display = dice.display;
        display.x = x;
        display.y = y;
        dice.animation.gotoAndPlay("1-1", 0, 0, 0);
        this.addChild(display);
    }

    public getGridPosByXXYY(xx:number, yy:number) {
        let x = (xx - yy - 1) * this.tileW * 0.5;
        let y = (xx + yy) * this.tileH * 0.5;
        return {x:x, y:y};
    }

    // 实始化色子
    private initDice(count = 5) {
        this.diceContainer.addDice(4, 4, 1);
        let diceArr = ArrayUtil.numberArray(0, 9);
        while (count--) {
            let randomValue = ArrayUtil.removeRandomItem(diceArr);
            this.diceContainer.addRandomDice(randomValue);
        }
    }

    public throwDice() {
        this.diceContainer.throwDice();
    }
}
