
import { _decorator, Component, Node, tween, Vec3, Label } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = StatePanel
 * DateTime = Sun Apr 24 2022 18:32:21 GMT+0900 (대한민국 표준시)
 * Author = twa04175
 * FileBasename = StatePanel.ts
 * FileBasenameNoExtension = StatePanel
 * URL = db://assets/02.scripts/01.ui/StatePanel.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('StatePanel')
export class StatePanel extends Component {

    timerNode:Node = null;
    timerLabel:Label = null;
    stateLabel:Label = null;

    start(){
        this.timerLabel = this.node.children[0].children[0].getComponent(Label);
        this.timerNode = this.node.children[0];
        this.stateLabel = this.node.children[1].children[0].getComponent(Label);
    }

    setStateText(text:string) {
        tween(this.node).by(0.3, {position:new Vec3(0,70,0)}, {easing:'smooth',
            onComplete: () => {
                this.stateLabel.string = text;
                tween(this.node).by(0.3, {position:new Vec3(0,-70,0)}, {easing:'smooth',}).start();
            }}).start();
    }

    onTimer(callback) {
        tween(this.timerNode).by(0.5, {position:new Vec3(0,-40,0)}, {easing:'smooth',
            onComplete:()=>{
                if(typeof(callback) ==='function') {
                    callback();
                }
            }}).start();
    }

    offTimer(callback){
        tween(this.timerNode).by(0.5, {position:new Vec3(0,40,0)}, {easing:'smooth', onComplete:()=>{
                if(typeof(callback) ==='function') {
                    callback();
                }
            }}).start();
    }

    setTimerText(text:string)   {
        this.timerLabel.string = text;
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */
