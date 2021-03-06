/**
 * 游戏场景
 */
class Scene extends egret.DisplayObjectContainer {
    public tileW = 100;
    public tileH = 100;
    public inner = 3;
    public road = 1;
    public build = 1;
    public des = 1;
    public size = 7;

    private backGround:SceneBG;
    private homeLand:HomeLand;

    /**
     * 构造函数
     * @param inner     内部大小
     * @param tileW     格子宽度
     * @param tileH     格子高度
     * @param road      环道
     * @param build     建筑
     * @param des       装饰
     */
    public constructor(inner = 3, tileW:number, tileH:number) {
        super();
        this.inner = inner;
        this.tileW = tileW;
        this.tileH = tileH;

        let count = inner + (this.road + this.build + this.des) * 2;
        this.size = count;

        this.backGround = new SceneBG();
        this.addChild(this.backGround);
        this.backGround.draw();

        this.homeLand = new HomeLand(95, 67, inner);
        this.addChild(this.homeLand);
        // this.initDice();
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

    // // 实始化色子
    // private initDice(count = 2) {
    //     let diceArr = ArrayUtil.numberArray(0, 9);
    //     while (count--) {
    //         let randomValue = ArrayUtil.removeRandomItem(diceArr);
    //         this.diceContainer.addRandomDice(randomValue);
    //     }
    // }
    //
    public throwDice() {
        this.homeLand.throwDice();
    }

    public static getGridPosByXXYY(xx:number, yy:number, width=95, height=67) {
        let x = (xx - yy - 1) * width * 0.5;
        let y = (xx + yy) * height * 0.5;
        return {x:x, y:y};
    }

    public static getBuildConfigInfo(source:string) {
        source = source.replace("_png", "");
        let obj = RES.getRes("build_json");
        return obj[source];
    }
}