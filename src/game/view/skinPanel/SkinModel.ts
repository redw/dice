module SkinModel {
    let skins = [];
    export function getDataProvider(type:number, group = 0) {
        type = Math.max(0, type);
        let arr = skins[type];
        if (!arr) {
            let configObj = getSkinConfig(type);
            let configArr = Util.objToArr(configObj);
            arr = [];
            Util.mixin(configArr, arr);
            skins[type] = arr;
        }

        let dataObj = getSkinData(type);
        for (let i = 0, len = arr.length; i < len; i++) {
            let id = arr[i].id;
            arr[i].type = type;
            Util.mixin(dataObj[id], arr[i]);
        }

        let result = arr;
        if (group) {
            result = result.filter((value)=>{
                return value.group == group;
            });
        }
        return result;
    }

    export function getCurProp(type:number) {
        let result:number|string;
        type = Math.max(0, type);
        if (type == 0) {
            result = GameData.skin;
        } else if (type == 1) {
            result = GameData.chess;
        } else if (type == 2) {
            result = GameData.dice;
        } else {
            result = GameData.vehicle;
        }
        return result;
    }

    export function getTotalProp(type) {
        type = Math.max(0, type);
        let dataObj = getSkinData(type);
        let result = 0;
        for (let key in dataObj) {
            result += dataObj[key].lv;
        }
        return result;
    }

    export function getExtraAdd(type?:number) {
        let arr = isNaN(type) ? [0, 1, 2, 3] : [type];
        for (let i = 0, len = arr.length; i < len; i++) {

        }
    }

    export function getSkinConfigObj(obj:{id:number, type:number}) {
        let id = obj.id;
        let type = obj.type;
        let infoObj = null;
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

    export function getSkinConfig(type:number) {
        let infoObj = null;
        if (type == 0) {
            infoObj = GameConfig.city;
        } else if (type == 1) {
            infoObj = GameConfig.chess;
        } else if (type == 2) {
            infoObj = GameConfig.roll;
        } else {
            infoObj = GameConfig.bus;
        }
        return infoObj;
    }

    export function getSkinData(type:number) {
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
        return dataObj;
    }
}