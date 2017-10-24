class FriendInvitePanel extends BasePanel {
    public constructor() {
        super();
    }

    public onSecondTick() {
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
    }
}