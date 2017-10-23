/**
 * 游戏中通用的component
 *
 * -添加了对象的生命周期
 * -添加了点击事件
 * -添加了舞台事件
 *
 * Created by hh on 2017/10/10 0010.
 */
class ExComponent extends eui.Component implements ILifeCycle{
    protected _dataOk = false;
    protected _viewOk = false;
    protected _data:any;

    constructor(data?:any) {
        super();
        if (data !== undefined) {
            this.setData(data);
        }
    }

    $onAddToStage(stage: egret.Stage, nestLevel: number) {
        super.$onAddToStage(stage, nestLevel);
        this.addToStage();
    }

    $onRemoveFromStage() {
        super.$onRemoveFromStage();
        this.removeFromStage();
    }

    protected childrenCreated() {
        super.childrenCreated();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.$onClick,this);
        this.init();
        this._viewOk = true;
        if (this._dataOk) {
            this.active();
        }
    }

    protected $onClick(e:egret.TouchEvent) {
        this.onClick(e.target.name);
    }

    /**
     * 点击事件
     * @param name
     */
    protected onClick(name:string) {

    }

    public setData(data:any) {
        this._data = data;
        this._dataOk = true;
        if (this._viewOk) {
            this.active();
        }
    }

    public setPos(x:number, y:number) {
        this.x = x;
        this.y = y;
    }

    public get data() {
        return this._data;
    }

    /**
     * 界面初始化完成
     */
    public init() {

    }

    /**
     * 对象激活
     * 可触发多次
     */
    public active() {

    }

    /**
     * 添加到舞台
     */
    public addToStage() {

    }

    /**
     * 从舞台上移除
     */
    public removeFromStage() {

    }

    /**
     * 对失眠(处理待回收状态)
     */
    public disActive() {

    }

    /**
     * 释放
     */
    public dispose() {
        this.disActive();
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.$onClick, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }
}