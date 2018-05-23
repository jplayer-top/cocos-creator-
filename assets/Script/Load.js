// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        foo: {
            default: null,        // The default value will be used only when the component attaching
            type: cc.Node, // optional, default is typeof default
        },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        var scale = cc.scaleTo(0.3, 0.8, 0.9)
        var reserve = cc.scaleTo(0.3, 1, 1)
        var sequence = cc.sequence(scale, reserve);
        this.foo.runAction(cc.repeatForever(sequence));
    },
    start() {
        this.foo.on(cc.Node.EventType.TOUCH_START, function (event) {
            cc.director.loadScene("MainScene");
        });
    },

    // update (dt) {},
});
