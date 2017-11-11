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
var off = Net.off;
var MainView = (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        var _this = _super.call(this) || this;
        // var cloundEff = new CloundEffect();
        // this.addChild(cloundEff);
        // cloundEff.start();
        // return;
        // var woodEffect = new WoodEffect();
        // this.addChild(woodEffect);
        // let group = new eui.Group();
        // group.width = 200;
        // group.height = 200;
        // group.x = 200;
        // group.y = 200;
        // let rect = new eui.Rect(200, 200, 0x0);
        // rect.fillColor = 0x0;
        // group.addChild(rect);
        //
        // let redPoint = new egret.Sprite();
        // redPoint.graphics.beginFill(0xff0000);
        // redPoint.graphics.drawCircle(0, 0, 10);
        // redPoint.graphics.endFill();
        // group.addChild(redPoint);
        // STAGE.addChild(group);
        // return;
        _this.scene = new Scene();
        _this.addChild(_this.scene);
        _this.leftView = new LeftView();
        _this.leftView.left = 0;
        _this.addChild(_this.leftView);
        _this.rightView = new RightView();
        _this.rightView.right = 0;
        _this.addChild(_this.rightView);
        _this.bottomView = new BottomView();
        _this.bottomView.y = 780;
        _this.addChild(_this.bottomView);
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClick, _this);
        return _this;
    }
    MainView.prototype.onClick = function (e) {
        var name = e.target.name;
        switch (name) {
            case "diceBtn":
                // this.scene.throwDice();
                this.addDiamond(e);
                break;
            case "skinBtn":
                Pop.open(SkinPanel);
                break;
        }
    };
    MainView.prototype.addDiamond = function (e) {
        var count = 10;
        while (count--) {
            var ball = new Ball();
            // image.x = e.stageX;
            // image.y = e.stageY;
            var minAngle = 30;
            var maxAngle = 150;
            var minDistance = 50;
            var maxDistance = 100;
            var angle = (minAngle + Math.random() * (maxAngle - minAngle));
            var distance = minDistance + Math.random() * (maxDistance - minDistance);
            var offX = Math.cos(angle) * distance;
            var offY = Math.sin(angle) * distance;
            var x = e.stageX + offX;
            var y = e.stageY + offY;
            var targetX = 50;
            var targetY = 50;
            ball.fly(x, y, targetX, targetY, e.stageX, e.stageY);
            STAGE.addChild(ball);
        }
    };
    return MainView;
}(egret.DisplayObjectContainer));
__reflect(MainView.prototype, "MainView");
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball() {
        var _this = _super.call(this) || this;
        var image = new eui.Image();
        image.source = "common_icon_diamon_s_png";
        _this.addChild(image);
        return _this;
    }
    Ball.prototype.setPos = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Ball.prototype.setBack = function (back, context) {
    };
    /**
     * 飞到目标点
     * @param x     开始x
     * @param y     开始y
     * @param tx    目标x
     * @param ty    目标y
     * @param mx    鼠标x
     * @param my  鼠标y
     */
    Ball.prototype.fly = function (x, y, tx, ty, mx, my) {
        this.setPos(mx, my);
        var tween = egret.Tween.get(this);
        tween.to({ x: x, y: y }, 200, egret.Ease.quartIn).wait(100).call(this.fly1, this, [x, y, tx, ty, mx, my]);
    };
    Ball.prototype.fly1 = function (x, y, tx, ty, mx, my) {
        var prop = {};
        var time = 800 + Math.random() * 200;
        this.p0_x = this.x;
        this.p0_y = this.y;
        var off = this.calcOff(x, y, tx, ty, mx, my);
        this.p1_x = off.x;
        this.p1_y = off.y;
        this.p2_x = tx;
        this.p2_y = ty;
        var tween = egret.Tween.get(this);
        tween.to({ factor: 1 }, time, egret.Ease.quadIn);
    };
    Ball.prototype.calcOff = function (x, y, tx, ty, mx, my) {
        var p = [x - tx, y - ty];
        var q = [mx - tx, my - ty];
        var v = p[0] * q[1] - p[1] * q[0];
        var c = [x + (tx - x) * 0.5, y + (ty - y) * 0.5];
        var point = new egret.Point();
        if (v > 0) {
            point.x = Math.min(STAGE.stageWidth - 20, c[0] + Math.max((x - mx) * 10, 200));
            point.y = c[1];
        }
        else if (v < 0) {
            point.x = Math.max(c[0] + Math.max((x - mx) * 10, -200), 20);
            point.y = c[1];
        }
        else {
            point.x = tx + mx - x;
            point.y = ty + my - y;
        }
        return point;
    };
    Object.defineProperty(Ball.prototype, "factor", {
        //添加factor的set,get方法,注意用public
        get: function () {
            return 0;
        },
        //计算方法参考 二次贝塞尔公式
        //(1 - t)^2 P0 + 2 t (1 - t) P1 + t^2 P2
        set: function (value) {
            var t = value;
            var p0_x = this.p0_x;
            var p0_y = this.p0_y;
            var p1_x = this.p1_x;
            var p1_y = this.p1_y;
            var p2_x = this.p2_x;
            var p2_y = this.p2_y;
            this.x = (1 - t) * (1 - t) * p0_x + 2 * t * (1 - t) * p1_x + t * t * p2_x;
            this.y = (1 - t) * (1 - t) * p0_y + 2 * t * (1 - t) * p1_y + t * t * p2_y;
        },
        enumerable: true,
        configurable: true
    });
    return Ball;
}(egret.DisplayObjectContainer));
__reflect(Ball.prototype, "Ball");
//# sourceMappingURL=MainView.js.map