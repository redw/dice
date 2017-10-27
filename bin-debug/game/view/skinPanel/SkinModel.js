var SkinModel;
(function (SkinModel) {
    function getDataProvider(type) {
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
        var newObj = {};
        Util.mixin(dataObj, newObj);
        for (var key in newObj) {
            newObj[key].id = +key;
        }
        return Util.objToArr(newObj);
    }
    SkinModel.getDataProvider = getDataProvider;
    function getSkinConfigObj(obj, type) {
        var id = obj.id;
        var infoObj = null;
        type = Math.max(0, type);
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
})(SkinModel || (SkinModel = {}));
//# sourceMappingURL=SkinModel.js.map