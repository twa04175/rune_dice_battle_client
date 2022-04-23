
import { _decorator, Component, Node, Sprite, Enum, tween, Vec3 } from 'cc';
import {RUNE, Rune } from './Rune';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = RuneDice
 * DateTime = Fri Apr 22 2022 14:30:43 GMT+0900 (대한민국 표준시)
 * Author = twa04175
 * FileBasename = RuneDice.ts
 * FileBasenameNoExtension = RuneDice
 * URL = db://assets/02.scripts/04.battle/RuneDice.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

enum DICE_RANK{
    NORMAL,
    EPIC,
    LEGEND,
    MYSTIC
}

export enum ELEMENTAL_TYPE{
    FIRE,
    ICE,
    EARTH,
}

enum ROLL{
    NOT,
    ING,
    END,
}

@ccclass('RuneDice')
export class RuneDice extends Component {

    @property ({type:Enum(DICE_RANK)})
    public rank:DICE_RANK = DICE_RANK.NORMAL;

    MAX_ROLLING:number = 20;
    MIN_ROLLING:number = 30;

    rollState:ROLL = ROLL.NOT;

    pick:RUNE = null;

    anchor:Vec3 = null;

    start () {
        // 타입과 랭크에 따른 주사위 스프라이트 변환
        this.setType(this.rank);
        this.anchor = this.node.position;
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    setType (rank:DICE_RANK) {

    }

    onClick() {
        switch (this.rollState) {
            case ROLL.NOT:
                this.rolling();
                break;
            case ROLL.ING:
                return
            case ROLL.END:
                console.log('RuneDice.ts:onClick:71 -> pick RONE', this.pick);
                break;
        }
    }

    rolling() {
        this.rollState = ROLL.ING;
        console.log('RuneDice.ts:rolling:35 -> rolling Dice',);

        let runeNode = this.node.getChildByName('rune_words');
        let rune = runeNode.getComponent(Rune);

        let changeSprite = (cnt:number, rune:Rune, speed:number) => {
            console.log('RuneDice.ts:changeSprite:87 ->',cnt, "  rune:",rune.getRune());
            if(cnt <= 0) {
                this.rollState = ROLL.END;
                this.pick = rune.getRune();
                return;
            }

            let rand = Math.floor(Math.random() * RUNE._LENGTH);
            rune.setRune(rand);


            this.bouncyDice(speed);
            this.scheduleOnce(() => {
                changeSprite(cnt-1, rune, this.getRollingSpeed(cnt-1, speed));
            }, speed);
        }

        let rollingNum = Math.floor(Math.random() *  (this.MAX_ROLLING - this.MIN_ROLLING)) + this.MIN_ROLLING;
        changeSprite(rollingNum, rune, 0.5);
    }

    //남은 횟수와 현재 스피드를 통해 현재 속도 산출
    getRollingSpeed(cnt:number, speed: number){
        return 0.2;
    }

    //n초간 주사위 스케일 조절 트윈 실행
    bouncyDice(time:number){
        let now:Vec3 = this.node.position;
        let shake:Vec3 = new Vec3(now.x+ 100, now.y + 100);
        console.log('RuneDice.ts:bouncyDice:114 ->',time/2, now, shake);
        tween(this.node)
            .by(time/2, { position: new Vec3(10,10,0)}, { easing: 'bounceInOut'})
            .by(time/2, { position: new Vec3(-10,-10,0)}, { easing: 'bounceInOut'})
            .repeat(1)
            .start();
    }
}
