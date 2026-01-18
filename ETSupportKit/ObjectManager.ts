import { _decorator, Component, Node } from 'cc';
import { IObject } from './Abstract/IObject';
import { Singleton } from './Abstract/Singleton';
const { ccclass, property } = _decorator;

@ccclass('ObjectManager')
export class ObjectManager extends Singleton<ObjectManager>  {
    // Drag all managed nodes here in editor
    @property([Node])
    private objects: Node[] = [];

    private objectMap: Map<string, IObject> = new Map();
    onLoad() {
        super.onLoad();
        // Populate map from nodes
        for (let node of this.objects) {
            const obj = node.getComponent(IObject);
            if (obj) {
                this.objectMap.set(node.name, obj);
            }
        }
    }

    /** Turn on/off object by name */
    public Show(name: string, isShow: boolean) {
        const obj = this.objectMap.get(name);
        if (obj) {
            obj.Show(isShow);
        } else {
            console.warn(`ObjectManager: object "${name}" not found`);
        }
    }

    /** Turn on/off all objects */
    public SetAllActive(isActive: boolean) {
        this.objectMap.forEach(obj => obj.Show(isActive));
    }

    /** Ensure all objects are initialized */
    public InitAll() {
        this.objectMap.forEach(obj => obj.EnsureInit());
    }

    /** Get object by name */
    public Get(name: string): IObject | undefined {
        return this.objectMap.get(name);
    }
    /**Careful , this may not work, should use get for game object because many gaem obejct use same class */
    public GetItem<T extends IObject>(ctor: { new(...args: any[]): T }, name: string = null): T | undefined {
        const className = ctor.name; // No need to type the name again
        const uiComp = this.objectMap.get(className);
        return uiComp as T | undefined;
    }
}