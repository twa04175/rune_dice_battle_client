
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = NetworkManager
 * DateTime = Sun May 08 2022 15:25:16 GMT+0900 (대한민국 표준시)
 * Author = twa04175
 * FileBasename = NetworkManager.ts
 * FileBasenameNoExtension = NetworkManager
 * URL = db://assets/02.scripts/NetworkManager.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 */

@ccclass('NetworkManager')
export class NetworkManager extends Component {

    private host = "localhost:";
    private socketPort = 3004;
    private httpPort = 3003;

    start () {
        // [3]
    }

    getURL(type){
        switch (type) {
            case 'RestAPI':
                return this.host + this.httpPort;
            case 'Socket':
                return this.host + this.socketPort;
        }
    }

    //매칭 큐 진입
    getRoom () {

    }

    //공격 패킷 전송
    sendBattlePacket (){

    }
}
