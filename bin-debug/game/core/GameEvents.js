var GameEvents;
(function (GameEvents) {
    //角色每走一步的事件
    GameEvents.RUN_STEP = "run_step";
    //角色走完一段路的事件
    GameEvents.RUN_COMPLETE = "run_complete";
    // 加载游戏配置表文件完成
    GameEvents.LOAD_CONFIG_COMPLETE = "load_config_complete";
    // 开始执色子
    GameEvents.DICE_START = "dice_start";
    // 色子执完
    GameEvents.DICE_COMPLETE = "dice_complete";
    // 加载ske文件完成
    GameEvents.LOAD_SKE_COMPLETE = "load_ske_complete";
})(GameEvents || (GameEvents = {}));
//# sourceMappingURL=GameEvents.js.map