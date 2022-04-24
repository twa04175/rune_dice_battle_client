
import { _decorator, Component, Node, tween, Vec3, find } from 'cc';
import {DICE_RANK, ROLL, RuneDice} from "db://assets/02.scripts/04.battle/RuneDice";
import { RUNE } from '../04.battle/Rune';
import {BattleManager} from "db://assets/02.scripts/04.battle/BattleManager";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = DicePanel
 * DateTime = Sat Apr 23 2022 19:48:50 GMT+0900 (대한민국 표준시)
 * Author = twa04175
 * FileBasename = DicePanel.ts
 * FileBasenameNoExtension = DicePanel
 * URL = db://assets/02.scripts/01.ui/DicePanel.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('DicePanel')
export class DicePanel extends Component {

    runes:RUNE[] = [];

    @property(Node)
    refreshBtn:Node = null;

    battleManager:BattleManager = null;
    isRefreshMode:boolean = false;

    start () {
        this.battleManager = find('Root/BattleManager').getComponent(BattleManager);
    }

    setRunes(rune:RUNE){
        this.runes.push(rune);

        if(this.runes.length === 6) {
            this.onRefreshMode();
        }
    }

    onRefreshMode(){
        console.log('DicePanel.ts:onRefreshMode:41 -> onRefreshMode');
        this.isRefreshMode = true;
        tween(this.refreshBtn)
            .by(0.5,
                {position: new Vec3(120,0,0)},
                {easing: 'smooth'})
            .start();
    }

    offRefreshMode(callback){
        this.isRefreshMode = false;
        tween(this.refreshBtn)
            .by(0.3,
                { position: new Vec3(-120,0,0)},
                {easing: 'smooth', onComplete:callback})
            .start();
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    refreshDice() {
        if(this.battleManager.getActionPoint() <= 0) {
            return;
        }

        this.battleManager.setActionPoint(this.battleManager.getActionPoint()-1);

        let dice:RuneDice[] = [];
        let dices = this.node.getChildByName('dices');

        for(let i = 0; i<6; i++) {
            let runeDice:RuneDice = dices.children[i].getComponent(RuneDice);
            if(runeDice.rollState === ROLL.END){
                dice.push(runeDice);
            }else {
                return;
            }
        }

        this.runes.length = 0;
        this.offRefreshMode(
            ()=>{
                this.clearDice(dice);
            }
        );
    }

    startRefresh(){
        let dice:RuneDice[] = [];
        let dices = this.node.getChildByName('dices');

        for(let i = 0; i<6; i++) {
            let runeDice:RuneDice = dices.children[i].getComponent(RuneDice);
            dice.push(runeDice);
        }

        if(this.isRefreshMode === true) {
            this.offRefreshMode(
                ()=>{
                    this.clearDice(dice);
                }
            );
        } else {
            this.clearDice(dice);
        }

        this.runes.length = 0;
    }

    clearDice(dice){
        tween(this.node)
            .by(1, { position: new Vec3(0,-130,0)}, {
                easing: 'smooth', onComplete:()=>{
                    console.log('DicePanel.ts:onComplete:50 ->',dice.length);
                    for(let i = 0; i<dice.length; i++) {
                        dice[i].clearDice(DICE_RANK.NORMAL);
                    }

                    tween(this.node)
                        .by(1, { position: new Vec3(0,130,0)}, {
                            easing: 'smooth'}).start();
                }}).start();
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
