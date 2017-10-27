var TextUtil;
(function (TextUtil) {
    var textParse = new egret.HtmlTextParser();
    function color(text, content, replace, color) {
        if (text) {
            var html = "<font color=" + color + ">" + replace + "</font>";
            html = StringUtil.format(content, html);
            text.textFlow = textParse.parser(html);
        }
    }
    TextUtil.color = color;
})(TextUtil || (TextUtil = {}));
