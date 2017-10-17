class PanelLayer {
    public static BOTTOM_LAYER: string = "bottom";
    public static MIDDLE_LAYER: string = "middle";
    public static TOP_LAYER: string = "top";
    public static ALERT_LAYER: string = "alert";
}

module Pop{
    let inst:PanelManager;

    export function boot(root:egret.DisplayObjectContainer) {
        inst = new PanelManager();
        inst.init(root);
    }

    /**
     * 弹出面板
     * @param name      面板名|类|实例
     * @param data      面板的数据
     */
    export function open(panel:any, data?:any) {
        let name = getPanelName(panel);
        if (!name || !egret.getDefinitionByName(name)) {
            egret.warn("不存在面板" + panel);
        } else {
            inst.showPanel(name, data);
        }
    }

    /**
     * 关闭面板
     * @param panel     面板名|类|实例
     * @param option    关闭面板的参数
     */
    export function close(panel:any) {
        let name = getPanelName(panel);
        if (!name || !egret.getDefinitionByName(name)) {
            egret.warn("不存在面板" + panel);
        } else {
            inst.hidePanel(name);
        }
    }

    /**
     * 切换开关面板
     * @param panel     面板名|类|实例
     * @param data
     */
    export function toggle(panel:any, data?:any) {
        let name = getPanelName(panel);
        if (!name || !egret.getDefinitionByName(name)) {
            egret.warn("不存在面板" + panel);
        } else {
            if (isShow(name)) {
                close(panel);
            } else {
                open(panel, data);
            }
        }
    }

    /**
     * 面板是否打开
     * @param panel
     * @returns {boolean}
     */
    export function isShow(panel:any) {
        let name = getPanelName(panel);
        return inst.isShow(name);
    }

    export function getPanel(panel:any) {
        let name = getPanelName(panel);
        return inst.getPanelByName(name);
    }

    /**
     * 得到面板的名字
     * @param panel
     * @returns {string}
     */
    function getPanelName(panel:any) {
        let name = "";
        if (typeof panel == "string") {
            name = <string>panel;
        } else {
            if (panel.hasOwnProperty("name")) {
                name = panel.name;
            } else {
                name = egret.getQualifiedClassName(panel);
            }
        }
        return name;
    }

    class PanelManager extends egret.HashObject {
        private _layerMap = null;
        private _panelMap = null;

        private closePanelMap = null;
        private foreverMap = null;
        private screenBgImg: eui.Image;

        public constructor() {
            super();
            this._layerMap = {};
            this._panelMap = {};
            this.closePanelMap = {};
            this.foreverMap = {};
        }

        public init(root: egret.DisplayObjectContainer): void {
            let list = [PanelLayer.BOTTOM_LAYER, PanelLayer.MIDDLE_LAYER, PanelLayer.TOP_LAYER, PanelLayer.ALERT_LAYER];
            for (let i = 0; i < list.length; i++) {
                let name: string = list[i];
                let layer: eui.Group = new eui.Group();
                layer.name = name;
                layer.width = Global.getStageWidth();
                layer.height = Global.getStageHeight();
                layer.touchEnabled = false;
                layer.touchChildren = true;
                root.addChild(layer);
                this._layerMap[layer.name] = layer;
            }
        }

        public getLayer(name: string): eui.Group {
            return this._layerMap[name];
        }

        public getPanelByName(name: string) {
            return this._panelMap[name];
        }

        public isShow(name: string): boolean {
            let panel = this._panelMap[name];
            return panel && panel.visible && panel.stage;
        }

        public getPanelList(layer?:string){
            let list: BasePanel[] = [];
            for (let key in this._panelMap) {
                let panel: BasePanel = this._panelMap[key];
                if (panel && panel.layer == layer || !layer) {
                    list.push(panel);
                }
            }
            return list;
        }

        /**
         * 打开全屏面板
         * @param name
         * @param data
         * @returns {undefined|BasePanel}
         */
        public showSinglePanel(name: string, data?: any) {
            this.addClosePanelNames(name);
            return this.showPanel(name, data, true);
        }

        /**
         * 显示永远存在的面板
         * @param name              面板名
         * @param showScreenBg      是否全屏显示
         * @param data              面板数据
         */
        public showPanelAlwaysExist(name: string, showScreenBg = false, data?: any) {
            console.log("[ShowPanel] >>> ", name);
            if (showScreenBg) {
                this.addClosePanelNames(name);
            }
            let panel: BasePanel = this.foreverMap[name];
            if (!this.foreverMap[name]) {
                let cls = egret.getDefinitionByName(name);
                panel = new cls();
                panel.name = name;
                this.foreverMap[name] = panel;
            }
            this._panelMap[name] = panel;
            if (panel.parent == null) {
                if (panel.mutex) {
                    let hideList: string[] = [];
                    for (let id in this._panelMap) {
                        let hidePanel: BasePanel = this._panelMap[id];
                        if (hidePanel) {
                            if (hidePanel.mutex && hidePanel != panel) {
                                hideList.push(hidePanel.name);
                            }
                        }
                    }
                    for (let hidePanelName of hideList) {
                        this.hidePanel(hidePanelName);
                    }
                }
                this.addModel(panel, showScreenBg);

                let layer: eui.Group = this._layerMap[panel.layer];
                layer.addChild(panel);
                this.addOpenEffect(panel);
            }
            panel.setData(data);
            panel.visible = true;
            EventManager.inst.dispatch("SHOW_PANEL", name);
            return panel;
        }

        private addClosePanelNames(name: string) {
            if (!this.closePanelMap[name] || this.closePanelMap[name].length <= 0) {
                let keys = Object.keys(this._panelMap);
                this.closePanelMap[name] = [];
                let len = keys.length;
                for (let i = 0; i < len; i++) {
                    let key = keys[i];
                    let panel: BasePanel = this._panelMap[key];
                    if (panel && panel.parent && panel.visible && panel.name != name) {
                        panel.visible = false;
                        this.closePanelMap[name].push(panel.name);
                    }
                }
            }
        }

        private addModel(panel: BasePanel, showScreenBg = false) {
            let layer: eui.Group = this._layerMap[panel.layer];
            if (panel.modal) {
                let modal: eui.Image = DisplayUtil.createMask(panel.modalAlpha);
                modal.name = panel.name + "_modal";
                layer.addChild(modal);
            }
            if (showScreenBg && RES.getRes("screen_bg_png")) {
                if (!this.screenBgImg) {
                    this.screenBgImg = new eui.Image();
                    this.screenBgImg.source = "screen_bg_png";
                    this.screenBgImg.scale9Grid = new egret.Rectangle(60, 158, 360, 15);
                    this.screenBgImg.width = Global.getStageWidth();
                    this.screenBgImg.height = Global.getStageHeight();
                }
                layer.addChild(this.screenBgImg);
            }
        }

        public showPanel(name: string, data?: any, showScreenBg = false) {
            // if (this._panelMap[name] && this._panelMap[name].parent) {
            //     return this._panelMap[name];
            // }
            console.log("[ShowPanel] >>> ", name);
            let cls = egret.getDefinitionByName(name);
            let panel: BasePanel = this._panelMap[name];
            if (cls == null) {
                console.warn("[" + name + "] Class Not Defined....");
            } else {
                if (panel == null) {
                    panel = new cls();
                    panel.name = name;
                }
                this._panelMap[panel.name] = panel;

                if (panel.parent == null) {
                    this.addModel(panel, showScreenBg);

                    let layer: eui.Group = this._layerMap[panel.layer];
                    layer.addChild(panel);

                    this.addOpenEffect(panel);
                }

                panel.setData(data);
                EventManager.inst.dispatch("SHOW_PANEL", name);
            }
            return panel;
        }

        public hidePanel(name: string): void {
            console.log("[HidePanel] <<< ", name);
            let panel: BasePanel = this._panelMap[name];
            if (panel) {
                egret.Tween.removeTweens(panel);
                if (panel.parent) {
                    let layer: eui.Group = this._layerMap[panel.layer];
                    if (panel.modal) {
                        DisplayUtil.removeChildByName(layer, panel.name + "_modal");
                    }
                    if (this.foreverMap[name]) {
                        panel.disActive();
                    } else {
                        panel.dispose();
                    }
                    this.addCloseEffect(panel);
                    // layer.removeChild(panel);
                }
            }
            delete this._panelMap[name];
            let len = this.closePanelMap[name] ? this.closePanelMap[name].length : 0;
            if (len > 0) {
                for (let i = 0; i < len; i++) {
                    let panel: BasePanel = this._panelMap[this.closePanelMap[name][i]];
                    if (panel && panel.parent && !panel.visible) {
                        panel.visible = true;
                    }
                }
                this.closePanelMap[name] = null;
                DisplayUtil.removeFromParent(this.screenBgImg);
            }
            EventManager.inst.dispatch("HIDE_PANEL", name);
        }

        private addOpenEffect(panel: BasePanel): void {
            egret.Tween.removeTweens(panel);
            let stageWidth: number = Global.getStageWidth();
            let stageHeight: number = Global.getStageHeight();
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
        }

        private addCloseEffect(panel: BasePanel): void {
            egret.Tween.removeTweens(panel);
            let stageWidth = Global.getStageWidth();
            let stageHeight = Global.getStageHeight();
            let tween = null;
            switch (panel.effectType) {
                case 1:
                    tween = egret.Tween.get(panel).to({ scaleX: 0.5, scaleY: 0.5, alpha: 0}, 300, egret.Ease.backIn);
                    break;

                case 2:
                    tween = egret.Tween.get(panel).to({ y: -stageHeight}, 300, egret.Ease.backIn);
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
                tween.call(()=>{
                    DisplayUtil.removeFromParent(panel);
                }, this)
            } else {
                DisplayUtil.removeFromParent(panel);
            }
        }
    }
}