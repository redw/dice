class BonusPanel extends BasePanel {
    private imgLight: eui.Image;
    private awardName: eui.Label;
    private groupIcon: eui.Group;
    private imgIcon: eui.Image;

    private back: Function;
    private backContext: Object;

    public time = 3;
    public isClose = false;
    private toX:number;
    private toY:number;
    private timerId:number;

    public constructor() {
        super();
        this.layer = PanelLayer.TOP_LAYER;
        this.skinName = BounsPanelSkin;
        this.horizontalCenter = 0;
        this.verticalCenter = 0;
    }

    public active(): void {
        this.back = this.data["back"];
        this.backContext = this.data["backContext"];
        this.imgIcon.source = this.data["icon"];
        this.awardName.text =  this.data["name"] || "";
        this.toX = this.data["toX"];
        this.toY = this.data["toY"];
        this.tweenLight(360);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.timerId = GameLoop.registerTimer(this.onTouch, this, 700);
    }

    private onTouch(e: egret.TouchEvent): void {
        if (this.timerId) {
            GameLoop.clearTimer(this.timerId);
            this.timerId  = 0;
        }
        if (this.isClose) {
            return;
        }
        this.isClose = true;
        this.awardName.visible = false;

        egret.Tween.get(this.groupIcon).to({scaleX: 1.5, scaleY: 1.5}, 350, egret.Ease.elasticOut).call(()=> {
            this.imgLight.visible = false;
            egret.Tween.removeTweens(this.imgLight);
            let toX = this.toX;
            let toY = this.toY;
            egret.Tween.get(this.groupIcon).to({x: toX, y: toY, alpha: 0.4,scaleX: 1, scaleY: 1}, 350).call(()=>{
                this.hidePanel();
            }, this);
        }, this);
    }

    private onInterval(e: egret.Event): void {
        this.time = this.time - 1;
        if (this.time <= 0) {
            this.onTouch(null);
        }
    }

    private tweenLight(value: number): void {
        egret.Tween.get(this.imgLight).to({rotation: value}, 10000).call(()=> {
            this.tweenLight(value);
        }, this);
    }

    private hidePanel(): void {
        Pop.close(this);
        if (this.back) {
            this.back.call(this.backContext);
        }
    }
}