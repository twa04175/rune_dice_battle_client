
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Rune
 * DateTime = Sat Apr 23 2022 11:04:13 GMT+0900 (대한민국 표준시)
 * Author = twa04175
 * FileBasename = Rune.ts
 * FileBasenameNoExtension = Rune
 * URL = db://assets/02.scripts/04.battle/Rune.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

export enum RUNE{
    ARROW,
    DAY,
    EARTH,
    FIRE,
    GIFT,
    HAIL,
    ICE,
    MONEY,
    NIDDLE,
    PET,
    RUN,
    SPEAK,
    SPEAR,
    STONE,
    SUN,
    TORCH,
    JOY,
    _LENGTH,
}

@ccclass('Rune')
export class Rune extends Component {

    current:RUNE = null;

    start () {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    clearRune(){
        if(this.current !== null) {
            this.node.children[this.current].active = false;
        }
        this.current = null;
    }

    setRune(rune:RUNE){
        if(this.current !== null) {
            this.node.children[this.current].active = false;
        }

        this.current = rune;
        this.node.children[rune].active = true;
    }

    getRune() {
        return this.current;
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
