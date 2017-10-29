class SkinPart0 extends ExComponent {
    private contentGroup:eui.Group;
    private upgradeBtn:eui.Group;
    private owner:SkinShowComp;

    public constructor(owner:SkinShowComp) {
        super();
        this.skinName = SkinPart0Skin;
        this.owner = owner;
    }

    public init() {
        this.upgradeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSkinUP, this);
    }

    private onSkinUP() {
        Net.sendMessage(CmdConst.SKIN_UP, {sid:this.data.id});
    }

    public onClick(name:string) {
        if (name == "upgradeBtn") {
            this.onSkinUP();
        }
    }

    public active() {
        let obj = this.data;
        let cData = SkinModel.getSkinConfigObj(obj);
        let lv = obj.lv;
        let maxLv = cData.cost.length;
        let levelTxt = <eui.Label>DisplayUtil.getChildByName(this.contentGroup, "levelTxt");
        levelTxt.text = lv || "未解锁";

        let extraTxt = <eui.Label>DisplayUtil.getChildByName(this.contentGroup, "extraTxt");
        extraTxt.text = cData.reward_1;

        let diamondTxt = <eui.Label>DisplayUtil.getChildByName(this.contentGroup, "diamondTxt");
        diamondTxt.text = cData.cost[Math.min(lv, maxLv - 1)];
    }
}