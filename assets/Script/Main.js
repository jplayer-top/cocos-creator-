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
        player: {
            default: null,
            type: cc.Node,
        },
        time: {
            default: null,
            type: cc.Label
        },
        getCount: {
            default: null,
            type: cc.Label
        },
        dici: {
            default: null,
            type: cc.Prefab
        },
        bgA: {
            default: null,
            url: cc.AudioClip
        },
        jumpA: {
            default: null,
            url: cc.AudioClip
        },
        isMove: false,
        dici_duration: 200,
        diciCount: 0,
        timeCount: 60
    },
    createDici: function () {
        this.diciCount += 1;
        var newDici = cc.instantiate(this.dici);
        this.node.addChild(newDici);
        var randD = cc.random0To1();
        if (randD >= 0.5) {
            newDici.rotationY = 0;
        } else {
            newDici.rotationY = 180;
        }
        newDici.setPosition(this.diciPosition(randD));

    },
    diciPosition: function (randD) {
        var randX = 0;
        var randY = 0;

        if (randD >= 0.5) {
            randX = (this.node.width / 2 - 100);
        } else {
            randX = -(this.node.width / 2 - 100);
        }

        if (this.diciCount <= 8) {
            randY = (this.node.height / 2 - 100) - (this.dici_duration * (this.diciCount + 1));
        } else {
            randY = (this.node.height / 2 - 100) - (this.dici_duration * 9);
        }

        return cc.p(randX, randY);
    },
    //向右方移动
    playerMoverRight: function () {

        var goRight = cc.moveTo(0.2, cc.p((this.node.width / 2 - 100), this.player.getPositionY()));
        var goR1 = cc.moveTo(0.1, cc.p((this.node.width / 2 - 200), this.player.getPositionY()))
        var goR2 = cc.moveTo(0.1, cc.p((this.node.width / 2 - 100), this.player.getPositionY()));
        var sque = cc.sequence(goR1, goR2);
        if (this.player.rotationY === 180) {
            this.player.runAction(sque);
        } else {
            this.player.runAction(goRight);
        }
        this.player.rotationY = 180;
        this.player.runAction(goRight);
    },
    //向左方移动
    playerMoverLeft: function () {
        var goLeft = cc.moveTo(0.2, cc.p(-(this.node.width / 2 - 100), this.player.getPositionY()));
        var goL1 = cc.moveTo(0.1, cc.p(-(this.node.width / 2 - 200), this.player.getPositionY()))
        var goL2 = cc.moveTo(0.1, cc.p(-(this.node.width / 2 - 100), this.player.getPositionY()));
        var sque = cc.sequence(goL1, goL2);
        if (this.player.rotationY === 0) {
            this.player.runAction(sque);
        } else {
            this.player.runAction(goLeft);
        }
        this.player.rotationY = 0;
        this.player.runAction(goLeft);
    },
    onLoad() {
        var node = this.node;
        var self = this;
        this.diciCount = 0;
        self.timeCount = 60;
        cc.audioEngine.play(this.bgA, true);
        this.schedule(function () {
            self.timeCount--;
            console.log(self.timeCount);

            self.time.string = "倒计时：" + self.timeCount;
            if (self.timeCount <= 0) {
                cc.director.loadScene("OverScene");
            }
        }, 1);
        node.on(cc.Node.EventType.TOUCH_START, function (event) {
            var x = event.touch._point.x;
            cc.audioEngine.playMusic(cc.url.raw("Texture/jump.wav"))
            if (x > 320) {
                self.playerMoverRight();
            } else {
                self.playerMoverLeft();

            }
            let childs = self.node.children;
            let count = 0;
            for (let index = 0; index < childs.length; index++) {
                let child = childs[index];
                if (child.name == "dici ") {
                    let action = cc.moveBy(0.2, cc.p(0, self.dici_duration));
                    child.runAction(action);
                    if (child.getPositionY() - self.player.getPositionY() > 0) {
                        count++;
                    }
                }
            }
            self.getCount.string = "得分：" + count;
            cc.sys.localStorage.setItem("count", count);
            self.createDici();

        });

        for (let index = 0; index < 8; index++) {
            self.createDici();
        }
    },

});
