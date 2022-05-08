
import { _decorator, Component, Node, input, Input, find, Sprite, Enum, Color } from 'cc';
import {BattleManager} from "db://assets/02.scripts/04.battle/BattleManager";
import { RUNE } from './Rune';
import {RuneBingo} from "db://assets/02.scripts/04.battle/RuneBingo";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = magic_node
 * DateTime = Sat Apr 23 2022 21:45:55 GMT+0900 (대한민국 표준시)
 * Author = twa04175
 * FileBasename = magic_node.ts
 * FileBasenameNoExtension = magic_node
 * URL = db://assets/02.scripts/04.battle/magic_node.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('RuneNode')
export class RuneNode extends Component {

    battleManager:BattleManager = null;
    sprite:Sprite = null;
    runeSprite:Sprite = null;
    runeBingo:RuneBingo = null;

    posX:number = null;
    posY:number = null;

    public currentRune:RUNE = null;
    private isPick = false;

    start () {
        this.battleManager = find('Root/BattleManager').getComponent(BattleManager);
        this.sprite = this.node.getComponent(Sprite);
        this.node.on(Node.EventType.MOUSE_LEAVE, this.default, this);
        this.runeBingo = this.node.parent.parent.getComponent(RuneBingo);
    }

    setCurrentRune(rune:RUNE) {
        console.log('RuneNode.ts:setCurrentRune:35 ->',rune);
        this.currentRune = rune;
        let runeNode = this.node.children[0].children[this.currentRune];
        this.runeSprite = runeNode.getComponent(Sprite);
        runeNode.active = true;
    }

    setXY(posX:number, posY:number){
        this.posX = posX;
        this.posY = posY;
    }

    clear() {

    }

    onEnable(){
        this.node.on(Node.EventType.MOUSE_ENTER, this.checkRune, this);
        this.node.on(Node.EventType.MOUSE_DOWN, this.onClickNode, this);
    }

    onDisable(){
        this.node.off(Node.EventType.MOUSE_ENTER, this.checkRune, this);
        this.node.off(Node.EventType.MOUSE_DOWN, this.onClickNode, this);
    }

    checkRune() {
        if(this.isPick === true) {
            return false;
        }

        if(this.battleManager.pickRune === this.currentRune) {
            this.sameRune();
            return true;
        }else {
            this.noSameRune();
            return false;
        }
    }

    onClickNode() {
        let ap = this.battleManager.getActionPoint();

        if(ap > 0 && this.battleManager.pickRune === this.currentRune) {
            this.battleManager.addCurrentRune();
            this.runeBingo.setRune(this.posX,this.posY);
            this.sameRune();
            this.isPick = true;
        }
    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    //아웃라인 컬러 회색
    default(){
        if(this.isPick === true) {
            return;
        }

        this.sprite.color = new Color('#FFFFFF');
        this.runeSprite.color = new Color('#FFFFFF');
    }

    //아웃라인 컬러 초록색
    sameRune(){
        this.sprite.color = new Color('#C0FFD7');
        this.runeSprite.color = new Color('#C0FFD7');
    }

    //아웃라인 컬러 c
    noSameRune(){
        this.sprite.color = new Color('#FF9E9E');
        this.runeSprite.color = new Color('#FF9E9E');
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
