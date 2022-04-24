
import { _decorator, Component, Node } from 'cc';
import { RUNE } from './Rune';
import {RuneNode} from "db://assets/02.scripts/04.battle/RuneNode";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = RuneBingo
 * DateTime = Sun Apr 24 2022 21:02:48 GMT+0900 (대한민국 표준시)
 * Author = twa04175
 * FileBasename = RuneBingo.ts
 * FileBasenameNoExtension = RuneBingo
 * URL = db://assets/02.scripts/04.battle/RuneBingo.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

class BingoNode{
    rune:RUNE = null;
    active:boolean = false;
}

@ccclass('RuneBingo')
export class RuneBingo extends Component {

    BINGO_LENGTH = 3;

    bingo:BingoNode[][] = [];
    runeNodes:RuneNode[] = [];

    start () {
        let runeNode = this.node.children[0].children;
        for(let i = 0; i<runeNode.length; i++) {
            this.runeNodes.push(runeNode[i].getComponent(RuneNode));
        }

        for(let i = 0; i<this.BINGO_LENGTH; i++) {
            this.bingo.push([]);
            for(let j = 0; j<this.BINGO_LENGTH; j++) {
                this.bingo[i].push(new BingoNode());
            }
        }
        console.log('RuneBingo.ts:start:42 ->',this.runeNodes);
        this.initRuneBingo();
    }

    setRune(x:number, y:number){

    }

    checkCompleteLine() {

    }

    initRuneBingo(){
        for(let i = 0; i< 3; i++) {
            for(let j = 0; j<3 ;j++) {
                let randomRune:RUNE = Math.floor(Math.random()* RUNE._LENGTH);
                console.log('RuneBingo.ts:initRuneBingo:60 ->', this.bingo[i]);
                console.log('RuneBingo.ts:initRuneBingo:60 ->', this.bingo[i][j]);
                this.bingo[i][j].rune = randomRune;
                this.bingo[i][j].active = false;
                console.log('RuneBingo.ts:initRuneBingo:60 ->',i*3+j);
                this.runeNodes[i*3+j].setCurrentRune(randomRune);
            }
        }
    }

    completeBingo(){

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
