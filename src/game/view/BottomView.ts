class BottomView extends ExComponent {
    public constructor() {
        super();
        this.skinName = BottomViewSkin;
    }

    protected onClick(name:string) {
        switch (name) {
            case "skinBtn":
                Pop.open(SkinPanel);
                break;
        }
    }
}