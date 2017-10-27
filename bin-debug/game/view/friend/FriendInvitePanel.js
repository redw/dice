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
var FriendInvitePanel = (function (_super) {
    __extends(FriendInvitePanel, _super);
    function FriendInvitePanel() {
        return _super.call(this) || this;
    }
    FriendInvitePanel.prototype.onSecondTick = function () {
        // var leftTime:number = 5400 - (UserProxy.inst.server_time - UserProxy.inst.shareObj["lastShareTime"]);
        // if(leftTime <= 0){
        //     this.lblShowClear.text = "距离下次分享奖励：00:00:00";
        // }else{
        //     var desc = "距离下次分享奖励：";
        //     var hour = Math.floor(leftTime / 3600);
        //     var minute = Math.floor(leftTime % 3600 / 60);
        //     var second = leftTime % 3600 % 60;
        //     desc += (hour < 10 ? ("0" + hour): hour) + ":";
        //     desc += (minute < 10? ("0" + minute): minute) + ":";
        //     desc += second < 10? ("0" + second): second;
        //     this.lblShowClear.text = desc;
        // }
    };
    return FriendInvitePanel;
}(BasePanel));
__reflect(FriendInvitePanel.prototype, "FriendInvitePanel");
