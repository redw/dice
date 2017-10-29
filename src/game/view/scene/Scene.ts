import Stage = egret.Stage;
/**
 * 游戏场景
 */
class Scene extends egret.DisplayObjectContainer {
    private sceneWidth:number;
    private sceneHeight:number;

    private backGround:SceneBG;
    private homeLand:HomeLand;

    private mouseDownX:number;
    private mouseDownY:number;
    private startX:number;
    private startY:number;

    /**
     * 构造函数
     * @param tileW     格子宽度
     * @param tileH     格子高度
     * @param inner     内部大小
     */
    public constructor(width=1920, height=2160) {
        super();
        this.changeSceneSize(width, height);

        this.backGround = new SceneBG();
        this.addChild(this.backGround);
        this.backGround.draw();

        this.createHomeLand(width * 0.5, height * 0.5);
        this.center();

        STAGE.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouseDown, this);
    }

    public changeSceneSize(width:number, height:number) {
        this.sceneWidth = width;
        this.sceneHeight = height;
    }

    public center() {
        this.x = (this.sceneWidth - STAGE.stageWidth) * -0.5;
        this.y = (this.sceneHeight) * -0.5;
    }

    /**
     * 创建家园
     * @param tileW
     * @param tileH
     * @param inner
     */
    public createHomeLand(x:number, y:number, inner = 3) {
        this.homeLand = new HomeLand(95, 67, inner);
        this.homeLand.x = x;
        this.homeLand.y = y + 200;
        this.addChild(this.homeLand);
    }

    public createDice(x:number, y:number) {
        let dice = BoneUtil.createArmature("dice_roll");
        let display = dice.display;
        display.x = x;
        display.y = y;
        dice.animation.gotoAndPlay("1-1", 0, 0, 0);
        this.addChild(display);
    }

    public getGridPosByXXYY(xx:number, yy:number) {
        let x = (xx - yy - 1) * 59* 0.5;
        let y = (xx + yy) * 67 * 0.5;
        return {x:x, y:y};
    }


    public onMouseDown(e:egret.TouchEvent) {
        this.mouseDownX = e.stageX;
        this.mouseDownY = e.stageY;
        this.startX = this.x;
        this.startY = this.y;
        STAGE.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMouseMove, this);
    }

    private onMouseUp(e:egret.TouchEvent) {
        STAGE.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMouseMove, this);
    }

    private onMouseMove(e:egret.TouchEvent) {
        let stageX = e.stageX;
        let stageY = e.stageY;
        let offX = stageX - this.mouseDownX;
        let offY = stageY - this.mouseDownY;
        this.x = this.startX + offX;
        this.y = this.startY + offY;
        let maxX = 0;
        let maxY = 0;
        let minX = STAGE.stageWidth - this.sceneWidth;
        let minY = STAGE.stageHeight - this.sceneHeight;
        if (this.x > maxX) {
            this.x = maxX;
        }
        if (this.x < minX) {
            this.x = minX;
        }
        if (this.y > maxY) {
            this.y = maxY;
        }
        if (this.y < minY) {
            this.y = minY;
        }
    }

    public throwDice() {
        this.homeLand.throwDice();
    }
}