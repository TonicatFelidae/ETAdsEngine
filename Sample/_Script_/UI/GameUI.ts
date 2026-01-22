import { _decorator, Component, Node } from 'cc';
import { IUINode } from '../../../ETSupportKit/Abstract/IUINode';
import { ChartUI } from '../../../../../Game/___Script___/UI/ChartUI';
const { ccclass, property } = _decorator;

@ccclass('GameUI')
export class GameUI extends IUINode {
    @property({ type: ChartUI, tooltip: 'Reference to the ChartUI component' })
    public chartUI: ChartUI | null = null;

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


