/**
 * Created by hh on 2017/10/10 0010.
 */
class ExComponent extends eui.Component implements ILifeCycle{
    protected _dataOk = false;
    protected _viewOk = false;
    protected _data:any;

    /** 打开特效
     * 0:没有动画
     * 1:中间弹出
     * 2:上进
     * 3:下进
     * 4:左进
     * 5:右进
     */
    public effectType: number = 0;

    constructor(data?:any) {
        super();
        if (data !== undefined) {
            this.setData(data);
        }
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

    private $onClick(e:egret.TouchEvent) {
        let name = e.target.name;
        if (name == "closeBtn" || name == "close") {
            Pop.close(this);
        } else {
            this.onClick(name);
        }
    }

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

    public init() {

    }

    public active() {

    }

    public disActive() {

    }

    public dispose() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.$onClick,this);
    }

    // $onAddToStage(stage: egret.Stage, nestLevel: number) {
    //     super.$onAddToStage(stage, nestLevel);
    //     this.addToStage();
    // }
    //
    // $onRemoveFromStage() {
    //     super.$onRemoveFromStage();
    //     this.removeFromStage();
    // }
}