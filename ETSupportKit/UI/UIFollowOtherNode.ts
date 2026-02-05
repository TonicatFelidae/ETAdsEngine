import { _decorator, Component, Node, Camera, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIFollowOtherNode')
export class UIFollowOtherNode extends Component {
    
    @property(Node)
    targetNode: Node = null;
    
    @property(Camera)
    camera: Camera = null;
    update(deltaTime: number) {
        if (this.targetNode && this.camera) {
            const worldPos = this.targetNode.worldPosition;
            const uiPos = new Vec3();
            
            // Convert 3D world position to UI canvas space
            this.camera.convertToUINode(worldPos, this.node.parent, uiPos);
            this.node.setPosition(uiPos);
        }
    }
}


