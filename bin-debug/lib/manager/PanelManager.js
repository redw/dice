var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PanelLayer = (function () {
    function PanelLayer() {
    }
    PanelLayer.BOTTOM_LAYER = "bottom";
    PanelLayer.MIDDLE_LAYER = "middle";
    PanelLayer.TOP_LAYER = "top";
    PanelLayer.ALERT_LAYER = "alert";
    return PanelLayer;
}());
__reflect(PanelLayer.prototype, "PanelLayer");
var Pop;
(function (Pop) {
    var inst;
    function boot(root) {
        inst = new PanelManager();
        inst.init(root);
    }
    Pop.boot = boot;
    /**
     * 弹出面板
     * @param name      面板名|类|实例
     * @param data      面板的数据
     */
    function open(panel, data) {
        var name = getPanelName(panel);
        if (!name || !egret.getDefinitionByName(name)) {
            egret.warn("不存在面板" + panel);
        }
        else {
            inst.showPanel(name, data);
        }
    }
    Pop.open = open;
    /**
     * 关闭面板
     * @param panel     面板名|类|实例
     * @param option    关闭面板的参数
     */
    function close(panel) {
        var name = getPanelName(panel);
        if (!name || !egret.getDefinitionByName(name)) {
            egret.warn("不存在面板" + panel);
        }
        else {
            inst.hidePanel(name);
        }
    }
    Pop.close = close;
    /**
     * 切换开关面板
     * @param panel     面板名|类|实例
     * @param data
     */
    function toggle(panel, data) {
        var name = getPanelName(panel);
        if (!name || !egret.getDefinitionByName(name)) {
            egret.warn("不存在面板" + panel);
        }
        else {
            if (isShow(name)) {
                close(panel);
            }
            else {
                open(panel, data);
            }
        }
    }
    Pop.toggle = toggle;
    /**
     * 面板是否打开
     * @param panel
     * @returns {boolean}
     */
    function isShow(panel) {
        var name = getPanelName(panel);
        return inst.isShow(name);
    }
    Pop.isShow = isShow;
    function getPanel(panel) {
        var name = getPanelName(panel);
        return inst.getPanelByName(name);
    }
    Pop.getPanel = getPanel;
    /**
     * 得到面板的名字
     * @param panel
     * @returns {string}
     */
    function getPanelName(panel) {
        var name = "";
        if (typeof panel == "string") {
            name = panel;
        }
        else {
            if (panel.hasOwnProperty("name")) {
                name = panel.name;
            }
            else {
                name = egret.getQualifiedClassName(panel);
            }
        }
        return name;
    }
    var PanelManager = (function (_super) {
        __extends(PanelManager, _super);
        function PanelManager() {
            var _this = _super.call(this) || this;
            _this._layerMap = null;
            _this._panelMap = null;
            _this.closePanelMap = null;
            _this.foreverMap = null;
            _this._layerMap = {};
            _this._panelMap = {};
            _this.closePanelMap = {};
            _this.foreverMap = {};
            return _this;
        }
        PanelManager.prototype.init = function (root) {
            var list = [PanelLayer.BOTTOM_LAYER, PanelLayer.MIDDLE_LAYER, PanelLayer.TOP_LAYER, PanelLayer.ALERT_LAYER];
            for (var i = 0; i < list.length; i++) {
                var name_1 = list[i];
                var layer = new eui.Group();
                layer.name = name_1;
                layer.width = STAGE.stageWidth;
                layer.height = STAGE.stageHeight;
                layer.touchEnabled = false;
                layer.touchChildren = true;
                root.addChild(layer);
                this._layerMap[layer.name] = layer;
            }
        };
        PanelManager.prototype.getLayer = function (name) {
            return this._layerMap[name];
        };
        PanelManager.prototype.getPanelByName = function (name) {
            return this._panelMap[name];
        };
        PanelManager.prototype.isShow = function (name) {
            var panel = this._panelMap[name];
            return panel && panel.visible && panel.stage;
        };
        PanelManager.prototype.getPanelList = function (layer) {
            var list = [];
            for (var key in this._panelMap) {
                var panel = this._panelMap[key];
                if (panel && panel.layer == layer || !layer) {
                    list.push(panel);
                }
            }
            return list;
        };
        /**
         * 打开全屏面板
         * @param name
         * @param data
         * @returns {undefined|BasePanel}
         */
        PanelManager.prototype.showSinglePanel = function (name, data) {
            this.addClosePanelNames(name);
            return this.showPanel(name, data, true);
        };
        /**
         * 显示永远存在的面板
         * @param name              面板名
         * @param showScreenBg      是否全屏显示
         * @param data              面板数据
         */
        PanelManager.prototype.showPanelAlwaysExist = function (name, showScreenBg, data) {
            if (showScreenBg === void 0) { showScreenBg = false; }
            console.log("[ShowPanel] >>> ", name);
            if (showScreenBg) {
                this.addClosePanelNames(name);
            }
            var panel = this.foreverMap[name];
            if (!this.foreverMap[name]) {
                var cls = egret.getDefinitionByName(name);
                panel = new cls();
                panel.name = name;
                this.foreverMap[name] = panel;
            }
            this._panelMap[name] = panel;
            if (panel.parent == null) {
                if (panel.mutex) {
                    var hideList = [];
                    for (var id in this._panelMap) {
                        var hidePanel = this._panelMap[id];
                        if (hidePanel) {
                            if (hidePanel.mutex && hidePanel != panel) {
                                hideList.push(hidePanel.name);
                            }
                        }
                    }
                    for (var _i = 0, hideList_1 = hideList; _i < hideList_1.length; _i++) {
                        var hidePanelName = hideList_1[_i];
                        this.hidePanel(hidePanelName);
                    }
                }
                this.addModel(panel, showScreenBg);
                var layer = this._layerMap[panel.layer];
                layer.addChild(panel);
                this.addOpenEffect(panel);
            }
            panel.setData(data);
            panel.visible = true;
            EventManager.inst.dispatch("SHOW_PANEL", name);
            return panel;
        };
        PanelManager.prototype.addClosePanelNames = function (name) {
            if (!this.closePanelMap[name] || this.closePanelMap[name].length <= 0) {
                var keys = Object.keys(this._panelMap);
                this.closePanelMap[name] = [];
                var len = keys.length;
                for (var i = 0; i < len; i++) {
                    var key = keys[i];
                    var panel = this._panelMap[key];
                    if (panel && panel.parent && panel.visible && panel.name != name) {
                        panel.visible = false;
                        this.closePanelMap[name].push(panel.name);
                    }
                }
            }
        };
        PanelManager.prototype.addModel = function (panel, showScreenBg) {
            if (showScreenBg === void 0) { showScreenBg = false; }
            var layer = this._layerMap[panel.layer];
            if (panel.modal) {
                var modal = DisplayUtil.createMask(panel.modalAlpha);
                modal.name = panel.name + "_modal";
                layer.addChild(modal);
            }
            if (showScreenBg && RES.getRes("screen_bg_png")) {
                if (!this.screenBgImg) {
                    this.screenBgImg = new eui.Image();
                    this.screenBgImg.source = "screen_bg_png";
                    this.screenBgImg.scale9Grid = new egret.Rectangle(60, 158, 360, 15);
                    this.screenBgImg.width = STAGE.stageWidth;
                    this.screenBgImg.height = STAGE.stageHeight;
                }
                layer.addChild(this.screenBgImg);
            }
        };
        PanelManager.prototype.showPanel = function (name, data, showScreenBg) {
            if (showScreenBg === void 0) { showScreenBg = false; }
            // if (this._panelMap[name] && this._panelMap[name].parent) {
            //     return this._panelMap[name];
            // }
            console.log("[ShowPanel] >>> ", name);
            var cls = egret.getDefinitionByName(name);
            var panel = this._panelMap[name];
            if (cls == null) {
                console.warn("[" + name + "] Class Not Defined....");
            }
            else {
                if (panel == null) {
                    panel = new cls();
                    panel.name = name;
                }
                this._panelMap[panel.name] = panel;
                if (panel.parent == null) {
                    this.addModel(panel, showScreenBg);
                    var layer = this._layerMap[panel.layer];
                    layer.addChild(panel);
                    this.addOpenEffect(panel);
                }
                panel.setData(data);
                EventManager.inst.dispatch("SHOW_PANEL", name);
            }
            return panel;
        };
        PanelManager.prototype.hidePanel = function (name) {
            console.log("[HidePanel] <<< ", name);
            var panel = this._panelMap[name];
            if (panel) {
                egret.Tween.removeTweens(panel);
                if (panel.parent) {
                    var layer = this._layerMap[panel.layer];
                    if (panel.modal) {
                        DisplayUtil.removeChildByName(layer, panel.name + "_modal");
                    }
                    if (this.foreverMap[name]) {
                        panel.disActive();
                    }
                    else {
                        panel.dispose();
                    }
                    this.addCloseEffect(panel);
                    // layer.removeChild(panel);
                }
            }
            delete this._panelMap[name];
            var len = this.closePanelMap[name] ? this.closePanelMap[name].length : 0;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    var panel_1 = this._panelMap[this.closePanelMap[name][i]];
                    if (panel_1 && panel_1.parent && !panel_1.visible) {
                        panel_1.visible = true;
                    }
                }
                this.closePanelMap[name] = null;
                DisplayUtil.removeFromParent(this.screenBgImg);
            }
            EventManager.inst.dispatch("HIDE_PANEL", name);
        };
        PanelManager.prototype.addOpenEffect = function (panel) {
            egret.Tween.removeTweens(panel);
            var stageWidth = STAGE.stageWidth;
            var stageHeight = STAGE.stageHeight;
            switch (panel.effectType) {
                case 1:
                    panel.anchorOffsetX = panel.width / 2;
                    panel.anchorOffsetY = panel.height / 2;
                    panel.x = stageWidth / 2;
                    panel.y = stageHeight / 2;
                    panel.scaleX = 0.5;
                    panel.scaleY = 0.5;
                    panel.alpha = 0;
                    egret.Tween.get(panel).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 300, egret.Ease.backOut);
                    break;
                case 2:
                    panel.y = -stageHeight;
                    egret.Tween.get(panel).to({ y: (stageHeight - panel.height) / 2 }, 300, egret.Ease.backOut);
                    break;
                case 3:
                    panel.y = stageHeight;
                    egret.Tween.get(panel).to({ y: (stageHeight - panel.height) / 2 }, 300, egret.Ease.backOut);
                    break;
                case 4:
                    panel.x = -stageWidth;
                    egret.Tween.get(panel).to({ x: (stageWidth - panel.width) / 2 }, 300, egret.Ease.backOut);
                    break;
                case 5:
                    panel.x = stageWidth;
                    egret.Tween.get(panel).to({ x: (stageWidth - panel.width) / 2 }, 300, egret.Ease.backOut);
                    break;
            }
        };
        PanelManager.prototype.addCloseEffect = function (panel) {
            egret.Tween.removeTweens(panel);
            var stageWidth = STAGE.stageWidth;
            var stageHeight = STAGE.stageHeight;
            var tween = null;
            switch (panel.effectType) {
                case 1:
                    tween = egret.Tween.get(panel).to({ scaleX: 0.5, scaleY: 0.5, alpha: 0 }, 300, egret.Ease.backIn);
                    break;
                case 2:
                    tween = egret.Tween.get(panel).to({ y: -stageHeight }, 300, egret.Ease.backIn);
                    break;
                case 3:
                    tween = egret.Tween.get(panel).to({ y: stageHeight }, 300, egret.Ease.backIn);
                    break;
                case 4:
                    tween = egret.Tween.get(panel).to({ x: -stageWidth }, 300, egret.Ease.backIn);
                    break;
                case 5:
                    tween = egret.Tween.get(panel).to({ x: stageWidth }, 300, egret.Ease.backIn);
                    break;
            }
            if (tween) {
                tween.call(function () {
                    DisplayUtil.removeFromParent(panel);
                }, this);
            }
            else {
                DisplayUtil.removeFromParent(panel);
            }
        };
        return PanelManager;
    }(egret.HashObject));
    __reflect(PanelManager.prototype, "PanelManager");
})(Pop || (Pop = {}));
//# sourceMappingURL=PanelManager.js.map