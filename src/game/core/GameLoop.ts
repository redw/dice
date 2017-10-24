/**
 * 游戏中的一些循环
 * 跟egret.Timer的改进,垃圾回，做了个把柄,没有用splice处理删除.取消掉了一些不常用的功能stop,pause...
 */
module GameLoop {
    interface Timer {
        id:number,
        back:Function,
        context:any,
        repeat:number,
        delay:number,
        time:number
    };

    let id = 0;
    let oldTimer;
    let timerMap;
    let pool:Timer[];
    let timerArr:Timer[];
    let freeIndexArr:number[];

    function onEnterFrame() {
        let curTime = egret.getTimer();
        let offTimer = curTime - oldTimer;
        let len = timerArr.length;
        for (let i = 0; i < len; i++) {
            let timer = timerArr[i];
            if (timer) {
                if (!timer.back) {
                    release(timer);
                } else {
                    if (timer.delay <= 0) {
                        timer.back.call(timer.context, offTimer);
                    } else {
                        timer.time += offTimer;
                        if (timer.time > timerArr[i].delay) {
                            timer.time -= timerArr[i].delay;
                            timer.back.call(timer.context);
                            if (timer.repeat >= 1) {
                                if (timer.repeat == 1) {
                                    clearTimer(timer.id);
                                } else {
                                    timer.repeat--;
                                }
                            }
                        }
                    }
                }
            }
        }
        oldTimer = curTime;
    }

    export function boot() {
        let stage = __STAGE;
        pool = [];
        freeIndexArr = [];
        timerArr = [];
        timerMap = {};
        oldTimer = egret.getTimer();
        stage.addEventListener(egret.Event.ENTER_FRAME, onEnterFrame, GameLoop);
    }

    export function registerEnterFrame(back:Function, context?:any) {
        return registerTimer(back, context, 0, 0);
    }

    export function clearTimer(id:number) {
        let timer = timerMap[id];
        timer.back = null;
    }

    function release(timer:Timer) {
        if (timer) {
            let id = timer.id;
            freeIndexArr.push(id);
            timerArr[id] = null;
            timer.back = null;
            timer.context = null;
            timer.id = -1;
            timer.repeat = 0;
            timer.delay = 0;
            pool.push(timer);
        }
    }

    export function registerTimer(back:Function, context?:any, delay = 1000, repeat = 1) {
        let timer = pool.pop();
        let timerId = id++;
        if (!timer) {
            timer = <Timer>{};
        }
        timer.repeat = repeat;
        timer.delay = delay;
        timer.id = timerId;
        timer.time = 0;
        timer.back = back;
        timer.context = context;
        let index = freeIndexArr.pop();
        if (index !== undefined) {
            timerArr[index] = timer;
        } else {
            timerArr.push(timer);
        }
        timerMap[timerId] = timer;
        return timerId;
    }
}
