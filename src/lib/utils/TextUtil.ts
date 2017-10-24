module TextUtil {
    let textParse = new egret.HtmlTextParser();

    export function color(text:eui.Label, content:string, replace:string, color:number|string) {
        if (text) {
            let html = "<font color=" + color + ">" + replace + "</font>";
            html = StringUtil.format(content, html);
            text.textFlow = textParse.parser(html);
        }
    }
}