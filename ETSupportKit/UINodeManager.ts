import { _decorator, Component, debug, Node } from 'cc';
import { IUINode } from './Abstract/IUINode';
import { Singleton } from './Abstract/Singleton';
const { ccclass, property } = _decorator;

export enum ShowType {
    Single = 0,   // Hide all other UI nodes when showing one
    Addition = 1  // Show on top without hiding others
}

@ccclass('UINodeManager')
export class UINodeManager extends Singleton<UINodeManager> {
    @property([Node])
    private uiNodes: Node[] = [];
    private uiMap: Map<string, IUINode> = new Map();

    onLoad() {
        super.onLoad();
        // Populate the map
        this.populateMap();
        
    }
    populateMap() {
        if (!this.uiMap || this.uiMap.size === 0) {
        for (let node of this.uiNodes) {
            // Get all components on this node
            const components = node.getComponents(Component);

            // Find the first component that extends IUINode
            for (const comp of components) {
                if (comp instanceof IUINode) {
                    
            console.log(`comp.constructor.name "${ comp.constructor.name}"`);
                    this.uiMap.set(comp.constructor.name, comp as IUINode);
                    break;
                }
            }
        }
    }
    }
    public Show<T extends IUINode>(ctor: { new(): T }, isShow: boolean = true, type: ShowType = ShowType.Addition) {
    const className = ctor.name; // Get class name automatically
    const uiComp = this.uiMap.get(className);

    if (!uiComp) {
        console.warn(`UINodeManager: UI node "${className}" not found`);
        return;
    }

    if (isShow && type === ShowType.Single) {
        // Hide all other UI nodes except the one we are showing
        this.uiMap.forEach((comp, key) => {
            if (key !== className) {
                comp.Show(false);
            }
        });
    }

    uiComp.Show(isShow);
}
    /** Show or hide all UI nodes */
    public ShowAll(isShow: boolean) {
        this.populateMap();
        this.uiMap.forEach(ui => ui.Show(isShow));
    }
    public GetItem<T extends IUINode>(ctor: { new(): T }): T | undefined {
    const className = ctor.name; // Get "EndUI"
    const uiComp = this.uiMap.get(className);
    return uiComp as T | undefined;
}
}


