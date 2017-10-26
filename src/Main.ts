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
            this.addToStage();
        } else {
            this.once(egret.Event.ADDED_TO_STAGE, this.addToStage, this);
        }
    }

    private addToStage() {
        let engine = new Engine(this, "MainView");
    }
}

