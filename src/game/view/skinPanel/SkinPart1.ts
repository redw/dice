class SkinPart1 extends ExComponent {
    private tabBar:eui.TabBar;
    private owner:ExComponent;

    public constructor(owner) {
        super();
        this.owner = owner;
        this.skinName = SkinPart1Skin;
    }

    public init() {
        this.tabBar.addEventListener(egret.Event.CHANGING, this.onSelectChange, this);
    }

    private onSelectChange() {
        let subType = (this.tabBar.selectedIndex || 0) + 1;
        let arr = SkinModel.getDataProvider(1, subType);
        this.owner.setData(arr);
    }

    public active() {

    }
}