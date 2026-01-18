import { _decorator, Component, Node, Vec3, EventTouch, UITransform, input, Input } from 'cc';
import { GeneralObject } from '../../GeneralObject';
const { ccclass, property } = _decorator;

@ccclass('UIDrag')
export class UIDrag extends Component {
    @property(UITransform)
    public parentUITransform: UITransform | null = null;
    
    @property(GeneralObject)
    public generalObject: GeneralObject | null = null;

    @property
    public speed: number = 0.1;

    @property
    public xmin: number = -300;
    @property
    public xmax: number = 300;
    @property
    public ymin: number = -300;
    @property
    public ymax: number = 300;

    private _dragging = false;
    private _lastPos = new Vec3();
    onLoad() {
        this.node.on(Input.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.on(Input.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on(Input.EventType.TOUCH_END, this._onTouchEnd, this);
        this.node.on(Input.EventType.TOUCH_CANCEL, this._onTouchEnd, this);
    }

    private _onTouchStart(event: EventTouch) {

        if (!this.generalObject.isScrollalbe) return;
        const screen = event.getUILocation();
        const local =  this.parentUITransform.convertToNodeSpaceAR(new Vec3(screen.x, screen.y, 0));
        this._dragging = true;
        this._lastPos.set(local);
    }

    private _onTouchMove(event: EventTouch) {
        if (!this.generalObject.isScrollalbe) return;
        if (!this._dragging) return;
        if (!this.generalObject.isBeginScroll) this.generalObject.onFirsScroll();

        // Convert screen position to parent local space
        const curScreen = event.getUILocation();
        const curLocal = this.parentUITransform.convertToNodeSpaceAR(new Vec3(curScreen.x, curScreen.y, 0));
        const lastLocal = this._lastPos;

        // Calculate delta in local space (do not mutate curLocal or lastLocal)
        const delta = new Vec3();
        Vec3.subtract(delta, curLocal, lastLocal);
        delta.multiplyScalar(this.speed);

        // Move node
        let nodePos = this.node.position.clone();
        nodePos.x += delta.x;
        nodePos.y += delta.y;

        // Clamp in local space
        nodePos.x = Math.max(this.xmin, Math.min(this.xmax, nodePos.x));
        nodePos.y = Math.max(this.ymin, Math.min(this.ymax, nodePos.y));

        this.node.setPosition(nodePos);
        this._lastPos.set(curLocal);
    }

    private _onTouchEnd(event: EventTouch) {
        this._dragging = false;
    }
}


