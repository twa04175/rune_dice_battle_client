import {_decorator, Component, director, input, Input, Prefab, instantiate, Node, Vec3} from 'cc';
import {ELEMENTAL_TYPE} from "db://assets/02.scripts/04.battle/RuneDice";
import {MagicBook} from "db://assets/02.scripts/04.battle/MagicBook";
import {RUNE} from "db://assets/02.scripts/04.battle/Rune";
import {UIManager} from "db://assets/02.scripts/01.ui/UIManager";

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

enum BattleState {
    WAIT,
    PICK,
    BATTLE,
}

@ccclass('BattleManager')
export class BattleManager extends Component {

    @property({type: Node})
    public effectArea:Node = null;

    @property({type: MagicBook})
    public magicPanel:MagicBook = null;

    battleState:BattleState = BattleState.WAIT;

    @property({type: Node})
    mouseRune:Node = null;

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

    //주사위에 있는 룬을 선택한 상태
    onRunePickMode(rune:RUNE, position:Vec3) {
        this.deleteRune();
        this.createRune(rune, position);

        input.on(Input.EventType.MOUSE_MOVE, (r) => {
            if(this.mouseRune !== null) {
                this.mouseRune.setPosition(new Vec3(r.getUILocationX(),r.getUILocationY()));
            }
        }, this.node);

        input.on(Input.EventType.MOUSE_DOWN, (r) => {
            this.deleteRune();
            input.off(Input.EventType.MOUSE_MOVE);
            input.off(Input.EventType.MOUSE_DOWN);
            console.log('click ->',rune,':', r);
        }, this.node);

        this.battleState = BattleState.PICK;
        console.log('BattleManager.ts:onRunePickMode:78 ->',this.mouseRune);
    }

    createRune(rune:RUNE, position) {
        console.log('BattleManager.ts:createRune:94 ->',this.mouseRune);
        this.mouseRune.active = true;
        this.mouseRune.setPosition(position);
        this.mouseRune.children[rune].active = true;
    }

    deleteRune(){
        for(let i = 0; i<this.mouseRune.children.length; i++) {
            this.mouseRune.children[i].active = false;
        }
        this.mouseRune.active = false;
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
