class SkinItemRen extends eui.ItemRenderer {
    private nameTxt:eui.Label;
    private selectedImg:eui.Image;
    private useImg:SimpleButton;
    private seatImg:eui.Image;
    private lockImg:eui.Image;
    private iconImg:eui.Image;
    private seatGroup:eui.Group;

    private cData:any;

    public constructor() {
        super();
        this.skinName = SkinItemRenSkin;
    }

    $onAddToStage(stage: egret.Stage, nestLevel: number) {
        super.$onAddToStage(stage, nestLevel);
        this.useImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUseSkin, this);
    }

    $onRemoveFromStage() {
        super.$onRemoveFromStage();
        this.useImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onUseSkin, this);
    }

    private onUseSkin(e:egret.TouchEvent) {
        e.stopImmediatePropagation();
        let type = this.data.type;
        if (type == 0) {
            Net.sendMessage(CmdConst.CHANGE_SKIN, {sid:this.data.id});
        } else if (type == 1) {
            Net.sendMessage(CmdConst.CHANGE_CHESS, {cid:this.data.id});
        } else if (type == 2) {
            Net.sendMessage(CmdConst.CHANGE_DICE, {did:this.data.id});
        } else {
            Net.sendMessage(CmdConst.CHANGE_VEHICLE, {vid:this.data.id});
        }
    }

    public dataChanged() {
        let obj = this.data;
        let type = obj.type;
        this.cData = SkinModel.getSkinConfigObj(obj);
        let curProp = SkinModel.getCurProp(type);
        let name = this.cData.name;
        this.lockImg.visible = Boolean(!obj.lv);
        if (curProp == obj.lv) {
            this.useImg.visible = true;
        } else {
            this.useImg.visible = Boolean(obj.lv);
        }
        let count = 1;

        if (type == 0) {
            this.nameTxt.text = name;
        } else {
            name = name + "{0}";
            TextUtil.color(this.nameTxt, name, `     x${count}`, 0xb55826)
        }

        switch (type) {
            case 0:
                this.iconImg.source = URLConfig.getCitySkinIcon(obj.id);
                this.seatImg.visible = false;
                this.iconImg.scaleX = 1.5;
                this.iconImg.scaleY = 1.5;
                this.seatGroup.y = -30;
                break;

            case 1:
                this.iconImg.source = URLConfig.getChessObjSkinIcon(obj.id);
                this.seatImg.visible = true;
                this.iconImg.scaleX = 1;
                this.iconImg.scaleY = 1;
                this.seatGroup.y = 0;
                break;

            case 2:
                this.iconImg.source = URLConfig.getDiceSkinIcon(obj.id);
                this.seatImg.visible = true;
                this.iconImg.scaleX = 1;
                this.iconImg.scaleY = 1;
                this.seatGroup.y = 0;
                break;

            case 3:
                this.iconImg.source = URLConfig.getVehicleSkinIcon(obj.id);
                this.seatImg.visible = true;
                this.iconImg.scaleX = 1;
                this.iconImg.scaleY = 1;
                this.seatGroup.y = 0;
                break;
        }
    }
}