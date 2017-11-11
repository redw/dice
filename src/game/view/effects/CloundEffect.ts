class CloundEffect extends eui.Component {
    _positions:number[][];
    icloud0:eui.Image;
    icloud1:eui.Image;
    icloud2:eui.Image;
    icloud3:eui.Image;
    icloud4:eui.Image;
    icloud5:eui.Image;

    public constructor() {
        super();
        this.touchEnabled = false;
        this.touchChildren = false;
        this._positions = [[-230, 645], [-250, -710], [100, 645], [-390, -1060], [-148, 645], [-200, -850]];
        this.skinName = "CloudEffectSkin";
    }

    /**
     * 开始去效果
     * @param closeBack     闭合回调
     * @param completeBack  效果完成后的回调
     * @param context       回调上下文
     */
    public start(closeBack?:Function, completeBack?:Function, context?:any) {
        this.switchEffect(closeBack, completeBack, context);
    }

    private switchEffect(t, e, i) {
        this.effectCloud(this.icloud0, this._positions[0]);
        this.effectCloud(this.icloud1, this._positions[1]);
        this.effectCloud(this.icloud2, this._positions[2]);
        this.effectCloud(this.icloud3, this._positions[3]);
        this.effectCloud(this.icloud4, this._positions[4]);
        this.icloud5.x = this._positions[4][1];
        egret.Tween.get(this.icloud5).to({
            x: this._positions[4][0]
        }, 500, egret.Ease.quartIn).call(function() {
            null != t && t.call(i);
            egret.Tween.get(this.icloud5).wait(500).call(function() {
                egret.Tween.get(this.icloud5).to({
                    x: this._positions[4][1]
                }, 500, egret.Ease.quartOut).call(function() {
                    null != e && e.call(i)
                }, this)
            }, this)
        }, this)
    }

    private effectCloud(t, e) {
        t.x = e[1];
        egret.Tween.get(t).to({
            x: e[0]
        }, 500, egret.Ease.quartIn).wait(500).call(function() {
            egret.Tween.get(t).to({
                x: e[1]
            }, 500, egret.Ease.quartOut)
        }, this);
    }
}

