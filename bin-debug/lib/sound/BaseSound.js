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
var BaseSound = (function (_super) {
    __extends(BaseSound, _super);
    function BaseSound(path, type) {
        if (type === void 0) { type = 1 /* SOUND */; }
        var _this = _super.call(this) || this;
        _this.disposed = false;
        _this.path = "";
        _this.type = 1 /* SOUND */;
        _this.times = 1;
        _this.position = 0;
        _this.path = path;
        _this.type = type;
        _this.times = type === 0 /* MUSIC */ ? 0 : 1;
        return _this;
    }
    BaseSound.prototype.onSoundComplete = function (e) {
        this.stop();
    };
    BaseSound.prototype.onSoundError = function (e) {
        this.sound.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onSoundError, this);
        console.warn("声音解码错误:  " + this.path);
        this.dispose();
    };
    BaseSound.prototype.playSound = function (res) {
        this.sound = res;
        this.soundChannel = this.sound.play(0, this.times);
        this.soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
        this.sound.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSoundError, this);
    };
    /**
     * 播放
     */
    BaseSound.prototype.play = function () {
        var _this = this;
        if (this.sound) {
            this.soundChannel = this.sound.play(0, this.times);
            this.soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
            this.sound.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSoundError, this);
        }
        else {
            if (RES.hasRes(this.path)) {
                RES.getResAsync(this.path, function (res) {
                    _this.playSound(res);
                }, this);
            }
            else {
                RES.getResByUrl(this.path, function (res) {
                    _this.playSound(res);
                }, this, RES.ResourceItem.TYPE_SOUND);
            }
        }
    };
    /**
     * 恢复
     */
    BaseSound.prototype.resume = function () {
        if (this.sound) {
            this.soundChannel = this.sound.play(this.position, this.times);
            this.soundChannel.addEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
            this.sound.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSoundError, this);
        }
    };
    /**
     * 暂停
     */
    BaseSound.prototype.pause = function () {
        this.removeListeners();
        if (this.soundChannel) {
            this.position = this.soundChannel.position;
            this.soundChannel.stop();
            this.soundChannel = null;
        }
    };
    /**
     * 停止
     */
    BaseSound.prototype.stop = function () {
        this.removeListeners();
        if (this.soundChannel) {
            this.soundChannel.stop();
            this.soundChannel = null;
        }
        SoundManager.putSound(this);
    };
    BaseSound.prototype.removeListeners = function () {
        if (this.sound)
            this.sound.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onSoundError, this);
        if (this.soundChannel)
            this.soundChannel.removeEventListener(egret.Event.SOUND_COMPLETE, this.onSoundComplete, this);
    };
    /**
     * 销毁
     */
    BaseSound.prototype.dispose = function () {
        if (this.disposed) {
            return;
        }
        this.disposed = true;
        this.stop();
        this.sound = null;
        this.soundChannel = null;
    };
    return BaseSound;
}(egret.HashObject));
__reflect(BaseSound.prototype, "BaseSound");
//# sourceMappingURL=BaseSound.js.map