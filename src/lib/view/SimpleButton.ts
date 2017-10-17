/**
 * 简单按钮
 */
class SimpleButton extends eui.Image {
    public static pool = new ObjPool(SimpleButton);

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
        EffectUtil.playScaleEffect(this, 0.9);
    }

    public release() {
        DisplayUtil.removeFromParent(this);
        this.setPos(0, 0);
    }
}