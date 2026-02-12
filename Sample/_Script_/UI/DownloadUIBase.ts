import { _decorator, Component, Node } from 'cc';
import { IUINode } from '../../../ETSupportKit/Abstract/IUINode';
import { SoundGeneral, SoundType } from '../../../ETSupportKit/SoundGeneral';
const { ccclass, property } = _decorator;

@ccclass('DownloadUIBase')
export class DownloadUIBase extends IUINode {
    
    @property(Node)
    chestOpen: Node = null;
    
    @property(Node)
    chestClose: Node = null;
    isShowChest: boolean = false;
    
    start() {
        
        // Check win/lose state and show appropriate chest
        
        if (this.chestOpen) {
            this.chestOpen.active = this.isShowChest;
        }
        
        if (this.chestClose) {
            this.chestClose.active = !this.isShowChest;
        }
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
}


