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
var FriendInviteRenderer = (function (_super) {
    __extends(FriendInviteRenderer, _super);
    function FriendInviteRenderer() {
        return _super.call(this) || this;
        // this.skinName = FriendInviteRendererSkin;
    }
    FriendInviteRenderer.prototype.$onAddToStage = function (stage, nestLevel) {
        _super.prototype.$onAddToStage.call(this, stage, nestLevel);
    };
    FriendInviteRenderer.prototype.$onRemoveFromStage = function () {
        _super.prototype.$onRemoveFromStage.call(this);
    };
    FriendInviteRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
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
    };
    FriendInviteRenderer.prototype.getInviteBack = function (e) {
        this.dataChanged();
    };
    FriendInviteRenderer.prototype.onGetInvite = function (e) {
        // var id:number = e.currentTarget["id"];
        // if (UserMethod.inst.isBitGet(id,UserProxy.inst.inviteObj["inviteBit"]))
        // {
        //     Notice.show("重复领取！");
        //     return;
        // }
        // Http.inst.send(CmdID.INVITE_PRICE,{id:id});
    };
    return FriendInviteRenderer;
}(eui.ItemRenderer));
__reflect(FriendInviteRenderer.prototype, "FriendInviteRenderer");
