class SkinPanel extends BasePanel {
    private tabBar:eui.TabBar;
    private skinShowComp:SkinShowComp;

    public constructor() {
        super();
        this.skinName = SkinPanelSkin;
        this.layer = PanelLayer.TOP_LAYER;
    }

    public init() {
        this.tabBar.addEventListener(egret.Event.CHANGING, this.onSelectChange, this);
        Net.on(CmdConst.SKIN_UP, this.skinUpRes, this);
        this.onSelectChange();
    }

    private onSelectChange() {
        let selectIndex = this.tabBar.selectedIndex;
        let type = Math.max(selectIndex, 0);
        if (type == 1) {
            let arr = SkinModel.getDataProvider(type, 1);
            this.skinShowComp.setData(arr);
        } else {
            let arr = SkinModel.getDataProvider(type);
            this.skinShowComp.setData(arr);
        }
    }

    private skinUpRes() {
        let selectIndex = this.tabBar.selectedIndex;
        let type = Math.max(selectIndex, 0);
        let arr = SkinModel.getDataProvider(type);
        this.skinShowComp.refresh(arr);
    }
}