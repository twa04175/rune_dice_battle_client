
import { _decorator, Component, Node, input, Input, find, Sprite, Enum, Color } from 'cc';
import {BattleManager} from "db://assets/02.scripts/04.battle/BattleManager";
import { RUNE } from './Rune';
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

    @property({type: Enum(RUNE)})
    public currentRune:RUNE = null;

    start () {
        this.battleManager = find('Root/BattleManager').getComponent(BattleManager);
        this.sprite = this.node.getComponent(Sprite);
        this.node.on(Node.EventType.MOUSE_LEAVE, this.default, this);
        let rune = this.node.children[0].children[this.currentRune];
        rune.active = true;
        this.runeSprite = rune.getComponent(Sprite);
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
        if(this.battleManager.pickRune === this.currentRune) {
            this.sameRune();
            return true;
        }else {
            this.noSameRune();
            return false;
        }
    }

    onClickNode() {

    }

    // update (deltaTime: number) {
    //     // [4]
    // }

    //아웃라인 컬러 회색
    default(){
        this.sprite.color = new Color('#FFFFFF');
        this.runeSprite.color = new Color('#FFFFFF');
    }

    //아웃라인 컬러 초록색
    sameRune(){
        this.sprite.color = new Color('#FF9E9E');
        this.runeSprite.color = new Color('#FF9E9E');
    }

    //아웃라인 컬러 빨간색
    noSameRune(){
        this.sprite.color = new Color('#C0FFD7');
        this.runeSprite.color = new Color('#C0FFD7');
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
