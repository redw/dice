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
        model.width = __STAGE.stageWidth;
        model.height = __STAGE.stageHeight;
        model.touchEnabled = true;
        return model;
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
})(DisplayUtil || (DisplayUtil = {}));
//# sourceMappingURL=DisplayUtil.js.map