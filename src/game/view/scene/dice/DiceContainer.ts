class DiceContainer extends egret.DisplayObjectContainer {
    static DICE_METHOD = ["1", "2", "2_x", "3", "3_x"];
    static DICE_OFF = [[], [0, -1], [1, 0], [0, -1, 0 -2], [1, 0, 2, 0]];

    private layer:egret.DisplayObjectContainer;
    private homeLand:HomeLand;

    private throwCount = 0;
    private throwValue = 0;
    private completeCount = 0;
    private size = 4;

    // 色子显示对象
    private diceArr:Dice[];
    // 色子所在的格子
    private diceIndexArr:number[];
    // 色子的活动格子范围
    private gridIndexArr:number[];
    private timerId:number;

    public constructor(homeLand:HomeLand) {
        super();
        this.homeLand = homeLand;
        this.layer = new egret.DisplayObjectContainer();
        this.addChild(this.layer);

        this.gridIndexArr = [];
        this.diceIndexArr = [];

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

    // 添加随机色子
    public addRandomDice(value = 1) {
        while (true) {
            let pos = ArrayUtil.getRandomItem(this.gridIndexArr);
            if (this.diceIndexArr.indexOf(+pos) < 0 ) {
                let span = this.homeLand.des * 2 + this.homeLand.build * 2 + this.homeLand.road * 2 + this.homeLand.inner;
                let yy = ~~(pos / span);
                let xx = pos % span;
                this.addDice(xx, yy, value);
                break;
            }


        }
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
    public addDice(xx:number, yy:number, value = 1, posX = 48, posY = 34) {
        let dice = new Dice(value);
        dice.xx = xx;
        dice.yy = yy;
        let span = this.homeLand.des * 2 + this.homeLand.build * 2 + this.homeLand.road * 2 + this.homeLand.inner;
        dice.order = yy * span + xx;
        this.diceIndexArr.push(yy * span + xx);
        let point = this.getGirdPosByXXYY(xx, yy);
        dice.setPos(point.x + posX, point.y + posY);
        this.layer.addChild(dice);
        this.sortDisplay();
        this.diceArr.push(dice);
        return dice;
    }

    // 得到色子值
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
        this.timerId = GameLoop.registerEnterFrame(this.sortDisplay, this);
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
        this.diceIndexArr = [];
        let count = 0;
        let span = this.homeLand.des * 2 + this.homeLand.build * 2 + this.homeLand.road * 2 + this.homeLand.inner;
        let throwInfo = [];
        let step = 0;
        let methodIndexArr = [];
        while (count < this.throwCount || step > 10000) {
            step++;
            let index = ArrayUtil.getRandomItem(indexArr);
            let methodIndex = Util.getRandomInt(0, 4);
            if (this.diceIndexArr.indexOf(index) < 0 && (methodIndexArr.length >= 5 || methodIndexArr.indexOf(methodIndex) < 0)) {
                let xx = index % span;
                let yy = ~~(index / span);
                let offArr = DiceContainer.DICE_OFF[methodIndex];
                let ok = true;
                for (let i = 0; i < offArr.length; i += 2) {
                    let newXX = xx + offArr[i];
                    let newYY = yy + offArr[i + 1];
                    let newIndex = newYY * span + newXX;
                    if (this.gridIndexArr.indexOf(newIndex) >= 0) {
                        ok = false;
                        break;
                    }
                }
                if (ok) {
                    count++;
                    throwInfo.push(DiceContainer.DICE_METHOD[methodIndex], xx, yy);
                    this.diceIndexArr.push(index);
                    methodIndexArr.push(methodIndex);
                    for (let i = 0; i < offArr.length; i += 2) {
                        let newXX = xx + offArr[i];
                        let newYY = yy + offArr[i + 1];
                        let newIndex = newYY * span + newXX;
                        this.diceIndexArr.push(newIndex);
                    }
                }
            }
        }

        if (step >= 10000) {
            console.log("抛色子算法错误");
        } else {
            for (let i = 0, len = throwInfo.length; i < len; i += 3) {
                let dice = this.diceArr[~~(i / 3)];
                if (!dice) {
                    this.addRandomDice(1);
                }
                let method = throwInfo[i];
                let xx = throwInfo[i + 1];
                let yy = throwInfo[i + 2];
                dice.xx = xx;
                dice.yy = yy;
                let index = yy * span + xx;
                dice.order = index;
                let point = this.getGridPosByIndex(index);
                value += dice.throw(point.x + 48, point.y + 34, values[i], method, time);
            }
            this.throwValue = value;
        }
    }

    private diceAniComplete() {
        this.completeCount++;
        if (this.throwCount == this.completeCount) {
            GameLoop.clearTimer(this.timerId);
            EventManager.inst.dispatchEventWith(GameEvents.DICE_COMPLETE)
        }
    }

    // 色子排序
    private sortDisplay() {
        this.diceArr.sort(Util.ascendSort);
        let len = this.diceArr.length;
        for (let i = 0; i <len; i++) {
            let dice = this.diceArr[i];
            this.layer.setChildIndex(dice, i);
        }
    }

    private getGridPosByIndex(index:number) {
        let span = this.homeLand.des * 2 + this.homeLand.build * 2 + this.homeLand.road * 2 + this.homeLand.inner;
        let xx = index % span;
        let yy = ~~(index / span);
        return this.getGirdPosByXXYY(xx, yy);
    }

    private getGirdPosByXXYY(xx:number, yy:number) {
        return this.homeLand.getGridPosByXXYY(xx, yy);
    }
}