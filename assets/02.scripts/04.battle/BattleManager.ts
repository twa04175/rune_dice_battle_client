import {_decorator, Component, director} from 'cc';
import {ELEMENTAL_TYPE} from "db://assets/02.scripts/04.battle/RuneDice";
import {MagicBook} from "db://assets/02.scripts/04.battle/MagicBook";

const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = BattleManager
 * DateTime = Thu Apr 21 2022 20:55:20 GMT+0900 (대한민국 표준시)
 * Author = twa04175
 * FileBasename = BattleManager.ts
 * FileBasenameNoExtension = BattleManager
 * URL = db://assets/02.scripts/battle/BattleManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('BattleManager')
export class BattleManager extends Component {

    @property({type: MagicBook})
    public magicPanel:MagicBook = null;

    start () {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    backToLobby(){
        director.loadScene("01.Lobby");
    }

    openFireBook(){
        this.magicPanel.activeBook(ELEMENTAL_TYPE.FIRE);
    }

    openIceBook(){
        this.magicPanel.activeBook(ELEMENTAL_TYPE.ICE);
    }

    openEarthBook(){
        this.magicPanel.activeBook(ELEMENTAL_TYPE.EARTH);
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
