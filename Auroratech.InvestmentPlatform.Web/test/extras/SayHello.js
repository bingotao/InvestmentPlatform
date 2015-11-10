define(["dojo/_base/declare"], function (declare) {
    return declare(null, {
        content: '尚未初始化',
        eMsg: '参数有误！',
        constructor: function (content) {
            this.content = content ? content : this.content;
        },
        say: function () {
            console.log(this.content);
        },
        setContent: function (content) {
            if (content) {
                this.content = content;
            } else {
                console.error(this.eMsg);
            }
        }
    });
});