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
var ButtonStatus;
(function (ButtonStatus) {
    ButtonStatus.UP = "up";
    ButtonStatus.DOWN = "down";
    ButtonStatus.DISABLED = "disabled";
})(ButtonStatus || (ButtonStatus = {}));
var BaseButton = (function (_super) {
    __extends(BaseButton, _super);
    function BaseButton() {
        var _this = _super.call(this) || this;
        _this.isTouch = false;
        _this.canTouch = true;
        _this._needScaleAnim = true;
        _this._toScale = 0.9;
        _this._sound = null;
        _this.bg = null;
        _this.icon = null;
        _this._bgSource = "";
        _this._iconSource = "";
        _this._status = ButtonStatus.UP;
        _this._normalBgSource = "";
        _this._normalIconSource = "";
        _this._touchBgSource = "";
        _this._touchIconSource = "";
        _this._disableBgSource = "";
        _this._disableIconSource = "";
        _this.init();
        return _this;
    }
    BaseButton.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
        if (instance == this.bg) {
            this.bg.source = this._bgSource;
            this._normalBgSource = this._bgSource;
            this._touchBgSource = this.getImageByStatus(this._normalBgSource, "touch");
            this._disableBgSource = this.getImageByStatus(this._normalBgSource, "disable");
            if (RES.hasRes(this._touchBgSource) || this._toScale == 1) {
                this._needScaleAnim = false;
            }
        }
        if (instance == this.icon) {
            this.icon.source = this._iconSource;
            this._normalIconSource = this._iconSource;
            this._touchIconSource = this.getImageByStatus(this._normalIconSource, "touch");
            this._disableIconSource = this.getImageByStatus(this._normalIconSource, "disable");
            if (RES.hasRes(this._touchIconSource) || this._toScale == 1) {
                this._needScaleAnim = false;
            }
        }
    };
    BaseButton.prototype.getImageByStatus = function (normalSource, prefix) {
        if (normalSource) {
            var path = normalSource.split(".");
            if (path.length == 1) {
                var names = path[0].split("_");
                var nameLen = names.length;
                if (nameLen > 1) {
                    names.splice(nameLen - 1, 0, prefix);
                    return names.join("_");
                }
                else {
                    return normalSource;
                }
            }
            else if (path.length == 2) {
                var names = path[1].split("_");
                var nameLen = names.length;
                if (nameLen > 1) {
                    names.splice(nameLen - 1, 0, prefix);
                    var path2 = [path[0], names.join("_")];
                    return path2.join(".");
                }
                else {
                    return normalSource;
                }
            }
            else {
                return normalSource;
            }
        }
        else {
            return "";
        }
    };
    Object.defineProperty(BaseButton.prototype, "bgSource", {
        get: function () {
            return this._bgSource;
        },
        set: function (value) {
            if (value === this._bgSource) {
                return;
            }
            this._bgSource = value;
            if (this.bg) {
                this.bg.source = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseButton.prototype, "iconSource", {
        get: function () {
            return this._iconSource;
        },
        set: function (value) {
            if (value === this._iconSource) {
                return;
            }
            this._iconSource = value;
            if (this.icon) {
                this.icon.source = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseButton.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (value) {
            if (value === this._status) {
                return;
            }
            this._status = value;
            this.statusChange(value);
        },
        enumerable: true,
        configurable: true
    });
    BaseButton.prototype.statusChange = function (value) {
        if (value === ButtonStatus.DOWN) {
            this.canTouch = true;
            if (this.bg && RES.hasRes(this._touchBgSource)) {
                this.bg.source = this._touchBgSource;
            }
            if (this.icon && RES.hasRes(this._touchIconSource)) {
                this.icon.source = this._touchIconSource;
            }
        }
        else if (value === ButtonStatus.DISABLED) {
            this.canTouch = false;
            if (this.bg && RES.hasRes(this._disableBgSource)) {
                this.bg.source = this._disableBgSource;
            }
            if (this.icon && RES.hasRes(this._disableIconSource)) {
                this.icon.source = this._disableIconSource;
            }
        }
        else {
            this.canTouch = true;
            if (this.bg && RES.hasRes(this._normalBgSource)) {
                this.bg.source = this._normalBgSource;
            }
            if (this.icon && RES.hasRes(this._normalIconSource)) {
                this.icon.source = this._normalIconSource;
            }
        }
    };
    Object.defineProperty(BaseButton.prototype, "toScale", {
        get: function () {
            return this._toScale;
        },
        set: function (value) {
            if (value === this._toScale) {
                return;
            }
            this._toScale = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseButton.prototype, "sound", {
        get: function () {
            return this._sound;
        },
        set: function (value) {
            if (value === this._sound) {
                return;
            }
            this._sound = value;
        },
        enumerable: true,
        configurable: true
    });
    BaseButton.prototype.init = function () {
        this.touchEnabled = true;
        this.touchChildren = false;
        this.status = ButtonStatus.UP;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchCancel, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
    };
    BaseButton.prototype.onTouchBegin = function (event) {
        if (this.isTouch || !this.canTouch) {
            return;
        }
        this.isTouch = true;
        this.status = ButtonStatus.DOWN;
        if (this._needScaleAnim) {
            egret.Tween.get(this).to({ scaleX: this._toScale, scaleY: this._toScale }, 50);
        }
    };
    BaseButton.prototype.onTouchCancel = function (event) {
        if (!this.isTouch) {
            return;
        }
        this.status = ButtonStatus.UP;
        if (this._needScaleAnim) {
            egret.Tween.get(this).to({ scaleX: 1.0, scaleY: 1.0 }, 50);
        }
        this.isTouch = false;
    };
    BaseButton.prototype.onTouchEnd = function (event) {
        if (!this.isTouch) {
            return;
        }
        this.onTouchCancel(event);
        this.dispatchEventWith(egret.TouchEvent.TOUCH_TAP);
    };
    BaseButton.prototype.dispose = function () {
        this.status = ButtonStatus.UP;
        egret.Tween.removeTweens(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchCancel, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return BaseButton;
}(eui.Component));
__reflect(BaseButton.prototype, "BaseButton");
//# sourceMappingURL=BaseButton.js.map