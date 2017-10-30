var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var DollMachinePanel = (function (_super) {
    __extends(DollMachinePanel, _super);
    function DollMachinePanel() {
        var _this = _super.call(this) || this;
        _this.skinName = DollMachinePanelSkin;
        _this.layer = PanelLayer.TOP_LAYER;
        return _this;
    }
    DollMachinePanel.prototype.init = function () {
        LoadManager.loadDragonBone("zhuawawaji", this.onLoadWawaji, this);
    };
    DollMachinePanel.prototype.active = function () {
        var free = true;
        var diamondCost = 100;
        DisplayUtil.setChildProp(this.diamondDrawBtn, "costTxt", diamondCost);
        DisplayUtil.setChildProp(this.freeDrawBtn, "freeImg", free, "visible");
        DisplayUtil.setChildProp(this.freeDrawBtn, "againFreeImg", !free, "visible");
    };
    DollMachinePanel.prototype.onLoadWawaji = function () {
        this.armature = BoneUtil.createArmature("zhuawawaji");
        var display = this.armature.display;
        display.x = 320;
        display.y = 620;
        this.handGroup.addChild(display);
    };
    DollMachinePanel.prototype.onClick = function (name) {
        switch (name) {
            case "freeDrawBtn":
                this.start(101);
                Net.sendMessage(CmdConst.DRAW, { type: 1, idx: this.groupIdx });
                break;
            case "diamondDrawBtn":
                Net.sendMessage(CmdConst.DRAW, { type: 2, idx: this.groupIdx });
                break;
        }
    };
    DollMachinePanel.prototype.start = function (goods, action) {
        if (action === void 0) { action = "idle"; }
        DisplayUtil.removeFromParent(this.goodsImg);
        this.armature.addEventListener(dragonBones.AnimationEvent.FRAME_EVENT, this.onFrameEvent, this);
        this.armature.addEventListener(dragonBones.AnimationEvent.COMPLETE, this.attachComplete, this);
        this.armature.animation.play(action, 1);
    };
    DollMachinePanel.prototype.onFrameEvent = function (e) {
        var frameLabel = e.frameLabel;
        if (frameLabel == "attackStart") {
            this.goodsImg = new eui.Rect(60, 40, 0xff0000);
            this.handGroup.addChildAt(this.goodsImg, 0);
            this.follow();
            this.timerId = GameLoop.registerEnterFrame(this.follow, this);
        }
    };
    DollMachinePanel.prototype.attachComplete = function () {
        GameLoop.clearTimer(this.timerId);
        Pop.close(this);
        this.armature.removeEventListener(dragonBones.AnimationEvent.FRAME_EVENT, this.onFrameEvent, this);
        this.armature.removeEventListener(dragonBones.AnimationEvent.COMPLETE, this.attachComplete, this);
    };
    DollMachinePanel.prototype.follow = function () {
        var boneName = "zhuazi2";
        var bone = this.armature.getBone(boneName);
        if (bone && this.goodsImg) {
            this.goodsImg.x = this.armature.display.x + bone.globalTransformMatrix.tx;
            this.goodsImg.y = this.armature.display.y + bone.globalTransformMatrix.ty;
        }
        else {
        }
    };
    return DollMachinePanel;
}(BasePanel));
__reflect(DollMachinePanel.prototype, "DollMachinePanel");
