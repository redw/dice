class SkinShowComp extends ExComponent {
    private levelTxt:eui.Label;
    private coinTxt:eui.Label;
    private diamondTxt:eui.Label;
    private skinData:any;
    private partGroup:eui.Group;
    private itemContainer:eui.Group;
    private list:eui.List;
    private scroll:eui.Scroller;
    private partList:ExComponent[];

    public constructor() {
        super();
        this.skinName = SkinShowCompSkin;
    }

    public init() {
        this.list.itemRenderer = SkinItemRen;
        this.list.addEventListener(eui.PropertyEvent.PROPERTY_CHANGE, this.onSelectItem, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this, true, Number.MAX_VALUE);
        this.partList = Array(4);
    }

    private onTouchEnd(e:egret.TouchEvent) {
        let touchMoved = this.scroll["$Scroller"][5];
        if (touchMoved) {
            e.stopImmediatePropagation();
            let scrollH = Math.abs(this.list.scrollH);
            scrollH = Math.round(scrollH / 225) * 225;
            egret.setTimeout(()=>{
                this.list.scrollH = scrollH;
                this.scroll["$Scroller"][5] = false;
            }, this, 0);
        }
    }

    public active() {
        let arr = this.data;
        this.skinData = arr;
        this.list.dataProvider = new eui.ArrayCollection(arr);
        this.list.selectedIndex = 0;
        let type = arr[0].type;
        for (let i = 0, len = this.partList.length; i < len; i++) {
            let view = this.partList[i];
            if (i == type) {
                if (!view) {
                    view = new (egret.getDefinitionByName("SkinPart" + i))(this);
                    this.partList[i] = view;
                }
                if (!view.parent) {
                    this.partGroup.addChild(view);
                }
            } else {
                DisplayUtil.removeFromParent(view);
            }
        }
    }

    private onSelectItem() {
        let obj = this.list.selectedItem;
        let type = obj.type;
        let view = this.partList[type];
        if (view) {
            view.setData(obj);
        } else {

        }
    }

    public refresh(arr:any) {
        let dataProvider = <eui.ArrayCollection>this.list.dataProvider;
        dataProvider.replaceAll(arr);
        this.onSelectItem();
    }
}