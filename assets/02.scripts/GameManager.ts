
import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GameManager
 * DateTime = Thu Apr 21 2022 20:55:44 GMT+0900 (대한민국 표준시)
 * Author = twa04175
 * FileBasename = GameManager.ts
 * FileBasenameNoExtension = GameManager
 * URL = db://assets/02.scripts/GameManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

enum GAMESTATE {
    LOBBY,
    WAIT,
    BATTLE,
}

@ccclass('GameManager')
export class GameManager extends Component {

    public gameState:GAMESTATE = GAMESTATE.LOBBY;

    start () {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    startGame(){
        this.gameState = GAMESTATE.MAP;
        director.loadScene("02.InGame");
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
