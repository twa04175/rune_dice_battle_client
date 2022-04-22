
import { _decorator, Component, Node, Prefab, CCFloat, Vec3, instantiate, tween } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Clouds
 * DateTime = Thu Apr 21 2022 21:44:57 GMT+0900 (대한민국 표준시)
 * Author = twa04175
 * FileBasename = Clouds.ts
 * FileBasenameNoExtension = Clouds
 * URL = db://assets/02.scripts/01.ui/Clouds.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */

@ccclass('Clouds')
export class Clouds extends Component {

    //Generate Info
    private minHeight: number = 0;
    private maxHeight: number = 300;
    private cloudSpeed: number = 30;

    @property({type: Prefab})
    public cloud:Prefab = null;

    private cloudList:Node[] = [];

    start () {
        // [3]
        console.log('Clouds.ts:start:37 -> start');
        this.addCloud(this.node, new Vec3(-600,Math.random() * (this.maxHeight - this.minHeight) + this.minHeight,0));

        this.scheduleOnce(()=>{
            this.addCloud(this.node, new Vec3(-600,Math.random() * (this.maxHeight - this.minHeight) + this.minHeight,0));
        },15);
    }


    update (deltaTime: number) {
        if(this.cloudList.length !== 0) {
            this.moveClouds(deltaTime);
        }
    }

    moveClouds(deltaTime){
        for(let i = 0; i<this.cloudList.length; i++) {
            this.cloudList[i].translate(new Vec3(deltaTime * this.cloudSpeed,0,0));
            if(this.cloudList[i].position.x >= 660) {
                this.cloudList[i].setPosition(new Vec3(-600,Math.random() * (this.maxHeight - this.minHeight) + this.minHeight,0));
            }
        }
    }

    addCloud(parent: Node, localPos: Vec3) {
        let cloudNode: Node = instantiate(this.cloud);

        cloudNode.setPosition(localPos);
        cloudNode.parent = parent;

        this.cloudList.push(cloudNode);
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
