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
     * 猜土毫
     */
    CmdConst.STEAL = "steal";
    /**
     * 更换棋子
     */
    CmdConst.CHANGE_CHESS = "changeChess";
    /**
     * 皮肤升级
     */
    CmdConst.SKIN_UP = "skinUp";
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
    /**
     * 反馈，GM命令
     */
    CmdConst.ADVICE = "advice";
    /**
     * 选择bus目的地
     */
    CmdConst.BUS_CHOOSE = "busChoose";
    /**
     * 在别人家里被抓
     */
    CmdConst.CATCH = "catch";
    return CmdConst;
}());
__reflect(CmdConst.prototype, "CmdConst");
