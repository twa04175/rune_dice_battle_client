
import { _decorator, Component, Node, game, Prefab, instantiate, Sprite } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = RuneWordsPool
 * DateTime = Fri Apr 22 2022 15:52:56 GMT+0900 (대한민국 표준시)
 * Author = twa04175
 * FileBasename = RuneWordsPool.ts
 * FileBasenameNoExtension = RuneWordsPool
 * URL = db://assets/02.scripts/RuneWordsPool.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

enum RUNE{
    FIRE,
    ICE,
    EARTH,
    ARROW,
    GIFT,
    HAIL,
    JOY,
    MONEY,
    NIDDLE,
    PET,
    RUN,
    SPEAK,
    SUN,
    TORCH,
    STONE,
    SPEAR,
    DAY,
}

@ccclass('RuneWordsPool')
export class RuneWordsPool extends Component {
    // [1]
    // dummy = '';
    @property({type:Prefab})
    runePref:Prefab;

    runePool:Node[][] = [];

    start () {
        for(let i = 0; i< 16; i++) {
            this.runePool.push([]);
            let rune = instantiate(this.runePref);
            let runeSp = rune.getComponent(Sprite);

            runeSp.spriteFrame;

            this.runePool[i].push(rune);
        }
        game.addPersistRootNode(this.node);
    }

    setRuneNode() {

    }

    getRuneNode(rune:RUNE, color:String) {


    }

    returnRuneNode() {

    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
