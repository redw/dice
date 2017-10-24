class DollMachinePanel extends BasePanel {
    private bgImg:eui.Image;
    private goodsImg:egret.DisplayObject;
    private foreImg:eui.Image;
    private handGroup:eui.Group;
    private timerId:number;
    private armature:dragonBones.Armature;
    private groupIdx:number;

    private freeDrawBtn:eui.Group;
    private diamondDrawBtn:eui.Group;

    public constructor() {
        super();
        this.skinName = DollMachinePanelSkin;
        this.layer = PanelLayer.TOP_LAYER;
    }

    public init() {
        LoadManager.loadDragonBone("zhuawawaji", this.onLoadWawaji, this);
    }

    public active() {
        let free = true;
        let diamondCost = 100;
        DisplayUtil.setChildProp(this.diamondDrawBtn, "costTxt", diamondCost);
        DisplayUtil.setChildProp(this.freeDrawBtn, "freeImg", free, "visible");
        DisplayUtil.setChildProp(this.freeDrawBtn, "againFreeImg", !free, "visible");
    }

    private onLoadWawaji() {
        this.armature = BoneUtil.createArmature("zhuawawaji");
        let display = this.armature.display;
        display.x = 320;
        display.y = 620;
        this.handGroup.addChild(display);
    }

    protected onClick(name:string) {
        switch (name) {
            case "freeDrawBtn":
                this.start(101);
                Net.sendMessage(CmdConst.DRAW, {type:1, idx:this.groupIdx});
                break;

            case "diamondDrawBtn":
                Net.sendMessage(CmdConst.DRAW, {type:2, idx:this.groupIdx});
                break;
        }
    }

    private start(goods:number, action:string = "idle") {
        DisplayUtil.removeFromParent(this.goodsImg);
        this.armature.addEventListener(dragonBones.AnimationEvent.FRAME_EVENT, this.onFrameEvent, this);
        this.armature.addEventListener(dragonBones.AnimationEvent.COMPLETE, this.attachComplete, this);
        this.armature.animation.play(action, 1);
    }

    private onFrameEvent(e:dragonBones.AnimationEvent) {
        let frameLabel = e.frameLabel;
        if (frameLabel == "attackStart") {
            this.goodsImg = new eui.Rect(60, 40, 0xff0000);
            this.handGroup.addChildAt(this.goodsImg, 0);
            this.follow();
            this.timerId = GameLoop.registerEnterFrame(this.follow, this);
        }
    }

    private attachComplete() {
        GameLoop.clearTimer(this.timerId);
        Pop.close(this);
        this.armature.removeEventListener(dragonBones.AnimationEvent.FRAME_EVENT, this.onFrameEvent, this);
        this.armature.removeEventListener(dragonBones.AnimationEvent.COMPLETE, this.attachComplete, this);
    }

    private follow() {
        let boneName = "zhuazi2";
        let bone = this.armature.getBone(boneName);
        if (bone && this.goodsImg) {
            this.goodsImg.x = this.armature.display.x + bone.globalTransformMatrix.tx;
            this.goodsImg.y = this.armature.display.y + bone.globalTransformMatrix.ty;
        } else {

        }
    }
}