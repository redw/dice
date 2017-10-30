class BImage extends eui.Image {
    public constructor() {
        super();
        this.touchEnabled = true;
        this.touchScaleEffect = true;
    }

    public setPos(x:number, y:number) {
        this.x = x;
        this.y = y;
    }

    public set touchScaleEffect(enabled:boolean) {
        if (enabled) {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        } else {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        }
    }

    protected onTouchBegin():void {
        let view = this;
        var lastX:number = view.x;
        var lastY:number = view.y;
        var lastScaleX:number = view.scaleX;
        var lastScaleY:number = view.scaleY;
        let scale = 0.9;
        let tween = egret.Tween.get(view);
        let obj1 = {scaleX: lastScaleX * scale, scaleY: lastScaleY * scale, x: lastX + view.width * (1 - scale) / 2, y: lastY + view.height * (1 - scale) / 2};
        let obj2 = {scaleX: lastScaleX, scaleY: lastScaleY, x: lastX, y: lastY};
        tween.to(obj1, 100, egret.Ease.sineIn).to(obj2, 100, egret.Ease.sineOut);
    }

    public release() {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        egret.Tween.removeTweens(this);
        DisplayUtil.removeFromParent(this);
        this.setPos(0, 0);
    }
}

