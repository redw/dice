/**
 * 游戏配置文件
 */
class GameConfig {
    static basedata:any;
    static building:any;
    static buildingdata:any;
    static bus:any;
    static card:any;
    static chess:any;
    static chessgroup:any;
    static city:any;
    static citydata:any;
    static drawcost:any;
    static drawfree:any;
    static language:any;
    static level:any;
    static local:any;
    static reward:any;
    static roll:any;
    static shop:any;
    static starsit:any;
    static task:any;

    /**
     * 给配置文件赋值
     * @param data  包含种组配置的大的对象
     */
    static setData(data:any) {
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
    }
}