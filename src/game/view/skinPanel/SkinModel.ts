module SkinModel {
    export function getDataProvider(type:number) {
        let dataObj = null;
        type = Math.max(0, type);
        if (type == 0) {
            dataObj = GameData.skinObj;
        } else if (type == 1) {
            dataObj = GameData.chessObj;
        } else if (type == 2) {
            dataObj = GameData.diceObj;
        } else {
            dataObj = GameData.vehicleObj;
        }
        let newObj = {};
        Util.mixin(dataObj, newObj);
        for (let key in newObj) {
            newObj[key].id = +key;
        }
        return Util.objToArr(newObj);
    }

    export function getSkinConfigObj(obj:{id:number}, type:number) {
        let id = obj.id;
        let infoObj = null;
        type = Math.max(0, type);
        if (type == 0) {
            infoObj = GameConfig.city;
        } else if (type == 1) {
            infoObj = GameConfig.chess;
        } else if (type == 2) {
            infoObj = GameConfig.roll;
        } else {
            infoObj = GameConfig.bus;
        }
        return infoObj[id];
    }
}