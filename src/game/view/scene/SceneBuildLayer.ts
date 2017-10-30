class SceneBuildLayer extends egret.DisplayObjectContainer {
    private inner:number;
    private dir:string;
    public constructor(dir:string, inner:number) {
        super();
        this.inner = inner;
        this.dir = dir;
    }
}