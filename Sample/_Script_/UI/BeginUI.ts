import { _decorator, Component, Node } from 'cc';
import { IUINode } from '../ETSupportKit/Abstract/IUINode';
const { ccclass, property } = _decorator;

@ccclass('BeginUI')
export class BeginUI extends IUINode {
    @property(Node)
    public tur1: Node | null = null; // Node to hold the circle
    //@property(Node)
    //public tur2: Node | null = null; // Node to hold the circle
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
    public hideAllTutorial()
    {
        this.tur1.active = false;
        //this.tur2.active = false;
        this.node.active = false;
    }
    public showTutorial1()
    {
        this.tur1.active = true;
        //this.tur2.active = false;
    }
    public showTutorial2()
    {
        this.tur1.active = false;
        //this.tur2.active = true;
    }
}


