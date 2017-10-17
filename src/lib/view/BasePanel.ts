class BasePanel extends ExComponent {
    /** 层级 */
    public layer: string = "layer";

    /** 互斥 */
    public mutex: boolean = false;

    /** 灰底 */
    public modal: boolean = false;

    /** 灰底ALPHA */
    public modalAlpha: number = 0.6;

    private existMode = 0;

    public constructor(data?:any, option?:any) {
        super(data);
        this.effectType = 1;
        this.modal = true;
    }
}