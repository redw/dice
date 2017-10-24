class SkinItemRen extends eui.Component {
    private nameTxt:eui.Label;
    private countTxt:eui.Label;
    private selectedImg:eui.Image;
    private cdata:any;

    public constructor() {
        super();
        this.skinName = SkinItemRenSkin;
        this.touchChildren = false;
    }

    public selected(obj:any) {
        this.selectedImg.visible = obj.id == this.cdata.id;
    }

    /**
     * 配置数组
     * @param obj
     */
    public setData(obj:any) {
        this.cdata = obj;
        this.nameTxt.text = Util.getPropValue(obj, "name", obj.id);
        this.countTxt.text = Util.getPropValue(obj, "count", 1);
    }
}