module GameEvents {
    //角色每走一步的事件
    export const RUN_STEP = "run_step";

    //角色走完一段路的事件
    export const RUN_COMPLETE = "run_complete";

    // 加载游戏配置表文件完成
    export const LOAD_CONFIG_COMPLETE = "load_config_complete";

    // 开始执色子
    export const DICE_START = "dice_start";

    // 色子执完
    export const DICE_COMPLETE = "dice_complete";

    // 加载ske文件完成
    export const LOAD_SKE_COMPLETE = "load_ske_complete";
}