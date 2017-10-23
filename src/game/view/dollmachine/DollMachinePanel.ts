
class DollMachinePanel extends BasePanel {
    private bgImg:eui.Image;
    private foreImg:eui.Image;
    private handGroup:eui.Group;
    private armature:dragonBones.Armature;

    public constructor() {
        super();
        this.skinName = DollMachinePanelSkin;
        this.layer = PanelLayer.TOP_LAYER;
    }

    public init() {
        LoadManager.loadGroup(["zhuawawaji_ske_json", "zhuawawaji_tex_json", "zhuawawaji_tex_png"], this.onLoadWawaji, this);
    }

    private onLoadWawaji() {
        this.armature = BoneUtil.createArmature("zhuawawaji");
        let display = this.armature.display;
        display.x = 320;
        display.y = 620;
        this.handGroup.addChild(display);
        this.armature.animation.gotoAndPlay("idle", 0, 0, 0);
    }

    public start() {

    }
}