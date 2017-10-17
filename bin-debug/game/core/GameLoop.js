/**
 * 游戏中的一些循环
 * 跟egret.Timer的改进,垃圾回，做了个把柄,没有用splice处理删除.取消掉了一些不常用的功能stop,pause...
 */
var GameLoop;
(function (GameLoop) {
    ;
    var id = 0;
    var oldTimer;
    var timerMap;
    var pool;
    var timerArr;
    var freeIndexArr;
    function onEnterFrame() {
        var curTime = egret.getTimer();
        var offTimer = curTime - oldTimer;
        var len = timerArr.length;
        freeIndexArr.length = 0;
        for (var i = 0; i < len; i++) {
            var timer = timerArr[i];
            if (timer.id <= 0) {
                release(timer);
                timerArr[i] = null;
                freeIndexArr.push(i);
            }
            else {
                if (timer.delay <= 0) {
                    timer.back.call(timer.context, offTimer);
                }
                else {
                    timer.time += offTimer;
                    if (timer.time > timerArr[i].delay) {
                        timer.time -= timerArr[i].delay;
                        timer.back.call(timer.context);
                        if (timer.repeat >= 1) {
                            if (timer.repeat == 1) {
                                clearTimer(timer.id);
                            }
                            else {
                                timer.repeat--;
                            }
                        }
                    }
                }
            }
        }
        oldTimer = curTime;
        dragonBones.WorldClock.clock.advanceTime(0.025);
    }
    function boot() {
        var stage = __STAGE;
        pool = [];
        freeIndexArr = [];
        timerArr = [];
        timerMap = {};
        oldTimer = egret.getTimer();
        stage.addEventListener(egret.Event.ENTER_FRAME, onEnterFrame, GameLoop);
    }
    GameLoop.boot = boot;
    function registerEnterFrame(back, context) {
        return registerTimer(back, context, 0, 0);
    }
    GameLoop.registerEnterFrame = registerEnterFrame;
    function clearTimer(id) {
        var timer = timerMap[id];
        release(timer);
    }
    GameLoop.clearTimer = clearTimer;
    function release(timer) {
        if (timer) {
            timer.back = null;
            timer.context = null;
            timer.id = -1;
            timer.repeat = 0;
            timer.delay = 0;
            pool.push(timer);
        }
    }
    function registerTimer(back, context, delay, repeat) {
        if (delay === void 0) { delay = 1000; }
        if (repeat === void 0) { repeat = 1; }
        var timer = pool.pop();
        var timerId = ++id;
        if (!timer) {
            timer = {};
        }
        timer.repeat = repeat;
        timer.delay = delay;
        timer.id = timerId;
        timer.time = 0;
        timer.back = back;
        timer.context = context;
        var index = freeIndexArr.pop();
        if (index !== undefined) {
            timerArr[index] = timer;
        }
        else {
            timerArr.push(timer);
        }
        timerMap[timerId] = timer;
        return timerId;
    }
    GameLoop.registerTimer = registerTimer;
})(GameLoop || (GameLoop = {}));
//# sourceMappingURL=GameLoop.js.map