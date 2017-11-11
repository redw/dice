class WoodEffect extends eui.Component {
    _ids:number[];
    _bars:eui.Image[];
    _intervalHeight:number;
    _effecting = false;

    effectGroup:eui.Group;
    _effect:dragonBones.Armature;
    _effectDisplay:egret.DisplayObject;

    _cb:Function;
    _cbComplete:Function;
    _cbThis:any;
    _showSeal;

    public constructor() {
        super();
        this._ids = [1, 2, 3, 4, 5, 1, 2, 1, 2, 1, 2];
        this._bars = [];
        this._intervalHeight = 120;
        this._effecting = !1;
        this.touchChildren = false;
        this.touchEnabled = false;
        this.skinName = "WoodEffectSkin";
    }

    public childrenCreated() {
        for (var e = this._ids.length, i = 0, n = 0; e > n; n++) {
            var s = new eui.Image;
            s.source = "wood" + this._ids[n] + "_png";
            s.width = 669;
            this._bars.push(s);
            n % 2 == 0 ? s.x = -s.width : s.x = STAGE.stageWidth;
            s.y = i;
            i += this._intervalHeight;
            this.addChildAt(s, 0);
        }

        this.switchEffect(true);
    }

    private switchEffect(showSeal, cb?:any, cbComplete?:any, cbThis?:any) {
        if (!this._effecting) {
            this._effecting = !0;
            this._showSeal = showSeal;
            this._cb = cb;
            this._cbComplete = cbComplete;
            this._cbThis = cbThis;
            for (var s = this._bars.length, r = 0; s > r; r++)
                this.effectBar(this._bars[r], r == s - 1);
        }
    }

    private effectBar(t, end:boolean) {
        egret.Tween.removeTweens(t);
        var i = (STAGE.stageWidth - t.width) / 2;
        egret.Tween.get(t).to({
            x: i
        }, 500, egret.Ease.quartIn).wait(500).call(function() {
            if (end) {
                if (this._cb) {
                    this._cb.call(this._cbThis);
                }
                this._showSeal ? this.showEffect() : this.open();
            }
        }, this)
    }

    private showEffect() {
        var t = this;
        BoneUtil.createArmatureSync("chaping_2", (armature:dragonBones.Armature) => {
            t._effect = armature;
            t._effect.addEventListener(dragonBones.MovieEvent.COMPLETE, t.onComplete, t);
            t._effect.animation.gotoAndPlayByFrame("zhang_appear", 1, 1);
            t._effectDisplay = t._effect.display;
            t._effectDisplay.scaleX = t._effectDisplay.scaleY = .75;
            t.effectGroup.addChild(t._effectDisplay);
        },null);
    }

    private onComplete(t) {
        this._effect.removeEventListener(dragonBones.MovieEvent.COMPLETE, this.onComplete, this);
        this.open();
    }

    private  open() {
        console.log("open");
        for (var t = this._bars.length, e = 0; t > e; e++)
            this.openBar(this._bars[e], e % 2 == 0 ? -this._bars[e].width : STAGE.stageWidth, e == t - 1)
    }

    private openBar(t, e, i) {
        var n = this;
        egret.Tween.get(t).to({
            x: e
        }, 500, egret.Ease.quartOut).call(function() {
            i && (DisplayUtil.removeFromParent(n._effectDisplay),
            null != n._cbComplete && n._cbComplete.call(n._cbThis),
                n._effecting = !1)
        }, this)
    }
}