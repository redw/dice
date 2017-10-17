let __STAGE;

/**
 * 游戏入口
 */
class Main extends egret.DisplayObjectContainer {
    public constructor() {
        super();

        console.log(' _       _');
        console.log('| |__   | |__');
        console.log('|  _ \\  |  _ \\');
        console.log('| | | | | | | |');
        console.log('|_| |_| |_| |_|');
        console.log('我是hh, qq:503872749');
        console.log('专业专注小游戏,小程序');
        console.log('用最好的产品回报给大家!');

        if (this.stage) {
            this.onAddToStage();
        } else {
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }
    }

    private onAddToStage() {
        __STAGE = this.stage;
        __STAGE.scaleMode = egret.StageScaleMode.SHOW_ALL;
        GameLoad.start(this.loadComplete, this);
    }

    private loadComplete() {
        GameLoop.boot();

        Pop.boot(this);

        GameLoop.registerEnterFrame(this.onEnterFrame, this);
    }

    private onEnterFrame() {
        dragonBones.WorldClock.clock.advanceTime(0.01);
    }
}