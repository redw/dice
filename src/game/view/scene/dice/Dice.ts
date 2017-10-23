class Dice extends egret.DisplayObjectContainer {
    private armature:dragonBones.Armature;
    private isTransforming = false;
    private pointCount = 0;

    private p0_x;
    private p0_y;
    private p1_x;
    private p1_y;
    private p2_x;
    private p2_y;
    private method;
    private dropTime;

    public xx = 0;
    public yy = 0;
    public offX = 0;
    public offY = 0;

    public constructor(value) {
        super();
        this.scaleX = 0.5;
        this.scaleY = 0.5;
        let armature = BoneUtil.createArmature("dice_roll");
        let name = `${1}-1`;
        armature.animation.play(name, 1);
        this.addChild(armature.display);
        this.armature = armature;
    }

    public setPos(x:number, y:number) {
        this.x = x;
        this.y = y;
    }

    public getValue() {
        return this.pointCount;
    }

    //添加factor的set,get方法,注意用public
    public get factor():number {
        return 0;
    }

    /**
     * 抛色子
     * @param toX
     * @param toY
     * @param value
     * @param method
     * @param dropTime  下落时间
     * @returns {any}
     */
    public throw(toX:number, toY:number, value?:number, method?:number, dropTime?:number) {
        if (!value) {
            value = ArrayUtil.getRandomItem(ArrayUtil.numberArray(1, 6));
        }
        if (!method) {
            method = 1;
        }
        if (!dropTime) {
            dropTime = 1000;
        }
        this.pointCount = value;
        this.method = method;
        this.dropTime = dropTime;
        if (this.isTransforming) {
            return NaN;
        } else {
            let tween = egret.Tween.get(this);
            tween.to({alpha:0}, 200).call(this.throw1, this, [toX, toY]);
        }
       return value;
    }

    // 空中抛
    private throw1(toX:number, toY:number) {
        let name = `${this.pointCount}-${this.method}`;
        this.armature.animation.play(name, 1);
        this.alpha = 1;
        this.scaleX = 0.3;
        this.scaleY = 0.3;
        this.x = this.x - 100;
        this.y = this.y - 500;
        let offX = toX;
        let offY = this.y;
        this.to(toX, toY, offX, offY);
    }

    // 着地
    private throw2() {
        let method = this.method;
        let value = this.pointCount;
        let name = `${value}-${method}`;
        this.armature.animation.play(name, 1);
        this.armature.addEventListener(dragonBones.AnimationEvent.COMPLETE, this.throwComplete, this);
    }

    private throwComplete() {
        this.armature.removeEventListener(dragonBones.AnimationEvent.COMPLETE, this.throwComplete, this);
        this.isTransforming = false;
        this.dispatchEventWith("DICE_ANI_COMPLETE", true);
    }

    public to(toX:number, toY:number, offX?:number, offY?:number) {
        if (!this.isTransforming) {
            this.isTransforming = true;
            let tween = egret.Tween.get(this);
            let prop:any = {};
            let time = this.dropTime;
            if (offX !== undefined && offY != undefined) {
                this.p0_x = this.x;
                this.p0_y = this.y;
                this.p1_x = offX;
                this.p1_y = offY;
                this.p2_x = toX;
                this.p2_y = toY;
                prop.factor = 1;
                prop.scaleY = 0.5;
                prop.scaleX = 0.5;
            } else {
               prop.x = toX;
               prop.y = toY;
            }
            tween.to(prop, time, egret.Ease.cubicIn).call(()=>{
                this.throw2();
            }, this);
            return true;
        }
        return false;
    }

    //计算方法参考 二次贝塞尔公式
    //(1 - t)^2 P0 + 2 t (1 - t) P1 + t^2 P2
    public set factor(value:number) {
        let t = value;
        let p0_x = this.p0_x;
        let p0_y = this.p0_y;
        let p1_x = this.p1_x;
        let p1_y = this.p1_y;
        let p2_x = this.p2_x;
        let p2_y = this.p2_y;
        this.x = (1 - t) * (1 - t) * p0_x + 2 * t * (1 - t) * p1_x + t * t * p2_x;
        this.y = (1 - t) * (1 - t) * p0_y + 2 * t * (1 - t) * p1_y + t * t * p2_y;
    }
}


