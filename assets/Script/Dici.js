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
        overA: {
            default: null,
            url: cc.AudioClip
        },
    },

    onLoad: function () {
        // this.setInputControl();
        // let action = cc.moveBy(0.2, cc.p(0, 140));
        // this.node.runAction(action);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },
    /**
               * 当碰撞产生的时候调用
               * @param  {Collider} other 产生碰撞的另一个碰撞组件
               * @param  {Collider} self  产生碰撞的自身的碰撞组件
               */
    onCollisionEnter: function (other, self) {
        cc.log('on collision enter');
        cc.audioEngine.play(this.overA, false)
        console.log(this.node);
        cc.director.loadScene("OverScene");

    },
    /**
     * 当碰撞产生后，碰撞结束前的情况下，每次计算碰撞结果后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionStay: function (other, self) {
        cc.log('on collision stay');
    },
    /**
     * 当碰撞结束后调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionExit: function (other, self) {
        cc.log('on collision exit');
    },
});
