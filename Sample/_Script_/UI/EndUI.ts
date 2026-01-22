import { _decorator, Component, Node } from 'cc';
import { IUINode } from '../../../ETSupportKit/Abstract/IUINode';
import { SoundGeneral, SoundType } from '../../../ETSupportKit/SoundGeneral';
const { ccclass, property } = _decorator;

@ccclass('EndUI')
export class EndUI extends IUINode {
    @property(Node)
    winNode: Node = null;
    
    @property(Node)
    lostNode: Node = null;

    start() {

    }

    update(deltaTime: number) {
        
    }

    Init(): void {
        // TODO: implement initialization logic
    }

    OnEnable(): void {
        // TODO: implement logic for when UI is enabled
    }

    OnDisable(): void {
        // TODO: implement logic for when UI is disabled
    }

    show(result: number): void {
        if (this.winNode && this.lostNode) {
            this.winNode.active = result === 0;
            this.lostNode.active = result === 1;
            if (result === 0) { 
                SoundGeneral.instance.Play(SoundType.UI,0);
            }
            else
            {
                SoundGeneral.instance.Play(SoundType.UI,1);

            }
        }
    }
}


