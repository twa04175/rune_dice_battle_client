
import { _decorator, Component, Node } from 'cc';
import {ELEMENTAL_TYPE} from "db://assets/02.scripts/04.battle/RuneDice";
import {UIManager} from "db://assets/02.scripts/01.ui/UIManager";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = MagicBook
 * DateTime = Sat Apr 23 2022 14:59:35 GMT+0900 (대한민국 표준시)
 * Author = twa04175
 * FileBasename = MagicBook.ts
 * FileBasenameNoExtension = MagicBook
 * URL = db://assets/02.scripts/04.battle/MagicBook.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('MagicBook')
export class MagicBook extends Component {

    currentBook:Node = null;

    @property({type:UIManager})
    uiManager:UIManager = null;

    start () {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    activeBook(element:ELEMENTAL_TYPE) {
        console.log('MagicBook.ts:activeBook:30 ->',);
        this.node.active = true;

        if(this.currentBook !== null) {
            this.currentBook.active = false;
        }

        console.log('MagicBook.ts:activeBook:39 ->',  this.node);
        console.log('MagicBook.ts:activeBook:39 ->',  this.node.getChildByName('book'));
        this.currentBook = this.node.children[0].children[element];
        this.currentBook.active = true;

        this.uiManager.setOnClickOnce(this.disableBook);
    }

    disableBook() {
        this.node.active = false;
        this.uiManager.deleteClickEvent(this.disableBook);
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
