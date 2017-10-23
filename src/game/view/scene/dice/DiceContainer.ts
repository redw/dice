class DiceContainer extends egret.DisplayObjectContainer {
    private layer:egret.DisplayObjectContainer;
    private homeLand:HomeLand;
    // 色子显示对象
    private diceArr:Dice[];
    private throwCount = 0;
    private throwValue = 0;
    private completeCount = 0;
    private size = 4;
    // 色子的活动格子范围
    private gridIndexArr:number[];

    public constructor(homeLand:HomeLand) {
        super();
        this.homeLand = homeLand;
        this.layer = new egret.DisplayObjectContainer();
        this.addChild(this.layer);

        this.gridIndexArr = [];

        let off = homeLand.des + homeLand.build + homeLand.road;
        let span = homeLand.des * 2 + homeLand.build * 2 + homeLand.road * 2 + homeLand.inner;
        let len = homeLand.inner;
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len; j++) {
                let value = (off + i) * span + off + j;
                this.gridIndexArr.push(value);
            }
        }

        this.diceArr = [];
        this.addEventListener("DICE_ANI_COMPLETE", this.diceAniComplete, this);
    }

    public addRandomDice(value = 1) {
        let exist = false;
        do {
            let pos = ArrayUtil.getRandomItem(this.gridIndexArr);
            let span = this.homeLand.des * 2 + this.homeLand.build * 2 + this.homeLand.road * 2 + this.homeLand.inner;
            let yy = ~~(pos / span);
            let xx = pos % span;
            this.addDice(xx, yy, value);
        } while(exist);
    }

    /**
     * 添加色子
     * @param xx    列数
     * @param yy    排数
     * @param value 色子点数
     * @param posX  色子相对于自身的X偏移
     * @param posY  色子相对于自身的Y偏移
     * @returns {Dice}
     */
    public addDice(xx:number, yy:number, value = 1, posX = 0, posY = 0) {
        let dice = new Dice(value);
        dice.xx = xx;
        dice.yy = yy;
        let point = this.getGirdPosByXXYY(xx, yy);
        dice.setPos(point.x + posX, point.y + posY);
        this.layer.addChild(dice);
        this.diceArr.push(dice);
        return dice;
    }

    public getDiceValues() {
        let len = this.diceArr.length;
        let result = [];
        for (let i = 0; i < len; i++) {
            result.push(this.diceArr[i].getValue())
        }
        return result;
    }

    /**
     * 抛色子
     */
    public throwDice(values?:number[], method?:number) {
        let len = this.diceArr.length;
        if (!values || !values.length) {
            values = [];
            for (let i = 0; i < len; i++) {
                let value = ArrayUtil.getRandomItem(ArrayUtil.numberArray(1, 6));
                values.push(value);
            }
        }
        this.throwCount = values.length;
        this.completeCount = 0;
        let value = 0;
        let time = 400 + ~~(Math.random() * 100);
        let indexArr = this.gridIndexArr.concat();
        for (let i = 0; i < this.throwCount; i++) {
            let dice = this.diceArr[i];
            if (!dice) {
                this.addRandomDice(1);
            }
            let method = Util.getRandomInt(1, 3);
            let index = ArrayUtil.removeRandomItem(indexArr);
            let point = this.getGridPosByIndex(index);
            value += dice.throw(point.x, point.y, values[i], method, time);
        }
        this.throwValue = value;
    }

    private diceAniComplete() {
        this.completeCount++;
        if (this.throwCount == this.completeCount) {
            EventManager.inst.dispatchEventWith(GameEvents.DICE_COMPLETE)
        }
    }

    private getGridPosByIndex(index:number) {
        let span = this.homeLand.des * 2 + this.homeLand.build * 2 + this.homeLand.road * 2 + this.homeLand.inner;
        let xx = index % span;
        let yy = ~~(index / span);
        console.log("drop:",xx, yy);
        return this.getGirdPosByXXYY(xx, yy);
    }

    private getGirdPosByXXYY(xx:number, yy:number) {
        return this.homeLand.getGridPosByXXYY(xx, yy);
    }
}