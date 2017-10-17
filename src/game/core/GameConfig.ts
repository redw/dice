/**
 * 游戏配置文件
 */
class GameConfig {
    static ErrorData:any;
    static BaseData:any;
    static BuildData:any;
    static RewardData:any;
    static TaskData:any;
    static LevelData:any;

    /**
     * 给配置文件赋值
     * @param data  包含种组配置的大的对象
     */
    static setData(data:any) {
        GameConfig.ErrorData = data["error"];
        GameConfig.BaseData = data["basedata"];
        GameConfig.BuildData = data["building"];
        GameConfig.RewardData = data["reward"];
        GameConfig.TaskData = data["task"];
        GameConfig.LevelData = data["level"];
    }
}