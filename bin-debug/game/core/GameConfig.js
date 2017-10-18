var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏配置文件
 */
var GameConfig = (function () {
    function GameConfig() {
    }
    /**
     * 给配置文件赋值
     * @param data  包含种组配置的大的对象
     */
    GameConfig.setData = function (data) {
        GameConfig.ErrorData = data["error"];
        GameConfig.BaseData = data["basedata"];
        GameConfig.BuildData = data["building"];
        GameConfig.RewardData = data["reward"];
        GameConfig.TaskData = data["task"];
        GameConfig.LevelData = data["level"];
    };
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
