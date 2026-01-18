import { _decorator, Camera, Component, ParticleSystem, RenderTexture, Vec2, Vec3, UITransform, Node } from 'cc';
import { Singleton } from './Abstract/Singleton';
const { ccclass, property } = _decorator;

@ccclass('EffectGeneral')
export class EffectGeneral extends Singleton<EffectGeneral> {
    // Array of ParticleSystems
    @property([ParticleSystem])
    private effects: ParticleSystem[] = [];

    // Camera for rendering effects to texture
    @property(Camera)
    public effectCamera: Camera = null;

    public static instance: EffectGeneral = null;

    private _effectRenderTexture: RenderTexture = null;

    onLoad() {
        super.onLoad(); 
        EffectGeneral.instance = this;

        // Optionally stop all effects at start
        for (let ps of this.effects) {
            if (ps) ps.stop();
        }
    }

    /**
     * Play an effect by index
     * @param index Index in the effects array
     */
    public Play(index: number) {
        if (index < 0 || index >= this.effects.length || !this.effects[index]) {
            console.warn('EffectGeneral: invalid effect index', index);
            return;
        }

        const ps = this.effects[index];
        ps.stop();
        ps.clear();
        ps.play();
    }

    /**
     * Play an effect at a specific position in the render texture
     * @param index Index in the effects array
     * @param localPos Vec2 local position in targetRect
     * @param targetRect Node whose local space the position is in
     */
    public PlayAtPosition(index: number, localPos: Vec3, targetRect: Node) {
        if (index < 0 || index >= this.effects.length || !this.effects[index]) {
            console.warn('EffectGeneral: invalid effect index', index);
            return;
        }
        if (!this.effectCamera) {
            console.warn('EffectGeneral: effectCamera not set');
            return;
        }
        const ps = this.effects[index];

        // Convert localPos (Vec2) in targetRect to world position
        const uiTrans = targetRect.getComponent(UITransform);
        let worldPos = new Vec3();
        if (uiTrans) {
            uiTrans.convertToWorldSpaceAR(new Vec3(localPos.x, localPos.y, 0), worldPos);
        } else {
            targetRect.getWorldPosition(worldPos);
            worldPos.x += localPos.x;
            worldPos.y += localPos.y;
        }

        // Convert world position to effectCamera's local space
        const cameraNode = this.effectCamera.node;
        const cameraParent = cameraNode.parent;
        let effectPos = new Vec3();
        if (cameraParent) {
            cameraParent.inverseTransformPoint(effectPos, worldPos);
        } else {
            effectPos.set(worldPos);
        }

        // Set effect position and play
        ps.node.setPosition(effectPos);
        ps.stop();
        ps.clear();
        ps.play();
    }
    public PlayAtWorldPosition(index: number, localPos: Vec3, targetRect: Node) {
    if (index < 0 || index >= this.effects.length || !this.effects[index]) {
        console.warn('EffectGeneral: invalid effect index', index);
        return;
    }
    if (!this.effectCamera) {
        console.warn('EffectGeneral: effectCamera not set');
        return;
    }

    const ps = this.effects[index];

    // 1) Compute worldPos robustly
    let worldPos = new Vec3();
    const uiTrans = targetRect.getComponent(UITransform);
    if (uiTrans && typeof uiTrans.convertToWorldSpaceAR === 'function') {
        // convertToWorldSpaceAR returns a Vec3 — use the returned value to be safe
        worldPos = uiTrans.convertToWorldSpaceAR(new Vec3(localPos.x, localPos.y, 0));
    } else {
        // fallback: parent world pos + local offset
        targetRect.getWorldPosition(worldPos);
        worldPos.x += localPos.x;
        worldPos.y += localPos.y;
    }

    console.log('[EffectGeneral] worldPos computed:', worldPos, 'from localPos:', localPos, 'targetRect:', targetRect.name);

    // 2) Choose the coordinate space to convert into:
    //    prefer ps.node.parent (so effect position is correct for ps.node.setPosition)
    const effectParent = ps.node.parent ?? this.effectCamera.node.parent ?? this.effectCamera.node;
    const effectPos = new Vec3();

    if (effectParent && typeof effectParent.inverseTransformPoint === 'function') {
        // inverseTransformPoint(out, worldPoint)
        effectParent.inverseTransformPoint(effectPos, worldPos);
        console.log('[EffectGeneral] converted world -> effectParent local via inverseTransformPoint:', effectPos, 'parent:', effectParent.name);
    } else if (typeof ps.node.setWorldPosition === 'function') {
        // fallback: set world position directly (bypass local conversion)
        ps.node.setWorldPosition(worldPos);
        ps.node.getPosition(effectPos);
        console.log('[EffectGeneral] set ps.node world pos directly. local pos now:', effectPos);
    } else {
        // last fallback: try camera node inverse transform
        this.effectCamera.node.inverseTransformPoint(effectPos, worldPos);
        console.log('[EffectGeneral] fallback camera inverseTransformPoint used:', effectPos);
    }

    // Ensure z value is sane for the effect camera
    if (isNaN(effectPos.z)) effectPos.z = 0;

    // Place & play
    ps.node.setPosition(effectPos);
    ps.stop();
    ps.clear();
    ps.play();

    console.log('[EffectGeneral] playing effect at', effectPos, 'for effect index', index);
}

    /**
     * Stop an effect by index
     * @param index Index in the effects array
     */
    public Stop(index: number) {
        if (index < 0 || index >= this.effects.length || !this.effects[index]) {
            console.warn('EffectGeneral: invalid effect index', index);
            return;
        }

        this.effects[index].stop();
    }

    /**
     * Stop all effects
     */
    public StopAll() {
        for (let i = 0; i < this.effects.length; i++) {
            this.Stop(i);
        }
    }
}
