var URLConfig;
(function (URLConfig) {
    function getCitySkinIcon(id) {
        var result = "skin_city_" + id + "_png";
        if (!RES.hasRes(result)) {
            result = "skin_city_1_png";
        }
        return result;
    }
    URLConfig.getCitySkinIcon = getCitySkinIcon;
    function getDiceSkinIcon(id) {
        var result = "skin_dice_" + id + "_png";
        if (!RES.hasRes(result)) {
            result = "skin_dice_1_png";
        }
        return result;
    }
    URLConfig.getDiceSkinIcon = getDiceSkinIcon;
    function getChessObjSkinIcon(id) {
        var result = "skin_player_" + id + "_png";
        if (!RES.hasRes(result)) {
            result = "skin_player_1_png";
        }
        return result;
    }
    URLConfig.getChessObjSkinIcon = getChessObjSkinIcon;
    function getVehicleSkinIcon(id) {
        var result = "skin_vehicle_" + id + "_png";
        if (!RES.hasRes(result)) {
            result = "skin_vehicle_1_png";
        }
        return result;
    }
    URLConfig.getVehicleSkinIcon = getVehicleSkinIcon;
    function getRewardIcon(reward) {
        if (typeof reward == "number" || typeof reward == "string") {
            reward = [reward, 0, 0];
        }
        var type = reward[0];
        var id = reward[1];
        var result = "";
        switch (type) {
            // 金币
            case 1:
                break;
            // 工资金币
            case 2:
                break;
            // 钻石
            case 3:
                break;
            // 科技钻石
            case 4:
                break;
            // 骰子
            case 5:
                break;
            // 骰子上限
            case 6:
                break;
            // 角色皮肤
            case 7:
                result = getChessObjSkinIcon(id);
                break;
            // 城市皮肤
            case 8:
                result = getCitySkinIcon(id);
                break;
            // 骰子皮肤
            case 9:
                result = getDiceSkinIcon(id);
                break;
            // 汽车皮肤
            case 10:
                result = getVehicleSkinIcon(id);
                break;
            // 警车
            case 11:
                break;
            // 绿帽
            case 12:
                break;
            // 卷轴
            case 13:
                break;
        }
        return result;
    }
    URLConfig.getRewardIcon = getRewardIcon;
})(URLConfig || (URLConfig = {}));
//# sourceMappingURL=URLConfig.js.map