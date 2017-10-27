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
        GameConfig.basedata = data["basedata"];
        GameConfig.building = data["building"];
        GameConfig.buildingdata = data["buildingdata"];
        GameConfig.bus = data["bus"];
        GameConfig.card = data["card"];
        GameConfig.chess = data["chess"];
        GameConfig.chessgroup = data["chessgroup"];
        GameConfig.city = data["city"];
        GameConfig.citydata = data["citydata"];
        GameConfig.drawcost = data["drawcost"];
        GameConfig.drawfree = data["drawfree"];
        GameConfig.language = data["language"];
        GameConfig.level = data["level"];
        GameConfig.local = data["local"];
        GameConfig.reward = data["reward"];
        GameConfig.roll = data["roll"];
        GameConfig.shop = data["shop"];
        GameConfig.starsit = data["starsit"];
        GameConfig.task = data["task"];
    };
    return GameConfig;
}());
__reflect(GameConfig.prototype, "GameConfig");
//# sourceMappingURL=GameConfig.js.map