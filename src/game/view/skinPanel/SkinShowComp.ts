class SkinShowComp extends eui.Component {
    private levelTxt:eui.Label;
    private coinTxt:eui.Label;
    private diamondTxt:eui.Label;
    private skinData:any;
    private itemContainer:eui.Group;
    private itemArr:SkinItemRen[] = [];
    private freeItemArr:SkinItemRen[] = [];
    private partList:eui.Component[];

    public constructor() {
        super();
        this.skinName = SkinShowCompSkin;
        this.partList = Array(4);
    }

    public setSkinInfo(arr:any, type:number) {
        this.skinData = arr;
        while (this.itemArr.length) {
            let item = this.itemArr.pop();
            DisplayUtil.removeFromParent(item);
            this.freeItemArr.push(item);
        }
        for (let i = 0, len = arr.length; i < len; i++) {
            let comp:SkinItemRen = null;
            if (this.freeItemArr.length) {
                comp = this.freeItemArr.pop();
            } else {
                comp = new SkinItemRen();
            }
            this.itemArr.push(comp);
            comp.setData(arr[i], type);
            this.itemContainer.addChild(comp);
        }
        for (let i = 0, len = this.partList.length; i < len; i++) {
            let view = this.partList[i];
            if (i == type) {
                if (!view) {
                    view = new (egret.getDefinitionByName("SkinPart" + i));
                    this.partList[i] = view;
                }
                if (!view.parent) {
                    this.addChild(view);
                }
            } else {
                DisplayUtil.removeFromParent(view);
            }
        }
        this.showSomeSkinInfo(arr[0], type);
    }

    private showSomeSkinInfo(obj:any, type:number) {
        let view:any = this.partList[type];
        if (view && view.showSomeInfo) {
             view.showSomeInfo(obj, type) 
        } else {

        }
    }
}