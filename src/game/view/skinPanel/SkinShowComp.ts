class SkinShowComp extends eui.Component {
    private levelTxt:eui.Label;
    private coinTxt:eui.Label;
    private diamondTxt:eui.Label;
    private skinData:any;
    private itemContainer:eui.Group;
    private itemArr = [];

    public constructor() {
        super();
        this.skinName = SkinShowCompSkin;
    }

    public showAllSkin(arr:any) {
        this.skinData = arr;
        for (let i = 0; i < arr.length; i++) {
            let comp = new SkinItemRen();
            this.itemContainer.addChild(comp);
        }
        this.showSomeSkinInfo(arr[0]);
    }

    private showSomeSkinInfo(obj:any) {
        this.levelTxt.text = Util.getPropValue(obj, "level", "1");
        this.coinTxt.text = Util.getPropValue(obj, "coin", "1");
        this.diamondTxt.text = Util.getPropValue(obj, "diamond", "1");
    }
}