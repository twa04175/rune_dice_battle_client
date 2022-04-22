
import { _decorator, Component, Node, Sprite } from 'cc';
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

enum DICE_TYPE{
    FIRE,
    ICE,
    EARTH,
}



@ccclass('RuneDice')
export class RuneDice extends Component {

    @property({type:DICE_RANK})
    public rank:DICE_RANK = DICE_RANK.NORMAL;
    @property({type:DICE_TYPE})
    public element:DICE_TYPE = DICE_TYPE.ICE;

    start () {
        // 타입과 랭크에 따른 주사위 스프라이트 변환
        let sprite:Sprite = this.node.getComponent(Sprite);

        console.log('RuneDice.ts:start:42 ->',sprite);

    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    rolling() {
        console.log('RuneDice.ts:rolling:35 -> rolling Dice',);

        //내부 랜덤 룬 스프라이트 사용
        //빠르게 전환하다가 천천히 느려지면서 주사위 확정
    }
}
