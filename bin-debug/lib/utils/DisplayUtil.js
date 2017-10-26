/**
 * 显示对象工具
 * @author j
 *
 */
var DisplayUtil;
(function (DisplayUtil) {
    function createMask(alpha) {
        if (alpha == null) {
            alpha = 0.6;
        }
        var model = new eui.Image();
        model.source = "guide_gray_png";
        model.x = 0;
        model.y = 0;
        model.alpha = alpha;
        model.width = STAGE.stageWidth;
        model.height = STAGE.stageHeight;
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
    DisplayUtil.createMask = createMask;
    function removeFromParent(displayObject) {
        if (displayObject && displayObject.parent) {
            displayObject.parent.removeChild(displayObject);
        }
    }
    DisplayUtil.removeFromParent = removeFromParent;
    function removeAllChildren(displayObjectContainer) {
        displayObjectContainer.removeChildren();
    }
    DisplayUtil.removeAllChildren = removeAllChildren;
    function getChildByName(parent, name) {
        if (parent) {
            return parent.getChildByName(name);
        }
        else {
            return null;
        }
    }
    DisplayUtil.getChildByName = getChildByName;
    /**
     * 设置子对象的属性
     * @param parent
     * @param name
     * @param prop
     */
    function setChildProp(parent, name, value, prop) {
        if (parent && name) {
            var dis = parent.getChildByName(name);
            if (dis) {
                if (!prop) {
                    if (dis instanceof eui.Label) {
                        prop = "text";
                    }
                    if (dis instanceof eui.Image) {
                        prop = "source";
                    }
                }
                if (prop) {
                    dis[prop] = value;
                }
            }
        }
    }
    DisplayUtil.setChildProp = setChildProp;
    function removeChildByName(parent, name) {
        if (parent && name) {
            var child = parent.getChildByName(name);
            if (child) {
                parent.removeChild(child);
            }
        }
    }
    DisplayUtil.removeChildByName = removeChildByName;
    function depthSortChildren(container) {
        var len = container.numChildren;
        var arr = [];
        for (var i = 0; i < len; i++) {
            arr.push(container.getChildAt(i));
        }
        arr.sort(function (child_1, child_2) {
            if (child_1.y != child_2.y) {
                return child_1.y - child_2.y;
            }
            return child_1.x - child_2.x;
        });
        for (i = 0; i < len; i++) {
            var child = arr[i];
            if (container.getChildAt(i) == child) {
                continue;
            }
            container.setChildIndex(child, i);
        }
    }
    DisplayUtil.depthSortChildren = depthSortChildren;
    function getObjectCenterPosition(obj) {
        var x = obj.x + obj.width * 0.5;
        var y = obj.y + obj.height * 0.5;
        return [x, y];
    }
    DisplayUtil.getObjectCenterPosition = getObjectCenterPosition;
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
})(DisplayUtil || (DisplayUtil = {}));
//# sourceMappingURL=DisplayUtil.js.map