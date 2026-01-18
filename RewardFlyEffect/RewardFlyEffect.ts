import { _decorator, Component, Node, Prefab, instantiate, tween, Vec3, UITransform } from 'cc';
import { FlyingRewardTarget } from './FlyingRewardTarget';
import { Singleton } from '../ETSupportKit/Abstract/Singleton';
const { ccclass, property } = _decorator;

@ccclass('RewardFlyEffect')
export class RewardFlyEffect extends Singleton<RewardFlyEffect> {
    @property(Prefab)
    prefab: Prefab = null; // The coin or reward prefab

    @property(Node)
    targetNode: Node = null; // The target node to fly towards

    @property
    flyDuration: number = 0.6; // Time for one coin to reach the target

    protected onLoad(): void {
        super.onLoad();
    }
    /**
     * Spawns 'amount' coins and makes them fly to the target.
     * Logs rewardPerCoin when each coin arrives and destroys the coin node.
     */
    public OnRewardEffect(amount: number, rewardPerCoin: number, startPos: Vec3) {
        if (!this.prefab || !this.targetNode) {
            console.warn('RewardFlyEffect: Prefab or TargetNode not set!');
            return;
        }

        // --- Target world position ---
        const targetWorldPos = new Vec3();
        this.targetNode.getWorldPosition(targetWorldPos);

        // Convert target position to local space relative to this node
        const targetLocalPos = new Vec3();
        this.node.inverseTransformPoint(targetLocalPos, targetWorldPos);

        // Convert starting position to local space relative to this node
        const localStartPos = new Vec3();
        this.node.inverseTransformPoint(localStartPos, startPos);

        for (let i = 0; i < amount; i++) {
            const coin = instantiate(this.prefab);
            this.node.addChild(coin);

            // Small random offset around start position
            const offsetX = (Math.random() - 0.5) * 100;
            const offsetY = (Math.random() - 0.5) * 100;

            const coinStart = new Vec3(
                localStartPos.x + offsetX,
                localStartPos.y + offsetY,
                localStartPos.z
            );
            coin.setPosition(coinStart);

            // Delay to create a nice cascade effect
            const delay = i * 0.05;

            tween(coin)
                .delay(delay)
                .to(this.flyDuration, { position: targetLocalPos }, { easing: 'quadInOut' })
                .call(() => {
                    // Call the target to update its value
                    const targetComp = this.targetNode.getComponent(FlyingRewardTarget);
                    if (targetComp) {
                        targetComp.OnCoinArrive(rewardPerCoin);
                    } else {
                        console.warn('Target node missing FlyingRewardTarget component!');
                    }

                    // Destroy the coin after arrival
                    coin.destroy();
                })
                .start();
        }
    }
}
