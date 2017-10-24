class SkinItemRen extends eui.Component {
    private nameTxt:eui.Label;
    private countTxt:eui.Label;
    private selectedImg:eui.Image;
    private cdata:any;

    public constructor() {
        super();
        this.skinName = SkinItemRenSkin;
    }

    public selected(obj:any, ) {
        DisplayUtil.setChildProp(this, "selectedImg", obj.id == this.cdata.id, "visible");
    }

    public setData(obj:any, type:number) {
        let cObj = SkinModel.getSkinConfigObj(obj, type);
        let nameTxt = <eui.Label>DisplayUtil.getChildByName(this, "nameTxt");
        let name = cObj.name;
        let count = 1;
        if (type == 0) {
            nameTxt.text = name;
        } else {
            name = name + "{0}";
            TextUtil.color(nameTxt, name, `     x${count}`, 0xb55826)
        }


    }
}