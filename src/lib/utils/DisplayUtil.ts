/**
 * 显示对象工具
 * @author j
 *
 */
module DisplayUtil {
    export function createMask(alpha?:number):eui.Image {
        if (alpha == null) {
            alpha = 0.6;
        }

        var model:eui.Image = new eui.Image();
        model.source = "guide_gray_png";
        model.x = 0;
        model.y = 0;
        model.alpha = alpha;
        model.width = __STAGE.getStageWidth();
        model.height = __STAGE.getStageHeight();
        model.touchEnabled = true;
        return model;

        /* var sprite:egret.Sprite = new egret.Sprite();
         sprite.graphics.beginFill(0, alpha);
         sprite.graphics.drawRect(0, 0, Global.getStageWidth(), Global.getStageHeight());
         sprite.graphics.endFill();
         sprite.touchEnabled  = true;
         sprite.touchChildren = false;
         return sprite;*/
    }

    export function removeFromParent(displayObject:egret.DisplayObject):void {
        if (displayObject && displayObject.parent) {
            displayObject.parent.removeChild(displayObject);
        }
    }

    export function removeAllChildren(displayObjectContainer:egret.DisplayObjectContainer):void {
        displayObjectContainer.removeChildren();
    }

    export function getChildByName(parent:egret.DisplayObjectContainer, name:string):egret.DisplayObject {
        if (parent) {
            return parent.getChildByName(name);
        } else {
            return null;
        }
    }

    export function removeChildByName(parent:egret.DisplayObjectContainer, name:string) {
        if (parent && name) {
            let child = parent.getChildByName(name);
            if (child) {
                parent.removeChild(child);
            }
        }
    }

    export function depthSortChildren(container:egret.DisplayObjectContainer):void {
        var len:number = container.numChildren;
        var arr:any[] = [];
        for (var i:number = 0; i < len; i++) {
            arr.push(container.getChildAt(i));
        }
        arr.sort(function (child_1:egret.DisplayObject, child_2:egret.DisplayObject):number {
            if (child_1.y != child_2.y) {
                return child_1.y - child_2.y;
            }
            return child_1.x - child_2.x
        });

        for (i = 0; i < len; i++) {
            var child:any = arr[i];
            if (container.getChildAt(i) == child) {
                continue;
            }
            container.setChildIndex(child, i);
        }
    }

    export function getObjectCenterPosition(obj: egret.DisplayObject){
        var x = obj.x + obj.width * 0.5;
        var y = obj.y + obj.height * 0.5;
        return [x,y];
    }

    // export function createTxt(style:Object) {
    //     let defaultStyle = {
    //         size : 14,
    //         textColor: 0xffffff,
    //         bold: false,
    //         stroke : 0,
    //         strokeColor : 0,
    //         x : 0,
    //         y : 0,
    //         fontFamily : "微软雅黑",
    //         text : ""
    //     };
    //     Util.mixin(style, defaultStyle);
    //     let txt = new eui.Label();
    //     txt.textColor = defaultStyle.textColor;
    //     txt.size = defaultStyle.size;
    //     txt.bold = defaultStyle.bold;
    //     txt.fontFamily = defaultStyle.fontFamily;
    //     txt.stroke = defaultStyle.stroke;
    //     txt.strokeColor = defaultStyle.strokeColor;
    //     txt.x = defaultStyle.x;
    //     txt.y = defaultStyle.y;
    //     txt.text = defaultStyle.text;
    //     return txt;
    // }
}