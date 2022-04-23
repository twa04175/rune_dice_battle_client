
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Starts
 * DateTime = Sat Apr 23 2022 20:29:01 GMT+0900 (대한민국 표준시)
 * Author = twa04175
 * FileBasename = Starts.ts
 * FileBasenameNoExtension = Starts
 * URL = db://assets/02.scripts/01.ui/Starts.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('Stars')
export class Stars extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        this.schedule(()=>{
            this.changeStar();
        },1);
    }

    changeStar(){
        for(let i = 0; i< this.node.children.length; i++) {
            if(Math.random() < 0.5) {
                this.node.children[i].active = true;
            }else{

                this.node.children[i].active = false;
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
