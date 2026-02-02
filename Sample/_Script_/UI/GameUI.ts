import { _decorator, Component, Node } from 'cc';
import { IUINode } from '../../../ETSupportKit/Abstract/IUINode';
const { ccclass, property } = _decorator;

@ccclass('GameUI')
export class GameUI extends IUINode {

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
}


