import off = Net.off;
class MainView extends egret.DisplayObjectContainer {
    private scene:Scene;

    private leftView:LeftView;
    private rightView:RightView;
    private bottomView:BottomView;

    public constructor() {
        super();

        // var cloundEff = new CloundEffect();
        // this.addChild(cloundEff);
        // cloundEff.start();
        // return;

        // var woodEffect = new WoodEffect();
        // this.addChild(woodEffect);
        // let group = new eui.Group();
        // group.width = 200;
        // group.height = 200;
        // group.x = 200;
        // group.y = 200;
        // let rect = new eui.Rect(200, 200, 0x0);
        // rect.fillColor = 0x0;
        // group.addChild(rect);
        //
        // let redPoint = new egret.Sprite();
        // redPoint.graphics.beginFill(0xff0000);
        // redPoint.graphics.drawCircle(0, 0, 10);
        // redPoint.graphics.endFill();
        // group.addChild(redPoint);
        // STAGE.addChild(group);
        // return;

        this.scene = new Scene();
        this.addChild(this.scene);

        this.leftView = new LeftView();
        this.leftView.left = 0;
        this.addChild(this.leftView);

        this.rightView = new RightView();
        this.rightView.right = 0;
        this.addChild(this.rightView);

        this.bottomView = new BottomView();
        this.bottomView.y = 780;
        this.addChild(this.bottomView);

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }

    private onClick(e:egret.TouchEvent) {
        let name = e.target.name;
        switch (name) {
            case "diceBtn":
                // this.scene.throwDice();
                this.addDiamond(e);
                break;

            case "skinBtn":
                Pop.open(SkinPanel);
                break;
        }
    }

    private addDiamond(e:egret.TouchEvent) {
        let count = 10;
        while (count--) {
            let ball = new Ball();
            // image.x = e.stageX;
            // image.y = e.stageY;
            let minAngle = 30;
            let maxAngle = 150;
            let minDistance = 50;
            let maxDistance = 100;
            let angle = (minAngle + Math.random() * (maxAngle - minAngle));
            let distance = minDistance + Math.random() * (maxDistance - minDistance);
            let offX = Math.cos(angle) * distance;
            let offY = Math.sin(angle) * distance;
            let x = e.stageX + offX;
            let y = e.stageY + offY;
            let targetX = 50;
            let targetY = 50;
            ball.fly(x, y, targetX, targetY, e.stageX, e.stageY);
            STAGE.addChild(ball);
        }
    }
}

class Ball extends egret.DisplayObjectContainer {
    private p0_x;
    private p0_y;
    private p1_x;
    private p1_y;
    private p2_x;
    private p2_y;

    public constructor() {
        super();
        let image = new eui.Image();
        image.source = "common_icon_diamon_s_png";
        this.addChild(image);
    }

    public setPos(x:number, y:number) {
        this.x = x;
        this.y = y;
    }

    public setBack(back:Function, context:any) {

    }

    /**
     * 飞到目标点
     * @param x     开始x
     * @param y     开始y
     * @param tx    目标x
     * @param ty    目标y
     * @param mx    鼠标x
     * @param my  鼠标y
     */
    public fly(x:number, y:number, tx:number, ty:number, mx:number, my:number) {
        this.setPos(mx, my);
        let tween = egret.Tween.get(this);
        tween.to({x:x, y:y}, 200, egret.Ease.quartIn).wait(100).call(this.fly1, this, [x, y, tx, ty, mx, my]);
    }

    private fly1(x:number, y:number, tx:number, ty:number, mx:number, my:number) {
        let prop:any = {};
        let time = 800 + Math.random() * 200;
        this.p0_x = this.x;
        this.p0_y = this.y;
        let off = this.calcOff(x, y, tx, ty, mx, my);
        this.p1_x = off.x;
        this.p1_y = off.y;
        this.p2_x = tx;
        this.p2_y = ty;

        let tween = egret.Tween.get(this);
        tween.to({factor:1}, time, egret.Ease.quadIn);
    }

    private calcOff(x, y, tx, ty, mx, my) {
        var p = [x - tx, y - ty];
        var q = [mx - tx, my - ty];
        let v = p[0] * q[1] - p[1] * q[0];
        let c = [x + (tx - x) * 0.5, y + (ty - y) * 0.5];
        let point = new egret.Point();

        if (v > 0) {
            point.x = Math.min(STAGE.stageWidth - 20, c[0] + Math.max((x - mx) * 10, 200));
            point.y = c[1];
        } else if (v < 0) {
            point.x = Math.max(c[0] + Math.max((x - mx) * 10, -200), 20);
            point.y = c[1];
        } else {
            point.x = tx + mx - x;
            point.y = ty + my - y;
        }
        return point;
    }

    //添加factor的set,get方法,注意用public
    public get factor():number {
        return 0;
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