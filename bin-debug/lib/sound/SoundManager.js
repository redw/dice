var SoundManager;
(function (SoundManager) {
    var soundCache = {};
    var currentMusic = null;
    var currentMusicPath = "";
    var playingSounds = [];
    var musicStatus = true;
    var soundStatus = true;
    function boot() {
        var stage = __STAGE;
        stage.addEventListener(egret.Event.ACTIVATE, this.onActive, this);
        stage.addEventListener(egret.Event.DEACTIVATE, this.onDeactive, this);
    }
    SoundManager.boot = boot;
    function onActive() {
        if (musicStatus)
            playMusic(currentMusicPath);
    }
    SoundManager.onActive = onActive;
    function onDeactive() {
        stopMusic();
        stopSound();
    }
    SoundManager.onDeactive = onDeactive;
    /**
     * 设置背景音乐的开关
     */
    function setMusicStatus(value) {
        if (value) {
            if (!currentMusicPath) {
                playMusic(currentMusicPath);
            }
        }
        else {
            stopMusic();
        }
        musicStatus = value;
    }
    SoundManager.setMusicStatus = setMusicStatus;
    /**
     * 设置音效开关
     */
    function setSoundStatus(value) {
        if (value == false) {
            stopSound();
        }
        soundStatus = value;
    }
    SoundManager.setSoundStatus = setSoundStatus;
    /**
     * 播放背景音乐
     */
    function playMusic(path) {
        currentMusicPath = path;
        if (!path || musicStatus == false) {
            stopMusic();
            return;
        }
        if (path === currentMusicPath) {
            if (currentMusic) {
                //要播放的背景音乐和当前正在播放的背景音乐一样
                return;
            }
            else {
                currentMusic = getSound(path, 0 /* MUSIC */);
                currentMusic.play();
            }
        }
        else {
            if (currentMusic)
                currentMusic.stop();
            currentMusic = getSound(path, 0 /* MUSIC */);
            currentMusic.play();
        }
    }
    SoundManager.playMusic = playMusic;
    /**
     * 停止背景音乐
     */
    function stopMusic() {
        if (currentMusic)
            currentMusic.stop();
        currentMusic = null;
    }
    SoundManager.stopMusic = stopMusic;
    /**
     * 播放音效
     */
    function playSound(path) {
        if (soundStatus == false) {
            return;
        }
        var sound = getSound(path, 1 /* SOUND */);
        sound.play();
        playingSounds.push(sound);
    }
    SoundManager.playSound = playSound;
    /**
     * 停止音乐
     */
    function stopSound() {
        while (playingSounds.length) {
            playingSounds.pop().stop();
        }
    }
    SoundManager.stopSound = stopSound;
    function putSound(sound) {
        var soundList = soundCache[sound.path];
        if (soundList) {
            soundList.push(sound);
        }
        else {
            soundCache[sound.path] = [sound];
        }
        var idx = playingSounds.indexOf(sound);
        if (idx !== -1) {
            playingSounds.splice(idx, 1);
        }
    }
    function getSound(path, type) {
        var soundList = soundCache[path];
        if (soundList) {
            return soundList.shift();
        }
        else {
            return new BaseSound(path, type);
        }
    }
})(SoundManager || (SoundManager = {}));
