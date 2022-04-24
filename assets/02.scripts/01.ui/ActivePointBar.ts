
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = activePointBar
 * DateTime = Sun Apr 24 2022 18:20:44 GMT+0900 (대한민국 표준시)
 * Author = twa04175
 * FileBasename = activePointBar.ts
 * FileBasenameNoExtension = activePointBar
 * URL = db://assets/02.scripts/01.ui/activePointBar.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('ActivePointBar')
export class ActivePointBar extends Component {

    fill: Node[] = null;

    start () {
        this.fill = this.node.children[0].children;
    }

    setActivePoint(point:number){
        switch (point) {
            case 0:
                this.fill[0].active = true;
                break;
            case 1:
                this.fill[0].active = true;
                break;
            case 2:
                this.fill[0].active = true;
                break;
            case 3:
                this.fill[0].active = true;
                break;
        }

        for(let i = 0; i<this.fill.length; i++) {
            if(i <= point) {
                this.fill[i].active =true;
            }else {
                this.fill[i].active =false;
            }
        }
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
