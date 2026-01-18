import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIFollowOtherNode')
export class UIFollowOtherNode extends Component {
    
    @property(Node)
    targetNode: Node = null;

    start() {

    }

    update(deltaTime: number) {
        if (this.targetNode) {
            this.node.setWorldPosition(this.targetNode.worldPosition);
        }
    }
}


