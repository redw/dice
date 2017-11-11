var SkinModel;
(function (SkinModel) {
    var skins = [];
    function getDataProvider(type, group) {
        if (group === void 0) { group = 0; }
        type = Math.max(0, type);
        var arr = skins[type];
        if (!arr) {
            var configObj = getSkinConfig(type);
            var configArr = Util.objToArr(configObj);
            arr = [];
            Util.mixin(configArr, arr);
            skins[type] = arr;
        }
        var dataObj = getSkinData(type);
        for (var i = 0, len = arr.length; i < len; i++) {
            var id = arr[i].id;
            arr[i].type = type;
            Util.mixin(dataObj[id], arr[i]);
        }
        var result = arr;
        if (group) {
            result = result.filter(function (value) {
                return value.group == group;
            });
        }
        return result;
    }
    SkinModel.getDataProvider = getDataProvider;
    function getCurProp(type) {
        var result;
        type = Math.max(0, type);
        if (type == 0) {
            result = GameData.skin;
        }
        else if (type == 1) {
            result = GameData.chess;
        }
        else if (type == 2) {
            result = GameData.dice;
        }
        else {
            result = GameData.vehicle;
        }
        return result;
    }
    SkinModel.getCurProp = getCurProp;
    function getTotalProp(type) {
        type = Math.max(0, type);
        var dataObj = getSkinData(type);
        var result = 0;
        for (var key in dataObj) {
            result += dataObj[key].lv;
        }
        return result;
    }
    SkinModel.getTotalProp = getTotalProp;
    function getExtraAdd(type) {
        var arr = isNaN(type) ? [0, 1, 2, 3] : [type];
        for (var i = 0, len = arr.length; i < len; i++) {
        }
    }
    SkinModel.getExtraAdd = getExtraAdd;
    function getSkinConfigObj(obj) {
        var id = obj.id;
        var type = obj.type;
        var infoObj = null;
        if (type == 0) {
            infoObj = GameConfig.city;
        }
        else if (type == 1) {
            infoObj = GameConfig.chess;
        }
        else if (type == 2) {
            infoObj = GameConfig.roll;
        }
        else {
            infoObj = GameConfig.bus;
        }
        return infoObj[id];
    }
    SkinModel.getSkinConfigObj = getSkinConfigObj;
    function getSkinConfig(type) {
        var infoObj = null;
        if (type == 0) {
            infoObj = GameConfig.city;
        }
        else if (type == 1) {
            infoObj = GameConfig.chess;
        }
        else if (type == 2) {
            infoObj = GameConfig.roll;
        }
        else {
            infoObj = GameConfig.bus;
        }
        return infoObj;
    }
    SkinModel.getSkinConfig = getSkinConfig;
    function getSkinData(type) {
        var dataObj = null;
        type = Math.max(0, type);
        if (type == 0) {
            dataObj = GameData.skinObj;
        }
        else if (type == 1) {
            dataObj = GameData.chessObj;
        }
        else if (type == 2) {
            dataObj = GameData.diceObj;
        }
        else {
            dataObj = GameData.vehicleObj;
        }
        return dataObj;
    }
    SkinModel.getSkinData = getSkinData;
})(SkinModel || (SkinModel = {}));
