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

        let model:eui.Image = new eui.Image();
        model.source = "guide_gray_png";
        model.x = 0;
        model.y = 0;
        model.alpha = alpha;
        model.width = __STAGE.stageWidth;
        model.height = __STAGE.stageHeight;
        model.touchEnabled = true;
        return model;
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
}