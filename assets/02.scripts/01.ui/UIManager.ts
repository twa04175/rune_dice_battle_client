
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = UIManager
 * DateTime = Thu Apr 21 2022 20:55:27 GMT+0900 (대한민국 표준시)
 * Author = twa04175
 * FileBasename = UIManager.ts
 * FileBasenameNoExtension = UIManager
 * URL = db://assets/02.scripts/ui/UIManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('UIManager')
export class UIManager extends Component {

    start () {
        // [3]
    }

    update (deltaTime: number) {
        // [4]
    }

    mouseTrace () {

    }

    setOnClickOnce(event:Function){
        this.node.on('mousedown', event);
    }

    deleteClickEvent(event:Function) {
        this.node.off('mousedown', event);
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
