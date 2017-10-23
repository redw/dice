class LeftView extends ExComponent {
    constructor() {
        super();
        this.skinName = LeftViewSkin;
    }

    /**
     * 点击事件
     * @param name
     */
    protected onClick(name:string) {
        switch (name) {
            case "taskBtn":
                Pop.open(SkinPanel);
                break;

            case "activityBtn":
                Pop.open(DollMachinePanel)
                break;
        }
    }
}