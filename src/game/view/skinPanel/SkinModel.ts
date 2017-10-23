module SkinModel {
    export function getDataProvider(type:number) {
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
        let infoArr = Util.objToArr(infoObj);
        infoArr.sort(Util.sortByOrder);
        return infoArr;
    }
}