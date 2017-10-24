class FriendInviteRenderer extends eui.ItemRenderer {

    private btnGet:eui.Group;
    // 描述
    private lblInvite: eui.Label;
    // 进度
    private lblInvite1: eui.Label;
    // 奖励
    private lblReward: eui.Label;
    private bgImg: eui.Image;
    private txtImg: eui.Image;
    private contentGroup:eui.Group;

    public constructor() {
        super();
        // this.skinName = FriendInviteRendererSkin;
    }

    $onAddToStage(stage: egret.Stage, nestLevel: number) {
        super.$onAddToStage(stage, nestLevel);

    }

    $onRemoveFromStage() {
        super.$onRemoveFromStage();
    }

    public dataChanged(): void {
        super.dataChanged();

        // var inviteObj = UserProxy.inst.inviteObj;
        // var invitedCount = inviteObj["inviteCount"];
        // var inviteData:any = Config.InviteData[this.data];
        // var invite_num = inviteData["invite_num"];
        // this.lblInvite.text = inviteData["disc"];
        // this.lblReward.text = inviteData["reward_1"][2];
        // this.btnGet["id"] = this.data;
        //
        // if (UserMethod.inst.isBitGet(this.data, inviteObj["inviteBit"])) {
        //     this.btnGet.touchEnabled = false;
        //     this.bgImg.source = "friend_json.active_sign_had_got_png";
        //     this.bgImg.y = -6;
        //     this.txtImg.visible = false;
        //     this.lblInvite1.text = "已完成"
        //     this.lblInvite1.textColor = 0x43ad87;
        // } else {
        //     this.lblInvite1.textColor = 0xff0000;
        //     this.txtImg.visible = true;
        //     this.lblInvite1.text = `( ${invitedCount} / ${invite_num})`;
        //     this.bgImg.y = 0;
        //     if (invitedCount >= invite_num) {
        //         this.btnGet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetInvite, this);
        //         this.btnGet.touchEnabled = true;
        //         this.bgImg.source = "friend_json.btn_common_png";
        //     } else {
        //         this.btnGet.touchEnabled = false;
        //         this.bgImg.source = "friend_json.btn_common_disable_png";
        //     }
        // }
    }

    private getInviteBack(e:egret.Event):void {
        this.dataChanged();
    }

    private onGetInvite(e:egret.TouchEvent):void {
        // var id:number = e.currentTarget["id"];
        // if (UserMethod.inst.isBitGet(id,UserProxy.inst.inviteObj["inviteBit"]))
        // {
        //     Notice.show("重复领取！");
        //     return;
        // }
        // Http.inst.send(CmdID.INVITE_PRICE,{id:id});
    }
}