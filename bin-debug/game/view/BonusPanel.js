var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 奖励
 * @author j
 * 2016/1/22
 */
var BonusPanel = (function (_super) {
    __extends(BonusPanel, _super);
    function BonusPanel() {
        var _this = _super.call(this) || this;
        _this.time = 3;
        _this.isClose = false;
        // this._modal = true;
        // this._layer = PanelManager.TOP_LAYER;
        // this.skinName = BounsPanelSkin;
        _this.horizontalCenter = 0;
        _this.verticalCenter = 0;
        return _this;
    }
    BonusPanel.prototype.initData = function () {
        this.awardId = this.data["awardId"];
        this.cnt = this.data["cnt"];
        this.heroId = this.data["hero"];
        this.callback = this.data["callback"];
        this.thisObject = this.data["thisObject"];
        // var heroData:HeroVO;
        // if(this.heroId)
        // {
        //     heroData = UserProxy.inst.heroData.getHeroData(this.heroId);
        // }
        // var rewardData:RewardData = UserMethod.inst.rewardJs[this.awardId];
        //
        // if(this.awardId == BonusType.COIN_TIME)
        // {
        //     this.imgIcon.source = rewardData.icon;
        //     this.awardName.text = rewardData.name + "x" +  MathUtil.easyNumber(this.cnt) + "小时";
        // }
        // else if(this.awardId == BonusType.HERO)
        // {
        //     this.imgIcon.source = Global.getChaIcon(this.heroId);
        //     this.awardName.text = heroData.config.name;
        // }
        // else if(this.awardId == BonusType.HERO_CHIP)
        // {
        //     this.imgIcon.source = Global.getChaChipIcon(this.heroId);
        //
        //     this.awardName.text = heroData.config.name + "碎片x" +  MathUtil.easyNumber(this.cnt);
        // }
        // else if(this.awardId == BonusType.WORD )
        // {
        //     this.awardName.visible = false;
        //     this.imgIcon.source = "piece_" + this.cnt + "_png";
        // }
        // else if(this.awardId == BonusType.BOX)
        // {
        //     var boxData:any = Config.WarBoxData[this.cnt];
        //     this.imgIcon.source = "reward_box_"+ this.cnt +"_png";
        //     this.awardName.text =  boxData["name"] + "x1";
        // }
        // else if (this.awardId == BonusType.GAS) {
        //     this.imgIcon.source = "sky_energy_bar_png";
        //     this.awardName.text =  "能量" + "x" + this.cnt;
        // }
        // else if (this.awardId == BonusType.SKIN) {
        //     this.imgIcon.source = URLConfig.getHeroSkinChipIcon(this.heroId, true);
        //     this.awardName.text =  "皮肤" + "x" + this.cnt;
        // }
        // else if(this.awardId == BonusType.ARTIFACT)
        // {
        //     let config:ArtifactConfigItem = Config.ArtifactData[this.heroId];
        //     this.imgIcon.source = URLConfig.getArtifactIconUrl(this.heroId, true);
        //     this.awardName.text =  config.name + "x" + this.cnt;
        // }
        // else
        // {
        //     this.imgIcon.source = rewardData.icon;
        //     this.awardName.text = rewardData.name + "x" + MathUtil.easyNumber(this.cnt);
        // }
        this.tweenLight(360);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        TickerUtil.register(this.onTouch, this, 700);
    };
    BonusPanel.prototype.destory = function () {
        egret.Tween.removeTweens(this.imgLight);
        egret.Tween.removeTweens(this.groupIcon);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        TickerUtil.unregister(this.onInterval, this);
    };
    BonusPanel.prototype.onTouch = function (e) {
        if (this.isClose) {
            return;
        }
        this.isClose = true;
        this.awardName.visible = false;
        egret.Tween.get(this.groupIcon).to({ scaleX: 1.5, scaleY: 1.5 }, 350, egret.Ease.elasticOut).call(function () {
            this.imgLight.visible = false;
            egret.Tween.removeTweens(this.imgLight);
            switch (this.awardId) {
            }
        }, this);
    };
    BonusPanel.prototype.onInterval = function (e) {
        this.time = this.time - 1;
        if (this.time <= 0) {
            this.onTouch(null);
        }
    };
    BonusPanel.prototype.tweenLight = function (value) {
        egret.Tween.get(this.imgLight).to({ rotation: value }, 10000).call(function () {
            this.tweenLight(value);
        }, this);
    };
    BonusPanel.prototype.hidePanel = function () {
        // PanelManager.inst.hidePanel("BonusPanel");
        if (this.callback != null) {
            this.callback.call(this.thisObject);
        }
    };
    return BonusPanel;
}(BasePanel));
__reflect(BonusPanel.prototype, "BonusPanel");
//# sourceMappingURL=BonusPanel.js.map