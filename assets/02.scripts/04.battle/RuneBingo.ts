
import { _decorator, Component, Node } from 'cc';
import { RUNE } from './Rune';
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
    rune:RUNE,
    active:boolean,
}

@ccclass('RuneBingo')
export class RuneBingo extends Component {

    bingo:BingoNode[][] = null;

    start () {
        for(let i = 0; i<this.bingo.length; i++) {
            this.bingo[i] = new BingoNode[3];
            for(let j = 0; j<this.bingo.length; j++) {
                this.bingo[i][j] = new BingoNode();
            }
        }

        this.initRuneBingo();
    }

    setRune(x:number, y:number){

    }

    checkCompleteLine() {

    }

    initRuneBingo(){
        for(let i = 0; i< 3; i++) {
            for(let j = 0; i<3 ;j++) {
                let randomRune:RUNE = Math.floor(Math.random()* RUNE._LENGTH);
                this.bingo[i][j].rune = randomRune;
                this.bingo[i][j].active = false;
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
