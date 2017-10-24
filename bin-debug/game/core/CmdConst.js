var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 通讯命令常量
 */
var CmdConst = (function () {
    function CmdConst() {
    }
    /**
     * 进入游戏
     */
    CmdConst.ENTER = "enter";
    /**
     * 摇骰子
     */
    CmdConst.ROLL = "roll";
    /**
     * 世界排行榜
     */
    CmdConst.WORLD_RANK = "rank";
    /**
     * 好友排行榜
     */
    CmdConst.FRIEND_RANK = "friendRank";
    /**
     * 设置个人信息
     */
    CmdConst.SET_INFO = "setInfo";
    /**
     * 更换棋子
     */
    CmdConst.CHANGE_CHESS = "changeChess";
    /**
     * 更换皮肤
     */
    CmdConst.CHANGE_SKIN = "changeSkin";
    /**
     * 更换骰子
     */
    CmdConst.CHANGE_DICE = "changeDice";
    /**
     * 更换棋子
     */
    CmdConst.CHANGE_VEHICLE = "changeVehicle";
    /**
     * 娃娃机
     */
    CmdConst.DRAW = "draw";
    return CmdConst;
}());
__reflect(CmdConst.prototype, "CmdConst");
//# sourceMappingURL=CmdConst.js.map