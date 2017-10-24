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
        this.onSelectChange();
    }

    private onSelectChange() {
        let selectIndex = this.tabBar.selectedIndex;
        let type = Math.max(selectIndex, 0);
        let arr = SkinModel.getDataProvider(type);
        this.skinShowComp.setSkinInfo(arr, type);
    }
}