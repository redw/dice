/**
 * 龙骨工具
 *
 * Created by hh on 2017/5/11.
 */
module BoneUtil {
    let pool:any = {};
    let bonesDataMap = {};
    let dragonFactory = new dragonBones.EgretFactory();

    export function createArmature(name:string) {
        let resName = `${name}`;
        if (pool[resName] && pool[resName].length > 0) {
            return pool[resName].pop();
        } else {
            if (!bonesDataMap[resName]) {
                bonesDataMap[resName] = [];
                let boneJson = RES.getRes(`${resName}_ske_json`);
                let texture = RES.getRes(`${resName}_tex_png`);
                let textureData = RES.getRes(`${resName}_tex_json`);
                let version = boneJson.version;
                let versions = dragonBones.DataParser["DATA_VERSIONS"];
                if (versions && versions.indexOf(version) < 0) {
                    egret.error(`dragonbones verion error:${version}`);
                    boneJson.version = versions[versions.length - 1];
                }
                let dragonBonesData = dragonFactory.getDragonBonesData(resName);
                if (!dragonBonesData) {
                    dragonFactory.parseDragonBonesData(boneJson);
                }
                dragonFactory.parseTextureAtlasData(textureData, texture, resName);
            }
            let armature = dragonFactory.buildArmature(resName);
            armature.cacheFrameRate = 30;
            dragonBones.WorldClock.clock.add(armature);
            bonesDataMap[resName].push(armature);
            return armature;
        }
    }

    export function release(armature:dragonBones.Armature, resName?:string) {
        if (armature) {
            let name = resName || armature.name;
            if (!pool[name]) {
                pool[name] = [];
            }
            armature.display.scaleX = 1;
            armature.display.x = 0;
            armature.display.y = 0;
            DisplayUtil.removeFromParent(armature.display);
            armature.animation.stop();
            dragonBones.WorldClock.clock.remove(armature);
            pool[name].push(armature);
        }
    }
}