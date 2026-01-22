import { _decorator, Component, Camera, RigidBody, Vec3, Vec2, geometry, input, Input, PhysicsSystem } from 'cc';
import { GeneralObject } from 'db://assets/Game/___Script___/GeneralObject';
const { ccclass, property } = _decorator;

@ccclass('PhysicsDragXZ')
export class PhysicsDragXZ extends Component {
  @property({ type: Camera })
  public camera: Camera | null = null;

  @property
  public planeY = 0;     // ground plane

  @property
  public forceStrength = 100; // pulling power

  private _ray = new geometry.Ray();
  private _rigid: RigidBody | null = null;
  private _targetWorld = new Vec3();
  private _dragging = false;
  private _generalObject: GeneralObject | null = null;
  onLoad () {
    input.on(Input.EventType.TOUCH_START, this._onDown, this);
    input.on(Input.EventType.TOUCH_MOVE, this._onMove, this);
    input.on(Input.EventType.TOUCH_END, this._onUp, this);

    input.on(Input.EventType.MOUSE_DOWN, this._onDown, this);
    input.on(Input.EventType.MOUSE_MOVE, this._onMove, this);
    input.on(Input.EventType.MOUSE_UP, this._onUp, this);
    this._generalObject = this.getComponent(GeneralObject);
  }

  private _screenToRay(screenPos: Vec2) {
    if (!this.camera) return;
    this.camera.screenPointToRay(screenPos.x, screenPos.y, this._ray);
  }

  private _screenToGround(screenPos: Vec2, out: Vec3): boolean {
    if (!this.camera) return false;
    this._screenToRay(screenPos);
    const o = this._ray.o;
    const d = this._ray.d;
    if (Math.abs(d.y) < 1e-6) return false;
    const t = (this.planeY - o.y) / d.y;
    if (t < 0) return false;
    out.set(o.x + d.x * t, this.planeY, o.z + d.z * t);
    return true;
  }

  private _onDown (event: any) {
    if (this._generalObject.won) return;
    const loc = event.getLocation();
    this._screenToRay(loc);

    // Check for physics hit
    if (PhysicsSystem.instance.raycastClosest(this._ray)) {
      const hit = PhysicsSystem.instance.raycastClosestResult;
      const node = hit.collider.node;
      const rb = node.getComponent(RigidBody);
    }
  }

  private _onMove (event: any) {
    if (!this._dragging) return;
    const loc = event.getLocation();
    this._screenToGround(loc, this._targetWorld);
  }

  private _onUp () {
    if (this._dragging && this._rigid)
    {
    }
    this._dragging = false;
    this._rigid = null;
  }

  update (dt: number) {
    if (this._dragging && this._rigid) {
      const pos = this._rigid.node.worldPosition;
      const dir = new Vec3();
    Vec3.subtract(dir, this._targetWorld, pos);
    dir.y = 0;


    const dist = dir.length();
    if (dist > 0.01) {
    dir.normalize();
    const speed = Math.min(dist * 3, 10); 
    dir.multiplyScalar(speed);
     this._rigid.setLinearVelocity(dir);
    } else {
    this._rigid.setLinearVelocity(new Vec3()); // stop
    }
    }
  }
}