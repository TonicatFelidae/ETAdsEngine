import { _decorator, Component, js, Node } from 'cc';
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
    private uiMap: Map<any, IUINode> = new Map();

    onLoad() {
        super.onLoad();
        // Populate the map
        this.populateMap();
    }

    populateMap() {
        if (!this.uiMap || this.uiMap.size === 0) {
            for (let node of this.uiNodes) {
                if (!node) continue;
                // Get all components on this node
                const components = node.getComponents(Component);

                // Find the first component that extends IUINode
                for (const comp of components) {
                    if (comp instanceof IUINode || typeof (comp as any).Show === 'function') {
                        // 1. Map by registered @ccclass name (immune to minification)
                        const className = js.getClassName(comp);
                        if (className) {
                            this.uiMap.set(className, comp as IUINode);
                        }
                        // 2. Map by constructor reference (immune to minification)
                        this.uiMap.set(comp.constructor, comp as IUINode);
                        // 3. Map by node name
                        this.uiMap.set(node.name, comp as IUINode);
                        break;
                    }
                }
            }
        }
    }

    private getComp<T extends IUINode>(ctor: { new(): T } | string): T | undefined {
        if (typeof ctor === 'string') {
            return this.uiMap.get(ctor) as T | undefined;
        }

        // 1. Try constructor reference lookup
        let uiComp = this.uiMap.get(ctor);
        if (uiComp) return uiComp as T;

        // 2. Try Cocos ccclass name lookup
        const className = js.getClassName(ctor);
        if (className) {
            uiComp = this.uiMap.get(className);
            if (uiComp) return uiComp as T;
        }

        // 3. Fallback: search directly on uiNodes array via getComponent(ctor)
        for (const node of this.uiNodes) {
            if (!node) continue;
            const comp = node.getComponent(ctor);
            if (comp) {
                if (className) this.uiMap.set(className, comp as any);
                this.uiMap.set(ctor, comp as any);
                return comp as T;
            }
        }

        return undefined;
    }

    public Show<T extends IUINode>(ctor: { new(): T } | string, isShow: boolean = true, type: ShowType = ShowType.Addition) {
        this.populateMap();
        const uiComp = this.getComp(ctor);

        if (!uiComp) {
            const name = typeof ctor === 'string' ? ctor : (js.getClassName(ctor) || (ctor as any).name);
            console.warn(`UINodeManager: UI node "${name}" not found`);
            return;
        }

        if (isShow && type === ShowType.Single) {
            // Hide all other UI nodes except the one we are showing
            const visited = new Set<IUINode>();
            this.uiMap.forEach((comp) => {
                if (comp !== uiComp && !visited.has(comp)) {
                    visited.add(comp);
                    comp.Show(false);
                }
            });
        }

        uiComp.Show(isShow);
    }

    /** Show or hide all UI nodes */
    public ShowAll(isShow: boolean) {
        this.populateMap();
        // 1. Directly deactivate / activate the assigned UI nodes
        for (const node of this.uiNodes) {
            if (node) {
                node.active = isShow;
            }
        }
        // 2. Also invoke Show(isShow) on all IUINode components (without duplicates)
        const visited = new Set<IUINode>();
        this.uiMap.forEach(ui => {
            if (!visited.has(ui)) {
                visited.add(ui);
                ui.Show(isShow);
            }
        });
    }

    public GetItem<T extends IUINode>(ctor: { new(): T } | string): T | undefined {
        this.populateMap();
        return this.getComp(ctor);
    }
}
