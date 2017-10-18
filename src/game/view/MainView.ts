class MainView extends egret.DisplayObjectContainer {
    private scene:Scene;

    public constructor() {
        super();

        this.scene = new Scene(95, 67, 4);
        this.addChild(this.scene);
        this.scene.y = 200;

        this.createDice(200, 200);
    }

    private createDice(x:number, y:number) {
        let dice = BoneUtil.createArmature("dice_roll");
        let display = dice.display;
        display.x = x;
        display.y = y;
        dice.animation.gotoAndPlay("1-1", 0, 0, 0);
        this.addChild(display);
    }
}