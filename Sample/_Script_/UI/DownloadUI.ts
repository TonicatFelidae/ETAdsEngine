import { _decorator, Component, Node } from 'cc';
import { IUINode } from '../ETSupportKit/Abstract/IUINode';
import { SoundGeneral, SoundType } from '../ETSupportKit/SoundGeneral';
import { GeneralObject } from '../GeneralObject';
const { ccclass, property } = _decorator;

@ccclass('DownloadUI')
export class DownloadUI extends IUINode {
    
    @property(Node)
    chestOpen: Node = null;
    
    @property(Node)
    chestClose: Node = null;
    
    start() {
        SoundGeneral.instance.Play(SoundType.EF,4);
        
        // Check win/lose state and show appropriate chest
        const isShowChest = GeneralObject.instance.score > 0;
        
        if (this.chestOpen) {
            this.chestOpen.active = isShowChest;
        }
        
        if (this.chestClose) {
            this.chestClose.active = !isShowChest;
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


