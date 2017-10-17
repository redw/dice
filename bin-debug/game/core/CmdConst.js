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
    return CmdConst;
}());
__reflect(CmdConst.prototype, "CmdConst");
//# sourceMappingURL=CmdConst.js.map