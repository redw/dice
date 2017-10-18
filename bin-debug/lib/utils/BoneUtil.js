/**
 * 龙骨工具
 *
 * Created by hh on 2017/5/11.
 */
var BoneUtil;
(function (BoneUtil) {
    var pool = {};
    var bonesDataMap = {};
    var dragonFactory = new dragonBones.EgretFactory();
    function createArmature(name) {
        var resName = "" + name;
        if (pool[resName] && pool[resName].length > 0) {
            return pool[resName].pop();
        }
        else {
            if (!bonesDataMap[resName]) {
                bonesDataMap[resName] = [];
                var boneJson = RES.getRes(resName + "_ske_json");
                var texture = RES.getRes(resName + "_tex_png");
                var textureData = RES.getRes(resName + "_tex_json");
                var version = boneJson.version;
                var versions = dragonBones.DataParser["DATA_VERSIONS"];
                if (versions && versions.indexOf(version) < 0) {
                    egret.error("dragonbones verion error:" + version);
                    boneJson.version = versions[versions.length - 1];
                }
                var dragonBonesData = dragonFactory.getDragonBonesData(resName);
                if (!dragonBonesData) {
                    dragonFactory.parseDragonBonesData(boneJson);
                }
                dragonFactory.parseTextureAtlasData(textureData, texture, resName);
            }
            var armature = dragonFactory.buildArmature(resName);
            armature.cacheFrameRate = 30;
            dragonBones.WorldClock.clock.add(armature);
            bonesDataMap[resName].push(armature);
            return armature;
        }
    }
    BoneUtil.createArmature = createArmature;
    function release(armature, resName) {
        if (armature) {
            var name_1 = resName || armature.name;
            if (!pool[name_1]) {
                pool[name_1] = [];
            }
            armature.display.scaleX = 1;
            armature.display.x = 0;
            armature.display.y = 0;
            DisplayUtil.removeFromParent(armature.display);
            armature.animation.stop();
            dragonBones.WorldClock.clock.remove(armature);
            pool[name_1].push(armature);
        }
    }
    BoneUtil.release = release;
})(BoneUtil || (BoneUtil = {}));
