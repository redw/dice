class SkinShowComp extends eui.Component {
    private levelTxt:eui.Label;
    private coinTxt:eui.Label;
    private diamondTxt:eui.Label;
    private skinData:any;
    private itemContainer:eui.Group;
    private itemArr:SkinItemRen[] = [];
    private freeItemArr:SkinItemRen[] = [];

    public constructor() {
        super();
        this.skinName = SkinShowCompSkin;
    }

    public showAllSkin(arr:any) {
        this.skinData = arr;
        while (this.itemArr.length) {
            let item = this.itemArr.pop();
            DisplayUtil.removeFromParent(item);
            this.freeItemArr.push(item);
        }
        for (let i = 0, len = arr.length; i < len; i++) {
            let comp = null;
            if (this.freeItemArr.length) {
                comp = this.freeItemArr.pop();
            } else {
                comp = new SkinItemRen();
            }
            this.itemArr.push(comp);
            comp.setData(arr[i]);
            this.itemContainer.addChild(comp);
        }
        this.showSomeSkinInfo(arr[0]);
    }

    private showSomeSkinInfo(obj:any) {
        for (let i = 0, len = this.itemArr.length; i < len; i++) {
            let comp = this.itemArr[i];
            comp.selected(obj);
        }
        this.levelTxt.text = Util.getPropValue(obj, "level", "1");
        this.coinTxt.text = Util.getPropValue(obj, "coin", "1");
        this.diamondTxt.text = Util.getPropValue(obj, "diamond", "1");
    }
}