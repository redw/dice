/**
 * 游戏中弹出面板
 *
 * Created by hh on 2017/10/19 0010.
 */
class BasePanel extends ExComponent {
    /** 层级 */
    public layer: string = "layer";

    /** 互斥 */
    public mutex: boolean = false;

    /** 灰底 */
    public modal: boolean = false;

    /** 灰底ALPHA */
    public modalAlpha: number = 0.6;

    /** 存在模式 0:永远存在 1:关闭即销毁 */
    private existMode = 0;

    /** 打开特效 0:没有动画 1:中间弹出 2:上进 3:下进 4:左进 5:右进 */
    public effectType: number = 0;

    public constructor(data?:any, option?:any) {
        super(data);
        this.effectType = Util.getPropValue(option, "effect", 1);
        this.modal = true;
    }

    protected $onClick(e:egret.TouchEvent) {
        let name = e.target.name;
        if (name == "closeBtn" || name == "close") {
            Pop.close(this);
        } else {
            this.onClick(name);
        }
    }
}