class MainView extends egret.DisplayObjectContainer {
    private scene:Scene;

    private leftView:LeftView;
    private rightView:RightView;
    private bottomView:BottomView;

    public constructor() {
        super();

        this.scene = new Scene(95, 67, 3);
        this.addChild(this.scene);

        this.leftView = new LeftView();
        this.leftView.left = 0;
        this.addChild(this.leftView);

        this.rightView = new RightView();
        this.rightView.right = 0;
        this.addChild(this.rightView);

        this.bottomView = new BottomView();
        this.bottomView.y = 836;
        this.addChild(this.bottomView);

        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    }

    private onClick(e:egret.TouchEvent) {
        let name = e.target.name;
        switch (name) {
            case "diceBtn":
                this.scene.throwDice();
                break;

            case "skinBtn":
                Pop.open(SkinPanel);
                break;
        }
    }
}