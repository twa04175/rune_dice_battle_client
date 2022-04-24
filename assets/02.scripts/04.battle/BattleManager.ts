import {_decorator, Component, director, input, Input, Prefab, instantiate, Node, Vec3, Label, tween, find} from 'cc';
import {ELEMENTAL_TYPE} from "db://assets/02.scripts/04.battle/RuneDice";
import {MagicBook} from "db://assets/02.scripts/04.battle/MagicBook";
import {RUNE} from "db://assets/02.scripts/04.battle/Rune";
import {UIManager} from "db://assets/02.scripts/01.ui/UIManager";
import {DicePanel} from "db://assets/02.scripts/01.ui/DicePanel";
import {StatePanel} from "db://assets/02.scripts/01.ui/StatePanel";
import {ActivePointBar} from "db://assets/02.scripts/01.ui/ActivePointBar";

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

    @property({type: Node})
    mouseRune:Node = null;

    @property({type:StatePanel})
    statePanel:StatePanel = null;

    @property({type: Node})
    startPanel:Node = null;

    @property({type: ActivePointBar})
    pointBar:ActivePointBar = null;

    @property({type: Node})
    playerNode:Node = null;
    @property({type: Node})
    monsterNode:Node = null;

    private MAX_TURN_TIME:number = 60;
    private MAX_ACTIVE_POINT:number = 3;
    private actionPoint:number = this.MAX_ACTIVE_POINT;

    dicePanel:DicePanel;

    //GAMESTATE
    battleState:BattleState = BattleState.WAIT;
    turn:number = 1;
    turnTimer:number = this.MAX_TURN_TIME;
    isTimer: boolean = false;
    pickRune:RUNE = null;

    start () {
        this.dicePanel = find('Root/UI/DicePanel').getComponent(DicePanel);
        //TODO: 서버하고 소켓 열어서 매칭
        //매칭 성공시 게임 스타트 콜백 제공
        this.scheduleOnce(this.battleStart, 2);//일단 그냥 진행
    }

    //전투 시작
    battleStart() {
        console.log('BattleManager.ts:battleStart:70 -> battle start');
        this.startAnimation(); //전투 시작 알림
        this.dicePanel.startRefresh();   //주사위 리롤
        this.isTimer = true;        //턴 타이머 활성화
        console.log('BattleManager.ts::75 ->',this.pointBar);
        this.setActionPoint(this.MAX_ACTIVE_POINT);
        //룬북 랜덤 룬으로 초기화
    }

    enemyCall(){
        // -20, 120
        tween(this.monsterNode).by(1,{position:new Vec3(0,-400,0)}, {easing:'bounceOut'}).start();
    }

    startAnimation() {
        this.statePanel.setStateText('START');
        tween(this.startPanel).by(2,{position:new Vec3(2000,0,0)},
            {easing:'smooth', onComplete:()=>{
                    this.statePanel.setStateText(`TURN ${this.turn}`);
                    this.statePanel.onTimer(null);
                    this.enemyCall();
                }}).start();
    }

    //턴이 넘어갈 때 실행
    nextTurn() {
        this.turnTimer = this.MAX_TURN_TIME;
        this.isTimer = true;
        this.turn++;
        this.dicePanel.startRefresh();
        this.actionPoint = 3;
        this.setActionPoint(this.MAX_ACTIVE_POINT);
        this.statePanel.setStateText(`TURN ${this.turn}`);
        this.statePanel.onTimer(null);
        // 주사위 리롤 + 사용횟수 초기화
    }

    //전투 계산 진행
    battlePhase() {
        this.isTimer = false;
        this.statePanel.offTimer(()=>{
            this.statePanel.setStateText('BATTLE');
        });

        this.scheduleOnce(()=>{
            this.nextTurn();
        },4); // 일단 약 4초간 진행
    }

    update (deltaTime: number) {
        // [4]
        if(this.isTimer === true) {
            if(this.turnTimer <= 0) {
                this.battlePhase();
            }else {
                this.statePanel.setTimerText(Math.floor(this.turnTimer).toString());
                this.turnTimer -= deltaTime;
            }
        }
    }

    getActionPoint() {
        return this.actionPoint;
    }

    setActionPoint(point:number) {
        if(point > 3) {
            point = 3;
        }

        if(point<0) {
            point = 0;
        }

        this.actionPoint = point;
        this.pointBar.setActivePoint(this.actionPoint);
    }

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
    onRunePickMode(rune:RUNE) {
        this.deleteRune();
        this.createRune(rune);

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
    createRune(rune:RUNE) {
        console.log('BattleManager.ts:createRune:94 ->',this.mouseRune);
        this.pickRune = rune;
        this.mouseRune.active = true;
        this.mouseRune.setPosition(new Vec3(-50,-50,-50));
        this.mouseRune.children[rune].active = true;
    }
    deleteRune(){
        for(let i = 0; i<this.mouseRune.children.length; i++) {
            this.mouseRune.children[i].active = false;
        }
        this.pickRune = null;
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
