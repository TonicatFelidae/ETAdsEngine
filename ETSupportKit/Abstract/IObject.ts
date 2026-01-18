import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;
export abstract class IObject extends Component {
    protected _initialized: boolean = false;

    // Must implement Init in child class
    abstract Init(): void;

    // Must implement OnEnable/OnDisable
    abstract OnEnable(): void;
    abstract OnDisable(): void;
    public EnsureInit() {
        if (!this._initialized) {
            this.Init();
            this._initialized = true;
        }
    }
    public Show(isActive: boolean) {
        this.EnsureInit();
        this.node.active = isActive;

        if (isActive) {
            this.OnEnable();
        } else {
            this.OnDisable();
        }
    }
}
